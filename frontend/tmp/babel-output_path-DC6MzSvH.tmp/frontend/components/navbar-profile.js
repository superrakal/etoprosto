define('frontend/components/navbar-profile', ['exports', 'ember'], function (exports, _ember) {
  var NavbarProfileComponent;

  NavbarProfileComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      return this.$('.ui.dropdown').dropdown();
    },
    actions: {
      invalidateSession: function invalidateSession() {
        return this.sendAction("invalidateSession");
      },
      gotoCabinet: function gotoCabinet() {
        return this.sendAction("changePath", "cabinet");
      }
    }
  });

  exports['default'] = NavbarProfileComponent;
});