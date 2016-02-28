`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ()->
  @route 'root', path: '/'
  @route 'sign-up'
  @route 'cabinet', path: '/cabinet/:id'
  @route 'new-event', path: '/events/new'
  @route 'event', path: '/event/:id'
  @route 'events'
  @route 'contacts'

`export default Router`