export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 263
          },
          "end": {
            "line": 1,
            "column": 355
          }
        },
        "moduleName": "frontend/templates/components/navbar-profile.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","icon user");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("Кабинет");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
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
          "column": 472
        }
      },
      "moduleName": "frontend/templates/components/navbar-profile.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("a");
      dom.setAttribute(el1,"class","ui dropdown inline");
      var el2 = dom.createElement("img");
      dom.setAttribute(el2,"class","ui avatar image");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode(" ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("i");
      dom.setAttribute(el2,"class","dropdown icon");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","menu");
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","item");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","item");
      var el4 = dom.createElement("i");
      dom.setAttribute(el4,"class","sign out icon");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("Выход");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [0]);
      var element2 = dom.childAt(element0, [5]);
      var element3 = dom.childAt(element2, [0]);
      var element4 = dom.childAt(element2, [1]);
      var morphs = new Array(6);
      morphs[0] = dom.createAttrMorph(element1, 'src');
      morphs[1] = dom.createMorphAt(element0,1,1);
      morphs[2] = dom.createMorphAt(element0,3,3);
      morphs[3] = dom.createElementMorph(element3);
      morphs[4] = dom.createMorphAt(element3,0,0);
      morphs[5] = dom.createElementMorph(element4);
      return morphs;
    },
    statements: [
      ["attribute","src",["get","session.currentUser.avatar_url",["loc",[null,[1,41],[1,71]]]]],
      ["content","session.currentUser.first_name",["loc",[null,[1,98],[1,132]]]],
      ["content","session.currentUser.second_name",["loc",[null,[1,138],[1,173]]]],
      ["element","action",["gotoCabinet"],[],["loc",[null,[1,225],[1,249]]]],
      ["block","link-to",["cabinet",["get","session.currentUser.id",["loc",[null,[1,284],[1,306]]]]],["tagName","span"],0,null,["loc",[null,[1,263],[1,367]]]],
      ["element","action",["invalidateSession"],[],["loc",[null,[1,378],[1,408]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));