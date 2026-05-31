"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[1549],{

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


/***/ },

/***/ 1442
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticPassword)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4604);
/* harmony import */ var _Forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6383);





class StaticPassword {
  constructor(section) {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);

    this.modalForms = null;
    this.newsletterForm = null;
    this.modalContents = '[data-passwordentry]';
    this.$newsletterForm = this.$el.find('[data-password-newsletter]');

    this.modalOpen = this.onModalOpen.bind(this);
    this.modalClose = this.onModalClose.bind(this);
    this._openModal = this._openModal.bind(this);

    this.modal = new _components_Modal__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({
      onOpen: this.modalOpen,
      onClose: this.modalClose,
    });

    if (this.$newsletterForm) {
      this.newsletterForm = new _Forms__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(this.$newsletterForm);
    }

    this._checkForPasswordAttempt();
    this._bindEvents();
  }

  onSectionUnload() {
    this.$el.off('.static-password');

    if (this.newsletterForm) {
      this.newsletterForm.unload();
    }

    if (this.modalForms) {
      this.modalForms.unload();
    }
  }

  onModalOpen() {
    const $contents = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-passwordentry-contents]');
    this.modalForms = new _Forms__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A($contents);
  }

  onModalClose() {
    this.modalForms.unload();
    this.modalForms = null;
  }

  _bindEvents() {
    this.$el.on('click.static-password', '[data-passwordentry-toggle]', this._openModal);
  }

  _openModal() {
    this.modal.open(this.modalContents, 'passwordentry');
  }

  _checkForPasswordAttempt() {
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-passwordentry-errors]').length) {
      return;
    }

    this._openModal();
  }
}


/***/ }

}]);