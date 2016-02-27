import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('events-modal', 'Integration | Component | events modal', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{events-modal}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#events-modal}}\n  template block text\n{{/events-modal}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
