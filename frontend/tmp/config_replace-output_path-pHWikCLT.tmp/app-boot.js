/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0."},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"flashMessageDefaults":{"timeout":3000,"extendedTimeout":0,"priority":100,"sticky":false,"showProgress":false,"type":"info","types":["success","info","warning","danger","alert","secondary"],"injectionFactories":["route","controller","view","component"],"preventDuplicates":false},"browserify":{"tests":true}}};
});

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0."});
}

/* jshint ignore:end */
