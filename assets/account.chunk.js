"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8644],{

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

/***/ 8479
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Account)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6383);



class Account {
  constructor() {
    this.$accountContents = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-template-account]');
    this.$loginContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-template-account-login]');
    this.$addressesContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-template-account-addresses]');
    this.$addressButtonFocus = null;
    this._loginToggle = this._loginToggle.bind(this);

    if (this.$loginContent.length) {
      this._initLoginPage();
    }

    if (this.$addressesContent.length) {
      this._initAddressPage();
    }

    if (this.$accountContents.length) {
      this._init();
    }
  }

  _init() {
    new _Forms__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.$accountContents);
  }

  _initLoginPage() {
    this.$loginToggle = this.$loginContent.find('[data-login-toggle]');
    this.$login = this.$loginContent.find('[data-account-login-main]');
    this.$recovery = this.$loginContent.find('[data-account-login-recovery]');
    this.$recoveryHasMessage = this.$recovery.find('[data-recovery-has-message]');

    this.$loginToggle.on('click', this._loginToggle);

    if (this.$recoveryHasMessage.length) {
      this._loginToggle();
    }
  }

  _loginToggle(event = null) {
    if (event) {
      event.preventDefault();
    }

    this.$login.toggleClass('visible');
    this.$recovery.toggleClass('visible');
  }

  _initAddressPage() {
    const $customerAddresses = this.$addressesContent.find('[data-address-id]');

    this.$addressesContent.on('click', '[data-edit-address]', event => {
      const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
      const itemId = $target.attr('data-edit-address');

      $customerAddresses.removeClass('visible');
      this.$addressButtonFocus = $target;

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`[data-address-id="${itemId}"]`)
        .addClass('visible')
        .find('.form-field-input')
        .eq(0)
        .focus();
    });

    this.$addressesContent.on('click', '[data-edit-address-cancel]', () => {
      $customerAddresses.removeClass('visible');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-address-id="new"]').addClass('visible');

      // Return focus to last used button
      this.$addressButtonFocus.focus();
      this.$addressButtonFocus = null;
    });

    this.$addressesContent.on('click', '[data-delete-address]', event => {
      const itemId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).attr('data-delete-address');
      Shopify.CustomerAddress.destroy(itemId, '');
    });

    $customerAddresses.each((i, el) => {
      const id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).attr('data-address-id');

      const countryEl = `customer_addr_${id}_country`;
      const provinceEl = `customer_addr_${id}_province`;
      const options = { hideElement: `address_province_container_${id}` };

      // Initiate provinces for address forms
      new Shopify.CountryProvinceSelector(countryEl, provinceEl, options);
    });
  }
}


/***/ }

}]);