"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[9729],{

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

/***/ 5835
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DynamicShoppableImage)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(4692);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
;// ./node_modules/@pixelunion/pxs-shoppable-image/dist/index.es.js

/*!
 * @pixelunion/pxs-shoppable-image v1.0.2
 * (c) 2024 Pixel Union
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var EventHandler_1 = createCommonjsModule(function (module, exports) {
exports.__esModule = true;
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.events = [];
    }
    EventHandler.prototype.register = function (el, event, listener) {
        if (!el || !event || !listener)
            return null;
        this.events.push({ el: el, event: event, listener: listener });
        el.addEventListener(event, listener);
        return { el: el, event: event, listener: listener };
    };
    EventHandler.prototype.unregister = function (_a) {
        var el = _a.el, event = _a.event, listener = _a.listener;
        if (!el || !event || !listener)
            return null;
        this.events = this.events.filter(function (e) { return el !== e.el
            || event !== e.event || listener !== e.listener; });
        el.removeEventListener(event, listener);
        return { el: el, event: event, listener: listener };
    };
    EventHandler.prototype.unregisterAll = function () {
        this.events.forEach(function (_a) {
            var el = _a.el, event = _a.event, listener = _a.listener;
            return el.removeEventListener(event, listener);
        });
        this.events = [];
    };
    return EventHandler;
}());
exports["default"] = EventHandler;
});

var EventHandler = unwrapExports(EventHandler_1);

var ShoppableImage = /*#__PURE__*/function () {
  function ShoppableImage(section) {
    _classCallCheck(this, ShoppableImage);

    this.el = section.el;
    this.bounds = this.el.getBoundingClientRect();
    this.imageWrapper = this.el.querySelector('[data-shoppable-image-wrapper]');
    this.image = this.el.querySelector('[data-shoppable-image-img]');
    this.points = this.el.querySelectorAll('[data-hotspot]');
    this.tooltips = this.el.querySelectorAll('[data-tooltip-wrapper]');
    this.activeClass = 'shoppable-image__hotspot--active';
    this.events = new EventHandler();
    this.window = window;
    this.hoverTimer = null;
    this.tooltipDelay = 300;
    this.windowScrollTimer = null;
    this.windowScrollEvent = null;

    this._bindEvents();
  }

  _createClass(ShoppableImage, [{
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this = this;

      this._positionElements();

      if (this.image) {
        this.events.register(this.image, 'rimg:load', function (e) {
          return _this._positionElements();
        });
      }

      this.events.register(this.el, 'touchend', function () {
        return _this._clearAllActive();
      });

      for (var i = 0; i < this.points.length; i++) {
        var point = this.points[i];
        var tooltip = this.tooltips[i];
        this.events.register(point, 'click', function (e) {
          return _this._setActivePoint(e);
        });
        this.events.register(point, 'touchend', function (e) {
          return _this._setActivePoint(e);
        });
        this.events.register(point, 'mouseover', function (e) {
          return _this._setActivePoint(e);
        });
        this.events.register(point, 'mouseout', function (e) {
          return _this._closeActivePoint(e);
        });
        this.events.register(point, 'focus', function (e) {
          return _this._setActivePoint(e);
        });
        this.events.register(tooltip, 'touchend', function (e) {
          return e.stopPropagation();
        });
        this.events.register(tooltip, 'mouseover', function (e) {
          return _this._setActivePoint(e);
        });
        this.events.register(tooltip, 'mouseout', function (e) {
          return _this._closeActivePoint(e);
        });
        this.events.register(tooltip, 'focus', function (e) {
          return e.stopPropagation();
        });
      }
    }
  }, {
    key: "_positionElements",
    value: function _positionElements() {
      this.positionHotspots();
      this.positionTooltips();
    }
  }, {
    key: "_setActivePoint",
    value: function _setActivePoint(e) {
      e.stopPropagation();
      var target = e.currentTarget;
      var point = null; // We can reset the timer if we've re-entered the tooltip or the hotspot node

      if (this.hoverTimer !== null) {
        clearTimeout(this.hoverTimer);
        this.hoverTimer = null;
      }

      point = target.closest('[data-hotspot]');

      if (e.type === 'touchend' && point.classList.contains(this.activeClass)) {
        point.classList.remove(this.activeClass);
        return;
      }

      if (e.type === 'click' && point.classList.contains(this.activeClass)) {
        return;
      }

      if (!point.classList.contains(this.activeClass)) {
        var activeTooltip = this.el.querySelector(".".concat(this.activeClass));

        if (activeTooltip) {
          activeTooltip.classList.remove(this.activeClass);
        } // Reposition the tooltip in case the user has scrolled or otherwise changed
        // conditions


        this.positionTooltips();
        point.classList.add(this.activeClass);
      }
    }
  }, {
    key: "_closeActivePoint",
    value: function _closeActivePoint(e) {
      var _this2 = this;

      var target = e.currentTarget;
      var point = null;
      point = target.closest('[data-hotspot]'); // We can clear the timer because we'll be setting a new one

      if (this.hoverTimer !== null) {
        clearTimeout(this.hoverTimer);
      } // Set a timer so we don't instantly close the tooltip on each mouse event
      // We can clear this timer if the mouse re-enters the hotspot node or the tooltip node
      // so that it doesn't close right away


      this.hoverTimer = setTimeout(function () {
        point.classList.remove(_this2.activeClass);
      }, this.tooltipDelay);
    }
  }, {
    key: "_clearAllActive",
    value: function _clearAllActive() {
      var activeTooltip = this.el.querySelector(".".concat(this.activeClass));

      if (activeTooltip) {
        activeTooltip.classList.remove(this.activeClass);
      }
    }
  }, {
    key: "_resetTooltips",
    value: function _resetTooltips() {
      this.tooltips.forEach(function (tooltip) {
        tooltip.classList.remove('tooltip--overflow-top');
        tooltip.classList.remove('tooltip--overflow-right');
        tooltip.classList.remove('tooltip--overflow-bottom');
        tooltip.classList.remove('tooltip--overflow-left');
        tooltip.style.top = null;
        tooltip.style.right = null;
        tooltip.style.bottom = null;
        tooltip.style.left = null;
      });
    }
  }, {
    key: "positionHotspots",
    value: function positionHotspots() {
      var _this3 = this;

      //  Reposition points which overflow the bounds of the image
      this.points.forEach(function (point) {
        var ySetting = parseInt(point.dataset.hotspotYAxis, 10);
        var xSetting = parseInt(point.dataset.hotspotXAxis, 10);
        var pointBounds = point.getBoundingClientRect();

        var imageBounds = _this3.imageWrapper.getBoundingClientRect();

        var yDifference = imageBounds.height - pointBounds.height;
        var yPercentage = yDifference / imageBounds.height * ySetting;
        point.style.bottom = "".concat(yPercentage, "%");
        var xDifference = imageBounds.width - pointBounds.width;
        var xPercentage = xDifference / imageBounds.width * xSetting;
        point.style.left = "".concat(xPercentage, "%");
        point.style.visibility = 'visible';
      });
    }
  }, {
    key: "positionTooltips",
    value: function positionTooltips() {
      var _this4 = this;

      // Reposition any tooltips that are overflowing the viewport
      // We update this each time the tooltip opens, so we also
      // need to unset any 'overflow' classes or styles if conditions
      // have changed
      this._resetTooltips();

      var imageWrapperRightBound = this.imageWrapper.getBoundingClientRect().right;
      this.tooltips.forEach(function (tooltip) {
        var elementBounds = tooltip.getBoundingClientRect();
        var style = window.getComputedStyle ? getComputedStyle(tooltip, null) : tooltip.currentStyle;
        var marginTop = parseInt(style.marginTop, 10) || 0;
        var marginRight = parseInt(style.marginRight, 10) || 0;
        var marginBottom = parseInt(style.marginBottom, 10) || 0;
        var marginLeft = parseInt(style.marginLeft, 10) || 0;
        var topBounds = elementBounds.top - marginTop;
        var rightBounds = elementBounds.right + marginRight;
        var bottomBounds = elementBounds.bottom + marginBottom;
        var leftBounds = elementBounds.left - marginLeft;

        if (rightBounds >= imageWrapperRightBound) {
          tooltip.classList.add('tooltip--overflow-right');
          var difference = imageWrapperRightBound - rightBounds;
          tooltip.style.left = "".concat(difference, "px");
        }

        if (leftBounds <= 0) {
          tooltip.classList.add('tooltip--overflow-left');

          var _difference = Math.abs(leftBounds);

          tooltip.style.left = "".concat(_difference, "px");
        }

        if (topBounds <= 0) {
          // This should never happen because tooltips are always below
          // the hotspot node, but in case there's a theme-specific case where
          // this can happen, we'll add a class if it overflows the top of the
          // viewport
          tooltip.classList.add('tooltip--overflow-top');
        }

        if (bottomBounds >= _this4.window.innerHeight) {
          tooltip.classList.add('tooltip--overflow-bottom');

          var _difference2 = _this4.window.innerHeight - bottomBounds;

          tooltip.style.top = "".concat(_difference2, "px");
        }
      });
    }
  }, {
    key: "onSectionBlockSelect",
    value: function onSectionBlockSelect(block) {
      var _this5 = this;

      this._clearAllActive();

      var scrollEvent = false;
      this.windowScrollEvent = this.events.register(this.window, 'scroll', function () {
        scrollEvent = true;

        if (_this5.windowScrollTimer !== null) {
          clearTimeout(_this5.windowScrollTimer);
        }

        _this5.windowScrollTimer = setTimeout(function () {
          _this5.positionTooltips();

          block.el.classList.add(_this5.activeClass);
          _this5.windowScrollTimer = null;
        }, 200);
      });

      if (scrollEvent === false) {
        this.positionTooltips();
        block.el.classList.add(this.activeClass);
      }
    }
  }, {
    key: "onSectionBlockDeselect",
    value: function onSectionBlockDeselect(block) {
      this.events.unregister(this.windowScrollEvent);
      this.windowScrollEvent = null;
      block.el.classList.remove(this.activeClass);
    }
  }, {
    key: "onSectionUnload",
    value: function onSectionUnload() {
      this.events.unregisterAll();
    }
  }]);

  return ShoppableImage;
}();

/* harmony default export */ const index_es = (ShoppableImage);

// EXTERNAL MODULE: ./source/scripts/components/ProductQuickshop.js
var ProductQuickshop = __webpack_require__(9383);
// EXTERNAL MODULE: ./source/scripts/components/Modal.js
var Modal = __webpack_require__(4604);
;// ./source/scripts/sections/DynamicShoppableImage.js





class DynamicShoppableImage extends index_es {
  constructor(section) {
    super(section);
    this.modalSelector = `[data-hotspot-modal-id='${section.id}']`;
    this.modalEl = document.querySelector(this.modalSelector);
    this.modalWrapper = document.querySelector(`[data-hotspot-section-id='${section.id}']`);
    this.quickShopSelector = `[data-hotspot-section-id='${section.id}'] [data-hotspot-modal-quickshop]`;
    this.quickshopSpinner = this.modalEl.querySelector(this.quickShopSelector).innerHTML;
    this.isOpen = false;
    this.modalSidebar = this.modalWrapper.querySelector('[data-hotspot-modal-sidebar]');
    this.modalSidebarItems = this.modalWrapper.querySelectorAll('[data-hotspot-modal-sidebar-item]');
    this.sidebarArrow = this.modalEl.querySelector('[data-sidebar-arrow]');
    this.sidebarItemActiveClass = 'active-item';
    this.qsTrigger = null;
    this.modal = new Modal/* default */.A({
      onClose: () => this.unload(),
    });

    this.points.forEach(point => {
      this.events.register(point, 'animationend', e => {
        if (e.animationName === 'slide-fade-y' && e.elapsedTime > 0) {
          point.classList.add('shoppable-image__hotspot--pulse');
          point.classList.remove('pxu-lia-element');
          point.style.animationPlayState = '';
        }
      });
    });

    this.tooltips.forEach(tooltip => {
      this.events.register(tooltip, 'click', e => this.onTooltipClick(e));
    });

    this.modalSidebarItems.forEach(item => {
      this.events.register(item, 'click', e => this.onSidebarItemClick(e));
    });
  }

  onTooltipClick(event) {
    event.preventDefault();
    const productUrl = event.currentTarget.querySelector('[data-tooltip]').getAttribute('href');
    const productId = event.currentTarget.closest('[data-hotspot]').dataset.hotspotProduct;

    this.points.forEach(point => {
      if (point.dataset.hotspotProduct === productId) {
        this.qsTrigger = point;
      }
    });

    if (productUrl === '#') { return; }

    this.modal.open(this.modalSelector, 'quickshop-full hotspot__modal');

    const selectedItem = this.modalWrapper.querySelector(`[data-product-id='${productId}']`);
    selectedItem.classList.add(this.sidebarItemActiveClass);

    this.positionSidebarArrow(selectedItem);

    this.isOpen = true;

    this._fetchQuickshop(productId, productUrl);
  }

  onSidebarItemClick(event) {
    event.preventDefault();
    const currentSidebarItem = event.currentTarget;
    const productUrl = currentSidebarItem.dataset.productQuickshopUrl;
    const productId = currentSidebarItem.dataset.productId;
    const activeSidebarItems = this.modalWrapper.querySelectorAll(`.${this.sidebarItemActiveClass}`);
    this.modalWrapper.querySelector('[data-hotspot-modal-quickshop]').innerHTML = this.quickshopSpinner;

    this.positionSidebarArrow(currentSidebarItem);

    activeSidebarItems.forEach(item => {
      item.classList.remove(this.sidebarItemActiveClass);
    });

    currentSidebarItem.classList.add(this.sidebarItemActiveClass);

    if (productUrl && productId) {
      this._fetchQuickshop(productId, productUrl);
    }
  }

  positionSidebarArrow(selectedItem) {
    const itemImg = selectedItem.querySelector('[data-modal-sidebar-image]');
    const imgBounds = itemImg.getBoundingClientRect();
    const selectedItemTop = selectedItem.offsetTop;
    const middlePoint = selectedItemTop + (imgBounds.height / 2);
    this.sidebarArrow.style.top = `${middlePoint}px`;
  }

  _fetchQuickshop(productId, productUrl) {
    const quickshopContainer = this.modal.$modalInner[0].querySelector('[data-hotspot-modal-quickshop]');
    const $quickshopEl = this.modal.$modalInner.find('[data-hotspot-modal-sidebar-item]');
    const spinnerContainer = this.modalWrapper.querySelector('.productitem-quickshop');
    if (spinnerContainer) {
      spinnerContainer.style.display = 'block';
    }

    this.productQuickshop = new ProductQuickshop/* default */.A({
      $el: $quickshopEl,
      id: this.sectionId,
      modal: this.modal,
      sectionContext: 'shoppable-image',
      trigger: jquery_default()(this.qsTrigger),
      quickshopContainer,
      quickShopSelector: this.quickShopSelector,
      productUrl,
      view: 'product-shoppable-img-qs',
    });
  }

  unload() {
    if (this.productQuickshop) {
      this.productQuickshop.unload();
    }

    const activeSidebarItems = this.modalWrapper.querySelectorAll(`.${this.sidebarItemActiveClass}`);

    activeSidebarItems.forEach(item => {
      item.classList.remove(this.sidebarItemActiveClass);
    });
  }
}


/***/ }

}]);