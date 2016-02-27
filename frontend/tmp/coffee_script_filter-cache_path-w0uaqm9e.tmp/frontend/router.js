import Ember from 'ember';
import config from './config/environment';
var Router;

Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('root', {
    path: '/'
  });
  this.route('sign-up');
  this.route('cabinet', {
    path: '/cabinet/:id'
  });
  this.route('events');
  return this.route('contacts');
});

export default Router;
