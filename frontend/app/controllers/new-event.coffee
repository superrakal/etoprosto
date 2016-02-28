`import Ember from 'ember'`

NewEventController = Ember.Controller.extend
  flashMessages: Ember.inject.service()

  actions:
    create: ->
      @get('model').save().then =>
        @get('flashMessages').success('Ваше событие успешно создано. Спасибо, что Вы с нами!', {timeout: 3000})
        @transitionToRoute 'root'

`export default NewEventController`
