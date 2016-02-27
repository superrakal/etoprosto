import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('navigation-slider', 'Integration | Component | navigation slider', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{navigation-slider}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#navigation-slider}}\n  template block text\n{{/navigation-slider}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
