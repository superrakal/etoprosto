import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('navbar-profile', 'Integration | Component | navbar profile', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{navbar-profile}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#navbar-profile}}\n  template block text\n{{/navbar-profile}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
