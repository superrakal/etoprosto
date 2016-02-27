import Ember from 'ember';
import Base from './base';

/*
 * Checkbox Component Mixin
 */
var CheckboxMixin = Ember.Mixin.create(Base, {
  module: 'checkbox',
  classNames: ['ui', 'checkbox'],

  didInsertElement: function didInsertElement() {
    if (this.get("disabled")) {
      return;
    }
    this._super();
  },

  willDestroyElement: function willDestroyElement() {
    if (this.get("disabled")) {
      return;
    }
    this._super();
  }
});

export default CheckboxMixin;