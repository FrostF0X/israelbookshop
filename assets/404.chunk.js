(self["webpackChunk"] = self["webpackChunk"] || []).push([[404],{

/***/ 7652
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   kY: () => (/* binding */ transition)
/* harmony export */ });
/* unused harmony exports Animation, AnimationsManager, animation */

  /*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Promisified version of window.requestAnimationFrame.
 * @returns {Promise} Promise will resolve when requestAnimationFrame callback is run.
 */
function raf() {
  return new Promise(function (resolve) {
    window.requestAnimationFrame(resolve);
  });
}
/**
 * Represents an HTML element with associate states
 */


var Animation =
/*#__PURE__*/
function () {
  /**
   * @param {Object} options
   * @param {HTMLElement}  options.el Target element
   * @param {String} [options.state=initial] Initial state. This is also the default state.
   * @param {String} [options.stateAttribute=data-revealer] Attribute name to update with state.
   * @param {String} [options.stateChangeAttribute=data-revealer-transition] Attribute name to
   * update with change of state.
   * @param {String} [options.endEvent=transitionend] Event to listen for at end of state change.
   * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
   * next state change.
   * @param {Function} [options.onStart] Callback to execute immediate after
   * applying stateChangeAttribute.
   */
  function Animation(options) {
    _classCallCheck(this, Animation);

    this._el = options.el;
    this.cancelRunning = null;
    this._state = options.state || 'initial';
    this.initialState = this._state;
    this.stateAttribute = options.stateAttribute || 'data-animation-state';
    this.stateChangeAttribute = options.stateChangeAttribute || 'data-animation';
    this.endEvent = options.endEvent || 'transitionend';
    this.hold = !!options.hold;

    this.onStart = options.onStart || function () {
      /* do nothing */
    };

    this.activeEventHandler = null;
  }
  /**
   * Returns target element
   *
   * @return {HTMLElement} Target element
   */


  _createClass(Animation, [{
    key: "isState",

    /**
     * Check if a state is active
     * @param {String} state State to compare
     *
     * @return {Boolean}
     */
    value: function isState(state) {
      return state === this._state;
    }
    /**
     * Sequences a change to a new state.
     * @param {String} state Target state
     *
     * @param {Boolean} options.force Switch to final state immediately
     *
     * @param {Function} options.onStart Callback to execute immediately after
     * applying stateChangeAttribute for this state change only.
     *
     * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
     * next state change.
     *
     * @return {Promise} Resolves when endEvent triggered
     */

  }, {
    key: "animateTo",
    value: function animateTo(state) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var from = this._el.dataset[this.stateAttribute] || this._state;
      var to = state || this.initialState;
      var force = options.force;
      var hold = 'hold' in options ? options.hold : this.hold;
      return new Promise(function (resolve) {
        if (_this.cancelRunning) {
          _this.cancelRunning();
        }

        if (from === to) {
          // Removing this here fixes some lingering attributes. But why?
          _this._el.removeAttribute(_this.stateChangeAttribute);

          resolve(from, null);
          return;
        }

        var running = true;

        _this.cancelRunning = function () {
          running = false;
          resolve(null, null);
        };

        _this._el.removeEventListener(_this.endEvent, _this.activeEventHandler);

        _this.activeEventHandler = null;

        if (force) {
          _this._el.setAttribute(_this.stateChangeAttribute, "".concat(from, "=>").concat(to));

          _this.onStart({
            el: _this._el,
            from: from,
            to: to
          });

          if (typeof options.onStart === 'function') {
            options.onStart({
              el: _this._el,
              from: from,
              to: to
            });
          }

          _this._el.setAttribute(_this.stateAttribute, to);

          _this._state = to;

          if (!hold) {
            _this._el.removeAttribute(_this.stateChangeAttribute);
          }

          resolve(to, null);
          return;
        }

        raf().then(function () {
          if (!running) throw new Error('cancelled');

          _this._el.setAttribute(_this.stateChangeAttribute, "".concat(from, "=>").concat(to));

          _this.onStart({
            el: _this._el,
            from: from,
            to: to
          });

          if (typeof options.onStart === 'function') {
            options.onStart({
              el: _this._el,
              from: from,
              to: to
            });
          }

          return raf();
        }).then(function () {
          if (!running) throw new Error('cancelled');

          _this._el.removeEventListener(_this.endEvent, _this.activeEventHandler);

          _this.activeEventHandler = function (e) {
            // Ignore any events bubbling up
            if (e.target !== _this._el || !running) return;

            _this._el.removeEventListener(_this.endEvent, _this.activeEventHandler);

            if (!hold) {
              _this._el.removeAttribute(_this.stateChangeAttribute);
            }

            resolve(to, e);
          };

          _this._el.addEventListener(_this.endEvent, _this.activeEventHandler);

          _this._el.setAttribute(_this.stateAttribute, to);

          _this._state = to;
        })["catch"](function (error) {
          // Only catch 'cancelled' errors.
          if (error.message !== 'cancelled') throw error;
        });
      });
    }
    /**
     * Remove any event listeners
     */

  }, {
    key: "unload",
    value: function unload() {
      this._el.removeEventListener(this.endEvent, this.activeEventHandler);

      this.activeEventHandler = null;
    }
  }, {
    key: "el",
    get: function get() {
      return this._el;
    }
    /**
     * Returns current state
     *
     * @return {String} Current state
     */

  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }]);

  return Animation;
}();

/**
 * Manage state changes for a set of elements
 */

var AnimationsManager =
/*#__PURE__*/
(/* unused pure expression or super */ null && (function () {
  function AnimationsManager() {
    _classCallCheck(this, AnimationsManager);

    this.animations = new Map();
  }
  /**
   * Add a new element and return an animation for that element. If element already has an associated animation, return that animation.
   * @param {Object} options
   * @param {HTMLElement}  options.el Target element
   * @param {String} [options.state=initial] Initial state. This is also the default state.
   * @param {String} [options.stateAttribute=data-revealer] Attribute name to update with state.
   * @param {String} [options.stateChangeAttribute=data-revealer-transition] Attribute name to update with change of state.
   * @param {String} [options.endEvent=transitionend] Event name to listen for at end of state change.
   * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the next state change.
   * @param {Function} [options.onStart] Callback to execute immediate after applying stateChangeAttribute.
   *
   * @return {Animation}
   */


  _createClass(AnimationsManager, [{
    key: "add",
    value: function add(options) {
      if (this.animations.has(options.el)) return this.animations.get(options.el);
      var animation = new Animation(options);
      this.animations.set(options.el, animation);
      return animation;
    }
    /**
     * Remove a single animation
     * @param {Animation} animation Animation to remove. Any event listeners will also be removed.
     */

  }, {
    key: "remove",
    value: function remove(animation) {
      this.animations["delete"](animation.el);
      animation.unload();
    }
    /**
     * Remove all animations, including all event listeners.
     */

  }, {
    key: "removeAll",
    value: function removeAll() {
      this.animations.forEach(function (animation) {
        return animation.unload();
      });
    }
  }]);

  return AnimationsManager;
}()));

function animation(options) {
  var setOptions = {
    endEvent: 'animationend',
    hold: true
  };
  return new Animation(_objectSpread2({
    options: options
  }, setOptions));
}

function transition(options) {
  return new Animation(options);
}




/***/ },

/***/ 2858
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Reads the content property on the documentElement ::before pseudo element
 * for a string of ordered, comma-separated, breakpoint names.
 *
 * @returns An ordered array of strings representing the breakpoint names
 *
 */
function readCSSBreakpoints() {
    return window
        .getComputedStyle(document.documentElement, ':before')
        .getPropertyValue('content')
        .replace(/"/g, '')
        .split(',');
}
/**
 * Reads the content property on the documentElement ::after pseudo element
 * for a string of the current breakpoint name. This value is updated using
 * dynamically using media queries and should match a value found in
 * the ::before pseudo element.
 *
 * @returns A string representing the current breakpoint name
 *
 */
function readCSSCurrentBreakpoint() {
    return window
        .getComputedStyle(document.documentElement, ':after')
        .getPropertyValue('content')
        .replace(/"/g, '');
}
var callbacks = [];
var cssBreakpoints = readCSSBreakpoints();
var CSSBreakpoint = /** @class */ (function () {
    function CSSBreakpoint(cssBreakpoint) {
        this.cssBreakpoint = cssBreakpoint;
    }
    Object.defineProperty(CSSBreakpoint.prototype, "value", {
        get: function () {
            return this.cssBreakpoint;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks whether this breakpoint is at least the input breakpoint
     *
     * @param breakpointName - The input breakpoint name
     * @returns Whether this breakpoint is the same or greater than the input breakpoint
     *
     */
    CSSBreakpoint.prototype.min = function (breakpointName) {
        var comparison = cssBreakpoints.indexOf(this.value) - cssBreakpoints.indexOf(breakpointName);
        return comparison >= 0;
    };
    /**
     * Checks whether this breakpoint is at most the input breakpoint
     *
     * @param breakpointName - The input breakpoint name
     * @returns Whether this breakpoint is the same or less than the input breakpoint
     *
     */
    CSSBreakpoint.prototype.max = function (breakpointName) {
        var comparison = cssBreakpoints.indexOf(this.value) - cssBreakpoints.indexOf(breakpointName);
        return comparison <= 0;
    };
    /**
     * Checks whether this breakpoint is at within the input breakpoint start
     * and input breakpoint end, inclusive
     *
     * @param breakpointNameStart - The starting input breakpoint name
     * @param breakpointNameEnd - The ending input breakpoint name
     * @returns Whether this breakpoint is the same or greater than the starting input
     *          breakpoint and the same or less than the ending input breakpoint
     *
     */
    CSSBreakpoint.prototype.range = function (breakpointNameStart, breakpointNameEnd) {
        var indexCurrent = cssBreakpoints.indexOf(this.value);
        var indexStart = cssBreakpoints.indexOf(breakpointNameStart);
        var indexEnd = cssBreakpoints.indexOf(breakpointNameEnd);
        return indexStart <= indexCurrent && indexCurrent <= indexEnd;
    };
    /**
     * Checks whether this breakpoint is one of the input breakpoints
     *
     * @param breakpointNames - One or more input breakpoint names
     * @returns Whether this breakpoint is one of the input breakpoints
     *
     */
    CSSBreakpoint.prototype.is = function () {
        var _this = this;
        var breakpointNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            breakpointNames[_i] = arguments[_i];
        }
        return breakpointNames.some(function (breakpoint) { return breakpoint === _this.value; });
    };
    return CSSBreakpoint;
}());
var breakpoints = {
    previous: new CSSBreakpoint(readCSSCurrentBreakpoint()),
    current: new CSSBreakpoint(readCSSCurrentBreakpoint()),
};
/**
 * Gets the breakpoints
 *
 * @returns The current and previous breakpoint
 *
 */
function get() {
    return breakpoints;
}
exports.get = get;
/**
 * Adds an event listener to be called when a breakpoint changes
 *
 * @param callback - The function to be called when a breakpoint changes
 *
 */
function onChange(callback) {
    if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
    }
}
exports.onChange = onChange;
/**
 * Removes an event listener to be called when a breakpoint changes
 *
 * @param callback - The function to be removed from the set of event listeners
 *
 */
function offChange(callback) {
    var index = callbacks.indexOf(callback);
    if (index !== -1) {
        callbacks.splice(index, 1);
    }
}
exports.offChange = offChange;
var currentMin = function (breakpointName) { return breakpoints.current.min(breakpointName); };
exports.min = currentMin;
var currentMax = function (breakpointName) { return breakpoints.current.max(breakpointName); };
exports.max = currentMax;
var currentRange = function (breakpointNameStart, breakpointNameEnd) { return breakpoints.current.range(breakpointNameStart, breakpointNameEnd); };
exports.range = currentRange;
var currentIs = function () {
    var _a;
    var breakpointNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        breakpointNames[_i] = arguments[_i];
    }
    return (_a = breakpoints.current).is.apply(_a, breakpointNames);
};
exports.is = currentIs;
/*
 * document.styleSheets is considered experimental technology; however,
 * the majority of current browsers implement this functionality.
 *
 * One drawback is under certain conditions, stylesheets may become
 * available due to security rules in the browser and we must be able to
 * fallback gracefully.
 */
var styleSheetList = document.styleSheets;
var mediaLists = Object.keys(styleSheetList).reduce(function (accumulator, key) {
    var stylesheet = styleSheetList[key];
    if (!stylesheet.href || stylesheet.href.indexOf('theme') === -1) {
        return accumulator;
    }
    try {
        var cssRules = stylesheet.cssRules;
        for (var i = 0; i < cssRules.length; i++) {
            var cssRule = stylesheet.cssRules[i];
            if (!(cssRule instanceof CSSMediaRule)) {
                continue;
            }
            for (var j = 0; j < cssRules.length; j++) {
                var cssMediaCssRule = cssRule.cssRules[j];
                if (!(cssMediaCssRule instanceof CSSStyleRule)) {
                    continue;
                }
                if (cssMediaCssRule.selectorText && cssMediaCssRule.selectorText.indexOf('html::after') !== -1) {
                    accumulator.push(cssRule.media);
                }
            }
        }
    }
    catch (_a) {
        return accumulator;
    }
    return accumulator;
}, []);
/*
 * Use window.matchMedia when stylesheets are accessible in the browser.
 * matchMedia is theoretically more performant than listening to every resize
 * event because it only fires when a media query boundary is crossed.
 *
 * If stylesheets aren't available, revert back to using the resize event.
 */
if (mediaLists.length > 0) {
    mediaLists.forEach(function (mediaList) {
        var mql = window.matchMedia(mediaList.mediaText);
        mql.addListener(function () {
            var cssCurrentBreakpoint = readCSSCurrentBreakpoint();
            if (breakpoints.current.value !== cssCurrentBreakpoint) {
                breakpoints.previous = breakpoints.current;
                breakpoints.current = new CSSBreakpoint(cssCurrentBreakpoint);
                callbacks.forEach(function (callback) { return callback(breakpoints); });
            }
        });
    });
}
else {
    window.addEventListener('resize', function () {
        var cssCurrentBreakpoint = readCSSCurrentBreakpoint();
        if (breakpoints.current.value !== cssCurrentBreakpoint) {
            breakpoints.previous = breakpoints.current;
            breakpoints.current = new CSSBreakpoint(cssCurrentBreakpoint);
            callbacks.forEach(function (callback) { return callback(breakpoints); });
        }
    });
}


/***/ },

/***/ 1561
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = true;
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.events = [];
    }
    EventHandler.prototype.register = function (el, event, listener) {
        if (!el || !event || !listener)
            return null;
        this.events.push({ el: el, event: event, listener: listener });
        el.addEventListener(event, listener);
        return { el: el, event: event, listener: listener };
    };
    EventHandler.prototype.unregister = function (_a) {
        var el = _a.el, event = _a.event, listener = _a.listener;
        if (!el || !event || !listener)
            return null;
        this.events = this.events.filter(function (e) { return el !== e.el
            || event !== e.event || listener !== e.listener; });
        el.removeEventListener(event, listener);
        return { el: el, event: event, listener: listener };
    };
    EventHandler.prototype.unregisterAll = function () {
        this.events.forEach(function (_a) {
            var el = _a.el, event = _a.event, listener = _a.listener;
            return el.removeEventListener(event, listener);
        });
        this.events = [];
    };
    return EventHandler;
}());
exports.A = EventHandler;


/***/ },

/***/ 5722
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   oM: () => (/* binding */ trapFocus),
/* harmony export */   qF: () => (/* binding */ removeTrapFocus)
/* harmony export */ });
/* unused harmony exports forceFocus, focusHash, bindInPageLinks, focusable, accessibleLinks */
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 */

/**
 * Moves focus to an HTML element
 * eg for In-page links, after scroll, focus shifts to content area so that
 * next `tab` is where user expects. Used in bindInPageLinks()
 * eg move focus to a modal that is opened. Used in trapFocus()
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 */
function forceFocus(element, options) {
  options = options || {};

  var savedTabIndex = element.tabIndex;

  element.tabIndex = -1;
  element.dataset.tabIndex = savedTabIndex;
  element.focus();
  if (typeof options.className !== 'undefined') {
    element.classList.add(options.className);
  }
  element.addEventListener('blur', callback);

  function callback(event) {
    event.target.removeEventListener(event.type, callback);

    element.tabIndex = savedTabIndex;
    delete element.dataset.tabIndex;
    if (typeof options.className !== 'undefined') {
      element.classList.remove(options.className);
    }
  }
}

/**
 * If there's a hash in the url, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - Selector for elements to not include.
 */

function focusHash(options) {
  options = options || {};
  var hash = window.location.hash;
  var element = document.getElementById(hash.slice(1));

  // if we are to ignore this element, early return
  if (element && options.ignore && element.matches(options.ignore)) {
    return false;
  }

  if (hash && element) {
    forceFocus(element, options);
  }
}

/**
 * When an in-page (url w/hash) link is clicked, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - CSS selector for elements to not include.
 */

function bindInPageLinks(options) {
  options = options || {};
  var links = Array.prototype.slice.call(
    document.querySelectorAll('a[href^="#"]')
  );

  return links.filter(function(link) {
    if (link.hash === '#' || link.hash === '') {
      return false;
    }

    if (options.ignore && link.matches(options.ignore)) {
      return false;
    }

    var element = document.querySelector(link.hash);

    if (!element) {
      return false;
    }

    link.addEventListener('click', function() {
      forceFocus(element, options);
    });

    return true;
  });
}

function focusable(container) {
  var elements = Array.prototype.slice.call(
    container.querySelectorAll(
      '[tabindex],' +
        '[draggable],' +
        'a[href],' +
        'area,' +
        'button:enabled,' +
        'input:not([type=hidden]):enabled,' +
        'object,' +
        'select:enabled,' +
        'textarea:enabled'
    )
  );

  // Filter out elements that are not visible.
  // Copied from jQuery https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js
  return elements.filter(function(element) {
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  });
}

/**
 * Traps the focus in a particular container
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Element} elementToFocus - Element to be focused on first
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 */

var trapFocusHandlers = {};

function trapFocus(container, options) {
  options = options || {};
  var elements = focusable(container);
  var elementToFocus = options.elementToFocus || container;
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = function(event) {
    if (container !== event.target && !container.contains(event.target)) {
      first.focus();
    }

    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;
    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.keyCode !== 9) return; // If not TAB key

    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  forceFocus(elementToFocus, options);
}

/**
 * Removes the trap of focus from the page
 */
function removeTrapFocus() {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
}

/**
 * Add a preventive message to external links and links that open to a new window.
 * @param {string} elements - Specific elements to be targeted
 * @param {object} options.messages - Custom messages to overwrite with keys: newWindow, external, newWindowExternal
 * @param {string} options.messages.newWindow - When the link opens in a new window (e.g. target="_blank")
 * @param {string} options.messages.external - When the link is to a different host domain.
 * @param {string} options.messages.newWindowExternal - When the link is to a different host domain and opens in a new window.
 * @param {object} options.prefix - Prefix to namespace "id" of the messages
 */
function accessibleLinks(elements, options) {
  if (typeof elements !== 'string') {
    throw new TypeError(elements + ' is not a String.');
  }

  elements = document.querySelectorAll(elements);

  if (elements.length === 0) {
    return;
  }

  options = options || {};
  options.messages = options.messages || {};

  var messages = {
    newWindow: options.messages.newWindow || 'Opens in a new window.',
    external: options.messages.external || 'Opens external website.',
    newWindowExternal:
      options.messages.newWindowExternal ||
      'Opens external website in a new window.'
  };

  var prefix = options.prefix || 'a11y';

  var messageSelectors = {
    newWindow: prefix + '-new-window-message',
    external: prefix + '-external-message',
    newWindowExternal: prefix + '-new-window-external-message'
  };

  function generateHTML(messages) {
    var container = document.createElement('ul');
    var htmlMessages = Object.keys(messages).reduce(function(html, key) {
      return (html +=
        '<li id=' + messageSelectors[key] + '>' + messages[key] + '</li>');
    }, '');

    container.setAttribute('hidden', true);
    container.innerHTML = htmlMessages;

    document.body.appendChild(container);
  }

  function externalSite(link) {
    return link.hostname !== window.location.hostname;
  }

  elements.forEach(function(link) {
    var target = link.getAttribute('target');
    var rel = link.getAttribute('rel');
    var isExternal = externalSite(link);
    var isTargetBlank = target === '_blank';
    var isRelNoopenerEmpty = rel === null || rel.indexOf('noopener') === -1;

    if (isTargetBlank && isRelNoopenerEmpty) {
      link.setAttribute('rel', 'noopener');
    }

    if (isExternal && isTargetBlank) {
      link.setAttribute('aria-describedby', messageSelectors.newWindowExternal);
    } else if (isExternal) {
      link.setAttribute('aria-describedby', messageSelectors.external);
    } else if (isTargetBlank) {
      link.setAttribute('aria-describedby', messageSelectors.newWindow);
    }
  });

  generateHTML(messages);
}

/***/ },

/***/ 6945
(module) {

module.exports = debounce;

function debounce(fn, delay, atStart, guarantee) {
  var timeout;
  var args;
  var self;

  return function debounced() {
    self = this;
    args = Array.prototype.slice.call(arguments);

    if (timeout && (atStart || guarantee)) {
      return;
    } else if (!atStart) {
      clear();

      timeout = setTimeout(run, delay);
      return timeout;
    }

    timeout = setTimeout(clear, delay);
    fn.apply(self, args);

    function run() {
      clear();
      fn.apply(self, args);
    }

    function clear() {
      clearTimeout(timeout);
      timeout = null;
    }
  };
}


/***/ }

}]);