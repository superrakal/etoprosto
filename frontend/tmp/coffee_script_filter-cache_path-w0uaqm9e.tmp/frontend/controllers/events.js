import Ember from 'ember';
var EventsController;

EventsController = Ember.Controller.extend({
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  queryParams: ['year', 'month'],
  modalEvents: null,
  init: function() {
    this.set('selectedYear', moment().year());
    this.set('selectedMonth', moment().month());
    return this.transitionToRoute({
      queryParams: {
        year: this.get('selectedYear'),
        month: this.get('selectedMonth')
      }
    });
  },
  change_observer: (function() {
    return this.transitionToRoute({
      queryParams: {
        year: this.get('selectedYear'),
        month: this.get('selectedMonth')
      }
    });
  }).observes('selectedYear', 'selectedMonth'),
  dates: (function() {
    var days_count, endDate, i, results, startDate;
    startDate = moment([this.get('selectedMonth'), this.get('selectedMonth')]);
    endDate = moment(startDate).endOf('month');
    days_count = endDate.diff(startDate, 'days') + 1;
    return (function() {
      results = [];
      for (var i = 1; 1 <= days_count ? i <= days_count : i >= days_count; 1 <= days_count ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
  }).property('selectedYear', 'selectedMonth'),
  selectedMonthName: (function() {
    return this.get('months')[this.get('selectedMonth')];
  }).property('selectedMonth'),
  rightEndWord: (function() {
    var cases, number, titles;
    number = this.get('modalEvents.length');
    titles = ['событие', 'события', 'событий'];
    cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
  }).property('modalEvents'),
  actions: {
    incrementMonth: function() {
      var month;
      month = this.get('selectedMonth');
      if (month === 11) {
        this.set('selectedYear', (this.get('selectedYear')) + 1);
        return this.set('selectedMonth', 0);
      } else {
        return this.set('selectedMonth', (this.get('selectedMonth')) + 1);
      }
    },
    decrementMonth: function() {
      var month;
      month = this.get('selectedMonth');
      if (month === 0) {
        this.set('selectedYear', (this.get('selectedYear')) - 1);
        return this.set('selectedMonth', 11);
      } else {
        return this.set('selectedMonth', (this.get('selectedMonth')) - 1);
      }
    },
    openEventsModal: function(events, day) {
      this.set('modalEvents', events);
      this.set('modalDay', day.format('DD.MM.YYYY'));
      return $('.ui.modal.eventsModal').modal('show');
    }
  }
});

export default EventsController;
