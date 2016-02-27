export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 118
          },
          "end": {
            "line": 1,
            "column": 347
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","active item");
        var el2 = dom.createTextNode("Главная");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","item");
        var el2 = dom.createTextNode("Фонды");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","item");
        var el2 = dom.createTextNode("События");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","item");
        var el2 = dom.createTextNode("Контакты");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","item");
        var el2 = dom.createTextNode("Войти");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","item");
        var el2 = dom.createTextNode("Регистрация");
        dom.appendChild(el1, el2);
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
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 567
          },
          "end": {
            "line": 1,
            "column": 688
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","ui success message");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","header");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]),0,0);
        return morphs;
      },
      statements: [
        ["content","flash.message",["loc",[null,[1,659],[1,676]]]]
      ],
      locals: ["flash"],
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
          "column": 2033
        }
      },
      "moduleName": "frontend/templates/application.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","pusher");
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","ui container");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","ui inverted vertical footer segment");
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","ui container");
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","ui stackable inverted divided equal height stackable grid");
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","three wide column");
      var el6 = dom.createElement("h4");
      dom.setAttribute(el6,"class","ui inverted header");
      var el7 = dom.createTextNode("About");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","ui inverted link list");
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" Sitemap");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" Contact Us");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" Religious Ceremonies");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" Gazebo Plans");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","three wide column");
      var el6 = dom.createElement("h4");
      dom.setAttribute(el6,"class","ui inverted header");
      var el7 = dom.createTextNode("Services");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","ui inverted link list");
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" Banana Pre-Order");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" DNA FAQ");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" How To Access");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","http://semantic-ui.com/examples/homepage.html#");
      dom.setAttribute(el7,"class","item");
      var el8 = dom.createTextNode(" Favorite X-Men");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","seven wide column");
      var el6 = dom.createElement("h4");
      dom.setAttribute(el6,"class","ui inverted header");
      var el7 = dom.createTextNode("Footer Header");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("p");
      var el7 = dom.createTextNode("Extra space for a call to action inside the footer that could help re-engage users.");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [2]);
      var morphs = new Array(6);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
      morphs[2] = dom.createMorphAt(element0,0,0);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
      morphs[4] = dom.createMorphAt(element0,2,2);
      morphs[5] = dom.createMorphAt(fragment,3,3,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["inline","navbar-component",[],["openLoginModal","openLoginModal","authenticate","authenticate","invalidateSession","invalidateSession"],["loc",[null,[1,0],[1,118]]]],
      ["block","ui-sidebar",[],["class","inverted vertical menu sidebar left"],0,null,["loc",[null,[1,118],[1,362]]]],
      ["inline","navigation-slider",[],["slider_partial_path",["subexpr","@mut",[["get","slider_partial_path",["loc",[null,[1,422],[1,441]]]]],[],[]],"openLoginModal","openLoginModal","authenticate","authenticate","invalidateSession","invalidateSession"],["loc",[null,[1,382],[1,541]]]],
      ["block","each",[["get","flashMessages.queue",["loc",[null,[1,575],[1,594]]]]],[],1,null,["loc",[null,[1,567],[1,697]]]],
      ["content","outlet",["loc",[null,[1,703],[1,713]]]],
      ["inline","partial",["partials/login-modal"],[],["loc",[null,[1,1999],[1,2033]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));