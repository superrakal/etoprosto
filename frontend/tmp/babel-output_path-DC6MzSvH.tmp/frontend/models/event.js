define('frontend/models/event', ['exports', 'ember-data'], function (exports, _emberData) {
  var Event;

  Event = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    short_description: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    date: _emberData['default'].attr('date'),
    formattedTime: (function () {
      return moment(this.get('date')).format('HH:mm');
    }).property('date')
  });

  exports['default'] = Event;
});