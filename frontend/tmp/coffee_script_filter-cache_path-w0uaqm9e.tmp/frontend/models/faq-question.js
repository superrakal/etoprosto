import DS from 'ember-data';
var FaqQuestion;

FaqQuestion = DS.Model.extend({
  question: DS.attr('string'),
  answer: DS.attr('string')
});

export default FaqQuestion;
