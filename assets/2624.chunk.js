(self["webpackChunk"] = self["webpackChunk"] || []).push([[2624],{

/***/ 6164
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/*!
 * @pixelunion/pxs-gift-card-recipient-form v1.1.0
 * (c) 2024 Pixel Union
 */

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var EventHandler_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
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
exports["default"] = EventHandler;
});

var EventHandler = unwrapExports(EventHandler_1);

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

function transition(options) {
  return new Animation(options);
}

class RecipientForm {
  constructor(el) {
    this.el = el;
    this.events = new EventHandler();
    this.recipientForm = this.el.querySelector('[data-recipient-form]');
    this.recipientFormInputs = this.el.querySelectorAll('[data-recipient-form-input]');
    this.recipientFormEmailInput = this.el.querySelector('[data-recipient-form-email-input]');
    this.disclosure = this.el.querySelector('[data-recipient-disclosure]');
    this.disclosureCheckbox = this.el.querySelector('[data-recipient-disclosure-checkbox]');
    this.checkmark = this.disclosure.querySelector('.checkmark');
    this.checkmarkCheck = this.disclosure.querySelector('.checkmark__check');
    this.fillAnimation = transition({
      el: this.checkmark
    });
    this.checkAnimation = transition({
      el: this.checkmarkCheck
    });
    this.events.register(this.recipientForm, 'keydown', event => this._onKeydown(event));
    this.events.register(this.disclosure, 'toggle', () => this._onToggle());
    this.events.register(this.disclosureCheckbox, 'change', () => this._onChange());
  }

  _onChange() {
    this.disclosure.open = this.disclosureCheckbox.checked;
  }

  _onKeydown(event) {
    // Prevent input form submission
    if (event.key === 'Enter' && event.target.matches('[data-recipient-form-input]')) {
      event.preventDefault();
    }
  }

  _onToggle() {
    if (this.disclosure.open) {
      this._showRecipientForm();
    } else {
      this._hideRecipientForm();
    }
  }

  _showRecipientForm() {
    if (this.checkmark && this.checkmarkCheck) {
      this.fillAnimation.animateTo('checked');
      this.checkAnimation.animateTo('checked');
    }

    this.disclosureCheckbox.checked = true;
    this.recipientFormEmailInput.required = true;
  }

  _hideRecipientForm() {
    if (this.checkmark && this.checkmarkCheck) {
      this.fillAnimation.animateTo('unchecked');
      this.checkAnimation.animateTo('unchecked');
    }

    this.disclosureCheckbox.checked = false;
    this.recipientFormEmailInput.required = false;

    this._resetRecipientForm();
  }

  _resetRecipientForm() {
    this.recipientFormInputs.forEach(el => {
      el.value = '';

      if (el.classList.contains('form-field-filled')) {
        el.classList.remove('form-field-filled');
      }
    });

    if (this.recipientForm.classList.contains('recipient-form--has-errors')) {
      this.recipientForm.classList.remove('recipient-form--has-errors');
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecipientForm);


/***/ },

/***/ 8148
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const LOCAL_STORAGE_KEY = 'pxu-shopify-surface-pick-up';
const loadingClass = 'surface-pick-up--loading';

const isNotExpired = timestamp => timestamp + 1000 * 60 * 60 >= Date.now();

const removeTrailingSlash = s => s.replace(/(.*)\/$/, '$1'); // Haversine Distance
// The haversine formula is an equation giving great-circle distances between
// two points on a sphere from their longitudes and latitudes


function calculateDistance(latitude1, longitude1, latitude2, longitude2, unitSystem) {
  const dtor = Math.PI / 180;
  const radius = unitSystem === 'metric' ? 6378.14 : 3959;
  const rlat1 = latitude1 * dtor;
  const rlong1 = longitude1 * dtor;
  const rlat2 = latitude2 * dtor;
  const rlong2 = longitude2 * dtor;
  const dlon = rlong1 - rlong2;
  const dlat = rlat1 - rlat2;
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * c;
}

async function getGeoLocation() {
  return new Promise((resolve, reject) => {
    const options = {
      maximumAge: 3600000,
      // 1 hour
      timeout: 5000
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({
        coords
      }) => resolve(coords), reject, options);
    } else {
      reject();
    }
  });
}

async function setLocation({
  latitude,
  longitude
}) {
  const newData = {
    latitude,
    longitude,
    timestamp: Date.now()
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  return fetch('/localization.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude,
      longitude
    })
  }).then(() => ({
    latitude,
    longitude
  }));
}

async function getLocation(requestLocation = false) {
  const cachedLocation = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (cachedLocation && isNotExpired(cachedLocation.timestamp)) {
    return cachedLocation;
  }

  if (requestLocation) {
    return getGeoLocation().then(coords => {
      setLocation(coords); // We don't need to wait for this

      return coords;
    });
  }

  return null;
}

class SurfacePickUp {
  constructor(el, options) {
    this.el = el;
    const themeObj = window.PXUTheme || window.Theme;
    this.options = {
      root_url: themeObj && themeObj.routes && themeObj.routes.root_url || '',
      ...options
    };
    this.options.root_url = removeTrailingSlash(this.options.root_url);
    this.callbacks = [];
    this.onBtnPress = null;
    this.latestVariantId = null;
  }

  load(variantId) {
    // If no variant is available, empty element and quick-return
    if (!variantId) {
      this.el.innerHTML = '';
      return Promise.resolve(true);
    } // Because Shopify doesn't expose any `pick_up_enabled` data on the shop object, we
    // don't know if the variant might be, or is definitely not available for pick up.
    // Until we know the shop has > 0 pick up locations, we want to avoid prompting the
    // user for location data (it's annoying, and only makes sense to do if we use it).
    //
    // Instead, we have to make an initial request, check and see if any pick up locations
    // were returned, then ask for the users location, then make another request to get the
    // location-aware pick up locations.
    //
    // As far as I can tell the pick up aware locations differ only in sort order - which
    // we could do on the front end - but we're following this approach to ensure future
    // compatibility with any changes Shopify makes (maybe disabling options based on
    // user location, or whatever else).
    //
    // Shopify has indicated they will look into adding pick_up_enabled data to the shop
    // object, which which case this method can be greatly simplifed into 2 simple cases.


    this.latestVariantId = variantId;
    this.el.classList.add(loadingClass);
    return this._getData(variantId).then(data => this._injectData(data));
  }

  onModalRequest(callback) {
    if (this.callbacks.indexOf(callback) >= 0) return;
    this.callbacks.push(callback);
  }

  offModalRequest(callback) {
    this.callbacks.splice(this.callbacks.indexOf(callback));
  }

  unload() {
    this.callbacks = [];
    this.el.innerHTML = '';
  }

  _getData(variantId) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const requestUrl = `${this.options.root_url}/variants/${variantId}/?section_id=surface-pick-up`;
      xhr.open('GET', requestUrl, true);

      xhr.onload = () => {
        const el = xhr.response;
        const embed = el.querySelector('[data-html="surface-pick-up-embed"]');
        const itemsContainer = el.querySelector('[data-html="surface-pick-up-items"]');
        const items = itemsContainer.content.querySelectorAll('[data-surface-pick-up-item]');
        resolve({
          embed,
          itemsContainer,
          items,
          variantId
        });
      };

      xhr.onerror = () => {
        resolve({
          embed: {
            innerHTML: ''
          },
          itemsContainer: {
            innerHTML: ''
          },
          items: [],
          variantId
        });
      };

      xhr.responseType = 'document';
      xhr.send();
    });
  }

  _injectData({
    embed,
    itemsContainer,
    items,
    variantId
  }) {
    if (variantId !== this.latestVariantId || items.length === 0) {
      this.el.innerHTML = '';
      this.el.classList.remove(loadingClass);
      return;
    }

    this.el.innerHTML = embed.innerHTML;
    this.el.classList.remove(loadingClass);
    let calculatedDistances = false;

    const calculateDistances = () => {
      if (calculatedDistances) return Promise.resolve();
      return getLocation(true).then(coords => {
        items.forEach(item => {
          const distanceEl = item.querySelector('[data-distance]');
          const distanceUnitEl = item.querySelector('[data-distance-unit]');
          const unitSystem = distanceUnitEl.dataset.distanceUnit;
          const itemLatitude = parseFloat(distanceEl.dataset.latitude);
          const itemLongitude = parseFloat(distanceEl.dataset.longitude);

          if (coords && isFinite(itemLatitude) && isFinite(itemLongitude)) {
            const distance = calculateDistance(coords.latitude, coords.longitude, itemLatitude, itemLongitude, unitSystem);
            distanceEl.innerHTML = distance.toFixed(1);
          } else {
            distanceEl.remove();
            distanceUnitEl.remove();
          }
        });
      }).catch(e => {
        console.log(e);
        items.forEach(item => {
          const distanceEl = item.querySelector('[data-distance]');
          const distanceUnitEl = item.querySelector('[data-distance-unit]');
          distanceEl.remove();
          distanceUnitEl.remove();
        });
      }).finally(() => {
        calculatedDistances = true;
      });
    };

    this.el.querySelector('[data-surface-pick-up-embed-modal-btn]').addEventListener('click', () => {
      calculateDistances().then(() => this.callbacks.forEach(callback => callback(itemsContainer.innerHTML)));
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SurfacePickUp);


/***/ },

/***/ 5652
() {

class VariantSelection extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
  }

  constructor() {
    super();
    this._loaded = false;
    this._productFetcher = Promise.resolve(false);

    this._onMainElChange = event => {
      this.variant = event.currentTarget.value;
    };

    const mainInputEl = this.querySelector('input[data-variants]');
    this._mainEl = mainInputEl || this.querySelector('select[data-variants]');
  }

  set variant(value) {
    if (value) {
      this.setAttribute('variant', value);
    } else {
      this.removeAttribute('variant');
    }
  }

  get variant() {
    return this.getAttribute('variant');
  }

  connectedCallback() {
    this._productFetcher = this._fetchProduct();
    const mainInputEl = this.querySelector('input[data-variants]');
    this._mainEl = mainInputEl || this.querySelector('select[data-variants]');

    this._mainEl.addEventListener('change', this._onMainElChange);

    this.variant = this._mainEl.value;
  }

  disconnectedCallback() {
    this._mainEl.removeEventListener('change', this._onMainElChange);

    this._mainEl = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'variant':
        this._changeVariant(newValue);

        break;
    }
  }

  getProduct() {
    return this._loaded ? Promise.resolve(this._product) : this._productFetcher;
  }

  getVariant() {
    return this.getProduct().then(product => product ? product.variants.find(v => v.id.toString() === this.variant) || false : false).catch(() => false);
  }

  getState() {
    return this.getVariant().then(variant => variant ? 'selected' : this.getAttribute('variant'));
  }

  _changeVariant(value) {
    this._dispatchEvent(value).then(() => {
      this._mainEl.value = value;
    });
  }

  _fetchProduct() {
    return fetch(this.getAttribute('product-url')).then(response => response.json()).then(product => {
      this._product = product;
      return product;
    }).catch(() => {
      this._product = null;
    }).finally(() => {
      this._loaded = true;
    });
  }

  _dispatchEvent(value) {
    return this.getProduct().then(product => {
      const variant = product ? product.variants.find(v => v.id.toString() === value) || false : false;
      const state = variant ? 'selected' : value;
      const event = new CustomEvent('variant-change', {
        detail: {
          product,
          variant,
          state
        }
      });
      this.dispatchEvent(event);
    });
  }

}

const unselectedValue = 'not-selected';
const unavailableValue = 'unavailable';
const inputTypeDropdown = 'select';
const inputTypeRadio = 'radio';
const valueElementType = {
  select: 'option',
  radio: 'input[type="radio"]'
};

function setSelectedOptions(selectOptions, radioOptions, selectedOptions) {
  selectOptions.forEach(({
    option
  }) => {
    option.value = selectedOptions[parseInt(option.dataset.variantOptionIndex, 10)];
  });
  radioOptions.forEach(({
    values
  }) => {
    values.forEach(value => {
      value.checked = value.value === selectedOptions[parseInt(value.dataset.variantOptionValueIndex, 10)];
    });
  });
}
/*
 * @param optionsEls [Element list] : Input elements for variant options
 *
 */


function getOptions(optionsEls) {
  const select = [];
  const radio = [];

  for (let i = 0; i < optionsEls.length; i++) {
    const optionEl = optionsEls[i]; // Options within select inputs or radio groups

    const variantOptionIndex = parseInt(optionEl.dataset.variantOptionIndex, 10);
    const valueMap = {};
    const wrappers = optionEl.matches('[data-variant-option-value-wrapper]') ? [optionEl] : Array.prototype.slice.call(optionEl.querySelectorAll('[data-variant-option-value-wrapper]'));
    const optionValueEls = optionEl.matches('[data-variant-option-value]') ? [optionEl] : Array.prototype.slice.call(optionEl.querySelectorAll('[data-variant-option-value]'));
    if (!optionValueEls.length) break;
    let current = unselectedValue;
    optionValueEls.forEach(el => {
      valueMap[el.value] = {
        available: false,
        accessible: false
      };

      if (el.hasAttribute('checked') || el.hasAttribute('selected')) {
        current = el.value;
      }
    });
    const option = {
      option: optionEl,
      variantOptionIndex,
      current,
      wrappers,
      optionValueEls,
      valueMap
    };

    if (optionValueEls[0].matches(valueElementType.select)) {
      option.type = inputTypeDropdown;
      select.push(option);
    } else if (optionValueEls[0].matches(valueElementType.radio)) {
      option.type = inputTypeRadio;
      radio.push(option);
    }
  }

  return {
    select,
    radio
  };
}

function getSelectedOptions(product, selectOptions, radioOptions) {
  const options = product.options.map(() => unselectedValue);
  selectOptions.forEach(({
    option
  }) => {
    if (option.value !== unselectedValue) {
      options[parseInt(option.dataset.variantOptionIndex, 10)] = option.value;
    }
  });
  radioOptions.forEach(({
    optionValueEls
  }) => {
    optionValueEls.forEach(value => {
      if (value.checked) {
        options[parseInt(value.dataset.variantOptionValueIndex, 10)] = value.value;
      }
    });
  });
  return options;
}

function getVariantFromSelectedOptions(variants, selectedOptions) {
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const isVariant = variant.options.every((option, index) => option === selectedOptions[index]);
    if (isVariant) return variant; // We found the variant
  }

  return false;
}

function getOptionsAccessibility(variants, option) {
  const optionValues = Object.keys(option.valueMap);

  if (optionValues.includes(unselectedValue)) {
    option.valueMap[unselectedValue].accessible = true;
  }

  variants.forEach(variant => {
    if (variant.available) {
      variant.options.forEach(variantOption => {
        if (optionValues.includes(variantOption)) {
          option.valueMap[variantOption].accessible = true;
        }
      });
    }
  });
  return option;
} // Returns whether the variant matches the selection filter prefix.
// // E.g. ["small", "red", "cotton"] matches ["small", "red"] but not ["small", "green"].
// // It also matches prefixes like [] and ["*", "red", "*"].


function matchesPrefix(variant, prefix) {
  if (prefix.every((v, i) => v === unselectedValue || variant.options[i] === v)) {
    // has to match unless it's 'not-selected', 'not-selected' matches everything
    return variant.available;
  }
}

function getVariantFromPartialSelection(variants, selection) {
  return variants.find(variant => {
    if (variant.available) {
      return selection.every((s, i) => s === unselectedValue || variant.options[i] === s);
    }

    return false;
  });
}

function updateOptions(product, selectOptions, radioOptions, selection, disableUnavailableOptions, removeUnavailableOptions, selectFirstAvailable) {
  let options = [...selectOptions, ...radioOptions];
  const {
    variants
  } = product;
  let nextAvailableVariant = null;
  options = options.map(option => getOptionsAccessibility(variants, option));
  options.sort((a, b) => a.variantOptionIndex - b.variantOptionIndex);

  if (options.length === 0) {
    return;
  }

  if (disableUnavailableOptions || removeUnavailableOptions) {
    // Only do this if we're disabling/hiding unavailable
    // Ensure the current selection has a match by unsetting options if necessary.
    // Does the selection match a variant? If not, unselect options starting at the last one
    while (!variants.some(v => matchesPrefix(v, selection))) {
      // Find the last set option and unset it.
      let i = selection.length - 1;

      while (i >= 0 && selection[i] === unselectedValue) {
        --i;
      }

      if (i === -1) {
        break;
      }

      if (options[i].option.value) {
        if (!selectFirstAvailable) {
          options[i].option.value = unselectedValue;
          options[i].current = unselectedValue;
        }
      }

      selection[i] = unselectedValue;
    }
  } // Determine which values in each option are selectable given the current selection.


  for (let i = 0; i < options.length; ++i) {
    const values = Object.keys(options[i].valueMap);

    for (let j = 0; j < values.length; ++j) {
      // input options
      const prefix = [...selection.slice(0, i), values[j]]; // given the current selection (ie. green/small), do any variants match?
      // If no variants match, it disables the option value in this iteration
      // disabling 'dead end' option values

      const selectable = variants.some(v => matchesPrefix(v, prefix));
      options[i].valueMap[values[j]].available = selectable;
    }
  } // If 'select first available variant' is enabled and we have some 'not-selected' values,
  // we should select options that match a variant


  if (selectFirstAvailable && selection.includes(unselectedValue)) {
    nextAvailableVariant = getVariantFromPartialSelection(variants, selection);

    if (nextAvailableVariant) {
      selection = nextAvailableVariant.options;
    }

    options.forEach(optionData => {
      const currentSelection = selection[optionData.variantOptionIndex];
      optionData.current = currentSelection;

      if (optionData.type === inputTypeDropdown) {
        optionData.option.value = currentSelection;
        optionData.optionValueEls.forEach(e => {
          e.selected = e.value === currentSelection;
        });
      } else {
        optionData.optionValueEls.forEach(e => {
          e.checked = e.value === currentSelection;
        });
      }
    });
  } else if (!selectFirstAvailable && selection.includes(unselectedValue)) {
    options.forEach(optionData => {
      // When selectFirstAvailableVariant is false, 
      // we need to manually set the 'checked' value to false for radio selections
      // because they don't have a default 'not-selected' option
      if (selection[optionData.variantOptionIndex] === unselectedValue && optionData.type !== inputTypeDropdown) {
        optionData.optionValueEls.forEach(e => {
          e.checked = false;
        });
      }
    });
  }

  for (let i = 0; i < product.options.length; i++) {
    // Corresponding select dropdown, if it exists
    const optionValues = options.find(({
      option
    }) => {
      if (parseInt(option.dataset.variantOptionIndex, 10) === i) {
        return true;
      }

      return false;
    });

    if (optionValues) {
      const fragment = document.createDocumentFragment();
      const {
        option,
        wrappers,
        optionValueEls
      } = optionValues;

      for (let j = optionValueEls.length - 1; j >= 0; j--) {
        const wrapper = wrappers[j];
        const optionValue = optionValueEls[j];
        const {
          value
        } = optionValue;
        const {
          available,
          accessible
        } = optionValues.valueMap[value];

        if (optionValue !== unselectedValue) {
          optionValue.disabled = disableUnavailableOptions && !available;
          optionValue.dataset.variantOptionAccessible = accessible;
          optionValue.dataset.variantOptionAvailable = available;

          if (!removeUnavailableOptions || accessible) {
            fragment.insertBefore(wrapper, fragment.firstElementChild);
          }
        }
      }

      option.innerHTML = '';
      option.appendChild(fragment);
      const chosenValue = optionValueEls.find(value => value.selected || value.checked);
      option.dataset.variantOptionChosenValue = chosenValue && chosenValue.value !== unselectedValue ? chosenValue.value : false;
    }
  }

  return selection;
}

class OptionsSelection extends HTMLElement {
  static get observedAttributes() {
    return ['variant-selection', 'disable-unavailable', 'remove-unavailable'];
  }

  static synchronize(mainOptionsSelection) {
    const mainVariantSelection = mainOptionsSelection.getVariantSelection(); // Fast return if we aren't associated with a variant selection

    if (!mainVariantSelection) return Promise.resolve(false);
    return mainOptionsSelection.getSelectedOptions().then(selectedOptions => {
      // Update all other options selects associated with the same variant ui
      const optionsSelections = document.querySelectorAll('options-selection');
      optionsSelections.forEach(optionsSelection => {
        if (optionsSelection !== mainOptionsSelection && optionsSelection.getVariantSelection() === mainVariantSelection) {
          optionsSelection.setSelectedOptions(selectedOptions);
        }
      });
    }).then(() => true);
  }

  constructor() {
    super();
    this.style.display = '';
    this._events = [];
    this._onChangeFn = this._onOptionChange.bind(this);
    this._optionsEls = this.querySelectorAll('[data-variant-option]');
    const options = getOptions(this._optionsEls);
    this._selectOptions = options.select;
    this._radioOptions = options.radio;

    this._associateVariantSelection(this.getAttribute('variant-selection'));
  }

  set variantSelection(value) {
    if (value) {
      this.setAttribute('variant-selection', value);
    } else {
      this.removeAttribute('variant-selection');
    }
  }

  get variantSelection() {
    return this.getAttribute('variant-selection');
  }

  connectedCallback() {
    this._optionsEls = this.querySelectorAll('[data-variant-option]');
    const options = getOptions(this._optionsEls);
    this._selectOptions = options.select;
    this._radioOptions = options.radio;

    this._associateVariantSelection(this.getAttribute('variant-selection'));

    this._selectOptions.forEach(({
      option
    }) => {
      option.addEventListener('change', this._onChangeFn);

      this._events.push({
        el: option,
        fn: this._onChangeFn
      });
    });

    this._radioOptions.forEach(({
      optionValueEls
    }) => {
      optionValueEls.forEach(value => {
        value.addEventListener('change', this._onChangeFn);

        this._events.push({
          el: value,
          fn: this._onChangeFn
        });
      });
    });

    this._onOptionChange();
  }

  disconnectedCallback() {
    this._resetOptions();

    this._events.forEach(({
      el,
      fn
    }) => el.removeEventListener('change', fn));

    this._events = [];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case 'variant-selection':
        this._associateVariantSelection(newValue);

        break;

      case 'disable-unavailable':
      case 'remove-unavailable':
        this._updateOptions(this.hasAttribute('disable-unavailable'), this.hasAttribute('remove-unavailable'), this.hasAttribute('select-first-available'));

        break;
    }
  }

  getSelectedOptions() {
    if (!this._variantSelection) return Promise.resolve(null);
    return this._variantSelection.getProduct().then(product => {
      if (!product) return null;
      return getSelectedOptions(product, this._selectOptions, this._radioOptions);
    });
  }

  getVariantSelection() {
    return this._variantSelection;
  }

  setSelectedOptions(selectedOptions) {
    setSelectedOptions(this._selectOptions, this._radioOptions, selectedOptions);
    return this._updateOptions(this.hasAttribute('disable-unavailable'), this.hasAttribute('remove-unavailable'), this.hasAttribute('select-first-available'), selectedOptions);
  }

  _associateVariantSelection(id) {
    this._variantSelection = id ? document.getElementById(id) : this.closest('variant-selection');
  }

  _updateLabels() {
    // Update any labels
    const unavailableText = this.getAttribute('data-unavailable-text');

    for (let i = 0; i < this._optionsEls.length; i++) {
      const optionsEl = this._optionsEls[i];
      let optionsNameEl = null;
      let {
        parentElement
      } = optionsEl;

      while (parentElement && !optionsNameEl) {
        const tmpOptionsNameEl = parentElement.querySelector('[data-variant-option-name]');

        if (tmpOptionsNameEl) {
          optionsNameEl = tmpOptionsNameEl;
        }

        ({
          parentElement
        } = parentElement);
      }

      if (optionsNameEl) {
        optionsNameEl.dataset.variantOptionChosenValue = optionsEl.dataset.variantOptionChosenValue;

        if (optionsEl.dataset.variantOptionChosenValue !== 'false') {
          optionsNameEl.innerHTML = optionsNameEl.dataset.variantOptionName;
          const optionNameValueSpan = optionsNameEl.querySelector('span');

          if (optionNameValueSpan) {
            optionNameValueSpan.innerHTML = optionsEl.dataset.variantOptionChosenValue;
          }
        } else {
          optionsNameEl.innerHTML = optionsNameEl.dataset.variantOptionChooseName;
        }
      }

      if (!this.hasAttribute('disable-unavailable')) {
        const selectOptions = optionsEl.querySelectorAll('option');
        selectOptions.forEach(option => {
          let optionLabel = option.innerHTML.replace(`- ${unavailableText}`, '');

          if (option.dataset.variantOptionAvailable === 'false' && option.value !== unselectedValue) {
            optionLabel = `${optionLabel} - ${unavailableText}`;
          }

          option.innerHTML = optionLabel;
        });
      }
    }
  }

  _resetOptions() {
    return this._updateOptions(false, false, this.hasAttribute('select-first-available'));
  }

  _updateOptions(disableUnavailableOptions, removeUnavailableOptions, selectFirstAvailable, selectedOptions = null) {
    if (!this._variantSelection) return Promise.resolve(false);
    return this._variantSelection.getProduct().then(product => {
      const updatedSelection = updateOptions(product, this._selectOptions, this._radioOptions, selectedOptions || getSelectedOptions(product, this._selectOptions, this._radioOptions), disableUnavailableOptions, removeUnavailableOptions, selectFirstAvailable); // Use the 'updated' selection in case its changed due to disabled options

      this._updateVariantSelection(product, updatedSelection);

      this._updateLabels();
    }).then(() => true);
  }

  _updateVariantSelection(product, selectedOptions) {
    if (!this._variantSelection) return;
    const variant = getVariantFromSelectedOptions(product.variants, selectedOptions);
    const isNotSelected = selectedOptions.some(option => option === unselectedValue); // Update master select

    if (variant) {
      this._variantSelection.variant = variant.id;
    } else {
      this._variantSelection.variant = isNotSelected ? unselectedValue : unavailableValue;
    }
  }

  _onOptionChange() {
    if (!this._variantSelection) return;

    this._variantSelection.getProduct().then(product => {
      if (!product) return;
      let selectedOptions = getSelectedOptions(product, this._selectOptions, this._radioOptions);

      this._updateOptions(this.hasAttribute('disable-unavailable'), this.hasAttribute('remove-unavailable'), this.hasAttribute('select-first-available'), selectedOptions);

      OptionsSelection.synchronize(this);
    });
  }

}

if (!customElements.get('variant-selection')) {
  customElements.define('variant-selection', VariantSelection);
}

if (!customElements.get('options-selection')) {
  customElements.define('options-selection', OptionsSelection);
}


/***/ }

}]);