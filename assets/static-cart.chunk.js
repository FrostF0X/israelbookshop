"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[1688],{

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

/***/ 9753
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticCart)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2491);
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scriptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6945);
/* harmony import */ var just_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(just_debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var morphdom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3770);
/* harmony import */ var _shopify_theme_addresses__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6208);
/* harmony import */ var _pixelunion_rimg_shopify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1112);
/* harmony import */ var _pixelunion_shopify_asyncview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(558);
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1561);
/* harmony import */ var _components_RichText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9360);
/* harmony import */ var _helpers_QuantitySelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8044);
/* harmony import */ var _components_MessageBanner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6028);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6383);













class StaticCart {
  constructor(section) {
    this.section = section;
    this.settings = section.data.settings;
    this.shipping = section.data.shipping;
    this.updateTimeout = null;

    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.el = section.el;
    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A();
    this.totals = this.el.querySelectorAll('[data-cart-total]');
    this.$shipping = this.$el.find('[data-cartshipping]');
    this.freeShippingBars = this.$el[0].querySelectorAll('[data-free-shipping-bar]');
    this.$cartSidebar = this.$el.find('[data-cart-sidebar]');

    // Quantity selector
    this.quantitySelectors = [];
    this.inputFields = this.el.querySelectorAll('[data-quantity-input]');

    // Product form containers
    this.$titleTotalSmall = this.$el.find('.cart-title-total--small');
    this.$titleTotalLarge = this.$el.find('.cart-title-total--large');
    this.$titleTotalContents = this.$el.find('[data-cart-title-total]');

    // Cart list
    this.cartItemList = this.$el[0].querySelector('[data-cart-item-list]');
    this.cartDiscounts = this.$el[0].querySelector('[data-cart-discounts]');

    // Shipping calculator elements
    this.$shippingToggle = this.$el.find('[data-cartshipping-toggle]');
    this.$shippingResponse = this.$shipping.find('[data-cartshipping-response]');
    this.$shippingResponseMessage = this.$shippingResponse.find('[data-cartshipping-message]');
    this.$shippingResponseRates = this.$shippingResponse.find('[data-cartshipping-rates]');
    this.$shippingSubmit = this.$shipping.find('[data-cartshipping-submit]');

    this._moveTitleTotal();

    const $scripts = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scripts]');

    this._editItemQuantity = this._editItemQuantity.bind(this);

    this.inputFields.forEach(input => {
      this.quantitySelectors.push(new _helpers_QuantitySelector__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A({
        quantityField: input.parentNode,
        onChange: this._editItemQuantity,
      }));
    });

    scriptjs__WEBPACK_IMPORTED_MODULE_1___default()($scripts.data('shopify-api-url'), () => {
      this._bindEvents();

      window.Shopify.onError = this._handleErrors.bind(this);
    });

    this.forms = new _Forms__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A(this.$el);

    if (this.settings.shipping && this.$shipping.length) {
      scriptjs__WEBPACK_IMPORTED_MODULE_1___default()($scripts.data('shopify-countries'), () => {
        scriptjs__WEBPACK_IMPORTED_MODULE_1___default()($scripts.data('shopify-common'), () => {
          this._initShippingCalc();
        });
      });
    }

    if (this.$cartSidebar.length) {
      new _components_RichText__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A(this.$cartSidebar);
    }
  }

  onSectionUnload() {
    this.$el.off('.cart-page');
    this.$window.off('.cart-page');
    if (this.messageBanner) {
      this.messageBanner.unload();
    }

    this.forms.unload();
  }

  _bindEvents() {
    this.$el.on('click.cart-page', '[data-cartitem-remove]', event => {
      event.preventDefault();

      this._editItemQuantity(event.currentTarget, true);
    });

    this.$window.on('resize.cart-page', just_debounce__WEBPACK_IMPORTED_MODULE_2___default()(() => this._moveTitleTotal(), 20));
  }

  /**
   * Gets the current value of the quantity input box for a given line item key
   *
   * @param {string} key
   */
  _getItemQuantity(key) {
    return parseInt(
      this.el
        .querySelector(`[data-cartitem-key="${key}"] [data-quantity-input]`)
        .value,
      10,
    );
  }

  _moveTitleTotal() {
    if (!this.$titleTotalContents.length) {
      return;
    }

    if (this.$window.outerWidth() >= 480) {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(this.$titleTotalLarge[0], this.$titleTotalContents[0])) {
        const $form = this.$titleTotalContents.detach();
        this.$titleTotalLarge.append($form);
      }
    } else if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(this.$titleTotalSmall[0], this.$titleTotalContents[0])) {
      const $form = this.$titleTotalContents.detach();
      this.$titleTotalSmall.append($form);
    }
  }

  /**
   * Handle an item quantity change
   *
   * @param event
   * @param {Boolean} remove - Set as true to remove cart item
   * @private
   */
  _editItemQuantity(target, remove = false) {
    const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target);
    const cartItemRow = $target.closest('[data-cartitem-id]')[0];

    if (remove) {
      cartItemRow.classList.add('removing');
    }

    const quantity = remove ? 0 : parseInt(cartItemRow.querySelector('[data-quantity-input]').value, 10);

    const key = cartItemRow.getAttribute('data-cartitem-key');

    this._updateCart(key, quantity);
  }

  /**
   * Update cart with a valid quantity
   *
   * @param $cartItem
   * @param quantity
   * @private
   */
  _updateCart(key, quantity) {
    // cancel any pending requests
    if (this.updateTimeout !== null) {
      clearTimeout(this.updateTimeout);
    }

    this.updateTimeout = setTimeout(() => {
      if (quantity > 0 && this._getItemQuantity(key) !== quantity) {
        this.updateTimeout = null;
        return;
      }

      const thisTimeoutId = this.updateTimeout;
      // Notify Shopify updated item

      const fetchBody = {
        id: key,
        quantity,
      };

      fetch(`${window.Theme.routes.cart_change_url}.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchBody),
      })
        .then(response => response.json())
        .then(data => {
          if (this.updateTimeout !== thisTimeoutId) {
            return;
          }

          if (data.status === 422) {
            this._handleInvalidQuantity(thisTimeoutId, data.message);
          } else {
            this._didUpdate(data, thisTimeoutId);
          }
        })
        .catch(error => console.error(error));
    }, 300);
  }


  /**
   * Display message banner and fetch valid cart data when
   * invalid quantity error is returned on cart change
   *
   * @param thisTimeoutId
   * @param errorMesg
   * @private
   */
  _handleInvalidQuantity(thisTimeoutId, errorMsg) {
    // If another request is in progress, discard this update
    if (this.updateTimeout !== thisTimeoutId) {
      return;
    }

    if (this.messageBanner) {
      this.messageBanner.unload();
      this.messageBanner = null;
    }

    this.messageBanner = new _components_MessageBanner__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A(errorMsg, 'error');

    fetch(`${window.Theme.routes.cart_url}.js`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(cartData => {
        this._didUpdate(cartData, thisTimeoutId);
      })
      .catch(error => console.error(error));
  }

  /**
   * Fetches new cart contents and swaps into page
   *
   * @param response
   * @param {integer} thisTimeoutId Id of timeout for this request. If no longer current, update is cancelled.
   * @returns {*}
   * @private
   */

  _didUpdate(response, thisTimeoutId) {
    // Reload page if all items are removed from cart
    if (!response.items.length) {
      window.location = window.Theme.routes.cart_url;
      return;
    }

    // Reload the cart-item-list and the discounts snippets
    _pixelunion_shopify_asyncview__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.load(
      window.Theme.routes.cart_url,
      this.section.id,
    )
      .then(({ html }) => {
        // If another request is in progress, discard this update
        if (this.updateTimeout !== thisTimeoutId) {
          return;
        }

        const countEvent = new CustomEvent('cartcount:update', { detail: response });
        window.dispatchEvent(countEvent);

        // Unregister QuantitySelector events
        this.quantitySelectors.forEach(selector => {
          selector.unload();
        });

        // Update Free shipping bar contents
        if (this.freeShippingBars.length > 0) {
          this.freeShippingBars.forEach(el => {
            const freeShippingBar = el;
            freeShippingBar.innerHTML = html.free_shipping_bar;
            freeShippingBar.classList.add('free-shipping-bar--animate');
          });
        }

        // Inject new cart list contents
        const newListContainer = document.createElement('div');
        newListContainer.innerHTML = html.list;

        (0,morphdom__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(
          this.cartItemList,
          newListContainer.querySelector('ul'),
          {
            onBeforeElUpdated: (fromEl, toEl) => {
              // Skip images if src matches
              // - we don't want to reload lazy loaded images
              if (fromEl.tagName === 'IMG' && fromEl.src === toEl.src) {
                return false;
              }

              return true;
            },
          },
        );

        // Update cart totals
        this.totals.forEach(total => {
          const newTotal = total;
          newTotal.innerHTML = html.cart_total;

          (0,morphdom__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(
            total,
            newTotal,
            {
              childrenOnly: true,
            },
          );
        });

        _pixelunion_rimg_shopify__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.watch(this.cartItemList);

        this.forms.unload();
        this.forms = new _Forms__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A(this.$el);

        this.inputFields.forEach(input => {
          this.quantitySelectors.push(new _helpers_QuantitySelector__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A({
            quantityField: input.parentNode,
            onChange: this._editItemQuantity,
          }));
        });

        this.$el.off('click.cart-page', '[data-cartitem-remove]');
        this.$el.on('click.cart-page', '[data-cartitem-remove]', event => {
          event.preventDefault();
          this._editItemQuantity(event.currentTarget, true);
        });

        // Inject new cart level discounts
        this.cartDiscounts.innerHTML = html.discounts;
      })
      .catch(() => window.location.reload());
  }

  /**
   * Handle Errors returned from Shopify
   *
   * @param errors
   * @private
   */
  _handleErrors(errors = null) {
    if (!errors) {
      return;
    }

    const shippingResponse = {
      message: this.shipping.error_general,
    };

    if (errors.zip && errors.zip.length > 0) {
      if (errors.zip[0].indexOf('is not valid') !== -1 || errors.zip[0].indexOf('can\'t be blank') !== -1) {
        shippingResponse.message = `${this.shipping.zip} ${errors.zip}`;
      }
    }

    if (errors.error && errors.error.length > 0) {
      if (errors.error[0].indexOf('shipment_too_heavy') !== -1) {
        shippingResponse.message = this.shipping.shipment_too_heavy;
      }
    }

    this._handleShippingResponse(shippingResponse);
  }

  _initShippingCalc() {
    this._bindShippingCalcEvents();

    const countrySelect = document.getElementById('address_country');
    const provinceSelect = document.getElementById('address_province');
    const provinceContainer = document.getElementById('address_province_container');

    this.shippingCountryProvinceSelector = new _shopify_theme_addresses__WEBPACK_IMPORTED_MODULE_4__/* .CountryProvinceSelector */ .Q(countrySelect.innerHTML);

    this.shippingCountryProvinceSelector
      .build(
        countrySelect,
        provinceSelect,
        {
          onCountryChange: provinces => {
            if (provinces.length) {
              provinceContainer.style.display = 'block';
            } else {
              provinceContainer.style.display = 'none';
            }

            // "Province", "State", "Region", etc. and "Postal Code", "ZIP Code", etc.
            // Even countries without provinces include a label.
            const { label, zip_label: zipLabel } = window.Countries[countrySelect.value];
            provinceContainer.querySelector('label[for="address_province"]').innerHTML = label;
            this.el.querySelector('#address_zip ~ label[for="address_zip"]').innerHTML = zipLabel;
          },
        },
      );
  }

  _bindShippingCalcEvents() {
    this.$el.on('click.cart-page', '[data-cartshipping-toggle]', () => {
      this._toggleShippingCalc();
    });

    this.$el.on('click.cart-page', '[data-cartshipping-submit]', () => {
      this._getShippingRates();
    });

    this.$el.on('keypress.cart-page', '#address_zip', event => {
      if (event.keyCode === 10 || event.keyCode === 13) {
        event.preventDefault();
        this.$shippingSubmit.trigger('click');
      }
    });
  }

  _toggleShippingCalc() {
    const oldText = this.$shippingToggle.text();
    const newText = this.$shippingToggle.data('cartshipping-toggle');

    this.$shippingToggle
      .html(newText)
      .data('cartshipping-toggle', oldText);

    this.$shipping.toggleClass('open');
  }

  _getShippingRates() {
    this._disableShippingButton();

    const shippingAddress = {};
    shippingAddress.country = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#address_country').val() || '';
    shippingAddress.province = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#address_province').val() || '';
    shippingAddress.zip = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#address_zip').val() || '';

    const queryString = Object.keys(shippingAddress)
      .map(key => `${encodeURIComponent(`shipping_address[${key}]`)}=${encodeURIComponent(shippingAddress[key])}`)
      .join('&');

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax(`${window.Theme.routes.cart_url}/shipping_rates.json?${queryString}`, { dataType: 'json' })
      .fail(error => this._handleErrors(error.responseJSON || {}))
      .done(response => {
        const rates = response.shipping_rates;
        const addressBase = [];

        if (shippingAddress.zip.length) {
          addressBase.push(shippingAddress.zip.trim());
        }

        if (shippingAddress.province.length) {
          addressBase.push(shippingAddress.province);
        }

        if (shippingAddress.country.length) {
          addressBase.push(shippingAddress.country);
        }

        const address = addressBase.join(', ');

        let message = '';
        if (rates.length > 1) {
          const firstRate = window.Shopify.formatMoney(rates[0].price, this.settings.money_format);
          message = this.shipping.multiple_rates
            .replace('*address*', address)
            .replace('*number_of_rates*', rates.length)
            .replace('*rate*', `<span class="money">${firstRate}</span>`);
        } else if (rates.length === 1) {
          message = this.shipping.one_rate.replace('*address*', address);
        } else {
          message = this.shipping.no_rates;
        }

        const ratesList = rates.map(rate => {
          const price = window.Shopify.formatMoney(rate.price, this.settings.money_format);
          const rateValue = this.shipping.rate_value
            .replace('*rate_title*', rate.name)
            .replace('*rate*', `<span class="money">${price}</span>`);

          return `<li>${rateValue}</li>`;
        });

        this._handleShippingResponse({
          message,
          rates: ratesList,
        });
      });
  }

  _enableShippingButton() {
    this.$shippingSubmit
      .html(this.shipping.calculate_shipping)
      .attr('disabled', false);
  }

  _disableShippingButton() {
    this.$shippingSubmit
      .html(this.shipping.calculating)
      .attr('disabled', true);
  }

  _showShippingResponse() {
    this.$shippingResponse.addClass('visible');
  }

  _hideShippingResponse() {
    this.$shippingResponse.removeClass('visible');
  }

  /**
   * Handle shipping responses
   *
   * @param {object} shippingResponse
   * @property {String} shippingResponse.messages - Error / Success message
   * @property {Array|String} shippingResponse.rates - Shipping rates
   * @private
   */
  _handleShippingResponse(shippingResponse = {}) {
    // Hide the response so that it can be populated smoothly
    this._hideShippingResponse();

    const message = shippingResponse.message || null;
    const rates = shippingResponse.rates || null;

    // Empty out contents
    this.$shippingResponseMessage.empty();
    this.$shippingResponseRates.empty();

    if (message) {
      this.$shippingResponseMessage.html(message);
    }

    if (rates) {
      this.$shippingResponseRates.html(rates);
    }

    // Reset the calculating button so it can be used again
    this._enableShippingButton();

    // No error provided
    if (!message && !rates) {
      return;
    }

    // Show the response
    this._showShippingResponse();
  }
}


/***/ }

}]);