export default Ember.HTMLBars.template((function() {
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
          "column": 826
        }
      },
      "moduleName": "frontend/templates/sign-up.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","ui container");
      var el2 = dom.createElement("h2");
      var el3 = dom.createTextNode("Регистрация");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("form");
      dom.setAttribute(el2,"class","ui form");
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("label");
      var el5 = dom.createTextNode("Email");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("label");
      var el5 = dom.createTextNode("Имя");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("label");
      var el5 = dom.createTextNode("Фамилия");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("label");
      var el5 = dom.createTextNode("Пароль");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("label");
      var el5 = dom.createTextNode("Подтверждение пароля");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"type","submit");
      dom.setAttribute(el3,"class","ui button");
      var el4 = dom.createTextNode(" Создать аккаунт");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 1]);
      var morphs = new Array(6);
      morphs[0] = dom.createElementMorph(element0);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [0]),1,1);
      morphs[2] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [2]),1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
      morphs[5] = dom.createMorphAt(dom.childAt(element0, [4]),1,1);
      return morphs;
    },
    statements: [
      ["element","action",["save"],["on","submit"],["loc",[null,[1,52],[1,81]]]],
      ["inline","input",[],["placeholder","user@example.com","type","email","value",["subexpr","@mut",[["get","model.email",["loc",[null,[1,195],[1,206]]]]],[],[]],"required",true],["loc",[null,[1,137],[1,222]]]],
      ["inline","input",[],["placeholder","Иван","type","text","value",["subexpr","@mut",[["get","model.first_name",["loc",[null,[1,310],[1,326]]]]],[],[]],"required",true],["loc",[null,[1,265],[1,342]]]],
      ["inline","input",[],["placeholder","Иванов","type","text","value",["subexpr","@mut",[["get","model.second_name",["loc",[null,[1,436],[1,453]]]]],[],[]],"required",true],["loc",[null,[1,389],[1,469]]]],
      ["inline","input",[],["type","password","value",["subexpr","@mut",[["get","model.password",["loc",[null,[1,545],[1,559]]]]],[],[]],"required",true,"class","password"],["loc",[null,[1,515],[1,592]]]],
      ["inline","input",[],["type","password","value",["subexpr","@mut",[["get","model.password_confirmation",["loc",[null,[1,682],[1,709]]]]],[],[]],"required",true,"class","password"],["loc",[null,[1,652],[1,742]]]]
    ],
    locals: [],
    templates: []
  };
}()));