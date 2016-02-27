import Ember from 'ember';
var NavbarComponentComponent;

NavbarComponentComponent = Ember.Component.extend({
  didInsertElement: function() {
    $('.masthead').visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    });
    return $('.ui.sidebar').sidebar('attach events', '.toc.item');
  },
  actions: {
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

export default NavbarComponentComponent;
