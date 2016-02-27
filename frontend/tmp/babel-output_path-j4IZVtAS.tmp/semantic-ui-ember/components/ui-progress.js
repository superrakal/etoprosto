define('semantic-ui-ember/components/ui-progress', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  var Progress = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'progress',
    classNames: ['ui', 'progress'],
    attributeBindings: ['percent', 'total', 'value']
  });

  exports['default'] = Progress;
});