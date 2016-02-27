`import Ember from 'ember'`

NavbarProfileComponent = Ember.Component.extend

  didInsertElement: ->
    @$('.ui.dropdown').dropdown()

  actions:
    invalidateSession: ->
      @sendAction("invalidateSession")

    gotoCabinet:  ->
      @sendAction("changePath", "cabinet")

`export default NavbarProfileComponent`