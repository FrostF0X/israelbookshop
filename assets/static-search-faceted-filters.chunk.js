"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5045,6014],{

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

/***/ 9266
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SearchForm)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5752);



function sanitizeCategory(value) {
  return value.replace(/(tag|product_type):(searchfilter_)?/, '');
}

class SearchForm {
  constructor(container, options = {}) {
    this.container = container;
    this.form = this.container.querySelector('[data-live-search-form]');
    this.filter = this.container.querySelector('[data-live-search-filter]');

    this.isLiveSearch = options.liveSearch ? options.liveSearch : false;
    this.setCategory = options.setCategory || (() => { /* do nothing */ });

    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();

    this.events.register(this.form, 'submit', e => this.submitHandler(e));

    if (this.filter) {
      this.filterLabel = this.container.querySelector('[data-live-search-filter-label]');

      // page-search-form uses a hidden input to persist the filter, in which case
      // this.filter exists, but this.filterLabel does not.
      if (this.filterLabel) {
        this.setCategory(this.filterLabel.value);

        this.events.register(this.filter, 'change', e => {
          const { value } = e.target;
          if (value) {
            const newValue = sanitizeCategory(value);
            this.filterLabel.innerHTML = newValue;
            this.setCategory(newValue);
            this.form.classList.add('live-search-filter-active');
          } else {
            this.filterLabel.innerHTML = e.target.dataset.filterAll;
            this.form.classList.remove('live-search-filter-active');
            this.setCategory('');
          }
        });
      }

      const hideFilterIfMobile = () => {
        if (_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
          this.filter.value = '';
          this.form.classList.remove('live-search-filter-active');
          if (this.filterLabel) {
            this.filterLabel.innerHTML = this.filter.dataset.filterAll;
          }
        }
      };

      hideFilterIfMobile();
      _Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.onBreakpointChange(() => hideFilterIfMobile());
    }
  }

  unload() {
    this.events.unregisterAll();
  }

  submitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget.cloneNode(true);
    const termsInput = form.querySelector('[name=q]');

    form.style.position = 'absolute';
    form.style.left = '-1000px';
    form.style.bottom = '-1000px';
    form.style.visibility = 'hidden';

    let terms = termsInput.value;

    if (this.isLiveSearch && !terms) {
      return;
    }

    // Add field filter
    // Filter should always come before the input terms,
    // otherwise Shopify won't return the expected results.
    terms = this.filter && this.filter.value ? `${this.filter.value} AND ${terms}` : terms;

    // Update value
    termsInput.value = terms;

    // Forms must be in the browser context in order to submit
    window.document.body.appendChild(form);
    form.submit();
  }
}


/***/ },

/***/ 8833
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FacetedFilterSearch)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7652);
/* harmony import */ var _StaticSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4675);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6383);
/* harmony import */ var _components_FilterGroups__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2935);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4604);









class FacetedFilterSearch extends _StaticSearch__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(section) {
    super(section);
    this.el = section.el;
    this.filterInputs = null;
    this.filterEvents = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();

    this.updateTimeout = null;

    this._initFilterEvents = this._initFilterEvents.bind(this);
    this._updatePrice = this._updatePrice.bind(this);
    this._buildFilterQuery = this._buildFilterQuery.bind(this);

    this.filterGroups = section.data.filter_groups;
    this.filterStyle = 'faceted';
    this.filtersContentSelector = '[data-productgrid-sidebar]';
    this.filtersContent = this.el.querySelector(this.filtersContentSelector);
    this.filtersTrigger = this.el.querySelector('[data-productgrid-trigger-filters]');

    this.filterRange = this.el.querySelectorAll('[data-filter-range]');
    this.filterCheckboxes = this.el.querySelectorAll('.filter-icon--checkbox');
    this.rangeNames = [];
    this.fillAnimations = {};
    this.checkAnimations = {};

    this.modal = new _components_Modal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();

    this.filterEvents.register(this.filtersTrigger, 'click', e => {
      this._showFiltersModal(e);
    });

    this._initAnimations();

    this.filterRange.forEach(el => {
      this.rangeNames.push(el.name);
    });

    if (this.filtersContent) {
      const options = {
        groups: this.filterGroups,
        style: this.filterStyle,
      };
      this.filterGroupAccordions = new _components_FilterGroups__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(this.filtersContent, options);

      this._initFilters();
    }

    this.forms = new _Forms__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(this.el);

    this._initFilterEvents();
  }

  _initFilterEvents() {
    /* For radio buttons */
    this.filterInputs = this.el.querySelectorAll('[data-filter-input]');

    this.filterInputs.forEach(filter => {
      this.filterEvents.register(filter, 'click', e => {
        e.preventDefault();
        const target = e.currentTarget;

        if (target.dataset.hasOwnProperty('disabled')) return;

        const handle = target.getAttribute('data-handle');

        let animateTo = 'checked';

        if (target.getAttribute('data-filter-active')) {
          animateTo = 'unchecked';
          target.removeAttribute('data-filter-active');
        } else {
          target.setAttribute('data-filter-active', '');
        }

        if (this.fillAnimations[handle] && this.checkAnimations[handle]) {
          this.fillAnimations[handle].animateTo(animateTo);
          this.checkAnimations[handle].animateTo(animateTo);
        }

        this.getFilteredResults(e.currentTarget);
      });
    });

    /* For range input */
    this.filterRange.forEach(filter => {
      this.filterEvents.register(filter, 'keyup', e => this._updatePrice(e.currentTarget));
      this.filterEvents.register(filter, 'change', e => this._updatePrice(e.currentTarget));
    });

    this.filterAccordionButton = this.el.querySelectorAll('[data-filter-group-trigger]');

    this.filterAccordionButton.forEach(filter => {
      this.filterEvents.register(filter, 'click', e => {
        e.preventDefault();
      });
    });
  }

  /*
   * Initialize animations on checkbox container
   * using filter tag as JSON key
   */
  _initAnimations() {
    this.filterCheckboxes.forEach(el => {
      const tagHandle = el.dataset.handle;
      const checkmark = el.querySelector('.checkmark');
      const checkmarkCheck = el.querySelector('.checkmark__check');
      let state = 'unchecked';

      if (el.closest('[data-filter-input]').getAttribute('data-filter-active')) {
        state = 'checked';
      }

      const fillAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__/* .transition */ .kY)({ el: checkmark, state });
      const checkAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__/* .transition */ .kY)({ el: checkmarkCheck, state });

      this.fillAnimations[tagHandle] = fillAnimation;
      this.checkAnimations[tagHandle] = checkAnimation;
    });
  }

  _initFilters() {
    const activePriceFilter = this.el.querySelector('[data-filter-group-range]');

    this.filterRange.forEach(priceInput => {
      if (priceInput.value.length > 0) {
        activePriceFilter.setAttribute('data-filter-open', 'true');
      }
    });

    const activeFilters = this.el.querySelectorAll('[data-filter-open="true"]');

    activeFilters.forEach(filter => {
      this._openActiveGroup(filter);
    });
  }

  _showFiltersModal(event) {
    event.preventDefault();

    this.focusItem = event.currentTarget;
    this.modal.open(this.filtersContentSelector, 'productgrid-filters');
  }

  _openActiveGroup(filter) {
    const button = filter.closest('[data-filter-group]').querySelector('[data-filter-group-trigger]');

    const list = filter.closest('[data-accordion-content]');
    this.filterGroupAccordions.openGroup(button, list, true);
  }

  _buildFilterQuery(element) {
    let searchParameters;

    // If input is price range, the url_to_add property is not available, so we
    // need to build the query manually
    if (element.classList.contains('collection-filters__filter-range-input')) {
      const currentSearch = window.location.search.replace('?', '');
      const formData = new FormData(element.closest('form'));
      const newSearch = new URLSearchParams(formData).toString();

      // Filter through current search string to see if price range input already exists,
      // if it does, create new string without current price range parameters
      const splitCurrentSearch = currentSearch.split('&');

      let filteredCurrentSearch = splitCurrentSearch.filter(search => {
        if (search.includes(this.rangeNames[0]) || search.includes(this.rangeNames[1])) {
          return false;
        }

        return true;
      });

      filteredCurrentSearch = filteredCurrentSearch.join('&');

      // If current search parameters exist, append new search parameters
      // on to existing parameters
      if (filteredCurrentSearch.length > 0) {
        searchParameters = `${filteredCurrentSearch}&${newSearch}`;
      } else {
        searchParameters = `${newSearch}`;
      }
    } else {
      // If input is a link, build searchParameters using dataset URL
      const elementUrl = element.dataset.url;
      const decodedElementUrl = decodeURIComponent(elementUrl);

      searchParameters = decodedElementUrl.split('?')[1];

      if (!searchParameters) {
        searchParameters = '';
      }
    }

    let urlQueryString = '';

    if (searchParameters) {
      urlQueryString = `?${searchParameters}`;
    }

    return urlQueryString;
  }

  _updatePrice(element) {
    // cancel any pending requests
    if (this.updateTimeout !== null) {
      clearTimeout(this.updateTimeout);
    }

    // Wait for user to finish entering input before reloading page
    this.updateTimeout = setTimeout(() => {
      this.getFilteredResults(element);
    }, 2000);
  }

  getFilteredResults(element) {
    const filterQuery = this._buildFilterQuery(element);
    window.location.search = filterQuery;
  }

  onSectionUnload() {
    super.onSectionUnload();
    this.filterEvents.unregisterAll();
    this.forms.unload();
  }
}


/***/ },

/***/ 4675
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticSearch)
/* harmony export */ });
/* harmony import */ var _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9441);
/* harmony import */ var _components_search_SearchForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9266);



class StaticSearch {
  constructor(section) {
    this.section = section;
    this.el = section.el;
    this.searchField = this.el.querySelector('[data-live-search]');

    // Product items
    this.productItems = [];
    const productItems = this.el.querySelectorAll('[data-product-item]');

    productItems.forEach(productItem => {
      this.productItems.push(
        new _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A({
          el: productItem,
          id: this.section.id,
          lazy: true,
        }),
      );
    });

    this.searchForm = new _components_search_SearchForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.searchField);
  }

  onSectionUnload() {
    this.searchForm.unload();

    this.productItems.forEach(productItem => {
      productItem.unload();
    });
  }
}


/***/ }

}]);