export { initialize };

function initialize(instance) {
  var container = instance.lookup ? instance : instance.container;
  var service = container.lookup('service:head-tags');
  service.get('router').on('didTransition', function () {
    service.collectHeadTags();
  });

  // inject renderer service
  //TODO: build fastboot compatible renderer
  var component = container.lookup('component:head-tags');
  service.set('renderer', component);
  component.appendTo('head');
}

export default {
  name: 'head-tags',
  initialize: initialize
};