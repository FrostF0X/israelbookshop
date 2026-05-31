"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[710,8957],{

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

/***/ 3465
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FacetedFilterCollection)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var _StaticCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(387);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6383);
/* harmony import */ var _components_FilterGroups__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2935);
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7652);






class FacetedFilterCollection extends _StaticCollection__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
    this.filterStyle = section.data.filter_style;
    this.filtersContentSelector = '[data-productgrid-sidebar]';
    this.filtersContent = this.el.querySelector(this.filtersContentSelector);

    this.filterRange = this.el.querySelectorAll('[data-filter-range]');
    this.rangeNames = [];

    this.filterRange.forEach(el => {
      this.rangeNames.push(el.name);
    });

    this.allowedQueryParams = ['view', 'sort_by', 'grid_list'];

    if (this.filtersContent) {
      const options = {
        groups: this.filterGroups,
        style: this.filterStyle,
      };
      this.filterGroupAccordions = new _components_FilterGroups__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(this.filtersContent, options);

      this._initFilters();
    }

    this.forms = new _Forms__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(this.el);

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

      const fillAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_4__/* .transition */ .kY)({ el: checkmark, state });
      const checkAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_4__/* .transition */ .kY)({ el: checkmarkCheck, state });

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

      let decodedElementUrl = null;

      if (elementUrl[0] === '/') {
        searchParameters = elementUrl.split('?')[1];
      } else {
        decodedElementUrl = decodeURIComponent(elementUrl);
        searchParameters = decodedElementUrl.split('?')[1];
      }

      if (!searchParameters) {
        searchParameters = '';
      }
    }

    // We have to account for the sortby and view params stored in Shopify.queryParams
    const shopifyQueryParams = Object.entries(Shopify.queryParams);

    let shopifyQueries = [];
    shopifyQueryParams.forEach(query => {
      // Make sure we're not duplicating any search parameters
      if (!searchParameters.includes(query[0]) && this.allowedQueryParams.includes(query[0])) {
        shopifyQueries.push(query.join('='));
      }
    });

    shopifyQueries = shopifyQueries.join('&');

    let urlQueryString = '';

    if (shopifyQueries && searchParameters) {
      urlQueryString = `?${searchParameters}&${shopifyQueries}`;
    } else if (searchParameters && !shopifyQueries) {
      urlQueryString = `?${searchParameters}`;
    } else {
      urlQueryString = `?${shopifyQueries}`;
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

  /**
   * Change sorting of collection
   *
   * @param event
   * @private
   */
  _changeSorting(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const url = new URL(window.location);
    url.searchParams.set('sort_by', target.value);
    window.location.search = url.search;
  }

  /**
   * Toggle grid or list view
   *
   */
  _toggleView(event) {
    const target = event.currentTarget;
    const url = new URL(window.location);
    url.searchParams.set('grid_list', target.dataset.collectionView);
    window.location.search = url.search;
  }

  /**
   * Make Shopify aware of releavent collection search info
   *  - tag
   *  - vendor
   *  - pagination
   *  - sorting criteria
   *
   * @private
   */
  _setSortByQueryParameters() {
    Shopify.queryParams = {};

    // We should only update Shopify.queryParams with grid/list view, sortby and view
    // so we'll create an allow-list of params
    const allowedQueryParams = ['view', 'sort_by', 'grid_list'];

    const queryPairs = location.search.substr(1).split('&');

    if (location.search.length) {
      queryPairs.forEach(query => {
        const queryKeyValue = query.split('=');

        if (queryKeyValue.length > 1 && allowedQueryParams.includes(queryKeyValue[0])) {
          Shopify.queryParams[decodeURIComponent(queryKeyValue[0])] = decodeURIComponent(queryKeyValue[1]);
        }
      })
    }
  }

  _stringifyShopifyQueries() {
    const shopifyQueryParams = Object.entries(Shopify.queryParams);

    let shopifyQueries = [];
    shopifyQueryParams.forEach(query => {
      shopifyQueries.push(query.join('='));
    });

    shopifyQueries = shopifyQueries.join('&');

    return shopifyQueries;
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

/***/ 387
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticCollection)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7652);
/* harmony import */ var _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2858);
/* harmony import */ var _pixelunion_shopify_asyncview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(558);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2522);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1561);
/* harmony import */ var _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9441);
/* harmony import */ var _components_ProductCompare__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2075);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4604);
/* harmony import */ var _components_FilterGroups__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2935);
/* harmony import */ var _components_RichText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9360);













class StaticCollection {
  constructor(section) {
    this.section = section;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.el = section.el;
    this.view = null;

    // sub collection section slideshow
    this.flickity = null;
    this.handleEvents = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A();
    this.subcollectionSlideshow = this.el.querySelector('[data-subcollections-layout="slideshow"]');
    this.slides = this.el.querySelectorAll('[data-subcollections-grid-item]');

    if (this._shouldInitFlickity(_pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_2__)) {
      this._initFlickity();
    } else {
      this._destroyFlickity();
    }

    this.context = section.data.context;
    this.showFilterProductCount = section.data.show_filter_product_count;
    this.productCount = section.data.product_count;
    this.filterGroups = section.data.filter_groups;
    this.filterStyle = section.data.filter_style;
    this.noMatchedProductsText = section.data.no_matched_products_text;
    this.collectionUrl = this.context.collectionUrl;
    this.currentTags = this.context.current_tags;
    this.$focusItem = null;
    this.defaultView = this.context.grid_list;
    this.postMessage = section.postMessage;
    this.filterType = section.data.filter_type;

    this.productgridSidebar = '[data-productgrid-sidebar]';
    this.filtersContentSelector = '[data-productgrid-filters-content]';
    this.filterGroupSelector = '[data-productgrid-sidebar-group]';
    this.sortContent = '[data-productgrid-sort-content]';
    this.$sortTrigger = this.$el.find('[data-productgrid-trigger-sort]');
    this.$sortTriggerButton = this.$el.find('[data-productgrid-trigger-sort-button]');
    this.$sortTriggerModal = this.$el.find('[data-productgrid-modal-sort]');
    this.$filtersTrigger = this.$el.find('[data-productgrid-trigger-filters]');
    this.$filtersContent = this.$el.find(this.filtersContentSelector);
    this.$allTags = this.$filtersContent.find('.filter-item a:not([data-filter-toggle])');
    this.$advancedTags = this.$el.find('[data-tag-advanced] a');
    this.$additionalTags = this.$el.find('[data-filter-toggle]');
    this.$viewToggle = this.$el.find('[data-collection-view]');
    this.gridContainer = this.el.querySelector('.productgrid--outer');
    this.$description = this.$el.find('[data-collection-description]');
    this.filterCheckboxes = this.el.querySelectorAll('.filter-icon--checkbox');
    this.stickyUtils = this.el.querySelector('[data-sticky-utils]');
    this.stickyUtilsIntersectionTarget = this.el.querySelector('[data-utils-intersection-target]');
    this.header = document.querySelector('[data-site-header]');
    this.stickyHeaderClass = 'site-header-sticky';

    this.compareToggle = this.el.querySelector('[data-compare-toggle]');

    this._changeSorting = this._changeSorting.bind(this);
    this._changeSortingButton = this._changeSortingButton.bind(this);
    this._showSortModal = this._showSortModal.bind(this);
    this._showFiltersModal = this._showFiltersModal.bind(this);
    this._activateTag = this._activateTag.bind(this);
    this._advancedTags = this._advancedTags.bind(this);
    this._toggleTags = this._toggleTags.bind(this);

    this._toggleView = this._toggleView.bind(this);
    this._checkListView = this._checkListView.bind(this);

    this.events = [
      this.$sortTrigger.on('change.collection', this._changeSorting),
      this.$sortTriggerButton.on('click.collection', this._changeSortingButton),
      this.$sortTriggerModal.on('click.collection', this._showSortModal),
      this.$filtersTrigger.on('click.collection', this._showFiltersModal),
      this.$allTags.on('click.collection', e => this._activateTag(e.currentTarget)),
      this.$additionalTags.on('click.collection', this._toggleTags),
      this.$viewToggle.on('click.collection', this._toggleView),
    ];

    if (this.$description.length) {
      this.richText = new _components_RichText__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A(this.$description);
    }

    // Product items
    this.productItems = [];
    this.fillAnimations = {};
    this.checkAnimations = {};

    this._initAnimations();
    this._setSortByQueryParameters();
    this._checkListView();

    if (this.section.data.enable_product_compare) {
      this._initProductCompare();
    }

    if (_pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_2__.max('S')) {
      this._initProductGridUtils();
    }

    // Save all tag handles on the page
    this.handleEls = section.el.querySelectorAll('[data-handle]');
    this.handles = [];
    this.handleEls.forEach(current => {
      this.handles.push(current.dataset.handle);
    });

    this.modal = new _components_Modal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A();

    if (this.$filtersContent.length > 0) {
      const options = {
        groups: this.filterGroups,
        style: this.filterStyle,
      };
      this.filterGroupAccordions = new _components_FilterGroups__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A(this.$filtersContent[0], options);

      this._initTags();
    }

    this.handleBreakpointChange = breakpoints => this.onBreakpointChange(breakpoints);
    _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_2__.onChange(this.handleBreakpointChange);
  }

  _initProductCompare() {
    const onEnableChange = enabled => {
      this.compareToggle.checked = enabled;
    };

    onEnableChange(_components_ProductCompare__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.enabled);

    _components_ProductCompare__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.addRunOnEnableChange(onEnableChange);

    this.handleEvents.register(this.compareToggle, 'change', () => {
      if (this.compareToggle.checked) {
        _components_ProductCompare__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.enable();
      } else {
        _components_ProductCompare__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.disable();
      }
    });
  }

  /**
   * Initialize animations on checkbox container
   * using filter tag as JSON key
   */
  _initAnimations() {
    this.filterCheckboxes.forEach(el => {
      const tagHandle = el.dataset.handle;
      const checkmark = el.querySelector('.checkmark');
      const checkmarkCheck = el.querySelector('.checkmark__check');
      let state = 'unchecked';

      if (el.closest('.filter-item').dataset.filterActive === 'true') {
        state = 'checked';
      }

      const fillAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__/* .transition */ .kY)({ el: checkmark, state });
      const checkAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__/* .transition */ .kY)({ el: checkmarkCheck, state });

      this.fillAnimations[tagHandle] = fillAnimation;
      this.checkAnimations[tagHandle] = checkAnimation;
    });
  }

  onSectionUnload() {
    this._destroyFlickity();
    _pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_2__.offChange(this.handleBreakpointChange);
    this.handleEvents.unregisterAll();

    this.events.forEach($el => $el.off('.collection'));
    this.modal.unload();

    Object.keys(this.fillAnimations).forEach(key => {
      this.fillAnimations[key].unload();
      this.checkAnimations[key].unload();
    });

    this.productItems.forEach(productItem => {
      productItem.unload();
    });

    if (this.$filtersContent.length > 0) {
      this.filterGroupAccordions.unload();
    }

    if (this.observer) {
      this.observer.disconnect();
    }
  }

  _initFlickity() {
    if (this.flickity) {
      return;
    }

    this.flickity = new (flickity__WEBPACK_IMPORTED_MODULE_4___default())(this.subcollectionSlideshow, {
      autoPlay: 0,
      accessibility: true,
      cellAlign: 'left',
      cellSelector: '[data-subcollections-grid-item]',
      groupCells: true,
      contain: true,
      pageDots: false,
      arrowShape: 'M65.29 11.99L27.28 50L65.3 87.99L70.25 83.06L37.19 50L70.26 16.94L65.29 11.99Z',
    });

    const viewport = this.subcollectionSlideshow.querySelector('.flickity-viewport');
    const slider = this.subcollectionSlideshow.querySelector('.flickity-slider');
    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('flickity-slider--wrapper');
    viewport.appendChild(sliderWrapper);
    sliderWrapper.appendChild(slider);

    this.handleEvents.register(this.subcollectionSlideshow, 'rimg:load', () => {
      if (this.flickity) {
        this.flickity.resize();
      }
    });
  }

  _destroyFlickity() {
    if (!this.flickity) {
      return;
    }

    this.flickity.destroy();
    this.flickity = null;
  }

  _initProductItems(view = 'grid-view') {
    const $productItems = this.$el.find('[data-product-item]');

    $productItems.each((i, productItem) => {
      this.productItems.push(
        new _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A({
          el: productItem,
          id: this.section.id,
          lazy: true,
          grid_list: view,
        }),
      );
    });
  }

  _shouldInitFlickity(bp) {
    if (
      (bp.max('XXXS') && this.slides.length > 3)
      || (bp.max('M') && this.slides.length >= 5)
      || (bp.min('L') && this.slides.length > 7)
    ) {
      return true;
    }

    if (this.subcollectionSlideshow) return false;

    return null;
  }

  /**
   * Open Tags/Filters modal (on mobile)
   *
   * @param event
   * @private
   */
  _showFiltersModal(event) {
    event.preventDefault();

    this.$focusItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
    this.modal.open(this.productgridSidebar, 'productgrid-sidebar');
  }

  /**
   * Open Sort by modal (on mobile)
   *
   * @param event
   * @private
   */
  _showSortModal(event) {
    event.preventDefault();

    this.$focusItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
    this.modal.open(this.sortContent, 'productgrid-sort');
  }

  _deactivateTags(currentFilterItem) {
    const currentGroup = currentFilterItem.closest('[data-filter-group]');
    const activeTags = currentGroup.querySelectorAll('[data-filter-active="true"]');

    activeTags.forEach(el => {
      const itemTag = el.dataset.handle;

      currentGroup.querySelector(`.filter-item[data-handle='${itemTag}']`).dataset.filterActive = false;

      if (this.fillAnimations[itemTag] && this.checkAnimations[itemTag]) {
        this.fillAnimations[itemTag].animateTo('unchecked');
        this.checkAnimations[itemTag].animateTo('unchecked');
      }
    });
  }

  /**
   * Style a tag as active after click, before page transition
   *
   * @param event
   * @private
   */
  _activateTag(target) {
    event.preventDefault();
    const href = target.getAttribute('href');
    const filterItem = target.closest('.filter-item');
    const filterItemTag = filterItem.dataset.handle;
    const isDisabled = filterItem.classList.contains('filter-item--disabled');

    if (isDisabled) {
      return;
    }

    let animateTo = 'checked';

    if (filterItem.dataset.filterActive === 'true') {
      animateTo = 'unchecked';
    }

    this._deactivateTags(filterItem);
    if (animateTo === 'checked') {
      filterItem.dataset.filterActive = true;
    } else {
      filterItem.dataset.filterActive = false;
    }

    if (this.fillAnimations[filterItemTag] && this.checkAnimations[filterItemTag]) {
      this.fillAnimations[filterItemTag].animateTo(animateTo);
      this.checkAnimations[filterItemTag]
        .animateTo(animateTo)
        .then(() => {
          if (this.$advancedTags.length === 0) {
            location.href = href;
          } else {
            this._advancedTags(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));
          }
        });
    } else {
      // If the animation is not registered to the tag, it is a swatch and should
      // go straight to the advanced tags function
      this._advancedTags(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target));
    }
  }

  /**
   * Used by advanced tags to concatenate tag searches
   *
   * @param event
   * @private
   */
  _advancedTags(link) {
    const $target = link.parent();
    const $filtersContent = $target.closest('nav');
    const filterGroups = $filtersContent.find('[data-filter-group]');
    const filterHandles = [];

    // Build the filter for the url based on what is in the dom
    filterGroups.each((index, filterGroup) => {
      const selectedItems = filterGroup.querySelectorAll('[data-filter-active="true"]');

      if (selectedItems.length) {
        filterHandles.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(selectedItems).data('handle'));
      }
    });

    /*
      If any of the current tags are not available on the page, it may be a menu item
      filtered by a non-grouped tag, so this tag should be added to the filters.
    */
    if (this.currentTags.length) {
      this.currentTags.forEach(tag => {
        if (!this.handles.includes(tag)) filterHandles.push(tag);
      });
    }

    this._updateLocation(filterHandles.join('+'));
  }

  _updateLocation(filter) {
    if (this.collectionUrl.indexOf('vendors') > -1) {
      location.href = `${this.collectionUrl}&constraint=${filter}`;
    } else {
      location.href = `${this.collectionUrl}/${filter}`;
    }
  }

  /**
   * Expand / Collapse additional tags in the sidebar
   *
   * @param event
   * @private
   */
  _toggleTags(event) {
    event.preventDefault();

    const $trigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
    const $items = $trigger.parent().siblings('[data-hidden-default]');
    const siblingsVisible = $trigger.data('filter-toggle');

    $items.toggleClass('filter-item--hidden', siblingsVisible);
    $trigger
      .data('filter-toggle', !siblingsVisible)
      .text(!siblingsVisible ? this.context.see_less : this.context.see_more);

    if (this.modal.isOpen()) {
      this.modal.position();
    }
  }

  /**
   * Make Shopify aware of releavent collection search info
   *  - tag
   *  - vendor
   *  - pagination
   *  - sorting criteria
   *
   * @private
   */
  _setSortByQueryParameters() {
    Shopify.queryParams = {};
    if (location.search.length) {
      for (let i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        const aKeyValue = aCouples[i].split('=');
        // Reset the page number when we apply (i.e. don't add it to params)
        if (aKeyValue.length > 1 && aKeyValue[0] !== 'page') {
          Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }
  }

  /**
   * Sort by opens a modal on mobile, this handles button events
   *
   * @param event
   * @private
   */
  _changeSortingButton(event) {
    const activeClass = 'utils-sortby--modal-button--active';

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget)
      .addClass(activeClass)
      .parent()
      .siblings()
      .find(`.${activeClass}`)
      .removeClass(activeClass);

    this._changeSorting(event);
  }

  /**
   * Change sorting of collection
   *
   * @param event
   * @private
   */
  _changeSorting(event) {
    event.preventDefault();
    const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);

    Shopify.queryParams.sort_by = $target.val();
    location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
  }

  /**
   * Toggle grid or list view
   *
   */
  _toggleView(event) {
    const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
    Shopify.queryParams.grid_list = $target.data('collection-view');
    location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
  }

  /**
   * Check grid/list view toggle query parameters
   *
   */
  _checkListView() {
    const view = Shopify.queryParams.grid_list ? Shopify.queryParams.grid_list : this.defaultView;
    this.$el.find('[href*="&grid_list"]')
      .attr('href',
        (i, url) => {
          let href = url;
          if (url.indexOf('?') < 0) {
            const replaceIndex = url.indexOf('&');
            const firstHalf = url.substr(0, replaceIndex);
            const secondHalf = url.substr(replaceIndex + 1);

            href = firstHalf.concat('?', secondHalf);
          }
          href = href.replace('grid_list', `grid_list=${view}`);
          return href;
        });

    this.$el.find('.utils-viewtoggle-button').removeClass('active');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`[data-collection-view=${view}]`).addClass('active');
    const className = view.replace('-', '');
    this.gridContainer.classList.add(`productgrid-${className}`);

    if (className === 'listview') {
      this.gridContainer.classList.remove('productgrid-gridview');
    } else {
      this.gridContainer.classList.remove('productgrid-listview');
    }

    this.view = view;

    this._initProductItems(view);
  }

  _initTags() {
    const inactiveTags = this.$filtersContent[0].querySelectorAll('[data-filter-active="false"]');
    const activeTags = this.$filtersContent[0].querySelectorAll('[data-filter-active="true"]');

    activeTags.forEach(tag => {
      if (tag.querySelector('.filter-item--swatch-wrapper') === null) {
        this._addProductCount(tag, true);
      }
      this._openActiveGroup(tag);
    });

    inactiveTags.forEach(tag => {
      this._addProductCount(tag, false);
    });
  }

  /**
* Get & set the product counts for each filter tag in the sidebar
*
*/
  _addProductCount(tag, active) {
    if (this.filterType === 'faceted' || (this.showFilterProductCount === false && this.filterStyle !== 'groups')) return;

    const productCountEl = tag.querySelector('[data-filtered-product-count]');

    if (this.collectionUrl.includes('/collections/vendors')) return;

    if (active) {
      productCountEl.innerHTML = `(${this.productCount})`;
    } else {
      const tagLinkEl = tag.querySelector('a');
      let url = tagLinkEl.getAttribute('href');
      url = url.split('?')[0];

      _pixelunion_shopify_asyncview__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.load(url, 'ajax-product-count')
        .then(_ref => {
          if (!_ref) return;
          const { data } = _ref;
          const count = data.product_count;

          productCountEl.innerHTML = `(${count})`;

          if (count === 0) {
            const title = this.noMatchedProductsText.replace('*tag*', tag.dataset.tagTitle);
            tag.classList.add('filter-item--disabled');

            tagLinkEl.ariaDisabled = true;
            tagLinkEl.title = title;
          }
        });
    }
  }

  _openActiveGroup(tag) {
    const button = this.filterStyle === 'tags'
      ? this.el.querySelector(this.filtersContentSelector)
      : tag.closest(this.filterGroupSelector).querySelector('[data-filter-group-trigger]');

    const list = tag.closest('[data-accordion-content]');
    this.filterGroupAccordions.openGroup(button, list, true);

    const tagIsHidden = 'hiddenDefault' in tag.dataset;
    if (tagIsHidden) {
      const toggle = tag.parentElement.querySelector('[data-filter-toggle="false"]');
      toggle.click();
    }
  }

  _initProductGridUtils() {
    const header = document.querySelector('[data-site-header-main]');
    const body = document.querySelector('body');
    const headerHeight = `${header.offsetHeight}px`;
    /*
      The utility bar should be positioned directly below the header when it is sticky.
      Then, we use the negative header height value to tell the IntersectionObserver when
      the utility bar has become sticky.
      If the header isn't sticky, place the utility bar at the top of the window.
    */
    if (body.classList.contains(this.stickyHeaderClass)) {
      this.stickyUtils.style.top = headerHeight;
      this.stickyUtilsIntersectionTarget.style.top = `-${headerHeight}`;
    } else {
      this.stickyUtils.style.top = '0';
      this.stickyUtilsIntersectionTarget.style.top = '0';
    }

    this._observeHeaders(this.el);
  }

  /**
 * Sets up an intersection observer to notify when the utility bar
 * becomes sticky/not-sticky.
 *
 */
  _observeHeaders() {
    this.observer = new IntersectionObserver(records => {
      records.forEach(record => {
        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target.parentElement.querySelector('[data-sticky-utils]');
        const rootBoundsInfo = record.rootBounds;

        // Started sticking.
        if (targetInfo.bottom < rootBoundsInfo.top) {
          this.postMessage('collection-page:collection-utils-sticky-change', { stuck: true, target: stickyTarget });
          this._handleStickyChange({ stuck: true, target: stickyTarget });
        }

        // Stopped sticking.
        if (targetInfo.bottom >= rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
          this.postMessage('collection-page:collection-utils-sticky-change', { stuck: false, target: stickyTarget });
          this._handleStickyChange({ stuck: false, target: stickyTarget });
        }
      });
    });

    // Add the top sentinels to each section and attach an observer.
    this.observer.observe(document.querySelector('[data-utils-intersection-target]'));
  }

  _fireEvent(stuck, target) {
    // Inform header that it should remove its box-shadow once the utility bar has become sticky.
    this.postMessage('collection-page:collection-utils-sticky-change', { stuck, target });
  }

  _handleStickyChange(data) {
    const { stuck, target } = data;
    target.classList.toggle('productgrid--utils-box-shadow', stuck);
  }

  onBreakpointChange(breakpoints) {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (breakpoints.current.max('S')) {
      this.headerTransitionEnd = () => {
        this._initProductGridUtils();
        this.header.removeEventListener('transitionend', this.headerTransitionEnd);
      };

      this.header.addEventListener('transitionend', this.headerTransitionEnd);
    }

    if (this._shouldInitFlickity(_pixelunion_breakpoint__WEBPACK_IMPORTED_MODULE_2__)) {
      this._initFlickity();
    } else {
      this._destroyFlickity();
    }
  }
}


/***/ }

}]);