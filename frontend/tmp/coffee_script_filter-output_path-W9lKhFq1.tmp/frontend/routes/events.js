import Ember from 'ember';
var EventsRoute;

EventsRoute = Ember.Route.extend({
  queryParams: {
    year: {
      refreshModel: true
    },
    month: {
      refreshModel: true
    }
  },
  beforeModel: function() {
    return this.controllerFor('application').set('slider_partial_path', "events");
  }
});

export default EventsRoute;
