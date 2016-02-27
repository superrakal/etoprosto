import Ember from 'ember';
var ContactsController;

ContactsController = Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    send: function() {
      return this.get('model').save().then((function(_this) {
        return function() {
          _this.get('flashMessages').success('Ваше сообщение отправлено! Спасибо за участие :)', {
            timeout: 3000
          });
          return _this.set('model', _this.get('store').createRecord('recall'));
        };
      })(this));
    }
  }
});

export default ContactsController;
