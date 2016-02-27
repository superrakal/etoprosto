`import Ember from 'ember'`

EventsRoute = Ember.Route.extend

  queryParams:
    year:
      refreshModel: true
    month:
      refreshModel: true

  beforeModel: ->
    @controllerFor('application').set('slider_partial_path', "events")

`export default EventsRoute`