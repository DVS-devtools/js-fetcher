// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"l8pq":[function(require,module,exports) {
var global = arguments[3];
/*!
Copyright (C) 2015-2017 Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
'use strict';

function URLSearchParams(query) {
  var
    index, key, value,
    pairs, i, length,
    dict = Object.create(null)
  ;
  this[secret] = dict;
  if (!query) return;
  if (typeof query === 'string') {
    if (query.charAt(0) === '?') {
      query = query.slice(1);
    }
    for (
      pairs = query.split('&'),
      i = 0,
      length = pairs.length; i < length; i++
    ) {
      value = pairs[i];
      index = value.indexOf('=');
      if (-1 < index) {
        appendTo(
          dict,
          decode(value.slice(0, index)),
          decode(value.slice(index + 1))
        );
      } else if (value.length){
        appendTo(
          dict,
          decode(value),
          ''
        );
      }
    }
  } else {
    if (isArray(query)) {
      for (
        i = 0,
        length = query.length; i < length; i++
      ) {
        value = query[i];
        appendTo(dict, value[0], value[1]);
      }
    } else if (query.forEach) {
      query.forEach(addEach, dict);
    } else {
      for (key in query) {
         appendTo(dict, key, query[key]);
      }
    }
  }
}

var
  isArray = Array.isArray,
  URLSearchParamsProto = URLSearchParams.prototype,
  find = /[!'\(\)~]|%20|%00/g,
  plus = /\+/g,
  replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  },
  replacer = function (match) {
    return replace[match];
  },
  secret = '__URLSearchParams__:' + Math.random()
;

function addEach(value, key) {
  /* jshint validthis:true */
  appendTo(this, key, value);
}

function appendTo(dict, name, value) {
  var res = isArray(value) ? value.join(',') : value;
  if (name in dict)
    dict[name].push(res);
  else
    dict[name] = [res];
}

function decode(str) {
  return decodeURIComponent(str.replace(plus, ' '));
}

function encode(str) {
  return encodeURIComponent(str).replace(find, replacer);
}

URLSearchParamsProto.append = function append(name, value) {
  appendTo(this[secret], name, value);
};

URLSearchParamsProto.delete = function del(name) {
  delete this[secret][name];
};

URLSearchParamsProto.get = function get(name) {
  var dict = this[secret];
  return name in dict ? dict[name][0] : null;
};

URLSearchParamsProto.getAll = function getAll(name) {
  var dict = this[secret];
  return name in dict ? dict[name].slice(0) : [];
};

URLSearchParamsProto.has = function has(name) {
  return name in this[secret];
};

URLSearchParamsProto.set = function set(name, value) {
  this[secret][name] = ['' + value];
};

URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
  var dict = this[secret];
  Object.getOwnPropertyNames(dict).forEach(function(name) {
    dict[name].forEach(function(value) {
      callback.call(thisArg, value, name, this);
    }, this);
  }, this);
};

/*
URLSearchParamsProto.toBody = function() {
  return new Blob(
    [this.toString()],
    {type: 'application/x-www-form-urlencoded'}
  );
};
*/

URLSearchParamsProto.toJSON = function toJSON() {
  return {};
};

URLSearchParamsProto.toString = function toString() {
  var dict = this[secret], query = [], i, key, name, value;
  for (key in dict) {
    name = encode(key);
    for (
      i = 0,
      value = dict[key];
      i < value.length; i++
    ) {
      query.push(name + '=' + encode(value[i]));
    }
  }
  return query.join('&');
};

URLSearchParams = (module.exports = global.URLSearchParams || URLSearchParams);

(function (URLSearchParamsProto) {

  var iterable = (function () {
    try {
      return !!Symbol.iterator;
    } catch(error) {
      return false;
    }
  }());

  // mostly related to issue #24
  if (!('forEach' in URLSearchParamsProto)) {
    URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
      var names = Object.create(null);
      this.toString()
          .replace(/=[\s\S]*?(?:&|$)/g, '=')
          .split('=')
          .forEach(function (name) {
            if (!name.length || name in names) return;
            (names[name] = this.getAll(name)).forEach(function(value) {
              callback.call(thisArg, value, name, this);
            }, this);
          }, this);
    };
  }

  if (!('keys' in URLSearchParamsProto)) {
    URLSearchParamsProto.keys = function keys() {
      var items = [];
      this.forEach(function(value, name) { items.push(name); });
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    };
  }

  if (!('values' in URLSearchParamsProto)) {
    URLSearchParamsProto.values = function values() {
      var items = [];
      this.forEach(function(value) { items.push(value); });
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    };
  }

  if (!('entries' in URLSearchParamsProto)) {
    URLSearchParamsProto.entries = function entries() {
      var items = [];
      this.forEach(function(value, name) { items.push([name, value]); });
      var iterator = {
        next: function() {
          var value = items.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    };
  }

  if (iterable && !(Symbol.iterator in URLSearchParamsProto)) {
    URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
  }

  if (!('sort' in URLSearchParamsProto)) {
    URLSearchParamsProto.sort = function sort() {
      var
        entries = this.entries(),
        entry = entries.next(),
        done = entry.done,
        keys = [],
        values = Object.create(null),
        i, key, value
      ;
      while (!done) {
        value = entry.value;
        key = value[0];
        keys.push(key);
        if (!(key in values)) {
          values[key] = [];
        }
        values[key].push(value[1]);
        entry = entries.next();
        done = entry.done;
      }
      // not the champion in efficiency
      // but these two bits just do the job
      keys.sort();
      for (i = 0; i < keys.length; i++) {
        this.delete(keys[i]);
      }
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        this.append(key, values[key].shift());
      }
    };
  }

}(URLSearchParams.prototype));

},{}],"jWsf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResponse = parseResponse;
exports.isAbsoluteUrl = isAbsoluteUrl;
exports.compose = compose;

var _urlSearchParams = _interopRequireDefault(require("url-search-params"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Parse the fetch response (call the response json function)
 * @param {Object} res
 * @return {Promise<any>}
 */
function parseResponse(res) {
  return res.json();
}
/**
 * @description Check if the given string is an absolute url (starts with http(s))
 * @param {String} str
 * @return {boolean}
 * @example
 * isAbsoluteUrl('http://endpoint.com/api/users') // true
 * isAbsoluteUrl('/api/users') // false
 */


function isAbsoluteUrl(str) {
  var regex = /(https?)?:?\/\//g;
  return regex.test(str);
}
/**
 * @description Append the given query params object to the given url as queryparams
 * @param {string} url
 * @param {Object} queryParams
 * @return {String}
 * @example
 * compose('http://endpoint.com/api/users', {page: 1, limit: 10}); // http://endpoint.com/api/users?page=1&limit=10
 */


function compose(url, queryParams) {
  var splittedUrl = url.split('?');
  var endpoint = splittedUrl[0];
  var params = splittedUrl.length > 0 ? splittedUrl[1] : '';
  var urlSearchParams = new _urlSearchParams.default(params);
  Object.keys(queryParams).forEach(function (key) {
    urlSearchParams.set(key, queryParams[key]);
  });
  return "".concat(endpoint, "?").concat(urlSearchParams.toString());
}
},{"url-search-params":"l8pq"}],"eJQ5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../utils/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description A simple fetcher class to better window.fetch interface
 * @example
 * const apiFetcher = new Fetcher({
 *     baseURL: 'http://api.com/api/v1',
 *     options: {
 *         headers: {
 *             'Content-Type': 'application/x-www-form-urlencoded',
 *         }
 *     }
 * });
 * // set an Authorization header for all requests
 * apiFetcher.options.headers['Authorization'] = 'Bearer <TOKEN>';
 * apiFetcher.get('/v01/users').then(res => res.json());
 * apiFetcher.post('/v01/user', {}, { credentials: 'include', body: JSON.stringify(asd) });
 */
var Fetcher =
/*#__PURE__*/
function () {
  /**
   * @description Creates an instance of Fetcher.
   * @param {Object} [options = {}]
   * @param {String} [options.baseURL = window.location.origin]
   * The baseURL to prepend to the given relative paths
   * @param {Object} [options.options = {}] the options same as fetch spec
   * @param {TokenGenerator} [tokenGenerator=null] - the token generator instance
   */
  function Fetcher() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$baseURL = _ref.baseURL,
        baseURL = _ref$baseURL === void 0 ? window.location.origin : _ref$baseURL,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options;

    var tokenGenerator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Fetcher);

    this.baseURL = baseURL;
    this.options = options;
    this.tokenGenerator = tokenGenerator;
    this.normalizeURL = this.normalizeURL.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }
  /**
   * @description set the token generator after initialization
   * token generator must have a .generate<Promise> method
   * @param {TokenGenerator} [tokenGenerator=null]
   * @example
   * const fetcher = new Fetcher();
   * const generator = new TokenGenerator();
   * fetcher.setTokenGenerator(generator);
   */


  _createClass(Fetcher, [{
    key: "setTokenGenerator",
    value: function setTokenGenerator() {
      var tokenGenerator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (tokenGenerator && typeof tokenGenerator.generate === 'function') {
        this.tokenGenerator = tokenGenerator;
      } else {
        this.tokenGenerator = null;
      }
    }
    /**
     * @ignore
     * @description add the baseUrl if the passed url is not absolute
     * @param {any} url
     * @return {String}
     */

  }, {
    key: "normalizeURL",
    value: function normalizeURL(url) {
      if (!url) {
        throw new Error('Not valid url given');
      }

      return (0, _index.isAbsoluteUrl)(url) ? url : this.baseURL + url;
    }
    /**
     * @ignore
     * @description called by the Fetcher Api,
     * perform the real fetch request based on the given arguments.
     * Avoid to use it directly to prevent unexpected behaviour
     * @param {String} url - absolute or relative url
     * @param {Object} params - params to append in querystring
     * @param {Object} options - the options same as fetch spec
     * @param {String} method - the request method
     * @param {boolean} [parse = true] - if the response should be a raw http response or be parsed
     * @return {PromiseLike<T | never>}
     */

  }, {
    key: "performFetch",
    value: function performFetch(url, params, options, method) {
      var _this = this;

      var parse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var refreshTokenTask = this.refreshToken();
      return refreshTokenTask.then(function () {
        return fetch(_this.normalizeURL((0, _index.compose)(url, params)), Object.assign({}, _this.options, options, {
          method: method
        }));
      }).then(function (res) {
        return parse ? (0, _index.parseResponse)(res) : res;
      }); // eslint-disable-line no-confusing-arrow
    }
    /**
     * @description perform a GET request
     * @param {String} url - absolute or relative url
     * @param {Object} [params={}] - params to append in querystring
     * @param {Object} [options={}] - the options same as fetch spec
     * @param {boolean} [parse = true] - if the response should be a raw http response or be parsed
     * @return {PromiseLike<T|never>}
     * @example
     * fetcher.get('/api/v1/users', {page: 1, limit: 10})
     *     .then(users => {
     *         // Do something with the json result...
     *     });
     */

  }, {
    key: "get",
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return this.performFetch(url, params, options, 'GET', parse);
    }
    /**
     * @description Perform a POST request
     * @param {String} url - absolute or relative url
     * @param {Object} [params={}] - params to append in querystring
     * @param {Object} [options={}] - the options same as fetch spec
     * @param {boolean} [parse = true] - if the response should be a raw http response or be parsed
     * @return {PromiseLike<T|never>}
     * @example
     * fetcher.post('/api/v1/users', {}, {
     *     body: JSON.stringify({name: 'foo', email: 'foo@bar.baz'
     * })}).then(res => {
     *   // Do something with the json result...
     * });
     */

  }, {
    key: "post",
    value: function post(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return this.performFetch(url, params, options, 'POST', parse);
    }
    /**
     * @description Perform an HEAD request
     * @param {String} url - absolute or relative url
     * @param {Object} [params={}] - params to append in querystring
     * @param {Object} [options={}] - the options same as fetch spec
     * @param {boolean} [parse = true] - if the response should be a raw http response or be parsed
     * @return {PromiseLike<T|never>}
     * @example
     * fetcher.head('/api/v1/users')
     *     .then(res => {
     *         // Do something with the json result...
     *     });
     */

  }, {
    key: "head",
    value: function head(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return this.performFetch(url, params, options, 'HEAD', parse);
    }
    /**
     * @description Perform a PUT request
     * @param {String} url - absolute or relative url
     * @param {Object} [params={}] - params to append in querystring
     * @param {Object} [options={}] - the options same as fetch spec
     * @param {boolean} [parse = true] - if the response should be a raw http response or be parsed
     * @return {PromiseLike<T|never>}
     * @example
     * fetcher.put('/api/v1/users/1', {}, {name: 'foo'})
     *     .then(res => {
     *         // Do something with the json result...
     *     });
     */

  }, {
    key: "put",
    value: function put(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return this.performFetch(url, params, options, 'PUT', parse);
    }
    /**
     * @description Perform a DELETE request
     * @param {String} url - absolute or relative url
     * @param {Object} [params={}] - params to append in querystring
     * @param {Object} [options={}] - the options same as fetch spec
     * @param {boolean} [parse = true] - if the response should be a raw http response or be parsed
     * @return {PromiseLike<T|never>}
     * @example
     * fetcher.delete('/api/v1/users/1')
     *     .then(res => {
     *         // Do something with the json result...
     *     });
     */

  }, {
    key: "delete",
    value: function _delete(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return this.performFetch(url, params, options, 'DELETE', parse);
    }
    /**
     * @ignore
     * @description Call the TokenGenerator (if present) to get the Authorization token
     * and set it in the Headers
     * @return {*}
     */

  }, {
    key: "refreshToken",
    value: function refreshToken() {
      var _this2 = this;

      /* eslint-disable dot-notation */
      if (!this.tokenGenerator) {
        return Promise.resolve();
      }

      return this.tokenGenerator.generate().then(function (token) {
        if (!token) {
          delete _this2.options.headers['Authorization'];
        } else {
          _this2.options.headers['Authorization'] = "Bearer ".concat(token);
        }
      }).catch(function () {
        delete _this2.options.headers['Authorization'];
        return Promise.resolve();
      });
      /* eslint-enable dot-notation */
    }
  }]);

  return Fetcher;
}();

var _default = Fetcher;
exports.default = _default;
},{"../utils/index":"jWsf"}],"/zHl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description Class to manage the Authorization token
 * Check if the current one is still valid and fetch a new one if necessary
 * @example
 * const generator = new TokenGenerator({
 *     url: 'http://api.com/auth/refresh',
 *     clientId: 22,
 *     clientSecret: 'secret',
 * })
 * generator.refreshToken()
 *     .then(token => {
 *         // token is a valid token
 *     })
 */
var TokenGenerator =
/*#__PURE__*/
function () {
  /**
   * @description Creates an instance of TokenGenerator.
   * @param {Object} [options = {}]
   * @param {String} [options.url = window.location.origin] The url to call to fetch a new token
   * @param {String | number} [options.clientId] client id to request a new token
   * @param {String} [options.clientSecret] client secret to request a new token
   */
  function TokenGenerator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$url = _ref.url,
        url = _ref$url === void 0 ? window.location.origin : _ref$url,
        clientId = _ref.clientId,
        clientSecret = _ref.clientSecret;

    _classCallCheck(this, TokenGenerator);

    this.currentCall = null;
    this.expire = Date.now() - 1000;
    this.token = null;
    this.url = url;
    Object.defineProperty(this, 'clientId', {
      value: clientId,
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(this, 'clientSecret', {
      value: clientSecret,
      writable: false,
      enumerable: false,
      configurable: false
    });
    this.isExpired = this.isExpired.bind(this);
  }
  /**
   * @description Check if the stored token is expired
   * @return {boolean}
   */


  _createClass(TokenGenerator, [{
    key: "isExpired",
    value: function isExpired() {
      return Date.now() >= this.expire;
    }
    /**
     * @description Generate a new token if the current one is expired, else uses it
     * @return {PromiseLike<T | never> | Promise<T>}
     * @example
     * generator.generate()
     *    .then(token => {
     *        // token is a valid token
     *    })
     */

  }, {
    key: "generate",
    value: function generate() {
      var _this = this;

      if (this.isExpired()) {
        if (this.currentCall) {
          return this.currentCall;
        }

        this.currentCall = fetch(this.url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          body: "k=".concat(this.clientId, "&s=").concat(this.clientSecret) // body: JSON.stringify( { k: this.clientId, s: this.clientSecret })

        }).then(function (resp) {
          return resp.json();
        }).then(function (resp) {
          if (resp.token) {
            _this.currentCall = null;
            _this.token = resp.token;
            _this.expire = resp.expire;
            return _this.token;
          }

          return null;
        }).catch(function (e) {
          _this.currentCall = null;
          throw e;
        });
        return this.currentCall;
      }

      return Promise.resolve(this.token);
    }
  }]);

  return TokenGenerator;
}();

var _default = TokenGenerator;
exports.default = _default;
},{}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Fetcher: true,
  TokenGenerator: true
};
Object.defineProperty(exports, "TokenGenerator", {
  enumerable: true,
  get: function () {
    return _TokenGenerator.default;
  }
});
exports.Fetcher = exports.default = void 0;

var _Fetcher = _interopRequireDefault(require("./Fetcher"));

var _TokenGenerator = _interopRequireDefault(require("./TokenGenerator"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Fetcher.default;
exports.default = _default;
var Fetcher = _Fetcher.default;
exports.Fetcher = Fetcher;
},{"./Fetcher":"eJQ5","./TokenGenerator":"/zHl","./utils":"jWsf"}]},{},["Focm"], null)