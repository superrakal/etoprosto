`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'navigation-slider', 'Integration | Component | navigation slider', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{navigation-slider}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#navigation-slider}}
      template block text
    {{/navigation-slider}}
  """

  assert.equal @$().text().trim(), 'template block text'
