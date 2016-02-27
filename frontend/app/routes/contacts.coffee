`import Ember from 'ember'`

ContactsRoute = Ember.Route.extend

  beforeModel: ->
    @store.findAll('faq-question')
    @controllerFor('application').set('slider_partial_path', "contacts")

  model: ->
    @store.createRecord('recall')

  setupController: (controller, model) ->
    controller.set 'faq-questions', @store.peekAll('faq-question')
    controller.set 'model', model

`export default ContactsRoute`