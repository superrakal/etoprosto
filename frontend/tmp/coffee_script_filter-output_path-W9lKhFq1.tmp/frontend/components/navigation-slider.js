import Ember from 'ember';
var NavigationSliderComponent;

NavigationSliderComponent = Ember.Component.extend({
  partial_base_path: "partials/navigation-slider/",
  didInsertElement: function() {
    return this.set('partial_path', this.get('partial_base_path') + this.get('slider_partial_path'));
  },
  partial_path_observer: (function() {
    return this.set('partial_path', this.get('partial_base_path') + this.get('slider_partial_path'));
  }).observes('slider_partial_path'),
  actions: {
    changePath: function(path) {
      return this.set('slider_partial_path', path);
    },
    openLoginModal: function() {
      return this.sendAction("openLoginModal");
    },
    authenticate: function() {
      return this.sendAction("authenticate");
    },
    invalidateSession: function() {
      return this.sendAction("invalidateSession");
    }
  }
});

export default NavigationSliderComponent;
