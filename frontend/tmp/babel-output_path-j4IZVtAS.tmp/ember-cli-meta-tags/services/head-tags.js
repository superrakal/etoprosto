define('ember-cli-meta-tags/services/head-tags', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  //TODO: consider polyfilled Set
  var VALID_HEAD_TAGS = _ember['default'].A(['base', 'link', 'meta', 'script']);

  exports['default'] = _ember['default'].Service.extend({

    // crawl up the active route stack and collect head tags
    collectHeadTags: function collectHeadTags() {
      var _this = this;

      var tags = {};
      var handlerInfos = _ember['default'].A(this.get('router.router.currentHandlerInfos'));
      handlerInfos.forEach(function (handlerInfo) {
        _ember['default'].merge(tags, _this._extractHeadTagsFromRoute(handlerInfo.handler));
      });
      var tagArray = _ember['default'].$.map(tags, function (tag) {
        return tag;
      });
      this.set('renderer.headTags', _ember['default'].A(tagArray));
    },

    _extractHeadTagsFromRoute: function _extractHeadTagsFromRoute(route) {
      var headTags = route.headTags;
      if (!headTags) {
        return {};
      }
      if (typeof headTags === 'function') {
        headTags = headTags.apply(route);
      } else if (typeof headTags !== 'object') {
        // not recognized construct
        return {};
      }
      // convert headTags to object
      return this._buildTags(headTags);
    },

    // ensure all tags have a tagId and build object keyed by id
    _buildTags: function _buildTags(headTagsArray) {
      var tagMap = {};
      _ember['default'].A(headTagsArray).forEach(function (tagDefinition) {
        if (!VALID_HEAD_TAGS.contains(tagDefinition.type)) {
          return;
        }
        var tagId = tagDefinition.tagId;
        if (!tagId) {
          tagId = _ember['default'].guidFor(tagDefinition);
        }
        tagMap[tagId] = tagDefinition;
      });
      return tagMap;
    }
  });
});