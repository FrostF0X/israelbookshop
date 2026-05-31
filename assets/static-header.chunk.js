"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[9825],{

/***/ 8574
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var _pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7652);


const makeBlock = el => ({
  animation: (0,_pixelunion_animations__WEBPACK_IMPORTED_MODULE_0__/* .transition */ .kY)({
    el,
    state: 'open',
    stateAttribute: 'data-accordion-state',
    stateChangeAttribute: 'data-accordion-animation',
  }),
  isOpen: true,
});

const setOpenHeight = el => {
  el.style.setProperty('--menu-open-height', `${el.scrollHeight}px`);
};

class Accordion {
  constructor(el, options = {}) {
    this.el = el;
    this.options = {
      content: '[data-accordion-content]',
      animate: true,
      onStart: () => {},
      ...options,
    };

    this.blocks = new Map();
  }

  closeAll(options = {}) {
    this.el.querySelectorAll(this.options.content).forEach(block => this.close(block, options));
  }

  openAll(options = {}) {
    this.el.querySelectorAll(this.options.content).forEach(block => this.open(block, options));
  }

  open(el, options = {}) {
    this._open(el, options);
  }

  close(el, options = {}) {
    this._close(el, options);
  }

  toggle(el, options = {}) {
    const { isOpen } = this._getBlock(el);

    if (isOpen) {
      this._close(el, options);
    } else {
      this._open(el, options);
    }
  }

  unload() {
    this.blocks.forEach(({ animation }) => animation.unload());
  }

  _getBlock(el) {
    const block = el.matches(this.options.content) ? el : el.querySelector(this.options.content);
    if (!this.blocks.has(block)) {
      this.blocks.set(block, makeBlock(block));
    }

    return this.blocks.get(block);
  }

  _open(el, { onComplete = () => {}, force = !this.options.animate }) {
    const block = this._getBlock(el);
    if (block.isOpen) return;

    block.isOpen = true;
    this.options.onStart({ el: block.animation.el, state: 'open' });
    block.animation.animateTo('open', { force, onStart: ({ el }) => setOpenHeight(el) })
      .then(state => {
        if (state === 'open') {
          onComplete();
        }
      });
  }

  _close(el, { onComplete = () => {}, force = !this.options.animate }) {
    const block = this._getBlock(el);
    if (!block.isOpen) return;

    block.isOpen = false;
    this.options.onStart({ el: block.animation.el, state: 'closed' });
    setOpenHeight(block.animation.el);
    block.animation.animateTo('closed', { force })
      .then(state => {
        if (state === 'closed') {
          onComplete();
        }
      });
  }
}


/***/ },

/***/ 4524
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StaticHeader)
});

// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script = __webpack_require__(2491);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
var animations_es = __webpack_require__(7652);
// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var EventHandler = __webpack_require__(1561);
// EXTERNAL MODULE: ./source/scripts/Forms.js
var Forms = __webpack_require__(6383);
// EXTERNAL MODULE: ./source/scripts/Layout.js
var Layout = __webpack_require__(5752);
// EXTERNAL MODULE: ./source/scripts/helpers/ScrollLock.js
var ScrollLock = __webpack_require__(9534);
;// ./source/scripts/components/StickyHeader.js




class StickyHeader {
  constructor(options, settings) {
    this.body = document.querySelector('body');
    this.header = document.querySelector('[data-site-header]');
    this.menu = this.header.querySelector('[data-site-navigation]');
    this.menuToggle = options.menuToggle;
    this.postMessage = options.postMessage;

    this.settings = settings;
    this.transitioning = false;
    this.lastToggle = Date.now() - 1000;

    this.stickyClass = 'site-header-sticky';
    this.scrolledClass = 'site-header-sticky--scrolled';
    this.navOpenClass = 'site-header-nav--open';

    this.events = new EventHandler/* default */.A();

    this._toggleStickyHeader = this._toggleStickyHeader.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);

    if (this.settings.sticky_header) {
      this.body.classList.add(this.stickyClass);
      window.requestAnimationFrame(() => {
        // If browser doesn't support sticky, we don't want any of the sticky functionality.
        if (window.getComputedStyle(this.header).position.indexOf('sticky') > -1) {
          this.observer = new IntersectionObserver(entries => this._toggleStickyHeader(entries));
          this.observer.observe(document.querySelector('[data-header-intersection-target]'));

          this.toggleClick = event => {
            event.preventDefault();
            if (Layout/* default */.A.isGreaterThanBreakpoint('M')) this._toggleMenu();
          };

          this.menuToggle.addEventListener('click', this.toggleClick);
        }
      });

      this._storeHeaderHeight();
    }
  }

  _storeHeaderHeight() {
    let headerHeight = this.header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

    const transitionEndHandler = () => {
      headerHeight = this.header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      this.events.unregister(this.header, 'transitionend', transitionEndHandler);
    };

    this.events.register(this.header, 'transitionend', transitionEndHandler);
  }

  closeNavigation() {
    if (this.transitioning) { return; }

    this.menuToggle.classList.remove('active');

    this.navTransitionOutEvent = () => {
      this.header.classList.remove(this.navOpenClass);
      this.transitioning = false;
      this.menu.removeEventListener('transitionend', this.navTransitionOutEvent);
    };

    this.menu.addEventListener('transitionend', this.navTransitionOutEvent);

    this.transitioning = true;
    this.menu.setAttribute('style', `margin-top: -${this.menu.getBoundingClientRect().height}px;`);

    this.postMessage('nav:close-all');
  }

  openNavigation(onOpen = () => {}) {
    if (this.transitioning || this.header.classList.contains(this.navOpenClass)) {
      onOpen();
      return;
    }

    this.menuToggle.classList.add('active');

    this.navTransitionInEvent = () => {
      this.transitioning = false;
      this.menu.removeEventListener('transitionend', this.navTransitionInEvent);
      onOpen();
    };

    this.menu.addEventListener('transitionend', this.navTransitionInEvent);

    this.transitioning = true;

    // We need to wait for the browser to set the display to 'block' before we set the margin
    // This will help with ensuring the different animations/transitions happen in sequence
    // and not at the same time.
    window.requestAnimationFrame(() => {
      this.header.classList.add(this.navOpenClass);

      window.requestAnimationFrame(() => {
        this.menu.setAttribute('style', 'margin-top: 0;');
      });
    });
  }

  _toggleMenu() {
    if (this.header.classList.contains(this.navOpenClass)) {
      this.closeNavigation();
    } else {
      this.openNavigation();
    }
  }

  /**
   * Sticky header only shows as sticky after scroll
   *
   * @private
   */
  _toggleStickyHeader(entries) {
    if (ScrollLock/* default */.A.isLocked || !Layout/* default */.A.isGreaterThanBreakpoint('M')) {
      return;
    }

    const shouldShrink = !entries[0].isIntersecting;

    // Sticky header is scrolled, is and is visible -- nothing more to do!
    if (shouldShrink && this.header.classList.contains(this.scrolledClass)) {
      return;
    }

    // We also check to make sure the toggle hasnt activated recently to stop jerky transitions
    if (this.lastToggle + 250 > Date.now()) {
      return;
    }

    this.lastToggle = Date.now();

    if (shouldShrink) {
      this._shrink();
    } else {
      this._expand();
    }
  }

  _shrink() {
    this.closeNavigation();
    this.header.classList.add(this.scrolledClass);
    this._storeHeaderHeight();
  }

  _expand() {
    this.openNavigation();
    this.header.classList.remove(this.scrolledClass);
    this.menuToggle.classList.remove('active');
    this._storeHeaderHeight();
  }

  unload() {
    this.body.classList.remove(this.stickyClass);
    this.body.classList.remove(this.scrolledClass);

    if (this.observer) {
      this.observer.disconnect();
    }

    this.menuToggle.removeEventListener('click', this.toggleClick);

    this.events.unregisterAll();
  }
}

// EXTERNAL MODULE: ./node_modules/@shopify/theme-a11y/theme-a11y.js
var theme_a11y = __webpack_require__(5722);
// EXTERNAL MODULE: ./node_modules/@pixelunion/breakpoint/dist/cjs/index.js
var cjs = __webpack_require__(2858);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(4692);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./source/scripts/Accordion.js
var Accordion = __webpack_require__(8574);
;// ./source/scripts/components/navigation/NavMobileSubMenus.js




class NavMobileSubMenus {
  constructor(el) {
    this.$el = jquery_default()(el);

    this.Accordion = new Accordion/* default */.A(el);
    this.closeAllSubmenus();

    // Sub menu selectors
    this.activeMenuClass = 'navmenu-link-parent-active';
    this.activeMenu = `.${this.activeMenuClass}`;
    this.linkClass = 'navmenu-link-parent';
    this.linkSelector = `.${this.linkClass}`;
    this.navTrigger = '[data-navmenu-parent]';
    this.subMenu = '[data-navmenu-submenu]';
    this.buttonClass = 'navmenu-button';
    this.buttonSelector = `.${this.buttonClass}`;

    this._bindEvents();
  }

  unload() {
    this.$el.off('.mobile-nav');
    this.Accordion.unload();
  }

  closeSubMenus(current) {
    const $current = jquery_default()(current);
    $current.find(this.activeMenu).each((index, el) => {
      this._closeSubmenu(jquery_default()(el));
    });
  }

  closeAllSubmenus() {
    this.Accordion.closeAll({ force: true });
  }

  _bindEvents() {
    // Prevent focus state from applying on mouse click
    this.$el.on('mousedown.mobile-nav', '.navmenu-link', event => {
      event.preventDefault();
    });

    this.$el.on('click.mobile-nav', `${this.navTrigger} > .navmenu-link-parent`, this._linkClicked.bind(this));

    this.$el.on('click.mobile-nav', `${this.navTrigger} > .navmenu-button`, event => {
      event.preventDefault();
      this._toggleSubmenu(event);
    });
  }

  _linkClicked(event) {
    const $target = jquery_default()(event.currentTarget);

    if (!$target.hasClass(this.activeMenuClass)) {
      event.preventDefault();
      this._openSubmenu($target);
    }
  }

  _toggleSubmenu(event) {
    const $target = jquery_default()(event.currentTarget);
    const $link = $target.hasClass(this.linkClass)
      ? $target : $target.siblings(this.linkSelector).first();

    if ($link.hasClass(this.activeMenuClass)) {
      this._closeSubmenu($target);
    } else {
      this._openSubmenu($target);
    }
  }

  _openSubmenu($target) {
    const $menu = $target.siblings(this.subMenu).first();
    const $link = $target.hasClass(this.linkClass)
      ? $target
      : $target.siblings(this.linkSelector).first();
    const $button = $target.hasClass(this.buttonClass)
      ? $target
      : $target.siblings(this.buttonSelector).first();

    $link.addClass(this.activeMenuClass);

    const onComplete = () => {
      $link.attr('aria-expanded', true);
      $button.attr('aria-expanded', true);
    };

    this.Accordion.open($menu[0], { onComplete });
  }

  _closeSubmenu($target) {
    const $menu = $target.siblings(this.subMenu).first();
    const $link = $target.hasClass(this.linkClass)
      ? $target
      : $target.siblings(this.linkSelector).first();
    const $button = $target.hasClass(this.buttonClass)
      ? $target
      : $target.siblings(this.buttonSelector).first();

    $link.removeClass(this.activeMenuClass);

    const onComplete = () => {
      $link.attr('aria-expanded', false);
      $button.attr('aria-expanded', false);
    };

    this.Accordion.close($menu[0], { onComplete });
    this.closeSubMenus($menu);
  }
}

;// ./source/scripts/components/navigation/NavMobile.js








class NavMobile {
  constructor(elements) {
    this.el = elements.el;
    this.toggleOpen = elements.toggleOpen;

    this.mobileNav = this.el.querySelector('[data-mobile-nav]');
    this.navPanel = this.el.querySelector('[data-mobile-nav-panel]');
    this.navOverlay = this.el.querySelector('[data-mobile-nav-overlay]');
    this.toggleClose = this.el.querySelector('[data-mobile-nav-close]');

    this.announcementBar = document.querySelector('[data-announcement-bar]');

    this.isOpen = false;
    this.subMenus = null;

    this.events = new EventHandler/* default */.A();

    // Revert navigation to original state on breakpoint change
    this.breakpointHandler = this.onBreakpointChange.bind(this);
    cjs.onChange(this.breakpointHandler);

    this.navPanelAnimation = (0,animations_es/* transition */.kY)({ el: this.navPanel, state: 'closed' });
    this.navOverlayAnimation = (0,animations_es/* transition */.kY)({ el: this.navOverlay, state: 'closed' });

    this.events.register(this.toggleOpen, 'click', e => this._open(e));
  }

  unload() {
    this.events.unregisterAll();
    cjs.offChange(this.breakpointHandler);
    ScrollLock/* default */.A.unlock();
  }

  onBreakpointChange() {
    if (cjs.min('L') && this.isOpen) {
      this._close();
    }
  }

  _open(e) {
    e.preventDefault();
    if (cjs.min('L')) { return; }
    ScrollLock/* default */.A.lock(this.navPanel);

    if (this.announcementBar) {
      this.announcementBar.style.setProperty('--index-announcement-bar', '1100');
    }

    this.isOpen = true;

    // Activate Submenu handler
    this.subMenus = new NavMobileSubMenus(this.navPanel);

    this.mobileNav.dataset.open = 'true';
    this.navPanelAnimation.animateTo('open');
    this.navOverlayAnimation.animateTo('open');

    this.mobileNav.focus();
    (0,theme_a11y/* trapFocus */.oM)(this.mobileNav);

    this.overlayClickEvent = this.events.register(this.navOverlay, 'click', e => this._close(e));
    this.toggleCloseEvent = this.events.register(this.toggleClose, 'click', e => this._close(e));
    this.overlayTouchEvent = this.events.register(this.navOverlay, 'touchmove', e => e.preventDefault());
    this.closeEsc = this.events.register(window, 'keydown', e => {
      if (e.key === 'Escape') {
        this._close(e);
      }
    });
  }

  _close(e) {
    if (e) e.preventDefault();

    this.navPanelAnimation.animateTo('closed');
    this.navOverlayAnimation.animateTo('closed')
      .then(() => {
        this.mobileNav.dataset.open = 'false';
        (0,theme_a11y/* removeTrapFocus */.qF)(this.mobileNav);
        this.toggleOpen.focus();

        if (this.announcementBar) {
          this.announcementBar.style.setProperty('--index-announcement-bar', '');
        }
      });

    ScrollLock/* default */.A.unlock();

    this.isOpen = false;

    // Close any open drop down menus
    if (this.subMenus) {
      this.subMenus.closeSubMenus(this.navPanel);
      this.subMenus.closeAllSubmenus();

      // Unbind Mobile sub menus
      this.subMenus.unload();
    }

    this.events.unregister(this.overlayClickEvent);
    this.events.unregister(this.overlayTouchEvent);
    this.events.unregister(this.toggleCloseEvent);
    this.events.unregister(this.closeEsc);
  }
}

// EXTERNAL MODULE: ./source/scripts/helpers/site-main-dimmer.js
var site_main_dimmer = __webpack_require__(7740);
;// ./source/scripts/components/navigation/NavDesktopParent.js



 // eslint-disable-line import/no-cycle

class NavDesktopParent {
  constructor(el, options) {
    this.listitem = el;
    this.link = null;
    this.submenu = null;
    this._isOpen = false;
    this.menu = null;
    this.parentMenu = options.parentMenu;
    this.closeSiblings = this.parentMenu.closeSiblings;

    this.details = el.querySelector('[data-navmenu-details]');

    const { children } = this.details;

    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains('navmenu-link')) {
        this.link = children[i];
      } else if (children[i].classList.contains('navmenu-submenu')) {
        this.submenu = children[i];
      }
    }

    this.animation = (0,animations_es/* transition */.kY)({ el: this.submenu, state: 'closed' });

    this.open = () => {
      this._open();
    };
    this.close = () => {
      this._close();
    };
    this.closeEsc = e => {
      if (e.key === 'Escape') {
        this.link.focus();
        this.close();
      }
    };

    this.closeTimer = null;
    this.openTimer = null;
    this.mouseover = () => {
      clearTimeout(this.closeTimer);
      if (!this.submenu.classList.contains('navmenu-depth-3')) {
        this.openTimer = setTimeout(this.open, 200);
      } else {
        this.open();
      }
    };

    this.mouseout = () => {
      clearTimeout(this.openTimer);
      this.closeTimer = setTimeout(this.close, 400);
    };

    this.click = e => {
      e.stopPropagation();

      const clickedParent = e.target.closest('.navmenu-link-parent');

      // If the link being clicked is a parent link, then take control of the navigation
      if (clickedParent && clickedParent.dataset.href) {
        e.preventDefault();
        // if already open, continue to link destination
        if (this._isOpen) {
          window.location = clickedParent.dataset.href;
          return;
        }
        // If the submenu isn't open, open it
        this.open();
      }
    };

    this.focusin = e => {
      e.stopPropagation();
      if (e.target.classList.contains('navmenu-link-parent')) {
        this.closeSiblings(this);
      }
    };

    this.touchend = e => {
      e.target.focus();
      this.click(e);
    };

    this.listitem.addEventListener('mouseover', this.mouseover);
    this.listitem.addEventListener('mouseout', this.mouseout);
    this.details.addEventListener('touchend', this.touchend);
    this.details.addEventListener('click', this.click);
    this.listitem.addEventListener('focusin', this.focusin);

    document.body.addEventListener('click', this.close);
    document.body.addEventListener('focusin', this.close);
  }

  get isOpen() {
    return this._isOpen;
  }

  forceOpen() {
    return this._open(true);
  }

  forceClose() {
    return this._close(true);
  }

  _open() {
    if (this._isOpen) return;

    this._isOpen = true;
    this.details.setAttribute('open', 'open');
    site_main_dimmer/* dim */.r(this);
    this.closeSiblings(this);
    window.addEventListener('keydown', this.closeEsc);

    if (!this.menu) {
      this.menu = new NavDesktopMenu(this.submenu);
    }

    this.animation.animateTo('open', {
      hold: true,
      onStart: ({ el }) => {
        let height = 0;

        for (let i = 0; i < el.children.length; i++) {
          height += el.children[i].offsetHeight;
        }

        this.listitem.style.setProperty('--menu-open-height', `${height}px`);

        const isMeganav = this.listitem.closest('[data-navmenu-meganav-type]');

        // Check for alternate side dropdown
        const bounds = this.submenu.getBoundingClientRect();
        if (bounds.right > document.documentElement.clientWidth && !isMeganav) {
          this.listitem.classList.add('alternate-drop');
        }
      },
    })
      .then(state => {
        if (state === 'open') {
          this.link.setAttribute('aria-expanded', true);
        }
      });
  }

  _close(force = false) {
    if (!this._isOpen) return;


    if (this.menu) {
      this.menu.unload();
      this.menu = null;
    }

    this._isOpen = false;
    window.removeEventListener('keydown', this.closeEsc);

    site_main_dimmer/* clear */.I(this);

    this.listitem.classList.remove('navmenu-item--preselected');

    this.animation.animateTo('closed', { force })
      .then(state => {
        if (state === 'closed') {
          this.listitem.classList.remove('alternate-drop');
          this.link.setAttribute('aria-expanded', false);
          this.parentMenu.openSelectedBlock();
          this.details.removeAttribute('open');
        }
      });
  }

  unload() {
    this.forceClose();
    this.listitem.removeEventListener('mouseover', this.mouseover);
    this.listitem.removeEventListener('mouseout', this.mouseout);
    this.listitem.removeEventListener('touchend', this.touchend);
    this.listitem.removeEventListener('click', this.click);
    this.listitem.removeEventListener('focusin', this.focusin);

    window.removeEventListener('keydown', this.closeEsc);
    document.body.removeEventListener('click', this.bodyClose);
    document.body.removeEventListener('focusin', this.focusInClose);

    this.animation.unload();
  }
}

;// ./source/scripts/components/navigation/NavDesktopMeganavParent.js

 // eslint-disable-line import/no-cycle
 // eslint-disable-line import/no-cycle

class NavDesktopMeganavParent extends NavDesktopParent {
  constructor(el, options) {
    super(el, options);
    this.enableSubmenu = this.listitem.dataset.navmenuMeganavType === 'meganav-sidenav';
  }

  get content() {
    return this.submenu.querySelector('.navmenu-meganav-wrapper');
  }

  get openHeight() {
    return this._openHeight;
  }

  get blockId() {
    return this.submenu.dataset.meganavId;
  }

  mouseout() {
    // This prevents the menu from closing on mouseout when it's selected in the TE
    if (!this.parentMenu.shouldBlockClose(this)) return;
    this.timer = setTimeout(this.close, 400);
  }

  _open(force = false) {
    if (this._isOpen) return;

    this._isOpen = true;
    this.details.setAttribute('open', 'open');
    window.addEventListener('keydown', this.closeEsc);

    if (this.enableSubmenu && !this.menu) {
      this.menu = new NavDesktopMenu(this.listitem.querySelector('[data-navmenu]'));
      this.menu.preselectFirstItem();
    }

    // Handles the special meganav to meganav transition behaviour, where
    // the drawer appears to stay open and transition from old to new height
    const resolveOpenMeganavs = new Promise(resolve => {
      const { openMeganav } = this.parentMenu;

      if (openMeganav) {
        // Set height to start transitioning from: the open height of the previous meganav
        this.listitem.style.setProperty('--menu-closed-height', `${openMeganav.openHeight}px`);

        // Inject old meganav ghost content
        const meganavGhostContent = openMeganav.content.cloneNode(true);
        const { width, left } = openMeganav.content.getBoundingClientRect();
        meganavGhostContent.classList.add('meganav-ghost');

        // Set styles to absolutely position ghost content correctly
        meganavGhostContent.style.left = `${left}px`;
        meganavGhostContent.style.width = `${width}px`;

        this.submenu.appendChild(meganavGhostContent);

        site_main_dimmer/* dim */.r(this);

        // Jump to ghost state
        this.animation.animateTo('ghost', { force: true })
          // Close other meganav
          .then(() => this.parentMenu.openMeganav.forceClose())
          .then(resolve);
      } else {
        // If no other meganavs are open we can start immediately.
        this.listitem.style.setProperty('--menu-closed-height', 0);
        site_main_dimmer/* dim */.r(this);
        resolve();
      }
    });

    resolveOpenMeganavs
      .then(() => this.closeSiblings(this))
      .then(() => this.animation.animateTo('open', {
        force,
        hold: !force,
        onStart: ({ el }) => {
          const wrapper = el.querySelector('.navmenu-meganav-wrapper');

          const maxHeight = parseInt(window.getComputedStyle(wrapper).maxHeight, 10);
          const height = isFinite(maxHeight) ? Math.min(wrapper.scrollHeight, maxHeight) : wrapper.scrollHeight;

          this.listitem.style.setProperty('--menu-open-height', `${height}px`);
          this._openHeight = height;
        },
      }))
      .then(() => {
        this.link.setAttribute('aria-expanded', true);
        this.parentMenu.openMeganav = this;

        // Rapid mouse movement can sometimes cancel animation before ghost is removed,
        // so when things finally settle make sure we're removing all ghosts.
        this.submenu.querySelectorAll('.meganav-ghost').forEach(ghost => {
          ghost.parentNode.removeChild(ghost);
        });
      });
  }

  _close(force = false) {
    // You would expect to see something like this to avoid "double closing" menus,
    // but in practice it works more reliably to always run when the function is called,
    // to avoid out-of-sync situations.
    // if (!this._isOpen) return Promise.resolve();

    if (this.menu) {
      this.menu.unload();
      this.menu = null;
    }

    if (this.parentMenu.openMeganav === this) {
      this.parentMenu.openMeganav = null;
    }

    this._isOpen = false;
    window.removeEventListener('keydown', this.closeEsc);
    this.listitem.style.setProperty('--menu-closed-height', 0);

    site_main_dimmer/* clear */.I(this);

    return this.animation.animateTo('closed', { force })
      .then(() => {
        this.link.setAttribute('aria-expanded', false);
        this.parentMenu.openSelectedBlock();
      });
  }
}

;// ./source/scripts/components/navigation/NavDesktopMenu.js
 // eslint-disable-line import/no-cycle
 // eslint-disable-line import/no-cycle

class NavDesktopMenu {
  constructor({ children }) {
    this.parents = [];
    this.children = children;

    // Meganav, if any, that is fully open (not animating).
    this._openMeganav = null;

    // Meganav, if any, that is selected for editing in the TE.
    this._selectedBlock = null;
    this._megaNavs = null;

    this.closeSiblings = current => {
      this.parents.forEach(parent => {
        if (parent !== current) {
          parent.close();
        }
      });
    };

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.dataset.navmenuMeganavTrigger !== undefined) {
        this.parents.push(
          new NavDesktopMeganavParent(
            child,
            { parentMenu: this },
          ),
        );
      } else if (child.dataset.navmenuParent !== undefined) {
        this.parents.push(
          new NavDesktopParent(
            child,
            { parentMenu: this },
          ),
        );
      } else if (child.classList.contains('navmenu-item')) {
        child.addEventListener('focusin', this.closeSiblings);
      }
    }
  }

  get openMeganav() {
    return this._openMeganav;
  }

  set openMeganav(meganav) {
    this._openMeganav = meganav;
  }

  selectBlock(id) {
    // This is TE only, so only initialize the first time a block is selected
    if (!this._megaNavs) {
      this._megaNavs = {};
      this.parents
        .filter(parent => parent instanceof NavDesktopMeganavParent)
        .forEach(megaNav => {
          this._megaNavs[megaNav.blockId] = megaNav;
        });
    }

    const newSelectedBlock = this._megaNavs[id];

    if (this._selectedBlock === newSelectedBlock) return;

    if (this._selectedBlock) {
      this._selectedBlock.close();
    }

    this._selectedBlock = this._megaNavs[id];

    // Force open give a better experience when changing settings.
    // Otherwise the selected block visibly closes and reopens after every
    // settings change.
    this._selectedBlock.forceOpen();
  }

  openSelectedBlock() {
    if (this._selectedBlock && this.parents.filter(parent => parent.isOpen).length === 0) {
      this._selectedBlock.open();
    }
  }

  // If a block is open and selected in the TE and no other blocks are open
  // we don't want to close it when we normally would.
  shouldBlockClose(block) {
    if (block === this._selectedBlock
      && this.parents.filter(parent => parent.isOpen).length === 1) {
      return false;
    }
    return true;
  }

  preselectFirstItem() {
    const firstParent = this.parents[0];
    if (!firstParent) return;
    if (firstParent.listitem === this.children[0]) {
      firstParent.listitem.classList.add('navmenu-item--preselected');
      firstParent.open();
    }
  }

  closeAllMenus() {
    this._selectedBlock = null;
    this.parents.forEach(parent => parent.close());
  }

  unload() {
    this.parents.forEach(parent => { parent.unload(); });
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeEventListener('focusin', this.closeSiblings);
    }
  }
}

// EXTERNAL MODULE: ./source/scripts/components/search/LiveSearch.js
var LiveSearch = __webpack_require__(2238);
// EXTERNAL MODULE: ./source/scripts/components/search/SearchForm.js
var SearchForm = __webpack_require__(9266);
;// ./source/scripts/sections/StaticHeader.js












class StaticHeader {
  constructor(section) {
    this.el = section.el;
    this.settings = section.data.settings;
    this.postMessage = section.postMessage;
    this.headerSearch = null;

    this.scripts = document.querySelector('[data-scripts]');

    this.menuToggle = this.el.querySelector('[data-menu-toggle]');
    this.cartCount = this.el.querySelector('[data-header-cart-count]');
    this.searchField = this.el.querySelector('[data-live-search]');

    this.siteNavigation = this.el.querySelector('[data-site-navigation]');
    this.desktopNavigation = this.siteNavigation.querySelector('ul.navmenu-depth-1');
    this.headerTools = this.siteNavigation.querySelector('[data-header-actions]');

    this.stickyHeader = new StickyHeader({
      header: this.el,
      menuToggle: this.menuToggle,
      postMessage: this.postMessage,
    }, this.settings);

    this.navMobile = new NavMobile({
      el: this.el,
      toggleOpen: this.menuToggle,
    });

    this.navDesktop = new NavDesktopMenu(document.querySelector('.site-navigation > [data-navmenu]'));

    this.forms = new Forms/* default */.A(this.el);

    this.events = new EventHandler/* default */.A();

    if (this.settings.live_search.enable) {
      script_default()(this.scripts.dataset.shopifyApiUrl, () => {
        this.headerSearch = new LiveSearch/* default */.A({
          el: this.searchField,
          header: this.el,
        }, {
          ...this.settings.live_search,
          use_dimmer: true,
        });

        this.mobileSearchButtonEl = section.el.querySelector('[data-mobile-search-button]');

        if (this.mobileSearchButtonEl) {
          const disableAnimations = 'reduceAnimations' in document.body.dataset;

          this.mobileSearchButtonAnimation = (0,animations_es/* transition */.kY)({
            el: this.mobileSearchButtonEl,
            state: 'visible',
          });

          this.events.register(this.mobileSearchButtonEl, 'click', e => {
            e.stopPropagation();
            this.headerSearch.open();
            this.mobileSearchButtonAnimation.animateTo('hidden', { force: disableAnimations });
          });

          this.headerSearch.onClose = () => {
            this.mobileSearchButtonAnimation.animateTo('visible', { force: disableAnimations });
            this.mobileSearchButtonEl.focus();
          };
        }
      });
    } else {
      this.headerSearch = new SearchForm/* default */.A(this.searchField);
    }

    this.events.register(window, 'cartcount:update', event => {
      this.cartCount.dataset.headerCartCount = event.detail.item_count;

      if (event.detail.item_count > 0) {
        this.cartCount.classList.add('visible');
      } else {
        this.cartCount.classList.remove('visible');
      }
    });
  }

  onSectionSelect() {
    this.stickyHeader.openNavigation();
  }

  onSectionDeselect() {
    this._closeAllNavigation();
  }

  onSectionUnload() {
    this.stickyHeader.unload();
    this.navMobile.unload();
    this.navDesktop.unload();
    this.forms.unload();

    this.headerSearch.unload();

    this.events.unregisterAll();
  }

  onSectionMessage(name, data) {
    if (name === 'nav:close-all' && Layout/* default */.A.isGreaterThanBreakpoint('M')) {
      this._closeAllNavigation();
    }

    /*
      This event gets dispatched from StaticCollection.js > _fireEvent()
      It should fire when the collection page's utility bar becomes sticky
      the box-shadow on the header should be removed and placed on the
      utility bar instead.
    */
    if (name === 'collection-page:collection-utils-sticky-change') {
      this._handleStickyChange(data);
    }
  }

  onSectionBlockSelect(block) {
    if (!Layout/* default */.A.isGreaterThanBreakpoint('M')) {
      return;
    }

    this.stickyHeader.openNavigation(() => {
      this.navDesktop.selectBlock(block.id);
    });
  }

  onSectionBlockDeselect() {
    this._closeAllNavigation();
  }

  _closeAllNavigation() {
    this.navDesktop.closeAllMenus();
  }

  /*
    Remove the box-shadow when the collection page's utility bar has become sticky.
    This only needs to happen if the sticky header is enabled and if the header
    background colour is the same as the body background colour. Otherwise, no box-shadow is shown.
  */
  _handleStickyChange(data) {
    if (!this.settings.sticky_header || !this.settings.has_box_shadow) return;

    const { stuck, target } = data;
    this.el.classList.toggle('site-header-wrapper--no-shadow', stuck);
  }
}


/***/ }

}]);