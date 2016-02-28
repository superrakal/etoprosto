`import Ember from 'ember'`

NewEventRoute = Ember.Route.extend

  model: ->
    @store.createRecord('event')

  setupController: (controller, model) ->
    controller.set 'model', model

`export default NewEventRoute`