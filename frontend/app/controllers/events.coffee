`import Ember from 'ember'`

EventsController = Ember.Controller.extend
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  queryParams: ['year', 'month']
  modalEvents: null

  init: ->
    @set 'selectedYear', moment().year()
    @set 'selectedMonth', moment().month()
    @transitionToRoute(queryParams: {year: @get('selectedYear'), month: @get('selectedMonth')})

  change_observer: (->
    @transitionToRoute(queryParams: {year: @get('selectedYear'), month: @get('selectedMonth')})
  ).observes('selectedYear', 'selectedMonth')

  dates: (->
    startDate = moment([@get('selectedMonth'), @get('selectedMonth')])
    endDate =   moment(startDate).endOf('month')
    days_count = endDate.diff(startDate, 'days')+1
    [1..days_count]
  ).property('selectedYear', 'selectedMonth')

  selectedMonthName: (->
    @get('months')[@get('selectedMonth')]
  ).property('selectedMonth')


  rightEndWord: (->
    number = @get('modalEvents.length')
    titles = [
      'событие'
      'события'
      'событий'
    ]
    cases = [
      2
      0
      1
      1
      1
      2
    ]
    titles[if number % 100 > 4 and number % 100 < 20 then 2 else cases[if number % 10 < 5 then number % 10 else 5]]
  ).property('modalEvents')

  actions:
    incrementMonth: ->
      month = @get('selectedMonth')
      if month == 11
        @set 'selectedYear', (@get 'selectedYear') + 1
        @set 'selectedMonth', 0
      else
        @set 'selectedMonth', (@get 'selectedMonth') + 1

    decrementMonth: ->
      month = @get('selectedMonth')
      if month == 0
        @set 'selectedYear', (@get 'selectedYear') - 1
        @set 'selectedMonth', 11
      else
        @set 'selectedMonth', (@get 'selectedMonth') - 1

    openEventsModal: (events, day) ->
      @set 'modalEvents', events
      @set 'modalDay', day.format('DD.MM.YYYY')
      $('.ui.modal.eventsModal').modal('show')


`export default EventsController`
