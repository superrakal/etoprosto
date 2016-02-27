import { moduleForModel, test } from 'ember-qunit';
moduleForModel('recall', 'Unit | Model | recall', {
  needs: []
});

test('it exists', function(assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
