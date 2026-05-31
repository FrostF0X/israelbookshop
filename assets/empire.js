/******/(()=>{// webpackBootstrap
/******/var __webpack_modules__={/***/646:/***/function(){},/***/766:/***/function(){},/***/263:/***/function(){},/***/970:/***/function(){},/***/186:/***/function(){},/***/722:/***/function(){},/***/741:/***/function(){},/***/158:/***/function(){},/***/729:/***/function(){},/***/47:/***/function(){},/***/597:/***/function(){},/***/880:/***/function(){},/***/229:/***/function(){},/***/690:/***/function(){},/***/217:/***/function(){},/***/442:/***/function(){},/***/227:/***/function(){},/***/573:/***/function(){},/***/516:/***/function(){},/***/410:/***/function(){},/***/714:/***/function(){},/***/131:/***/function(){},/***/458:/***/function(){},/***/755:/***/function(){},/***/405:/***/function(){},/***/277:/***/function(){},/***/265:/***/function(){},/***/842:/***/function(){},/***/704:/***/function(){},/***/529:/***/function(){}/******/};/************************************************************************//******/// The module cache
/******/var __webpack_module_cache__={};/******//******/// The require function
/******/function __webpack_require__(moduleId){/******/// Check if module is in cache
/******/if(__webpack_module_cache__[moduleId]){/******/return __webpack_module_cache__[moduleId].exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var module=__webpack_module_cache__[moduleId]={};/******//******/// Execute the module function
/******/__webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//************************************************************************//******//* webpack/runtime/compat get default export *//******/(()=>{/******/// getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=module=>{/******/var getter=module&&module.__esModule?/******/()=>module['default']:/******/()=>module;/******/__webpack_require__.d(getter,{});/******/return getter;/******/};/******/})();/******//******//* webpack/runtime/define property getters *//******/(()=>{/******/// define getter functions for harmony exports
/******/__webpack_require__.d=(exports,definition)=>{/******/for(var key in definition){/******/if(__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)){/******/Object.defineProperty(exports,key,{});/******/}/******/}/******/};/******/})();/******//******//* webpack/runtime/global *//******/(()=>{/******/__webpack_require__.g=function(){/******/if(typeof globalThis==='object')return globalThis;/******/try{/******/return this||new Function('return this')();/******/}catch(e){/******/if(typeof window==='object')return window;/******/}/******/}();/******/})();/******//******//* webpack/runtime/hasOwnProperty shorthand *//******/(()=>{/******/__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop);/******/})();/******//************************************************************************/(()=>{"use strict";// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery=__webpack_require__(755);var jquery_default=/*#__PURE__*/__webpack_require__.n(jquery);;// CONCATENATED MODULE: ./source/scripts/globals/jquery.js
// jQuery plugins expect to find a global `jQuery` object, so we
// need to attach it to the window.
//
// This is in its own file because we have to attach it before any
// other imports happen, but with ES6 modules, all `import`s have
// to be at the top.
window.jQuery=jquery_default();window.$=jquery_default();// EXTERNAL MODULE: ./node_modules/@pixelunion/jquery-trend/jquery.trend.js
var jquery_trend=__webpack_require__(186);// EXTERNAL MODULE: ./node_modules/@pixelunion/jquery-revealer/jquery.revealer.js
var jquery_revealer=__webpack_require__(970);// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script=__webpack_require__(277);var script_default=/*#__PURE__*/__webpack_require__.n(script);;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-faq/dist/index.es.js
/*!
 * @pixelunion/pxs-faq v2.0.0
 * (c) 2023 Pixel Union
 */var EventHandler_1=createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var EventHandler=unwrapExports(EventHandler_1);/*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  *//**
 * Promisified version of window.requestAnimationFrame.
 * @returns {Promise} Promise will resolve when requestAnimationFrame callback is run.
 *//**
 * Represents an HTML element with associate states
 */var Animation=/*#__PURE__*/function(){/**
   * @param {Object} options
   * @param {HTMLElement}  options.el Target element
   * @param {String} [options.state=initial] Initial state. This is also the default state.
   * @param {String} [options.stateAttribute=data-revealer] Attribute name to update with state.
   * @param {String} [options.stateChangeAttribute=data-revealer-transition] Attribute name to
   * update with change of state.
   * @param {String} [options.endEvent=transitionend] Event to listen for at end of state change.
   * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
   * next state change.
   * @param {Function} [options.onStart] Callback to execute immediate after
   * applying stateChangeAttribute.
   *//**
   * Returns target element
   *
   * @return {HTMLElement} Target element
   */_createClass$1(Animation,[{/**
     * Check if a state is active
     * @param {String} state State to compare
     *
     * @return {Boolean}
     */value:function(){}/**
     * Sequences a change to a new state.
     * @param {String} state Target state
     *
     * @param {Boolean} options.force Switch to final state immediately
     *
     * @param {Function} options.onStart Callback to execute immediately after
     * applying stateChangeAttribute for this state change only.
     *
     * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
     * next state change.
     *
     * @return {Promise} Resolves when endEvent triggered
     */},{value:function(){}/**
     * Remove any event listeners
     */},{value:function(){}},{get:function(){}/**
     * Returns current state
     *
     * @return {String} Current state
     */},{get:function(){}}]);return Animation;}();var justDebounce=debounce;var FAQ=/*#__PURE__*/function(){_createClass(FAQ,[{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}}]);return FAQ;}();/* harmony default export */const index_es=FAQ;;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-map/dist/index.es.js
/*!
 * @pixelunion/pxs-map v3.2.0
 * (c) 2024 Pixel Union
 *//*
 * Function to convert any given latitude and longitude format to decimal degrees
 *//*
 * By providing the ability to use a place name, or latitude and longitude coordinates
 * we give merchants, and our demo stores the option to bypass the Geocoding API.
 * The Geocoding API (https://developers.google.com/maps/documentation/geocoding/usage-and-billing) allows us
 * to take a place name and convert it to latitude and longitude expressed in decimal degrees.
 */var PxsMap=function PxsMap(section){var _this=this;index_es_classCallCheck(this,PxsMap);this.map=null;var el=section.el.querySelector('[data-map]');var container=el.querySelector('[data-map-container]');var settings=section.data;var address=settings.address,colors=settings.colors;var apiKey=settings.api_key;// Scale so range is 12 ~ 17, rather than 1 to 6
var zoom=Number.isNaN(settings.zoom)?13:11+parseInt(settings.zoom,10);if(apiKey){if(window.googleMaps===undefined){script_default()("https://maps.googleapis.com/maps/api/js?key=".concat(apiKey),function(){window.googleMaps=true;createMap({}).then(function(map){_this.map=map;})["catch"](function(error){return displayErrorInThemeEditor(container,error);});});}else{createMap({}).then(function(map){_this.map=map;})["catch"](function(error){return displayErrorInThemeEditor(container,error);});}}};/* harmony default export */const dist_index_es=PxsMap;;// CONCATENATED MODULE: ./node_modules/@pixelunion/age-gate/dist/index.es.js
/*!
 * @pixelunion/age-gate v1.1.2
 * (c) 2025 Pixel Union
 */var scrollLock=__webpack_require__(265);var isbot=__webpack_require__(458);var SiteAgeGate=/*#__PURE__*/function(){index_es_createClass(SiteAgeGate,[{value:function(){}},{value:function(){}},{value:function(){}}]);return SiteAgeGate;}();var PageAgeGate=/*#__PURE__*/function(){index_es_createClass(PageAgeGate,[{value:function(){}},{value:function(){}},{value:function(){}}]);return PageAgeGate;}();;// CONCATENATED MODULE: ./node_modules/@pixelunion/rimg-shopify/dist/index.es.js
/*!
 * @pixelunion/rimg-shopify v2.7.1
 * (c) 2023 Pixel Union
 *//*!
 * @pixelunion/rimg v2.2.2
 * (c) 2022 Pixel Union
 *//**
 * The default template render function. Turns a template string into an image
 * URL.
 *
 * @param {String} template
 * @param {Size} size
 * @returns {String}
 *//**
 * @type Settings
 */var defaults={};/**
 * Get a data attribute value from an element, with a default fallback and
 * sanitization step.
 *
 * @param {Element} el
 *
 * @param {String} name
 *        The data attribute name.
 *
 * @param {Object} options
 *        An object holding fallback values if the data attribute does not
 *        exist. If this object doesn't have the property, we further fallback
 *        to our defaults.
 *
 * @param {Function} [sanitize]
 *        A function to sanitize the data attribute value with.
 *
 * @returns {String|*}
 *//**
 * Sanitize data attributes that represent a size (in the form of `10x10`).
 *
 * @param {String} value
 * @returns {Object} An object with `width` and `height` properties.
 *//**
 * Sanitize crop values to ensure they are valid, or null
 *
 * @param {String} value
 * @returns {Object} Shopify crop parameter ('top', 'center', 'bottom', 'left', 'right') or null, if an unsupported value is found
 *//**
 * Loads information about an element.
 *
 * Options can be set on the element itself using data attributes, or through
 * the `options` parameter. Data attributes take priority.
 *
 * @param {HTMLElement} el
 * @param {Settings} options
 * @returns {Item}
 *//**
 * Round to the nearest multiple.
 *
 * This is so we don't tax the image server too much.
 *
 * @param {Number} size The size, in pixels.
 * @param {Number} [multiple] The multiple to round to the nearest.
 * @param {Number} [maxLimit] Maximum allowed value - value to return if rounded multiple is above this limit
 * @returns {Number}
 *//**
 * Get the size of an element.
 *
 * If it is too small, it's parent element is checked, and so on. This helps
 * avoid the situation where an element doesn't have a size yet or is positioned
 * out of the layout.
 *
 * @param {HTMLElement} el
 * @return {Object} size
 * @return {Number} size.width The width, in pixels.
 * @return {Number} size.height The height, in pixels.
 *//**
 * Return the maximum supported density of the image, given the container.
 *
 * @param {Item} item
 * @param {Size} size
 *//**
 * Trigger a custom event.
 *
 * Note: this approach is deprecated, but still required to support older
 * browsers such as IE 10.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
 *
 * @param {HTMLElement} el
 *        The element to trigger the event on.
 *
 * @param {String} name
 *        The event name.
 *
 * @returns {Boolean}
 *          True if the event was canceled.
 *//**
 * Set the image URL on the element. Supports background images and `srcset`.
 *
 * @param {Item} item
 * @param {Size} size
 * @param {Boolean} isPlaceholder
 *//**
 * Load the image, set loaded status, and trigger the load event.
 *
 * @fires rimg:load
 * @fires rimg:error
 * @param {Item} item
 * @param {Size} size
 *//**
 * Load in a responsive image.
 *
 * Sets the image's `srcset` attribute to the final image URLs, calculated based
 * on the actual size the image is being shown at.
 *
 * @fires rimg:loading
 *        The image URLs have been set and we are waiting for them to load.
 *
 * @fires rimg:loaded
 *        The final image has loaded.
 *
 * @fires rimg:error
 *        The final image failed loading.
 *
 * @param {Item} item
 *//**
 * Prepare an element to be displayed on the screen.
 *
 * Images have special logic applied to them to swap out the different sources.
 *
 * @fires rimg:enter
 *        The element is entering the viewport.
 *
 * @param {HTMLElement} el
 * @param {Settings} options
 *//**
 * Reset an element's state so that its image can be recalculated.
 *
 * @fires rimg:update
 *        The element is being updated.
 *
 * @param {HTMLElement} el
 * @param {Settings} options
 *//**
 * Returns true if the element is within the viewport.
 * @param {HTMLElement} el
 * @returns {Boolean}
 *//**
 * @typedef {Object} Size
 * @property {Number} width
 * @property {Number} height
 *//**
 * A function to turn a template string into a URL.
 *
 * @callback TemplateRenderer
 * @param {String} template
 * @param {Size} size
 * @returns {String}
 *//**
 * @typedef {Object} Settings
 *
 * @property {String} [template]
 *           A template string used to generate URLs for an image. This allows us to
 *           dynamically load images with sizes to match the container's size.
 *
 * @property {TemplateRenderer} [templateRender]
 *           A function to turn a template string into a URL.
 *
 * @property {Size} [max]
 *           The maximum available size for the image. This ensures we don't
 *           try to load an image larger than is possible.
 * 
 * @property {Number} [scale]
 *           A number to scale the final image dimensions by. 
 *           Only applies to lazy-loaded images. Defaults to 1.
 *
 * @property {Number} [round]
 *           Round image dimensions to the nearest multiple. This is intended to
 *           tax the image server less by lowering the number of possible image
 *           sizes requested.
 *
 * @property {Size} [placeholder]
 *           The size of the lo-fi image to load before the full image.
 * 
 * @property {String} [crop]
 *           Crop value; null if image is uncropped, otherwise equal 
 *           to the Shopify crop parameter ('center', 'top', etc.).
 *//**
 * Initialize the responsive image handler.
 *
 * @param {String|HTMLElement|NodeList} selector
 *        The CSS selector, element, or elements to track for lazy-loading.
 *
 * @param {Settings} options
 *
 * @returns {PublicApi}
 *//**
 * Finds a group of elements on the page.
 *
 * @param {String|HTMLElement|NodeList} selector
 * @returns {Object} An array-like object.
 *//**
 * Polyfill for Element.matches().
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 */if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;while(--i>=0&&matches.item(i)!==this){}return i>-1;};}var state={};/**
 * Track an element, and its children.
 *
 * @param {HTMLElement} el
 *//**
 * Untrack an element, and its children
 *
 * @param {HTMLElement} el
 * @private
 *//**
 * Manually load an image
 *
 * @param {HTMLElement} el
 *//**
 * Update an element, and its children.
 *
 * @param {HTMLElement} el
 *//* harmony default export */const rimg_shopify_dist_index_es=state;;// CONCATENATED MODULE: ./source/scripts/Sections.js
/* eslint-disable max-classes-per-file *//**
 * Allows a callback to be run once, when a target intersects the viewport.
 * @constructor
 * @param {Object} [options] options with which to construct the IntersectionObserver
 * @param {string} [options.rootMargin='30%'] A string which specifies a set of offsets to add to
 *                                          the root's bounding_box when calculating intersections.
 * @param {number} [options.threshold=0] Ratio of intersection required to trigger callback
 */;// CONCATENATED MODULE: ./source/scripts/checkPolyfills.js
const polyfillUrls=[];// Checks if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if(!('IntersectionObserver'in window&&'IntersectionObserverEntry'in window&&'intersectionRatio'in window.IntersectionObserverEntry.prototype)){polyfillUrls.push(document.querySelector('[data-scripts]').dataset.pxuPolyfills);}// Polyfill NodeList.forEach if required.
// Polyfill is so small it doesn't need to load any external code.
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=Array.prototype.forEach;}if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;do{if(Element.prototype.matches.call(el,s))return el;el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}/* harmony default export */const checkPolyfills=polyfillUrls;;// CONCATENATED MODULE: ./source/scripts/sections/StaticAnnouncement.js
// EXTERNAL MODULE: ./node_modules/fitvids/index.js
var fitvids=__webpack_require__(729);var fitvids_default=/*#__PURE__*/__webpack_require__.n(fitvids);// EXTERNAL MODULE: ./node_modules/@pixelunion/grouped-content/dist/index.js
var dist=__webpack_require__(263);var dist_default=/*#__PURE__*/__webpack_require__.n(dist);;// CONCATENATED MODULE: ./source/scripts/components/RichText.js
;// CONCATENATED MODULE: ./source/scripts/Forms.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticArticle.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticBlog.js
// EXTERNAL MODULE: ./node_modules/just-debounce/index.js
var just_debounce=__webpack_require__(405);var just_debounce_default=/*#__PURE__*/__webpack_require__.n(just_debounce);;// CONCATENATED MODULE: ./node_modules/morphdom/dist/morphdom-esm.js
var DOCUMENT_FRAGMENT_NODE=11;var range;// Create a range object for efficently rendering strings to elements.
var NS_XHTML='http://www.w3.org/1999/xhtml';var doc=typeof document==='undefined'?undefined:document;var HAS_TEMPLATE_SUPPORT=!!doc&&'content'in doc.createElement('template');var HAS_RANGE_SUPPORT=!!doc&&doc.createRange&&'createContextualFragment'in doc.createRange();/**
 * This is about the same
 * var html = new DOMParser().parseFromString(str, 'text/html');
 * return html.body.firstChild;
 *
 * @method toElement
 * @param {String} str
 *//**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 *//**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 *//**
 * Copies the children of one DOM element to another DOM element
 */var specialElHandlers={OPTION:function(){},/**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */INPUT:function(){},TEXTAREA:function(){},SELECT:function(){}};var ELEMENT_NODE=1;var DOCUMENT_FRAGMENT_NODE$1=11;var TEXT_NODE=3;var COMMENT_NODE=8;var morphdom=morphdomFactory(morphAttrs);/* harmony default export */const morphdom_esm=morphdom;;// CONCATENATED MODULE: ./node_modules/@shopify/theme-addresses/theme-addresses.js
/**
 * CountryProvinceSelector Constructor
 * @param {String} countryOptions the country options in html string
 *//**
 * Builds the country and province selector with the given node element
 * @param {Node} countryNodeElement The <select> element for country
 * @param {Node} provinceNodeElement The <select> element for province
 * @param {Object} options Additional settings available
 * @param {CountryProvinceSelector~onCountryChange} options.onCountryChange callback after a country `change` event
 * @param {CountryProvinceSelector~onProvinceChange} options.onProvinceChange callback after a province `change` event
 */CountryProvinceSelector.prototype.build=function(countryNodeElement,provinceNodeElement,options){if(typeof countryNodeElement!=='object'){throw new TypeError(countryNodeElement+' is not a object.');}if(typeof provinceNodeElement!=='object'){throw new TypeError(provinceNodeElement+' is not a object.');}var defaultValue=countryNodeElement.getAttribute('data-default');options=options||{};countryNodeElement.innerHTML=this.countryOptions;countryNodeElement.value=defaultValue;if(defaultValue&&getOption(countryNodeElement,defaultValue)){var provinces=buildProvince(countryNodeElement,provinceNodeElement,defaultValue);options.onCountryChange&&options.onCountryChange(provinces,provinceNodeElement,countryNodeElement);}// Listen for value change on the country select
countryNodeElement.addEventListener('change',function(event){var target=event.target;var selectedValue=target.value;var provinces=buildProvince(target,provinceNodeElement,selectedValue);options.onCountryChange&&options.onCountryChange(provinces,provinceNodeElement,countryNodeElement);});options.onProvinceChange&&provinceNodeElement.addEventListener('change',options.onProvinceChange);};/**
 * This callback is called after a user interacted with a country `<select>`
 * @callback CountryProvinceSelector~onCountryChange
 * @param {array} provinces the parsed provinces
 * @param {Node} provinceNodeElement province `<select>` element
 * @param {Node} countryNodeElement country `<select>` element
 *//**
 * This callback is called after a user interacted with a province `<select>`
 * @callback CountryProvinceSelector~onProvinceChange
 * @param {Event} event the province selector `change` event object
 *//**
 * Returns the <option> with the specified value from the
 * given node element
 * A null is returned if no such <option> is found
 *//**
 * Builds the options for province selector
 *//**
 * Builds the province selector
 */;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-asyncview/dist/index.es.js
/*!
   * @pixelunion/shopify-asyncview v3.0.0
   * (c) 2020 Pixel Union
  */var deferred={};var AsyncView=/*#__PURE__*/function(){dist_index_es_createClass(AsyncView,null,[{/**
     * Load the template given by the provided URL into the provided
     * view
     *
     * @param {string} url - The url to load
     * @param {string} sectionId - The ID of the section to load
     * @param {object} [options] - Configuration options
     * @param {string} [options.hash] - A hash used to cache content
     * @param {object} [options.query] - An object containing additional query parameters of the URL
     */value:function(){}}]);return AsyncView;}();/* harmony default export */const shopify_asyncview_dist_index_es=AsyncView;// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var dist_EventHandler=__webpack_require__(766);;// CONCATENATED MODULE: ./source/scripts/helpers/QuantitySelector.js
;// CONCATENATED MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
/*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  *//**
 * Promisified version of window.requestAnimationFrame.
 * @returns {Promise} Promise will resolve when requestAnimationFrame callback is run.
 *//**
 * Represents an HTML element with associate states
 */var animations_es_Animation=/*#__PURE__*/function(){/**
   * @param {Object} options
   * @param {HTMLElement}  options.el Target element
   * @param {String} [options.state=initial] Initial state. This is also the default state.
   * @param {String} [options.stateAttribute=data-revealer] Attribute name to update with state.
   * @param {String} [options.stateChangeAttribute=data-revealer-transition] Attribute name to
   * update with change of state.
   * @param {String} [options.endEvent=transitionend] Event to listen for at end of state change.
   * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
   * next state change.
   * @param {Function} [options.onStart] Callback to execute immediate after
   * applying stateChangeAttribute.
   *//**
   * Returns target element
   *
   * @return {HTMLElement} Target element
   */animations_es_createClass(Animation,[{/**
     * Check if a state is active
     * @param {String} state State to compare
     *
     * @return {Boolean}
     */value:function(){}/**
     * Sequences a change to a new state.
     * @param {String} state Target state
     *
     * @param {Boolean} options.force Switch to final state immediately
     *
     * @param {Function} options.onStart Callback to execute immediately after
     * applying stateChangeAttribute for this state change only.
     *
     * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
     * next state change.
     *
     * @return {Promise} Resolves when endEvent triggered
     */},{value:function(){}/**
     * Remove any event listeners
     */},{value:function(){}},{get:function(){}/**
     * Returns current state
     *
     * @return {String} Current state
     */},{get:function(){}}]);return Animation;}();/**
 * Manage state changes for a set of elements
 */var AnimationsManager=/*#__PURE__*//* unused pure expression or super */null&&function(){/**
   * Add a new element and return an animation for that element. If element already has an associated animation, return that animation.
   * @param {Object} options
   * @param {HTMLElement}  options.el Target element
   * @param {String} [options.state=initial] Initial state. This is also the default state.
   * @param {String} [options.stateAttribute=data-revealer] Attribute name to update with state.
   * @param {String} [options.stateChangeAttribute=data-revealer-transition] Attribute name to update with change of state.
   * @param {String} [options.endEvent=transitionend] Event name to listen for at end of state change.
   * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the next state change.
   * @param {Function} [options.onStart] Callback to execute immediate after applying stateChangeAttribute.
   *
   * @return {Animation}
   */animations_es_createClass(AnimationsManager,[{value:function(){}/**
     * Remove a single animation
     * @param {Animation} animation Animation to remove. Any event listeners will also be removed.
     */},{value:function(){}/**
     * Remove all animations, including all event listeners.
     */},{value:function(){}}]);return AnimationsManager;}();;// CONCATENATED MODULE: ./source/scripts/components/MessageBanner.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticCart.js
// EXTERNAL MODULE: ./node_modules/@pixelunion/breakpoint/dist/cjs/index.js
var cjs=__webpack_require__(646);// EXTERNAL MODULE: ./node_modules/flickity/js/index.js
var js=__webpack_require__(442);var js_default=/*#__PURE__*/__webpack_require__.n(js);;// CONCATENATED MODULE: ./source/scripts/helpers/throttle.js
;// CONCATENATED MODULE: ./source/scripts/Layout.js
const eventHandlers=[];let previousBreakpoint=null;jquery_default()(window).on('resize',throttle(event=>{const currentBreakpoint=getBreakpoint();if(previousBreakpoint!==currentBreakpoint){eventHandlers.forEach(eventHandler=>{eventHandler(event,{});});}previousBreakpoint=currentBreakpoint;},100));/* harmony default export */const Layout={};;// CONCATENATED MODULE: ./source/scripts/helpers/LazyLoader.js
/**
 * Allows a callback to be run once, when a target intersects the viewport.
 * @constructor
 * @param {HTMLElement} target Element to track
 * @param {Function} callback Function to execute when target enters viewport (only executed once)
 * @param {Object} [options] options with which to construct the IntersectionObserver
 * @param {string} [options.rootMargin='30%'] A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
 * @param {number} [options.threshold=0] Ratio of intersection required to trigger callback
 */// EXTERNAL MODULE: ./node_modules/vanilla-modal/dist/index.js
var vanilla_modal_dist=__webpack_require__(529);var vanilla_modal_dist_default=/*#__PURE__*/__webpack_require__.n(vanilla_modal_dist);;// CONCATENATED MODULE: ./node_modules/@shopify/theme-a11y/theme-a11y.js
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 *//**
 * Moves focus to an HTML element
 * eg for In-page links, after scroll, focus shifts to content area so that
 * next `tab` is where user expects. Used in bindInPageLinks()
 * eg move focus to a modal that is opened. Used in trapFocus()
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 *//**
 * If there's a hash in the url, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - Selector for elements to not include.
 *//**
 * When an in-page (url w/hash) link is clicked, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - CSS selector for elements to not include.
 *//**
 * Traps the focus in a particular container
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Element} elementToFocus - Element to be focused on first
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 */var trapFocusHandlers={};/**
 * Removes the trap of focus from the page
 *//**
 * Add a preventive message to external links and links that open to a new window.
 * @param {string} elements - Specific elements to be targeted
 * @param {object} options.messages - Custom messages to overwrite with keys: newWindow, external, newWindowExternal
 * @param {string} options.messages.newWindow - When the link opens in a new window (e.g. target="_blank")
 * @param {string} options.messages.external - When the link is to a different host domain.
 * @param {string} options.messages.newWindowExternal - When the link is to a different host domain and opens in a new window.
 * @param {object} options.prefix - Prefix to namespace "id" of the messages
 */;// CONCATENATED MODULE: ./source/scripts/helpers/ScrollLock.js
const{}=document;const html=document.querySelector('html');;// CONCATENATED MODULE: ./source/scripts/components/Modal.js
let openModals=[];const unlockScrollLock=()=>{if(openModals.length===0){ScrollLock.unlock();}};// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-variants-ui/dist/index.es.js
var shopify_variants_ui_dist_index_es=__webpack_require__(722);;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-surface-pick-up/dist/index.es.js
const LOCAL_STORAGE_KEY='pxu-shopify-surface-pick-up';const loadingClass='surface-pick-up--loading';const isNotExpired=timestamp=>timestamp+1000*60*60>=Date.now();const removeTrailingSlash=s=>s.replace(/(.*)\/$/,'$1');// Haversine Distance
// The haversine formula is an equation giving great-circle distances between
// two points on a sphere from their longitudes and latitudes
/* harmony default export */const shopify_surface_pick_up_dist_index_es=SurfacePickUp;;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-gift-card-recipient-form/dist/index.es.js
/*!
 * @pixelunion/pxs-gift-card-recipient-form v1.1.0
 * (c) 2024 Pixel Union
 */var index_es_EventHandler_1=index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var index_es_EventHandler=index_es_unwrapExports(index_es_EventHandler_1);/*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  *//**
 * Promisified version of window.requestAnimationFrame.
 * @returns {Promise} Promise will resolve when requestAnimationFrame callback is run.
 *//**
 * Represents an HTML element with associate states
 */var index_es_Animation=/*#__PURE__*/function(){/**
   * @param {Object} options
   * @param {HTMLElement}  options.el Target element
   * @param {String} [options.state=initial] Initial state. This is also the default state.
   * @param {String} [options.stateAttribute=data-revealer] Attribute name to update with state.
   * @param {String} [options.stateChangeAttribute=data-revealer-transition] Attribute name to
   * update with change of state.
   * @param {String} [options.endEvent=transitionend] Event to listen for at end of state change.
   * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
   * next state change.
   * @param {Function} [options.onStart] Callback to execute immediate after
   * applying stateChangeAttribute.
   *//**
   * Returns target element
   *
   * @return {HTMLElement} Target element
   */pxs_gift_card_recipient_form_dist_index_es_createClass(Animation,[{/**
     * Check if a state is active
     * @param {String} state State to compare
     *
     * @return {Boolean}
     */value:function(){}/**
     * Sequences a change to a new state.
     * @param {String} state Target state
     *
     * @param {Boolean} options.force Switch to final state immediately
     *
     * @param {Function} options.onStart Callback to execute immediately after
     * applying stateChangeAttribute for this state change only.
     *
     * @param {Boolean} [options.hold=false] If true, changeAttribute will not be removed until the
     * next state change.
     *
     * @return {Promise} Resolves when endEvent triggered
     */},{value:function(){}/**
     * Remove any event listeners
     */},{value:function(){}},{get:function(){}/**
     * Returns current state
     *
     * @return {String} Current state
     */},{get:function(){}}]);return Animation;}();/* harmony default export */const pxs_gift_card_recipient_form_dist_index_es=RecipientForm;;// CONCATENATED MODULE: ./source/scripts/helpers/Images.js
;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** *//* global Reflect, Promise */var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||{}instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};var __assign=function(){__assign=Object.assign||function __assign(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};;;;// CONCATENATED MODULE: ./node_modules/@material/base/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var MDCFoundation=/** @class */function(){Object.defineProperty(MDCFoundation,"cssClasses",{get:function(){}});Object.defineProperty(MDCFoundation,"strings",{get:function(){}});Object.defineProperty(MDCFoundation,"numbers",{get:function(){}});Object.defineProperty(MDCFoundation,"defaultAdapter",{get:function(){}});MDCFoundation.prototype.init=function(){// Subclasses should override this method to perform initialization routines (registering events, etc.)
};MDCFoundation.prototype.destroy=function(){// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
};return MDCFoundation;}();// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */const foundation=/* unused pure expression or super */null&&MDCFoundation;//# sourceMappingURL=foundation.js.map
;// CONCATENATED MODULE: ./node_modules/@material/base/component.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var MDCComponent=/** @class */function(){MDCComponent.attachTo=function(root){// Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
// returns an instantiated component with its root set to that element. Also note that in the cases of
// subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
// from getDefaultFoundation().
return new MDCComponent(root,new MDCFoundation({}));};/* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */MDCComponent.prototype.initialize=function(){var _args=[];for(var _i=0;_i<arguments.length;_i++){_args[_i]=arguments[_i];}// Subclasses can override this to do any additional setup work that would be considered part of a
// "constructor". Essentially, it is a hook into the parent constructor before the foundation is
// initialized. Any additional arguments besides root and foundation will be passed in here.
};MDCComponent.prototype.getDefaultFoundation=function(){// Subclasses must override this method to return a properly configured foundation class for the
// component.
throw new Error('Subclasses must override getDefaultFoundation to return a properly configured '+'foundation class');};MDCComponent.prototype.initialSyncWithDOM=function(){// Subclasses should override this method if they need to perform work to synchronize with a host DOM
// object. An example of this would be a form control wrapper that needs to synchronize its internal state
// to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
// reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
};MDCComponent.prototype.destroy=function(){// Subclasses may implement this method to release any resources / deregister any listeners they have
// attached. An example of this might be deregistering a resize event from the window object.
this.foundation_.destroy();};MDCComponent.prototype.listen=function(evtType,handler,options){this.root_.addEventListener(evtType,handler,options);};MDCComponent.prototype.unlisten=function(evtType,handler,options){this.root_.removeEventListener(evtType,handler,options);};/**
     * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
     */MDCComponent.prototype.emit=function(evtType,evtData,shouldBubble){if(shouldBubble===void 0){shouldBubble=false;}var evt;if(typeof CustomEvent==='function'){evt=new CustomEvent(evtType,{});}else{evt=document.createEvent('CustomEvent');evt.initCustomEvent(evtType,shouldBubble,false,evtData);}this.root_.dispatchEvent(evt);};return MDCComponent;}();// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */const component=/* unused pure expression or super */null&&MDCComponent;//# sourceMappingURL=component.js.map
;// CONCATENATED MODULE: ./node_modules/@material/dom/events.js
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *//**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 *///# sourceMappingURL=events.js.map
;// CONCATENATED MODULE: ./node_modules/@material/dom/ponyfill.js
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *//**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 *//**
 * Used to compute the estimated scroll width of elements. When an element is
 * hidden due to display: none; being applied to a parent element, the width is
 * returned as 0. However, the element will have a true width once no longer
 * inside a display: none context. This method computes an estimated width when
 * the element is hidden or returns the true width when the element is visble.
 * @param {Element} element the element whose width to estimate
 *///# sourceMappingURL=ponyfill.js.map
;// CONCATENATED MODULE: ./node_modules/@material/ripple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var cssClasses={};var strings={};var numbers={};//# sourceMappingURL=constants.js.map
;// CONCATENATED MODULE: ./node_modules/@material/ripple/util.js
/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */var supportsCssVariables_;//# sourceMappingURL=util.js.map
;// CONCATENATED MODULE: ./node_modules/@material/ripple/foundation.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES=['touchstart','pointerdown','mousedown','keydown'];// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES=['touchend','pointerup','mouseup','contextmenu'];// simultaneous nested activations
var activatedTargets=[];var MDCRippleFoundation=/** @class */function(_super){__extends(MDCRippleFoundation,_super);Object.defineProperty(MDCRippleFoundation,"cssClasses",{get:function(){}});Object.defineProperty(MDCRippleFoundation,"strings",{get:function(){}});Object.defineProperty(MDCRippleFoundation,"numbers",{get:function(){}});Object.defineProperty(MDCRippleFoundation,"defaultAdapter",{get:function(){}});MDCRippleFoundation.prototype.init=function(){var _this=this;var supportsPressRipple=this.supportsPressRipple_();this.registerRootHandlers_(supportsPressRipple);if(supportsPressRipple){var _a=MDCRippleFoundation.cssClasses,ROOT_1=_a.ROOT,UNBOUNDED_1=_a.UNBOUNDED;requestAnimationFrame(function(){_this.adapter_.addClass(ROOT_1);if(_this.adapter_.isUnbounded()){_this.adapter_.addClass(UNBOUNDED_1);// Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
_this.layoutInternal_();}});}};MDCRippleFoundation.prototype.destroy=function(){var _this=this;if(this.supportsPressRipple_()){if(this.activationTimer_){clearTimeout(this.activationTimer_);this.activationTimer_=0;this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);}if(this.fgDeactivationRemovalTimer_){clearTimeout(this.fgDeactivationRemovalTimer_);this.fgDeactivationRemovalTimer_=0;this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);}var _a=MDCRippleFoundation.cssClasses,ROOT_2=_a.ROOT,UNBOUNDED_2=_a.UNBOUNDED;requestAnimationFrame(function(){_this.adapter_.removeClass(ROOT_2);_this.adapter_.removeClass(UNBOUNDED_2);_this.removeCssVars_();});}this.deregisterRootHandlers_();this.deregisterDeactivationHandlers_();};/**
     * @param evt Optional event containing position information.
     */MDCRippleFoundation.prototype.activate=function(evt){this.activate_(evt);};MDCRippleFoundation.prototype.deactivate=function(){this.deactivate_();};MDCRippleFoundation.prototype.layout=function(){var _this=this;if(this.layoutFrame_){cancelAnimationFrame(this.layoutFrame_);}this.layoutFrame_=requestAnimationFrame(function(){_this.layoutInternal_();_this.layoutFrame_=0;});};MDCRippleFoundation.prototype.setUnbounded=function(unbounded){var UNBOUNDED=MDCRippleFoundation.cssClasses.UNBOUNDED;if(unbounded){this.adapter_.addClass(UNBOUNDED);}else{this.adapter_.removeClass(UNBOUNDED);}};MDCRippleFoundation.prototype.handleFocus=function(){var _this=this;requestAnimationFrame(function(){return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);});};MDCRippleFoundation.prototype.handleBlur=function(){var _this=this;requestAnimationFrame(function(){return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);});};/**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     */MDCRippleFoundation.prototype.supportsPressRipple_=function(){return this.adapter_.browserSupportsCssVars();};MDCRippleFoundation.prototype.defaultActivationState_=function(){return{};};/**
     * supportsPressRipple Passed from init to save a redundant function call
     */MDCRippleFoundation.prototype.registerRootHandlers_=function(supportsPressRipple){var _this=this;if(supportsPressRipple){ACTIVATION_EVENT_TYPES.forEach(function(evtType){_this.adapter_.registerInteractionHandler(evtType,_this.activateHandler_);});if(this.adapter_.isUnbounded()){this.adapter_.registerResizeHandler(this.resizeHandler_);}}this.adapter_.registerInteractionHandler('focus',this.focusHandler_);this.adapter_.registerInteractionHandler('blur',this.blurHandler_);};MDCRippleFoundation.prototype.registerDeactivationHandlers_=function(evt){var _this=this;if(evt.type==='keydown'){this.adapter_.registerInteractionHandler('keyup',this.deactivateHandler_);}else{POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType){_this.adapter_.registerDocumentInteractionHandler(evtType,_this.deactivateHandler_);});}};MDCRippleFoundation.prototype.deregisterRootHandlers_=function(){var _this=this;ACTIVATION_EVENT_TYPES.forEach(function(evtType){_this.adapter_.deregisterInteractionHandler(evtType,_this.activateHandler_);});this.adapter_.deregisterInteractionHandler('focus',this.focusHandler_);this.adapter_.deregisterInteractionHandler('blur',this.blurHandler_);if(this.adapter_.isUnbounded()){this.adapter_.deregisterResizeHandler(this.resizeHandler_);}};MDCRippleFoundation.prototype.deregisterDeactivationHandlers_=function(){var _this=this;this.adapter_.deregisterInteractionHandler('keyup',this.deactivateHandler_);POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType){_this.adapter_.deregisterDocumentInteractionHandler(evtType,_this.deactivateHandler_);});};MDCRippleFoundation.prototype.removeCssVars_=function(){var _this=this;var rippleStrings=MDCRippleFoundation.strings;var keys=Object.keys(rippleStrings);keys.forEach(function(key){if(key.indexOf('VAR_')===0){_this.adapter_.updateCssVariable(rippleStrings[key],null);}});};MDCRippleFoundation.prototype.activate_=function(evt){var _this=this;if(this.adapter_.isSurfaceDisabled()){return;}var activationState=this.activationState_;if(activationState.isActivated){return;}// Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
var previousActivationEvent=this.previousActivationEvent_;var isSameInteraction=previousActivationEvent&&evt!==undefined&&previousActivationEvent.type!==evt.type;if(isSameInteraction){return;}activationState.isActivated=true;activationState.isProgrammatic=evt===undefined;activationState.activationEvent=evt;activationState.wasActivatedByPointer=activationState.isProgrammatic?false:evt!==undefined&&(evt.type==='mousedown'||evt.type==='touchstart'||evt.type==='pointerdown');var hasActivatedChild=evt!==undefined&&activatedTargets.length>0&&activatedTargets.some(function(target){return _this.adapter_.containsEventTarget(target);});if(hasActivatedChild){// Immediately reset activation state, while preserving logic that prevents touch follow-on events
this.resetActivationState_();return;}if(evt!==undefined){activatedTargets.push(evt.target);this.registerDeactivationHandlers_(evt);}activationState.wasElementMadeActive=this.checkElementMadeActive_(evt);if(activationState.wasElementMadeActive){this.animateActivation_();}requestAnimationFrame(function(){// Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
activatedTargets=[];if(!activationState.wasElementMadeActive&&evt!==undefined&&(evt.key===' '||evt.keyCode===32)){// If space was pressed, try again within an rAF call to detect :active, because different UAs report
// active states inconsistently when they're called within event handling code:
// - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
// - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
// We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
// variable is set within a rAF callback for a submit button interaction (#2241).
activationState.wasElementMadeActive=_this.checkElementMadeActive_(evt);if(activationState.wasElementMadeActive){_this.animateActivation_();}}if(!activationState.wasElementMadeActive){// Reset activation state immediately if element was not made active.
_this.activationState_=_this.defaultActivationState_();}});};MDCRippleFoundation.prototype.checkElementMadeActive_=function(evt){return evt!==undefined&&evt.type==='keydown'?this.adapter_.isSurfaceActive():true;};MDCRippleFoundation.prototype.animateActivation_=function(){var _this=this;var _a=MDCRippleFoundation.strings,VAR_FG_TRANSLATE_START=_a.VAR_FG_TRANSLATE_START,VAR_FG_TRANSLATE_END=_a.VAR_FG_TRANSLATE_END;var _b=MDCRippleFoundation.cssClasses,FG_DEACTIVATION=_b.FG_DEACTIVATION,FG_ACTIVATION=_b.FG_ACTIVATION;var DEACTIVATION_TIMEOUT_MS=MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var translateStart='';var translateEnd='';if(!this.adapter_.isUnbounded()){var _c=this.getFgTranslationCoordinates_(),startPoint=_c.startPoint,endPoint=_c.endPoint;translateStart=startPoint.x+"px, "+startPoint.y+"px";translateEnd=endPoint.x+"px, "+endPoint.y+"px";}this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START,translateStart);this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END,translateEnd);// Cancel any ongoing activation/deactivation animations
clearTimeout(this.activationTimer_);clearTimeout(this.fgDeactivationRemovalTimer_);this.rmBoundedActivationClasses_();this.adapter_.removeClass(FG_DEACTIVATION);// Force layout in order to re-trigger the animation.
this.adapter_.computeBoundingRect();this.adapter_.addClass(FG_ACTIVATION);this.activationTimer_=setTimeout(function(){return _this.activationTimerCallback_();},DEACTIVATION_TIMEOUT_MS);};MDCRippleFoundation.prototype.getFgTranslationCoordinates_=function(){var _a=this.activationState_,activationEvent=_a.activationEvent,wasActivatedByPointer=_a.wasActivatedByPointer;var startPoint;if(wasActivatedByPointer){startPoint=getNormalizedEventCoords(activationEvent,this.adapter_.getWindowPageOffset(),this.adapter_.computeBoundingRect());}else{startPoint={};}// Center the element around the start point.
startPoint={};var endPoint={};return{};};MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_=function(){var _this=this;// This method is called both when a pointing device is released, and when the activation animation ends.
// The deactivation animation should only run after both of those occur.
var FG_DEACTIVATION=MDCRippleFoundation.cssClasses.FG_DEACTIVATION;var _a=this.activationState_,hasDeactivationUXRun=_a.hasDeactivationUXRun,isActivated=_a.isActivated;var activationHasEnded=hasDeactivationUXRun||!isActivated;if(activationHasEnded&&this.activationAnimationHasEnded_){this.rmBoundedActivationClasses_();this.adapter_.addClass(FG_DEACTIVATION);this.fgDeactivationRemovalTimer_=setTimeout(function(){_this.adapter_.removeClass(FG_DEACTIVATION);},numbers.FG_DEACTIVATION_MS);}};MDCRippleFoundation.prototype.rmBoundedActivationClasses_=function(){var FG_ACTIVATION=MDCRippleFoundation.cssClasses.FG_ACTIVATION;this.adapter_.removeClass(FG_ACTIVATION);this.activationAnimationHasEnded_=false;this.adapter_.computeBoundingRect();};MDCRippleFoundation.prototype.resetActivationState_=function(){var _this=this;this.previousActivationEvent_=this.activationState_.activationEvent;this.activationState_=this.defaultActivationState_();// Touch devices may fire additional events for the same interaction within a short time.
// Store the previous event until it's safe to assume that subsequent events are for new interactions.
setTimeout(function(){return _this.previousActivationEvent_=undefined;},MDCRippleFoundation.numbers.TAP_DELAY_MS);};MDCRippleFoundation.prototype.deactivate_=function(){var _this=this;var activationState=this.activationState_;// This can happen in scenarios such as when you have a keyup event that blurs the element.
if(!activationState.isActivated){return;}var state=__assign({},activationState);if(activationState.isProgrammatic){requestAnimationFrame(function(){return _this.animateDeactivation_(state);});this.resetActivationState_();}else{this.deregisterDeactivationHandlers_();requestAnimationFrame(function(){_this.activationState_.hasDeactivationUXRun=true;_this.animateDeactivation_(state);_this.resetActivationState_();});}};MDCRippleFoundation.prototype.animateDeactivation_=function(_a){var wasActivatedByPointer=_a.wasActivatedByPointer,wasElementMadeActive=_a.wasElementMadeActive;if(wasActivatedByPointer||wasElementMadeActive){this.runDeactivationUXLogicIfReady_();}};MDCRippleFoundation.prototype.layoutInternal_=function(){var _this=this;this.frame_=this.adapter_.computeBoundingRect();var maxDim=Math.max(this.frame_.height,this.frame_.width);// Surface diameter is treated differently for unbounded vs. bounded ripples.
// Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
// to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
// square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
// (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
// `overflow: hidden`.
var getBoundedRadius=function(){var hypotenuse=Math.sqrt(Math.pow(_this.frame_.width,2)+Math.pow(_this.frame_.height,2));return hypotenuse+MDCRippleFoundation.numbers.PADDING;};this.maxRadius_=this.adapter_.isUnbounded()?maxDim:getBoundedRadius();// Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
var initialSize=Math.floor(maxDim*MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);// Unbounded ripple size should always be even number to equally center align.
if(this.adapter_.isUnbounded()&&initialSize%2!==0){this.initialSize_=initialSize-1;}else{this.initialSize_=initialSize;}this.fgScale_=""+this.maxRadius_/this.initialSize_;this.updateLayoutCssVars_();};MDCRippleFoundation.prototype.updateLayoutCssVars_=function(){var _a=MDCRippleFoundation.strings,VAR_FG_SIZE=_a.VAR_FG_SIZE,VAR_LEFT=_a.VAR_LEFT,VAR_TOP=_a.VAR_TOP,VAR_FG_SCALE=_a.VAR_FG_SCALE;this.adapter_.updateCssVariable(VAR_FG_SIZE,this.initialSize_+"px");this.adapter_.updateCssVariable(VAR_FG_SCALE,this.fgScale_);if(this.adapter_.isUnbounded()){this.unboundedCoords_={};this.adapter_.updateCssVariable(VAR_LEFT,this.unboundedCoords_.left+"px");this.adapter_.updateCssVariable(VAR_TOP,this.unboundedCoords_.top+"px");}};return MDCRippleFoundation;}(MDCFoundation);// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */const ripple_foundation=/* unused pure expression or super */null&&MDCRippleFoundation;//# sourceMappingURL=foundation.js.map
;// CONCATENATED MODULE: ./node_modules/@material/ripple/component.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var MDCRipple=/** @class */function(_super){__extends(MDCRipple,_super);MDCRipple.attachTo=function(root,opts){if(opts===void 0){opts={};}var ripple=new MDCRipple(root);// Only override unbounded behavior if option is explicitly specified
if(opts.isUnbounded!==undefined){ripple.unbounded=opts.isUnbounded;}return ripple;};MDCRipple.createAdapter=function(instance){return{addClass:function(){},browserSupportsCssVars:function(){},computeBoundingRect:function(){},containsEventTarget:function(){},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){},isSurfaceActive:function(){},isSurfaceDisabled:function(){},isUnbounded:function(){},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}};};Object.defineProperty(MDCRipple.prototype,"unbounded",{get:function(){},set:function(){}});MDCRipple.prototype.activate=function(){this.foundation_.activate();};MDCRipple.prototype.deactivate=function(){this.foundation_.deactivate();};MDCRipple.prototype.layout=function(){this.foundation_.layout();};MDCRipple.prototype.getDefaultFoundation=function(){return new MDCRippleFoundation(MDCRipple.createAdapter(this));};MDCRipple.prototype.initialSyncWithDOM=function(){var root=this.root_;this.unbounded='mdcRippleIsUnbounded'in root.dataset;};/**
     * Closure Compiler throws an access control error when directly accessing a
     * protected or private property inside a getter/setter, like unbounded above.
     * By accessing the protected property inside a method, we solve that problem.
     * That's why this function exists.
     */MDCRipple.prototype.setUnbounded_=function(){this.foundation_.setUnbounded(Boolean(this.unbounded_));};return MDCRipple;}(MDCComponent);//# sourceMappingURL=component.js.map
;// CONCATENATED MODULE: ./source/scripts/helpers/Ripple.js
// This function sets up the ripple effect for the various buttons throughout the
// theme using CSS selectors.
const setupRippleEffect=rootElement=>{if('reduceAnimations'in document.body.dataset){return;}const rippleElements=['.button-primary','.button-secondary','.slideshow-slide__button','.product-form--atc-button','.mobile-nav-content .navmenu-link','.mobile-nav-content .navmenu-button','.mobile-nav-primary-content .navmenu-link','.mobile-nav-primary-content .navmenu-button','.live-search-button','.options-selection__radios .options-selection__option-value-name','.countdown-timer__caption-button','.order-page__atc-button'];rootElement.querySelectorAll(rippleElements.join(',')).forEach(el=>{if(!el.classList.contains('disabled')&&!el.hasAttribute('disabled')){el.classList.add('mdc-ripple-surface');MDCRipple.attachTo(el);}});};/* harmony default export */const Ripple={};;// CONCATENATED MODULE: ./source/scripts/components/AddToCartFlyout.js
;// CONCATENATED MODULE: ./source/scripts/helpers/PaymentTerms.js
;// CONCATENATED MODULE: ./source/scripts/components/ProductDetails.js
;// CONCATENATED MODULE: ./source/scripts/helpers/ProductReviews.js
const initShopifyProductReviews=()=>{if(!window.SPR){return;}window.SPR.registerCallbacks();window.SPR.initRatingHandler();window.SPR.initDomEls();window.SPR.loadProducts();window.SPR.loadBadges();};/* harmony default export */const ProductReviews={};;// CONCATENATED MODULE: ./source/scripts/components/ProductQuickshop.js
;// CONCATENATED MODULE: ./source/scripts/components/GridItemSwatches.js
let swatchGap=null;;// CONCATENATED MODULE: ./source/scripts/components/ProductCompare.js
const storageKey='pxuProductCompareV3';const MAX_COMPARE_PRODUCTS=3;/* harmony default export */const components_ProductCompare=new ProductCompare();;// CONCATENATED MODULE: ./source/scripts/components/Checkbox.js
;// CONCATENATED MODULE: ./source/scripts/components/ProductGridItem.js
;// CONCATENATED MODULE: ./source/scripts/Accordion.js
const makeBlock=el=>({});const setOpenHeight=el=>{el.style.setProperty('--menu-open-height',`${el.scrollHeight}px`);};;// CONCATENATED MODULE: ./source/scripts/components/FilterGroups.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticCollection.js
;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-cross-border/dist/index.es.js
var dist_index_es_EventHandler_1=dist_index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var Events=/*@__PURE__*/getDefaultExportFromCjs(dist_index_es_EventHandler_1);var selectors={};var classes={};var Disclosure=/*#__PURE__*/function(){shopify_cross_border_dist_index_es_createClass(Disclosure,[{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}}]);return Disclosure;}();if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;}if(!Element.prototype.closest){Element.prototype.closest=function closest(s){var el=this;do{if(el.matches(s))return el;el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}/* harmony default export */const shopify_cross_border_dist_index_es=Disclosure;;// CONCATENATED MODULE: ./source/scripts/sections/StaticFooter.js
;// CONCATENATED MODULE: ./source/scripts/components/StickyHeader.js
;// CONCATENATED MODULE: ./source/scripts/components/navigation/NavMobileSubMenus.js
;// CONCATENATED MODULE: ./source/scripts/components/navigation/NavMobile.js
;// CONCATENATED MODULE: ./source/scripts/helpers/site-main-dimmer.js
const el=document.querySelector('[data-site-main-dimmer]');const site_main_dimmer_animation=animations_es_transition({});const openers=new Set();const disableAnimations='reduceAnimations'in document.body.dataset;;// CONCATENATED MODULE: ./source/scripts/components/navigation/NavDesktopParent.js
// eslint-disable-line import/no-cycle
;// CONCATENATED MODULE: ./source/scripts/components/navigation/NavDesktopMeganavParent.js
// eslint-disable-line import/no-cycle
// eslint-disable-line import/no-cycle
;// CONCATENATED MODULE: ./source/scripts/components/navigation/NavDesktopMenu.js
// eslint-disable-line import/no-cycle
// eslint-disable-line import/no-cycle
;// CONCATENATED MODULE: ./source/scripts/components/search/SearchForm.js
;// CONCATENATED MODULE: ./source/scripts/components/search/LiveSearch.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticHeader.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticPassword.js
;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-complementary-products/dist/index.es.js
/*!
 * @pixelunion/pxs-complementary-products v3.5.4
 * (c) 2023 Pixel Union
 */var commonjsGlobal=typeof globalThis!=='undefined'?globalThis:typeof window!=='undefined'?window:typeof __webpack_require__.g!=='undefined'?__webpack_require__.g:typeof self!=='undefined'?self:{};var pxs_complementary_products_dist_index_es_EventHandler_1=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var dist_index_es_EventHandler=dist_index_es_unwrapExports(pxs_complementary_products_dist_index_es_EventHandler_1);/*!
   * @pixelunion/shopify-asyncview v2.0.5
   * (c) 2020 Pixel Union
  */var index_es_deferred={};var index_es_AsyncView=/*#__PURE__*/function(){index_es_createClass$1(AsyncView,null,[{/**
     * Load the template given by the provided URL into the provided
     * view
     *
     * @param {string} url - The url to load
     * @param {object} query - An object containing additional query parameters of the URL
     * @param {string} query.view - A required query parameter indicating which view to load
     * @param {object} [options] - Config options
     * @param {string} [options.hash] - A hash of the current page content
     */value:function(){}}]);return AsyncView;}();var evEmitter=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 *//* jshint unused: true, undef: true, strict: true */(function(global,factory){// universal module definition
/* jshint strict: false *//* globals define, module, window */if(module.exports){// CommonJS - Browserify, Webpack
module.exports=factory();}else{// Browser globals
global.EvEmitter=factory();}})(typeof window!='undefined'?window:commonjsGlobal,function(){var proto=EvEmitter.prototype;proto.on=function(eventName,listener){if(!eventName||!listener){return;}// set events hash
var events=this._events=this._events||{};// set listeners array
var listeners=events[eventName]=events[eventName]||[];// only add once
if(listeners.indexOf(listener)==-1){listeners.push(listener);}return this;};proto.once=function(eventName,listener){if(!eventName||!listener){return;}// add event
this.on(eventName,listener);// set once flag
// set onceEvents hash
var onceEvents=this._onceEvents=this._onceEvents||{};// set onceListeners object
var onceListeners=onceEvents[eventName]=onceEvents[eventName]||{};// set flag
onceListeners[listener]=true;return this;};proto.off=function(eventName,listener){var listeners=this._events&&this._events[eventName];if(!listeners||!listeners.length){return;}var index=listeners.indexOf(listener);if(index!=-1){listeners.splice(index,1);}return this;};proto.emitEvent=function(eventName,args){var listeners=this._events&&this._events[eventName];if(!listeners||!listeners.length){return;}// copy over to avoid interference if .off() in listener
listeners=listeners.slice(0);args=args||[];// once stuff
var onceListeners=this._onceEvents&&this._onceEvents[eventName];for(var i=0;i<listeners.length;i++){var listener=listeners[i];var isOnce=onceListeners&&onceListeners[listener];if(isOnce){// remove listener
// remove before trigger to prevent recursion
this.off(eventName,listener);// unset once flag
delete onceListeners[listener];}// trigger listener
listener.apply(this,args);}return this;};proto.allOff=function(){delete this._events;delete this._onceEvents;};return EvEmitter;});});var getSize=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 *//* jshint browser: true, strict: true, undef: true, unused: true *//* globals console: false */(function(window,factory){/* jshint strict: false *//* globals define, module */if(module.exports){// CommonJS
module.exports=factory();}else{// browser global
window.getSize=factory();}})(window,function factory(){// -------------------------- helpers -------------------------- //
// get a number from a string, not a percentage
var logError=typeof console=='undefined'?noop:function(message){console.error(message);};// -------------------------- measurements -------------------------- //
var measurements=['paddingLeft','paddingRight','paddingTop','paddingBottom','marginLeft','marginRight','marginTop','marginBottom','borderLeftWidth','borderRightWidth','borderTopWidth','borderBottomWidth'];var measurementsLength=measurements.length;// -------------------------- getStyle -------------------------- //
/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */// -------------------------- setup -------------------------- //
var isSetup=false;var isBoxSizeOuter;/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */// -------------------------- getSize -------------------------- //
return getSize;});});var matchesSelector=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 *//*jshint browser: true, strict: true, undef: true, unused: true */(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory();}else{// browser global
window.matchesSelector=factory();}})(window,function factory(){var matchesMethod=function(){var ElemProto=window.Element.prototype;// check for the standard method name first
if(ElemProto.matches){return'matches';}// check un-prefixed
if(ElemProto.matchesSelector){return'matchesSelector';}// check vendor prefixes
var prefixes=['webkit','moz','ms','o'];for(var i=0;i<prefixes.length;i++){var prefix=prefixes[i];var method=prefix+'MatchesSelector';if(ElemProto[method]){return method;}}}();return function matchesSelector(elem,selector){return elem[matchesMethod](selector);};});});var utils=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/**
 * Fizzy UI utils v2.0.7
 * MIT license
 *//*jshint browser: true, undef: true, unused: true, strict: true */(function(window,factory){// universal module definition
/*jshint strict: false *//*globals define, module, require */if(module.exports){// CommonJS
module.exports=factory(window,matchesSelector);}else{// browser global
window.fizzyUIUtils=factory(window,window.matchesSelector);}})(window,function factory(window,matchesSelector){var utils={};// ----- extend ----- //
// extends objects
utils.extend=function(a,b){for(var prop in b){a[prop]=b[prop];}return a;};// ----- modulo ----- //
utils.modulo=function(num,div){return(num%div+div)%div;};// ----- makeArray ----- //
var arraySlice=Array.prototype.slice;// turn element or nodeList into an array
utils.makeArray=function(obj){if(Array.isArray(obj)){// use object if already an array
return obj;}// return empty array if undefined or null. #6
if(obj===null||obj===undefined){return[];}var isArrayLike=typeof obj=='object'&&typeof obj.length=='number';if(isArrayLike){// convert nodeList to array
return arraySlice.call(obj);}// array of single index
return[obj];};// ----- removeFrom ----- //
utils.removeFrom=function(ary,obj){var index=ary.indexOf(obj);if(index!=-1){ary.splice(index,1);}};// ----- getParent ----- //
utils.getParent=function(elem,selector){while(elem.parentNode&&elem!=document.body){elem=elem.parentNode;if(matchesSelector(elem,selector)){return elem;}}};// ----- getQueryElement ----- //
// use element as selector string
utils.getQueryElement=function(elem){if(typeof elem=='string'){return document.querySelector(elem);}return elem;};// ----- handleEvent ----- //
// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event);}};// ----- filterFindElements ----- //
utils.filterFindElements=function(elems,selector){// make array of elems
elems=utils.makeArray(elems);var ffElems=[];elems.forEach(function(elem){// check that elem is an actual element
if(!(elem instanceof HTMLElement)){return;}// add elem if no selector
if(!selector){ffElems.push(elem);return;}// filter & find items if we have a selector
// filter
if(matchesSelector(elem,selector)){ffElems.push(elem);}// find children
var childElems=elem.querySelectorAll(selector);// concat childElems to filterFound array
for(var i=0;i<childElems.length;i++){ffElems.push(childElems[i]);}});return ffElems;};// ----- debounceMethod ----- //
utils.debounceMethod=function(_class,methodName,threshold){threshold=threshold||100;// original method
var method=_class.prototype[methodName];var timeoutName=methodName+'Timeout';_class.prototype[methodName]=function(){var timeout=this[timeoutName];clearTimeout(timeout);var args=arguments;var _this=this;this[timeoutName]=setTimeout(function(){method.apply(_this,args);delete _this[timeoutName];},threshold);};};// ----- docReady ----- //
utils.docReady=function(callback){var readyState=document.readyState;if(readyState=='complete'||readyState=='interactive'){// do async to allow for other scripts to run. metafizzy/flickity#441
setTimeout(callback);}else{document.addEventListener('DOMContentLoaded',callback);}};// ----- htmlInit ----- //
// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed=function(str){return str.replace(/(.)([A-Z])/g,function(match,$1,$2){return $1+'-'+$2;}).toLowerCase();};var console=window.console;/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */utils.htmlInit=function(WidgetClass,namespace){utils.docReady(function(){var dashedNamespace=utils.toDashed(namespace);var dataAttr='data-'+dashedNamespace;var dataAttrElems=document.querySelectorAll('['+dataAttr+']');var jsDashElems=document.querySelectorAll('.js-'+dashedNamespace);var elems=utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));var dataOptionsAttr=dataAttr+'-options';var jQuery=window.jQuery;elems.forEach(function(elem){var attr=elem.getAttribute(dataAttr)||elem.getAttribute(dataOptionsAttr);var options;try{options=attr&&JSON.parse(attr);}catch(error){// log error, do not initialize
if(console){console.error('Error parsing '+dataAttr+' on '+elem.className+': '+error);}return;}// initialize
var instance=new WidgetClass(elem,options);// make available via $().data('namespace')
if(jQuery){jQuery.data(elem,namespace,instance);}});});};// -----  ----- //
return utils;});});var cell=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// Flickity.Cell
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,getSize);}else{// browser global
window.Flickity=window.Flickity||{};window.Flickity.Cell=factory(window,window.getSize);}})(window,function factory(window,getSize){var proto=Cell.prototype;proto.create=function(){this.element.style.position='absolute';this.element.setAttribute('aria-hidden','true');this.x=0;this.shift=0;this.element.style[this.parent.originSide]=0;};proto.destroy=function(){// reset style
this.unselect();this.element.style.position='';var side=this.parent.originSide;this.element.style[side]='';this.element.style.transform='';this.element.removeAttribute('aria-hidden');};proto.getSize=function(){this.size=getSize(this.element);};proto.setPosition=function(x){this.x=x;this.updateTarget();this.renderPosition(x);};// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget=proto.setDefaultTarget=function(){var marginProperty=this.parent.originSide=='left'?'marginLeft':'marginRight';this.target=this.x+this.size[marginProperty]+this.size.width*this.parent.cellAlign;};proto.renderPosition=function(x){// render position of cell with in slider
var sideOffset=this.parent.originSide==='left'?1:-1;var adjustedX=this.parent.options.percentPosition?x*sideOffset*(this.parent.size.innerWidth/this.size.width):x*sideOffset;this.element.style.transform='translateX('+this.parent.getPositionValue(adjustedX)+')';};proto.select=function(){this.element.classList.add('is-selected');this.element.removeAttribute('aria-hidden');};proto.unselect=function(){this.element.classList.remove('is-selected');this.element.setAttribute('aria-hidden','true');};/**
 * @param {Integer} shift - 0, 1, or -1
 */proto.wrapShift=function(shift){this.shift=shift;this.renderPosition(this.x+this.parent.slideableWidth*shift);};proto.remove=function(){this.element.parentNode.removeChild(this.element);};return Cell;});});var slide=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// slide
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory();}else{// browser global
window.Flickity=window.Flickity||{};window.Flickity.Slide=factory();}})(window,function factory(){var proto=Slide.prototype;proto.addCell=function(cell){this.cells.push(cell);this.outerWidth+=cell.size.outerWidth;this.height=Math.max(cell.size.outerHeight,this.height);// first cell stuff
if(this.cells.length==1){this.x=cell.x;// x comes from first cell
var beginMargin=this.isOriginLeft?'marginLeft':'marginRight';this.firstMargin=cell.size[beginMargin];}};proto.updateTarget=function(){var endMargin=this.isOriginLeft?'marginRight':'marginLeft';var lastCell=this.getLastCell();var lastMargin=lastCell?lastCell.size[endMargin]:0;var slideWidth=this.outerWidth-(this.firstMargin+lastMargin);this.target=this.x+this.firstMargin+slideWidth*this.parent.cellAlign;};proto.getLastCell=function(){return this.cells[this.cells.length-1];};proto.select=function(){this.cells.forEach(function(cell){cell.select();});};proto.unselect=function(){this.cells.forEach(function(cell){cell.unselect();});};proto.getCellElements=function(){return this.cells.map(function(cell){return cell.element;});};return Slide;});});var animate=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// animate
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,utils);}else{// browser global
window.Flickity=window.Flickity||{};window.Flickity.animatePrototype=factory(window,window.fizzyUIUtils);}})(window,function factory(window,utils){// -------------------------- animate -------------------------- //
var proto={};proto.startAnimation=function(){if(this.isAnimating){return;}this.isAnimating=true;this.restingFrames=0;this.animate();};proto.animate=function(){this.applyDragForce();this.applySelectedAttraction();var previousX=this.x;this.integratePhysics();this.positionSlider();this.settle(previousX);// animate next frame
if(this.isAnimating){var _this=this;requestAnimationFrame(function animateFrame(){_this.animate();});}};proto.positionSlider=function(){var x=this.x;// wrap position around
if(this.options.wrapAround&&this.cells.length>1){x=utils.modulo(x,this.slideableWidth);x-=this.slideableWidth;this.shiftWrapCells(x);}this.setTranslateX(x,this.isAnimating);this.dispatchScrollEvent();};proto.setTranslateX=function(x,is3d){x+=this.cursorPosition;// reverse if right-to-left and using transform
x=this.options.rightToLeft?-x:x;var translateX=this.getPositionValue(x);// use 3D transforms for hardware acceleration on iOS
// but use 2D when settled, for better font-rendering
this.slider.style.transform=is3d?'translate3d('+translateX+',0,0)':'translateX('+translateX+')';};proto.dispatchScrollEvent=function(){var firstSlide=this.slides[0];if(!firstSlide){return;}var positionX=-this.x-firstSlide.target;var progress=positionX/this.slidesWidth;this.dispatchEvent('scroll',null,[progress,positionX]);};proto.positionSliderAtSelected=function(){if(!this.cells.length){return;}this.x=-this.selectedSlide.target;this.velocity=0;// stop wobble
this.positionSlider();};proto.getPositionValue=function(position){if(this.options.percentPosition){// percent position, round to 2 digits, like 12.34%
return Math.round(position/this.size.innerWidth*10000)*0.01+'%';}else{// pixel positioning
return Math.round(position)+'px';}};proto.settle=function(previousX){// keep track of frames where x hasn't moved
var isResting=!this.isPointerDown&&Math.round(this.x*100)==Math.round(previousX*100);if(isResting){this.restingFrames++;}// stop animating if resting for 3 or more frames
if(this.restingFrames>2){this.isAnimating=false;delete this.isFreeScrolling;// render position with translateX when settled
this.positionSlider();this.dispatchEvent('settle',null,[this.selectedIndex]);}};proto.shiftWrapCells=function(x){// shift before cells
var beforeGap=this.cursorPosition+x;this._shiftCells(this.beforeShiftCells,beforeGap,-1);// shift after cells
var afterGap=this.size.innerWidth-(x+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,afterGap,1);};proto._shiftCells=function(cells,gap,shift){for(var i=0;i<cells.length;i++){var cell=cells[i];var cellShift=gap>0?shift:0;cell.wrapShift(cellShift);gap-=cell.size.outerWidth;}};proto._unshiftCells=function(cells){if(!cells||!cells.length){return;}for(var i=0;i<cells.length;i++){cells[i].wrapShift(0);}};// -------------------------- physics -------------------------- //
proto.integratePhysics=function(){this.x+=this.velocity;this.velocity*=this.getFrictionFactor();};proto.applyForce=function(force){this.velocity+=force;};proto.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?'freeScrollFriction':'friction'];};proto.getRestingPosition=function(){// my thanks to Steven Wittens, who simplified this math greatly
return this.x+this.velocity/(1-this.getFrictionFactor());};proto.applyDragForce=function(){if(!this.isDraggable||!this.isPointerDown){return;}// change the position to drag position by applying force
var dragVelocity=this.dragX-this.x;var dragForce=dragVelocity-this.velocity;this.applyForce(dragForce);};proto.applySelectedAttraction=function(){// do not attract if pointer down or no slides
var dragDown=this.isDraggable&&this.isPointerDown;if(dragDown||this.isFreeScrolling||!this.slides.length){return;}var distance=this.selectedSlide.target*-1-this.x;var force=distance*this.options.selectedAttraction;this.applyForce(force);};return proto;});});var flickity=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// Flickity main
/* eslint-disable max-params */(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,evEmitter,getSize,utils,cell,slide,animate);}else{// browser global
var _Flickity=window.Flickity;window.Flickity=factory(window,window.EvEmitter,window.getSize,window.fizzyUIUtils,_Flickity.Cell,_Flickity.Slide,_Flickity.animatePrototype);}})(window,function factory(window,EvEmitter,getSize,utils,Cell,Slide,animatePrototype){// vars
var jQuery=window.jQuery;var getComputedStyle=window.getComputedStyle;var console=window.console;// -------------------------- Flickity -------------------------- //
// globally unique identifiers
var GUID=0;// internal store of all Flickity intances
var instances={};Flickity.defaults={};// hash of methods triggered on _create()
Flickity.createMethods=[];var proto=Flickity.prototype;// inherit EventEmitter
utils.extend(proto,EvEmitter.prototype);proto._create=function(){// add id for Flickity.data
var id=this.guid=++GUID;this.element.flickityGUID=id;// expando
instances[id]=this;// associate via id
// initial properties
this.selectedIndex=0;// how many frames slider has been in same position
this.restingFrames=0;// initial physics properties
this.x=0;this.velocity=0;this.originSide=this.options.rightToLeft?'right':'left';// create viewport & slider
this.viewport=document.createElement('div');this.viewport.className='flickity-viewport';this._createSlider();if(this.options.resize||this.options.watchCSS){window.addEventListener('resize',this);}// add listeners from on option
for(var eventName in this.options.on){var listener=this.options.on[eventName];this.on(eventName,listener);}Flickity.createMethods.forEach(function(method){this[method]();},this);if(this.options.watchCSS){this.watchCSS();}else{this.activate();}};/**
 * set options
 * @param {Object} opts - options to extend
 */proto.option=function(opts){utils.extend(this.options,opts);};proto.activate=function(){if(this.isActive){return;}this.isActive=true;this.element.classList.add('flickity-enabled');if(this.options.rightToLeft){this.element.classList.add('flickity-rtl');}this.getSize();// move initial cell elements so they can be loaded as cells
var cellElems=this._filterFindCellElements(this.element.children);moveElements(cellElems,this.slider);this.viewport.appendChild(this.slider);this.element.appendChild(this.viewport);// get cells from children
this.reloadCells();if(this.options.accessibility){// allow element to focusable
this.element.tabIndex=0;// listen for key presses
this.element.addEventListener('keydown',this);}this.emitEvent('activate');this.selectInitialIndex();// flag for initial activation, for using initialIndex
this.isInitActivated=true;// ready event. #493
this.dispatchEvent('ready');};// slider positions the cells
proto._createSlider=function(){// slider element does all the positioning
var slider=document.createElement('div');slider.className='flickity-slider';slider.style[this.originSide]=0;this.slider=slider;};proto._filterFindCellElements=function(elems){return utils.filterFindElements(elems,this.options.cellSelector);};// goes through all children
proto.reloadCells=function(){// collection of item elements
this.cells=this._makeCells(this.slider.children);this.positionCells();this._getWrapShiftCells();this.setGallerySize();};/**
 * turn elements into Flickity.Cells
 * @param {[Array, NodeList, HTMLElement]} elems - elements to make into cells
 * @returns {Array} items - collection of new Flickity Cells
 */proto._makeCells=function(elems){var cellElems=this._filterFindCellElements(elems);// create new Flickity for collection
var cells=cellElems.map(function(cellElem){return new Cell(cellElem,this);},this);return cells;};proto.getLastCell=function(){return this.cells[this.cells.length-1];};proto.getLastSlide=function(){return this.slides[this.slides.length-1];};// positions all cells
proto.positionCells=function(){// size all cells
this._sizeCells(this.cells);// position all cells
this._positionCells(0);};/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */proto._positionCells=function(index){index=index||0;// also measure maxCellHeight
// start 0 if positioning all cells
this.maxCellHeight=index?this.maxCellHeight||0:0;var cellX=0;// get cellX
if(index>0){var startCell=this.cells[index-1];cellX=startCell.x+startCell.size.outerWidth;}var len=this.cells.length;for(var i=index;i<len;i++){var cell=this.cells[i];cell.setPosition(cellX);cellX+=cell.size.outerWidth;this.maxCellHeight=Math.max(cell.size.outerHeight,this.maxCellHeight);}// keep track of cellX for wrap-around
this.slideableWidth=cellX;// slides
this.updateSlides();// contain slides target
this._containSlides();// update slidesWidth
this.slidesWidth=len?this.getLastSlide().target-this.slides[0].target:0;};/**
 * cell.getSize() on multiple cells
 * @param {Array} cells - cells to size
 */proto._sizeCells=function(cells){cells.forEach(function(cell){cell.getSize();});};// --------------------------  -------------------------- //
proto.updateSlides=function(){this.slides=[];if(!this.cells.length){return;}var slide=new Slide(this);this.slides.push(slide);var isOriginLeft=this.originSide=='left';var nextMargin=isOriginLeft?'marginRight':'marginLeft';var canCellFit=this._getCanCellFit();this.cells.forEach(function(cell,i){// just add cell if first cell in slide
if(!slide.cells.length){slide.addCell(cell);return;}var slideWidth=slide.outerWidth-slide.firstMargin+(cell.size.outerWidth-cell.size[nextMargin]);if(canCellFit.call(this,i,slideWidth)){slide.addCell(cell);}else{// doesn't fit, new slide
slide.updateTarget();slide=new Slide(this);this.slides.push(slide);slide.addCell(cell);}},this);// last slide
slide.updateTarget();// update .selectedSlide
this.updateSelectedSlide();};proto._getCanCellFit=function(){var groupCells=this.options.groupCells;if(!groupCells){return function(){return false;};}else if(typeof groupCells=='number'){// group by number. 3 -> [0,1,2], [3,4,5], ...
var number=parseInt(groupCells,10);return function(i){return i%number!==0;};}// default, group by width of slide
// parse '75%
var percentMatch=typeof groupCells=='string'&&groupCells.match(/^(\d+)%$/);var percent=percentMatch?parseInt(percentMatch[1],10)/100:1;return function(i,slideWidth){/* eslint-disable-next-line no-invalid-this */return slideWidth<=(this.size.innerWidth+1)*percent;};};// alias _init for jQuery plugin .flickity()
proto._init=proto.reposition=function(){this.positionCells();this.positionSliderAtSelected();};proto.getSize=function(){this.size=getSize(this.element);this.setCellAlign();this.cursorPosition=this.size.innerWidth*this.cellAlign;};var cellAlignShorthands={};proto.setCellAlign=function(){var shorthand=cellAlignShorthands[this.options.cellAlign];this.cellAlign=shorthand?shorthand[this.originSide]:this.options.cellAlign;};proto.setGallerySize=function(){if(this.options.setGallerySize){var height=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=height+'px';}};proto._getWrapShiftCells=function(){// only for wrap-around
if(!this.options.wrapAround){return;}// unshift previous cells
this._unshiftCells(this.beforeShiftCells);this._unshiftCells(this.afterShiftCells);// get before cells
// initial gap
var gapX=this.cursorPosition;var cellIndex=this.cells.length-1;this.beforeShiftCells=this._getGapCells(gapX,cellIndex,-1);// get after cells
// ending gap between last cell and end of gallery viewport
gapX=this.size.innerWidth-this.cursorPosition;// start cloning at first cell, working forwards
this.afterShiftCells=this._getGapCells(gapX,0,1);};proto._getGapCells=function(gapX,cellIndex,increment){// keep adding cells until the cover the initial gap
var cells=[];while(gapX>0){var cell=this.cells[cellIndex];if(!cell){break;}cells.push(cell);cellIndex+=increment;gapX-=cell.size.outerWidth;}return cells;};// ----- contain ----- //
// contain cell targets so no excess sliding
proto._containSlides=function(){if(!this.options.contain||this.options.wrapAround||!this.cells.length){return;}var isRightToLeft=this.options.rightToLeft;var beginMargin=isRightToLeft?'marginRight':'marginLeft';var endMargin=isRightToLeft?'marginLeft':'marginRight';var contentWidth=this.slideableWidth-this.getLastCell().size[endMargin];// content is less than gallery size
var isContentSmaller=contentWidth<this.size.innerWidth;// bounds
var beginBound=this.cursorPosition+this.cells[0].size[beginMargin];var endBound=contentWidth-this.size.innerWidth*(1-this.cellAlign);// contain each cell target
this.slides.forEach(function(slide){if(isContentSmaller){// all cells fit inside gallery
slide.target=contentWidth*this.cellAlign;}else{// contain to bounds
slide.target=Math.max(slide.target,beginBound);slide.target=Math.min(slide.target,endBound);}},this);};// -----  ----- //
/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */proto.dispatchEvent=function(type,event,args){var emitArgs=event?[event].concat(args):args;this.emitEvent(type,emitArgs);if(jQuery&&this.$element){// default trigger with type if no event
type+=this.options.namespaceJQueryEvents?'.flickity':'';var $event=type;if(event){// create jQuery event
var jQEvent=new jQuery.Event(event);jQEvent.type=type;$event=jQEvent;}this.$element.trigger($event,args);}};// -------------------------- select -------------------------- //
/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */proto.select=function(index,isWrap,isInstant){if(!this.isActive){return;}index=parseInt(index,10);this._wrapSelect(index);if(this.options.wrapAround||isWrap){index=utils.modulo(index,this.slides.length);}// bail if invalid index
if(!this.slides[index]){return;}var prevIndex=this.selectedIndex;this.selectedIndex=index;this.updateSelectedSlide();if(isInstant){this.positionSliderAtSelected();}else{this.startAnimation();}if(this.options.adaptiveHeight){this.setGallerySize();}// events
this.dispatchEvent('select',null,[index]);// change event if new index
if(index!=prevIndex){this.dispatchEvent('change',null,[index]);}// old v1 event name, remove in v3
this.dispatchEvent('cellSelect');};// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect=function(index){var len=this.slides.length;var isWrapping=this.options.wrapAround&&len>1;if(!isWrapping){return index;}var wrapIndex=utils.modulo(index,len);// go to shortest
var delta=Math.abs(wrapIndex-this.selectedIndex);var backWrapDelta=Math.abs(wrapIndex+len-this.selectedIndex);var forewardWrapDelta=Math.abs(wrapIndex-len-this.selectedIndex);if(!this.isDragSelect&&backWrapDelta<delta){index+=len;}else if(!this.isDragSelect&&forewardWrapDelta<delta){index-=len;}// wrap position so slider is within normal area
if(index<0){this.x-=this.slideableWidth;}else if(index>=len){this.x+=this.slideableWidth;}};proto.previous=function(isWrap,isInstant){this.select(this.selectedIndex-1,isWrap,isInstant);};proto.next=function(isWrap,isInstant){this.select(this.selectedIndex+1,isWrap,isInstant);};proto.updateSelectedSlide=function(){var slide=this.slides[this.selectedIndex];// selectedIndex could be outside of slides, if triggered before resize()
if(!slide){return;}// unselect previous selected slide
this.unselectSelectedSlide();// update new selected slide
this.selectedSlide=slide;slide.select();this.selectedCells=slide.cells;this.selectedElements=slide.getCellElements();// HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
// Remove in v3?
this.selectedCell=slide.cells[0];this.selectedElement=this.selectedElements[0];};proto.unselectSelectedSlide=function(){if(this.selectedSlide){this.selectedSlide.unselect();}};proto.selectInitialIndex=function(){var initialIndex=this.options.initialIndex;// already activated, select previous selectedIndex
if(this.isInitActivated){this.select(this.selectedIndex,false,true);return;}// select with selector string
if(initialIndex&&typeof initialIndex=='string'){var cell=this.queryCell(initialIndex);if(cell){this.selectCell(initialIndex,false,true);return;}}var index=0;// select with number
if(initialIndex&&this.slides[initialIndex]){index=initialIndex;}// select instantly
this.select(index,false,true);};/**
 * select slide from number or cell element
 * @param {[Element, Number]} value - zero-based index or element to select
 * @param {Boolean} isWrap - enables wrapping around for extra index
 * @param {Boolean} isInstant - disables slide animation
 */proto.selectCell=function(value,isWrap,isInstant){// get cell
var cell=this.queryCell(value);if(!cell){return;}var index=this.getCellSlideIndex(cell);this.select(index,isWrap,isInstant);};proto.getCellSlideIndex=function(cell){// get index of slides that has cell
for(var i=0;i<this.slides.length;i++){var slide=this.slides[i];var index=slide.cells.indexOf(cell);if(index!=-1){return i;}}};// -------------------------- get cells -------------------------- //
/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem - matching cell element
 * @returns {Flickity.Cell} cell - matching cell
 */proto.getCell=function(elem){// loop through cells to get the one that matches
for(var i=0;i<this.cells.length;i++){var cell=this.cells[i];if(cell.element==elem){return cell;}}};/**
 * get collection of Flickity.Cells, given Elements
 * @param {[Element, Array, NodeList]} elems - multiple elements
 * @returns {Array} cells - Flickity.Cells
 */proto.getCells=function(elems){elems=utils.makeArray(elems);var cells=[];elems.forEach(function(elem){var cell=this.getCell(elem);if(cell){cells.push(cell);}},this);return cells;};/**
 * get cell elements
 * @returns {Array} cellElems
 */proto.getCellElements=function(){return this.cells.map(function(cell){return cell.element;});};/**
 * get parent cell from an element
 * @param {Element} elem - child element
 * @returns {Flickit.Cell} cell - parent cell
 */proto.getParentCell=function(elem){// first check if elem is cell
var cell=this.getCell(elem);if(cell){return cell;}// try to get parent cell elem
elem=utils.getParent(elem,'.flickity-slider > *');return this.getCell(elem);};/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */proto.getAdjacentCellElements=function(adjCount,index){if(!adjCount){return this.selectedSlide.getCellElements();}index=index===undefined?this.selectedIndex:index;var len=this.slides.length;if(1+adjCount*2>=len){return this.getCellElements();}var cellElems=[];for(var i=index-adjCount;i<=index+adjCount;i++){var slideIndex=this.options.wrapAround?utils.modulo(i,len):i;var slide=this.slides[slideIndex];if(slide){cellElems=cellElems.concat(slide.getCellElements());}}return cellElems;};/**
 * select slide from number or cell element
 * @param {[Element, String, Number]} selector - element, selector string, or index
 * @returns {Flickity.Cell} - matching cell
 */proto.queryCell=function(selector){if(typeof selector=='number'){// use number as index
return this.cells[selector];}if(typeof selector=='string'){// do not select invalid selectors from hash: #123, #/. #791
if(selector.match(/^[#.]?[\d/]/)){return;}// use string as selector, get element
selector=this.element.querySelector(selector);}// get cell from element
return this.getCell(selector);};// -------------------------- events -------------------------- //
proto.uiChange=function(){this.emitEvent('uiChange');};// keep focus on element when child UI elements are clicked
proto.childUIPointerDown=function(event){// HACK iOS does not allow touch events to bubble up?!
if(event.type!='touchstart'){event.preventDefault();}this.focus();};// ----- resize ----- //
proto.onresize=function(){this.watchCSS();this.resize();};utils.debounceMethod(Flickity,'onresize',150);proto.resize=function(){// #1177 disable resize behavior when animating or dragging for iOS 15
if(!this.isActive||this.isAnimating||this.isDragging){return;}this.getSize();// wrap values
if(this.options.wrapAround){this.x=utils.modulo(this.x,this.slideableWidth);}this.positionCells();this._getWrapShiftCells();this.setGallerySize();this.emitEvent('resize');// update selected index for group slides, instant
// TODO: position can be lost between groups of various numbers
var selectedElement=this.selectedElements&&this.selectedElements[0];this.selectCell(selectedElement,false,true);};// watches the :after property, activates/deactivates
proto.watchCSS=function(){var watchOption=this.options.watchCSS;if(!watchOption){return;}var afterContent=getComputedStyle(this.element,':after').content;// activate if :after { content: 'flickity' }
if(afterContent.indexOf('flickity')!=-1){this.activate();}else{this.deactivate();}};// ----- keydown ----- //
// go previous/next if left/right keys pressed
proto.onkeydown=function(event){// only work if element is in focus
var isNotFocused=document.activeElement&&document.activeElement!=this.element;if(!this.options.accessibility||isNotFocused){return;}var handler=Flickity.keyboardHandlers[event.keyCode];if(handler){handler.call(this);}};Flickity.keyboardHandlers={// left arrow
37:function(){},// right arrow
39:function(){}};// ----- focus ----- //
proto.focus=function(){// TODO remove scrollTo once focus options gets more support
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus ...
//    #Browser_compatibility
var prevScrollY=window.pageYOffset;this.element.focus({});// hack to fix scroll jump after focus, #76
if(window.pageYOffset!=prevScrollY){window.scrollTo(window.pageXOffset,prevScrollY);}};// -------------------------- destroy -------------------------- //
// deactivate all Flickity functionality, but keep stuff available
proto.deactivate=function(){if(!this.isActive){return;}this.element.classList.remove('flickity-enabled');this.element.classList.remove('flickity-rtl');this.unselectSelectedSlide();// destroy cells
this.cells.forEach(function(cell){cell.destroy();});this.element.removeChild(this.viewport);// move child elements back into element
moveElements(this.slider.children,this.element);if(this.options.accessibility){this.element.removeAttribute('tabIndex');this.element.removeEventListener('keydown',this);}// set flags
this.isActive=false;this.emitEvent('deactivate');};proto.destroy=function(){this.deactivate();window.removeEventListener('resize',this);this.allOff();this.emitEvent('destroy');if(jQuery&&this.$element){jQuery.removeData(this.element,'flickity');}delete this.element.flickityGUID;delete instances[this.guid];};// -------------------------- prototype -------------------------- //
utils.extend(proto,animatePrototype);// -------------------------- extras -------------------------- //
/**
 * get Flickity instance from element
 * @param {[Element, String]} elem - element or selector string
 * @returns {Flickity} - Flickity instance
 */Flickity.data=function(elem){elem=utils.getQueryElement(elem);var id=elem&&elem.flickityGUID;return id&&instances[id];};utils.htmlInit(Flickity,'flickity');if(jQuery&&jQuery.bridget){jQuery.bridget('flickity',Flickity);}// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery=function(jq){jQuery=jq;};Flickity.Cell=Cell;Flickity.Slide=Slide;return Flickity;});});var unipointer=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/*!
 * Unipointer v2.4.0
 * base class for doing one thing with pointer event
 * MIT license
 *//*jshint browser: true, undef: true, unused: true, strict: true */(function(window,factory){// universal module definition
/* jshint strict: false *//*global define, module, require */if(module.exports){// CommonJS
module.exports=factory(window,evEmitter);}else{// browser global
window.Unipointer=factory(window,window.EvEmitter);}})(window,function factory(window,EvEmitter){// inherit EvEmitter
var proto=Unipointer.prototype=Object.create(EvEmitter.prototype);proto.bindStartEvent=function(elem){this._bindStartEvent(elem,true);};proto.unbindStartEvent=function(elem){this._bindStartEvent(elem,false);};/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */proto._bindStartEvent=function(elem,isAdd){// munge isAdd, default to true
isAdd=isAdd===undefined?true:isAdd;var bindMethod=isAdd?'addEventListener':'removeEventListener';// default to mouse events
var startEvent='mousedown';if('ontouchstart'in window){// HACK prefer Touch Events as you can preventDefault on touchstart to
// disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
startEvent='touchstart';}else if(window.PointerEvent){// Pointer Events
startEvent='pointerdown';}elem[bindMethod](startEvent,this);};// trigger handler methods for events
proto.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event);}};// returns the touch that we're keeping track of
proto.getTouch=function(touches){for(var i=0;i<touches.length;i++){var touch=touches[i];if(touch.identifier==this.pointerIdentifier){return touch;}}};// ----- start event ----- //
proto.onmousedown=function(event){// dismiss clicks from right or middle buttons
var button=event.button;if(button&&button!==0&&button!==1){return;}this._pointerDown(event,event);};proto.ontouchstart=function(event){this._pointerDown(event,event.changedTouches[0]);};proto.onpointerdown=function(event){this._pointerDown(event,event);};/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */proto._pointerDown=function(event,pointer){// dismiss right click and other pointers
// button = 0 is okay, 1-4 not
if(event.button||this.isPointerDown){return;}this.isPointerDown=true;// save pointer identifier to match up touch events
this.pointerIdentifier=pointer.pointerId!==undefined?// pointerId for pointer events, touch.indentifier for touch events
pointer.pointerId:pointer.identifier;this.pointerDown(event,pointer);};proto.pointerDown=function(event,pointer){this._bindPostStartEvents(event);this.emitEvent('pointerDown',[event,pointer]);};// hash of events to be bound after start event
var postStartEvents={};proto._bindPostStartEvents=function(event){if(!event){return;}// get proper events to match start event
var events=postStartEvents[event.type];// bind events to node
events.forEach(function(eventName){window.addEventListener(eventName,this);},this);// save these arguments
this._boundPointerEvents=events;};proto._unbindPostStartEvents=function(){// check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
if(!this._boundPointerEvents){return;}this._boundPointerEvents.forEach(function(eventName){window.removeEventListener(eventName,this);},this);delete this._boundPointerEvents;};// ----- move event ----- //
proto.onmousemove=function(event){this._pointerMove(event,event);};proto.onpointermove=function(event){if(event.pointerId==this.pointerIdentifier){this._pointerMove(event,event);}};proto.ontouchmove=function(event){var touch=this.getTouch(event.changedTouches);if(touch){this._pointerMove(event,touch);}};/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */proto._pointerMove=function(event,pointer){this.pointerMove(event,pointer);};// public
proto.pointerMove=function(event,pointer){this.emitEvent('pointerMove',[event,pointer]);};// ----- end event ----- //
proto.onmouseup=function(event){this._pointerUp(event,event);};proto.onpointerup=function(event){if(event.pointerId==this.pointerIdentifier){this._pointerUp(event,event);}};proto.ontouchend=function(event){var touch=this.getTouch(event.changedTouches);if(touch){this._pointerUp(event,touch);}};/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */proto._pointerUp=function(event,pointer){this._pointerDone();this.pointerUp(event,pointer);};// public
proto.pointerUp=function(event,pointer){this.emitEvent('pointerUp',[event,pointer]);};// ----- pointer done ----- //
// triggered on pointer up & pointer cancel
proto._pointerDone=function(){this._pointerReset();this._unbindPostStartEvents();this.pointerDone();};proto._pointerReset=function(){// reset properties
this.isPointerDown=false;delete this.pointerIdentifier;};proto.pointerDone=noop;// ----- pointer cancel ----- //
proto.onpointercancel=function(event){if(event.pointerId==this.pointerIdentifier){this._pointerCancel(event,event);}};proto.ontouchcancel=function(event){var touch=this.getTouch(event.changedTouches);if(touch){this._pointerCancel(event,touch);}};/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */proto._pointerCancel=function(event,pointer){this._pointerDone();this.pointerCancel(event,pointer);};// public
proto.pointerCancel=function(event,pointer){this.emitEvent('pointerCancel',[event,pointer]);};// -----  ----- //
// utility function for getting x/y coords from event
Unipointer.getPointerPoint=function(pointer){return{};};// -----  ----- //
return Unipointer;});});var unidragger=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/*!
 * Unidragger v2.4.0
 * Draggable base class
 * MIT license
 *//*jshint browser: true, unused: true, undef: true, strict: true */(function(window,factory){// universal module definition
/*jshint strict: false *//*globals define, module, require */if(module.exports){// CommonJS
module.exports=factory(window,unipointer);}else{// browser global
window.Unidragger=factory(window,window.Unipointer);}})(window,function factory(window,Unipointer){// -------------------------- Unidragger -------------------------- //
// inherit Unipointer & EvEmitter
var proto=Unidragger.prototype=Object.create(Unipointer.prototype);// ----- bind start ----- //
proto.bindHandles=function(){this._bindHandles(true);};proto.unbindHandles=function(){this._bindHandles(false);};/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */proto._bindHandles=function(isAdd){// munge isAdd, default to true
isAdd=isAdd===undefined?true:isAdd;// bind each handle
var bindMethod=isAdd?'addEventListener':'removeEventListener';var touchAction=isAdd?this._touchActionValue:'';for(var i=0;i<this.handles.length;i++){var handle=this.handles[i];this._bindStartEvent(handle,isAdd);handle[bindMethod]('click',this);// touch-action: none to override browser touch gestures. metafizzy/flickity#540
if(window.PointerEvent){handle.style.touchAction=touchAction;}}};// prototype so it can be overwriteable by Flickity
proto._touchActionValue='none';// ----- start event ----- //
/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */proto.pointerDown=function(event,pointer){var isOkay=this.okayPointerDown(event);if(!isOkay){return;}// track start event position
// Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
this.pointerDownPointer={};event.preventDefault();this.pointerDownBlur();// bind move and end events
this._bindPostStartEvents(event);this.emitEvent('pointerDown',[event,pointer]);};// nodes that have text fields
var cursorNodes={};// input types that do not have text fields
var clickTypes={};// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown=function(event){var isCursorNode=cursorNodes[event.target.nodeName];var isClickType=clickTypes[event.target.type];var isOkay=!isCursorNode||isClickType;if(!isOkay){this._pointerReset();}return isOkay;};// kludge to blur previously focused input
proto.pointerDownBlur=function(){var focused=document.activeElement;// do not blur body for IE10, metafizzy/flickity#117
var canBlur=focused&&focused.blur&&focused!=document.body;if(canBlur){focused.blur();}};// ----- move event ----- //
/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */proto.pointerMove=function(event,pointer){var moveVector=this._dragPointerMove(event,pointer);this.emitEvent('pointerMove',[event,pointer,moveVector]);this._dragMove(event,pointer,moveVector);};// base pointer move logic
proto._dragPointerMove=function(event,pointer){var moveVector={};// start drag if pointer has moved far enough to start drag
if(!this.isDragging&&this.hasDragStarted(moveVector)){this._dragStart(event,pointer);}return moveVector;};// condition if pointer has moved far enough to start drag
proto.hasDragStarted=function(moveVector){return Math.abs(moveVector.x)>3||Math.abs(moveVector.y)>3;};// ----- end event ----- //
/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */proto.pointerUp=function(event,pointer){this.emitEvent('pointerUp',[event,pointer]);this._dragPointerUp(event,pointer);};proto._dragPointerUp=function(event,pointer){if(this.isDragging){this._dragEnd(event,pointer);}else{// pointer didn't move enough for drag to start
this._staticClick(event,pointer);}};// -------------------------- drag -------------------------- //
// dragStart
proto._dragStart=function(event,pointer){this.isDragging=true;// prevent clicks
this.isPreventingClicks=true;this.dragStart(event,pointer);};proto.dragStart=function(event,pointer){this.emitEvent('dragStart',[event,pointer]);};// dragMove
proto._dragMove=function(event,pointer,moveVector){// do not drag if not dragging yet
if(!this.isDragging){return;}this.dragMove(event,pointer,moveVector);};proto.dragMove=function(event,pointer,moveVector){event.preventDefault();this.emitEvent('dragMove',[event,pointer,moveVector]);};// dragEnd
proto._dragEnd=function(event,pointer){// set flags
this.isDragging=false;// re-enable clicking async
setTimeout(function(){delete this.isPreventingClicks;}.bind(this));this.dragEnd(event,pointer);};proto.dragEnd=function(event,pointer){this.emitEvent('dragEnd',[event,pointer]);};// ----- onclick ----- //
// handle all clicks and prevent clicks when dragging
proto.onclick=function(event){if(this.isPreventingClicks){event.preventDefault();}};// ----- staticClick ----- //
// triggered after pointer down & up with no/tiny movement
proto._staticClick=function(event,pointer){// ignore emulated mouse up clicks
if(this.isIgnoringMouseUp&&event.type=='mouseup'){return;}this.staticClick(event,pointer);// set flag for emulated clicks 300ms after touchend
if(event.type!='mouseup'){this.isIgnoringMouseUp=true;// reset flag after 300ms
setTimeout(function(){delete this.isIgnoringMouseUp;}.bind(this),400);}};proto.staticClick=function(event,pointer){this.emitEvent('staticClick',[event,pointer]);};// ----- utils ----- //
Unidragger.getPointerPoint=Unipointer.getPointerPoint;// -----  ----- //
return Unidragger;});});var drag=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// drag
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,flickity,unidragger,utils);}else{// browser global
window.Flickity=factory(window,window.Flickity,window.Unidragger,window.fizzyUIUtils);}})(window,function factory(window,Flickity,Unidragger,utils){// ----- defaults ----- //
utils.extend(Flickity.defaults,{});// ----- create ----- //
Flickity.createMethods.push('_createDrag');// -------------------------- drag prototype -------------------------- //
var proto=Flickity.prototype;utils.extend(proto,Unidragger.prototype);proto._touchActionValue='pan-y';// --------------------------  -------------------------- //
proto._createDrag=function(){this.on('activate',this.onActivateDrag);this.on('uiChange',this._uiChangeDrag);this.on('deactivate',this.onDeactivateDrag);this.on('cellChange',this.updateDraggable);// TODO updateDraggable on resize? if groupCells & slides change
};proto.onActivateDrag=function(){this.handles=[this.viewport];this.bindHandles();this.updateDraggable();};proto.onDeactivateDrag=function(){this.unbindHandles();this.element.classList.remove('is-draggable');};proto.updateDraggable=function(){// disable dragging if less than 2 slides. #278
if(this.options.draggable=='>1'){this.isDraggable=this.slides.length>1;}else{this.isDraggable=this.options.draggable;}if(this.isDraggable){this.element.classList.add('is-draggable');}else{this.element.classList.remove('is-draggable');}};// backwards compatibility
proto.bindDrag=function(){this.options.draggable=true;this.updateDraggable();};proto.unbindDrag=function(){this.options.draggable=false;this.updateDraggable();};proto._uiChangeDrag=function(){delete this.isFreeScrolling;};// -------------------------- pointer events -------------------------- //
proto.pointerDown=function(event,pointer){if(!this.isDraggable){this._pointerDownDefault(event,pointer);return;}var isOkay=this.okayPointerDown(event);if(!isOkay){return;}this._pointerDownPreventDefault(event);this.pointerDownFocus(event);// blur
if(document.activeElement!=this.element){// do not blur if already focused
this.pointerDownBlur();}// stop if it was moving
this.dragX=this.x;this.viewport.classList.add('is-pointer-down');// track scrolling
this.pointerDownScroll=getScrollPosition();window.addEventListener('scroll',this);this._pointerDownDefault(event,pointer);};// default pointerDown logic, used for staticClick
proto._pointerDownDefault=function(event,pointer){// track start event position
// Safari 9 overrides pageX and pageY. These values needs to be copied. #779
this.pointerDownPointer={};// bind move and end events
this._bindPostStartEvents(event);this.dispatchEvent('pointerDown',event,[pointer]);};var focusNodes={};proto.pointerDownFocus=function(event){var isFocusNode=focusNodes[event.target.nodeName];if(!isFocusNode){this.focus();}};proto._pointerDownPreventDefault=function(event){var isTouchStart=event.type=='touchstart';var isTouchPointer=event.pointerType=='touch';var isFocusNode=focusNodes[event.target.nodeName];if(!isTouchStart&&!isTouchPointer&&!isFocusNode){event.preventDefault();}};// ----- move ----- //
proto.hasDragStarted=function(moveVector){return Math.abs(moveVector.x)>this.options.dragThreshold;};// ----- up ----- //
proto.pointerUp=function(event,pointer){delete this.isTouchScrolling;this.viewport.classList.remove('is-pointer-down');this.dispatchEvent('pointerUp',event,[pointer]);this._dragPointerUp(event,pointer);};proto.pointerDone=function(){window.removeEventListener('scroll',this);delete this.pointerDownScroll;};// -------------------------- dragging -------------------------- //
proto.dragStart=function(event,pointer){if(!this.isDraggable){return;}this.dragStartPosition=this.x;this.startAnimation();window.removeEventListener('scroll',this);this.dispatchEvent('dragStart',event,[pointer]);};proto.pointerMove=function(event,pointer){var moveVector=this._dragPointerMove(event,pointer);this.dispatchEvent('pointerMove',event,[pointer,moveVector]);this._dragMove(event,pointer,moveVector);};proto.dragMove=function(event,pointer,moveVector){if(!this.isDraggable){return;}event.preventDefault();this.previousDragX=this.dragX;// reverse if right-to-left
var direction=this.options.rightToLeft?-1:1;if(this.options.wrapAround){// wrap around move. #589
moveVector.x%=this.slideableWidth;}var dragX=this.dragStartPosition+moveVector.x*direction;if(!this.options.wrapAround&&this.slides.length){// slow drag
var originBound=Math.max(-this.slides[0].target,this.dragStartPosition);dragX=dragX>originBound?(dragX+originBound)*0.5:dragX;var endBound=Math.min(-this.getLastSlide().target,this.dragStartPosition);dragX=dragX<endBound?(dragX+endBound)*0.5:dragX;}this.dragX=dragX;this.dragMoveTime=new Date();this.dispatchEvent('dragMove',event,[pointer,moveVector]);};proto.dragEnd=function(event,pointer){if(!this.isDraggable){return;}if(this.options.freeScroll){this.isFreeScrolling=true;}// set selectedIndex based on where flick will end up
var index=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){// if free-scroll & not wrap around
// do not free-scroll if going outside of bounding slides
// so bounding slides can attract slider, and keep it in bounds
var restingX=this.getRestingPosition();this.isFreeScrolling=-restingX>this.slides[0].target&&-restingX<this.getLastSlide().target;}else if(!this.options.freeScroll&&index==this.selectedIndex){// boost selection if selected index has not changed
index+=this.dragEndBoostSelect();}delete this.previousDragX;// apply selection
// TODO refactor this, selecting here feels weird
// HACK, set flag so dragging stays in correct direction
this.isDragSelect=this.options.wrapAround;this.select(index);delete this.isDragSelect;this.dispatchEvent('dragEnd',event,[pointer]);};proto.dragEndRestingSelect=function(){var restingX=this.getRestingPosition();// how far away from selected slide
var distance=Math.abs(this.getSlideDistance(-restingX,this.selectedIndex));// get closet resting going up and going down
var positiveResting=this._getClosestResting(restingX,distance,1);var negativeResting=this._getClosestResting(restingX,distance,-1);// use closer resting for wrap-around
var index=positiveResting.distance<negativeResting.distance?positiveResting.index:negativeResting.index;return index;};/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */proto._getClosestResting=function(restingX,distance,increment){var index=this.selectedIndex;var minDistance=Infinity;var condition=this.options.contain&&!this.options.wrapAround?// if contain, keep going if distance is equal to minDistance
function(dist,minDist){return dist<=minDist;}:function(dist,minDist){return dist<minDist;};while(condition(distance,minDistance)){// measure distance to next cell
index+=increment;minDistance=distance;distance=this.getSlideDistance(-restingX,index);if(distance===null){break;}distance=Math.abs(distance);}return{};};/**
 * measure distance between x and a slide target
 * @param {Number} x - horizontal position
 * @param {Integer} index - slide index
 * @returns {Number} - slide distance
 */proto.getSlideDistance=function(x,index){var len=this.slides.length;// wrap around if at least 2 slides
var isWrapAround=this.options.wrapAround&&len>1;var slideIndex=isWrapAround?utils.modulo(index,len):index;var slide=this.slides[slideIndex];if(!slide){return null;}// add distance for wrap-around slides
var wrap=isWrapAround?this.slideableWidth*Math.floor(index/len):0;return x-(slide.target+wrap);};proto.dragEndBoostSelect=function(){// do not boost if no previousDragX or dragMoveTime
if(this.previousDragX===undefined||!this.dragMoveTime||// or if drag was held for 100 ms
new Date()-this.dragMoveTime>100){return 0;}var distance=this.getSlideDistance(-this.dragX,this.selectedIndex);var delta=this.previousDragX-this.dragX;if(distance>0&&delta>0){// boost to next if moving towards the right, and positive velocity
return 1;}else if(distance<0&&delta<0){// boost to previous if moving towards the left, and negative velocity
return-1;}return 0;};// ----- staticClick ----- //
proto.staticClick=function(event,pointer){// get clickedCell, if cell was clicked
var clickedCell=this.getParentCell(event.target);var cellElem=clickedCell&&clickedCell.element;var cellIndex=clickedCell&&this.cells.indexOf(clickedCell);this.dispatchEvent('staticClick',event,[pointer,cellElem,cellIndex]);};// ----- scroll ----- //
proto.onscroll=function(){var scroll=getScrollPosition();var scrollMoveX=this.pointerDownScroll.x-scroll.x;var scrollMoveY=this.pointerDownScroll.y-scroll.y;// cancel click/tap if scroll is too much
if(Math.abs(scrollMoveX)>3||Math.abs(scrollMoveY)>3){this._pointerDone();}};// ----- utils ----- //
// -----  ----- //
return Flickity;});});var prevNextButton=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// prev/next buttons
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,flickity,unipointer,utils);}else{// browser global
factory(window,window.Flickity,window.Unipointer,window.fizzyUIUtils);}})(window,function factory(window,Flickity,Unipointer,utils){var svgURI='http://www.w3.org/2000/svg';// -------------------------- PrevNextButton -------------------------- //
PrevNextButton.prototype=Object.create(Unipointer.prototype);PrevNextButton.prototype._create=function(){// properties
this.isEnabled=true;this.isPrevious=this.direction==-1;var leftDirection=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==leftDirection;var element=this.element=document.createElement('button');element.className='flickity-button flickity-prev-next-button';element.className+=this.isPrevious?' previous':' next';// prevent button from submitting form http://stackoverflow.com/a/10836076/182183
element.setAttribute('type','button');// init as disabled
this.disable();element.setAttribute('aria-label',this.isPrevious?'Previous':'Next');// create arrow
var svg=this.createSVG();element.appendChild(svg);// events
this.parent.on('select',this.update.bind(this));this.on('pointerDown',this.parent.childUIPointerDown.bind(this.parent));};PrevNextButton.prototype.activate=function(){this.bindStartEvent(this.element);this.element.addEventListener('click',this);// add to DOM
this.parent.element.appendChild(this.element);};PrevNextButton.prototype.deactivate=function(){// remove from DOM
this.parent.element.removeChild(this.element);// click events
this.unbindStartEvent(this.element);this.element.removeEventListener('click',this);};PrevNextButton.prototype.createSVG=function(){var svg=document.createElementNS(svgURI,'svg');svg.setAttribute('class','flickity-button-icon');svg.setAttribute('viewBox','0 0 100 100');var path=document.createElementNS(svgURI,'path');var pathMovements=getArrowMovements(this.parent.options.arrowShape);path.setAttribute('d',pathMovements);path.setAttribute('class','arrow');// rotate arrow
if(!this.isLeft){path.setAttribute('transform','translate(100, 100) rotate(180) ');}svg.appendChild(path);return svg;};// get SVG path movmement
PrevNextButton.prototype.handleEvent=utils.handleEvent;PrevNextButton.prototype.onclick=function(){if(!this.isEnabled){return;}this.parent.uiChange();var method=this.isPrevious?'previous':'next';this.parent[method]();};// -----  ----- //
PrevNextButton.prototype.enable=function(){if(this.isEnabled){return;}this.element.disabled=false;this.isEnabled=true;};PrevNextButton.prototype.disable=function(){if(!this.isEnabled){return;}this.element.disabled=true;this.isEnabled=false;};PrevNextButton.prototype.update=function(){// index of first or last slide, if previous or next
var slides=this.parent.slides;// enable is wrapAround and at least 2 slides
if(this.parent.options.wrapAround&&slides.length>1){this.enable();return;}var lastIndex=slides.length?slides.length-1:0;var boundIndex=this.isPrevious?0:lastIndex;var method=this.parent.selectedIndex==boundIndex?'disable':'enable';this[method]();};PrevNextButton.prototype.destroy=function(){this.deactivate();this.allOff();};// -------------------------- Flickity prototype -------------------------- //
utils.extend(Flickity.defaults,{});Flickity.createMethods.push('_createPrevNextButtons');var proto=Flickity.prototype;proto._createPrevNextButtons=function(){if(!this.options.prevNextButtons){return;}this.prevButton=new PrevNextButton(-1,this);this.nextButton=new PrevNextButton(1,this);this.on('activate',this.activatePrevNextButtons);};proto.activatePrevNextButtons=function(){this.prevButton.activate();this.nextButton.activate();this.on('deactivate',this.deactivatePrevNextButtons);};proto.deactivatePrevNextButtons=function(){this.prevButton.deactivate();this.nextButton.deactivate();this.off('deactivate',this.deactivatePrevNextButtons);};// --------------------------  -------------------------- //
Flickity.PrevNextButton=PrevNextButton;return Flickity;});});var pageDots=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// page dots
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,flickity,unipointer,utils);}else{// browser global
factory(window,window.Flickity,window.Unipointer,window.fizzyUIUtils);}})(window,function factory(window,Flickity,Unipointer,utils){PageDots.prototype=Object.create(Unipointer.prototype);PageDots.prototype._create=function(){// create holder element
this.holder=document.createElement('ol');this.holder.className='flickity-page-dots';// create dots, array of elements
this.dots=[];// events
this.handleClick=this.onClick.bind(this);this.on('pointerDown',this.parent.childUIPointerDown.bind(this.parent));};PageDots.prototype.activate=function(){this.setDots();this.holder.addEventListener('click',this.handleClick);this.bindStartEvent(this.holder);// add to DOM
this.parent.element.appendChild(this.holder);};PageDots.prototype.deactivate=function(){this.holder.removeEventListener('click',this.handleClick);this.unbindStartEvent(this.holder);// remove from DOM
this.parent.element.removeChild(this.holder);};PageDots.prototype.setDots=function(){// get difference between number of slides and number of dots
var delta=this.parent.slides.length-this.dots.length;if(delta>0){this.addDots(delta);}else if(delta<0){this.removeDots(-delta);}};PageDots.prototype.addDots=function(count){var fragment=document.createDocumentFragment();var newDots=[];var length=this.dots.length;var max=length+count;for(var i=length;i<max;i++){var dot=document.createElement('li');dot.className='dot';dot.setAttribute('aria-label','Page dot '+(i+1));fragment.appendChild(dot);newDots.push(dot);}this.holder.appendChild(fragment);this.dots=this.dots.concat(newDots);};PageDots.prototype.removeDots=function(count){// remove from this.dots collection
var removeDots=this.dots.splice(this.dots.length-count,count);// remove from DOM
removeDots.forEach(function(dot){this.holder.removeChild(dot);},this);};PageDots.prototype.updateSelected=function(){// remove selected class on previous
if(this.selectedDot){this.selectedDot.className='dot';this.selectedDot.removeAttribute('aria-current');}// don't proceed if no dots
if(!this.dots.length){return;}this.selectedDot=this.dots[this.parent.selectedIndex];this.selectedDot.className='dot is-selected';this.selectedDot.setAttribute('aria-current','step');};PageDots.prototype.onTap=// old method name, backwards-compatible
PageDots.prototype.onClick=function(event){var target=event.target;// only care about dot clicks
if(target.nodeName!='LI'){return;}this.parent.uiChange();var index=this.dots.indexOf(target);this.parent.select(index);};PageDots.prototype.destroy=function(){this.deactivate();this.allOff();};Flickity.PageDots=PageDots;// -------------------------- Flickity -------------------------- //
utils.extend(Flickity.defaults,{});Flickity.createMethods.push('_createPageDots');var proto=Flickity.prototype;proto._createPageDots=function(){if(!this.options.pageDots){return;}this.pageDots=new PageDots(this);// events
this.on('activate',this.activatePageDots);this.on('select',this.updateSelectedPageDots);this.on('cellChange',this.updatePageDots);this.on('resize',this.updatePageDots);this.on('deactivate',this.deactivatePageDots);};proto.activatePageDots=function(){this.pageDots.activate();};proto.updateSelectedPageDots=function(){this.pageDots.updateSelected();};proto.updatePageDots=function(){this.pageDots.setDots();};proto.deactivatePageDots=function(){this.pageDots.deactivate();};// -----  ----- //
Flickity.PageDots=PageDots;return Flickity;});});var player=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// player & autoPlay
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(evEmitter,utils,flickity);}else{// browser global
factory(window.EvEmitter,window.fizzyUIUtils,window.Flickity);}})(window,function factory(EvEmitter,utils,Flickity){// -------------------------- Player -------------------------- //
Player.prototype=Object.create(EvEmitter.prototype);// start play
Player.prototype.play=function(){if(this.state=='playing'){return;}// do not play if page is hidden, start playing when page is visible
var isPageHidden=document.hidden;if(isPageHidden){document.addEventListener('visibilitychange',this.onVisibilityPlay);return;}this.state='playing';// listen to visibility change
document.addEventListener('visibilitychange',this.onVisibilityChange);// start ticking
this.tick();};Player.prototype.tick=function(){// do not tick if not playing
if(this.state!='playing'){return;}var time=this.parent.options.autoPlay;// default to 3 seconds
time=typeof time=='number'?time:3000;var _this=this;// HACK: reset ticks if stopped and started within interval
this.clear();this.timeout=setTimeout(function(){_this.parent.next(true);_this.tick();},time);};Player.prototype.stop=function(){this.state='stopped';this.clear();// remove visibility change event
document.removeEventListener('visibilitychange',this.onVisibilityChange);};Player.prototype.clear=function(){clearTimeout(this.timeout);};Player.prototype.pause=function(){if(this.state=='playing'){this.state='paused';this.clear();}};Player.prototype.unpause=function(){// re-start play if paused
if(this.state=='paused'){this.play();}};// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange=function(){var isPageHidden=document.hidden;this[isPageHidden?'pause':'unpause']();};Player.prototype.visibilityPlay=function(){this.play();document.removeEventListener('visibilitychange',this.onVisibilityPlay);};// -------------------------- Flickity -------------------------- //
utils.extend(Flickity.defaults,{});Flickity.createMethods.push('_createPlayer');var proto=Flickity.prototype;proto._createPlayer=function(){this.player=new Player(this);this.on('activate',this.activatePlayer);this.on('uiChange',this.stopPlayer);this.on('pointerDown',this.stopPlayer);this.on('deactivate',this.deactivatePlayer);};proto.activatePlayer=function(){if(!this.options.autoPlay){return;}this.player.play();this.element.addEventListener('mouseenter',this);};// Player API, don't hate the ... thanks I know where the door is
proto.playPlayer=function(){this.player.play();};proto.stopPlayer=function(){this.player.stop();};proto.pausePlayer=function(){this.player.pause();};proto.unpausePlayer=function(){this.player.unpause();};proto.deactivatePlayer=function(){this.player.stop();this.element.removeEventListener('mouseenter',this);};// ----- mouseenter/leave ----- //
// pause auto-play on hover
proto.onmouseenter=function(){if(!this.options.pauseAutoPlayOnHover){return;}this.player.pause();this.element.addEventListener('mouseleave',this);};// resume auto-play on hover off
proto.onmouseleave=function(){this.player.unpause();this.element.removeEventListener('mouseleave',this);};// -----  ----- //
Flickity.Player=Player;return Flickity;});});var addRemoveCell=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// add, remove cell
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,flickity,utils);}else{// browser global
factory(window,window.Flickity,window.fizzyUIUtils);}})(window,function factory(window,Flickity,utils){// append cells to a document fragment
// -------------------------- add/remove cell prototype -------------------------- //
var proto=Flickity.prototype;/**
 * Insert, prepend, or append cells
 * @param {[Element, Array, NodeList]} elems - Elements to insert
 * @param {Integer} index - Zero-based number to insert
 */proto.insert=function(elems,index){var cells=this._makeCells(elems);if(!cells||!cells.length){return;}var len=this.cells.length;// default to append
index=index===undefined?len:index;// add cells with document fragment
var fragment=getCellsFragment(cells);// append to slider
var isAppend=index==len;if(isAppend){this.slider.appendChild(fragment);}else{var insertCellElement=this.cells[index].element;this.slider.insertBefore(fragment,insertCellElement);}// add to this.cells
if(index===0){// prepend, add to start
this.cells=cells.concat(this.cells);}else if(isAppend){// append, add to end
this.cells=this.cells.concat(cells);}else{// insert in this.cells
var endCells=this.cells.splice(index,len-index);this.cells=this.cells.concat(cells).concat(endCells);}this._sizeCells(cells);this.cellChange(index,true);};proto.append=function(elems){this.insert(elems,this.cells.length);};proto.prepend=function(elems){this.insert(elems,0);};/**
 * Remove cells
 * @param {[Element, Array, NodeList]} elems - ELements to remove
 */proto.remove=function(elems){var cells=this.getCells(elems);if(!cells||!cells.length){return;}var minCellIndex=this.cells.length-1;// remove cells from collection & DOM
cells.forEach(function(cell){cell.remove();var index=this.cells.indexOf(cell);minCellIndex=Math.min(index,minCellIndex);utils.removeFrom(this.cells,cell);},this);this.cellChange(minCellIndex,true);};/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */proto.cellSizeChange=function(elem){var cell=this.getCell(elem);if(!cell){return;}cell.getSize();var index=this.cells.indexOf(cell);this.cellChange(index);};/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 * @param {Boolean} isPositioningSlider - Positions slider after selection
 */proto.cellChange=function(changedCellIndex,isPositioningSlider){var prevSelectedElem=this.selectedElement;this._positionCells(changedCellIndex);this._getWrapShiftCells();this.setGallerySize();// update selectedIndex
// try to maintain position & select previous selected element
var cell=this.getCell(prevSelectedElem);if(cell){this.selectedIndex=this.getCellSlideIndex(cell);}this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex);this.emitEvent('cellChange',[changedCellIndex]);// position slider
this.select(this.selectedIndex);// do not position slider after lazy load
if(isPositioningSlider){this.positionSliderAtSelected();}};// -----  ----- //
return Flickity;});});var lazyload=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){// lazyload
(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(window,flickity,utils);}else{// browser global
factory(window,window.Flickity,window.fizzyUIUtils);}})(window,function factory(window,Flickity,utils){Flickity.createMethods.push('_createLazyload');var proto=Flickity.prototype;proto._createLazyload=function(){this.on('select',this.lazyLoad);};proto.lazyLoad=function(){var lazyLoad=this.options.lazyLoad;if(!lazyLoad){return;}// get adjacent cells, use lazyLoad option for adjacent count
var adjCount=typeof lazyLoad=='number'?lazyLoad:0;var cellElems=this.getAdjacentCellElements(adjCount);// get lazy images in those cells
var lazyImages=[];cellElems.forEach(function(cellElem){var lazyCellImages=getCellLazyImages(cellElem);lazyImages=lazyImages.concat(lazyCellImages);});// load lazy images
lazyImages.forEach(function(img){new LazyLoader(img,this);},this);};// -------------------------- LazyLoader -------------------------- //
/**
 * class to handle loading images
 * @param {Image} img - Image element
 * @param {Flickity} flickity - Flickity instance
 */LazyLoader.prototype.handleEvent=utils.handleEvent;LazyLoader.prototype.load=function(){this.img.addEventListener('load',this);this.img.addEventListener('error',this);// get src & srcset
var src=this.img.getAttribute('data-flickity-lazyload')||this.img.getAttribute('data-flickity-lazyload-src');var srcset=this.img.getAttribute('data-flickity-lazyload-srcset');// set src & serset
this.img.src=src;if(srcset){this.img.setAttribute('srcset',srcset);}// remove attr
this.img.removeAttribute('data-flickity-lazyload');this.img.removeAttribute('data-flickity-lazyload-src');this.img.removeAttribute('data-flickity-lazyload-srcset');};LazyLoader.prototype.onload=function(event){this.complete(event,'flickity-lazyloaded');};LazyLoader.prototype.onerror=function(event){this.complete(event,'flickity-lazyerror');};LazyLoader.prototype.complete=function(event,className){// unbind events
this.img.removeEventListener('load',this);this.img.removeEventListener('error',this);var cell=this.flickity.getParentCell(this.img);var cellElem=cell&&cell.element;this.flickity.cellSizeChange(cellElem);this.img.classList.add(className);this.flickity.dispatchEvent('lazyLoad',event,cellElem);};// -----  ----- //
Flickity.LazyLoader=LazyLoader;return Flickity;});});var index_es_js=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/*!
 * Flickity v2.3.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */(function(window,factory){// universal module definition
if(module.exports){// CommonJS
module.exports=factory(flickity,drag,prevNextButton,pageDots,player,addRemoveCell,lazyload);}})(window,function factory(Flickity){return Flickity;});});var ComplementaryProducts=/*#__PURE__*/function(){pxs_complementary_products_dist_index_es_createClass(ComplementaryProducts,[{value:function(){}},{value:function(){}}]);return ComplementaryProducts;}();/* harmony default export */const pxs_complementary_products_dist_index_es=ComplementaryProducts;;// CONCATENATED MODULE: ./source/scripts/sections/Product.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticProduct.js
;// CONCATENATED MODULE: ./source/scripts/helpers/ScrollLink.js
;// CONCATENATED MODULE: ./source/scripts/components/ShowMoreToggle.js
const noOverflowClass='show-more__content-wrapper--no-overflow';;// CONCATENATED MODULE: ./source/scripts/sections/StaticProductCompare.js
/**
 * Gets comma separated product handles from `compare` query parameter
 * @returns [String] Product handles
 */const getCompareHandles=()=>{const{}=new URL(window.location);const handles=searchParams.get('compare');if(typeof handles==='string'&&handles!==''){return handles.split(',');}return[];};const updateUrlForHandles=handles=>{if(window.Shopify&&window.Shopify.designMode)return;const[productHandle,...compareHandles]=handles;const url=new URL(window.location);url.searchParams.set('compare',compareHandles.join(','));if(productHandle){url.pathname=url.pathname.replace(/\/[^/]+$/,`/${productHandle}`);}history.replaceState({},'',url);};const generateBaseUrl=rootUrl=>{const separator=/\/$/.test(rootUrl)?'':'/';return`${rootUrl}${separator}products`;};const lastRowClass='product-compare__table-row--last';;// CONCATENATED MODULE: ./source/scripts/helpers/FlickityA11yPatch.js
;// CONCATENATED MODULE: ./source/scripts/components/ProductRowScroller.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticProductRecommendations.js
// eslint-disable-line
;// CONCATENATED MODULE: ./source/scripts/sections/StaticRecentlyViewed.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticSearch.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticUtilityBar.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticSubCollectionsMenuList.js
;// CONCATENATED MODULE: ./source/scripts/components/FeaturedCollection.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticSubcollectionsFeaturedCollection.js
;// CONCATENATED MODULE: ./source/scripts/sections/FacetedFilterCollection.js
;// CONCATENATED MODULE: ./source/scripts/sections/FacetedFilterSearch.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicBlogPosts.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicPromoBlocks.js
// Adjusts the height of the block so it can contain the wrapper within it
const adjustHeight=block=>{const $block=jquery_default()(block);const $wrapper=$block.find('.promo-block--content-wrapper');const padding=window.getComputedStyle($block[0],null).getPropertyValue('padding-top').replace('px','');if($block.innerHeight()-padding*2<$wrapper.innerHeight()){$block.css({});$wrapper.css({});}};// Removes height settings on the block because they only need to be there for small screens
const resetHeight=block=>{const $block=jquery_default()(block);const $wrapper=$block.find('.promo-block--content-wrapper');$block.css({});$wrapper.css({});};;// CONCATENATED MODULE: ./source/scripts/sections/DynamicFeaturedCollection.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicMenuList.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicCollectionList.js
;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-countdown-timer/dist/index.es.js
/*!
 * @pixelunion/pxs-countdown-timer v3.0.1
 * (c) 2025 Pixel Union
 */var CountdownTimer=/*#__PURE__*/function(){pxs_countdown_timer_dist_index_es_createClass(CountdownTimer,[{value:function(){}/**
     * Implements a self-adjusting timer.
     * 
     * setTimeout has no guarantees that it will be accurate. Therefore,
     * we'll calculate how much "drift" (i.e. delay per each iteration of setTimeout)
     * has occurred and keep adjusting the setTimeout delay accordingly.
     */},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}}]);return CountdownTimer;}();/* harmony default export */const pxs_countdown_timer_dist_index_es=CountdownTimer;;// CONCATENATED MODULE: ./source/scripts/sections/DynamicCountdownTimer.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicProduct.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicRichText.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicSearch.js
;// CONCATENATED MODULE: ./source/scripts/components/Youtube.js
const api='https://www.youtube.com/iframe_api';let apiLoadedCallbacks=[];let apiLoaded=false;window.onYouTubeIframeAPIReady=()=>{apiLoadedCallbacks.forEach(apiLoadedCallback=>apiLoadedCallback());apiLoadedCallbacks=[];apiLoaded=true;};;// CONCATENATED MODULE: ./source/scripts/components/Vimeo.js
const Vimeo_api='https://player.vimeo.com/api/player.js';let Vimeo_apiLoaded=false;;// CONCATENATED MODULE: ./source/scripts/components/Video.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicVideo.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicNewsletter.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicHighlightsBanner.js
;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-shoppable-image/dist/index.es.js
/*!
 * @pixelunion/pxs-shoppable-image v1.0.2
 * (c) 2024 Pixel Union
 */var pxs_shoppable_image_dist_index_es_EventHandler_1=pxs_shoppable_image_dist_index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var pxs_shoppable_image_dist_index_es_EventHandler=pxs_shoppable_image_dist_index_es_unwrapExports(pxs_shoppable_image_dist_index_es_EventHandler_1);var ShoppableImage=/*#__PURE__*/function(){pxs_shoppable_image_dist_index_es_createClass(ShoppableImage,[{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}},{value:function(){}}]);return ShoppableImage;}();/* harmony default export */const pxs_shoppable_image_dist_index_es=ShoppableImage;;// CONCATENATED MODULE: ./source/scripts/sections/DynamicShoppableImage.js
;// CONCATENATED MODULE: ./source/scripts/sections/DynamicTestimonials.js
;// CONCATENATED MODULE: ./source/scripts/templates/Account.js
;// CONCATENATED MODULE: ./source/scripts/templates/Contact.js
;// CONCATENATED MODULE: ./source/scripts/templates/GiftCard.js
;// CONCATENATED MODULE: ./source/scripts/templates/Page.js
;// CONCATENATED MODULE: ./source/scripts/templates/Order.js
;// CONCATENATED MODULE: ./source/scripts/components/BackToTop.js
;// CONCATENATED MODULE: ./source/scripts/components/ProductCompareDrawerContent.js
;// CONCATENATED MODULE: ./source/scripts/components/ProductCompareFlyout.js
const ProductCompareFlyout_storageKey='pxuProductCompareFlyoutV1';;// CONCATENATED MODULE: ./source/scripts/helpers/FlickityTouchFix.js
// This is a helper class to fix a touch issue that came up in flickity
// on iOS devices as of version 13. It should smooth out some of the scroll
// and swipe issues that flickity is having on that version of iOS.
const flickityTouchFix=()=>{let touchingSlider=false;let touchStartCoordsX=0;const onTouchStart=e=>{if(e.target.closest&&e.target.closest('.flickity-slider')){touchingSlider=true;touchStartCoordsX=e.touches[0].pageX;}else{touchingSlider=false;}};const onTouchMove=e=>{if(!(touchingSlider&&e.cancelable)){return;}if(Math.abs(e.touches[0].pageX-touchStartCoordsX)>10){e.preventDefault();}};document.body.addEventListener('touchstart',onTouchStart);document.body.addEventListener('touchmove',onTouchMove,{});};/* harmony default export */const FlickityTouchFix=flickityTouchFix;;// CONCATENATED MODULE: ./source/scripts/helpers/ContainSwatchTooltips.js
;// CONCATENATED MODULE: ./source/scripts/helpers/LoadInAnimations.js
const LoadInAnimations_classes={};const mappingSelector='[type="application/pxs-animation-mapping+json"]';/**
 * Find common parent of this block and the closest animation mapping block.
 *
 * @param {HTMLElement} node Block from which to begin search.
 */const getMappingParentFromBlock=({})=>parentNode.querySelector(mappingSelector)?parentNode:getMappingParentFromBlock(parentNode);const LoadInAnimations_reset=(block,elements)=>{block.style.animationName='none';block.classList.add(LoadInAnimations_classes.resetBlock);elements.forEach(element=>{element.style.animationName='none';});};const removeReset=(block,elements)=>{block.style.animationName='';block.classList.remove(LoadInAnimations_classes.resetBlock);elements.forEach(element=>{element.style.animationName='';});};const play=(block,elements)=>{block.style.animationPlayState='running';block.classList.add(LoadInAnimations_classes.playBlock);elements.forEach(element=>{element.style.animationPlayState='running';});};const pause=(block,elements)=>{block.style.animationPlayState='';block.classList.remove(LoadInAnimations_classes.playBlock);elements.forEach(element=>{element.style.animationPlayState='';});};/**
 * Play, or reset animations for a collection of blocks.
 *
 * @param {[HTMLElement]} blocks Blocks to process
 * @param {String} state One of 'play' or 'reset'.
 */const loadInAnimations=(blocks,state='play')=>{const callNextFrame=[];if(state==='reset'){blocks.forEach(block=>{const elements=block.querySelectorAll(`.${LoadInAnimations_classes.element}`);pause(block,elements);LoadInAnimations_reset(block,elements);callNextFrame.push(()=>{removeReset(block,elements);});});const section=getMappingParentFromBlock(blocks[0]);section.classList.remove(LoadInAnimations_classes.playSection);section.classList.add(LoadInAnimations_classes.resetSection);callNextFrame.push(()=>{section.classList.remove(LoadInAnimations_classes.resetSection);});}else{blocks.forEach((block,blockIndex)=>{// Set sequence for blocks
block.style.setProperty('--pxu-lia-outer-sequence',blockIndex);// Set sequence for sub elements (heading, text, button, etc)
const elements=block.querySelectorAll(`.${LoadInAnimations_classes.element}`);elements.forEach((element,elementIndex)=>{element.style.setProperty('--pxu-lia-inner-sequence',elementIndex);});if(block.classList.contains(LoadInAnimations_classes.playBlock)){LoadInAnimations_reset(block,elements);callNextFrame.push(()=>{removeReset(block,elements);play(block,elements);});}else{play(block,elements);}const section=getMappingParentFromBlock(blocks[0]);if(section.classList.contains(LoadInAnimations_classes.playSection)){section.classList.add(LoadInAnimations_classes.resetSection);callNextFrame.push(()=>{section.classList.remove(LoadInAnimations_classes.resetSection);section.classList.add(LoadInAnimations_classes.playSection);});}else{section.classList.add(LoadInAnimations_classes.playSection);}});}window.requestAnimationFrame(()=>callNextFrame.forEach(fn=>fn()));};/**
 * Manually trigger load-in animations. Existing animations will be reset and replayed.
 *
 * @param {[HTMLElement]} blocks Blocks for which to play animations
 */const playLoadInAnimations=blocks=>loadInAnimations(blocks,'play');/**
 * Manually reset load-in animations to initial state.
 *
 * @param {[HTMLElement]} blocks Blocks for which to reset animations
 */const resetLoadInAnimations=blocks=>loadInAnimations(blocks,'reset');const intersectionCallback=(entries,observer)=>{const toAnimate=new Map();entries.forEach(entry=>{if(entry.isIntersecting){// Animations only run once so stop observing
observer.unobserve(entry.target);// Find all blocks on same level that are now intersecting and arrange by parent section
const parentSequence=getMappingParentFromBlock(entry.target);const existingSiblings=toAnimate.get(parentSequence);toAnimate.set(parentSequence,existingSiblings?[...existingSiblings,entry.target]:[entry.target]);}});toAnimate.forEach((blocks,parent)=>playLoadInAnimations(blocks,parent));};let blockObserver=null;/**
 * Removes blocks from the global intersection observer for load in animations.
 *
 * @param {[HTMLElement]} blocks Blocks to stop observing for automatic load-in-animation play
 */const removeLoadInAnimationsAutoplay=blocks=>blocks.forEach(block=>blockObserver&&blockObserver.unobserve(block));const initLoadInAnimationsAutoplay=()=>{// This assumes that animated elements are arranged by section,
// block, and element. Animations are triggered when blocks
// enter view, and are sequenced within sections by block and by subElement.
// Sequencing information is applied as custom properties that can be referenced in css.
blockObserver=new IntersectionObserver(intersectionCallback,{});if(!('reduceAnimations'in document.body.dataset)){const observe=parent=>{parent.querySelectorAll(`.${LoadInAnimations_classes.block}`).forEach(block=>blockObserver.observe(block));};observe(document);}};;// CONCATENATED MODULE: ./source/scripts/Empire.js
// jQuery plugins
// eslint-disable-line
// eslint-disable-line
// Global imports
// Shared sections
// Responsive Images
// eslint-disable-line
// Section Manager
// Polyfills
// Static Sections
// Dynamic sections
// Templates
// Components
// Flickity iOS fix
const initEmpire=()=>{initLoadInAnimationsAutoplay();rimg_shopify_dist_index_es.init('[data-rimg="lazy"]',{});const initRipple=()=>setupRippleEffect(document);if('requestIdleCallback'in window){window.requestIdleCallback(initRipple);}else{initRipple();}const sections=new Sections();// Static sections
sections.register('static-header',section=>new StaticHeader(section));sections.register('static-announcement',section=>new StaticAnnouncement(section));sections.register('static-footer',section=>new StaticFooter(section));sections.register('static-article',section=>new StaticArticle(section));sections.register('static-blog',section=>new StaticBlog(section));sections.register('static-cart',section=>new StaticCart(section));sections.register('static-collection',section=>new StaticCollection(section));sections.register('static-collection-faceted-filters',section=>new FacetedFilterCollection(section));sections.register('static-subcollections-menu',section=>new StaticSubCollectionsMenuList(section));sections.register('static-password',section=>new StaticPassword(section));sections.register('static-product',section=>new StaticProduct(section));sections.register('static-product-compare',section=>new StaticProductCompare(section));sections.register('static-product-recommendations',section=>new StaticProductRecommendations(section));sections.register('static-recently-viewed',section=>new StaticRecentlyViewed(section));sections.register('static-search',section=>new StaticSearch(section));sections.register('static-search-faceted-filters',section=>new FacetedFilterSearch(section));sections.register('static-utility-bar',section=>new StaticUtilityBar(section));sections.register('static-subcollections-featured-collection',section=>new StaticSubcollectionsFeaturedCollection(section));// Dynamic sections (lazy loaded)
sections.register('dynamic-blog-posts',section=>new DynamicTwitterFeed(section),{});sections.register('dynamic-promo-mosaic',section=>new DynamicPromoBlocks(section),{});sections.register('dynamic-menu-list',section=>new DynamicMenuList(section),{});sections.register('dynamic-collection-list',section=>new DynamicCollectionList(section),{});sections.register('dynamic-countdown-timer',section=>new DynamicCountdownTimer(section),{});sections.register('dynamic-featured-collection',section=>new DynamicFeaturedCollection(section),{});sections.register('dynamic-featured-product',section=>new DynamicProduct(section),{});sections.register('dynamic-rich-text',section=>new DynamicRichText(section),{});sections.register('dynamic-page',section=>new DynamicRichText(section),{});sections.register('dynamic-custom-liquid',section=>new DynamicRichText(section),{});sections.register('dynamic-html',section=>new DynamicRichText(section),{});sections.register('dynamic-search',section=>new DynamicSearch(section),{});sections.register('dynamic-highlights-banner',section=>new DynamicHighlightsBanner(section));sections.register('dynamic-video',section=>new DynamicVideo(section),{});sections.register('pxs-newsletter',section=>new DynamicNewsletter(section),{});sections.register('pxs-map',section=>new dist_index_es(section),{});sections.register('pxs-shoppable-image',section=>new DynamicShoppableImage(section),{});sections.register('dynamic-testimonials',section=>new DynamicTestimonials(section),{});sections.register('age-gate',section=>new PageAgeGate(section));sections.register('pxs-faq',section=>new index_es(section));if(document.body.classList.contains('template-giftcard')){new GiftCard();}if(document.querySelector('[data-template-account]')){new Account();}if(document.querySelector('[data-template-contact]')){new Contact();}if(document.body.classList.contains('template-page')){new Page();}if(document.body.classList.contains('template-order')){new Order();}if(document.querySelector('[data-swatch-tooltip]')){new ContainSwatchTooltips();}const compareDrawer=document.querySelector('[data-product-compare-drawer]');if(compareDrawer){new ProductCompareFlyout(compareDrawer);}const backToTop=document.querySelector('[data-back-to-top]');if(backToTop){new BackToTop(backToTop);}};FlickityTouchFix();if(checkPolyfills.length){script_default()(checkPolyfills,initEmpire);}else{initEmpire();}const ageGatePage=document.getElementById('age-gate-page');if(ageGatePage){new SiteAgeGate(ageGatePage);}})();/******/})();//# sourceMappingURL=empire.js.map?1755751621630