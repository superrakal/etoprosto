define("frontend/adapters/application", ["exports", "ember-data"], function (exports, _emberData) {
  exports["default"] = _emberData["default"].ActiveModelAdapter.extend({
    host: Ember.ENV.ACTIVE_MODEL_API_URL,

    buildURL: function buildURL() {
      var base;
      base = this._super.apply(this, arguments);
      return "" + base + ".json";
    }
  });
});