define('frontend/initializers/app-version', ['exports', 'frontend/config/environment', 'ember'], function (exports, _frontendConfigEnvironment, _ember) {

  var classify = _ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        _ember['default'].libraries.register(appName, _frontendConfigEnvironment['default'].APP.version);
        registered = true;
      }
    }
  };
});