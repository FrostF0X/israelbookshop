"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[1719],{

/***/ 2858
(__unused_webpack_module, exports) {


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

/***/ 7551
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FeaturedCollection)
/* harmony export */ });
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2522);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1561);
/* harmony import */ var _helpers_FlickityA11yPatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2471);
/* harmony import */ var _ProductGridItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9441);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5752);






class FeaturedCollection {
  constructor({ el, sectionId }) {
    this.el = el;
    this.contentWrapperEl = el.querySelector('[data-content-wrapper]');
    this.contentEl = el.querySelector('[data-content]');
    this.flickityA11yPatch = new _helpers_FlickityA11yPatch__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(this.contentEl);
    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A();

    this._resizeObserver = new ResizeObserver(() => {
      let foundTransitionEnd = false;
      this.events.register(this.el, 'transitionend', () => { foundTransitionEnd = true; });

      setTimeout(() => {
        if (foundTransitionEnd) return;

        if (this.flickity && 'resize' in this.flickity) {
          this.flickity.resize();
        }
      }, 500);
    });

    /*
     * We keep reference to the original layout of the collection
     * because dependent upon viewport width, we may need to enforce
     * one layout over the other.
     */
    this.initialDesktopLayout = this.contentEl.dataset.layout;
    this.initialMobileLayout = this.contentEl.dataset.mobileLayout;

    // Product items
    this.productItems = [];

    const productItemsEls = this.el.querySelectorAll('[data-product-item]');

    productItemsEls.forEach(productItemEl => {
      this._resizeObserver.observe(productItemEl.querySelector('.productitem__container'));
      this.productItems.push(new _ProductGridItem__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A({
        el: productItemEl,
        id: sectionId,
        lazy: false,
      }));
    });

    if (this.initialDesktopLayout === 'slideshow' || this.initialMobileLayout === 'slideshow') {
      this.onBreakpointChange = () => {
        if (this.useDesktopSlideshow || this.useMobileSlideshow) {
          this._initializeFlickity();
        } else {
          this._destroyFlickity();
        }
      };
      _Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.onBreakpointChange(this.onBreakpointChange);

      if (this.useDesktopSlideshow || this.useMobileSlideshow) {
        window.requestAnimationFrame(() => this._initializeFlickity());
      }
    }
  }

  get useDesktopSlideshow() {
    return this.initialDesktopLayout === 'slideshow' && _Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.isGreaterThanBreakpoint('M', true);
  }

  get useMobileSlideshow() {
    return this.initialMobileLayout === 'slideshow' && _Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.isLessThanBreakpoint('M');
  }

  unload() {
    this.productItems.forEach(productItem => productItem.unload());
    _Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.offBreakpointChange(this.onBreakpointChange);
    this.events.unregisterAll();

    this._destroyFlickity();

    if (this.flickityA11yPatch) {
      this.flickityA11yPatch.unload();
    }
  }

  _initializeFlickity() {
    if (this.flickity) return; // Already initialized

    this.contentEl.dataset.layout = 'slideshow';
    this.flickity = new (flickity__WEBPACK_IMPORTED_MODULE_0___default())(
      this.contentEl,
      {
        autoPlay: 0,
        accessibility: true,
        cellAlign: 'left',
        cellSelector: '.productgrid--item',
        groupCells: true,
        pageDots: false,
        contain: true,
        arrowShape: 'M65.29 11.99L27.28 50L65.3 87.99L70.25 83.06L37.19 50L70.26 16.94L65.29 11.99Z',
      },
    );

    const viewport = this.contentEl.querySelector('.flickity-viewport');
    const slider = this.contentEl.querySelector('.flickity-slider');

    /*
     * We must wrap Flickity's slider element to allow the usage of
     * clip, and clip-path to obscure the overflow product items.
     * To use clip, and clip-path, the clipped element must be absolutely
     * positioned. In this case, the only native Flickity element
     * that is absolutely positioned is the slider; but, it moves with the first
     * slide rather than remaining in the viewport removing it as a candidate.
     * Therefore, it is necessary to include a wrapper element that we can
     * absolutely position that remains within the viewport.
     * The only thing we need to watch out for is that the elements
     * are moved in a non-destructive manner.
     */
    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('flickity-slider--wrapper');
    viewport.appendChild(sliderWrapper);
    sliderWrapper.appendChild(slider);

    // Do not try resizing if user is scrolling/changing slides
    let hasCellChanged = false;

    this.flickity.on('change', () => {
      hasCellChanged = true;
    });

    this.events.register(this.el, 'transitionend', () => {
      if (hasCellChanged || !this.flickity) return;
      this.flickity.resize();
      hasCellChanged = false;
    });
  }

  _destroyFlickity() {
    if (!this.flickity) return; // Already uninitialized

    this.contentEl.dataset.layout = this.initialDesktopLayout;
    this.contentEl.dataset.mobile_layout = this.initialMobileLayout;
    const viewport = this.contentEl.querySelector('.flickity-viewport');
    const slider = this.contentEl.querySelector('.flickity-slider');

    /*
     * Remember to move the Flickity native elements back
     * into the correct DOM layout, before removing the added
     * wrapper.
     */
    const sliderWrapper = this.contentEl.querySelector('.flickity-slider--wrapper');
    viewport.appendChild(slider);
    viewport.removeChild(sliderWrapper);

    this.flickity.destroy();
    this.flickity = null;
  }
}


/***/ },

/***/ 6441
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ShowMoreToggle)
/* harmony export */ });
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7652);
/* harmony import */ var _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2858);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1561);




const noOverflowClass = 'show-more__content-wrapper--no-overflow';

class ShowMoreToggle {
  constructor({ el, context }) {
    this.context = context;
    this.wrapper = el.querySelector('[data-show-more-content-wrapper]');
    this.toggle = el.querySelector('[data-show-more-toggle]');

    if (this.wrapper && this.toggle) {
      this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
      this.menuIsOpen = false;

      this.menuTransition = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({
        el: this.wrapper,
        state: 'closed',
        stateAttribute: 'data-show-more-state',
        stateChangeAttribute: 'data-show-more-animation',
      });

      this.events.register(this.toggle, 'click', () => {
        if (this.menuIsOpen) {
          this._closeMenu();
        } else {
          this._openMenu();
        }
      });

      this.onBreakpointChange = () => this._closeMenu();
      _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_1__.onChange(this.onBreakpointChange);

      this.checkOverflow();
    }
  }

  unload() {
    if (this.events) this.events.unregisterAll();
    _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_1__.offChange(this.onBreakpointChange);
  }

  checkOverflow() {
    this._closeMenu(true);
  }

  _checkOverflow() {
    const { height } = this.wrapper.getBoundingClientRect();
    const { scrollHeight } = this.wrapper;

    // Round up to account for rounding in scrollHeight
    const noOverflow = Math.ceil(scrollHeight) <= Math.ceil(height);
    this.wrapper.classList.toggle(noOverflowClass, noOverflow);
  }

  _openMenu() {
    this.menuIsOpen = true;
    this.toggle.innerHTML = this.context.see_less;

    const { height: closedHeight } = this.wrapper.getBoundingClientRect();
    this.wrapper.style.setProperty('--closed-height', `${closedHeight}px`);

    this.wrapper.style.maxHeight = 'none';

    this.menuTransition.animateTo('open', {
      onStart: () => {
        const { height: menuToggleHeight } = this.toggle.getBoundingClientRect();
        const openHeight = this.wrapper.scrollHeight + menuToggleHeight;
        this.wrapper.style.setProperty('--open-height', `${openHeight}px`);
      },
    });
  }

  _closeMenu(force) {
    this.menuIsOpen = false;
    this.toggle.innerHTML = this.context.see_more;
    this.wrapper.classList.remove(noOverflowClass);
    this.menuTransition.animateTo('closed', { force }).then(() => {
      this.wrapper.style.removeProperty('--closed-height');
      this.wrapper.style.maxHeight = null;
      this._checkOverflow();
    });
  }
}


/***/ },

/***/ 2471
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ 1438
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticSubcollectionsFeaturedCollection)
/* harmony export */ });
/* harmony import */ var _components_FeaturedCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7551);
/* harmony import */ var _components_ShowMoreToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6441);



class StaticSubcollectionsFeaturedCollection {
  constructor(section) {
    const collectionEls = section.el.querySelectorAll('[data-featured-collection]');
    this.collections = Array.prototype.map.call(
      collectionEls,
      collectionEl => new _components_FeaturedCollection__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A({ el: collectionEl, sectionId: section.id }),
    );

    this.showMoreToggle = new _components_ShowMoreToggle__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({
      el: section.el,
      context: section.data.context,
    });
  }

  onSectionUnload() {
    this.collections.forEach(collection => collection.unload());
    this.showMoreToggle.unload();
  }
}


/***/ }

}]);