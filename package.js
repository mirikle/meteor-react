Package.describe({
  summary: "React 0.13.0 rendering for Meteor apps",
  version: "0.0.7",
  name: "meteor-react",
  git: "git@github.com:mirikle/meteor-react.git"
});

var reactVersion = "0.13.0";

Npm.depends({
  "react": reactVersion,
});

Package.registerBuildPlugin({
  name: "compileJSX",
  use: [],
  sources: [
    'plugin/compile-jsx.js'
  ],
  npmDependencies: {
    "react": reactVersion,
    "react-tools": reactVersion
  }
});

Package.on_use(function(api) {
  // Standard distribution of React, same version as react-tools.
  api.add_files("vendor/react-" + reactVersion + ".js", "client");

  // On the server, we use the modules that ship with react.
  api.add_files("src/require-react.js", "server");
  api.export("React", "server");

  // Meteor-enabled components should include this mixin via
  // React.createClass({ mixins: [ReactMeteor.Mixin], ... }).
  api.add_files("src/ReactMeteor.js", ["server", "client"]);
  api.export("ReactMeteor", ["server", "client"]);
});
