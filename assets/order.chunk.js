"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8709],{

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

/***/ 2616
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7652);


class Checkbox {
  constructor(el) {
    this.checkmark = el.querySelector('.checkmark');
    this.checkmarkCheck = el.querySelector('.checkmark__check');
    this.checkmarkIndeterminate = el.querySelector('.checkmark__indeterminate');
    const state = 'unchecked';

    this.fillAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({ el: this.checkmark, state });
    this.checkAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({ el: this.checkmarkCheck, state });
    this.indeterminateCheckAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({ el: this.checkmarkIndeterminate, state });
  }

  check() {
    this.fillAnimation.animateTo('checked');
    this.checkAnimation.animateTo('checked');
  }

  uncheck() {
    this.fillAnimation.animateTo('unchecked');
    this.checkAnimation.animateTo('unchecked');
  }

  setIndeterminate() {
    this.fillAnimation.animateTo('indeterminate');
    this.indeterminateCheckAnimation.animateTo('indeterminate');
  }

  unsetIndeterminate() {
    this.fillAnimation.animateTo('unchecked');
    this.indeterminateCheckAnimation.animateTo('unchecked');
  }

  set disabled(disabled) {
    this.checkmark.classList.toggle('checkmark--disabled', disabled);
  }

  unload() {
    this.fillAnimation.unload();
    this.checkAnimation.unload();
    this.indeterminateCheckAnimation.unload();
  }
}


/***/ },

/***/ 6028
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MessageBanner)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7652);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1561);





class MessageBanner {
  constructor(message, type) {
    const bannerTemplate = document.querySelector('[data-templates] [data-message-banner]');
    this.banner = bannerTemplate.cloneNode(true);

    const messageElement = this.banner.querySelector('[data-message-banner-content]');
    messageElement.innerHTML = message;

    this.banner.classList.add(`message--${type}`);

    const modal = document.querySelector('.modal-loaded .modal-inner');
    const target = modal || document.querySelector('[data-site-header]');

    target.appendChild(this.banner);

    this.closeButton = this.banner.querySelector('[data-message-banner-close]');

    this.bannerAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__/* .transition */ .kY)({ el: this.banner, state: 'closed' });
    this.bannerAnimation.animateTo('open');

    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();

    this.events.register(this.closeButton, 'click', () => this._close());
    this.events.register(document, 'click', e => this._handleDocumentClick(e.target));
    this.events.register(document, 'touchStart', e => this._handleDocumentClick(e.target));
    this.events.register(window, 'keydown', e => this._closeEsc(e));
  }

  unload() {
    if (this.banner) {
      this._close();
    }
  }

  _closeEsc(e) {
    if (e.key === 'Escape') {
      this._close();
    }
  }

  _close() {
    this.bannerAnimation.animateTo('closed').then(() => {
      this.banner?.remove();
      this.banner = null;
      this.events.unregisterAll();
      this.bannerAnimation.unload();
    });
  }

  _handleDocumentClick(target) {
    const $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).parents('[data-message-banner]');
    if ($parent.length) return;

    this._close();
  }
}


/***/ },

/***/ 5856
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Order)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var _components_MessageBanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6028);
/* harmony import */ var _components_Checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2616);




class Order {
  constructor() {
    this.el = document.querySelector('.template-order');
    this.checkboxEls = this.el.querySelectorAll('[data-checkbox]');
    this.atcButton = this.el.querySelector('[data-atc-button]');
    this.selectAllCheckbox = this.el.querySelector('[data-select-all-checkbox]');
    this.selectAllCheckboxInput = this.el.querySelector('[data-select-all-checkbox-input]');
    this.selectItemsCountEl = this.el.querySelector('[data-select-items-count]');
    this.lineCheckboxInputs = this.el.querySelectorAll('[data-line-checkbox-input]');

    if (!this.selectAllCheckboxInput) return;

    this.lineCheckboxInputsArray = Array.from(this.lineCheckboxInputs);
    this.data = JSON.parse(this.el.querySelector('[data-order-line-items-data]').innerHTML);
    this.settings = JSON.parse(this.el.querySelector('[data-settings]').innerHTML);
    this.itemsToAddToCart = [];
    this.messageBanner = null;

    this.lastCheckedIndex = null;
    this.currentCheckedIndex = null;

    // We need to create a `Checkbox` instance for each checkbox and access them individually.
    // `this.map` is what will hold each input element along with its `Checkbox` instance.
    this.map = new Map();

    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();

    this._init();
  }

  get _selectedLines() {
    return this.el.querySelectorAll('[data-line-checkbox-input]:checked');
  }

  get _allLineCheckboxesAreChecked() {
    return this.lineCheckboxInputsArray.filter(inputEl => !inputEl.checked).length === 0;
  }

  get _noCheckboxIsChecked() {
    return this.lineCheckboxInputsArray.filter(inputEl => inputEl.checked).length === 0;
  }

  _init() {
    this.checkboxEls.forEach(el => {
      this.map.set(el, new _components_Checkbox__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(el));
    });

    this._bindCheckboxEvents();

    this.events.register(this.atcButton, 'click', event => {
      this._selectItemsToAddToCart();
      this._addToCart(event);
    });
  }

  _bindCheckboxEvents() {
    this.events.register(this.selectAllCheckboxInput, 'change', () => {
      const isChecked = this.selectAllCheckboxInput.checked;

      this._onCheckboxChange(this.selectAllCheckboxInput, isChecked);

      this.lineCheckboxInputs.forEach(inputEl => {
        inputEl.checked = isChecked;
        this._onCheckboxChange(inputEl, isChecked);
      });

      this._onCheckboxStateUpdate();
    });

    this.lineCheckboxInputs.forEach(inputEl => {
      this.events.register(inputEl, 'change', () => {
        const isInputElChecked = inputEl.checked;
        this._onCheckboxChange(inputEl, isInputElChecked);
        if (isInputElChecked) this._updateCheckedIndexes(inputEl);
        this._onCheckboxStateUpdate();
      });
    });

    // Shift + click multi-select feature
    this.events.register(document, 'click', event => {
      if (!event.shiftKey || event.target.nodeName !== 'INPUT') return;

      window.requestAnimationFrame(() => {
        if (this.lastCheckedIndex !== null && this.currentCheckedIndex !== null) {
          const lastCheckedIndexState = this.lineCheckboxInputsArray[this.lastCheckedIndex].checked;
          let start = null;
          let end = null;

          if (this.lastCheckedIndex < this.currentCheckedIndex) {
            start = this.lastCheckedIndex;
            end = this.currentCheckedIndex;
          } else {
            start = this.currentCheckedIndex;
            end = this.lastCheckedIndex;
          }

          for (let i = start; i < end; i++) {
            const el = this.lineCheckboxInputsArray[i];
            el.checked = lastCheckedIndexState;
            this._onCheckboxChange(el, lastCheckedIndexState);
          }

          this._onCheckboxStateUpdate();
          this._resetCheckedIndexes();
        }
      });
    });
  }

  _updateCheckedIndexes(el) {
    // Checking for `null` since `this.lastCheckedIndex` can have a value of `0`
    if (this.lastCheckedIndex === null) {
      this.lastCheckedIndex = this.lineCheckboxInputsArray.indexOf(el);
    } else {
      this.currentCheckedIndex = this.lineCheckboxInputsArray.indexOf(el);
    }
  }

  _resetCheckedIndexes() {
    this.lastCheckedIndex = null;
    this.currentCheckedIndex = null;
  }

  _onCheckboxChange(el, isChecked, isIndeterminate = false) {
    const targetEl = el.parentElement;

    if (isChecked) {
      this.map.get(targetEl).unsetIndeterminate();
      this.map.get(targetEl).check();
      el.closest('[data-order-row]')?.classList.add('checkbox-selected');
    } else if (isIndeterminate) {
      this.map.get(targetEl).uncheck();
      this.map.get(targetEl).setIndeterminate();
      el.closest('[data-order-row]')?.classList.add('checkbox-selected');
    } else {
      this.map.get(targetEl).uncheck();
      this.map.get(targetEl).unsetIndeterminate();
      el.closest('[data-order-row]')?.classList.remove('checkbox-selected');
    }
  }

  _onCheckboxStateUpdate() {
    let isChecked = false;
    let isIndeterminate = false;

    if (this._allLineCheckboxesAreChecked) {
      isChecked = true;
      isIndeterminate = false;
    } else if (!this._noCheckboxIsChecked) {
      isChecked = false;
      isIndeterminate = true;
    }

    this.selectAllCheckboxInput.checked = isChecked;
    this.selectAllCheckboxInput.indeterminate = isIndeterminate;
    this._onCheckboxChange(this.selectAllCheckboxInput, isChecked, isIndeterminate);

    if (this._noCheckboxIsChecked) {
      this._disableAtcButton();
      this.selectAllCheckbox.classList.remove('order-checkbox--active');
    } else {
      this._enableAtcButton();
      this.selectAllCheckbox.classList.add('order-checkbox--active');
      this.selectItemsCountEl.textContent = this._selectedLines.length;
    }
  }

  _selectItemsToAddToCart() {
    // Reset itemsToAddToCart list
    this.itemsToAddToCart.length = 0;

    const selectedOrderIds = [];

    this._selectedLines.forEach(line => {
      selectedOrderIds.push(Number(line.getAttribute('data-line-item-id')));
    });

    this.data.forEach(item => {
      if (selectedOrderIds.includes(item.id)) {
        // Shopify docs: https://shopify.dev/api/ajax/reference/cart
        this.itemsToAddToCart.push({
          id: item.variant_id,
          quantity: item.quantity,
          selling_plan: (
            item.selling_plan_allocation
              ? item.selling_plan_allocation.selling_plan.id
              : null
          ),
        });
      }
    });
  }

  _addToCart(event) {
    // Stopping further propagation here is mainly to prevent the click event from bubbling as
    // it will cause an issue with the disclosures and message banner.
    event.stopPropagation();

    this._setAtcButtonProcessing();

    const formData = { items: this.itemsToAddToCart };

    fetch(`${window.Theme.routes.cart_add_url}.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        this._removeAtcButtonProcessing();
        if (data.message === 'Cart Error') {
          return Promise.reject(data);
        }
        return this._onSuccess();
      })
      .catch(error => {
        this._showErrorBanner(error.description);
      });
  }

  _onSuccess() {
    return fetch(`${window.Theme.routes.cart_url}.js`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(data => {
        if (this.settings.cart_redirection) {
          location.href = window.Theme.routes.cart_url;
          return;
        }

        // Notify Header of new cart count
        const countEvent = new CustomEvent('cartcount:update', { detail: data });
        window.dispatchEvent(countEvent);

        this._showSuccessBanner(this.settings.success_message);
      })
      .catch(error => {
        this._showErrorBanner(error.message);
      });
  }

  _showSuccessBanner(successMsg) {
    this.messageBanner = new _components_MessageBanner__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(successMsg, 'success');
  }

  _showErrorBanner(errorMsg) {
    this.messageBanner = new _components_MessageBanner__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(errorMsg, 'error');
  }

  _enableAtcButton() {
    this.atcButton.classList.remove('disabled');
    this.atcButton.disabled = false;
  }

  _disableAtcButton() {
    this.atcButton.classList.add('disabled');
    this.atcButton.disabled = true;
  }

  _removeAtcButtonProcessing() {
    this.atcButton.classList.remove('processing');
    this.atcButton.disabled = false;
  }

  _setAtcButtonProcessing() {
    this.atcButton.classList.add('processing');
    this.atcButton.disabled = true;
  }
}


/***/ }

}]);