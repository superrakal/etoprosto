define('frontend/tests/unit/controllers/contacts-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('controller:contacts', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });
});