`import Ember from 'ember'`

DayComponentComponent = Ember.Component.extend

  didInsertElement: ->
    startDate = moment([@get('selectedYear'), @get('selectedMonth'), @get('dateNumber')])
    endDate =   moment(startDate).endOf('day')
    @set 'events', (@get('store').query('event', { from: startDate.toDate(), to: endDate.toDate() }))

  month_observer:( ->
    startDate = moment([@get('selectedYear'), @get('selectedMonth'), @get('dateNumber')])
    endDate =   moment(startDate).endOf('day')
    @set 'events', (@get('store').query('event', { from: startDate.toDate(), to: endDate.toDate() }))
  ).observes('selectedMonth', 'selectedYear')

  events_count:( ->
    if @get 'events'
      (@get 'events').get('length')
    else
      0
  ).property('events', 'events.isFulfilled', 'selectedMonth', 'selectedYear')

  events_count_string:( ->
    if @get('events_count') > 9
      '9+'
    else
      @get('events_count')
  ).property('events_count')

  isActualDay: (->
    startDate = moment([@get('selectedYear'), @get('selectedMonth'), @get('dateNumber')])
    endDate =   moment(startDate).endOf('day')
    !(moment().isAfter(endDate))
  ).property('selectedMonth', 'selectedYear')

  isHaveEvents: (->
    @get('events_count') > 0
  ).property('events_count')

  actions:
    openEventModal: (events) ->
      day = moment([@get('selectedYear'), @get('selectedMonth'), @get('dateNumber')])
      @sendAction('openEventsModal', @get('events'), day)

`export default DayComponentComponent`