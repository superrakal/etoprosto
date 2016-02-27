define("frontend/templates/events", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 322
            },
            "end": {
              "line": 1,
              "column": 506
            }
          },
          "moduleName": "frontend/templates/events.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "column");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
          return morphs;
        },
        statements: [["inline", "day-component", [], ["selectedYear", ["subexpr", "@mut", [["get", "selectedYear", ["loc", [null, [1, 396], [1, 408]]]]], [], []], "selectedMonth", ["subexpr", "@mut", [["get", "selectedMonth", ["loc", [null, [1, 423], [1, 436]]]]], [], []], "dateNumber", ["subexpr", "@mut", [["get", "date", ["loc", [null, [1, 448], [1, 452]]]]], [], []], "store", ["subexpr", "@mut", [["get", "store", ["loc", [null, [1, 459], [1, 464]]]]], [], []], "openEventsModal", "openEventsModal"], ["loc", [null, [1, 367], [1, 500]]]]],
        locals: ["date"],
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
            "column": 562
          }
        },
        "moduleName": "frontend/templates/events.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui dates-scroller");
        var el3 = dom.createElement("h2");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "angle left icon");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "text");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "angle right icon");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui stackable seven column grid calendar");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [0]);
        var element2 = dom.childAt(element1, [0]);
        var element3 = dom.childAt(element2, [0]);
        var element4 = dom.childAt(element2, [1]);
        var element5 = dom.childAt(element2, [2]);
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element3);
        morphs[1] = dom.createMorphAt(element4, 0, 0);
        morphs[2] = dom.createMorphAt(element4, 2, 2);
        morphs[3] = dom.createElementMorph(element5);
        morphs[4] = dom.createMorphAt(element1, 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[6] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["element", "action", ["decrementMonth"], [], ["loc", [null, [1, 61], [1, 88]]]], ["content", "selectedMonthName", ["loc", [null, [1, 135], [1, 156]]]], ["content", "selectedYear", ["loc", [null, [1, 162], [1, 178]]]], ["element", "action", ["incrementMonth"], [], ["loc", [null, [1, 187], [1, 214]]]], ["content", "days_count", ["loc", [null, [1, 249], [1, 263]]]], ["block", "each", [["get", "dates", ["loc", [null, [1, 330], [1, 335]]]]], [], 0, null, ["loc", [null, [1, 322], [1, 515]]]], ["inline", "partial", ["partials/events-modal"], [], ["loc", [null, [1, 527], [1, 562]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});