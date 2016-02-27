`import DS from 'ember-data'`

FaqQuestion = DS.Model.extend

  question:     DS.attr 'string'
  answer:       DS.attr 'string'

`export default FaqQuestion`
