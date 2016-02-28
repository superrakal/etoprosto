`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'marker-select', 'Integration | Component | marker select', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{marker-select}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#marker-select}}
      template block text
    {{/marker-select}}
  """

  assert.equal @$().text().trim(), 'template block text'
