export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
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
            "column": 855
          }
        },
        "moduleName": "frontend/templates/partials/login-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","ui middle aligned center aligned grid");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","column");
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3,"class","ui teal image header");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","assets/images/logo.png");
        dom.setAttribute(el4,"class","image");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","content");
        var el4 = dom.createTextNode("Войдите в свой аккаунт");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","ui large form");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","form-errors");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","ui stacked segment");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","field");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","ui left icon input");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","user icon");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","field");
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","ui left icon input");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7,"class","lock icon");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","ui fluid large blue submit button");
        var el6 = dom.createTextNode("Войти");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","ui message");
        var el4 = dom.createTextNode("Впервые с нами?");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode(" Создайте аккаунт");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0, 2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [2]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [0, 0]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1, 0]),1,1);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [
        ["content","loginError",["loc",[null,[1,316],[1,330]]]],
        ["inline","input",[],["type","email","placeholder","Email","value",["subexpr","@mut",[["get","identification",["loc",[null,[1,491],[1,505]]]]],[],[]]],["loc",[null,[1,444],[1,507]]]],
        ["inline","input",[],["type","password","placeholder","Пароль","value",["subexpr","@mut",[["get","password",["loc",[null,[1,646],[1,654]]]]],[],[]]],["loc",[null,[1,595],[1,656]]]],
        ["element","action",["authenticate"],[],["loc",[null,[1,673],[1,698]]]]
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
          "column": 868
        }
      },
      "moduleName": "frontend/templates/partials/login-modal.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","ui-modal",[],["name","login-modal","class","small loginModal"],0,null,["loc",[null,[1,0],[1,868]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));