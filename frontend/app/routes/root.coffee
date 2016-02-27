`import Ember from 'ember'`

RootRoute = Ember.Route.extend

  beforeModel: ->
    @controllerFor('application').set('slider_partial_path', "root")

`export default RootRoute`