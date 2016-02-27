`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'navbar-profile', 'Integration | Component | navbar profile', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{navbar-profile}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#navbar-profile}}
      template block text
    {{/navbar-profile}}
  """

  assert.equal @$().text().trim(), 'template block text'
