define('frontend/services/session', ['exports', 'ember', 'ember-data', 'ember-simple-auth/services/session'], function (exports, _ember, _emberData, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({
    store: _ember['default'].inject.service(),

    authorizeUser: _ember['default'].computed('data.authenticated.id', function () {
      var _this = this;
      return function (xhr) {
        _this.authorize('authorizer:devise', function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
      };
    }),

    currentUser: _ember['default'].computed('data.authenticated.id', function () {
      var userId = this.get('data.authenticated.id');
      if (!_ember['default'].isEmpty(userId)) {
        var currUser = this.get('data.authenticated');
        var user = _emberData['default'].PromiseObject.create({
          promise: this.get('store').find('user', userId).then(function (user) {
            currUser.login = user.get('email');
            return user;
          })
        });
        user['catch']((function (_this) {
          return function () {
            _this.invalidate();
            window.location.href = '/';
          };
        })(this));
        return user;
      } else {
        return null;
      }
    }),

    reloadUser: function reloadUser() {
      var userId = this.get('data.authenticated.user_id');
      var currUser = this.get('data.authenticated');

      this.get('store').findRecord('user', userId, { reload: true }).then(function (user) {
        currUser.login = user.get('email') || user.get('mobile');
        return user;
      });
    }
  });
});