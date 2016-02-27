`import Ember from 'ember'`

SignUpController = Ember.Controller.extend
  flashMessages: Ember.inject.service()

  actions:
    save: ->
      @get('model').save().then (=>
        @get('flashMessages').success('Ваш аккаунт успешно создан. На Ваш email высланы инструкции по активации', {timeout: 3000})
        @transitionToRoute 'root'
      ), (response) =>
        @set 'isLoading', false
        response.errors.forEach (error)->
          console.log "Backend has returned error: #{error.status}: #{error.title}"


`export default SignUpController`
