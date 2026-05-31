"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8905],{

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

/***/ 8574
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7652);


const makeBlock = el => ({
  animation: (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({
    el,
    state: 'open',
    stateAttribute: 'data-accordion-state',
    stateChangeAttribute: 'data-accordion-animation',
  }),
  isOpen: true,
});

const setOpenHeight = el => {
  el.style.setProperty('--menu-open-height', `${el.scrollHeight}px`);
};

class Accordion {
  constructor(el, options = {}) {
    this.el = el;
    this.options = {
      content: '[data-accordion-content]',
      animate: true,
      onStart: () => {},
      ...options,
    };

    this.blocks = new Map();
  }

  closeAll(options = {}) {
    this.el.querySelectorAll(this.options.content).forEach(block => this.close(block, options));
  }

  openAll(options = {}) {
    this.el.querySelectorAll(this.options.content).forEach(block => this.open(block, options));
  }

  open(el, options = {}) {
    this._open(el, options);
  }

  close(el, options = {}) {
    this._close(el, options);
  }

  toggle(el, options = {}) {
    const { isOpen } = this._getBlock(el);

    if (isOpen) {
      this._close(el, options);
    } else {
      this._open(el, options);
    }
  }

  unload() {
    this.blocks.forEach(({ animation }) => animation.unload());
  }

  _getBlock(el) {
    const block = el.matches(this.options.content) ? el : el.querySelector(this.options.content);
    if (!this.blocks.has(block)) {
      this.blocks.set(block, makeBlock(block));
    }

    return this.blocks.get(block);
  }

  _open(el, { onComplete = () => {}, force = !this.options.animate }) {
    const block = this._getBlock(el);
    if (block.isOpen) return;

    block.isOpen = true;
    this.options.onStart({ el: block.animation.el, state: 'open' });
    block.animation.animateTo('open', { force, onStart: ({ el }) => setOpenHeight(el) })
      .then(state => {
        if (state === 'open') {
          onComplete();
        }
      });
  }

  _close(el, { onComplete = () => {}, force = !this.options.animate }) {
    const block = this._getBlock(el);
    if (!block.isOpen) return;

    block.isOpen = false;
    this.options.onStart({ el: block.animation.el, state: 'closed' });
    setOpenHeight(block.animation.el);
    block.animation.animateTo('closed', { force })
      .then(state => {
        if (state === 'closed') {
          onComplete();
        }
      });
  }
}


/***/ },

/***/ 2935
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FilterGroups)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2858);
/* harmony import */ var _Accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8574);





class FilterGroups {
  constructor(el, options) {
    this.el = el;
    this.filterGroupsSetting = options.groups;
    this.filterStyleSetting = options.style;

    this.Accordion = new _Accordion__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(el);
    this._closeAllGroups();

    // Filter group selectors
    this.activeMenuClass = 'filter-group-active';
    this.activeButtonClass = 'productgrid--sidebar-button-active';
    this.buttonSelector = '[data-filter-group-trigger]';
    this.listSelector = '[data-accordion-content]';
    this.buttonTriggers = this.el.querySelectorAll(this.buttonSelector);

    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
    this.buttonTriggers.forEach(button => this.events.register(button, 'click', e => this._toggleGroup(e)));

    this._init();
  }

  _init() {
    if (!this.el.querySelector(this.listSelector)) return;

    if (this.filterStyleSetting === 'tags' && _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_1__.max('S')) {
      this._openFirst();
      return;
    }

    switch (this.filterGroupsSetting) {
      case 'expand_all':
        this._openAllGroups();
        break;
      case 'expand_first':
        this._openFirst();
        break;
      default:
        this._closeAllGroups();
        break;
    }
  }

  _openFirst() {
    const button = this.el.querySelector(this.buttonSelector);
    const list = button.parentElement.querySelector(this.listSelector);

    this.openGroup(button, list, true);
  }

  _openAllGroups() {
    this.buttonTriggers.forEach(button => {
      const list = button.parentElement.querySelector(this.listSelector);

      this.openGroup(button, list, true);
    });
  }

  _closeAllGroups() {
    this.Accordion.closeAll({ force: true });
  }

  _toggleGroup(event) {
    const button = event.target;
    const list = button.parentElement.querySelector(this.listSelector);

    list.classList.contains(this.activeMenuClass) ?
      this._closeGroup(button, list) :
      this.openGroup(button, list);
  }

  openGroup(button, list, force = false) {
    list.classList.add(this.activeMenuClass);
    button.classList.add(this.activeButtonClass);

    const onComplete = () => {
      button.setAttribute('aria-expanded', true);
    };

    this.Accordion.open(list, { onComplete, force });
  }

  _closeGroup(button, list) {
    list.classList.remove(this.activeMenuClass);
    button.classList.remove(this.activeButtonClass);

    const onComplete = () => {
      button.setAttribute('aria-expanded', false);
    };

    this.Accordion.close(list, { onComplete });
  }

  unload() {
    this.events.unregisterAll();
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

/***/ 7668
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StaticProductCompare)
});

// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(1561);
// EXTERNAL MODULE: ./node_modules/@pixelunion/rimg-shopify/dist/index.es.js
var index_es = __webpack_require__(1112);
// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-asyncview/dist/index.es.js
var dist_index_es = __webpack_require__(558);
// EXTERNAL MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
var animations_es = __webpack_require__(7652);
// EXTERNAL MODULE: ./source/scripts/components/ProductGridItem.js + 2 modules
var ProductGridItem = __webpack_require__(9441);
// EXTERNAL MODULE: ./source/scripts/components/ProductCompare.js
var ProductCompare = __webpack_require__(2075);
// EXTERNAL MODULE: ./source/scripts/components/FilterGroups.js
var FilterGroups = __webpack_require__(2935);
// EXTERNAL MODULE: ./source/scripts/components/Checkbox.js
var Checkbox = __webpack_require__(2616);
// EXTERNAL MODULE: ./source/scripts/components/Modal.js
var Modal = __webpack_require__(4604);
// EXTERNAL MODULE: ./source/scripts/components/RichText.js
var RichText = __webpack_require__(9360);
// EXTERNAL MODULE: ./source/scripts/helpers/Ripple.js + 9 modules
var Ripple = __webpack_require__(1126);
;// ./source/scripts/helpers/ScrollLink.js


class ScrollLink {
  constructor() {
    this.events = new EventHandler/* default */.A();
    this.els = [];
    this.lastTop = 0;
    this.lastLeft = 0;
    this.ticking = false;
    this.driver = null;
    this.settledTimeout = null;
  }

  add(el) {
    if (this.els.includes(el)) return;

    this.els.push(el);

    this.events.register(el, 'scroll', e => {
      if (this.driver === null) {
        this.driver = e.target;
        this._unsetScrollSnapTypes();
      }

      // Ignore scroll events on driven element
      if (this.driver && e.target !== this.driver) {
        e.preventDefault();
        return;
      }

      this.lastTop = e.target.scrollTop;
      this.lastLeft = e.target.scrollLeft;
      clearTimeout(this.settledTimeout);
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this._updateScroll();
          this.ticking = false;
          this.settledTimeout = setTimeout(() => {
            this.driver = null;
            this._resetScrollSnapTypes();
          }, 50);
        });
      }
      this.ticking = true;
    });
  }

  unload() {
    this.events.unregisterAll();
  }

  syncAll() {
    this._updateScroll();
  }

  _updateScroll() {
    this.els.forEach(el => {
      if (el === this.driver) return;

      el.scrollTop = this.lastTop;
      el.scrollLeft = this.lastLeft;
    });
  }

  _unsetScrollSnapTypes() {
    this.els.forEach(el => {
      if (el === this.driver) return;
      el.style.scrollSnapType = 'none';
    });
  }

  _resetScrollSnapTypes() {
    this.els.forEach(el => {
      el.style.scrollSnapType = null;
    });
  }
}

// EXTERNAL MODULE: ./source/scripts/components/ShowMoreToggle.js
var ShowMoreToggle = __webpack_require__(6441);
;// ./source/scripts/sections/StaticProductCompare.js














/**
 * Gets comma separated product handles from `compare` query parameter
 * @returns [String] Product handles
 */
const getCompareHandles = () => {
  const { searchParams } = new URL(window.location);
  const handles = searchParams.get('compare');
  if (typeof handles === 'string' && handles !== '') {
    return handles.split(',');
  }
  return [];
};

const updateUrlForHandles = handles => {
  if (window.Shopify && window.Shopify.designMode) return;

  const [productHandle, ...compareHandles] = handles;
  const url = new URL(window.location);
  url.searchParams.set('compare', compareHandles.join(','));
  if (productHandle) {
    url.pathname = url.pathname.replace(/\/[^/]+$/, `/${productHandle}`);
  }
  history.replaceState({}, '', url);
};

const generateBaseUrl = rootUrl => {
  const separator = /\/$/.test(rootUrl) ? '' : '/';
  return `${rootUrl}${separator}products`;
};

const lastRowClass = 'product-compare__table-row--last';

class StaticProductCompare {
  constructor(section) {
    this.sectionId = section.id;
    this.el = section.el;
    this.data = section.data;
    this.baseUrl = generateBaseUrl(section.data.root_url);
    this.templateCells = {};
    this.productItems = [];
    this.showMoreToggles = [];
    this.descriptionItems = [];
    this.filterLabels = {};
    this.filterGroups = section.data.filter_groups;
    this.activeFilterIds = new Map();
    this.filterCheckboxes = new Map();
    this.events = new EventHandler/* default */.A();
    this.filtersModal = new Modal/* default */.A(
      {
        onBeforeOpen: () => this._onBeforeFiltersModalOpen(),
        onClose: () => this._onFiltersModalClose(),
      },
    );

    this.allRows = this.el.querySelectorAll('[data-compare-row-type="info"], [data-compare-row-type="heading"]');
    this.infoRows = this.el.querySelectorAll('[data-compare-row-type="info"]');
    this.headingRows = this.el.querySelectorAll('[data-compare-row-type="heading"]');

    this._initCell(this.el);

    this.table = this.el.querySelector('[data-compare-table]');
    const productCardRow = this.infoRows[0];
    const firstNonProductCardRow = this.allRows[1];
    const emptyMessage = this.el.querySelector('[data-compare-empty]');

    // @pixelunion/animations requires the transitionend events to fire on
    // the element to which the animation is attached, but due to the table
    // structure and the use of sticky on `th` cells we are attaching the
    // animation to the `tr` and applying that animation the all `th` descendants.
    // For this to work, we need to dispatch a synthetic transitionend event on
    // the `tr` itself. Similarly we apply some animations to the entire table
    // but the actual transition is performed on individual rows.

    const eventsToSynthetize = [
      { target: productCardRow, newTarget: this.table },
      { target: firstNonProductCardRow, newTarget: this.table },
    ];

    eventsToSynthetize.forEach(({ target, newTarget }) => {
      this.events.register(target, 'transitionend', e => {
        if (e.target !== target) return;

        newTarget.dispatchEvent(new Event('transitionend'));
      });
    });

    this.clearAllFadeAnimation = (0,animations_es/* transition */.kY)({
      el: this.table,
      state: 'visible',
      stateAttribute: 'data-fade-animation-state',
      stateChangeAttribute: 'data-fade-animation',
    });

    this.emptyMessageAnimation = (0,animations_es/* transition */.kY)({
      el: emptyMessage,
      state: 'hidden',
      stateAttribute: 'data-animation-state',
      stateChangeAttribute: 'data-animation',
    });

    this.animateToEmptyState = () => {
      this._removeAllFilters();
      this._disableFilters();
      this.stickyObserver.disconnect();
      this.stickyBarAnimation.animateTo('up');
      this.clearAllFadeAnimation.animateTo('only-cards', { force: this.allRows.length < 2 })
        .then(() => this.clearAllFadeAnimation.animateTo('hidden'))
        .then(() => this.emptyMessageAnimation.animateTo(
          'visible',
          { onStart: () => { document.documentElement.scroll(0, 0); } },
        ));
    };

    this._registerProductRemoveEvents(this.el);

    this.scrollLink = new ScrollLink();
    this.scrollLink.add(this.el.querySelector('[data-compare-table-scroll-wrapper]'));

    this.filtersEl = this.el.querySelector('[data-compare-filters]');

    if (this.filtersEl) {
      const options = {
        groups: this.filterGroups,
      };

      this.filterGroupAccordions = new FilterGroups/* default */.A(this.filtersEl, options);

      this.filtersEl.querySelectorAll('[data-filter-checkbox-for]').forEach(checkboxEl => {
        this.filterCheckboxes.set(checkboxEl.dataset.filterCheckboxFor, new Checkbox/* default */.A(checkboxEl));
      });

      this.filtersModalButton = this.el.querySelector('[data-compare-open-filter-modal-button]');

      this.events.register(
        this.filtersModalButton,
        'click',
        () => this.filtersModal.open('[data-compare-filters-modal-target]', 'productgrid-filters'),
      );

      this.mobileActiveFiltersTarget = this.el.querySelector('[data-compare-mobile-active-filters-target]');

      this.activeFiltersContainer = this.el.querySelector('[data-compare-active-filters-container]');
      this.activeFiltersEl = this.activeFiltersContainer.querySelector('[data-compare-active-filters]');
      this.removeFilterTemplate = this.activeFiltersContainer.querySelector('[data-compare-filter-remove-template]');
      this.clearAllFiltersTemplate = this.activeFiltersContainer.querySelector('[data-compare-filter-clear-all-template]');

      this.events.register(this.activeFiltersEl, 'click', e => {
        const filterToRemove = e.target.closest('[data-product-compare-filter-remove]');

        if (!filterToRemove) return;

        // prevent modal from interpreting this click event as outside the modal
        // when it does a DOM trace from the by-then removed elements.
        e.stopPropagation();
        const id = filterToRemove.dataset.productCompareFilterRemove;

        if (id === '') {
          this._removeAllFilters();
          return;
        }

        document.getElementById(id).checked = false;
        this._updateFilter({ checked: false, id });
      });
    }

    this.events.register(
      this.filtersEl,
      'change',
      e => {
        const id = e.target.value;
        this.filterLabels[id] = e.target.labels[0].innerText;
        this._updateFilter({ checked: e.target.checked, id });
      },
    );

    const compareHandles = getCompareHandles();

    this.allHandles = [section.data.handle, ...compareHandles];

    this._updateBreadcrumbs();

    if (!compareHandles.length) {
      this._injectStickyBar();
      return;
    }

    // Add required columns first, so the table size
    // is correct immediately, without having to load
    // the compared products
    this._addBlankColumns(compareHandles.length);
    this._setProductCountVar(this.allHandles.length);
    Promise.all(this._fetchCompareProducts(compareHandles))
      .then(() => this._injectStickyBar());
  }

  onSectionUnload() {
    this.productItems.forEach(productItem => {
      productItem.unload();
    });

    this.events.unregisterAll();

    if (this.filterGroups) {
      this.filterGroupAccordions.unload();
    }

    this.filterCheckboxes.forEach(checkbox => checkbox.unload());

    this.stickyBarAnimation.unload();
    this.clearAllFadeAnimation.unload();
    this.scrollLink.unload();
    this.stickyBar.remove();

    if (this.tableObserver) {
      this.tableObserver.disconnect();
    }

    if (this.stickyObserver) {
      this.stickyObserver.disconnect();
    }
  }

  _registerProductRemoveEvents(el) {
    this.events.register(el.querySelector('[data-compare-clear-all]'), 'click', () => {
      this.animateToEmptyState();
      ProductCompare/* default */.A.removeAll();
    });

    this.events.register(el, 'click', e => {
      const removeButton = e.target.closest('[data-compare-remove]');

      if (!removeButton) return;

      this._removeHandle(removeButton.dataset.compareRemove);
    });
  }

  _injectStickyBar() {
    const barTemplate = this.el.querySelector('[data-compare-sticky-bar-template]').content;
    const barTable = barTemplate.querySelector('[data-compare-table]');
    barTable.appendChild(this.infoRows[0].cloneNode(true));
    this._addScrollStops(barTemplate, this.allHandles.length - 2);
    document.querySelector('[data-site-header]').append(barTemplate);
    this.stickyBar = document.querySelector('[data-compare-sticky-bar]');
    this.stickyBarRow = this.stickyBar.querySelector('[data-compare-row-type="info"]');

    this._initProductItems(this.stickyBar);
    (0,Ripple/* setupRippleEffect */.b)(this.stickyBar);
    this._registerProductRemoveEvents(this.stickyBar);

    this.scrollLink.add(this.stickyBar.querySelector('[data-compare-table-scroll-wrapper]'));

    const productCardRow = this.infoRows[0];

    this.stickyBarAnimation = (0,animations_es/* transition */.kY)({
      el: document.querySelector('[data-compare-sticky-bar]'),
      state: 'up',
      stateAttribute: 'data-sticky-animation-state',
      stateChangeAttribute: 'data-sticky-animation',
    });

    const animateToDown = () => this.stickyBarAnimation.animateTo(
      'down',
      {
        onStart: () => this.scrollLink.syncAll(),
      },
    );

    this.tableObserver = null;

    // We recreate this observer each time to ensure the margin
    // accurately reflects the bar height but don't account
    // for screen resizes because it still works acceptably
    // if the margin isn't perfect.
    const createTableObserver = () => {
      const { top, height } = this.stickyBar.getBoundingClientRect();
      this.tableObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          this.stickyBarAnimation.animateTo('up');
          return;
        }

        animateToDown();
      },
      {
        rootMargin: `-${top + height}px 0px 0px 0px`,
        threshold: 0,
      });

      this.tableObserver.observe(this.table);
    };

    const hasStickyHeader = document.body.classList.contains('site-header-sticky');

    this.stickyObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        animateToDown().then(createTableObserver);
        return;
      }

      if (this.tableObserver) {
        this.tableObserver.disconnect();
        this.tableObserver = null;
      }

      this.stickyBarAnimation.animateTo('up');
    },
    {
      rootMargin: `${hasStickyHeader ? '-100' : '0'}px 0px 0px 0px`,
      threshold: 0,
    });

    this.stickyObserver.observe(productCardRow);
  }

  _setProductCountVar(count) {
    // Set this on the body so it also applies
    // to the cards in the sticky bar in the header
    document.body.style.setProperty('--compare-products-count', Math.max(count, 2));
  }

  /**
   * @param {Integer} n Number of blank columns to add
   */
  _addBlankColumns(n) {
    this.infoRows.forEach(row => {
      const templateCell = row.querySelector('[data-compare-cell-placeholder]');

      this.templateCells[row.dataset.compareRowId] = templateCell
        .parentNode.removeChild(templateCell);

      for (let i = 0; i < n; i++) {
        row.appendChild(templateCell.cloneNode(true));
      }
    });

    this.headingRows.forEach(row => {
      const heading = row.querySelector('[data-compare-heading]');
      heading.colSpan += n - 1; // allow for removed placeholder column
    });

    this._addScrollStops(this.el, n - 1);
  }

  _addScrollStops(el, n) {
    const scrollStop = el.querySelector('[data-compare-scroll-stop]');
    for (let i = 0; i < n; i++) {
      scrollStop.after(scrollStop.cloneNode(true));
    }
  }

  /**
   * Removes product from compare
   * @param {String} handle Handle to remove
   */
  _removeHandle(handle) {
    if (this.allHandles.length === 1) {
      this.animateToEmptyState();
      ProductCompare/* default */.A.remove(handle);
      this._setProductCountVar(this.allHandles.length);
      return;
    }

    this._removeColumn(handle);
    this.allHandles = this.allHandles.filter(h => h !== handle);
    this._setProductCountVar(this.allHandles.length);
    updateUrlForHandles(this.allHandles);
    ProductCompare/* default */.A.remove(handle);
  }

  /**
   *
   * @param {String} handle Handle for product to remove from table
   */
  _removeColumn(handle) {
    const insertPlaceholders = this.allHandles.length <= 2;

    [this.stickyBarRow, ...this.infoRows].forEach(row => {
      const cell = row.querySelectorAll('[data-compare-cell]')[this.allHandles.indexOf(handle)];
      if (insertPlaceholders) {
        cell.parentNode
          .append(this.templateCells[row.dataset.compareRowId].cloneNode(true));
      }
      cell.remove();
    });

    if (!insertPlaceholders) {
      this.headingRows.forEach(row => {
        const heading = row.querySelector('[data-compare-heading]');
        heading.colSpan--;
      });

      [this.stickyBar, this.el].forEach(el => {
        // Scrollstops are identical, doesn't matter which one we remove.
        el.querySelector('[data-compare-scroll-stop]').remove();
      });

      this.showMoreToggles.forEach(toggle => toggle.checkOverflow());
    }

    const productItemImages = this.el.querySelectorAll('[data-product-item-image] img');

    index_es/* default */.A.instance.update(productItemImages);
  }

  /**
   * Fetches data and populates the table based on a list of product handles.
   *
   * @param {[String]} handles Product handles for which to fetch data
   */
  _fetchCompareProducts(handles) {
    return handles.map((handle, index) => dist_index_es/* default */.A.load(
      `${this.baseUrl}/${handle}`,
      this.sectionId,
      { view: 'compare' },
    ).then(({ html }) => {
      const parser = new DOMParser();
      const sourceEl = parser.parseFromString(html, 'text/html');
      // offset index to account for initial product
      this._populateContent(sourceEl, index + 1);
    }));
  }

  /**
   * Populates content in this section's table
   *
   * @param {HTMLElement} source Element containing all source rows and cells
   * @param {integer} columnIndex Index of target column for content
   */
  _populateContent(source, columnIndex) {
    source.querySelectorAll('[data-compare-row-type="info"]')
      .forEach(row => {
        const { compareRowId } = row.dataset;
        // Source data is always in the first cell
        const cellHTML = row.querySelector('[data-compare-cell]').innerHTML;

        const targetRow = this.el.querySelector(`[data-compare-row-id="${compareRowId}"]`);
        const targetCell = targetRow.querySelectorAll('[data-compare-cell]')[columnIndex];

        targetCell.innerHTML = cellHTML;

        targetCell.querySelectorAll('[data-compare-remove-on-populate').forEach(el => el.remove());

        this._initCell(targetCell);
      });

    this.showMoreToggles.forEach(toggle => toggle.checkOverflow());
  }

  _updateBreadcrumbs() {
    const breadcrumb = this.el.querySelector('[data-compare-breadcrumb]');

    if (!ProductCompare/* default */.A.returnBreadcrumb) {
      breadcrumb.remove();
      return;
    }

    const { url, title } = ProductCompare/* default */.A.returnBreadcrumb;

    breadcrumb.href = url;

    if (title) {
      const breadcrumbText = breadcrumb.querySelector('[data-compare-breadcrumb-text]');
      breadcrumbText.innerHTML = this.data.breadcrumb.replace('** location **', title);
    }

    const placeholders = this.el.querySelectorAll('[data-compare-placeholder-link]');

    placeholders.forEach(placeholder => {
      placeholder.href = url;
    });
  }

  _removeAllFilters() {
    this.activeFilterIds.forEach((_, id) => {
      document.getElementById(id).checked = false;
      this._updateFilter({ checked: false, id });
    });
  }

  _disableFilters() {
    this.filtersDisabled = true;
    this.filtersEl.querySelectorAll('[data-compare-filter-checkbox]')
      .forEach(checkbox => { checkbox.disabled = true; });
  }

  _updateFilter({ checked, id }) {
    if (this.filtersDisabled) return;

    if (checked) {
      this.activeFilterIds.set(id, true);
      this.filterCheckboxes.get(id).check();
    } else {
      this.activeFilterIds.delete(id);
      this.filterCheckboxes.get(id).uncheck();
    }

    this._updateAppliedFilters();
    this._updateActiveFilterCount();

    const activeFilterCount = this.activeFilterIds.size;

    if (activeFilterCount === 0) {
      // show all rows
      this.allRows.forEach(row => {
        row.style.display = '';
        row.classList.remove(lastRowClass);
      });
      return;
    }

    this.infoRows.forEach(row => {
      if ('compareIgnoreFilter' in row.dataset) return;

      row.style.display = this.activeFilterIds.has(row.dataset.compareRowId) ? '' : 'none';
    });

    this._updateHeadersDisplay();
  }

  _updateAppliedFilters() {
    this.activeFiltersEl.innerHTML = '';
    this.activeFilterIds.forEach((_, id) => {
      const removeFilter = this.removeFilterTemplate.cloneNode(true).content;
      removeFilter.firstElementChild.dataset.productCompareFilterRemove = id;
      removeFilter.querySelector('[data-compare-filter-remove-text]').innerHTML = this.filterLabels[id];
      this.activeFiltersEl.append(removeFilter);
    });

    if (this.activeFilterIds.size) {
      this.activeFiltersContainer.style.display = '';
      this.activeFiltersEl.append(this.clearAllFiltersTemplate.cloneNode(true).content);
    } else {
      this.activeFiltersContainer.style.display = 'none';
    }
  }

  _updateActiveFilterCount() {
    const filterText = this.el.querySelector('[data-compare-filter-text]');

    if (this.activeFilterIds.size > 0) {
      const filterTextString = this.data.filter_count.replace(
        '** count **',
        this.activeFilterIds.size,
      );
      filterText.innerHTML = filterTextString;
    } else {
      filterText.innerHTML = this.data.filter_count_zero;
    }
  }

  /**
   * Update visibility of header rows in table depending on visibility
   * of info rows
   */
  _updateHeadersDisplay() {
    let lastHeadingRow = null;
    let showLastHeading = false;
    let lastDisplayedRow = null;

    const updateHeadingDisplay = () => {
      if (lastHeadingRow) {
        lastHeadingRow.style.display = showLastHeading ? '' : 'none';
      }
    };

    const updateLastDisplayedRow = () => {
      if (lastDisplayedRow) {
        lastDisplayedRow.classList.add(lastRowClass);
      }
    };

    this.allRows.forEach(row => {
      row.classList.remove(lastRowClass);
      if (row.dataset.compareRowType === 'heading') {
        updateHeadingDisplay();
        updateLastDisplayedRow();
        lastHeadingRow = row;
        showLastHeading = false;
        lastDisplayedRow = null;
      } else if (this.activeFilterIds.has(row.dataset.compareRowId) || 'compareIgnoreFilter' in row.dataset) {
        lastDisplayedRow = row;
        showLastHeading = true;
      }
    });

    updateHeadingDisplay();
    updateLastDisplayedRow();
  }

  /**
   * Move active filters element into sidebar so it appears in the modal
   */
  _onBeforeFiltersModalOpen() {
    this.mobileActiveFiltersTarget.before(this.activeFiltersEl);
  }

  /**
   * Move active filters element back into normal location
   */
  _onFiltersModalClose() {
    this.activeFiltersContainer.append(this.activeFiltersEl);
  }

  _initCell(el) {
    const productItemDescription = el.querySelector('[data-compare-description]');

    if (productItemDescription) {
      this.descriptionItems.push(new RichText/* default */.A(productItemDescription));
      this.showMoreToggles.push(new ShowMoreToggle/* default */.A({ el, context: this.data.context }));
    }

    this._initProductItems(el);

    (0,Ripple/* setupRippleEffect */.b)(el);
  }

  _initProductItems(el) {
    const productItemEls = el.querySelectorAll('[data-product-item]');

    productItemEls.forEach(productItem => {
      index_es/* default */.A.watch(el);

      this.productItems.push(new ProductGridItem/* default */.A({
        el: productItem,
        id: this.sectionId,
        disableActionsToggle: true,
        lazy: false,
      }));
    });

    if (productItemEls.length && window.Shopify && Shopify.PaymentButton) {
      Shopify.PaymentButton.init();
    }
  }
}


/***/ }

}]);