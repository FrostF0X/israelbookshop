"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[4579],{

/***/ 5075
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticRecentlyViewed)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2522);
/* harmony import */ var flickity__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flickity__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pixelunion_rimg_shopify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1112);




class StaticRecentlyViewed {
  constructor(section) {
    this.namespace = 'pxu';
    this.maxRecentlyViewed = 30; // Store a max of 30 items
    this.maxStorageTime = 30 * 24 * 3600; // Store items for 30 days only
    this.version = `${section.data.currency}-${window.Theme.routes.root_url}`; // Version key is used to update localstorage when format changes
    this.storageKey = `${this.namespace}-recentlyViewed-${this.version}`;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.time = section.data.time;
    this.flickity = null;

    this.recentlyViewed = section.data.recently_viewed_info;
    this.cardSettings = section.data.product_card_settings;

    if (this.recentlyViewed && this.time) {
      this.recentlyViewed.timestamp = Math.round((new Date()).getTime() / 1000);
    }

    this.slideImageLoaded = this._onSlideImageLoaded.bind(this);

    let recentlyViewed = [];

    if (this.time) {
      recentlyViewed = this._getRecentlyViewed();
      if (this.recentlyViewed) {
        this.removeRecentlyViewed(this.recentlyViewed.handle, recentlyViewed);


        recentlyViewed.push(this.recentlyViewed);
      }

      const promises = this._setRecentlyViewed(recentlyViewed);

      // Wait until promises are resolved before inserting markup into the DOM
      jquery__WEBPACK_IMPORTED_MODULE_0___default().when(...promises).done(() => {
        if (recentlyViewed.length) {
          const cardsMarkup = this._getRecentlyViewedCards();
          const cardsData = this._getRecentlyViewed();
          this.$el.find('[data-recently-viewed-container]').append(cardsMarkup);

          cardsData.forEach(productData => {
            const timestamp = this.timeSince(productData.timestamp);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`[data-product-handle=${productData.handle}]`)
              .prepend(timestamp);
          });

          _pixelunion_rimg_shopify__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.watch(this.$el[0]);
          this.$carousel = this.$el.find('.product-recently-viewed__content');
          this.slides = '.product-recently-viewed-card';
          if (this.$carousel.find(this.slides).length > 1) {
            this._initSlider();
          }
        } else {
          this.$el.find('.product-recently-viewed--section').addClass('hide');
        }
      });
    } else {
      if (this.recentlyViewed) {
        recentlyViewed.push(this.recentlyViewed);
        this._setRecentlyViewed(recentlyViewed);
      }

      this.$el.find('.product-recently-viewed--section').addClass('hide');
    }

    this.bindEvents();
  }

  bindEvents() {
    this.$el.on('click', '[data-remove-recently-viewed]', event => {
      const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
      const handle = $target.closest('[data-product-handle]').data('product-handle');
      const recentlyViewed = this._getRecentlyViewed();

      this.removeRecentlyViewed(handle, recentlyViewed);
      this._setRecentlyViewed(recentlyViewed);

      $target.parents('[data-recently-viewed-card]').addClass('hide-card');
      $target.parents('[data-recently-viewed-card]').nextAll().addClass('move-card');

      setTimeout(() => {
        let index = $target.parents('[data-recently-viewed-card]').index();
        if (index !== 0) {
          index--;
        }

        $target.parents('[data-recently-viewed-card]').nextAll().removeClass('move-card');
        if ($target.parents('[data-recently-viewed-card]').length) {
          this.flickity.remove($target.parents('[data-recently-viewed-card]'));
        }
        this.flickity.selectCell(index);
      }, 500);
    });

    this.$el.on('click', '[data-clear-recently-viewed]', () => {
      this.clearRecentlyViewed();
    });
  }

  timeSince(timestamp) {
    const now = Math.round((new Date()).getTime() / 1000);
    const secondsPast = now - timestamp;
    const { lang } = document.documentElement;
    const options = { month: 'long' };

    if (secondsPast < 60) {
      const secondsAgo = parseInt(secondsPast, 10);

      return secondsAgo === 1
        ? `${secondsAgo} ${this.time.second} ${this.time.ago}`
        : `${secondsAgo} ${this.time.seconds} ${this.time.ago}`;
    }

    if (secondsPast < 3600) {
      const minutesAgo = parseInt(secondsPast / 60, 10);

      return minutesAgo === 1
        ? `${minutesAgo} ${this.time.minute} ${this.time.ago}`
        : `${minutesAgo} ${this.time.minutes} ${this.time.ago}`;
    }

    if (secondsPast <= 86400) {
      const hoursAgo = parseInt(secondsPast / 3600, 10);

      return hoursAgo === 1
        ? `${hoursAgo} ${this.time.hour} ${this.time.ago}`
        : `${hoursAgo} ${this.time.hours} ${this.time.ago}`;
    }

    const date = new Date(timestamp * 1000);
    const currentDate = new Date(now * 1000);
    const day = date.getDate();
    const month = date.toLocaleDateString(lang, options);
    const year = date.getFullYear() === currentDate.getFullYear()
      ? ''
      : `, ${date.getFullYear()}`;

    return `${month} ${day} ${year}`;
  }

  removeRecentlyViewed(handle, recentlyViewed) {
    for (let i = 0; i < recentlyViewed.length; i++) {
      if (recentlyViewed[i].handle === handle) {
        recentlyViewed.splice(i, 1);
      }
    }
    this._setRecentlyViewed(recentlyViewed);
    const cards = sessionStorage.getItem(this.storageKey)
      ? JSON.parse(sessionStorage.getItem(this.storageKey))
      : {};

    delete cards[handle];

    sessionStorage.setItem(this.storageKey, JSON.stringify(cards));

    if (recentlyViewed.length === 0) {
      this.$el.find('.product-recently-viewed--section').addClass('hide');
    }

    if (this.$carousel) {
      this.$carousel[0].removeEventListener('rimg:load', this.slideImageLoaded);
    }
  }

  clearRecentlyViewed() {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
    this.$el.find('[data-recently-viewed-card]').remove();
    this.$el.find('.product-recently-viewed--section').addClass('hide');
  }

  _onSlideImageLoaded() {
    this.flickity.resize();
  }

  _initSlider() {
    this.flickityOptions = {
      autoPlay: 0,
      accessibility: true,
      cellAlign: 'left',
      cellSelector: this.slides,
      groupCells: true,
      pageDots: false,
      contain: true,
      arrowShape: {
        x0: 10,
        x1: 60,
        y1: 50,
        x2: 65,
        y2: 45,
        x3: 20,
      },
    };

    this.flickity = new (flickity__WEBPACK_IMPORTED_MODULE_1___default())(this.$carousel[0], this.flickityOptions);

    this.$carousel[0].addEventListener('rimg:load', this.slideImageLoaded);
  }

  /**
   * Store recently viewed products
   *
   * @param {Object[]} productData - recently viewed products
   * @param {number} productData[].timestamp - indicating when product was added to productData
   * @param {string} productData[].handle - Shopify product handle
   * @private
   */
  _setRecentlyViewed(productData) {
    const now = Math.floor(Date.now() / 1000); // Unix timestamp for current date
    const minStorageTimestamp = now - this.maxStorageTime;
    const filteredData = productData.filter(item => item.timestamp > minStorageTimestamp);

    if (filteredData.length > this.maxRecentlyViewed) {
      const removeCount = filteredData.length - this.maxRecentlyViewed;
      filteredData.splice(0, removeCount); // Remove oldest if more than max number have been stored
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(filteredData));
    } catch (error) {
      console.warn(error);
    }

    // Retrieve markup for recently viewed cards and store in session
    try {
      const handles = filteredData
        ? filteredData.map(x => x.handle)
        : [];
      let storedCards = sessionStorage.getItem(this.storageKey)
        ? JSON.parse(sessionStorage.getItem(this.storageKey))
        : {};

      if (storedCards.cardSettings) {
        Object.keys(storedCards.cardSettings).forEach(key => {
          if (storedCards.cardSettings[key] !== this.cardSettings[key]) {
            storedCards = {};
            sessionStorage.removeItem(this.storageKey);
          }
        });
      }
      storedCards.cardSettings = this.cardSettings;
      const promises = handles.map(handle => {
        if (storedCards[handle]) {
          return null;
        }
        const fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=recently-viewed`;
        return jquery__WEBPACK_IMPORTED_MODULE_0___default().get(fetchUrl)
          .then(response => {
            if (response) {
              storedCards[handle] = response;

              try {
                sessionStorage.setItem(this.storageKey, JSON.stringify(storedCards));
              } catch (error) {
                console.warn(error);
              }
            }
          })
          .catch(error => console.error('Error:', error));
      });
      return promises;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  /**
   * Get stored recently viewed products
   *
   * @returns {Array}
   * @private
   */
  _getRecentlyViewed() {
    try {
      const recentlyViewed = localStorage.getItem(this.storageKey)
        ? JSON.parse(localStorage.getItem(this.storageKey))
        : [];

      return recentlyViewed;
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  _getRecentlyViewedCards() {
    const cards = sessionStorage.getItem(this.storageKey)
      ? JSON.parse(sessionStorage.getItem(this.storageKey))
      : {};

    const orderedItems = localStorage.getItem(this.storageKey)
      ? JSON.parse(localStorage.getItem(this.storageKey))
      : {};

    const markup = [];

    for (let i = orderedItems.length - 1; i >= 0; i--) {
      const cardKey = orderedItems[i].handle;

      // When store password is enabled and viewing the product page in preview
      // mode, product cards for products which have been deleted from the admin
      // will return the password page. Before inserting the card markup, we
      // need to check that it contains a product.
      const domParser = new DOMParser();
      const card = domParser.parseFromString(cards[cardKey], 'text/html');
      if (card.querySelector('.productgrid--item')) {
        markup.push(cards[cardKey]);
      }
    }

    return markup.join('');
  }
}


/***/ }

}]);