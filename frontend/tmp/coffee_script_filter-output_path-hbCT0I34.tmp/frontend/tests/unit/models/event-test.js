import { moduleForModel, test } from 'ember-qunit';
moduleForModel('event', 'Unit | Model | event', {
  needs: []
});

test('it exists', function(assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
