"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5384],{

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

/***/ 5509
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticArticle)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_RichText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9360);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6383);




class StaticArticle {
  constructor(section) {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.$commentForm = this.$el.find('[data-articlecomments-form]');

    this.richText = new _components_RichText__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.$el);

    if (this.$commentForm.length) {
      this.commentForm = new _Forms__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(this.$commentForm);
    }
  }

  onSectionUnload() {
    this.richText.unload();

    if (this.commentForm) {
      this.commentForm.unload();
    }
  }
}


/***/ }

}]);