"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8678],{

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

/***/ 9035
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicNewsletter)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6383);




class DynamicNewsletter {
  constructor(section) {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);

    this.forms = new _Forms__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.$el);
  }

  onSectionUnload() {
    this.forms.unload();
  }
}


/***/ }

}]);