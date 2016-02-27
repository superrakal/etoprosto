define('ember-cli-flash/components/flash-message', ['exports', 'ember', 'ember-cli-flash/templates/components/flash-message', 'ember-new-computed'], function (exports, _ember, _emberCliFlashTemplatesComponentsFlashMessage, _emberNewComputed) {
  'use strict';

  var _Ember$String = _ember['default'].String;
  var classify = _Ember$String.classify;
  var htmlSafe = _Ember$String.htmlSafe;
  var Component = _ember['default'].Component;
  var getWithDefault = _ember['default'].getWithDefault;
  var run = _ember['default'].run;
  var on = _ember['default'].on;
  var _get = _ember['default'].get;
  var set = _ember['default'].set;
  var readOnly = _emberNewComputed['default'].readOnly;
  var bool = _emberNewComputed['default'].bool;
  var next = run.next;
  var cancel = run.cancel;

  exports['default'] = Component.extend({
    layout: _emberCliFlashTemplatesComponentsFlashMessage['default'],
    active: false,
    messageStyle: 'bootstrap',
    classNameBindings: ['alertType', 'active', 'exiting'],

    showProgressBar: readOnly('flash.showProgress'),
    exiting: readOnly('flash.exiting'),
    hasBlock: bool('template').readOnly(),

    alertType: (0, _emberNewComputed['default'])('flash.type', {
      get: function get() {
        var flashType = getWithDefault(this, 'flash.type', '');
        var messageStyle = getWithDefault(this, 'messageStyle', '');
        var prefix = 'alert alert-';

        if (messageStyle === 'foundation') {
          prefix = 'alert-box ';
        }

        return '' + prefix + flashType;
      }
    }),

    flashType: (0, _emberNewComputed['default'])('flash.type', {
      get: function get() {
        var flashType = getWithDefault(this, 'flash.type', '');

        return classify(flashType);
      }
    }),

    _setActive: on('didInsertElement', function () {
      var _this = this;

      var pendingSet = next(this, function () {
        set(_this, 'active', true);
      });
      set(this, 'pendingSet', pendingSet);
    }),

    progressDuration: (0, _emberNewComputed['default'])('flash.showProgress', {
      get: function get() {
        if (!_get(this, 'flash.showProgress')) {
          return false;
        }

        var duration = getWithDefault(this, 'flash.timeout', 0);

        return htmlSafe('transition-duration: ' + duration + 'ms');
      }
    }),

    click: function click() {
      this._destroyFlashMessage();
    },

    willDestroy: function willDestroy() {
      this._super();
      this._destroyFlashMessage();
      cancel(_get(this, 'pendingSet'));
    },

    // private
    _destroyFlashMessage: function _destroyFlashMessage() {
      var flash = getWithDefault(this, 'flash', false);

      if (flash) {
        flash.destroyMessage();
      }
    }
  });
});