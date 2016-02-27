define('semantic-ui-ember/components/ui-radio', ['exports', 'ember', 'semantic-ui-ember/mixins/checkbox-mixin'], function (exports, _ember, _semanticUiEmberMixinsCheckboxMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsCheckboxMixin['default'], {
    type: 'radio',
    classNames: ['radio'],
    name: 'default',

    init: function init() {
      this._super();

      if (!(this.get('name') && this.get('name') !== 'default')) {
        _ember['default'].Logger.warn('Name was not passed into semantic radio component');
      }
    },

    _onChange: function _onChange() {
      this.set('current', this.get('value'));
    },

    checked: _ember['default'].computed('current', 'value', function () {
      return this.get('current') === this.get('value');
    })
  });
});