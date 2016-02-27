define('frontend/controllers/sign-up', ['exports', 'ember'], function (exports, _ember) {
  var SignUpController;

  SignUpController = _ember['default'].Controller.extend({
    flashMessages: _ember['default'].inject.service(),
    actions: {
      save: function save() {
        return this.get('model').save().then((function (_this) {
          return function () {
            _this.get('flashMessages').success('Ваш аккаунт успешно создан. На Ваш email высланы инструкции по активации', {
              timeout: 3000
            });
            return _this.transitionToRoute('root');
          };
        })(this), (function (_this) {
          return function (response) {
            _this.set('isLoading', false);
            return response.errors.forEach(function (error) {
              return console.log("Backend has returned error: " + error.status + ": " + error.title);
            });
          };
        })(this));
      }
    }
  });

  exports['default'] = SignUpController;
});