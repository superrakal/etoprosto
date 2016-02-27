define('semantic-ui-ember/mixins/checkbox-mixin', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  /*
   * Checkbox Component Mixin
   */
  var CheckboxMixin = _ember['default'].Mixin.create(_semanticUiEmberMixinsBase['default'], {
    module: 'checkbox',
    classNames: ['ui', 'checkbox'],

    didInsertElement: function didInsertElement() {
      if (this.get("disabled")) {
        return;
      }
      this._super();
    },

    willDestroyElement: function willDestroyElement() {
      if (this.get("disabled")) {
        return;
      }
      this._super();
    }
  });

  exports['default'] = CheckboxMixin;
});