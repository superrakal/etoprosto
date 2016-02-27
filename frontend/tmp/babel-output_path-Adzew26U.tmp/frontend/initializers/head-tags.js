define('frontend/initializers/head-tags', ['exports', 'ember', 'ember-cli-meta-tags/instance-initializers/head-tags'], function (exports, _ember, _emberCliMetaTagsInstanceInitializersHeadTags) {
  exports.initialize = initialize;

  if (_ember['default'].Application.instanceInitializer) {
    _ember['default'].Application.instanceInitializer(_emberCliMetaTagsInstanceInitializersHeadTags['default']);
  }

  function initialize() {
    var application = arguments[1] || arguments[0];
    var container = application.__container__;
    application.inject('service:head-tags', 'router', 'router:main');

    // Ember >= 1.12
    if (application.instanceInitializer) {
      return;
    }

    // Ember < 1.12
    _emberCliMetaTagsInstanceInitializersHeadTags['default'].initialize(container);
  }

  exports['default'] = {
    name: 'head-tags',
    initialize: initialize
  };
});