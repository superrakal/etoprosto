`import Ember from 'ember'`

ContactsController = Ember.Controller.extend
  flashMessages: Ember.inject.service()

  actions:
    send: ->
      @get('model').save().then =>
        @get('flashMessages').success('Ваше сообщение отправлено! Спасибо за участие :)', {timeout: 3000})
        @set 'model', @get('store').createRecord('recall')

`export default ContactsController`
