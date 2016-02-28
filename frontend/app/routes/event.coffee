`import Ember from 'ember'`

EventRoute = Ember.Route.extend

  beforeModel: ->
    @controllerFor('application').set('slider_partial_path', "event")

  model: (params) ->
    @store.find('event', params.id)

  setupController: (controller, model) ->
    controller.set 'model', model

`export default EventRoute`