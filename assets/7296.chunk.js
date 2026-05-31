"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[7296],{

/***/ 6383
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Forms)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


class Forms {
  constructor(el, selector = '.form-field-input') {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
    this.filledClass = 'form-field-filled';
    this.fieldSelector = selector;

    this._toggleFilled = this._toggleFilled.bind(this);
    this.$el.on('focus.forms', this.fieldSelector, this._toggleFilled);
    this.$el.on('blur.forms', this.fieldSelector, this._toggleFilled);

    this._checkFilled();
  }

  unload() {
    this.$el.off('.forms');
  }

  _checkFilled() {
    this.$el.find(this.fieldSelector).each((i, el) => {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).hasClass(this.filledClass)) return;

      this._toggleFilled(null, el);
    });
  }

  _toggleFilled(event = null, el = false) {
    const target = event ? event.currentTarget : el;
    const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target);
    const { value } = target;

    let isFilled = value.length > 0;

    try {
      isFilled = isFilled || $target.is(':-webkit-autofill');
      $target.toggleClass(this.filledClass, isFilled);
    } catch (e) {
      $target.toggleClass(this.filledClass, isFilled);
    }
  }
}


/***/ },

/***/ 5752
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ 2238
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LiveSearch)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6945);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7652);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1561);
/* harmony import */ var _pixelunion_rimg_shopify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1112);
/* harmony import */ var _helpers_site_main_dimmer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7740);
/* harmony import */ var _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9534);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5752);
/* harmony import */ var _SearchForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9266);











class LiveSearch {
  constructor(els, settings) {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(els.el);
    this.$header = jquery__WEBPACK_IMPORTED_MODULE_0___default()(els.header);

    this.closeEvents = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A();
    this.closeEventRequestors = new Set();

    this.settings = settings;
    this.enableImages = this.settings.enable_images;
    this.mobileSearchBar = this.settings.show_mobile_search_bar;
    this.category = '';

    this.$input = this.$el.find('[data-live-search-input]');
    this.$button = this.$el.find('[data-live-search-submit]');
    this.$takeOverButton = this.$el.find('[data-live-search-takeover-cancel]');
    this.$filter = this.$el.find('[data-live-search-filter]');

    this.$flyDown = this.$el.find('[data-live-search-flydown]');
    this.$searchResults = this.$flyDown.find('[data-live-search-results]');
    this.$searchPlaceholder = this.$flyDown.find('[data-live-search-placeholder]');
    this.$quickLinks = this.$flyDown.find('[data-live-search-quick-links]');

    this._onClose = () => {};

    this.disableAnimations = 'reduceAnimations' in document.body.dataset;
    this.animationFlyDown = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_2__/* .transition */ .kY)({
      el: this.$flyDown.get(0),
      state: 'closed',
    });
    this.animationSearchResults = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_2__/* .transition */ .kY)({
      el: this.$searchResults.get(0),
      state: 'closed',
    });
    this.animationTakeover = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_2__/* .transition */ .kY)({
      el: this.$el[0],
      state: 'closed',
    });
    if (this.$quickLinks.length) {
      this.animationQuickLinks = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_2__/* .transition */ .kY)({
        el: this.$quickLinks.get(0),
        state: 'closed',
      });
    }

    this.staticSearch = new _SearchForm__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(
      this.$el[0],
      {
        liveSearch: true,
        setCategory: category => { this.category = category; },
      },
    );

    this._search = this._search.bind(this);
    this._documentFocus = this._documentFocus.bind(this);

    this._closeEsc = e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        this._closeFlyDown(true);
        this._closeTakeOver();
      }
    };

    this.events = [
      this.$input.on('keyup.live-search', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(this._search, 250)),
      this.$input.on('focus.live-search', event => {
        event.stopPropagation();
        this._onSearchFocus(event);
      }),
      this.$takeOverButton.on('click.live-search', event => {
        event.preventDefault();
        this._closeFlyDown(true);
        this._closeTakeOver();
      }),
      this.$filter.on('change.live-search', event => {
        const terms = this.$input.val();
        const hasTerms = terms.length > 0;

        if (!hasTerms) return;

        this._search(event);
      }),
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(() => {
        // Only recalculate and open flydown if the flydown is already open.
        // This helps to prevent quick links from opening on resize.
        if (this._isFlydownOpen) this._openFlyDown();
      }, 250)),
    ];
  }

  open() {
    // If is XS, pop the search out into a Takeover screen
    if (_Layout__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
      this._openTakeOver();
    }
    this._openFlyDown();

    this.$input.focus();
  }

  set onClose(onClose) {
    this._onClose = onClose;
  }

  unload() {
    this.events.forEach($el => $el.off('.live-search'));
    this.closeEvents.unregisterAll();
    this.closeEventRequestors.clear();

    if (this.settings.use_dimmer) {
      _helpers_site_main_dimmer__WEBPACK_IMPORTED_MODULE_5__/* .clear */ .I(this);
    }
    this.staticSearch.unload();

    _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.unlock();
  }

  get _terms() {
    return this.$input.val();
  }

  get _hasTerms() {
    return this._terms.trim().length > 0;
  }

  get _isFlydownOpen() {
    return this.$flyDown.attr('data-animation-state') === 'open';
  }

  _onSearchFocus(event) {
    this.$el.addClass('live-search--focused');

    // If is XS, pop the search out into a Takeover screen
    if (_Layout__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
      if (!this._hasTerms) return;
      this._openTakeOver();
    }

    this._search(event);
  }

  _search(event) {
    // Ignore non character key strokes
    const invalidKeyStrokes = [
      'Alt',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'Capslock',
      'Control',
      'Escape',
      'Meta',
      'Shift',
      'Tab',
      'Enter',
    ];

    if (event.key && invalidKeyStrokes.indexOf(event.key) !== -1) {
      return;
    }

    let terms = this._terms;

    // If is XS, pop the search out into a Takeover screen
    if (_Layout__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
      this._openTakeOver();
    }

    this._toggleButton(this._hasTerms);

    if (this._hasTerms) {
      // Clear previous results
      this.$searchResults.html('');

      this._openFlyDown(true);

      const filter = this.$filter[0];

      // Filter should always come before the input terms, otherwise Shopify won't
      // return the expected results. Explicitly use an `AND` so splitting in Liquid becomes easier.
      // https://help.shopify.com/en/manual/online-store/storefront-search#prefix-search
      terms = filter && filter.value ? `${filter.value} AND ${terms}` : terms;

      fetch(`${window.Theme.routes.predictive_search_url}?q=${encodeURIComponent(terms)}&section_id=predictive-search`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.text();
        })
        .then(html => {
          this.$searchResults.html(html);
          _pixelunion_rimg_shopify__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.watch(this.$searchResults[0]);
          this._openFlyDown();
          this._toggleButton(false);
        })
        .catch(error => {
          throw error;
        });
    } else if (this.$quickLinks.length) {
      this._openFlyDown();
    } else {
      this._closeFlyDown(true);
    }
  }

  _searchError(response) {
    console.warn('Search had error');
    console.log(response.message, response.error, response.event);
    this._toggleButton(false);
  }

  /**
   * Toggles search button while processing
   *
   * @param disable
   * @private
   */
  _toggleButton(disable) {
    if (disable) {
      this.$button
        .addClass('search-icon--processing')
        .attr('disabled');
    } else {
      this.$button
        .removeClass('search-icon--processing')
        .removeAttr('disabled');
    }
  }

  _shouldOpenFlyDown(placeholder = false) {
    if (placeholder) return true;

    const hasTerms = this.$input.val().length > 0;
    const hasNoResults = this.$searchResults.find('[data-live-search-no-products]').length > 0;
    const hasResults = this.$searchResults.children().length > 0;
    const hasQuickLinks = this.$quickLinks.length;

    return (hasTerms && (hasResults || hasNoResults)) || (!hasTerms && hasQuickLinks);
  }

  _registerCloseEvents(requestor) {
    if (this.closeEventRequestors.size === 0) {
      this.closeEvents.register(window, 'keydown', this._closeEsc);
      this.closeEvents.register(document, 'focusin', this._documentFocus);
      this.closeEvents.register(document, 'touchstart', this._documentFocus);
      this.closeEvents.register(document, 'click', this._documentFocus);
    }

    this.closeEventRequestors.add(requestor);
  }

  _unregisterCloseEvents(requestor) {
    this.closeEventRequestors.delete(requestor);
    if (this.closeEventRequestors.size) return;
    this.closeEvents.unregisterAll();
    this._onClose();
  }

  _openFlyDown(placeholder = false) {
    if (!this._shouldOpenFlyDown(placeholder)) return;

    const resize = ({ el }) => {
      // When this function is called, element is `display: block; height: 0;`
      // but the wrapper's scrollHeight is the height we want to transition to
      const container = el.querySelector(':scope > .visible');
      const scrollHeight = container ? container.scrollHeight : 0;
      el.style.setProperty('--open-height', `${scrollHeight}px`);

      // Ensure the flydown height doesn't exceed the viewport/body
      const viewportHeight = el.closest('[data-site-header]')
        ? document.documentElement.clientHeight
        : document.documentElement.scrollHeight;
      const topPos = container.getBoundingClientRect().top + (
        el.closest('[data-site-header]') ? 0 : window.scrollY
      );
      const offset = 30;
      const maxHeight = viewportHeight - topPos - offset;
      el.style.setProperty('--flydown-max-height', `${maxHeight}px`);
    };

    this._updateFlyDown(placeholder);

    if (!this.$flyDown.data('is-open')) {
      this._registerCloseEvents('flydown');

      if (this.settings.use_dimmer) {
        _helpers_site_main_dimmer__WEBPACK_IMPORTED_MODULE_5__/* .dim */ .r(this);
      }
      this.$flyDown.data('is-open', true);
      this.animationFlyDown.animateTo('open', { force: this.disableAnimations, onStart: resize })
        .then(() => this.$el.addClass('live-search--active'));
    } else {
      resize({ el: this.$flyDown.get(0) });
    }
  }

  _updateFlyDown(placeholder = false) {
    const hasTerms = this.$input.val().length > 0;
    const hasNoResults = this.$searchResults.find('[data-live-search-no-products]').length > 0;
    const hasResults = this.$searchResults.children().length > 0;
    const hasQuickLinks = this.$quickLinks.length;

    if (placeholder) {
      this.$searchResults.removeClass('visible');
      this.$quickLinks.removeClass('visible');
      this.$searchPlaceholder.addClass('visible');
      if (this.animationQuickLinks) {
        this.animationQuickLinks.animateTo('hidden', { force: this.disableAnimations });
      }
      this.animationSearchResults.animateTo('hidden', { force: this.disableAnimations });
    } else if (hasTerms && (hasNoResults || hasResults)) {
      this.$searchPlaceholder.removeClass('visible');
      this.$quickLinks.removeClass('visible');
      this.$searchResults.addClass('visible');
      if (this.animationQuickLinks) {
        this.animationQuickLinks.animateTo('hidden', { force: this.disableAnimations });
      }
      this.animationSearchResults.animateTo('visible', { force: this.disableAnimations });
    } else if (hasQuickLinks) {
      this.$searchPlaceholder.removeClass('visible');
      this.$searchResults.removeClass('visible');
      this.$quickLinks.addClass('visible');
      this.animationSearchResults.animateTo('hidden', { force: this.disableAnimations });
      this.animationQuickLinks.animateTo('visible', { force: this.disableAnimations });
    }
  }

  /**
   * Close the FlyDown when no longer needed
   *  - Keep focus styling if input is still being interacted with
   *
   * @param retainFocus
   * @private
   */
  _closeFlyDown(retainFocus = false) {
    if (!this.$flyDown.data('is-open')) {
      return;
    }

    this._unregisterCloseEvents('flydown');

    _helpers_site_main_dimmer__WEBPACK_IMPORTED_MODULE_5__/* .clear */ .I(this);
    this.$flyDown.data('is-open', false);
    this.$searchPlaceholder.removeClass('visible');
    this.$quickLinks.removeClass('visible');
    this.$searchResults.removeClass('visible');
    if (this.animationQuickLinks) {
      this.animationQuickLinks.animateTo('closed', { force: this.disableAnimations });
    }
    this.animationSearchResults.animateTo('closed', { force: this.disableAnimations });
    this.animationFlyDown
      .animateTo('closed', { force: this.disableAnimations, onStart: ({ el }) => el.style.setProperty('--open-height', '0') })
      .then(() => {
        this.$el.removeClass('live-search--active');

        if (!retainFocus) {
          this.$el.removeClass('live-search--focused');
        }
      });
  }

  _openTakeOver() {
    if (this.animationTakeover.state === 'open') return;

    if (this.$header.hasClass('search--section')) {
      document.body.classList.add('search-takeover-active');
    }
    _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.lock(this.$el[0]);
    this.$el.addClass('live-search--takeover');
    document.body.classList.add('mobile-search-takeover-active');
    this._registerCloseEvents('takeover');
    if (this.settings.use_dimmer) {
      _helpers_site_main_dimmer__WEBPACK_IMPORTED_MODULE_5__/* .dim */ .r(this);
    }
    if (this.mobileSearchBar) {
      // "Expand out" style
      const el = this.$el[0];
      const {
        top,
        right,
        left,
        width,
      } = el.getBoundingClientRect();

      el.style.setProperty('--live-search-takeover-initial-top', `${top}px`);
      el.style
        .setProperty('--live-search-takeover-initial-right', `${window.innerWidth - right}px`);
      el.style.setProperty('--live-search-takeover-initial-left', `${left}px`);
      el.style.setProperty('--live-search-takeover-initial-width', `${width}px`);

      el.parentNode.style.height = `${el.parentNode.getBoundingClientRect().height}px`;

      this.animationTakeover.animateTo('open', { force: this.disableAnimations });
    } else {
      // "Slide up" style
      this.animationTakeover.animateTo('open', { force: this.disableAnimations, hold: true });
    }
  }

  _closeTakeOver() {
    if (this.animationTakeover.state === 'closed') return;
    this._unregisterCloseEvents('takeover');
    if (this.settings.use_dimmer) {
      _helpers_site_main_dimmer__WEBPACK_IMPORTED_MODULE_5__/* .clear */ .I(this);
    }
    this.animationTakeover.animateTo('closed', { force: this.disableAnimations })
      .then(() => {
        _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.unlock();
        document.body.classList.remove('search-takeover-active');
        document.body.classList.remove('mobile-search-takeover-active');
        this.$el.removeClass('live-search--takeover');

        if (this.mobileSearchBar) {
          this.$el[0].parentNode.style.height = '';
        }
      });
  }

  /**
   * When the focus element has changed, either by clicking, touching, or tabbing
   * check to see if it is within the flydown
   *
   * @param event
   * @private
   */
  _documentFocus(event) {
    const $closest = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).closest('[data-live-search]');

    if ($closest[0] === this.$el[0]) {
      return;
    }

    this._closeFlyDown();
    this._closeTakeOver();
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

/***/ 9534
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ScrollLock)
/* harmony export */ });
const { body } = document;
const html = document.querySelector('html');

function _blockScroll(event) {
  // Only block events that occur outside the modal
  if (event.target.closest('.allow-scroll-while-locked')) return;
  event.preventDefault();
  event.stopPropagation();
}

class ScrollLock {
  /**
   * Prevents all scrolling of the document
   * @param {HTMLElement} modal Element within which scrolling is allowed
   */
  static lock(modal) {
    if (modal) {
      modal.classList.add('allow-scroll-while-locked');
    }
    html.classList.add('scroll-locked');
    body.style.top = -1 * window.pageYOffset;
    body.addEventListener('scroll', _blockScroll, false);
    body.addEventListener('touchmove', _blockScroll, { passive: false });
  }

  /**
   * Removes scroll lock
   */
  static unlock() {
    document
      .querySelectorAll('.allow-scroll-while-locked')
      .forEach(modal => modal.classList.remove('allow-scroll-while-locked'));
    html.classList.remove('scroll-locked');
    body.style.top = '';
    body.removeEventListener('scroll', _blockScroll, false);
    body.removeEventListener('touchmove', _blockScroll, { passive: false });
  }

  static get isLocked() {
    return html.classList.contains('scroll-locked');
  }
}


/***/ },

/***/ 7740
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ clear),
/* harmony export */   r: () => (/* binding */ dim)
/* harmony export */ });
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7652);


const el = document.querySelector('[data-site-main-dimmer]');
const animation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({ el, state: 'closed' });
const openers = new Set();

const disableAnimations = 'reduceAnimations' in document.body.dataset;

function dim(requestor) {
  if (disableAnimations) return;
  if (openers.has(requestor)) return;
  openers.add(requestor);
  animation.animateTo('open');
}

function clear(requestor) {
  openers.delete(requestor);
  if (openers.size) return;
  animation.animateTo('closed', { force: disableAnimations });
}


/***/ },

/***/ 4704
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ }

}]);