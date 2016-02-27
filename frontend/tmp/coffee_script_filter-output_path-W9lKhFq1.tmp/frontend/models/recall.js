import DS from 'ember-data';
var Recall;

Recall = DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  message: DS.attr('string')
});

export default Recall;
