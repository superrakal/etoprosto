`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'datetimepicker-component', 'Integration | Component | datetimepicker component', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{datetimepicker-component}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#datetimepicker-component}}
      template block text
    {{/datetimepicker-component}}
  """

  assert.equal @$().text().trim(), 'template block text'
