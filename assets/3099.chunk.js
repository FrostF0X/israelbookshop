"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[3099],{

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

/***/ 8874
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ AddToCartFlyout)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(4692);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/@shopify/theme-a11y/theme-a11y.js
var theme_a11y = __webpack_require__(5722);
// EXTERNAL MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
var animations_es = __webpack_require__(7652);
// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(1561);
// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-asyncview/dist/index.es.js
var index_es = __webpack_require__(558);
// EXTERNAL MODULE: ./source/scripts/components/MessageBanner.js
var MessageBanner = __webpack_require__(6028);
;// ./source/scripts/helpers/Images.js
class Images {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */
  preload(images, size) {
    let imageArray = images;
    if (typeof images === 'string') {
      imageArray = [images];
    }

    for (let i = 0; i < imageArray.length; i++) {
      this.loadImage(this.getSizedImageUrl(imageArray[i], size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   *
   * @param {string} path - An image url
   */
  loadImage(path) {
    const image = new Image();
    image.src = path;
    return image;
  }

  /**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  getSizedImageUrl(src = null, size) {
    if (!size) {
      return null;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    const match = src.match(/\.(jpg|jpeg|gif|png|webp|avif|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match) {
      const prefix = src.split(match[0]);
      const suffix = match[0];

      return this.removeProtocol(`${prefix[0]}_${size}${suffix}`);
    }

    console.warn(`No ${size} found for '${src}`);
    return null;
  }

  removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }
}

// EXTERNAL MODULE: ./source/scripts/helpers/Ripple.js + 9 modules
var Ripple = __webpack_require__(1126);
;// ./source/scripts/components/AddToCartFlyout.js









class AddToCartFlyout {
  constructor(formData, options, callbacks = {}) {
    this.formData = formData;
    this.settings = {
      moneyFormat: null,
      cartRedirection: false,
      ...options.settings,
    };

    this.atcButton = options.atcButton;

    this.header = document.querySelector('[data-site-header]');
    this.announcementBar = document.querySelector('[data-announcement-bar]');
    this.utilityBar = document.querySelector('[data-utility-bar]');
    this.flyOutSelector = '[data-atc-banner]';
    this.atcTemplate = document.querySelector(`[data-templates] ${this.flyOutSelector}`);
    this.recipientForm = document.querySelector('[data-recipient-form]');

    this.activeElement = document.activeElement;
    this.itemId = null;
    this.flyOut = null;

    this._onInit = this._onInit.bind(this);
    this._onError = this._onError.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._onCloseAll = this._onCloseAll.bind(this);

    // Allows ATC Flow to be overridden
    this.callbacks = {
      onInit: this._onInit,
      onError: this._onError,
      onSuccess: this._onSuccess,
      onClose: this._onCloseAll,
      ...callbacks,
    };

    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._closeFlyOut = this._closeFlyOut.bind(this);
    this._closeEsc = this._closeEsc.bind(this);

    this.events = new EventHandler/* default */.A();

    this.Images = new Images();
    this.messageBanner = null;

    this.callbacks.onInit();

    this._disableAtcButton();
    this._updateCart();
  }

  unload() {
    if (this.messageBanner) {
      this.messageBanner.unload();
    }
    this._closeFlyOut();
  }

  _updateCart() {
    const flyOut = this.atcTemplate.cloneNode(true);
    const quantityField = this.formData.filter(data => data.name === 'quantity');
    const quantity = quantityField[0].value;

    jquery_default().ajax({
      type: 'POST',
      url: `${window.Theme.routes.cart_add_url}.js`,
      data: jquery_default().param(this.formData),
      dataType: 'json',
    })
      .done(response => {
        this.itemId = response.id;

        if (response.image) {
          const imageUrl = this.Images.getSizedImageUrl(response.image, '200x');
          this.Images.loadImage(imageUrl);

          const productImage = flyOut.querySelector('[data-atc-banner-product-image]');
          productImage.innerHTML = `<img src="${imageUrl}" alt="${response.product_title}">`;
        }

        const productTitle = flyOut.querySelector('[data-atc-banner-product-title]');
        productTitle.innerHTML = response.product_title;

        /*
          TODO: Bring in `variant.options`, iterate through to get option
            name for: <strong>Option name:</strong> Option
        */
        if (response.variant_options[0] !== 'Title' && response.variant_options[0] !== 'Default Title') {
          const productOptions = flyOut.querySelector('[data-atc-banner-product-options]');
          productOptions.innerHTML = response.variant_options.join(', ');
        }

        if (response.selling_plan_allocation) {
          const productSubscriptionTitle = flyOut.querySelector('[data-atc-banner-product-subscription-title]');
          productSubscriptionTitle.innerHTML = response.selling_plan_allocation.selling_plan.name;
        }

        /*
          TODO: Bring in variant, and use that to check compare_at_price
            to see if the item is on sale
        */
        const productPriceQuantity = flyOut.querySelector('[data-atc-banner-product-price-quantity]');
        productPriceQuantity.innerHTML = `${quantity} × `;

        // Update Free shipping bar contents
        const freeShippingBar = flyOut.querySelector('[data-free-shipping-bar]');

        if (freeShippingBar) {
          index_es/* default */.A.load(
            window.Theme.routes.cart_url,
            'static-cart',
          )
            .then(({ html }) => {
              freeShippingBar.innerHTML = html.free_shipping_bar;
            })
            .catch(() => {
              console.error('Error loading content.');
            });
        }

        jquery_default().ajax({
          type: 'GET',
          url: `${window.Theme.routes.cart_url}.js`,
          dataType: 'json',
        })
          .done(secondResponse => {
            if (this.settings.cartRedirection || document.body.classList.contains('template-cart')) {
              location.href = window.Theme.routes.cart_url;
              return;
            }

            this.callbacks.onSuccess();

            // Reset formData in case instance is never cleared
            this.formData = {};

            let lineItem = null;
            secondResponse.items.forEach(item => {
              if (item.id === this.itemId) {
                if (!lineItem) {
                  lineItem = item;
                } else {
                  // If there are 2 lineItems with the same id, it means that there is
                  // likely a BOGO offer on the product. We need to grab the highest discounted
                  // price (BOGO will be 0) while also combining with the different discounts on
                  // the product in the discounts array.
                  lineItem.line_level_discount_allocations = lineItem
                    .line_level_discount_allocations.concat(item.line_level_discount_allocations);
                  lineItem.final_price = lineItem.final_price > item.final_price
                    ? lineItem.final_price
                    : item.final_price;
                  lineItem.quantity += item.quantity;
                }
              }
            });

            const productPriceValue = flyOut.querySelector('[data-atc-banner-product-price-value]');
            productPriceValue.innerHTML = Shopify.formatMoney(lineItem.original_price, this.settings.moneyFormat);

            const productPriceDiscounted = flyOut.querySelector('[data-atc-banner-product-price-discounted]');
            if (lineItem.final_price < lineItem.original_price) {
              productPriceDiscounted.innerHTML = Shopify.formatMoney(lineItem.final_price, this.settings.moneyFormat);

              productPriceDiscounted.classList.remove('hidden');
              productPriceValue.classList.add('original-price');
            } else {
              productPriceDiscounted.classList.add('hidden');
              productPriceValue.classList.remove('original-price');
            }

            const productDiscounts = flyOut.querySelector('[data-atc-banner-product-discounts]');

            // Price Per Unit
            const unitPrice = flyOut.querySelector('[data-atc-banner-unit-price]');
            let unitPriceString = unitPrice.innerHTML;

            if (unitPrice && lineItem.unit_price_measurement) {
              unitPriceString = unitPriceString.replace(
                '** total_quantity **',
                `${lineItem.unit_price_measurement.quantity_value}${lineItem.unit_price_measurement.quantity_unit}`,
              );

              unitPriceString = unitPriceString.replace(
                '** unit_price **',
                Shopify.formatMoney(lineItem.unit_price, this.settings.moneyFormat),
              );
              if (lineItem.unit_price_measurement.reference_value === 1) {
                unitPriceString = unitPriceString.replace('** unit_measure **', lineItem.unit_price_measurement.reference_unit);
              } else {
                unitPriceString = unitPriceString.replace(
                  '** unit_measure **',
                  `${lineItem.unit_price_measurement.reference_value}${lineItem.unit_price_measurement.reference_unit}`,
                );
              }
              unitPrice.innerHTML = unitPriceString;
              unitPrice.classList.remove('hidden');
            }

            if (lineItem.line_level_discount_allocations.length > 0) {
              const discountItemTemplate = productDiscounts.firstElementChild.cloneNode(true);
              productDiscounts.innerHTML = '';

              lineItem.line_level_discount_allocations.forEach(discount => {
                const listItem = discountItemTemplate.cloneNode(true);
                const title = listItem.querySelector('.discount-title');
                const amount = listItem.querySelector('.discount-amount');

                title.innerHTML = discount.discount_application.title;
                amount.innerHTML = Shopify.formatMoney(discount.amount, this.settings.moneyFormat);
                productDiscounts.appendChild(listItem);
              });

              productDiscounts.classList.remove('hidden');
            } else {
              productDiscounts.classList.add('hidden');
            }

            const subTotal = flyOut.querySelector('[data-atc-banner-cart-subtotal]');
            subTotal.innerHTML = Shopify.formatMoney(secondResponse.total_price, this.settings.moneyFormat);

            const itemCount = flyOut.querySelector('[data-atc-banner-cart-button] span');
            itemCount.innerHTML = secondResponse.item_count;

            this.header.appendChild(flyOut);

            this.flyOut = flyOut;

            (0,Ripple/* setupRippleEffect */.b)(this.flyOut);

            // Notifiy Header of new cart count
            const countEvent = new CustomEvent('cartcount:update', { detail: secondResponse });
            window.dispatchEvent(countEvent);

            /*
            If user has initiated a new ATC Flow before the first has finished,
            the first FlyOut could have opened after the first attempt to close open flyouts so
            we need to send out an event to close any open flyouts.
            */
            document.dispatchEvent(new Event('closeFlyouts'));

            const closeButton = flyOut.querySelector('[data-atc-banner-close]');

            this.events.register(closeButton, 'click', e => this._closeFlyOut(e));
            this.events.register(document, 'click', e => this._handleDocumentClick(e));
            this.events.register(document, 'touchstart', e => this._handleDocumentClick(e));
            this.events.register(document, 'closeFlyouts', e => this._closeFlyOut(e));
            this.events.register(window, 'keydown', e => this._closeEsc(e));

            this._enableAtcButton();

            this.atcAnimation = (0,animations_es/* transition */.kY)({ el: this.flyOut, state: 'closed' });
            this.atcAnimation.animateTo('open').then(() => {
              (0,theme_a11y/* trapFocus */.oM)(this.flyOut);
            });
          });
      })
      .fail(response => {
        let errorText;
        try {
          const responseText = JSON.parse(response.responseText);
          errorText = responseText.description;
        } catch (error) {
          errorText = `${response.status} ${response.statusText}`;
          if (response.status === 401) {
            errorText = `${errorText}. Try refreshing and logging in.`;
          }
        }

        this._enableAtcButton();

        if (errorText.email) {
          this.recipientForm.classList.add('recipient-form--has-errors');
        } else {
          this.callbacks.onError(errorText);
        }
      });
  }

  _onError(error) {
    this.messageBanner = new MessageBanner/* default */.A(error, 'error');
  }

  _onInit() {
    if (this.messageBanner) {
      this.messageBanner.unload();
    }

    if (this.announcementBar) {
      this.announcementBar.style.setProperty('--index-announcement-bar', '1100');
    }

    if (this.utilityBar) {
      this.utilityBar.style.setProperty('--index-utility-bar', '1100');
    }
  }

  _onSuccess() {
    /*
      By default, the ATC Flyout doesn't need any additional success callbacks

      The `this.callbacks.onSuccess` is used to allow other views to initiate
      behaviour when a product has been added to the cart
     */
  }

  _onCloseAll() {
    /*
      By default, the ATC Flyout doesn't need any additional close callbacks

      The `this.callbacks.onClose` is used to allow other views to initiate
      behaviour when the atc banner has been closed
     */
  }

  _closeEsc(e) {
    if (e.key === 'Escape') {
      this._closeFlyOut(e);
    }
  }

  /**
   * Close an open FlyOut
   *
   * @private
   */
  _closeFlyOut() {
    if (!this.flyOut) {
      return;
    }

    (0,theme_a11y/* removeTrapFocus */.qF)(this.flyOut);

    // if the user clicked onto the search box, move focus
    // to the search instead of going to the previous active element.
    if (this.documentClickEventTarget && 'liveSearchInput' in this.documentClickEventTarget.dataset) {
      this.documentClickEventTarget.focus();
    } else if (this.activeElement) {
      this.activeElement.focus();
    }

    this.atcAnimation.animateTo('closed').then(() => {
      if (this.announcementBar) {
        this.announcementBar.style.setProperty('--index-announcement-bar', '');
      }

      if (this.utilityBar) {
        this.utilityBar.style.setProperty('--index-utility-bar', '');
      }

      this.callbacks.onClose();
      this.flyOut.remove();
      this.flyOut = null;

      this.events.unregisterAll();
      this.atcAnimation.unload();
      delete this.Images;
    });
  }

  _disableAtcButton() {
    this.atcButton.classList.add('processing');
    this.atcButton.setAttribute('disabled', 'disabled');
  }

  _enableAtcButton() {
    this.atcButton.removeAttribute('disabled');
    this.atcButton.classList.remove('processing');
  }

  _handleDocumentClick(e) {
    const { target } = e;
    const $parent = jquery_default()(target).parents('[data-atc-banner]');

    if ($parent.length) {
      return;
    }

    this.documentClickEventTarget = target;
    this._closeFlyOut(e);
  }
}


/***/ },

/***/ 6028
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MessageBanner)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7652);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1561);





class MessageBanner {
  constructor(message, type) {
    const bannerTemplate = document.querySelector('[data-templates] [data-message-banner]');
    this.banner = bannerTemplate.cloneNode(true);

    const messageElement = this.banner.querySelector('[data-message-banner-content]');
    messageElement.innerHTML = message;

    this.banner.classList.add(`message--${type}`);

    const modal = document.querySelector('.modal-loaded .modal-inner');
    const target = modal || document.querySelector('[data-site-header]');

    target.appendChild(this.banner);

    this.closeButton = this.banner.querySelector('[data-message-banner-close]');

    this.bannerAnimation = (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_1__/* .transition */ .kY)({ el: this.banner, state: 'closed' });
    this.bannerAnimation.animateTo('open');

    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();

    this.events.register(this.closeButton, 'click', () => this._close());
    this.events.register(document, 'click', e => this._handleDocumentClick(e.target));
    this.events.register(document, 'touchStart', e => this._handleDocumentClick(e.target));
    this.events.register(window, 'keydown', e => this._closeEsc(e));
  }

  unload() {
    if (this.banner) {
      this._close();
    }
  }

  _closeEsc(e) {
    if (e.key === 'Escape') {
      this._close();
    }
  }

  _close() {
    this.bannerAnimation.animateTo('closed').then(() => {
      this.banner?.remove();
      this.banner = null;
      this.events.unregisterAll();
      this.bannerAnimation.unload();
    });
  }

  _handleDocumentClick(target) {
    const $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).parents('[data-message-banner]');
    if ($parent.length) return;

    this._close();
  }
}


/***/ },

/***/ 4604
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6945);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vanilla_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9009);
/* harmony import */ var vanilla_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vanilla_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5722);
/* harmony import */ var _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9534);







let openModals = [];

const unlockScrollLock = () => {
  if (openModals.length === 0) {
    _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.unlock();
  }
};

class Modal {
  constructor(options = {}) {
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);

    // Extend default vanilla-modal callbacks back to instantiator of Modal
    const defaultOptions = {
      onOpen: () => {},
      onClose: () => {},
      onBeforeOpen: () => {},
      onBeforeClose: () => {},
      modalId: null,
    };

    this.options = { ...defaultOptions, ...options };

    const modalSelector = this.options.modalId
      ? `[data-modal-container-${this.options.modalId}]`
      : '[data-modal-container]';

    const closeSelector = this.options.modalId
      ? `[data-modal-${this.options.modalId}-close`
      : '[data-modal-close]';

    this.loadedClass = this.options.modalId ? `modal-${this.options.modalId}-loaded` : 'modal-loaded';
    this.visibleClass = this.options.modalId ? `modal-${this.options.modalId}-visible` : 'modal-visible';

    this.modal = null;

    this.$modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalSelector);
    this.$modalInner = this.$modal.find('[data-modal-inner]');

    this.finishedLoading = this.finishedLoading.bind(this);

    this._onOpen = this._onOpen.bind(this);
    this._onBeforeOpen = this._onBeforeOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onBeforeClose = this._onBeforeClose.bind(this);
    this._closeEsc = this._closeEsc.bind(this);

    this.position = this.position.bind(this);

    this.modalOptions = {
      modal: modalSelector,
      loadClass: '',
      class: this.loadedClass,
      close: closeSelector,
      onOpen: this._onOpen,
      onClose: this._onClose,
      onBeforeOpen: this._onBeforeOpen,
      onBeforeClose: this._onBeforeClose,
      transitions: false,
      closeKeys: [], // Override default "close on esc" so we have control
    };
  }

  unload() {
    if (!this.modal) return;

    this.modal.destroy();

    openModals = openModals.filter(modal => modal !== this);
    unlockScrollLock();
  }

  /**
   * Open a modal with contents from selector
   *
   * @param selector
   * @param handle
   */
  open(selector, handle = 'general') {
    this._addModalClass(handle);
    this.modal = new (vanilla_modal__WEBPACK_IMPORTED_MODULE_2___default())(this.modalOptions);
    this.modal.open(selector);
    openModals.push(this);
    window.addEventListener('keydown', this._closeEsc);
  }

  close() {
    this.modal.close();
    window.removeEventListener('keydown', this._closeEsc);
  }

  finishedLoading() {
    (0,_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__/* .trapFocus */ .oM)(this.$modal[0]);
  }

  _closeEsc(e) {
    if (e.key === 'Escape' && openModals[openModals.length - 1] === this) {
      this.close();
    }
  }

  isOpen() {
    return this.modal && this.modal.isOpen;
  }

  /**
   * Update the vertical positioning of modal
   */
  position() {
    const windowHeight = window.innerHeight;

    const modalHeight = this.$modalInner.outerHeight();
    const modalPadding = parseInt(this.$modal.css('padding-top'), 10) * 2;

    const offset = (windowHeight - modalPadding - modalHeight) / 2;
    const marginTop = offset > 0 ? offset : 0;
    this.$modalInner.css({ marginTop });
  }

  /**
   * Add a class to the modal for individual styling
   * @param handle
   * @private
   */
  _addModalClass(handle) {
    this.$modal.addClass(`modal--${handle}`);
  }

  /**
   * Remove modal class based on the handle
   * @private
   */
  _removeModalClass() {
    const modalClass = this.$modal.attr('class').match(/modal--[\w-]*\b/);
    if (!modalClass) {
      return;
    }

    this.$modal.removeClass(modalClass[0]);
  }

  _onClose() {
    this._removeModalClass();
    this.$body.removeClass(this.visibleClass);

    this.$window.off('resize.modal');

    this.$modalInner.css({ marginTop: '' });

    this.options.onClose();

    (0,_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__/* .removeTrapFocus */ .qF)(this.$modal[0]);

    if (this.activeElement) {
      // Ensure focus is properly re-trapped in the case when modal was
      // opened from another modal
      const focusTrap = this.activeElement.closest('[data-trap-focus]');
      if (focusTrap) {
        (0,_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__/* .trapFocus */ .oM)(focusTrap);
      }

      this.activeElement.focus();
    }

    openModals = openModals.filter(modal => modal !== this);
    unlockScrollLock();
  }

  _onOpen() {
    this.activeElement = document.activeElement;
    this.position();
    _helpers_ScrollLock__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.lock(this.$modal[0]);
    this.$body.addClass(this.visibleClass);
    this.$window.on('resize.modal', just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(() => this.position(), 16, true, true));

    this.options.onOpen();

    (0,_shopify_theme_a11y__WEBPACK_IMPORTED_MODULE_3__/* .trapFocus */ .oM)(this.$modal[0]);
  }

  _onBeforeClose() {
    this.options.onBeforeClose();
  }

  _onBeforeOpen() {
    this.options.onBeforeOpen();
  }
}


/***/ },

/***/ 5834
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ ProductDetails)
});

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(4692);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-variants-ui/dist/index.es.js
var index_es = __webpack_require__(5652);
// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-surface-pick-up/dist/index.es.js
var dist_index_es = __webpack_require__(8148);
// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(1561);
// EXTERNAL MODULE: ./node_modules/@pixelunion/pxs-gift-card-recipient-form/dist/index.es.js
var pxs_gift_card_recipient_form_dist_index_es = __webpack_require__(6164);
// EXTERNAL MODULE: ./source/scripts/Forms.js
var Forms = __webpack_require__(6383);
// EXTERNAL MODULE: ./source/scripts/components/AddToCartFlyout.js + 1 modules
var AddToCartFlyout = __webpack_require__(8874);
// EXTERNAL MODULE: ./source/scripts/components/Modal.js
var Modal = __webpack_require__(4604);
// EXTERNAL MODULE: ./source/scripts/components/MessageBanner.js
var MessageBanner = __webpack_require__(6028);
;// ./source/scripts/helpers/PaymentTerms.js
class PaymentTerms {
  constructor(el) {
    this._el = el;
    this._reference = this._el.querySelector('[data-payment-terms-reference] shopify-payment-terms');
    this._target = this._el.querySelector('[data-payment-terms-target]');

    if (!this._reference || !this._target) return;

    this._input = document.createElement('input');
    this._input.name = 'id';
    this._input.type = 'hidden';

    this._target.appendChild(this._input);
    this._target.appendChild(this._reference);

    this._target.style.display = null;
  }

  update(variantId) {
    if (!this._reference || !this._target) return;
    this._input.value = variantId;
    this._input.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// EXTERNAL MODULE: ./source/scripts/helpers/QuantitySelector.js
var QuantitySelector = __webpack_require__(8044);
;// ./source/scripts/components/ProductDetails.js












class ProductDetails {
  constructor(options) {
    this.$window = jquery_default()(window);
    this.$formArea = options.$formArea;
    this.$details = options.$details;
    this.context = options.context;
    this.settings = options.settings;
    this.product = options.product;
    this.useHistory = options.useHistory;
    this.sectionId = options.sectionId;
    this.el = options.productEl;
    this.events = new EventHandler/* default */.A();
    this.url = window.location.search;
    this.urlParams = new URLSearchParams(this.url);
    this.paymentTerms = new PaymentTerms(this.el);
    this.variantSelection = this.el.querySelector('[data-variant-selection]');
    this.select_first_available_variant = this.settings.select_first_available_variant;
    this.recipientFormEl = this.el.querySelector('[data-recipient-form]');
    this.surfacePickUpEl = this.el.querySelector('[data-surface-pick-up]');
    this.requestFormEl = this.el.querySelector('[data-product-request-form]');
    this.gallery = options.gallery || this.el.querySelector('product-gallery');

    if (this.recipientFormEl) {
      this.recipientForm = new pxs_gift_card_recipient_form_dist_index_es/* default */.A(this.el);
    }

    if (this.surfacePickUpEl) {
      this.surfacePickUp = new dist_index_es/* default */.A(this.surfacePickUpEl);
    }
    if (Shopify.PaymentButton) {
      Shopify.PaymentButton.init();
    }

    if (this.requestFormEl) {
      this.requestFormSKU = this.requestFormEl.querySelector('[data-request-form-sku]');
      this.requestFormVariant = this.requestFormEl.querySelector('[data-request-form-variant]');
      this.requestFormVariantID = this.requestFormEl.querySelector('[data-request-form-variant-id]');

      new Forms/* default */.A(this.requestFormEl);

      // eslint-disable-next-line max-len
      if (!this.select_first_available_variant && this.requestFormVariant && this.requestFormVariantID) {
        this.requestFormVariant.removeAttribute('name');
        this.requestFormVariantID.removeAttribute('name');
      }

      this.events.register(this.requestFormEl, 'submit', () => {
        const message = this.requestFormEl.querySelector('[data-product-request-form-message]');

        if (message.value === '') {
          message.classList.add('form-field-filled');
          message.innerHTML = this.context.request_message_empty;
        }
      });

      this.events.register(window, 'load', () => {
        if (this.urlParams.get('contact_posted')) {
          this.requestFormEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    }

    if (!jquery_default()(this.$formArea).length) return;

    if (this.variantSelection) {
      this.isDefaultVariant = !!this.variantSelection.querySelector('[data-variants].variant-selection__variants--default');

      this.variantSelection.getVariant().then(variant => {
        if (this.surfacePickUp) {
          this.surfacePickUp.load(variant ? variant.id : null);
        }

        this._updateBadge(variant);
        this._updatePrice(variant);

        if (!variant) {
          this._showPriceRange();
          this._updateSKU();
        }

        this.events.register(
          this.variantSelection,
          'variant-change',
          event => this._switchVariant(
            event.detail,
          ),
        );
      });
    }

    this.modal = new Modal/* default */.A({
      onClose: () => this.modal.unload(),
      modalId: 1,
    });

    if (this.surfacePickUp) {
      this.surfacePickUp.onModalRequest(contents => {
        let container = this.$formArea[0].querySelector('[data-surface-pick-up-modal-contents]');

        this.variantSelection.getVariant().then(variant => {
          const variantTitle = !this.isDefaultVariant ? `<div class="surface-pick-up-modal__variant">${variant.title}</div>` : '';

          const modalContents = `
            <div class="surface-pick-up-modal__header">
              <h2 class="surface-pick-up-modal__title">${this.product.title}</h2>
              ${variantTitle}
            </div>
            ${contents}
            `;

          if (!container) {
            container = document.createElement('div');
            container.setAttribute('data-surface-pick-up-modal-contents', '');
            container.style.display = 'none';
            container.innerHTML = modalContents;
            this.$formArea[0].appendChild(container);
          } else {
            container.innerHTML = modalContents;
          }

          this.modal.open('[data-surface-pick-up-modal-contents]', 'surface-pick-up');
        });
      });
    }

    this.addToCartFlyout = null;

    this.atcCallbacks = options.atcCallbacks;

    // Form
    this.$form = this.$formArea.find('[data-product-form]');
    this.$productAtcButton = this.$formArea.find('[data-product-atc]');
    this.$productVariants = this.$form.find('[data-variants]');
    this.$productOptions = this.$form.find('[data-product-option]');
    this.productPricing = this.$details[0].querySelector('[data-product-pricing]');
    this.detailsLink = this.$formArea[0].querySelector('[data-product-details-link]');
    this.quantitySelector = this.el.querySelector('[data-quantity-selector]');

    if (this.detailsLink) {
      this.detailsBaseHref = this.detailsLink.getAttribute('href');
    }

    this.variantFields = {
      $priceContainer: this.$details.find('[data-price-container]'),
      $priceMoney: this.$details.find('[data-price-container] [data-price]'),
      $compareAtPrice: this.$details.find('[data-price-compare-container]'),
      $compareAtPriceMoney: this.$details.find('[data-price-compare-container] [data-price-compare]'),
      $badge: this.$details.find('[data-badge-sales]'),
      $badgeRange: this.$details.find('[data-badge-sales-range]'),
      $badgeSingle: this.$details.find('[data-badge-sales-single]'),
      $sku: this.$details.find('[data-product-sku]'),
      stockLevels: this.$details[0].querySelectorAll('[data-stock-level]'),
      unitPrice: this.$details[0].querySelector('[data-unit-price]'),
      totalQuantity: this.$details[0].querySelector('[data-total-quantity]'),
      unitPriceAmount: this.$details[0].querySelector('[data-unit-price-amount]'),
      unitPriceMeasure: this.$details[0].querySelector('[data-unit-price-measure]'),
      taxLine: this.$details[0].querySelector('[data-tax-line]'),
      hiddenComparePrice: this.$details[0].querySelector('[data-compare-price-hidden]'),
      hiddenCurrentPrice: this.$details[0].querySelector('[data-current-price-hidden]'),
      hiddenComparePriceRange: this.$details[0].querySelector('[data-compare-price-range-hidden]'),
      hiddenCurrentPriceRange: this.$details[0].querySelector('[data-current-price-range-hidden]'),
    };

    if (this.quantitySelector) {
      this.productQuantityBox = new QuantitySelector/* default */.A({
        quantityField: this.quantitySelector,
      });
    }

    this.forms = new Forms/* default */.A(this.$form);

    if (this.product) {
      this._bindEvents();
    }
  }

  unload() {
    if (this.$form) {
      this.$form.off(`.product-details-${this.sectionId}`);
    }

    if (this.forms) {
      this.forms.unload();
    }

    if (this.messageBanner) {
      this.messageBanner.unload();
    }

    this.events.unregisterAll();
  }

  _bindEvents() {
    this.$form.on(`submit.product-details-${this.sectionId}`, event => this._addToCartFlyout(event));
  }

  _switchVariant(data) {
    const { variant } = data;

    if (this.productPricing) {
      if (!variant) {
        this.productPricing.style.visibility = 'hidden';
      } else {
        this.productPricing.style.visibility = 'visible';
      }
    }

    // Update main select
    this.$productVariants.val(variant.id);

    console.log(this.gallery, variant);

    if (this.gallery && variant.featured_media) {
      this.gallery.showVariantMedia(variant);
    }

    if (this.surfacePickUp) {
      this.surfacePickUp.load(variant.id);
    }

    // Update Variant information
    this._updatePrice(variant);
    this._updateSKU(variant);
    this._updateBadge(variant);
    this._updateButton(variant);
    this._updateSwatchLabel(variant);
    this._updateFullDetailsLink(variant);
    this._updateUnitPrice(variant);
    this._updateStockLevels(variant);
    this.paymentTerms.update(variant.id);

    if (Shopify.PaymentButton) {
      Shopify.PaymentButton.init();

      const paymentButton = this.el.querySelector('dynamic-checkout');

      if (variant.available && paymentButton && paymentButton.hasAttribute('disabled')) {
        paymentButton.removeAttribute('disabled');
      }
    }

    if (this.useHistory) {
      const url = `${this.product.handle}?${jquery_default().param({ variant: variant.id })}`;
      history.replaceState({}, 'variant', url);
    }

    if (this.requestFormEl && !this.urlParams.get('contact_posted')) {
      this.requestFormVariant.value = variant.title;
      this.requestFormVariantID.value = variant.id;

      if (this.requestFormSKU.value === '') {
        this.requestFormSKU.removeAttribute('name');
      } else {
        this.requestFormSKU.setAttribute('name', 'contact[sku]');
      }

      if (!this.select_first_available_variant) {
        this.requestFormVariant.setAttribute('name', 'contact[variant]');
        this.requestFormVariantID.setAttribute('name', 'contact[id]');
      }
    }
  }

  _updateStockLevels(variant) {
    this.variantFields.stockLevels.forEach(el => {
      const stockLevelVariantId = Number(el.dataset.stockVariantId);
      if (variant.id === stockLevelVariantId) {
        el.setAttribute('data-stock-variant-selected', 'true');
      } else {
        el.setAttribute('data-stock-variant-selected', 'false');
      }
    });
  }

  _updatePrice(variant) {
    if (!this.productPricing) { return; }
    if (!variant) {
      this._showPriceRange();
      this.productPricing.style.visibility = 'visible';
      return;
    }

    const compareAtPrice = this.variantFields.hiddenComparePrice.innerHTML;
    const currentPrice = this.variantFields.hiddenCurrentPrice.innerHTML;
    this.variantFields.$compareAtPrice[0].innerHTML = compareAtPrice;
    this.variantFields.$priceContainer[0].innerHTML = currentPrice;

    this.variantFields.$priceMoney = this.$details.find('[data-price-container] [data-price]');
    this.variantFields.$compareAtPriceMoney = this.$details.find('[data-price-compare-container] [data-price-compare]');

    // Update compare at price
    const hasComparePrice = (
      !!variant.compare_at_price && variant.compare_at_price > variant.price
    );

    this.variantFields.$compareAtPrice.toggleClass('visible', hasComparePrice);

    this.variantFields.$compareAtPriceMoney.html(
      Shopify.formatMoney(variant.compare_at_price, this.settings.money_format),
    );

    // Update price
    this.variantFields.$priceMoney.html(
      Shopify.formatMoney(variant.price, this.settings.money_format),
    );
  }

  _showPriceRange() {
    this._updateBadge(false);

    const currentPriceIsRange = this.product.price_varies;
    const currentCompareAtPriceIsRange = this.product.variants.some(variant => (
      (variant.compare_at_price || variant.price) !== this.product.compare_at_price
    ));
    const currentPrice = currentPriceIsRange
      ? this.variantFields.hiddenCurrentPriceRange.innerHTML
      : this.variantFields.hiddenCurrentPrice.innerHTML;
    const compareAtPrice = currentCompareAtPriceIsRange
      ? this.variantFields.hiddenComparePriceRange.innerHTML
      : this.variantFields.hiddenComparePrice.innerHTML;
    const shouldDisplayCompareAtPrice = this.product.compare_at_price_max > this.product.price_min;

    this.variantFields.$compareAtPrice.toggleClass('visible', shouldDisplayCompareAtPrice);

    this.variantFields.$compareAtPrice[0].innerHTML = compareAtPrice;
    this.variantFields.$priceContainer[0].innerHTML = currentPrice;
  }

  _updateSKU(variant = false) {
    if (variant) {
      if (variant.sku === '') {
        this.variantFields.$sku.parent().addClass('product-sku--empty');
      } else {
        this.variantFields.$sku.parent().removeClass('product-sku--empty');
        this.variantFields.$sku.parent().show();
      }

      this.variantFields.$sku.text(variant.sku);

      if (this.requestFormEl && !this.urlParams.get('contact_posted')) {
        this.requestFormSKU.value = variant.sku;
      }
    } else {
      this.variantFields.$sku.parent().hide();
    }
  }

  _updateBadge(variant = false) {
    if (!variant) {
      const priceSaved = this.product.compare_at_price
        ? this.product.compare_at_price_max - this.product.price_min
        : 0;
      if (priceSaved <= 0) {
        this.variantFields.$badge.toggle(false);
      } else {
        this.variantFields.$badgeSingle.toggle(false);
        this.variantFields.$badgeRange.toggle(!!priceSaved);
        this.variantFields.$badge.toggle(!!priceSaved);
      }
    } else {
      const priceSaved = variant.compare_at_price ? variant.compare_at_price - variant.price : 0;
      if (priceSaved <= 0) {
        this.variantFields.$badge.toggle(false);
      } else {
        this.variantFields.$badgeRange.toggle(false);
        this.variantFields.$badgeSingle.toggle(!!priceSaved);
        this.variantFields.$badge.toggle(!!priceSaved);

        const $badgeMoneySaved = this.variantFields.$badgeSingle.find('[data-price-money-saved]');
        const $badgePercentSaved = this.variantFields.$badgeSingle.find('[data-price-percent-saved]');

        if ($badgeMoneySaved.length) {
          // Update badge if it shows money saved
          $badgeMoneySaved.text(
            Shopify.formatMoney(priceSaved, this.settings.money_format),
          );
        }

        if ($badgePercentSaved.length) {
          // Update badge if it shows percentiles
          const percentileSaved = Math.round((priceSaved * 100) / variant.compare_at_price);
          $badgePercentSaved.text(percentileSaved);
        }
      }
    }
  }

  _updateButton(variant) {
    if (!variant) {
      this.$productAtcButton.text(this.context.product_unavailable);
      this.$productAtcButton
        .addClass('disabled')
        .prop('disabled', true);
    } else if (variant.available) {
      if (this.$productAtcButton[0].hasAttribute('data-product-atc-preorder')) {
        this.$productAtcButton.text(this.context.product_preorder);
      } else {
        this.$productAtcButton.text(this.context.product_available);
      }
      this.$productAtcButton
        .removeClass('disabled')
        .prop('disabled', false);
    } else {
      this.$productAtcButton.text(this.context.product_sold_out);
      this.$productAtcButton
        .addClass('disabled')
        .prop('disabled', true);
    }
  }

  _updateSwatchLabel(variant) {
    if (this.settings.swatches_enable) {
      const swatchLabel = this.$form[0].querySelector('[data-option-swatch-value]');
      if (swatchLabel) {
        swatchLabel.innerText = variant.options[parseInt(swatchLabel.dataset.optionSwatchValue, 10)];
      }
    }
  }

  _updateFullDetailsLink(variant) {
    if (this.detailsLink) {
      this.detailsLink.setAttribute('href', `${this.detailsBaseHref}?variant=${variant.id}`);
    }
  }

  _updateUnitPrice(variant) {
    if (this.variantFields.unitPrice && variant.unit_price_measurement) {
      this.variantFields.totalQuantity.innerHTML = `${variant.unit_price_measurement.quantity_value}${variant.unit_price_measurement.quantity_unit}`;

      this.variantFields.unitPriceAmount.innerHTML = Shopify.formatMoney(variant.unit_price, this.settings.money_format);
      if (variant.unit_price_measurement.reference_value === 1) {
        this.variantFields.unitPriceMeasure.innerHTML = variant.unit_price_measurement.reference_unit;
      } else {
        this.variantFields.unitPriceMeasure.innerHTML = `${variant.unit_price_measurement.reference_value}${variant.unit_price_measurement.reference_unit}`;
      }
      this.variantFields.unitPrice.classList.remove('hidden');
    } else if (this.variantFields.unitPrice) {
      this.variantFields.unitPrice.classList.add('hidden');
    }

    if (this.variantFields.taxLine) {
      if (variant.taxable) {
        this.variantFields.taxLine.classList.remove('hidden');
      } else {
        this.variantFields.taxLine.classList.add('hidden');
      }
    }
  }

  _addToCartFlyout(event) {
    event.preventDefault();

    if (this.recipientFormEl) {
      this.recipientFormEl.classList.remove('recipient-form--has-errors');
    }

    this.variantSelection.getVariant().then(variant => {
      if (!variant) {
        this.messageBanner = new MessageBanner/* default */.A(this.context.select_variant, 'error');
        this.$form.get(0).classList.add('product-form--error-option-unselected');
        return;
      }

      if (this.addToCartFlyout) {
        this.addToCartFlyout.unload();
      }

      const formData = this.$form.serializeArray();
      const options = {
        atcButton: this.$productAtcButton[0],
        settings: {
          moneyFormat: this.settings.money_format,
          cartRedirection: this.settings.cart_redirection,
        },
      };
      this.addToCartFlyout = new AddToCartFlyout/* default */.A(formData, options, this.atcCallbacks);
    });
  }
}


/***/ },

/***/ 9360
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RichText)
/* harmony export */ });
/* harmony import */ var fitvids__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8696);
/* harmony import */ var fitvids__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fitvids__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pixelunion_grouped_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5538);
/* harmony import */ var _pixelunion_grouped_content__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pixelunion_grouped_content__WEBPACK_IMPORTED_MODULE_1__);



class RichText {
  constructor($el) {
    this.$el = $($el);
    this._initExternalLinks();
    this.groupedContent = null;

    if (this.$el.length) {
      this.groupedContent = new (_pixelunion_grouped_content__WEBPACK_IMPORTED_MODULE_1___default())(this.$el.get(0), {
        layout: 'tabs',
        intelliparse: false,
      });

      fitvids__WEBPACK_IMPORTED_MODULE_0___default()('.rte');
    }
  }

  unload() {
    if (this.groupedContent) {
      this.groupedContent.unload();
    }
  }

  /**
   * Open links within an RTE field in a new window if they point to external domains
   *
   * @private
   */
  _initExternalLinks() {
    const anchors = this.$el.find('a[href^="http"]').filter((i, el) => el.href.indexOf(location.hostname) === -1);
    anchors.attr('target', '_blank');
  }
}


/***/ },

/***/ 8044
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ QuantitySelector)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6945);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_1__);



class QuantitySelector {
  constructor({ quantityField, onChange }) {
    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();
    this.field = quantityField;
    this.input = this.field.querySelector('[data-quantity-input]');
    this.plus = this.field.querySelector('[data-quantity-plus]');
    this.minus = this.field.querySelector('[data-quantity-minus]');
    this.minusButtonWrapper = this.field.querySelector('[data-button-wrapper-minus]');
    this.incrementValue = parseInt(this.input.dataset.incrementValue, 10);
    this.increaseAmount = this.increaseAmount.bind(this);
    this.decreaseAmount = this.decreaseAmount.bind(this);
    this.onChange = onChange ? just_debounce__WEBPACK_IMPORTED_MODULE_1___default()(onChange, 50) : () => {};

    this.registerEvents();
  }

  registerEvents() {
    this.increaseAmountClickEvent = this.events.register(this.plus, 'click', e => this.increaseAmount(e));
    this.decreaseAmountClickEvent = this.events.register(this.minus, 'click', e => this.decreaseAmount(e));
    this.setAmountChangeEvent = this.events.register(this.input, 'change', e => this.setAmount(e));
    this.quantityKeyUpEvent = this.events.register(this.input, 'keyup', e => this.quantityKeyUp(e));
    this.quantityKeyDownEvent = this.events.register(this.input, 'keydown', e => this.quantityKeyDown(e));

    this._updateMinusButton();
  }

  setAmount(e) {
    e.preventDefault();

    const count = this._getCount();

    if (!count) {
      this.input.value = this.incrementValue;
    }

    this._updateMinusButton();
    this.onChange(e.currentTarget);
  }

  _getCount() {
    return this.input.valueAsNumber;
  }

  increaseAmount(e) {
    e.preventDefault();
    const count = this._getCount();

    this.input.value = count + this.incrementValue;
    this._updateMinusButton();

    this.onChange(e.currentTarget);
  }

  decreaseAmount(e) {
    e.preventDefault();
    const count = this._getCount();

    this.input.value = count - this.incrementValue;
    this._updateMinusButton();

    this.onChange(e.currentTarget);
  }

  quantityKeyUp(e) {
    if (e.key === 'Backspace') {
      return;
    }

    this._updateMinusButton();

    this.onChange(e.currentTarget);
  }

  quantityKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  _updateMinusButton() {
    const count = this._getCount();
    if (count <= this.incrementValue) {
      this.minusButtonWrapper.classList.add('quantity-selector__button-wrapper--disabled');
    } else {
      this.minusButtonWrapper.classList.remove('quantity-selector__button-wrapper--disabled');
    }
  }

  unload() {
    this.events.unregisterAll();
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


/***/ }

}]);