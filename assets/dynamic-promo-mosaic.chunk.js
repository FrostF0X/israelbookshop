"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[7521],{

/***/ 5752
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4704);



const eventHandlers = [];
let previousBreakpoint = null;

function getBreakpoints() {
  return window
    .getComputedStyle(document.documentElement, ':before')
    .getPropertyValue('content')
    .replace(/"/g, '')
    .split(',');
}

function getBreakpoint() {
  return window
    .getComputedStyle(document.documentElement, ':after')
    .getPropertyValue('content')
    .replace(/"/g, '');
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', (0,_helpers_throttle__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(event => {
  const currentBreakpoint = getBreakpoint();

  if (previousBreakpoint !== currentBreakpoint) {
    eventHandlers.forEach(eventHandler => {
      eventHandler(event, {
        previous: previousBreakpoint,
        current: currentBreakpoint,
      });
    });
  }

  previousBreakpoint = currentBreakpoint;
}, 100));

function isLessThanBreakpoint(breakpoint, inclusive = false) {
  const breakpoints = getBreakpoints();
  const currentBreakpoint = getBreakpoint();
  const comparison = breakpoints.indexOf(currentBreakpoint) - breakpoints.indexOf(breakpoint);

  return inclusive ? comparison <= 0 : comparison < 0;
}

function isGreaterThanBreakpoint(breakpoint, inclusive = false) {
  const breakpoints = getBreakpoints();
  const currentBreakpoint = getBreakpoint();
  const comparison = breakpoints.indexOf(currentBreakpoint) - breakpoints.indexOf(breakpoint);

  return inclusive ? comparison >= 0 : comparison > 0;
}

function isBreakpoint(...breakpoints) {
  const currentBreakpoint = getBreakpoint();
  return breakpoints.some(breakpoint => breakpoint === currentBreakpoint);
}

function onBreakpointChange(eventHandler) {
  if (eventHandlers.indexOf(eventHandler) === -1) {
    eventHandlers.push(eventHandler);
  }
}

function offBreakpointChange(eventHandler) {
  const index = eventHandlers.indexOf(eventHandler);

  if (index !== -1) {
    eventHandlers.splice(index, 1);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isLessThanBreakpoint,
  isGreaterThanBreakpoint,
  isBreakpoint,
  onBreakpointChange,
  offBreakpointChange,
});


/***/ },

/***/ 4704
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ throttle)
/* harmony export */ });
function throttle(cb, delay = 250) {
  let lastCall = 0;

  return (...args) => {
    const now = new Date().getTime();

    if (now - lastCall < delay) return;

    lastCall = now;

    cb(...args);
  };
}


/***/ },

/***/ 4387
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicPromoBlocks)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4692);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5752);



// Adjusts the height of the block so it can contain the wrapper within it
const adjustHeight = block => {
  const $block = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block);
  const $wrapper = $block.find('.promo-block--content-wrapper');

  const padding = window.getComputedStyle($block[0], null).getPropertyValue('padding-top').replace('px', '');

  if ($block.innerHeight() - (padding * 2) < $wrapper.innerHeight()) {
    $block.css({ height: `${$wrapper.innerHeight() + (padding * 2)}px` });
    $wrapper.css({ transform: 'none', top: 'auto' });
  }
};

// Removes height settings on the block because they only need to be there for small screens
const resetHeight = block => {
  const $block = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block);
  const $wrapper = $block.find('.promo-block--content-wrapper');
  $block.css({ height: '' });
  $wrapper.css({ transform: '', top: '' });
};

class DynamicPromoBlocks {
  constructor(section) {
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(section.el);
    this.content = '[data-promo-block-content]';
    this.expandedClass = 'promo-block--expanded';
    this.compressBlocks = section.data.compress_blocks;

    // Revert navigation to original state on breakpoint change
    this.layoutHandler = this.onBreakpointChange.bind(this);
    _Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.onBreakpointChange(this.layoutHandler);

    this._blockInteraction = this._blockInteraction.bind(this);

    this.$el.on('click.promo-block', this.content, this._blockInteraction);
    if (!this.compressBlocks && _Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
      this.$el.find(this.content).each((index, block) => {
        adjustHeight(block);
      });
    }

    if (!this.compressBlocks) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', () => {
        this.$el.find(this.content).each((index, block) => {
          if (_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
            adjustHeight(block);
          } else {
            resetHeight(block);
          }
        });
      });
    }
  }

  /**
   * Remove block's toggled state and attributes when leaving mobile
   */
  onBreakpointChange() {
    if (!_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) {
      this.$el.find(`.${this.expandedClass}`).each((i, content) => {
        this._collapse(content);
      });

      this.$el.find(this.content).each((index, block) => {
        resetHeight(block);
      });
    } else if (!this.compressBlocks) {
      this.$el.find(this.content).each((index, block) => {
        adjustHeight(block);
      });
    }
  }

  /**
   * Unbind events when section is re-drawn
   */
  onSectionUnload() {
    this.$el.off('.promo-block');
    _Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.offBreakpointChange(this.layoutHandler);
  }

  /**
   * Callback to open block on mobile from the TE
   *
   * @param block
   */
  onSectionBlockSelect(block) {
    if (!_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) return;

    this._expand(block.el.querySelector(this.content));
  }

  /**
   * Callback to close block on mobile from the TE
   *
   * @param block
   */
  onSectionBlockDeselect(block) {
    if (!_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S')) return;

    this._collapse(block.el.querySelector(this.content));
  }

  /**
   * Expand a block on first click, then allow it to behave as normal
   *
   * @param event
   * @private
   */
  _blockInteraction(event) {
    const content = event.currentTarget;
    const clicked = content.getAttribute('data-clicked');

    // On second click, or on desktop, don't interfere with block
    if (clicked || !_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.isLessThanBreakpoint('S') || !this.compressBlocks) {
      return;
    }

    event.preventDefault();
    content.setAttribute('data-clicked', 'clicked');

    this._expand(content);
  }

  /**
   * Expand promo block
   *
   * @param content
   * @private
   */
  _expand(content) {
    if (!this.compressBlocks) {
      return;
    }

    const $content = jquery__WEBPACK_IMPORTED_MODULE_0___default()(content);

    $content
      .addClass('animating animating-in')
      .one('trend', () => {
        $content
          .removeClass('animating animating-in')
          .addClass(this.expandedClass)
          .off('trend');
        adjustHeight($content);
      });
  }

  /**
   * Collapse a block
   *
   * @param content
   * @private
   */
  _collapse(content) {
    if (!this.compressBlocks) {
      return;
    }

    const $content = jquery__WEBPACK_IMPORTED_MODULE_0___default()(content);

    $content
      .addClass('animating animating-out')
      .one('trend', () => {
        $content
          .removeClass(`animating animating-out ${this.expandedClass}`)
          .off('trend');
        content.removeAttribute('data-clicked');
        resetHeight($content);
      });
  }
}


/***/ }

}]);