`import Ember from 'ember'`

MapComponentComponent = Ember.Component.extend
  didInsertElement: ->
    map = undefined
    marker = @get('marker')
    latlng = JSON.parse(marker)
    DG.then =>
      map = DG.map('map',
        center: [
          latlng.lat
          latlng.lng
        ]
        zoom: 13)
      DG.marker([latlng.lat, latlng.lng]).addTo(map).bindPopup(@get('baloonContent'))

`export default MapComponentComponent`