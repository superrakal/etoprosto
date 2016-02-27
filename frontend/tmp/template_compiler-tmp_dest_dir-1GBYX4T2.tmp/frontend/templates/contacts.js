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
          "column": 824
        }
      },
      "moduleName": "frontend/templates/contacts.hbs"
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","ui container");
      var el2 = dom.createElement("h2");
      dom.setAttribute(el2,"class","center");
      var el3 = dom.createTextNode("Напишите нам!");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("form");
      dom.setAttribute(el2,"class","ui form");
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","two fields");
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","field");
      var el5 = dom.createElement("label");
      var el6 = dom.createTextNode("Email");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","field");
      var el5 = dom.createElement("label");
      var el6 = dom.createTextNode("Имя");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("label");
      var el5 = dom.createTextNode("Сообщение");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","field");
      var el4 = dom.createElement("button");
      dom.setAttribute(el4,"type","submit");
      dom.setAttribute(el4,"class","ui button");
      var el5 = dom.createTextNode("Отправить");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h3");
      var el3 = dom.createElement("i");
      dom.setAttribute(el3,"class","icon phone");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("(383) 208-11-17");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h3");
      var el3 = dom.createElement("i");
      dom.setAttribute(el3,"class","icon mail");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("etoprosto@yandex.ru");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("p");
      var el3 = dom.createTextNode("Организатор Детский благотворительный фонд «Солнечный город»");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h4");
      var el3 = dom.createElement("a");
      dom.setAttribute(el3,"href","http://suncitylife.ru");
      dom.setAttribute(el3,"target","_blank");
      var el4 = dom.createTextNode("www.suncitylife.ru");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 1]);
      var element1 = dom.childAt(element0, [0]);
      var morphs = new Array(4);
      morphs[0] = dom.createElementMorph(element0);
      morphs[1] = dom.createMorphAt(dom.childAt(element1, [0]),1,1);
      morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
      return morphs;
    },
    statements: [
      ["element","action",["send"],["on","submit"],["loc",[null,[1,69],[1,98]]]],
      ["inline","input",[],["placeholder","user@example.com","type","email","required",true,"value",["subexpr","@mut",[["get","model.email",["loc",[null,[1,250],[1,261]]]]],[],[]]],["loc",[null,[1,178],[1,263]]]],
      ["inline","input",[],["placeholder","Иван","type","text","required",true,"value",["subexpr","@mut",[["get","model.name",["loc",[null,[1,365],[1,375]]]]],[],[]]],["loc",[null,[1,306],[1,377]]]],
      ["inline","textarea",[],["rows","2","value",["subexpr","@mut",[["get","model.message",["loc",[null,[1,458],[1,471]]]]],[],[]]],["loc",[null,[1,432],[1,473]]]]
    ],
    locals: [],
    templates: []
  };
}()));