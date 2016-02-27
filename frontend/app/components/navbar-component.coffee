`import Ember from 'ember'`

NavbarComponentComponent = Ember.Component.extend
  didInsertElement: ->
    # fix menu when passed
    $('.masthead').visibility
      once: false
      onBottomPassed: ->
        $('.fixed.menu').transition 'fade in'
        return
      onBottomPassedReverse: ->
        $('.fixed.menu').transition 'fade out'
        return
    # create sidebar and attach to menu open
    $('.ui.sidebar').sidebar 'attach events', '.toc.item'

  actions:
    openLoginModal: ->
      @sendAction("openLoginModal")
    authenticate: ->
      @sendAction("authenticate")
    invalidateSession: ->
      @sendAction("invalidateSession")

`export default NavbarComponentComponent`