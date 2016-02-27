import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('day-component', 'Integration | Component | day component', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{day-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#day-component}}\n  template block text\n{{/day-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
