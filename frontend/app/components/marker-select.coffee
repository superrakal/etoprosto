`import Ember from 'ember'`

MarkerSelectComponent = Ember.Component.extend
  didInsertElement: ->
    map = undefined
    DG.then =>
      map = DG.map('map',
        center: [
          54.98
          82.89
        ]
        zoom: 13)

      map.on 'click', (e) =>
        if @get('marker')
          @get('marker').remove()
        @set 'marker', DG.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
        @get('marker').bindPopup(@get('baloonContent'))
        @set 'value', JSON.stringify(e.latlng)

`export default MarkerSelectComponent`