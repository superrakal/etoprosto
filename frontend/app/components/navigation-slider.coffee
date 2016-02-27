`import Ember from 'ember'`

NavigationSliderComponent = Ember.Component.extend
  partial_base_path: "partials/navigation-slider/"

  didInsertElement: ->
    @set 'partial_path', @get('partial_base_path')+@get('slider_partial_path')

  partial_path_observer: (->
    @set 'partial_path', @get('partial_base_path')+@get('slider_partial_path')
  ).observes('slider_partial_path')

  actions:
    changePath: (path)->
      @set 'slider_partial_path', path

    openLoginModal: ->
      @sendAction("openLoginModal")
    authenticate: ->
      @sendAction("authenticate")
    invalidateSession: ->
      @sendAction("invalidateSession")

`export default NavigationSliderComponent`