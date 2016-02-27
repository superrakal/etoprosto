define('ember-cli-meta-tags/components/head-tag', ['exports', 'ember', 'ember-cli-meta-tags/templates/components/head-tag'], function (exports, _ember, _emberCliMetaTagsTemplatesComponentsHeadTag) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberCliMetaTagsTemplatesComponentsHeadTag['default'],

    _setTagName: _ember['default'].on('init', function () {
      this.set('tagName', this.get('headTag.type'));
    }),

    // expected head tag attributes
    attributeBindings: ['href', 'target', 'charset', 'crossorigin', 'hreflang', 'media', 'rel', 'rev', 'sizes', 'type', 'content', 'http-equiv', 'name', 'scheme', 'async', 'defer', 'src', 'property', 'itemprop'],
    href: _ember['default'].computed.reads('headTag.attrs.href'),
    target: _ember['default'].computed.reads('headTag.attrs.target'),
    charset: _ember['default'].computed.reads('headTag.attrs.charset'),
    crossorigin: _ember['default'].computed.reads('headTag.attrs.crossorigin'),
    hreflang: _ember['default'].computed.reads('headTag.attrs.hreflang'),
    media: _ember['default'].computed.reads('headTag.attrs.media'),
    rel: _ember['default'].computed.reads('headTag.attrs.rel'),
    rev: _ember['default'].computed.reads('headTag.attrs.rev'),
    sizes: _ember['default'].computed.reads('headTag.attrs.sizes'),
    type: _ember['default'].computed.reads('headTag.attrs.type'),
    content: _ember['default'].computed.reads('headTag.attrs.content'),
    'http-equiv': _ember['default'].computed.reads('headTag.attrs.http-equiv'),
    name: _ember['default'].computed.reads('headTag.attrs.name'),
    scheme: _ember['default'].computed.reads('headTag.attrs.scheme'),
    async: _ember['default'].computed.reads('headTag.attrs.async'),
    defer: _ember['default'].computed.reads('headTag.attrs.defer'),
    src: _ember['default'].computed.reads('headTag.attrs.src'),
    property: _ember['default'].computed.reads('headTag.attrs.property'),
    itemprop: _ember['default'].computed.reads('headTag.attrs.itemprop')

  });
});