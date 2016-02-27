`import Ember from 'ember'`

SignUpRoute = Ember.Route.extend

  model: ->
    @store.createRecord('user')

  setupController: (controller, model) ->
    controller.set 'model', model

`export default SignUpRoute`