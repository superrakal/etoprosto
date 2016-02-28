`import Ember from 'ember'`

DatetimepickerComponentComponent = Ember.Component.extend
  didInsertElement: ->
    @$('input').datetimepicker
      lang: 'ru'
      dayOfWeekStart: 1
      format: 'd.m.Y H:i'
      onChangeDateTime: (data) =>
        @set 'value', data

`export default DatetimepickerComponentComponent`