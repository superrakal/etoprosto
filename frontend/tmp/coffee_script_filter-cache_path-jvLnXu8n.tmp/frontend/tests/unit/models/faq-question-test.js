import { moduleForModel, test } from 'ember-qunit';
moduleForModel('faq-question', 'Unit | Model | faq question', {
  needs: []
});

test('it exists', function(assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
