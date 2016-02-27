`import DS from 'ember-data'`

User = DS.Model.extend

  email:                 DS.attr 'string'
  first_name:            DS.attr 'string'
  second_name:           DS.attr 'string'
  password:              DS.attr 'string'
  password_confirmation: DS.attr 'string'
  avatar_url:            DS.attr 'string'

`export default User`
