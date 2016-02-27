define('semantic-ui-ember/components/ui-modal', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'modal',
    classNames: ['ui', 'modal'],
    detachable: false,
    name: null
  });
});