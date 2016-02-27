define('semantic-ui-ember/components/ui-rating', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  var Rating = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'rating',
    classNames: ['ui', 'rating'],

    init: function init() {
      this._super();

      if (!this.get('initialRating') && this.get('rating')) {
        this.set('initialRating', this.get('rating'));
      }
    }
  });

  exports['default'] = Rating;
});