define('frontend/routes/events', ['exports', 'ember'], function (exports, _ember) {
  var EventsRoute;

  EventsRoute = _ember['default'].Route.extend({
    queryParams: {
      year: {
        refreshModel: true
      },
      month: {
        refreshModel: true
      }
    },
    beforeModel: function beforeModel() {
      return this.controllerFor('application').set('slider_partial_path', "events");
    }
  });

  exports['default'] = EventsRoute;
});