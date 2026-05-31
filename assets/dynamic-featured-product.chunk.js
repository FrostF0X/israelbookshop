"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5671],{

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


/***/ },

/***/ 345
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicProduct)
/* harmony export */ });
/* harmony import */ var _Product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2506);


class DynamicProduct extends _Product__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A {
  constructor(section) {
    super(section, { useHistory: false });
  }
}


/***/ },

/***/ 2506
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2491);
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scriptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pixelunion_pxs_complementary_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5183);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5752);
/* harmony import */ var _components_RichText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9360);
/* harmony import */ var _components_ProductDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5834);








class Product {
  constructor(section, options = {}) {
    this.section = section;
    this.sectionId = section.id;
    this.el = this.section.el;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.section.el);
    this.context = section.data.context;
    this.settings = section.data.settings;
    this.product = section.data.product;
    this.productRecommendationLimit = section.data.product_recommendation_limit;
    this.richText = null;
    this.readmoreText = null;
    this.reviewForm = null;

    // History
    this.isThemeEditor = window.Shopify && window.Shopify.designMode;
    this.useHistory = 'useHistory' in options
      ? options.useHistory
      : !!(!this.isThemeEditor && history.replaceState);

    // Complementary products
    const complementaryProductsEl = this.el.querySelector('[data-complementary-products]');

    if (complementaryProductsEl) {
      this.complementaryProducts = new _pixelunion_pxs_complementary_products__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A({
        sectionEl: this.el,
        sectionId: this.sectionId,
        productId: this.product.id,
        productRecommendationsRoute: window.Theme.routes.product_recommendations_url,
        includeIndicatorDots: true,
        limit: this.productRecommendationLimit,
        arrowShape: 'M 65.29,11.99 L 27.28,50 L 65.3,87.99 L 70.25,83.06 L 37.19,50 L 70.26,16.94 L 65.29,11.99 Z',
      });
    }

    const gallery = this.$el.find('[data-product-gallery]')[0];
    const productWrapper = this.$el.find('[data-product-wrapper]');

    // Product details
    this.$details = this.$el.find('[data-product-details]');

    // Product description
    this.$description = this.$el.find('[data-product-description]');
    this.$readmore = this.$el.find('[data-product-readmore]');

    // Product form containers
    this.$formRegular = this.$el.find('[data-product-form-regular]');
    this.$formAlt = this.$el.find('[data-product-form-alt]');

    // Product form area
    this.$formArea = this.$el.find('[data-product-form-area]');

    // Move product form and information on breakpoint change
    this.layoutHandler = this.onBreakpointChange.bind(this);
    _Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.onBreakpointChange(this.layoutHandler);

    if (productWrapper.hasClass('product__container--three-columns')) {
      this._moveForm();
    }

    if (this.$description.length) {
      this.richText = new _components_RichText__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(this.$description);
    }

    if (this.$readmore.length) {
      this.readmoreText = new _components_RichText__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(this.$readmore);
    }

    // Instantiate ProductDetails after Shopify API is loaded
    scriptjs__WEBPACK_IMPORTED_MODULE_1___default()(jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scripts]').data('shopify-api-url'), () => {
      this.productDetails = new _components_ProductDetails__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({
        $formArea: this.$formArea,
        $details: this.$details,
        gallery,
        context: this.context,
        settings: this.settings,
        product: this.product,
        useHistory: this.useHistory,
        sectionId: section.id,
        productEl: this.$el[0],
      });
    });
  }

  onSectionUnload() {
    _Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.offBreakpointChange(this.layoutHandler);

    if (this.productDetails) {
      this.productDetails.unload();
    }

    if (this.richText) {
      this.richText.unload();
    }

    if (this.readmoreText) {
      this.readmoreText.unload();
    }

    if (this.reviewForm) {
      this.reviewForm.unload();
    }
  }

  onBreakpointChange() {
    if (this.$formAlt.length) {
      this._moveForm();
    }
  }

  /**
   * Move product form if is a three column layout
   * @private
   */
  _moveForm() {
    if (_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.isGreaterThanBreakpoint('M')) {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(this.$formAlt[0], this.$formArea[0])) {
        const $form = this.$formArea.detach();
        this.$formAlt.append($form);
      }
    } else if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(this.$formRegular[0], this.$formArea[0])) {
      const $form = this.$formArea.detach();
      this.$formRegular.append($form);
    }
  }
}


/***/ }

}]);