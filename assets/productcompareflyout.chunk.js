"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8900],{

/***/ 7652
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ 1561
(__unused_webpack_module, exports) {

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

/***/ 2075
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const storageKey = 'pxuProductCompareV3';

const MAX_COMPARE_PRODUCTS = 3;

class ProductCompare {
  constructor() {
    this._hasToggle = !!document.querySelector('[data-compare-toggle]');
    this.breadCrumb = document.querySelector('[data-product-compare-breadcrumb-data]');

    if (this.breadCrumb) {
      this.breadCrumbData = JSON.parse(this.breadCrumb.innerHTML);
    }

    this._state = this._getState();
    this._onUpdateCallbacks = [];
    this._onEnableChangeCallbacks = [];

    // update returnBreadcrumb immediately before user navigates to a new page
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this._state.returnBreadcrumb = this._getReturnBreadcrumb();
        this._save();
      }
    });
  }

  /**
   *
   * @param {String} param0.handle Handle to add
   * @param {Object} param0.data Additional product data to add (title, image, etc).
   * Will persist until product is removed or session ends
   */
  add({ handle, data }) {
    this._state.products.push({
      handle,
      data,
    });
    this._runUpdateCallbacks();
    this._save();
  }

  /**
   *
   * @param {String} handle Handle to remove from product compare
   */
  remove(handle) {
    this._state.products = this._state.products.filter(product => product.handle !== handle);
    this._runUpdateCallbacks();
    if (!this._state.products.length) {
      this._onRemoveLastProduct();
    }
    this._save();
  }

  /**
   * Removes all products from compare
   */
  removeAll() {
    this._state.products = [];
    this._runUpdateCallbacks();
    this._onRemoveLastProduct();
    this._save();
  }

  /**
   *
   * @param {String} handle Handle to check
   * @returns Boolean, true if handle is currently added to product compare
   */
  includes(handle) {
    return this._state.products.some(product => product.handle === handle);
  }

  /**
   *
   * @param {Function} fn Add a callback function to run every time a product is added or removed
   */
  runOnUpdate(fn) {
    this._onUpdateCallbacks.push(fn);
  }

  /**
   *
   * @param {Function} fn Remove a previously added callback function
   */
  removeRunOnUpdate(fn) {
    this._onUpdateCallbacks = this._onUpdateCallbacks.filter(cb => cb !== fn);
  }

  get enabled() {
    return this._state.enabled;
  }

  enable() {
    if (this._state.enabled) return;

    this._state.enabled = true;
    this._runEnableChangeCallbacks();
    this._save();
  }

  disable() {
    if (!this._state.enabled) return;

    this._state.enabled = false;
    this._runEnableChangeCallbacks();
    if (this._state.products.length) {
      this.removeAll();
    }
    this._save();
  }

  addRunOnEnableChange(fn) {
    this._onEnableChangeCallbacks.push(fn);
  }

  /**
   *
   * @param {Function} fn Remove a previously added callback function
   */
  removeRunOnEnableChange(fn) {
    this._onEnableChangeCallbacks = this._onEnableChangeCallbacks.filter(cb => cb !== fn);
  }

  get products() {
    return this._state.products;
  }

  get atProductLimit() {
    return this._state.products.length >= MAX_COMPARE_PRODUCTS;
  }

  get returnBreadcrumb() {
    return this._state.returnBreadcrumb;
  }

  _runUpdateCallbacks() {
    const data = {
      products: this._state.products,
      atProductLimit: this.atProductLimit,
    };

    this._onUpdateCallbacks.forEach(cb => cb(data));
  }

  _runEnableChangeCallbacks() {
    this._onEnableChangeCallbacks.forEach(cb => cb(this.enabled));
  }

  _onRemoveLastProduct() {
    if (this._hasToggle) return;

    this.disable();
  }

  _getReturnBreadcrumb() {
    if (this.breadCrumbData && this.breadCrumbData.update) {
      return {
        url: window.location.href,
        title: this.breadCrumbData.title,
      };
    }

    return this._state.returnBreadcrumb;
  }

  _getState() {
    const savedState = this._load();

    if (savedState) {
      const enabled = this._hasToggle || savedState.products.length ? savedState.enabled : false;
      return {
        ...savedState,
        enabled,
      };
    }

    return {
      products: [],
      returnBreadcrumb: null,
      enabled: false,
    };
  }

  _load() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey));
    } catch (e) {
      return null;
    }
  }

  _save() {
    sessionStorage.setItem(storageKey, JSON.stringify(this._state));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductCompare());


/***/ },

/***/ 640
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ProductCompareFlyout)
});

// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(1561);
// EXTERNAL MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
var animations_es = __webpack_require__(7652);
// EXTERNAL MODULE: ./source/scripts/components/ProductCompare.js
var ProductCompare = __webpack_require__(2075);
// EXTERNAL MODULE: ./node_modules/@pixelunion/rimg-shopify/dist/index.es.js
var index_es = __webpack_require__(1112);
;// ./source/scripts/components/ProductCompareDrawerContent.js




class ProductCompareDrawerContent {
  constructor(el) {
    this.el = el;
    this.events = new EventHandler/* default */.A();
    this.initialHTML = this.el.innerHTML;
    this.productTemplate = this.el.querySelector('[data-product-compare-drawer-item-template]');

    this.events.register(this.el, 'click', e => {
      const compareDrawerRemoveButton = e.target.closest('[data-product-compare-drawer-remove]');

      if (compareDrawerRemoveButton) {
        this._removeProduct(compareDrawerRemoveButton.dataset.productCompareDrawerRemove);
      }
    });

    const onUpdate = ({ products }) => {
      this._reset();
      if (!products.length) {
        this.el.scroll(0, 0);
      }
      products.forEach(product => this._addProduct(product));
      index_es/* default */.A.watch(this.el);
    };

    onUpdate({ products: ProductCompare/* default */.A.products });

    ProductCompare/* default */.A.runOnUpdate(onUpdate);
  }

  unload() {
    this.events.unregisterAll();
  }

  _reset() {
    index_es/* default */.A.unwatch(this.el);
    this.el.innerHTML = this.initialHTML;
  }

  _addProduct({ handle, data }) {
    const newProduct = this.productTemplate.cloneNode(true).content;
    const newProductFragment = new DocumentFragment();
    const compareDrawerTitle = newProduct.querySelector('[data-product-compare-drawer-title]');
    const compareDrawerImage = newProduct.querySelector('[data-product-compare-drawer-image]');
    const compareDrawerRemove = newProduct.querySelector('[data-product-compare-drawer-remove]');
    const compareDrawerItemPlaceholder = this.el.querySelector('[data-product-compare-drawer-item-placeholder]');

    compareDrawerTitle.innerHTML = data.title;
    compareDrawerTitle.href = data.url;
    compareDrawerRemove.dataset.productCompareDrawerRemove = handle;
    compareDrawerImage.innerHTML = data.image;
    compareDrawerImage.style.setProperty('--product-grid-item-image-aspect-ratio', data.imageAspectRatio);

    newProductFragment.append(newProduct);
    this.el.insertBefore(newProductFragment, compareDrawerItemPlaceholder);

    if (compareDrawerItemPlaceholder) {
      compareDrawerItemPlaceholder.remove();
    }
  }

  _removeProduct(handle) {
    ProductCompare/* default */.A.remove(handle);
  }
}

;// ./source/scripts/components/ProductCompareFlyout.js





const storageKey = 'pxuProductCompareFlyoutV1';

class ProductCompareFlyout {
  constructor(el) {
    this.el = el;
    this.events = new EventHandler/* default */.A();
    this.compareDrawerLink = this.el.querySelector('[data-product-compare-drawer-link]');
    this.compareDrawerLinkHref = this.compareDrawerLink.href;
    this.compareDrawerClearAllButton = this.el.querySelector('[data-product-compare-clear-all]');
    this.compareDrawerTitle = this.el.querySelector('[data-product-compare-drawer-title]');
    this.compareDrawerNotification = this.el.querySelector('[data-product-compare-drawer-notification]');
    this.compareDrawerCountOne = this.compareDrawerNotification.dataset.productCountOne;
    this.compareDrawerCountOther = this.compareDrawerNotification.dataset.productCountOther;
    this.compareDrawerHeader = this.el.querySelector('[data-product-compare-drawer-header]');
    this.compareDrawerContent = new ProductCompareDrawerContent(this.el.querySelector('[data-compare-drawer-items-container]'));

    this.preferredState = this._loadPreferredState() || 'open';

    this.drawerAnimation = (0,animations_es/* transition */.kY)({
      state: 'hidden',
      el: this.el,
    });

    this.events.register(window, 'resize', () => {
      if (this.drawerAnimation.state === 'hidden') return;

      this._updateDrawerPosition();
    });

    this.events.register(this.compareDrawerHeader, 'click', () => {
      if (this.drawerAnimation.state === 'open') {
        this._savePreferredState('closed');
        this._closeDrawer();
      } else {
        this._savePreferredState('open');
        this._openDrawer();
      }
    });

    this.events.register(this.compareDrawerClearAllButton, 'click', () => {
      ProductCompare/* default */.A.removeAll();
    });

    let lastUpdateCount = ProductCompare/* default */.A.products.length;

    const onUpdate = ({ products }) => {
      if (products.length > 0) {
        if (products.length > lastUpdateCount) {
          // drawer should always open when a new product is added
          this._openDrawer();
          this._savePreferredState('open');
        } else {
          this._showDrawer();
        }
      } else {
        this._hideDrawer();
      }

      lastUpdateCount = products.length;

      this._updateDrawerCompareLink();
      this._updateDrawerNotification();
    };

    onUpdate({ products: ProductCompare/* default */.A.products });

    ProductCompare/* default */.A.runOnUpdate(onUpdate);
  }

  unload() {
    this.events.unregisterAll();
    this.compareDrawerContent.unload();
    this.drawerAnimation.unload();
  }

  _showDrawer() {
    this.drawerAnimation.animateTo(
      this.preferredState,
      { onStart: () => { this._updateDrawerPosition(); } },
    );
  }

  _openDrawer() {
    this.drawerAnimation.animateTo(
      'open',
      { onStart: () => { this._updateDrawerPosition(); } },
    );

    this._updateDrawerCompareLink();
    this._updateDrawerNotification();
  }

  _hideDrawer() {
    this.drawerAnimation.animateTo('hidden');
  }

  _closeDrawer() {
    this.drawerAnimation.animateTo('closed');

    this._updateDrawerCompareLink();
    this._updateDrawerNotification();
  }

  _updateDrawerPosition() {
    this.el.style.setProperty('--compare-drawer-header-height', `${this.compareDrawerHeader.offsetHeight}px`);
  }

  _updateDrawerNotification() {
    if (ProductCompare/* default */.A.products.length === 1) {
      this.compareDrawerNotification.innerHTML = this.compareDrawerCountOne;
    } else {
      const compareDrawerNotificationString = this.compareDrawerCountOther.replace(
        '** count **',
        ProductCompare/* default */.A.products.length,
      );
      this.compareDrawerNotification.innerHTML = compareDrawerNotificationString;
    }
  }

  _updateDrawerCompareLink() {
    const compareDrawerLinkText = this.compareDrawerLink.dataset.productCompareDrawerLinkText;
    // Default locale will end in `/`, other locales will end in `/de` for example
    const separator = /\/$/.test(this.compareDrawerLinkHref) ? '' : '/';
    const [firstProduct, ...otherProducts] = ProductCompare/* default */.A.products;

    if (ProductCompare/* default */.A.products.length > 1) {
      this.compareDrawerLink.classList.remove('disabled');
    } else {
      this.compareDrawerLink.classList.add('disabled');
    }

    if (ProductCompare/* default */.A.products.length > 0) {
      this.compareDrawerLink.innerHTML = `${compareDrawerLinkText} (${ProductCompare/* default */.A.products.length})`;
    } else {
      this.compareDrawerLink.innerHTML = `${compareDrawerLinkText}`;
    }

    if (!firstProduct) return;

    const otherProductHandles = otherProducts.map(({ handle }) => handle).join(',');
    this.compareDrawerLink.href = `${this.compareDrawerLinkHref}${separator}products/${firstProduct.handle}?view=compare&compare=${otherProductHandles}`;
  }

  _loadPreferredState() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey));
    } catch (e) {
      return null;
    }
  }

  _savePreferredState(state) {
    this.preferredState = state;
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }
}


/***/ }

}]);