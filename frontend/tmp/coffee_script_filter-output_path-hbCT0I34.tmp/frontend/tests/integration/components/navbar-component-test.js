import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('navbar-component', 'Integration | Component | navbar component', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{navbar-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#navbar-component}}\n  template block text\n{{/navbar-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
