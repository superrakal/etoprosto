define('frontend/tests/test-helper', ['exports', 'frontend/tests/helpers/resolver', 'frontend/tests/helpers/flash-message', 'ember-qunit'], function (exports, _frontendTestsHelpersResolver, _frontendTestsHelpersFlashMessage, _emberQunit) {

  (0, _emberQunit.setResolver)(_frontendTestsHelpersResolver['default']);
});