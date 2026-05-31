"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[922],{

/***/ 6586
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var EventHandler_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

var EventHandler =
/** @class */
function () {
  function EventHandler() {
    this.events = [];
  }

  EventHandler.prototype.register = function (el, event, listener) {
    if (!el || !event || !listener) return null;
    this.events.push({
      el: el,
      event: event,
      listener: listener
    });
    el.addEventListener(event, listener);
    return {
      el: el,
      event: event,
      listener: listener
    };
  };

  EventHandler.prototype.unregister = function (_a) {
    var el = _a.el,
        event = _a.event,
        listener = _a.listener;
    if (!el || !event || !listener) return null;
    this.events = this.events.filter(function (e) {
      return el !== e.el || event !== e.event || listener !== e.listener;
    });
    el.removeEventListener(event, listener);
    return {
      el: el,
      event: event,
      listener: listener
    };
  };

  EventHandler.prototype.unregisterAll = function () {
    this.events.forEach(function (_a) {
      var el = _a.el,
          event = _a.event,
          listener = _a.listener;
      return el.removeEventListener(event, listener);
    });
    this.events = [];
  };

  return EventHandler;
}();

exports["default"] = EventHandler;
});

var Events = /*@__PURE__*/getDefaultExportFromCjs(EventHandler_1);

var selectors = {
  disclosureList: '[data-disclosure-list]',
  disclosureToggle: '[data-disclosure-toggle]',
  disclosureInput: '[data-disclosure-input]',
  disclosureOptions: '[data-disclosure-option]'
};
var classes = {
  listVisible: 'disclosure-list--visible',
  alternateDrop: 'disclosure-list--alternate-drop'
};

var Disclosure = /*#__PURE__*/function () {
  function Disclosure(el) {
    _classCallCheck(this, Disclosure);

    this.el = el;
    this.events = new Events();
    this.cache = {};

    this._cacheSelectors();

    this._connectOptions();

    this._connectToggle();

    this._onFocusOut();
  }

  _createClass(Disclosure, [{
    key: "_cacheSelectors",
    value: function _cacheSelectors() {
      this.cache = {
        disclosureList: this.el.querySelector(selectors.disclosureList),
        disclosureToggle: this.el.querySelector(selectors.disclosureToggle),
        disclosureInput: this.el.querySelector(selectors.disclosureInput),
        disclosureOptions: this.el.querySelectorAll(selectors.disclosureOptions)
      };
    }
  }, {
    key: "_connectToggle",
    value: function _connectToggle() {
      var _this = this;

      this.events.register(this.cache.disclosureToggle, 'click', function (e) {
        var ariaExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
        e.currentTarget.setAttribute('aria-expanded', !ariaExpanded);

        _this.cache.disclosureList.classList.remove(classes.alternateDrop);

        _this.cache.disclosureList.classList.toggle(classes.listVisible);

        window.requestAnimationFrame(function () {
          var _this$cache$disclosur = _this.cache.disclosureList.getBoundingClientRect(),
              left = _this$cache$disclosur.left,
              width = _this$cache$disclosur.width;

          var _window = window,
              innerWidth = _window.innerWidth;
          var gutter = 30;

          if (left + width + gutter > innerWidth) {
            _this.cache.disclosureList.classList.add(classes.alternateDrop);
          }
        });
      });
    }
  }, {
    key: "_connectOptions",
    value: function _connectOptions() {
      var _this2 = this;

      var options = this.cache.disclosureOptions;

      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        this.events.register(option, 'click', function (e) {
          return _this2._submitForm(e.currentTarget.dataset.value);
        });
      }
    }
  }, {
    key: "_onFocusOut",
    value: function _onFocusOut() {
      var _this3 = this;

      this.events.register(this.cache.disclosureToggle, 'focusout', function (e) {
        var disclosureLostFocus = !_this3.el.contains(e.relatedTarget);

        if (disclosureLostFocus) {
          _this3._hideList();
        }
      });
      this.events.register(this.cache.disclosureList, 'focusout', function (e) {
        var childInFocus = e.currentTarget.contains(e.relatedTarget);

        var isVisible = _this3.cache.disclosureList.classList.contains(classes.listVisible);

        if (isVisible && !childInFocus) {
          _this3._hideList();
        }
      });
      this.events.register(this.el, 'keyup', function (e) {
        if (e.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        if (e.key !== 'Escape' || e.key !== 'Esc') return;

        _this3._hideList();

        _this3.cache.disclosureToggle.focus();
      });
      this.events.register(document.body, 'click', function (e) {
        var isOption = _this3.el.contains(e.target);

        var isVisible = _this3.cache.disclosureList.classList.contains(classes.listVisible);

        if (isVisible && !isOption) {
          _this3._hideList();
        }
      });
    }
  }, {
    key: "_submitForm",
    value: function _submitForm(value) {
      this.cache.disclosureInput.value = value;
      this.el.closest('form').submit();
    }
  }, {
    key: "_hideList",
    value: function _hideList() {
      this.cache.disclosureList.classList.remove(classes.listVisible);
      this.cache.disclosureToggle.setAttribute('aria-expanded', false);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.events.unregisterAll();
    }
  }]);

  return Disclosure;
}();

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function closest(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Disclosure);


/***/ },

/***/ 3686
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticUtilityBar)
/* harmony export */ });
/* harmony import */ var _pixelunion_shopify_cross_border__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6586);


class StaticUtilityBar {
  constructor(section) {
    this.el = section.el;

    // Utility Menu Variables
    this.mobileUtilityMenuEl = section.el.querySelector('[data-utility-menu-mobile]');
    this.mobileNavContentEl = null;
    this.mobileElChildren = [];
    this.documentFragmentMenu = document.createDocumentFragment();
    this.mobileLayout = section.data.settings.mobile_layout;
    this._loadMobileNavItems = this._loadMobileNavItems.bind(this);

    // Utility Bar Variables - Disclosure & Social List
    this.mobileUtilityBarEl = section.el.querySelector('[data-utility-bar-mobile]');
    this.mobileUtilityContentEl = null;
    this.mobileUtilityChildren = [];
    this.mobileUtilityPlacement = document.querySelector('[data-utility-mobile]');
    this.documentFragmentDisclosure = document.createDocumentFragment();
    this._loadMobileUtilityItems = this._loadMobileUtilityItems.bind(this);
    this.mobileScrollHeight = document.querySelector('[data-mobile-nav-content]');;
    this.mobileUtilitySocial = document.querySelector('[data-utility-social-mobile]');
    this.countryDisclosureEl = this.el.querySelector('[data-disclosure-country]');
    this.localeDisclosureEl = this.el.querySelector('[data-disclosure-locale]');
    this.disclosures = [];

    if (this.mobileUtilityMenuEl) {
      this._loadMobileNavItems();
      window.addEventListener('shopify:section:load', this._loadMobileNavItems);
    }

    if (this.mobileUtilityBarEl) {
      this._loadMobileUtilityItems();
      window.addEventListener('shopify:section:load', this._loadMobileUtilityItems);
    }

    if (this.countryDisclosureEl) {
      this.disclosures.push(new _pixelunion_shopify_cross_border__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.countryDisclosureEl));
    }

    if (this.localeDisclosureEl) {
      this.disclosures.push(new _pixelunion_shopify_cross_border__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.localeDisclosureEl));
    }

    if (this.mobileUtilitySocial) {
      this.mobileScrollHeight.classList.add('utility-social-enabled');
    }
  }

  onSectionUnload() {
    window.removeEventListener('shopify:section:load', this._loadMobileNavItems);
    window.removeEventListener('shopify:section:load', this._loadMobileUtilityItems);
    if (this.mobileNavContentEl) {
      this.mobileElChildren.forEach(child => this.mobileNavContentEl.removeChild(child));
    }
    if (this.mobileUtilityContentEl) {
      this.mobileUtilityChildren.forEach(child => this.mobileUtilityPlacement.removeChild(child));
    }
    this.disclosures.forEach(disclosure => disclosure.unload());
  }

  _loadMobileNavItems() {
    const inDom = this.mobileElChildren.some(child => document.body.contains(child));

    // If utility nav already exists in mobile flyout, return
    if (inDom) return;

    this.mobileNavContentEl = document.querySelector('[data-mobile-nav-content]');
    this.mobileElChildren = [];

    if (this.mobileNavContentEl) {
      const { children } = this.mobileUtilityMenuEl;

      for (let i = 0; i < children.length; i++) {
        const clone = children[i].cloneNode(true);
        this.mobileElChildren.push(clone);
        this.documentFragmentMenu.appendChild(clone);
      }

      if (this.mobileLayout === 'below') {
        this.mobileNavContentEl.appendChild(this.documentFragmentMenu);
        this.mobileNavContentEl.classList.add('utility-nav-below');
      } else {
        this.mobileNavContentEl.insertBefore(this.documentFragmentMenu, this.mobileNavContentEl.firstElementChild);
      }
    }
  }

  _loadMobileUtilityItems() {
    const inDom = this.mobileUtilityChildren.some(child => document.body.contains(child));

    // If utility content already exists in mobile flyout, return
    if (inDom) return;

    this.mobileUtilityContentEl = document.querySelector('[data-utility-bar-mobile]');
    this.mobileUtilityChildren = [];

    if (this.mobileUtilityContentEl) {
      const { children } = this.mobileUtilityContentEl;

      for (let i = 0; i < children.length; i++) {
        const clone = children[i].cloneNode(true);
        this.mobileUtilityChildren.push(clone);
        this.documentFragmentDisclosure.appendChild(clone);
      }

      this.mobileUtilityPlacement.appendChild(this.documentFragmentDisclosure);

      const countryDisclosureElMobile = this.mobileUtilityPlacement.querySelector('[data-disclosure-country]');
      const localeDisclosureElMobile = this.mobileUtilityPlacement.querySelector('[data-disclosure-locale]');

      if (countryDisclosureElMobile) {
        this.disclosures.push(new _pixelunion_shopify_cross_border__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(countryDisclosureElMobile));
      }

      if (localeDisclosureElMobile) {
        this.disclosures.push(new _pixelunion_shopify_cross_border__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(localeDisclosureElMobile));
      }
    }
  }
}


/***/ }

}]);