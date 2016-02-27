import Ember from 'ember';
var SignUpRoute;

SignUpRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('user');
  },
  setupController: function(controller, model) {
    return controller.set('model', model);
  }
});

export default SignUpRoute;
