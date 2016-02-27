define('frontend/adapters/application', ['exports', 'active-model-adapter', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _activeModelAdapter, _emberSimpleAuthMixinsDataAdapterMixin) {
  exports['default'] = _activeModelAdapter['default'].extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    authorizer: 'authorizer:devise',
    namespace: 'api/v1'
  });
});