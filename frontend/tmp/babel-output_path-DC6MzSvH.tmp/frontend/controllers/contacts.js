define('frontend/controllers/contacts', ['exports', 'ember'], function (exports, _ember) {
  var ContactsController;

  ContactsController = _ember['default'].Controller.extend({
    flashMessages: _ember['default'].inject.service(),
    actions: {
      send: function send() {
        return this.get('model').save().then((function (_this) {
          return function () {
            _this.get('flashMessages').success('Ваше сообщение отправлено! Спасибо за участие :)', {
              timeout: 3000
            });
            return _this.set('model', _this.get('store').createRecord('recall'));
          };
        })(this));
      }
    }
  });

  exports['default'] = ContactsController;
});