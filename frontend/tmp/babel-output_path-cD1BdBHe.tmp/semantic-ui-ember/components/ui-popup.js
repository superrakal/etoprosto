define('semantic-ui-ember/components/ui-popup', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'popup',
    attributeBindings: ['content:data-content'],

    contentChanges: _ember['default'].observer('content', function () {
      this.didInsertElement();
    })
  });
});