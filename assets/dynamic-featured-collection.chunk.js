"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8986],{

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

/***/ 8218
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicFeaturedCollection)
/* harmony export */ });
/* harmony import */ var _components_FeaturedCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7551);


class DynamicFeaturedCollection {
  constructor(section) {
    const collectionEl = section.el.querySelector('[data-featured-collection]');
    this.featuredCollection = new _components_FeaturedCollection__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A({ el: collectionEl, sectionId: section.id });
  }

  onSectionUnload() {
    this.featuredCollection.unload();
  }
}


/***/ }

}]);