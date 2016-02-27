define("frontend/templates/components/day-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 76
            },
            "end": {
              "line": 1,
              "column": 227
            }
          },
          "moduleName": "frontend/templates/components/day-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "icon info pull-left");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "events_count pull-right");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["openEventModal"], [], ["loc", [null, [1, 99], [1, 126]]]], ["content", "events_count_string", ["loc", [null, [1, 197], [1, 220]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 335
          }
        },
        "moduleName": "frontend/templates/components/day-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "head text-center");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element1, 'class');
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [0]), 0, 0);
        morphs[2] = dom.createAttrMorph(element2, 'class');
        morphs[3] = dom.createMorphAt(element2, 0, 0);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["day ", ["subexpr", "if", [["get", "isHaveEvents", ["loc", [null, [1, 21], [1, 33]]]], "active"], [], ["loc", [null, [1, 16], [1, 44]]]]]]], ["block", "if", [["get", "isHaveEvents", ["loc", [null, [1, 82], [1, 94]]]]], [], 0, null, ["loc", [null, [1, 76], [1, 234]]]], ["attribute", "class", ["concat", ["number text-center ", ["subexpr", "if", [["get", "isActualDay", ["loc", [null, [1, 276], [1, 287]]]], "default", "muted"], [], ["loc", [null, [1, 271], [1, 307]]]]]]], ["content", "dateNumber", ["loc", [null, [1, 309], [1, 323]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});