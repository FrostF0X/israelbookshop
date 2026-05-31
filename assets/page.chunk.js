"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[2530],{

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

/***/ 877
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_RichText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9360);



class Page {
  constructor() {
    this.$pageContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-template-page]');

    if (this.$pageContent.length) {
      new _components_RichText__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.$pageContent);
    }
  }
}


/***/ }

}]);