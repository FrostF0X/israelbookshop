(self["webpackChunk"] = self["webpackChunk"] || []).push([[3297],{

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


/***/ },

/***/ 5752
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4704);



const eventHandlers = [];
let previousBreakpoint = null;

function getBreakpoints() {
  return window
    .getComputedStyle(document.documentElement, ':before')
    .getPropertyValue('content')
    .replace(/"/g, '')
    .split(',');
}

function getBreakpoint() {
  return window
    .getComputedStyle(document.documentElement, ':after')
    .getPropertyValue('content')
    .replace(/"/g, '');
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', (0,_helpers_throttle__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(event => {
  const currentBreakpoint = getBreakpoint();

  if (previousBreakpoint !== currentBreakpoint) {
    eventHandlers.forEach(eventHandler => {
      eventHandler(event, {
        previous: previousBreakpoint,
        current: currentBreakpoint,
      });
    });
  }

  previousBreakpoint = currentBreakpoint;
}, 100));

function isLessThanBreakpoint(breakpoint, inclusive = false) {
  const breakpoints = getBreakpoints();
  const currentBreakpoint = getBreakpoint();
  const comparison = breakpoints.indexOf(currentBreakpoint) - breakpoints.indexOf(breakpoint);

  return inclusive ? comparison <= 0 : comparison < 0;
}

function isGreaterThanBreakpoint(breakpoint, inclusive = false) {
  const breakpoints = getBreakpoints();
  const currentBreakpoint = getBreakpoint();
  const comparison = breakpoints.indexOf(currentBreakpoint) - breakpoints.indexOf(breakpoint);

  return inclusive ? comparison >= 0 : comparison > 0;
}

function isBreakpoint(...breakpoints) {
  const currentBreakpoint = getBreakpoint();
  return breakpoints.some(breakpoint => breakpoint === currentBreakpoint);
}

function onBreakpointChange(eventHandler) {
  if (eventHandlers.indexOf(eventHandler) === -1) {
    eventHandlers.push(eventHandler);
  }
}

function offBreakpointChange(eventHandler) {
  const index = eventHandlers.indexOf(eventHandler);

  if (index !== -1) {
    eventHandlers.splice(index, 1);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isLessThanBreakpoint,
  isGreaterThanBreakpoint,
  isBreakpoint,
  onBreakpointChange,
  offBreakpointChange,
});


/***/ },

/***/ 2471
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FlickityA11yPatch)
/* harmony export */ });
class FlickityA11yPatch {
  constructor(slider) {
    this.slider = slider;
    this.observer = new MutationObserver(m => this._removeAttr(m));
    this.observer.observe(this.slider, { attributes: true, childList: true, subtree: true });

    this.slider.querySelectorAll('[aria-hidden]').forEach(el => {
      el.removeAttribute('aria-hidden');
    });
  }

  _removeAttr(mutations) {
    if (mutations.length) {
      mutations.forEach(m => {
        if (m?.target && m.target.hasAttribute('aria-hidden')) {
          m.target.removeAttribute('aria-hidden');
        }
      });
    }
  }

  unload() {
    this.observer.disconnect();
  }
}


/***/ },

/***/ 4704
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ throttle)
/* harmony export */ });
function throttle(cb, delay = 250) {
  let lastCall = 0;

  return (...args) => {
    const now = new Date().getTime();

    if (now - lastCall < delay) return;

    lastCall = now;

    cb(...args);
  };
}


/***/ },

/***/ 4721
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicTwitterFeed)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6945);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2522);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_FlickityA11yPatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2471);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5752);







class DynamicTwitterFeed {
  constructor(section) {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.flickity = null;

    this.$blogPosts = this.$el.find('[data-blog-posts]');

    // Activate flickity on mobile
    this._mobileSlider = this._mobileSlider.bind(this);
    _Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.onBreakpointChange(this._mobileSlider);
    this._mobileSlider();

    this.flickityA11yPatch = new _helpers_FlickityA11yPatch__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(this.$blogPosts[0]);
  }

  /**
   * Unbind events when section is re-drawn
   */
  onSectionUnload() {
    _Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.offBreakpointChange(this._mobileSlider);

    this._destroyFlickity();

    if (this.flickityA11yPatch) {
      this.flickityA11yPatch.unload();
    }
  }

  _initFlickity() {
    this.flickity = new (flickity__WEBPACK_IMPORTED_MODULE_2___default())(this.$blogPosts[0], {
      cellSelector: '.article--excerpt-wrapper',
      contain: true,
      freeScroll: true,
      percentPosition: false,
      prevNextButtons: false,
      pageDots: false,
      setGallerySize: false,
    });

    this._bindSlider();
  }

  _destroyFlickity() {
    if (!this.flickity) {
      return;
    }

    this.$window.off('.blog-posts');
    this.$blogPosts.off('.blog-posts');
    this.flickity.destroy();
    this.flickity = null;
  }

  _mobileSlider() {
    // If is Large layout, attempt to destroy flickity
    if (_Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.isGreaterThanBreakpoint('M')) {
      this._destroyFlickity();
      return;
    }

    // Is XS/S/M, and flickity is init'd -- do nothing
    if (this.flickity) {
      return;
    }

    // Is XS/S/M, and flickity is not init'd
    this._initFlickity();
  }

  _bindSlider() {
    const $slider = this.$blogPosts.find('.flickity-slider');

    this.$window.on('resize.blog-posts', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(() => {
      this.$blogPosts.trigger('heightUpdate.blog-posts');
    }));

    this.flickity.on('cellSelect', () => {
      this.$blogPosts.trigger('heightUpdate.blog-posts');
    });

    this.$blogPosts.on('heightUpdate.blog-posts', () => {
      if (!this.flickity) {
        return;
      }

      $slider.height(Math.ceil(this.flickity.maxCellHeight));
    });

    // Sets the Slider to the height of the first slide
    this.$blogPosts.trigger('heightUpdate.blog-posts');
  }
}


/***/ }

}]);