import Ember from 'ember';
var NavbarProfileComponent;

NavbarProfileComponent = Ember.Component.extend({
  didInsertElement: function() {
    return this.$('.ui.dropdown').dropdown();
  },
  actions: {
    invalidateSession: function() {
      return this.sendAction("invalidateSession");
    },
    gotoCabinet: function() {
      return this.sendAction("changePath", "cabinet");
    }
  }
});

export default NavbarProfileComponent;
