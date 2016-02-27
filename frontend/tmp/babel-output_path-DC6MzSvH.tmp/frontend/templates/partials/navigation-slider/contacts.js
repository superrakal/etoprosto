define("frontend/templates/partials/navigation-slider/contacts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
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
            "column": 391
          }
        },
        "moduleName": "frontend/templates/partials/navigation-slider/contacts.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "ui header");
        var el2 = dom.createTextNode("Контакты");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Мы знаем, что есть 1000 людей, которые живут по инерции, но это не Вы! Вы хотите сделать свою жизнь более насыщенной и наполненной смыслом.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("А мы делаем агрегатор событий и способов, которые помогут Вам в этом.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("Помогайте другим, находите единомышленников, участвуйте в эксклюзивных ивентах вместе с проектом фонда «Солнечный город» #этопросто");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});