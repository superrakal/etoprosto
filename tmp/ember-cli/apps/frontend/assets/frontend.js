"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'active-model-adapter', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _activeModelAdapter, _emberSimpleAuthMixinsDataAdapterMixin) {
  exports['default'] = _activeModelAdapter['default'].extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    authorizer: 'authorizer:devise',
    namespace: 'api/v1'
  });
});
define('frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'frontend/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _frontendConfigEnvironment) {
  ;
  ;
  ;
  ;
  var App;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  _ember['default'].Route.reopen({
    activate: function activate() {
      this._super();
      return window.scrollTo(0, 0);
    }
  });

  (0, _emberLoadInitializers['default'])(App, _frontendConfigEnvironment['default'].modulePrefix);

  $(function () {
    var token;
    token = $('meta[name="csrf-token"]').attr('content');
    return $.ajaxPrefilter(function (options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
    });
  });

  exports['default'] = App;
});
define('frontend/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, _emberSimpleAuthAuthenticatorsDevise) {
  exports['default'] = _emberSimpleAuthAuthenticatorsDevise['default'].extend({
    key: 'projectx:session',
    serverTokenEndpoint: '/api/v1/authenticate'
  });
});
define('frontend/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, _emberSimpleAuthAuthorizersDevise) {
  exports['default'] = _emberSimpleAuthAuthorizersDevise['default'].extend({});
});
define("frontend/components/bread-crumbs", ["exports", "ember", "ember-breadcrumbs/components/bread-crumbs"], function (exports, _ember, _emberBreadcrumbsComponentsBreadCrumbs) {
  exports["default"] = _emberBreadcrumbsComponentsBreadCrumbs["default"];
});
define('frontend/components/datetimepicker-component', ['exports', 'ember'], function (exports, _ember) {
  var DatetimepickerComponentComponent;

  DatetimepickerComponentComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      return this.$('input').datetimepicker({
        lang: 'ru',
        dayOfWeekStart: 1,
        format: 'd.m.Y H:i',
        onChangeDateTime: (function (_this) {
          return function (data) {
            return _this.set('value', data);
          };
        })(this)
      });
    }
  });

  exports['default'] = DatetimepickerComponentComponent;
});
define('frontend/components/day-component', ['exports', 'ember'], function (exports, _ember) {
  var DayComponentComponent;

  DayComponentComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      var endDate, startDate;
      startDate = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      endDate = moment(startDate).endOf('day');
      return this.set('events', this.get('store').query('event', {
        from: startDate.toDate(),
        to: endDate.toDate()
      }));
    },
    month_observer: (function () {
      var endDate, startDate;
      startDate = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      endDate = moment(startDate).endOf('day');
      return this.set('events', this.get('store').query('event', {
        from: startDate.toDate(),
        to: endDate.toDate()
      }));
    }).observes('selectedMonth', 'selectedYear'),
    events_count: (function () {
      if (this.get('events')) {
        return this.get('events').get('length');
      } else {
        return 0;
      }
    }).property('events', 'events.isFulfilled', 'selectedMonth', 'selectedYear'),
    events_count_string: (function () {
      if (this.get('events_count') > 9) {
        return '9+';
      } else {
        return this.get('events_count');
      }
    }).property('events_count'),
    isToday: (function () {
      var date;
      date = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      return moment().isSame(date, 'day');
    }).property('dateNumber', 'selectedYear', 'selectedMonth'),
    isActualDay: (function () {
      var endDate, startDate;
      startDate = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
      endDate = moment(startDate).endOf('day');
      return !moment().isAfter(endDate);
    }).property('selectedMonth', 'selectedYear'),
    isHaveEvents: (function () {
      return this.get('events_count') > 0;
    }).property('events_count'),
    actions: {
      openEventModal: function openEventModal(events) {
        var day;
        day = moment([this.get('selectedYear'), this.get('selectedMonth'), this.get('dateNumber')]);
        return this.sendAction('openEventsModal', this.get('events'), day);
      }
    }
  });

  exports['default'] = DayComponentComponent;
});
define('frontend/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('frontend/components/head-tag', ['exports', 'ember-cli-meta-tags/components/head-tag'], function (exports, _emberCliMetaTagsComponentsHeadTag) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMetaTagsComponentsHeadTag['default'];
    }
  });
});
define('frontend/components/head-tags', ['exports', 'ember-cli-meta-tags/components/head-tags'], function (exports, _emberCliMetaTagsComponentsHeadTags) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMetaTagsComponentsHeadTags['default'];
    }
  });
});
define('frontend/components/map-component', ['exports', 'ember'], function (exports, _ember) {
  var MapComponentComponent;

  MapComponentComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      var latlng, map, marker;
      map = void 0;
      marker = this.get('marker');
      latlng = JSON.parse(marker);
      return DG.then((function (_this) {
        return function () {
          map = DG.map('map', {
            center: [latlng.lat, latlng.lng],
            zoom: 13
          });
          return DG.marker([latlng.lat, latlng.lng]).addTo(map).bindPopup(_this.get('baloonContent'));
        };
      })(this));
    }
  });

  exports['default'] = MapComponentComponent;
});
define('frontend/components/marker-select', ['exports', 'ember'], function (exports, _ember) {
  var MarkerSelectComponent;

  MarkerSelectComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      var map;
      map = void 0;
      return DG.then((function (_this) {
        return function () {
          map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13
          });
          return map.on('click', function (e) {
            if (_this.get('marker')) {
              _this.get('marker').remove();
            }
            _this.set('marker', DG.marker([e.latlng.lat, e.latlng.lng]).addTo(map));
            _this.get('marker').bindPopup(_this.get('baloonContent'));
            return _this.set('value', JSON.stringify(e.latlng));
          });
        };
      })(this));
    }
  });

  exports['default'] = MarkerSelectComponent;
});
define('frontend/components/navbar-component', ['exports', 'ember'], function (exports, _ember) {
  var NavbarComponentComponent;

  NavbarComponentComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      $('.masthead').visibility({
        once: false,
        onBottomPassed: function onBottomPassed() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function onBottomPassedReverse() {
          $('.fixed.menu').transition('fade out');
        }
      });
      return $('.ui.sidebar').sidebar('attach events', '.toc.item');
    },
    actions: {
      openLoginModal: function openLoginModal() {
        return this.sendAction("openLoginModal");
      },
      authenticate: function authenticate() {
        return this.sendAction("authenticate");
      },
      invalidateSession: function invalidateSession() {
        return this.sendAction("invalidateSession");
      }
    }
  });

  exports['default'] = NavbarComponentComponent;
});
define('frontend/components/navbar-profile', ['exports', 'ember'], function (exports, _ember) {
  var NavbarProfileComponent;

  NavbarProfileComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      return this.$('.ui.dropdown').dropdown();
    },
    actions: {
      invalidateSession: function invalidateSession() {
        return this.sendAction("invalidateSession");
      },
      gotoCabinet: function gotoCabinet() {
        return this.sendAction("changePath", "cabinet");
      }
    }
  });

  exports['default'] = NavbarProfileComponent;
});
define('frontend/components/navigation-slider', ['exports', 'ember'], function (exports, _ember) {
  var NavigationSliderComponent;

  NavigationSliderComponent = _ember['default'].Component.extend({
    partial_base_path: "partials/navigation-slider/",
    didInsertElement: function didInsertElement() {
      return this.set('partial_path', this.get('partial_base_path') + this.get('slider_partial_path'));
    },
    partial_path_observer: (function () {
      return this.set('partial_path', this.get('partial_base_path') + this.get('slider_partial_path'));
    }).observes('slider_partial_path'),
    actions: {
      changePath: function changePath(path) {
        return this.set('slider_partial_path', path);
      },
      openLoginModal: function openLoginModal() {
        return this.sendAction("openLoginModal");
      },
      authenticate: function authenticate() {
        return this.sendAction("authenticate");
      },
      invalidateSession: function invalidateSession() {
        return this.sendAction("invalidateSession");
      }
    }
  });

  exports['default'] = NavigationSliderComponent;
});
define('frontend/components/ui-accordion', ['exports', 'semantic-ui-ember/components/ui-accordion'], function (exports, _semanticUiEmberComponentsUiAccordion) {
  exports['default'] = _semanticUiEmberComponentsUiAccordion['default'];
});
define('frontend/components/ui-checkbox', ['exports', 'semantic-ui-ember/components/ui-checkbox'], function (exports, _semanticUiEmberComponentsUiCheckbox) {
  exports['default'] = _semanticUiEmberComponentsUiCheckbox['default'];
});
define('frontend/components/ui-dropdown-item', ['exports', 'semantic-ui-ember/components/ui-dropdown-item'], function (exports, _semanticUiEmberComponentsUiDropdownItem) {
  exports['default'] = _semanticUiEmberComponentsUiDropdownItem['default'];
});
define('frontend/components/ui-dropdown', ['exports', 'semantic-ui-ember/components/ui-dropdown'], function (exports, _semanticUiEmberComponentsUiDropdown) {
  exports['default'] = _semanticUiEmberComponentsUiDropdown['default'];
});
define('frontend/components/ui-embed', ['exports', 'semantic-ui-ember/components/ui-embed'], function (exports, _semanticUiEmberComponentsUiEmbed) {
  exports['default'] = _semanticUiEmberComponentsUiEmbed['default'];
});
define('frontend/components/ui-modal', ['exports', 'semantic-ui-ember/components/ui-modal'], function (exports, _semanticUiEmberComponentsUiModal) {
  exports['default'] = _semanticUiEmberComponentsUiModal['default'];
});
define('frontend/components/ui-nag', ['exports', 'semantic-ui-ember/components/ui-nag'], function (exports, _semanticUiEmberComponentsUiNag) {
  exports['default'] = _semanticUiEmberComponentsUiNag['default'];
});
define('frontend/components/ui-popup', ['exports', 'semantic-ui-ember/components/ui-popup'], function (exports, _semanticUiEmberComponentsUiPopup) {
  exports['default'] = _semanticUiEmberComponentsUiPopup['default'];
});
define('frontend/components/ui-progress', ['exports', 'semantic-ui-ember/components/ui-progress'], function (exports, _semanticUiEmberComponentsUiProgress) {
  exports['default'] = _semanticUiEmberComponentsUiProgress['default'];
});
define('frontend/components/ui-radio', ['exports', 'semantic-ui-ember/components/ui-radio'], function (exports, _semanticUiEmberComponentsUiRadio) {
  exports['default'] = _semanticUiEmberComponentsUiRadio['default'];
});
define('frontend/components/ui-rating', ['exports', 'semantic-ui-ember/components/ui-rating'], function (exports, _semanticUiEmberComponentsUiRating) {
  exports['default'] = _semanticUiEmberComponentsUiRating['default'];
});
define('frontend/components/ui-search', ['exports', 'semantic-ui-ember/components/ui-search'], function (exports, _semanticUiEmberComponentsUiSearch) {
  exports['default'] = _semanticUiEmberComponentsUiSearch['default'];
});
define('frontend/components/ui-shape', ['exports', 'semantic-ui-ember/components/ui-shape'], function (exports, _semanticUiEmberComponentsUiShape) {
  exports['default'] = _semanticUiEmberComponentsUiShape['default'];
});
define('frontend/components/ui-sidebar', ['exports', 'semantic-ui-ember/components/ui-sidebar'], function (exports, _semanticUiEmberComponentsUiSidebar) {
  exports['default'] = _semanticUiEmberComponentsUiSidebar['default'];
});
define('frontend/components/ui-sticky', ['exports', 'semantic-ui-ember/components/ui-sticky'], function (exports, _semanticUiEmberComponentsUiSticky) {
  exports['default'] = _semanticUiEmberComponentsUiSticky['default'];
});
define('frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  var ApplicationController;

  ApplicationController = _ember['default'].Controller.extend({
    loginError: null,
    slider_partial_path: "root",
    actions: {
      authenticate: function authenticate() {
        var data;
        data = this.getProperties('identification', 'password');
        return this.get('session').authenticate('authenticator:devise', data.identification, data.password).then((function (_this) {
          return function () {
            _this.set('loginError', null);
            return _this.send("closeLoginModal");
          };
        })(this), (function (_this) {
          return function (error) {
            return _this.set('loginError', error.error);
          };
        })(this));
      },
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
        return this.transitionToRoute('root');
      },
      openLoginModal: function openLoginModal() {
        return $('.ui.modal.loginModal').modal('show');
      },
      closeLoginModal: function closeLoginModal() {
        return $('.ui.modal.loginModal').modal('hide');
      }
    }
  });

  exports['default'] = ApplicationController;
});
define('frontend/controllers/contacts', ['exports', 'ember'], function (exports, _ember) {
  var ContactsController;

  ContactsController = _ember['default'].Controller.extend({
    flashMessages: _ember['default'].inject.service(),
    actions: {
      send: function send() {
        return this.get('model').save().then((function (_this) {
          return function () {
            _this.get('flashMessages').success('Ваше сообщение отправлено! Спасибо за участие :)', {
              timeout: 3000
            });
            return _this.set('model', _this.get('store').createRecord('recall'));
          };
        })(this));
      }
    }
  });

  exports['default'] = ContactsController;
});
define('frontend/controllers/event', ['exports', 'ember'], function (exports, _ember) {
  var EventController;

  EventController = _ember['default'].Controller.extend();

  exports['default'] = EventController;
});
define('frontend/controllers/events', ['exports', 'ember'], function (exports, _ember) {
  var EventsController;

  EventsController = _ember['default'].Controller.extend({
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    queryParams: ['year', 'month'],
    modalEvents: null,
    init: function init() {
      this.set('selectedYear', moment().year());
      this.set('selectedMonth', moment().month());
      return this.transitionToRoute({
        queryParams: {
          year: this.get('selectedYear'),
          month: this.get('selectedMonth')
        }
      });
    },
    change_observer: (function () {
      return this.transitionToRoute({
        queryParams: {
          year: this.get('selectedYear'),
          month: this.get('selectedMonth')
        }
      });
    }).observes('selectedYear', 'selectedMonth'),
    dates: (function () {
      var days_count, endDate, i, results, startDate;
      startDate = moment([this.get('selectedMonth'), this.get('selectedMonth')]);
      endDate = moment(startDate).endOf('month');
      days_count = endDate.diff(startDate, 'days') + 1;
      return (function () {
        results = [];
        for (var i = 1; 1 <= days_count ? i <= days_count : i >= days_count; 1 <= days_count ? i++ : i--) {
          results.push(i);
        }
        return results;
      }).apply(this);
    }).property('selectedYear', 'selectedMonth'),
    selectedMonthName: (function () {
      return this.get('months')[this.get('selectedMonth')];
    }).property('selectedMonth'),
    rightEndWord: (function () {
      var cases, number, titles;
      number = this.get('modalEvents.length');
      titles = ['событие', 'события', 'событий'];
      cases = [2, 0, 1, 1, 1, 2];
      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    }).property('modalEvents'),
    actions: {
      incrementMonth: function incrementMonth() {
        var month;
        month = this.get('selectedMonth');
        if (month === 11) {
          this.set('selectedYear', this.get('selectedYear') + 1);
          return this.set('selectedMonth', 0);
        } else {
          return this.set('selectedMonth', this.get('selectedMonth') + 1);
        }
      },
      decrementMonth: function decrementMonth() {
        var month;
        month = this.get('selectedMonth');
        if (month === 0) {
          this.set('selectedYear', this.get('selectedYear') - 1);
          return this.set('selectedMonth', 11);
        } else {
          return this.set('selectedMonth', this.get('selectedMonth') - 1);
        }
      },
      openEventsModal: function openEventsModal(events, day) {
        this.set('modalEvents', events);
        this.set('modalDay', day.format('DD.MM.YYYY'));
        return $('.ui.modal.eventsModal').modal('show');
      },
      closeEventsModal: function closeEventsModal() {
        return $('.ui.modal.eventsModal').modal('hide');
      }
    }
  });

  exports['default'] = EventsController;
});
define('frontend/controllers/new-event', ['exports', 'ember'], function (exports, _ember) {
  var NewEventController;

  NewEventController = _ember['default'].Controller.extend({
    flashMessages: _ember['default'].inject.service(),
    actions: {
      create: function create() {
        return this.get('model').save().then((function (_this) {
          return function () {
            _this.get('flashMessages').success('Ваше событие успешно создано. Спасибо, что Вы с нами!', {
              timeout: 3000
            });
            return _this.transitionToRoute('root');
          };
        })(this));
      }
    }
  });

  exports['default'] = NewEventController;
});
define('frontend/controllers/sign-up', ['exports', 'ember'], function (exports, _ember) {
  var SignUpController;

  SignUpController = _ember['default'].Controller.extend({
    flashMessages: _ember['default'].inject.service(),
    actions: {
      save: function save() {
        return this.get('model').save().then((function (_this) {
          return function () {
            _this.get('flashMessages').success('Ваш аккаунт успешно создан. На Ваш email высланы инструкции по активации', {
              timeout: 3000
            });
            return _this.transitionToRoute('root');
          };
        })(this), (function (_this) {
          return function (response) {
            _this.set('isLoading', false);
            return response.errors.forEach(function (error) {
              return console.log("Backend has returned error: " + error.status + ": " + error.title);
            });
          };
        })(this));
      }
    }
  });

  exports['default'] = SignUpController;
});
define('frontend/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define("frontend/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('frontend/initializers/app-version', ['exports', 'frontend/config/environment', 'ember'], function (exports, _frontendConfigEnvironment, _ember) {

  var classify = _ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        _ember['default'].libraries.register(appName, _frontendConfigEnvironment['default'].APP.version);
        registered = true;
      }
    }
  };
});
define("frontend/initializers/bread-crumbs", ["exports"], function (exports) {
  exports["default"] = {
    name: "ember-breadcrumbs",
    initialize: function initialize(container, app) {
      app.inject("component:bread-crumbs", "router", "router:main");
      app.inject("component:bread-crumbs", "applicationController", "controller:application");
    }
  };
});
define('frontend/initializers/ember-cli-rails-addon-csrf', ['exports', 'ember'], function (exports, _ember) {
  var $ = _ember['default'].$;
  exports['default'] = {
    name: 'ember-cli-rails-addon-csrf',

    initialize: function initialize() {
      $.ajaxPrefilter(function (options, originalOptions, xhr) {
        var token = $('meta[name="csrf-token"]').attr('content');
        xhr.setRequestHeader('X-CSRF-Token', token);
      });
    }
  };
});
define('frontend/initializers/ember-simple-auth', ['exports', 'ember', 'frontend/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _frontendConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _frontendConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _frontendConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('frontend/initializers/flash-messages', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.initialize = initialize;
  var merge = _ember['default'].merge;
  var deprecate = _ember['default'].deprecate;

  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _frontendConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('frontend/initializers/head-tags', ['exports', 'ember', 'ember-cli-meta-tags/instance-initializers/head-tags'], function (exports, _ember, _emberCliMetaTagsInstanceInitializersHeadTags) {
  exports.initialize = initialize;

  if (_ember['default'].Application.instanceInitializer) {
    _ember['default'].Application.instanceInitializer(_emberCliMetaTagsInstanceInitializersHeadTags['default']);
  }

  function initialize() {
    var application = arguments[1] || arguments[0];
    var container = application.__container__;
    application.inject('service:head-tags', 'router', 'router:main');

    // Ember >= 1.12
    if (application.instanceInitializer) {
      return;
    }

    // Ember < 1.12
    _emberCliMetaTagsInstanceInitializersHeadTags['default'].initialize(container);
  }

  exports['default'] = {
    name: 'head-tags',
    initialize: initialize
  };
});
define('frontend/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('frontend/instance-initializers/session', ['exports'], function (exports) {
  exports['default'] = {
    name: "session",

    initialize: function initialize(app) {
      var session = app.container.lookup('service:session');
      window.authorizeUser = function (xhr) {
        session.authorize('authorizer:devise', function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
      };
      app.registry.injection('route', 'session', 'service:session');
      app.registry.injection('controller', 'session', 'service:session');
      app.registry.injection('component', 'session', 'service:session');
    }
  };
});
define('frontend/models/event', ['exports', 'ember-data'], function (exports, _emberData) {
  var Event;

  Event = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    short_description: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    date: _emberData['default'].attr('date'),
    marker: _emberData['default'].attr('string'),
    address: _emberData['default'].attr('string'),
    formattedTime: (function () {
      return moment(this.get('date')).format('HH:mm');
    }).property('date'),
    formattedDate: (function () {
      return moment(this.get('date')).format('DD.MM.YYYY');
    }).property('date'),
    baloonContent: (function () {
      return '<br><p>' + this.get('title') + '</p><br><p>Дата:&nbsp;' + moment(this.get('date')).format('DD.MM.YYYY') + '</p><br><p>Время:&nbsp;' + this.get('formattedTime') + '</p>';
    }).property('title', 'date')
  });

  exports['default'] = Event;
});
define('frontend/models/faq-question', ['exports', 'ember-data'], function (exports, _emberData) {
  var FaqQuestion;

  FaqQuestion = _emberData['default'].Model.extend({
    question: _emberData['default'].attr('string'),
    answer: _emberData['default'].attr('string')
  });

  exports['default'] = FaqQuestion;
});
define('frontend/models/recall', ['exports', 'ember-data'], function (exports, _emberData) {
  var Recall;

  Recall = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    message: _emberData['default'].attr('string')
  });

  exports['default'] = Recall;
});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  var User;

  User = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    first_name: _emberData['default'].attr('string'),
    second_name: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    password_confirmation: _emberData['default'].attr('string'),
    avatar_url: _emberData['default'].attr('string')
  });

  exports['default'] = User;
});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  var Router;

  Router = _ember['default'].Router.extend({
    location: _frontendConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('root', {
      path: '/'
    });
    this.route('sign-up');
    this.route('cabinet', {
      path: '/cabinet/:id'
    });
    this.route('new-event', {
      path: '/events/new'
    });
    this.route('event', {
      path: '/event/:id'
    });
    this.route('events');
    return this.route('contacts');
  });

  exports['default'] = Router;
});
define('frontend/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend();
});
define('frontend/routes/cabinet', ['exports', 'ember'], function (exports, _ember) {
  var CabinetRoute;

  CabinetRoute = _ember['default'].Route.extend();

  exports['default'] = CabinetRoute;
});
define('frontend/routes/contacts', ['exports', 'ember'], function (exports, _ember) {
  var ContactsRoute;

  ContactsRoute = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.store.findAll('faq-question');
      return this.controllerFor('application').set('slider_partial_path', "contacts");
    },
    model: function model() {
      return this.store.createRecord('recall');
    },
    setupController: function setupController(controller, model) {
      controller.set('faq-questions', this.store.peekAll('faq-question'));
      return controller.set('model', model);
    }
  });

  exports['default'] = ContactsRoute;
});
define('frontend/routes/event', ['exports', 'ember'], function (exports, _ember) {
  var EventRoute;

  EventRoute = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.controllerFor('application').set('slider_partial_path', "event");
    },
    model: function model(params) {
      return this.store.find('event', params.id);
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = EventRoute;
});
define('frontend/routes/events', ['exports', 'ember'], function (exports, _ember) {
  var EventsRoute;

  EventsRoute = _ember['default'].Route.extend({
    queryParams: {
      year: {
        refreshModel: true
      },
      month: {
        refreshModel: true
      }
    },
    beforeModel: function beforeModel() {
      return this.controllerFor('application').set('slider_partial_path', "events");
    }
  });

  exports['default'] = EventsRoute;
});
define('frontend/routes/new-event', ['exports', 'ember'], function (exports, _ember) {
  var NewEventRoute;

  NewEventRoute = _ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('event');
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = NewEventRoute;
});
define('frontend/routes/root', ['exports', 'ember'], function (exports, _ember) {
  var RootRoute;

  RootRoute = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.controllerFor('application').set('slider_partial_path', "root");
    }
  });

  exports['default'] = RootRoute;
});
define('frontend/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  var SignUpRoute;

  SignUpRoute = _ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('user');
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = SignUpRoute;
});
define('frontend/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('frontend/services/head-tags', ['exports', 'ember-cli-meta-tags/services/head-tags'], function (exports, _emberCliMetaTagsServicesHeadTags) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMetaTagsServicesHeadTags['default'];
    }
  });
});
define('frontend/services/session', ['exports', 'ember', 'ember-data', 'ember-simple-auth/services/session'], function (exports, _ember, _emberData, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({
    store: _ember['default'].inject.service(),

    authorizeUser: _ember['default'].computed('data.authenticated.id', function () {
      var _this = this;
      return function (xhr) {
        _this.authorize('authorizer:devise', function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
      };
    }),

    currentUser: _ember['default'].computed('data.authenticated.id', function () {
      var userId = this.get('data.authenticated.id');
      if (!_ember['default'].isEmpty(userId)) {
        var currUser = this.get('data.authenticated');
        var user = _emberData['default'].PromiseObject.create({
          promise: this.get('store').find('user', userId).then(function (user) {
            currUser.login = user.get('email');
            return user;
          })
        });
        user['catch']((function (_this) {
          return function () {
            _this.invalidate();
            window.location.href = '/';
          };
        })(this));
        return user;
      } else {
        return null;
      }
    }),

    reloadUser: function reloadUser() {
      var userId = this.get('data.authenticated.user_id');
      var currUser = this.get('data.authenticated');

      this.get('store').findRecord('user', userId, { reload: true }).then(function (user) {
        currUser.login = user.get('email') || user.get('mobile');
        return user;
      });
    }
  });
});
define('frontend/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 177
              },
              "end": {
                "line": 1,
                "column": 216
              }
            },
            "moduleName": "frontend/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Главная");
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
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 228
              },
              "end": {
                "line": 1,
                "column": 269
              }
            },
            "moduleName": "frontend/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("События");
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
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 281
              },
              "end": {
                "line": 1,
                "column": 325
              }
            },
            "moduleName": "frontend/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Контакты");
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
      })();
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
              "column": 337
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
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["root"], ["class", "item"], 0, null, ["loc", [null, [1, 177], [1, 228]]]], ["block", "link-to", ["events"], ["class", "item"], 1, null, ["loc", [null, [1, 228], [1, 281]]]], ["block", "link-to", ["contacts"], ["class", "item"], 2, null, ["loc", [null, [1, 281], [1, 337]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 557
            },
            "end": {
              "line": 1,
              "column": 678
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
          dom.setAttribute(el1, "class", "ui success message");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "header");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]), 0, 0);
          return morphs;
        },
        statements: [["content", "flash.message", ["loc", [null, [1, 649], [1, 666]]]]],
        locals: ["flash"],
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
            "column": 1125
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
        dom.setAttribute(el1, "class", "pusher");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui container");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui inverted vertical footer segment");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "ui container");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui stackable inverted divided equal height stackable grid");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "seven wide column");
        var el6 = dom.createElement("h4");
        dom.setAttribute(el6, "class", "ui inverted header");
        var el7 = dom.createTextNode("Команда создателей");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("Ангелина Иванова - Teamleader");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("Егор Топольняк - Разработчик (FrontEnd + BackEnd)");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createTextNode("Сергей Беленицкий - Дизайнер");
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(element0, 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[4] = dom.createMorphAt(element0, 2, 2);
        morphs[5] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "navbar-component", [], ["openLoginModal", "openLoginModal", "authenticate", "authenticate", "invalidateSession", "invalidateSession"], ["loc", [null, [1, 0], [1, 118]]]], ["block", "ui-sidebar", [], ["class", "inverted vertical menu sidebar left"], 0, null, ["loc", [null, [1, 118], [1, 352]]]], ["inline", "navigation-slider", [], ["slider_partial_path", ["subexpr", "@mut", [["get", "slider_partial_path", ["loc", [null, [1, 412], [1, 431]]]]], [], []], "openLoginModal", "openLoginModal", "authenticate", "authenticate", "invalidateSession", "invalidateSession"], ["loc", [null, [1, 372], [1, 531]]]], ["block", "each", [["get", "flashMessages.queue", ["loc", [null, [1, 565], [1, 584]]]]], [], 1, null, ["loc", [null, [1, 557], [1, 687]]]], ["content", "outlet", ["loc", [null, [1, 693], [1, 703]]]], ["inline", "partial", ["partials/login-modal"], [], ["loc", [null, [1, 1091], [1, 1125]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("frontend/templates/cabinet", ["exports"], function (exports) {
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
            "column": 10
          }
        },
        "moduleName": "frontend/templates/cabinet.hbs"
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/bread-crumbs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.0.3",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 6,
                    "column": 10
                  },
                  "end": {
                    "line": 8,
                    "column": 10
                  }
                },
                "moduleName": "frontend/templates/components/bread-crumbs.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["content", "crumb.label", ["loc", [null, [7, 12], [7, 27]]]]],
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
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 9,
                  "column": 8
                }
              },
              "moduleName": "frontend/templates/components/bread-crumbs.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "link-to", [["get", "crumb.path", ["loc", [null, [6, 21], [6, 31]]]], ["get", "crumb.model", ["loc", [null, [6, 32], [6, 43]]]]], [], 0, null, ["loc", [null, [6, 10], [8, 22]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@2.0.3",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 10,
                    "column": 10
                  },
                  "end": {
                    "line": 12,
                    "column": 10
                  }
                },
                "moduleName": "frontend/templates/components/bread-crumbs.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["content", "crumb.label", ["loc", [null, [11, 12], [11, 27]]]]],
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
                  "line": 9,
                  "column": 8
                },
                "end": {
                  "line": 13,
                  "column": 8
                }
              },
              "moduleName": "frontend/templates/components/bread-crumbs.hbs"
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
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "link-to", [["get", "crumb.path", ["loc", [null, [10, 21], [10, 31]]]]], [], 0, null, ["loc", [null, [10, 10], [12, 22]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 6
              }
            },
            "moduleName": "frontend/templates/components/bread-crumbs.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "crumb.model", ["loc", [null, [5, 14], [5, 25]]]]], [], 0, 1, ["loc", [null, [5, 8], [13, 15]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 16,
                "column": 6
              }
            },
            "moduleName": "frontend/templates/components/bread-crumbs.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "crumb.label", ["loc", [null, [15, 8], [15, 23]]]]],
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
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 18,
              "column": 2
            }
          },
          "moduleName": "frontend/templates/components/bread-crumbs.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "class", ["subexpr", "if", [["get", "crumb.isCurrent", ["loc", [null, [3, 19], [3, 34]]]], "current"], [], ["loc", [null, [3, 14], [3, 46]]]]], ["block", "if", [["get", "crumb.linkable", ["loc", [null, [4, 12], [4, 26]]]]], [], 0, 1, ["loc", [null, [4, 6], [16, 13]]]]],
        locals: ["crumb"],
        templates: [child0, child1]
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
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/bread-crumbs.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "breadcrumbs");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "breadCrumbs", ["loc", [null, [2, 10], [2, 21]]]]], [], 0, null, ["loc", [null, [2, 2], [18, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/datetimepicker-component", ["exports"], function (exports) {
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
            "column": 39
          }
        },
        "moduleName": "frontend/templates/components/datetimepicker-component.hbs"
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [1, 29], [1, 37]]]]], [], []]], ["loc", [null, [1, 0], [1, 39]]]]],
      locals: [],
      templates: []
    };
  })());
});
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
              "column": 113
            },
            "end": {
              "line": 1,
              "column": 264
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
        statements: [["element", "action", ["openEventModal"], [], ["loc", [null, [1, 136], [1, 163]]]], ["content", "events_count_string", ["loc", [null, [1, 234], [1, 257]]]]],
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
            "column": 395
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
      statements: [["attribute", "class", ["concat", ["day ", ["subexpr", "if", [["get", "isHaveEvents", ["loc", [null, [1, 21], [1, 33]]]], "active"], [], ["loc", [null, [1, 16], [1, 44]]]], " ", ["subexpr", "if", [["get", "isActualDay", ["loc", [null, [1, 50], [1, 61]]]], "default", "muted"], [], ["loc", [null, [1, 45], [1, 81]]]]]]], ["block", "if", [["get", "isHaveEvents", ["loc", [null, [1, 119], [1, 131]]]]], [], 0, null, ["loc", [null, [1, 113], [1, 271]]]], ["attribute", "class", ["concat", ["number text-center ", ["subexpr", "if", [["get", "isActualDay", ["loc", [null, [1, 313], [1, 324]]]], "default", "muted"], [], ["loc", [null, [1, 308], [1, 344]]]], " ", ["subexpr", "if", [["get", "isToday", ["loc", [null, [1, 350], [1, 357]]]], "today"], [], ["loc", [null, [1, 345], [1, 367]]]]]]], ["content", "dateNumber", ["loc", [null, [1, 369], [1, 383]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/map-component", ["exports"], function (exports) {
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
            "column": 20
          }
        },
        "moduleName": "frontend/templates/components/map-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "map");
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
define("frontend/templates/components/marker-select", ["exports"], function (exports) {
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
            "column": 53
          }
        },
        "moduleName": "frontend/templates/components/marker-select.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "marker-select");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "map");
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
define("frontend/templates/components/navbar-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 70
            },
            "end": {
              "line": 1,
              "column": 109
            }
          },
          "moduleName": "frontend/templates/components/navbar-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Главная");
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
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 146
            },
            "end": {
              "line": 1,
              "column": 187
            }
          },
          "moduleName": "frontend/templates/components/navbar-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("События");
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
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 199
            },
            "end": {
              "line": 1,
              "column": 243
            }
          },
          "moduleName": "frontend/templates/components/navbar-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Контакты");
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
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 279
            },
            "end": {
              "line": 1,
              "column": 366
            }
          },
          "moduleName": "frontend/templates/components/navbar-component.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["inline", "navbar-profile", [], ["invalidateSession", "invalidateSession"], ["loc", [null, [1, 310], [1, 366]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 474
              },
              "end": {
                "line": 1,
                "column": 525
              }
            },
            "moduleName": "frontend/templates/components/navbar-component.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Регистрация");
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
      })();
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 366
            },
            "end": {
              "line": 1,
              "column": 543
            }
          },
          "moduleName": "frontend/templates/components/navbar-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "item");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "class", "ui button");
          var el3 = dom.createTextNode("Войти");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "item");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0, 0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["openLoginModal"], [], ["loc", [null, [1, 395], [1, 422]]]], ["block", "link-to", ["sign-up"], ["class", "ui button"], 0, null, ["loc", [null, [1, 474], [1, 537]]]]],
        locals: [],
        templates: [child0]
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
            "column": 568
          }
        },
        "moduleName": "frontend/templates/components/navbar-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui large top fixed hidden menu");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui container");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "item");
        var el4 = dom.createTextNode("Фонды");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "right menu");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 0]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 0, 0);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [4]), 0, 0);
        return morphs;
      },
      statements: [["block", "link-to", ["root"], ["class", "item"], 0, null, ["loc", [null, [1, 70], [1, 121]]]], ["block", "link-to", ["events"], ["class", "item"], 1, null, ["loc", [null, [1, 146], [1, 199]]]], ["block", "link-to", ["contacts"], ["class", "item"], 2, null, ["loc", [null, [1, 199], [1, 255]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [1, 285], [1, 308]]]]], [], 3, 4, ["loc", [null, [1, 279], [1, 550]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("frontend/templates/components/navbar-profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
          dom.setAttribute(el1, "class", "icon user");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Кабинет");
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
        dom.setAttribute(el1, "class", "ui dropdown inline");
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "class", "ui avatar image");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "dropdown icon");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "menu");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "item");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "item");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "sign out icon");
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
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createMorphAt(element3, 0, 0);
        morphs[5] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [["attribute", "src", ["get", "session.currentUser.avatar_url", ["loc", [null, [1, 41], [1, 71]]]]], ["content", "session.currentUser.first_name", ["loc", [null, [1, 98], [1, 132]]]], ["content", "session.currentUser.second_name", ["loc", [null, [1, 138], [1, 173]]]], ["element", "action", ["gotoCabinet"], [], ["loc", [null, [1, 225], [1, 249]]]], ["block", "link-to", ["cabinet", ["get", "session.currentUser.id", ["loc", [null, [1, 284], [1, 306]]]]], ["tagName", "span"], 0, null, ["loc", [null, [1, 263], [1, 367]]]], ["element", "action", ["invalidateSession"], [], ["loc", [null, [1, 378], [1, 408]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/components/navigation-slider", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 399
            },
            "end": {
              "line": 1,
              "column": 482
            }
          },
          "moduleName": "frontend/templates/components/navigation-slider.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("Главная");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["element", "action", ["changePath", "root"], [], ["loc", [null, [1, 437], [1, 467]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 519
            },
            "end": {
              "line": 1,
              "column": 606
            }
          },
          "moduleName": "frontend/templates/components/navigation-slider.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("События");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["element", "action", ["changePath", "events"], [], ["loc", [null, [1, 559], [1, 591]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 618
            },
            "end": {
              "line": 1,
              "column": 710
            }
          },
          "moduleName": "frontend/templates/components/navigation-slider.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("Контакты");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "action", ["changePath", "contacts"], [], ["loc", [null, [1, 660], [1, 694]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 746
            },
            "end": {
              "line": 1,
              "column": 857
            }
          },
          "moduleName": "frontend/templates/components/navigation-slider.hbs"
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
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["inline", "navbar-profile", [], ["invalidateSession", "invalidateSession", "changePath", "changePath"], ["loc", [null, [1, 777], [1, 857]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 942
              },
              "end": {
                "line": 1,
                "column": 1002
              }
            },
            "moduleName": "frontend/templates/components/navigation-slider.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Регистрация");
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
      })();
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 857
            },
            "end": {
              "line": 1,
              "column": 1014
            }
          },
          "moduleName": "frontend/templates/components/navigation-slider.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "ui inverted button");
          var el2 = dom.createTextNode("Войти");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["element", "action", ["openLoginModal"], [], ["loc", [null, [1, 873], [1, 900]]]], ["block", "link-to", ["sign-up"], ["class", "ui inverted button"], 0, null, ["loc", [null, [1, 942], [1, 1014]]]]],
        locals: [],
        templates: [child0]
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
            "column": 1102
          }
        },
        "moduleName": "frontend/templates/components/navigation-slider.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui inverted vertical masthead center aligned segment");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "top-menu");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "site-logo");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "logo-wrapper");
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "hashtag");
        var el6 = dom.createTextNode("#");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "this");
        var el6 = dom.createTextNode("это");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "logo");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "simple");
        var el6 = dom.createTextNode("просто");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "ui container");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui large secondary inverted pointing menu");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "toc item");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "sidebar icon");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "item");
        var el6 = dom.createTextNode("Фонды");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "right item");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui text");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [0]);
        var element5 = dom.childAt(element4, [0, 1, 0]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element5, 1, 1);
        morphs[1] = dom.createMorphAt(element5, 3, 3);
        morphs[2] = dom.createMorphAt(element5, 4, 4);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [5]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [1]), 0, 0);
        return morphs;
      },
      statements: [["block", "link-to", ["root"], ["class", "item"], 0, null, ["loc", [null, [1, 399], [1, 494]]]], ["block", "link-to", ["events"], ["class", "item"], 1, null, ["loc", [null, [1, 519], [1, 618]]]], ["block", "link-to", ["contacts"], ["class", "item"], 2, null, ["loc", [null, [1, 618], [1, 722]]]], ["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [1, 752], [1, 775]]]]], [], 3, 4, ["loc", [null, [1, 746], [1, 1021]]]], ["inline", "partial", [["get", "partial_path", ["loc", [null, [1, 1076], [1, 1088]]]]], [], ["loc", [null, [1, 1066], [1, 1090]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("frontend/templates/components/ui-checkbox", ["exports"], function (exports) {
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
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/ui-checkbox.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("input");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        if (this.cachedFragment) {
          dom.repairClonedNode(element0, [], true);
        }
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element0, 'type');
        morphs[1] = dom.createAttrMorph(element0, 'name');
        morphs[2] = dom.createAttrMorph(element0, 'checked');
        morphs[3] = dom.createAttrMorph(element0, 'disabled');
        morphs[4] = dom.createAttrMorph(element0, 'data-id');
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "type", ["get", "type", ["loc", [null, [1, 14], [1, 18]]]]], ["attribute", "name", ["get", "name", ["loc", [null, [1, 28], [1, 32]]]]], ["attribute", "checked", ["get", "checked", ["loc", [null, [1, 45], [1, 52]]]]], ["attribute", "disabled", ["get", "readonly", ["loc", [null, [1, 66], [1, 74]]]]], ["attribute", "data-id", ["get", "data-id", ["loc", [null, [1, 87], [1, 94]]]]], ["content", "label", ["loc", [null, [2, 7], [2, 16]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/ui-dropdown", ["exports"], function (exports) {
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
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/ui-dropdown.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/ui-modal", ["exports"], function (exports) {
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
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/ui-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/components/ui-radio", ["exports"], function (exports) {
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
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/ui-radio.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("input");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        if (this.cachedFragment) {
          dom.repairClonedNode(element0, [], true);
        }
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element0, 'type');
        morphs[1] = dom.createAttrMorph(element0, 'name');
        morphs[2] = dom.createAttrMorph(element0, 'checked');
        morphs[3] = dom.createAttrMorph(element0, 'disabled');
        morphs[4] = dom.createAttrMorph(element0, 'data-id');
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "type", ["get", "type", ["loc", [null, [1, 14], [1, 18]]]]], ["attribute", "name", ["get", "name", ["loc", [null, [1, 28], [1, 32]]]]], ["attribute", "checked", ["get", "checked", ["loc", [null, [1, 45], [1, 52]]]]], ["attribute", "disabled", ["get", "readonly", ["loc", [null, [1, 66], [1, 74]]]]], ["attribute", "data-id", ["get", "data-id", ["loc", [null, [1, 87], [1, 94]]]]], ["content", "label", ["loc", [null, [2, 7], [2, 16]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/contacts", ["exports"], function (exports) {
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
        dom.setAttribute(el1, "class", "ui container");
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "class", "center");
        var el3 = dom.createTextNode("Напишите нам!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "ui form");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "two fields");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Email");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Имя");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Сообщение");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "ui button");
        var el5 = dom.createTextNode("Отправить");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "icon phone");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("(383) 208-11-17");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "icon mail");
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
        dom.setAttribute(el3, "href", "http://suncitylife.ru");
        dom.setAttribute(el3, "target", "_blank");
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
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [0]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["send"], ["on", "submit"], ["loc", [null, [1, 69], [1, 98]]]], ["inline", "input", [], ["placeholder", "user@example.com", "type", "email", "required", true, "value", ["subexpr", "@mut", [["get", "model.email", ["loc", [null, [1, 250], [1, 261]]]]], [], []]], ["loc", [null, [1, 178], [1, 263]]]], ["inline", "input", [], ["placeholder", "Иван", "type", "text", "required", true, "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [1, 365], [1, 375]]]]], [], []]], ["loc", [null, [1, 306], [1, 377]]]], ["inline", "textarea", [], ["rows", "2", "value", ["subexpr", "@mut", [["get", "model.message", ["loc", [null, [1, 458], [1, 471]]]]], [], []]], ["loc", [null, [1, 432], [1, 473]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/event", ["exports"], function (exports) {
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
            "column": 615
          }
        },
        "moduleName": "frontend/templates/event.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui container event-wrapper");
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Описание:");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        dom.setAttribute(el2, "class", "ui horizontal divider header");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "tag icon");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "additions");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "address");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "icon marker");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "date");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "icon calendar");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "date");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "icon clock");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        dom.setAttribute(el2, "class", "ui horizontal divider header");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "tag icon");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "map-component");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [4]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [2]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [0]), 2, 2);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [2]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [6]), 0, 0);
        return morphs;
      },
      statements: [["content", "model.title", ["loc", [null, [1, 44], [1, 59]]]], ["content", "model.description", ["loc", [null, [1, 85], [1, 106]]]], ["content", "model.address", ["loc", [null, [1, 257], [1, 274]]]], ["content", "model.formattedDate", ["loc", [null, [1, 327], [1, 350]]]], ["content", "model.formattedTime", ["loc", [null, [1, 400], [1, 423]]]], ["inline", "map-component", [], ["baloonContent", ["subexpr", "@mut", [["get", "model.baloonContent", ["loc", [null, [1, 562], [1, 581]]]]], [], []], "marker", ["subexpr", "@mut", [["get", "model.marker", ["loc", [null, [1, 589], [1, 601]]]]], [], []]], ["loc", [null, [1, 532], [1, 603]]]]],
      locals: [],
      templates: []
    };
  })());
});
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
define("frontend/templates/new-event", ["exports"], function (exports) {
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
            "column": 940
          }
        },
        "moduleName": "frontend/templates/new-event.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui container");
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "class", "center");
        var el3 = dom.createTextNode("Создание события");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "ui form");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "two fields");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Название");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Дата и время проведения");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Место проведения");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Краткое описание");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Описание");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "ui button");
        var el5 = dom.createTextNode("Отправить");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [0]);
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [0]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [2]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [4]), 0, 0);
        return morphs;
      },
      statements: [["element", "action", ["create"], ["on", "submit"], ["loc", [null, [1, 72], [1, 103]]]], ["inline", "input", [], ["placeholder", "Примерное название", "type", "text", "required", true, "value", ["subexpr", "@mut", [["get", "model.title", ["loc", [null, [1, 259], [1, 270]]]]], [], []]], ["loc", [null, [1, 186], [1, 272]]]], ["inline", "datetimepicker-component", [], ["value", ["subexpr", "@mut", [["get", "model.date", ["loc", [null, [1, 368], [1, 378]]]]], [], []], "required", true], ["loc", [null, [1, 335], [1, 394]]]], ["inline", "input", [], ["type", "text", "required", true, "value", ["subexpr", "@mut", [["get", "model.address", ["loc", [null, [1, 496], [1, 509]]]]], [], []]], ["loc", [null, [1, 456], [1, 511]]]], ["inline", "input", [], ["type", "text", "required", true, "value", ["subexpr", "@mut", [["get", "model.short_description", ["loc", [null, [1, 607], [1, 630]]]]], [], []]], ["loc", [null, [1, 567], [1, 632]]]], ["inline", "textarea", [], ["rows", "2", "value", ["subexpr", "@mut", [["get", "model.description", ["loc", [null, [1, 706], [1, 723]]]]], [], []]], ["loc", [null, [1, 680], [1, 725]]]], ["inline", "marker-select", [], ["value", ["subexpr", "@mut", [["get", "model.title", ["loc", [null, [1, 772], [1, 783]]]]], [], []], "value", ["subexpr", "@mut", [["get", "model.marker", ["loc", [null, [1, 790], [1, 802]]]]], [], []], "baloonContent", ["subexpr", "@mut", [["get", "model.baloonContent", ["loc", [null, [1, 817], [1, 836]]]]], [], []]], ["loc", [null, [1, 750], [1, 838]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("frontend/templates/partials/events-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 179
              },
              "end": {
                "line": 1,
                "column": 279
              }
            },
            "moduleName": "frontend/templates/partials/events-modal.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "pull-right");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element3 = dom.childAt(fragment, [0]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element3, 0, 0);
            morphs[1] = dom.createMorphAt(element3, 2, 2);
            return morphs;
          },
          statements: [["content", "modalEvents.length", ["loc", [null, [1, 229], [1, 251]]]], ["content", "rightEndWord", ["loc", [null, [1, 257], [1, 273]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.0.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 1,
                  "column": 603
                },
                "end": {
                  "line": 1,
                  "column": 714
                }
              },
              "moduleName": "frontend/templates/partials/events-modal.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createElement("button");
              dom.setAttribute(el1, "class", "ui button");
              var el2 = dom.createTextNode("Перейти к событию");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [0]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element0);
              return morphs;
            },
            statements: [["element", "action", ["closeEventsModal"], [], ["loc", [null, [1, 640], [1, 669]]]]],
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
                "column": 313
              },
              "end": {
                "line": 1,
                "column": 738
              }
            },
            "moduleName": "frontend/templates/partials/events-modal.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "event");
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "head");
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "title pull-left");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "time pull-right");
            var el4 = dom.createElement("i");
            dom.setAttribute(el4, "class", "icon time");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "short_description");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "link");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [0]);
            var element2 = dom.childAt(element1, [0]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(dom.childAt(element2, [0]), 0, 0);
            morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
            morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
            morphs[3] = dom.createMorphAt(dom.childAt(element1, [2]), 0, 0);
            return morphs;
          },
          statements: [["content", "event.title", ["loc", [null, [1, 411], [1, 426]]]], ["content", "event.formattedTime", ["loc", [null, [1, 486], [1, 509]]]], ["content", "event.short_description", ["loc", [null, [1, 552], [1, 579]]]], ["block", "link-to", ["event", ["get", "event.id", ["loc", [null, [1, 622], [1, 630]]]]], [], 0, null, ["loc", [null, [1, 603], [1, 726]]]]],
          locals: ["event"],
          templates: [child0]
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
              "column": 765
            }
          },
          "moduleName": "frontend/templates/partials/events-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "ui middle aligned grid");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "column");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "ui header");
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "pull-left");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "content");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [0, 0]);
          var element5 = dom.childAt(element4, [0]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element5, [0]), 0, 0);
          morphs[1] = dom.createMorphAt(element5, 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element4, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "modalDay", ["loc", [null, [1, 161], [1, 173]]]], ["block", "if", [["get", "modalEvents.length", ["loc", [null, [1, 185], [1, 203]]]]], [], 0, null, ["loc", [null, [1, 179], [1, 286]]]], ["block", "each", [["get", "modalEvents", ["loc", [null, [1, 321], [1, 332]]]]], [], 1, null, ["loc", [null, [1, 313], [1, 747]]]]],
        locals: [],
        templates: [child0, child1]
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
            "column": 778
          }
        },
        "moduleName": "frontend/templates/partials/events-modal.hbs"
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "ui-modal", [], ["name", "events-modal", "class", "small eventsModal"], 0, null, ["loc", [null, [1, 0], [1, 778]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/partials/login-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 810
              },
              "end": {
                "line": 1,
                "column": 890
              }
            },
            "moduleName": "frontend/templates/partials/login-modal.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("Создайте аккаунт");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [0]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "action", ["closeLoginModal"], [], ["loc", [null, [1, 838], [1, 866]]]]],
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
              "column": 920
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
          dom.setAttribute(el1, "class", "ui middle aligned center aligned grid");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "column");
          var el3 = dom.createElement("h2");
          dom.setAttribute(el3, "class", "ui teal image header");
          var el4 = dom.createElement("img");
          dom.setAttribute(el4, "src", "assets/images/logo.png");
          dom.setAttribute(el4, "class", "image");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "content");
          var el4 = dom.createTextNode("Войдите в свой аккаунт");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("form");
          dom.setAttribute(el3, "class", "ui large form");
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "form-errors");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "ui stacked segment");
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "field");
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "ui left icon input");
          var el7 = dom.createElement("i");
          dom.setAttribute(el7, "class", "user icon");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "field");
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "ui left icon input");
          var el7 = dom.createElement("i");
          dom.setAttribute(el7, "class", "lock icon");
          dom.appendChild(el6, el7);
          var el7 = dom.createComment("");
          dom.appendChild(el6, el7);
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "ui fluid large blue submit button");
          var el6 = dom.createTextNode("Войти");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "ui message");
          var el4 = dom.createTextNode("Впервые с нами? ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [0, 0]);
          var element2 = dom.childAt(element1, [2]);
          var element3 = dom.childAt(element2, [1]);
          var element4 = dom.childAt(element3, [2]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [0]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element3, [0, 0]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element3, [1, 0]), 1, 1);
          morphs[3] = dom.createElementMorph(element4);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
          return morphs;
        },
        statements: [["content", "loginError", ["loc", [null, [1, 316], [1, 330]]]], ["inline", "input", [], ["type", "email", "placeholder", "Email", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [1, 491], [1, 505]]]]], [], []]], ["loc", [null, [1, 444], [1, 507]]]], ["inline", "input", [], ["type", "password", "placeholder", "Пароль", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [1, 646], [1, 654]]]]], [], []]], ["loc", [null, [1, 595], [1, 656]]]], ["element", "action", ["authenticate"], [], ["loc", [null, [1, 673], [1, 698]]]], ["block", "link-to", ["sign-up"], [], 0, null, ["loc", [null, [1, 810], [1, 902]]]]],
        locals: [],
        templates: [child0]
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
            "column": 933
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
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "ui-modal", [], ["name", "login-modal", "class", "small loginModal"], 0, null, ["loc", [null, [1, 0], [1, 933]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("frontend/templates/partials/navigation-slider/cabinet", ["exports"], function (exports) {
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
            "column": 175
          }
        },
        "moduleName": "frontend/templates/partials/navigation-slider/cabinet.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "ui inverted header");
        var el2 = dom.createTextNode("Cabinet");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Do whatever you want when you want to.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui huge primary button");
        var el2 = dom.createTextNode("Get Started");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "right arrow icon");
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
define("frontend/templates/partials/navigation-slider/event", ["exports"], function (exports) {
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
            "column": 0
          }
        },
        "moduleName": "frontend/templates/partials/navigation-slider/event.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
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
define("frontend/templates/partials/navigation-slider/events", ["exports"], function (exports) {
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
            "column": 174
          }
        },
        "moduleName": "frontend/templates/partials/navigation-slider/events.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "ui inverted header");
        var el2 = dom.createTextNode("Events");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Do whatever you want when you want to.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui huge primary button");
        var el2 = dom.createTextNode("Get Started");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "right arrow icon");
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
define("frontend/templates/partials/navigation-slider/root", ["exports"], function (exports) {
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
            "column": 185
          }
        },
        "moduleName": "frontend/templates/partials/navigation-slider/root.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "ui inverted header");
        var el2 = dom.createTextNode("Imagine-a-Company");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Do whatever you want when you want to.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui huge primary button");
        var el2 = dom.createTextNode("Get Started");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "right arrow icon");
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
define("frontend/templates/root", ["exports"], function (exports) {
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
            "column": 1967
          }
        },
        "moduleName": "frontend/templates/root.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui vertical stripe segment");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui middle aligned stackable grid container");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "eight wide column");
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5, "class", "ui header");
        var el6 = dom.createTextNode("We Help Companies and Companions");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h3");
        dom.setAttribute(el5, "class", "ui header");
        var el6 = dom.createTextNode("We Make Bananas That Can Dance");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "six wide right floated column");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "center aligned column");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "ui huge button");
        var el6 = dom.createTextNode("Check Them Out");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui vertical stripe quote segment");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui equal width stackable internally celled grid");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "center aligned row");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "column");
        var el5 = dom.createElement("h3");
        var el6 = dom.createTextNode("\"What a Company\"");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("That is what they all say about us");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "column");
        var el5 = dom.createElement("h3");
        var el6 = dom.createTextNode("\"I shouldn't have gone with their competitor.\"");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createElement("b");
        var el7 = dom.createTextNode("Nan");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Chief Fun Officer Acme Toys");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui vertical stripe segment");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "ui text container");
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "ui header");
        var el4 = dom.createTextNode("Breaking The Grid, Grabs Your Attention");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "ui large button");
        var el4 = dom.createTextNode("Read More");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "class", "ui horizontal header divider");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "http://semantic-ui.com/examples/homepage.html#");
        var el5 = dom.createTextNode(" Case Studies");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "ui header");
        var el4 = dom.createTextNode("Did We Tell You About Our Bananas?");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Yes I know you probably disregarded the earlier boasts as non-sequitor filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "ui large button");
        var el4 = dom.createTextNode("I'm Still Quite Interested");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
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
define("frontend/templates/sign-up", ["exports"], function (exports) {
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
        dom.setAttribute(el1, "class", "ui container");
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Регистрация");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "ui form");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Email");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Имя");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Фамилия");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Пароль");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Подтверждение пароля");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "submit");
        dom.setAttribute(el3, "class", "ui button");
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
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [0]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [2]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [4]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["save"], ["on", "submit"], ["loc", [null, [1, 52], [1, 81]]]], ["inline", "input", [], ["placeholder", "user@example.com", "type", "email", "value", ["subexpr", "@mut", [["get", "model.email", ["loc", [null, [1, 195], [1, 206]]]]], [], []], "required", true], ["loc", [null, [1, 137], [1, 222]]]], ["inline", "input", [], ["placeholder", "Иван", "type", "text", "value", ["subexpr", "@mut", [["get", "model.first_name", ["loc", [null, [1, 310], [1, 326]]]]], [], []], "required", true], ["loc", [null, [1, 265], [1, 342]]]], ["inline", "input", [], ["placeholder", "Иванов", "type", "text", "value", ["subexpr", "@mut", [["get", "model.second_name", ["loc", [null, [1, 436], [1, 453]]]]], [], []], "required", true], ["loc", [null, [1, 389], [1, 469]]]], ["inline", "input", [], ["type", "password", "value", ["subexpr", "@mut", [["get", "model.password", ["loc", [null, [1, 545], [1, 559]]]]], [], []], "required", true, "class", "password"], ["loc", [null, [1, 515], [1, 592]]]], ["inline", "input", [], ["type", "password", "value", ["subexpr", "@mut", [["get", "model.password_confirmation", ["loc", [null, [1, 682], [1, 709]]]]], [], []], "required", true, "class", "password"], ["loc", [null, [1, 652], [1, 742]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0.493df104"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"browserify":{"tests":true}}};
});

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0.493df104"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map