import Ember from 'ember';
import Semantic from '../semantic';

// Static properties to ignore
var DEBUG = ['debug', 'performance', 'verbose'];
var STANDARD = ['name', 'namespace', 'className', 'error', 'metadata', 'selector'];
var EMBER = ['context', 'on', 'template', 'execute'];

Semantic.BaseMixin = Ember.Mixin.create({
  init: function init() {
    this._super();

    if (!this.get('module')) {
      return Ember.Logger.error('Module was not declared on semantic extended type');
    }
  },

  settings: function settings(module) {
    var component, custom, key, prop, value;

    component = window.$.fn[module];
    if (!component) {
      throw "Unable to find semantic module: " + module;
    }

    custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };

    for (key in component.settings) {
      prop = component.settings[key];
      if (window.$.inArray(key, DEBUG) >= 0) {
        continue;
      }

      if (window.$.inArray(key, STANDARD) >= 0) {
        continue;
      }

      if (typeof prop === 'function' && typeof (this.get(key) || this.get('_' + key)) !== 'function') {
        continue;
      }

      if (window.$.inArray(key, EMBER) >= 0) {
        value = this.get('ui_' + key);
      } else {
        if (typeof this.get(key) !== 'undefined') {
          value = this.get(key);
        } else {
          value = this.get('_' + key);
        }
      }

      if (value != null) {
        if (typeof value === 'function') {
          custom[key] = Ember.run.bind(this, this.updateFunctionWithParameters(key, value));
        } else {
          custom[key] = value;
        }
      }
    }

    return custom;
  },

  updateProperty: function updateProperty(property) {
    return function () {
      this.execute('set ' + property, this.get(property));
    };
  },

  updateFunctionWithParameters: function updateFunctionWithParameters(key, fn) {
    return function () {
      var args = [].splice.call(arguments, 0);
      var internal = this.get('_' + key);

      if (internal) {
        internal.apply(this, args);
      }

      if (internal !== fn) {
        return fn.apply(this, [this].concat(args));
      }

      return true;
    };
  },

  didInsertElement: function didInsertElement() {
    this.$()[this.get("module")](this.settings(this.get("module")));

    var _this = this;
    var properties = {};
    // Modules without setable properties
    if (['accordion', 'nag'].indexOf(this.get('module')) === -1) {
      properties = this.execute('set');
    }
    var property;

    for (property in properties) {
      if (!properties.hasOwnProperty(property)) {
        continue;
      }

      _this.addObserver(property, _this, _this.updateProperty(property));
    }
  },

  willDestroyElement: function willDestroyElement() {
    var name, selector;
    if ((selector = this.$()) != null) {
      if (typeof selector[name = this.get("module")] === "function") {
        return selector[name]('destroy');
      }
    }
  },

  execute: function execute() {
    var selector, module;
    if ((selector = this.$()) != null) {
      if ((module = selector[this.get('module')]) != null) {
        return module.apply(this.$(), arguments);
      }
    }
  }
});

export default Semantic.BaseMixin;