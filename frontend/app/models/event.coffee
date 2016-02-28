`import DS from 'ember-data'`

Event = DS.Model.extend

  title:              DS.attr 'string'
  short_description:  DS.attr 'string'
  description:        DS.attr 'string'
  date:               DS.attr 'date'
  marker:             DS.attr 'string'
  address:             DS.attr 'string'

  formattedTime: (->
    moment(@get('date')).format('HH:mm')
  ).property('date')

  formattedDate: (->
    moment(@get('date')).format('DD.MM.YYYY')
  ).property('date')

  baloonContent: (->
    '<br><p>'+@get('title')+'</p><br><p>Дата:&nbsp;'+moment(@get('date')).format('DD.MM.YYYY')+'</p><br><p>Время:&nbsp;'+@get('formattedTime')+'</p>'
  ).property('title', 'date')

`export default Event`
