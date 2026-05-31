const jquery = __webpack_require__(755);
const define_2 = __webpack_require__.n(jquery);
;
window.jQuery = define_2();
window.$ = define_2();
const jquery_trend = __webpack_require__(186);
const jquery_revealer = __webpack_require__(970);
const Object = __webpack_require__(277);
const utils = __webpack_require__.n(Object);
;
function unwrapExports(x) {
    if (x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')) {
        return x['default'];
    }
    return x;
}
function createCommonjsModule(fn, module) {
    module = {
        exports: {}
    };
    fn(module, module.exports);
    return module.exports;
}
const EventHandler_1 = createCommonjsModule(function(module, exports) {
    exports.__esModule = true;
    class EventHandler {
        constructor(){
            this.events = [];
        }
        register(el, event, listener) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events.push({
                el,
                event,
                listener
            });
            el.addEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregister({ el, event, listener }) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events = this.events.filter((e)=>el !== e.el || event !== e.event || listener !== e.listener);
            el.removeEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregisterAll() {
            this.events.forEach(({ el, event, listener })=>el.removeEventListener(event, listener));
            this.events = [];
        }
    }
    exports["default"] = EventHandler;
});
const EventHandler = unwrapExports(EventHandler_1);
function _defineProperties$1(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties$1(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        _defineProperties$1(Constructor, staticProps);
    }
    return Constructor;
}
function raf() {
    return new Promise((resolve)=>{
        window.requestAnimationFrame(resolve);
    });
}
const Animation = (()=>{
    function Animation(options) {
        this._el = options.el;
        this.cancelRunning = null;
        this._state = options.state || 'initial';
        this.initialState = this._state;
        this.stateAttribute = options.stateAttribute || 'data-animation-state';
        this.stateChangeAttribute = options.stateChangeAttribute || 'data-animation';
        this.endEvent = options.endEvent || 'transitionend';
        this.hold = !!options.hold;
        this.onStart = options.onStart || (()=>{});
        this.activeEventHandler = null;
    }
    _createClass$1(Animation, [
        {
            key: "isState",
            value: function isState(state) {
                return state === this._state;
            }
        },
        {
            key: "animateTo",
            value: function animateTo(state, options = {}) {
                const _this = this;
                const from = this._el.dataset[this.stateAttribute] || this._state;
                const to = state || this.initialState;
                const force = options.force;
                const hold = 'hold' in options ? options.hold : this.hold;
                return new Promise((resolve)=>{
                    if (_this.cancelRunning) {
                        _this.cancelRunning();
                    }
                    if (from === to) {
                        _this._el.removeAttribute(_this.stateChangeAttribute);
                        resolve(from, null);
                        return;
                    }
                    let running = true;
                    _this.cancelRunning = ()=>{
                        running = false;
                        resolve(null, null);
                    };
                    _this._el.removeEventListener(_this.endEvent, _this.activeEventHandler);
                    _this.activeEventHandler = null;
                    if (force) {
                        _this._el.setAttribute(_this.stateChangeAttribute, `${from}=>${to}`);
                        _this.onStart({
                            el: _this._el,
                            from,
                            to
                        });
                        if (typeof options.onStart === 'function') {
                            options.onStart({
                                el: _this._el,
                                from,
                                to
                            });
                        }
                        _this._el.setAttribute(_this.stateAttribute, to);
                        _this._state = to;
                        if (!hold) {
                            _this._el.removeAttribute(_this.stateChangeAttribute);
                        }
                        resolve(to, null);
                        return;
                    }
                    raf().then(()=>{
                        if (!running) {
                            throw new Error('cancelled');
                        }
                        _this._el.setAttribute(_this.stateChangeAttribute, `${from}=>${to}`);
                        _this.onStart({
                            el: _this._el,
                            from,
                            to
                        });
                        if (typeof options.onStart === 'function') {
                            options.onStart({
                                el: _this._el,
                                from,
                                to
                            });
                        }
                        return raf();
                    }).then(()=>{
                        if (!running) {
                            throw new Error('cancelled');
                        }
                        _this._el.removeEventListener(_this.endEvent, _this.activeEventHandler);
                        _this.activeEventHandler = (e)=>{
                            if (e.target !== _this._el || !running) {
                                return;
                            }
                            _this._el.removeEventListener(_this.endEvent, _this.activeEventHandler);
                            if (!hold) {
                                _this._el.removeAttribute(_this.stateChangeAttribute);
                            }
                            resolve(to, e);
                        };
                        _this._el.addEventListener(_this.endEvent, _this.activeEventHandler);
                        _this._el.setAttribute(_this.stateAttribute, to);
                        _this._state = to;
                    })["catch"]((error)=>{
                        if (error.message !== 'cancelled') {
                            throw error;
                        }
                    });
                });
            }
        },
        {
            key: "unload",
            value: function unload() {
                this._el.removeEventListener(this.endEvent, this.activeEventHandler);
                this.activeEventHandler = null;
            }
        },
        {
            key: "el",
            get: function get() {
                return this._el;
            }
        },
        {
            key: "state",
            get: function get() {
                return this._state;
            }
        }
    ]);
    return Animation;
})();
function transition(options) {
    return new Animation(options);
}
const justDebounce = debounce;
function debounce(fn, delay, atStart, guarantee) {
    let timeout;
    let args;
    let self;
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
class FAQ {
    constructor(section){
        var _this = this;
        this.el = section.el;
        this.events = new EventHandler();
        this.summaryEls = this.el.querySelectorAll('[data-faq-summary]');
        this.categories = this.el.querySelector('[data-faq-categories]');
        this.viewAll = this.el.querySelector('[data-faq-view-all]');
        this.animations = {};
        this.closedState = 'closed';
        this.openState = 'open';
        this.initAnimations();
        this.events.register(this.viewAll, 'click', ()=>_this.animateCategories());
        this.summaryEls.forEach((summary)=>{
            _this.events.register(summary, 'click', (event)=>_this.animateAccordion(event));
        });
    }
    initAnimations() {
        const _this2 = this;
        this.summaryEls.forEach((summary)=>{
            const currentAnswerEl = summary.nextElementSibling;
            const currentDetailsEl = summary.closest('[data-faq-details]');
            const index = currentAnswerEl.dataset.faqAnswerIndex;
            _this2.animations[index] = transition({
                el: currentAnswerEl,
                state: _this2.closedState
            });
            currentDetailsEl.style.setProperty('--closed-height', `${summary.offsetHeight}px`);
        });
        this.categoryAnimation = transition({
            el: this.categories,
            state: 'closed'
        });
    }
    animateAccordion(event) {
        event.preventDefault();
        const summary = event.currentTarget;
        const currentAnswerEl = summary.nextElementSibling;
        const currentDetailsEl = summary.closest('[data-faq-details]');
        if (currentAnswerEl.dataset.animation) {
            return;
        }
        if (currentAnswerEl.dataset.animationState == this.openState) {
            this.closeAccordion(currentDetailsEl);
        } else {
            this.openAccordion(currentDetailsEl);
        }
    }
    animateCategories() {
        this.viewAll.classList.toggle('faq__categories-view-all--active');
        if (this.viewAll.classList.contains('faq__categories-view-all--active')) {
            this.openCategories();
        } else {
            this.closeCategories();
        }
    }
    openCategories() {
        const _this3 = this;
        this.categoryAnimation.animateTo('open', {
            onStart: function onStart(_ref) {
                const _ref_el = _ref.el;
                _this3.updateCategoriesHeight(_ref_el);
                _this3.events.register(window, 'resize', justDebounce(()=>_this3.updateCategoriesHeight(_ref_el), 100));
            }
        });
    }
    closeCategories() {
        this.categoryAnimation.animateTo('closed');
    }
    updateCategoriesHeight(el) {
        const _el$querySelector = el.querySelector('[data-faq-categories-list]');
        const scrollHeight = _el$querySelector.scrollHeight;
        el.style.setProperty('--open-height', `${scrollHeight}px`);
    }
    openAccordion(detailsEl) {
        if (detailsEl.classList.contains('faq__categories-list-item')) {
            return;
        }
        const answerEl = detailsEl.querySelector('[data-faq-answer]');
        const answerIndex = answerEl.dataset.faqAnswerIndex;
        detailsEl.classList.add('faq__details--open');
        detailsEl.setAttribute('open', '');
        this.animations[answerIndex].animateTo(this.openState, {
            onStart: function onStart(_ref2) {
                const _ref2_el = _ref2.el;
                const _el$querySelector2 = _ref2_el.querySelector('[data-faq-answer-content]');
                const scrollHeight = _el$querySelector2.scrollHeight;
                _ref2_el.style.setProperty('--open-height', `${scrollHeight}px`);
            }
        });
    }
    closeAccordion(detailsEl) {
        if (detailsEl.classList.contains('faq__categories-list-item')) {
            return;
        }
        const answerIndex = detailsEl.querySelector('[data-faq-answer]').dataset.faqAnswerIndex;
        detailsEl.classList.remove('faq__details--open');
        this.animations[answerIndex].animateTo(this.closedState).then(()=>{
            detailsEl.removeAttribute('open');
        });
    }
    onSectionBlockSelect(block) {
        this.openAccordion(block.el);
    }
    onSectionBlockDeselect(block) {
        this.closeAccordion(block.el);
    }
    onSectionUnload() {
        const _this4 = this;
        this.events.unregisterAll();
        Object.keys(this.animations).forEach((key)=>{
            _this4.animations[key].unload();
        });
        this.animations = {};
    }
}
const index_es = FAQ;
;
function getDecimalDegrees(firstComponent = 0, secondComponent = 0, thirdComponent = 0, fourthComponent = 0) {
    const directions = {
        N: 1,
        E: 1,
        S: -1,
        W: -1
    };
    let decimalDegrees = 0;
    const components = [
        firstComponent,
        secondComponent,
        thirdComponent,
        fourthComponent
    ];
    for(let i = 0; i < components.length; i++){
        const component = components[i];
        if (component) {
            if (Number.isNaN(parseFloat(component))) {
                decimalDegrees *= directions[component];
            } else {
                decimalDegrees += parseFloat(component) / 60 ** i;
            }
        }
    }
    return decimalDegrees;
}
function getLatitudeLongitude(address) {
    const latLongDegreesMinutesSeconds = /^([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2})(?:'[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:"[ ]?| )?(N|E|S|W) ?([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2})(?:'[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:"[ ]?| )?(N|E|S|W)$/g;
    const latLongDegreesMinutes = /^([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:'[ ]?| )?(N|E|S|W) ?([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:'[ ]?| )?(N|E|S|W)$/g;
    const latLongDegrees = /^([-|+]?[0-9]{1,3}(?:\.[0-9]+)?)(?:°[ ]?| )?(N|E|S|W)?,? ?([-|+]?[0-9]{1,3}(?:\.[0-9]+)?)(?:°[ ]?| )?(N|E|S|W)?$/g;
    const latLongFormats = [
        latLongDegreesMinutesSeconds,
        latLongDegreesMinutes,
        latLongDegrees
    ];
    const latLongMatches = latLongFormats.map((latLongFormat)=>address.match(latLongFormat));
    const latLongMatch = latLongMatches.reduce((accumulator, value, index)=>{
        if (!accumulator && value) {
            const latLongResult = latLongFormats[index].exec(address);
            const lat = latLongResult.slice(1, latLongResult.length / 2 + 1);
            const lng = latLongResult.slice(latLongResult.length / 2 + 1, latLongResult.length);
            return {
                lat,
                lng
            };
        }
        return accumulator;
    }, null);
    return new Promise((resolve, reject)=>{
        if (latLongMatch) {
            const latDecimalDegrees = getDecimalDegrees(...latLongMatch.lat);
            const longDecimalDegrees = getDecimalDegrees(...latLongMatch.lng);
            resolve({
                lat: latDecimalDegrees,
                lng: longDecimalDegrees
            });
        } else {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address
            }, (results, status)=>{
                if (status !== google.maps.GeocoderStatus.OK || !results[0]) {
                    reject(status);
                } else {
                    resolve(results[0].geometry.location);
                }
            });
        }
    });
}
function getMapStyles(colors) {
    if (!colors) {
        return [];
    }
    return [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: colors.e
                }
            ]
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: colors.a
                }
            ]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: colors.e
                }
            ]
        },
        {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'administrative.country',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'administrative.land_parcel',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'administrative.neighborhood',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'administrative.locality',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'poi',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: colors.d
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
                {
                    color: colors.c
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: colors.b
                }
            ]
        },
        {
            featureType: 'road.highway.controlled_access',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: colors.b
                }
            ]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: colors.e
                }
            ]
        },
        {
            featureType: 'transit',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: colors.f
                }
            ]
        }
    ];
}
function createMap({ container, address, zoom, colors }) {
    return getLatitudeLongitude(address).then((latLong)=>{
        const map = new google.maps.Map(container, {
            center: latLong,
            clickableIcons: false,
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            gestureHandling: 'none',
            keyboardShortcuts: false,
            maxZoom: zoom,
            minZoom: zoom,
            scrollWheel: false,
            styles: getMapStyles(colors),
            zoom,
            zoomControl: false
        });
        new google.maps.Marker({
            clickable: false,
            map,
            position: map.getCenter()
        });
        map.panBy(0, 0);
    })["catch"]((status)=>{
        const usageLimits = 'https://developers.google.com/maps/faq#usagelimits';
        let errorMessage;
        switch(status){
            case 'ZERO_RESULTS':
                errorMessage = `<p>Unable to find the address:</p> ${address}`;
                break;
            case 'OVER_QUERY_LIMIT':
                errorMessage = `\n            <p>Unable to load Google Maps, you have reached your usage limit.</p>\n            <p>\n              Please visit\n              <a href="${usageLimits}" target="_blank">${usageLimits}</a>\n              for more details.\n            </p>\n          `;
                break;
            default:
                errorMessage = 'Unable to load Google Maps.';
                break;
        }
        throw errorMessage;
    });
}
function displayErrorInThemeEditor(container, errorMessage) {
    const isThemeEditor = window.Shopify && window.Shopify.designMode;
    if (!isThemeEditor) {
        return;
    }
    container.innerHTML = `<div class="map-error-message">${errorMessage}</div>`;
}
const PxsMap = function PxsMap(section) {
    const _this = this;
    this.map = null;
    const el = section.el.querySelector('[data-map]');
    const container = el.querySelector('[data-map-container]');
    const settings = section.data;
    const { address, colors, api_key: apiKey } = settings;
    const zoom = Number.isNaN(settings.zoom) ? 13 : 11 + parseInt(settings.zoom, 10);
    if (apiKey) {
        if (window.googleMaps === undefined) {
            utils()(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`, ()=>{
                window.googleMaps = true;
                createMap({
                    container,
                    address,
                    zoom,
                    colors
                }).then((map)=>{
                    _this.map = map;
                })["catch"]((error)=>displayErrorInThemeEditor(container, error));
            });
        } else {
            createMap({
                container,
                address,
                zoom,
                colors
            }).then((map)=>{
                _this.map = map;
            })["catch"]((error)=>displayErrorInThemeEditor(container, error));
        }
    }
};
const dist_index_es = PxsMap;
;
function index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        index_es_defineProperties(Constructor, staticProps);
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
const scrollLock = __webpack_require__(265);
const isbot = __webpack_require__(458);
function getAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || m === 0 && today.getDate() < birthdate.getDate()) {
        age--;
    }
    return age;
}
const SiteAgeGate = (()=>{
    function SiteAgeGate(el) {
        this._el = el;
        this._ageGateForm = el.querySelector('[data-age-gate]');
        this._ageGateErrorEl = this._ageGateForm.querySelector('[data-age-gate-error]');
        this._requiredAge = this._ageGateForm.dataset.requiredAge;
        this._el.addEventListener('age-gate:open', this._open.bind(this));
        this._el.addEventListener('age-gate:close', this._close.bind(this));
        this._ageGateForm.addEventListener('submit', this._onFormSubmit.bind(this));
        if (isbot(navigator.userAgent)) {
            this._close();
        } else if (this._el.style.display === '') {
            this._open();
        }
    }
    index_es_createClass(SiteAgeGate, [
        {
            key: "_open",
            value: function _open() {
                scrollLock.disablePageScroll();
                this._el.style.display = '';
            }
        },
        {
            key: "_close",
            value: function _close() {
                scrollLock.enablePageScroll();
                this._el.style.display = 'none';
            }
        },
        {
            key: "_onFormSubmit",
            value: function _onFormSubmit(event) {
                event.preventDefault();
                event.stopPropagation();
                const data = new FormData(event.target);
                const day = data.get('day');
                const month = data.get('month');
                const year = data.get('year');
                if (day === '' || month === '' || year === '') {
                    return;
                }
                const age = getAge(new Date(year, month, day));
                if (age >= this._requiredAge) {
                    this._close();
                    sessionStorage.setItem('age-gate', age);
                } else {
                    this._ageGateErrorEl.style.display = '';
                }
            }
        }
    ]);
    return SiteAgeGate;
})();
const PageAgeGate = (()=>{
    function PageAgeGate() {
        this._ageGateEl = document.getElementById('age-gate-page');
    }
    index_es_createClass(PageAgeGate, [
        {
            key: "onSectionLoad",
            value: function onSectionLoad() {
                const openEvent = new CustomEvent('age-gate:open');
                if (this._ageGateEl) {
                    this._ageGateEl.dispatchEvent(openEvent);
                }
            }
        },
        {
            key: "onSectionSelect",
            value: function onSectionSelect() {
                const openEvent = new CustomEvent('age-gate:open');
                if (this._ageGateEl) {
                    this._ageGateEl.dispatchEvent(openEvent);
                }
            }
        },
        {
            key: "onSectionDeselect",
            value: function onSectionDeselect() {
                const node = new CustomEvent('age-gate:close');
                if (this._ageGateEl) {
                    this._ageGateEl.dispatchEvent(node);
                }
            }
        }
    ]);
    return PageAgeGate;
})();
;
function defaultTemplateRender(template, size) {
    return template.replace('{size}', `${size.width}x${size.height}`);
}
const defaults = {
    scale: 1,
    template: false,
    templateRender: defaultTemplateRender,
    max: {
        width: Infinity,
        height: Infinity
    },
    round: 32,
    placeholder: false,
    crop: null
};
function Object_4(Object, Object, Object, Object) {
    const attr = `data-rimg-${Object}`;
    if (!Object.hasAttribute(attr)) {
        return Object[Object] || defaults[Object];
    }
    const value = Object.getAttribute(attr);
    if (Object) {
        return Object(value);
    }
    return value;
}
function parseSize(value) {
    value = value.split('x');
    return {
        width: parseInt(value[0], 10),
        height: parseInt(value[1], 10)
    };
}
function Object_2(value) {
    switch(value){
        case 'top':
        case 'center':
        case 'bottom':
        case 'left':
        case 'right':
            return value;
        default:
            return null;
    }
}
function parseItem(Object, Object = {}) {
    const isImage = Object.hasAttribute('data-rimg-template');
    return {
        el: Object,
        isImage,
        isBackgroundImage: isImage && Object.tagName !== 'IMG',
        scale: parseInt(Object_4(Object, 'scale', Object)),
        density: window.devicePixelRatio || 1,
        template: Object_4(Object, 'template', Object),
        templateRender: Object.templateRender || defaults.templateRender,
        max: Object_4(Object, 'max', Object, parseSize),
        round: Object_4(Object, 'round', Object),
        placeholder: Object_4(Object, 'placeholder', Object, parseSize),
        crop: Object_4(Object, 'crop', Object, Object_2)
    };
}
function roundSize(size, multiple = 32, maxLimit = Infinity) {
    if (size === 0) {
        return multiple;
    }
    return Math.min(Math.ceil(size / multiple) * multiple, maxLimit);
}
function getElementSize(el) {
    const size = {
        width: 0,
        height: 0
    };
    while(el){
        size.width = el.offsetWidth;
        size.height = el.offsetHeight;
        if (size.width > 20 && size.height > 20) {
            break;
        }
        el = el.parentNode;
    }
    return size;
}
function supportedDensity(item, size) {
    return Math.min(Math.min(Math.max(item.max.width / size.width, 1), item.density), Math.min(Math.max(item.max.height / size.height, 1), item.density)).toFixed(2);
}
function trigger(el, name) {
    const event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return !el.dispatchEvent(event);
}
function setImage(item, size, isPlaceholder, onLoad) {
    const render = item.templateRender;
    const density = isPlaceholder ? 1 : supportedDensity(item, size);
    const round = isPlaceholder ? 1 : item.round;
    const targetWidth = size.width * density;
    const targetHeight = size.height * density;
    let displaySize;
    if (item.crop) {
        displaySize = {
            width: roundSize(targetWidth, round, item.max.width),
            height: roundSize(targetHeight, round, item.max.height)
        };
    } else {
        const containerAspectRatio = size.width / size.height;
        const imageAspectRatio = item.max.width / item.max.height;
        if (containerAspectRatio > imageAspectRatio) {
            displaySize = {
                width: roundSize(targetWidth, round, item.max.width),
                height: roundSize(targetWidth / imageAspectRatio, round, item.max.height)
            };
        } else {
            displaySize = {
                width: roundSize(targetHeight * imageAspectRatio, round, item.max.width),
                height: roundSize(targetHeight, round, item.max.height)
            };
        }
    }
    const url = render(item.template, displaySize);
    const image = new Image();
    image.onload = onLoad;
    image.src = url;
    if (item.isBackgroundImage) {
        item.el.style.backgroundImage = `url('${url}')`;
    } else {
        item.el.setAttribute('srcset', `${url} ${density}x`);
    }
}
function loadFullImage(item, size) {
    const item_el = item.el;
    setImage(item, size, false, (event)=>{
        if (event.type === 'load') {
            item_el.setAttribute('data-rimg', 'loaded');
        } else {
            item_el.setAttribute('data-rimg', 'error');
            trigger(item_el, 'rimg:error');
        }
        trigger(item_el, 'rimg:load');
    });
}
function loadImage(item) {
    const item_el = item.el;
    const status = item_el.getAttribute('data-rimg');
    if (status === 'loading' || status === 'loaded') {
        return;
    }
    if (!item.isBackgroundImage) {
        if (item_el.naturalWidth === 0 || !item_el.complete) {
            item_el.addEventListener('load', function cb() {
                item_el.removeEventListener('load', cb);
                loadImage(item);
            });
            return;
        }
    }
    if (trigger(item_el, 'rimg:loading')) {
        return;
    }
    item_el.setAttribute('data-rimg', 'loading');
    const size = getElementSize(item.el);
    size.width *= item.scale;
    size.height *= item.scale;
    if (item.placeholder) {
        if (!item.isBackgroundImage) {
            item_el.setAttribute('width', Math.min(Math.floor(item.max.width / item.density), size.width));
            item_el.setAttribute('height', Math.min(Math.floor(item.max.height / item.density), size.height));
        }
        setImage(item, item.placeholder, true, ()=>loadFullImage(item, size));
    } else {
        loadFullImage(item, size);
    }
}
function load(node, options) {
    if (!node) {
        return;
    }
    trigger(node, 'rimg:enter');
    const item = parseItem(node, options);
    if (item.isImage) {
        if (!item.isBackgroundImage) {
            node.setAttribute('data-rimg-template-svg', node.getAttribute('srcset'));
        }
        loadImage(item);
    }
}
function update(el, options) {
    if (!el) {
        return;
    }
    trigger(el, 'rimg:update');
    const item = parseItem(el, options);
    if (item.isImage) {
        if (!item.isBackgroundImage) {
            el.setAttribute('data-rimg', 'lazy');
            el.setAttribute('srcset', el.getAttribute('data-rimg-template-svg'));
        }
        loadImage(item);
    }
}
function inViewport(el) {
    if (!el.offsetWidth || !el.offsetHeight || !el.getClientRects().length) {
        return false;
    }
    const root = document.documentElement;
    const width = Math.min(root.clientWidth, window.innerWidth);
    const height = Math.min(root.clientHeight, window.innerHeight);
    const rect = el.getBoundingClientRect();
    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= height && rect.left <= width;
}
function rimg(selector = '[data-rimg="lazy"]', options = {}) {
    const io = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                io.unobserve(entry.target);
                load(entry.target, options);
            }
        });
    }, {
        rootMargin: '20% 0px'
    });
    const api = {
        track: function Object(Object = '[data-rimg="lazy"]') {
            const els = querySelector(Object);
            for(let i = 0; i < els.length; i++){
                if (inViewport(els[i])) {
                    load(els[i], options);
                } else {
                    io.observe(els[i]);
                }
            }
        },
        update: function update$1(selector = '[data-rimg="loaded"]') {
            const els = querySelector(selector);
            for(let i = 0; i < els.length; i++){
                update(els[i], options);
            }
        },
        untrack: function untrack(selector = '[data-rimg]') {
            const els = querySelector(selector);
            for(let i = 0; i < els.length; i++){
                io.unobserve(els[i]);
            }
        },
        load: function load$1(selector = '[data-rimg]') {
            const els = querySelector(selector);
            for(let i = 0; i < els.length; i++){
                load(els[i], options);
            }
        },
        unload: function unload() {
            io.disconnect();
        }
    };
    api.track(selector);
    return api;
}
function querySelector(selector) {
    if (typeof selector === 'string') {
        return document.querySelectorAll(selector);
    }
    if (selector instanceof HTMLElement) {
        return [
            selector
        ];
    }
    if (selector instanceof NodeList) {
        return selector;
    }
    return [];
}
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let matches_length = matches.length;
        while(--matches_length >= 0 && matches.item(matches_length) !== this){}
        return matches_length > -1;
    };
}
const state = {
    init,
    watch,
    unwatch,
    load: load$1
};
function init(selector = '[data-rimg="lazy"]', options = {}) {
    state.selector = selector;
    state.instance = rimg(selector, options);
    state.loadedWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    document.addEventListener('shopify:section:load', (event)=>watch(event.target));
    window.addEventListener('resize', ()=>_update());
    document.addEventListener('shopify:section:unload', (event)=>unwatch(event.target));
    document.addEventListener('theme:rimg:watch', (event)=>watch(event.target));
    document.addEventListener('theme:rimg:unwatch', (event)=>unwatch(event.target));
    if (window.jQuery) {
        jQuery(document).on({
            'theme:rimg:watch': function themeRimgWatch(event) {
                return watch(event.target);
            },
            'theme:rimg:unwatch': function themeRimgUnwatch(event) {
                return unwatch(event.target);
            }
        });
    }
}
function watch(el) {
    if (typeof el.matches === 'function' && el.matches(state.selector)) {
        state.instance.track(el);
    }
    state.instance.track(el.querySelectorAll(state.selector));
}
function unwatch(el) {
    state.instance.untrack(el.querySelectorAll(state.selector));
    if (typeof el.matches === 'function' && el.matches(state.selector)) {
        state.instance.untrack(el);
    }
}
function load$1(el) {
    if (typeof el.matches === 'function' && el.matches(state.selector)) {
        state.instance.load(el);
    }
    state.instance.load(el.querySelectorAll(state.selector));
}
function _update() {
    const currentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (currentWidth / state.loadedWidth > 0.5 && currentWidth / state.loadedWidth < 2) {
        return;
    }
    state.loadedWidth = currentWidth;
    state.instance.update();
}
const rimg_shopify_dist_index_es = state;
;
class LazyLoader {
    constructor(options){
        const defaultOptions = {
            rootMargin: '30%',
            threshold: 0
        };
        this.callbacks = new WeakMap();
        this._observerCallback = this._observerCallback.bind(this);
        this.observer = new IntersectionObserver(this._observerCallback, {
            ...defaultOptions,
            ...options
        });
    }
    add(target, callback) {
        this.callbacks.set(target, callback);
        this.observer.observe(target);
    }
    remove(target) {
        this.observer.unobserve(target);
        this.callbacks.delete(target);
    }
    unload() {
        this.observer.disconnect();
    }
    _observerCallback(module, module) {
        module.forEach(({ isIntersecting: module, target: module })=>{
            if (module === true) {
                module.unobserve(module);
                const callback = this.callbacks.get(module);
                if (typeof callback === 'function') {
                    callback();
                }
                this.callbacks.delete(module);
            }
        });
    }
}
class Sections {
    constructor(){
        this.handlers = {};
        this.instances = {};
        this.options = {};
        this.imports = {};
        this.lazyLoader = null;
        this._onSectionEvent = this._onSectionEvent.bind(this);
        document.addEventListener('shopify:section:load', this._onSectionEvent);
        document.addEventListener('shopify:section:unload', this._onSectionEvent);
        document.addEventListener('shopify:section:select', this._onSectionEvent);
        document.addEventListener('shopify:section:deselect', this._onSectionEvent);
        document.addEventListener('shopify:block:select', this._onSectionEvent);
        document.addEventListener('shopify:block:deselect', this._onSectionEvent);
    }
    unbind() {
        document.removeEventListener('shopify:section:load', this._onSectionEvent);
        document.removeEventListener('shopify:section:unload', this._onSectionEvent);
        document.removeEventListener('shopify:section:select', this._onSectionEvent);
        document.removeEventListener('shopify:section:deselect', this._onSectionEvent);
        document.removeEventListener('shopify:block:select', this._onSectionEvent);
        document.removeEventListener('shopify:block:deselect', this._onSectionEvent);
        for(let i = 0; i < this.instances.length; i++){
            this._triggerInstanceEvent(this.instances[i], 'onSectionUnload');
        }
        this.handlers = {};
        this.options = {};
        this.lazyLoader.unload();
        this.lazyLoader = null;
        this.instances = {};
    }
    register(type, handler, options = {}) {
        if (this.handlers[type]) {
            console.warn(`Sections: section handler already exists of type '${type}'.`);
        }
        this.handlers[type] = handler;
        this.options[type] = options;
        this._initSections(type);
    }
    _initSections(type) {
        const dataEls = document.querySelectorAll(`[data-section-type="${type}"]`);
        if (!dataEls) {
            return;
        }
        for (const dataEl of dataEls){
            const el = dataEl.parentNode;
            const idEl = el.querySelector('[data-section-id]');
            if (!idEl) {
                console.warn(`Sections: unable to find section id for '${type}'.`, el);
                continue;
            }
            const sectionId = idEl.getAttribute('data-section-id');
            if (!sectionId) {
                console.warn(`Sections: unable to find section id for '${type}'.`, el);
                continue;
            }
            if (this.options[type] && this.options[type].lazy) {
                if (this.lazyLoader === null) {
                    this.lazyLoader = new LazyLoader();
                }
                this.lazyLoader.add(el, ()=>this._createInstance(sectionId, el));
            } else {
                this._createInstance(sectionId, el);
            }
        }
    }
    _onSectionEvent(event) {
        const event_target = event.target;
        const { sectionId, blockId } = event.detail;
        let instance = this.instances[sectionId];
        switch(event.type){
            case 'shopify:section:load':
                instance = this._createInstance(sectionId, event_target);
                this._triggerInstanceEvent(instance, 'onSectionLoad', {
                    el: event_target,
                    id: sectionId
                });
                break;
            case 'shopify:section:unload':
                this._triggerInstanceEvent(instance, 'onSectionUnload', {
                    el: event_target,
                    id: sectionId
                });
                if (this.lazyLoader) {
                    this.lazyLoader.remove(event_target);
                }
                delete this.instances[sectionId];
                break;
            case 'shopify:section:select':
                this._triggerInstanceEvent(instance, 'onSectionSelect', {
                    el: event_target,
                    id: sectionId
                });
                break;
            case 'shopify:section:deselect':
                this._triggerInstanceEvent(instance, 'onSectionDeselect', {
                    el: event_target,
                    id: sectionId
                });
                break;
            case 'shopify:block:select':
                this._triggerInstanceEvent(instance, 'onSectionBlockSelect', {
                    el: event_target,
                    id: blockId
                });
                break;
            case 'shopify:block:deselect':
                this._triggerInstanceEvent(instance, 'onSectionBlockDeselect', {
                    el: event_target,
                    id: blockId
                });
                break;
            default:
                break;
        }
    }
    _triggerInstanceEvent(instance, eventName, ...args) {
        if (instance && instance[eventName]) {
            instance[eventName](...args);
        }
    }
    _postMessage(name, data) {
        Object.keys(this.instances).forEach((id)=>{
            this._triggerInstanceEvent(this.instances[id], 'onSectionMessage', name, data);
        });
    }
    _createInstance(id, el) {
        const typeEl = el.querySelector('[data-section-type]');
        if (!typeEl) {
            return;
        }
        const type = typeEl.getAttribute('data-section-type');
        if (!type) {
            return;
        }
        const handler = this.handlers[type];
        if (!handler) {
            console.warn(`Sections: unable to find section handler for type '${type}'.`);
            return;
        }
        const data = this._loadData(el);
        const postMessage = this._postMessage.bind(this);
        const handlerParams = {
            id,
            type,
            el,
            data,
            postMessage
        };
        if (!this.imports[type]) {
            const handlerReturn = handler(handlerParams);
            if (handlerReturn instanceof Promise) {
                handlerReturn.then(({ default: Component })=>{
                    this.imports[type] = ()=>new Component(handlerParams);
                    this.instances[id] = new Component(handlerParams);
                });
            } else {
                this.imports[type] = handler;
                this.instances[id] = handlerReturn;
            }
        } else {
            this.instances[id] = this.imports[type](handlerParams);
        }
        return this.instances[id];
    }
    _loadData(el) {
        const dataEl = el.querySelector('[data-section-data]');
        if (!dataEl) {
            return {};
        }
        const data = dataEl.getAttribute('data-section-data') || dataEl.innerHTML;
        try {
            return JSON.parse(data);
        } catch (error) {
            console.warn(`Sections: invalid section data found. ${error.message}`);
            return {};
        }
    }
}
;
const polyfillUrls = [];
if (!('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
    polyfillUrls.push(document.querySelector('[data-scripts]').dataset.pxuPolyfills);
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        let el = this;
        do {
            if (Element.prototype.matches.call(el, s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        }while (el !== null && el.nodeType === 1)
        return null;
    };
}
const checkPolyfills = polyfillUrls;
;
class StaticAnnouncement {
    constructor(section){
        if (window.Shopify && window.Shopify.designMode) {
            section.postMessage('announcement:load');
        }
    }
}
const fitvids = __webpack_require__(729);
const fitvids_default = __webpack_require__.n(fitvids);
const dist = __webpack_require__(263);
const dist_default = __webpack_require__.n(dist);
;
class RichText {
    constructor($el){
        this.$el = $($el);
        this._initExternalLinks();
        this.groupedContent = null;
        if (this.$el.length) {
            this.groupedContent = new (dist_default())(this.$el.get(0), {
                layout: 'tabs',
                intelliparse: false
            });
            fitvids_default()('.rte');
        }
    }
    unload() {
        if (this.groupedContent) {
            this.groupedContent.unload();
        }
    }
    _initExternalLinks() {
        const anchors = this.$el.find('a[href^="http"]').filter((i, el)=>el.href.indexOf(location.hostname) === -1);
        anchors.attr('target', '_blank');
    }
}
;
class Forms {
    constructor(el, selector = '.form-field-input'){
        this.$el = define_2()(el);
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
        this.$el.find(this.fieldSelector).each((i, el)=>{
            if (define_2()(el).hasClass(this.filledClass)) {
                return;
            }
            this._toggleFilled(null, el);
        });
    }
    _toggleFilled(event = null, el = false) {
        const target = event ? event.currentTarget : el;
        const $target = define_2()(target);
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
;
class StaticArticle {
    constructor(section){
        this.$el = define_2()(section.el);
        this.$commentForm = this.$el.find('[data-articlecomments-form]');
        this.richText = new RichText(this.$el);
        if (this.$commentForm.length) {
            this.commentForm = new Forms(this.$commentForm);
        }
    }
    onSectionUnload() {
        this.richText.unload();
        if (this.commentForm) {
            this.commentForm.unload();
        }
    }
}
;
class StaticBlog {
    constructor(section){
        this.$el = define_2()(section.el);
        this.richText = new RichText(this.$el);
    }
    onSectionUnload() {
        this.richText.unload();
    }
}
const just_debounce = __webpack_require__(405);
const just_debounce_default = __webpack_require__.n(just_debounce);
;
const DOCUMENT_FRAGMENT_NODE = 11;
function morphAttrs(fromNode, toNode) {
    const toNodeAttrs = toNode.attributes;
    let attr;
    let attrName;
    let attrNamespaceURI;
    let attrValue;
    let fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
        return;
    }
    for(let i = toNodeAttrs.length - 1; i >= 0; i--){
        attr = toNodeAttrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;
        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
            if (fromValue !== attrValue) {
                if (attr.prefix === 'xmlns') {
                    attrName = attr.name;
                }
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);
            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }
    const fromNodeAttrs = fromNode.attributes;
    for(let d = fromNodeAttrs.length - 1; d >= 0; d--){
        attr = fromNodeAttrs[d];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
                fromNode.removeAttributeNS(attrNamespaceURI, attrName);
            }
        } else {
            if (!toNode.hasAttribute(attrName)) {
                fromNode.removeAttribute(attrName);
            }
        }
    }
}
let range;
const NS_XHTML = 'http://www.w3.org/1999/xhtml';
const doc = typeof document === 'undefined' ? undefined : document;
const HAS_TEMPLATE_SUPPORT = !!doc && 'content' in doc.createElement('template');
const HAS_RANGE_SUPPORT = !!doc && doc.createRange && 'createContextualFragment' in doc.createRange();
function createFragmentFromTemplate(str) {
    const template = doc.createElement('template');
    template.innerHTML = str;
    return template.content.childNodes[0];
}
function createFragmentFromRange(str) {
    if (!range) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }
    const fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
}
function createFragmentFromWrap(str) {
    const fragment = doc.createElement('body');
    fragment.innerHTML = str;
    return fragment.childNodes[0];
}
function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
        return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
        return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
}
function compareNodeNames(fromEl, toEl) {
    const fromNodeName = fromEl.nodeName;
    const toNodeName = toEl.nodeName;
    let fromCodeStart;
    let toCodeStart;
    if (fromNodeName === toNodeName) {
        return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
        return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
        return toNodeName === fromNodeName.toUpperCase();
    } else {
        return false;
    }
}
function createElementNS(name, namespaceURI) {
    if (!namespaceURI || namespaceURI === NS_XHTML) {
        return doc.createElement(name);
    }
    return doc.createElementNS(namespaceURI, name);
}
function moveChildren(fromEl, toEl) {
    let curChild = fromEl.firstChild;
    while(curChild){
        const nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}
function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name);
        }
    }
}
const specialElHandlers = {
    OPTION (fromEl, toEl) {
        let parentNode = fromEl.parentNode;
        if (parentNode) {
            let parentName = parentNode.nodeName.toUpperCase();
            if (parentName === 'OPTGROUP') {
                parentNode = parentNode.parentNode;
                parentName = parentNode && parentNode.nodeName.toUpperCase();
            }
            if (parentName === 'SELECT' && !parentNode.hasAttribute('multiple')) {
                if (fromEl.hasAttribute('selected') && !toEl.selected) {
                    fromEl.setAttribute('selected', 'selected');
                    fromEl.removeAttribute('selected');
                }
                parentNode.selectedIndex = -1;
            }
        }
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    INPUT (fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');
        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }
        if (!toEl.hasAttribute('value')) {
            fromEl.removeAttribute('value');
        }
    },
    TEXTAREA (fromEl, toEl) {
        const newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }
        const firstChild = fromEl.firstChild;
        if (firstChild) {
            const oldValue = firstChild.nodeValue;
            if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
                return;
            }
            firstChild.nodeValue = newValue;
        }
    },
    SELECT (fromEl, toEl) {
        if (!toEl.hasAttribute('multiple')) {
            let selectedIndex = -1;
            let i = 0;
            let curChild = fromEl.firstChild;
            let optgroup;
            let nodeName;
            while(curChild){
                nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
                if (nodeName === 'OPTGROUP') {
                    optgroup = curChild;
                    curChild = optgroup.firstChild;
                } else {
                    if (nodeName === 'OPTION') {
                        if (curChild.hasAttribute('selected')) {
                            selectedIndex = i;
                            break;
                        }
                        i++;
                    }
                    curChild = curChild.nextSibling;
                    if (!curChild && optgroup) {
                        curChild = optgroup.nextSibling;
                        optgroup = null;
                    }
                }
            }
            fromEl.selectedIndex = selectedIndex;
        }
    }
};
const ELEMENT_NODE = 1;
const DOCUMENT_FRAGMENT_NODE$1 = 11;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
function noop() {}
function defaultGetNodeKey(node) {
    if (node) {
        return node.getAttribute && node.getAttribute('id') || node.id;
    }
}
function morphdomFactory(morphAttrs) {
    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }
        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML' || fromNode.nodeName === 'BODY') {
                const toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
            toNode = toNode.firstElementChild;
        }
        const getNodeKey = options.getNodeKey || defaultGetNodeKey;
        const onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        const onNodeAdded = options.onNodeAdded || noop;
        const onBeforeElUpdated = options.onBeforeElUpdated || noop;
        const onElUpdated = options.onElUpdated || noop;
        const onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        const onNodeDiscarded = options.onNodeDiscarded || noop;
        const onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        const skipFromChildren = options.skipFromChildren || noop;
        const addChild = options.addChild || ((parent, child)=>parent.appendChild(child));
        const childrenOnly = options.childrenOnly === true;
        const fromNodesLookup = Object.create(null);
        const keyedRemovalList = [];
        function addKeyedRemoval(key) {
            keyedRemovalList.push(key);
        }
        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                let curChild = node.firstChild;
                while(curChild){
                    let key;
                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        addKeyedRemoval(key);
                    } else {
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }
                    curChild = curChild.nextSibling;
                }
            }
        }
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }
            if (parentNode) {
                parentNode.removeChild(node);
            }
            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }
        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
                let curChild = node.firstChild;
                while(curChild){
                    const key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }
                    indexTree(curChild);
                    curChild = curChild.nextSibling;
                }
            }
        }
        indexTree(fromNode);
        function handleNodeAdded(el) {
            onNodeAdded(el);
            let curChild = el.firstChild;
            while(curChild){
                const nextSibling = curChild.nextSibling;
                const key = getNodeKey(curChild);
                if (key) {
                    const unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    } else {
                        handleNodeAdded(curChild);
                    }
                } else {
                    handleNodeAdded(curChild);
                }
                curChild = nextSibling;
            }
        }
        function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
            while(curFromNodeChild){
                const fromNextSibling = curFromNodeChild.nextSibling;
                if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    removeNode(curFromNodeChild, fromEl, true);
                }
                curFromNodeChild = fromNextSibling;
            }
        }
        function morphEl(fromEl, toEl, childrenOnly) {
            const toElKey = getNodeKey(toEl);
            if (toElKey) {
                delete fromNodesLookup[toElKey];
            }
            if (!childrenOnly) {
                const beforeUpdateResult = onBeforeElUpdated(fromEl, toEl);
                if (beforeUpdateResult === false) {
                    return;
                } else if (beforeUpdateResult instanceof HTMLElement) {
                    fromEl = beforeUpdateResult;
                    indexTree(fromEl);
                }
                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);
                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }
            if (fromEl.nodeName !== 'TEXTAREA') {
                morphChildren(fromEl, toEl);
            } else {
                specialElHandlers.TEXTAREA(fromEl, toEl);
            }
        }
        function morphChildren(fromEl, toEl) {
            const skipFrom = skipFromChildren(fromEl, toEl);
            let curToNodeChild = toEl.firstChild;
            let curFromNodeChild = fromEl.firstChild;
            let curToNodeKey;
            let curFromNodeKey;
            let fromNextSibling;
            let toNextSibling;
            let matchingFromEl;
            outer: while(curToNodeChild){
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);
                while(!skipFrom && curFromNodeChild){
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }
                    curFromNodeKey = getNodeKey(curFromNodeChild);
                    const curFromNodeType = curFromNodeChild.nodeType;
                    let isCompatible;
                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            if (curToNodeKey) {
                                if (curToNodeKey !== curFromNodeKey) {
                                    if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                                        if (fromNextSibling === matchingFromEl) {
                                            isCompatible = false;
                                        } else {
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                                            if (curFromNodeKey) {
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                removeNode(curFromNodeChild, fromEl, true);
                                            }
                                            curFromNodeChild = matchingFromEl;
                                            curFromNodeKey = getNodeKey(curFromNodeChild);
                                        }
                                    } else {
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                isCompatible = false;
                            }
                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                morphEl(curFromNodeChild, curToNodeChild);
                            }
                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            isCompatible = true;
                            if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                            }
                        }
                    }
                    if (isCompatible) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }
                    if (curFromNodeKey) {
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        removeNode(curFromNodeChild, fromEl, true);
                    }
                    curFromNodeChild = fromNextSibling;
                }
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    if (!skipFrom) {
                        addChild(fromEl, matchingFromEl);
                    }
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    const onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }
                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        addChild(fromEl, curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }
            cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
            const specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        }
        let morphedNode = fromNode;
        const morphedNodeType = morphedNode.nodeType;
        const toNodeType = toNode.nodeType;
        if (!childrenOnly) {
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }
                    return morphedNode;
                } else {
                    morphedNode = toNode;
                }
            }
        }
        if (morphedNode === toNode) {
            onNodeDiscarded(fromNode);
        } else {
            if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
                return;
            }
            morphEl(morphedNode, toNode, childrenOnly);
            if (keyedRemovalList) {
                for(let i = 0, len = keyedRemovalList.length; i < len; i++){
                    const elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }
        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }
        return morphedNode;
    };
}
const morphdom = morphdomFactory(morphAttrs);
const morphdom_esm = morphdom;
;
class CountryProvinceSelector {
    constructor(countryOptions){
        if (typeof countryOptions !== 'string') {
            throw new TypeError(`${countryOptions} is not a string.`);
        }
        this.countryOptions = countryOptions;
    }
    build(countryNodeElement, provinceNodeElement, options) {
        if (typeof countryNodeElement !== 'object') {
            throw new TypeError(`${countryNodeElement} is not a object.`);
        }
        if (typeof provinceNodeElement !== 'object') {
            throw new TypeError(`${provinceNodeElement} is not a object.`);
        }
        const defaultValue = countryNodeElement.getAttribute('data-default');
        options = options || {};
        countryNodeElement.innerHTML = this.countryOptions;
        countryNodeElement.value = defaultValue;
        if (defaultValue && getOption(countryNodeElement, defaultValue)) {
            const provinces = buildProvince(countryNodeElement, provinceNodeElement, defaultValue);
            if (options.onCountryChange) {
                options.onCountryChange(provinces, provinceNodeElement, countryNodeElement);
            }
        }
        countryNodeElement.addEventListener('change', (event)=>{
            const target = event.target;
            const selectedValue = target.value;
            const provinces = buildProvince(target, provinceNodeElement, selectedValue);
            if (options.onCountryChange) {
                options.onCountryChange(provinces, provinceNodeElement, countryNodeElement);
            }
        });
        if (options.onProvinceChange) {
            provinceNodeElement.addEventListener('change', options.onProvinceChange);
        }
    }
}
function getOption(nodeElement, value) {
    return nodeElement.querySelector(`option[value="${value}"]`);
}
function buildOptions(provinceNodeElement, provinces) {
    const defaultValue = provinceNodeElement.getAttribute('data-default');
    provinces.forEach((optionLabel)=>{
        const optionElement = document.createElement('option');
        optionElement.value = optionLabel[0];
        optionElement.textContent = optionLabel[1];
        provinceNodeElement.appendChild(optionElement);
    });
    if (defaultValue && getOption(provinceNodeElement, defaultValue)) {
        provinceNodeElement.value = defaultValue;
    }
}
function buildProvince(countryNodeElement, provinceNodeElement, selectedValue) {
    const selectedOption = getOption(countryNodeElement, selectedValue);
    const provinces = JSON.parse(selectedOption.getAttribute('data-provinces'));
    provinceNodeElement.options.length = 0;
    if (provinces.length) {
        buildOptions(provinceNodeElement, provinces);
    }
    return provinces;
}
;
function dist_index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function dist_index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        dist_index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        dist_index_es_defineProperties(Constructor, staticProps);
    }
    return Constructor;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || index_es_unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr;
    }
}
function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) {
        return;
    }
    const _arr = [];
    for (const _s of arr){
        _arr.push(_s);
        if (i && _arr.length === i) {
            break;
        }
    }
    return _arr;
}
function index_es_unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return;
    }
    if (typeof o === "string") {
        return index_es_arrayLikeToArray(o, minLen);
    }
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) {
        n = o.constructor.name;
    }
    if (n === "Map" || n === "Set") {
        return Array.from(n);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return index_es_arrayLikeToArray(o, minLen);
    }
}
function index_es_arrayLikeToArray(arr, define) {
    if (define == null || define > arr.length) {
        define = arr.length;
    }
    const define = new Array(define);
    for(let i = 0; i < define; i++){
        define[i] = arr[i];
    }
    return define;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
const proto_8 = {};
const AsyncView = (()=>{
    function AsyncView() {}
    dist_index_es_createClass(AsyncView, null, [
        {
            key: "load",
            value: function load(url, sectionId, options = {}) {
                const querylessUrl = url.replace(/\?[^#]+/, '');
                const queryParamsString = new RegExp(/.+\?([^#]+)/).exec(url);
                let queryParams = {
                    section_id: sectionId
                };
                if ('query' in options) {
                    queryParams = {
                        ...queryParams,
                        ...options.query
                    };
                }
                if (queryParamsString && queryParamsString.length >= 2) {
                    queryParamsString[1].split('&').forEach((param)=>{
                        const _param$split = param.split('=');
                        const _param$split2 = _slicedToArray(_param$split, 2);
                        const key = _param$split2[0];
                        const value = _param$split2[1];
                        queryParams[key] = value;
                    });
                }
                const cachebustingParams = {
                    ...queryParams,
                    _: new Date().getTime()
                };
                const proto = querylessUrl.replace(/([^#]+)(.*)/, (match, address, hash)=>`${address}?${Object.keys(queryParams).sort().map((key)=>`${key}=${encodeURIComponent(queryParams[key])}`).join('&')}${hash}`);
                const requestUrl = querylessUrl.replace(/([^#]+)(.*)/, (match, address, hash)=>`${address}?${Object.keys(cachebustingParams).sort().map((key)=>`${key}=${encodeURIComponent(cachebustingParams[key])}`).join('&')}${hash}`);
                const promise = new Promise((resolve, reject)=>{
                    let data;
                    if (proto in proto_8) {
                        resolve(proto_8[proto]);
                        return;
                    }
                    proto_8[proto] = promise;
                    if (options.hash) {
                        data = sessionStorage.getItem(proto);
                        if (data) {
                            const deserialized = JSON.parse(data);
                            if (options.hash === deserialized.options.hash) {
                                delete proto_8[proto];
                                resolve(deserialized);
                                return;
                            }
                        }
                    }
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', requestUrl, true);
                    xhr.onload = ()=>{
                        const xhr_response = xhr.response;
                        let newOptions = {};
                        const optionsEl = xhr_response.querySelector('[data-options]');
                        if (optionsEl && optionsEl.innerHTML) {
                            newOptions = JSON.parse(xhr_response.querySelector('[data-options]').innerHTML);
                        }
                        const proto = xhr_response.querySelectorAll('[data-html]');
                        let proto = {};
                        if (proto.length === 1 && proto[0].getAttribute('data-html') === '') {
                            proto = proto[0].innerHTML;
                        } else {
                            for(let i = 0; i < proto.length; i++){
                                proto[proto[i].getAttribute('data-html')] = proto[i].innerHTML;
                            }
                        }
                        const dataEls = xhr_response.querySelectorAll('[data-data]');
                        let newData = {};
                        if (dataEls.length === 1 && dataEls[0].getAttribute('data-data') === '') {
                            newData = JSON.parse(dataEls[0].innerHTML);
                        } else {
                            for(let _i = 0; _i < dataEls.length; _i++){
                                newData[dataEls[_i].getAttribute('data-data')] = JSON.parse(dataEls[_i].innerHTML);
                            }
                        }
                        if (options.hash) {
                            try {
                                sessionStorage.setItem(proto, JSON.stringify({
                                    options: newOptions,
                                    data: newData,
                                    html: proto
                                }));
                            } catch (error) {
                                console.error(error);
                            }
                        }
                        delete proto_8[proto];
                        resolve({
                            data: newData,
                            html: proto
                        });
                    };
                    xhr.onerror = ()=>{
                        delete proto_8[proto];
                        reject();
                    };
                    xhr.responseType = 'document';
                    xhr.send();
                });
                return promise;
            }
        }
    ]);
    return AsyncView;
})();
const shopify_asyncview_dist_index_es = AsyncView;
const proto_5 = __webpack_require__(766);
;
class utils_2 {
    constructor({ quantityField, onChange }){
        this.events = new proto_5.Z();
        this.field = quantityField;
        this.input = this.field.querySelector('[data-quantity-input]');
        this.plus = this.field.querySelector('[data-quantity-plus]');
        this.minus = this.field.querySelector('[data-quantity-minus]');
        this.minusButtonWrapper = this.field.querySelector('[data-button-wrapper-minus]');
        this.incrementValue = parseInt(this.input.dataset.incrementValue, 10);
        this.increaseAmount = this.increaseAmount.bind(this);
        this.decreaseAmount = this.decreaseAmount.bind(this);
        this.onChange = onChange ? just_debounce_default()(onChange, 50) : ()=>{};
        this.registerEvents();
    }
    registerEvents() {
        this.increaseAmountClickEvent = this.events.register(this.plus, 'click', (e)=>this.increaseAmount(e));
        this.decreaseAmountClickEvent = this.events.register(this.minus, 'click', (e)=>this.decreaseAmount(e));
        this.setAmountChangeEvent = this.events.register(this.input, 'change', (e)=>this.setAmount(e));
        this.quantityKeyUpEvent = this.events.register(this.input, 'keyup', (e)=>this.quantityKeyUp(e));
        this.quantityKeyDownEvent = this.events.register(this.input, 'keydown', (e)=>this.quantityKeyDown(e));
        this._updateMinusButton();
    }
    setAmount(e) {
        e.preventDefault();
        const count = this._getCount();
        if (!count) {
            this.input.value = this.incrementValue;
        }
        this._updateMinusButton();
        this.onChange(e.currentTarget);
    }
    _getCount() {
        return this.input.valueAsNumber;
    }
    increaseAmount(e) {
        e.preventDefault();
        const count = this._getCount();
        this.input.value = count + this.incrementValue;
        this._updateMinusButton();
        this.onChange(e.currentTarget);
    }
    decreaseAmount(e) {
        e.preventDefault();
        const count = this._getCount();
        this.input.value = count - this.incrementValue;
        this._updateMinusButton();
        this.onChange(e.currentTarget);
    }
    quantityKeyUp(e) {
        if (e.key === 'Backspace') {
            return;
        }
        this._updateMinusButton();
        this.onChange(e.currentTarget);
    }
    quantityKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    _updateMinusButton() {
        const count = this._getCount();
        if (count <= this.incrementValue) {
            this.minusButtonWrapper.classList.add('quantity-selector__button-wrapper--disabled');
        } else {
            this.minusButtonWrapper.classList.remove('quantity-selector__button-wrapper--disabled');
        }
    }
    unload() {
        this.events.unregisterAll();
    }
}
;
function animations_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function animations_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        animations_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        animations_es_defineProperties(Constructor, staticProps);
    }
    return Constructor;
}
function define() {
    return new Promise((resolve)=>{
        window.requestAnimationFrame(resolve);
    });
}
const animations_es_Animation = (()=>{
    function Animation(options) {
        this._el = options.el;
        this.cancelRunning = null;
        this._state = options.state || 'initial';
        this.initialState = this._state;
        this.stateAttribute = options.stateAttribute || 'data-animation-state';
        this.stateChangeAttribute = options.stateChangeAttribute || 'data-animation';
        this.endEvent = options.endEvent || 'transitionend';
        this.hold = !!options.hold;
        this.onStart = options.onStart || (()=>{});
        this.activeEventHandler = null;
    }
    animations_es_createClass(Animation, [
        {
            key: "isState",
            value: function isState(state) {
                return state === this._state;
            }
        },
        {
            key: "animateTo",
            value: function animateTo(state, options = {}) {
                const utils = this;
                const from = this._el.dataset[this.stateAttribute] || this._state;
                const utils = state || this.initialState;
                const force = options.force;
                const hold = 'hold' in options ? options.hold : this.hold;
                return new Promise((resolve)=>{
                    if (utils.cancelRunning) {
                        utils.cancelRunning();
                    }
                    if (from === utils) {
                        utils._el.removeAttribute(utils.stateChangeAttribute);
                        resolve(from, null);
                        return;
                    }
                    let running = true;
                    utils.cancelRunning = ()=>{
                        running = false;
                        resolve(null, null);
                    };
                    utils._el.removeEventListener(utils.endEvent, utils.activeEventHandler);
                    utils.activeEventHandler = null;
                    if (force) {
                        utils._el.setAttribute(utils.stateChangeAttribute, `${from}=>${utils}`);
                        utils.onStart({
                            el: utils._el,
                            from,
                            to: utils
                        });
                        if (typeof options.onStart === 'function') {
                            options.onStart({
                                el: utils._el,
                                from,
                                to: utils
                            });
                        }
                        utils._el.setAttribute(utils.stateAttribute, utils);
                        utils._state = utils;
                        if (!hold) {
                            utils._el.removeAttribute(utils.stateChangeAttribute);
                        }
                        resolve(utils, null);
                        return;
                    }
                    define().then(()=>{
                        if (!running) {
                            throw new Error('cancelled');
                        }
                        utils._el.setAttribute(utils.stateChangeAttribute, `${from}=>${utils}`);
                        utils.onStart({
                            el: utils._el,
                            from,
                            to: utils
                        });
                        if (typeof options.onStart === 'function') {
                            options.onStart({
                                el: utils._el,
                                from,
                                to: utils
                            });
                        }
                        return define();
                    }).then(()=>{
                        if (!running) {
                            throw new Error('cancelled');
                        }
                        utils._el.removeEventListener(utils.endEvent, utils.activeEventHandler);
                        utils.activeEventHandler = (e)=>{
                            if (e.target !== utils._el || !running) {
                                return;
                            }
                            utils._el.removeEventListener(utils.endEvent, utils.activeEventHandler);
                            if (!hold) {
                                utils._el.removeAttribute(utils.stateChangeAttribute);
                            }
                            resolve(utils, e);
                        };
                        utils._el.addEventListener(utils.endEvent, utils.activeEventHandler);
                        utils._el.setAttribute(utils.stateAttribute, utils);
                        utils._state = utils;
                    })["catch"]((error)=>{
                        if (error.message !== 'cancelled') {
                            throw error;
                        }
                    });
                });
            }
        },
        {
            key: "unload",
            value: function unload() {
                this._el.removeEventListener(this.endEvent, this.activeEventHandler);
                this.activeEventHandler = null;
            }
        },
        {
            key: "el",
            get: function get() {
                return this._el;
            }
        },
        {
            key: "state",
            get: function get() {
                return this._state;
            }
        }
    ]);
    return Animation;
})();
const AnimationsManager = null && (()=>{
    function AnimationsManager() {
        this.animations = new Map();
    }
    animations_es_createClass(AnimationsManager, [
        {
            key: "add",
            value: function add(utils) {
                if (this.animations.has(utils.el)) {
                    return this.animations.get(utils.el);
                }
                const animation = new animations_es_Animation(utils);
                this.animations.set(utils.el, animation);
                return animation;
            }
        },
        {
            key: "remove",
            value: function remove(animation) {
                this.animations["delete"](animation.el);
                animation.unload();
            }
        },
        {
            key: "removeAll",
            value: function removeAll() {
                this.animations.forEach((animation)=>animation.unload());
            }
        }
    ]);
    return AnimationsManager;
})();
function animations_es_transition(options) {
    return new animations_es_Animation(options);
}
;
class proto_6 {
    constructor(message, type){
        const utils = document.querySelector('[data-templates] [data-message-banner]');
        this.banner = utils.cloneNode(true);
        const messageElement = this.banner.querySelector('[data-message-banner-content]');
        messageElement.innerHTML = message;
        this.banner.classList.add(`message--${type}`);
        const modal = document.querySelector('.modal-loaded .modal-inner');
        const target = modal || document.querySelector('[data-site-header]');
        target.appendChild(this.banner);
        this.closeButton = this.banner.querySelector('[data-message-banner-close]');
        this.bannerAnimation = animations_es_transition({
            el: this.banner,
            state: 'closed'
        });
        this.bannerAnimation.animateTo('open');
        this.events = new proto_5.Z();
        this.events.register(this.closeButton, 'click', ()=>this._close());
        this.events.register(document, 'click', (e)=>this._handleDocumentClick(e.target));
        this.events.register(document, 'touchStart', (e)=>this._handleDocumentClick(e.target));
        this.events.register(window, 'keydown', (e)=>this._closeEsc(e));
    }
    unload() {
        if (this.banner) {
            this._close();
        }
    }
    _closeEsc(e) {
        if (e.key === 'Escape') {
            this._close();
        }
    }
    _close() {
        this.bannerAnimation.animateTo('closed').then(()=>{
            this.banner?.remove();
            this.banner = null;
            this.events.unregisterAll();
            this.bannerAnimation.unload();
        });
    }
    _handleDocumentClick(target) {
        const $parent = define_2()(target).parents('[data-message-banner]');
        if ($parent.length) {
            return;
        }
        this._close();
    }
}
;
class StaticCart {
    constructor(section){
        this.section = section;
        this.settings = section.data.settings;
        this.shipping = section.data.shipping;
        this.updateTimeout = null;
        this.$window = define_2()(window);
        this.$el = define_2()(section.el);
        this.el = section.el;
        this.events = new proto_5.Z();
        this.totals = this.el.querySelectorAll('[data-cart-total]');
        this.$shipping = this.$el.find('[data-cartshipping]');
        this.freeShippingBars = this.$el[0].querySelectorAll('[data-free-shipping-bar]');
        this.$cartSidebar = this.$el.find('[data-cart-sidebar]');
        this.quantitySelectors = [];
        this.inputFields = this.el.querySelectorAll('[data-quantity-input]');
        this.$titleTotalSmall = this.$el.find('.cart-title-total--small');
        this.$titleTotalLarge = this.$el.find('.cart-title-total--large');
        this.$titleTotalContents = this.$el.find('[data-cart-title-total]');
        this.cartItemList = this.$el[0].querySelector('[data-cart-item-list]');
        this.cartDiscounts = this.$el[0].querySelector('[data-cart-discounts]');
        this.$shippingToggle = this.$el.find('[data-cartshipping-toggle]');
        this.$shippingResponse = this.$shipping.find('[data-cartshipping-response]');
        this.$shippingResponseMessage = this.$shippingResponse.find('[data-cartshipping-message]');
        this.$shippingResponseRates = this.$shippingResponse.find('[data-cartshipping-rates]');
        this.$shippingSubmit = this.$shipping.find('[data-cartshipping-submit]');
        this._moveTitleTotal();
        const utils = define_2()('[data-scripts]');
        this._editItemQuantity = this._editItemQuantity.bind(this);
        this.inputFields.forEach((input)=>{
            this.quantitySelectors.push(new utils_2({
                quantityField: input.parentNode,
                onChange: this._editItemQuantity
            }));
        });
        utils()(utils.data('shopify-api-url'), ()=>{
            this._bindEvents();
            window.Shopify.onError = this._handleErrors.bind(this);
        });
        this.forms = new Forms(this.$el);
        if (this.settings.shipping && this.$shipping.length) {
            utils()(utils.data('shopify-countries'), ()=>{
                utils()(utils.data('shopify-common'), ()=>{
                    this._initShippingCalc();
                });
            });
        }
        if (this.$cartSidebar.length) {
            new RichText(this.$cartSidebar);
        }
    }
    onSectionUnload() {
        this.$el.off('.cart-page');
        this.$window.off('.cart-page');
        if (this.messageBanner) {
            this.messageBanner.unload();
        }
        this.forms.unload();
    }
    _bindEvents() {
        this.$el.on('click.cart-page', '[data-cartitem-remove]', (event)=>{
            event.preventDefault();
            this._editItemQuantity(event.currentTarget, true);
        });
        this.$window.on('resize.cart-page', just_debounce_default()(()=>this._moveTitleTotal(), 20));
    }
    _getItemQuantity(key) {
        return parseInt(this.el.querySelector(`[data-cartitem-key="${key}"] [data-quantity-input]`).value, 10);
    }
    _moveTitleTotal() {
        if (!this.$titleTotalContents.length) {
            return;
        }
        if (this.$window.outerWidth() >= 480) {
            if (!define_2().contains(this.$titleTotalLarge[0], this.$titleTotalContents[0])) {
                const $form = this.$titleTotalContents.detach();
                this.$titleTotalLarge.append($form);
            }
        } else if (!define_2().contains(this.$titleTotalSmall[0], this.$titleTotalContents[0])) {
            const $form = this.$titleTotalContents.detach();
            this.$titleTotalSmall.append($form);
        }
    }
    _editItemQuantity(target, remove = false) {
        const $target = define_2()(target);
        const cartItemRow = $target.closest('[data-cartitem-id]')[0];
        if (remove) {
            cartItemRow.classList.add('removing');
        }
        const quantity = remove ? 0 : parseInt(cartItemRow.querySelector('[data-quantity-input]').value, 10);
        const key = cartItemRow.getAttribute('data-cartitem-key');
        this._updateCart(key, quantity);
    }
    _updateCart(key, quantity) {
        if (this.updateTimeout !== null) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(()=>{
            if (quantity > 0 && this._getItemQuantity(key) !== quantity) {
                this.updateTimeout = null;
                return;
            }
            const thisTimeoutId = this.updateTimeout;
            const fetchBody = {
                id: key,
                quantity
            };
            fetch(`${window.Theme.routes.cart_change_url}.js`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fetchBody)
            }).then((response)=>response.json()).then((data)=>{
                if (this.updateTimeout !== thisTimeoutId) {
                    return;
                }
                if (data.status === 422) {
                    this._handleInvalidQuantity(thisTimeoutId, data.message);
                } else {
                    this._didUpdate(data, thisTimeoutId);
                }
            }).catch((error)=>console.error(error));
        }, 300);
    }
    _handleInvalidQuantity(thisTimeoutId, errorMsg) {
        if (this.updateTimeout !== thisTimeoutId) {
            return;
        }
        if (this.messageBanner) {
            this.messageBanner.unload();
            this.messageBanner = null;
        }
        this.messageBanner = new proto_6(errorMsg, 'error');
        fetch(`${window.Theme.routes.cart_url}.js`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>response.json()).then((cartData)=>{
            this._didUpdate(cartData, thisTimeoutId);
        }).catch((error)=>console.error(error));
    }
    _didUpdate(response, thisTimeoutId) {
        if (!response.items.length) {
            window.location = window.Theme.routes.cart_url;
            return;
        }
        shopify_asyncview_dist_index_es.load(window.Theme.routes.cart_url, this.section.id).then(({ html: proto })=>{
            if (this.updateTimeout !== thisTimeoutId) {
                return;
            }
            const countEvent = new CustomEvent('cartcount:update', {
                detail: response
            });
            window.dispatchEvent(countEvent);
            this.quantitySelectors.forEach((selector)=>{
                selector.unload();
            });
            if (this.freeShippingBars.length > 0) {
                this.freeShippingBars.forEach((el)=>{
                    const proto = el;
                    proto.innerHTML = proto.free_shipping_bar;
                    proto.classList.add('free-shipping-bar--animate');
                });
            }
            const proto = document.createElement('div');
            proto.innerHTML = proto.list;
            morphdom_esm(this.cartItemList, proto.querySelector('ul'), {
                onBeforeElUpdated: (fromEl, toEl)=>{
                    if (fromEl.tagName === 'IMG' && fromEl.src === toEl.src) {
                        return false;
                    }
                    return true;
                }
            });
            this.totals.forEach((total)=>{
                const newTotal = total;
                newTotal.innerHTML = proto.cart_total;
                morphdom_esm(total, newTotal, {
                    childrenOnly: true
                });
            });
            rimg_shopify_dist_index_es.watch(this.cartItemList);
            this.forms.unload();
            this.forms = new Forms(this.$el);
            this.inputFields.forEach((input)=>{
                this.quantitySelectors.push(new utils_2({
                    quantityField: input.parentNode,
                    onChange: this._editItemQuantity
                }));
            });
            this.$el.off('click.cart-page', '[data-cartitem-remove]');
            this.$el.on('click.cart-page', '[data-cartitem-remove]', (Element)=>{
                Element.preventDefault();
                this._editItemQuantity(Element.currentTarget, true);
            });
            this.cartDiscounts.innerHTML = proto.discounts;
        }).catch(()=>window.location.reload());
    }
    _handleErrors(errors = null) {
        if (!errors) {
            return;
        }
        const Integer = {
            message: this.shipping.error_general
        };
        if (errors.zip && errors.zip.length > 0) {
            if (errors.zip[0].indexOf('is not valid') !== -1 || errors.zip[0].indexOf('can\'t be blank') !== -1) {
                Integer.message = `${this.shipping.zip} ${errors.zip}`;
            }
        }
        if (errors.error && errors.error.length > 0) {
            if (errors.error[0].indexOf('shipment_too_heavy') !== -1) {
                Integer.message = this.shipping.shipment_too_heavy;
            }
        }
        this._handleShippingResponse(Integer);
    }
    _initShippingCalc() {
        this._bindShippingCalcEvents();
        const countrySelect = document.getElementById('address_country');
        const provinceSelect = document.getElementById('address_province');
        const provinceContainer = document.getElementById('address_province_container');
        this.shippingCountryProvinceSelector = new CountryProvinceSelector(countrySelect.innerHTML);
        this.shippingCountryProvinceSelector.build(countrySelect, provinceSelect, {
            onCountryChange: (provinces)=>{
                if (provinces.length) {
                    provinceContainer.style.display = 'block';
                } else {
                    provinceContainer.style.display = 'none';
                }
                const { label, zip_label: zipLabel } = window.Countries[countrySelect.value];
                provinceContainer.querySelector('label[for="address_province"]').innerHTML = label;
                this.el.querySelector('#address_zip ~ label[for="address_zip"]').innerHTML = zipLabel;
            }
        });
    }
    _bindShippingCalcEvents() {
        this.$el.on('click.cart-page', '[data-cartshipping-toggle]', ()=>{
            this._toggleShippingCalc();
        });
        this.$el.on('click.cart-page', '[data-cartshipping-submit]', ()=>{
            this._getShippingRates();
        });
        this.$el.on('keypress.cart-page', '#address_zip', (event)=>{
            if (event.keyCode === 10 || event.keyCode === 13) {
                event.preventDefault();
                this.$shippingSubmit.trigger('click');
            }
        });
    }
    _toggleShippingCalc() {
        const oldText = this.$shippingToggle.text();
        const newText = this.$shippingToggle.data('cartshipping-toggle');
        this.$shippingToggle.html(newText).data('cartshipping-toggle', oldText);
        this.$shipping.toggleClass('open');
    }
    _getShippingRates() {
        this._disableShippingButton();
        const proto = {};
        proto.country = define_2()('#address_country').val() || '';
        proto.province = define_2()('#address_province').val() || '';
        proto.zip = define_2()('#address_zip').val() || '';
        const queryString = Object.keys(proto).map((key)=>`${encodeURIComponent(`shipping_address[${key}]`)}=${encodeURIComponent(proto[key])}`).join('&');
        define_2().ajax(`${window.Theme.routes.cart_url}/shipping_rates.json?${queryString}`, {
            dataType: 'json'
        }).fail((proto)=>this._handleErrors(proto.responseJSON || {})).done((proto)=>{
            const rates = proto.shipping_rates;
            const proto = [];
            if (proto.zip.length) {
                proto.push(proto.zip.trim());
            }
            if (proto.province.length) {
                proto.push(proto.province);
            }
            if (proto.country.length) {
                proto.push(proto.country);
            }
            const address = proto.join(', ');
            let proto = '';
            if (rates.length > 1) {
                const firstRate = window.Shopify.formatMoney(rates[0].price, this.settings.money_format);
                proto = this.shipping.multiple_rates.replace('*address*', address).replace('*number_of_rates*', rates.length).replace('*rate*', `<span class="money">${firstRate}</span>`);
            } else if (rates.length === 1) {
                proto = this.shipping.one_rate.replace('*address*', address);
            } else {
                proto = this.shipping.no_rates;
            }
            const ratesList = rates.map((rate)=>{
                const price = window.Shopify.formatMoney(rate.price, this.settings.money_format);
                const rateValue = this.shipping.rate_value.replace('*rate_title*', rate.name).replace('*rate*', `<span class="money">${price}</span>`);
                return `<li>${rateValue}</li>`;
            });
            this._handleShippingResponse({
                message: proto,
                rates: ratesList
            });
        });
    }
    _enableShippingButton() {
        this.$shippingSubmit.html(this.shipping.calculate_shipping).attr('disabled', false);
    }
    _disableShippingButton() {
        this.$shippingSubmit.html(this.shipping.calculating).attr('disabled', true);
    }
    _showShippingResponse() {
        this.$shippingResponse.addClass('visible');
    }
    _hideShippingResponse() {
        this.$shippingResponse.removeClass('visible');
    }
    _handleShippingResponse(shippingResponse = {}) {
        this._hideShippingResponse();
        const proto = shippingResponse.message || null;
        const rates = shippingResponse.rates || null;
        this.$shippingResponseMessage.empty();
        this.$shippingResponseRates.empty();
        if (proto) {
            this.$shippingResponseMessage.html(proto);
        }
        if (rates) {
            this.$shippingResponseRates.html(rates);
        }
        this._enableShippingButton();
        if (!proto && !rates) {
            return;
        }
        this._showShippingResponse();
    }
}
const jQuery_2 = __webpack_require__(646);
const js = __webpack_require__(442);
const js_default = __webpack_require__.n(js);
;
function throttle(cb, delay = 250) {
    let lastCall = 0;
    return (...args)=>{
        const proto = new Date().getTime();
        if (proto - lastCall < delay) {
            return;
        }
        lastCall = proto;
        cb(...args);
    };
}
;
const proto_9 = [];
let proto_13 = null;
function getBreakpoints() {
    return window.getComputedStyle(document.documentElement, ':before').getPropertyValue('content').replace(/"/g, '').split(',');
}
function getBreakpoint() {
    return window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content').replace(/"/g, '');
}
define_2()(window).on('resize', throttle((event)=>{
    const currentBreakpoint = getBreakpoint();
    if (proto_13 !== currentBreakpoint) {
        proto_9.forEach((eventHandler)=>{
            eventHandler(event, {
                previous: proto_13,
                current: currentBreakpoint
            });
        });
    }
    proto_13 = currentBreakpoint;
}, 100));
function proto_2(breakpoint, inclusive = false) {
    const breakpoints = getBreakpoints();
    const currentBreakpoint = getBreakpoint();
    const proto = breakpoints.indexOf(currentBreakpoint) - breakpoints.indexOf(breakpoint);
    if (inclusive) {
        return proto <= 0;
    }
    return proto < 0;
}
function isGreaterThanBreakpoint(breakpoint, inclusive = false) {
    const breakpoints = getBreakpoints();
    const currentBreakpoint = getBreakpoint();
    const proto = breakpoints.indexOf(currentBreakpoint) - breakpoints.indexOf(breakpoint);
    if (inclusive) {
        return proto >= 0;
    }
    return proto > 0;
}
function isBreakpoint(...breakpoints) {
    const currentBreakpoint = getBreakpoint();
    return breakpoints.some((breakpoint)=>breakpoint === currentBreakpoint);
}
function onBreakpointChange(eventHandler) {
    if (proto_9.indexOf(eventHandler) === -1) {
        proto_9.push(eventHandler);
    }
}
function proto_4(eventHandler) {
    const proto = proto_9.indexOf(eventHandler);
    if (proto !== -1) {
        proto_9.splice(proto, 1);
    }
}
const Layout = {
    isLessThanBreakpoint: proto_2,
    isGreaterThanBreakpoint,
    isBreakpoint,
    onBreakpointChange,
    offBreakpointChange: proto_4
};
;
class amend {
    constructor(proto, callback, options){
        const proto = {
            rootMargin: '30%',
            threshold: 0
        };
        this.callback = callback;
        this._runCallback = this._runCallback.bind(this);
        this.observer = new IntersectionObserver(this._runCallback, {
            ...proto,
            ...options
        });
        this.observer.observe(proto);
    }
    _runCallback(entries) {
        if (entries[0].isIntersecting === true) {
            this.unload();
            this.callback();
        }
    }
    unload() {
        this.observer.disconnect();
    }
}
const vanilla_modal_dist = __webpack_require__(529);
const proto_14 = __webpack_require__.n(vanilla_modal_dist);
;
function forceFocus(define, options) {
    options = options || {};
    const define = define.tabIndex;
    define.tabIndex = -1;
    define.dataset.tabIndex = define;
    define.focus();
    if (typeof options.className !== 'undefined') {
        define.classList.add(options.className);
    }
    define.addEventListener('blur', callback);
    function callback(event) {
        event.target.removeEventListener(event.type, callback);
        define.tabIndex = define;
        delete define.dataset.tabIndex;
        if (typeof options.className !== 'undefined') {
            define.classList.remove(options.className);
        }
    }
}
function focusable(container) {
    const elements = Array.prototype.slice.call(container.querySelectorAll('[tabindex],' + '[draggable],' + 'a[href],' + 'area,' + 'button:enabled,' + 'input:not([type=hidden]):enabled,' + 'object,' + 'select:enabled,' + 'textarea:enabled'));
    return elements.filter((element)=>!!(element.offsetWidth || element.offsetHeight || element.getClientRects().length));
}
const proto_10 = {};
function proto_3(container, options) {
    options = options || {};
    const elements = focusable(container);
    const elementToFocus = options.elementToFocus || container;
    const proto = elements[0];
    const last = elements[elements.length - 1];
    removeTrapFocus();
    proto_10.focusin = (event)=>{
        if (container !== event.target && !container.contains(event.target)) {
            proto.focus();
        }
        if (event.target !== container && event.target !== last && event.target !== proto) {
            return;
        }
        document.addEventListener('keydown', proto_10.keydown);
    };
    proto_10.focusout = ()=>{
        document.removeEventListener('keydown', proto_10.keydown);
    };
    proto_10.keydown = (proto)=>{
        if (proto.keyCode !== 9) {
            return;
        }
        if (proto.target === last && !proto.shiftKey) {
            proto.preventDefault();
            proto.focus();
        }
        if ((proto.target === container || proto.target === proto) && proto.shiftKey) {
            proto.preventDefault();
            last.focus();
        }
    };
    document.addEventListener('focusout', proto_10.focusout);
    document.addEventListener('focusin', proto_10.focusin);
    forceFocus(elementToFocus, options);
}
function removeTrapFocus() {
    document.removeEventListener('focusin', proto_10.focusin);
    document.removeEventListener('focusout', proto_10.focusout);
    document.removeEventListener('keydown', proto_10.keydown);
}
;
const { body } = document;
const proto_12 = document.querySelector('html');
function _blockScroll(event) {
    if (event.target.closest('.allow-scroll-while-locked')) {
        return;
    }
    event.preventDefault();
    event.stopPropagation();
}
class ScrollLock {
    static lock(proto) {
        if (proto) {
            proto.classList.add('allow-scroll-while-locked');
        }
        proto_12.classList.add('scroll-locked');
        body.style.top = -1 * window.pageYOffset;
        body.addEventListener('scroll', _blockScroll, false);
        body.addEventListener('touchmove', _blockScroll, {
            passive: false
        });
    }
    static unlock() {
        document.querySelectorAll('.allow-scroll-while-locked').forEach((modal)=>modal.classList.remove('allow-scroll-while-locked'));
        proto_12.classList.remove('scroll-locked');
        body.style.top = '';
        body.removeEventListener('scroll', _blockScroll, false);
        body.removeEventListener('touchmove', _blockScroll, {
            passive: false
        });
    }
    static get isLocked() {
        return proto_12.classList.contains('scroll-locked');
    }
}
;
let openModals = [];
const unlockScrollLock = ()=>{
    if (openModals.length === 0) {
        ScrollLock.unlock();
    }
};
class jQuery {
    constructor(options = {}){
        this.$body = define_2()(document.body);
        this.$window = define_2()(window);
        const defaultOptions = {
            onOpen: ()=>{},
            onClose: ()=>{},
            onBeforeOpen: ()=>{},
            onBeforeClose: ()=>{},
            modalId: null
        };
        this.options = {
            ...defaultOptions,
            ...options
        };
        const utils = this.options.modalId ? `[data-modal-container-${this.options.modalId}]` : '[data-modal-container]';
        const closeSelector = this.options.modalId ? `[data-modal-${this.options.modalId}-close` : '[data-modal-close]';
        this.loadedClass = this.options.modalId ? `modal-${this.options.modalId}-loaded` : 'modal-loaded';
        this.visibleClass = this.options.modalId ? `modal-${this.options.modalId}-visible` : 'modal-visible';
        this.modal = null;
        this.$modal = define_2()(utils);
        this.$modalInner = this.$modal.find('[data-modal-inner]');
        this.finishedLoading = this.finishedLoading.bind(this);
        this._onOpen = this._onOpen.bind(this);
        this._onBeforeOpen = this._onBeforeOpen.bind(this);
        this._onClose = this._onClose.bind(this);
        this._onBeforeClose = this._onBeforeClose.bind(this);
        this._closeEsc = this._closeEsc.bind(this);
        this.position = this.position.bind(this);
        this.modalOptions = {
            modal: utils,
            loadClass: '',
            class: this.loadedClass,
            close: closeSelector,
            onOpen: this._onOpen,
            onClose: this._onClose,
            onBeforeOpen: this._onBeforeOpen,
            onBeforeClose: this._onBeforeClose,
            transitions: false,
            closeKeys: []
        };
    }
    unload() {
        if (!this.modal) {
            return;
        }
        this.modal.destroy();
        openModals = openModals.filter((modal)=>modal !== this);
        unlockScrollLock();
    }
    open(selector, handle = 'general') {
        this._addModalClass(handle);
        this.modal = new (proto_14())(this.modalOptions);
        this.modal.open(selector);
        openModals.push(this);
        window.addEventListener('keydown', this._closeEsc);
    }
    close() {
        this.modal.close();
        window.removeEventListener('keydown', this._closeEsc);
    }
    finishedLoading() {
        proto_3(this.$modal[0]);
    }
    _closeEsc(e) {
        if (e.key === 'Escape' && openModals[openModals.length - 1] === this) {
            this.close();
        }
    }
    isOpen() {
        return this.modal && this.modal.isOpen;
    }
    position() {
        const windowHeight = window.innerHeight;
        const modalHeight = this.$modalInner.outerHeight();
        const modalPadding = parseInt(this.$modal.css('padding-top'), 10) * 2;
        const offset = (windowHeight - modalPadding - modalHeight) / 2;
        const marginTop = offset > 0 ? offset : 0;
        this.$modalInner.css({
            marginTop
        });
    }
    _addModalClass(proto) {
        this.$modal.addClass(`modal--${proto}`);
    }
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
        this.$modalInner.css({
            marginTop: ''
        });
        this.options.onClose();
        removeTrapFocus(this.$modal[0]);
        if (this.activeElement) {
            const focusTrap = this.activeElement.closest('[data-trap-focus]');
            if (focusTrap) {
                proto_3(focusTrap);
            }
            this.activeElement.focus();
        }
        openModals = openModals.filter((modal)=>modal !== this);
        unlockScrollLock();
    }
    _onOpen() {
        this.activeElement = document.activeElement;
        this.position();
        ScrollLock.lock(this.$modal[0]);
        this.$body.addClass(this.visibleClass);
        this.$window.on('resize.modal', just_debounce_default()(()=>this.position(), 16, true, true));
        this.options.onOpen();
        proto_3(this.$modal[0]);
    }
    _onBeforeClose() {
        this.options.onBeforeClose();
    }
    _onBeforeOpen() {
        this.options.onBeforeOpen();
    }
}
const shopify_variants_ui_dist_index_es = __webpack_require__(722);
;
const proto_11 = 'pxu-shopify-surface-pick-up';
const loadingClass = 'surface-pick-up--loading';
const isNotExpired = (timestamp)=>timestamp + 1000 * 60 * 60 >= Date.now();
const removeTrailingSlash = (s)=>s.replace(/(.*)\/$/, '$1');
function calculateDistance(latitude1, longitude1, latitude2, longitude2, unitSystem) {
    const dtor = Math.PI / 180;
    const radius = unitSystem === 'metric' ? 6378.14 : 3959;
    const proto = latitude1 * dtor;
    const rlong1 = longitude1 * dtor;
    const proto = latitude2 * dtor;
    const rlong2 = longitude2 * dtor;
    const dlon = rlong1 - rlong2;
    const proto = proto - proto;
    const a = Math.sin(proto / 2) ** 2 + Math.cos(proto) * Math.cos(proto) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}
async function getGeoLocation() {
    return new Promise((resolve, reject)=>{
        const proto = {
            maximumAge: 3600000,
            timeout: 5000
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords })=>resolve(coords), reject, proto);
        } else {
            reject();
        }
    });
}
async function proto({ latitude: proto, longitude: proto }) {
    const proto = {
        latitude: proto,
        longitude: proto,
        timestamp: Date.now()
    };
    localStorage.setItem(proto_11, JSON.stringify(proto));
    return fetch('/localization.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: proto,
            longitude: proto
        })
    }).then(()=>({
            latitude: proto,
            longitude: proto
        }));
}
async function Object_3(requestLocation = false) {
    const cachedLocation = JSON.parse(localStorage.getItem(proto_11));
    if (cachedLocation && isNotExpired(cachedLocation.timestamp)) {
        return cachedLocation;
    }
    if (requestLocation) {
        return getGeoLocation().then((coords)=>{
            proto(coords);
            return coords;
        });
    }
    return null;
}
class SurfacePickUp {
    constructor(proto, options){
        this.el = proto;
        const themeObj = window.PXUTheme || window.Theme;
        this.options = {
            root_url: themeObj && themeObj.routes && themeObj.routes.root_url || '',
            ...options
        };
        this.options.root_url = removeTrailingSlash(this.options.root_url);
        this.callbacks = [];
        this.onBtnPress = null;
        this.latestVariantId = null;
    }
    load(variantId) {
        if (!variantId) {
            this.el.innerHTML = '';
            return Promise.resolve(true);
        }
        this.latestVariantId = variantId;
        this.el.classList.add(loadingClass);
        return this._getData(variantId).then((data)=>this._injectData(data));
    }
    onModalRequest(callback) {
        if (this.callbacks.indexOf(callback) >= 0) {
            return;
        }
        this.callbacks.push(callback);
    }
    offModalRequest(callback) {
        this.callbacks.splice(this.callbacks.indexOf(callback));
    }
    unload() {
        this.callbacks = [];
        this.el.innerHTML = '';
    }
    _getData(variantId) {
        return new Promise((resolve)=>{
            const xhr = new XMLHttpRequest();
            const requestUrl = `${this.options.root_url}/variants/${variantId}/?section_id=surface-pick-up`;
            xhr.open('GET', requestUrl, true);
            xhr.onload = ()=>{
                const xhr_response = xhr.response;
                const embed = xhr_response.querySelector('[data-html="surface-pick-up-embed"]');
                const itemsContainer = xhr_response.querySelector('[data-html="surface-pick-up-items"]');
                const items = itemsContainer.content.querySelectorAll('[data-surface-pick-up-item]');
                resolve({
                    embed,
                    itemsContainer,
                    items,
                    variantId
                });
            };
            xhr.onerror = ()=>{
                resolve({
                    embed: {
                        innerHTML: ''
                    },
                    itemsContainer: {
                        innerHTML: ''
                    },
                    items: [],
                    variantId
                });
            };
            xhr.responseType = 'document';
            xhr.send();
        });
    }
    _injectData({ embed, itemsContainer, items, variantId }) {
        if (variantId !== this.latestVariantId || items.length === 0) {
            this.el.innerHTML = '';
            this.el.classList.remove(loadingClass);
            return;
        }
        this.el.innerHTML = embed.innerHTML;
        this.el.classList.remove(loadingClass);
        let Number = false;
        const Integer = ()=>{
            if (Number) {
                return Promise.resolve();
            }
            return Object_3(true).then((coords)=>{
                items.forEach((proto)=>{
                    const proto = proto.querySelector('[data-distance]');
                    const distanceUnitEl = proto.querySelector('[data-distance-unit]');
                    const unitSystem = distanceUnitEl.dataset.distanceUnit;
                    const itemLatitude = parseFloat(proto.dataset.latitude);
                    const itemLongitude = parseFloat(proto.dataset.longitude);
                    if (coords && isFinite(itemLatitude) && isFinite(itemLongitude)) {
                        const distance = calculateDistance(coords.latitude, coords.longitude, itemLatitude, itemLongitude, unitSystem);
                        proto.innerHTML = distance.toFixed(1);
                    } else {
                        proto.remove();
                        distanceUnitEl.remove();
                    }
                });
            }).catch((e)=>{
                console.log(e);
                items.forEach((item)=>{
                    const distanceEl = item.querySelector('[data-distance]');
                    const distanceUnitEl = item.querySelector('[data-distance-unit]');
                    distanceEl.remove();
                    distanceUnitEl.remove();
                });
            }).finally(()=>{
                Number = true;
            });
        };
        this.el.querySelector('[data-surface-pick-up-embed-modal-btn]').addEventListener('click', ()=>{
            Integer().then(()=>this.callbacks.forEach((callback)=>callback(itemsContainer.innerHTML)));
        });
    }
}
const shopify_surface_pick_up_dist_index_es = SurfacePickUp;
;
function index_es_unwrapExports(x) {
    if (x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')) {
        return x['default'];
    }
    return x;
}
function index_es_createCommonjsModule(proto, proto) {
    proto = {
        exports: {}
    };
    proto(proto, proto.exports);
    return proto.exports;
}
const index_es_EventHandler_1 = index_es_createCommonjsModule(function(module, exports) {
    exports.__esModule = true;
    class EventHandler {
        constructor(){
            this.events = [];
        }
        register(el, event, proto) {
            if (!el || !event || !proto) {
                return null;
            }
            this.events.push({
                el,
                event,
                listener: proto
            });
            el.addEventListener(event, proto);
            return {
                el,
                event,
                listener: proto
            };
        }
        unregister({ el, event, listener }) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events = this.events.filter((e)=>el !== e.el || event !== e.event || listener !== e.listener);
            el.removeEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregisterAll() {
            this.events.forEach(({ el, event, listener })=>el.removeEventListener(event, listener));
            this.events = [];
        }
    }
    exports["default"] = EventHandler;
});
const index_es_EventHandler = index_es_unwrapExports(index_es_EventHandler_1);
function pxs_gift_card_recipient_form_dist_index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function pxs_gift_card_recipient_form_dist_index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        pxs_gift_card_recipient_form_dist_index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        pxs_gift_card_recipient_form_dist_index_es_defineProperties(Constructor, staticProps);
    }
    return Constructor;
}
function index_es_raf() {
    return new Promise((define)=>{
        window.requestAnimationFrame(define);
    });
}
const index_es_Animation = (()=>{
    function proto(options) {
        this._el = options.el;
        this.cancelRunning = null;
        this._state = options.state || 'initial';
        this.initialState = this._state;
        this.stateAttribute = options.stateAttribute || 'data-animation-state';
        this.stateChangeAttribute = options.stateChangeAttribute || 'data-animation';
        this.endEvent = options.endEvent || 'transitionend';
        this.hold = !!options.hold;
        this.onStart = options.onStart || (()=>{});
        this.activeEventHandler = null;
    }
    pxs_gift_card_recipient_form_dist_index_es_createClass(proto, [
        {
            key: "isState",
            value: function isState(state) {
                return state === this._state;
            }
        },
        {
            key: "animateTo",
            value: function animateTo(state, options = {}) {
                const Flickity = this;
                const from = this._el.dataset[this.stateAttribute] || this._state;
                const Flickity = state || this.initialState;
                const force = options.force;
                const hold = 'hold' in options ? options.hold : this.hold;
                return new Promise((resolve)=>{
                    if (Flickity.cancelRunning) {
                        Flickity.cancelRunning();
                    }
                    if (from === Flickity) {
                        Flickity._el.removeAttribute(Flickity.stateChangeAttribute);
                        resolve(from, null);
                        return;
                    }
                    let utils = true;
                    Flickity.cancelRunning = ()=>{
                        utils = false;
                        resolve(null, null);
                    };
                    Flickity._el.removeEventListener(Flickity.endEvent, Flickity.activeEventHandler);
                    Flickity.activeEventHandler = null;
                    if (force) {
                        Flickity._el.setAttribute(Flickity.stateChangeAttribute, `${from}=>${Flickity}`);
                        Flickity.onStart({
                            el: Flickity._el,
                            from,
                            to: Flickity
                        });
                        if (typeof options.onStart === 'function') {
                            options.onStart({
                                el: Flickity._el,
                                from,
                                to: Flickity
                            });
                        }
                        Flickity._el.setAttribute(Flickity.stateAttribute, Flickity);
                        Flickity._state = Flickity;
                        if (!hold) {
                            Flickity._el.removeAttribute(Flickity.stateChangeAttribute);
                        }
                        resolve(Flickity, null);
                        return;
                    }
                    index_es_raf().then(()=>{
                        if (!utils) {
                            throw new Error('cancelled');
                        }
                        Flickity._el.setAttribute(Flickity.stateChangeAttribute, `${from}=>${Flickity}`);
                        Flickity.onStart({
                            el: Flickity._el,
                            from,
                            to: Flickity
                        });
                        if (typeof options.onStart === 'function') {
                            options.onStart({
                                el: Flickity._el,
                                from,
                                to: Flickity
                            });
                        }
                        return index_es_raf();
                    }).then(()=>{
                        if (!utils) {
                            throw new Error('cancelled');
                        }
                        Flickity._el.removeEventListener(Flickity.endEvent, Flickity.activeEventHandler);
                        Flickity.activeEventHandler = (e)=>{
                            if (e.target !== Flickity._el || !utils) {
                                return;
                            }
                            Flickity._el.removeEventListener(Flickity.endEvent, Flickity.activeEventHandler);
                            if (!hold) {
                                Flickity._el.removeAttribute(Flickity.stateChangeAttribute);
                            }
                            resolve(Flickity, e);
                        };
                        Flickity._el.addEventListener(Flickity.endEvent, Flickity.activeEventHandler);
                        Flickity._el.setAttribute(Flickity.stateAttribute, Flickity);
                        Flickity._state = Flickity;
                    })["catch"]((error)=>{
                        if (error.message !== 'cancelled') {
                            throw error;
                        }
                    });
                });
            }
        },
        {
            key: "unload",
            value: function unload() {
                this._el.removeEventListener(this.endEvent, this.activeEventHandler);
                this.activeEventHandler = null;
            }
        },
        {
            key: "el",
            get: function get() {
                return this._el;
            }
        },
        {
            key: "state",
            get: function get() {
                return this._state;
            }
        }
    ]);
    return proto;
})();
function index_es_transition(options) {
    return new index_es_Animation(options);
}
class RecipientForm {
    constructor(el){
        this.el = el;
        this.events = new index_es_EventHandler();
        this.recipientForm = this.el.querySelector('[data-recipient-form]');
        this.recipientFormInputs = this.el.querySelectorAll('[data-recipient-form-input]');
        this.recipientFormEmailInput = this.el.querySelector('[data-recipient-form-email-input]');
        this.disclosure = this.el.querySelector('[data-recipient-disclosure]');
        this.disclosureCheckbox = this.el.querySelector('[data-recipient-disclosure-checkbox]');
        this.checkmark = this.disclosure.querySelector('.checkmark');
        this.checkmarkCheck = this.disclosure.querySelector('.checkmark__check');
        this.fillAnimation = index_es_transition({
            el: this.checkmark
        });
        this.checkAnimation = index_es_transition({
            el: this.checkmarkCheck
        });
        this.events.register(this.recipientForm, 'keydown', (event)=>this._onKeydown(event));
        this.events.register(this.disclosure, 'toggle', ()=>this._onToggle());
        this.events.register(this.disclosureCheckbox, 'change', ()=>this._onChange());
    }
    _onChange() {
        this.disclosure.open = this.disclosureCheckbox.checked;
    }
    _onKeydown(event) {
        if (event.key === 'Enter' && event.target.matches('[data-recipient-form-input]')) {
            event.preventDefault();
        }
    }
    _onToggle() {
        if (this.disclosure.open) {
            this._showRecipientForm();
        } else {
            this._hideRecipientForm();
        }
    }
    _showRecipientForm() {
        if (this.checkmark && this.checkmarkCheck) {
            this.fillAnimation.animateTo('checked');
            this.checkAnimation.animateTo('checked');
        }
        this.disclosureCheckbox.checked = true;
        this.recipientFormEmailInput.required = true;
    }
    _hideRecipientForm() {
        if (this.checkmark && this.checkmarkCheck) {
            this.fillAnimation.animateTo('unchecked');
            this.checkAnimation.animateTo('unchecked');
        }
        this.disclosureCheckbox.checked = false;
        this.recipientFormEmailInput.required = false;
        this._resetRecipientForm();
    }
    _resetRecipientForm() {
        this.recipientFormInputs.forEach((Array)=>{
            Array.value = '';
            if (Array.classList.contains('form-field-filled')) {
                Array.classList.remove('form-field-filled');
            }
        });
        if (this.recipientForm.classList.contains('recipient-form--has-errors')) {
            this.recipientForm.classList.remove('recipient-form--has-errors');
        }
    }
}
const pxs_gift_card_recipient_form_dist_index_es = RecipientForm;
;
class Images {
    preload(images, size) {
        let proto = images;
        if (typeof images === 'string') {
            proto = [
                images
            ];
        }
        for(let proto = 0; proto < proto.length; proto++){
            this.loadImage(this.getSizedImageUrl(proto[proto], size));
        }
    }
    loadImage(path) {
        const proto = new Image();
        proto.src = path;
        return proto;
    }
    getSizedImageUrl(proto = null, size) {
        if (!size) {
            return null;
        }
        if (size === 'master') {
            return this.removeProtocol(proto);
        }
        const proto = proto.match(/\.(jpg|jpeg|gif|png|webp|avif|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (proto) {
            const prefix = proto.split(proto[0]);
            const suffix = proto[0];
            return this.removeProtocol(`${prefix[0]}_${size}${suffix}`);
        }
        console.warn(`No ${size} found for '${proto}`);
        return null;
    }
    removeProtocol(path) {
        return path.replace(/http(s)?:/, '');
    }
}
;
let extendStatics = (d, b)=>{
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && ((d, b)=>{
        d.__proto__ = b;
    }) || ((d, b)=>{
        for(const p in b){
            if (b.hasOwnProperty(p)) {
                d[p] = b[p];
            }
        }
    });
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function Array() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (Array.prototype = b.prototype, new Array());
}
function __read(proto, n) {
    let proto = typeof Symbol === "function" && proto[Symbol.iterator];
    if (!proto) {
        return proto;
    }
    const proto = proto.call(proto);
    let r;
    const ar = [];
    let e;
    try {
        while((n === undefined || n-- > 0) && !(r = proto.next()).done){
            ar.push(r.value);
        }
    } catch (error) {
        e = {
            error
        };
    } finally{
        try {
            if (r && !r.done && (proto = proto["return"])) {
                proto.call(proto);
            }
        } finally{
            if (e) {
                throw e.error;
            }
        }
    }
    return ar;
}
function __spread(...args) {
    let ar = [];
    for(let i = 0; i < args.length; i++){
        ar = ar.concat(__read(args[i]));
    }
    return ar;
}
;
;
;
const MDCFoundation = function() {
    class proto {
        constructor(adapter = {}){
            this.adapter_ = adapter;
        }
        init() {}
        destroy() {}
    }
    Object.defineProperty(proto, "cssClasses", {
        get () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "strings", {
        get () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "numbers", {
        get () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "defaultAdapter", {
        get () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    return proto;
}();
const foundation = null && MDCFoundation;
;
class MDCComponent {
    constructor(root, foundation, ...args){
        this.root_ = root;
        this.initialize(...__spread(args));
        this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation_.init();
        this.initialSyncWithDOM();
    }
    static attachTo(root) {
        return new MDCComponent(root, new MDCFoundation({}));
    }
    initialize(..._args) {}
    getDefaultFoundation() {
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
    initialSyncWithDOM() {}
    destroy() {
        this.foundation_.destroy();
    }
    listen(evtType, handler, options) {
        this.root_.addEventListener(evtType, handler, options);
    }
    unlisten(proto, proto, proto) {
        this.root_.removeEventListener(proto, proto, proto);
    }
    emit(evtType, proto, shouldBubble = false) {
        let evt;
        if (typeof CustomEvent === 'function') {
            evt = new CustomEvent(evtType, {
                bubbles: shouldBubble,
                detail: proto
            });
        } else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(evtType, shouldBubble, false, proto);
        }
        this.root_.dispatchEvent(evt);
    }
}
const component = null && MDCComponent;
;
function applyPassive(globalObj = window) {
    if (supportsPassiveOption(globalObj)) {
        return {
            passive: true
        };
    }
    return false;
}
function supportsPassiveOption(globalObj = window) {
    let proto = false;
    try {
        const options = {
            get passive () {
                proto = true;
                return false;
            }
        };
        const handler = ()=>{};
        globalObj.document.addEventListener('test', handler, options);
        globalObj.document.removeEventListener('test', handler, options);
    } catch (err) {
        proto = false;
    }
    return proto;
}
;
function matches(proto, selector) {
    const proto = proto.matches || proto.webkitMatchesSelector || proto.msMatchesSelector;
    return proto.call(proto, selector);
}
;
const cssClasses = {
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
const strings = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top'
};
const numbers = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300
};
;
let Event;
function supportsCssVariables(windowObj, forceRefresh = false) {
    const proto = windowObj.CSS;
    let supportsCssVars = Event;
    if (typeof Event === 'boolean' && !forceRefresh) {
        return Event;
    }
    const proto = proto && typeof proto.supports === 'function';
    if (!proto) {
        return false;
    }
    const explicitlySupportsCssVars = proto.supports('--css-vars', 'yes');
    const weAreFeatureDetectingSafari10plus = proto.supports('(--css-vars: yes)') && proto.supports('color', '#00000000');
    supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
    if (!forceRefresh) {
        Event = supportsCssVars;
    }
    return supportsCssVars;
}
function proto_7(proto, pageOffset, clientRect) {
    if (!proto) {
        return {
            x: 0,
            y: 0
        };
    }
    const { x, y } = pageOffset;
    const documentX = x + clientRect.left;
    const documentY = y + clientRect.top;
    let normalizedX;
    let normalizedY;
    if (proto.type === 'touchstart') {
        const proto = proto;
        normalizedX = proto.changedTouches[0].pageX - documentX;
        normalizedY = proto.changedTouches[0].pageY - documentY;
    } else {
        const mouseEvent = proto;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return {
        x: normalizedX,
        y: normalizedY
    };
}
;
const ACTIVATION_EVENT_TYPES = [
    'touchstart',
    'pointerdown',
    'mousedown',
    'keydown'
];
const POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend',
    'pointerup',
    'mouseup',
    'contextmenu'
];
let activatedTargets = [];
const MDCRippleFoundation = ((_super)=>{
    __extends(proto, _super);
    function proto(adapter) {
        const proto = _super.call(this, {
            ...proto.defaultAdapter,
            ...adapter
        }) || this;
        proto.activationAnimationHasEnded_ = false;
        proto.activationTimer_ = 0;
        proto.fgDeactivationRemovalTimer_ = 0;
        proto.fgScale_ = '0';
        proto.frame_ = {
            width: 0,
            height: 0
        };
        proto.initialSize_ = 0;
        proto.layoutFrame_ = 0;
        proto.maxRadius_ = 0;
        proto.unboundedCoords_ = {
            left: 0,
            top: 0
        };
        proto.activationState_ = proto.defaultActivationState_();
        proto.activationTimerCallback_ = ()=>{
            proto.activationAnimationHasEnded_ = true;
            proto.runDeactivationUXLogicIfReady_();
        };
        proto.activateHandler_ = (e)=>proto.activate_(e);
        proto.deactivateHandler_ = ()=>proto.deactivate_();
        proto.focusHandler_ = ()=>proto.handleFocus();
        proto.blurHandler_ = ()=>proto.handleBlur();
        proto.resizeHandler_ = ()=>proto.layout();
        return proto;
    }
    Object.defineProperty(proto, "cssClasses", {
        get () {
            return cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "strings", {
        get () {
            return strings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "numbers", {
        get () {
            return numbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "defaultAdapter", {
        get () {
            return {
                addClass () {},
                browserSupportsCssVars () {
                    return true;
                },
                computeBoundingRect () {
                    return {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    };
                },
                containsEventTarget () {
                    return true;
                },
                deregisterDocumentInteractionHandler () {},
                deregisterInteractionHandler () {},
                deregisterResizeHandler () {},
                getWindowPageOffset () {
                    return {
                        x: 0,
                        y: 0
                    };
                },
                isSurfaceActive () {
                    return true;
                },
                isSurfaceDisabled () {
                    return true;
                },
                isUnbounded () {
                    return true;
                },
                registerDocumentInteractionHandler () {},
                registerInteractionHandler () {},
                registerResizeHandler () {},
                removeClass () {},
                updateCssVariable () {}
            };
        },
        enumerable: true,
        configurable: true
    });
    proto.prototype.init = function() {
        const _this = this;
        const proto = this.supportsPressRipple_();
        this.registerRootHandlers_(proto);
        if (proto) {
            const _a = proto.cssClasses;
            const { ROOT: ROOT_1, UNBOUNDED: UNBOUNDED_1 } = _a;
            requestAnimationFrame(()=>{
                _this.adapter_.addClass(ROOT_1);
                if (_this.adapter_.isUnbounded()) {
                    _this.adapter_.addClass(UNBOUNDED_1);
                    _this.layoutInternal_();
                }
            });
        }
    };
    proto.prototype.destroy = function() {
        const Element = this;
        if (this.supportsPressRipple_()) {
            if (this.activationTimer_) {
                clearTimeout(this.activationTimer_);
                this.activationTimer_ = 0;
                this.adapter_.removeClass(proto.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer_) {
                clearTimeout(this.fgDeactivationRemovalTimer_);
                this.fgDeactivationRemovalTimer_ = 0;
                this.adapter_.removeClass(proto.cssClasses.FG_DEACTIVATION);
            }
            const _a = proto.cssClasses;
            const { ROOT: ROOT_2, UNBOUNDED: UNBOUNDED_2 } = _a;
            requestAnimationFrame(()=>{
                Element.adapter_.removeClass(ROOT_2);
                Element.adapter_.removeClass(UNBOUNDED_2);
                Element.removeCssVars_();
            });
        }
        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
    };
    proto.prototype.activate = function(evt) {
        this.activate_(evt);
    };
    proto.prototype.deactivate = function() {
        this.deactivate_();
    };
    proto.prototype.layout = function() {
        const proto = this;
        if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(()=>{
            proto.layoutInternal_();
            proto.layoutFrame_ = 0;
        });
    };
    proto.prototype.setUnbounded = function(unbounded) {
        const UNBOUNDED = proto.cssClasses.UNBOUNDED;
        if (unbounded) {
            this.adapter_.addClass(UNBOUNDED);
        } else {
            this.adapter_.removeClass(UNBOUNDED);
        }
    };
    proto.prototype.handleFocus = function() {
        const _this = this;
        requestAnimationFrame(()=>_this.adapter_.addClass(proto.cssClasses.BG_FOCUSED));
    };
    proto.prototype.handleBlur = function() {
        const _this = this;
        requestAnimationFrame(()=>_this.adapter_.removeClass(proto.cssClasses.BG_FOCUSED));
    };
    proto.prototype.supportsPressRipple_ = function() {
        return this.adapter_.browserSupportsCssVars();
    };
    proto.prototype.defaultActivationState_ = ()=>({
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false
        });
    proto.prototype.registerRootHandlers_ = function(supportsPressRipple) {
        const _this = this;
        if (supportsPressRipple) {
            ACTIVATION_EVENT_TYPES.forEach((evtType)=>{
                _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
            });
            if (this.adapter_.isUnbounded()) {
                this.adapter_.registerResizeHandler(this.resizeHandler_);
            }
        }
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    };
    proto.prototype.registerDeactivationHandlers_ = function(evt) {
        const _this = this;
        if (evt.type === 'keydown') {
            this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
            POINTER_DEACTIVATION_EVENT_TYPES.forEach((evtType)=>{
                _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        }
    };
    proto.prototype.deregisterRootHandlers_ = function() {
        const _this = this;
        ACTIVATION_EVENT_TYPES.forEach((evtType)=>{
            _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        if (this.adapter_.isUnbounded()) {
            this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
    };
    proto.prototype.deregisterDeactivationHandlers_ = function() {
        const _this = this;
        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach((evtType)=>{
            _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
        });
    };
    proto.prototype.removeCssVars_ = function() {
        const proto = this;
        const proto = proto.strings;
        const keys = Object.keys(proto);
        keys.forEach((proto)=>{
            if (proto.indexOf('VAR_') === 0) {
                proto.adapter_.updateCssVariable(proto[proto], null);
            }
        });
    };
    proto.prototype.activate_ = function(proto) {
        const _this = this;
        if (this.adapter_.isSurfaceDisabled()) {
            return;
        }
        const proto = this.activationState_;
        if (proto.isActivated) {
            return;
        }
        const previousActivationEvent = this.previousActivationEvent_;
        const utils = previousActivationEvent && proto !== undefined && previousActivationEvent.type !== proto.type;
        if (utils) {
            return;
        }
        proto.isActivated = true;
        proto.isProgrammatic = proto === undefined;
        proto.activationEvent = proto;
        proto.wasActivatedByPointer = proto.isProgrammatic ? false : proto !== undefined && (proto.type === 'mousedown' || proto.type === 'touchstart' || proto.type === 'pointerdown');
        const hasActivatedChild = proto !== undefined && activatedTargets.length > 0 && activatedTargets.some((target)=>_this.adapter_.containsEventTarget(target));
        if (hasActivatedChild) {
            this.resetActivationState_();
            return;
        }
        if (proto !== undefined) {
            activatedTargets.push(proto.target);
            this.registerDeactivationHandlers_(proto);
        }
        proto.wasElementMadeActive = this.checkElementMadeActive_(proto);
        if (proto.wasElementMadeActive) {
            this.animateActivation_();
        }
        requestAnimationFrame(()=>{
            activatedTargets = [];
            if (!proto.wasElementMadeActive && proto !== undefined && (proto.key === ' ' || proto.keyCode === 32)) {
                proto.wasElementMadeActive = _this.checkElementMadeActive_(proto);
                if (proto.wasElementMadeActive) {
                    _this.animateActivation_();
                }
            }
            if (!proto.wasElementMadeActive) {
                _this.activationState_ = _this.defaultActivationState_();
            }
        });
    };
    proto.prototype.checkElementMadeActive_ = function(evt) {
        if (evt !== undefined && evt.type === 'keydown') {
            return this.adapter_.isSurfaceActive();
        }
        return true;
    };
    proto.prototype.animateActivation_ = function() {
        const proto = this;
        const MDCRippleFoundation_strings = proto.strings;
        const { VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END } = MDCRippleFoundation_strings;
        const MDCRippleFoundation_cssClasses = proto.cssClasses;
        const { FG_DEACTIVATION, FG_ACTIVATION } = MDCRippleFoundation_cssClasses;
        const DEACTIVATION_TIMEOUT_MS = proto.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal_();
        let translateStart = '';
        let Flickity = '';
        if (!this.adapter_.isUnbounded()) {
            const _c = this.getFgTranslationCoordinates_();
            const { startPoint, endPoint: Flickity } = _c;
            translateStart = `${startPoint.x}px, ${startPoint.y}px`;
            Flickity = `${Flickity.x}px, ${Flickity.y}px`;
        }
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, Flickity);
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(()=>proto.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
    };
    proto.prototype.getFgTranslationCoordinates_ = function() {
        const activationState_ = this.activationState_;
        const { activationEvent: proto, wasActivatedByPointer } = activationState_;
        let proto;
        if (wasActivatedByPointer) {
            proto = proto_7(proto, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
            proto = {
                x: this.frame_.width / 2,
                y: this.frame_.height / 2
            };
        }
        proto = {
            x: proto.x - this.initialSize_ / 2,
            y: proto.y - this.initialSize_ / 2
        };
        const endPoint = {
            x: this.frame_.width / 2 - this.initialSize_ / 2,
            y: this.frame_.height / 2 - this.initialSize_ / 2
        };
        return {
            startPoint: proto,
            endPoint
        };
    };
    proto.prototype.runDeactivationUXLogicIfReady_ = function() {
        const _this = this;
        const FG_DEACTIVATION = proto.cssClasses.FG_DEACTIVATION;
        const activationState_ = this.activationState_;
        const { hasDeactivationUXRun, isActivated } = activationState_;
        const activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded_) {
            this.rmBoundedActivationClasses_();
            this.adapter_.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer_ = setTimeout(()=>{
                _this.adapter_.removeClass(FG_DEACTIVATION);
            }, numbers.FG_DEACTIVATION_MS);
        }
    };
    proto.prototype.rmBoundedActivationClasses_ = function() {
        const FG_ACTIVATION = proto.cssClasses.FG_ACTIVATION;
        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
    };
    proto.prototype.resetActivationState_ = function() {
        const _this = this;
        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        setTimeout(()=>_this.previousActivationEvent_ = undefined, proto.numbers.TAP_DELAY_MS);
    };
    proto.prototype.deactivate_ = function() {
        const _this = this;
        const activationState = this.activationState_;
        if (!activationState.isActivated) {
            return;
        }
        const utils = {
            ...activationState
        };
        if (activationState.isProgrammatic) {
            requestAnimationFrame(()=>_this.animateDeactivation_(utils));
            this.resetActivationState_();
        } else {
            this.deregisterDeactivationHandlers_();
            requestAnimationFrame(()=>{
                _this.activationState_.hasDeactivationUXRun = true;
                _this.animateDeactivation_(utils);
                _this.resetActivationState_();
            });
        }
    };
    proto.prototype.animateDeactivation_ = function({ wasActivatedByPointer, wasElementMadeActive }) {
        if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady_();
        }
    };
    proto.prototype.layoutInternal_ = function() {
        const Flickity = this;
        this.frame_ = this.adapter_.computeBoundingRect();
        const maxDim = Math.max(this.frame_.height, this.frame_.width);
        const Flickity = ()=>{
            const Flickity = Math.sqrt(Flickity.frame_.width ** 2 + Flickity.frame_.height ** 2);
            return Flickity + proto.numbers.PADDING;
        };
        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : Flickity();
        const initialSize = Math.floor(maxDim * proto.numbers.INITIAL_ORIGIN_SCALE);
        if (this.adapter_.isUnbounded() && initialSize % 2 !== 0) {
            this.initialSize_ = initialSize - 1;
        } else {
            this.initialSize_ = initialSize;
        }
        this.fgScale_ = `${this.maxRadius_ / this.initialSize_}`;
        this.updateLayoutCssVars_();
    };
    proto.prototype.updateLayoutCssVars_ = function() {
        const MDCRippleFoundation_strings = proto.strings;
        const { VAR_FG_SIZE, VAR_LEFT, VAR_TOP, VAR_FG_SCALE } = MDCRippleFoundation_strings;
        this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
        if (this.adapter_.isUnbounded()) {
            this.unboundedCoords_ = {
                left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
                top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
            };
            this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
            this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
        }
    };
    return proto;
})(MDCFoundation);
const ripple_foundation = null && MDCRippleFoundation;
;
const LazyLoader = ((_super)=>{
    __extends(LazyLoader, _super);
    function LazyLoader() {
        const _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disabled = false;
        return _this;
    }
    LazyLoader.attachTo = (root, opts = {
        isUnbounded: undefined
    })=>{
        const ripple = new LazyLoader(root);
        if (opts.isUnbounded !== undefined) {
            ripple.unbounded = opts.isUnbounded;
        }
        return ripple;
    };
    LazyLoader.createAdapter = (instance)=>({
            addClass (className) {
                return instance.root_.classList.add(className);
            },
            browserSupportsCssVars () {
                return supportsCssVariables(window);
            },
            computeBoundingRect () {
                return instance.root_.getBoundingClientRect();
            },
            containsEventTarget (target) {
                return instance.root_.contains(target);
            },
            deregisterDocumentInteractionHandler (evtType, handler) {
                return document.documentElement.removeEventListener(evtType, handler, applyPassive());
            },
            deregisterInteractionHandler (evtType, handler) {
                return instance.root_.removeEventListener(evtType, handler, applyPassive());
            },
            deregisterResizeHandler (handler) {
                return window.removeEventListener('resize', handler);
            },
            getWindowPageOffset () {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                };
            },
            isSurfaceActive () {
                return matches(instance.root_, ':active');
            },
            isSurfaceDisabled () {
                return Boolean(instance.disabled);
            },
            isUnbounded () {
                return Boolean(instance.unbounded);
            },
            registerDocumentInteractionHandler (evtType, handler) {
                return document.documentElement.addEventListener(evtType, handler, applyPassive());
            },
            registerInteractionHandler (evtType, handler) {
                return instance.root_.addEventListener(evtType, handler, applyPassive());
            },
            registerResizeHandler (handler) {
                return window.addEventListener('resize', handler);
            },
            removeClass (className) {
                return instance.root_.classList.remove(className);
            },
            updateCssVariable (varName, value) {
                return instance.root_.style.setProperty(varName, value);
            }
        });
    Object.defineProperty(LazyLoader.prototype, "unbounded", {
        get () {
            return Boolean(this.unbounded_);
        },
        set (unbounded) {
            this.unbounded_ = Boolean(unbounded);
            this.setUnbounded_();
        },
        enumerable: true,
        configurable: true
    });
    LazyLoader.prototype.activate = function() {
        this.foundation_.activate();
    };
    LazyLoader.prototype.deactivate = function() {
        this.foundation_.deactivate();
    };
    LazyLoader.prototype.layout = function() {
        this.foundation_.layout();
    };
    LazyLoader.prototype.getDefaultFoundation = function() {
        return new MDCRippleFoundation(LazyLoader.createAdapter(this));
    };
    LazyLoader.prototype.initialSyncWithDOM = function() {
        const root = this.root_;
        this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
    };
    LazyLoader.prototype.setUnbounded_ = function() {
        this.foundation_.setUnbounded(Boolean(this.unbounded_));
    };
    return LazyLoader;
})(MDCComponent);
;
const setupRippleEffect = (rootElement)=>{
    if ('reduceAnimations' in document.body.dataset) {
        return;
    }
    const rippleElements = [
        '.button-primary',
        '.button-secondary',
        '.slideshow-slide__button',
        '.product-form--atc-button',
        '.mobile-nav-content .navmenu-link',
        '.mobile-nav-content .navmenu-button',
        '.mobile-nav-primary-content .navmenu-link',
        '.mobile-nav-primary-content .navmenu-button',
        '.live-search-button',
        '.options-selection__radios .options-selection__option-value-name',
        '.countdown-timer__caption-button',
        '.order-page__atc-button'
    ];
    rootElement.querySelectorAll(rippleElements.join(',')).forEach((LazyLoader)=>{
        if (!LazyLoader.classList.contains('disabled') && !LazyLoader.hasAttribute('disabled')) {
            LazyLoader.classList.add('mdc-ripple-surface');
            LazyLoader.attachTo(LazyLoader);
        }
    });
};
const Ripple = {
    setupRippleEffect
};
;
class AddToCartFlyout {
    constructor(formData, Flickity, callbacks = {}){
        this.formData = formData;
        this.settings = {
            moneyFormat: null,
            cartRedirection: false,
            ...Flickity.settings
        };
        this.atcButton = Flickity.atcButton;
        this.header = document.querySelector('[data-site-header]');
        this.announcementBar = document.querySelector('[data-announcement-bar]');
        this.utilityBar = document.querySelector('[data-utility-bar]');
        this.flyOutSelector = '[data-atc-banner]';
        this.atcTemplate = document.querySelector(`[data-templates] ${this.flyOutSelector}`);
        this.recipientForm = document.querySelector('[data-recipient-form]');
        this.activeElement = document.activeElement;
        this.itemId = null;
        this.flyOut = null;
        this._onInit = this._onInit.bind(this);
        this._onError = this._onError.bind(this);
        this._onSuccess = this._onSuccess.bind(this);
        this._onCloseAll = this._onCloseAll.bind(this);
        this.callbacks = {
            onInit: this._onInit,
            onError: this._onError,
            onSuccess: this._onSuccess,
            onClose: this._onCloseAll,
            ...callbacks
        };
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
        this._closeFlyOut = this._closeFlyOut.bind(this);
        this._closeEsc = this._closeEsc.bind(this);
        this.events = new proto_5.Z();
        this.Images = new Images();
        this.messageBanner = null;
        this.callbacks.onInit();
        this._disableAtcButton();
        this._updateCart();
    }
    unload() {
        if (this.messageBanner) {
            this.messageBanner.unload();
        }
        this._closeFlyOut();
    }
    _updateCart() {
        const PageDots = this.atcTemplate.cloneNode(true);
        const PageDots = this.formData.filter((PageDots)=>PageDots.name === 'quantity');
        const PageDots = PageDots[0].value;
        define_2().ajax({
            type: 'POST',
            url: `${window.Theme.routes.cart_add_url}.js`,
            data: define_2().param(this.formData),
            dataType: 'json'
        }).done((response)=>{
            this.itemId = response.id;
            if (response.image) {
                const imageUrl = this.Images.getSizedImageUrl(response.image, '200x');
                this.Images.loadImage(imageUrl);
                const PageDots = PageDots.querySelector('[data-atc-banner-product-image]');
                PageDots.innerHTML = `<img src="${imageUrl}" alt="${response.product_title}">`;
            }
            const productTitle = PageDots.querySelector('[data-atc-banner-product-title]');
            productTitle.innerHTML = response.product_title;
            if (response.variant_options[0] !== 'Title' && response.variant_options[0] !== 'Default Title') {
                const productOptions = PageDots.querySelector('[data-atc-banner-product-options]');
                productOptions.innerHTML = response.variant_options.join(', ');
            }
            if (response.selling_plan_allocation) {
                const productSubscriptionTitle = PageDots.querySelector('[data-atc-banner-product-subscription-title]');
                productSubscriptionTitle.innerHTML = response.selling_plan_allocation.selling_plan.name;
            }
            const productPriceQuantity = PageDots.querySelector('[data-atc-banner-product-price-quantity]');
            productPriceQuantity.innerHTML = `${PageDots} × `;
            const PageDots = PageDots.querySelector('[data-free-shipping-bar]');
            if (PageDots) {
                shopify_asyncview_dist_index_es.load(window.Theme.routes.cart_url, 'static-cart').then(({ html })=>{
                    PageDots.innerHTML = html.free_shipping_bar;
                }).catch(()=>{
                    console.error('Error loading content.');
                });
            }
            define_2().ajax({
                type: 'GET',
                url: `${window.Theme.routes.cart_url}.js`,
                dataType: 'json'
            }).done((utils)=>{
                if (this.settings.cartRedirection || document.body.classList.contains('template-cart')) {
                    location.href = window.Theme.routes.cart_url;
                    return;
                }
                this.callbacks.onSuccess();
                this.formData = {};
                let lineItem = null;
                utils.items.forEach((item)=>{
                    if (item.id === this.itemId) {
                        if (!lineItem) {
                            lineItem = item;
                        } else {
                            lineItem.line_level_discount_allocations = lineItem.line_level_discount_allocations.concat(item.line_level_discount_allocations);
                            lineItem.final_price = lineItem.final_price > item.final_price ? lineItem.final_price : item.final_price;
                            lineItem.quantity += item.quantity;
                        }
                    }
                });
                const PageDots = PageDots.querySelector('[data-atc-banner-product-price-value]');
                PageDots.innerHTML = Shopify.formatMoney(lineItem.original_price, this.settings.moneyFormat);
                const productPriceDiscounted = PageDots.querySelector('[data-atc-banner-product-price-discounted]');
                if (lineItem.final_price < lineItem.original_price) {
                    productPriceDiscounted.innerHTML = Shopify.formatMoney(lineItem.final_price, this.settings.moneyFormat);
                    productPriceDiscounted.classList.remove('hidden');
                    PageDots.classList.add('original-price');
                } else {
                    productPriceDiscounted.classList.add('hidden');
                    PageDots.classList.remove('original-price');
                }
                const PageDots = PageDots.querySelector('[data-atc-banner-product-discounts]');
                const PageDots = PageDots.querySelector('[data-atc-banner-unit-price]');
                let PageDots = PageDots.innerHTML;
                if (PageDots && lineItem.unit_price_measurement) {
                    PageDots = PageDots.replace('** total_quantity **', `${lineItem.unit_price_measurement.quantity_value}${lineItem.unit_price_measurement.quantity_unit}`);
                    PageDots = PageDots.replace('** unit_price **', Shopify.formatMoney(lineItem.unit_price, this.settings.moneyFormat));
                    if (lineItem.unit_price_measurement.reference_value === 1) {
                        PageDots = PageDots.replace('** unit_measure **', lineItem.unit_price_measurement.reference_unit);
                    } else {
                        PageDots = PageDots.replace('** unit_measure **', `${lineItem.unit_price_measurement.reference_value}${lineItem.unit_price_measurement.reference_unit}`);
                    }
                    PageDots.innerHTML = PageDots;
                    PageDots.classList.remove('hidden');
                }
                if (lineItem.line_level_discount_allocations.length > 0) {
                    const discountItemTemplate = PageDots.firstElementChild.cloneNode(true);
                    PageDots.innerHTML = '';
                    lineItem.line_level_discount_allocations.forEach((discount)=>{
                        const PageDots = discountItemTemplate.cloneNode(true);
                        const title = PageDots.querySelector('.discount-title');
                        const amount = PageDots.querySelector('.discount-amount');
                        title.innerHTML = discount.discount_application.title;
                        amount.innerHTML = Shopify.formatMoney(discount.amount, this.settings.moneyFormat);
                        PageDots.appendChild(PageDots);
                    });
                    PageDots.classList.remove('hidden');
                } else {
                    PageDots.classList.add('hidden');
                }
                const Flickity = PageDots.querySelector('[data-atc-banner-cart-subtotal]');
                Flickity.innerHTML = Shopify.formatMoney(utils.total_price, this.settings.moneyFormat);
                const utils = PageDots.querySelector('[data-atc-banner-cart-button] span');
                utils.innerHTML = utils.item_count;
                this.header.appendChild(PageDots);
                this.flyOut = PageDots;
                setupRippleEffect(this.flyOut);
                const Flickity = new CustomEvent('cartcount:update', {
                    detail: utils
                });
                window.dispatchEvent(Flickity);
                document.dispatchEvent(new Event('closeFlyouts'));
                const closeButton = PageDots.querySelector('[data-atc-banner-close]');
                this.events.register(closeButton, 'click', (e)=>this._closeFlyOut(e));
                this.events.register(document, 'click', (e)=>this._handleDocumentClick(e));
                this.events.register(document, 'touchstart', (e)=>this._handleDocumentClick(e));
                this.events.register(document, 'closeFlyouts', (e)=>this._closeFlyOut(e));
                this.events.register(window, 'keydown', (e)=>this._closeEsc(e));
                this._enableAtcButton();
                this.atcAnimation = animations_es_transition({
                    el: this.flyOut,
                    state: 'closed'
                });
                this.atcAnimation.animateTo('open').then(()=>{
                    proto_3(this.flyOut);
                });
            });
        }).fail((response)=>{
            let proto;
            try {
                const responseText = JSON.parse(response.responseText);
                proto = responseText.description;
            } catch (proto) {
                proto = `${response.status} ${response.statusText}`;
                if (response.status === 401) {
                    proto = `${proto}. Try refreshing and logging in.`;
                }
            }
            this._enableAtcButton();
            if (proto.email) {
                this.recipientForm.classList.add('recipient-form--has-errors');
            } else {
                this.callbacks.onError(proto);
            }
        });
    }
    _onError(error) {
        this.messageBanner = new proto_6(error, 'error');
    }
    _onInit() {
        if (this.messageBanner) {
            this.messageBanner.unload();
        }
        if (this.announcementBar) {
            this.announcementBar.style.setProperty('--index-announcement-bar', '1100');
        }
        if (this.utilityBar) {
            this.utilityBar.style.setProperty('--index-utility-bar', '1100');
        }
    }
    _onSuccess() {}
    _onCloseAll() {}
    _closeEsc(e) {
        if (e.key === 'Escape') {
            this._closeFlyOut(e);
        }
    }
    _closeFlyOut() {
        if (!this.flyOut) {
            return;
        }
        removeTrapFocus(this.flyOut);
        if (this.documentClickEventTarget && 'liveSearchInput' in this.documentClickEventTarget.dataset) {
            this.documentClickEventTarget.focus();
        } else if (this.activeElement) {
            this.activeElement.focus();
        }
        this.atcAnimation.animateTo('closed').then(()=>{
            if (this.announcementBar) {
                this.announcementBar.style.setProperty('--index-announcement-bar', '');
            }
            if (this.utilityBar) {
                this.utilityBar.style.setProperty('--index-utility-bar', '');
            }
            this.callbacks.onClose();
            this.flyOut.remove();
            this.flyOut = null;
            this.events.unregisterAll();
            this.atcAnimation.unload();
            delete this.Images;
        });
    }
    _disableAtcButton() {
        this.atcButton.classList.add('processing');
        this.atcButton.setAttribute('disabled', 'disabled');
    }
    _enableAtcButton() {
        this.atcButton.removeAttribute('disabled');
        this.atcButton.classList.remove('processing');
    }
    _handleDocumentClick(e) {
        const { target } = e;
        const $parent = define_2()(target).parents('[data-atc-banner]');
        if ($parent.length) {
            return;
        }
        this.documentClickEventTarget = target;
        this._closeFlyOut(e);
    }
}
;
class PaymentTerms {
    constructor(el){
        this._el = el;
        this._reference = this._el.querySelector('[data-payment-terms-reference] shopify-payment-terms');
        this._target = this._el.querySelector('[data-payment-terms-target]');
        if (!this._reference || !this._target) {
            return;
        }
        this._input = document.createElement('input');
        this._input.name = 'id';
        this._input.type = 'hidden';
        this._target.appendChild(this._input);
        this._target.appendChild(this._reference);
        this._target.style.display = null;
    }
    update(Player) {
        if (!this._reference || !this._target) {
            return;
        }
        this._input.value = Player;
        this._input.dispatchEvent(new Event('change', {
            bubbles: true
        }));
    }
}
;
class ProductDetails {
    constructor(Player){
        this.$window = define_2()(window);
        this.$formArea = Player.$formArea;
        this.$details = Player.$details;
        this.context = Player.context;
        this.settings = Player.settings;
        this.product = Player.product;
        this.useHistory = Player.useHistory;
        this.sectionId = Player.sectionId;
        this.el = Player.productEl;
        this.events = new proto_5.Z();
        this.url = window.location.search;
        this.urlParams = new URLSearchParams(this.url);
        this.paymentTerms = new PaymentTerms(this.el);
        this.variantSelection = this.el.querySelector('[data-variant-selection]');
        this.select_first_available_variant = this.settings.select_first_available_variant;
        this.recipientFormEl = this.el.querySelector('[data-recipient-form]');
        this.surfacePickUpEl = this.el.querySelector('[data-surface-pick-up]');
        this.requestFormEl = this.el.querySelector('[data-product-request-form]');
        this.gallery = Player.gallery || this.el.querySelector('product-gallery');
        if (this.recipientFormEl) {
            this.recipientForm = new pxs_gift_card_recipient_form_dist_index_es(this.el);
        }
        if (this.surfacePickUpEl) {
            this.surfacePickUp = new shopify_surface_pick_up_dist_index_es(this.surfacePickUpEl);
        }
        if (Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
        }
        if (this.requestFormEl) {
            this.requestFormSKU = this.requestFormEl.querySelector('[data-request-form-sku]');
            this.requestFormVariant = this.requestFormEl.querySelector('[data-request-form-variant]');
            this.requestFormVariantID = this.requestFormEl.querySelector('[data-request-form-variant-id]');
            new Forms(this.requestFormEl);
            if (!this.select_first_available_variant && this.requestFormVariant && this.requestFormVariantID) {
                this.requestFormVariant.removeAttribute('name');
                this.requestFormVariantID.removeAttribute('name');
            }
            this.events.register(this.requestFormEl, 'submit', ()=>{
                const proto = this.requestFormEl.querySelector('[data-product-request-form-message]');
                if (proto.value === '') {
                    proto.classList.add('form-field-filled');
                    proto.innerHTML = this.context.request_message_empty;
                }
            });
            this.events.register(window, 'load', ()=>{
                if (this.urlParams.get('contact_posted')) {
                    this.requestFormEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
        if (!define_2()(this.$formArea).length) {
            return;
        }
        if (this.variantSelection) {
            this.isDefaultVariant = !!this.variantSelection.querySelector('[data-variants].variant-selection__variants--default');
            this.variantSelection.getVariant().then((proto)=>{
                if (this.surfacePickUp) {
                    this.surfacePickUp.load(proto ? proto.id : null);
                }
                this._updateBadge(proto);
                this._updatePrice(proto);
                if (!proto) {
                    this._showPriceRange();
                    this._updateSKU();
                }
                this.events.register(this.variantSelection, 'variant-change', (event)=>this._switchVariant(event.detail));
            });
        }
        this.modal = new jQuery({
            onClose: ()=>this.modal.unload(),
            modalId: 1
        });
        if (this.surfacePickUp) {
            this.surfacePickUp.onModalRequest((contents)=>{
                let Flickity = this.$formArea[0].querySelector('[data-surface-pick-up-modal-contents]');
                this.variantSelection.getVariant().then((variant)=>{
                    const variantTitle = !this.isDefaultVariant ? `<div class="surface-pick-up-modal__variant">${variant.title}</div>` : '';
                    const modalContents = `
            <div class="surface-pick-up-modal__header">
              <h2 class="surface-pick-up-modal__title">${this.product.title}</h2>
              ${variantTitle}
            </div>
            ${contents}
            `;
                    if (!Flickity) {
                        Flickity = document.createElement('div');
                        Flickity.setAttribute('data-surface-pick-up-modal-contents', '');
                        Flickity.style.display = 'none';
                        Flickity.innerHTML = modalContents;
                        this.$formArea[0].appendChild(Flickity);
                    } else {
                        Flickity.innerHTML = modalContents;
                    }
                    this.modal.open('[data-surface-pick-up-modal-contents]', 'surface-pick-up');
                });
            });
        }
        this.addToCartFlyout = null;
        this.atcCallbacks = Player.atcCallbacks;
        this.$form = this.$formArea.find('[data-product-form]');
        this.$productAtcButton = this.$formArea.find('[data-product-atc]');
        this.$productVariants = this.$form.find('[data-variants]');
        this.$productOptions = this.$form.find('[data-product-option]');
        this.productPricing = this.$details[0].querySelector('[data-product-pricing]');
        this.detailsLink = this.$formArea[0].querySelector('[data-product-details-link]');
        this.quantitySelector = this.el.querySelector('[data-quantity-selector]');
        if (this.detailsLink) {
            this.detailsBaseHref = this.detailsLink.getAttribute('href');
        }
        this.variantFields = {
            $priceContainer: this.$details.find('[data-price-container]'),
            $priceMoney: this.$details.find('[data-price-container] [data-price]'),
            $compareAtPrice: this.$details.find('[data-price-compare-container]'),
            $compareAtPriceMoney: this.$details.find('[data-price-compare-container] [data-price-compare]'),
            $badge: this.$details.find('[data-badge-sales]'),
            $badgeRange: this.$details.find('[data-badge-sales-range]'),
            $badgeSingle: this.$details.find('[data-badge-sales-single]'),
            $sku: this.$details.find('[data-product-sku]'),
            stockLevels: this.$details[0].querySelectorAll('[data-stock-level]'),
            unitPrice: this.$details[0].querySelector('[data-unit-price]'),
            totalQuantity: this.$details[0].querySelector('[data-total-quantity]'),
            unitPriceAmount: this.$details[0].querySelector('[data-unit-price-amount]'),
            unitPriceMeasure: this.$details[0].querySelector('[data-unit-price-measure]'),
            taxLine: this.$details[0].querySelector('[data-tax-line]'),
            hiddenComparePrice: this.$details[0].querySelector('[data-compare-price-hidden]'),
            hiddenCurrentPrice: this.$details[0].querySelector('[data-current-price-hidden]'),
            hiddenComparePriceRange: this.$details[0].querySelector('[data-compare-price-range-hidden]'),
            hiddenCurrentPriceRange: this.$details[0].querySelector('[data-current-price-range-hidden]')
        };
        if (this.quantitySelector) {
            this.productQuantityBox = new utils_2({
                quantityField: this.quantitySelector
            });
        }
        this.forms = new Forms(this.$form);
        if (this.product) {
            this._bindEvents();
        }
    }
    unload() {
        if (this.$form) {
            this.$form.off(`.product-details-${this.sectionId}`);
        }
        if (this.forms) {
            this.forms.unload();
        }
        if (this.messageBanner) {
            this.messageBanner.unload();
        }
        this.events.unregisterAll();
    }
    _bindEvents() {
        this.$form.on(`submit.product-details-${this.sectionId}`, (event)=>this._addToCartFlyout(event));
    }
    _switchVariant({ variant: PrevNextButton }) {
        if (this.productPricing) {
            if (!PrevNextButton) {
                this.productPricing.style.visibility = 'hidden';
            } else {
                this.productPricing.style.visibility = 'visible';
            }
        }
        this.$productVariants.val(PrevNextButton.id);
        console.log(this.gallery, PrevNextButton);
        if (this.gallery && PrevNextButton.featured_media) {
            this.gallery.showVariantMedia(PrevNextButton);
        }
        if (this.surfacePickUp) {
            this.surfacePickUp.load(PrevNextButton.id);
        }
        this._updatePrice(PrevNextButton);
        this._updateSKU(PrevNextButton);
        this._updateBadge(PrevNextButton);
        this._updateButton(PrevNextButton);
        this._updateSwatchLabel(PrevNextButton);
        this._updateFullDetailsLink(PrevNextButton);
        this._updateUnitPrice(PrevNextButton);
        this._updateStockLevels(PrevNextButton);
        this.paymentTerms.update(PrevNextButton.id);
        if (Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
            const paymentButton = this.el.querySelector('dynamic-checkout');
            if (PrevNextButton.available && paymentButton && paymentButton.hasAttribute('disabled')) {
                paymentButton.removeAttribute('disabled');
            }
        }
        if (this.useHistory) {
            const url = `${this.product.handle}?${define_2().param({
                variant: PrevNextButton.id
            })}`;
            history.replaceState({}, 'variant', url);
        }
        if (this.requestFormEl && !this.urlParams.get('contact_posted')) {
            this.requestFormVariant.value = PrevNextButton.title;
            this.requestFormVariantID.value = PrevNextButton.id;
            if (this.requestFormSKU.value === '') {
                this.requestFormSKU.removeAttribute('name');
            } else {
                this.requestFormSKU.setAttribute('name', 'contact[sku]');
            }
            if (!this.select_first_available_variant) {
                this.requestFormVariant.setAttribute('name', 'contact[variant]');
                this.requestFormVariantID.setAttribute('name', 'contact[id]');
            }
        }
    }
    _updateStockLevels(variant) {
        this.variantFields.stockLevels.forEach((el)=>{
            const stockLevelVariantId = Number(el.dataset.stockVariantId);
            if (variant.id === stockLevelVariantId) {
                el.setAttribute('data-stock-variant-selected', 'true');
            } else {
                el.setAttribute('data-stock-variant-selected', 'false');
            }
        });
    }
    _updatePrice(variant) {
        if (!this.productPricing) {
            return;
        }
        if (!variant) {
            this._showPriceRange();
            this.productPricing.style.visibility = 'visible';
            return;
        }
        const compareAtPrice = this.variantFields.hiddenComparePrice.innerHTML;
        const currentPrice = this.variantFields.hiddenCurrentPrice.innerHTML;
        this.variantFields.$compareAtPrice[0].innerHTML = compareAtPrice;
        this.variantFields.$priceContainer[0].innerHTML = currentPrice;
        this.variantFields.$priceMoney = this.$details.find('[data-price-container] [data-price]');
        this.variantFields.$compareAtPriceMoney = this.$details.find('[data-price-compare-container] [data-price-compare]');
        const hasComparePrice = !!variant.compare_at_price && variant.compare_at_price > variant.price;
        this.variantFields.$compareAtPrice.toggleClass('visible', hasComparePrice);
        this.variantFields.$compareAtPriceMoney.html(Shopify.formatMoney(variant.compare_at_price, this.settings.money_format));
        this.variantFields.$priceMoney.html(Shopify.formatMoney(variant.price, this.settings.money_format));
    }
    _showPriceRange() {
        this._updateBadge(false);
        const currentPriceIsRange = this.product.price_varies;
        const currentCompareAtPriceIsRange = this.product.variants.some((variant)=>(variant.compare_at_price || variant.price) !== this.product.compare_at_price);
        const currentPrice = currentPriceIsRange ? this.variantFields.hiddenCurrentPriceRange.innerHTML : this.variantFields.hiddenCurrentPrice.innerHTML;
        const compareAtPrice = currentCompareAtPriceIsRange ? this.variantFields.hiddenComparePriceRange.innerHTML : this.variantFields.hiddenComparePrice.innerHTML;
        const PrevNextButton = this.product.compare_at_price_max > this.product.price_min;
        this.variantFields.$compareAtPrice.toggleClass('visible', PrevNextButton);
        this.variantFields.$compareAtPrice[0].innerHTML = compareAtPrice;
        this.variantFields.$priceContainer[0].innerHTML = currentPrice;
    }
    _updateSKU(variant = false) {
        if (variant) {
            if (variant.sku === '') {
                this.variantFields.$sku.parent().addClass('product-sku--empty');
            } else {
                this.variantFields.$sku.parent().removeClass('product-sku--empty');
                this.variantFields.$sku.parent().show();
            }
            this.variantFields.$sku.text(variant.sku);
            if (this.requestFormEl && !this.urlParams.get('contact_posted')) {
                this.requestFormSKU.value = variant.sku;
            }
        } else {
            this.variantFields.$sku.parent().hide();
        }
    }
    _updateBadge(proto = false) {
        if (!proto) {
            const priceSaved = this.product.compare_at_price ? this.product.compare_at_price_max - this.product.price_min : 0;
            if (priceSaved <= 0) {
                this.variantFields.$badge.toggle(false);
            } else {
                this.variantFields.$badgeSingle.toggle(false);
                this.variantFields.$badgeRange.toggle(!!priceSaved);
                this.variantFields.$badge.toggle(!!priceSaved);
            }
        } else {
            const proto = proto.compare_at_price ? proto.compare_at_price - proto.price : 0;
            if (proto <= 0) {
                this.variantFields.$badge.toggle(false);
            } else {
                this.variantFields.$badgeRange.toggle(false);
                this.variantFields.$badgeSingle.toggle(!!proto);
                this.variantFields.$badge.toggle(!!proto);
                const $badgeMoneySaved = this.variantFields.$badgeSingle.find('[data-price-money-saved]');
                const Flickity = this.variantFields.$badgeSingle.find('[data-price-percent-saved]');
                if ($badgeMoneySaved.length) {
                    $badgeMoneySaved.text(Shopify.formatMoney(proto, this.settings.money_format));
                }
                if (Flickity.length) {
                    const Flickity = Math.round(proto * 100 / proto.compare_at_price);
                    Flickity.text(Flickity);
                }
            }
        }
    }
    _updateButton(variant) {
        if (!variant) {
            this.$productAtcButton.text(this.context.product_unavailable);
            this.$productAtcButton.addClass('disabled').prop('disabled', true);
        } else if (variant.available) {
            if (this.$productAtcButton[0].hasAttribute('data-product-atc-preorder')) {
                this.$productAtcButton.text(this.context.product_preorder);
            } else {
                this.$productAtcButton.text(this.context.product_available);
            }
            this.$productAtcButton.removeClass('disabled').prop('disabled', false);
        } else {
            this.$productAtcButton.text(this.context.product_sold_out);
            this.$productAtcButton.addClass('disabled').prop('disabled', true);
        }
    }
    _updateSwatchLabel(variant) {
        if (this.settings.swatches_enable) {
            const swatchLabel = this.$form[0].querySelector('[data-option-swatch-value]');
            if (swatchLabel) {
                swatchLabel.innerText = variant.options[parseInt(swatchLabel.dataset.optionSwatchValue, 10)];
            }
        }
    }
    _updateFullDetailsLink(variant) {
        if (this.detailsLink) {
            this.detailsLink.setAttribute('href', `${this.detailsBaseHref}?variant=${variant.id}`);
        }
    }
    _updateUnitPrice(proto) {
        if (this.variantFields.unitPrice && proto.unit_price_measurement) {
            this.variantFields.totalQuantity.innerHTML = `${proto.unit_price_measurement.quantity_value}${proto.unit_price_measurement.quantity_unit}`;
            this.variantFields.unitPriceAmount.innerHTML = Shopify.formatMoney(proto.unit_price, this.settings.money_format);
            if (proto.unit_price_measurement.reference_value === 1) {
                this.variantFields.unitPriceMeasure.innerHTML = proto.unit_price_measurement.reference_unit;
            } else {
                this.variantFields.unitPriceMeasure.innerHTML = `${proto.unit_price_measurement.reference_value}${proto.unit_price_measurement.reference_unit}`;
            }
            this.variantFields.unitPrice.classList.remove('hidden');
        } else if (this.variantFields.unitPrice) {
            this.variantFields.unitPrice.classList.add('hidden');
        }
        if (this.variantFields.taxLine) {
            if (proto.taxable) {
                this.variantFields.taxLine.classList.remove('hidden');
            } else {
                this.variantFields.taxLine.classList.add('hidden');
            }
        }
    }
    _addToCartFlyout(event) {
        event.preventDefault();
        if (this.recipientFormEl) {
            this.recipientFormEl.classList.remove('recipient-form--has-errors');
        }
        this.variantSelection.getVariant().then((variant)=>{
            if (!variant) {
                this.messageBanner = new proto_6(this.context.select_variant, 'error');
                this.$form.get(0).classList.add('product-form--error-option-unselected');
                return;
            }
            if (this.addToCartFlyout) {
                this.addToCartFlyout.unload();
            }
            const formData = this.$form.serializeArray();
            const options = {
                atcButton: this.$productAtcButton[0],
                settings: {
                    moneyFormat: this.settings.money_format,
                    cartRedirection: this.settings.cart_redirection
                }
            };
            this.addToCartFlyout = new AddToCartFlyout(formData, options, this.atcCallbacks);
        });
    }
}
;
const initShopifyProductReviews = ()=>{
    if (!window.SPR) {
        return;
    }
    window.SPR.registerCallbacks();
    window.SPR.initRatingHandler();
    window.SPR.initDomEls();
    window.SPR.loadProducts();
    window.SPR.loadBadges();
};
const ProductReviews = {
    initShopifyProductReviews
};
;
class ProductQuickshop {
    constructor(options){
        this.$el = options.$el;
        this.id = options.id;
        this.sectionContext = options.sectionContext;
        this.initialVariant = options.initialVariant || null;
        this.quickShopSelector = options.quickShopSelector ? options.quickShopSelector : `#shopify-section-${this.id} [data-product-quickshop]`;
        this.$quickShop = define_2()(this.quickShopSelector);
        this.quickshopSpinner = this.$quickShop[0].querySelector('.quickshop-spinner');
        this.modalClass = options.modalClass;
        this.loaded = false;
        this.richText = null;
        this.productDetails = null;
        this.trigger = options.trigger;
        this.isOpen = false;
        this.openingAddToCart = false;
        this.modal = options.modal ? options.modal : null;
        this.quickshopContainer = options.quickshopContainer ? options.quickshopContainer : null;
        this.view = options.view ? options.view : 'product-quickshop';
        this.url = options.productUrl ? options.productUrl : this.$el.data('product-quickshop-url');
        this.modalCallbacks = {
            onOpen: this._open.bind(this),
            onClose: this._close.bind(this)
        };
        this.atcCallbacks = {
            onInit: this._onATCInit.bind(this),
            onError: this._onATCError.bind(this),
            onSuccess: this._onATCSuccess.bind(this),
            onClose: this._onATCClose.bind(this)
        };
        this._initialize();
    }
    _initialize() {
        if (this.modal == null) {
            this.modal = new jQuery(this.modalCallbacks);
            this.modal.open(this.quickShopSelector, this.modalClass);
        }
        this.isOpen = true;
        const modalContent = this.quickshopContainer || this.modal.$modalInner[0].querySelector('[data-modal-content]');
        fetch(this.url.indexOf('?') >= 0 ? `${this.url}&view=quickshop` : `${this.url}?view=quickshop`).then((response)=>response.text()).then((data)=>{
            const range = document.createRange();
            const documentFragment = range.createContextualFragment(data);
            const productWrapper = documentFragment.querySelector('[data-product-wrapper]');
            const product = documentFragment.querySelector('[data-section-type="static-product"]');
            this.productSettings = JSON.parse(product.innerHTML);
            if (!this.isOpen) {
                return;
            }
            if (this.modalClass === 'quickshop-slim') {
                productWrapper.querySelector('product-gallery')?.remove();
            }
            modalContent.innerHTML = '';
            modalContent.appendChild(productWrapper);
            initShopifyProductReviews();
            setupRippleEffect(modalContent);
            if (window.Shopify && Shopify.PaymentButton) {
                Shopify.PaymentButton.init();
            }
            const $quickShopModalContent = define_2()(modalContent);
            this.$message = $quickShopModalContent.find('[data-product-quickshop-message]');
            this.$formArea = $quickShopModalContent.find('[data-product-form-area]');
            this.$details = $quickShopModalContent.find('[data-product-details]');
            this.$description = $quickShopModalContent.find('[data-product-description]');
            this.productEl = modalContent;
            this.context = this.productSettings.context;
            this.settings = this.productSettings.settings;
            this.product = this.productSettings.product;
            this._onQuickshopLoaded();
        }).catch();
    }
    _onQuickshopLoaded() {
        if (this.loaded) {
            return;
        }
        if (this.$description && this.$description.length) {
            this.richText = new RichText(this.$description);
        }
        const options = {
            $formArea: this.$formArea,
            gallery: this.productEl.querySelector('product-gallery'),
            $details: this.$details,
            atcCallbacks: this.atcCallbacks,
            context: this.productSettings.context,
            sectionContext: this.sectionContext,
            settings: this.productSettings.settings,
            product: this.productSettings.product,
            useHistory: false,
            isQuickshop: true,
            initialVariant: this.initialVariant,
            productEl: this.productEl
        };
        this.modal.position();
        this.modal.finishedLoading();
        this.loaded = true;
        window.requestAnimationFrame(()=>{
            this.productDetails = new ProductDetails(options);
        });
    }
    _open() {}
    _close() {
        if (!this.openingAddToCart) {
            this.trigger.focus();
        }
        this.loaded = false;
        this.isOpen = false;
        this.$quickShop.empty();
        this.$quickShop.html(this.quickshopSpinner);
        this._toggleMessage('', false);
        this.modal.unload();
    }
    _toggleMessage(message, isVisible) {
        if (this.$message) {
            this.$message.html(message).toggleClass('visible', isVisible);
        }
    }
    _onATCInit() {
        this.openingAddToCart = true;
        this.$message.removeClass('visible');
    }
    _onATCError(error) {
        const $content = define_2()(`<div class="product-message--error" tabindex="-1">${error}</div>`);
        this._toggleMessage($content, true);
        $content.focus();
    }
    _onATCSuccess() {
        this._close();
    }
    _onATCClose() {}
    unload() {
        if (this.isLoaded) {
            return this._close().then(()=>{
                if (this.productDetails) {
                    this.productDetails.unload();
                }
                if (this.richText) {
                    this.richText.unload();
                }
            });
        }
        return Promise.resolve();
    }
}
;
let swatchGap = null;
class GridItemSwatches {
    constructor(options){
        this.el = options.el;
        this.setInitialVariant = options.setInitialVariant;
        this.expanded = false;
        this.swatchImages = {};
        this.swatchVariantIds = {};
        this.selectedImage = null;
        this.state = {};
        this.events = new proto_5.Z();
        this.data = JSON.parse(this.el.querySelector('[data-swatch-data]').innerHTML);
        this.variants = this.data.variants;
        this.swatchesContainer = this.el.querySelector('[data-swatches-container]');
        this.cardLinks = this.el.querySelectorAll('[data-product-page-link]');
        this.cardLinkHref = this.cardLinks[0].getAttribute('href');
        this.activeControlTime = 0;
        this.activeControl = this.swatchesContainer.querySelector('[checked]');
        this.isPreselected = !!this.activeControl;
        this.swatches = this.swatchesContainer.querySelectorAll('[data-swatch]');
        this.swatchCount = this.swatches.length;
        this.swatchCountWrapper = this.el.querySelector('[data-swatch-count-wrapper]');
        this.swatchCount = this.swatchCountWrapper.querySelector('[data-swatch-count]');
        this.swatchWidths = Array.prototype.map.call(this.swatches, (swatch)=>swatch.getBoundingClientRect().width);
        this.resize();
        this.el.querySelector('[data-swatches]').classList.add('processed');
        this.originalImages = {
            primary: this.el.querySelector('.productitem--image-primary'),
            alternate: this.el.querySelector('.productitem--image-alternate')
        };
        this.disableUnavailable();
        this.events.register(window, 'resize', just_debounce_default()(()=>this.resize(), 50));
        this.events.register(this.swatchCountWrapper, 'click', ()=>this._toggleExpanded());
        this.injectImagesMouseoverEvent = this.events.register(this.el, 'mouseover', ()=>this._injectImages());
        this.injectImagesFocusinEvent = this.events.register(this.el, 'focusin', ()=>this._injectImages());
        this.events.register(this.swatchesContainer, 'mouseover', (e)=>this._handleMouseOver(e));
        this.events.register(this.swatchesContainer, 'mouseleave', (e)=>this._handleMouseLeave(e));
        this.events.register(this.swatchesContainer, 'click', (e)=>this._handleClick(e));
        this.events.register(this.swatchesContainer, 'change', (e)=>this._handleChange(e));
        this.events.register(this.swatchesContainer, 'focusin', (e)=>this._handleSwatchFocus(e));
    }
    disableUnavailable() {
        if (!this.variants) {
            return;
        }
        const availableSwatches = {};
        this.variants.forEach((variant)=>{
            if (variant.available) {
                availableSwatches[variant[this.data.swatchOptionKey]] = true;
            }
        });
        const swatchInputs = this.swatchesContainer.querySelectorAll('input[name="swatch"]');
        swatchInputs.forEach((swatch)=>{
            if (!(swatch.value in availableSwatches)) {
                swatch.classList.add('swatch-disabled');
                if (!swatch.classList.contains('sold_out_option--selectable')) {
                    swatch.disabled = true;
                }
            }
        });
    }
    resize() {
        if (this.expanded) {
            this._toggleExpanded();
        }
        const availableWidth = this.swatchesContainer.getBoundingClientRect().width - parseInt(window.getComputedStyle(this.swatchesContainer).paddingRight, 10);
        let newShowSwatchCount = this.swatches.length;
        let cumulativeWidth = 0;
        for(let i = 0; i < this.swatches.length; i++){
            if (cumulativeWidth + this.getSwatchGap() + this.swatchWidths[i] < availableWidth) {
                cumulativeWidth += swatchGap + this.swatchWidths[i];
            } else {
                newShowSwatchCount = i;
                break;
            }
        }
        if (newShowSwatchCount === this.showSwatchCount) {
            return;
        }
        this.showSwatchCount = newShowSwatchCount;
        this.swatches.forEach((swatch, index)=>{
            if (index < this.showSwatchCount) {
                swatch.classList.add('productitem--swatches-swatch-visible');
                swatch.classList.remove('productitem--swatches-swatch-hidden');
            } else {
                swatch.classList.remove('productitem--swatches-swatch-visible');
                swatch.classList.add('productitem--swatches-swatch-hidden');
            }
        });
        this.swatchCountWrapper.style.left = `${cumulativeWidth}px`;
        if (this.swatches.length > this.showSwatchCount) {
            this.swatchCountWrapper.style.display = 'flex';
            this.swatchCount.innerText = `+${this.swatches.length - this.showSwatchCount}`;
        } else {
            this.swatchCountWrapper.style.display = 'none';
        }
    }
    _injectImages() {
        this.events.unregister(this.injectImagesFocusinEvent);
        this.events.unregister(this.injectImagesMouseoverEvent);
        shopify_asyncview_dist_index_es.load(this.cardLinkHref, 'product-swatch-data').then(({ data })=>{
            if (this.imagesInjected) {
                return;
            }
            this.imagesInjected = true;
            const tempContainer = document.createDocumentFragment();
            if (data.featuredImage) {
                const tempEl = document.createElement('div');
                tempEl.innerHTML = data.featuredImage;
                const img = tempEl.querySelector('img');
                tempContainer.appendChild(img);
                this.featuredImage = img;
            }
            data.swatches.forEach(({ swatchValue, imageString, variantId })=>{
                this.swatchVariantIds[swatchValue] = variantId;
                if (imageString) {
                    const tempEl = document.createElement('div');
                    tempEl.innerHTML = imageString;
                    const img = tempEl.querySelector('img');
                    tempContainer.appendChild(img);
                    this.swatchImages[swatchValue] = img;
                }
            });
            const imagesContainer = this.el.querySelector('[data-product-item-image]');
            const salesBadge = imagesContainer.querySelector('[data-badge-sales]');
            imagesContainer.insertBefore(tempContainer, salesBadge);
            rimg_shopify_dist_index_es.watch(imagesContainer);
            this._setState({
                swatchName: this.activeControl ? this.activeControl.value : null,
                primaryImage: this.originalImages.primary,
                hideAlternateImage: !!this.activeControl
            });
        });
    }
    _setState({ swatchName, primaryImage, hideAlternateImage }) {
        const oldPrimaryImg = this.state.primaryImage;
        const href = swatchName ? `${this.cardLinkHref}?variant=${this.swatchVariantIds[swatchName]}` : this.cardLinkHref;
        this.cardLinks.forEach((link)=>link.setAttribute('href', href));
        this.setInitialVariant(this.swatchVariantIds[swatchName] || this.variants[0].id);
        if (oldPrimaryImg) {
            oldPrimaryImg.classList.remove('productitem--image-primary');
            oldPrimaryImg.style.visibility = '';
        }
        if (primaryImage) {
            primaryImage.classList.add('productitem--image-primary');
            primaryImage.style.visibility = hideAlternateImage ? 'visible' : '';
        }
        if (this.originalImages.alternate) {
            this.originalImages.alternate.style.visibility = hideAlternateImage ? 'hidden' : '';
        }
        this.state = {
            swatchName,
            primaryImage,
            hideAlternateImage
        };
    }
    _handleChange({ target }) {
        this.activeControlTime = Date.now();
        this.activeControl = target;
        const swatchName = target.value;
        this.selectedImage = this.swatchImages[swatchName] || this.originalImages.primary;
        this._setState({
            swatchName,
            primaryImage: this.selectedImage,
            hideAlternateImage: true
        });
    }
    _handleClick({ target }) {
        if (target === this.activeControl && this.activeControlTime + 150 < Date.now()) {
            target.checked = false;
            this.activeControl = null;
            this.selectedImage = null;
            if (this.isPreselected && this.featuredImage) {
                this.originalImages.primary = this.featuredImage;
                this.isPreselected = false;
            }
            this._setState({
                swatchName: null,
                primaryImage: this.state.primaryImage,
                hideAlternateImage: true
            });
        }
    }
    _handleMouseOver(event) {
        if (event.target.hasAttribute('data-swatch-tooltip')) {
            this._setState({
                swatchName: this.state.swatchName,
                primaryImage: this.swatchImages[event.target.dataset.swatchTooltip] || this.originalImages.primary,
                hideAlternateImage: true
            });
        }
    }
    _handleMouseLeave({ target }) {
        if (target.hasAttribute('data-swatches-container')) {
            this._setState({
                swatchName: this.state.swatchName,
                primaryImage: this.selectedImage || this.originalImages.primary,
                hideAlternateImage: !!this.selectedImage
            });
        }
    }
    _handleSwatchFocus({ target }) {
        if (this.expanded === false && target.nextElementSibling.classList.contains('productitem--swatches-swatch-hidden')) {
            this._toggleExpanded();
        }
    }
    _toggleExpanded() {
        const swatchesEl = this.el.querySelector('[data-swatches]');
        if (this.expanded) {
            this.expanded = false;
            swatchesEl.classList.remove('productitem--swatches-expanded');
            this.swatchCount.innerText = `+${this.swatches.length - this.showSwatchCount}`;
        } else {
            this.expanded = true;
            swatchesEl.classList.add('productitem--swatches-expanded');
        }
    }
    getSwatchGap() {
        if (swatchGap === null) {
            swatchGap = parseInt(window.getComputedStyle(this.swatches[0]).getPropertyValue('margin-right'), 10);
        }
        return swatchGap;
    }
    unload() {
        this.events.unregisterAll();
    }
}
;
const storageKey = 'pxuProductCompareV3';
const MAX_COMPARE_PRODUCTS = 3;
class ProductCompare {
    constructor(){
        this._hasToggle = !!document.querySelector('[data-compare-toggle]');
        this.breadCrumb = document.querySelector('[data-product-compare-breadcrumb-data]');
        if (this.breadCrumb) {
            this.breadCrumbData = JSON.parse(this.breadCrumb.innerHTML);
        }
        this._state = this._getState();
        this._onUpdateCallbacks = [];
        this._onEnableChangeCallbacks = [];
        document.addEventListener('visibilitychange', ()=>{
            if (document.visibilityState === 'hidden') {
                this._state.returnBreadcrumb = this._getReturnBreadcrumb();
                this._save();
            }
        });
    }
    add({ handle, data }) {
        this._state.products.push({
            handle,
            data
        });
        this._runUpdateCallbacks();
        this._save();
    }
    remove(handle) {
        this._state.products = this._state.products.filter((product)=>product.handle !== handle);
        this._runUpdateCallbacks();
        if (!this._state.products.length) {
            this._onRemoveLastProduct();
        }
        this._save();
    }
    removeAll() {
        this._state.products = [];
        this._runUpdateCallbacks();
        this._onRemoveLastProduct();
        this._save();
    }
    includes(handle) {
        return this._state.products.some((product)=>product.handle === handle);
    }
    runOnUpdate(fn) {
        this._onUpdateCallbacks.push(fn);
    }
    removeRunOnUpdate(fn) {
        this._onUpdateCallbacks = this._onUpdateCallbacks.filter((cb)=>cb !== fn);
    }
    get enabled() {
        return this._state.enabled;
    }
    enable() {
        if (this._state.enabled) {
            return;
        }
        this._state.enabled = true;
        this._runEnableChangeCallbacks();
        this._save();
    }
    disable() {
        if (!this._state.enabled) {
            return;
        }
        this._state.enabled = false;
        this._runEnableChangeCallbacks();
        if (this._state.products.length) {
            this.removeAll();
        }
        this._save();
    }
    addRunOnEnableChange(fn) {
        this._onEnableChangeCallbacks.push(fn);
    }
    removeRunOnEnableChange(fn) {
        this._onEnableChangeCallbacks = this._onEnableChangeCallbacks.filter((cb)=>cb !== fn);
    }
    get products() {
        return this._state.products;
    }
    get atProductLimit() {
        return this._state.products.length >= MAX_COMPARE_PRODUCTS;
    }
    get returnBreadcrumb() {
        return this._state.returnBreadcrumb;
    }
    _runUpdateCallbacks() {
        const data = {
            products: this._state.products,
            atProductLimit: this.atProductLimit
        };
        this._onUpdateCallbacks.forEach((cb)=>cb(data));
    }
    _runEnableChangeCallbacks() {
        this._onEnableChangeCallbacks.forEach((cb)=>cb(this.enabled));
    }
    _onRemoveLastProduct() {
        if (this._hasToggle) {
            return;
        }
        this.disable();
    }
    _getReturnBreadcrumb() {
        if (this.breadCrumbData && this.breadCrumbData.update) {
            return {
                url: window.location.href,
                title: this.breadCrumbData.title
            };
        }
        return this._state.returnBreadcrumb;
    }
    _getState() {
        const savedState = this._load();
        if (savedState) {
            const enabled = this._hasToggle || savedState.products.length ? savedState.enabled : false;
            return {
                ...savedState,
                enabled
            };
        }
        return {
            products: [],
            returnBreadcrumb: null,
            enabled: false
        };
    }
    _load() {
        try {
            return JSON.parse(sessionStorage.getItem(storageKey));
        } catch (e) {
            return null;
        }
    }
    _save() {
        sessionStorage.setItem(storageKey, JSON.stringify(this._state));
    }
}
const components_ProductCompare = new ProductCompare();
;
class Checkbox {
    constructor(el){
        this.checkmark = el.querySelector('.checkmark');
        this.checkmarkCheck = el.querySelector('.checkmark__check');
        this.checkmarkIndeterminate = el.querySelector('.checkmark__indeterminate');
        const state = 'unchecked';
        this.fillAnimation = animations_es_transition({
            el: this.checkmark,
            state
        });
        this.checkAnimation = animations_es_transition({
            el: this.checkmarkCheck,
            state
        });
        this.indeterminateCheckAnimation = animations_es_transition({
            el: this.checkmarkIndeterminate,
            state
        });
    }
    check() {
        this.fillAnimation.animateTo('checked');
        this.checkAnimation.animateTo('checked');
    }
    uncheck() {
        this.fillAnimation.animateTo('unchecked');
        this.checkAnimation.animateTo('unchecked');
    }
    setIndeterminate() {
        this.fillAnimation.animateTo('indeterminate');
        this.indeterminateCheckAnimation.animateTo('indeterminate');
    }
    unsetIndeterminate() {
        this.fillAnimation.animateTo('unchecked');
        this.indeterminateCheckAnimation.animateTo('unchecked');
    }
    set disabled(disabled) {
        this.checkmark.classList.toggle('checkmark--disabled', disabled);
    }
    unload() {
        this.fillAnimation.unload();
        this.checkAnimation.unload();
        this.indeterminateCheckAnimation.unload();
    }
}
;
class ProductGridItem {
    constructor(options){
        this.el = options.el;
        this.$el = define_2()(options.el);
        this.id = options.id;
        this.disableActionsToggle = 'disableActionsToggle' in options ? options.disableActionsToggle : false;
        this.productQuickshop = null;
        this.quickshopInitialVariant = null;
        this.quickBuySettings = null;
        this.actionsOpen = false;
        this.defaultView = options.grid_list;
        this.events = new proto_5.Z();
        if (options.lazy) {
            this.lazyLoader = new amend(this.$el[0], ()=>this._init());
        } else {
            this._init();
        }
    }
    _init() {
        this.$window = define_2()(window);
        this.$html = define_2()('html');
        this.content = this.el.querySelector('[data-product-item-content]');
        this.actions = this.el.querySelector('[data-product-actions]');
        this.swatchesEl = this.el.querySelector('[data-swatches]');
        this.quickBuyEl = this.el.querySelector('[data-quick-buy]');
        this.quickshopSlimEl = this.el.querySelector('[data-quickshop-slim]');
        this.quickshopFullEl = this.el.querySelector('[data-quickshop-full]');
        this.compareCheckbox = this.el.querySelector('[data-compare-checkbox]');
        this.compareItem = this.el.querySelector('[data-compare-item]');
        this.compareItemWrapper = this.el.querySelector('[data-compare-item-wrapper]');
        this.hasProductActions = this.actions !== null;
        this._addToCart = this._addToCart.bind(this);
        this._actionsToggle = this._actionsToggle.bind(this);
        this._openQuickShop = this._openQuickShop.bind(this);
        if (this.hasProductActions) {
            this._setSortByQueryParameters();
            if (!this.disableActionsToggle && this.$html.hasClass('no-touch') && this.defaultView !== 'list-view') {
                this.events.register(this.el, 'mouseenter', (e)=>this._actionsToggle(e));
                this.events.register(this.el, 'mouseleave', (string)=>this._actionsToggle(string));
                this.events.register(this.el, 'focusin', (e)=>this._actionsToggle(e));
            }
            utils()(define_2()('[data-scripts]').data('shopify-api-url'), ()=>{
                this.events.register(this.quickBuyEl, 'click', (e)=>this._addToCart(e));
                this.events.register(this.quickshopSlimEl, 'click', (e)=>this._openQuickShop(e));
                this.events.register(this.quickshopFullEl, 'click', (e)=>this._openQuickShop(e));
            });
        }
        this.expandAnimation = animations_es_transition({
            el: this.content,
            state: 'closed'
        });
        if (this.compareCheckbox) {
            this.compareData = JSON.parse(this.el.querySelector('[data-product-compare-data]').innerHTML);
            this.expandCheckboxAnimation = animations_es_transition({
                el: this.compareItemWrapper,
                state: 'closed'
            });
            this.compareItemCheckbox = new Checkbox(this.compareItem);
            this.events.register(this.compareCheckbox, 'change', ()=>this._updateProductCompare(this.compareCheckbox.checked));
            const onUpdate = ({ atProductLimit })=>{
                if (components_ProductCompare.includes(this.compareData.handle)) {
                    this.compareCheckbox.disabled = false;
                    this.compareItemCheckbox.disabled = false;
                    this.compareItem.classList.add('productitem__compare--enabled');
                    this.compareItem.classList.remove('productitem__compare--disabled');
                    this.compareCheckbox.checked = true;
                    this.compareItemCheckbox.check();
                } else {
                    this.compareCheckbox.checked = false;
                    this.compareItemCheckbox.uncheck();
                    this.compareCheckbox.disabled = atProductLimit;
                    this.compareItemCheckbox.disabled = atProductLimit;
                    this.compareItem.classList.toggle('productitem__compare--enabled', !atProductLimit);
                    this.compareItem.classList.toggle('productitem__compare--disabled', atProductLimit);
                }
            };
            onUpdate({
                atProductLimit: components_ProductCompare.atProductLimit
            });
            components_ProductCompare.runOnUpdate(onUpdate);
            const onEnableChange = (enabled)=>{
                if (enabled) {
                    this._showCompareCheckbox();
                } else if (!this.actionsOpen) {
                    this._hideCompareCheckbox();
                }
            };
            onEnableChange(components_ProductCompare.enabled);
            components_ProductCompare.addRunOnEnableChange(onEnableChange);
        }
        if (this.quickbuyEl !== null) {
            this._initQuickBuy();
        }
        this._objectFitPolyfill();
        if (this.swatchesEl) {
            this.swatches = new GridItemSwatches({
                el: this.$el[0],
                setInitialVariant: (id)=>{
                    this.quickshopInitialVariant = id;
                },
                product: this.product
            });
        }
    }
    _updateProductCompare(checkedForCompare) {
        const { handle, title: string, image: string, imageAspectRatio: string, url: string } = this.compareData;
        if (!handle) {
            return;
        }
        if (checkedForCompare) {
            components_ProductCompare.enable();
            components_ProductCompare.add({
                handle,
                data: {
                    title: string,
                    image: string,
                    imageAspectRatio: string,
                    url: string
                }
            });
        } else {
            components_ProductCompare.remove(handle);
        }
    }
    _setSortByQueryParameters() {
        Shopify.queryParams = {};
        if (location.search.length) {
            for(let i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++){
                const aKeyValue = aCouples[i].split('=');
                if (aKeyValue.length > 1 && aKeyValue[0] !== 'page') {
                    Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = aKeyValue[1];
                }
            }
        }
    }
    _initQuickBuy() {
        try {
            this.quickBuySettings = JSON.parse(this.$el.find('[data-quick-buy-settings]').text());
        } catch (error) {
            console.warn(`Quick buy: invalid QuickBuy data found. ${error.message}`);
        }
    }
    _openQuickShop(event) {
        event.preventDefault();
        const leftThumbsClass = event.currentTarget.hasAttribute('data-thumbs-left') ? ' quickshop-thumbs-left' : '';
        const modalClass = event.currentTarget.hasAttribute('data-quickshop-full') ? `quickshop-full${leftThumbsClass}` : 'quickshop-slim';
        if (this.productQuickshop) {
            this.productQuickshop.unload();
        }
        this.productQuickshop = new ProductQuickshop({
            $el: this.$el,
            id: this.id,
            modalClass,
            trigger: this.$el.find('.productitem--title a'),
            initialVariant: this.quickshopInitialVariant
        });
    }
    _isObjectFitAvailable() {
        return 'objectFit' in document.documentElement.style;
    }
    _objectFitPolyfill() {
        if (this._isObjectFitAvailable()) {
            return;
        }
        const $figure = define_2()('[data-product-item-image]', this.$el);
        const featuredSrc = define_2()('img:not(.productitem--image-alternate)', $figure).attr('src');
        const alternateSrc = define_2()('.productitem--image-alternate', $figure).attr('src');
        $figure.addClass('product-item-image-no-objectfit');
        $figure.css('background-image', `url("${featuredSrc}")`);
        if (alternateSrc) {
            this.events.register(this.el, 'mouseover', ()=>{
                $figure.css('background-image', `url("${alternateSrc}")`);
            });
            this.events.register(this.el, 'mouseleave', ()=>{
                $figure.css('background-image', `url("${featuredSrc}")`);
            });
        }
    }
    _getHeights() {
        const { height } = this.el.getBoundingClientRect();
        const actionsHeight = this.actions.getBoundingClientRect().height;
        return {
            heightBase: height,
            heightExpanded: height + actionsHeight
        };
    }
    _actionsToggle(event) {
        if (!Layout.isGreaterThanBreakpoint('M')) {
            return;
        }
        const $currentTarget = define_2()(event.currentTarget);
        const $target = define_2()(event.target);
        let openProductItem = false;
        const productHasFocus = this.$el.is($currentTarget) || this.$el.is($target) || this.$el.is($target.parents('.productgrid--item').first()) || event.type === 'focusin' && $target[0].contains(this.$el[0]);
        if (event.type === 'mouseenter' || event.type === 'mouseleave') {
            openProductItem = event.type === 'mouseenter';
        } else if (productHasFocus) {
            openProductItem = true;
        }
        if (openProductItem) {
            this._showActions();
        } else {
            this._hideActions();
        }
    }
    _showActions() {
        if (this.actionsOpen) {
            return;
        }
        const { heightBase, heightExpanded } = this._getHeights();
        this._showCompareCheckbox().then((compareHeight)=>{
            this.el.style.setProperty('--base-height', `${heightBase}px`);
            this.el.style.setProperty('--open-height', `${heightExpanded + compareHeight}px`);
            this.el.setAttribute('data-open', '');
            this.expandAnimation.animateTo('open');
            this.focusinEvent = this.events.register(document, 'focusin', (e)=>this._actionsToggle(e));
            this.actionsOpen = true;
        });
    }
    _hideActions() {
        this.expandAnimation.animateTo('closed').then(()=>{
            this.el.style.removeProperty('--base-height');
            this.el.removeAttribute('data-open');
        });
        this._hideCompareCheckbox();
        if (this.focusinEvent) {
            this.events.unregister(this.focusinEvent);
        }
        this.actionsOpen = false;
    }
    _showCompareCheckbox() {
        if (!this.expandCheckboxAnimation || this.expandCheckboxAnimation.state === 'open') {
            return Promise.resolve(0);
        }
        return new Promise((resolve)=>{
            this.expandCheckboxAnimation.animateTo('open', {
                onStart: ({ el })=>{
                    const { scrollHeight } = el.querySelector('[data-compare-item]');
                    this.el.style.setProperty('--compare-height', `${scrollHeight}px`);
                    resolve(scrollHeight);
                }
            });
        });
    }
    _hideCompareCheckbox() {
        if (!this.expandCheckboxAnimation) {
            return;
        }
        if (!components_ProductCompare.enabled) {
            this.expandCheckboxAnimation.animateTo('closed').then(()=>{
                this.el.style.setProperty('--compare-height', '0px');
            });
        }
    }
    _addToCart(event) {
        event.preventDefault();
        if (this.addToCartFlyout) {
            this.addToCartFlyout.unload();
        }
        const atcButton = event.currentTarget;
        const variantID = atcButton.getAttribute('data-variant-id');
        const formData = [
            {
                name: 'id',
                value: variantID
            },
            {
                name: 'quantity',
                value: 1
            }
        ];
        const options = {
            atcButton,
            settings: {
                moneyFormat: this.quickBuySettings.money_format,
                cartRedirection: this.quickBuySettings.cart_redirection
            }
        };
        this.addToCartFlyout = new AddToCartFlyout(formData, options);
    }
    unload() {
        this.events.unregisterAll();
        if (this.productQuickshop) {
            this.productQuickshop.unload();
        }
        document.removeEventListener('focusin', this._actionsToggle);
        if (this.swatches) {
            this.swatches.unload();
        }
        if (this.lazyLoader) {
            this.lazyLoader.unload();
        }
    }
}
;
const makeBlock = (el)=>({
        animation: animations_es_transition({
            el,
            state: 'open',
            stateAttribute: 'data-accordion-state',
            stateChangeAttribute: 'data-accordion-animation'
        }),
        isOpen: true
    });
const setOpenHeight = (el)=>{
    el.style.setProperty('--menu-open-height', `${el.scrollHeight}px`);
};
class Accordion {
    constructor(el, options = {}){
        this.el = el;
        this.options = {
            content: '[data-accordion-content]',
            animate: true,
            onStart: ()=>{},
            ...options
        };
        this.blocks = new Map();
    }
    closeAll(options = {}) {
        this.el.querySelectorAll(this.options.content).forEach((block)=>this.close(block, options));
    }
    openAll(options = {}) {
        this.el.querySelectorAll(this.options.content).forEach((block)=>this.open(block, options));
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
        this.blocks.forEach(({ animation })=>animation.unload());
    }
    _getBlock(el) {
        const block = el.matches(this.options.content) ? el : el.querySelector(this.options.content);
        if (!this.blocks.has(block)) {
            this.blocks.set(block, makeBlock(block));
        }
        return this.blocks.get(block);
    }
    _open(el, { onComplete = ()=>{}, force = !this.options.animate }) {
        const block = this._getBlock(el);
        if (block.isOpen) {
            return;
        }
        block.isOpen = true;
        this.options.onStart({
            el: block.animation.el,
            state: 'open'
        });
        block.animation.animateTo('open', {
            force,
            onStart: ({ el })=>setOpenHeight(el)
        }).then((state)=>{
            if (state === 'open') {
                onComplete();
            }
        });
    }
    _close(el, { onComplete = ()=>{}, force = !this.options.animate }) {
        const block = this._getBlock(el);
        if (!block.isOpen) {
            return;
        }
        block.isOpen = false;
        this.options.onStart({
            el: block.animation.el,
            state: 'closed'
        });
        setOpenHeight(block.animation.el);
        block.animation.animateTo('closed', {
            force
        }).then((state)=>{
            if (state === 'closed') {
                onComplete();
            }
        });
    }
}
;
class FilterGroups {
    constructor(el, options){
        this.el = el;
        this.filterGroupsSetting = options.groups;
        this.filterStyleSetting = options.style;
        this.Accordion = new Accordion(el);
        this._closeAllGroups();
        this.activeMenuClass = 'filter-group-active';
        this.activeButtonClass = 'productgrid--sidebar-button-active';
        this.buttonSelector = '[data-filter-group-trigger]';
        this.listSelector = '[data-accordion-content]';
        this.buttonTriggers = this.el.querySelectorAll(this.buttonSelector);
        this.events = new proto_5.Z();
        this.buttonTriggers.forEach((button)=>this.events.register(button, 'click', (e)=>this._toggleGroup(e)));
        this._init();
    }
    _init() {
        if (!this.el.querySelector(this.listSelector)) {
            return;
        }
        if (this.filterStyleSetting === 'tags' && jQuery_2.max('S')) {
            this._openFirst();
            return;
        }
        switch(this.filterGroupsSetting){
            case 'expand_all':
                this._openAllGroups();
                break;
            case 'expand_first':
                this._openFirst();
                break;
            default:
                this._closeAllGroups();
                break;
        }
    }
    _openFirst() {
        const button = this.el.querySelector(this.buttonSelector);
        const list = button.parentElement.querySelector(this.listSelector);
        this.openGroup(button, list, true);
    }
    _openAllGroups() {
        this.buttonTriggers.forEach((button)=>{
            const list = button.parentElement.querySelector(this.listSelector);
            this.openGroup(button, list, true);
        });
    }
    _closeAllGroups() {
        this.Accordion.closeAll({
            force: true
        });
    }
    _toggleGroup(event) {
        const button = event.target;
        const list = button.parentElement.querySelector(this.listSelector);
        if (list.classList.contains(this.activeMenuClass)) {
            this._closeGroup(button, list);
        } else {
            this.openGroup(button, list);
        }
    }
    openGroup(button, list, force = false) {
        list.classList.add(this.activeMenuClass);
        button.classList.add(this.activeButtonClass);
        const onComplete = ()=>{
            button.setAttribute('aria-expanded', true);
        };
        this.Accordion.open(list, {
            onComplete,
            force
        });
    }
    _closeGroup(button, list) {
        list.classList.remove(this.activeMenuClass);
        button.classList.remove(this.activeButtonClass);
        const jQuery = ()=>{
            button.setAttribute('aria-expanded', false);
        };
        this.Accordion.close(list, {
            onComplete: jQuery
        });
    }
    unload() {
        this.events.unregisterAll();
    }
}
;
class StaticCollection {
    constructor(section){
        this.section = section;
        this.$el = define_2()(section.el);
        this.el = section.el;
        this.view = null;
        this.flickity = null;
        this.handleEvents = new proto_5.Z();
        this.subcollectionSlideshow = this.el.querySelector('[data-subcollections-layout="slideshow"]');
        this.slides = this.el.querySelectorAll('[data-subcollections-grid-item]');
        if (this._shouldInitFlickity(jQuery_2)) {
            this._initFlickity();
        } else {
            this._destroyFlickity();
        }
        this.context = section.data.context;
        this.showFilterProductCount = section.data.show_filter_product_count;
        this.productCount = section.data.product_count;
        this.filterGroups = section.data.filter_groups;
        this.filterStyle = section.data.filter_style;
        this.noMatchedProductsText = section.data.no_matched_products_text;
        this.collectionUrl = this.context.collectionUrl;
        this.currentTags = this.context.current_tags;
        this.$focusItem = null;
        this.defaultView = this.context.grid_list;
        this.postMessage = section.postMessage;
        this.filterType = section.data.filter_type;
        this.productgridSidebar = '[data-productgrid-sidebar]';
        this.filtersContentSelector = '[data-productgrid-filters-content]';
        this.filterGroupSelector = '[data-productgrid-sidebar-group]';
        this.sortContent = '[data-productgrid-sort-content]';
        this.$sortTrigger = this.$el.find('[data-productgrid-trigger-sort]');
        this.$sortTriggerButton = this.$el.find('[data-productgrid-trigger-sort-button]');
        this.$sortTriggerModal = this.$el.find('[data-productgrid-modal-sort]');
        this.$filtersTrigger = this.$el.find('[data-productgrid-trigger-filters]');
        this.$filtersContent = this.$el.find(this.filtersContentSelector);
        this.$allTags = this.$filtersContent.find('.filter-item a:not([data-filter-toggle])');
        this.$advancedTags = this.$el.find('[data-tag-advanced] a');
        this.$additionalTags = this.$el.find('[data-filter-toggle]');
        this.$viewToggle = this.$el.find('[data-collection-view]');
        this.gridContainer = this.el.querySelector('.productgrid--outer');
        this.$description = this.$el.find('[data-collection-description]');
        this.filterCheckboxes = this.el.querySelectorAll('.filter-icon--checkbox');
        this.stickyUtils = this.el.querySelector('[data-sticky-utils]');
        this.stickyUtilsIntersectionTarget = this.el.querySelector('[data-utils-intersection-target]');
        this.header = document.querySelector('[data-site-header]');
        this.stickyHeaderClass = 'site-header-sticky';
        this.compareToggle = this.el.querySelector('[data-compare-toggle]');
        this._changeSorting = this._changeSorting.bind(this);
        this._changeSortingButton = this._changeSortingButton.bind(this);
        this._showSortModal = this._showSortModal.bind(this);
        this._showFiltersModal = this._showFiltersModal.bind(this);
        this._activateTag = this._activateTag.bind(this);
        this._advancedTags = this._advancedTags.bind(this);
        this._toggleTags = this._toggleTags.bind(this);
        this._toggleView = this._toggleView.bind(this);
        this._checkListView = this._checkListView.bind(this);
        this.events = [
            this.$sortTrigger.on('change.collection', this._changeSorting),
            this.$sortTriggerButton.on('click.collection', this._changeSortingButton),
            this.$sortTriggerModal.on('click.collection', this._showSortModal),
            this.$filtersTrigger.on('click.collection', this._showFiltersModal),
            this.$allTags.on('click.collection', (e)=>this._activateTag(e.currentTarget)),
            this.$additionalTags.on('click.collection', this._toggleTags),
            this.$viewToggle.on('click.collection', this._toggleView)
        ];
        if (this.$description.length) {
            this.richText = new RichText(this.$description);
        }
        this.productItems = [];
        this.fillAnimations = {};
        this.checkAnimations = {};
        this._initAnimations();
        this._setSortByQueryParameters();
        this._checkListView();
        if (this.section.data.enable_product_compare) {
            this._initProductCompare();
        }
        if (jQuery_2.max('S')) {
            this._initProductGridUtils();
        }
        this.handleEls = section.el.querySelectorAll('[data-handle]');
        this.handles = [];
        this.handleEls.forEach((current)=>{
            this.handles.push(current.dataset.handle);
        });
        this.modal = new jQuery();
        if (this.$filtersContent.length > 0) {
            const options = {
                groups: this.filterGroups,
                style: this.filterStyle
            };
            this.filterGroupAccordions = new FilterGroups(this.$filtersContent[0], options);
            this._initTags();
        }
        this.handleBreakpointChange = (breakpoints)=>this.onBreakpointChange(breakpoints);
        jQuery_2.onChange(this.handleBreakpointChange);
    }
    _initProductCompare() {
        const onEnableChange = (enabled)=>{
            this.compareToggle.checked = enabled;
        };
        onEnableChange(components_ProductCompare.enabled);
        components_ProductCompare.addRunOnEnableChange(onEnableChange);
        this.handleEvents.register(this.compareToggle, 'change', ()=>{
            if (this.compareToggle.checked) {
                components_ProductCompare.enable();
            } else {
                components_ProductCompare.disable();
            }
        });
    }
    _initAnimations() {
        this.filterCheckboxes.forEach((el)=>{
            const tagHandle = el.dataset.handle;
            const checkmark = el.querySelector('.checkmark');
            const checkmarkCheck = el.querySelector('.checkmark__check');
            let state = 'unchecked';
            if (el.closest('.filter-item').dataset.filterActive === 'true') {
                state = 'checked';
            }
            const fillAnimation = animations_es_transition({
                el: checkmark,
                state
            });
            const checkAnimation = animations_es_transition({
                el: checkmarkCheck,
                state
            });
            this.fillAnimations[tagHandle] = fillAnimation;
            this.checkAnimations[tagHandle] = checkAnimation;
        });
    }
    onSectionUnload() {
        this._destroyFlickity();
        jQuery_2.offChange(this.handleBreakpointChange);
        this.handleEvents.unregisterAll();
        this.events.forEach(($el)=>$el.off('.collection'));
        this.modal.unload();
        Object.keys(this.fillAnimations).forEach((key)=>{
            this.fillAnimations[key].unload();
            this.checkAnimations[key].unload();
        });
        this.productItems.forEach((productItem)=>{
            productItem.unload();
        });
        if (this.$filtersContent.length > 0) {
            this.filterGroupAccordions.unload();
        }
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    _initFlickity() {
        if (this.flickity) {
            return;
        }
        this.flickity = new (js_default())(this.subcollectionSlideshow, {
            autoPlay: 0,
            accessibility: true,
            cellAlign: 'left',
            cellSelector: '[data-subcollections-grid-item]',
            groupCells: true,
            contain: true,
            pageDots: false,
            arrowShape: 'M65.29 11.99L27.28 50L65.3 87.99L70.25 83.06L37.19 50L70.26 16.94L65.29 11.99Z'
        });
        const viewport = this.subcollectionSlideshow.querySelector('.flickity-viewport');
        const slider = this.subcollectionSlideshow.querySelector('.flickity-slider');
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('flickity-slider--wrapper');
        viewport.appendChild(sliderWrapper);
        sliderWrapper.appendChild(slider);
        this.handleEvents.register(this.subcollectionSlideshow, 'rimg:load', ()=>{
            if (this.flickity) {
                this.flickity.resize();
            }
        });
    }
    _destroyFlickity() {
        if (!this.flickity) {
            return;
        }
        this.flickity.destroy();
        this.flickity = null;
    }
    _initProductItems(view = 'grid-view') {
        const $productItems = this.$el.find('[data-product-item]');
        $productItems.each((i, productItem)=>{
            this.productItems.push(new ProductGridItem({
                el: productItem,
                id: this.section.id,
                lazy: true,
                grid_list: view
            }));
        });
    }
    _shouldInitFlickity(bp) {
        if (bp.max('XXXS') && this.slides.length > 3 || bp.max('M') && this.slides.length >= 5 || bp.min('L') && this.slides.length > 7) {
            return true;
        }
        if (this.subcollectionSlideshow) {
            return false;
        }
        return null;
    }
    _showFiltersModal(event) {
        event.preventDefault();
        this.$focusItem = define_2()(event.currentTarget);
        this.modal.open(this.productgridSidebar, 'productgrid-sidebar');
    }
    _showSortModal(event) {
        event.preventDefault();
        this.$focusItem = define_2()(event.currentTarget);
        this.modal.open(this.sortContent, 'productgrid-sort');
    }
    _deactivateTags(currentFilterItem) {
        const currentGroup = currentFilterItem.closest('[data-filter-group]');
        const activeTags = currentGroup.querySelectorAll('[data-filter-active="true"]');
        activeTags.forEach((el)=>{
            const itemTag = el.dataset.handle;
            currentGroup.querySelector(`.filter-item[data-handle='${itemTag}']`).dataset.filterActive = false;
            if (this.fillAnimations[itemTag] && this.checkAnimations[itemTag]) {
                this.fillAnimations[itemTag].animateTo('unchecked');
                this.checkAnimations[itemTag].animateTo('unchecked');
            }
        });
    }
    _activateTag(target) {
        event.preventDefault();
        const href = target.getAttribute('href');
        const filterItem = target.closest('.filter-item');
        const filterItemTag = filterItem.dataset.handle;
        const isDisabled = filterItem.classList.contains('filter-item--disabled');
        if (isDisabled) {
            return;
        }
        let animateTo = 'checked';
        if (filterItem.dataset.filterActive === 'true') {
            animateTo = 'unchecked';
        }
        this._deactivateTags(filterItem);
        if (animateTo === 'checked') {
            filterItem.dataset.filterActive = true;
        } else {
            filterItem.dataset.filterActive = false;
        }
        if (this.fillAnimations[filterItemTag] && this.checkAnimations[filterItemTag]) {
            this.fillAnimations[filterItemTag].animateTo(animateTo);
            this.checkAnimations[filterItemTag].animateTo(animateTo).then(()=>{
                if (this.$advancedTags.length === 0) {
                    location.href = href;
                } else {
                    this._advancedTags(define_2()(target));
                }
            });
        } else {
            this._advancedTags(define_2()(target));
        }
    }
    _advancedTags(link) {
        const $target = link.parent();
        const $filtersContent = $target.closest('nav');
        const filterGroups = $filtersContent.find('[data-filter-group]');
        const jQuery = [];
        filterGroups.each((index, filterGroup)=>{
            const selectedItems = filterGroup.querySelectorAll('[data-filter-active="true"]');
            if (selectedItems.length) {
                jQuery.push(define_2()(selectedItems).data('handle'));
            }
        });
        if (this.currentTags.length) {
            this.currentTags.forEach((jQuery)=>{
                if (!this.handles.includes(jQuery)) {
                    jQuery.push(jQuery);
                }
            });
        }
        this._updateLocation(jQuery.join('+'));
    }
    _updateLocation(filter) {
        if (this.collectionUrl.indexOf('vendors') > -1) {
            location.href = `${this.collectionUrl}&constraint=${filter}`;
        } else {
            location.href = `${this.collectionUrl}/${filter}`;
        }
    }
    _toggleTags(event) {
        event.preventDefault();
        const $trigger = define_2()(event.currentTarget);
        const $items = $trigger.parent().siblings('[data-hidden-default]');
        const siblingsVisible = $trigger.data('filter-toggle');
        $items.toggleClass('filter-item--hidden', siblingsVisible);
        $trigger.data('filter-toggle', !siblingsVisible).text(!siblingsVisible ? this.context.see_less : this.context.see_more);
        if (this.modal.isOpen()) {
            this.modal.position();
        }
    }
    _setSortByQueryParameters() {
        Shopify.queryParams = {};
        if (location.search.length) {
            for(let i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++){
                const aKeyValue = aCouples[i].split('=');
                if (aKeyValue.length > 1 && aKeyValue[0] !== 'page') {
                    Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
                }
            }
        }
    }
    _changeSortingButton(event) {
        const activeClass = 'utils-sortby--modal-button--active';
        define_2()(event.currentTarget).addClass(activeClass).parent().siblings().find(`.${activeClass}`).removeClass(activeClass);
        this._changeSorting(event);
    }
    _changeSorting(event) {
        event.preventDefault();
        const $target = define_2()(event.currentTarget);
        Shopify.queryParams.sort_by = $target.val();
        location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
    }
    _toggleView(event) {
        const $target = define_2()(event.currentTarget);
        Shopify.queryParams.grid_list = $target.data('collection-view');
        location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
    }
    _checkListView() {
        const view = Shopify.queryParams.grid_list ? Shopify.queryParams.grid_list : this.defaultView;
        this.$el.find('[href*="&grid_list"]').attr('href', (i, url)=>{
            let href = url;
            if (url.indexOf('?') < 0) {
                const replaceIndex = url.indexOf('&');
                const firstHalf = url.substr(0, replaceIndex);
                const secondHalf = url.substr(replaceIndex + 1);
                href = firstHalf.concat('?', secondHalf);
            }
            href = href.replace('grid_list', `grid_list=${view}`);
            return href;
        });
        this.$el.find('.utils-viewtoggle-button').removeClass('active');
        define_2()(`[data-collection-view=${view}]`).addClass('active');
        const className = view.replace('-', '');
        this.gridContainer.classList.add(`productgrid-${className}`);
        if (className === 'listview') {
            this.gridContainer.classList.remove('productgrid-gridview');
        } else {
            this.gridContainer.classList.remove('productgrid-listview');
        }
        this.view = view;
        this._initProductItems(view);
    }
    _initTags() {
        const jQuery = this.$filtersContent[0].querySelectorAll('[data-filter-active="false"]');
        const activeTags = this.$filtersContent[0].querySelectorAll('[data-filter-active="true"]');
        activeTags.forEach((tag)=>{
            if (tag.querySelector('.filter-item--swatch-wrapper') === null) {
                this._addProductCount(tag, true);
            }
            this._openActiveGroup(tag);
        });
        jQuery.forEach((jQuery)=>{
            this._addProductCount(jQuery, false);
        });
    }
    _addProductCount(tag, active) {
        if (this.filterType === 'faceted' || this.showFilterProductCount === false && this.filterStyle !== 'groups') {
            return;
        }
        const productCountEl = tag.querySelector('[data-filtered-product-count]');
        if (this.collectionUrl.includes('/collections/vendors')) {
            return;
        }
        if (active) {
            productCountEl.innerHTML = `(${this.productCount})`;
        } else {
            const tagLinkEl = tag.querySelector('a');
            let url = tagLinkEl.getAttribute('href');
            url = url.split('?')[0];
            shopify_asyncview_dist_index_es.load(url, 'ajax-product-count').then((_ref)=>{
                if (!_ref) {
                    return;
                }
                const { data } = _ref;
                const count = data.product_count;
                productCountEl.innerHTML = `(${count})`;
                if (count === 0) {
                    const title = this.noMatchedProductsText.replace('*tag*', tag.dataset.tagTitle);
                    tag.classList.add('filter-item--disabled');
                    tagLinkEl.ariaDisabled = true;
                    tagLinkEl.title = title;
                }
            });
        }
    }
    _openActiveGroup(tag) {
        const button = this.filterStyle === 'tags' ? this.el.querySelector(this.filtersContentSelector) : tag.closest(this.filterGroupSelector).querySelector('[data-filter-group-trigger]');
        const list = tag.closest('[data-accordion-content]');
        this.filterGroupAccordions.openGroup(button, list, true);
        const tagIsHidden = 'hiddenDefault' in tag.dataset;
        if (tagIsHidden) {
            const toggle = tag.parentElement.querySelector('[data-filter-toggle="false"]');
            toggle.click();
        }
    }
    _initProductGridUtils() {
        const header = document.querySelector('[data-site-header-main]');
        const body = document.querySelector('body');
        const headerHeight = `${header.offsetHeight}px`;
        if (body.classList.contains(this.stickyHeaderClass)) {
            this.stickyUtils.style.top = headerHeight;
            this.stickyUtilsIntersectionTarget.style.top = `-${headerHeight}`;
        } else {
            this.stickyUtils.style.top = '0';
            this.stickyUtilsIntersectionTarget.style.top = '0';
        }
        this._observeHeaders(this.el);
    }
    _observeHeaders() {
        this.observer = new IntersectionObserver((records)=>{
            records.forEach((record)=>{
                const targetInfo = record.boundingClientRect;
                const stickyTarget = record.target.parentElement.querySelector('[data-sticky-utils]');
                const rootBoundsInfo = record.rootBounds;
                if (targetInfo.bottom < rootBoundsInfo.top) {
                    this.postMessage('collection-page:collection-utils-sticky-change', {
                        stuck: true,
                        target: stickyTarget
                    });
                    this._handleStickyChange({
                        stuck: true,
                        target: stickyTarget
                    });
                }
                if (targetInfo.bottom >= rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
                    this.postMessage('collection-page:collection-utils-sticky-change', {
                        stuck: false,
                        target: stickyTarget
                    });
                    this._handleStickyChange({
                        stuck: false,
                        target: stickyTarget
                    });
                }
            });
        });
        this.observer.observe(document.querySelector('[data-utils-intersection-target]'));
    }
    _fireEvent(stuck, target) {
        this.postMessage('collection-page:collection-utils-sticky-change', {
            stuck,
            target
        });
    }
    _handleStickyChange({ stuck, target }) {
        target.classList.toggle('productgrid--utils-box-shadow', stuck);
    }
    onBreakpointChange(breakpoints) {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (breakpoints.current.max('S')) {
            this.headerTransitionEnd = ()=>{
                this._initProductGridUtils();
                this.header.removeEventListener('transitionend', this.headerTransitionEnd);
            };
            this.header.addEventListener('transitionend', this.headerTransitionEnd);
        }
        if (this._shouldInitFlickity(jQuery_2)) {
            this._initFlickity();
        } else {
            this._destroyFlickity();
        }
    }
}
;
function shopify_cross_border_dist_index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function shopify_cross_border_dist_index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        shopify_cross_border_dist_index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        shopify_cross_border_dist_index_es_defineProperties(Constructor, staticProps);
    }
    return Constructor;
}
function getDefaultExportFromCjs(x) {
    if (x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')) {
        return x['default'];
    }
    return x;
}
function dist_index_es_createCommonjsModule(fn) {
    const module = {
        exports: {}
    };
    fn(module, module.exports);
    return module.exports;
}
const dist_index_es_EventHandler_1 = dist_index_es_createCommonjsModule(function(module, exports) {
    exports.__esModule = true;
    class EventHandler {
        constructor(){
            this.events = [];
        }
        register(el, event, listener) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events.push({
                el,
                event,
                listener
            });
            el.addEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregister({ el, event, listener }) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events = this.events.filter((e)=>el !== e.el || event !== e.event || listener !== e.listener);
            el.removeEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregisterAll() {
            this.events.forEach(({ el, event, listener })=>el.removeEventListener(event, listener));
            this.events = [];
        }
    }
    exports["default"] = EventHandler;
});
const Events = getDefaultExportFromCjs(dist_index_es_EventHandler_1);
const selectors = {
    disclosureList: '[data-disclosure-list]',
    disclosureToggle: '[data-disclosure-toggle]',
    disclosureInput: '[data-disclosure-input]',
    disclosureOptions: '[data-disclosure-option]'
};
const classes = {
    listVisible: 'disclosure-list--visible',
    alternateDrop: 'disclosure-list--alternate-drop'
};
const Disclosure = (()=>{
    function Disclosure(el) {
        this.el = el;
        this.events = new Events();
        this.cache = {};
        this._cacheSelectors();
        this._connectOptions();
        this._connectToggle();
        this._onFocusOut();
    }
    shopify_cross_border_dist_index_es_createClass(Disclosure, [
        {
            key: "_cacheSelectors",
            value: function _cacheSelectors() {
                this.cache = {
                    disclosureList: this.el.querySelector(selectors.disclosureList),
                    disclosureToggle: this.el.querySelector(selectors.disclosureToggle),
                    disclosureInput: this.el.querySelector(selectors.disclosureInput),
                    disclosureOptions: this.el.querySelectorAll(selectors.disclosureOptions)
                };
            }
        },
        {
            key: "_connectToggle",
            value: function _connectToggle() {
                const _this = this;
                this.events.register(this.cache.disclosureToggle, 'click', (e)=>{
                    const ariaExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
                    e.currentTarget.setAttribute('aria-expanded', !ariaExpanded);
                    _this.cache.disclosureList.classList.remove(classes.alternateDrop);
                    _this.cache.disclosureList.classList.toggle(classes.listVisible);
                    window.requestAnimationFrame(()=>{
                        const _this$cache$disclosur = _this.cache.disclosureList.getBoundingClientRect();
                        const { left, width } = _this$cache$disclosur;
                        const innerWidth = window.innerWidth;
                        const gutter = 30;
                        if (left + width + gutter > innerWidth) {
                            _this.cache.disclosureList.classList.add(classes.alternateDrop);
                        }
                    });
                });
            }
        },
        {
            key: "_connectOptions",
            value: function _connectOptions() {
                const _this2 = this;
                const options = this.cache.disclosureOptions;
                for (const option of options){
                    this.events.register(option, 'click', (e)=>_this2._submitForm(e.currentTarget.dataset.value));
                }
            }
        },
        {
            key: "_onFocusOut",
            value: function _onFocusOut() {
                const _this3 = this;
                this.events.register(this.cache.disclosureToggle, 'focusout', (e)=>{
                    const disclosureLostFocus = !_this3.el.contains(e.relatedTarget);
                    if (disclosureLostFocus) {
                        _this3._hideList();
                    }
                });
                this.events.register(this.cache.disclosureList, 'focusout', (e)=>{
                    const childInFocus = e.currentTarget.contains(e.relatedTarget);
                    const isVisible = _this3.cache.disclosureList.classList.contains(classes.listVisible);
                    if (isVisible && !childInFocus) {
                        _this3._hideList();
                    }
                });
                this.events.register(this.el, 'keyup', (e)=>{
                    if (e.defaultPrevented) {
                        return;
                    }
                    if (e.key !== 'Escape' || e.key !== 'Esc') {
                        return;
                    }
                    _this3._hideList();
                    _this3.cache.disclosureToggle.focus();
                });
                this.events.register(document.body, 'click', (e)=>{
                    const isOption = _this3.el.contains(e.target);
                    const isVisible = _this3.cache.disclosureList.classList.contains(classes.listVisible);
                    if (isVisible && !isOption) {
                        _this3._hideList();
                    }
                });
            }
        },
        {
            key: "_submitForm",
            value: function _submitForm(value) {
                this.cache.disclosureInput.value = value;
                this.el.closest('form').submit();
            }
        },
        {
            key: "_hideList",
            value: function _hideList() {
                this.cache.disclosureList.classList.remove(classes.listVisible);
                this.cache.disclosureToggle.setAttribute('aria-expanded', false);
            }
        },
        {
            key: "unload",
            value: function unload() {
                this.events.unregisterAll();
            }
        }
    ]);
    return Disclosure;
})();
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function closest(s) {
        let el = this;
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        }while (el !== null && el.nodeType === 1)
        return null;
    };
}
const shopify_cross_border_dist_index_es = Disclosure;
;
class StaticFooter {
    constructor(section){
        this.$el = define_2()(section.el);
        this.el = section.el;
        this.countryDisclosureEls = this.el.querySelectorAll('[data-disclosure-country]');
        this.localeDisclosureEls = this.el.querySelectorAll('[data-disclosure-locale]');
        this.accordionTrigger = '[data-accordion-trigger]';
        this.disclosures = [];
        this.Accordion = new Accordion(this.el, {
            onStart: ({ el, state })=>{
                el.parentNode.parentNode.querySelector(this.accordionTrigger).dataset.accordionTrigger = state;
            }
        });
        if (jQuery_2.max('M')) {
            this.Accordion.closeAll({
                force: true
            });
        }
        this.forms = new Forms(this.$el);
        if (this.countryDisclosureEls.length > 0) {
            this.countryDisclosureEls.forEach((disclosureEl)=>{
                this.disclosures.push(new shopify_cross_border_dist_index_es(disclosureEl));
            });
        }
        if (this.localeDisclosureEls.length > 0) {
            this.localeDisclosureEls.forEach((disclosureEl)=>{
                this.disclosures.push(new shopify_cross_border_dist_index_es(disclosureEl));
            });
        }
        jQuery_2.onChange((breakpoints)=>this.onBreakpointChange(breakpoints));
        this._bindEvents();
    }
    _bindEvents() {
        this.$el.on('click.footer', this.accordionTrigger, (event)=>{
            event.preventDefault();
            this._toggleAccordion(define_2()(event.currentTarget).parent()[0]);
        });
    }
    onSectionUnload() {
        this.$el.off('.footer');
        this.forms.unload();
        this.disclosures.forEach((disclosure)=>disclosure.unload());
        this.Accordion.unload();
    }
    onSectionBlockSelect(block) {
        if (block.el.classList.contains('has-accordion')) {
            this._toggleAccordion(block);
        }
    }
    onSectionBlockDeselect(block) {
        if (block.el.classList.contains('has-accordion')) {
            this._toggleAccordion(block);
        }
    }
    _toggleAccordion(block) {
        if (jQuery_2.min('L')) {
            return;
        }
        this.Accordion.toggle(block);
    }
    onBreakpointChange(breakpoints) {
        if (breakpoints.current.min('L')) {
            this.Accordion.openAll({
                force: true
            });
        } else if (breakpoints.previous.min('L') && breakpoints.current.max('M')) {
            this.Accordion.closeAll({
                force: true
            });
        }
    }
}
;
class StickyHeader {
    constructor(options, settings){
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
        this.events = new proto_5.Z();
        this._toggleStickyHeader = this._toggleStickyHeader.bind(this);
        this._toggleMenu = this._toggleMenu.bind(this);
        if (this.settings.sticky_header) {
            this.body.classList.add(this.stickyClass);
            window.requestAnimationFrame(()=>{
                if (window.getComputedStyle(this.header).position.indexOf('sticky') > -1) {
                    this.observer = new IntersectionObserver((entries)=>this._toggleStickyHeader(entries));
                    this.observer.observe(document.querySelector('[data-header-intersection-target]'));
                    this.toggleClick = (event)=>{
                        event.preventDefault();
                        if (Layout.isGreaterThanBreakpoint('M')) {
                            this._toggleMenu();
                        }
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
        const transitionEndHandler = ()=>{
            headerHeight = this.header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            this.events.unregister(this.header, 'transitionend', transitionEndHandler);
        };
        this.events.register(this.header, 'transitionend', transitionEndHandler);
    }
    closeNavigation() {
        if (this.transitioning) {
            return;
        }
        this.menuToggle.classList.remove('active');
        this.navTransitionOutEvent = ()=>{
            this.header.classList.remove(this.navOpenClass);
            this.transitioning = false;
            this.menu.removeEventListener('transitionend', this.navTransitionOutEvent);
        };
        this.menu.addEventListener('transitionend', this.navTransitionOutEvent);
        this.transitioning = true;
        this.menu.setAttribute('style', `margin-top: -${this.menu.getBoundingClientRect().height}px;`);
        this.postMessage('nav:close-all');
    }
    openNavigation(onOpen = ()=>{}) {
        if (this.transitioning || this.header.classList.contains(this.navOpenClass)) {
            onOpen();
            return;
        }
        this.menuToggle.classList.add('active');
        this.navTransitionInEvent = ()=>{
            this.transitioning = false;
            this.menu.removeEventListener('transitionend', this.navTransitionInEvent);
            onOpen();
        };
        this.menu.addEventListener('transitionend', this.navTransitionInEvent);
        this.transitioning = true;
        window.requestAnimationFrame(()=>{
            this.header.classList.add(this.navOpenClass);
            window.requestAnimationFrame(()=>{
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
    _toggleStickyHeader(entries) {
        if (ScrollLock.isLocked || !Layout.isGreaterThanBreakpoint('M')) {
            return;
        }
        const shouldShrink = !entries[0].isIntersecting;
        if (shouldShrink && this.header.classList.contains(this.scrolledClass)) {
            return;
        }
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
;
class NavMobileSubMenus {
    constructor(el){
        this.$el = define_2()(el);
        this.Accordion = new Accordion(el);
        this.closeAllSubmenus();
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
        const $current = define_2()(current);
        $current.find(this.activeMenu).each((index, el)=>{
            this._closeSubmenu(define_2()(el));
        });
    }
    closeAllSubmenus() {
        this.Accordion.closeAll({
            force: true
        });
    }
    _bindEvents() {
        this.$el.on('mousedown.mobile-nav', '.navmenu-link', (event)=>{
            event.preventDefault();
        });
        this.$el.on('click.mobile-nav', `${this.navTrigger} > .navmenu-link-parent`, this._linkClicked.bind(this));
        this.$el.on('click.mobile-nav', `${this.navTrigger} > .navmenu-button`, (event)=>{
            event.preventDefault();
            this._toggleSubmenu(event);
        });
    }
    _linkClicked(event) {
        const $target = define_2()(event.currentTarget);
        if (!$target.hasClass(this.activeMenuClass)) {
            event.preventDefault();
            this._openSubmenu($target);
        }
    }
    _toggleSubmenu(event) {
        const $target = define_2()(event.currentTarget);
        const $link = $target.hasClass(this.linkClass) ? $target : $target.siblings(this.linkSelector).first();
        if ($link.hasClass(this.activeMenuClass)) {
            this._closeSubmenu($target);
        } else {
            this._openSubmenu($target);
        }
    }
    _openSubmenu($target) {
        const $menu = $target.siblings(this.subMenu).first();
        const $link = $target.hasClass(this.linkClass) ? $target : $target.siblings(this.linkSelector).first();
        const $button = $target.hasClass(this.buttonClass) ? $target : $target.siblings(this.buttonSelector).first();
        $link.addClass(this.activeMenuClass);
        const onComplete = ()=>{
            $link.attr('aria-expanded', true);
            $button.attr('aria-expanded', true);
        };
        this.Accordion.open($menu[0], {
            onComplete
        });
    }
    _closeSubmenu($target) {
        const $menu = $target.siblings(this.subMenu).first();
        const $link = $target.hasClass(this.linkClass) ? $target : $target.siblings(this.linkSelector).first();
        const $button = $target.hasClass(this.buttonClass) ? $target : $target.siblings(this.buttonSelector).first();
        $link.removeClass(this.activeMenuClass);
        const onComplete = ()=>{
            $link.attr('aria-expanded', false);
            $button.attr('aria-expanded', false);
        };
        this.Accordion.close($menu[0], {
            onComplete
        });
        this.closeSubMenus($menu);
    }
}
;
class NavMobile {
    constructor(elements){
        this.el = elements.el;
        this.toggleOpen = elements.toggleOpen;
        this.mobileNav = this.el.querySelector('[data-mobile-nav]');
        this.navPanel = this.el.querySelector('[data-mobile-nav-panel]');
        this.navOverlay = this.el.querySelector('[data-mobile-nav-overlay]');
        this.toggleClose = this.el.querySelector('[data-mobile-nav-close]');
        this.announcementBar = document.querySelector('[data-announcement-bar]');
        this.isOpen = false;
        this.subMenus = null;
        this.events = new proto_5.Z();
        this.breakpointHandler = this.onBreakpointChange.bind(this);
        jQuery_2.onChange(this.breakpointHandler);
        this.navPanelAnimation = animations_es_transition({
            el: this.navPanel,
            state: 'closed'
        });
        this.navOverlayAnimation = animations_es_transition({
            el: this.navOverlay,
            state: 'closed'
        });
        this.events.register(this.toggleOpen, 'click', (e)=>this._open(e));
    }
    unload() {
        this.events.unregisterAll();
        jQuery_2.offChange(this.breakpointHandler);
        ScrollLock.unlock();
    }
    onBreakpointChange() {
        if (jQuery_2.min('L') && this.isOpen) {
            this._close();
        }
    }
    _open(e) {
        e.preventDefault();
        if (jQuery_2.min('L')) {
            return;
        }
        ScrollLock.lock(this.navPanel);
        if (this.announcementBar) {
            this.announcementBar.style.setProperty('--index-announcement-bar', '1100');
        }
        this.isOpen = true;
        this.subMenus = new NavMobileSubMenus(this.navPanel);
        this.mobileNav.dataset.open = 'true';
        this.navPanelAnimation.animateTo('open');
        this.navOverlayAnimation.animateTo('open');
        this.mobileNav.focus();
        proto_3(this.mobileNav);
        this.overlayClickEvent = this.events.register(this.navOverlay, 'click', (e)=>this._close(e));
        this.toggleCloseEvent = this.events.register(this.toggleClose, 'click', (e)=>this._close(e));
        this.overlayTouchEvent = this.events.register(this.navOverlay, 'touchmove', (e)=>e.preventDefault());
        this.closeEsc = this.events.register(window, 'keydown', (e)=>{
            if (e.key === 'Escape') {
                this._close(e);
            }
        });
    }
    _close(e) {
        if (e) {
            e.preventDefault();
        }
        this.navPanelAnimation.animateTo('closed');
        this.navOverlayAnimation.animateTo('closed').then(()=>{
            this.mobileNav.dataset.open = 'false';
            removeTrapFocus(this.mobileNav);
            this.toggleOpen.focus();
            if (this.announcementBar) {
                this.announcementBar.style.setProperty('--index-announcement-bar', '');
            }
        });
        ScrollLock.unlock();
        this.isOpen = false;
        if (this.subMenus) {
            this.subMenus.closeSubMenus(this.navPanel);
            this.subMenus.closeAllSubmenus();
            this.subMenus.unload();
        }
        this.events.unregister(this.overlayClickEvent);
        this.events.unregister(this.overlayTouchEvent);
        this.events.unregister(this.toggleCloseEvent);
        this.events.unregister(this.closeEsc);
    }
}
;
const el = document.querySelector('[data-site-main-dimmer]');
const site_main_dimmer_animation = animations_es_transition({
    el,
    state: 'closed'
});
const openers = new Set();
const disableAnimations = 'reduceAnimations' in document.body.dataset;
function find(requestor) {
    if (disableAnimations) {
        return;
    }
    if (openers.has(requestor)) {
        return;
    }
    openers.add(requestor);
    site_main_dimmer_animation.animateTo('open');
}
function clear(requestor) {
    openers.delete(requestor);
    if (openers.size) {
        return;
    }
    site_main_dimmer_animation.animateTo('closed', {
        force: disableAnimations
    });
}
;
class NavDesktopParent {
    constructor(el, options){
        this.listitem = el;
        this.link = null;
        this.submenu = null;
        this._isOpen = false;
        this.menu = null;
        this.parentMenu = options.parentMenu;
        this.closeSiblings = this.parentMenu.closeSiblings;
        this.details = el.querySelector('[data-navmenu-details]');
        const { children } = this.details;
        for(let i = 0; i < children.length; i++){
            if (children[i].classList.contains('navmenu-link')) {
                this.link = children[i];
            } else if (children[i].classList.contains('navmenu-submenu')) {
                this.submenu = children[i];
            }
        }
        this.animation = animations_es_transition({
            el: this.submenu,
            state: 'closed'
        });
        this.open = ()=>{
            this._open();
        };
        this.close = ()=>{
            this._close();
        };
        this.closeEsc = (e)=>{
            if (e.key === 'Escape') {
                this.link.focus();
                this.close();
            }
        };
        this.closeTimer = null;
        this.openTimer = null;
        this.mouseover = ()=>{
            clearTimeout(this.closeTimer);
            if (!this.submenu.classList.contains('navmenu-depth-3')) {
                this.openTimer = setTimeout(this.open, 200);
            } else {
                this.open();
            }
        };
        this.mouseout = ()=>{
            clearTimeout(this.openTimer);
            this.closeTimer = setTimeout(this.close, 400);
        };
        this.click = (e)=>{
            e.stopPropagation();
            const clickedParent = e.target.closest('.navmenu-link-parent');
            if (clickedParent && clickedParent.dataset.href) {
                e.preventDefault();
                if (this._isOpen) {
                    window.location = clickedParent.dataset.href;
                    return;
                }
                this.open();
            }
        };
        this.focusin = (find)=>{
            find.stopPropagation();
            if (find.target.classList.contains('navmenu-link-parent')) {
                this.closeSiblings(this);
            }
        };
        this.touchend = (find)=>{
            find.target.focus();
            this.click(find);
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
        if (this._isOpen) {
            return;
        }
        this._isOpen = true;
        this.details.setAttribute('open', 'open');
        find(this);
        this.closeSiblings(this);
        window.addEventListener('keydown', this.closeEsc);
        if (!this.menu) {
            this.menu = new NavDesktopMenu(this.submenu);
        }
        this.animation.animateTo('open', {
            hold: true,
            onStart: ({ el })=>{
                let find = 0;
                for(let i = 0; i < el.children.length; i++){
                    find += el.children[i].offsetHeight;
                }
                this.listitem.style.setProperty('--menu-open-height', `${find}px`);
                const find = this.listitem.closest('[data-navmenu-meganav-type]');
                const bounds = this.submenu.getBoundingClientRect();
                if (bounds.right > document.documentElement.clientWidth && !find) {
                    this.listitem.classList.add('alternate-drop');
                }
            }
        }).then((state)=>{
            if (state === 'open') {
                this.link.setAttribute('aria-expanded', true);
            }
        });
    }
    _close(force = false) {
        if (!this._isOpen) {
            return;
        }
        if (this.menu) {
            this.menu.unload();
            this.menu = null;
        }
        this._isOpen = false;
        window.removeEventListener('keydown', this.closeEsc);
        clear(this);
        this.listitem.classList.remove('navmenu-item--preselected');
        this.animation.animateTo('closed', {
            force
        }).then((state)=>{
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
;
class NavDesktopMeganavParent extends NavDesktopParent {
    constructor(el, options){
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
        if (!this.parentMenu.shouldBlockClose(this)) {
            return;
        }
        this.timer = setTimeout(this.close, 400);
    }
    _open(Expr = false) {
        if (this._isOpen) {
            return;
        }
        this._isOpen = true;
        this.details.setAttribute('open', 'open');
        window.addEventListener('keydown', this.closeEsc);
        if (this.enableSubmenu && !this.menu) {
            this.menu = new NavDesktopMenu(this.listitem.querySelector('[data-navmenu]'));
            this.menu.preselectFirstItem();
        }
        const resolveOpenMeganavs = new Promise((resolve)=>{
            const { openMeganav } = this.parentMenu;
            if (openMeganav) {
                this.listitem.style.setProperty('--menu-closed-height', `${openMeganav.openHeight}px`);
                const meganavGhostContent = openMeganav.content.cloneNode(true);
                const { width, left } = openMeganav.content.getBoundingClientRect();
                meganavGhostContent.classList.add('meganav-ghost');
                meganavGhostContent.style.left = `${left}px`;
                meganavGhostContent.style.width = `${width}px`;
                this.submenu.appendChild(meganavGhostContent);
                find(this);
                this.animation.animateTo('ghost', {
                    force: true
                }).then(()=>this.parentMenu.openMeganav.forceClose()).then(resolve);
            } else {
                this.listitem.style.setProperty('--menu-closed-height', 0);
                find(this);
                resolve();
            }
        });
        resolveOpenMeganavs.then(()=>this.closeSiblings(this)).then(()=>this.animation.animateTo('open', {
                force: Expr,
                hold: !Expr,
                onStart: ({ el })=>{
                    const wrapper = el.querySelector('.navmenu-meganav-wrapper');
                    const maxHeight = parseInt(window.getComputedStyle(wrapper).maxHeight, 10);
                    const height = isFinite(maxHeight) ? Math.min(wrapper.scrollHeight, maxHeight) : wrapper.scrollHeight;
                    this.listitem.style.setProperty('--menu-open-height', `${height}px`);
                    this._openHeight = height;
                }
            })).then(()=>{
            this.link.setAttribute('aria-expanded', true);
            this.parentMenu.openMeganav = this;
            this.submenu.querySelectorAll('.meganav-ghost').forEach((ghost)=>{
                ghost.parentNode.removeChild(ghost);
            });
        });
    }
    _close(force = false) {
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
        clear(this);
        return this.animation.animateTo('closed', {
            force
        }).then(()=>{
            this.link.setAttribute('aria-expanded', false);
            this.parentMenu.openSelectedBlock();
        });
    }
}
;
class NavDesktopMenu {
    constructor({ children }){
        this.parents = [];
        this.children = children;
        this._openMeganav = null;
        this._selectedBlock = null;
        this._megaNavs = null;
        this.closeSiblings = (current)=>{
            this.parents.forEach((parent)=>{
                if (parent !== current) {
                    parent.close();
                }
            });
        };
        for(let i = 0; i < this.children.length; i++){
            const child = this.children[i];
            if (child.dataset.navmenuMeganavTrigger !== undefined) {
                this.parents.push(new NavDesktopMeganavParent(child, {
                    parentMenu: this
                }));
            } else if (child.dataset.navmenuParent !== undefined) {
                this.parents.push(new NavDesktopParent(child, {
                    parentMenu: this
                }));
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
        if (!this._megaNavs) {
            this._megaNavs = {};
            this.parents.filter((parent)=>parent instanceof NavDesktopMeganavParent).forEach((megaNav)=>{
                this._megaNavs[megaNav.blockId] = megaNav;
            });
        }
        const newSelectedBlock = this._megaNavs[id];
        if (this._selectedBlock === newSelectedBlock) {
            return;
        }
        if (this._selectedBlock) {
            this._selectedBlock.close();
        }
        this._selectedBlock = this._megaNavs[id];
        this._selectedBlock.forceOpen();
    }
    openSelectedBlock() {
        if (this._selectedBlock && this.parents.filter((parent)=>parent.isOpen).length === 0) {
            this._selectedBlock.open();
        }
    }
    shouldBlockClose(block) {
        if (block === this._selectedBlock && this.parents.filter((parent)=>parent.isOpen).length === 1) {
            return false;
        }
        return true;
    }
    preselectFirstItem() {
        const firstParent = this.parents[0];
        if (!firstParent) {
            return;
        }
        if (firstParent.listitem === this.children[0]) {
            firstParent.listitem.classList.add('navmenu-item--preselected');
            firstParent.open();
        }
    }
    closeAllMenus() {
        this._selectedBlock = null;
        this.parents.forEach((parent)=>parent.close());
    }
    unload() {
        this.parents.forEach((parent)=>{
            parent.unload();
        });
        for(let i = 0; i < this.children.length; i++){
            this.children[i].removeEventListener('focusin', this.closeSiblings);
        }
    }
}
;
function sanitizeCategory(value) {
    return value.replace(/(tag|product_type):(searchfilter_)?/, '');
}
class SearchForm {
    constructor(container, options = {}){
        this.container = container;
        this.form = this.container.querySelector('[data-live-search-form]');
        this.filter = this.container.querySelector('[data-live-search-filter]');
        this.isLiveSearch = options.liveSearch ? options.liveSearch : false;
        this.setCategory = options.setCategory || (()=>{});
        this.events = new proto_5.Z();
        this.events.register(this.form, 'submit', (e)=>this.submitHandler(e));
        if (this.filter) {
            this.filterLabel = this.container.querySelector('[data-live-search-filter-label]');
            if (this.filterLabel) {
                this.setCategory(this.filterLabel.value);
                this.events.register(this.filter, 'change', (e)=>{
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
            const hideFilterIfMobile = ()=>{
                if (Layout.isLessThanBreakpoint('S')) {
                    this.filter.value = '';
                    this.form.classList.remove('live-search-filter-active');
                    if (this.filterLabel) {
                        this.filterLabel.innerHTML = this.filter.dataset.filterAll;
                    }
                }
            };
            hideFilterIfMobile();
            Layout.onBreakpointChange(()=>hideFilterIfMobile());
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
        terms = this.filter && this.filter.value ? `${this.filter.value} AND ${terms}` : terms;
        termsInput.value = terms;
        window.document.body.appendChild(form);
        form.submit();
    }
}
;
class LiveSearch {
    constructor(els, settings){
        this.$el = define_2()(els.el);
        this.$header = define_2()(els.header);
        this.closeEvents = new proto_5.Z();
        this.closeEventRequestors = new Set();
        this.settings = settings;
        this.enableImages = this.settings.enable_images;
        this.mobileSearchBar = this.settings.show_mobile_search_bar;
        this.category = '';
        this.$input = this.$el.find('[data-live-search-input]');
        this.$button = this.$el.find('[data-live-search-submit]');
        this.$takeOverButton = this.$el.find('[data-live-search-takeover-cancel]');
        this.$filter = this.$el.find('[data-live-search-filter]');
        this.$flyDown = this.$el.find('[data-live-search-flydown]');
        this.$searchResults = this.$flyDown.find('[data-live-search-results]');
        this.$searchPlaceholder = this.$flyDown.find('[data-live-search-placeholder]');
        this.$quickLinks = this.$flyDown.find('[data-live-search-quick-links]');
        this._onClose = ()=>{};
        this.disableAnimations = 'reduceAnimations' in document.body.dataset;
        this.animationFlyDown = animations_es_transition({
            el: this.$flyDown.get(0),
            state: 'closed'
        });
        this.animationSearchResults = animations_es_transition({
            el: this.$searchResults.get(0),
            state: 'closed'
        });
        this.animationTakeover = animations_es_transition({
            el: this.$el[0],
            state: 'closed'
        });
        if (this.$quickLinks.length) {
            this.animationQuickLinks = animations_es_transition({
                el: this.$quickLinks.get(0),
                state: 'closed'
            });
        }
        this.staticSearch = new SearchForm(this.$el[0], {
            liveSearch: true,
            setCategory: (category)=>{
                this.category = category;
            }
        });
        this._search = this._search.bind(this);
        this._documentFocus = this._documentFocus.bind(this);
        this._closeEsc = (e)=>{
            if (e.key === 'Escape') {
                e.stopPropagation();
                this._closeFlyDown(true);
                this._closeTakeOver();
            }
        };
        this.events = [
            this.$input.on('keyup.live-search', just_debounce_default()(this._search, 250)),
            this.$input.on('focus.live-search', (event)=>{
                event.stopPropagation();
                this._onSearchFocus(event);
            }),
            this.$takeOverButton.on('click.live-search', (event)=>{
                event.preventDefault();
                this._closeFlyDown(true);
                this._closeTakeOver();
            }),
            this.$filter.on('change.live-search', (event)=>{
                const terms = this.$input.val();
                const hasTerms = terms.length > 0;
                if (!hasTerms) {
                    return;
                }
                this._search(event);
            }),
            define_2()(window).on('resize', just_debounce_default()(()=>{
                if (this._isFlydownOpen) {
                    this._openFlyDown();
                }
            }, 250))
        ];
    }
    open() {
        if (Layout.isLessThanBreakpoint('S')) {
            this._openTakeOver();
        }
        this._openFlyDown();
        this.$input.focus();
    }
    set onClose(onClose) {
        this._onClose = onClose;
    }
    unload() {
        this.events.forEach(($el)=>$el.off('.live-search'));
        this.closeEvents.unregisterAll();
        this.closeEventRequestors.clear();
        if (this.settings.use_dimmer) {
            clear(this);
        }
        this.staticSearch.unload();
        ScrollLock.unlock();
    }
    get _terms() {
        return this.$input.val();
    }
    get _hasTerms() {
        return this._terms.trim().length > 0;
    }
    get _isFlydownOpen() {
        return this.$flyDown.attr('data-animation-state') === 'open';
    }
    _onSearchFocus(event) {
        this.$el.addClass('live-search--focused');
        if (Layout.isLessThanBreakpoint('S')) {
            if (!this._hasTerms) {
                return;
            }
            this._openTakeOver();
        }
        this._search(event);
    }
    _search(event) {
        const invalidKeyStrokes = [
            'Alt',
            'ArrowRight',
            'ArrowLeft',
            'ArrowUp',
            'ArrowDown',
            'Capslock',
            'Control',
            'Escape',
            'Meta',
            'Shift',
            'Tab',
            'Enter'
        ];
        if (event.key && invalidKeyStrokes.indexOf(event.key) !== -1) {
            return;
        }
        let terms = this._terms;
        if (Layout.isLessThanBreakpoint('S')) {
            this._openTakeOver();
        }
        this._toggleButton(this._hasTerms);
        if (this._hasTerms) {
            this.$searchResults.html('');
            this._openFlyDown(true);
            const filter = this.$filter[0];
            terms = filter && filter.value ? `${filter.value} AND ${terms}` : terms;
            fetch(`${window.Theme.routes.predictive_search_url}?q=${encodeURIComponent(terms)}&section_id=predictive-search`).then((response)=>{
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.text();
            }).then((html)=>{
                this.$searchResults.html(html);
                rimg_shopify_dist_index_es.watch(this.$searchResults[0]);
                this._openFlyDown();
                this._toggleButton(false);
            }).catch((error)=>{
                throw error;
            });
        } else if (this.$quickLinks.length) {
            this._openFlyDown();
        } else {
            this._closeFlyDown(true);
        }
    }
    _searchError(response) {
        console.warn('Search had error');
        console.log(response.message, response.error, response.event);
        this._toggleButton(false);
    }
    _toggleButton(disable) {
        if (disable) {
            this.$button.addClass('search-icon--processing').attr('disabled');
        } else {
            this.$button.removeClass('search-icon--processing').removeAttr('disabled');
        }
    }
    _shouldOpenFlyDown(placeholder = false) {
        if (placeholder) {
            return true;
        }
        const hasTerms = this.$input.val().length > 0;
        const hasNoResults = this.$searchResults.find('[data-live-search-no-products]').length > 0;
        const hasResults = this.$searchResults.children().length > 0;
        const hasQuickLinks = this.$quickLinks.length;
        return hasTerms && (hasResults || hasNoResults) || !hasTerms && hasQuickLinks;
    }
    _registerCloseEvents(requestor) {
        if (this.closeEventRequestors.size === 0) {
            this.closeEvents.register(window, 'keydown', this._closeEsc);
            this.closeEvents.register(document, 'focusin', this._documentFocus);
            this.closeEvents.register(document, 'touchstart', this._documentFocus);
            this.closeEvents.register(document, 'click', this._documentFocus);
        }
        this.closeEventRequestors.add(requestor);
    }
    _unregisterCloseEvents(requestor) {
        this.closeEventRequestors.delete(requestor);
        if (this.closeEventRequestors.size) {
            return;
        }
        this.closeEvents.unregisterAll();
        this._onClose();
    }
    _openFlyDown(placeholder = false) {
        if (!this._shouldOpenFlyDown(placeholder)) {
            return;
        }
        const resize = ({ el })=>{
            const container = el.querySelector(':scope > .visible');
            const scrollHeight = container ? container.scrollHeight : 0;
            el.style.setProperty('--open-height', `${scrollHeight}px`);
            const viewportHeight = el.closest('[data-site-header]') ? document.documentElement.clientHeight : document.documentElement.scrollHeight;
            const topPos = container.getBoundingClientRect().top + (el.closest('[data-site-header]') ? 0 : window.scrollY);
            const offset = 30;
            const maxHeight = viewportHeight - topPos - offset;
            el.style.setProperty('--flydown-max-height', `${maxHeight}px`);
        };
        this._updateFlyDown(placeholder);
        if (!this.$flyDown.data('is-open')) {
            this._registerCloseEvents('flydown');
            if (this.settings.use_dimmer) {
                find(this);
            }
            this.$flyDown.data('is-open', true);
            this.animationFlyDown.animateTo('open', {
                force: this.disableAnimations,
                onStart: resize
            }).then(()=>this.$el.addClass('live-search--active'));
        } else {
            resize({
                el: this.$flyDown.get(0)
            });
        }
    }
    _updateFlyDown(placeholder = false) {
        const hasTerms = this.$input.val().length > 0;
        const hasNoResults = this.$searchResults.find('[data-live-search-no-products]').length > 0;
        const hasResults = this.$searchResults.children().length > 0;
        const hasQuickLinks = this.$quickLinks.length;
        if (placeholder) {
            this.$searchResults.removeClass('visible');
            this.$quickLinks.removeClass('visible');
            this.$searchPlaceholder.addClass('visible');
            if (this.animationQuickLinks) {
                this.animationQuickLinks.animateTo('hidden', {
                    force: this.disableAnimations
                });
            }
            this.animationSearchResults.animateTo('hidden', {
                force: this.disableAnimations
            });
        } else if (hasTerms && (hasNoResults || hasResults)) {
            this.$searchPlaceholder.removeClass('visible');
            this.$quickLinks.removeClass('visible');
            this.$searchResults.addClass('visible');
            if (this.animationQuickLinks) {
                this.animationQuickLinks.animateTo('hidden', {
                    force: this.disableAnimations
                });
            }
            this.animationSearchResults.animateTo('visible', {
                force: this.disableAnimations
            });
        } else if (hasQuickLinks) {
            this.$searchPlaceholder.removeClass('visible');
            this.$searchResults.removeClass('visible');
            this.$quickLinks.addClass('visible');
            this.animationSearchResults.animateTo('hidden', {
                force: this.disableAnimations
            });
            this.animationQuickLinks.animateTo('visible', {
                force: this.disableAnimations
            });
        }
    }
    _closeFlyDown(retainFocus = false) {
        if (!this.$flyDown.data('is-open')) {
            return;
        }
        this._unregisterCloseEvents('flydown');
        clear(this);
        this.$flyDown.data('is-open', false);
        this.$searchPlaceholder.removeClass('visible');
        this.$quickLinks.removeClass('visible');
        this.$searchResults.removeClass('visible');
        if (this.animationQuickLinks) {
            this.animationQuickLinks.animateTo('closed', {
                force: this.disableAnimations
            });
        }
        this.animationSearchResults.animateTo('closed', {
            force: this.disableAnimations
        });
        this.animationFlyDown.animateTo('closed', {
            force: this.disableAnimations,
            onStart: ({ el })=>el.style.setProperty('--open-height', '0')
        }).then(()=>{
            this.$el.removeClass('live-search--active');
            if (!retainFocus) {
                this.$el.removeClass('live-search--focused');
            }
        });
    }
    _openTakeOver() {
        if (this.animationTakeover.state === 'open') {
            return;
        }
        if (this.$header.hasClass('search--section')) {
            document.body.classList.add('search-takeover-active');
        }
        ScrollLock.lock(this.$el[0]);
        this.$el.addClass('live-search--takeover');
        document.body.classList.add('mobile-search-takeover-active');
        this._registerCloseEvents('takeover');
        if (this.settings.use_dimmer) {
            find(this);
        }
        if (this.mobileSearchBar) {
            const Expr = this.$el[0];
            const { top: Expr, right: Expr, left: Expr, width: Expr } = Expr.getBoundingClientRect();
            Expr.style.setProperty('--live-search-takeover-initial-top', `${Expr}px`);
            Expr.style.setProperty('--live-search-takeover-initial-right', `${window.innerWidth - Expr}px`);
            Expr.style.setProperty('--live-search-takeover-initial-left', `${Expr}px`);
            Expr.style.setProperty('--live-search-takeover-initial-width', `${Expr}px`);
            Expr.parentNode.style.height = `${Expr.parentNode.getBoundingClientRect().height}px`;
            this.animationTakeover.animateTo('open', {
                force: this.disableAnimations
            });
        } else {
            this.animationTakeover.animateTo('open', {
                force: this.disableAnimations,
                hold: true
            });
        }
    }
    _closeTakeOver() {
        if (this.animationTakeover.state === 'closed') {
            return;
        }
        this._unregisterCloseEvents('takeover');
        if (this.settings.use_dimmer) {
            clear(this);
        }
        this.animationTakeover.animateTo('closed', {
            force: this.disableAnimations
        }).then(()=>{
            ScrollLock.unlock();
            document.body.classList.remove('search-takeover-active');
            document.body.classList.remove('mobile-search-takeover-active');
            this.$el.removeClass('live-search--takeover');
            if (this.mobileSearchBar) {
                this.$el[0].parentNode.style.height = '';
            }
        });
    }
    _documentFocus(event) {
        const $closest = define_2()(event.target).closest('[data-live-search]');
        if ($closest[0] === this.$el[0]) {
            return;
        }
        this._closeFlyDown();
        this._closeTakeOver();
    }
}
;
class StaticHeader {
    constructor(section){
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
            postMessage: this.postMessage
        }, this.settings);
        this.navMobile = new NavMobile({
            el: this.el,
            toggleOpen: this.menuToggle
        });
        this.navDesktop = new NavDesktopMenu(document.querySelector('.site-navigation > [data-navmenu]'));
        this.forms = new Forms(this.el);
        this.events = new proto_5.Z();
        if (this.settings.live_search.enable) {
            utils()(this.scripts.dataset.shopifyApiUrl, ()=>{
                this.headerSearch = new LiveSearch({
                    el: this.searchField,
                    header: this.el
                }, {
                    ...this.settings.live_search,
                    use_dimmer: true
                });
                this.mobileSearchButtonEl = section.el.querySelector('[data-mobile-search-button]');
                if (this.mobileSearchButtonEl) {
                    const disableAnimations = 'reduceAnimations' in document.body.dataset;
                    this.mobileSearchButtonAnimation = animations_es_transition({
                        el: this.mobileSearchButtonEl,
                        state: 'visible'
                    });
                    this.events.register(this.mobileSearchButtonEl, 'click', (e)=>{
                        e.stopPropagation();
                        this.headerSearch.open();
                        this.mobileSearchButtonAnimation.animateTo('hidden', {
                            force: disableAnimations
                        });
                    });
                    this.headerSearch.onClose = ()=>{
                        this.mobileSearchButtonAnimation.animateTo('visible', {
                            force: disableAnimations
                        });
                        this.mobileSearchButtonEl.focus();
                    };
                }
            });
        } else {
            this.headerSearch = new SearchForm(this.searchField);
        }
        this.events.register(window, 'cartcount:update', (event)=>{
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
        if (name === 'nav:close-all' && Layout.isGreaterThanBreakpoint('M')) {
            this._closeAllNavigation();
        }
        if (name === 'collection-page:collection-utils-sticky-change') {
            this._handleStickyChange(data);
        }
    }
    onSectionBlockSelect(block) {
        if (!Layout.isGreaterThanBreakpoint('M')) {
            return;
        }
        this.stickyHeader.openNavigation(()=>{
            this.navDesktop.selectBlock(block.id);
        });
    }
    onSectionBlockDeselect() {
        this._closeAllNavigation();
    }
    _closeAllNavigation() {
        this.navDesktop.closeAllMenus();
    }
    _handleStickyChange(data) {
        if (!this.settings.sticky_header || !this.settings.has_box_shadow) {
            return;
        }
        const { stuck, target } = data;
        this.el.classList.toggle('site-header-wrapper--no-shadow', stuck);
    }
}
;
class StaticPassword {
    constructor(section){
        this.$el = define_2()(section.el);
        this.modalForms = null;
        this.newsletterForm = null;
        this.modalContents = '[data-passwordentry]';
        this.$newsletterForm = this.$el.find('[data-password-newsletter]');
        this.modalOpen = this.onModalOpen.bind(this);
        this.modalClose = this.onModalClose.bind(this);
        this._openModal = this._openModal.bind(this);
        this.modal = new jQuery({
            onOpen: this.modalOpen,
            onClose: this.modalClose
        });
        if (this.$newsletterForm) {
            this.newsletterForm = new Forms(this.$newsletterForm);
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
        const $contents = define_2()('[data-passwordentry-contents]');
        this.modalForms = new Forms($contents);
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
        if (!define_2()('[data-passwordentry-errors]').length) {
            return;
        }
        this._openModal();
    }
}
;
function _typeof(obj) {
    "@babel/helpers - typeof";
    _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? (obj)=>typeof obj : (obj)=>{
        if (obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype) {
            return "symbol";
        }
        return typeof obj;
    };
    return _typeof(obj);
}
function pxs_complementary_products_dist_index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function pxs_complementary_products_dist_index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        pxs_complementary_products_dist_index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        pxs_complementary_products_dist_index_es_defineProperties(Constructor, staticProps);
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
const commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};
function dist_index_es_unwrapExports(x) {
    if (x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')) {
        return x['default'];
    }
    return x;
}
function pxs_complementary_products_dist_index_es_createCommonjsModule(fn, module) {
    module = {
        exports: {}
    };
    fn(module, module.exports);
    return module.exports;
}
const pxs_complementary_products_dist_index_es_EventHandler_1 = pxs_complementary_products_dist_index_es_createCommonjsModule(function(module, exports) {
    exports.__esModule = true;
    class EventHandler {
        constructor(){
            this.events = [];
        }
        register(el, event, listener) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events.push({
                el,
                event,
                listener
            });
            el.addEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregister({ el, event, listener }) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events = this.events.filter((e)=>el !== e.el || event !== e.event || listener !== e.listener);
            el.removeEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregisterAll() {
            this.events.forEach(({ el, event, listener })=>el.removeEventListener(event, listener));
            this.events = [];
        }
    }
    exports["default"] = EventHandler;
});
const dist_index_es_EventHandler = dist_index_es_unwrapExports(pxs_complementary_products_dist_index_es_EventHandler_1);
function index_es_defineProperties$1(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function index_es_createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) {
        index_es_defineProperties$1(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        index_es_defineProperties$1(Constructor, staticProps);
    }
    return Constructor;
}
function index_es_slicedToArray(arr, i) {
    return index_es_arrayWithHoles(arr) || index_es_iterableToArrayLimit(arr, i) || dist_index_es_unsupportedIterableToArray(arr, i) || index_es_nonIterableRest();
}
function index_es_arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr;
    }
}
function index_es_iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) {
        return;
    }
    const _arr = [];
    for (const _s of arr){
        _arr.push(_s);
        if (i && _arr.length === i) {
            break;
        }
    }
    return _arr;
}
function dist_index_es_unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return;
    }
    if (typeof o === "string") {
        return dist_index_es_arrayLikeToArray(o, minLen);
    }
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) {
        n = o.constructor.name;
    }
    if (n === "Map" || n === "Set") {
        return Array.from(n);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return dist_index_es_arrayLikeToArray(o, minLen);
    }
}
function dist_index_es_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) {
        len = arr.length;
    }
    const arr2 = new Array(len);
    for(let i = 0; i < len; i++){
        arr2[i] = arr[i];
    }
    return arr2;
}
function index_es_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
const index_es_deferred = {};
const index_es_AsyncView = (()=>{
    function AsyncView() {}
    index_es_createClass$1(AsyncView, null, [
        {
            key: "load",
            value: function load(url, query = {}, options = {}) {
                if (!('view' in query)) {
                    return Promise.reject(new Error('\'view\' not found in \'query\' parameter'));
                }
                const querylessUrl = url.replace(/\?[^#]+/, '');
                const queryParamsString = new RegExp(/.+\?([^#]+)/).exec(url);
                const queryParams = query;
                if (queryParamsString && queryParamsString.length >= 2) {
                    queryParamsString[1].split('&').forEach((param)=>{
                        const _param$split = param.split('=');
                        const _param$split2 = index_es_slicedToArray(_param$split, 2);
                        const key = _param$split2[0];
                        const value = _param$split2[1];
                        queryParams[key] = value;
                    });
                }
                const cachebustingParams = {
                    ...queryParams,
                    _: new Date().getTime()
                };
                const hashUrl = querylessUrl.replace(/([^#]+)(.*)/, (match, address, hash)=>`${address}?${Object.keys(queryParams).sort().map((key)=>`${key}=${encodeURIComponent(queryParams[key])}`).join('&')}${hash}`);
                const requestUrl = querylessUrl.replace(/([^#]+)(.*)/, (match, address, hash)=>`${address}?${Object.keys(cachebustingParams).sort().map((key)=>`${key}=${encodeURIComponent(cachebustingParams[key])}`).join('&')}${hash}`);
                const promise = new Promise((resolve, reject)=>{
                    let data;
                    if (hashUrl in index_es_deferred) {
                        resolve(index_es_deferred[hashUrl]);
                        return;
                    }
                    index_es_deferred[hashUrl] = promise;
                    if (options.hash) {
                        data = sessionStorage.getItem(hashUrl);
                        if (data) {
                            const deserialized = JSON.parse(data);
                            if (options.hash === deserialized.options.hash) {
                                delete index_es_deferred[hashUrl];
                                resolve(deserialized);
                                return;
                            }
                        }
                    }
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', requestUrl, true);
                    xhr.onload = ()=>{
                        const xhr_response = xhr.response;
                        let newOptions = {};
                        const optionsEl = xhr_response.querySelector('[data-options]');
                        if (optionsEl && optionsEl.innerHTML) {
                            newOptions = JSON.parse(xhr_response.querySelector('[data-options]').innerHTML);
                        }
                        const htmlEls = xhr_response.querySelectorAll('[data-html]');
                        let newHtml = {};
                        if (htmlEls.length === 1 && htmlEls[0].getAttribute('data-html') === '') {
                            newHtml = htmlEls[0].innerHTML;
                        } else {
                            for(let i = 0; i < htmlEls.length; i++){
                                newHtml[htmlEls[i].getAttribute('data-html')] = htmlEls[i].innerHTML;
                            }
                        }
                        const dataEls = xhr_response.querySelectorAll('[data-data]');
                        let newData = {};
                        if (dataEls.length === 1 && dataEls[0].getAttribute('data-data') === '') {
                            newData = JSON.parse(dataEls[0].innerHTML);
                        } else {
                            for(let _i = 0; _i < dataEls.length; _i++){
                                newData[dataEls[_i].getAttribute('data-data')] = JSON.parse(dataEls[_i].innerHTML);
                            }
                        }
                        if (options.hash) {
                            try {
                                sessionStorage.setItem(hashUrl, JSON.stringify({
                                    options: newOptions,
                                    data: newData,
                                    html: newHtml
                                }));
                            } catch (error) {
                                console.error(error);
                            }
                        }
                        delete index_es_deferred[hashUrl];
                        resolve({
                            data: newData,
                            html: newHtml
                        });
                    };
                    xhr.onerror = ()=>{
                        delete index_es_deferred[hashUrl];
                        reject();
                    };
                    xhr.responseType = 'document';
                    xhr.send();
                });
                return promise;
            }
        }
    ]);
    return AsyncView;
})();
const evEmitter = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((global, factory)=>{
        if (module.exports) {
            module.exports = factory();
        } else {
            global.EvEmitter = factory();
        }
    })(typeof window !== 'undefined' ? window : commonjsGlobal, ()=>{
        function EvEmitter() {}
        const proto = EvEmitter.prototype;
        proto.on = function(eventName, listener) {
            if (!eventName || !listener) {
                return;
            }
            const events = this._events = this._events || {};
            const listeners = events[eventName] = events[eventName] || [];
            if (listeners.indexOf(listener) == -1) {
                listeners.push(listener);
            }
            return this;
        };
        proto.once = function(eventName, listener) {
            if (!eventName || !listener) {
                return;
            }
            this.on(eventName, listener);
            const onceEvents = this._onceEvents = this._onceEvents || {};
            const onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
            onceListeners[listener] = true;
            return this;
        };
        proto.off = function(eventName, listener) {
            const listeners = this._events && this._events[eventName];
            if (!listeners || !listeners.length) {
                return;
            }
            const index = listeners.indexOf(listener);
            if (index != -1) {
                listeners.splice(index, 1);
            }
            return this;
        };
        proto.emitEvent = function(eventName, args) {
            let listeners = this._events && this._events[eventName];
            if (!listeners || !listeners.length) {
                return;
            }
            listeners = listeners.slice(0);
            args = args || [];
            const onceListeners = this._onceEvents && this._onceEvents[eventName];
            for (const Element of listeners){
                const isOnce = onceListeners && onceListeners[Element];
                if (isOnce) {
                    this.off(eventName, Element);
                    delete onceListeners[Element];
                }
                Element.apply(this, args);
            }
            return this;
        };
        proto.allOff = function() {
            delete this._events;
            delete this._onceEvents;
        };
        return EvEmitter;
    });
});
const getSize = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory();
        } else {
            window.getSize = factory();
        }
    })(window, function factory() {
        function find(value) {
            const num = parseFloat(value);
            const isValid = value.indexOf('%') == -1 && !isNaN(num);
            return isValid && num;
        }
        function noop() {}
        const logError = typeof console === 'undefined' ? noop : (message)=>{
            console.error(message);
        };
        const measurements = [
            'paddingLeft',
            'paddingRight',
            'paddingTop',
            'paddingBottom',
            'marginLeft',
            'marginRight',
            'marginTop',
            'marginBottom',
            'borderLeftWidth',
            'borderRightWidth',
            'borderTopWidth',
            'borderBottomWidth'
        ];
        const jQuery = measurements.length;
        function getZeroSize() {
            const size = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            };
            for(let i = 0; i < jQuery; i++){
                const measurement = measurements[i];
                size[measurement] = 0;
            }
            return size;
        }
        function getStyle(elem) {
            const style = getComputedStyle(elem);
            if (!style) {
                logError(`Style returned ${style}. Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1`);
            }
            return style;
        }
        let isSetup = false;
        let find;
        function setDocument() {
            if (isSetup) {
                return;
            }
            isSetup = true;
            const support = document.createElement('div');
            support.style.width = '200px';
            support.style.padding = '1px 2px 3px 4px';
            support.style.borderStyle = 'solid';
            support.style.borderWidth = '1px 2px 3px 4px';
            support.style.boxSizing = 'border-box';
            const support = document.body || document.documentElement;
            support.appendChild(support);
            const style = getStyle(support);
            find = Math.round(find(style.width)) == 200;
            getSize.isBoxSizeOuter = find;
            support.removeChild(support);
        }
        function getSize(support) {
            setDocument();
            if (typeof support === 'string') {
                support = document.querySelector(support);
            }
            if (!support || typeof support !== 'object' || !support.nodeType) {
                return;
            }
            const jQuery = getStyle(support);
            if (jQuery.display == 'none') {
                return getZeroSize();
            }
            const find = {};
            find.width = support.offsetWidth;
            find.height = support.offsetHeight;
            const find = find.isBorderBox = jQuery.boxSizing == 'border-box';
            for(let jQuery = 0; jQuery < jQuery; jQuery++){
                const find = measurements[jQuery];
                const find = jQuery[find];
                const find = parseFloat(find);
                find[find] = !isNaN(find) ? find : 0;
            }
            const find = find.paddingLeft + find.paddingRight;
            const find = find.paddingTop + find.paddingBottom;
            const find = find.marginLeft + find.marginRight;
            const find = find.marginTop + find.marginBottom;
            const find = find.borderLeftWidth + find.borderRightWidth;
            const find = find.borderTopWidth + find.borderBottomWidth;
            const find = find && find;
            const find = find(jQuery.width);
            if (find !== false) {
                find.width = find + (find ? 0 : find + find);
            }
            const styleHeight = find(jQuery.height);
            if (styleHeight !== false) {
                find.height = styleHeight + (find ? 0 : find + find);
            }
            find.innerWidth = find.width - (find + find);
            find.innerHeight = find.height - (find + find);
            find.outerWidth = find.width + find;
            find.outerHeight = find.height + find;
            return find;
        }
        return getSize;
    });
});
const matchesSelector = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory();
        } else {
            window.matchesSelector = factory();
        }
    })(window, function factory() {
        const matchesMethod = (()=>{
            const ElemProto = window.Element.prototype;
            if (ElemProto.matches) {
                return 'matches';
            }
            if (ElemProto.matchesSelector) {
                return 'matchesSelector';
            }
            const prefixes = [
                'webkit',
                'moz',
                'ms',
                'o'
            ];
            for (const prefix of prefixes){
                const method = `${prefix}MatchesSelector`;
                if (ElemProto[method]) {
                    return method;
                }
            }
        })();
        return function matchesSelector(elem, selector) {
            return elem[matchesMethod](selector);
        };
    });
});
const utils = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, matchesSelector);
        } else {
            window.fizzyUIUtils = factory(window, window.matchesSelector);
        }
    })(window, function factory(window, matchesSelector) {
        const jQuery = {};
        jQuery.extend = (a, b)=>{
            for(const prop in b){
                a[prop] = b[prop];
            }
            return a;
        };
        jQuery.modulo = (num, div)=>(num % div + div) % div;
        const arraySlice = Array.prototype.slice;
        jQuery.makeArray = (jQuery)=>{
            if (Array.isArray(jQuery)) {
                return jQuery;
            }
            if (jQuery === null || jQuery === undefined) {
                return [];
            }
            const isArrayLike = typeof jQuery === 'object' && typeof jQuery.length === 'number';
            if (isArrayLike) {
                return arraySlice.call(jQuery);
            }
            return [
                jQuery
            ];
        };
        jQuery.removeFrom = (jQuery, jQuery)=>{
            const jQuery = jQuery.indexOf(jQuery);
            if (jQuery != -1) {
                jQuery.splice(jQuery, 1);
            }
        };
        jQuery.getParent = (elem, selector)=>{
            while(elem.parentNode && elem != document.body){
                elem = elem.parentNode;
                if (matchesSelector(elem, selector)) {
                    return elem;
                }
            }
        };
        jQuery.getQueryElement = (elem)=>{
            if (typeof elem === 'string') {
                return document.querySelector(elem);
            }
            return elem;
        };
        jQuery.handleEvent = function(event) {
            const method = `on${event.type}`;
            if (this[method]) {
                this[method](event);
            }
        };
        jQuery.filterFindElements = (elems, selector)=>{
            elems = jQuery.makeArray(elems);
            const ffElems = [];
            elems.forEach((elem)=>{
                if (!(elem instanceof HTMLElement)) {
                    return;
                }
                if (!selector) {
                    ffElems.push(elem);
                    return;
                }
                if (matchesSelector(elem, selector)) {
                    ffElems.push(elem);
                }
                const childElems = elem.querySelectorAll(selector);
                for(let i = 0; i < childElems.length; i++){
                    ffElems.push(childElems[i]);
                }
            });
            return ffElems;
        };
        jQuery.debounceMethod = (_class, methodName, threshold)=>{
            threshold = threshold || 100;
            const method = _class.prototype[methodName];
            const timeoutName = `${methodName}Timeout`;
            _class.prototype[methodName] = function() {
                const timeout = this[timeoutName];
                clearTimeout(timeout);
                const args = arguments;
                const _this = this;
                this[timeoutName] = setTimeout(()=>{
                    method.apply(_this, args);
                    delete _this[timeoutName];
                }, threshold);
            };
        };
        jQuery.docReady = (callback)=>{
            const readyState = document.readyState;
            if (readyState == 'complete' || readyState == 'interactive') {
                setTimeout(callback);
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }
        };
        jQuery.toDashed = (str)=>str.replace(/(.)([A-Z])/g, (match, $1, $2)=>`${$1}-${$2}`).toLowerCase();
        const console = window.console;
        jQuery.htmlInit = (WidgetClass, namespace)=>{
            jQuery.docReady(()=>{
                const dashedNamespace = jQuery.toDashed(namespace);
                const dataAttr = `data-${dashedNamespace}`;
                const dataAttrElems = document.querySelectorAll(`[${dataAttr}]`);
                const jsDashElems = document.querySelectorAll(`.js-${dashedNamespace}`);
                const elems = jQuery.makeArray(dataAttrElems).concat(jQuery.makeArray(jsDashElems));
                const dataOptionsAttr = `${dataAttr}-options`;
                const jQuery = window.jQuery;
                elems.forEach((elem)=>{
                    const attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
                    let options;
                    try {
                        options = attr && JSON.parse(attr);
                    } catch (error) {
                        if (console) {
                            console.error(`Error parsing ${dataAttr} on ${elem.className}: ${error}`);
                        }
                        return;
                    }
                    const instance = new WidgetClass(elem, options);
                    if (jQuery) {
                        jQuery.data(elem, namespace, instance);
                    }
                });
            });
        };
        return jQuery;
    });
});
const cell = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, getSize);
        } else {
            window.Flickity = window.Flickity || {};
            window.Flickity.Cell = factory(window, window.getSize);
        }
    })(window, function factory(window, getSize) {
        function Cell(elem, parent) {
            this.element = elem;
            this.parent = parent;
            this.create();
        }
        const rootjQuery = Cell.prototype;
        rootjQuery.create = function() {
            this.element.style.position = 'absolute';
            this.element.setAttribute('aria-hidden', 'true');
            this.x = 0;
            this.shift = 0;
            this.element.style[this.parent.originSide] = 0;
        };
        rootjQuery.destroy = function() {
            this.unselect();
            this.element.style.position = '';
            const side = this.parent.originSide;
            this.element.style[side] = '';
            this.element.style.transform = '';
            this.element.removeAttribute('aria-hidden');
        };
        rootjQuery.getSize = function() {
            this.size = getSize(this.element);
        };
        rootjQuery.setPosition = function(x) {
            this.x = x;
            this.updateTarget();
            this.renderPosition(x);
        };
        rootjQuery.updateTarget = rootjQuery.setDefaultTarget = function() {
            const marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
            this.target = this.x + this.size[marginProperty] + this.size.width * this.parent.cellAlign;
        };
        rootjQuery.renderPosition = function(x) {
            const sideOffset = this.parent.originSide === 'left' ? 1 : -1;
            const adjustedX = this.parent.options.percentPosition ? x * sideOffset * (this.parent.size.innerWidth / this.size.width) : x * sideOffset;
            this.element.style.transform = `translateX(${this.parent.getPositionValue(adjustedX)})`;
        };
        rootjQuery.select = function() {
            this.element.classList.add('is-selected');
            this.element.removeAttribute('aria-hidden');
        };
        rootjQuery.unselect = function() {
            this.element.classList.remove('is-selected');
            this.element.setAttribute('aria-hidden', 'true');
        };
        rootjQuery.wrapShift = function(init) {
            this.shift = init;
            this.renderPosition(this.x + this.parent.slideableWidth * init);
        };
        rootjQuery.remove = function() {
            this.element.parentNode.removeChild(this.element);
        };
        return Cell;
    });
});
const slide = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory();
        } else {
            window.Flickity = window.Flickity || {};
            window.Flickity.Slide = factory();
        }
    })(window, function factory() {
        function Slide(parent) {
            this.parent = parent;
            this.isOriginLeft = parent.originSide == 'left';
            this.cells = [];
            this.outerWidth = 0;
            this.height = 0;
        }
        const proto = Slide.prototype;
        proto.addCell = function(cell) {
            this.cells.push(cell);
            this.outerWidth += cell.size.outerWidth;
            this.height = Math.max(cell.size.outerHeight, this.height);
            if (this.cells.length == 1) {
                this.x = cell.x;
                const beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
                this.firstMargin = cell.size[beginMargin];
            }
        };
        proto.updateTarget = function() {
            const endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
            const lastCell = this.getLastCell();
            const lastMargin = lastCell ? lastCell.size[endMargin] : 0;
            const slideWidth = this.outerWidth - (this.firstMargin + lastMargin);
            this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
        };
        proto.getLastCell = function() {
            return this.cells[this.cells.length - 1];
        };
        proto.select = function() {
            this.cells.forEach((cell)=>{
                cell.select();
            });
        };
        proto.unselect = function() {
            this.cells.forEach((cell)=>{
                cell.unselect();
            });
        };
        proto.getCellElements = function() {
            return this.cells.map((cell)=>cell.element);
        };
        return Slide;
    });
});
const animate = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, utils);
        } else {
            window.Flickity = window.Flickity || {};
            window.Flickity.animatePrototype = factory(window, window.fizzyUIUtils);
        }
    })(window, function factory(window, utils) {
        const proto = {};
        proto.startAnimation = function() {
            if (this.isAnimating) {
                return;
            }
            this.isAnimating = true;
            this.restingFrames = 0;
            this.animate();
        };
        proto.animate = function() {
            this.applyDragForce();
            this.applySelectedAttraction();
            const previousX = this.x;
            this.integratePhysics();
            this.positionSlider();
            this.settle(previousX);
            if (this.isAnimating) {
                const _this = this;
                requestAnimationFrame(function animateFrame() {
                    _this.animate();
                });
            }
        };
        proto.positionSlider = function() {
            let x = this.x;
            if (this.options.wrapAround && this.cells.length > 1) {
                x = utils.modulo(x, this.slideableWidth);
                x -= this.slideableWidth;
                this.shiftWrapCells(x);
            }
            this.setTranslateX(x, this.isAnimating);
            this.dispatchScrollEvent();
        };
        proto.setTranslateX = function(x, is3d) {
            x += this.cursorPosition;
            x = this.options.rightToLeft ? -x : x;
            const translateX = this.getPositionValue(x);
            this.slider.style.transform = is3d ? `translate3d(${translateX},0,0)` : `translateX(${translateX})`;
        };
        proto.dispatchScrollEvent = function() {
            const firstSlide = this.slides[0];
            if (!firstSlide) {
                return;
            }
            const positionX = -this.x - firstSlide.target;
            const progress = positionX / this.slidesWidth;
            this.dispatchEvent('scroll', null, [
                progress,
                positionX
            ]);
        };
        proto.positionSliderAtSelected = function() {
            if (!this.cells.length) {
                return;
            }
            this.x = -this.selectedSlide.target;
            this.velocity = 0;
            this.positionSlider();
        };
        proto.getPositionValue = function(position) {
            if (this.options.percentPosition) {
                return `${Math.round(position / this.size.innerWidth * 10000) * 0.01}%`;
            } else {
                return `${Math.round(position)}px`;
            }
        };
        proto.settle = function(previousX) {
            const isResting = !this.isPointerDown && Math.round(this.x * 100) == Math.round(previousX * 100);
            if (isResting) {
                this.restingFrames++;
            }
            if (this.restingFrames > 2) {
                this.isAnimating = false;
                delete this.isFreeScrolling;
                this.positionSlider();
                this.dispatchEvent('settle', null, [
                    this.selectedIndex
                ]);
            }
        };
        proto.shiftWrapCells = function(x) {
            const beforeGap = this.cursorPosition + x;
            this._shiftCells(this.beforeShiftCells, beforeGap, -1);
            const afterGap = this.size.innerWidth - (x + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, afterGap, 1);
        };
        proto._shiftCells = (cells, gap, shift)=>{
            for (const cell of cells){
                const cellShift = gap > 0 ? shift : 0;
                cell.wrapShift(cellShift);
                gap -= cell.size.outerWidth;
            }
        };
        proto._unshiftCells = (cells)=>{
            if (!cells || !cells.length) {
                return;
            }
            for(let i = 0; i < cells.length; i++){
                cells[i].wrapShift(0);
            }
        };
        proto.integratePhysics = function() {
            this.x += this.velocity;
            this.velocity *= this.getFrictionFactor();
        };
        proto.applyForce = function(force) {
            this.velocity += force;
        };
        proto.getFrictionFactor = function() {
            return 1 - this.options[this.isFreeScrolling ? 'freeScrollFriction' : 'friction'];
        };
        proto.getRestingPosition = function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor());
        };
        proto.applyDragForce = function() {
            if (!this.isDraggable || !this.isPointerDown) {
                return;
            }
            const dragVelocity = this.dragX - this.x;
            const dragForce = dragVelocity - this.velocity;
            this.applyForce(dragForce);
        };
        proto.applySelectedAttraction = function() {
            const dragDown = this.isDraggable && this.isPointerDown;
            if (dragDown || this.isFreeScrolling || !this.slides.length) {
                return;
            }
            const distance = this.selectedSlide.target * -1 - this.x;
            const force = distance * this.options.selectedAttraction;
            this.applyForce(force);
        };
        return proto;
    });
});
const flickity = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, evEmitter, getSize, utils, cell, slide, animate);
        } else {
            const _Flickity = window.Flickity;
            window.Flickity = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, _Flickity.Cell, _Flickity.Slide, _Flickity.animatePrototype);
        }
    })(window, function factory(window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype) {
        let jQuery = window.jQuery;
        const { getComputedStyle, console } = window;
        function moveElements(elems, toElem) {
            elems = utils.makeArray(elems);
            while(elems.length){
                toElem.appendChild(elems.shift());
            }
        }
        let GUID = 0;
        const instances = {};
        function Flickity(element, options) {
            const queryElement = utils.getQueryElement(element);
            if (!queryElement) {
                if (console) {
                    console.error(`Bad element for Flickity: ${queryElement || element}`);
                }
                return;
            }
            this.element = queryElement;
            if (this.element.flickityGUID) {
                const instance = instances[this.element.flickityGUID];
                if (instance) {
                    instance.option(options);
                }
                return instance;
            }
            if (jQuery) {
                this.$element = jQuery(this.element);
            }
            this.options = utils.extend({}, this.constructor.defaults);
            this.option(options);
            this._create();
        }
        Flickity.defaults = {
            accessibility: true,
            cellAlign: 'center',
            freeScrollFriction: 0.075,
            friction: 0.28,
            namespaceJQueryEvents: true,
            percentPosition: true,
            resize: true,
            selectedAttraction: 0.025,
            setGallerySize: true
        };
        Flickity.createMethods = [];
        const proto = Flickity.prototype;
        utils.extend(proto, EvEmitter.prototype);
        proto._create = function() {
            const id = this.guid = ++GUID;
            this.element.flickityGUID = id;
            instances[id] = this;
            this.selectedIndex = 0;
            this.restingFrames = 0;
            this.x = 0;
            this.velocity = 0;
            this.originSide = this.options.rightToLeft ? 'right' : 'left';
            this.viewport = document.createElement('div');
            this.viewport.className = 'flickity-viewport';
            this._createSlider();
            if (this.options.resize || this.options.watchCSS) {
                window.addEventListener('resize', this);
            }
            for(const eventName in this.options.on){
                const listener = this.options.on[eventName];
                this.on(eventName, listener);
            }
            Flickity.createMethods.forEach(function(method) {
                this[method]();
            }, this);
            if (this.options.watchCSS) {
                this.watchCSS();
            } else {
                this.activate();
            }
        };
        proto.option = function(opts) {
            utils.extend(this.options, opts);
        };
        proto.activate = function() {
            if (this.isActive) {
                return;
            }
            this.isActive = true;
            this.element.classList.add('flickity-enabled');
            if (this.options.rightToLeft) {
                this.element.classList.add('flickity-rtl');
            }
            this.getSize();
            const cellElems = this._filterFindCellElements(this.element.children);
            moveElements(cellElems, this.slider);
            this.viewport.appendChild(this.slider);
            this.element.appendChild(this.viewport);
            this.reloadCells();
            if (this.options.accessibility) {
                this.element.tabIndex = 0;
                this.element.addEventListener('keydown', this);
            }
            this.emitEvent('activate');
            this.selectInitialIndex();
            this.isInitActivated = true;
            this.dispatchEvent('ready');
        };
        proto._createSlider = function() {
            const slider = document.createElement('div');
            slider.className = 'flickity-slider';
            slider.style[this.originSide] = 0;
            this.slider = slider;
        };
        proto._filterFindCellElements = function(elems) {
            return utils.filterFindElements(elems, this.options.cellSelector);
        };
        proto.reloadCells = function() {
            this.cells = this._makeCells(this.slider.children);
            this.positionCells();
            this._getWrapShiftCells();
            this.setGallerySize();
        };
        proto._makeCells = function(elems) {
            const cellElems = this._filterFindCellElements(elems);
            const cells = cellElems.map(function(cellElem) {
                return new Cell(cellElem, this);
            }, this);
            return cells;
        };
        proto.getLastCell = function() {
            return this.cells[this.cells.length - 1];
        };
        proto.getLastSlide = function() {
            return this.slides[this.slides.length - 1];
        };
        proto.positionCells = function() {
            this._sizeCells(this.cells);
            this._positionCells(0);
        };
        proto._positionCells = function(index) {
            index = index || 0;
            this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
            let cellX = 0;
            if (index > 0) {
                const startCell = this.cells[index - 1];
                cellX = startCell.x + startCell.size.outerWidth;
            }
            const len = this.cells.length;
            for(let i = index; i < len; i++){
                const cell = this.cells[i];
                cell.setPosition(cellX);
                cellX += cell.size.outerWidth;
                this.maxCellHeight = Math.max(cell.size.outerHeight, this.maxCellHeight);
            }
            this.slideableWidth = cellX;
            this.updateSlides();
            this._containSlides();
            this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
        };
        proto._sizeCells = (cells)=>{
            cells.forEach((cell)=>{
                cell.getSize();
            });
        };
        proto.updateSlides = function() {
            this.slides = [];
            if (!this.cells.length) {
                return;
            }
            let slide = new Slide(this);
            this.slides.push(slide);
            const isOriginLeft = this.originSide == 'left';
            const nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';
            const canCellFit = this._getCanCellFit();
            this.cells.forEach(function(cell, i) {
                if (!slide.cells.length) {
                    slide.addCell(cell);
                    return;
                }
                const slideWidth = slide.outerWidth - slide.firstMargin + (cell.size.outerWidth - cell.size[nextMargin]);
                if (canCellFit.call(this, i, slideWidth)) {
                    slide.addCell(cell);
                } else {
                    slide.updateTarget();
                    slide = new Slide(this);
                    this.slides.push(slide);
                    slide.addCell(cell);
                }
            }, this);
            slide.updateTarget();
            this.updateSelectedSlide();
        };
        proto._getCanCellFit = function() {
            const groupCells = this.options.groupCells;
            if (!groupCells) {
                return ()=>false;
            } else if (typeof groupCells === 'number') {
                const number = parseInt(groupCells, 10);
                return (i)=>i % number !== 0;
            }
            const percentMatch = typeof groupCells === 'string' && groupCells.match(/^(\d+)%$/);
            const percent = percentMatch ? parseInt(percentMatch[1], 10) / 100 : 1;
            return function(i, slideWidth) {
                return slideWidth <= (this.size.innerWidth + 1) * percent;
            };
        };
        proto._init = proto.reposition = function() {
            this.positionCells();
            this.positionSliderAtSelected();
        };
        proto.getSize = function() {
            this.size = getSize(this.element);
            this.setCellAlign();
            this.cursorPosition = this.size.innerWidth * this.cellAlign;
        };
        const cellAlignShorthands = {
            center: {
                left: 0.5,
                right: 0.5
            },
            left: {
                left: 0,
                right: 1
            },
            right: {
                right: 0,
                left: 1
            }
        };
        proto.setCellAlign = function() {
            const shorthand = cellAlignShorthands[this.options.cellAlign];
            this.cellAlign = shorthand ? shorthand[this.originSide] : this.options.cellAlign;
        };
        proto.setGallerySize = function() {
            if (this.options.setGallerySize) {
                const height = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                this.viewport.style.height = `${height}px`;
            }
        };
        proto._getWrapShiftCells = function() {
            if (!this.options.wrapAround) {
                return;
            }
            this._unshiftCells(this.beforeShiftCells);
            this._unshiftCells(this.afterShiftCells);
            let jQuery = this.cursorPosition;
            const jQuery = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(jQuery, jQuery, -1);
            jQuery = this.size.innerWidth - this.cursorPosition;
            this.afterShiftCells = this._getGapCells(jQuery, 0, 1);
        };
        proto._getGapCells = function(gapX, cellIndex, increment) {
            const cells = [];
            while(gapX > 0){
                const cell = this.cells[cellIndex];
                if (!cell) {
                    break;
                }
                cells.push(cell);
                cellIndex += increment;
                gapX -= cell.size.outerWidth;
            }
            return cells;
        };
        proto._containSlides = function() {
            if (!this.options.contain || this.options.wrapAround || !this.cells.length) {
                return;
            }
            const isRightToLeft = this.options.rightToLeft;
            const beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
            const endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
            const contentWidth = this.slideableWidth - this.getLastCell().size[endMargin];
            const isContentSmaller = contentWidth < this.size.innerWidth;
            const beginBound = this.cursorPosition + this.cells[0].size[beginMargin];
            const endBound = contentWidth - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(slide) {
                if (isContentSmaller) {
                    slide.target = contentWidth * this.cellAlign;
                } else {
                    slide.target = Math.max(slide.target, beginBound);
                    slide.target = Math.min(slide.target, endBound);
                }
            }, this);
        };
        proto.dispatchEvent = function(type, event, args) {
            const emitArgs = event ? [
                event,
                ...args
            ] : args;
            this.emitEvent(type, emitArgs);
            if (jQuery && this.$element) {
                type += this.options.namespaceJQueryEvents ? '.flickity' : '';
                let $event = type;
                if (event) {
                    const jQEvent = new jQuery.Event(event);
                    jQEvent.type = type;
                    $event = jQEvent;
                }
                this.$element.trigger($event, args);
            }
        };
        proto.select = function(index, isWrap, isInstant) {
            if (!this.isActive) {
                return;
            }
            index = parseInt(index, 10);
            this._wrapSelect(index);
            if (this.options.wrapAround || isWrap) {
                index = utils.modulo(index, this.slides.length);
            }
            if (!this.slides[index]) {
                return;
            }
            const prevIndex = this.selectedIndex;
            this.selectedIndex = index;
            this.updateSelectedSlide();
            if (isInstant) {
                this.positionSliderAtSelected();
            } else {
                this.startAnimation();
            }
            if (this.options.adaptiveHeight) {
                this.setGallerySize();
            }
            this.dispatchEvent('select', null, [
                index
            ]);
            if (index != prevIndex) {
                this.dispatchEvent('change', null, [
                    index
                ]);
            }
            this.dispatchEvent('cellSelect');
        };
        proto._wrapSelect = function(index) {
            const len = this.slides.length;
            const isWrapping = this.options.wrapAround && len > 1;
            if (!isWrapping) {
                return index;
            }
            const wrapIndex = utils.modulo(index, len);
            const delta = Math.abs(wrapIndex - this.selectedIndex);
            const backWrapDelta = Math.abs(wrapIndex + len - this.selectedIndex);
            const forewardWrapDelta = Math.abs(wrapIndex - len - this.selectedIndex);
            if (!this.isDragSelect && backWrapDelta < delta) {
                index += len;
            } else if (!this.isDragSelect && forewardWrapDelta < delta) {
                index -= len;
            }
            if (index < 0) {
                this.x -= this.slideableWidth;
            } else if (index >= len) {
                this.x += this.slideableWidth;
            }
        };
        proto.previous = function(isWrap, isInstant) {
            this.select(this.selectedIndex - 1, isWrap, isInstant);
        };
        proto.next = function(isWrap, isInstant) {
            this.select(this.selectedIndex + 1, isWrap, isInstant);
        };
        proto.updateSelectedSlide = function() {
            const slide = this.slides[this.selectedIndex];
            if (!slide) {
                return;
            }
            this.unselectSelectedSlide();
            this.selectedSlide = slide;
            slide.select();
            this.selectedCells = slide.cells;
            this.selectedElements = slide.getCellElements();
            this.selectedCell = slide.cells[0];
            this.selectedElement = this.selectedElements[0];
        };
        proto.unselectSelectedSlide = function() {
            if (this.selectedSlide) {
                this.selectedSlide.unselect();
            }
        };
        proto.selectInitialIndex = function() {
            const initialIndex = this.options.initialIndex;
            if (this.isInitActivated) {
                this.select(this.selectedIndex, false, true);
                return;
            }
            if (initialIndex && typeof initialIndex === 'string') {
                const cell = this.queryCell(initialIndex);
                if (cell) {
                    this.selectCell(initialIndex, false, true);
                    return;
                }
            }
            let index = 0;
            if (initialIndex && this.slides[initialIndex]) {
                index = initialIndex;
            }
            this.select(index, false, true);
        };
        proto.selectCell = function(value, isWrap, isInstant) {
            const cell = this.queryCell(value);
            if (!cell) {
                return;
            }
            const index = this.getCellSlideIndex(cell);
            this.select(index, isWrap, isInstant);
        };
        proto.getCellSlideIndex = function(cell) {
            for(let i = 0; i < this.slides.length; i++){
                const slide = this.slides[i];
                const index = slide.cells.indexOf(cell);
                if (index != -1) {
                    return i;
                }
            }
        };
        proto.getCell = function(elem) {
            for(let i = 0; i < this.cells.length; i++){
                const cell = this.cells[i];
                if (cell.element == elem) {
                    return cell;
                }
            }
        };
        proto.getCells = function(elems) {
            elems = utils.makeArray(elems);
            const cells = [];
            elems.forEach(function(elem) {
                const cell = this.getCell(elem);
                if (cell) {
                    cells.push(cell);
                }
            }, this);
            return cells;
        };
        proto.getCellElements = function() {
            return this.cells.map((cell)=>cell.element);
        };
        proto.getParentCell = function(elem) {
            const cell = this.getCell(elem);
            if (cell) {
                return cell;
            }
            elem = utils.getParent(elem, '.flickity-slider > *');
            return this.getCell(elem);
        };
        proto.getAdjacentCellElements = function(adjCount, index) {
            if (!adjCount) {
                return this.selectedSlide.getCellElements();
            }
            index = index === undefined ? this.selectedIndex : index;
            const len = this.slides.length;
            if (1 + adjCount * 2 >= len) {
                return this.getCellElements();
            }
            let cellElems = [];
            for(let i = index - adjCount; i <= index + adjCount; i++){
                const slideIndex = this.options.wrapAround ? utils.modulo(i, len) : i;
                const slide = this.slides[slideIndex];
                if (slide) {
                    cellElems = cellElems.concat(slide.getCellElements());
                }
            }
            return cellElems;
        };
        proto.queryCell = function(selector) {
            if (typeof selector === 'number') {
                return this.cells[selector];
            }
            if (typeof selector === 'string') {
                if (selector.match(/^[#.]?[\d/]/)) {
                    return;
                }
                selector = this.element.querySelector(selector);
            }
            return this.getCell(selector);
        };
        proto.uiChange = function() {
            this.emitEvent('uiChange');
        };
        proto.childUIPointerDown = function(event) {
            if (event.type != 'touchstart') {
                event.preventDefault();
            }
            this.focus();
        };
        proto.onresize = function() {
            this.watchCSS();
            this.resize();
        };
        utils.debounceMethod(Flickity, 'onresize', 150);
        proto.resize = function() {
            if (!this.isActive || this.isAnimating || this.isDragging) {
                return;
            }
            this.getSize();
            if (this.options.wrapAround) {
                this.x = utils.modulo(this.x, this.slideableWidth);
            }
            this.positionCells();
            this._getWrapShiftCells();
            this.setGallerySize();
            this.emitEvent('resize');
            const selectedElement = this.selectedElements && this.selectedElements[0];
            this.selectCell(selectedElement, false, true);
        };
        proto.watchCSS = function() {
            const watchOption = this.options.watchCSS;
            if (!watchOption) {
                return;
            }
            const afterContent = getComputedStyle(this.element, ':after').content;
            if (afterContent.indexOf('flickity') != -1) {
                this.activate();
            } else {
                this.deactivate();
            }
        };
        proto.onkeydown = function(event) {
            const isNotFocused = document.activeElement && document.activeElement != this.element;
            if (!this.options.accessibility || isNotFocused) {
                return;
            }
            const handler = Flickity.keyboardHandlers[event.keyCode];
            if (handler) {
                handler.call(this);
            }
        };
        Flickity.keyboardHandlers = {
            37: function() {
                const leftMethod = this.options.rightToLeft ? 'next' : 'previous';
                this.uiChange();
                this[leftMethod]();
            },
            39: function() {
                const rightMethod = this.options.rightToLeft ? 'previous' : 'next';
                this.uiChange();
                this[rightMethod]();
            }
        };
        proto.focus = function() {
            const prevScrollY = window.pageYOffset;
            this.element.focus({
                preventScroll: true
            });
            if (window.pageYOffset != prevScrollY) {
                window.scrollTo(window.pageXOffset, prevScrollY);
            }
        };
        proto.deactivate = function() {
            if (!this.isActive) {
                return;
            }
            this.element.classList.remove('flickity-enabled');
            this.element.classList.remove('flickity-rtl');
            this.unselectSelectedSlide();
            this.cells.forEach((cell)=>{
                cell.destroy();
            });
            this.element.removeChild(this.viewport);
            moveElements(this.slider.children, this.element);
            if (this.options.accessibility) {
                this.element.removeAttribute('tabIndex');
                this.element.removeEventListener('keydown', this);
            }
            this.isActive = false;
            this.emitEvent('deactivate');
        };
        proto.destroy = function() {
            this.deactivate();
            window.removeEventListener('resize', this);
            this.allOff();
            this.emitEvent('destroy');
            if (jQuery && this.$element) {
                jQuery.removeData(this.element, 'flickity');
            }
            delete this.element.flickityGUID;
            delete instances[this.guid];
        };
        utils.extend(proto, animatePrototype);
        Flickity.data = (elem)=>{
            elem = utils.getQueryElement(elem);
            const id = elem && elem.flickityGUID;
            return id && instances[id];
        };
        utils.htmlInit(Flickity, 'flickity');
        if (jQuery && jQuery.bridget) {
            jQuery.bridget('flickity', Flickity);
        }
        Flickity.setJQuery = (jq)=>{
            jQuery = jq;
        };
        Flickity.Cell = Cell;
        Flickity.Slide = Slide;
        return Flickity;
    });
});
const unipointer = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, evEmitter);
        } else {
            window.Unipointer = factory(window, window.EvEmitter);
        }
    })(window, function factory(window, EvEmitter) {
        function noop() {}
        function Unipointer() {}
        const jQuery = Unipointer.prototype = Object.create(EvEmitter.prototype);
        jQuery.bindStartEvent = function(elem) {
            this._bindStartEvent(elem, true);
        };
        jQuery.unbindStartEvent = function(jQuery) {
            this._bindStartEvent(jQuery, false);
        };
        jQuery._bindStartEvent = function(jQuery, isAdd) {
            isAdd = isAdd === undefined ? true : isAdd;
            const jQuery = isAdd ? 'addEventListener' : 'removeEventListener';
            let jQuery = 'mousedown';
            if ('ontouchstart' in window) {
                jQuery = 'touchstart';
            } else if (window.PointerEvent) {
                jQuery = 'pointerdown';
            }
            jQuery[jQuery](jQuery, this);
        };
        jQuery.handleEvent = function(event) {
            const method = `on${event.type}`;
            if (this[method]) {
                this[method](event);
            }
        };
        jQuery.getTouch = function(touches) {
            for (const touch of touches){
                if (touch.identifier == this.pointerIdentifier) {
                    return touch;
                }
            }
        };
        jQuery.onmousedown = function(event) {
            const button = event.button;
            if (button && button !== 0 && button !== 1) {
                return;
            }
            this._pointerDown(event, event);
        };
        jQuery.ontouchstart = function(event) {
            this._pointerDown(event, event.changedTouches[0]);
        };
        jQuery.onpointerdown = function(event) {
            this._pointerDown(event, event);
        };
        jQuery._pointerDown = function(jQuery, jQuery) {
            if (jQuery.button || this.isPointerDown) {
                return;
            }
            this.isPointerDown = true;
            this.pointerIdentifier = jQuery.pointerId !== undefined ? jQuery.pointerId : jQuery.identifier;
            this.pointerDown(jQuery, jQuery);
        };
        jQuery.pointerDown = function(event, pointer) {
            this._bindPostStartEvents(event);
            this.emitEvent('pointerDown', [
                event,
                pointer
            ]);
        };
        const postStartEvents = {
            mousedown: [
                'mousemove',
                'mouseup'
            ],
            touchstart: [
                'touchmove',
                'touchend',
                'touchcancel'
            ],
            pointerdown: [
                'pointermove',
                'pointerup',
                'pointercancel'
            ]
        };
        jQuery._bindPostStartEvents = function(event) {
            if (!event) {
                return;
            }
            const events = postStartEvents[event.type];
            events.forEach(function(eventName) {
                window.addEventListener(eventName, this);
            }, this);
            this._boundPointerEvents = events;
        };
        jQuery._unbindPostStartEvents = function() {
            if (!this._boundPointerEvents) {
                return;
            }
            this._boundPointerEvents.forEach(function(eventName) {
                window.removeEventListener(eventName, this);
            }, this);
            delete this._boundPointerEvents;
        };
        jQuery.onmousemove = function(event) {
            this._pointerMove(event, event);
        };
        jQuery.onpointermove = function(event) {
            if (event.pointerId == this.pointerIdentifier) {
                this._pointerMove(event, event);
            }
        };
        jQuery.ontouchmove = function(event) {
            const touch = this.getTouch(event.changedTouches);
            if (touch) {
                this._pointerMove(event, touch);
            }
        };
        jQuery._pointerMove = function(event, pointer) {
            this.pointerMove(event, pointer);
        };
        jQuery.pointerMove = function(event, pointer) {
            this.emitEvent('pointerMove', [
                event,
                pointer
            ]);
        };
        jQuery.onmouseup = function(event) {
            this._pointerUp(event, event);
        };
        jQuery.onpointerup = function(event) {
            if (event.pointerId == this.pointerIdentifier) {
                this._pointerUp(event, event);
            }
        };
        jQuery.ontouchend = function(event) {
            const touch = this.getTouch(event.changedTouches);
            if (touch) {
                this._pointerUp(event, touch);
            }
        };
        jQuery._pointerUp = function(event, pointer) {
            this._pointerDone();
            this.pointerUp(event, pointer);
        };
        jQuery.pointerUp = function(event, pointer) {
            this.emitEvent('pointerUp', [
                event,
                pointer
            ]);
        };
        jQuery._pointerDone = function() {
            this._pointerReset();
            this._unbindPostStartEvents();
            this.pointerDone();
        };
        jQuery._pointerReset = function() {
            this.isPointerDown = false;
            delete this.pointerIdentifier;
        };
        jQuery.pointerDone = noop;
        jQuery.onpointercancel = function(event) {
            if (event.pointerId == this.pointerIdentifier) {
                this._pointerCancel(event, event);
            }
        };
        jQuery.ontouchcancel = function(event) {
            const touch = this.getTouch(event.changedTouches);
            if (touch) {
                this._pointerCancel(event, touch);
            }
        };
        jQuery._pointerCancel = function(event, pointer) {
            this._pointerDone();
            this.pointerCancel(event, pointer);
        };
        jQuery.pointerCancel = function(event, pointer) {
            this.emitEvent('pointerCancel', [
                event,
                pointer
            ]);
        };
        Unipointer.getPointerPoint = (pointer)=>({
                x: pointer.pageX,
                y: pointer.pageY
            });
        return Unipointer;
    });
});
const unidragger = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, unipointer);
        } else {
            window.Unidragger = factory(window, window.Unipointer);
        }
    })(window, function factory(window, Unipointer) {
        function Unidragger() {}
        const proto = Unidragger.prototype = Object.create(Unipointer.prototype);
        proto.bindHandles = function() {
            this._bindHandles(true);
        };
        proto.unbindHandles = function() {
            this._bindHandles(false);
        };
        proto._bindHandles = function(Data) {
            Data = Data === undefined ? true : Data;
            const Data = Data ? 'addEventListener' : 'removeEventListener';
            const touchAction = Data ? this._touchActionValue : '';
            for(let Data = 0; Data < this.handles.length; Data++){
                const Data = this.handles[Data];
                this._bindStartEvent(Data, Data);
                Data[Data]('click', this);
                if (window.PointerEvent) {
                    Data.style.touchAction = touchAction;
                }
            }
        };
        proto._touchActionValue = 'none';
        proto.pointerDown = function(event, pointer) {
            const isOkay = this.okayPointerDown(event);
            if (!isOkay) {
                return;
            }
            this.pointerDownPointer = {
                pageX: pointer.pageX,
                pageY: pointer.pageY
            };
            event.preventDefault();
            this.pointerDownBlur();
            this._bindPostStartEvents(event);
            this.emitEvent('pointerDown', [
                event,
                pointer
            ]);
        };
        const cursorNodes = {
            TEXTAREA: true,
            INPUT: true,
            SELECT: true,
            OPTION: true
        };
        const clickTypes = {
            radio: true,
            checkbox: true,
            button: true,
            submit: true,
            image: true,
            file: true
        };
        proto.okayPointerDown = function(event) {
            const isCursorNode = cursorNodes[event.target.nodeName];
            const isClickType = clickTypes[event.target.type];
            const isOkay = !isCursorNode || isClickType;
            if (!isOkay) {
                this._pointerReset();
            }
            return isOkay;
        };
        proto.pointerDownBlur = ()=>{
            const focused = document.activeElement;
            const canBlur = focused && focused.blur && focused != document.body;
            if (canBlur) {
                focused.blur();
            }
        };
        proto.pointerMove = function(event, pointer) {
            const moveVector = this._dragPointerMove(event, pointer);
            this.emitEvent('pointerMove', [
                event,
                pointer,
                moveVector
            ]);
            this._dragMove(event, pointer, moveVector);
        };
        proto._dragPointerMove = function(event, pointer) {
            const moveVector = {
                x: pointer.pageX - this.pointerDownPointer.pageX,
                y: pointer.pageY - this.pointerDownPointer.pageY
            };
            if (!this.isDragging && this.hasDragStarted(moveVector)) {
                this._dragStart(event, pointer);
            }
            return moveVector;
        };
        proto.hasDragStarted = (moveVector)=>Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
        proto.pointerUp = function(event, pointer) {
            this.emitEvent('pointerUp', [
                event,
                pointer
            ]);
            this._dragPointerUp(event, pointer);
        };
        proto._dragPointerUp = function(event, pointer) {
            if (this.isDragging) {
                this._dragEnd(event, pointer);
            } else {
                this._staticClick(event, pointer);
            }
        };
        proto._dragStart = function(event, pointer) {
            this.isDragging = true;
            this.isPreventingClicks = true;
            this.dragStart(event, pointer);
        };
        proto.dragStart = function(event, pointer) {
            this.emitEvent('dragStart', [
                event,
                pointer
            ]);
        };
        proto._dragMove = function(event, pointer, moveVector) {
            if (!this.isDragging) {
                return;
            }
            this.dragMove(event, pointer, moveVector);
        };
        proto.dragMove = function(event, pointer, moveVector) {
            event.preventDefault();
            this.emitEvent('dragMove', [
                event,
                pointer,
                moveVector
            ]);
        };
        proto._dragEnd = function(event, pointer) {
            this.isDragging = false;
            setTimeout(()=>{
                delete this.isPreventingClicks;
            });
            this.dragEnd(event, pointer);
        };
        proto.dragEnd = function(event, pointer) {
            this.emitEvent('dragEnd', [
                event,
                pointer
            ]);
        };
        proto.onclick = function(event) {
            if (this.isPreventingClicks) {
                event.preventDefault();
            }
        };
        proto._staticClick = function(event, pointer) {
            if (this.isIgnoringMouseUp && event.type == 'mouseup') {
                return;
            }
            this.staticClick(event, pointer);
            if (event.type != 'mouseup') {
                this.isIgnoringMouseUp = true;
                setTimeout(()=>{
                    delete this.isIgnoringMouseUp;
                }, 400);
            }
        };
        proto.staticClick = function(event, pointer) {
            this.emitEvent('staticClick', [
                event,
                pointer
            ]);
        };
        Unidragger.getPointerPoint = Unipointer.getPointerPoint;
        return Unidragger;
    });
});
const drag = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, flickity, unidragger, utils);
        } else {
            window.Flickity = factory(window, window.Flickity, window.Unidragger, window.fizzyUIUtils);
        }
    })(window, function factory(window, Flickity, Unidragger, utils) {
        utils.extend(Flickity.defaults, {
            draggable: '>1',
            dragThreshold: 3
        });
        Flickity.createMethods.push('_createDrag');
        const proto = Flickity.prototype;
        utils.extend(proto, Unidragger.prototype);
        proto._touchActionValue = 'pan-y';
        proto._createDrag = function() {
            this.on('activate', this.onActivateDrag);
            this.on('uiChange', this._uiChangeDrag);
            this.on('deactivate', this.onDeactivateDrag);
            this.on('cellChange', this.updateDraggable);
        };
        proto.onActivateDrag = function() {
            this.handles = [
                this.viewport
            ];
            this.bindHandles();
            this.updateDraggable();
        };
        proto.onDeactivateDrag = function() {
            this.unbindHandles();
            this.element.classList.remove('is-draggable');
        };
        proto.updateDraggable = function() {
            if (this.options.draggable == '>1') {
                this.isDraggable = this.slides.length > 1;
            } else {
                this.isDraggable = this.options.draggable;
            }
            if (this.isDraggable) {
                this.element.classList.add('is-draggable');
            } else {
                this.element.classList.remove('is-draggable');
            }
        };
        proto.bindDrag = function() {
            this.options.draggable = true;
            this.updateDraggable();
        };
        proto.unbindDrag = function() {
            this.options.draggable = false;
            this.updateDraggable();
        };
        proto._uiChangeDrag = function() {
            delete this.isFreeScrolling;
        };
        proto.pointerDown = function(event, pointer) {
            if (!this.isDraggable) {
                this._pointerDownDefault(event, pointer);
                return;
            }
            const isOkay = this.okayPointerDown(event);
            if (!isOkay) {
                return;
            }
            this._pointerDownPreventDefault(event);
            this.pointerDownFocus(event);
            if (document.activeElement != this.element) {
                this.pointerDownBlur();
            }
            this.dragX = this.x;
            this.viewport.classList.add('is-pointer-down');
            this.pointerDownScroll = getScrollPosition();
            window.addEventListener('scroll', this);
            this._pointerDownDefault(event, pointer);
        };
        proto._pointerDownDefault = function(jQuery, pointer) {
            this.pointerDownPointer = {
                pageX: pointer.pageX,
                pageY: pointer.pageY
            };
            this._bindPostStartEvents(jQuery);
            this.dispatchEvent('pointerDown', jQuery, [
                pointer
            ]);
        };
        const focusNodes = {
            INPUT: true,
            TEXTAREA: true,
            SELECT: true
        };
        proto.pointerDownFocus = function(event) {
            const isFocusNode = focusNodes[event.target.nodeName];
            if (!isFocusNode) {
                this.focus();
            }
        };
        proto._pointerDownPreventDefault = (event)=>{
            const isTouchStart = event.type == 'touchstart';
            const isTouchPointer = event.pointerType == 'touch';
            const isFocusNode = focusNodes[event.target.nodeName];
            if (!isTouchStart && !isTouchPointer && !isFocusNode) {
                event.preventDefault();
            }
        };
        proto.hasDragStarted = function(moveVector) {
            return Math.abs(moveVector.x) > this.options.dragThreshold;
        };
        proto.pointerUp = function(event, pointer) {
            delete this.isTouchScrolling;
            this.viewport.classList.remove('is-pointer-down');
            this.dispatchEvent('pointerUp', event, [
                pointer
            ]);
            this._dragPointerUp(event, pointer);
        };
        proto.pointerDone = function() {
            window.removeEventListener('scroll', this);
            delete this.pointerDownScroll;
        };
        proto.dragStart = function(event, pointer) {
            if (!this.isDraggable) {
                return;
            }
            this.dragStartPosition = this.x;
            this.startAnimation();
            window.removeEventListener('scroll', this);
            this.dispatchEvent('dragStart', event, [
                pointer
            ]);
        };
        proto.pointerMove = function(event, pointer) {
            const moveVector = this._dragPointerMove(event, pointer);
            this.dispatchEvent('pointerMove', event, [
                pointer,
                moveVector
            ]);
            this._dragMove(event, pointer, moveVector);
        };
        proto.dragMove = function(event, pointer, moveVector) {
            if (!this.isDraggable) {
                return;
            }
            event.preventDefault();
            this.previousDragX = this.dragX;
            const direction = this.options.rightToLeft ? -1 : 1;
            if (this.options.wrapAround) {
                moveVector.x %= this.slideableWidth;
            }
            let dragX = this.dragStartPosition + moveVector.x * direction;
            if (!this.options.wrapAround && this.slides.length) {
                const originBound = Math.max(-this.slides[0].target, this.dragStartPosition);
                dragX = dragX > originBound ? (dragX + originBound) * 0.5 : dragX;
                const endBound = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                dragX = dragX < endBound ? (dragX + endBound) * 0.5 : dragX;
            }
            this.dragX = dragX;
            this.dragMoveTime = new Date();
            this.dispatchEvent('dragMove', event, [
                pointer,
                moveVector
            ]);
        };
        proto.dragEnd = function(event, pointer) {
            if (!this.isDraggable) {
                return;
            }
            if (this.options.freeScroll) {
                this.isFreeScrolling = true;
            }
            let index = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                const restingX = this.getRestingPosition();
                this.isFreeScrolling = -restingX > this.slides[0].target && -restingX < this.getLastSlide().target;
            } else if (!this.options.freeScroll && index == this.selectedIndex) {
                index += this.dragEndBoostSelect();
            }
            delete this.previousDragX;
            this.isDragSelect = this.options.wrapAround;
            this.select(index);
            delete this.isDragSelect;
            this.dispatchEvent('dragEnd', event, [
                pointer
            ]);
        };
        proto.dragEndRestingSelect = function() {
            const restingX = this.getRestingPosition();
            const distance = Math.abs(this.getSlideDistance(-restingX, this.selectedIndex));
            const positiveResting = this._getClosestResting(restingX, distance, 1);
            const negativeResting = this._getClosestResting(restingX, distance, -1);
            const index = positiveResting.distance < negativeResting.distance ? positiveResting.index : negativeResting.index;
            return index;
        };
        proto._getClosestResting = function(restingX, distance, increment) {
            let index = this.selectedIndex;
            let minDistance = Infinity;
            const condition = this.options.contain && !this.options.wrapAround ? (dist, minDist)=>dist <= minDist : (dist, minDist)=>dist < minDist;
            while(condition(distance, minDistance)){
                index += increment;
                minDistance = distance;
                distance = this.getSlideDistance(-restingX, index);
                if (distance === null) {
                    break;
                }
                distance = Math.abs(distance);
            }
            return {
                distance: minDistance,
                index: index - increment
            };
        };
        proto.getSlideDistance = function(x, index) {
            const len = this.slides.length;
            const isWrapAround = this.options.wrapAround && len > 1;
            const slideIndex = isWrapAround ? utils.modulo(index, len) : index;
            const slide = this.slides[slideIndex];
            if (!slide) {
                return null;
            }
            const wrap = isWrapAround ? this.slideableWidth * Math.floor(index / len) : 0;
            return x - (slide.target + wrap);
        };
        proto.dragEndBoostSelect = function() {
            if (this.previousDragX === undefined || !this.dragMoveTime || new Date() - this.dragMoveTime > 100) {
                return 0;
            }
            const distance = this.getSlideDistance(-this.dragX, this.selectedIndex);
            const delta = this.previousDragX - this.dragX;
            if (distance > 0 && delta > 0) {
                return 1;
            } else if (distance < 0 && delta < 0) {
                return -1;
            }
            return 0;
        };
        proto.staticClick = function(event, pointer) {
            const clickedCell = this.getParentCell(event.target);
            const cellElem = clickedCell && clickedCell.element;
            const cellIndex = clickedCell && this.cells.indexOf(clickedCell);
            this.dispatchEvent('staticClick', event, [
                pointer,
                cellElem,
                cellIndex
            ]);
        };
        proto.onscroll = function() {
            const scroll = getScrollPosition();
            const scrollMoveX = this.pointerDownScroll.x - scroll.x;
            const scrollMoveY = this.pointerDownScroll.y - scroll.y;
            if (Math.abs(scrollMoveX) > 3 || Math.abs(scrollMoveY) > 3) {
                this._pointerDone();
            }
        };
        function getScrollPosition() {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        }
        return Flickity;
    });
});
const prevNextButton = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, flickity, unipointer, utils);
        } else {
            factory(window, window.Flickity, window.Unipointer, window.fizzyUIUtils);
        }
    })(window, function factory(window, Flickity, Unipointer, utils) {
        const svgURI = 'http://www.w3.org/2000/svg';
        class PrevNextButton extends Unipointer {
            constructor(direction, parent){
                this.direction = direction;
                this.parent = parent;
                this._create();
            }
            _create() {
                this.isEnabled = true;
                this.isPrevious = this.direction == -1;
                const leftDirection = this.parent.options.rightToLeft ? 1 : -1;
                this.isLeft = this.direction == leftDirection;
                const element = this.element = document.createElement('button');
                element.className = 'flickity-button flickity-prev-next-button';
                element.className += this.isPrevious ? ' previous' : ' next';
                element.setAttribute('type', 'button');
                this.disable();
                element.setAttribute('aria-label', this.isPrevious ? 'Previous' : 'Next');
                const svg = this.createSVG();
                element.appendChild(svg);
                this.parent.on('select', this.update.bind(this));
                this.on('pointerDown', this.parent.childUIPointerDown.bind(this.parent));
            }
            activate() {
                this.bindStartEvent(this.element);
                this.element.addEventListener('click', this);
                this.parent.element.appendChild(this.element);
            }
            deactivate() {
                this.parent.element.removeChild(this.element);
                this.unbindStartEvent(this.element);
                this.element.removeEventListener('click', this);
            }
            createSVG() {
                const svg = document.createElementNS(svgURI, 'svg');
                svg.setAttribute('class', 'flickity-button-icon');
                svg.setAttribute('viewBox', '0 0 100 100');
                const path = document.createElementNS(svgURI, 'path');
                const pathMovements = getArrowMovements(this.parent.options.arrowShape);
                path.setAttribute('d', pathMovements);
                path.setAttribute('class', 'arrow');
                if (!this.isLeft) {
                    path.setAttribute('transform', 'translate(100, 100) rotate(180) ');
                }
                svg.appendChild(path);
                return svg;
            }
            onclick() {
                if (!this.isEnabled) {
                    return;
                }
                this.parent.uiChange();
                const method = this.isPrevious ? 'previous' : 'next';
                this.parent[method]();
            }
            enable() {
                if (this.isEnabled) {
                    return;
                }
                this.element.disabled = false;
                this.isEnabled = true;
            }
            disable() {
                if (!this.isEnabled) {
                    return;
                }
                this.element.disabled = true;
                this.isEnabled = false;
            }
            update() {
                const slides = this.parent.slides;
                if (this.parent.options.wrapAround && slides.length > 1) {
                    this.enable();
                    return;
                }
                const lastIndex = slides.length ? slides.length - 1 : 0;
                const boundIndex = this.isPrevious ? 0 : lastIndex;
                const method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
                this[method]();
            }
            destroy() {
                this.deactivate();
                this.allOff();
            }
        }
        function getArrowMovements(shape) {
            if (typeof shape === 'string') {
                return shape;
            }
            return `M ${shape.x0},50 L ${shape.x1},${shape.y1 + 50} L ${shape.x2},${shape.y2 + 50} L ${shape.x3},50  L ${shape.x2},${50 - shape.y2} L ${shape.x1},${50 - shape.y1} Z`;
        }
        PrevNextButton.prototype.handleEvent = utils.handleEvent;
        utils.extend(Flickity.defaults, {
            prevNextButtons: true,
            arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 70,
                y2: 40,
                x3: 30
            }
        });
        Flickity.createMethods.push('_createPrevNextButtons');
        const proto = Flickity.prototype;
        proto._createPrevNextButtons = function() {
            if (!this.options.prevNextButtons) {
                return;
            }
            this.prevButton = new PrevNextButton(-1, this);
            this.nextButton = new PrevNextButton(1, this);
            this.on('activate', this.activatePrevNextButtons);
        };
        proto.activatePrevNextButtons = function() {
            this.prevButton.activate();
            this.nextButton.activate();
            this.on('deactivate', this.deactivatePrevNextButtons);
        };
        proto.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate();
            this.nextButton.deactivate();
            this.off('deactivate', this.deactivatePrevNextButtons);
        };
        Flickity.PrevNextButton = PrevNextButton;
        return Flickity;
    });
});
const pageDots = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, flickity, unipointer, utils);
        } else {
            factory(window, window.Flickity, window.Unipointer, window.fizzyUIUtils);
        }
    })(window, function factory(window, Flickity, Unipointer, utils) {
        class PageDots extends Unipointer {
            constructor(parent){
                this.parent = parent;
                this._create();
            }
            _create() {
                this.holder = document.createElement('ol');
                this.holder.className = 'flickity-page-dots';
                this.dots = [];
                this.handleClick = this.onClick.bind(this);
                this.on('pointerDown', this.parent.childUIPointerDown.bind(this.parent));
            }
            activate() {
                this.setDots();
                this.holder.addEventListener('click', this.handleClick);
                this.bindStartEvent(this.holder);
                this.parent.element.appendChild(this.holder);
            }
            deactivate() {
                this.holder.removeEventListener('click', this.handleClick);
                this.unbindStartEvent(this.holder);
                this.parent.element.removeChild(this.holder);
            }
            setDots() {
                const delta = this.parent.slides.length - this.dots.length;
                if (delta > 0) {
                    this.addDots(delta);
                } else if (delta < 0) {
                    this.removeDots(-delta);
                }
            }
            addDots(count) {
                const fragment = document.createDocumentFragment();
                const newDots = [];
                const length = this.dots.length;
                const max = length + count;
                for(let i = length; i < max; i++){
                    const dot = document.createElement('li');
                    dot.className = 'dot';
                    dot.setAttribute('aria-label', `Page dot ${i + 1}`);
                    fragment.appendChild(dot);
                    newDots.push(dot);
                }
                this.holder.appendChild(fragment);
                this.dots = this.dots.concat(newDots);
            }
            removeDots(count) {
                const removeDots = this.dots.splice(this.dots.length - count, count);
                removeDots.forEach(function(dot) {
                    this.holder.removeChild(dot);
                }, this);
            }
            updateSelected() {
                if (this.selectedDot) {
                    this.selectedDot.className = 'dot';
                    this.selectedDot.removeAttribute('aria-current');
                }
                if (!this.dots.length) {
                    return;
                }
                this.selectedDot = this.dots[this.parent.selectedIndex];
                this.selectedDot.className = 'dot is-selected';
                this.selectedDot.setAttribute('aria-current', 'step');
            }
            destroy() {
                this.deactivate();
                this.allOff();
            }
        }
        PageDots.prototype.onTap = PageDots.prototype.onClick = function(event) {
            const target = event.target;
            if (target.nodeName != 'LI') {
                return;
            }
            this.parent.uiChange();
            const index = this.dots.indexOf(target);
            this.parent.select(index);
        };
        Flickity.PageDots = PageDots;
        utils.extend(Flickity.defaults, {
            pageDots: true
        });
        Flickity.createMethods.push('_createPageDots');
        const proto = Flickity.prototype;
        proto._createPageDots = function() {
            if (!this.options.pageDots) {
                return;
            }
            this.pageDots = new PageDots(this);
            this.on('activate', this.activatePageDots);
            this.on('select', this.updateSelectedPageDots);
            this.on('cellChange', this.updatePageDots);
            this.on('resize', this.updatePageDots);
            this.on('deactivate', this.deactivatePageDots);
        };
        proto.activatePageDots = function() {
            this.pageDots.activate();
        };
        proto.updateSelectedPageDots = function() {
            this.pageDots.updateSelected();
        };
        proto.updatePageDots = function() {
            this.pageDots.setDots();
        };
        proto.deactivatePageDots = function() {
            this.pageDots.deactivate();
        };
        Flickity.PageDots = PageDots;
        return Flickity;
    });
});
const player = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(evEmitter, utils, flickity);
        } else {
            factory(window.EvEmitter, window.fizzyUIUtils, window.Flickity);
        }
    })(window, function factory(EvEmitter, utils, Flickity) {
        class Player extends EvEmitter {
            constructor(parent){
                this.parent = parent;
                this.state = 'stopped';
                this.onVisibilityChange = this.visibilityChange.bind(this);
                this.onVisibilityPlay = this.visibilityPlay.bind(this);
            }
            play() {
                if (this.state == 'playing') {
                    return;
                }
                const isPageHidden = document.hidden;
                if (isPageHidden) {
                    document.addEventListener('visibilitychange', this.onVisibilityPlay);
                    return;
                }
                this.state = 'playing';
                document.addEventListener('visibilitychange', this.onVisibilityChange);
                this.tick();
            }
            tick() {
                if (this.state != 'playing') {
                    return;
                }
                let time = this.parent.options.autoPlay;
                time = typeof time === 'number' ? time : 3000;
                const _this = this;
                this.clear();
                this.timeout = setTimeout(()=>{
                    _this.parent.next(true);
                    _this.tick();
                }, time);
            }
            stop() {
                this.state = 'stopped';
                this.clear();
                document.removeEventListener('visibilitychange', this.onVisibilityChange);
            }
            clear() {
                clearTimeout(this.timeout);
            }
            pause() {
                if (this.state == 'playing') {
                    this.state = 'paused';
                    this.clear();
                }
            }
            unpause() {
                if (this.state == 'paused') {
                    this.play();
                }
            }
            visibilityChange() {
                const isPageHidden = document.hidden;
                this[isPageHidden ? 'pause' : 'unpause']();
            }
            visibilityPlay() {
                this.play();
                document.removeEventListener('visibilitychange', this.onVisibilityPlay);
            }
        }
        utils.extend(Flickity.defaults, {
            pauseAutoPlayOnHover: true
        });
        Flickity.createMethods.push('_createPlayer');
        const proto = Flickity.prototype;
        proto._createPlayer = function() {
            this.player = new Player(this);
            this.on('activate', this.activatePlayer);
            this.on('uiChange', this.stopPlayer);
            this.on('pointerDown', this.stopPlayer);
            this.on('deactivate', this.deactivatePlayer);
        };
        proto.activatePlayer = function() {
            if (!this.options.autoPlay) {
                return;
            }
            this.player.play();
            this.element.addEventListener('mouseenter', this);
        };
        proto.playPlayer = function() {
            this.player.play();
        };
        proto.stopPlayer = function() {
            this.player.stop();
        };
        proto.pausePlayer = function() {
            this.player.pause();
        };
        proto.unpausePlayer = function() {
            this.player.unpause();
        };
        proto.deactivatePlayer = function() {
            this.player.stop();
            this.element.removeEventListener('mouseenter', this);
        };
        proto.onmouseenter = function() {
            if (!this.options.pauseAutoPlayOnHover) {
                return;
            }
            this.player.pause();
            this.element.addEventListener('mouseleave', this);
        };
        proto.onmouseleave = function() {
            this.player.unpause();
            this.element.removeEventListener('mouseleave', this);
        };
        Flickity.Player = Player;
        return Flickity;
    });
});
const addRemoveCell = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, flickity, utils);
        } else {
            factory(window, window.Flickity, window.fizzyUIUtils);
        }
    })(window, function factory(window, Flickity, utils) {
        function getCellsFragment(cells) {
            const fragment = document.createDocumentFragment();
            cells.forEach((cell)=>{
                fragment.appendChild(cell.element);
            });
            return fragment;
        }
        const proto = Flickity.prototype;
        proto.insert = function(elems, index) {
            const cells = this._makeCells(elems);
            if (!cells || !cells.length) {
                return;
            }
            const len = this.cells.length;
            index = index === undefined ? len : index;
            const fragment = getCellsFragment(cells);
            const isAppend = index == len;
            if (isAppend) {
                this.slider.appendChild(fragment);
            } else {
                const insertCellElement = this.cells[index].element;
                this.slider.insertBefore(fragment, insertCellElement);
            }
            if (index === 0) {
                this.cells = cells.concat(this.cells);
            } else if (isAppend) {
                this.cells = this.cells.concat(cells);
            } else {
                const endCells = this.cells.splice(index, len - index);
                this.cells = this.cells.concat(cells).concat(endCells);
            }
            this._sizeCells(cells);
            this.cellChange(index, true);
        };
        proto.append = function(elems) {
            this.insert(elems, this.cells.length);
        };
        proto.prepend = function(elems) {
            this.insert(elems, 0);
        };
        proto.remove = function(elems) {
            const cells = this.getCells(elems);
            if (!cells || !cells.length) {
                return;
            }
            let minCellIndex = this.cells.length - 1;
            cells.forEach(function(cell) {
                cell.remove();
                const index = this.cells.indexOf(cell);
                minCellIndex = Math.min(index, minCellIndex);
                utils.removeFrom(this.cells, cell);
            }, this);
            this.cellChange(minCellIndex, true);
        };
        proto.cellSizeChange = function(elem) {
            const cell = this.getCell(elem);
            if (!cell) {
                return;
            }
            cell.getSize();
            const index = this.cells.indexOf(cell);
            this.cellChange(index);
        };
        proto.cellChange = function(changedCellIndex, isPositioningSlider) {
            const prevSelectedElem = this.selectedElement;
            this._positionCells(changedCellIndex);
            this._getWrapShiftCells();
            this.setGallerySize();
            const cell = this.getCell(prevSelectedElem);
            if (cell) {
                this.selectedIndex = this.getCellSlideIndex(cell);
            }
            this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex);
            this.emitEvent('cellChange', [
                changedCellIndex
            ]);
            this.select(this.selectedIndex);
            if (isPositioningSlider) {
                this.positionSliderAtSelected();
            }
        };
        return Flickity;
    });
});
const lazyload = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(window, flickity, utils);
        } else {
            factory(window, window.Flickity, window.fizzyUIUtils);
        }
    })(window, function factory(window, Flickity, utils) {
        Flickity.createMethods.push('_createLazyload');
        const proto = Flickity.prototype;
        proto._createLazyload = function() {
            this.on('select', this.lazyLoad);
        };
        proto.lazyLoad = function() {
            const lazyLoad = this.options.lazyLoad;
            if (!lazyLoad) {
                return;
            }
            const adjCount = typeof lazyLoad === 'number' ? lazyLoad : 0;
            const cellElems = this.getAdjacentCellElements(adjCount);
            let lazyImages = [];
            cellElems.forEach((cellElem)=>{
                const lazyCellImages = getCellLazyImages(cellElem);
                lazyImages = lazyImages.concat(lazyCellImages);
            });
            lazyImages.forEach(function(img) {
                new LazyLoader(img, this);
            }, this);
        };
        function getCellLazyImages(cellElem) {
            if (cellElem.nodeName == 'IMG') {
                const lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
                const srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
                const srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
                if (lazyloadAttr || srcAttr || srcsetAttr) {
                    return [
                        cellElem
                    ];
                }
            }
            const lazySelector = 'img[data-flickity-lazyload], ' + 'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
            const imgs = cellElem.querySelectorAll(lazySelector);
            return utils.makeArray(imgs);
        }
        class LazyLoader {
            constructor(img, flickity){
                this.img = img;
                this.flickity = flickity;
                this.load();
            }
            load() {
                this.img.addEventListener('load', this);
                this.img.addEventListener('error', this);
                const src = this.img.getAttribute('data-flickity-lazyload') || this.img.getAttribute('data-flickity-lazyload-src');
                const srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
                this.img.src = src;
                if (srcset) {
                    this.img.setAttribute('srcset', srcset);
                }
                this.img.removeAttribute('data-flickity-lazyload');
                this.img.removeAttribute('data-flickity-lazyload-src');
                this.img.removeAttribute('data-flickity-lazyload-srcset');
            }
            onload(event) {
                this.complete(event, 'flickity-lazyloaded');
            }
            onerror(event) {
                this.complete(event, 'flickity-lazyerror');
            }
            complete(event, className) {
                this.img.removeEventListener('load', this);
                this.img.removeEventListener('error', this);
                const cell = this.flickity.getParentCell(this.img);
                const cellElem = cell && cell.element;
                this.flickity.cellSizeChange(cellElem);
                this.img.classList.add(className);
                this.flickity.dispatchEvent('lazyLoad', event, cellElem);
            }
        }
        LazyLoader.prototype.handleEvent = utils.handleEvent;
        Flickity.LazyLoader = LazyLoader;
        return Flickity;
    });
});
const index_es_js = pxs_complementary_products_dist_index_es_createCommonjsModule((module)=>{
    ((window, factory)=>{
        if (module.exports) {
            module.exports = factory(flickity, drag, prevNextButton, pageDots, player, addRemoveCell, lazyload);
        }
    })(window, function factory(Flickity) {
        return Flickity;
    });
});
const ComplementaryProducts = (()=>{
    function ComplementaryProducts(options) {
        this.sectionEl = options.sectionEl;
        this.sectionId = options.sectionId;
        this.events = new dist_index_es_EventHandler();
        this.productId = options.productId;
        this.includeIndicatorDots = options.includeIndicatorDots || false;
        this.recommendationsRoute = options.productRecommendationsRoute;
        this.limit = options.limit;
        const defaultArrowShape = {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 65,
            y2: 45,
            x3: 20
        };
        this.arrowShape = options.arrowShape || defaultArrowShape;
        this.recommendationsEl = this.sectionEl.querySelector('[data-complementary-products]');
        this.loadRecommendations();
    }
    pxs_complementary_products_dist_index_es_createClass(ComplementaryProducts, [
        {
            key: "loadRecommendations",
            value: function loadRecommendations() {
                const _this = this;
                const url = `${this.recommendationsRoute}?section_id=${this.sectionId}&limit=${this.limit}&product_id=${this.productId}&intent=complementary`;
                index_es_AsyncView.load(url, {
                    view: ''
                }).then((_ref)=>{
                    const html = _ref.html;
                    if (_typeof(html) === 'object' && Object.keys(html).length === 0) {
                        return;
                    }
                    if (html.trim().length === 0) {
                        _this.recommendationsEl.classList.add('complementary-products--no-recommendations');
                        return;
                    }
                    _this.recommendationsEl.innerHTML = html;
                    if (!rimg_shopify_dist_index_es.instance) {
                        rimg_shopify_dist_index_es.init();
                    }
                    rimg_shopify_dist_index_es.watch(_this.recommendationsEl);
                    const slider = _this.recommendationsEl.querySelector('[data-slider]');
                    const slides = _this.recommendationsEl.querySelectorAll('[data-slide]');
                    if (slides.length > 1) {
                        _this.slider = new index_es_js(slider, {
                            cellSelector: '[data-slide]',
                            accessibility: false,
                            adaptiveHeight: false,
                            autoPlay: false,
                            cellAlign: 'left',
                            contain: true,
                            imagesLoaded: true,
                            pageDots: _this.includeIndicatorDots,
                            wrapAround: true,
                            arrowShape: _this.arrowShape
                        });
                        _this.events.register(slider, 'rimg:load', ()=>{
                            _this.slider.resize();
                        });
                    }
                });
            }
        },
        {
            key: "unload",
            value: function unload() {
                this.slider.destroy();
            }
        }
    ]);
    return ComplementaryProducts;
})();
;
class Product {
    constructor(section, options = {}){
        this.section = section;
        this.sectionId = section.id;
        this.el = this.section.el;
        this.$el = define_2()(this.section.el);
        this.context = section.data.context;
        this.settings = section.data.settings;
        this.product = section.data.product;
        this.productRecommendationLimit = section.data.product_recommendation_limit;
        this.richText = null;
        this.readmoreText = null;
        this.reviewForm = null;
        this.isThemeEditor = window.Shopify && window.Shopify.designMode;
        this.useHistory = 'useHistory' in options ? options.useHistory : !!(!this.isThemeEditor && history.replaceState);
        const complementaryProductsEl = this.el.querySelector('[data-complementary-products]');
        if (complementaryProductsEl) {
            this.complementaryProducts = new ComplementaryProducts({
                sectionEl: this.el,
                sectionId: this.sectionId,
                productId: this.product.id,
                productRecommendationsRoute: window.Theme.routes.product_recommendations_url,
                includeIndicatorDots: true,
                limit: this.productRecommendationLimit,
                arrowShape: 'M 65.29,11.99 L 27.28,50 L 65.3,87.99 L 70.25,83.06 L 37.19,50 L 70.26,16.94 L 65.29,11.99 Z'
            });
        }
        const gallery = this.$el.find('[data-product-gallery]')[0];
        const productWrapper = this.$el.find('[data-product-wrapper]');
        this.$details = this.$el.find('[data-product-details]');
        this.$description = this.$el.find('[data-product-description]');
        this.$readmore = this.$el.find('[data-product-readmore]');
        this.$formRegular = this.$el.find('[data-product-form-regular]');
        this.$formAlt = this.$el.find('[data-product-form-alt]');
        this.$formArea = this.$el.find('[data-product-form-area]');
        this.layoutHandler = this.onBreakpointChange.bind(this);
        Layout.onBreakpointChange(this.layoutHandler);
        if (productWrapper.hasClass('product__container--three-columns')) {
            this._moveForm();
        }
        if (this.$description.length) {
            this.richText = new RichText(this.$description);
        }
        if (this.$readmore.length) {
            this.readmoreText = new RichText(this.$readmore);
        }
        utils()(define_2()('[data-scripts]').data('shopify-api-url'), ()=>{
            this.productDetails = new ProductDetails({
                $formArea: this.$formArea,
                $details: this.$details,
                gallery,
                context: this.context,
                settings: this.settings,
                product: this.product,
                useHistory: this.useHistory,
                sectionId: section.id,
                productEl: this.$el[0]
            });
        });
    }
    onSectionUnload() {
        Layout.offBreakpointChange(this.layoutHandler);
        if (this.productDetails) {
            this.productDetails.unload();
        }
        if (this.richText) {
            this.richText.unload();
        }
        if (this.readmoreText) {
            this.readmoreText.unload();
        }
        if (this.reviewForm) {
            this.reviewForm.unload();
        }
    }
    onBreakpointChange() {
        if (this.$formAlt.length) {
            this._moveForm();
        }
    }
    _moveForm() {
        if (Layout.isGreaterThanBreakpoint('M')) {
            if (!define_2().contains(this.$formAlt[0], this.$formArea[0])) {
                const $form = this.$formArea.detach();
                this.$formAlt.append($form);
            }
        } else if (!define_2().contains(this.$formRegular[0], this.$formArea[0])) {
            const $form = this.$formArea.detach();
            this.$formRegular.append($form);
        }
    }
}
;
class StaticProduct extends Product {
}
;
class ScrollLink {
    constructor(){
        this.events = new proto_5.Z();
        this.els = [];
        this.lastTop = 0;
        this.lastLeft = 0;
        this.ticking = false;
        this.driver = null;
        this.settledTimeout = null;
    }
    add(el) {
        if (this.els.includes(el)) {
            return;
        }
        this.els.push(el);
        this.events.register(el, 'scroll', (e)=>{
            if (this.driver === null) {
                this.driver = e.target;
                this._unsetScrollSnapTypes();
            }
            if (this.driver && e.target !== this.driver) {
                e.preventDefault();
                return;
            }
            this.lastTop = e.target.scrollTop;
            this.lastLeft = e.target.scrollLeft;
            clearTimeout(this.settledTimeout);
            if (!this.ticking) {
                window.requestAnimationFrame(()=>{
                    this._updateScroll();
                    this.ticking = false;
                    this.settledTimeout = setTimeout(()=>{
                        this.driver = null;
                        this._resetScrollSnapTypes();
                    }, 50);
                });
            }
            this.ticking = true;
        });
    }
    unload() {
        this.events.unregisterAll();
    }
    syncAll() {
        this._updateScroll();
    }
    _updateScroll() {
        this.els.forEach((el)=>{
            if (el === this.driver) {
                return;
            }
            el.scrollTop = this.lastTop;
            el.scrollLeft = this.lastLeft;
        });
    }
    _unsetScrollSnapTypes() {
        this.els.forEach((el)=>{
            if (el === this.driver) {
                return;
            }
            el.style.scrollSnapType = 'none';
        });
    }
    _resetScrollSnapTypes() {
        this.els.forEach((el)=>{
            el.style.scrollSnapType = null;
        });
    }
}
;
const noOverflowClass = 'show-more__content-wrapper--no-overflow';
class ShowMoreToggle {
    constructor({ el, context }){
        this.context = context;
        this.wrapper = el.querySelector('[data-show-more-content-wrapper]');
        this.toggle = el.querySelector('[data-show-more-toggle]');
        if (this.wrapper && this.toggle) {
            this.events = new proto_5.Z();
            this.menuIsOpen = false;
            this.menuTransition = animations_es_transition({
                el: this.wrapper,
                state: 'closed',
                stateAttribute: 'data-show-more-state',
                stateChangeAttribute: 'data-show-more-animation'
            });
            this.events.register(this.toggle, 'click', ()=>{
                if (this.menuIsOpen) {
                    this._closeMenu();
                } else {
                    this._openMenu();
                }
            });
            this.onBreakpointChange = ()=>this._closeMenu();
            jQuery_2.onChange(this.onBreakpointChange);
            this.checkOverflow();
        }
    }
    unload() {
        if (this.events) {
            this.events.unregisterAll();
        }
        jQuery_2.offChange(this.onBreakpointChange);
    }
    checkOverflow() {
        this._closeMenu(true);
    }
    _checkOverflow() {
        const { height } = this.wrapper.getBoundingClientRect();
        const { scrollHeight } = this.wrapper;
        const noOverflow = Math.ceil(scrollHeight) <= Math.ceil(height);
        this.wrapper.classList.toggle(noOverflowClass, noOverflow);
    }
    _openMenu() {
        this.menuIsOpen = true;
        this.toggle.innerHTML = this.context.see_less;
        const { height: closedHeight } = this.wrapper.getBoundingClientRect();
        this.wrapper.style.setProperty('--closed-height', `${closedHeight}px`);
        this.wrapper.style.maxHeight = 'none';
        this.menuTransition.animateTo('open', {
            onStart: ()=>{
                const { height: menuToggleHeight } = this.toggle.getBoundingClientRect();
                const openHeight = this.wrapper.scrollHeight + menuToggleHeight;
                this.wrapper.style.setProperty('--open-height', `${openHeight}px`);
            }
        });
    }
    _closeMenu(force) {
        this.menuIsOpen = false;
        this.toggle.innerHTML = this.context.see_more;
        this.wrapper.classList.remove(noOverflowClass);
        this.menuTransition.animateTo('closed', {
            force
        }).then(()=>{
            this.wrapper.style.removeProperty('--closed-height');
            this.wrapper.style.maxHeight = null;
            this._checkOverflow();
        });
    }
}
;
const getCompareHandles = ()=>{
    const { searchParams } = new URL(window.location);
    const handles = searchParams.get('compare');
    if (typeof handles === 'string' && handles !== '') {
        return handles.split(',');
    }
    return [];
};
const updateUrlForHandles = (handles)=>{
    if (window.Shopify && window.Shopify.designMode) {
        return;
    }
    const [productHandle, ...compareHandles] = handles;
    const url = new URL(window.location);
    url.searchParams.set('compare', compareHandles.join(','));
    if (productHandle) {
        url.pathname = url.pathname.replace(/\/[^/]+$/, `/${productHandle}`);
    }
    history.replaceState({}, '', url);
};
const generateBaseUrl = (rootUrl)=>{
    const separator = /\/$/.test(rootUrl) ? '' : '/';
    return `${rootUrl}${separator}products`;
};
const lastRowClass = 'product-compare__table-row--last';
class StaticProductCompare {
    constructor(section){
        this.sectionId = section.id;
        this.el = section.el;
        this.data = section.data;
        this.baseUrl = generateBaseUrl(section.data.root_url);
        this.templateCells = {};
        this.productItems = [];
        this.showMoreToggles = [];
        this.descriptionItems = [];
        this.filterLabels = {};
        this.filterGroups = section.data.filter_groups;
        this.activeFilterIds = new Map();
        this.filterCheckboxes = new Map();
        this.events = new proto_5.Z();
        this.filtersModal = new jQuery({
            onBeforeOpen: ()=>this._onBeforeFiltersModalOpen(),
            onClose: ()=>this._onFiltersModalClose()
        });
        this.allRows = this.el.querySelectorAll('[data-compare-row-type="info"], [data-compare-row-type="heading"]');
        this.infoRows = this.el.querySelectorAll('[data-compare-row-type="info"]');
        this.headingRows = this.el.querySelectorAll('[data-compare-row-type="heading"]');
        this._initCell(this.el);
        this.table = this.el.querySelector('[data-compare-table]');
        const productCardRow = this.infoRows[0];
        const firstNonProductCardRow = this.allRows[1];
        const emptyMessage = this.el.querySelector('[data-compare-empty]');
        const eventsToSynthetize = [
            {
                target: productCardRow,
                newTarget: this.table
            },
            {
                target: firstNonProductCardRow,
                newTarget: this.table
            }
        ];
        eventsToSynthetize.forEach(({ target, newTarget })=>{
            this.events.register(target, 'transitionend', (e)=>{
                if (e.target !== target) {
                    return;
                }
                newTarget.dispatchEvent(new Event('transitionend'));
            });
        });
        this.clearAllFadeAnimation = animations_es_transition({
            el: this.table,
            state: 'visible',
            stateAttribute: 'data-fade-animation-state',
            stateChangeAttribute: 'data-fade-animation'
        });
        this.emptyMessageAnimation = animations_es_transition({
            el: emptyMessage,
            state: 'hidden',
            stateAttribute: 'data-animation-state',
            stateChangeAttribute: 'data-animation'
        });
        this.animateToEmptyState = ()=>{
            this._removeAllFilters();
            this._disableFilters();
            this.stickyObserver.disconnect();
            this.stickyBarAnimation.animateTo('up');
            this.clearAllFadeAnimation.animateTo('only-cards', {
                force: this.allRows.length < 2
            }).then(()=>this.clearAllFadeAnimation.animateTo('hidden')).then(()=>this.emptyMessageAnimation.animateTo('visible', {
                    onStart: ()=>{
                        document.documentElement.scroll(0, 0);
                    }
                }));
        };
        this._registerProductRemoveEvents(this.el);
        this.scrollLink = new ScrollLink();
        this.scrollLink.add(this.el.querySelector('[data-compare-table-scroll-wrapper]'));
        this.filtersEl = this.el.querySelector('[data-compare-filters]');
        if (this.filtersEl) {
            const options = {
                groups: this.filterGroups
            };
            this.filterGroupAccordions = new FilterGroups(this.filtersEl, options);
            this.filtersEl.querySelectorAll('[data-filter-checkbox-for]').forEach((checkboxEl)=>{
                this.filterCheckboxes.set(checkboxEl.dataset.filterCheckboxFor, new Checkbox(checkboxEl));
            });
            this.filtersModalButton = this.el.querySelector('[data-compare-open-filter-modal-button]');
            this.events.register(this.filtersModalButton, 'click', ()=>this.filtersModal.open('[data-compare-filters-modal-target]', 'productgrid-filters'));
            this.mobileActiveFiltersTarget = this.el.querySelector('[data-compare-mobile-active-filters-target]');
            this.activeFiltersContainer = this.el.querySelector('[data-compare-active-filters-container]');
            this.activeFiltersEl = this.activeFiltersContainer.querySelector('[data-compare-active-filters]');
            this.removeFilterTemplate = this.activeFiltersContainer.querySelector('[data-compare-filter-remove-template]');
            this.clearAllFiltersTemplate = this.activeFiltersContainer.querySelector('[data-compare-filter-clear-all-template]');
            this.events.register(this.activeFiltersEl, 'click', (e)=>{
                const filterToRemove = e.target.closest('[data-product-compare-filter-remove]');
                if (!filterToRemove) {
                    return;
                }
                e.stopPropagation();
                const productCompareFilterRemove = filterToRemove.dataset.productCompareFilterRemove;
                if (productCompareFilterRemove === '') {
                    this._removeAllFilters();
                    return;
                }
                document.getElementById(productCompareFilterRemove).checked = false;
                this._updateFilter({
                    checked: false,
                    id: productCompareFilterRemove
                });
            });
        }
        this.events.register(this.filtersEl, 'change', (e)=>{
            const value = e.target.value;
            this.filterLabels[value] = e.target.labels[0].innerText;
            this._updateFilter({
                checked: e.target.checked,
                id: value
            });
        });
        const jQuery = getCompareHandles();
        this.allHandles = [
            section.data.handle,
            ...jQuery
        ];
        this._updateBreadcrumbs();
        if (!jQuery.length) {
            this._injectStickyBar();
            return;
        }
        this._addBlankColumns(jQuery.length);
        this._setProductCountVar(this.allHandles.length);
        Promise.all(this._fetchCompareProducts(jQuery)).then(()=>this._injectStickyBar());
    }
    onSectionUnload() {
        this.productItems.forEach((jQuery)=>{
            jQuery.unload();
        });
        this.events.unregisterAll();
        if (this.filterGroups) {
            this.filterGroupAccordions.unload();
        }
        this.filterCheckboxes.forEach((checkbox)=>checkbox.unload());
        this.stickyBarAnimation.unload();
        this.clearAllFadeAnimation.unload();
        this.scrollLink.unload();
        this.stickyBar.remove();
        if (this.tableObserver) {
            this.tableObserver.disconnect();
        }
        if (this.stickyObserver) {
            this.stickyObserver.disconnect();
        }
    }
    _registerProductRemoveEvents(el) {
        this.events.register(el.querySelector('[data-compare-clear-all]'), 'click', ()=>{
            this.animateToEmptyState();
            components_ProductCompare.removeAll();
        });
        this.events.register(el, 'click', (e)=>{
            const removeButton = e.target.closest('[data-compare-remove]');
            if (!removeButton) {
                return;
            }
            this._removeHandle(removeButton.dataset.compareRemove);
        });
    }
    _injectStickyBar() {
        const barTemplate = this.el.querySelector('[data-compare-sticky-bar-template]').content;
        const barTable = barTemplate.querySelector('[data-compare-table]');
        barTable.appendChild(this.infoRows[0].cloneNode(true));
        this._addScrollStops(barTemplate, this.allHandles.length - 2);
        document.querySelector('[data-site-header]').append(barTemplate);
        this.stickyBar = document.querySelector('[data-compare-sticky-bar]');
        this.stickyBarRow = this.stickyBar.querySelector('[data-compare-row-type="info"]');
        this._initProductItems(this.stickyBar);
        setupRippleEffect(this.stickyBar);
        this._registerProductRemoveEvents(this.stickyBar);
        this.scrollLink.add(this.stickyBar.querySelector('[data-compare-table-scroll-wrapper]'));
        const productCardRow = this.infoRows[0];
        this.stickyBarAnimation = animations_es_transition({
            el: document.querySelector('[data-compare-sticky-bar]'),
            state: 'up',
            stateAttribute: 'data-sticky-animation-state',
            stateChangeAttribute: 'data-sticky-animation'
        });
        const animateToDown = ()=>this.stickyBarAnimation.animateTo('down', {
                onStart: ()=>this.scrollLink.syncAll()
            });
        this.tableObserver = null;
        const createTableObserver = ()=>{
            const { top, height } = this.stickyBar.getBoundingClientRect();
            this.tableObserver = new IntersectionObserver(([entry])=>{
                if (!entry.isIntersecting) {
                    this.stickyBarAnimation.animateTo('up');
                    return;
                }
                animateToDown();
            }, {
                rootMargin: `-${top + height}px 0px 0px 0px`,
                threshold: 0
            });
            this.tableObserver.observe(this.table);
        };
        const hasStickyHeader = document.body.classList.contains('site-header-sticky');
        this.stickyObserver = new IntersectionObserver(([entry])=>{
            if (!entry.isIntersecting) {
                animateToDown().then(createTableObserver);
                return;
            }
            if (this.tableObserver) {
                this.tableObserver.disconnect();
                this.tableObserver = null;
            }
            this.stickyBarAnimation.animateTo('up');
        }, {
            rootMargin: `${hasStickyHeader ? '-100' : '0'}px 0px 0px 0px`,
            threshold: 0
        });
        this.stickyObserver.observe(productCardRow);
    }
    _setProductCountVar(count) {
        document.body.style.setProperty('--compare-products-count', Math.max(count, 2));
    }
    _addBlankColumns(jQuery) {
        this.infoRows.forEach((row)=>{
            const templateCell = row.querySelector('[data-compare-cell-placeholder]');
            this.templateCells[row.dataset.compareRowId] = templateCell.parentNode.removeChild(templateCell);
            for(let i = 0; i < jQuery; i++){
                row.appendChild(templateCell.cloneNode(true));
            }
        });
        this.headingRows.forEach((row)=>{
            const heading = row.querySelector('[data-compare-heading]');
            heading.colSpan += jQuery - 1;
        });
        this._addScrollStops(this.el, jQuery - 1);
    }
    _addScrollStops(el, n) {
        const scrollStop = el.querySelector('[data-compare-scroll-stop]');
        for(let i = 0; i < n; i++){
            scrollStop.after(scrollStop.cloneNode(true));
        }
    }
    _removeHandle(handle) {
        if (this.allHandles.length === 1) {
            this.animateToEmptyState();
            components_ProductCompare.remove(handle);
            this._setProductCountVar(this.allHandles.length);
            return;
        }
        this._removeColumn(handle);
        this.allHandles = this.allHandles.filter((h)=>h !== handle);
        this._setProductCountVar(this.allHandles.length);
        updateUrlForHandles(this.allHandles);
        components_ProductCompare.remove(handle);
    }
    _removeColumn(handle) {
        const insertPlaceholders = this.allHandles.length <= 2;
        [
            this.stickyBarRow,
            ...this.infoRows
        ].forEach((row)=>{
            const cell = row.querySelectorAll('[data-compare-cell]')[this.allHandles.indexOf(handle)];
            if (insertPlaceholders) {
                cell.parentNode.append(this.templateCells[row.dataset.compareRowId].cloneNode(true));
            }
            cell.remove();
        });
        if (!insertPlaceholders) {
            this.headingRows.forEach((row)=>{
                const heading = row.querySelector('[data-compare-heading]');
                heading.colSpan--;
            });
            [
                this.stickyBar,
                this.el
            ].forEach((el)=>{
                el.querySelector('[data-compare-scroll-stop]').remove();
            });
            this.showMoreToggles.forEach((toggle)=>toggle.checkOverflow());
        }
        const productItemImages = this.el.querySelectorAll('[data-product-item-image] img');
        rimg_shopify_dist_index_es.instance.update(productItemImages);
    }
    _fetchCompareProducts(handles) {
        return handles.map((handle, index)=>shopify_asyncview_dist_index_es.load(`${this.baseUrl}/${handle}`, this.sectionId, {
                view: 'compare'
            }).then(({ html })=>{
                const parser = new DOMParser();
                const sourceEl = parser.parseFromString(html, 'text/html');
                this._populateContent(sourceEl, index + 1);
            }));
    }
    _populateContent(source, columnIndex) {
        source.querySelectorAll('[data-compare-row-type="info"]').forEach((row)=>{
            const { compareRowId } = row.dataset;
            const cellHTML = row.querySelector('[data-compare-cell]').innerHTML;
            const targetRow = this.el.querySelector(`[data-compare-row-id="${compareRowId}"]`);
            const targetCell = targetRow.querySelectorAll('[data-compare-cell]')[columnIndex];
            targetCell.innerHTML = cellHTML;
            targetCell.querySelectorAll('[data-compare-remove-on-populate').forEach((el)=>el.remove());
            this._initCell(targetCell);
        });
        this.showMoreToggles.forEach((toggle)=>toggle.checkOverflow());
    }
    _updateBreadcrumbs() {
        const breadcrumb = this.el.querySelector('[data-compare-breadcrumb]');
        if (!components_ProductCompare.returnBreadcrumb) {
            breadcrumb.remove();
            return;
        }
        const { url, title } = components_ProductCompare.returnBreadcrumb;
        breadcrumb.href = url;
        if (title) {
            const breadcrumbText = breadcrumb.querySelector('[data-compare-breadcrumb-text]');
            breadcrumbText.innerHTML = this.data.breadcrumb.replace('** location **', title);
        }
        const placeholders = this.el.querySelectorAll('[data-compare-placeholder-link]');
        placeholders.forEach((placeholder)=>{
            placeholder.href = url;
        });
    }
    _removeAllFilters() {
        this.activeFilterIds.forEach((_, id)=>{
            document.getElementById(id).checked = false;
            this._updateFilter({
                checked: false,
                id
            });
        });
    }
    _disableFilters() {
        this.filtersDisabled = true;
        this.filtersEl.querySelectorAll('[data-compare-filter-checkbox]').forEach((checkbox)=>{
            checkbox.disabled = true;
        });
    }
    _updateFilter({ checked, id }) {
        if (this.filtersDisabled) {
            return;
        }
        if (checked) {
            this.activeFilterIds.set(id, true);
            this.filterCheckboxes.get(id).check();
        } else {
            this.activeFilterIds.delete(id);
            this.filterCheckboxes.get(id).uncheck();
        }
        this._updateAppliedFilters();
        this._updateActiveFilterCount();
        const activeFilterCount = this.activeFilterIds.size;
        if (activeFilterCount === 0) {
            this.allRows.forEach((row)=>{
                row.style.display = '';
                row.classList.remove(lastRowClass);
            });
            return;
        }
        this.infoRows.forEach((row)=>{
            if ('compareIgnoreFilter' in row.dataset) {
                return;
            }
            row.style.display = this.activeFilterIds.has(row.dataset.compareRowId) ? '' : 'none';
        });
        this._updateHeadersDisplay();
    }
    _updateAppliedFilters() {
        this.activeFiltersEl.innerHTML = '';
        this.activeFilterIds.forEach((_, id)=>{
            const removeFilter = this.removeFilterTemplate.cloneNode(true).content;
            removeFilter.firstElementChild.dataset.productCompareFilterRemove = id;
            removeFilter.querySelector('[data-compare-filter-remove-text]').innerHTML = this.filterLabels[id];
            this.activeFiltersEl.append(removeFilter);
        });
        if (this.activeFilterIds.size) {
            this.activeFiltersContainer.style.display = '';
            this.activeFiltersEl.append(this.clearAllFiltersTemplate.cloneNode(true).content);
        } else {
            this.activeFiltersContainer.style.display = 'none';
        }
    }
    _updateActiveFilterCount() {
        const filterText = this.el.querySelector('[data-compare-filter-text]');
        if (this.activeFilterIds.size > 0) {
            const filterTextString = this.data.filter_count.replace('** count **', this.activeFilterIds.size);
            filterText.innerHTML = filterTextString;
        } else {
            filterText.innerHTML = this.data.filter_count_zero;
        }
    }
    _updateHeadersDisplay() {
        let lastHeadingRow = null;
        let showLastHeading = false;
        let lastDisplayedRow = null;
        const updateHeadingDisplay = ()=>{
            if (lastHeadingRow) {
                lastHeadingRow.style.display = showLastHeading ? '' : 'none';
            }
        };
        const updateLastDisplayedRow = ()=>{
            if (lastDisplayedRow) {
                lastDisplayedRow.classList.add(lastRowClass);
            }
        };
        this.allRows.forEach((row)=>{
            row.classList.remove(lastRowClass);
            if (row.dataset.compareRowType === 'heading') {
                updateHeadingDisplay();
                updateLastDisplayedRow();
                lastHeadingRow = row;
                showLastHeading = false;
                lastDisplayedRow = null;
            } else if (this.activeFilterIds.has(row.dataset.compareRowId) || 'compareIgnoreFilter' in row.dataset) {
                lastDisplayedRow = row;
                showLastHeading = true;
            }
        });
        updateHeadingDisplay();
        updateLastDisplayedRow();
    }
    _onBeforeFiltersModalOpen() {
        this.mobileActiveFiltersTarget.before(this.activeFiltersEl);
    }
    _onFiltersModalClose() {
        this.activeFiltersContainer.append(this.activeFiltersEl);
    }
    _initCell(el) {
        const productItemDescription = el.querySelector('[data-compare-description]');
        if (productItemDescription) {
            this.descriptionItems.push(new RichText(productItemDescription));
            this.showMoreToggles.push(new ShowMoreToggle({
                el,
                context: this.data.context
            }));
        }
        this._initProductItems(el);
        setupRippleEffect(el);
    }
    _initProductItems(el) {
        const productItemEls = el.querySelectorAll('[data-product-item]');
        productItemEls.forEach((productItem)=>{
            rimg_shopify_dist_index_es.watch(el);
            this.productItems.push(new ProductGridItem({
                el: productItem,
                id: this.sectionId,
                disableActionsToggle: true,
                lazy: false
            }));
        });
        if (productItemEls.length && window.Shopify && Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
        }
    }
}
;
class FlickityA11yPatch {
    constructor(slider){
        this.slider = slider;
        this.observer = new MutationObserver((m)=>this._removeAttr(m));
        this.observer.observe(this.slider, {
            attributes: true,
            childList: true,
            subtree: true
        });
        this.slider.querySelectorAll('[aria-hidden]').forEach((el)=>{
            el.removeAttribute('aria-hidden');
        });
    }
    _removeAttr(mutations) {
        if (mutations.length) {
            mutations.forEach((m)=>{
                if (m?.target && m.target.hasAttribute('aria-hidden')) {
                    m.target.removeAttribute('aria-hidden');
                }
            });
        }
    }
    unload() {
        this.observer.disconnect();
    }
}
;
class ProductRowScroller {
    constructor(productRow){
        this.$window = $(window);
        this.flickity = null;
        this.productRow = productRow;
        this.$productRow = $(this.productRow);
        this._mobileSlider = this._mobileSlider.bind(this);
        Layout.onBreakpointChange(this._mobileSlider);
        this._mobileSlider();
        this.flickityA11yPatch = new FlickityA11yPatch(this.productRow);
    }
    unload() {
        Layout.offBreakpointChange(this._mobileSlider);
        this._destroyFlickity();
    }
    _initFlickity() {
        this.flickity = new (js_default())(this.productRow, {
            cellSelector: '.productgrid--item',
            contain: true,
            freeScroll: true,
            percentPosition: false,
            prevNextButtons: false,
            pageDots: false,
            setGallerySize: false
        });
        this._bindSlider();
    }
    _destroyFlickity() {
        if (!this.flickity) {
            return;
        }
        this.$window.off('.product-row');
        this.$productRow.off('.product-row');
        this.flickity.destroy();
        if (this.flickityA11yPatch) {
            this.flickityA11yPatch.unload();
        }
        this.flickity = null;
    }
    _mobileSlider() {
        if (Layout.isGreaterThanBreakpoint('M')) {
            this._destroyFlickity();
            return;
        }
        if (this.flickity) {
            return;
        }
        this._initFlickity();
    }
    _bindSlider() {
        const $slider = this.$productRow.find('.flickity-slider');
        this.$window.on('resize.product-row', just_debounce_default()(()=>{
            this.$productRow.trigger('heightUpdate.product-row');
        }));
        this.flickity.on('cellSelect', ()=>{
            this.$productRow.trigger('heightUpdate.product-row');
        });
        this.$productRow.on('heightUpdate.product-row', ()=>{
            if (!this.flickity) {
                return;
            }
            $slider.height(Math.ceil(this.flickity.maxCellHeight));
        });
        this.$productRow.trigger('heightUpdate.product-row');
    }
}
;
class StaticProductRecommendations {
    constructor(section){
        this.section = section;
        this.productId = section.data.productId;
        this.limit = section.data.settings.limit;
        this.recommendedProducts = [];
        this.productsScroller = null;
        this.sectionId = section.data.sectionId;
        this.recommendationContainer = document.querySelector('[data-product-recommendations]');
        this.recommendUrl = `${window.Theme.routes.product_recommendations_url}?section_id=${this.sectionId}&limit=${this.limit}&product_id=${this.productId}`;
        this._loadRecommendations = this._loadRecommendations.bind(this);
        this._resizeRowScroller = this._resizeRowScroller.bind(this);
        this._loadRecommendations();
    }
    _loadRecommendations() {
        shopify_asyncview_dist_index_es.load(this.recommendUrl, {
            view: ''
        }).then(({ html })=>{
            this.recommendationContainer.innerHTML = html;
            rimg_shopify_dist_index_es.watch(this.recommendationContainer);
            const productItems = this.recommendationContainer.querySelectorAll('[data-product-item]');
            const productItemLazyLoad = Layout.isGreaterThanBreakpoint('L', true);
            if (productItems.length) {
                productItems.forEach((productItem)=>{
                    this.recommendedProducts.push(new ProductGridItem({
                        el: productItem,
                        id: this.section.id,
                        lazy: productItemLazyLoad
                    }));
                });
                initShopifyProductReviews();
                if (window.Shopify && Shopify.PaymentButton) {
                    Shopify.PaymentButton.init();
                }
                this.recommendationContainer.addEventListener('rimg:load', this._resizeRowScroller);
                this.productsScroller = new ProductRowScroller(this.section.el.querySelector('[data-product-row]'));
            }
        });
    }
    _resizeRowScroller() {
        if (this.productsScroller && this.productsScroller.flickity) {
            this.productsScroller.flickity.resize();
        }
    }
    onSectionUnload() {
        if (this.productsScroller) {
            this.productsScroller.unload();
        }
        this.recommendedProducts.forEach((productItem)=>{
            productItem.unload();
        });
        this.recommendationContainer.removeEventListener('rimg:load', this._resizeRowScroller);
    }
}
;
class StaticRecentlyViewed {
    constructor(section){
        this.namespace = 'pxu';
        this.maxRecentlyViewed = 30;
        this.maxStorageTime = 30 * 24 * 3600;
        this.version = `${section.data.currency}-${window.Theme.routes.root_url}`;
        this.storageKey = `${this.namespace}-recentlyViewed-${this.version}`;
        this.$el = define_2()(section.el);
        this.time = section.data.time;
        this.flickity = null;
        this.recentlyViewed = section.data.recently_viewed_info;
        this.cardSettings = section.data.product_card_settings;
        if (this.recentlyViewed && this.time) {
            this.recentlyViewed.timestamp = Math.round(new Date().getTime() / 1000);
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
            define_2().when(...promises).done(()=>{
                if (recentlyViewed.length) {
                    const cardsMarkup = this._getRecentlyViewedCards();
                    const cardsData = this._getRecentlyViewed();
                    this.$el.find('[data-recently-viewed-container]').append(cardsMarkup);
                    cardsData.forEach((productData)=>{
                        const timestamp = this.timeSince(productData.timestamp);
                        define_2()(`[data-product-handle=${productData.handle}]`).prepend(timestamp);
                    });
                    rimg_shopify_dist_index_es.watch(this.$el[0]);
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
        this.$el.on('click', '[data-remove-recently-viewed]', (event)=>{
            const $target = define_2()(event.currentTarget);
            const handle = $target.closest('[data-product-handle]').data('product-handle');
            const recentlyViewed = this._getRecentlyViewed();
            this.removeRecentlyViewed(handle, recentlyViewed);
            this._setRecentlyViewed(recentlyViewed);
            $target.parents('[data-recently-viewed-card]').addClass('hide-card');
            $target.parents('[data-recently-viewed-card]').nextAll().addClass('move-card');
            setTimeout(()=>{
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
        this.$el.on('click', '[data-clear-recently-viewed]', ()=>{
            this.clearRecentlyViewed();
        });
    }
    timeSince(timestamp) {
        const now = Math.round(new Date().getTime() / 1000);
        const secondsPast = now - timestamp;
        const { lang } = document.documentElement;
        const options = {
            month: 'long'
        };
        if (secondsPast < 60) {
            const secondsAgo = parseInt(secondsPast, 10);
            if (secondsAgo === 1) {
                return `${secondsAgo} ${this.time.second} ${this.time.ago}`;
            }
            return `${secondsAgo} ${this.time.seconds} ${this.time.ago}`;
        }
        if (secondsPast < 3600) {
            const minutesAgo = parseInt(secondsPast / 60, 10);
            if (minutesAgo === 1) {
                return `${minutesAgo} ${this.time.minute} ${this.time.ago}`;
            }
            return `${minutesAgo} ${this.time.minutes} ${this.time.ago}`;
        }
        if (secondsPast <= 86400) {
            const hoursAgo = parseInt(secondsPast / 3600, 10);
            if (hoursAgo === 1) {
                return `${hoursAgo} ${this.time.hour} ${this.time.ago}`;
            }
            return `${hoursAgo} ${this.time.hours} ${this.time.ago}`;
        }
        const date = new Date(timestamp * 1000);
        const currentDate = new Date(now * 1000);
        const day = date.getDate();
        const month = date.toLocaleDateString(lang, options);
        const year = date.getFullYear() === currentDate.getFullYear() ? '' : `, ${date.getFullYear()}`;
        return `${month} ${day} ${year}`;
    }
    removeRecentlyViewed(handle, recentlyViewed) {
        for(let i = 0; i < recentlyViewed.length; i++){
            if (recentlyViewed[i].handle === handle) {
                recentlyViewed.splice(i, 1);
            }
        }
        this._setRecentlyViewed(recentlyViewed);
        const cards = sessionStorage.getItem(this.storageKey) ? JSON.parse(sessionStorage.getItem(this.storageKey)) : {};
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
                x3: 20
            }
        };
        this.flickity = new (js_default())(this.$carousel[0], this.flickityOptions);
        this.$carousel[0].addEventListener('rimg:load', this.slideImageLoaded);
    }
    _setRecentlyViewed(productData) {
        const now = Math.floor(Date.now() / 1000);
        const minStorageTimestamp = now - this.maxStorageTime;
        const filteredData = productData.filter((item)=>item.timestamp > minStorageTimestamp);
        if (filteredData.length > this.maxRecentlyViewed) {
            const removeCount = filteredData.length - this.maxRecentlyViewed;
            filteredData.splice(0, removeCount);
        }
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(filteredData));
        } catch (error) {
            console.warn(error);
        }
        try {
            const handles = filteredData ? filteredData.map((x)=>x.handle) : [];
            let storedCards = sessionStorage.getItem(this.storageKey) ? JSON.parse(sessionStorage.getItem(this.storageKey)) : {};
            if (storedCards.cardSettings) {
                Object.keys(storedCards.cardSettings).forEach((key)=>{
                    if (storedCards.cardSettings[key] !== this.cardSettings[key]) {
                        storedCards = {};
                        sessionStorage.removeItem(this.storageKey);
                    }
                });
            }
            storedCards.cardSettings = this.cardSettings;
            const promises = handles.map((handle)=>{
                if (storedCards[handle]) {
                    return null;
                }
                const fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=recently-viewed`;
                return define_2().get(fetchUrl).then((response)=>{
                    if (response) {
                        storedCards[handle] = response;
                        try {
                            sessionStorage.setItem(this.storageKey, JSON.stringify(storedCards));
                        } catch (error) {
                            console.warn(error);
                        }
                    }
                }).catch((error)=>console.error('Error:', error));
            });
            return promises;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }
    _getRecentlyViewed() {
        try {
            const recentlyViewed = localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)) : [];
            return recentlyViewed;
        } catch (error) {
            console.warn(error);
            return [];
        }
    }
    _getRecentlyViewedCards() {
        const cards = sessionStorage.getItem(this.storageKey) ? JSON.parse(sessionStorage.getItem(this.storageKey)) : {};
        const orderedItems = localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)) : {};
        const markup = [];
        for(let i = orderedItems.length - 1; i >= 0; i--){
            const cardKey = orderedItems[i].handle;
            const domParser = new DOMParser();
            const card = domParser.parseFromString(cards[cardKey], 'text/html');
            if (card.querySelector('.productgrid--item')) {
                markup.push(cards[cardKey]);
            }
        }
        return markup.join('');
    }
}
;
class StaticSearch {
    constructor(section){
        this.section = section;
        this.el = section.el;
        this.searchField = this.el.querySelector('[data-live-search]');
        this.productItems = [];
        const productItems = this.el.querySelectorAll('[data-product-item]');
        productItems.forEach((productItem)=>{
            this.productItems.push(new ProductGridItem({
                el: productItem,
                id: this.section.id,
                lazy: true
            }));
        });
        this.searchForm = new SearchForm(this.searchField);
    }
    onSectionUnload() {
        this.searchForm.unload();
        this.productItems.forEach((productItem)=>{
            productItem.unload();
        });
    }
}
;
class StaticUtilityBar {
    constructor(section){
        this.el = section.el;
        this.mobileUtilityMenuEl = section.el.querySelector('[data-utility-menu-mobile]');
        this.mobileNavContentEl = null;
        this.mobileElChildren = [];
        this.documentFragmentMenu = document.createDocumentFragment();
        this.mobileLayout = section.data.settings.mobile_layout;
        this._loadMobileNavItems = this._loadMobileNavItems.bind(this);
        this.mobileUtilityBarEl = section.el.querySelector('[data-utility-bar-mobile]');
        this.mobileUtilityContentEl = null;
        this.mobileUtilityChildren = [];
        this.mobileUtilityPlacement = document.querySelector('[data-utility-mobile]');
        this.documentFragmentDisclosure = document.createDocumentFragment();
        this._loadMobileUtilityItems = this._loadMobileUtilityItems.bind(this);
        this.mobileScrollHeight = document.querySelector('[data-mobile-nav-content]');
        ;
        this.mobileUtilitySocial = document.querySelector('[data-utility-social-mobile]');
        this.countryDisclosureEl = this.el.querySelector('[data-disclosure-country]');
        this.localeDisclosureEl = this.el.querySelector('[data-disclosure-locale]');
        this.disclosures = [];
        if (this.mobileUtilityMenuEl) {
            this._loadMobileNavItems();
            window.addEventListener('shopify:section:load', this._loadMobileNavItems);
        }
        if (this.mobileUtilityBarEl) {
            this._loadMobileUtilityItems();
            window.addEventListener('shopify:section:load', this._loadMobileUtilityItems);
        }
        if (this.countryDisclosureEl) {
            this.disclosures.push(new shopify_cross_border_dist_index_es(this.countryDisclosureEl));
        }
        if (this.localeDisclosureEl) {
            this.disclosures.push(new shopify_cross_border_dist_index_es(this.localeDisclosureEl));
        }
        if (this.mobileUtilitySocial) {
            this.mobileScrollHeight.classList.add('utility-social-enabled');
        }
    }
    onSectionUnload() {
        window.removeEventListener('shopify:section:load', this._loadMobileNavItems);
        window.removeEventListener('shopify:section:load', this._loadMobileUtilityItems);
        if (this.mobileNavContentEl) {
            this.mobileElChildren.forEach((child)=>this.mobileNavContentEl.removeChild(child));
        }
        if (this.mobileUtilityContentEl) {
            this.mobileUtilityChildren.forEach((child)=>this.mobileUtilityPlacement.removeChild(child));
        }
        this.disclosures.forEach((disclosure)=>disclosure.unload());
    }
    _loadMobileNavItems() {
        const inDom = this.mobileElChildren.some((child)=>document.body.contains(child));
        if (inDom) {
            return;
        }
        this.mobileNavContentEl = document.querySelector('[data-mobile-nav-content]');
        this.mobileElChildren = [];
        if (this.mobileNavContentEl) {
            const { children } = this.mobileUtilityMenuEl;
            for(let i = 0; i < children.length; i++){
                const clone = children[i].cloneNode(true);
                this.mobileElChildren.push(clone);
                this.documentFragmentMenu.appendChild(clone);
            }
            if (this.mobileLayout === 'below') {
                this.mobileNavContentEl.appendChild(this.documentFragmentMenu);
                this.mobileNavContentEl.classList.add('utility-nav-below');
            } else {
                this.mobileNavContentEl.insertBefore(this.documentFragmentMenu, this.mobileNavContentEl.firstElementChild);
            }
        }
    }
    _loadMobileUtilityItems() {
        const inDom = this.mobileUtilityChildren.some((child)=>document.body.contains(child));
        if (inDom) {
            return;
        }
        this.mobileUtilityContentEl = document.querySelector('[data-utility-bar-mobile]');
        this.mobileUtilityChildren = [];
        if (this.mobileUtilityContentEl) {
            const { children } = this.mobileUtilityContentEl;
            for(let i = 0; i < children.length; i++){
                const clone = children[i].cloneNode(true);
                this.mobileUtilityChildren.push(clone);
                this.documentFragmentDisclosure.appendChild(clone);
            }
            this.mobileUtilityPlacement.appendChild(this.documentFragmentDisclosure);
            const countryDisclosureElMobile = this.mobileUtilityPlacement.querySelector('[data-disclosure-country]');
            const localeDisclosureElMobile = this.mobileUtilityPlacement.querySelector('[data-disclosure-locale]');
            if (countryDisclosureElMobile) {
                this.disclosures.push(new shopify_cross_border_dist_index_es(countryDisclosureElMobile));
            }
            if (localeDisclosureElMobile) {
                this.disclosures.push(new shopify_cross_border_dist_index_es(localeDisclosureElMobile));
            }
        }
    }
}
;
class StaticSubCollectionsMenuList {
    constructor(section){
        this.el = section.el;
        this.context = section.data.context;
        this.handleEvents = new proto_5.Z();
        this.accordionTrigger = '[data-accordion-trigger]';
        this.mobileAccordionOpen = this.el.querySelector(".mobile-accordion__open--true");
        this.Accordion = new Accordion(this.el, {
            content: '[data-accordion-content]',
            onStart: ({ el, state })=>{
                el.parentNode.querySelector(this.accordionTrigger).dataset.accordionTrigger = state;
            }
        });
        if (this.mobileAccordionOpen) {
            this.Accordion.openAll({
                force: true
            });
        } else if (jQuery_2.max('XS')) {
            this.Accordion.closeAll({
                force: true
            });
            this._addAccordionClickEvent();
        }
        jQuery_2.onChange((breakpoints)=>this.onBreakpointChange(breakpoints));
    }
    onSectionUnload() {
        this.Accordion.unload();
        this.handleEvents.unregisterAll();
    }
    onSectionBlockSelect(block) {
        this._toggleAccordion(block.el);
    }
    onSectionBlockDeselect(block) {
        this._toggleAccordion(block.el);
    }
    _addAccordionClickEvent() {
        this.el.querySelectorAll(this.accordionTrigger).forEach((el)=>{
            this.handleEvents.register(el, 'click', (event)=>{
                event.preventDefault();
                this._toggleAccordion(event.currentTarget.parentNode);
            });
        });
    }
    _toggleAccordion(block) {
        if (jQuery_2.min('S')) {
            return;
        }
        this.Accordion.toggle(block);
    }
    onBreakpointChange(breakpoints) {
        if (breakpoints.current.min('S') || this.mobileAccordionOpen) {
            this.Accordion.openAll({
                force: true
            });
            this.handleEvents.unregisterAll();
        } else if (breakpoints.previous.min('S') && breakpoints.current.max('XS')) {
            this.Accordion.closeAll({
                force: true
            });
            this._addAccordionClickEvent();
        }
    }
}
;
class FeaturedCollection {
    constructor({ el, sectionId }){
        this.el = el;
        this.contentWrapperEl = el.querySelector('[data-content-wrapper]');
        this.contentEl = el.querySelector('[data-content]');
        this.flickityA11yPatch = new FlickityA11yPatch(this.contentEl);
        this.events = new proto_5.Z();
        this._resizeObserver = new ResizeObserver(()=>{
            let foundTransitionEnd = false;
            this.events.register(this.el, 'transitionend', ()=>{
                foundTransitionEnd = true;
            });
            setTimeout(()=>{
                if (foundTransitionEnd) {
                    return;
                }
                if (this.flickity && 'resize' in this.flickity) {
                    this.flickity.resize();
                }
            }, 500);
        });
        this.initialDesktopLayout = this.contentEl.dataset.layout;
        this.initialMobileLayout = this.contentEl.dataset.mobileLayout;
        this.productItems = [];
        const productItemsEls = this.el.querySelectorAll('[data-product-item]');
        productItemsEls.forEach((productItemEl)=>{
            this._resizeObserver.observe(productItemEl.querySelector('.productitem__container'));
            this.productItems.push(new ProductGridItem({
                el: productItemEl,
                id: sectionId,
                lazy: false
            }));
        });
        if (this.initialDesktopLayout === 'slideshow' || this.initialMobileLayout === 'slideshow') {
            this.onBreakpointChange = ()=>{
                if (this.useDesktopSlideshow || this.useMobileSlideshow) {
                    this._initializeFlickity();
                } else {
                    this._destroyFlickity();
                }
            };
            Layout.onBreakpointChange(this.onBreakpointChange);
            if (this.useDesktopSlideshow || this.useMobileSlideshow) {
                window.requestAnimationFrame(()=>this._initializeFlickity());
            }
        }
    }
    get useDesktopSlideshow() {
        return this.initialDesktopLayout === 'slideshow' && Layout.isGreaterThanBreakpoint('M', true);
    }
    get useMobileSlideshow() {
        return this.initialMobileLayout === 'slideshow' && Layout.isLessThanBreakpoint('M');
    }
    unload() {
        this.productItems.forEach((productItem)=>productItem.unload());
        Layout.offBreakpointChange(this.onBreakpointChange);
        this.events.unregisterAll();
        this._destroyFlickity();
        if (this.flickityA11yPatch) {
            this.flickityA11yPatch.unload();
        }
    }
    _initializeFlickity() {
        if (this.flickity) {
            return;
        }
        this.contentEl.dataset.layout = 'slideshow';
        this.flickity = new (js_default())(this.contentEl, {
            autoPlay: 0,
            accessibility: true,
            cellAlign: 'left',
            cellSelector: '.productgrid--item',
            groupCells: true,
            pageDots: false,
            contain: true,
            arrowShape: 'M65.29 11.99L27.28 50L65.3 87.99L70.25 83.06L37.19 50L70.26 16.94L65.29 11.99Z'
        });
        const viewport = this.contentEl.querySelector('.flickity-viewport');
        const slider = this.contentEl.querySelector('.flickity-slider');
        const border = document.createElement('div');
        border.classList.add('flickity-slider--wrapper');
        viewport.appendChild(border);
        border.appendChild(slider);
        let hasCellChanged = false;
        this.flickity.on('change', ()=>{
            hasCellChanged = true;
        });
        this.events.register(this.el, 'transitionend', ()=>{
            if (hasCellChanged || !this.flickity) {
                return;
            }
            this.flickity.resize();
            hasCellChanged = false;
        });
    }
    _destroyFlickity() {
        if (!this.flickity) {
            return;
        }
        this.contentEl.dataset.layout = this.initialDesktopLayout;
        this.contentEl.dataset.mobile_layout = this.initialMobileLayout;
        const viewport = this.contentEl.querySelector('.flickity-viewport');
        const slider = this.contentEl.querySelector('.flickity-slider');
        const sliderWrapper = this.contentEl.querySelector('.flickity-slider--wrapper');
        viewport.appendChild(slider);
        viewport.removeChild(sliderWrapper);
        this.flickity.destroy();
        this.flickity = null;
    }
}
;
class StaticSubcollectionsFeaturedCollection {
    constructor(section){
        const collectionEls = section.el.querySelectorAll('[data-featured-collection]');
        this.collections = Array.prototype.map.call(collectionEls, (collectionEl)=>new FeaturedCollection({
                el: collectionEl,
                sectionId: section.id
            }));
        this.showMoreToggle = new ShowMoreToggle({
            el: section.el,
            context: section.data.context
        });
    }
    onSectionUnload() {
        this.collections.forEach((collection)=>collection.unload());
        this.showMoreToggle.unload();
    }
}
;
class FacetedFilterCollection extends StaticCollection {
    constructor(section){
        super(section);
        this.el = section.el;
        this.filterInputs = null;
        this.filterEvents = new proto_5.Z();
        this.updateTimeout = null;
        this._initFilterEvents = this._initFilterEvents.bind(this);
        this._updatePrice = this._updatePrice.bind(this);
        this._buildFilterQuery = this._buildFilterQuery.bind(this);
        this.filterGroups = section.data.filter_groups;
        this.filterStyle = section.data.filter_style;
        this.filtersContentSelector = '[data-productgrid-sidebar]';
        this.filtersContent = this.el.querySelector(this.filtersContentSelector);
        this.filterRange = this.el.querySelectorAll('[data-filter-range]');
        this.rangeNames = [];
        this.filterRange.forEach((el)=>{
            this.rangeNames.push(el.name);
        });
        this.allowedQueryParams = [
            'view',
            'sort_by',
            'grid_list'
        ];
        if (this.filtersContent) {
            const options = {
                groups: this.filterGroups,
                style: this.filterStyle
            };
            this.filterGroupAccordions = new FilterGroups(this.filtersContent, options);
            this._initFilters();
        }
        this.forms = new Forms(this.el);
        this._initFilterEvents();
    }
    _initFilterEvents() {
        this.filterInputs = this.el.querySelectorAll('[data-filter-input]');
        this.filterInputs.forEach((filter)=>{
            this.filterEvents.register(filter, 'click', (e)=>{
                e.preventDefault();
                const target = e.currentTarget;
                if (target.dataset.hasOwnProperty('disabled')) {
                    return;
                }
                const handle = target.getAttribute('data-handle');
                let animateTo = 'checked';
                if (target.getAttribute('data-filter-active')) {
                    animateTo = 'unchecked';
                    target.removeAttribute('data-filter-active');
                } else {
                    target.setAttribute('data-filter-active', '');
                }
                if (this.fillAnimations[handle] && this.checkAnimations[handle]) {
                    this.fillAnimations[handle].animateTo(animateTo);
                    this.checkAnimations[handle].animateTo(animateTo);
                }
                this.getFilteredResults(e.currentTarget);
            });
        });
        this.filterRange.forEach((filter)=>{
            this.filterEvents.register(filter, 'keyup', (e)=>this._updatePrice(e.currentTarget));
            this.filterEvents.register(filter, 'change', (e)=>this._updatePrice(e.currentTarget));
        });
        this.filterAccordionButton = this.el.querySelectorAll('[data-filter-group-trigger]');
        this.filterAccordionButton.forEach((filter)=>{
            this.filterEvents.register(filter, 'click', (e)=>{
                e.preventDefault();
            });
        });
    }
    _initAnimations() {
        this.filterCheckboxes.forEach((el)=>{
            const tagHandle = el.dataset.handle;
            const checkmark = el.querySelector('.checkmark');
            const checkmarkCheck = el.querySelector('.checkmark__check');
            let state = 'unchecked';
            if (el.closest('[data-filter-input]').getAttribute('data-filter-active')) {
                state = 'checked';
            }
            const fillAnimation = animations_es_transition({
                el: checkmark,
                state
            });
            const checkAnimation = animations_es_transition({
                el: checkmarkCheck,
                state
            });
            this.fillAnimations[tagHandle] = fillAnimation;
            this.checkAnimations[tagHandle] = checkAnimation;
        });
    }
    _initFilters() {
        const activePriceFilter = this.el.querySelector('[data-filter-group-range]');
        this.filterRange.forEach((priceInput)=>{
            if (priceInput.value.length > 0) {
                activePriceFilter.setAttribute('data-filter-open', 'true');
            }
        });
        const activeFilters = this.el.querySelectorAll('[data-filter-open="true"]');
        activeFilters.forEach((filter)=>{
            this._openActiveGroup(filter);
        });
    }
    _openActiveGroup(filter) {
        const button = filter.closest('[data-filter-group]').querySelector('[data-filter-group-trigger]');
        const list = filter.closest('[data-accordion-content]');
        this.filterGroupAccordions.openGroup(button, list, true);
    }
    _buildFilterQuery(element) {
        let searchParameters;
        if (element.classList.contains('collection-filters__filter-range-input')) {
            const currentSearch = window.location.search.replace('?', '');
            const formData = new FormData(element.closest('form'));
            const newSearch = new URLSearchParams(formData).toString();
            const splitCurrentSearch = currentSearch.split('&');
            let filteredCurrentSearch = splitCurrentSearch.filter((search)=>{
                if (search.includes(this.rangeNames[0]) || search.includes(this.rangeNames[1])) {
                    return false;
                }
                return true;
            });
            filteredCurrentSearch = filteredCurrentSearch.join('&');
            if (filteredCurrentSearch.length > 0) {
                searchParameters = `${filteredCurrentSearch}&${newSearch}`;
            } else {
                searchParameters = `${newSearch}`;
            }
        } else {
            const elementUrl = element.dataset.url;
            let decodedElementUrl = null;
            if (elementUrl[0] === '/') {
                searchParameters = elementUrl.split('?')[1];
            } else {
                decodedElementUrl = decodeURIComponent(elementUrl);
                searchParameters = decodedElementUrl.split('?')[1];
            }
            if (!searchParameters) {
                searchParameters = '';
            }
        }
        const shopifyQueryParams = Object.entries(Shopify.queryParams);
        let shopifyQueries = [];
        shopifyQueryParams.forEach((query)=>{
            if (!searchParameters.includes(query[0]) && this.allowedQueryParams.includes(query[0])) {
                shopifyQueries.push(query.join('='));
            }
        });
        shopifyQueries = shopifyQueries.join('&');
        let urlQueryString = '';
        if (shopifyQueries && searchParameters) {
            urlQueryString = `?${searchParameters}&${shopifyQueries}`;
        } else if (searchParameters && !shopifyQueries) {
            urlQueryString = `?${searchParameters}`;
        } else {
            urlQueryString = `?${shopifyQueries}`;
        }
        return urlQueryString;
    }
    _updatePrice(element) {
        if (this.updateTimeout !== null) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(()=>{
            this.getFilteredResults(element);
        }, 2000);
    }
    _changeSorting(event) {
        event.preventDefault();
        const target = event.currentTarget;
        const url = new URL(window.location);
        url.searchParams.set('sort_by', target.value);
        window.location.search = url.search;
    }
    _toggleView(event) {
        const target = event.currentTarget;
        const url = new URL(window.location);
        url.searchParams.set('grid_list', target.dataset.collectionView);
        window.location.search = url.search;
    }
    _setSortByQueryParameters() {
        Shopify.queryParams = {};
        const allowedQueryParams = [
            'view',
            'sort_by',
            'grid_list'
        ];
        const queryPairs = location.search.substr(1).split('&');
        if (location.search.length) {
            queryPairs.forEach((query)=>{
                const queryKeyValue = query.split('=');
                if (queryKeyValue.length > 1 && allowedQueryParams.includes(queryKeyValue[0])) {
                    Shopify.queryParams[decodeURIComponent(queryKeyValue[0])] = decodeURIComponent(queryKeyValue[1]);
                }
            });
        }
    }
    _stringifyShopifyQueries() {
        const shopifyQueryParams = Object.entries(Shopify.queryParams);
        let shopifyQueries = [];
        shopifyQueryParams.forEach((query)=>{
            shopifyQueries.push(query.join('='));
        });
        shopifyQueries = shopifyQueries.join('&');
        return shopifyQueries;
    }
    getFilteredResults(element) {
        const filterQuery = this._buildFilterQuery(element);
        window.location.search = filterQuery;
    }
    onSectionUnload() {
        super.onSectionUnload();
        this.filterEvents.unregisterAll();
        this.forms.unload();
    }
}
;
class FacetedFilterSearch extends StaticSearch {
    constructor(section){
        super(section);
        this.el = section.el;
        this.filterInputs = null;
        this.filterEvents = new proto_5.Z();
        this.updateTimeout = null;
        this._initFilterEvents = this._initFilterEvents.bind(this);
        this._updatePrice = this._updatePrice.bind(this);
        this._buildFilterQuery = this._buildFilterQuery.bind(this);
        this.filterGroups = section.data.filter_groups;
        this.filterStyle = 'faceted';
        this.filtersContentSelector = '[data-productgrid-sidebar]';
        this.filtersContent = this.el.querySelector(this.filtersContentSelector);
        this.filtersTrigger = this.el.querySelector('[data-productgrid-trigger-filters]');
        this.filterRange = this.el.querySelectorAll('[data-filter-range]');
        this.filterCheckboxes = this.el.querySelectorAll('.filter-icon--checkbox');
        this.rangeNames = [];
        this.fillAnimations = {};
        this.checkAnimations = {};
        this.modal = new jQuery();
        this.filterEvents.register(this.filtersTrigger, 'click', (e)=>{
            this._showFiltersModal(e);
        });
        this._initAnimations();
        this.filterRange.forEach((el)=>{
            this.rangeNames.push(el.name);
        });
        if (this.filtersContent) {
            const options = {
                groups: this.filterGroups,
                style: this.filterStyle
            };
            this.filterGroupAccordions = new FilterGroups(this.filtersContent, options);
            this._initFilters();
        }
        this.forms = new Forms(this.el);
        this._initFilterEvents();
    }
    _initFilterEvents() {
        this.filterInputs = this.el.querySelectorAll('[data-filter-input]');
        this.filterInputs.forEach((filter)=>{
            this.filterEvents.register(filter, 'click', (e)=>{
                e.preventDefault();
                const target = e.currentTarget;
                if (target.dataset.hasOwnProperty('disabled')) {
                    return;
                }
                const handle = target.getAttribute('data-handle');
                let animateTo = 'checked';
                if (target.getAttribute('data-filter-active')) {
                    animateTo = 'unchecked';
                    target.removeAttribute('data-filter-active');
                } else {
                    target.setAttribute('data-filter-active', '');
                }
                if (this.fillAnimations[handle] && this.checkAnimations[handle]) {
                    this.fillAnimations[handle].animateTo(animateTo);
                    this.checkAnimations[handle].animateTo(animateTo);
                }
                this.getFilteredResults(e.currentTarget);
            });
        });
        this.filterRange.forEach((filter)=>{
            this.filterEvents.register(filter, 'keyup', (e)=>this._updatePrice(e.currentTarget));
            this.filterEvents.register(filter, 'change', (e)=>this._updatePrice(e.currentTarget));
        });
        this.filterAccordionButton = this.el.querySelectorAll('[data-filter-group-trigger]');
        this.filterAccordionButton.forEach((filter)=>{
            this.filterEvents.register(filter, 'click', (e)=>{
                e.preventDefault();
            });
        });
    }
    _initAnimations() {
        this.filterCheckboxes.forEach((jQuery)=>{
            const tagHandle = jQuery.dataset.handle;
            const jQuery = jQuery.querySelector('.checkmark');
            const jQuery = jQuery.querySelector('.checkmark__check');
            let state = 'unchecked';
            if (jQuery.closest('[data-filter-input]').getAttribute('data-filter-active')) {
                state = 'checked';
            }
            const fillAnimation = animations_es_transition({
                el: jQuery,
                state
            });
            const checkAnimation = animations_es_transition({
                el: jQuery,
                state
            });
            this.fillAnimations[tagHandle] = fillAnimation;
            this.checkAnimations[tagHandle] = checkAnimation;
        });
    }
    _initFilters() {
        const activePriceFilter = this.el.querySelector('[data-filter-group-range]');
        this.filterRange.forEach((priceInput)=>{
            if (priceInput.value.length > 0) {
                activePriceFilter.setAttribute('data-filter-open', 'true');
            }
        });
        const activeFilters = this.el.querySelectorAll('[data-filter-open="true"]');
        activeFilters.forEach((filter)=>{
            this._openActiveGroup(filter);
        });
    }
    _showFiltersModal(event) {
        event.preventDefault();
        this.focusItem = event.currentTarget;
        this.modal.open(this.filtersContentSelector, 'productgrid-filters');
    }
    _openActiveGroup(filter) {
        const button = filter.closest('[data-filter-group]').querySelector('[data-filter-group-trigger]');
        const list = filter.closest('[data-accordion-content]');
        this.filterGroupAccordions.openGroup(button, list, true);
    }
    _buildFilterQuery(element) {
        let searchParameters;
        if (element.classList.contains('collection-filters__filter-range-input')) {
            const currentSearch = window.location.search.replace('?', '');
            const formData = new FormData(element.closest('form'));
            const newSearch = new URLSearchParams(formData).toString();
            const splitCurrentSearch = currentSearch.split('&');
            let filteredCurrentSearch = splitCurrentSearch.filter((search)=>{
                if (search.includes(this.rangeNames[0]) || search.includes(this.rangeNames[1])) {
                    return false;
                }
                return true;
            });
            filteredCurrentSearch = filteredCurrentSearch.join('&');
            if (filteredCurrentSearch.length > 0) {
                searchParameters = `${filteredCurrentSearch}&${newSearch}`;
            } else {
                searchParameters = `${newSearch}`;
            }
        } else {
            const elementUrl = element.dataset.url;
            const decodedElementUrl = decodeURIComponent(elementUrl);
            searchParameters = decodedElementUrl.split('?')[1];
            if (!searchParameters) {
                searchParameters = '';
            }
        }
        let urlQueryString = '';
        if (searchParameters) {
            urlQueryString = `?${searchParameters}`;
        }
        return urlQueryString;
    }
    _updatePrice(element) {
        if (this.updateTimeout !== null) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(()=>{
            this.getFilteredResults(element);
        }, 2000);
    }
    getFilteredResults(element) {
        const filterQuery = this._buildFilterQuery(element);
        window.location.search = filterQuery;
    }
    onSectionUnload() {
        super.onSectionUnload();
        this.filterEvents.unregisterAll();
        this.forms.unload();
    }
}
;
class DynamicTwitterFeed {
    constructor(section){
        this.$el = define_2()(section.el);
        this.$window = define_2()(window);
        this.flickity = null;
        this.$blogPosts = this.$el.find('[data-blog-posts]');
        this._mobileSlider = this._mobileSlider.bind(this);
        Layout.onBreakpointChange(this._mobileSlider);
        this._mobileSlider();
        this.flickityA11yPatch = new FlickityA11yPatch(this.$blogPosts[0]);
    }
    onSectionUnload() {
        Layout.offBreakpointChange(this._mobileSlider);
        this._destroyFlickity();
        if (this.flickityA11yPatch) {
            this.flickityA11yPatch.unload();
        }
    }
    _initFlickity() {
        this.flickity = new (js_default())(this.$blogPosts[0], {
            cellSelector: '.article--excerpt-wrapper',
            contain: true,
            freeScroll: true,
            percentPosition: false,
            prevNextButtons: false,
            pageDots: false,
            setGallerySize: false
        });
        this._bindSlider();
    }
    _destroyFlickity() {
        if (!this.flickity) {
            return;
        }
        this.$window.off('.blog-posts');
        this.$blogPosts.off('.blog-posts');
        this.flickity.destroy();
        this.flickity = null;
    }
    _mobileSlider() {
        if (Layout.isGreaterThanBreakpoint('M')) {
            this._destroyFlickity();
            return;
        }
        if (this.flickity) {
            return;
        }
        this._initFlickity();
    }
    _bindSlider() {
        const $slider = this.$blogPosts.find('.flickity-slider');
        this.$window.on('resize.blog-posts', just_debounce_default()(()=>{
            this.$blogPosts.trigger('heightUpdate.blog-posts');
        }));
        this.flickity.on('cellSelect', ()=>{
            this.$blogPosts.trigger('heightUpdate.blog-posts');
        });
        this.$blogPosts.on('heightUpdate.blog-posts', ()=>{
            if (!this.flickity) {
                return;
            }
            $slider.height(Math.ceil(this.flickity.maxCellHeight));
        });
        this.$blogPosts.trigger('heightUpdate.blog-posts');
    }
}
;
const adjustHeight = (block)=>{
    const $block = define_2()(block);
    const $wrapper = $block.find('.promo-block--content-wrapper');
    const padding = window.getComputedStyle($block[0], null).getPropertyValue('padding-top').replace('px', '');
    if ($block.innerHeight() - padding * 2 < $wrapper.innerHeight()) {
        $block.css({
            height: `${$wrapper.innerHeight() + padding * 2}px`
        });
        $wrapper.css({
            transform: 'none',
            top: 'auto'
        });
    }
};
const resetHeight = (block)=>{
    const $block = define_2()(block);
    const $wrapper = $block.find('.promo-block--content-wrapper');
    $block.css({
        height: ''
    });
    $wrapper.css({
        transform: '',
        top: ''
    });
};
class DynamicPromoBlocks {
    constructor(section){
        this.$el = define_2()(section.el);
        this.content = '[data-promo-block-content]';
        this.expandedClass = 'promo-block--expanded';
        this.compressBlocks = section.data.compress_blocks;
        this.layoutHandler = this.onBreakpointChange.bind(this);
        Layout.onBreakpointChange(this.layoutHandler);
        this._blockInteraction = this._blockInteraction.bind(this);
        this.$el.on('click.promo-block', this.content, this._blockInteraction);
        if (!this.compressBlocks && Layout.isLessThanBreakpoint('S')) {
            this.$el.find(this.content).each((index, block)=>{
                adjustHeight(block);
            });
        }
        if (!this.compressBlocks) {
            define_2()(window).on('resize', ()=>{
                this.$el.find(this.content).each((index, block)=>{
                    if (Layout.isLessThanBreakpoint('S')) {
                        adjustHeight(block);
                    } else {
                        resetHeight(block);
                    }
                });
            });
        }
    }
    onBreakpointChange() {
        if (!Layout.isLessThanBreakpoint('S')) {
            this.$el.find(`.${this.expandedClass}`).each((i, content)=>{
                this._collapse(content);
            });
            this.$el.find(this.content).each((index, block)=>{
                resetHeight(block);
            });
        } else if (!this.compressBlocks) {
            this.$el.find(this.content).each((index, block)=>{
                adjustHeight(block);
            });
        }
    }
    onSectionUnload() {
        this.$el.off('.promo-block');
        Layout.offBreakpointChange(this.layoutHandler);
    }
    onSectionBlockSelect(block) {
        if (!Layout.isLessThanBreakpoint('S')) {
            return;
        }
        this._expand(block.el.querySelector(this.content));
    }
    onSectionBlockDeselect(block) {
        if (!Layout.isLessThanBreakpoint('S')) {
            return;
        }
        this._collapse(block.el.querySelector(this.content));
    }
    _blockInteraction(jQuery) {
        const jQuery = jQuery.currentTarget;
        const clicked = jQuery.getAttribute('data-clicked');
        if (clicked || !Layout.isLessThanBreakpoint('S') || !this.compressBlocks) {
            return;
        }
        jQuery.preventDefault();
        jQuery.setAttribute('data-clicked', 'clicked');
        this._expand(jQuery);
    }
    _expand(content) {
        if (!this.compressBlocks) {
            return;
        }
        const jQuery = define_2()(content);
        jQuery.addClass('animating animating-in').one('trend', ()=>{
            jQuery.removeClass('animating animating-in').addClass(this.expandedClass).off('trend');
            adjustHeight(jQuery);
        });
    }
    _collapse(content) {
        if (!this.compressBlocks) {
            return;
        }
        const $content = define_2()(content);
        $content.addClass('animating animating-out').one('trend', ()=>{
            $content.removeClass(`animating animating-out ${this.expandedClass}`).off('trend');
            content.removeAttribute('data-clicked');
            resetHeight($content);
        });
    }
}
;
class DynamicFeaturedCollection {
    constructor(section){
        const collectionEl = section.el.querySelector('[data-featured-collection]');
        this.featuredCollection = new FeaturedCollection({
            el: collectionEl,
            sectionId: section.id
        });
    }
    onSectionUnload() {
        this.featuredCollection.unload();
    }
}
;
class DynamicMenuList {
    constructor(section){
        this.$el = define_2()(section.el);
        this.context = section.data.context;
        this.accordionTrigger = '[data-accordion-trigger]';
        this.seeMoreTrigger = '[data-menulist-toggle]';
        this.Accordion = new Accordion(this.$el[0], {
            content: '.menulist-menu--initial[data-accordion-content]',
            onStart: ({ el, state })=>{
                el.parentNode.querySelector(this.accordionTrigger).dataset.accordionTrigger = state;
            }
        });
        this.seeMore = new Accordion(this.$el[0], {
            content: '.menulist-menu--show-more[data-accordion-content]',
            onStart: ({ el, state })=>{
                el.parentNode.querySelector(this.seeMoreTrigger).innerHTML = state === 'open' ? this.context.see_less : this.context.see_more;
            }
        });
        if (jQuery_2.max('XS')) {
            this.Accordion.closeAll({
                force: true
            });
        }
        this.seeMore.closeAll({
            force: true
        });
        jQuery_2.onChange((jQuery)=>this.onBreakpointChange(jQuery));
        this._bindEvents();
    }
    _bindEvents() {
        this.$el.on('click.menu-list', this.accordionTrigger, (event)=>{
            event.preventDefault();
            this._toggleAccordion(event.currentTarget.parentNode);
        });
        this.$el.on('click.menu-list', this.seeMoreTrigger, (event)=>{
            event.preventDefault();
            this.seeMore.toggle(event.currentTarget.parentNode);
        });
    }
    onSectionUnload() {
        this.$el.off('.menu-list');
        this.Accordion.unload();
        this.seeMore.unload();
    }
    onSectionBlockSelect(block) {
        this._toggleAccordion(block.el);
    }
    onSectionBlockDeselect(block) {
        this._toggleAccordion(block.el);
    }
    _toggleAccordion(block) {
        if (jQuery_2.min('S')) {
            return;
        }
        this.Accordion.toggle(block);
    }
    onBreakpointChange(breakpoints) {
        if (breakpoints.current.min('S')) {
            this.Accordion.openAll({
                force: true
            });
        } else if (breakpoints.previous.min('S') && breakpoints.current.max('XS')) {
            this.Accordion.closeAll({
                force: true
            });
        }
    }
}
;
class DynamicCollectionList {
    constructor(Tween){
        this.el = Tween.el;
        const Tween = this.el.querySelectorAll('[data-collection-image]');
        jQuery_2.onChange((Tween)=>{
            if (Tween.previous.max('L') && Tween.current.value === 'S') {
                for(let i = 0; i < Tween.length; i++){
                    rimg_shopify_dist_index_es.instance.update(Tween[i]);
                }
            }
        });
    }
}
;
function pxs_countdown_timer_dist_index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function pxs_countdown_timer_dist_index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        pxs_countdown_timer_dist_index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        pxs_countdown_timer_dist_index_es_defineProperties(Constructor, staticProps);
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
const CountdownTimer = (()=>{
    function CountdownTimer(sectionEl) {
        this.container = sectionEl;
        this.previousSiblingSection = this.container.previousElementSibling;
        this.nextSiblingSection = this.container.nextElementSibling;
        this.countDownTimerEl = this.container.querySelector('[data-countdown-timer]');
        this.countDownEl = this.countDownTimerEl.querySelector('[data-countdown]');
        this.daysEl = this.countDownTimerEl.querySelector('[data-days]');
        this.hoursEl = this.countDownTimerEl.querySelector('[data-hours]');
        this.minutesEl = this.countDownTimerEl.querySelector('[data-minutes]');
        this.secondsEl = this.countDownTimerEl.querySelector('[data-seconds]');
        this.dateTimeEl = this.countDownTimerEl.querySelector('[data-time]');
        this.targetDate = Date.parse(this.dateTimeEl.dateTime);
        this.daysInMs = 1000 * 60 * 60 * 24;
        this.hoursInMs = this.daysInMs / 24;
        this.minutesInMs = this.hoursInMs / 60;
        this.secondsInMs = this.minutesInMs / 60;
        this.timeoutId = null;
        this.isLoading = true;
        this.startTimer();
    }
    pxs_countdown_timer_dist_index_es_createClass(CountdownTimer, [
        {
            key: "updateLoadingState",
            value: function updateLoadingState() {
                this.countDownTimerEl.classList.remove('countdown-timer--loading');
            }
        },
        {
            key: "startTimer",
            value: function jQuery() {
                const jQuery = this;
                const jQuery = 1000;
                let jQuery = Date.now() + jQuery;
                if (this.targetDate <= Date.now()) {
                    this.updateLoadingState();
                    this.handleCountDownComplete();
                    return;
                }
                const countDown = function countDown() {
                    const currentDate = Date.now();
                    const timeDiff = jQuery.targetDate - currentDate;
                    if (timeDiff <= 0) {
                        jQuery.stopTimer();
                        jQuery.handleCountDownComplete();
                        return;
                    }
                    const remainingTime = jQuery.convertTime(timeDiff);
                    const drift = currentDate - jQuery;
                    jQuery += jQuery;
                    if (jQuery.isLoading) {
                        jQuery.updateLoadingState();
                    }
                    jQuery.updateDom(remainingTime);
                    jQuery.timeoutId = setTimeout(countDown, Math.max(0, jQuery - drift));
                };
                this.timeoutId = setTimeout(countDown, jQuery);
            }
        },
        {
            key: "stopTimer",
            value: function stopTimer() {
                clearTimeout(this.timeoutId);
            }
        },
        {
            key: "convertTime",
            value: function convertTime(timeInMs) {
                const days = parseInt(timeInMs / this.daysInMs, 10);
                timeInMs -= days * this.daysInMs;
                const hours = parseInt(timeInMs / this.hoursInMs, 10);
                timeInMs -= hours * this.hoursInMs;
                const minutes = parseInt(timeInMs / this.minutesInMs, 10);
                timeInMs -= minutes * this.minutesInMs;
                const seconds = parseInt(timeInMs / this.secondsInMs, 10);
                return {
                    days,
                    hours,
                    minutes,
                    seconds
                };
            }
        },
        {
            key: "updateDom",
            value: function updateDom({ days, hours, minutes, seconds }) {
                this.daysEl.textContent = days;
                this.hoursEl.textContent = hours;
                this.minutesEl.textContent = minutes;
                this.secondsEl.textContent = seconds;
            }
        },
        {
            key: "handleCountDownComplete",
            value: function handleCountDownComplete() {
                this.updateDom({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                this.countDownTimerEl.classList.add('countdown-timer--complete');
            }
        }
    ]);
    return CountdownTimer;
})();
;
class DynamicCountdownTimer {
    constructor(section){
        this.el = section.el;
        this.product = this.el.querySelector('[data-product-item]');
        new CountdownTimer(this.el);
        setupRippleEffect(this.el);
        if (this.product) {
            this.productItems = new ProductGridItem({
                el: this.product,
                id: section.id
            });
        }
    }
    onSectionUnload() {
        if (this.product) {
            this.productItems.unload();
        }
    }
}
;
class DynamicProduct extends Product {
    constructor(section){
        super(section, {
            useHistory: false
        });
    }
}
;
class DynamicRichText {
    constructor(section){
        this.$el = define_2()(section.el);
        this.rte = [];
        this.$el.find('[data-rte]').each((i, el)=>{
            this.rte.push(new RichText(define_2()(el)));
        });
    }
    onSectionUnload() {
        this.rte.forEach((richTextArea)=>{
            richTextArea.unload();
        });
    }
}
;
class DynamicSearch {
    constructor(section){
        this.el = section.el;
        this.settings = section.data.settings;
        this.search = null;
        this.scripts = document.querySelector('[data-scripts]');
        this.searchField = this.el.querySelector('[data-live-search]');
        this.forms = new Forms(this.el);
        if (this.settings.live_search.enable) {
            utils()(this.scripts.dataset.shopifyApiUrl, ()=>{
                this.search = new LiveSearch({
                    el: this.searchField,
                    header: this.el
                }, {
                    ...this.settings.live_search,
                    use_dimmer: false
                });
            });
        } else {
            this.search = new SearchForm(this.searchField);
        }
    }
    onSectionUnload() {
        this.search.unload();
        this.forms.unload();
    }
}
;
const api = 'https://www.youtube.com/iframe_api';
let apiLoadedCallbacks = [];
let apiLoaded = false;
window.onYouTubeIframeAPIReady = ()=>{
    apiLoadedCallbacks.forEach((apiLoadedCallback)=>apiLoadedCallback());
    apiLoadedCallbacks = [];
    apiLoaded = true;
};
class Youtube {
    constructor({ el, videoUrl, loop }){
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        this.el = el;
        this.id = videoUrl.match(regex)[1] || null;
        this.onApiLoaded = this._onApiLoaded.bind(this);
        this.isReady = false;
        this.onReady = this._onReady.bind(this);
        this.onReadyCallback = null;
        this.loop = loop ? 1 : 0;
        this.onStateChange = this._onStateChange.bind(this);
        this.onPlayCallback = null;
        if (apiLoaded) {
            this._onApiLoaded();
        } else {
            apiLoadedCallbacks.push(this.onApiLoaded);
            debugger;
            utils()(api);
        }
    }
    play() {
        return new Promise((resolve)=>{
            this.onPlayCallback = resolve;
            if (this.isReady) {
                this.player.playVideo();
            } else {
                this.onReadyCallback = ()=>{
                    this.player.playVideo();
                };
            }
        });
    }
    pause() {
        return new Promise((resolve)=>{
            this.onPlayCallback = resolve;
            if (this.isReady) {
                this.player.pauseVideo();
            } else {
                this.onReadyCallback = ()=>{
                    this.player.pauseVideo();
                };
            }
        });
    }
    autoplay() {
        return new Promise((resolve)=>{
            this.onPlayCallback = resolve;
            if (this.isReady) {
                this.player.playVideo();
                this.player.mute();
            } else {
                this.onReadyCallback = ()=>{
                    this.player.playVideo();
                    this.player.mute();
                };
            }
        });
    }
    unload() {
        this.player.destroy();
    }
    _onApiLoaded() {
        const playerVars = {
            modestbranding: true,
            showinfo: false,
            controls: false,
            loop: this.loop,
            rel: 0
        };
        if (this.loop) {
            playerVars.playlist = this.id;
        }
        this.player = new YT.Player(this.el, {
            videoId: this.id,
            playerVars,
            events: {
                onReady: this.onReady,
                onStateChange: this.onStateChange
            }
        });
    }
    _onReady() {
        this.isReady = true;
        if (this.onReadyCallback) {
            this.onReadyCallback();
        }
    }
    _onStateChange(event) {
        const state = event.data;
        if (this.onPlayCallback && state === YT.PlayerState.BUFFERING) {
            this.onPlayCallback();
            this.onPlayCallback = null;
        }
    }
}
;
const Vimeo_api = 'https://player.vimeo.com/api/player.js';
let Vimeo_apiLoaded = false;
class VimeoPlayer {
    constructor({ el, videoUrl }){
        this.el = el;
        const urlParts = videoUrl.split('/');
        this.id = urlParts[urlParts.length - 1].split('?')[0];
        this.onReadyCallback = null;
        this.onApiLoaded = this._onApiLoaded.bind(this);
        this.onProgress = this._onProgress.bind(this);
        this.onProgressCallback = null;
        if (Vimeo_apiLoaded) {
            this._onApiLoaded();
        } else {
            utils()(Vimeo_api, this.onApiLoaded);
        }
    }
    play() {
        return new Promise((resolve)=>{
            this.onProgressCallback = resolve;
            if (Vimeo_apiLoaded) {
                this.player.on('play', this.onProgress);
                this.player.play();
            } else {
                this.onReadyCallback = ()=>{
                    this.player.on('play', this.onProgress);
                    this.player.play();
                };
            }
        });
    }
    pause() {
        return new Promise((resolve)=>{
            this.onProgressCallback = resolve;
            if (Vimeo_apiLoaded) {
                this.player.on('pause', this.onProgress);
                this.player.pause();
            } else {
                this.onReadyCallback = ()=>{
                    this.player.on('pause', this.onProgress);
                    this.player.pause();
                };
            }
        });
    }
    autoplay() {
        return new Promise((resolve)=>{
            this.onProgressCallback = resolve;
            if (Vimeo_apiLoaded) {
                this.player.on('play', this.onProgress);
                this.player.setVolume(0);
                this.player.play();
            } else {
                this.onReadyCallback = ()=>{
                    this.player.on('play', this.onProgress);
                    this.player.setVolume(0);
                    this.player.play();
                };
            }
        });
    }
    unload() {
        this.player.unload().catch();
    }
    _onApiLoaded() {
        this.player = new window.Vimeo.Player(this.el, {
            id: this.id
        });
        this.player.ready().then().catch();
        Vimeo_apiLoaded = true;
        if (this.onReadyCallback) {
            this.onReadyCallback();
        }
    }
    _onProgress() {
        this.player.off('play', this.onProgress);
        this.player.off('pause', this.onProgress);
        if (this.onProgressCallback) {
            this.onProgressCallback();
            this.onProgressCallback = null;
        }
    }
}
;
class Video {
    constructor(el, options){
        this.el = el;
        this.options = options;
        this.platform = el.getAttribute('data-video').trim();
        this.playButton = el.querySelector('[data-video-play-button]');
        this.videoEl = el.querySelector('[data-video-element]');
        this.onPlayClick = this._onPlayClick.bind(this);
        this.onPauseClick = this._onPauseClick.bind(this);
        this.autoplay = this._autoplay.bind(this);
        this.video = null;
        this.videoData = {
            el: this.videoEl.childNodes[0],
            videoUrl: this.videoEl.getAttribute('data-video-url'),
            loop: this.options && this.options.loop
        };
        switch(this.platform){
            case 'youtube':
                this.video = new Youtube(this.videoData);
                break;
            case 'vimeo':
                this.video = new VimeoPlayer(this.videoData);
                break;
            default:
                this.video = null;
                break;
        }
        this.el.addEventListener('click', this.onPlayClick);
        if (this.playButton) {
            if (this.options && this.options.autoplay) {
                this.autoplay();
            }
            this.playButton.addEventListener('click', this.onPlayClick);
        }
    }
    _onPlayClick() {
        this.el.classList.add('video-loading');
        this.video.play().then(()=>{
            this.el.classList.add('video-transitioning');
            setTimeout(()=>{
                this.el.classList.remove('video-loading');
                this.el.classList.remove('video-transitioning');
                this.el.classList.add('video-playing');
            }, 200);
        });
    }
    _onPauseClick() {
        this.video.pause();
    }
    _autoplay() {
        this.el.classList.add('video-loading');
        this.video.autoplay().then(()=>{
            this.el.classList.add('video-transitioning');
            setTimeout(()=>{
                this.el.classList.remove('video-loading');
                this.el.classList.remove('video-transitioning');
                this.el.classList.add('video-playing');
            }, 200);
        });
    }
    play() {
        this._onPlayClick();
    }
    pause() {
        this._onPauseClick();
    }
    unload() {
        this.el.removeEventListener('click', this.onPlayClick);
        if (this.playButton) {
            this.playButton.removeEventListener('click', this.onPlayClick);
        }
        if (this.video) {
            this.video.unload();
        }
    }
    destroy() {
        this.unload();
    }
}
;
class DynamicVideo {
    constructor(section){
        this.el = section.el;
        this.autoplay = section.data.autoplay;
        this.init();
    }
    init() {
        const videoEl = this.el.querySelector('[data-video]');
        this.hasPlayed = false;
        if (videoEl) {
            this.video = new Video(videoEl);
        }
        if (this.video && this.autoplay) {
            const thresholds = {
                play: 0.5,
                pause: 0.2
            };
            this.playPauseObserver = new IntersectionObserver((entries)=>{
                const { intersectionRatio, isIntersecting } = entries[0];
                if (intersectionRatio >= thresholds.play && isIntersecting && !this.hasPlayed) {
                    this.video._autoplay();
                    this.hasPlayed = true;
                } else if (intersectionRatio <= thresholds.pause && isIntersecting === false) {
                    this.video._onPauseClick();
                }
            }, {
                threshold: [
                    thresholds.pause,
                    thresholds.play
                ]
            });
            this.playPauseObserver.observe(videoEl);
        }
    }
    onSectionUnload() {
        if (this.video) {
            this.video.unload();
        }
        if (this.playPauseObserver) {
            this.playPauseObserver.disconnect();
        }
    }
}
;
class DynamicNewsletter {
    constructor(section){
        this.$el = define_2()(section.el);
        this.forms = new Forms(this.$el);
    }
    onSectionUnload() {
        this.forms.unload();
    }
}
;
class DynamicHighlightsBanner {
    constructor(section){
        this.$el = define_2()(section.el);
        this.$window = define_2()(window);
        this.$carousel = this.$el.find('[data-highlights-slider]');
        this.slides = '[data-highlights-block]';
        this.flickity = null;
        this.flickityOptions = null;
        if (this.$carousel.length > 0 && this.$carousel.find(this.slides).length > 1) {
            this._initSlider();
        }
        jQuery_2.onChange((jQuery)=>this.onBreakpointChange(jQuery));
    }
    _initSlider() {
        this.flickityOptions = {
            autoPlay: 0,
            accessibility: true,
            cellAlign: 'left',
            cellSelector: this.slides,
            pageDots: false,
            prevNextButtons: false,
            contain: true
        };
        this._bindFlickity();
    }
    onSectionUnload() {
        this._destroyFlickity();
    }
    _bindFlickity() {
        if (jQuery_2.max('M') && this.flickity === null && this.$carousel[0]) {
            this.flickity = new (js_default())(this.$carousel[0], this.flickityOptions);
        }
    }
    _destroyFlickity() {
        if (!this.flickity) {
            return;
        }
        this.flickity.destroy();
        this.flickity = null;
    }
    onBreakpointChange(breakpoints) {
        if (breakpoints.current.min('M') && this.flickity) {
            this._destroyFlickity();
        } else if (breakpoints.previous.min('M')) {
            this._bindFlickity();
        }
    }
}
;
function pxs_shoppable_image_dist_index_es_defineProperties(target, props) {
    for (const descriptor of props){
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function pxs_shoppable_image_dist_index_es_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        pxs_shoppable_image_dist_index_es_defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        pxs_shoppable_image_dist_index_es_defineProperties(Constructor, staticProps);
    }
    return Constructor;
}
function pxs_shoppable_image_dist_index_es_unwrapExports(x) {
    if (x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')) {
        return x['default'];
    }
    return x;
}
function pxs_shoppable_image_dist_index_es_createCommonjsModule(fn, module) {
    module = {
        exports: {}
    };
    fn(module, module.exports);
    return module.exports;
}
const pxs_shoppable_image_dist_index_es_EventHandler_1 = pxs_shoppable_image_dist_index_es_createCommonjsModule(function(module, exports) {
    exports.__esModule = true;
    class EventHandler {
        constructor(){
            this.events = [];
        }
        register(el, event, listener) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events.push({
                el,
                event,
                listener
            });
            el.addEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregister({ el, event, listener }) {
            if (!el || !event || !listener) {
                return null;
            }
            this.events = this.events.filter((e)=>el !== e.el || event !== e.event || listener !== e.listener);
            el.removeEventListener(event, listener);
            return {
                el,
                event,
                listener
            };
        }
        unregisterAll() {
            this.events.forEach(({ el, event, listener })=>el.removeEventListener(event, listener));
            this.events = [];
        }
    }
    exports["default"] = EventHandler;
});
const pxs_shoppable_image_dist_index_es_EventHandler = pxs_shoppable_image_dist_index_es_unwrapExports(pxs_shoppable_image_dist_index_es_EventHandler_1);
const ShoppableImage = (()=>{
    function ShoppableImage(section) {
        this.el = section.el;
        this.bounds = this.el.getBoundingClientRect();
        this.imageWrapper = this.el.querySelector('[data-shoppable-image-wrapper]');
        this.image = this.el.querySelector('[data-shoppable-image-img]');
        this.points = this.el.querySelectorAll('[data-hotspot]');
        this.tooltips = this.el.querySelectorAll('[data-tooltip-wrapper]');
        this.activeClass = 'shoppable-image__hotspot--active';
        this.events = new pxs_shoppable_image_dist_index_es_EventHandler();
        this.window = window;
        this.hoverTimer = null;
        this.tooltipDelay = 300;
        this.windowScrollTimer = null;
        this.windowScrollEvent = null;
        this._bindEvents();
    }
    pxs_shoppable_image_dist_index_es_createClass(ShoppableImage, [
        {
            key: "_bindEvents",
            value: function _bindEvents() {
                const jQuery = this;
                this._positionElements();
                if (this.image) {
                    this.events.register(this.image, 'rimg:load', (e)=>jQuery._positionElements());
                }
                this.events.register(this.el, 'touchend', ()=>jQuery._clearAllActive());
                for(let i = 0; i < this.points.length; i++){
                    const jQuery = this.points[i];
                    const tooltip = this.tooltips[i];
                    this.events.register(jQuery, 'click', (e)=>jQuery._setActivePoint(e));
                    this.events.register(jQuery, 'touchend', (jQuery)=>jQuery._setActivePoint(jQuery));
                    this.events.register(jQuery, 'mouseover', (jQuery)=>jQuery._setActivePoint(jQuery));
                    this.events.register(jQuery, 'mouseout', (e)=>jQuery._closeActivePoint(e));
                    this.events.register(jQuery, 'focus', (e)=>jQuery._setActivePoint(e));
                    this.events.register(tooltip, 'touchend', (e)=>e.stopPropagation());
                    this.events.register(tooltip, 'mouseover', (e)=>jQuery._setActivePoint(e));
                    this.events.register(tooltip, 'mouseout', (e)=>jQuery._closeActivePoint(e));
                    this.events.register(tooltip, 'focus', (e)=>e.stopPropagation());
                }
            }
        },
        {
            key: "_positionElements",
            value: function _positionElements() {
                this.positionHotspots();
                this.positionTooltips();
            }
        },
        {
            key: "_setActivePoint",
            value: function _setActivePoint(jQuery) {
                jQuery.stopPropagation();
                const jQuery = jQuery.currentTarget;
                let jQuery = null;
                if (this.hoverTimer !== null) {
                    clearTimeout(this.hoverTimer);
                    this.hoverTimer = null;
                }
                jQuery = jQuery.closest('[data-hotspot]');
                if (jQuery.type === 'touchend' && jQuery.classList.contains(this.activeClass)) {
                    jQuery.classList.remove(this.activeClass);
                    return;
                }
                if (jQuery.type === 'click' && jQuery.classList.contains(this.activeClass)) {
                    return;
                }
                if (!jQuery.classList.contains(this.activeClass)) {
                    const jQuery = this.el.querySelector(`.${this.activeClass}`);
                    if (jQuery) {
                        jQuery.classList.remove(this.activeClass);
                    }
                    this.positionTooltips();
                    jQuery.classList.add(this.activeClass);
                }
            }
        },
        {
            key: "_closeActivePoint",
            value: function _closeActivePoint(e) {
                const _this2 = this;
                const jQuery = e.currentTarget;
                let jQuery = null;
                jQuery = jQuery.closest('[data-hotspot]');
                if (this.hoverTimer !== null) {
                    clearTimeout(this.hoverTimer);
                }
                this.hoverTimer = setTimeout(()=>{
                    jQuery.classList.remove(_this2.activeClass);
                }, this.tooltipDelay);
            }
        },
        {
            key: "_clearAllActive",
            value: function _clearAllActive() {
                const activeTooltip = this.el.querySelector(`.${this.activeClass}`);
                if (activeTooltip) {
                    activeTooltip.classList.remove(this.activeClass);
                }
            }
        },
        {
            key: "_resetTooltips",
            value: function _resetTooltips() {
                this.tooltips.forEach((tooltip)=>{
                    tooltip.classList.remove('tooltip--overflow-top');
                    tooltip.classList.remove('tooltip--overflow-right');
                    tooltip.classList.remove('tooltip--overflow-bottom');
                    tooltip.classList.remove('tooltip--overflow-left');
                    tooltip.style.top = null;
                    tooltip.style.right = null;
                    tooltip.style.bottom = null;
                    tooltip.style.left = null;
                });
            }
        },
        {
            key: "positionHotspots",
            value: function positionHotspots() {
                const _this3 = this;
                this.points.forEach((jQuery)=>{
                    const ySetting = parseInt(jQuery.dataset.hotspotYAxis, 10);
                    const xSetting = parseInt(jQuery.dataset.hotspotXAxis, 10);
                    const jQuery = jQuery.getBoundingClientRect();
                    const imageBounds = _this3.imageWrapper.getBoundingClientRect();
                    const yDifference = imageBounds.height - jQuery.height;
                    const yPercentage = yDifference / imageBounds.height * ySetting;
                    jQuery.style.bottom = `${yPercentage}%`;
                    const xDifference = imageBounds.width - jQuery.width;
                    const xPercentage = xDifference / imageBounds.width * xSetting;
                    jQuery.style.left = `${xPercentage}%`;
                    jQuery.style.visibility = 'visible';
                });
            }
        },
        {
            key: "positionTooltips",
            value: function positionTooltips() {
                const _this4 = this;
                this._resetTooltips();
                const imageWrapperRightBound = this.imageWrapper.getBoundingClientRect().right;
                this.tooltips.forEach((tooltip)=>{
                    const elementBounds = tooltip.getBoundingClientRect();
                    const style = window.getComputedStyle ? getComputedStyle(tooltip, null) : tooltip.currentStyle;
                    const marginTop = parseInt(style.marginTop, 10) || 0;
                    const marginRight = parseInt(style.marginRight, 10) || 0;
                    const marginBottom = parseInt(style.marginBottom, 10) || 0;
                    const marginLeft = parseInt(style.marginLeft, 10) || 0;
                    const topBounds = elementBounds.top - marginTop;
                    const rightBounds = elementBounds.right + marginRight;
                    const bottomBounds = elementBounds.bottom + marginBottom;
                    const leftBounds = elementBounds.left - marginLeft;
                    if (rightBounds >= imageWrapperRightBound) {
                        tooltip.classList.add('tooltip--overflow-right');
                        const difference = imageWrapperRightBound - rightBounds;
                        tooltip.style.left = `${difference}px`;
                    }
                    if (leftBounds <= 0) {
                        tooltip.classList.add('tooltip--overflow-left');
                        const _difference = Math.abs(leftBounds);
                        tooltip.style.left = `${_difference}px`;
                    }
                    if (topBounds <= 0) {
                        tooltip.classList.add('tooltip--overflow-top');
                    }
                    if (bottomBounds >= _this4.window.innerHeight) {
                        tooltip.classList.add('tooltip--overflow-bottom');
                        const _difference2 = _this4.window.innerHeight - bottomBounds;
                        tooltip.style.top = `${_difference2}px`;
                    }
                });
            }
        },
        {
            key: "onSectionBlockSelect",
            value: function onSectionBlockSelect(block) {
                const _this5 = this;
                this._clearAllActive();
                let scrollEvent = false;
                this.windowScrollEvent = this.events.register(this.window, 'scroll', ()=>{
                    scrollEvent = true;
                    if (_this5.windowScrollTimer !== null) {
                        clearTimeout(_this5.windowScrollTimer);
                    }
                    _this5.windowScrollTimer = setTimeout(()=>{
                        _this5.positionTooltips();
                        block.el.classList.add(_this5.activeClass);
                        _this5.windowScrollTimer = null;
                    }, 200);
                });
                if (scrollEvent === false) {
                    this.positionTooltips();
                    block.el.classList.add(this.activeClass);
                }
            }
        },
        {
            key: "onSectionBlockDeselect",
            value: function onSectionBlockDeselect(block) {
                this.events.unregister(this.windowScrollEvent);
                this.windowScrollEvent = null;
                block.el.classList.remove(this.activeClass);
            }
        },
        {
            key: "onSectionUnload",
            value: function onSectionUnload() {
                this.events.unregisterAll();
            }
        }
    ]);
    return ShoppableImage;
})();
;
class DynamicShoppableImage extends ShoppableImage {
    constructor(boolHook){
        super(boolHook);
        this.modalSelector = `[data-hotspot-modal-id='${boolHook.id}']`;
        this.modalEl = document.querySelector(this.modalSelector);
        this.modalWrapper = document.querySelector(`[data-hotspot-section-id='${boolHook.id}']`);
        this.quickShopSelector = `[data-hotspot-section-id='${boolHook.id}'] [data-hotspot-modal-quickshop]`;
        this.quickshopSpinner = this.modalEl.querySelector(this.quickShopSelector).innerHTML;
        this.isOpen = false;
        this.modalSidebar = this.modalWrapper.querySelector('[data-hotspot-modal-sidebar]');
        this.modalSidebarItems = this.modalWrapper.querySelectorAll('[data-hotspot-modal-sidebar-item]');
        this.sidebarArrow = this.modalEl.querySelector('[data-sidebar-arrow]');
        this.sidebarItemActiveClass = 'active-item';
        this.qsTrigger = null;
        this.modal = new jQuery({
            onClose: ()=>this.unload()
        });
        this.points.forEach((point)=>{
            this.events.register(point, 'animationend', (e)=>{
                if (e.animationName === 'slide-fade-y' && e.elapsedTime > 0) {
                    point.classList.add('shoppable-image__hotspot--pulse');
                    point.classList.remove('pxu-lia-element');
                    point.style.animationPlayState = '';
                }
            });
        });
        this.tooltips.forEach((tooltip)=>{
            this.events.register(tooltip, 'click', (e)=>this.onTooltipClick(e));
        });
        this.modalSidebarItems.forEach((item)=>{
            this.events.register(item, 'click', (e)=>this.onSidebarItemClick(e));
        });
    }
    onTooltipClick(event) {
        event.preventDefault();
        const productUrl = event.currentTarget.querySelector('[data-tooltip]').getAttribute('href');
        const productId = event.currentTarget.closest('[data-hotspot]').dataset.hotspotProduct;
        this.points.forEach((point)=>{
            if (point.dataset.hotspotProduct === productId) {
                this.qsTrigger = point;
            }
        });
        if (productUrl === '#') {
            return;
        }
        this.modal.open(this.modalSelector, 'quickshop-full hotspot__modal');
        const selectedItem = this.modalWrapper.querySelector(`[data-product-id='${productId}']`);
        selectedItem.classList.add(this.sidebarItemActiveClass);
        this.positionSidebarArrow(selectedItem);
        this.isOpen = true;
        this._fetchQuickshop(productId, productUrl);
    }
    onSidebarItemClick(jQuery) {
        jQuery.preventDefault();
        const currentSidebarItem = jQuery.currentTarget;
        const productUrl = currentSidebarItem.dataset.productQuickshopUrl;
        const productId = currentSidebarItem.dataset.productId;
        const activeSidebarItems = this.modalWrapper.querySelectorAll(`.${this.sidebarItemActiveClass}`);
        this.modalWrapper.querySelector('[data-hotspot-modal-quickshop]').innerHTML = this.quickshopSpinner;
        this.positionSidebarArrow(currentSidebarItem);
        activeSidebarItems.forEach((item)=>{
            item.classList.remove(this.sidebarItemActiveClass);
        });
        currentSidebarItem.classList.add(this.sidebarItemActiveClass);
        if (productUrl && productId) {
            this._fetchQuickshop(productId, productUrl);
        }
    }
    positionSidebarArrow(selectedItem) {
        const itemImg = selectedItem.querySelector('[data-modal-sidebar-image]');
        const imgBounds = itemImg.getBoundingClientRect();
        const selectedItemTop = selectedItem.offsetTop;
        const middlePoint = selectedItemTop + imgBounds.height / 2;
        this.sidebarArrow.style.top = `${middlePoint}px`;
    }
    _fetchQuickshop(productId, productUrl) {
        const quickshopContainer = this.modal.$modalInner[0].querySelector('[data-hotspot-modal-quickshop]');
        const $quickshopEl = this.modal.$modalInner.find('[data-hotspot-modal-sidebar-item]');
        const spinnerContainer = this.modalWrapper.querySelector('.productitem-quickshop');
        if (spinnerContainer) {
            spinnerContainer.style.display = 'block';
        }
        this.productQuickshop = new ProductQuickshop({
            $el: $quickshopEl,
            id: this.sectionId,
            modal: this.modal,
            sectionContext: 'shoppable-image',
            trigger: define_2()(this.qsTrigger),
            quickshopContainer,
            quickShopSelector: this.quickShopSelector,
            productUrl,
            view: 'product-shoppable-img-qs'
        });
    }
    unload() {
        if (this.productQuickshop) {
            this.productQuickshop.unload();
        }
        const activeSidebarItems = this.modalWrapper.querySelectorAll(`.${this.sidebarItemActiveClass}`);
        activeSidebarItems.forEach((item)=>{
            item.classList.remove(this.sidebarItemActiveClass);
        });
    }
}
;
class DynamicTestimonials {
    constructor(section){
        this.$el = section.el;
        this.$window = $(window);
        this.flickity = null;
        this.events = new proto_5.Z();
        this.carousel = this.$el.querySelector('.testimonials');
        this.slides = this.$el.querySelectorAll('.testimonial');
        this.onBreakpointChange = ()=>{
            if (jQuery_2.max('XS') && this.slides.length > 1 || jQuery_2.max('L') && this.slides.length >= 3 || jQuery_2.min('XL') && this.slides.length > 3) {
                this._initFlickity();
            } else {
                this._destroyFlickity();
            }
        };
        this.onBreakpointChange();
        jQuery_2.onChange(this.onBreakpointChange);
    }
    onSectionUnload() {
        this._destroyFlickity();
        jQuery_2.offChange(this.onBreakpointChange);
        this.events.unregisterAll();
    }
    _initFlickity() {
        if (this.Flickity) {
            return;
        }
        this.flickity = new (js_default())(this.carousel, {
            autoPlay: 0,
            accessibility: true,
            cellAlign: 'left',
            cellSelector: '.testimonial',
            groupCells: true,
            pageDots: true,
            contain: true,
            adaptiveHeight: false,
            arrowShape: 'M65.29 11.99L27.28 50L65.3 87.99L70.25 83.06L37.19 50L70.26 16.94L65.29 11.99Z'
        });
        this.events.register(this.carousel, 'rimg:load', ()=>{
            this.flickity.resize();
        });
    }
    _destroyFlickity() {
        if (!this.flickity) {
            return;
        }
        this.flickity.destroy();
        this.flickity = null;
    }
}
;
class Account {
    constructor(){
        this.$accountContents = define_2()('[data-template-account]');
        this.$loginContent = define_2()('[data-template-account-login]');
        this.$addressesContent = define_2()('[data-template-account-addresses]');
        this.$addressButtonFocus = null;
        this._loginToggle = this._loginToggle.bind(this);
        if (this.$loginContent.length) {
            this._initLoginPage();
        }
        if (this.$addressesContent.length) {
            this._initAddressPage();
        }
        if (this.$accountContents.length) {
            this._init();
        }
    }
    _init() {
        new Forms(this.$accountContents);
    }
    _initLoginPage() {
        this.$loginToggle = this.$loginContent.find('[data-login-toggle]');
        this.$login = this.$loginContent.find('[data-account-login-main]');
        this.$recovery = this.$loginContent.find('[data-account-login-recovery]');
        this.$recoveryHasMessage = this.$recovery.find('[data-recovery-has-message]');
        this.$loginToggle.on('click', this._loginToggle);
        if (this.$recoveryHasMessage.length) {
            this._loginToggle();
        }
    }
    _loginToggle(event = null) {
        if (event) {
            event.preventDefault();
        }
        this.$login.toggleClass('visible');
        this.$recovery.toggleClass('visible');
    }
    _initAddressPage() {
        const $customerAddresses = this.$addressesContent.find('[data-address-id]');
        this.$addressesContent.on('click', '[data-edit-address]', (jQuery)=>{
            const $target = define_2()(jQuery.currentTarget);
            const itemId = $target.attr('data-edit-address');
            $customerAddresses.removeClass('visible');
            this.$addressButtonFocus = $target;
            define_2()(`[data-address-id="${itemId}"]`).addClass('visible').find('.form-field-input').eq(0).focus();
        });
        this.$addressesContent.on('click', '[data-edit-address-cancel]', ()=>{
            $customerAddresses.removeClass('visible');
            define_2()('[data-address-id="new"]').addClass('visible');
            this.$addressButtonFocus.focus();
            this.$addressButtonFocus = null;
        });
        this.$addressesContent.on('click', '[data-delete-address]', (event)=>{
            const itemId = define_2()(event.target).attr('data-delete-address');
            Shopify.CustomerAddress.destroy(itemId, '');
        });
        $customerAddresses.each((i, el)=>{
            const id = define_2()(el).attr('data-address-id');
            const countryEl = `customer_addr_${id}_country`;
            const provinceEl = `customer_addr_${id}_province`;
            const options = {
                hideElement: `address_province_container_${id}`
            };
            new Shopify.CountryProvinceSelector(countryEl, provinceEl, options);
        });
    }
}
;
class Contact {
    constructor(){
        this.$contactContents = define_2()('[data-template-contact]');
        if (this.$contactContents.length) {
            new Forms(this.$contactContents);
        }
    }
}
;
class GiftCard {
    constructor(){
        this.el = document.querySelector('.template-giftcard');
        this.$el = define_2()(this.el);
        this.qrCode = this.el.querySelector('[data-giftcard-qr]');
        this.giftCardCode = this.el.querySelector('[data-giftcard-code]');
        this._bindEvents();
        this.addQrCode();
    }
    addQrCode() {
        return new QRCode(this.qrCode, {
            text: define_2()(this.qrCode).data('giftcard-qr'),
            width: 120,
            height: 120
        });
    }
    _bindEvents() {
        this.$el.on('click', '[data-giftcard-print]', ()=>{
            window.print();
        });
        this.$el.on('click', '[data-giftcard-code]', ()=>{
            this._selectText();
        });
    }
    _selectText() {
        let range = '';
        let selection;
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(this.giftCardCode);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(this.giftCardCode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
;
class Page {
    constructor(){
        this.$pageContent = define_2()('[data-template-page]');
        if (this.$pageContent.length) {
            new RichText(this.$pageContent);
        }
    }
}
;
class Order {
    constructor(){
        this.el = document.querySelector('.template-order');
        this.checkboxEls = this.el.querySelectorAll('[data-checkbox]');
        this.atcButton = this.el.querySelector('[data-atc-button]');
        this.selectAllCheckbox = this.el.querySelector('[data-select-all-checkbox]');
        this.selectAllCheckboxInput = this.el.querySelector('[data-select-all-checkbox-input]');
        this.selectItemsCountEl = this.el.querySelector('[data-select-items-count]');
        this.lineCheckboxInputs = this.el.querySelectorAll('[data-line-checkbox-input]');
        if (!this.selectAllCheckboxInput) {
            return;
        }
        this.lineCheckboxInputsArray = Array.from(this.lineCheckboxInputs);
        this.data = JSON.parse(this.el.querySelector('[data-order-line-items-data]').innerHTML);
        this.settings = JSON.parse(this.el.querySelector('[data-settings]').innerHTML);
        this.itemsToAddToCart = [];
        this.messageBanner = null;
        this.lastCheckedIndex = null;
        this.currentCheckedIndex = null;
        this.map = new Map();
        this.events = new proto_5.Z();
        this._init();
    }
    get _selectedLines() {
        return this.el.querySelectorAll('[data-line-checkbox-input]:checked');
    }
    get _allLineCheckboxesAreChecked() {
        return this.lineCheckboxInputsArray.filter((inputEl)=>!inputEl.checked).length === 0;
    }
    get _noCheckboxIsChecked() {
        return this.lineCheckboxInputsArray.filter((inputEl)=>inputEl.checked).length === 0;
    }
    _init() {
        this.checkboxEls.forEach((el)=>{
            this.map.set(el, new Checkbox(el));
        });
        this._bindCheckboxEvents();
        this.events.register(this.atcButton, 'click', (event)=>{
            this._selectItemsToAddToCart();
            this._addToCart(event);
        });
    }
    _bindCheckboxEvents() {
        this.events.register(this.selectAllCheckboxInput, 'change', ()=>{
            const isChecked = this.selectAllCheckboxInput.checked;
            this._onCheckboxChange(this.selectAllCheckboxInput, isChecked);
            this.lineCheckboxInputs.forEach((inputEl)=>{
                inputEl.checked = isChecked;
                this._onCheckboxChange(inputEl, isChecked);
            });
            this._onCheckboxStateUpdate();
        });
        this.lineCheckboxInputs.forEach((inputEl)=>{
            this.events.register(inputEl, 'change', ()=>{
                const isInputElChecked = inputEl.checked;
                this._onCheckboxChange(inputEl, isInputElChecked);
                if (isInputElChecked) {
                    this._updateCheckedIndexes(inputEl);
                }
                this._onCheckboxStateUpdate();
            });
        });
        this.events.register(document, 'click', (event)=>{
            if (!event.shiftKey || event.target.nodeName !== 'INPUT') {
                return;
            }
            window.requestAnimationFrame(()=>{
                if (this.lastCheckedIndex !== null && this.currentCheckedIndex !== null) {
                    const lastCheckedIndexState = this.lineCheckboxInputsArray[this.lastCheckedIndex].checked;
                    let jQuery = null;
                    let end = null;
                    if (this.lastCheckedIndex < this.currentCheckedIndex) {
                        jQuery = this.lastCheckedIndex;
                        end = this.currentCheckedIndex;
                    } else {
                        jQuery = this.currentCheckedIndex;
                        end = this.lastCheckedIndex;
                    }
                    for(let i = jQuery; i < end; i++){
                        const el = this.lineCheckboxInputsArray[i];
                        el.checked = lastCheckedIndexState;
                        this._onCheckboxChange(el, lastCheckedIndexState);
                    }
                    this._onCheckboxStateUpdate();
                    this._resetCheckedIndexes();
                }
            });
        });
    }
    _updateCheckedIndexes(el) {
        if (this.lastCheckedIndex === null) {
            this.lastCheckedIndex = this.lineCheckboxInputsArray.indexOf(el);
        } else {
            this.currentCheckedIndex = this.lineCheckboxInputsArray.indexOf(el);
        }
    }
    _resetCheckedIndexes() {
        this.lastCheckedIndex = null;
        this.currentCheckedIndex = null;
    }
    _onCheckboxChange(el, isChecked, isIndeterminate = false) {
        const targetEl = el.parentElement;
        if (isChecked) {
            this.map.get(targetEl).unsetIndeterminate();
            this.map.get(targetEl).check();
            el.closest('[data-order-row]')?.classList.add('checkbox-selected');
        } else if (isIndeterminate) {
            this.map.get(targetEl).uncheck();
            this.map.get(targetEl).setIndeterminate();
            el.closest('[data-order-row]')?.classList.add('checkbox-selected');
        } else {
            this.map.get(targetEl).uncheck();
            this.map.get(targetEl).unsetIndeterminate();
            el.closest('[data-order-row]')?.classList.remove('checkbox-selected');
        }
    }
    _onCheckboxStateUpdate() {
        let isChecked = false;
        let isIndeterminate = false;
        if (this._allLineCheckboxesAreChecked) {
            isChecked = true;
            isIndeterminate = false;
        } else if (!this._noCheckboxIsChecked) {
            isChecked = false;
            isIndeterminate = true;
        }
        this.selectAllCheckboxInput.checked = isChecked;
        this.selectAllCheckboxInput.indeterminate = isIndeterminate;
        this._onCheckboxChange(this.selectAllCheckboxInput, isChecked, isIndeterminate);
        if (this._noCheckboxIsChecked) {
            this._disableAtcButton();
            this.selectAllCheckbox.classList.remove('order-checkbox--active');
        } else {
            this._enableAtcButton();
            this.selectAllCheckbox.classList.add('order-checkbox--active');
            this.selectItemsCountEl.textContent = this._selectedLines.length;
        }
    }
    _selectItemsToAddToCart() {
        this.itemsToAddToCart.length = 0;
        const selectedOrderIds = [];
        this._selectedLines.forEach((line)=>{
            selectedOrderIds.push(Number(line.getAttribute('data-line-item-id')));
        });
        this.data.forEach((jQuery)=>{
            if (selectedOrderIds.includes(jQuery.id)) {
                this.itemsToAddToCart.push({
                    id: jQuery.variant_id,
                    quantity: jQuery.quantity,
                    selling_plan: jQuery.selling_plan_allocation ? jQuery.selling_plan_allocation.selling_plan.id : null
                });
            }
        });
    }
    _addToCart(event) {
        event.stopPropagation();
        this._setAtcButtonProcessing();
        const formData = {
            items: this.itemsToAddToCart
        };
        fetch(`${window.Theme.routes.cart_add_url}.js`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>{
            this._removeAtcButtonProcessing();
            if (data.message === 'Cart Error') {
                return Promise.reject(data);
            }
            return this._onSuccess();
        }).catch((error)=>{
            this._showErrorBanner(error.description);
        });
    }
    _onSuccess() {
        return fetch(`${window.Theme.routes.cart_url}.js`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        }).then((data)=>{
            if (this.settings.cart_redirection) {
                location.href = window.Theme.routes.cart_url;
                return;
            }
            const countEvent = new CustomEvent('cartcount:update', {
                detail: data
            });
            window.dispatchEvent(countEvent);
            this._showSuccessBanner(this.settings.success_message);
        }).catch((error)=>{
            this._showErrorBanner(error.message);
        });
    }
    _showSuccessBanner(successMsg) {
        this.messageBanner = new proto_6(successMsg, 'success');
    }
    _showErrorBanner(errorMsg) {
        this.messageBanner = new proto_6(errorMsg, 'error');
    }
    _enableAtcButton() {
        this.atcButton.classList.remove('disabled');
        this.atcButton.disabled = false;
    }
    _disableAtcButton() {
        this.atcButton.classList.add('disabled');
        this.atcButton.disabled = true;
    }
    _removeAtcButtonProcessing() {
        this.atcButton.classList.remove('processing');
        this.atcButton.disabled = false;
    }
    _setAtcButtonProcessing() {
        this.atcButton.classList.add('processing');
        this.atcButton.disabled = true;
    }
}
;
class BackToTop {
    constructor(el){
        this.el = el;
        const label = this.el.querySelector('.back-to-top__button-label');
        this.events = new proto_5.Z();
        this.animations = {
            button: animations_es_transition({
                el
            }),
            label: animations_es_transition({
                el: label,
                state: 'hidden'
            })
        };
        this.scrollThreshold = 0.3;
        this.events.register(this.el, 'click', ()=>this._scrollToTop());
        this.events.register(this.el, 'mouseenter', ()=>this._onHover());
        this.events.register(this.el, 'mouseleave', ()=>this._onHoverEnd());
        this.events.register(window, 'scroll', throttle(()=>this._onScroll(), 100));
    }
    get scrollPosition() {
        return window.scrollY / (document.body.offsetHeight - window.innerHeight);
    }
    _onScroll() {
        if (jQuery_2.max('S')) {
            return;
        }
        if (this.scrollPosition >= this.scrollThreshold) {
            this.animations.button.animateTo('visible');
        } else {
            this.animations.button.animateTo('hidden');
        }
    }
    _onHover() {
        if (jQuery_2.max('S')) {
            return;
        }
        this.animations.label.animateTo('visible', {
            onStart: ({ el: jQuery })=>{
                const { scrollWidth: jQuery } = jQuery;
                const adjustedScrollWidth = parseInt(jQuery, 10) + 8;
                jQuery.style.setProperty('--open-width', `${adjustedScrollWidth}px`);
            }
        });
    }
    _onHoverEnd() {
        if (jQuery_2.max('S')) {
            return;
        }
        this.animations.label.animateTo('hidden');
    }
    _scrollToTop() {
        document.activeElement.blur();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    unload() {
        this.events.unregisterAll();
        this.animations.button.unload();
        this.animations.label.unload();
        this.animations = null;
    }
}
;
class ProductCompareDrawerContent {
    constructor(el){
        this.el = el;
        this.events = new proto_5.Z();
        this.initialHTML = this.el.innerHTML;
        this.productTemplate = this.el.querySelector('[data-product-compare-drawer-item-template]');
        this.events.register(this.el, 'click', (e)=>{
            const compareDrawerRemoveButton = e.target.closest('[data-product-compare-drawer-remove]');
            if (compareDrawerRemoveButton) {
                this._removeProduct(compareDrawerRemoveButton.dataset.productCompareDrawerRemove);
            }
        });
        const onUpdate = ({ products })=>{
            this._reset();
            if (!products.length) {
                this.el.scroll(0, 0);
            }
            products.forEach((product)=>this._addProduct(product));
            rimg_shopify_dist_index_es.watch(this.el);
        };
        onUpdate({
            products: components_ProductCompare.products
        });
        components_ProductCompare.runOnUpdate(onUpdate);
    }
    unload() {
        this.events.unregisterAll();
    }
    _reset() {
        rimg_shopify_dist_index_es.unwatch(this.el);
        this.el.innerHTML = this.initialHTML;
    }
    _addProduct({ handle, data }) {
        const newProduct = this.productTemplate.cloneNode(true).content;
        const newProductFragment = new DocumentFragment();
        const compareDrawerTitle = newProduct.querySelector('[data-product-compare-drawer-title]');
        const compareDrawerImage = newProduct.querySelector('[data-product-compare-drawer-image]');
        const compareDrawerRemove = newProduct.querySelector('[data-product-compare-drawer-remove]');
        const compareDrawerItemPlaceholder = this.el.querySelector('[data-product-compare-drawer-item-placeholder]');
        compareDrawerTitle.innerHTML = data.title;
        compareDrawerTitle.href = data.url;
        compareDrawerRemove.dataset.productCompareDrawerRemove = handle;
        compareDrawerImage.innerHTML = data.image;
        compareDrawerImage.style.setProperty('--product-grid-item-image-aspect-ratio', data.imageAspectRatio);
        newProductFragment.append(newProduct);
        this.el.insertBefore(newProductFragment, compareDrawerItemPlaceholder);
        if (compareDrawerItemPlaceholder) {
            compareDrawerItemPlaceholder.remove();
        }
    }
    _removeProduct(handle) {
        components_ProductCompare.remove(handle);
    }
}
;
const ProductCompareFlyout_storageKey = 'pxuProductCompareFlyoutV1';
class ProductCompareFlyout {
    constructor(el){
        this.el = el;
        this.events = new proto_5.Z();
        this.compareDrawerLink = this.el.querySelector('[data-product-compare-drawer-link]');
        this.compareDrawerLinkHref = this.compareDrawerLink.href;
        this.compareDrawerClearAllButton = this.el.querySelector('[data-product-compare-clear-all]');
        this.compareDrawerTitle = this.el.querySelector('[data-product-compare-drawer-title]');
        this.compareDrawerNotification = this.el.querySelector('[data-product-compare-drawer-notification]');
        this.compareDrawerCountOne = this.compareDrawerNotification.dataset.productCountOne;
        this.compareDrawerCountOther = this.compareDrawerNotification.dataset.productCountOther;
        this.compareDrawerHeader = this.el.querySelector('[data-product-compare-drawer-header]');
        this.compareDrawerContent = new ProductCompareDrawerContent(this.el.querySelector('[data-compare-drawer-items-container]'));
        this.preferredState = this._loadPreferredState() || 'open';
        this.drawerAnimation = animations_es_transition({
            state: 'hidden',
            el: this.el
        });
        this.events.register(window, 'resize', ()=>{
            if (this.drawerAnimation.state === 'hidden') {
                return;
            }
            this._updateDrawerPosition();
        });
        this.events.register(this.compareDrawerHeader, 'click', ()=>{
            if (this.drawerAnimation.state === 'open') {
                this._savePreferredState('closed');
                this._closeDrawer();
            } else {
                this._savePreferredState('open');
                this._openDrawer();
            }
        });
        this.events.register(this.compareDrawerClearAllButton, 'click', ()=>{
            components_ProductCompare.removeAll();
        });
        let lastUpdateCount = components_ProductCompare.products.length;
        const onUpdate = ({ products })=>{
            if (products.length > 0) {
                if (products.length > lastUpdateCount) {
                    this._openDrawer();
                    this._savePreferredState('open');
                } else {
                    this._showDrawer();
                }
            } else {
                this._hideDrawer();
            }
            lastUpdateCount = products.length;
            this._updateDrawerCompareLink();
            this._updateDrawerNotification();
        };
        onUpdate({
            products: components_ProductCompare.products
        });
        components_ProductCompare.runOnUpdate(onUpdate);
    }
    unload() {
        this.events.unregisterAll();
        this.compareDrawerContent.unload();
        this.drawerAnimation.unload();
    }
    _showDrawer() {
        this.drawerAnimation.animateTo(this.preferredState, {
            onStart: ()=>{
                this._updateDrawerPosition();
            }
        });
    }
    _openDrawer() {
        this.drawerAnimation.animateTo('open', {
            onStart: ()=>{
                this._updateDrawerPosition();
            }
        });
        this._updateDrawerCompareLink();
        this._updateDrawerNotification();
    }
    _hideDrawer() {
        this.drawerAnimation.animateTo('hidden');
    }
    _closeDrawer() {
        this.drawerAnimation.animateTo('closed');
        this._updateDrawerCompareLink();
        this._updateDrawerNotification();
    }
    _updateDrawerPosition() {
        this.el.style.setProperty('--compare-drawer-header-height', `${this.compareDrawerHeader.offsetHeight}px`);
    }
    _updateDrawerNotification() {
        if (components_ProductCompare.products.length === 1) {
            this.compareDrawerNotification.innerHTML = this.compareDrawerCountOne;
        } else {
            const compareDrawerNotificationString = this.compareDrawerCountOther.replace('** count **', components_ProductCompare.products.length);
            this.compareDrawerNotification.innerHTML = compareDrawerNotificationString;
        }
    }
    _updateDrawerCompareLink() {
        const compareDrawerLinkText = this.compareDrawerLink.dataset.productCompareDrawerLinkText;
        const separator = /\/$/.test(this.compareDrawerLinkHref) ? '' : '/';
        const [firstProduct, ...otherProducts] = components_ProductCompare.products;
        if (components_ProductCompare.products.length > 1) {
            this.compareDrawerLink.classList.remove('disabled');
        } else {
            this.compareDrawerLink.classList.add('disabled');
        }
        if (components_ProductCompare.products.length > 0) {
            this.compareDrawerLink.innerHTML = `${compareDrawerLinkText} (${components_ProductCompare.products.length})`;
        } else {
            this.compareDrawerLink.innerHTML = `${compareDrawerLinkText}`;
        }
        if (!firstProduct) {
            return;
        }
        const otherProductHandles = otherProducts.map(({ handle })=>handle).join(',');
        this.compareDrawerLink.href = `${this.compareDrawerLinkHref}${separator}products/${firstProduct.handle}?view=compare&compare=${otherProductHandles}`;
    }
    _loadPreferredState() {
        try {
            return JSON.parse(sessionStorage.getItem(ProductCompareFlyout_storageKey));
        } catch (e) {
            return null;
        }
    }
    _savePreferredState(state) {
        this.preferredState = state;
        sessionStorage.setItem(ProductCompareFlyout_storageKey, JSON.stringify(state));
    }
}
;
const flickityTouchFix = ()=>{
    let touchingSlider = false;
    let touchStartCoordsX = 0;
    const onTouchStart = (e)=>{
        if (e.target.closest && e.target.closest('.flickity-slider')) {
            touchingSlider = true;
            touchStartCoordsX = e.touches[0].pageX;
        } else {
            touchingSlider = false;
        }
    };
    const onTouchMove = (e)=>{
        if (!(touchingSlider && e.cancelable)) {
            return;
        }
        if (Math.abs(e.touches[0].pageX - touchStartCoordsX) > 10) {
            e.preventDefault();
        }
    };
    document.body.addEventListener('touchstart', onTouchStart);
    document.body.addEventListener('touchmove', onTouchMove, {
        passive: false
    });
};
;
function setTooltipOffset(target) {
    const margin = 10;
    const { innerWidth } = window;
    const { x, width } = target.getBoundingClientRect();
    const tooltipWidth = parseFloat(window.getComputedStyle(target, ':after').width);
    const required = tooltipWidth * 0.5;
    let available = 0;
    let offset = 0;
    if (x < innerWidth * 0.5) {
        available = x + width * 0.5 - margin;
        offset = required - available;
    } else {
        available = innerWidth - x - width * 0.5 - margin;
        offset = available - required;
    }
    target.style.setProperty('--swatch-tooltip-offset', `${required >= available ? offset : 0}px`);
}
function handleMouseover({ target }) {
    if (target.dataset && !target.dataset.swatchTooltip) {
        return;
    }
    window.requestAnimationFrame(()=>setTooltipOffset(target));
}
class ContainSwatchTooltips {
    constructor(){
        window.addEventListener('mouseover', handleMouseover);
    }
    unload() {
        window.removeEventListener('mouseover', handleMouseover);
    }
}
;
const LoadInAnimations_classes = {
    block: 'pxu-lia-block',
    element: 'pxu-lia-element',
    playBlock: 'pxu-lia-block--play',
    resetBlock: 'pxu-lia-block--reset',
    playSection: 'pxu-lia-section--play',
    resetSection: 'pxu-lia-section--reset'
};
const mappingSelector = '[type="application/pxs-animation-mapping+json"]';
const getMappingParentFromBlock = ({ parentNode })=>{
    if (parentNode.querySelector(mappingSelector)) {
        return parentNode;
    }
    return getMappingParentFromBlock(parentNode);
};
const LoadInAnimations_reset = (block, elements)=>{
    block.style.animationName = 'none';
    block.classList.add(LoadInAnimations_classes.resetBlock);
    elements.forEach((element)=>{
        element.style.animationName = 'none';
    });
};
const removeReset = (block, elements)=>{
    block.style.animationName = '';
    block.classList.remove(LoadInAnimations_classes.resetBlock);
    elements.forEach((jQuery)=>{
        jQuery.style.animationName = '';
    });
};
const play = (block, elements)=>{
    block.style.animationPlayState = 'running';
    block.classList.add(LoadInAnimations_classes.playBlock);
    elements.forEach((element)=>{
        element.style.animationPlayState = 'running';
    });
};
const pause = (block, elements)=>{
    block.style.animationPlayState = '';
    block.classList.remove(LoadInAnimations_classes.playBlock);
    elements.forEach((element)=>{
        element.style.animationPlayState = '';
    });
};
const loadInAnimations = (blocks, state = 'play')=>{
    const callNextFrame = [];
    if (state === 'reset') {
        blocks.forEach((block)=>{
            const elements = block.querySelectorAll(`.${LoadInAnimations_classes.element}`);
            pause(block, elements);
            LoadInAnimations_reset(block, elements);
            callNextFrame.push(()=>{
                removeReset(block, elements);
            });
        });
        const section = getMappingParentFromBlock(blocks[0]);
        section.classList.remove(LoadInAnimations_classes.playSection);
        section.classList.add(LoadInAnimations_classes.resetSection);
        callNextFrame.push(()=>{
            section.classList.remove(LoadInAnimations_classes.resetSection);
        });
    } else {
        blocks.forEach((block, blockIndex)=>{
            block.style.setProperty('--pxu-lia-outer-sequence', blockIndex);
            const elements = block.querySelectorAll(`.${LoadInAnimations_classes.element}`);
            elements.forEach((element, elementIndex)=>{
                element.style.setProperty('--pxu-lia-inner-sequence', elementIndex);
            });
            if (block.classList.contains(LoadInAnimations_classes.playBlock)) {
                LoadInAnimations_reset(block, elements);
                callNextFrame.push(()=>{
                    removeReset(block, elements);
                    play(block, elements);
                });
            } else {
                play(block, elements);
            }
            const section = getMappingParentFromBlock(blocks[0]);
            if (section.classList.contains(LoadInAnimations_classes.playSection)) {
                section.classList.add(LoadInAnimations_classes.resetSection);
                callNextFrame.push(()=>{
                    section.classList.remove(LoadInAnimations_classes.resetSection);
                    section.classList.add(LoadInAnimations_classes.playSection);
                });
            } else {
                section.classList.add(LoadInAnimations_classes.playSection);
            }
        });
    }
    window.requestAnimationFrame(()=>callNextFrame.forEach((fn)=>fn()));
};
const playLoadInAnimations = (blocks)=>loadInAnimations(blocks, 'play');
const intersectionCallback = (entries, observer)=>{
    const originAnchor = new Map();
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            const originAnchor = getMappingParentFromBlock(entry.target);
            const originAnchor = originAnchor.get(originAnchor);
            originAnchor.set(originAnchor, originAnchor ? [
                ...originAnchor,
                entry.target
            ] : [
                entry.target
            ]);
        }
    });
    originAnchor.forEach((blocks, parent)=>playLoadInAnimations(blocks, parent));
};
let blockObserver = null;
const initLoadInAnimationsAutoplay = ()=>{
    blockObserver = new IntersectionObserver(intersectionCallback, {
        threshold: 0.3
    });
    if (!('reduceAnimations' in document.body.dataset)) {
        const observe = (parent)=>{
            parent.querySelectorAll(`.${LoadInAnimations_classes.block}`).forEach((block)=>blockObserver.observe(block));
        };
        observe(document);
    }
};
;
const initEmpire = ()=>{
    initLoadInAnimationsAutoplay();
    rimg_shopify_dist_index_es.init('[data-rimg="lazy"]', {
        round: 1
    });
    const initRipple = ()=>setupRippleEffect(document);
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(initRipple);
    } else {
        initRipple();
    }
    const sections = new Sections();
    // sections.register('static-header', (section)=>new StaticHeader(section));
    sections.register('static-announcement', (section)=>new StaticAnnouncement(section));
    sections.register('static-footer', (section)=>new StaticFooter(section));
    sections.register('static-article', (section)=>new StaticArticle(section));
    sections.register('static-blog', (section)=>new StaticBlog(section));
    sections.register('static-cart', (section)=>new StaticCart(section));
    sections.register('static-collection', (section)=>new StaticCollection(section));
    sections.register('static-collection-faceted-filters', (section)=>new FacetedFilterCollection(section));
    sections.register('static-subcollections-menu', (section)=>new StaticSubCollectionsMenuList(section));
    sections.register('static-password', (section)=>new StaticPassword(section));
    sections.register('static-product', (section)=>new StaticProduct(section));
    sections.register('static-product-compare', (section)=>new StaticProductCompare(section));
    sections.register('static-product-recommendations', (section)=>new StaticProductRecommendations(section));
    sections.register('static-recently-viewed', (section)=>new StaticRecentlyViewed(section));
    sections.register('static-search', (section)=>new StaticSearch(section));
    sections.register('static-search-faceted-filters', (section)=>new FacetedFilterSearch(section));
    sections.register('static-utility-bar', (section)=>new StaticUtilityBar(section));
    sections.register('static-subcollections-featured-collection', (section)=>new StaticSubcollectionsFeaturedCollection(section));
    sections.register('dynamic-blog-posts', (section)=>new DynamicTwitterFeed(section), {
        lazy: true
    });
    sections.register('dynamic-promo-mosaic', (section)=>new DynamicPromoBlocks(section), {
        lazy: true
    });
    sections.register('dynamic-menu-list', (section)=>new DynamicMenuList(section), {
        lazy: true
    });
    sections.register('dynamic-collection-list', (section)=>new DynamicCollectionList(section), {
        lazy: true
    });
    sections.register('dynamic-countdown-timer', (section)=>new DynamicCountdownTimer(section), {
        lazy: true
    });
    sections.register('dynamic-featured-collection', (section)=>new DynamicFeaturedCollection(section), {
        lazy: true
    });
    sections.register('dynamic-featured-product', (section)=>new DynamicProduct(section), {
        lazy: true
    });
    sections.register('dynamic-rich-text', (section)=>new DynamicRichText(section), {
        lazy: true
    });
    sections.register('dynamic-page', (section)=>new DynamicRichText(section), {
        lazy: true
    });
    sections.register('dynamic-custom-liquid', (section)=>new DynamicRichText(section), {
        lazy: true
    });
    sections.register('dynamic-html', (section)=>new DynamicRichText(section), {
        lazy: true
    });
    sections.register('dynamic-search', (section)=>new DynamicSearch(section), {
        lazy: true
    });
    sections.register('dynamic-highlights-banner', (section)=>new DynamicHighlightsBanner(section));
    sections.register('dynamic-video', (section)=>new DynamicVideo(section), {
        lazy: true
    });
    sections.register('pxs-newsletter', (section)=>new DynamicNewsletter(section), {
        lazy: true
    });
    sections.register('pxs-map', (section)=>new dist_index_es(section), {
        lazy: true
    });
    sections.register('pxs-shoppable-image', (section)=>new DynamicShoppableImage(section), {
        lazy: false
    });
    sections.register('dynamic-testimonials', (section)=>new DynamicTestimonials(section), {
        lazy: true
    });
    sections.register('age-gate', (section)=>new PageAgeGate(section));
    sections.register('pxs-faq', (section)=>new index_es(section));
    if (document.body.classList.contains('template-giftcard')) {
        new GiftCard();
    }
    if (document.querySelector('[data-template-account]')) {
        new Account();
    }
    if (document.querySelector('[data-template-contact]')) {
        new Contact();
    }
    if (document.body.classList.contains('template-page')) {
        new Page();
    }
    if (document.body.classList.contains('template-order')) {
        new Order();
    }
    if (document.querySelector('[data-swatch-tooltip]')) {
        new ContainSwatchTooltips();
    }
    const compareDrawer = document.querySelector('[data-product-compare-drawer]');
    if (compareDrawer) {
        new ProductCompareFlyout(compareDrawer);
    }
    const backToTop = document.querySelector('[data-back-to-top]');
    if (backToTop) {
        new BackToTop(backToTop);
    }
};
flickityTouchFix();
if (checkPolyfills.length) {
    utils()(checkPolyfills, initEmpire);
} else {
    initEmpire();
}
const ageGatePage = document.getElementById('age-gate-page');
if (ageGatePage) {
    new SiteAgeGate(ageGatePage);
}
