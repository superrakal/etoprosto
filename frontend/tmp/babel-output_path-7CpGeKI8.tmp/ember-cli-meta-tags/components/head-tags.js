define('ember-cli-meta-tags/components/head-tags', ['exports', 'ember', 'ember-cli-meta-tags/templates/components/head-tags'], function (exports, _ember, _emberCliMetaTagsTemplatesComponentsHeadTags) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    headTags: _ember['default'].A([]),
    layout: _emberCliMetaTagsTemplatesComponentsHeadTags['default']
  });
});