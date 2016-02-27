define('frontend/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  var SignUpRoute;

  SignUpRoute = _ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('user');
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = SignUpRoute;
});