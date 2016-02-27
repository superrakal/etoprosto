import Ember from 'ember';
var ContactsRoute;

ContactsRoute = Ember.Route.extend({
  beforeModel: function() {
    this.store.findAll('faq-question');
    return this.controllerFor('application').set('slider_partial_path', "contacts");
  },
  model: function() {
    return this.store.createRecord('recall');
  },
  setupController: function(controller, model) {
    controller.set('faq-questions', this.store.peekAll('faq-question'));
    return controller.set('model', model);
  }
});

export default ContactsRoute;
