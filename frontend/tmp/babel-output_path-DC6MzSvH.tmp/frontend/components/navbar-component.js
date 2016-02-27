define('frontend/components/navbar-component', ['exports', 'ember'], function (exports, _ember) {
  var NavbarComponentComponent;

  NavbarComponentComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      $('.masthead').visibility({
        once: false,
        onBottomPassed: function onBottomPassed() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function onBottomPassedReverse() {
          $('.fixed.menu').transition('fade out');
        }
      });
      return $('.ui.sidebar').sidebar('attach events', '.toc.item');
    },
    actions: {
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

  exports['default'] = NavbarComponentComponent;
});