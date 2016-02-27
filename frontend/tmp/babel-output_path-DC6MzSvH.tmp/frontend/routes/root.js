define('frontend/routes/root', ['exports', 'ember'], function (exports, _ember) {
  var RootRoute;

  RootRoute = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.controllerFor('application').set('slider_partial_path', "root");
    }
  });

  exports['default'] = RootRoute;
});