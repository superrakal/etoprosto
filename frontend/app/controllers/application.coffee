`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  loginError: null
  slider_partial_path: "root"

  actions:
    authenticate: ->
      data = @getProperties('identification', 'password')
      @get('session').authenticate('authenticator:devise', data.identification, data.password).then (=>
        @set 'loginError', null
        @send("closeLoginModal")
      ), (error) =>
        @set 'loginError', error.error

    invalidateSession: ->
      @get('session').invalidate()
      @transitionToRoute 'root'

    openLoginModal: ->
      $('.ui.modal.loginModal').modal('show')

    closeLoginModal: ->
      $('.ui.modal.loginModal').modal('hide')

`export default ApplicationController`
