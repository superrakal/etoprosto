/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'png', 'gif', 'jpeg', 'jpg', 'svg', 'eot', 'ttf', 'woff']
    }
  });

  app.import('bower_components/datetimepicker/jquery.datetimepicker.js');
  app.import('bower_components/datetimepicker/jquery.datetimepicker.css');

  return app.toTree();
};
