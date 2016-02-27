define('active-model-adapter/active-model-adapter', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  'use strict';

  var InvalidError = _emberData['default'].InvalidError;
  var errorsHashToArray = _emberData['default'].errorsHashToArray;
  var RESTAdapter = _emberData['default'].RESTAdapter;
  var _Ember$String = _ember['default'].String;
  var pluralize = _Ember$String.pluralize;
  var decamelize = _Ember$String.decamelize;
  var underscore = _Ember$String.underscore;

  /**
    @module ember-data
  */

  /**
    The ActiveModelAdapter is a subclass of the RESTAdapter designed to integrate
    with a JSON API that uses an underscored naming convention instead of camelCasing.
    It has been designed to work out of the box with the
    [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
    Ruby gem. This Adapter expects specific settings using ActiveModel::Serializers,
    `embed :ids, embed_in_root: true` which sideloads the records.
  
    This adapter extends the DS.RESTAdapter by making consistent use of the camelization,
    decamelization and pluralization methods to normalize the serialized JSON into a
    format that is compatible with a conventional Rails backend and Ember Data.
  
    ## JSON Structure
  
    The ActiveModelAdapter expects the JSON returned from your server to follow
    the REST adapter conventions substituting underscored keys for camelcased ones.
  
    Unlike the DS.RESTAdapter, async relationship keys must be the singular form
    of the relationship name, followed by "_id" for DS.belongsTo relationships,
    or "_ids" for DS.hasMany relationships.
  
    ### Conventional Names
  
    Attribute names in your JSON payload should be the underscored versions of
    the attributes in your Ember.js models.
  
    For example, if you have a `Person` model:
  
    ```js
    App.FamousPerson = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```
  
    The JSON returned should look like this:
  
    ```js
    {
      "famous_person": {
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation": "President"
      }
    }
    ```
  
    Let's imagine that `Occupation` is just another model:
  
    ```js
    App.Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.belongsTo('occupation')
    });
  
    App.Occupation = DS.Model.extend({
      name: DS.attr('string'),
      salary: DS.attr('number'),
      people: DS.hasMany('person')
    });
    ```
  
    The JSON needed to avoid extra server calls, should look like this:
  
    ```js
    {
      "people": [{
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation_id": 1
      }],
  
      "occupations": [{
        "id": 1,
        "name": "President",
        "salary": 100000,
        "person_ids": [1]
      }]
    }
    ```
  
    @class ActiveModelAdapter
    @constructor
    @namespace DS
    @extends DS.RESTAdapter
  **/

  var ActiveModelAdapter = RESTAdapter.extend({
    defaultSerializer: '-active-model',
    /**
      The ActiveModelAdapter overrides the `pathForType` method to build
      underscored URLs by decamelizing and pluralizing the object type name.
       ```js
        this.pathForType("famousPerson");
        //=> "famous_people"
      ```
       @method pathForType
      @param {String} modelName
      @return String
    */
    pathForType: function pathForType(modelName) {
      var decamelized = decamelize(modelName);
      var underscored = underscore(decamelized);
      return pluralize(underscored);
    },

    /**
      The ActiveModelAdapter overrides the `handleResponse` method
      to format errors passed to a DS.InvalidError for all
      422 Unprocessable Entity responses.
       A 422 HTTP response from the server generally implies that the request
      was well formed but the API was unable to process it because the
      content was not semantically correct or meaningful per the API.
       For more information on 422 HTTP Error code see 11.2 WebDAV RFC 4918
      https://tools.ietf.org/html/rfc4918#section-11.2
       @method ajaxError
      @param {Object} jqXHR
      @return error
    */
    handleResponse: function handleResponse(status, headers, payload) {
      if (this.isInvalid(status, headers, payload)) {
        var errors = errorsHashToArray(payload.errors);

        return new InvalidError(errors);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

  exports['default'] = ActiveModelAdapter;
});
define('active-model-adapter/active-model-serializer', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  'use strict';

  /**
    @module ember-data
   */

  var _Ember$String = _ember['default'].String;
  var singularize = _Ember$String.singularize;
  var classify = _Ember$String.classify;
  var decamelize = _Ember$String.decamelize;
  var camelize = _Ember$String.camelize;
  var underscore = _Ember$String.underscore;
  var RESTSerializer = _emberData['default'].RESTSerializer;
  var normalizeModelName = _emberData['default'].normalizeModelName;

  /**
    The ActiveModelSerializer is a subclass of the RESTSerializer designed to integrate
    with a JSON API that uses an underscored naming convention instead of camelCasing.
    It has been designed to work out of the box with the
    [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
    Ruby gem. This Serializer expects specific settings using ActiveModel::Serializers,
    `embed :ids, embed_in_root: true` which sideloads the records.
  
    This serializer extends the DS.RESTSerializer by making consistent
    use of the camelization, decamelization and pluralization methods to
    normalize the serialized JSON into a format that is compatible with
    a conventional Rails backend and Ember Data.
  
    ## JSON Structure
  
    The ActiveModelSerializer expects the JSON returned from your server
    to follow the REST adapter conventions substituting underscored keys
    for camelcased ones.
  
    ### Conventional Names
  
    Attribute names in your JSON payload should be the underscored versions of
    the attributes in your Ember.js models.
  
    For example, if you have a `Person` model:
  
    ```js
    App.FamousPerson = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```
  
    The JSON returned should look like this:
  
    ```js
    {
      "famous_person": {
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation": "President"
      }
    }
    ```
  
    Let's imagine that `Occupation` is just another model:
  
    ```js
    App.Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.belongsTo('occupation')
    });
  
    App.Occupation = DS.Model.extend({
      name: DS.attr('string'),
      salary: DS.attr('number'),
      people: DS.hasMany('person')
    });
    ```
  
    The JSON needed to avoid extra server calls, should look like this:
  
    ```js
    {
      "people": [{
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation_id": 1
      }],
  
      "occupations": [{
        "id": 1,
        "name": "President",
        "salary": 100000,
        "person_ids": [1]
      }]
    }
    ```
  
    @class ActiveModelSerializer
    @namespace DS
    @extends DS.RESTSerializer
  */
  var ActiveModelSerializer = RESTSerializer.extend({
    // SERIALIZE

    /**
      Converts camelCased attributes to underscored when serializing.
       @method keyForAttribute
      @param {String} attribute
      @return String
    */
    keyForAttribute: function keyForAttribute(attr) {
      return decamelize(attr);
    },

    /**
      Underscores relationship names and appends "_id" or "_ids" when serializing
      relationship keys.
       @method keyForRelationship
      @param {String} relationshipModelName
      @param {String} kind
      @return String
    */
    keyForRelationship: function keyForRelationship(relationshipModelName, kind) {
      var key = decamelize(relationshipModelName);
      if (kind === "belongsTo") {
        return key + "_id";
      } else if (kind === "hasMany") {
        return singularize(key) + "_ids";
      } else {
        return key;
      }
    },

    /**
     `keyForLink` can be used to define a custom key when deserializing link
     properties. The `ActiveModelSerializer` camelizes link keys by default.
      @method keyForLink
     @param {String} key
     @param {String} kind `belongsTo` or `hasMany`
     @return {String} normalized key
    */
    keyForLink: function keyForLink(key, relationshipKind) {
      return camelize(key);
    },

    /*
      Does not serialize hasMany relationships by default.
    */
    serializeHasMany: function serializeHasMany() {},

    /**
     Underscores the JSON root keys when serializing.
       @method payloadKeyFromModelName
      @param {String} modelName
      @return {String}
    */
    payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
      return underscore(decamelize(modelName));
    },

    /**
      Serializes a polymorphic type as a fully capitalized model name.
       @method serializePolymorphicType
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializePolymorphicType: function serializePolymorphicType(snapshot, json, relationship) {
      var key = relationship.key;
      var belongsTo = snapshot.belongsTo(key);
      var jsonKey = underscore(key + "_type");

      if (_ember['default'].isNone(belongsTo)) {
        json[jsonKey] = null;
      } else {
        json[jsonKey] = classify(belongsTo.modelName).replace('/', '::');
      }
    },

    /**
      Add extra step to `DS.RESTSerializer.normalize` so links are normalized.
       If your payload looks like:
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "flagged_comments": "api/comments/flagged" }
        }
      }
      ```
       The normalized version would look like this
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "flaggedComments": "api/comments/flagged" }
        }
      }
      ```
       @method normalize
      @param {subclass of DS.Model} typeClass
      @param {Object} hash
      @param {String} prop
      @return Object
    */
    normalize: function normalize(typeClass, hash, prop) {
      this.normalizeLinks(hash);
      return this._super(typeClass, hash, prop);
    },

    /**
      Convert `snake_cased` links  to `camelCase`
       @method normalizeLinks
      @param {Object} data
    */

    normalizeLinks: function normalizeLinks(data) {
      if (data.links) {
        var links = data.links;

        for (var link in links) {
          var camelizedLink = camelize(link);

          if (camelizedLink !== link) {
            links[camelizedLink] = links[link];
            delete links[link];
          }
        }
      }
    },

    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      modelClass.eachRelationship(function (key, relationshipMeta) {
        var relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, "deserialize");

        // prefer the format the AMS gem expects, e.g.:
        // relationship: {id: id, type: type}
        if (relationshipMeta.options.polymorphic) {
          extractPolymorphicRelationships(key, relationshipMeta, resourceHash, relationshipKey);
        }
        // If the preferred format is not found, use {relationship_name_id, relationship_name_type}
        if (resourceHash.hasOwnProperty(relationshipKey) && typeof resourceHash[relationshipKey] !== 'object') {
          var polymorphicTypeKey = this.keyForRelationship(key) + '_type';
          if (resourceHash[polymorphicTypeKey] && relationshipMeta.options.polymorphic) {
            var id = resourceHash[relationshipKey];
            var type = resourceHash[polymorphicTypeKey];
            delete resourceHash[polymorphicTypeKey];
            delete resourceHash[relationshipKey];
            resourceHash[relationshipKey] = { id: id, type: type };
          }
        }
      }, this);
      return this._super.apply(this, arguments);
    },

    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      var convertedFromRubyModule = singularize(key.replace('::', '/'));
      return normalizeModelName(convertedFromRubyModule);
    }
  });

  function extractPolymorphicRelationships(key, relationshipMeta, resourceHash, relationshipKey) {
    var polymorphicKey = decamelize(key);
    var hash = resourceHash[polymorphicKey];
    if (hash !== null && typeof hash === 'object') {
      resourceHash[relationshipKey] = hash;
    }
  }

  exports['default'] = ActiveModelSerializer;
});
define('active-model-adapter/index', ['exports', 'active-model-adapter/active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, _activeModelAdapterActiveModelAdapter, _activeModelAdapterActiveModelSerializer) {
  'use strict';

  exports['default'] = _activeModelAdapterActiveModelAdapter['default'];
  exports.ActiveModelAdapter = _activeModelAdapterActiveModelAdapter['default'];
  exports.ActiveModelSerializer = _activeModelAdapterActiveModelSerializer['default'];
});
define('active-model-adapter', ['active-model-adapter/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

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
define('ember-breadcrumbs', ['ember-breadcrumbs/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-app-version', ['ember-cli-app-version/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-content-security-policy', ['ember-cli-content-security-policy/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-dotenv', ['ember-cli-dotenv/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-flash/components/flash-message', ['exports', 'ember', 'ember-cli-flash/templates/components/flash-message', 'ember-new-computed'], function (exports, _ember, _emberCliFlashTemplatesComponentsFlashMessage, _emberNewComputed) {
  'use strict';

  var _Ember$String = _ember['default'].String;
  var classify = _Ember$String.classify;
  var htmlSafe = _Ember$String.htmlSafe;
  var Component = _ember['default'].Component;
  var getWithDefault = _ember['default'].getWithDefault;
  var run = _ember['default'].run;
  var on = _ember['default'].on;
  var _get = _ember['default'].get;
  var set = _ember['default'].set;
  var readOnly = _emberNewComputed['default'].readOnly;
  var bool = _emberNewComputed['default'].bool;
  var next = run.next;
  var cancel = run.cancel;

  exports['default'] = Component.extend({
    layout: _emberCliFlashTemplatesComponentsFlashMessage['default'],
    active: false,
    messageStyle: 'bootstrap',
    classNameBindings: ['alertType', 'active', 'exiting'],

    showProgressBar: readOnly('flash.showProgress'),
    exiting: readOnly('flash.exiting'),
    hasBlock: bool('template').readOnly(),

    alertType: (0, _emberNewComputed['default'])('flash.type', {
      get: function get() {
        var flashType = getWithDefault(this, 'flash.type', '');
        var messageStyle = getWithDefault(this, 'messageStyle', '');
        var prefix = 'alert alert-';

        if (messageStyle === 'foundation') {
          prefix = 'alert-box ';
        }

        return '' + prefix + flashType;
      }
    }),

    flashType: (0, _emberNewComputed['default'])('flash.type', {
      get: function get() {
        var flashType = getWithDefault(this, 'flash.type', '');

        return classify(flashType);
      }
    }),

    _setActive: on('didInsertElement', function () {
      var _this = this;

      var pendingSet = next(this, function () {
        set(_this, 'active', true);
      });
      set(this, 'pendingSet', pendingSet);
    }),

    progressDuration: (0, _emberNewComputed['default'])('flash.showProgress', {
      get: function get() {
        if (!_get(this, 'flash.showProgress')) {
          return false;
        }

        var duration = getWithDefault(this, 'flash.timeout', 0);

        return htmlSafe('transition-duration: ' + duration + 'ms');
      }
    }),

    click: function click() {
      this._destroyFlashMessage();
    },

    willDestroy: function willDestroy() {
      this._super();
      this._destroyFlashMessage();
      cancel(_get(this, 'pendingSet'));
    },

    // private
    _destroyFlashMessage: function _destroyFlashMessage() {
      var flash = getWithDefault(this, 'flash', false);

      if (flash) {
        flash.destroyMessage();
      }
    }
  });
});
define('ember-cli-flash/flash/object', ['exports', 'ember', 'ember-cli-flash/utils/computed', 'ember-new-computed'], function (exports, _ember, _emberCliFlashUtilsComputed, _emberNewComputed) {
  'use strict';

  var EmberObject = _ember['default'].Object;
  var _Ember$run = _ember['default'].run;
  var later = _Ember$run.later;
  var cancel = _Ember$run.cancel;
  var Evented = _ember['default'].Evented;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var readOnly = _emberNewComputed['default'].readOnly;

  exports['default'] = EmberObject.extend(Evented, {
    timer: null,
    exitTimer: null,
    exiting: false,

    queue: readOnly('flashService.queue'),
    totalTimeout: _emberCliFlashUtilsComputed['default'].add('timeout', 'extendedTimeout').readOnly(),
    _guid: _emberCliFlashUtilsComputed['default'].guidFor('message').readOnly(),

    init: function init() {
      this._super.apply(this, arguments);

      if (get(this, 'sticky')) {
        return;
      }

      this._setTimer('exitTimer', 'exitMessage', get(this, 'timeout'));
      this._setTimer('timer', 'destroyMessage', get(this, 'totalTimeout'));
    },

    destroyMessage: function destroyMessage() {
      var queue = get(this, 'queue');

      if (queue) {
        queue.removeObject(this);
      }

      this.destroy();
      this.trigger('didDestroyMessage');
    },

    exitMessage: function exitMessage() {
      set(this, 'exiting', true);

      this._cancelTimer('exitTimer');
      this.trigger('didExitMessage');
    },

    willDestroy: function willDestroy() {
      var _this = this;

      var timers = ['timer', 'exitTimer'];

      timers.forEach(function (timer) {
        _this._cancelTimer(timer);
      });

      this._super.apply(this, arguments);
    },

    // private
    _setTimer: function _setTimer(name, methodName, timeout) {
      return set(this, name, later(this, methodName, timeout));
    },

    _cancelTimer: function _cancelTimer(name) {
      var timer = get(this, name);

      if (timer) {
        cancel(timer);
        set(this, name, null);
      }
    }
  });
});
define('ember-cli-flash/services/flash-messages', ['exports', 'ember', 'ember-cli-flash/flash/object', 'ember-cli-flash/utils/object-without', 'ember-new-computed'], function (exports, _ember, _emberCliFlashFlashObject, _emberCliFlashUtilsObjectWithout, _emberNewComputed) {
  'use strict';

  var Service = _ember['default'].Service;
  var assert = _ember['default'].assert;
  var copy = _ember['default'].copy;
  var getWithDefault = _ember['default'].getWithDefault;
  var isNone = _ember['default'].isNone;
  var merge = _ember['default'].merge;
  var setProperties = _ember['default'].setProperties;
  var typeOf = _ember['default'].typeOf;
  var warn = _ember['default'].warn;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var classify = _ember['default'].String.classify;
  var emberArray = _ember['default'].A;
  var equal = _emberNewComputed['default'].equal;
  var sort = _emberNewComputed['default'].sort;
  var mapBy = _emberNewComputed['default'].mapBy;

  exports['default'] = Service.extend({
    isEmpty: equal('queue.length', 0).readOnly(),
    _guids: mapBy('queue', '_guid').readOnly(),

    arrangedQueue: sort('queue', function (a, b) {
      if (a.priority < b.priority) {
        return 1;
      } else if (a.priority > b.priority) {
        return -1;
      }
      return 0;
    }).readOnly(),

    init: function init() {
      this._super.apply(this, arguments);
      this._setDefaults();
      this.queue = emberArray();
    },

    add: function add() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this._enqueue(this._newFlashMessage(options));

      return this;
    },

    clearMessages: function clearMessages() {
      var flashes = get(this, 'queue');

      if (isNone(flashes)) {
        return;
      }

      flashes.clear();

      return this;
    },

    registerTypes: function registerTypes() {
      var _this = this;

      var types = arguments.length <= 0 || arguments[0] === undefined ? emberArray() : arguments[0];

      types.forEach(function (type) {
        return _this._registerType(type);
      });

      return this;
    },

    _newFlashMessage: function _newFlashMessage() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      assert('The flash message cannot be empty.', options.message);

      var flashService = this;
      var allDefaults = getWithDefault(this, 'flashMessageDefaults', {});
      var defaults = (0, _emberCliFlashUtilsObjectWithout['default'])(allDefaults, ['types', 'injectionFactories', 'preventDuplicates']);

      var flashMessageOptions = merge(copy(defaults), { flashService: flashService });

      for (var key in options) {
        var value = get(options, key);
        var option = this._getOptionOrDefault(key, value);

        set(flashMessageOptions, key, option);
      }

      return _emberCliFlashFlashObject['default'].create(flashMessageOptions);
    },

    _getOptionOrDefault: function _getOptionOrDefault(key, value) {
      var defaults = getWithDefault(this, 'flashMessageDefaults', {});
      var defaultOption = get(defaults, key);

      if (typeOf(value) === 'undefined') {
        return defaultOption;
      }

      return value;
    },

    _setDefaults: function _setDefaults() {
      var defaults = getWithDefault(this, 'flashMessageDefaults', {});

      for (var key in defaults) {
        var classifiedKey = classify(key);
        var defaultKey = 'default' + classifiedKey;

        set(this, defaultKey, defaults[key]);
      }

      this.registerTypes(getWithDefault(this, 'defaultTypes', emberArray()));
    },

    _registerType: function _registerType(type) {
      var _this2 = this;

      assert('The flash type cannot be undefined', type);

      this[type] = function (message) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var flashMessageOptions = copy(options);
        setProperties(flashMessageOptions, { message: message, type: type });

        return _this2.add(flashMessageOptions);
      };
    },

    _hasDuplicate: function _hasDuplicate(guid) {
      return get(this, '_guids').contains(guid);
    },

    _enqueue: function _enqueue(flashInstance) {
      var preventDuplicates = get(this, 'defaultPreventDuplicates');
      var guid = get(flashInstance, '_guid');

      if (preventDuplicates && this._hasDuplicate(guid)) {
        warn('Attempting to add a duplicate message to the Flash Messages Service', false, {
          id: 'ember-cli-flash.duplicate-message'
        });
        return;
      }

      return get(this, 'queue').pushObject(flashInstance);
    }
  });
});
define("ember-cli-flash/templates/components/flash-message", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
          "moduleName": "modules/ember-cli-flash/templates/components/flash-message.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["inline", "yield", [["get", "this", ["loc", [null, [2, 10], [2, 14]]]], ["get", "flash", ["loc", [null, [2, 15], [2, 20]]]]], [], ["loc", [null, [2, 2], [2, 22]]]]],
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
                "line": 5,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "modules/ember-cli-flash/templates/components/flash-message.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "alert-progress");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "alert-progressBar");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'style');
            return morphs;
          },
          statements: [["attribute", "style", ["get", "progressDuration", ["loc", [null, [7, 45], [7, 61]]]]]],
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
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "modules/ember-cli-flash/templates/components/flash-message.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["content", "flash.message", ["loc", [null, [4, 2], [4, 19]]]], ["block", "if", [["get", "showProgressBar", ["loc", [null, [5, 8], [5, 23]]]]], [], 0, null, ["loc", [null, [5, 2], [9, 9]]]]],
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
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "modules/ember-cli-flash/templates/components/flash-message.hbs"
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
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [10, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('ember-cli-flash/utils/computed', ['exports', 'ember', 'ember-new-computed'], function (exports, _ember, _emberNewComputed) {
  'use strict';

  exports.add = add;
  exports.guidFor = guidFor;

  var typeOf = _ember['default'].typeOf;
  var _get = _ember['default'].get;
  var emberGuidFor = _ember['default'].guidFor;
  var emberArray = _ember['default'].A;

  function add() {
    for (var _len = arguments.length, dependentKeys = Array(_len), _key = 0; _key < _len; _key++) {
      dependentKeys[_key] = arguments[_key];
    }

    var computedFunc = (0, _emberNewComputed['default'])({
      get: function get() {
        var _this = this;

        var values = dependentKeys.map(function (dependentKey) {
          var value = _get(_this, dependentKey);

          if (typeOf(value) !== 'number') {
            return;
          }

          return value;
        });

        return emberArray(values).compact().reduce(function (prev, curr) {
          return prev + curr;
        });
      }
    });

    return computedFunc.property.apply(computedFunc, dependentKeys);
  }

  function guidFor(dependentKey) {
    return (0, _emberNewComputed['default'])(dependentKey, {
      get: function get() {
        var value = _get(this, dependentKey);

        return emberGuidFor(value);
      }
    });
  }
});
define('ember-cli-flash/utils/object-compact', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = objectCompact;

  var isPresent = _ember['default'].isPresent;

  function objectCompact(objectInstance) {
    var compactedObject = {};

    for (var key in objectInstance) {
      var value = objectInstance[key];

      if (isPresent(value)) {
        compactedObject[key] = value;
      }
    }

    return compactedObject;
  }
});
define("ember-cli-flash/utils/object-only", ["exports"], function (exports) {
  "use strict";

  exports["default"] = objectWithout;

  function objectWithout() {
    var originalObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var keysToRemain = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var newObj = {};

    for (var key in originalObj) {
      if (keysToRemain.indexOf(key) !== -1) {
        newObj[key] = originalObj[key];
      }
    }

    return newObj;
  }
});
define("ember-cli-flash/utils/object-without", ["exports"], function (exports) {
  "use strict";

  exports["default"] = objectWithout;

  function objectWithout() {
    var originalObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var keysToRemove = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var newObj = {};

    for (var key in originalObj) {
      if (keysToRemove.indexOf(key) === -1) {
        newObj[key] = originalObj[key];
      }
    }

    return newObj;
  }
});
define('ember-cli-flash', ['ember-cli-flash/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-cli-meta-tags/components/head-tag', ['exports', 'ember', 'ember-cli-meta-tags/templates/components/head-tag'], function (exports, _ember, _emberCliMetaTagsTemplatesComponentsHeadTag) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    layout: _emberCliMetaTagsTemplatesComponentsHeadTag['default'],

    _setTagName: _ember['default'].on('init', function () {
      this.set('tagName', this.get('headTag.type'));
    }),

    // expected head tag attributes
    attributeBindings: ['href', 'target', 'charset', 'crossorigin', 'hreflang', 'media', 'rel', 'rev', 'sizes', 'type', 'content', 'http-equiv', 'name', 'scheme', 'async', 'defer', 'src', 'property', 'itemprop'],
    href: _ember['default'].computed.reads('headTag.attrs.href'),
    target: _ember['default'].computed.reads('headTag.attrs.target'),
    charset: _ember['default'].computed.reads('headTag.attrs.charset'),
    crossorigin: _ember['default'].computed.reads('headTag.attrs.crossorigin'),
    hreflang: _ember['default'].computed.reads('headTag.attrs.hreflang'),
    media: _ember['default'].computed.reads('headTag.attrs.media'),
    rel: _ember['default'].computed.reads('headTag.attrs.rel'),
    rev: _ember['default'].computed.reads('headTag.attrs.rev'),
    sizes: _ember['default'].computed.reads('headTag.attrs.sizes'),
    type: _ember['default'].computed.reads('headTag.attrs.type'),
    content: _ember['default'].computed.reads('headTag.attrs.content'),
    'http-equiv': _ember['default'].computed.reads('headTag.attrs.http-equiv'),
    name: _ember['default'].computed.reads('headTag.attrs.name'),
    scheme: _ember['default'].computed.reads('headTag.attrs.scheme'),
    async: _ember['default'].computed.reads('headTag.attrs.async'),
    defer: _ember['default'].computed.reads('headTag.attrs.defer'),
    src: _ember['default'].computed.reads('headTag.attrs.src'),
    property: _ember['default'].computed.reads('headTag.attrs.property'),
    itemprop: _ember['default'].computed.reads('headTag.attrs.itemprop')

  });
});
define('ember-cli-meta-tags/components/head-tags', ['exports', 'ember', 'ember-cli-meta-tags/templates/components/head-tags'], function (exports, _ember, _emberCliMetaTagsTemplatesComponentsHeadTags) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    headTags: _ember['default'].A([]),
    layout: _emberCliMetaTagsTemplatesComponentsHeadTags['default']
  });
});
define('ember-cli-meta-tags/instance-initializers/head-tags', ['exports'], function (exports) {
  'use strict';

  exports.initialize = initialize;

  function initialize(instance) {
    var container = instance.lookup ? instance : instance.container;
    var service = container.lookup('service:head-tags');
    service.get('router').on('didTransition', function () {
      service.collectHeadTags();
    });

    // inject renderer service
    //TODO: build fastboot compatible renderer
    var component = container.lookup('component:head-tags');
    service.set('renderer', component);
    component.appendTo('head');
  }

  exports['default'] = {
    name: 'head-tags',
    initialize: initialize
  };
});
define('ember-cli-meta-tags/mixins/route-meta', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.metaToHeadTags = metaToHeadTags;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  // Route mixin for setting head meta tags on transition into/out of route

  // @example How to set meta tags on a route
  //   ExampleRoute = Ember.Route.extend RouteMetaMixin,
  //     meta: ->
  //       return
  //         meta_property_name1: meta_value1
  //         meta_property_name2: meta_value2

  var keys = Object.keys || _ember['default'].keys;

  function metaToHeadTags(meta) {
    var metaTypes = keys(meta);
    return metaTypes.reduce(function (headTags, meta_type) {
      return headTags.pushObjects(keys(meta[meta_type]).map(function (key) {
        var _attrs;

        return {
          tagId: meta_type + ':' + key,
          type: 'meta',
          attrs: (_attrs = {}, _defineProperty(_attrs, meta_type, key), _defineProperty(_attrs, 'content', meta[meta_type][key]), _attrs)
        };
      }));
    }, _ember['default'].A([]));
  }

  exports['default'] = _ember['default'].Mixin.create({
    headTagsService: _ember['default'].inject.service('head-tags'),

    // convert legacy meta tags to headTags
    headTags: function headTags() {
      var meta = this.get('meta');
      if (typeof meta === 'function') {
        meta = meta.apply(this);
      } else if (typeof meta !== 'object') {
        return undefined;
      }

      return metaToHeadTags(meta);
    },

    actions: {
      resetMeta: function resetMeta() {
        var service = this.get('headTagsService');
        _ember['default'].run.next(service, 'collectHeadTags');
      }
    }

  });
});
define('ember-cli-meta-tags/services/head-tags', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  //TODO: consider polyfilled Set
  var VALID_HEAD_TAGS = _ember['default'].A(['base', 'link', 'meta', 'script']);

  exports['default'] = _ember['default'].Service.extend({

    // crawl up the active route stack and collect head tags
    collectHeadTags: function collectHeadTags() {
      var _this = this;

      var tags = {};
      var handlerInfos = _ember['default'].A(this.get('router.router.currentHandlerInfos'));
      handlerInfos.forEach(function (handlerInfo) {
        _ember['default'].merge(tags, _this._extractHeadTagsFromRoute(handlerInfo.handler));
      });
      var tagArray = _ember['default'].$.map(tags, function (tag) {
        return tag;
      });
      this.set('renderer.headTags', _ember['default'].A(tagArray));
    },

    _extractHeadTagsFromRoute: function _extractHeadTagsFromRoute(route) {
      var headTags = route.headTags;
      if (!headTags) {
        return {};
      }
      if (typeof headTags === 'function') {
        headTags = headTags.apply(route);
      } else if (typeof headTags !== 'object') {
        // not recognized construct
        return {};
      }
      // convert headTags to object
      return this._buildTags(headTags);
    },

    // ensure all tags have a tagId and build object keyed by id
    _buildTags: function _buildTags(headTagsArray) {
      var tagMap = {};
      _ember['default'].A(headTagsArray).forEach(function (tagDefinition) {
        if (!VALID_HEAD_TAGS.contains(tagDefinition.type)) {
          return;
        }
        var tagId = tagDefinition.tagId;
        if (!tagId) {
          tagId = _ember['default'].guidFor(tagDefinition);
        }
        tagMap[tagId] = tagDefinition;
      });
      return tagMap;
    }
  });
});
define("ember-cli-meta-tags/templates/components/head-tag", ["exports"], function (exports) {
  "use strict";

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
        "moduleName": "modules/ember-cli-meta-tags/templates/components/head-tag.hbs"
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
      statements: [["content", "headTag.content", ["loc", [null, [1, 0], [1, 19]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-cli-meta-tags/templates/components/head-tags", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
          "moduleName": "modules/ember-cli-meta-tags/templates/components/head-tags.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
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
        statements: [["inline", "head-tag", [], ["headTag", ["subexpr", "@mut", [["get", "headTag", ["loc", [null, [2, 21], [2, 28]]]]], [], []]], ["loc", [null, [2, 2], [2, 30]]]]],
        locals: ["headTag"],
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
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "modules/ember-cli-meta-tags/templates/components/head-tags.hbs"
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
      statements: [["block", "each", [["get", "headTags", ["loc", [null, [1, 8], [1, 16]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('ember-cli-meta-tags', ['ember-cli-meta-tags/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-new-computed/index', ['exports', 'ember', 'ember-new-computed/utils/can-use-new-syntax'], function (exports, _ember, _emberNewComputedUtilsCanUseNewSyntax) {
  'use strict';

  exports['default'] = newComputed;

  var computed = _ember['default'].computed;

  function newComputed() {
    var polyfillArguments = [];
    var config = arguments[arguments.length - 1];

    if (typeof config === 'function' || _emberNewComputedUtilsCanUseNewSyntax['default']) {
      return computed.apply(undefined, arguments);
    }

    for (var i = 0, l = arguments.length - 1; i < l; i++) {
      polyfillArguments.push(arguments[i]);
    }

    var func;
    if (config.set) {
      func = function (key, value) {
        if (arguments.length > 1) {
          return config.set.call(this, key, value);
        } else {
          return config.get.call(this, key);
        }
      };
    } else {
      func = function (key) {
        return config.get.call(this, key);
      };
    }

    polyfillArguments.push(func);

    return computed.apply(undefined, polyfillArguments);
  }

  var getKeys = Object.keys || _ember['default'].keys;
  var computedKeys = getKeys(computed);

  for (var i = 0, l = computedKeys.length; i < l; i++) {
    newComputed[computedKeys[i]] = computed[computedKeys[i]];
  }
});
define('ember-new-computed/utils/can-use-new-syntax', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var supportsSetterGetter;

  try {
    _ember['default'].computed({
      set: function set() {},
      get: function get() {}
    });
    supportsSetterGetter = true;
  } catch (e) {
    supportsSetterGetter = false;
  }

  exports['default'] = supportsSetterGetter;
});
define('ember-new-computed', ['ember-new-computed/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-simple-auth/authenticators/base', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  /**
    The base class for all authenticators. __This serves as a starting point for
    implementing custom authenticators and must not be used directly.__
  
    The authenticator authenticates the session. The actual mechanism used to do
    this might e.g. be posting a set of credentials to a server and in exchange
    retrieving an access token, initiating authentication against an external
    provider like Facebook etc. and depends on the specific authenticator. Any
    data that the authenticator receives upon successful authentication and
    resolves with from the
    {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}
    method is stored in the session and can be accessed via the session service
    and be used by the authorizer (see
    {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) to e.g.
    authorize outgoing requests.
  
    The authenticator also decides whether a set of data that was restored from
    the session store (see
    {{#crossLink "BaseStore/restore:method"}}{{/crossLink}}) makes up an
    authenticated session or not.
  
    __Authenticators for an application are defined in the `app/authenticators`
    directory__, e.g.:
  
    ```js
    // app/authenticators/oauth2.js
    import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
  
    export default OAuth2PasswordGrantAuthenticator.extend({
      ...
    });
    ```
  
    and can then be used with the name Ember CLI automatically registers them
    with in the Ember container:
  
    ```js
    // app/components/login-form.js
    export default Ember.Controller.extend({
      session: Ember.inject.service(),
  
      actions: {
        authenticate: function() {
          this.get('session').authenticate('authenticator:oauth2');
        }
      }
    });
    ```
  
    @class BaseAuthenticator
    @module ember-simple-auth/authenticators/base
    @extends Ember.Object
    @uses Ember.Evented
    @public
  */
  exports['default'] = _ember['default'].Object.extend(_ember['default'].Evented, {
    /**
      __Triggered when the authentication data is updated by the authenticator
      due to an external or scheduled event__. This might happen e.g. if the
      authenticator refreshes an expired token or an event is triggered from an
      external authentication provider that the authenticator uses. The session
      handles that event, passes the updated data back to the authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}}
      method and handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      __Triggered when the authenciation data is invalidated by the authenticator
      due to an external or scheduled event__. This might happen e.g. if a token
      expires or an event is triggered from an external authentication provider
      that the authenticator uses. The session handles that event and will
      invalidate itself when it is triggered.
       @event sessionDataInvalidated
      @public
    */

    /**
      Restores the session from a session data object. __This method is invoked
      by the session either on application startup if session data is restored
      from the session store__ or when properties in the store change due to
      external events (e.g. in another tab) and the new session data needs to be
      validated for whether it constitutes an authenticated session.
       __This method returns a promise. A resolving promise results in the session
      becoming or remaining authenticated.__ Any data the promise resolves with
      will be saved in and accessible via the session service's
      `data.authenticated` property (see
      {{#crossLink "SessionService/data:property"}}{{/crossLink}}). A rejecting
      promise indicates that `data` does not constitute a valid session and will
      result in the session being invalidated or remaining unauthencicated.
       The `BaseAuthenticator`'s implementation always returns a rejecting
      promise. __This method must be overridden in subclasses.__
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore() {
      return RSVP.reject();
    },

    /**
      Authenticates the session with the specified `args`. These options vary
      depending on the actual authentication mechanism the authenticator
      implements (e.g. a set of credentials or a Facebook account id etc.). __The
      session will invoke this method in order to authenticate itself__ (see
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}).
       __This method returns a promise. A resolving promise will result in the
      session becoming authenticated.__ Any data the promise resolves with will
      be saved in and accessible via the session service's `data.authenticated`
      property (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
      A rejecting promise indicates that authentication failed and will result in
      the session remaining unauthenticated.
       The `BaseAuthenticator`'s implementation always returns a rejecting promise
      and thus never authenticates the session. __This method must be overridden
      in subclasses__.
       @method authenticate
      @param {Any} [...args] The arguments that the authenticator requires to authenticate the session
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate() {
      return RSVP.reject();
    },

    /**
      This method is invoked as a callback when the session is invalidated. While
      the session will invalidate itself and clear all authenticated session data,
      it might be necessary for some authenticators to perform additional tasks
      (e.g. invalidating an access token on the server side).
       __This method returns a promise. A resolving promise will result in the
      session becoming unauthenticated.__ A rejecting promise will result in
      invalidation being intercepted and the session remaining authenticated.
       The `BaseAuthenticator`'s implementation always returns a resolving promise
      and thus never intercepts session invalidation. __This method doesn't have
      to be overridden in custom authenticators__ if no actions need to be
      performed on session invalidation.
       @method invalidate
      @param {Object} data The current authenticated session data
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });
});
define('ember-simple-auth/authenticators/devise', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;
  var get = _ember['default'].get;

  /**
    Authenticator that works with the Ruby gem
    [devise](https://github.com/plataformatec/devise).
  
    __As token authentication is not actually part of devise anymore, the server
    needs to implement some customizations__ to work with this authenticator -
    see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).
  
    @class DeviseAuthenticator
    @module ember-simple-auth/authenticators/devise
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    /**
      The endpoint on the server that the authentication request is sent to.
       @property serverTokenEndpoint
      @type String
      @default '/users/sign_in'
      @public
    */
    serverTokenEndpoint: '/users/sign_in',

    /**
      The devise resource name. __This will be used in the request and also be
      expected in the server's response.__
       @property resourceName
      @type String
      @default 'user'
      @public
    */
    resourceName: 'user',

    /**
      The token attribute name. __This will be used in the request and also be
      expected in the server's response.__
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name. __This will be used in the request and
      also be expected in the server's response.__
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Restores the session from a session data object; __returns a resolving
      promise when there are non-empty
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
      and
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}
      values in `data`__ and a rejecting promise otherwise.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

      var tokenAttributeName = _getProperties.tokenAttributeName;
      var identificationAttributeName = _getProperties.identificationAttributeName;

      var tokenAttribute = get(data, tokenAttributeName);
      var identificationAttribute = get(data, identificationAttributeName);
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    /**
      Authenticates the session with the specified `identification` and
      `password`; the credentials are `POST`ed to the
      {{#crossLink "DeviseAuthenticator/serverTokenEndpoint:property"}}server{{/crossLink}}.
      If the credentials are valid the server will responds with a
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
      and
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}.
      __If the credentials are valid and authentication succeeds, a promise that
      resolves with the server's response is returned__, otherwise a promise that
      rejects with the server error is returned.
       @method authenticate
      @param {String} identification The user's identification
      @param {String} password The user's password
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(identification, password) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var _getProperties2 = _this.getProperties('resourceName', 'identificationAttributeName');

        var resourceName = _getProperties2.resourceName;
        var identificationAttributeName = _getProperties2.identificationAttributeName;

        var data = {};
        data[resourceName] = { password: password };
        data[resourceName][identificationAttributeName] = identification;

        _this.makeRequest(data).then(function (response) {
          run(null, resolve, response);
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    /**
      Does nothing
       @method invalidate
      @return {Ember.RSVP.Promise} A resolving promise
      @public
    */
    invalidate: function invalidate() {
      return RSVP.resolve();
    },

    /**
      Makes a request to the devise server.
       @method makeRequest
      @param {Object} data The request data
      @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
      @protected
    */
    makeRequest: function makeRequest(data) {
      var serverTokenEndpoint = this.get('serverTokenEndpoint');
      return _ember['default'].$.ajax({
        url: serverTokenEndpoint,
        type: 'POST',
        dataType: 'json',
        data: data,
        beforeSend: function beforeSend(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }
      });
    }
  });
});
define('ember-simple-auth/authenticators/oauth2-password-grant', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  /* jscs:disable requireDotNotation */
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;
  var run = _ember['default'].run;

  /**
    Authenticator that conforms to OAuth 2
    ([RFC 6749](http://tools.ietf.org/html/rfc6749)), specifically the _"Resource
    Owner Password Credentials Grant Type"_.
  
    This authenticator also automatically refreshes access tokens (see
    [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)) if the
    server supports it.
  
    @class OAuth2PasswordGrantAuthenticator
    @module ember-simple-auth/authenticators/oauth2-password-grant
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    /**
      Triggered when the authenticator refreshed the access token (see
      [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)).
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      The client_id to be sent to the authentication server (see
      https://tools.ietf.org/html/rfc6749#appendix-A.1). __This should only be
      used for statistics or logging etc. as it cannot actually be trusted since
      it could have been manipulated on the client!__
       @property clientId
      @type String
      @default null
      @public
    */
    clientId: null,

    /**
      The endpoint on the server that authentication and token refresh requests
      are sent to.
       @property serverTokenEndpoint
      @type String
      @default '/token'
      @public
    */
    serverTokenEndpoint: '/token',

    /**
      The endpoint on the server that token revocation requests are sent to. Only
      set this if the server actually supports token revokation. If this is
      `null`, the authenticator will not revoke tokens on session invalidation.
       __If token revocation is enabled but fails, session invalidation will be
      intercepted and the session will remain authenticated (see
      {{#crossLink "OAuth2PasswordGrantAuthenticator/invalidate:method"}}{{/crossLink}}).__
       @property serverTokenRevocationEndpoint
      @type String
      @default null
      @public
    */
    serverTokenRevocationEndpoint: null,

    /**
      Sets whether the authenticator automatically refreshes access tokens if the
      server supports it.
       @property refreshAccessTokens
      @type Boolean
      @default true
      @public
    */
    refreshAccessTokens: true,

    _refreshTokenTimeout: null,

    /**
      Restores the session from a session data object; __will return a resolving
      promise when there is a non-empty `access_token` in the session data__ and
      a rejecting promise otherwise.
       If the server issues expiring access tokens and there is an expired access
      token in the session data along with a refresh token, the authenticator
      will try to refresh the access token and return a promise that resolves
      with the new access token if the refresh was successful. If there is no
      refresh token or the token refresh is not successful, a rejecting promise
      will be returned.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var now = new Date().getTime();
        var refreshAccessTokens = _this.get('refreshAccessTokens');
        if (!isEmpty(data['expires_at']) && data['expires_at'] < now) {
          if (refreshAccessTokens) {
            _this._refreshAccessToken(data['expires_in'], data['refresh_token']).then(resolve, reject);
          } else {
            reject();
          }
        } else {
          if (isEmpty(data['access_token'])) {
            reject();
          } else {
            _this._scheduleAccessTokenRefresh(data['expires_in'], data['expires_at'], data['refresh_token']);
            resolve(data);
          }
        }
      });
    },

    /**
      Authenticates the session with the specified `identification`, `password`
      and optional `scope`; issues a `POST` request to the
      {{#crossLink "OAuth2PasswordGrantAuthenticator/serverTokenEndpoint:property"}}{{/crossLink}}
      and receives the access token in response (see
      http://tools.ietf.org/html/rfc6749#section-4.3).
       __If the credentials are valid (and the optionally requested scope is
      granted) and thus authentication succeeds, a promise that resolves with the
      server's response is returned__, otherwise a promise that rejects with the
      error as returned by the server is returned.
       __If the server supports it, this method also schedules refresh requests
      for the access token before it expires.__
       @method authenticate
      @param {String} identification The resource owner username
      @param {String} password The resource owner password
      @param {String|Array} scope The scope of the access request (see [RFC 6749, section 3.3](http://tools.ietf.org/html/rfc6749#section-3.3))
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(identification, password) {
      var _this2 = this;

      var scope = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new RSVP.Promise(function (resolve, reject) {
        var data = { 'grant_type': 'password', username: identification, password: password };
        var serverTokenEndpoint = _this2.get('serverTokenEndpoint');
        var scopesString = _ember['default'].makeArray(scope).join(' ');
        if (!_ember['default'].isEmpty(scopesString)) {
          data.scope = scopesString;
        }
        _this2.makeRequest(serverTokenEndpoint, data).then(function (response) {
          run(function () {
            var expiresAt = _this2._absolutizeExpirationTime(response['expires_in']);
            _this2._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
            if (!isEmpty(expiresAt)) {
              response = _ember['default'].merge(response, { 'expires_at': expiresAt });
            }
            resolve(response);
          });
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    /**
      If token revocation is enabled, this will revoke the access token (and the
      refresh token if present). If token revocation succedds, this method
      returns a resolving promise, otherwise it will return a rejecting promise,
      thus intercepting session invalidation.
       If token revocation is not enabled this method simply returns a resolving
      promise.
       @method invalidate
      @param {Object} data The current authenticated session data
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate(data) {
      var _this3 = this;

      var serverTokenRevocationEndpoint = this.get('serverTokenRevocationEndpoint');
      function success(resolve) {
        run.cancel(this._refreshTokenTimeout);
        delete this._refreshTokenTimeout;
        resolve();
      }
      return new RSVP.Promise(function (resolve) {
        if (isEmpty(serverTokenRevocationEndpoint)) {
          success.apply(_this3, [resolve]);
        } else {
          (function () {
            var requests = [];
            _ember['default'].A(['access_token', 'refresh_token']).forEach(function (tokenType) {
              var token = data[tokenType];
              if (!isEmpty(token)) {
                requests.push(_this3.makeRequest(serverTokenRevocationEndpoint, {
                  'token_type_hint': tokenType, token: token
                }));
              }
            });
            var succeed = function succeed() {
              success.apply(_this3, [resolve]);
            };
            RSVP.all(requests).then(succeed, succeed);
          })();
        }
      });
    },

    /**
      Makes a request to the OAuth 2.0 server.
       @method makeRequest
      @param {String} url The request URL
      @param {Object} data The request data
      @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
      @protected
    */
    makeRequest: function makeRequest(url, data) {
      var options = {
        url: url,
        data: data,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded'
      };
      var clientId = this.get('clientId');

      if (!isEmpty(clientId)) {
        var base64ClientId = window.btoa(clientId.concat(':'));
        _ember['default'].merge(options, {
          headers: {
            Authorization: 'Basic ' + base64ClientId
          }
        });
      }

      return _ember['default'].$.ajax(options);
    },

    _scheduleAccessTokenRefresh: function _scheduleAccessTokenRefresh(expiresIn, expiresAt, refreshToken) {
      var refreshAccessTokens = this.get('refreshAccessTokens');
      if (refreshAccessTokens) {
        var now = new Date().getTime();
        if (isEmpty(expiresAt) && !isEmpty(expiresIn)) {
          expiresAt = new Date(now + expiresIn * 1000).getTime();
        }
        var offset = (Math.floor(Math.random() * 5) + 5) * 1000;
        if (!isEmpty(refreshToken) && !isEmpty(expiresAt) && expiresAt > now - offset) {
          run.cancel(this._refreshTokenTimeout);
          delete this._refreshTokenTimeout;
          if (!_ember['default'].testing) {
            this._refreshTokenTimeout = run.later(this, this._refreshAccessToken, expiresIn, refreshToken, expiresAt - now - offset);
          }
        }
      }
    },

    _refreshAccessToken: function _refreshAccessToken(expiresIn, refreshToken) {
      var _this4 = this;

      var data = { 'grant_type': 'refresh_token', 'refresh_token': refreshToken };
      var serverTokenEndpoint = this.get('serverTokenEndpoint');
      return new RSVP.Promise(function (resolve, reject) {
        _this4.makeRequest(serverTokenEndpoint, data).then(function (response) {
          run(function () {
            expiresIn = response['expires_in'] || expiresIn;
            refreshToken = response['refresh_token'] || refreshToken;
            var expiresAt = _this4._absolutizeExpirationTime(expiresIn);
            var data = _ember['default'].merge(response, { 'expires_in': expiresIn, 'expires_at': expiresAt, 'refresh_token': refreshToken });
            _this4._scheduleAccessTokenRefresh(expiresIn, null, refreshToken);
            _this4.trigger('sessionDataUpdated', data);
            resolve(data);
          });
        }, function (xhr, status, error) {
          _ember['default'].Logger.warn('Access token could not be refreshed - server responded with ' + error + '.');
          reject();
        });
      });
    },

    _absolutizeExpirationTime: function _absolutizeExpirationTime(expiresIn) {
      if (!isEmpty(expiresIn)) {
        return new Date(new Date().getTime() + expiresIn * 1000).getTime();
      }
    }
  });
});
define('ember-simple-auth/authenticators/test', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  'use strict';

  var RSVP = _ember['default'].RSVP;

  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    restore: function restore(data) {
      return RSVP.resolve(data);
    },

    authenticate: function authenticate(data) {
      return RSVP.resolve(data);
    },

    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });
});
define('ember-simple-auth/authenticators/torii', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  var isEmpty = _ember['default'].isEmpty;

  /**
    Authenticator that wraps the
    [Torii library](https://github.com/Vestorly/torii) and thus allows to connect
    any external authentication provider that torii defines a provider for.
  
    In order to use this authenticator, __the application needs to have the
    [torii addon](https://github.com/Vestorly/torii) installed and must inject
    the torii service into the authenticator__:
  
    ```js
    // app/authenticators/torii.js
    import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
  
    export default ToriiAuthenticator.extend(
      torii: Ember.inject.service()
    )
    ```
  
    @class ToriiAuthenticator
    @module ember-simple-auth/authenticators/torii
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    _provider: null,

    /**
      Restores the session by calling the torii provider's `fetch` method.
       __Many torii providers do not implement the `fetch` method__. If the
      provider in use does not implement the method simply add it as follows:
       ```js
      // app/providers/facebook.js
      import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';
       export default FacebookOauth2Provider.extend({
        fetch(data) {
          return data;
        }
      });
      ```
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      this._assertToriiIsPresent();

      data = data || {};
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(data.provider)) {
          (function () {
            var _data = data;
            var provider = _data.provider;

            _this.get('torii').fetch(data.provider, data).then(function (data) {
              _this._resolveWith(provider, data, resolve);
            }, function () {
              delete _this._provider;
              reject();
            });
          })();
        } else {
          delete _this._provider;
          reject();
        }
      });
    },

    /**
      Authenticates the session by opening the torii provider. For more
      documentation on torii, see the
      [project's README](https://github.com/Vestorly/torii#readme).
       @method authenticate
      @param {String} provider The torii provider to authenticate the session with
      @param {Object} options The options to pass to the torii provider
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(provider, options) {
      var _this2 = this;

      this._assertToriiIsPresent();

      return new RSVP.Promise(function (resolve, reject) {
        _this2.get('torii').open(provider, options || {}).then(function (data) {
          _this2._resolveWith(provider, data, resolve);
        }, reject);
      });
    },

    /**
      Closes the torii provider. If the provider is successfully closed, this
      method returns a resolving promise, otherwise it will return a rejecting
      promise, thus intercepting session invalidation.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate() {
      var _this3 = this;

      return new RSVP.Promise(function (resolve, reject) {
        _this3.get('torii').close(_this3._provider).then(function () {
          delete _this3._provider;
          resolve();
        }, reject);
      });
    },

    _resolveWith: function _resolveWith(provider, data, resolve) {
      data.provider = provider;
      this._provider = data.provider;
      resolve(data);
    },

    _assertToriiIsPresent: function _assertToriiIsPresent() {
      var torii = this.get('torii');
      _ember['default'].assert('You are trying to use the torii authenticator but torii is not available. Inject torii into the authenticator with "torii: Ember.inject.service()".', _ember['default'].isPresent(torii));
    }
  });
});
define('ember-simple-auth/authorizers/base', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
    The base class for all authorizers. __This serves as a starting point for
    implementing custom authorizers and must not be used directly.__
  
    Authorizers use the session data aqcuired by an authenticator when
    authenticating the session to construct authrorization data that can e.g. be
    injected into outgoing network requests etc. Depending on the authorization
    mechanism the authorizer implements, that authorization data might be an HTTP
    header, query string parameters, a cookie etc.
  
    __The authorizer has to fit the authenticator__ (see
    {{#crossLink "BaseAuthenticator"}}{{/crossLink}})
    as it can only use data that the authenticator acquires when authenticating
    the session.
  
    @class BaseAuthorizer
    @module ember-simple-auth/authorizers/base
    @extends Ember.Object
    @public
  */
  exports['default'] = _ember['default'].Object.extend({
    /**
      Authorizes a block of code. This method will be invoked by the session
      service's {{#crossLink "SessionService/authorize:method"}}{{/crossLink}}
      method which will pass the current authenticated session data (see
      {{#crossLink "SessionService/data:property"}}{{/crossLink}}) and a block.
      Depending on the mechanism it implements, the authorizer transforms the
      session data into authorization data and invokes the block with that data.
       `BaseAuthorizer`'s implementation does nothing. __This method must be
      overridden in custom authorizers.__
       @method authorize
      @param {Object} data The current authenticated session data
      @param {Function} block The callback to call with the authorization data
      @public
    */
    authorize: function authorize() {}
  });
});
define('ember-simple-auth/authorizers/devise', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;

  /**
    Authorizer that works with the Ruby gem
    [devise](https://github.com/plataformatec/devise); includes the user's token
    and identification from the session data in the `Authorization` HTTP header,
    e.g.:
  
    ```
    Authorization: token="234rtgjneroigne4" email="user@domain.tld"
    ```
  
    __As token authentication is not actually part of devise anymore, the server
    needs to implement some customizations__ to work with this authenticator -
    see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).
  
    @class DeviseAuthorizer
    @module ember-simple-auth/authorizers/devise
    @extends BaseAuthorizer
    @public
  */
  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
    /**
      The token attribute name.
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name.
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Includes the user's token (see
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}{{/crossLink}})
      and identification (see
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}{{/crossLink}})
      in the `Authorization` header.
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
      @public
    */
    authorize: function authorize(data, block) {
      var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

      var tokenAttributeName = _getProperties.tokenAttributeName;
      var identificationAttributeName = _getProperties.identificationAttributeName;

      var userToken = data[tokenAttributeName];
      var userIdentification = data[identificationAttributeName];
      if (!isEmpty(userToken) && !isEmpty(userIdentification)) {
        var authData = tokenAttributeName + '="' + userToken + '", ' + identificationAttributeName + '="' + userIdentification + '"';
        block('Authorization', 'Token ' + authData);
      }
    }
  });
});
define('ember-simple-auth/authorizers/oauth2-bearer', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  /* jscs:disable requireDotNotation */
  'use strict';

  var isEmpty = _ember['default'].isEmpty;

  /**
    Authorizer that conforms to OAuth 2
    ([RFC 6749](http://tools.ietf.org/html/rfc6749)); includes the access token
    from the session data as a bearer token
    ([RFC 6750](http://tools.ietf.org/html/rfc6750)) in the `Authorization`
    header, e.g.:
  
    ```
    Authorization: Bearer 234rtgjneroigne4
    ```
  
    @class OAuth2BearerAuthorizer
    @module ember-simple-auth/authorizers/oauth2-bearer
    @extends BaseAuthorizer
    @public
  */
  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
    /**
      Includes the access token from the session data into the `Authorization`
      header as a Bearer token, e.g.:
       ```
      Authorization: Bearer 234rtgjneroigne4
      ```
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
      @public
    */
    authorize: function authorize(data, block) {
      var accessToken = data['access_token'];
      if (!isEmpty(accessToken)) {
        block('Authorization', 'Bearer ' + accessToken);
      }
    }
  });
});
define('ember-simple-auth/configuration', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var DEFAULTS = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  /**
    Ember Simple Auth's configuration object.
  
    To change any of these values, set them on the application's environment
    object, e.g.:
  
    ```js
    // config/environment.js
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'sign-in'
    };
    ```
  
    @class Configuration
    @extends Object
    @module ember-simple-auth/configuration
    @public
  */
  exports['default'] = {
    /**
      The base URL of the application as configured in `config/environment.js`.
       @property baseURL
      @readOnly
      @static
      @type String
      @default '/'
      @public
    */
    baseURL: null,

    /**
      The route to transition to for authentication. The
      {{#crossLink "AuthenticatedRouteMixin"}}{{/crossLink}} will transition to
      this route when a route that implements the mixin is accessed when the
      route is not authenticated.
       @property authenticationRoute
      @readOnly
      @static
      @type String
      @default 'login'
      @public
    */
    authenticationRoute: DEFAULTS.authenticationRoute,

    /**
      The route to transition to after successful authentication.
       @property routeAfterAuthentication
      @readOnly
      @static
      @type String
      @default 'index'
      @public
    */
    routeAfterAuthentication: DEFAULTS.routeAfterAuthentication,

    /**
      The route to transition to if a route that implements the
      {{#crossLink "UnauthenticatedRouteMixin"}}{{/crossLink}} is accessed when
      the session is authenticated.
       @property routeIfAlreadyAuthenticated
      @readOnly
      @static
      @type String
      @default 'index'
      @public
    */
    routeIfAlreadyAuthenticated: DEFAULTS.routeIfAlreadyAuthenticated,

    load: function load(config) {
      var wrappedConfig = _ember['default'].Object.create(config);
      for (var property in this) {
        if (this.hasOwnProperty(property) && _ember['default'].typeOf(this[property]) !== 'function') {
          this[property] = wrappedConfig.getWithDefault(property, DEFAULTS[property]);
        }
      }
    }
  };
});
define('ember-simple-auth/initializers/setup-session-service', ['exports', 'ember-simple-auth/utils/inject'], function (exports, _emberSimpleAuthUtilsInject) {
  'use strict';

  exports['default'] = setupSessionStore;

  function setupSessionStore(registry) {
    (0, _emberSimpleAuthUtilsInject['default'])(registry, 'service:session', 'session', 'session:main');
  }
});
define('ember-simple-auth/initializers/setup-session', ['exports', 'ember', 'ember-simple-auth/internal-session', 'ember-simple-auth/session-stores/ephemeral', 'ember-simple-auth/utils/inject'], function (exports, _ember, _emberSimpleAuthInternalSession, _emberSimpleAuthSessionStoresEphemeral, _emberSimpleAuthUtilsInject) {
  'use strict';

  exports['default'] = setupSession;

  function setupSession(registry) {
    registry.register('session:main', _emberSimpleAuthInternalSession['default']);

    var store = 'session-store:application';
    if (_ember['default'].testing) {
      store = 'session-store:test';
      registry.register(store, _emberSimpleAuthSessionStoresEphemeral['default']);
    }
    (0, _emberSimpleAuthUtilsInject['default'])(registry, 'session:main', 'store', store);
  }
});
define('ember-simple-auth/instance-initializers/setup-session-restoration', ['exports', 'ember-simple-auth/utils/lookup'], function (exports, _emberSimpleAuthUtilsLookup) {
  'use strict';

  exports['default'] = setupSessionRestoration;

  function setupSessionRestoration(instance) {
    var applicationRoute = (0, _emberSimpleAuthUtilsLookup['default'])(instance, 'route:application');
    var session = (0, _emberSimpleAuthUtilsLookup['default'])(instance, 'session:main');
    var originalBeforeModel = applicationRoute.beforeModel;
    var applyOriginalBeforeModel = function applyOriginalBeforeModel() {
      return originalBeforeModel.apply(applicationRoute, arguments);
    };
    applicationRoute.reopen({
      beforeModel: function beforeModel() {
        var _arguments = arguments;

        return session.restore().then(function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        }, function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        });
      }
    });
  }
});
define('ember-simple-auth/internal-session', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var on = _ember['default'].on;

  exports['default'] = _ember['default'].ObjectProxy.extend(_ember['default'].Evented, {
    authenticator: null,
    store: null,
    container: null,
    isAuthenticated: false,
    attemptedTransition: null,
    content: { authenticated: {} },

    authenticate: function authenticate() {
      var _this = this;

      var args = Array.prototype.slice.call(arguments);
      var authenticator = args.shift();
      _ember['default'].assert('Session#authenticate requires the authenticator to be specified, was "' + authenticator + '"!', !_ember['default'].isEmpty(authenticator));
      var theAuthenticator = this.container.lookup(authenticator);
      _ember['default'].assert('No authenticator for factory "' + authenticator + '" could be found!', !_ember['default'].isNone(theAuthenticator));
      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        theAuthenticator.authenticate.apply(theAuthenticator, args).then(function (content) {
          _this._setup(authenticator, content, true);
          resolve();
        }, function (error) {
          _this._clear();
          reject(error);
        });
      });
    },

    invalidate: function invalidate() {
      var _this2 = this;

      _ember['default'].assert('Session#invalidate requires the session to be authenticated!', this.get('isAuthenticated'));
      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        var authenticator = _this2.container.lookup(_this2.authenticator);
        authenticator.invalidate(_this2.content.authenticated).then(function () {
          authenticator.off('sessionDataUpdated');
          _this2._clear(true);
          resolve();
        }, function (error) {
          _this2.trigger('sessionInvalidationFailed', error);
          reject(error);
        });
      });
    },

    restore: function restore() {
      var _this3 = this;

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        var restoredContent = _this3.store.restore();

        var _ref = restoredContent.authenticated || {};

        var authenticator = _ref.authenticator;

        if (!!authenticator) {
          delete restoredContent.authenticated.authenticator;
          _this3.container.lookup(authenticator).restore(restoredContent.authenticated).then(function (content) {
            _this3.set('content', restoredContent);
            _this3._setup(authenticator, content);
            resolve();
          }, function () {
            _ember['default'].Logger.debug('The authenticator "' + authenticator + '" rejected to restore the session - invalidating…');
            _this3.set('content', restoredContent);
            _this3._clear();
            reject();
          });
        } else {
          delete (restoredContent || {}).authenticated;
          _this3.set('content', restoredContent);
          _this3._clear();
          reject();
        }
      });
    },

    _setup: function _setup(authenticator, authenticatedContend, trigger) {
      trigger = !!trigger && !this.get('isAuthenticated');
      this.beginPropertyChanges();
      this.setProperties({
        isAuthenticated: true,
        authenticator: authenticator
      });
      _ember['default'].set(this.content, 'authenticated', authenticatedContend);
      this._bindToAuthenticatorEvents();
      this._updateStore();
      this.endPropertyChanges();
      if (trigger) {
        this.trigger('authenticationSucceeded');
      }
    },

    _clear: function _clear(trigger) {
      trigger = !!trigger && this.get('isAuthenticated');
      this.beginPropertyChanges();
      this.setProperties({
        isAuthenticated: false,
        authenticator: null
      });
      _ember['default'].set(this.content, 'authenticated', {});
      this._updateStore();
      this.endPropertyChanges();
      if (trigger) {
        this.trigger('invalidationSucceeded');
      }
    },

    setUnknownProperty: function setUnknownProperty(key, value) {
      _ember['default'].assert('"authenticated" is a reserved key used by Ember Simple Auth!', key !== 'authenticated');
      var result = this._super(key, value);
      this._updateStore();
      return result;
    },

    _updateStore: function _updateStore() {
      var data = this.content;
      if (!_ember['default'].isEmpty(this.authenticator)) {
        _ember['default'].set(data, 'authenticated', _ember['default'].merge({ authenticator: this.authenticator }, data.authenticated || {}));
      }
      this.store.persist(data);
    },

    _bindToAuthenticatorEvents: function _bindToAuthenticatorEvents() {
      var _this4 = this;

      var authenticator = this.container.lookup(this.authenticator);
      authenticator.off('sessionDataUpdated');
      authenticator.off('sessionDataInvalidated');
      authenticator.on('sessionDataUpdated', function (content) {
        _this4._setup(_this4.authenticator, content);
      });
      authenticator.on('sessionDataInvalidated', function () {
        _this4._clear(true);
      });
    },

    _bindToStoreEvents: on('init', function () {
      var _this5 = this;

      this.store.on('sessionDataUpdated', function (content) {
        var _ref2 = content.authenticated || {};

        var authenticator = _ref2.authenticator;

        if (!!authenticator) {
          delete content.authenticated.authenticator;
          _this5.container.lookup(authenticator).restore(content.authenticated).then(function (authenticatedContent) {
            _this5.set('content', content);
            _this5._setup(authenticator, authenticatedContent, true);
          }, function () {
            _ember['default'].Logger.debug('The authenticator "' + authenticator + '" rejected to restore the session - invalidating…');
            _this5.set('content', content);
            _this5._clear(true);
          });
        } else {
          _this5.set('content', content);
          _this5._clear(true);
        }
      });
    })
  });
});
define('ember-simple-auth/mixins/application-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, _ember, _emberSimpleAuthConfiguration) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  var inject = _ember['default'].inject;
  var on = _ember['default'].on;

  /**
    The mixin for the application route; __defines methods that are called when
    the session was successfully authenticated (see
    {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}})
    or invalidated__ (see
    {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}).
  
    Using this mixin is optional. The session events can also be handled
    manually, e.g. in an instance initializer:
  
    ```js
    // app/instance-initializers/session-events.js
    Ember.Application.initializer({
      name:       'session-events',
      after:      'ember-simple-auth',
      initialize: function(container, application) {
        var applicationRoute = container.lookup('route:application');
        var session          = container.lookup('service:session');
        session.on('authenticationSucceeded', function() {
          applicationRoute.transitionTo('index');
        });
        session.on('invalidationSucceeded', function() {
          window.location.reload();
        });
      }
    });
    ```
  
    __When using the `ApplicationRouteMixin` you need to specify
    `needs: ['service:session']` in the application route's unit test.__
  
    @class ApplicationRouteMixin
    @module ember-simple-auth/mixins/application-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: inject.service('session'),

    _subscribeToSessionEvents: on('init', function () {
      var _this = this,
          _arguments = arguments;

      _ember['default'].A([['authenticationSucceeded', 'sessionAuthenticated'], ['invalidationSucceeded', 'sessionInvalidated']]).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var event = _ref2[0];
        var method = _ref2[1];

        _this.get('session').on(event, _ember['default'].run.bind(_this, function () {
          _this[method].apply(_this, _arguments);
        }));
      });
    }),

    /**
      This method handles the session's
      {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
      event. If there is a transition that was previously intercepted by
      {{#crossLink "AuthenticatedRouteMixin/beforeModel:method"}}the
      AuthenticatedRouteMixin's `beforeModel` method{{/crossLink}} it will retry
      it. If there is no such transition, this action transitions to the
      {{#crossLink "Configuration/routeAfterAuthentication:property"}}{{/crossLink}}.
       @method sessionAuthenticated
      @public
    */
    sessionAuthenticated: function sessionAuthenticated() {
      var attemptedTransition = this.get('session.attemptedTransition');
      if (attemptedTransition) {
        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      } else {
        this.transitionTo(_emberSimpleAuthConfiguration['default'].routeAfterAuthentication);
      }
    },

    /**
      This method handles the session's
      {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
      event. __It reloads the Ember.js application__ by redirecting the browser
      to the application's root URL so that all in-memory data (such as Ember
      Data stores etc.) gets cleared.
       If the Ember.js application will be used in an environment where the users
      don't have direct access to any data stored on the client (e.g.
      [cordova](http://cordova.apache.org)) this action can be overridden to e.g.
      simply transition to the index route.
       @method sessionInvalidated
      @public
    */
    sessionInvalidated: function sessionInvalidated() {
      if (!_ember['default'].testing) {
        window.location.replace(_emberSimpleAuthConfiguration['default'].baseURL);
      }
    }
  });
});
define('ember-simple-auth/mixins/authenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, _ember, _emberSimpleAuthConfiguration) {
  'use strict';

  var service = _ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    authenticated.__ It defines a `beforeModel` method that aborts the current
    transition and instead transitions to the
    {{#crossLink "Configuration/authenticationRoute:property"}}{{/crossLink}} if
    the session is not authenticated.
  
    ```js
    // app/routes/protected.js
    import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
  
    export default Ember.Route.extend(AuthenticatedRouteMixin);
    ```
  
    @class AuthenticatedRouteMixin
    @module ember-simple-auth/mixins/authenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is not aborts the
      current transition and instead transitions to the
      {{#crossLink "Configuration/authenticationRoute:property"}}{{/crossLink}}.
      If the current transition is aborted, this method will save it in the
      session service's
      {{#crossLink "SessionService/attemptedTransition:property"}}{{/crossLink}}
      property so that  it can be retried after the session was authenticated
      (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (!this.get('session.isAuthenticated')) {
        transition.abort();
        this.get('session').set('attemptedTransition', transition);
        _ember['default'].assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== _emberSimpleAuthConfiguration['default'].authenticationRoute);
        this.transitionTo(_emberSimpleAuthConfiguration['default'].authenticationRoute);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });
});
define('ember-simple-auth/mixins/data-adapter-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var service = _ember['default'].inject.service;

  /**
    __This mixin can be used to make Ember Data adapters authorize all outgoing
    API requests by injecting a header.__ It works with all authorizers that call
    the authorization callback (see
    {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) with header
    name and header content arguments.
  
    __The `DataAdapterMixin` will also invalidate the session whenever it
    receives a 401 response for an API request.__
  
    ```js
    // app/adapters/application.js
    import DS from 'ember-data';
    import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
  
    export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
      authorizer: 'authorizer:application'
    });
    ```
  
    @class DataAdapterMixin
    @module ember-simple-auth/mixins/data-adapter-mixin
    @extends Ember.Mixin
    @public
  */

  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      The authorizer that is used to authorize API requests. The authorizer has
      to call the authorization callback (see
      {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) with header
      name and header content arguments. __This property must be overridden in
      adapters using this mixin.__
       @property authorizer
      @type String
      @default null
      @public
    */
    authorizer: null,

    /**
      Defines a `beforeSend` hook (see http://api.jquery.com/jQuery.ajax/) that
      injects a request header containing the authorization data as constructed
      by the {{#crossLink "DataAdapterMixin/authorizer:property"}}{{/crossLink}}
      (see
      {{#crossLink "SessionService/authorize:method"}}{{/crossLink}}). The
      specific header name and contents depend on the actual auhorizer that is
      used.
       @method ajaxOptions
      @protected
    */
    ajaxOptions: function ajaxOptions() {
      var _this = this;

      var authorizer = this.get('authorizer');
      _ember['default'].assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", _ember['default'].isPresent(authorizer));

      var hash = this._super.apply(this, arguments);
      var beforeSend = hash.beforeSend;

      hash.beforeSend = function (xhr) {
        _this.get('session').authorize(authorizer, function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
        if (beforeSend) {
          beforeSend(xhr);
        }
      };
      return hash;
    },

    /**
      This method is called for every response that the adapter receives from the
      API. If the response has a 401 status code it invalidates the session (see
      {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}}).
       @method handleResponse
      @param {Number} status The response status as received from the API
      @protected
    */
    handleResponse: function handleResponse(status) {
      if (status === 401) {
        if (this.get('session.isAuthenticated')) {
          this.get('session').invalidate();
        }
        return true;
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });
});
define('ember-simple-auth/mixins/unauthenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, _ember, _emberSimpleAuthConfiguration) {
  'use strict';

  var service = _ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    not authenticated__ (e.g. login and registration routes). It defines a
    `beforeModel` method that aborts the current transition and instead
    transitions to the
    {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}
    if the session is authenticated.
  
    ```js
    // app/routes/login.js
    import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
  
    export default Ember.Route.extend(UnauthenticatedRouteMixin);
    ```
  
    @class UnauthenticatedRouteMixin
    @module ember-simple-auth/mixins/unauthenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is aborts the current
      transition and instead transitions to the
      {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (this.get('session').get('isAuthenticated')) {
        transition.abort();
        _ember['default'].assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== _emberSimpleAuthConfiguration['default'].routeIfAlreadyAuthenticated);
        this.transitionTo(_emberSimpleAuthConfiguration['default'].routeIfAlreadyAuthenticated);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });
});
define('ember-simple-auth/services/session', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var _slice = Array.prototype.slice;

  var SESSION_DATA_KEY_PREFIX = /^data\./;

  var computed = _ember['default'].computed;
  var on = _ember['default'].on;

  /**
    __The session service provides access to the current session as well as
    methods to authenticate and invalidate it__ etc. It is the main interface for
    the application to Ember Simple Auth's functionality. It can be injected via
  
    ```js
    // app/components/login-form.js
    import Ember from 'ember';
  
    export default Ember.Component.extend({
      session: Ember.inject.service('session')
    });
    ```
  
    @class SessionService
    @module ember-simple-auth/services/session
    @extends Ember.Service
    @uses Ember.Evented
    @public
  */
  exports['default'] = _ember['default'].Service.extend(_ember['default'].Evented, {
    /**
      Triggered whenever the session is successfully authenticated. This happens
      when the session gets authenticated via
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}} but also
      when the session is authenticated in another tab or window of the same
      application and the session state gets synchronized across tabs or windows
      via the store (see
      {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
       When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
      event will automatically get handled (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
       @event authenticationSucceeded
      @public
    */

    /**
      Triggered whenever the session is successfully invalidated. This happens
      when the session gets invalidated via
      {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}} but also
      when the session is invalidated in another tab or window of the same
      application and the session state gets synchronized across tabs or windows
      via the store (see
      {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
       When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
      event will automatically get handled (see
      {{#crossLink "ApplicationRouteMixin/sessionInvalidated:method"}}{{/crossLink}}).
       @event invalidationSucceeded
      @public
    */

    /**
      Returns whether the session is currently authenticated.
       @property isAuthenticated
      @type Boolean
      @readOnly
      @default false
      @public
    */
    isAuthenticated: computed.oneWay('session.isAuthenticated'),

    /**
      The current session data as a plain object. The
      `authenticated` key holds the session data that the authenticator resolved
      with when the session was authenticated (see
      {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}) and
      that will be cleared when the session is invalidated. This data cannot be
      written. All other session data is writable and will not be cleared when
      the session is invalidated.
       @property data
      @type Object
      @readOnly
      @default { authenticated: {} }
      @public
    */
    data: computed.oneWay('session.content'),

    /**
      The session store.
       @property store
      @type BaseStore
      @readOnly
      @default null
      @public
    */
    store: computed.oneWay('session.store'),

    /**
      A previously attempted but intercepted transition (e.g. by the
      {{#crossLink "AuthenticatedRouteMixin"}}{{/crossLink}}). If an attempted
      transition is present, the
      {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} will retry it when the
      session becomes authenticated (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
       @property attemptedTransition
      @type Transition
      @default null
      @public
    */
    attemptedTransition: computed.alias('session.attemptedTransition'),

    set: function set(key, value) {
      var setsSessionData = SESSION_DATA_KEY_PREFIX.test(key);
      if (setsSessionData) {
        var sessionDataKey = 'session.' + key.replace(SESSION_DATA_KEY_PREFIX, '');
        return this._super(sessionDataKey, value);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    _forwardSessionEvents: on('init', function () {
      var _this = this,
          _arguments = arguments;

      _ember['default'].A(['authenticationSucceeded', 'invalidationSucceeded']).forEach(function (event) {
        // the internal session won't be available in route unit tests
        var session = _this.get('session');
        if (session) {
          session.on(event, function () {
            _this.trigger.apply(_this, [event].concat(_slice.call(_arguments)));
          });
        }
      });
    }),

    /**
      __Authenticates the session with an `authenticator`__ and appropriate
      arguments. The authenticator implements the actual steps necessary to
      authenticate the session (see
      {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}) and
      returns a promise after doing so. The session handles the returned promise
      and when it resolves becomes authenticated, otherwise remains
      unauthenticated. All data the authenticator resolves with will be
      accessible via the
      {{#crossLink "SessionService/data:property"}}session data's{{/crossLink}}
      `authenticated` property.
       __This method returns a promise. A resolving promise indicates that the
      session was successfully authenticated__ while a rejecting promise
      indicates that authentication failed and the session remains
      unauthenticated. The promise does not resolve with a value; instead, the
      data returned from the authenticator is available via the
      {{#crossLink "SessionService/data:property"}}{{/crossLink}} property.
       When authentication succeeds this will trigger the
      {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
      event.
       @method authenticate
      @param {String} authenticator The authenticator to use to authenticate the session
      @param {Any} [...args] The arguments to pass to the authenticator; depending on the type of authenticator these might be a set of credentials, a Facebook OAuth Token, etc.
      @return {Ember.RSVP.Promise} A promise that resolves when the session was authenticated successfully and rejects otherwise
      @public
    */
    authenticate: function authenticate() {
      var session = this.get('session');
      return session.authenticate.apply(session, arguments);
    },

    /**
      __Invalidates the session with the authenticator it is currently
      authenticated with__ (see
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}). This
      invokes the authenticator's
      {{#crossLink "BaseAuthenticator/invalidate:method"}}{{/crossLink}} method
      and handles the returned promise accordingly.
       This method returns a promise. A resolving promise indicates that the
      session was successfully invalidated while a rejecting promise indicates
      that invalidation failed and the session remains authenticated. Once the
      session is successfully invalidated it clears all of its authenticated data
      (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
       When invalidation succeeds this will trigger the
      {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
      event.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that resolves when the session was invalidated successfully and rejects otherwise
      @public
    */
    invalidate: function invalidate() {
      var session = this.get('session');
      return session.invalidate.apply(session, arguments);
    },

    /**
      Authorizes a block of code with an authorizer (see
      {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) if the
      session is authenticated. If the session is not currently authenticated
      this method does nothing.
       ```js
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        xhr.setRequestHeader(headerName, headerValue);
      });
      ```
       @method authorize
      @param {String} authorizer The authorizer to authorize the block with
      @param {Function} block The block of code to call with the authorization data generated by the authorizer
      @public
    */
    authorize: function authorize(authorizerFactory, block) {
      if (this.get('isAuthenticated')) {
        var authorizer = this.container.lookup(authorizerFactory);
        var sessionData = this.get('data.authenticated');
        authorizer.authorize(sessionData, block);
      }
    }
  });
});
define('ember-simple-auth/session-stores/adaptive', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/session-stores/local-storage', 'ember-simple-auth/session-stores/cookie'], function (exports, _ember, _emberSimpleAuthSessionStoresBase, _emberSimpleAuthSessionStoresLocalStorage, _emberSimpleAuthSessionStoresCookie) {
  /* global localStorage */
  'use strict';

  var computed = _ember['default'].computed;
  var on = _ember['default'].on;

  var LOCAL_STORAGE_TEST_KEY = '_ember_simple_auth_test_key';

  /**
    Session store that persists data in the browser's `localStorage` (see
    {{#crossLink "LocalStorageStore"}}{{/crossLink}}) if that is available or in
    a cookie (see {{#crossLink "CookieStore"}}{{/crossLink}}) if it is not.
  
    __This is the default store that Ember Simple Auth will use when the
    application doesn't define a custom store.__
  
    @class AdaptiveStore
    @module ember-simple-auth/session-stores/adaptive
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    /**
      The `localStorage` key the store persists data in if `localStorage` is
      available.
       @property localStorageKey
      @type String
      @default 'ember_simple_auth:session'
      @public
    */
    localStorageKey: 'ember_simple_auth:session',

    /**
      The domain to use for the cookie if `localStorage` is not available, e.g.,
      "example.com", ".example.com" (which includes all subdomains) or
      "subdomain.example.com". If not explicitly set, the cookie domain defaults
      to the domain the session was authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie to use if `localStorage` is not available.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds if `localStorage` is not
      available. A value of `null` will make the cookie a session cookie that
      expires and gets deleted when the browser is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _isLocalStorageAvailable: computed(function () {
      try {
        localStorage.setItem(LOCAL_STORAGE_TEST_KEY, true);
        localStorage.removeItem(LOCAL_STORAGE_TEST_KEY);
        return true;
      } catch (e) {
        return false;
      }
    }),

    _createStore: function _createStore(storeType, options) {
      var _this = this;

      var store = storeType.create(options);
      store.on('sessionDataUpdated', function (data) {
        _this.trigger('sessionDataUpdated', data);
      });
      return store;
    },

    _setupStore: on('init', function () {
      var store = undefined;
      if (this.get('_isLocalStorageAvailable')) {
        var options = { key: this.get('localStorageKey') };
        store = this._createStore(_emberSimpleAuthSessionStoresLocalStorage['default'], options);
      } else {
        var options = this.getProperties('cookieDomain', 'cookieName', 'cookieExpirationTime');
        store = this._createStore(_emberSimpleAuthSessionStoresCookie['default'], options);
      }
      this.set('_store', store);
    }),

    /**
      Persists the `data` in the `localStorage` if it is available or in a cookie
      if it is not.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist() {
      var _get;

      (_get = this.get('_store')).persist.apply(_get, arguments);
    },

    /**
      Returns all data currently stored in the `localStorage` if that is
      available - or if it is not, in the cookie - as a plain object.
       @method restore
      @return {Object} The data currently persisted in the `localStorage`.
      @public
    */
    restore: function restore() {
      return this.get('_store').restore();
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage` if that is available or by deleting the cookie if it is not.
       @method clear
      @public
    */
    clear: function clear() {
      this.get('_store').clear();
    }
  });
});
define('ember-simple-auth/session-stores/base', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
    The base class for all session stores. __This serves as a starting point for
    implementing custom session stores and must not be used directly.__
  
    Session Stores persist the session's state so that it survives a page reload
    and is synchronized across multiple tabs or windows of the same application.
  
    @class BaseStore
    @module ember-simple-auth/session-stores/base
    @extends Ember.Object
    @uses Ember.Evented
    @public
  */
  exports['default'] = _ember['default'].Object.extend(_ember['default'].Evented, {
    /**
      Triggered when the session store's data changes due to an external event,
      e.g. from another tab or window of the same application. The session
      handles that event, passes the updated data to its authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}} method and
      handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      Persists the `data`. This replaces all currently stored data.
       `BaseStores`'s implementation does nothing. __This method must be
      overridden in subclasses__.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist() {},

    /**
      Returns all data currently stored as a plain object.
       `BaseStores`'s implementation returns an empty object. __This method must
      be overridden in subclasses__.
       @method restore
      @return {Object} The data currently persisted in the store.
      @public
    */
    restore: function restore() {
      return {};
    },

    /**
      Clears the store.
       `BaseStores`'s implementation does nothing. __This method must be
      overridden in subclasses__.
       @method clear
      @public
    */
    clear: function clear() {}
  });
});
define('ember-simple-auth/session-stores/cookie', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal'], function (exports, _ember, _emberSimpleAuthSessionStoresBase, _emberSimpleAuthUtilsObjectsAreEqual) {
  'use strict';

  var computed = _ember['default'].computed;
  var on = _ember['default'].on;

  /**
    Session store that persists data in a cookie.
  
    By default the cookie session store uses a session cookie that expires and is
    deleted when the browser is closed. The cookie expiration period can be
    configured by setting the
    {{#crossLink "CookieStore/cookieExpirationTime:property"}}{{/crossLink}}
    property. This can be used to implement "remember me" functionality that will
    either store the session persistently or in a session cookie depending on
    whether the user opted in or not:
  
    ```js
    // app/controllers/login.js
    export default Ember.Controller.extend({
      rememberMe: false,
  
      _rememberMeChanged: Ember.observer('rememberMe', function() {
        const expirationTime = this.get('rememberMe') ? (14 * 24 * 60 * 60) : null;
        this.set('session.store.cookieExpirationTime', expirationTime);
      }
    });
    ```
  
    __In order to keep multiple tabs/windows of an application in sync, this
    store has to periodically (every 500ms) check the cookie for changes__ as
    there are no events for cookie changes that the store could subscribe to. If
    the application does not need to make sure all session data is deleted when
    the browser is closed, the
    {{#crossLink "LocalStorageStore"}}`localStorage` session store{{/crossLink}}
    should be used.
  
    @class CookieStore
    @module ember-simple-auth/session-stores/cookie
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    /**
      The domain to use for the cookie, e.g., "example.com", ".example.com"
      (which includes all subdomains) or "subdomain.example.com". If not
      explicitly set, the cookie domain defaults to the domain the session was
      authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds. A value of `null` will make
      the cookie a session cookie that expires and gets deleted when the browser
      is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _secureCookies: window.location.protocol === 'https:',

    _syncDataTimeout: null,

    _renewExpirationTimeout: null,

    _isPageVisible: computed(function () {
      var visibilityState = document.visibilityState || 'visible';
      return visibilityState === 'visible';
    }).volatile(),

    _setup: on('init', function () {
      this._syncData();
      this._renewExpiration();
    }),

    /**
      Persists the `data` in the cookie.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      data = JSON.stringify(data || {});
      var expiration = this._calculateExpirationTime();
      this._write(data, expiration);
      this._lastData = this.restore();
    },

    /**
      Returns all data currently stored in the cookie as a plain object.
       @method restore
      @return {Object} The data currently persisted in the cookie.
      @public
    */
    restore: function restore() {
      var data = this._read(this.cookieName);
      if (_ember['default'].isEmpty(data)) {
        return {};
      } else {
        return JSON.parse(data);
      }
    },

    /**
      Clears the store by deleting the cookie.
       @method clear
      @public
    */
    clear: function clear() {
      this._write(null, 0);
      this._lastData = {};
    },

    _read: function _read(name) {
      var value = document.cookie.match(new RegExp(name + '=([^;]+)')) || [];
      return decodeURIComponent(value[1] || '');
    },

    _calculateExpirationTime: function _calculateExpirationTime() {
      var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
      cachedExpirationTime = !!cachedExpirationTime ? new Date().getTime() + cachedExpirationTime * 1000 : null;
      return !!this.cookieExpirationTime ? new Date().getTime() + this.cookieExpirationTime * 1000 : cachedExpirationTime;
    },

    _write: function _write(value, expiration) {
      var path = '; path=/';
      var domain = _ember['default'].isEmpty(this.cookieDomain) ? '' : '; domain=' + this.cookieDomain;
      var expires = _ember['default'].isEmpty(expiration) ? '' : '; expires=' + new Date(expiration).toUTCString();
      var secure = !!this._secureCookies ? ';secure' : '';
      document.cookie = this.cookieName + '=' + encodeURIComponent(value) + domain + path + expires + secure;
      if (expiration !== null) {
        var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
        document.cookie = this.cookieName + ':expiration_time=' + encodeURIComponent(this.cookieExpirationTime || cachedExpirationTime) + domain + path + expires + secure;
      }
    },

    _syncData: function _syncData() {
      var data = this.restore();
      if (!(0, _emberSimpleAuthUtilsObjectsAreEqual['default'])(data, this._lastData)) {
        this._lastData = data;
        this.trigger('sessionDataUpdated', data);
      }
      if (!_ember['default'].testing) {
        _ember['default'].run.cancel(this._syncDataTimeout);
        this._syncDataTimeout = _ember['default'].run.later(this, this._syncData, 500);
      }
    },

    _renew: function _renew() {
      var data = this.restore();
      if (!_ember['default'].isEmpty(data) && data !== {}) {
        data = _ember['default'].typeOf(data) === 'string' ? data : JSON.stringify(data || {});
        var expiration = this._calculateExpirationTime();
        this._write(data, expiration);
      }
    },

    _renewExpiration: function _renewExpiration() {
      if (this.get('_isPageVisible')) {
        this._renew();
      }
      if (!_ember['default'].testing) {
        _ember['default'].run.cancel(this._renewExpirationTimeout);
        this._renewExpirationTimeout = _ember['default'].run.later(this, this._renewExpiration, 60000);
      }
    }
  });
});
define('ember-simple-auth/session-stores/ephemeral', ['exports', 'ember', 'ember-simple-auth/session-stores/base'], function (exports, _ember, _emberSimpleAuthSessionStoresBase) {
  'use strict';

  var on = _ember['default'].on;

  /**
    Session store that __persists data in memory and thus is not actually
    persistent__. It does also not synchronize the session's state across
    multiple tabs or windows as those cannot share memory. __This store is mainly
    useful for testing and will automatically be used when running tests.__
  
    @class EphemeralStore
    @module ember-simple-auth/session-stores/ephemeral
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    _setup: on('init', function () {
      this.clear();
    }),

    /**
      Persists the `data`. This replaces all currently stored data.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      this._data = JSON.stringify(data || {});
    },

    /**
      Returns all data currently stored as a plain object.
       @method restore
      @return {Object} The data currently persisted in the store.
      @public
    */
    restore: function restore() {
      return JSON.parse(this._data) || {};
    },

    /**
      Clears the store.
       @method clear
      @public
    */
    clear: function clear() {
      delete this._data;
      this._data = '{}';
    }
  });
});
define('ember-simple-auth/session-stores/local-storage', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal'], function (exports, _ember, _emberSimpleAuthSessionStoresBase, _emberSimpleAuthUtilsObjectsAreEqual) {
  /* global localStorage */
  'use strict';

  var on = _ember['default'].on;

  /**
    Session store that persists data in the browser's `localStorage`.
  
    __`localStorage` is not available in Safari when running in private mode. In
    general it is better to use the
    {{#crossLink "AdaptiveStore"}}{{/crossLink}} that automatically falls back to
    the {{#crossLink "CookieStore"}}{{/crossLink}} when `localStorage` is not
    available.__
  
    @class LocalStorageStore
    @module ember-simple-auth/session-stores/local-storage
    @extends BaseStore
    @public
  */
  exports['default'] = _emberSimpleAuthSessionStoresBase['default'].extend({
    /**
      The `localStorage` key the store persists data in.
       @property key
      @type String
      @default 'ember_simple_auth:session'
      @public
    */
    key: 'ember_simple_auth:session',

    _setup: on('init', function () {
      this._bindToStorageEvents();
    }),

    /**
      Persists the `data` in the `localStorage`.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      data = JSON.stringify(data || {});
      localStorage.setItem(this.key, data);
      this._lastData = this.restore();
    },

    /**
      Returns all data currently stored in the `localStorage` as a plain object.
       @method restore
      @return {Object} The data currently persisted in the `localStorage`.
      @public
    */
    restore: function restore() {
      var data = localStorage.getItem(this.key);
      return JSON.parse(data) || {};
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage`.
       @method clear
      @public
    */
    clear: function clear() {
      localStorage.removeItem(this.key);
      this._lastData = {};
    },

    _bindToStorageEvents: function _bindToStorageEvents() {
      var _this = this;

      _ember['default'].$(window).bind('storage', function () {
        var data = _this.restore();
        if (!(0, _emberSimpleAuthUtilsObjectsAreEqual['default'])(data, _this._lastData)) {
          _this._lastData = data;
          _this.trigger('sessionDataUpdated', data);
        }
      });
    }
  });
});
define("ember-simple-auth/utils/inject", ["exports"], function (exports) {
  "use strict";

  exports["default"] = function (registry, factoryNameOrType, property, injectionName) {
    var inject = registry.inject || registry.injection;
    inject.call(registry, factoryNameOrType, property, injectionName);
  };
});
define("ember-simple-auth/utils/lookup", ["exports"], function (exports) {
  "use strict";

  exports["default"] = function (instance, factoryName) {
    if (instance.lookup) {
      return instance.lookup(factoryName);
    } else {
      return instance.container.lookup(factoryName);
    }
  };
});
define('ember-simple-auth/utils/objects-are-equal', ['exports'], function (exports) {
  'use strict';

  exports['default'] = objectsAreEqual;

  function objectsAreEqual(a, b) {
    function compare(x, y) {
      var property = undefined;
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
      }

      if (x === y) {
        return true;
      }

      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }

      for (property in y) {
        if (y.hasOwnProperty(property) !== x.hasOwnProperty(property)) {
          return false;
        } else if (typeof y[property] !== typeof x[property]) {
          return false;
        }
      }

      for (property in x) {
        if (y.hasOwnProperty(property) !== x.hasOwnProperty(property)) {
          return false;
        } else if (typeof y[property] !== typeof x[property]) {
          return false;
        }

        switch (typeof x[property]) {
          case 'object':
            if (!compare(x[property], y[property])) {
              return false;
            }
            break;
          default:
            if (x[property] !== y[property]) {
              return false;
            }
            break;
        }
      }

      return true;
    }

    return compare(a, b);
  }
});
define('ember-simple-auth', ['ember-simple-auth/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('semantic-ui-ember/components/ui-accordion', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  var Accordion = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'accordion',
    classNames: ['ui', 'accordion']
  });

  exports['default'] = Accordion;
});
define('semantic-ui-ember/components/ui-checkbox', ['exports', 'ember', 'semantic-ui-ember/mixins/checkbox-mixin'], function (exports, _ember, _semanticUiEmberMixinsCheckboxMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsCheckboxMixin['default'], {
    type: 'checkbox',
    checked: false,

    _onChange: function _onChange() {
      this.set('checked', this.$('input').prop('checked'));
    }
  });
});
define('semantic-ui-ember/components/ui-dropdown-item', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    classNames: ['item'],
    tagName: 'div',

    initialize: _ember['default'].on('init', function () {
      _ember['default'].run.scheduleOnce('afterRender', this, this.update_data);
    }),

    update_data: function update_data() {
      if (this.$().data('value')) {
        return;
      }

      this.$().data('value', this.get('content'));
    }
  });
});
define('semantic-ui-ember/components/ui-dropdown', ['exports', 'ember', 'semantic-ui-ember/mixins/base', 'semantic-ui-ember/mixins/data-attributes'], function (exports, _ember, _semanticUiEmberMixinsBase, _semanticUiEmberMixinsDataAttributes) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], _semanticUiEmberMixinsDataAttributes['default'], {
    module: 'dropdown',
    classNames: ['ui', 'dropdown'],
    tagName: 'div',

    initialize: _ember['default'].on('didInsertElement', function () {
      var selected = this.get('selected');
      if (typeof selected !== "undefined" && selected !== null) {
        this.set('boundValue', 'selected');
        this.execute('set selected', selected);
      }

      var value = this.get('value');
      if (typeof value !== "undefined" && value !== null) {
        _ember['default'].deprecate('Bind to selected on ui-dropdown instead of value as semantic doesn\'t update the display when the value is set', false);
        this.set('boundValue', 'value');
        this.execute('set value', value);
      }
    }),

    _onChange: function _onChange(value /*, text, $element*/) {
      this.set(this.get('boundValue') || 'selected', value);
    }
  });
});
define('semantic-ui-ember/components/ui-embed', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'embed',
    classNames: ['ui', 'embed'],
    attributeBindings: ['data-id', 'data-source', 'data-placeholder', 'data-url', 'data-icon']
  });
});
define('semantic-ui-ember/components/ui-modal', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'modal',
    classNames: ['ui', 'modal'],
    detachable: false,
    name: null
  });
});
define('semantic-ui-ember/components/ui-nag', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'nag',
    classNames: ['ui', 'nag'],
    attributeBindings: ['storageMethod', 'key', 'expires', 'domain', 'path', 'value'],

    init: function init() {
      this._super();
      this.execute('show');
    }
  });
});
define('semantic-ui-ember/components/ui-popup', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'popup',
    attributeBindings: ['content:data-content'],

    contentChanges: _ember['default'].observer('content', function () {
      this.didInsertElement();
    })
  });
});
define('semantic-ui-ember/components/ui-progress', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  var Progress = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'progress',
    classNames: ['ui', 'progress'],
    attributeBindings: ['percent', 'total', 'value']
  });

  exports['default'] = Progress;
});
define('semantic-ui-ember/components/ui-radio', ['exports', 'ember', 'semantic-ui-ember/mixins/checkbox-mixin'], function (exports, _ember, _semanticUiEmberMixinsCheckboxMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsCheckboxMixin['default'], {
    type: 'radio',
    classNames: ['radio'],
    name: 'default',

    init: function init() {
      this._super();

      if (!(this.get('name') && this.get('name') !== 'default')) {
        _ember['default'].Logger.warn('Name was not passed into semantic radio component');
      }
    },

    _onChange: function _onChange() {
      this.set('current', this.get('value'));
    },

    checked: _ember['default'].computed('current', 'value', function () {
      return this.get('current') === this.get('value');
    })
  });
});
define('semantic-ui-ember/components/ui-rating', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  var Rating = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'rating',
    classNames: ['ui', 'rating'],

    init: function init() {
      this._super();

      if (!this.get('initialRating') && this.get('rating')) {
        this.set('initialRating', this.get('rating'));
      }
    }
  });

  exports['default'] = Rating;
});
define('semantic-ui-ember/components/ui-search', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'search',
    classNames: ['ui', 'search'],

    /**
      Proxying all the attributes to apiSettings
    */
    apiSettings: _ember['default'].computed.alias('attrs')
  });
});
define('semantic-ui-ember/components/ui-shape', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'shape',
    classNames: ['ui', 'shape']
  });
});
define('semantic-ui-ember/components/ui-sidebar', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'sidebar',
    classNames: ['ui', 'sidebar']
  });
});
define('semantic-ui-ember/components/ui-sticky', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_semanticUiEmberMixinsBase['default'], {
    module: 'sticky',
    classNames: ['ui', 'sticky']
  });
});
define('semantic-ui-ember/mixins/base', ['exports', 'ember', 'semantic-ui-ember/semantic'], function (exports, _ember, _semanticUiEmberSemantic) {
  'use strict';

  // Static properties to ignore
  var DEBUG = ['debug', 'performance', 'verbose'];
  var STANDARD = ['name', 'namespace', 'className', 'error', 'metadata', 'selector'];
  var EMBER = ['context', 'on', 'template', 'execute'];

  _semanticUiEmberSemantic['default'].BaseMixin = _ember['default'].Mixin.create({
    init: function init() {
      this._super();

      if (!this.get('module')) {
        return _ember['default'].Logger.error('Module was not declared on semantic extended type');
      }
    },

    settings: function settings(module) {
      var component, custom, key, prop, value;

      component = window.$.fn[module];
      if (!component) {
        throw "Unable to find semantic module: " + module;
      }

      custom = {
        debug: _semanticUiEmberSemantic['default'].UI_DEBUG,
        performance: _semanticUiEmberSemantic['default'].UI_PERFORMANCE,
        verbose: _semanticUiEmberSemantic['default'].UI_VERBOSE
      };

      for (key in component.settings) {
        prop = component.settings[key];
        if (window.$.inArray(key, DEBUG) >= 0) {
          continue;
        }

        if (window.$.inArray(key, STANDARD) >= 0) {
          continue;
        }

        if (typeof prop === 'function' && typeof (this.get(key) || this.get('_' + key)) !== 'function') {
          continue;
        }

        if (window.$.inArray(key, EMBER) >= 0) {
          value = this.get('ui_' + key);
        } else {
          if (typeof this.get(key) !== 'undefined') {
            value = this.get(key);
          } else {
            value = this.get('_' + key);
          }
        }

        if (value != null) {
          if (typeof value === 'function') {
            custom[key] = _ember['default'].run.bind(this, this.updateFunctionWithParameters(key, value));
          } else {
            custom[key] = value;
          }
        }
      }

      return custom;
    },

    updateProperty: function updateProperty(property) {
      return function () {
        this.execute('set ' + property, this.get(property));
      };
    },

    updateFunctionWithParameters: function updateFunctionWithParameters(key, fn) {
      return function () {
        var args = [].splice.call(arguments, 0);
        var internal = this.get('_' + key);

        if (internal) {
          internal.apply(this, args);
        }

        if (internal !== fn) {
          return fn.apply(this, [this].concat(args));
        }

        return true;
      };
    },

    didInsertElement: function didInsertElement() {
      this.$()[this.get("module")](this.settings(this.get("module")));

      var _this = this;
      var properties = {};
      // Modules without setable properties
      if (['accordion', 'nag'].indexOf(this.get('module')) === -1) {
        properties = this.execute('set');
      }
      var property;

      for (property in properties) {
        if (!properties.hasOwnProperty(property)) {
          continue;
        }

        _this.addObserver(property, _this, _this.updateProperty(property));
      }
    },

    willDestroyElement: function willDestroyElement() {
      var name, selector;
      if ((selector = this.$()) != null) {
        if (typeof selector[name = this.get("module")] === "function") {
          return selector[name]('destroy');
        }
      }
    },

    execute: function execute() {
      var selector, module;
      if ((selector = this.$()) != null) {
        if ((module = selector[this.get('module')]) != null) {
          return module.apply(this.$(), arguments);
        }
      }
    }
  });

  exports['default'] = _semanticUiEmberSemantic['default'].BaseMixin;
});
define('semantic-ui-ember/mixins/checkbox-mixin', ['exports', 'ember', 'semantic-ui-ember/mixins/base'], function (exports, _ember, _semanticUiEmberMixinsBase) {
  'use strict';

  /*
   * Checkbox Component Mixin
   */
  var CheckboxMixin = _ember['default'].Mixin.create(_semanticUiEmberMixinsBase['default'], {
    module: 'checkbox',
    classNames: ['ui', 'checkbox'],

    didInsertElement: function didInsertElement() {
      if (this.get("disabled")) {
        return;
      }
      this._super();
    },

    willDestroyElement: function willDestroyElement() {
      if (this.get("disabled")) {
        return;
      }
      this._super();
    }
  });

  exports['default'] = CheckboxMixin;
});
define('semantic-ui-ember/mixins/data-attributes', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    attributeBindings: ['data-test']
  });
});
define('semantic-ui-ember/semantic', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var Semantic = _ember['default'].Namespace.create({
    UI_DEBUG: false,
    UI_PERFORMANCE: false,
    UI_VERBOSE: false
  });

  exports['default'] = Semantic;
});
define('semantic-ui-ember', ['semantic-ui-ember/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});
//# sourceMappingURL=addons.map