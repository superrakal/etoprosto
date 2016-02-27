define('frontend/components/navigation-slider', ['exports', 'ember'], function (exports, _ember) {
  var NavigationSliderComponent;

  NavigationSliderComponent = _ember['default'].Component.extend({
    partial_base_path: "partials/navigation-slider/",
    didInsertElement: function didInsertElement() {
      return this.set('partial_path', this.get('partial_base_path') + this.get('slider_partial_path'));
    },
    partial_path_observer: (function () {
      return this.set('partial_path', this.get('partial_base_path') + this.get('slider_partial_path'));
    }).observes('slider_partial_path'),
    actions: {
      changePath: function changePath(path) {
        return this.set('slider_partial_path', path);
      },
      openLoginModal: function openLoginModal() {
        return this.sendAction("openLoginModal");
      },
      authenticate: function authenticate() {
        return this.sendAction("authenticate");
      },
      invalidateSession: function invalidateSession() {
        return this.sendAction("invalidateSession");
      }
    }
  });

  exports['default'] = NavigationSliderComponent;
});