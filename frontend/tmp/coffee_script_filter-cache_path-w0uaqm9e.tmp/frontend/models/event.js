import DS from 'ember-data';
var Event;

Event = DS.Model.extend({
  title: DS.attr('string'),
  short_description: DS.attr('string'),
  description: DS.attr('string'),
  date: DS.attr('date'),
  formattedTime: (function() {
    return moment(this.get('date')).format('HH:mm');
  }).property('date')
});

export default Event;
