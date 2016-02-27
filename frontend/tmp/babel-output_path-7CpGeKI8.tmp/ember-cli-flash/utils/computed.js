define('ember-cli-flash/utils/computed', ['exports', 'ember', 'ember-new-computed'], function (exports, _ember, _emberNewComputed) {
  'use strict';

  exports.add = add;
  exports.guidFor = guidFor;

  var typeOf = _ember['default'].typeOf;
  var _get = _ember['default'].get;
  var emberGuidFor = _ember['default'].guidFor;
  var emberArray = _ember['default'].A;

  function add() {
    for (var _len = arguments.length, dependentKeys = Array(_len), _key = 0; _key < _len; _key++) {
      dependentKeys[_key] = arguments[_key];
    }

    var computedFunc = (0, _emberNewComputed['default'])({
      get: function get() {
        var _this = this;

        var values = dependentKeys.map(function (dependentKey) {
          var value = _get(_this, dependentKey);

          if (typeOf(value) !== 'number') {
            return;
          }

          return value;
        });

        return emberArray(values).compact().reduce(function (prev, curr) {
          return prev + curr;
        });
      }
    });

    return computedFunc.property.apply(computedFunc, dependentKeys);
  }

  function guidFor(dependentKey) {
    return (0, _emberNewComputed['default'])(dependentKey, {
      get: function get() {
        var value = _get(this, dependentKey);

        return emberGuidFor(value);
      }
    });
  }
});