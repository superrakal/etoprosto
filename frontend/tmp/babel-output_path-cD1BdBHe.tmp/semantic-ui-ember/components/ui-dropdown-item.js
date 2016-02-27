define('semantic-ui-ember/components/ui-dropdown-item', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    classNames: ['item'],
    tagName: 'div',

    initialize: _ember['default'].on('init', function () {
      _ember['default'].run.scheduleOnce('afterRender', this, this.update_data);
    }),

    update_data: function update_data() {
      if (this.$().data('value')) {
        return;
      }

      this.$().data('value', this.get('content'));
    }
  });
});