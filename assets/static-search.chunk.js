"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[6014],{

/***/ 9266
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SearchForm)
/* harmony export */ });
/* harmony import */ var _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1561);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5752);



function sanitizeCategory(value) {
  return value.replace(/(tag|product_type):(searchfilter_)?/, '');
}

class SearchForm {
  constructor(container, options = {}) {
    this.container = container;
    this.form = this.container.querySelector('[data-live-search-form]');
    this.filter = this.container.querySelector('[data-live-search-filter]');

    this.isLiveSearch = options.liveSearch ? options.liveSearch : false;
    this.setCategory = options.setCategory || (() => { /* do nothing */ });

    this.events = new _pixelunion_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A();

    this.events.register(this.form, 'submit', e => this.submitHandler(e));

    if (this.filter) {
      this.filterLabel = this.container.querySelector('[data-live-search-filter-label]');

      // page-search-form uses a hidden input to persist the filter, in which case
      // this.filter exists, but this.filterLabel does not.
      if (this.filterLabel) {
        this.setCategory(this.filterLabel.value);

        this.events.register(this.filter, 'change', e => {
          const { value } = e.target;
          if (value) {
            const newValue = sanitizeCategory(value);
            this.filterLabel.innerHTML = newValue;
            this.setCategory(newValue);
            this.form.classList.add('live-search-filter-active');
          } else {
            this.filterLabel.innerHTML = e.target.dataset.filterAll;
            this.form.classList.remove('live-search-filter-active');
            this.setCategory('');
          }
        });
      }

      const hideFilterIfMobile = () => {
        if (_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
          this.filter.value = '';
          this.form.classList.remove('live-search-filter-active');
          if (this.filterLabel) {
            this.filterLabel.innerHTML = this.filter.dataset.filterAll;
          }
        }
      };

      hideFilterIfMobile();
      _Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.onBreakpointChange(() => hideFilterIfMobile());
    }
  }

  unload() {
    this.events.unregisterAll();
  }

  submitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget.cloneNode(true);
    const termsInput = form.querySelector('[name=q]');

    form.style.position = 'absolute';
    form.style.left = '-1000px';
    form.style.bottom = '-1000px';
    form.style.visibility = 'hidden';

    let terms = termsInput.value;

    if (this.isLiveSearch && !terms) {
      return;
    }

    // Add field filter
    // Filter should always come before the input terms,
    // otherwise Shopify won't return the expected results.
    terms = this.filter && this.filter.value ? `${this.filter.value} AND ${terms}` : terms;

    // Update value
    termsInput.value = terms;

    // Forms must be in the browser context in order to submit
    window.document.body.appendChild(form);
    form.submit();
  }
}


/***/ },

/***/ 4675
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticSearch)
/* harmony export */ });
/* harmony import */ var _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9441);
/* harmony import */ var _components_search_SearchForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9266);



class StaticSearch {
  constructor(section) {
    this.section = section;
    this.el = section.el;
    this.searchField = this.el.querySelector('[data-live-search]');

    // Product items
    this.productItems = [];
    const productItems = this.el.querySelectorAll('[data-product-item]');

    productItems.forEach(productItem => {
      this.productItems.push(
        new _components_ProductGridItem__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A({
          el: productItem,
          id: this.section.id,
          lazy: true,
        }),
      );
    });

    this.searchForm = new _components_search_SearchForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.searchField);
  }

  onSectionUnload() {
    this.searchForm.unload();

    this.productItems.forEach(productItem => {
      productItem.unload();
    });
  }
}


/***/ }

}]);