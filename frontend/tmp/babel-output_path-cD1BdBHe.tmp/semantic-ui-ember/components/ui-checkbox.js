define('semantic-ui-ember/components/ui-checkbox', ['exports', 'ember', 'semantic-ui-ember/mixins/checkbox-mixin'], function (exports, _ember, _semanticUiEmberMixinsCheckboxMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsCheckboxMixin['default'], {
    type: 'checkbox',
    checked: false,

    _onChange: function _onChange() {
      this.set('checked', this.$('input').prop('checked'));
    }
  });
});