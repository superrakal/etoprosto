define('frontend/models/faq-question', ['exports', 'ember-data'], function (exports, _emberData) {
  var FaqQuestion;

  FaqQuestion = _emberData['default'].Model.extend({
    question: _emberData['default'].attr('string'),
    answer: _emberData['default'].attr('string')
  });

  exports['default'] = FaqQuestion;
});