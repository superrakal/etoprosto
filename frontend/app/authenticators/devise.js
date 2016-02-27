import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';

export default DeviseAuthenticator.extend({
  key: 'projectx:session',
  serverTokenEndpoint: '/api/v1/authenticate'
});