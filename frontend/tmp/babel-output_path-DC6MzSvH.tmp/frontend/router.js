define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  var Router;

  Router = _ember['default'].Router.extend({
    location: _frontendConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('root', {
      path: '/'
    });
    this.route('sign-up');
    this.route('cabinet', {
      path: '/cabinet/:id'
    });
    this.route('events');
    return this.route('contacts');
  });

  exports['default'] = Router;
});