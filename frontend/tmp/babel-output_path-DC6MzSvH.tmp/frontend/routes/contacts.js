define('frontend/routes/contacts', ['exports', 'ember'], function (exports, _ember) {
  var ContactsRoute;

  ContactsRoute = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.store.findAll('faq-question');
      return this.controllerFor('application').set('slider_partial_path', "contacts");
    },
    model: function model() {
      return this.store.createRecord('recall');
    },
    setupController: function setupController(controller, model) {
      controller.set('faq-questions', this.store.peekAll('faq-question'));
      return controller.set('model', model);
    }
  });

  exports['default'] = ContactsRoute;
});