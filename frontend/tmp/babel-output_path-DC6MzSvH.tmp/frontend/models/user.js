define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  var User;

  User = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    first_name: _emberData['default'].attr('string'),
    second_name: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    password_confirmation: _emberData['default'].attr('string'),
    avatar_url: _emberData['default'].attr('string')
  });

  exports['default'] = User;
});