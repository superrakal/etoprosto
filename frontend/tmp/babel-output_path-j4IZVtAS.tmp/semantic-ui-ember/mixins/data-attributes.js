define('semantic-ui-ember/mixins/data-attributes', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    attributeBindings: ['data-test']
  });
});