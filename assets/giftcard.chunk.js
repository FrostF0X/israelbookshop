"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[251],{

/***/ 3262
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiftCard)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


class GiftCard {
  constructor() {
    this.el = document.querySelector('.template-giftcard');
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el);
    this.qrCode = this.el.querySelector('[data-giftcard-qr]');
    this.giftCardCode = this.el.querySelector('[data-giftcard-code]');

    this._bindEvents();
    this.addQrCode();
  }

  addQrCode() {
    return new QRCode(this.qrCode, {
      text: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.qrCode).data('giftcard-qr'),
      width: 120,
      height: 120,
    });
  }

  _bindEvents() {
    this.$el.on('click', '[data-giftcard-print]', () => {
      window.print();
    });

    // Auto-select gift card code on click, based on ID passed to the function
    this.$el.on('click', '[data-giftcard-code]', () => {
      this._selectText();
    });
  }

  _selectText() {
    let range = '';
    let selection;

    if (document.body.createTextRange) { // ms method
      range = document.body.createTextRange();
      range.moveToElementText(this.giftCardCode);
      range.select();
    } else if (window.getSelection) { // moz, opera, webkit method
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(this.giftCardCode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}


/***/ }

}]);