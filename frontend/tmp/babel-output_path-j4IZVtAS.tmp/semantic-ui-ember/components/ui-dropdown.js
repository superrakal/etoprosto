define('semantic-ui-ember/components/ui-dropdown', ['exports', 'ember', 'semantic-ui-ember/mixins/base', 'semantic-ui-ember/mixins/data-attributes'], function (exports, _ember, _semanticUiEmberMixinsBase, _semanticUiEmberMixinsDataAttributes) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], _semanticUiEmberMixinsDataAttributes['default'], {
    module: 'dropdown',
    classNames: ['ui', 'dropdown'],
    tagName: 'div',

    initialize: _ember['default'].on('didInsertElement', function () {
      var selected = this.get('selected');
      if (typeof selected !== "undefined" && selected !== null) {
        this.set('boundValue', 'selected');
        this.execute('set selected', selected);
      }

      var value = this.get('value');
      if (typeof value !== "undefined" && value !== null) {
        _ember['default'].deprecate('Bind to selected on ui-dropdown instead of value as semantic doesn\'t update the display when the value is set', false);
        this.set('boundValue', 'value');
        this.execute('set value', value);
      }
    }),

    _onChange: function _onChange(value /*, text, $element*/) {
      this.set(this.get('boundValue') || 'selected', value);
    }
  });
});