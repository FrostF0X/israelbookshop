"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8108],{

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

/***/ 4670
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StaticProductRecommendations)
});

// EXTERNAL MODULE: ./node_modules/@pixelunion/rimg-shopify/dist/index.es.js
var index_es = __webpack_require__(1112);
// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-asyncview/dist/index.es.js
var dist_index_es = __webpack_require__(558);
// EXTERNAL MODULE: ./source/scripts/Layout.js
var Layout = __webpack_require__(5752);
// EXTERNAL MODULE: ./source/scripts/components/ProductGridItem.js + 2 modules
var ProductGridItem = __webpack_require__(9441);
// EXTERNAL MODULE: ./node_modules/just-debounce/index.js
var just_debounce = __webpack_require__(6945);
var just_debounce_default = /*#__PURE__*/__webpack_require__.n(just_debounce);
// EXTERNAL MODULE: ./node_modules/flickity/js/index.js
var js = __webpack_require__(2522);
var js_default = /*#__PURE__*/__webpack_require__.n(js);
// EXTERNAL MODULE: ./source/scripts/helpers/FlickityA11yPatch.js
var FlickityA11yPatch = __webpack_require__(2471);
;// ./source/scripts/components/ProductRowScroller.js





class ProductRowScroller {
  constructor(productRow) {
    this.$window = $(window);
    this.flickity = null;
    this.productRow = productRow;
    this.$productRow = $(this.productRow);

    // Activate flickity on mobile
    this._mobileSlider = this._mobileSlider.bind(this);
    Layout/* default */.A.onBreakpointChange(this._mobileSlider);
    this._mobileSlider();

    this.flickityA11yPatch = new FlickityA11yPatch/* default */.A(this.productRow);
  }

  unload() {
    Layout/* default */.A.offBreakpointChange(this._mobileSlider);
    this._destroyFlickity();
  }

  _initFlickity() {
    this.flickity = new (js_default())(this.productRow, {
      cellSelector: '.productgrid--item',
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

    this.$window.off('.product-row');
    this.$productRow.off('.product-row');

    this.flickity.destroy();

    if (this.flickityA11yPatch) {
      this.flickityA11yPatch.unload();
    }

    this.flickity = null;
  }

  _mobileSlider() {
    // If is Large layout, attempt to destroy flickity
    if (Layout/* default */.A.isGreaterThanBreakpoint('M')) {
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
    const $slider = this.$productRow.find('.flickity-slider');

    this.$window.on('resize.product-row', just_debounce_default()(() => {
      this.$productRow.trigger('heightUpdate.product-row');
    }));

    this.flickity.on('cellSelect', () => {
      this.$productRow.trigger('heightUpdate.product-row');
    });

    this.$productRow.on('heightUpdate.product-row', () => {
      if (!this.flickity) {
        return;
      }

      $slider.height(Math.ceil(this.flickity.maxCellHeight));
    });

    // Sets the Slider to the height of the first slide
    this.$productRow.trigger('heightUpdate.product-row');
  }
}

// EXTERNAL MODULE: ./source/scripts/helpers/ProductReviews.js
var ProductReviews = __webpack_require__(4232);
;// ./source/scripts/sections/StaticProductRecommendations.js
 // eslint-disable-line






class StaticProductRecommendations {
  constructor(section) {
    this.section = section;
    this.productId = section.data.productId;
    this.limit = section.data.settings.limit;
    this.recommendedProducts = [];
    this.productsScroller = null;
    this.sectionId = section.data.sectionId;

    this.recommendationContainer = document.querySelector('[data-product-recommendations]');

    this.recommendUrl = `${window.Theme.routes.product_recommendations_url}?section_id=${this.sectionId}&limit=${this.limit}&product_id=${this.productId}`;

    this._loadRecommendations = this._loadRecommendations.bind(this);
    this._resizeRowScroller = this._resizeRowScroller.bind(this);

    this._loadRecommendations();
  }

  _loadRecommendations() {
    dist_index_es/* default */.A.load(
      this.recommendUrl,
      { view: '' },
    ).then(({ html }) => {
      this.recommendationContainer.innerHTML = html;

      index_es/* default */.A.watch(this.recommendationContainer);

      const productItems = this.recommendationContainer.querySelectorAll('[data-product-item]');

      const productItemLazyLoad = Layout/* default */.A.isGreaterThanBreakpoint('L', true);

      if (productItems.length) {
        productItems.forEach(productItem => {
          this.recommendedProducts.push(new ProductGridItem/* default */.A({
            el: productItem,
            id: this.section.id,
            lazy: productItemLazyLoad,
          }));
        });

        (0,ProductReviews/* initShopifyProductReviews */.Z)();

        if (window.Shopify && Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }

        this.recommendationContainer.addEventListener('rimg:load', this._resizeRowScroller);
        this.productsScroller = new ProductRowScroller(this.section.el.querySelector('[data-product-row]'));
      }
    });
  }

  _resizeRowScroller() {
    if (this.productsScroller && this.productsScroller.flickity) {
      this.productsScroller.flickity.resize();
    }
  }

  onSectionUnload() {
    if (this.productsScroller) {
      this.productsScroller.unload();
    }

    this.recommendedProducts.forEach(productItem => {
      productItem.unload();
    });

    this.recommendationContainer.removeEventListener('rimg:load', this._resizeRowScroller);
  }
}


/***/ }

}]);