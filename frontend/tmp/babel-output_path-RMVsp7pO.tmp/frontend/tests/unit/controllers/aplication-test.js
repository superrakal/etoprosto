define('frontend/tests/unit/controllers/aplication-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('controller:aplication', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });
});