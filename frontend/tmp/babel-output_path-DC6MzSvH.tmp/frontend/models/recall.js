define('frontend/models/recall', ['exports', 'ember-data'], function (exports, _emberData) {
  var Recall;

  Recall = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    message: _emberData['default'].attr('string')
  });

  exports['default'] = Recall;
});