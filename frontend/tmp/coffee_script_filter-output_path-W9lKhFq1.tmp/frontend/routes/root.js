import Ember from 'ember';
var RootRoute;

RootRoute = Ember.Route.extend({
  beforeModel: function() {
    return this.controllerFor('application').set('slider_partial_path', "root");
  }
});

export default RootRoute;
