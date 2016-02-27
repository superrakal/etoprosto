define('ember-cli-flash/flash/object', ['exports', 'ember', 'ember-cli-flash/utils/computed', 'ember-new-computed'], function (exports, _ember, _emberCliFlashUtilsComputed, _emberNewComputed) {
  'use strict';

  var EmberObject = _ember['default'].Object;
  var _Ember$run = _ember['default'].run;
  var later = _Ember$run.later;
  var cancel = _Ember$run.cancel;
  var Evented = _ember['default'].Evented;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var readOnly = _emberNewComputed['default'].readOnly;

  exports['default'] = EmberObject.extend(Evented, {
    timer: null,
    exitTimer: null,
    exiting: false,

    queue: readOnly('flashService.queue'),
    totalTimeout: _emberCliFlashUtilsComputed['default'].add('timeout', 'extendedTimeout').readOnly(),
    _guid: _emberCliFlashUtilsComputed['default'].guidFor('message').readOnly(),

    init: function init() {
      this._super.apply(this, arguments);

      if (get(this, 'sticky')) {
        return;
      }

      this._setTimer('exitTimer', 'exitMessage', get(this, 'timeout'));
      this._setTimer('timer', 'destroyMessage', get(this, 'totalTimeout'));
    },

    destroyMessage: function destroyMessage() {
      var queue = get(this, 'queue');

      if (queue) {
        queue.removeObject(this);
      }

      this.destroy();
      this.trigger('didDestroyMessage');
    },

    exitMessage: function exitMessage() {
      set(this, 'exiting', true);

      this._cancelTimer('exitTimer');
      this.trigger('didExitMessage');
    },

    willDestroy: function willDestroy() {
      var _this = this;

      var timers = ['timer', 'exitTimer'];

      timers.forEach(function (timer) {
        _this._cancelTimer(timer);
      });

      this._super.apply(this, arguments);
    },

    // private
    _setTimer: function _setTimer(name, methodName, timeout) {
      return set(this, name, later(this, methodName, timeout));
    },

    _cancelTimer: function _cancelTimer(name) {
      var timer = get(this, name);

      if (timer) {
        cancel(timer);
        set(this, name, null);
      }
    }
  });
});