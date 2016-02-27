import Ember from 'ember';
import DS from 'ember-data';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service(),

  authorizeUser: Ember.computed('data.authenticated.id', function() {
    var _this = this;
    return function (xhr) {
      _this.authorize('authorizer:devise', function (headerName, headerValue) {
        xhr.setRequestHeader(headerName, headerValue);
      });
    };
  }),

  currentUser: Ember.computed('data.authenticated.id', function() {
    const userId = this.get('data.authenticated.id');
    if (!Ember.isEmpty(userId)) {
      var currUser = this.get('data.authenticated');
      var user = DS.PromiseObject.create({
        promise: this.get('store').find('user', userId).then(function(user){
          currUser.login = user.get('email');
          return user;
        })
      });
      user.catch((function(_this){
        return function(){
          _this.invalidate();
          window.location.href = '/';
        };
      })(this));
      return user;
    }
    else {
      return null;
    }
  }),

  reloadUser: function() {
    const userId = this.get('data.authenticated.user_id');
    var currUser = this.get('data.authenticated');

    this.get('store').findRecord('user', userId, {reload: true}).then(function(user){
      currUser.login = user.get('email') || user.get('mobile');
      return user;
    });
  }
});