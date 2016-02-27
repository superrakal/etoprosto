define('ember-cli-input-mask/components/input-mask', ['exports', 'ember'], function (exports, _ember) {
  /* global moment */

  'use strict';

  exports['default'] = _ember['default'].TextField.extend({
    initializeMask: (function () {
      var mask = this.get('mask');

      this.$().inputmask(mask, {
        onBeforeMask: function onBeforeMask(value) {
          if (mask === 'mm/dd/yyyy') {
            return moment(new Date(value)).format('L');
          }
        }
      });

      // The input mask changes the value of the input from the original to a
      // formatted version. We need to manually send that change back to the
      // controller.
      this.set('value', this.$().val());
    }).on('didInsertElement'),

    removeMask: (function () {
      this.$().inputmask('remove');
    }).on('willDestroyElement')
  });
});