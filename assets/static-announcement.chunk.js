"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[2347],{

/***/ 3324
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticAnnouncement)
/* harmony export */ });
class StaticAnnouncement {
  constructor(section) {
    // Since the announcement bar positioning is actually handled by the
    // StaticSectionHeader and StickyHeader classes, we need to let them know
    // when the announcement element is refreshed within the editor.
    if (window.Shopify && window.Shopify.designMode) {
      section.postMessage('announcement:load');
    }
  }
}


/***/ }

}]);