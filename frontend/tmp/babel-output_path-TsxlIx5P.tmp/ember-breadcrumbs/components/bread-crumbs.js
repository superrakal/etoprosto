define("ember-breadcrumbs/components/bread-crumbs", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  exports["default"] = _ember["default"].Component.extend({
    router: null,
    applicationController: null,

    handlerInfos: _ember["default"].computed("applicationController.currentPath", function () {
      return this.get("router").router.currentHandlerInfos;
    }),

    /*
      For the pathNames and controllers properties, we must be careful not to NOT
      specify the properties of the route in our dependent keys.
       Observing the controller property of the route causes some serious problems:
      https://github.com/chrisfarber/ember-breadcrumbs/issues/21
    */

    pathNames: _ember["default"].computed("handlerInfos.[]", function () {
      return this.get("handlerInfos").map(function (handlerInfo) {
        return handlerInfo.name;
      });
    }),

    controllers: _ember["default"].computed("handlerInfos.[]", function () {
      return this.get("handlerInfos").map(function (handlerInfo) {
        return handlerInfo.handler.controller;
      });
    }),

    breadCrumbs: _ember["default"].computed("controllers.@each.breadCrumbs", "controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "controllers.@each.breadCrumbModel", "pathNames.[]", function () {
      var controllers = this.get("controllers");
      var defaultPaths = this.get("pathNames");
      var breadCrumbs = _ember["default"].A([]);

      controllers.forEach(function (controller, index) {
        var crumbs = controller.get("breadCrumbs") || _ember["default"].A([]);
        var singleCrumb = controller.get("breadCrumb");

        if (!_ember["default"].isBlank(singleCrumb)) {
          crumbs.push({
            label: singleCrumb,
            path: controller.get("breadCrumbPath"),
            model: controller.get("breadCrumbModel")
          });
        }

        crumbs.forEach(function (crumb) {
          breadCrumbs.addObject(_ember["default"].Object.create({
            label: crumb.label,
            path: crumb.path || defaultPaths[index],
            model: crumb.model,
            linkable: !_ember["default"].isNone(crumb.linkable) ? crumb.linkable : true,
            isCurrent: false
          }));
        });
      });

      var deepestCrumb = _ember["default"].get(breadCrumbs, "lastObject");
      if (deepestCrumb) {
        deepestCrumb.isCurrent = true;
      }

      return breadCrumbs;
    })
  });
});