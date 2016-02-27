define('frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  var ApplicationController;

  ApplicationController = _ember['default'].Controller.extend({
    loginError: null,
    slider_partial_path: "root",
    actions: {
      authenticate: function authenticate() {
        var data;
        data = this.getProperties('identification', 'password');
        return this.get('session').authenticate('authenticator:devise', data.identification, data.password).then((function (_this) {
          return function () {
            _this.set('loginError', null);
            return _this.send("closeLoginModal");
          };
        })(this), (function (_this) {
          return function (error) {
            return _this.set('loginError', error.error);
          };
        })(this));
      },
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
        return this.transitionToRoute('root');
      },
      openLoginModal: function openLoginModal() {
        return $('.ui.modal.loginModal').modal('show');
      },
      closeLoginModal: function closeLoginModal() {
        return $('.ui.modal.loginModal').modal('hide');
      }
    }
  });

  exports['default'] = ApplicationController;
});