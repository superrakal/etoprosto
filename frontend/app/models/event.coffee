`import DS from 'ember-data'`

Event = DS.Model.extend

  title:              DS.attr 'string'
  short_description:  DS.attr 'string'
  description:        DS.attr 'string'
  date:               DS.attr 'date'

  formattedTime: (->
    moment(@get('date')).format('HH:mm')
  ).property('date')

`export default Event`