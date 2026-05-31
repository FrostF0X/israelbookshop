"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[9441],{

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

/***/ 9441
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ ProductGridItem)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(4692);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script = __webpack_require__(2491);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(1561);
// EXTERNAL MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
var animations_es = __webpack_require__(7652);
// EXTERNAL MODULE: ./source/scripts/Layout.js
var Layout = __webpack_require__(5752);
;// ./source/scripts/helpers/LazyLoader.js
/**
 * Allows a callback to be run once, when a target intersects the viewport.
 * @constructor
 * @param {HTMLElement} target Element to track
 * @param {Function} callback Function to execute when target enters viewport (only executed once)
 * @param {Object} [options] options with which to construct the IntersectionObserver
 * @param {string} [options.rootMargin='30%'] A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
 * @param {number} [options.threshold=0] Ratio of intersection required to trigger callback
 */
class LazyLoader {
  constructor(target, callback, options) {
    const defaultOptions = {
      rootMargin: '30%',
      threshold: 0,
    };

    this.callback = callback;
    this._runCallback = this._runCallback.bind(this);

    this.observer = new IntersectionObserver(this._runCallback, { ...defaultOptions, ...options });
    this.observer.observe(target);
  }

  /**
   * Runs the callback if first entry becomes intersecting, then unloads the LazyLoader
   * @_runCallback
   * @param {IntersectionObserverEntry[]} entries Entry to check - all but the
   * first element will be ignored.
   */
  _runCallback(entries) {
    // do nothing unless target moved into state of intersection
    if (entries[0].isIntersecting === true) {
      this.unload();
      this.callback();
    }
  }

  /**
   * Disconnects IntersectionObserver if active
   * @unload
   */
  unload() {
    this.observer.disconnect();
  }
}

// EXTERNAL MODULE: ./source/scripts/components/ProductQuickshop.js
var ProductQuickshop = __webpack_require__(9383);
// EXTERNAL MODULE: ./source/scripts/components/AddToCartFlyout.js + 1 modules
var AddToCartFlyout = __webpack_require__(8874);
// EXTERNAL MODULE: ./node_modules/just-debounce/index.js
var just_debounce = __webpack_require__(6945);
var just_debounce_default = /*#__PURE__*/__webpack_require__.n(just_debounce);
// EXTERNAL MODULE: ./node_modules/@pixelunion/rimg-shopify/dist/index.es.js
var index_es = __webpack_require__(1112);
// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-asyncview/dist/index.es.js
var dist_index_es = __webpack_require__(558);
;// ./source/scripts/components/GridItemSwatches.js





let swatchGap = null;

class GridItemSwatches {
  constructor(options) {
    this.el = options.el;
    this.setInitialVariant = options.setInitialVariant;

    this.expanded = false;
    this.swatchImages = {};
    this.swatchVariantIds = {};
    this.selectedImage = null;
    this.state = {};
    this.events = new EventHandler/* default */.A();

    this.data = JSON.parse(this.el.querySelector('[data-swatch-data]').innerHTML);
    this.variants = this.data.variants;

    this.swatchesContainer = this.el.querySelector('[data-swatches-container]');
    this.cardLinks = this.el.querySelectorAll('[data-product-page-link]');
    this.cardLinkHref = this.cardLinks[0].getAttribute('href');
    this.activeControlTime = 0;
    this.activeControl = this.swatchesContainer.querySelector('[checked]');
    this.isPreselected = !!this.activeControl;

    this.swatches = this.swatchesContainer.querySelectorAll('[data-swatch]');
    this.swatchCount = this.swatches.length;
    this.swatchCountWrapper = this.el.querySelector('[data-swatch-count-wrapper]');
    this.swatchCount = this.swatchCountWrapper.querySelector('[data-swatch-count]');
    this.swatchWidths = Array.prototype.map.call(this.swatches, swatch => swatch.getBoundingClientRect().width);
    this.resize();
    this.el.querySelector('[data-swatches]').classList.add('processed');

    this.originalImages = {
      primary: this.el.querySelector('.productitem--image-primary'),
      alternate: this.el.querySelector('.productitem--image-alternate'),
    };

    this.disableUnavailable();

    // +/- button expansion events
    this.events.register(window, 'resize', just_debounce_default()(() => this.resize(), 50));
    this.events.register(this.swatchCountWrapper, 'click', () => this._toggleExpanded());

    // Image injection events
    this.injectImagesMouseoverEvent = this.events.register(this.el, 'mouseover', () => this._injectImages());
    this.injectImagesFocusinEvent = this.events.register(this.el, 'focusin', () => this._injectImages());

    // Image/swatch switching events
    this.events.register(this.swatchesContainer, 'mouseover', e => this._handleMouseOver(e));
    this.events.register(this.swatchesContainer, 'mouseleave', e => this._handleMouseLeave(e));
    this.events.register(this.swatchesContainer, 'click', e => this._handleClick(e));
    this.events.register(this.swatchesContainer, 'change', e => this._handleChange(e));
    this.events.register(this.swatchesContainer, 'focusin', e => this._handleSwatchFocus(e));
  }

  disableUnavailable() {
    if (!this.variants) {
      return;
    }

    const availableSwatches = {};

    this.variants.forEach(variant => {
      if (variant.available) {
        availableSwatches[variant[this.data.swatchOptionKey]] = true;
      }
    });

    const swatchInputs = this.swatchesContainer.querySelectorAll('input[name="swatch"]');

    swatchInputs.forEach(swatch => {
      if (!(swatch.value in availableSwatches)) {
        swatch.classList.add('swatch-disabled')

        if (!swatch.classList.contains('sold_out_option--selectable')) {
          swatch.disabled = true;
        }
      }
    });
  }

  resize() {
    if (this.expanded) this._toggleExpanded();

    const availableWidth = this.swatchesContainer.getBoundingClientRect().width
      - parseInt(window.getComputedStyle(this.swatchesContainer).paddingRight, 10);

    let newShowSwatchCount = this.swatches.length;
    let cumulativeWidth = 0;

    for (let i = 0; i < this.swatches.length; i++) {
      if (cumulativeWidth + this.getSwatchGap() + this.swatchWidths[i] < availableWidth) {
        cumulativeWidth += swatchGap + this.swatchWidths[i];
      } else {
        newShowSwatchCount = i;
        break;
      }
    }

    if (newShowSwatchCount === this.showSwatchCount) return;

    this.showSwatchCount = newShowSwatchCount;

    this.swatches.forEach((swatch, index) => {
      if (index < this.showSwatchCount) {
        swatch.classList.add('productitem--swatches-swatch-visible');
        swatch.classList.remove('productitem--swatches-swatch-hidden');
      } else {
        swatch.classList.remove('productitem--swatches-swatch-visible');
        swatch.classList.add('productitem--swatches-swatch-hidden');
      }
    });

    this.swatchCountWrapper.style.left = `${cumulativeWidth}px`;

    if (this.swatches.length > this.showSwatchCount) {
      this.swatchCountWrapper.style.display = 'flex';
      this.swatchCount.innerText = `+${this.swatches.length - this.showSwatchCount}`;
    } else {
      this.swatchCountWrapper.style.display = 'none';
    }
  }

  _injectImages() {
    this.events.unregister(this.injectImagesFocusinEvent);
    this.events.unregister(this.injectImagesMouseoverEvent);

    dist_index_es/* default */.A.load(this.cardLinkHref, 'product-swatch-data')
      .then(({ data }) => {
        if (this.imagesInjected) return;
        this.imagesInjected = true;
        const tempContainer = document.createDocumentFragment();

        if (data.featuredImage) {
          const tempEl = document.createElement('div');
          tempEl.innerHTML = data.featuredImage;
          const img = tempEl.querySelector('img');
          tempContainer.appendChild(img);
          this.featuredImage = img;
        }

        data.swatches.forEach(({ swatchValue, imageString, variantId }) => {
          this.swatchVariantIds[swatchValue] = variantId;
          if (imageString) {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = imageString;
            const img = tempEl.querySelector('img');
            tempContainer.appendChild(img);
            this.swatchImages[swatchValue] = img;
          }
        });
        const imagesContainer = this.el.querySelector('[data-product-item-image]');
        const salesBadge = imagesContainer.querySelector('[data-badge-sales]');

        imagesContainer.insertBefore(tempContainer, salesBadge);
        index_es/* default */.A.watch(imagesContainer);

        this._setState({
          swatchName: this.activeControl ? this.activeControl.value : null,
          primaryImage: this.originalImages.primary,
          hideAlternateImage: !!this.activeControl,
        });
      });
  }

  _setState({ swatchName, primaryImage, hideAlternateImage }) {
    const oldPrimaryImg = this.state.primaryImage;

    const href = swatchName ? `${this.cardLinkHref}?variant=${this.swatchVariantIds[swatchName]}` : this.cardLinkHref;
    this.cardLinks.forEach(link => link.setAttribute('href', href));

    this.setInitialVariant(this.swatchVariantIds[swatchName] || this.variants[0].id);

    if (oldPrimaryImg) {
      oldPrimaryImg.classList.remove('productitem--image-primary');
      oldPrimaryImg.style.visibility = '';
    }

    if (primaryImage) {
      primaryImage.classList.add('productitem--image-primary');
      primaryImage.style.visibility = hideAlternateImage ? 'visible' : '';
    }

    if (this.originalImages.alternate) {
      this.originalImages.alternate.style.visibility = hideAlternateImage ? 'hidden' : '';
    }

    this.state = { swatchName, primaryImage, hideAlternateImage };
  }

  _handleChange({ target }) {
    this.activeControlTime = Date.now();
    this.activeControl = target;
    const swatchName = target.value;
    this.selectedImage = this.swatchImages[swatchName] || this.originalImages.primary;
    this._setState({
      swatchName,
      primaryImage: this.selectedImage,
      hideAlternateImage: true,
    });
  }

  _handleClick({ target }) {
    if (target === this.activeControl && this.activeControlTime + 150 < Date.now()) {
      // Allow deselection, if swatch has been active for more than the threshold
      // because we can't guarantee the order of the click and change events
      target.checked = false;
      this.activeControl = null;
      this.selectedImage = null;

      // Swaps in featured image if card was rendered on server with preselected swatch variant image.
      if (this.isPreselected && this.featuredImage) {
        this.originalImages.primary = this.featuredImage;
        this.isPreselected = false;
      }

      this._setState({
        swatchName: null,
        primaryImage: this.state.primaryImage,
        hideAlternateImage: true,
      });
    }
  }

  _handleMouseOver(event) {
    if (event.target.hasAttribute('data-swatch-tooltip')) {
      this._setState({
        swatchName: this.state.swatchName,
        primaryImage: this.swatchImages[event.target.dataset.swatchTooltip] || this.originalImages.primary,
        hideAlternateImage: true,
      });
    }
  }

  _handleMouseLeave({ target }) {
    if (target.hasAttribute('data-swatches-container')) {
      this._setState({
        swatchName: this.state.swatchName,
        primaryImage: this.selectedImage || this.originalImages.primary,
        hideAlternateImage: !!this.selectedImage,
      });
    }
  }

  _handleSwatchFocus({ target }) {
    if (this.expanded === false && target.nextElementSibling.classList.contains('productitem--swatches-swatch-hidden')) {
      this._toggleExpanded();
    }
  }

  _toggleExpanded() {
    const swatchesEl = this.el.querySelector('[data-swatches]');

    if (this.expanded) {
      this.expanded = false;
      swatchesEl.classList.remove('productitem--swatches-expanded');
      this.swatchCount.innerText = `+${this.swatches.length - this.showSwatchCount}`;
    } else {
      this.expanded = true;
      swatchesEl.classList.add('productitem--swatches-expanded');
    }
  }

  // Getters are used to avoid having to get these properties for every card on the page
  getSwatchGap() {
    if (swatchGap === null) {
      swatchGap = parseInt(window.getComputedStyle(this.swatches[0]).getPropertyValue('margin-right'), 10);
    }
    return swatchGap;
  }

  unload() {
    this.events.unregisterAll();
  }
}

// EXTERNAL MODULE: ./source/scripts/components/ProductCompare.js
var ProductCompare = __webpack_require__(2075);
// EXTERNAL MODULE: ./source/scripts/components/Checkbox.js
var Checkbox = __webpack_require__(2616);
;// ./source/scripts/components/ProductGridItem.js













class ProductGridItem {
  constructor(options) {
    this.el = options.el;
    this.$el = jquery_default()(options.el);
    this.id = options.id;
    this.disableActionsToggle = 'disableActionsToggle' in options ? options.disableActionsToggle : false;
    this.productQuickshop = null;
    this.quickshopInitialVariant = null;
    this.quickBuySettings = null;
    this.actionsOpen = false;
    this.defaultView = options.grid_list;

    this.events = new EventHandler/* default */.A();

    if (options.lazy) {
      this.lazyLoader = new LazyLoader(this.$el[0], () => this._init());
    } else {
      this._init();
    }
  }

  _init() {
    this.$window = jquery_default()(window);
    this.$html = jquery_default()('html');
    this.content = this.el.querySelector('[data-product-item-content]');
    this.actions = this.el.querySelector('[data-product-actions]');
    this.swatchesEl = this.el.querySelector('[data-swatches]');
    this.quickBuyEl = this.el.querySelector('[data-quick-buy]');
    this.quickshopSlimEl = this.el.querySelector('[data-quickshop-slim]');
    this.quickshopFullEl = this.el.querySelector('[data-quickshop-full]');

    this.compareCheckbox = this.el.querySelector('[data-compare-checkbox]');
    this.compareItem = this.el.querySelector('[data-compare-item]');
    this.compareItemWrapper = this.el.querySelector('[data-compare-item-wrapper]');

    this.hasProductActions = this.actions !== null;

    this._addToCart = this._addToCart.bind(this);
    this._actionsToggle = this._actionsToggle.bind(this);
    this._openQuickShop = this._openQuickShop.bind(this);

    if (this.hasProductActions) {
      this._setSortByQueryParameters();
      if (!this.disableActionsToggle && this.$html.hasClass('no-touch') && this.defaultView !== 'list-view') {
        this.events.register(this.el, 'mouseenter', e => this._actionsToggle(e));
        this.events.register(this.el, 'mouseleave', e => this._actionsToggle(e));
        this.events.register(this.el, 'focusin', e => this._actionsToggle(e));
      }
      // $scripts checks existence of script in header before attempting to inject
      script_default()(jquery_default()('[data-scripts]').data('shopify-api-url'), () => {
        this.events.register(this.quickBuyEl, 'click', e => this._addToCart(e));
        this.events.register(this.quickshopSlimEl, 'click', e => this._openQuickShop(e));
        this.events.register(this.quickshopFullEl, 'click', e => this._openQuickShop(e));
      });
    }

    this.expandAnimation = (0,animations_es/* transition */.kY)({ el: this.content, state: 'closed' });

    if (this.compareCheckbox) {
      this.compareData = JSON.parse(this.el.querySelector('[data-product-compare-data]').innerHTML);

      this.expandCheckboxAnimation = (0,animations_es/* transition */.kY)({ el: this.compareItemWrapper, state: 'closed' });
      this.compareItemCheckbox = new Checkbox/* default */.A(this.compareItem);

      this.events
        .register(this.compareCheckbox, 'change', () => this._updateProductCompare(this.compareCheckbox.checked));

      const onUpdate = ({ atProductLimit }) => {
        if (ProductCompare/* default */.A.includes(this.compareData.handle)) {
          this.compareCheckbox.disabled = false;
          this.compareItemCheckbox.disabled = false;
          this.compareItem.classList.add('productitem__compare--enabled');
          this.compareItem.classList.remove('productitem__compare--disabled');
          this.compareCheckbox.checked = true;
          this.compareItemCheckbox.check();
        } else {
          this.compareCheckbox.checked = false;
          this.compareItemCheckbox.uncheck();
          this.compareCheckbox.disabled = atProductLimit;
          this.compareItemCheckbox.disabled = atProductLimit;
          this.compareItem.classList.toggle('productitem__compare--enabled', !atProductLimit);
          this.compareItem.classList.toggle('productitem__compare--disabled', atProductLimit);
        }
      };

      onUpdate({ atProductLimit: ProductCompare/* default */.A.atProductLimit });

      ProductCompare/* default */.A.runOnUpdate(onUpdate);

      const onEnableChange = enabled => {
        if (enabled) {
          this._showCompareCheckbox();
        } else if (!this.actionsOpen) {
          this._hideCompareCheckbox();
        }
      };

      onEnableChange(ProductCompare/* default */.A.enabled);

      ProductCompare/* default */.A.addRunOnEnableChange(onEnableChange);
    }

    if (this.quickbuyEl !== null) {
      this._initQuickBuy();
    }

    this._objectFitPolyfill();

    if (this.swatchesEl) {
      this.swatches = new GridItemSwatches({
        el: this.$el[0],
        setInitialVariant: id => { this.quickshopInitialVariant = id; },
        product: this.product,
      });
    }
  }

  _updateProductCompare(checkedForCompare) {
    const {
      handle,
      title,
      image,
      imageAspectRatio,
      url,
    } = this.compareData;

    // Ignore onboarding content
    if (!handle) return;

    if (checkedForCompare) {
      ProductCompare/* default */.A.enable();
      ProductCompare/* default */.A.add({
        handle,
        data: {
          title,
          image,
          imageAspectRatio,
          url,
        },
      });
    } else {
      ProductCompare/* default */.A.remove(handle);
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
          Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = aKeyValue[1];
        }
      }
    }
  }

  _initQuickBuy() {
    try {
      this.quickBuySettings = JSON.parse(this.$el.find('[data-quick-buy-settings]').text());
    } catch (error) {
      console.warn(`Quick buy: invalid QuickBuy data found. ${error.message}`);
    }
  }

  _openQuickShop(event) {
    event.preventDefault();

    const leftThumbsClass = event.currentTarget.hasAttribute('data-thumbs-left')
      ? ' quickshop-thumbs-left'
      : '';

    const modalClass = event.currentTarget.hasAttribute('data-quickshop-full')
      ? `quickshop-full${leftThumbsClass}`
      : 'quickshop-slim';

    if (this.productQuickshop) {
      this.productQuickshop.unload();
    }

    this.productQuickshop = new ProductQuickshop/* default */.A({
      $el: this.$el,
      id: this.id,
      modalClass,
      trigger: this.$el.find('.productitem--title a'),
      initialVariant: this.quickshopInitialVariant,
    });
  }

  _isObjectFitAvailable() {
    return 'objectFit' in document.documentElement.style;
  }

  _objectFitPolyfill() {
    if (this._isObjectFitAvailable()) {
      return;
    }

    const $figure = jquery_default()('[data-product-item-image]', this.$el);
    const featuredSrc = jquery_default()('img:not(.productitem--image-alternate)', $figure).attr('src');
    const alternateSrc = jquery_default()('.productitem--image-alternate', $figure).attr('src');

    $figure.addClass('product-item-image-no-objectfit');
    $figure.css('background-image', `url("${featuredSrc}")`);

    if (alternateSrc) {
      this.events.register(this.el, 'mouseover', () => {
        $figure.css('background-image', `url("${alternateSrc}")`);
      });

      this.events.register(this.el, 'mouseleave', () => {
        $figure.css('background-image', `url("${featuredSrc}")`);
      });
    }
  }

  /**
   * Get height of element, and combined height of element + actions
   *
   * @returns {{heightBase, heightExpanded: *}}
   * @private
   */
  _getHeights() {
    const { height } = this.el.getBoundingClientRect();
    const actionsHeight = this.actions.getBoundingClientRect().height;

    return {
      heightBase: height,
      heightExpanded: height + actionsHeight,
    };
  }

  _actionsToggle(event) {
    if (!Layout/* default */.A.isGreaterThanBreakpoint('M')) return;

    const $currentTarget = jquery_default()(event.currentTarget);
    const $target = jquery_default()(event.target);

    let openProductItem = false;

    // This function gets called on the element as well as the document focusin, so we want to
    // be extra careful that we are inside the product card in question. We want the product card
    // to close if another product card has received focus.
    const productHasFocus = this.$el.is($currentTarget)
      || this.$el.is($target)
      || this.$el.is($target.parents('.productgrid--item').first())
      || (event.type === 'focusin' && $target[0].contains(this.$el[0]));

    if (event.type === 'mouseenter' || event.type === 'mouseleave') {
      openProductItem = event.type === 'mouseenter';
    } else if (productHasFocus) {
      openProductItem = true;
    }

    if (openProductItem) {
      this._showActions();
    } else {
      this._hideActions();
    }
  }

  _showActions() {
    if (this.actionsOpen) { return; }

    const { heightBase, heightExpanded } = this._getHeights();

    this._showCompareCheckbox()
      .then(compareHeight => {
        this.el.style.setProperty('--base-height', `${heightBase}px`);
        this.el.style.setProperty('--open-height', `${heightExpanded + compareHeight}px`);

        // Store set the outer grid item to be open so it knows to adjust its z-index
        this.el.setAttribute('data-open', '');

        // Start animation, and transition base height to expanded height (in CSS)
        this.expandAnimation.animateTo('open');

        this.focusinEvent = this.events.register(document, 'focusin', e => this._actionsToggle(e));

        this.actionsOpen = true;
      });
  }

  _hideActions() {
    this.expandAnimation.animateTo('closed').then(() => {
      this.el.style.removeProperty('--base-height');
      this.el.removeAttribute('data-open');
    });

    this._hideCompareCheckbox();

    if (this.focusinEvent) {
      this.events.unregister(this.focusinEvent);
    }

    this.actionsOpen = false;
  }

  _showCompareCheckbox() {
    if (!this.expandCheckboxAnimation || this.expandCheckboxAnimation.state === 'open') {
      // Checkbox doesn't exist or is already visible and included in card height
      return Promise.resolve(0);
    }

    return new Promise(resolve => {
      this.expandCheckboxAnimation.animateTo('open', {
        onStart: ({ el }) => {
          const { scrollHeight } = el.querySelector('[data-compare-item]');
          this.el.style.setProperty('--compare-height', `${scrollHeight}px`);
          resolve(scrollHeight);
        },
      });
    });
  }

  _hideCompareCheckbox() {
    if (!this.expandCheckboxAnimation) return;

    // Start animation and transition checkbox height
    if (!ProductCompare/* default */.A.enabled) {
      this.expandCheckboxAnimation.animateTo('closed')
        .then(() => {
          this.el.style.setProperty('--compare-height', '0px');
        });
    }
  }

  _addToCart(event) {
    event.preventDefault();

    if (this.addToCartFlyout) {
      this.addToCartFlyout.unload();
    }

    const atcButton = event.currentTarget;
    const variantID = atcButton.getAttribute('data-variant-id');

    const formData = [
      {
        name: 'id',
        value: variantID,
      },
      {
        name: 'quantity',
        value: 1,
      },
    ];

    const options = {
      atcButton,
      settings: {
        moneyFormat: this.quickBuySettings.money_format,
        cartRedirection: this.quickBuySettings.cart_redirection,
      },
    };

    this.addToCartFlyout = new AddToCartFlyout/* default */.A(formData, options);
  }

  unload() {
    this.events.unregisterAll();

    if (this.productQuickshop) {
      this.productQuickshop.unload();
    }

    document.removeEventListener('focusin', this._actionsToggle);

    if (this.swatches) {
      this.swatches.unload();
    }

    if (this.lazyLoader) {
      this.lazyLoader.unload();
    }
  }
}


/***/ },

/***/ 9383
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ProductQuickshop)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4604);
/* harmony import */ var _ProductDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5834);
/* harmony import */ var _RichText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9360);
/* harmony import */ var _helpers_ProductReviews__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4232);
/* harmony import */ var _helpers_Ripple__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1126);







class ProductQuickshop {
  constructor(options) {
    this.$el = options.$el;
    this.id = options.id;
    this.sectionContext = options.sectionContext;
    this.initialVariant = options.initialVariant || null;
    this.quickShopSelector = options.quickShopSelector ? options.quickShopSelector : `#shopify-section-${this.id} [data-product-quickshop]`;
    this.$quickShop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.quickShopSelector);
    this.quickshopSpinner = this.$quickShop[0].querySelector('.quickshop-spinner');
    this.modalClass = options.modalClass;
    this.loaded = false;
    this.richText = null;
    this.productDetails = null;
    this.trigger = options.trigger;
    this.isOpen = false;
    this.openingAddToCart = false;
    this.modal = options.modal ? options.modal : null;
    this.quickshopContainer = options.quickshopContainer ? options.quickshopContainer : null;
    this.view = options.view ? options.view : 'product-quickshop';
    this.url = options.productUrl ? options.productUrl : this.$el.data('product-quickshop-url');
    this.modalCallbacks = {
      onOpen: this._open.bind(this),
      onClose: this._close.bind(this),
    };
    this.atcCallbacks = {
      onInit: this._onATCInit.bind(this),
      onError: this._onATCError.bind(this),
      onSuccess: this._onATCSuccess.bind(this),
      onClose: this._onATCClose.bind(this),
    };
    this._initialize();
  }

  _initialize() {
    if (this.modal == null) {
      this.modal = new _Modal__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.modalCallbacks);
      this.modal.open(
        this.quickShopSelector,
        this.modalClass,
      );
    }

    this.isOpen = true;

    const modalContent = this.quickshopContainer || this.modal.$modalInner[0].querySelector('[data-modal-content]');

    fetch(this.url.indexOf('?') >= 0 ? `${this.url}&view=quickshop` : `${this.url}?view=quickshop`)
      .then(response => response.text()) // Return text string of the HTML
      .then(data => {
        const range = document.createRange();
        const documentFragment = range.createContextualFragment(data);
        const productWrapper = documentFragment.querySelector('[data-product-wrapper]');
        const product = documentFragment.querySelector('[data-section-type="static-product"]');

        this.productSettings = JSON.parse(product.innerHTML);

        // Stop populating the modal if it was closed before the content was loaded
        if (!this.isOpen) { return; }

        // Remove product gallery before inserting content
        if (this.modalClass === 'quickshop-slim') {
          productWrapper.querySelector('product-gallery')?.remove();
        }

        modalContent.innerHTML = '';
        modalContent.appendChild(productWrapper);

        (0,_helpers_ProductReviews__WEBPACK_IMPORTED_MODULE_4__/* .initShopifyProductReviews */ .Z)();
        (0,_helpers_Ripple__WEBPACK_IMPORTED_MODULE_5__/* .setupRippleEffect */ .b)(modalContent);

        if (window.Shopify && Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }

        const $quickShopModalContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalContent); // Legacy jQuery

        this.$message = $quickShopModalContent.find('[data-product-quickshop-message]');
        this.$formArea = $quickShopModalContent.find('[data-product-form-area]');
        this.$details = $quickShopModalContent.find('[data-product-details]');
        this.$description = $quickShopModalContent.find('[data-product-description]');
        this.productEl = modalContent;
        this.context = this.productSettings.context;
        this.settings = this.productSettings.settings;
        this.product = this.productSettings.product;
        this._onQuickshopLoaded();
      }).catch();
  }

  _onQuickshopLoaded() {
    if (this.loaded) {
      return;
    }

    if (this.$description && this.$description.length) {
      this.richText = new _RichText__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(this.$description);
    }

    const options = {
      $formArea: this.$formArea,
      gallery: this.productEl.querySelector('product-gallery'),
      $details: this.$details,
      atcCallbacks: this.atcCallbacks,
      context: this.productSettings.context,
      sectionContext: this.sectionContext,
      settings: this.productSettings.settings,
      product: this.productSettings.product,
      useHistory: false,
      isQuickshop: true,
      initialVariant: this.initialVariant,
      productEl: this.productEl,
    };

    this.modal.position();
    this.modal.finishedLoading();
    this.loaded = true;

    window.requestAnimationFrame(() => {
      this.productDetails = new _ProductDetails__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(options);
    });
  }

  _open() {
    // do nothing
  }

  _close() {
    if (!this.openingAddToCart) {
      this.trigger.focus();
    }

    this.loaded = false;
    this.isOpen = false;
    this.$quickShop.empty();
    this.$quickShop.html(this.quickshopSpinner);
    this._toggleMessage('', false);
    this.modal.unload();
  }

  _toggleMessage(message, isVisible) {
    if (this.$message) {
      this.$message
        .html(message)
        .toggleClass('visible', isVisible);
    }
  }

  _onATCInit() {
    this.openingAddToCart = true;
    this.$message.removeClass('visible');
  }

  _onATCError(error) {
    const $content = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`<div class="product-message--error" tabindex="-1">${error}</div>`);
    this._toggleMessage($content, true);
    $content.focus();
  }

  _onATCSuccess() {
    this._close();
  }

  _onATCClose() {
    // Do nothing
  }

  unload() {
    if (this.isLoaded) {
      return this._close()
        .then(() => {
          if (this.productDetails) {
            this.productDetails.unload();
          }

          if (this.richText) {
            this.richText.unload();
          }
        });
    }
    return Promise.resolve();
  }
}


/***/ },

/***/ 4232
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ initShopifyProductReviews)
/* harmony export */ });
const initShopifyProductReviews = () => {
  if (!window.SPR) {
    return;
  }

  window.SPR.registerCallbacks();
  window.SPR.initRatingHandler();
  window.SPR.initDomEls();
  window.SPR.loadProducts();
  window.SPR.loadBadges();
};

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && ({
  initShopifyProductReviews,
})));


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