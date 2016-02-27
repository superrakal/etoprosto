define('frontend/tests/unit/models/recall-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForModel)('recall', 'Unit | Model | recall', {
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });
});