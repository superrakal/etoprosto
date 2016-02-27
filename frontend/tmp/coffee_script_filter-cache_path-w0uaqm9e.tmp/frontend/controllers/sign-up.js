import Ember from 'ember';
var SignUpController;

SignUpController = Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    save: function() {
      return this.get('model').save().then(((function(_this) {
        return function() {
          _this.get('flashMessages').success('Ваш аккаунт успешно создан. На Ваш email высланы инструкции по активации', {
            timeout: 3000
          });
          return _this.transitionToRoute('root');
        };
      })(this)), (function(_this) {
        return function(response) {
          _this.set('isLoading', false);
          return response.errors.forEach(function(error) {
            return console.log("Backend has returned error: " + error.status + ": " + error.title);
          });
        };
      })(this));
    }
  }
});

export default SignUpController;
