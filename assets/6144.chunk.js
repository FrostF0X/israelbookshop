(self["webpackChunk"] = self["webpackChunk"] || []).push([[6144],{

/***/ 5722
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   oM: () => (/* binding */ trapFocus),
/* harmony export */   qF: () => (/* binding */ removeTrapFocus)
/* harmony export */ });
/* unused harmony exports forceFocus, focusHash, bindInPageLinks, focusable, accessibleLinks */
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 */

/**
 * Moves focus to an HTML element
 * eg for In-page links, after scroll, focus shifts to content area so that
 * next `tab` is where user expects. Used in bindInPageLinks()
 * eg move focus to a modal that is opened. Used in trapFocus()
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 */
function forceFocus(element, options) {
  options = options || {};

  var savedTabIndex = element.tabIndex;

  element.tabIndex = -1;
  element.dataset.tabIndex = savedTabIndex;
  element.focus();
  if (typeof options.className !== 'undefined') {
    element.classList.add(options.className);
  }
  element.addEventListener('blur', callback);

  function callback(event) {
    event.target.removeEventListener(event.type, callback);

    element.tabIndex = savedTabIndex;
    delete element.dataset.tabIndex;
    if (typeof options.className !== 'undefined') {
      element.classList.remove(options.className);
    }
  }
}

/**
 * If there's a hash in the url, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - Selector for elements to not include.
 */

function focusHash(options) {
  options = options || {};
  var hash = window.location.hash;
  var element = document.getElementById(hash.slice(1));

  // if we are to ignore this element, early return
  if (element && options.ignore && element.matches(options.ignore)) {
    return false;
  }

  if (hash && element) {
    forceFocus(element, options);
  }
}

/**
 * When an in-page (url w/hash) link is clicked, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - CSS selector for elements to not include.
 */

function bindInPageLinks(options) {
  options = options || {};
  var links = Array.prototype.slice.call(
    document.querySelectorAll('a[href^="#"]')
  );

  return links.filter(function(link) {
    if (link.hash === '#' || link.hash === '') {
      return false;
    }

    if (options.ignore && link.matches(options.ignore)) {
      return false;
    }

    var element = document.querySelector(link.hash);

    if (!element) {
      return false;
    }

    link.addEventListener('click', function() {
      forceFocus(element, options);
    });

    return true;
  });
}

function focusable(container) {
  var elements = Array.prototype.slice.call(
    container.querySelectorAll(
      '[tabindex],' +
        '[draggable],' +
        'a[href],' +
        'area,' +
        'button:enabled,' +
        'input:not([type=hidden]):enabled,' +
        'object,' +
        'select:enabled,' +
        'textarea:enabled'
    )
  );

  // Filter out elements that are not visible.
  // Copied from jQuery https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js
  return elements.filter(function(element) {
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  });
}

/**
 * Traps the focus in a particular container
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Element} elementToFocus - Element to be focused on first
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 */

var trapFocusHandlers = {};

function trapFocus(container, options) {
  options = options || {};
  var elements = focusable(container);
  var elementToFocus = options.elementToFocus || container;
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = function(event) {
    if (container !== event.target && !container.contains(event.target)) {
      first.focus();
    }

    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;
    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.keyCode !== 9) return; // If not TAB key

    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  forceFocus(elementToFocus, options);
}

/**
 * Removes the trap of focus from the page
 */
function removeTrapFocus() {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
}

/**
 * Add a preventive message to external links and links that open to a new window.
 * @param {string} elements - Specific elements to be targeted
 * @param {object} options.messages - Custom messages to overwrite with keys: newWindow, external, newWindowExternal
 * @param {string} options.messages.newWindow - When the link opens in a new window (e.g. target="_blank")
 * @param {string} options.messages.external - When the link is to a different host domain.
 * @param {string} options.messages.newWindowExternal - When the link is to a different host domain and opens in a new window.
 * @param {object} options.prefix - Prefix to namespace "id" of the messages
 */
function accessibleLinks(elements, options) {
  if (typeof elements !== 'string') {
    throw new TypeError(elements + ' is not a String.');
  }

  elements = document.querySelectorAll(elements);

  if (elements.length === 0) {
    return;
  }

  options = options || {};
  options.messages = options.messages || {};

  var messages = {
    newWindow: options.messages.newWindow || 'Opens in a new window.',
    external: options.messages.external || 'Opens external website.',
    newWindowExternal:
      options.messages.newWindowExternal ||
      'Opens external website in a new window.'
  };

  var prefix = options.prefix || 'a11y';

  var messageSelectors = {
    newWindow: prefix + '-new-window-message',
    external: prefix + '-external-message',
    newWindowExternal: prefix + '-new-window-external-message'
  };

  function generateHTML(messages) {
    var container = document.createElement('ul');
    var htmlMessages = Object.keys(messages).reduce(function(html, key) {
      return (html +=
        '<li id=' + messageSelectors[key] + '>' + messages[key] + '</li>');
    }, '');

    container.setAttribute('hidden', true);
    container.innerHTML = htmlMessages;

    document.body.appendChild(container);
  }

  function externalSite(link) {
    return link.hostname !== window.location.hostname;
  }

  elements.forEach(function(link) {
    var target = link.getAttribute('target');
    var rel = link.getAttribute('rel');
    var isExternal = externalSite(link);
    var isTargetBlank = target === '_blank';
    var isRelNoopenerEmpty = rel === null || rel.indexOf('noopener') === -1;

    if (isTargetBlank && isRelNoopenerEmpty) {
      link.setAttribute('rel', 'noopener');
    }

    if (isExternal && isTargetBlank) {
      link.setAttribute('aria-describedby', messageSelectors.newWindowExternal);
    } else if (isExternal) {
      link.setAttribute('aria-describedby', messageSelectors.external);
    } else if (isTargetBlank) {
      link.setAttribute('aria-describedby', messageSelectors.newWindow);
    }
  });

  generateHTML(messages);
}

/***/ },

/***/ 6945
(module) {

module.exports = debounce;

function debounce(fn, delay, atStart, guarantee) {
  var timeout;
  var args;
  var self;

  return function debounced() {
    self = this;
    args = Array.prototype.slice.call(arguments);

    if (timeout && (atStart || guarantee)) {
      return;
    } else if (!atStart) {
      clear();

      timeout = setTimeout(run, delay);
      return timeout;
    }

    timeout = setTimeout(clear, delay);
    fn.apply(self, args);

    function run() {
      clear();
      fn.apply(self, args);
    }

    function clear() {
      clearTimeout(timeout);
      timeout = null;
    }
  };
}


/***/ },

/***/ 9009
(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{ var mod; }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var defaults = {
    modal: '.modal',
    modalInner: '.modal-inner',
    modalContent: '.modal-content',
    open: '[data-modal-open]',
    close: '[data-modal-close]',
    page: 'body',
    class: 'modal-visible',
    loadClass: 'vanilla-modal',
    clickOutside: true,
    closeKeys: [27],
    transitions: true,
    transitionEnd: null,
    onBeforeOpen: null,
    onBeforeClose: null,
    onOpen: null,
    onClose: null
  };

  function throwError(message) {
    // eslint-disable-next-line no-console
    console.error('VanillaModal: ' + message);
  }

  function find(arr, callback) {
    return function (key) {
      var filteredArray = arr.filter(callback);
      return filteredArray[0] ? filteredArray[0][key] : undefined;
    };
  }

  function transitionEndVendorSniff() {
    var el = document.createElement('div');
    var transitions = [{ key: 'transition', value: 'transitionend' }, { key: 'OTransition', value: 'otransitionend' }, { key: 'MozTransition', value: 'transitionend' }, { key: 'WebkitTransition', value: 'webkitTransitionEnd' }];
    return find(transitions, function (_ref) {
      var key = _ref.key;
      return typeof el.style[key] !== 'undefined';
    })('value');
  }

  function isPopulatedArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]' && arr.length;
  }

  function getNode(selector, parent) {
    var targetNode = parent || document;
    var node = targetNode.querySelector(selector);
    if (!node) {
      throwError(selector + ' not found in document.');
    }
    return node;
  }

  function addClass(el, className) {
    if (!(el instanceof HTMLElement)) {
      throwError('Not a valid HTML element.');
    }
    el.setAttribute('class', el.className.split(' ').filter(function (cn) {
      return cn !== className;
    }).concat(className).join(' '));
  }

  function removeClass(el, className) {
    if (!(el instanceof HTMLElement)) {
      throwError('Not a valid HTML element.');
    }
    el.setAttribute('class', el.className.split(' ').filter(function (cn) {
      return cn !== className;
    }).join(' '));
  }

  function getElementContext(e) {
    if (e && typeof e.hash === 'string') {
      return document.querySelector(e.hash);
    } else if (typeof e === 'string') {
      return document.querySelector(e);
    }
    throwError('No selector supplied to open()');
    return null;
  }

  function applyUserSettings(settings) {
    return _extends({}, defaults, settings, {
      transitionEnd: transitionEndVendorSniff()
    });
  }

  function matches(e, selector) {
    var allMatches = (e.target.document || e.target.ownerDocument).querySelectorAll(selector);
    for (var i = 0; i < allMatches.length; i += 1) {
      var node = e.target;
      while (node && node !== document.body) {
        if (node === allMatches[i]) {
          return node;
        }
        node = node.parentNode;
      }
    }
    return null;
  }

  var VanillaModal = function () {
    function VanillaModal(settings) {
      _classCallCheck(this, VanillaModal);

      this.isOpen = false;
      this.current = null;
      this.isListening = false;

      this.settings = applyUserSettings(settings);
      this.dom = this.getDomNodes();

      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.closeKeyHandler = this.closeKeyHandler.bind(this);
      this.outsideClickHandler = this.outsideClickHandler.bind(this);
      this.delegateOpen = this.delegateOpen.bind(this);
      this.delegateClose = this.delegateClose.bind(this);
      this.listen = this.listen.bind(this);
      this.destroy = this.destroy.bind(this);

      this.addLoadedCssClass();
      this.listen();
    }

    _createClass(VanillaModal, [{
      key: 'getDomNodes',
      value: function getDomNodes() {
        var _settings = this.settings,
            modal = _settings.modal,
            page = _settings.page,
            modalInner = _settings.modalInner,
            modalContent = _settings.modalContent;

        return {
          modal: getNode(modal),
          page: getNode(page),
          modalInner: getNode(modalInner, getNode(modal)),
          modalContent: getNode(modalContent, getNode(modal))
        };
      }
    }, {
      key: 'addLoadedCssClass',
      value: function addLoadedCssClass() {
        addClass(this.dom.page, this.settings.loadClass);
      }
    }, {
      key: 'setOpenId',
      value: function setOpenId(id) {
        var page = this.dom.page;

        page.setAttribute('data-current-modal', id || 'anonymous');
      }
    }, {
      key: 'removeOpenId',
      value: function removeOpenId() {
        var page = this.dom.page;

        page.removeAttribute('data-current-modal');
      }
    }, {
      key: 'open',
      value: function open(allMatches, e) {
        var page = this.dom.page;
        var _settings2 = this.settings,
            onBeforeOpen = _settings2.onBeforeOpen,
            onOpen = _settings2.onOpen;

        if (!(this.current instanceof HTMLElement === false)) {
          throwError('VanillaModal target must exist on page.');
          return;
        }
        this.releaseNode(this.current);
        this.current = getElementContext(allMatches);
        if (typeof onBeforeOpen === 'function') {
          onBeforeOpen.call(this, e);
        }
        this.captureNode(this.current);
        addClass(page, this.settings.class);
        this.setOpenId(this.current.id);
        this.isOpen = true;
        if (typeof onOpen === 'function') {
          onOpen.call(this, e);
        }
      }
    }, {
      key: 'detectTransition',
      value: function detectTransition() {
        var modal = this.dom.modal;

        var css = window.getComputedStyle(modal, null);
        return Boolean(['transitionDuration', 'oTransitionDuration', 'MozTransitionDuration', 'webkitTransitionDuration'].filter(function (i) {
          return typeof css[i] === 'string' && parseFloat(css[i]) > 0;
        }).length);
      }
    }, {
      key: 'close',
      value: function close(e) {
        var _settings3 = this.settings,
            transitions = _settings3.transitions,
            transitionEnd = _settings3.transitionEnd,
            onBeforeClose = _settings3.onBeforeClose;

        var hasTransition = this.detectTransition();
        if (this.isOpen) {
          this.isOpen = false;
          if (typeof onBeforeClose === 'function') {
            onBeforeClose.call(this, e);
          }
          removeClass(this.dom.page, this.settings.class);
          if (transitions && transitionEnd && hasTransition) {
            this.closeModalWithTransition(e);
          } else {
            this.closeModal(e);
          }
        }
      }
    }, {
      key: 'closeModal',
      value: function closeModal(e) {
        var onClose = this.settings.onClose;

        this.removeOpenId(this.dom.page);
        this.releaseNode(this.current);
        this.isOpen = false;
        this.current = null;
        if (typeof onClose === 'function') {
          onClose.call(this, e);
        }
      }
    }, {
      key: 'closeModalWithTransition',
      value: function closeModalWithTransition(e) {
        var _this = this;

        var modal = this.dom.modal;
        var transitionEnd = this.settings.transitionEnd;

        var closeTransitionHandler = function closeTransitionHandler() {
          modal.removeEventListener(transitionEnd, closeTransitionHandler);
          _this.closeModal(e);
        };
        modal.addEventListener(transitionEnd, closeTransitionHandler);
      }
    }, {
      key: 'captureNode',
      value: function captureNode(node) {
        var modalContent = this.dom.modalContent;

        while (node.childNodes.length) {
          modalContent.appendChild(node.childNodes[0]);
        }
      }
    }, {
      key: 'releaseNode',
      value: function releaseNode(node) {
        var modalContent = this.dom.modalContent;

        while (modalContent.childNodes.length) {
          node.appendChild(modalContent.childNodes[0]);
        }
      }
    }, {
      key: 'closeKeyHandler',
      value: function closeKeyHandler(e) {
        var closeKeys = this.settings.closeKeys;

        if (isPopulatedArray(closeKeys) && closeKeys.indexOf(e.which) > -1 && this.isOpen === true) {
          e.preventDefault();
          this.close(e);
        }
      }
    }, {
      key: 'outsideClickHandler',
      value: function outsideClickHandler(e) {
        var clickOutside = this.settings.clickOutside;
        var modalInner = this.dom.modalInner;

        if (clickOutside) {
          var node = e.target;
          while (node && node !== document.body) {
            if (node === modalInner) {
              return;
            }
            node = node.parentNode;
          }
          this.close(e);
        }
      }
    }, {
      key: 'delegateOpen',
      value: function delegateOpen(e) {
        var open = this.settings.open;

        var matchedNode = matches(e, open);
        if (matchedNode) {
          e.preventDefault();
          this.open(matchedNode, e);
        }
      }
    }, {
      key: 'delegateClose',
      value: function delegateClose(e) {
        var close = this.settings.close;

        if (matches(e, close)) {
          e.preventDefault();
          this.close(e);
        }
      }
    }, {
      key: 'listen',
      value: function listen() {
        var modal = this.dom.modal;

        if (!this.isListening) {
          modal.addEventListener('click', this.outsideClickHandler, false);
          document.addEventListener('keydown', this.closeKeyHandler, false);
          document.addEventListener('click', this.delegateOpen, false);
          document.addEventListener('click', this.delegateClose, false);
          this.isListening = true;
        } else {
          throwError('Event listeners already applied.');
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var modal = this.dom.modal;

        if (this.isListening) {
          this.close();
          modal.removeEventListener('click', this.outsideClickHandler);
          document.removeEventListener('keydown', this.closeKeyHandler);
          document.removeEventListener('click', this.delegateOpen);
          document.removeEventListener('click', this.delegateClose);
          this.isListening = false;
        } else {
          throwError('Event listeners already removed.');
        }
      }
    }]);

    return VanillaModal;
  }();

  exports.default = VanillaModal;
});


/***/ }

}]);