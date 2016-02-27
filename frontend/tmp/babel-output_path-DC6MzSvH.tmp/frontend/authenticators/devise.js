define('frontend/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, _emberSimpleAuthAuthenticatorsDevise) {
  exports['default'] = _emberSimpleAuthAuthenticatorsDevise['default'].extend({
    key: 'projectx:session',
    serverTokenEndpoint: '/api/v1/authenticate'
  });
});