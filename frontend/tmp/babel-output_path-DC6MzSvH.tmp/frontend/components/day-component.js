define('frontend/components/day-component', ['exports', 'ember'], function (exports, _ember) {
  var DayComponentComponent;

  DayComponentComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      var endDate, startDate;
      startDate = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      endDate = moment(startDate).endOf('day');
      return this.set('events', this.get('store').query('event', {
        from: startDate.toDate(),
        to: endDate.toDate()
      }));
    },
    month_observer: (function () {
      var endDate, startDate;
      startDate = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      endDate = moment(startDate).endOf('day');
      return this.set('events', this.get('store').query('event', {
        from: startDate.toDate(),
        to: endDate.toDate()
      }));
    }).observes('selectedMonth', 'selectedYear'),
    events_count: (function () {
      if (this.get('events')) {
        return this.get('events').get('length');
      } else {
        return 0;
      }
    }).property('events', 'events.isFulfilled', 'selectedMonth', 'selectedYear'),
    events_count_string: (function () {
      if (this.get('events_count') > 9) {
        return '9+';
      } else {
        return this.get('events_count');
      }
    }).property('events_count'),
    isActualDay: (function () {
      var endDate, startDate;
      startDate = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      endDate = moment(startDate).endOf('day');
      return !moment().isAfter(endDate);
    }).property('selectedMonth', 'selectedYear'),
    isHaveEvents: (function () {
      return this.get('events_count') > 0;
    }).property('events_count'),
    actions: {
      openEventModal: function openEventModal(events) {
        var day;
        day = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
        return this.sendAction('openEventsModal', this.get('events'), day);
      }
    }
  });

  exports['default'] = DayComponentComponent;
});