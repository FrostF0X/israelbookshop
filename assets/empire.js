/******/(()=>{// webpackBootstrap
/******/var __webpack_modules__={/***/646:(/***/(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:true});/**
 * Reads the content property on the documentElement ::before pseudo element
 * for a string of ordered, comma-separated, breakpoint names.
 *
 * @returns An ordered array of strings representing the breakpoint names
 *
 */function readCSSBreakpoints(){return window.getComputedStyle(document.documentElement,':before').getPropertyValue('content').replace(/"/g,'').split(',');}/**
 * Reads the content property on the documentElement ::after pseudo element
 * for a string of the current breakpoint name. This value is updated using
 * dynamically using media queries and should match a value found in
 * the ::before pseudo element.
 *
 * @returns A string representing the current breakpoint name
 *
 */function readCSSCurrentBreakpoint(){return window.getComputedStyle(document.documentElement,':after').getPropertyValue('content').replace(/"/g,'');}var callbacks=[];var cssBreakpoints=readCSSBreakpoints();var CSSBreakpoint=/** @class */function(){function CSSBreakpoint(cssBreakpoint){this.cssBreakpoint=cssBreakpoint;}Object.defineProperty(CSSBreakpoint.prototype,"value",{});/**
     * Checks whether this breakpoint is at least the input breakpoint
     *
     * @param breakpointName - The input breakpoint name
     * @returns Whether this breakpoint is the same or greater than the input breakpoint
     *
     */CSSBreakpoint.prototype.min=function(breakpointName){var comparison=cssBreakpoints.indexOf(this.value)-cssBreakpoints.indexOf(breakpointName);return comparison>=0;};/**
     * Checks whether this breakpoint is at most the input breakpoint
     *
     * @param breakpointName - The input breakpoint name
     * @returns Whether this breakpoint is the same or less than the input breakpoint
     *
     */CSSBreakpoint.prototype.max=function(breakpointName){var comparison=cssBreakpoints.indexOf(this.value)-cssBreakpoints.indexOf(breakpointName);return comparison<=0;};/**
     * Checks whether this breakpoint is at within the input breakpoint start
     * and input breakpoint end, inclusive
     *
     * @param breakpointNameStart - The starting input breakpoint name
     * @param breakpointNameEnd - The ending input breakpoint name
     * @returns Whether this breakpoint is the same or greater than the starting input
     *          breakpoint and the same or less than the ending input breakpoint
     *
     */CSSBreakpoint.prototype.range=function(breakpointNameStart,breakpointNameEnd){var indexCurrent=cssBreakpoints.indexOf(this.value);var indexStart=cssBreakpoints.indexOf(breakpointNameStart);var indexEnd=cssBreakpoints.indexOf(breakpointNameEnd);return indexStart<=indexCurrent&&indexCurrent<=indexEnd;};/**
     * Checks whether this breakpoint is one of the input breakpoints
     *
     * @param breakpointNames - One or more input breakpoint names
     * @returns Whether this breakpoint is one of the input breakpoints
     *
     */CSSBreakpoint.prototype.is=function(){var _this=this;var breakpointNames=[];for(var _i=0;_i<arguments.length;_i++){breakpointNames[_i]=arguments[_i];}return breakpointNames.some(function(breakpoint){return breakpoint===_this.value;});};return CSSBreakpoint;}();var breakpoints={current:new CSSBreakpoint(readCSSCurrentBreakpoint())};/**
 * Gets the breakpoints
 *
 * @returns The current and previous breakpoint
 *
 */function get(){return breakpoints;}exports.get=get;/**
 * Adds an event listener to be called when a breakpoint changes
 *
 * @param callback - The function to be called when a breakpoint changes
 *
 */function onChange(callback){if(callbacks.indexOf(callback)===-1){callbacks.push(callback);}}exports.onChange=onChange;/**
 * Removes an event listener to be called when a breakpoint changes
 *
 * @param callback - The function to be removed from the set of event listeners
 *
 */function offChange(callback){var index=callbacks.indexOf(callback);if(index!==-1){callbacks.splice(index,1);}}exports.offChange=offChange;var currentMin=function(breakpointName){return breakpoints.current.min(breakpointName);};exports.min=currentMin;var currentMax=function(breakpointName){return breakpoints.current.max(breakpointName);};exports.max=currentMax;var currentRange=function(breakpointNameStart,breakpointNameEnd){return breakpoints.current.range(breakpointNameStart,breakpointNameEnd);};exports.range=currentRange;var currentIs=function(){var _a;var breakpointNames=[];for(var _i=0;_i<arguments.length;_i++){breakpointNames[_i]=arguments[_i];}return(_a=breakpoints.current).is.apply(_a,breakpointNames);};exports.is=currentIs;/*
 * document.styleSheets is considered experimental technology; however,
 * the majority of current browsers implement this functionality.
 *
 * One drawback is under certain conditions, stylesheets may become
 * available due to security rules in the browser and we must be able to
 * fallback gracefully.
 */var styleSheetList=document.styleSheets;var mediaLists=Object.keys(styleSheetList).reduce(function(accumulator,key){var stylesheet=styleSheetList[key];if(!stylesheet.href||stylesheet.href.indexOf('theme')===-1){return accumulator;}try{var cssRules=stylesheet.cssRules;for(var i=0;i<cssRules.length;i++){var cssRule=stylesheet.cssRules[i];if(!(cssRule instanceof CSSMediaRule)){continue;}for(var j=0;j<cssRules.length;j++){var cssMediaCssRule=cssRule.cssRules[j];if(!(cssMediaCssRule instanceof CSSStyleRule)){continue;}if(cssMediaCssRule.selectorText&&cssMediaCssRule.selectorText.indexOf('html::after')!==-1){accumulator.push(cssRule.media);}}}}catch(_a){return accumulator;}return accumulator;},[]);/*
 * Use window.matchMedia when stylesheets are accessible in the browser.
 * matchMedia is theoretically more performant than listening to every resize
 * event because it only fires when a media query boundary is crossed.
 *
 * If stylesheets aren't available, revert back to using the resize event.
 */if(mediaLists.length>0){mediaLists.forEach(function(mediaList){var mql=window.matchMedia(mediaList.mediaText);mql.addListener(function(){var cssCurrentBreakpoint=readCSSCurrentBreakpoint();if(breakpoints.current.value!==cssCurrentBreakpoint){breakpoints.previous=breakpoints.current;breakpoints.current=new CSSBreakpoint(cssCurrentBreakpoint);callbacks.forEach(function(callback){return callback(breakpoints);});}});});}else{window.addEventListener('resize',function(){var cssCurrentBreakpoint=readCSSCurrentBreakpoint();if(breakpoints.current.value!==cssCurrentBreakpoint){breakpoints.previous=breakpoints.current;breakpoints.current=new CSSBreakpoint(cssCurrentBreakpoint);callbacks.forEach(function(callback){return callback(breakpoints);});}});}/***/}),/***/766:(/***/(__unused_webpack_module,exports)=>{"use strict";var __webpack_unused_export__;__webpack_unused_export__=true;var EventHandler=/** @class */function(){function EventHandler(){this.events=[];}EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({listener:listener});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{el:el,event:event,listener:listener};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports.Z=EventHandler;/***/}),/***/263:(/***/module=>{"use strict";// forEach method, could be shipped as part of an Object Literal/Module
function forEach(array,callback,scope){var index=0;for(index=0;index<array.length;index+=1){callback.call(scope,array[index],index);// passes back stuff we need
}}function removeClass(el,className){// Return if it doesn't already have the className
if(!hasClass(el,className))return;var regex=new RegExp('^'+className+'| +'+className,'g');el.className=el.className.replace(regex,'');}/**
 * See {@link https://stackoverflow.com/revisions/2117523/11 Stack Overflow}
 * An RFC4122 v4 compliant uuid solution
 */function init(groupedContent){var triggers=groupedContent.triggers;var pairings=groupedContent.pairings;triggers.setAttribute('role','tablist');forEach(pairings,function(pairing,index){pairing.trigger.setAttribute('role','tab');pairing.trigger.setAttribute('aria-controls',groupedContent.namespace+'-'+groupedContent.id+'-'+index+'-content');if(pairing.trigger.children.length>0){forEach(pairing.trigger.children,function(child){child.setAttribute('tabIndex','-1');});}if(hasClass(pairing.trigger,'active')){pairing.trigger.setAttribute('aria-selected','true');pairing.trigger.setAttribute('tabIndex','0');}else{pairing.trigger.setAttribute('tabIndex','-1');}pairing.content.id=groupedContent.namespace+'-'+groupedContent.id+'-'+index+'-content';pairing.content.setAttribute('role','tabpanel');if(!hasClass(pairing.content,'active')){pairing.content.setAttribute('aria-hidden','true');}});}function update(groupedContent){var pairings=groupedContent.pairings;forEach(pairings,function(pairing){pairing.trigger.removeAttribute('aria-selected');pairing.content.removeAttribute('aria-hidden');if(hasClass(pairing.trigger,'active')){pairing.trigger.setAttribute('aria-selected','true');pairing.trigger.setAttribute('tabIndex','0');}else{pairing.trigger.setAttribute('tabIndex','-1');}if(!hasClass(pairing.content,'active')){pairing.content.setAttribute('aria-hidden','true');}});}var a11y={};var asyncGenerator=function(){function AsyncGenerator(gen){var front,back;function send(key,arg){return new Promise(function(resolve,reject){var request={arg:arg,resolve:resolve};if(back){back=back.next=request;}else{front=back=request;resume(key,arg);}});}function resume(key,arg){try{var result=gen[key](arg);var value=result.value;if(value instanceof AwaitValue){Promise.resolve(value.value).then(function(arg){resume("next",arg);},function(arg){resume("throw",arg);});}else{settle(result.done?"return":"normal",result.value);}}catch(err){settle("throw",err);}}function settle(type,value){switch(type){case"return":front.resolve({});break;case"throw":front.reject(value);break;default:front.resolve({});break;}front=front.next;if(front){resume(front.key,front.arg);}else{back=null;}}this._invoke=send;if(typeof gen.return!=="function"){this.return=undefined;}}if(typeof Symbol==="function"&&Symbol.asyncIterator){AsyncGenerator.prototype[Symbol.asyncIterator]=function(){return this;};}AsyncGenerator.prototype.next=function(arg){return this._invoke("next",arg);};AsyncGenerator.prototype.throw=function(arg){return this._invoke("throw",arg);};AsyncGenerator.prototype.return=function(arg){return this._invoke("return",arg);};return{};}();var classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}};var createClass=function(){return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();/** A class for creating, managing, and destroying groupable content as tabs. */var TabsLayout=function(){createClass(TabsLayout,[{},{},{value:function _handleKeydown(event){var trigger=event.currentTarget;var pairing=findPairingFromPairingTrigger(this.pairings,trigger);var pairingIndex=this.pairings.indexOf(pairing);var prevIndex=pairingIndex-1<0?this.pairings.length-1:pairingIndex-1;var nextIndex=pairingIndex+1>=this.pairings.length?0:pairingIndex+1;var nextPairing=null;switch(event.key){case'ArrowLeft':nextPairing=this.pairings[prevIndex];break;case'ArrowRight':nextPairing=this.pairings[nextIndex];break;default:nextPairing=null;break;}// Fast exit if we can't find the tab or tabs
if(nextPairing===null)return;event.preventDefault();forEach(this.pairings,function(inactivePairing){removeClass(inactivePairing.trigger,'active');removeClass(inactivePairing.content,'active');});addClass(nextPairing.trigger,'active');addClass(nextPairing.content,'active');nextPairing.trigger.focus();a11y.update(this.groupedContent);}},{}]);return TabsLayout;}();function init$1(groupedContent){var pairings=groupedContent.pairings;forEach(pairings,function(pairing,index){pairing.trigger.setAttribute('role','button');pairing.trigger.setAttribute('aria-controls',groupedContent.namespace+'-'+groupedContent.id+'-'+index+'-content');pairing.trigger.setAttribute('tabIndex','0');if(pairing.trigger.children.length>0){forEach(pairing.trigger.children,function(child){child.setAttribute('tabIndex','-1');});}if(hasClass(pairing.trigger,'active')){pairing.trigger.setAttribute('aria-expanded','true');}else{pairing.trigger.setAttribute('aria-expanded','false');}pairing.content.id=groupedContent.namespace+'-'+groupedContent.id+'-'+index+'-content';if(!hasClass(pairing.content,'active')){pairing.content.setAttribute('aria-hidden','true');}});}function update$1(groupedContent){var pairings=groupedContent.pairings;forEach(pairings,function(pairing){pairing.content.removeAttribute('aria-hidden');if(hasClass(pairing.trigger,'active')){pairing.trigger.setAttribute('aria-expanded','true');}else{pairing.trigger.setAttribute('aria-expanded','false');}if(!hasClass(pairing.content,'active')){pairing.content.setAttribute('aria-hidden','true');}});}var a11y$1={init:init$1};/** A class for creating, managing, and destroying groupable content as an accordion. */var AccordionLayout=function(){function AccordionLayout(groupedContent){classCallCheck(this,AccordionLayout);this.groupedContent=groupedContent;this.pairings=groupedContent.pairings;this.events=[];this._handleKeydown=this._handleKeydown.bind(this);this._handleClick=this._handleClick.bind(this);this._init(this.pairings);a11y$1.init(this.groupedContent);}createClass(AccordionLayout,[{},{value:function _init(){var _this=this;forEach(this.pairings,function(pairing){var trigger=pairing.trigger;var content=pairing.content;trigger.parentNode.insertBefore(content,trigger.nextSibling);trigger.addEventListener('keydown',_this._handleKeydown);trigger.addEventListener('click',_this._handleClick);_this.events.push({});_this.events.push({type:'click',fn:_this._handleClick});});this.groupedContent.contents.remove();}},{key:'_handleKeydown',value:function _handleKeydown(event){var trigger=event.currentTarget;var pairing=findPairingFromPairingTrigger(this.pairings,trigger);// Fast exit if enter isn't pressed or we can't find the group
if(event.key!=='Enter'||pairing===null)return;event.preventDefault();toggleClass(pairing.trigger,'active');toggleClass(pairing.content,'active');a11y$1.update(this.groupedContent);}},{key:'_handleClick',value:function _handleClick(event){var trigger=event.currentTarget;var pairing=findPairingFromPairingTrigger(this.pairings,trigger);// Fast exit if we can't find the group
if(pairing===null)return;event.preventDefault();toggleClass(pairing.trigger,'active');toggleClass(pairing.content,'active');a11y$1.update(this.groupedContent);}}]);return AccordionLayout;}();/**
 * Returns an array of nodes related to the heading node.
 * @param {node} heading - The heading node to search for content from.
 * @returns {node[]}
 */function getHeadingContent(heading){var headingTagNames=['H1','H2','H3','H4','H5','H6'];var tagNameIndex=headingTagNames.indexOf(heading.tagName);var content=[];var sibling=heading.nextElementSibling;while(sibling!==null&&(headingTagNames.indexOf(sibling.tagName)===-1||headingTagNames.indexOf(sibling.tagName)>tagNameIndex)){content.push(sibling);sibling=sibling.nextElementSibling;}return content;}/**
 * Returns an object array representing the heading tree from a given node.
 * Root nodes are evaluated differently, and requires the evaluatingRoot flag
 * to be true.
 * @param {node} el - The node being evaluated.
 * @param {node[]} children - The children of the evaluated node.
 * @param {boolean} [evaluatingRoot] - Whether to evaluate as root node.
 * @returns {Object[]}
 *//**
 * Returns groupings of headings that meet the minimum sequence value
 * and don't contain any invalid headings.
 * @param {Object[]} headings - An array of heading objects.
 * @param {int[]} invalidHeadings - An array of invalid heading integers,
 *                                  representing indexes of headings.
 * @param {*} minInSequence - Minimum headings in sequence before being considered
 *                            as a grouping.
 * @returns {Object[][]}
 */function getHeadingGroupsInSequence(headings,invalidHeadings,minInSequence){var headingGroupsInSequence=[];var currentHeadingGroupInSequence=[];var currentSequence=0;for(var i=0;i<headings.length;i+=1){if(invalidHeadings.indexOf(i)===-1){currentHeadingGroupInSequence.push(headings[i]);currentSequence+=1;if(i!==headings.length-1&&headings[i].el.tagName!==headings[i+1].el.tagName&&invalidHeadings.indexOf(i+1)){currentHeadingGroupInSequence=[];currentSequence=0;}else if(i!==0&&headings[i].el.tagName!==headings[i-1].el.tagName){currentHeadingGroupInSequence.pop();currentSequence-=1;if(currentSequence>=minInSequence){headingGroupsInSequence.push(currentHeadingGroupInSequence);}currentHeadingGroupInSequence=[headings[i]];currentSequence=1;}}}if(currentSequence>=minInSequence){headingGroupsInSequence.push(currentHeadingGroupInSequence);}return headingGroupsInSequence;}/**
 * Generates necessary DOM elements to group related content.
 * Returns a object array representing the grouped content.
 * @param {Object[]} children - An array of objects.
 * @returns {Object[]}
 *//**
 * Returns all groupable content within the supplied node.
 * @param {node} node - A node to traverse for groupable content.
 * @returns {Object[][]}
 *//*
 * Recursive function:
 *  Returns all groups of headings that
 *  are elegible to become grouped content.
 *//**
 * When static parsing isn't enough, there's intelliparse™!
 * Searches through dom content to find heading groupings that
 * are elegible to become tab groups.
 * Assumes that content is in a flattened hierarchy in the dom
 * and interprets increasing heading values as a deeper level of nesting.
 * Returns all groupable content as an array of object arrays.
 * @param {node} el - The node who's content will be searched for groupable content.
 * @returns {Object[][]}
 *//**
 * Parses content from a given node based on a static structure.
 * The structure is as follows:
 * <ul class="tabs">
 *   <li class="active">Tab 1</li>
 *   <li>Tab 2</li>
 *   <li>Tab 3</li>
 * </ul>
 *
 * <ul class="tabs-content">
 *   <li class="active">
 *     <p>Tab 1 content goes here.</p>
 *   </li>
 *   <li>
 *     <p>Tab 2 content goes here.</p>
 *   </li>
 *   <li>
 *     <p>Tab 3 content goes here.</p>
 *   </li>
 * </ul>
 * Returns all groupable content as an array of object arrays.
 * @param {node} el - The node who's content will be searched for groupable content.
 * @returns {Object[][]}
 *//**
 * Returns all groupable content as an array of object arrays.
 * @param {node} content - The node to parse for groupable content.
 * @param {boolean} intelliparse - Whether to use intelligent parsing.
 * @returns {Object[][]}
 */function parse(content){var intelliparse=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var groupedContentSet=intelliparse?intelliParse(content):staticParse(content);return groupedContentSet;}/** A class for creating, managing, and destroying groupable content. */var GroupedContent=function(){/**
   * Create grouped content
   * @param {node} el - The element to search for groupable content in.
   * @param {Object}  [options] - Additional options
   * @param {string}  [options.layout] - The layout to display groupable content in.
   * @param {boolean} [options.intelliparse] - The parsing algorithm used to find content with.
   *//** Unload all grouped content instances */createClass(GroupedContent,[{}]);return GroupedContent;}();module.exports=GroupedContent;/***/}),/***/970:(/***/()=>{/*!
 * Revealer 3.0.0
 *
 * Copyright 2021, Pixel Union - http://pixelunion.net
 * Released under the MIT license
 */(function($){// check for trend event (make sure jquery.trend is included)
if(typeof $.event.special.trend!=="object"){console.warn("Please make sure jquery.trend is included! Otherwise revealer won't work.");}// Simple requestAnimationFrame polyfill
var raf=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(fn){window.setTimeout(fn,1000/60);};// Public API
var methods={toggle:function(el,force){if(methods.isVisible(el)){methods.hide(el,force);}else{methods.show(el,force);}}};// jQuery plugin
$.fn.revealer=function(method,force){// Get action
var action=methods[method||"toggle"];if(!action)return this;// Run action
if(method==="isVisible"){return action(this);}return this.each(function(){action($(this),force);});};})(jQuery);/***/}),/***/186:(/***/()=>{/*!
 * Trend 1.0.0
 *
 * Fail-safe TransitionEnd event for jQuery.
 *
 * Adds a new "trend" event that can be used in browsers that don't
 * support "transitionend".
 *
 * NOTE: Only supports being bound with "jQuery.one".
 *
 * Copyright 2021, Pixel Union - http://pixelunion.net
 * Released under the MIT license
 */;(function($){// Prefixed transitionend event names
var transitionEndEvents="webkitTransitionEnd "+"otransitionend "+"oTransitionEnd "+"msTransitionEnd "+"transitionend";// Prefixed transition duration property names
var transitionDurationProperties=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-ms-transition-duration","-o-transition-duration","-khtml-transition-duration"];// Prefixed transition delay property names
var transitionDelayProperties=["transition-delay","-moz-transition-delay","-webkit-transition-delay","-ms-transition-delay","-o-transition-delay","-khtml-transition-delay"];// Parses a CSS time value into milliseconds.
var parseTime=function(s){s=s.replace(/\s/,"");var v=window.parseFloat(s);return s.match(/[^m]s$/i)?v*1000:v;};// Parses the longest time unit found in a series of CSS properties.
// Returns a value in milliseconds.
var parseProperties=function(el,properties){var duration=0;for(var i=0;i<properties.length;i++){// Get raw CSS value
var value=el.css(properties[i]);if(!value)continue;// Multiple transitions--pick the longest
if(value.indexOf(",")!==-1){var values=value.split(",");var durations=function(){var results=[];for(var i=0;i<values.length;i++){var duration=parseTime(values[i]);results.push(duration);}return results;}();duration=Math.max.apply(Math,durations);}// Single transition
else{duration=parseTime(value);}// Accept first vaue
break;}return duration;};$.event.special.trend={// Triggers an event handler when an element is done transitioning.
//
// Handles browsers that don't support transitionend by adding a
// timeout with the transition duration.
add:function(handleObj){var el=$(this);var fired=false;// Mark element as being in transition
el.data("trend",true);// Calculate a fallback duration. + 20 because some browsers fire
// timeouts faster than transitionend.
var time=parseProperties(el,transitionDurationProperties)+parseProperties(el,transitionDelayProperties)+20;var cb=function(e){// transitionend events can be sent for each property. Let's just
// skip all but the first. Also handles the timeout callback.
if(fired)return;// Child elements that also have transitions can be fired before we
// complete. This will catch and ignore those. Unfortunately, we'll
// have to rely on the timeout in these cases.
if(e&&e.srcElement!==el[0])return;// Mark element has not being in transition
el.data("trend",false);// Callback
fired=true;if(handleObj.handler)handleObj.handler();};el.one(transitionEndEvents,cb);el.data("trend-timeout",window.setTimeout(cb,time));},remove:function(handleObj){var el=$(this);el.off(transitionEndEvents);window.clearTimeout(el.data("trend-timeout"));}};})(jQuery);/***/}),/***/722:(/***/()=>{class VariantSelection extends HTMLElement{static get observedAttributes(){return['variant'];}constructor(){super();this._loaded=false;this._productFetcher=Promise.resolve(false);this._onMainElChange=event=>{this.variant=event.currentTarget.value;};const mainInputEl=this.querySelector('input[data-variants]');this._mainEl=mainInputEl||this.querySelector('select[data-variants]');}set variant(value){if(value){this.setAttribute('variant',value);}else{this.removeAttribute('variant');}}get variant(){return this.getAttribute('variant');}connectedCallback(){this._productFetcher=this._fetchProduct();const mainInputEl=this.querySelector('input[data-variants]');this._mainEl=mainInputEl||this.querySelector('select[data-variants]');this._mainEl.addEventListener('change',this._onMainElChange);this.variant=this._mainEl.value;}disconnectedCallback(){this._mainEl.removeEventListener('change',this._onMainElChange);this._mainEl=null;}attributeChangedCallback(name,oldValue,newValue){if(oldValue===newValue)return;switch(name){case'variant':this._changeVariant(newValue);break;}}getProduct(){return this._loaded?Promise.resolve(this._product):this._productFetcher;}getVariant(){return this.getProduct().then(product=>product?product.variants.find(v=>v.id.toString()===this.variant)||false:false).catch(()=>false);}getState(){return this.getVariant().then(variant=>variant?'selected':this.getAttribute('variant'));}_changeVariant(value){this._dispatchEvent(value).then(()=>{this._mainEl.value=value;});}_fetchProduct(){return fetch(this.getAttribute('product-url')).then(response=>response.json()).then(product=>{this._product=product;return product;}).catch(()=>{this._product=null;}).finally(()=>{this._loaded=true;});}_dispatchEvent(value){return this.getProduct().then(product=>{const variant=product?product.variants.find(v=>v.id.toString()===value)||false:false;const state=variant?'selected':value;const event=new CustomEvent('variant-change',{detail:{product}});this.dispatchEvent(event);});}}const unselectedValue='not-selected';const unavailableValue='unavailable';const inputTypeDropdown='select';const inputTypeRadio='radio';const valueElementType={select:'option',radio:'input[type="radio"]'};function setSelectedOptions(selectOptions,radioOptions,selectedOptions){selectOptions.forEach(({option})=>{option.value=selectedOptions[parseInt(option.dataset.variantOptionIndex,10)];});radioOptions.forEach(({values})=>{values.forEach(value=>{value.checked=value.value===selectedOptions[parseInt(value.dataset.variantOptionValueIndex,10)];});});}/*
 * @param optionsEls [Element list] : Input elements for variant options
 *
 */function getOptions(optionsEls){const select=[];const radio=[];for(let i=0;i<optionsEls.length;i++){const optionEl=optionsEls[i];// Options within select inputs or radio groups
const variantOptionIndex=parseInt(optionEl.dataset.variantOptionIndex,10);const valueMap={};const wrappers=optionEl.matches('[data-variant-option-value-wrapper]')?[optionEl]:Array.prototype.slice.call(optionEl.querySelectorAll('[data-variant-option-value-wrapper]'));const optionValueEls=optionEl.matches('[data-variant-option-value]')?[optionEl]:Array.prototype.slice.call(optionEl.querySelectorAll('[data-variant-option-value]'));if(!optionValueEls.length)break;let current=unselectedValue;optionValueEls.forEach(el=>{valueMap[el.value]={};if(el.hasAttribute('checked')||el.hasAttribute('selected')){current=el.value;}});const option={optionValueEls,valueMap};if(optionValueEls[0].matches(valueElementType.select)){option.type=inputTypeDropdown;select.push(option);}else if(optionValueEls[0].matches(valueElementType.radio)){option.type=inputTypeRadio;radio.push(option);}}return{select,radio};}function getSelectedOptions(product,selectOptions,radioOptions){const options=product.options.map(()=>unselectedValue);selectOptions.forEach(({option})=>{if(option.value!==unselectedValue){options[parseInt(option.dataset.variantOptionIndex,10)]=option.value;}});radioOptions.forEach(({optionValueEls})=>{optionValueEls.forEach(value=>{if(value.checked){options[parseInt(value.dataset.variantOptionValueIndex,10)]=value.value;}});});return options;}function getOptionsAccessibility(variants,option){const optionValues=Object.keys(option.valueMap);if(optionValues.includes(unselectedValue)){option.valueMap[unselectedValue].accessible=true;}variants.forEach(variant=>{if(variant.available){variant.options.forEach(variantOption=>{if(optionValues.includes(variantOption)){option.valueMap[variantOption].accessible=true;}});}});return option;}// Returns whether the variant matches the selection filter prefix.
// // E.g. ["small", "red", "cotton"] matches ["small", "red"] but not ["small", "green"].
// // It also matches prefixes like [] and ["*", "red", "*"].
function getVariantFromPartialSelection(variants,selection){return variants.find(variant=>{if(variant.available){return selection.every((s,i)=>s===unselectedValue||variant.options[i]===s);}return false;});}function updateOptions(product,selectOptions,radioOptions,selection,disableUnavailableOptions,removeUnavailableOptions,selectFirstAvailable){let options=[...selectOptions,...radioOptions];const{variants}=product;let nextAvailableVariant=null;options=options.map(option=>getOptionsAccessibility(variants,option));options.sort((a,b)=>a.variantOptionIndex-b.variantOptionIndex);if(options.length===0){return;}if(disableUnavailableOptions||removeUnavailableOptions){// Only do this if we're disabling/hiding unavailable
// Ensure the current selection has a match by unsetting options if necessary.
// Does the selection match a variant? If not, unselect options starting at the last one
while(!variants.some(v=>matchesPrefix(v,selection))){// Find the last set option and unset it.
let i=selection.length-1;while(i>=0&&selection[i]===unselectedValue){--i;}if(i===-1){break;}if(options[i].option.value){if(!selectFirstAvailable){options[i].option.value=unselectedValue;options[i].current=unselectedValue;}}selection[i]=unselectedValue;}}// Determine which values in each option are selectable given the current selection.
for(let i=0;i<options.length;++i){const values=Object.keys(options[i].valueMap);for(let j=0;j<values.length;++j){// input options
const prefix=[...selection.slice(0,i),values[j]];// given the current selection (ie. green/small), do any variants match?
// If no variants match, it disables the option value in this iteration
// disabling 'dead end' option values
const selectable=variants.some(v=>matchesPrefix(v,prefix));options[i].valueMap[values[j]].available=selectable;}}// If 'select first available variant' is enabled and we have some 'not-selected' values,
// we should select options that match a variant
if(selectFirstAvailable&&selection.includes(unselectedValue)){nextAvailableVariant=getVariantFromPartialSelection(variants,selection);if(nextAvailableVariant){selection=nextAvailableVariant.options;}options.forEach(optionData=>{const currentSelection=selection[optionData.variantOptionIndex];optionData.current=currentSelection;if(optionData.type===inputTypeDropdown){optionData.option.value=currentSelection;optionData.optionValueEls.forEach(e=>{e.selected=e.value===currentSelection;});}else{optionData.optionValueEls.forEach(e=>{e.checked=e.value===currentSelection;});}});}else if(!selectFirstAvailable&&selection.includes(unselectedValue)){options.forEach(optionData=>{// When selectFirstAvailableVariant is false, 
// we need to manually set the 'checked' value to false for radio selections
// because they don't have a default 'not-selected' option
if(selection[optionData.variantOptionIndex]===unselectedValue&&optionData.type!==inputTypeDropdown){optionData.optionValueEls.forEach(e=>{e.checked=false;});}});}for(let i=0;i<product.options.length;i++){// Corresponding select dropdown, if it exists
const optionValues=options.find(({option})=>{if(parseInt(option.dataset.variantOptionIndex,10)===i){return true;}return false;});if(optionValues){const fragment=document.createDocumentFragment();const{option,wrappers,optionValueEls}=optionValues;for(let j=optionValueEls.length-1;j>=0;j--){const wrapper=wrappers[j];const optionValue=optionValueEls[j];const{value}=optionValue;const{available,accessible}=optionValues.valueMap[value];if(optionValue!==unselectedValue){optionValue.disabled=disableUnavailableOptions&&!available;optionValue.dataset.variantOptionAccessible=accessible;optionValue.dataset.variantOptionAvailable=available;if(!removeUnavailableOptions||accessible){fragment.insertBefore(wrapper,fragment.firstElementChild);}}}option.innerHTML='';option.appendChild(fragment);const chosenValue=optionValueEls.find(value=>value.selected||value.checked);option.dataset.variantOptionChosenValue=chosenValue&&chosenValue.value!==unselectedValue?chosenValue.value:false;}}return selection;}class OptionsSelection extends HTMLElement{static get observedAttributes(){return['variant-selection','disable-unavailable','remove-unavailable'];}static synchronize(mainOptionsSelection){const mainVariantSelection=mainOptionsSelection.getVariantSelection();// Fast return if we aren't associated with a variant selection
if(!mainVariantSelection)return Promise.resolve(false);return mainOptionsSelection.getSelectedOptions().then(selectedOptions=>{// Update all other options selects associated with the same variant ui
const optionsSelections=document.querySelectorAll('options-selection');optionsSelections.forEach(optionsSelection=>{if(optionsSelection!==mainOptionsSelection&&optionsSelection.getVariantSelection()===mainVariantSelection){optionsSelection.setSelectedOptions(selectedOptions);}});}).then(()=>true);}constructor(){super();this.style.display='';this._events=[];this._onChangeFn=this._onOptionChange.bind(this);this._optionsEls=this.querySelectorAll('[data-variant-option]');const options=getOptions(this._optionsEls);this._selectOptions=options.select;this._radioOptions=options.radio;this._associateVariantSelection(this.getAttribute('variant-selection'));}set variantSelection(value){if(value){this.setAttribute('variant-selection',value);}else{this.removeAttribute('variant-selection');}}get variantSelection(){return this.getAttribute('variant-selection');}connectedCallback(){this._optionsEls=this.querySelectorAll('[data-variant-option]');const options=getOptions(this._optionsEls);this._selectOptions=options.select;this._radioOptions=options.radio;this._associateVariantSelection(this.getAttribute('variant-selection'));this._selectOptions.forEach(({option})=>{option.addEventListener('change',this._onChangeFn);this._events.push({fn:this._onChangeFn});});this._radioOptions.forEach(({})=>{optionValueEls.forEach(value=>{value.addEventListener('change',this._onChangeFn);this._events.push({});});});this._onOptionChange();}disconnectedCallback(){this._resetOptions();this._events.forEach(({})=>el.removeEventListener('change',fn));this._events=[];}attributeChangedCallback(name,_oldValue,newValue){switch(name){case'variant-selection':this._associateVariantSelection(newValue);break;case'disable-unavailable':case'remove-unavailable':this._updateOptions(this.hasAttribute('disable-unavailable'),this.hasAttribute('remove-unavailable'),this.hasAttribute('select-first-available'));break;}}getSelectedOptions(){if(!this._variantSelection)return Promise.resolve(null);return this._variantSelection.getProduct().then(product=>{if(!product)return null;return getSelectedOptions(product,this._selectOptions,this._radioOptions);});}getVariantSelection(){return this._variantSelection;}setSelectedOptions(selectedOptions){setSelectedOptions(this._selectOptions,this._radioOptions,selectedOptions);return this._updateOptions(this.hasAttribute('disable-unavailable'),this.hasAttribute('remove-unavailable'),this.hasAttribute('select-first-available'),selectedOptions);}_associateVariantSelection(id){this._variantSelection=id?document.getElementById(id):this.closest('variant-selection');}_updateLabels(){// Update any labels
const unavailableText=this.getAttribute('data-unavailable-text');for(let i=0;i<this._optionsEls.length;i++){const optionsEl=this._optionsEls[i];let optionsNameEl=null;let{}=optionsEl;while(parentElement&&!optionsNameEl){const tmpOptionsNameEl=parentElement.querySelector('[data-variant-option-name]');if(tmpOptionsNameEl){optionsNameEl=tmpOptionsNameEl;}({}=parentElement);}if(optionsNameEl){optionsNameEl.dataset.variantOptionChosenValue=optionsEl.dataset.variantOptionChosenValue;if(optionsEl.dataset.variantOptionChosenValue!=='false'){optionsNameEl.innerHTML=optionsNameEl.dataset.variantOptionName;const optionNameValueSpan=optionsNameEl.querySelector('span');if(optionNameValueSpan){optionNameValueSpan.innerHTML=optionsEl.dataset.variantOptionChosenValue;}}else{optionsNameEl.innerHTML=optionsNameEl.dataset.variantOptionChooseName;}}if(!this.hasAttribute('disable-unavailable')){const selectOptions=optionsEl.querySelectorAll('option');selectOptions.forEach(option=>{let optionLabel=option.innerHTML.replace(`- ${unavailableText}`,'');if(option.dataset.variantOptionAvailable==='false'&&option.value!==unselectedValue){optionLabel=`${optionLabel} - ${unavailableText}`;}option.innerHTML=optionLabel;});}}}_resetOptions(){return this._updateOptions(false,false,this.hasAttribute('select-first-available'));}_updateOptions(disableUnavailableOptions,removeUnavailableOptions,selectFirstAvailable,selectedOptions=null){if(!this._variantSelection)return Promise.resolve(false);return this._variantSelection.getProduct().then(product=>{const updatedSelection=updateOptions(product,this._selectOptions,this._radioOptions,selectedOptions||getSelectedOptions(product,this._selectOptions,this._radioOptions),disableUnavailableOptions,removeUnavailableOptions,selectFirstAvailable);// Use the 'updated' selection in case its changed due to disabled options
this._updateVariantSelection(product,updatedSelection);this._updateLabels();}).then(()=>true);}_updateVariantSelection(product,selectedOptions){if(!this._variantSelection)return;const variant=getVariantFromSelectedOptions(product.variants,selectedOptions);const isNotSelected=selectedOptions.some(option=>option===unselectedValue);// Update master select
if(variant){this._variantSelection.variant=variant.id;}else{this._variantSelection.variant=isNotSelected?unselectedValue:unavailableValue;}}_onOptionChange(){if(!this._variantSelection)return;this._variantSelection.getProduct().then(product=>{if(!product)return;let selectedOptions=getSelectedOptions(product,this._selectOptions,this._radioOptions);this._updateOptions(this.hasAttribute('disable-unavailable'),this.hasAttribute('remove-unavailable'),this.hasAttribute('select-first-available'),selectedOptions);OptionsSelection.synchronize(this);});}}if(!customElements.get('variant-selection')){customElements.define('variant-selection',VariantSelection);}if(!customElements.get('options-selection')){customElements.define('options-selection',OptionsSelection);}/***/}),/***/741:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 *//*jshint browser: true, strict: true, undef: true, unused: true */(function(window,factory){/*global define: false, module: false */'use strict';// universal module definition
if(true){// AMD
!(__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(){'use strict';var matchesMethod=function(){var ElemProto=window.Element.prototype;// check for the standard method name first
if(ElemProto.matches){return'matches';}// check un-prefixed
if(ElemProto.matchesSelector){return'matchesSelector';}// check vendor prefixes
var prefixes=['webkit','moz','ms','o'];for(var i=0;i<prefixes.length;i++){var prefix=prefixes[i];var method=prefix+'MatchesSelector';if(ElemProto[method]){return method;}}}();return function matchesSelector(elem,selector){return elem[matchesMethod](selector);};});/***/}),/***/158:(/***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 *//* jshint unused: true, undef: true, strict: true */(function(global,factory){// universal module definition
/* jshint strict: false *//* globals define, module, window */if(true){// AMD - RequireJS
!(__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(typeof window!='undefined'?window:this,function(){"use strict";function EvEmitter(){}var proto=EvEmitter.prototype;proto.on=function(eventName,listener){if(!eventName||!listener){return;}// set events hash
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
listener.apply(this,args);}return this;};proto.allOff=function(){delete this._events;delete this._onceEvents;};return EvEmitter;});/***/}),/***/729:(/***/module=>{var selectors=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object"];var css=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";module.exports=function(parentSelector,opts){parentSelector=parentSelector||"body";opts=opts||{};if(isObject(parentSelector)){opts=parentSelector;parentSelector="body";}opts.ignore=opts.ignore||"";opts.players=opts.players||"";var containers=queryAll(parentSelector);if(!hasLength(containers))return;if(!document.getElementById("fit-vids-style")){var head=document.head||document.getElementsByTagName("head")[0];head.appendChild(styles());}var custom=toSelectorArray(opts.players);var ignored=toSelectorArray(opts.ignore);var ignoredSelector=ignored.length>0?ignored.join():null;var selector=selectors.concat(custom).join();if(!hasLength(selector)){return;}containers.forEach(function(container){var videos=queryAll(container,selector);videos.forEach(function(video){if(ignoredSelector&&video.matches(ignoredSelector)){return;}wrap(video);});});};function toSelectorArray(input){if(typeof input==="string"){return input.split(",").map(trim).filter(hasLength);}else if(isArray(input)){return flatten(input.map(toSelectorArray).filter(hasLength));}return input||[];}function wrap(el){if(/fluid-width-video-wrapper/.test(el.parentNode.className)){return;}var widthAttr=parseInt(el.getAttribute("width"),10);var heightAttr=parseInt(el.getAttribute("height"),10);var width=!isNaN(widthAttr)?widthAttr:el.clientWidth;var height=!isNaN(heightAttr)?heightAttr:el.clientHeight;var aspect=height/width;el.removeAttribute("width");el.removeAttribute("height");var wrapper=document.createElement("div");el.parentNode.insertBefore(wrapper,el);wrapper.className="fluid-width-video-wrapper";wrapper.style.paddingTop=aspect*100+"%";wrapper.appendChild(el);}function styles(){var div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+"</style>";return div.childNodes[1];}function hasLength(input){return input.length>0;}function trim(str){return str.replace(/^\s+|\s+$/g,"");}function flatten(input){return[].concat.apply([],input);}function isObject(input){return Object.prototype.toString.call(input)==="[object Object]";}function isArray(input){return Object.prototype.toString.call(input)==="[object Array]";}/***/}),/***/47:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/**
 * Fizzy UI utils v2.0.7
 * MIT license
 *//*jshint browser: true, undef: true, unused: true, strict: true */(function(window,factory){// universal module definition
/*jshint strict: false *//*globals define, module, require */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(741)],__WEBPACK_AMD_DEFINE_RESULT__=function(matchesSelector){return factory(window,matchesSelector);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,matchesSelector){'use strict';var utils={};// ----- extend ----- //
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
return utils;});/***/}),/***/597:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// add, remove cell
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(217),__webpack_require__(47)],__WEBPACK_AMD_DEFINE_RESULT__=function(Flickity,utils){return factory(window,Flickity,utils);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,Flickity,utils){'use strict';// append cells to a document fragment
function getCellsFragment(cells){var fragment=document.createDocumentFragment();cells.forEach(function(cell){fragment.appendChild(cell.element);});return fragment;}// -------------------------- add/remove cell prototype -------------------------- //
var proto=Flickity.prototype;/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */proto.insert=function(elems,index){var cells=this._makeCells(elems);if(!cells||!cells.length){return;}var len=this.cells.length;// default to append
index=index===undefined?len:index;// add cells with document fragment
var fragment=getCellsFragment(cells);// append to slider
var isAppend=index==len;if(isAppend){this.slider.appendChild(fragment);}else{var insertCellElement=this.cells[index].element;this.slider.insertBefore(fragment,insertCellElement);}// add to this.cells
if(index===0){// prepend, add to start
this.cells=cells.concat(this.cells);}else if(isAppend){// append, add to end
this.cells=this.cells.concat(cells);}else{// insert in this.cells
var endCells=this.cells.splice(index,len-index);this.cells=this.cells.concat(cells).concat(endCells);}this._sizeCells(cells);this.cellChange(index,true);};proto.append=function(elems){this.insert(elems,this.cells.length);};proto.prepend=function(elems){this.insert(elems,0);};/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */proto.remove=function(elems){var cells=this.getCells(elems);if(!cells||!cells.length){return;}var minCellIndex=this.cells.length-1;// remove cells from collection & DOM
cells.forEach(function(cell){cell.remove();var index=this.cells.indexOf(cell);minCellIndex=Math.min(index,minCellIndex);utils.removeFrom(this.cells,cell);},this);this.cellChange(minCellIndex,true);};/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */proto.cellSizeChange=function(elem){var cell=this.getCell(elem);if(!cell){return;}cell.getSize();var index=this.cells.indexOf(cell);this.cellChange(index);};/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */proto.cellChange=function(changedCellIndex,isPositioningSlider){var prevSelectedElem=this.selectedElement;this._positionCells(changedCellIndex);this._getWrapShiftCells();this.setGallerySize();// update selectedIndex
// try to maintain position & select previous selected element
var cell=this.getCell(prevSelectedElem);if(cell){this.selectedIndex=this.getCellSlideIndex(cell);}this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex);this.emitEvent('cellChange',[changedCellIndex]);// position slider
this.select(this.selectedIndex);// do not position slider after lazy load
if(isPositioningSlider){this.positionSliderAtSelected();}};// -----  ----- //
return Flickity;});/***/}),/***/880:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// animate
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(47)],__WEBPACK_AMD_DEFINE_RESULT__=function(utils){return factory(window,utils);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,utils){'use strict';// -------------------------- animate -------------------------- //
var proto={};proto.startAnimation=function(){if(this.isAnimating){return;}this.isAnimating=true;this.restingFrames=0;this.animate();};proto.animate=function(){this.applyDragForce();this.applySelectedAttraction();var previousX=this.x;this.integratePhysics();this.positionSlider();this.settle(previousX);// animate next frame
if(this.isAnimating){var _this=this;requestAnimationFrame(function animateFrame(){_this.animate();});}};proto.positionSlider=function(){var x=this.x;// wrap position around
if(this.options.wrapAround&&this.cells.length>1){x=utils.modulo(x,this.slideableWidth);x=x-this.slideableWidth;this.shiftWrapCells(x);}this.setTranslateX(x,this.isAnimating);this.dispatchScrollEvent();};proto.setTranslateX=function(x,is3d){x+=this.cursorPosition;// reverse if right-to-left and using transform
x=this.options.rightToLeft?-x:x;var translateX=this.getPositionValue(x);// use 3D tranforms for hardware acceleration on iOS
// but use 2D when settled, for better font-rendering
this.slider.style.transform=is3d?'translate3d('+translateX+',0,0)':'translateX('+translateX+')';};proto.dispatchScrollEvent=function(){var firstSlide=this.slides[0];if(!firstSlide){return;}var positionX=-this.x-firstSlide.target;var progress=positionX/this.slidesWidth;this.dispatchEvent('scroll',null,[progress,positionX]);};proto.positionSliderAtSelected=function(){if(!this.cells.length){return;}this.x=-this.selectedSlide.target;this.velocity=0;// stop wobble
this.positionSlider();};proto.getPositionValue=function(position){if(this.options.percentPosition){// percent position, round to 2 digits, like 12.34%
return Math.round(position/this.size.innerWidth*10000)*0.01+'%';}else{// pixel positioning
return Math.round(position)+'px';}};proto.settle=function(previousX){// keep track of frames where x hasn't moved
if(!this.isPointerDown&&Math.round(this.x*100)==Math.round(previousX*100)){this.restingFrames++;}// stop animating if resting for 3 or more frames
if(this.restingFrames>2){this.isAnimating=false;delete this.isFreeScrolling;// render position with translateX when settled
this.positionSlider();this.dispatchEvent('settle',null,[this.selectedIndex]);}};proto.shiftWrapCells=function(x){// shift before cells
var beforeGap=this.cursorPosition+x;this._shiftCells(this.beforeShiftCells,beforeGap,-1);// shift after cells
var afterGap=this.size.innerWidth-(x+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,afterGap,1);};proto._shiftCells=function(cells,gap,shift){for(var i=0;i<cells.length;i++){var cell=cells[i];var cellShift=gap>0?shift:0;cell.wrapShift(cellShift);gap-=cell.size.outerWidth;}};proto._unshiftCells=function(cells){if(!cells||!cells.length){return;}for(var i=0;i<cells.length;i++){cells[i].wrapShift(0);}};// -------------------------- physics -------------------------- //
proto.integratePhysics=function(){this.x+=this.velocity;this.velocity*=this.getFrictionFactor();};proto.applyForce=function(force){this.velocity+=force;};proto.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?'freeScrollFriction':'friction'];};proto.getRestingPosition=function(){// my thanks to Steven Wittens, who simplified this math greatly
return this.x+this.velocity/(1-this.getFrictionFactor());};proto.applyDragForce=function(){if(!this.isDraggable||!this.isPointerDown){return;}// change the position to drag position by applying force
var dragVelocity=this.dragX-this.x;var dragForce=dragVelocity-this.velocity;this.applyForce(dragForce);};proto.applySelectedAttraction=function(){// do not attract if pointer down or no slides
var dragDown=this.isDraggable&&this.isPointerDown;if(dragDown||this.isFreeScrolling||!this.slides.length){return;}var distance=this.selectedSlide.target*-1-this.x;var force=distance*this.options.selectedAttraction;this.applyForce(force);};return proto;});/***/}),/***/229:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// Flickity.Cell
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(131)],__WEBPACK_AMD_DEFINE_RESULT__=function(getSize){return factory(window,getSize);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,getSize){'use strict';function Cell(elem,parent){this.element=elem;this.parent=parent;this.create();}var proto=Cell.prototype;proto.create=function(){this.element.style.position='absolute';this.element.setAttribute('aria-hidden','true');this.x=0;this.shift=0;};proto.destroy=function(){// reset style
this.unselect();this.element.style.position='';var side=this.parent.originSide;this.element.style[side]='';};proto.getSize=function(){this.size=getSize(this.element);};proto.setPosition=function(x){this.x=x;this.updateTarget();this.renderPosition(x);};// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget=proto.setDefaultTarget=function(){var marginProperty=this.parent.originSide=='left'?'marginLeft':'marginRight';this.target=this.x+this.size[marginProperty]+this.size.width*this.parent.cellAlign;};proto.renderPosition=function(x){// render position of cell with in slider
var side=this.parent.originSide;this.element.style[side]=this.parent.getPositionValue(x);};proto.select=function(){this.element.classList.add('is-selected');this.element.removeAttribute('aria-hidden');};proto.unselect=function(){this.element.classList.remove('is-selected');this.element.setAttribute('aria-hidden','true');};/**
 * @param {Integer} factor - 0, 1, or -1
**/proto.wrapShift=function(shift){this.shift=shift;this.renderPosition(this.x+this.parent.slideableWidth*shift);};proto.remove=function(){this.element.parentNode.removeChild(this.element);};return Cell;});/***/}),/***/690:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// drag
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(217),__webpack_require__(842),__webpack_require__(47)],__WEBPACK_AMD_DEFINE_RESULT__=function(Flickity,Unidragger,utils){return factory(window,Flickity,Unidragger,utils);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,Flickity,Unidragger,utils){'use strict';// ----- defaults ----- //
utils.extend(Flickity.defaults,{});// ----- create ----- //
Flickity.createMethods.push('_createDrag');// -------------------------- drag prototype -------------------------- //
var proto=Flickity.prototype;utils.extend(proto,Unidragger.prototype);proto._touchActionValue='pan-y';// --------------------------  -------------------------- //
var isTouch='createTouch'in document;var isTouchmoveScrollCanceled=false;proto._createDrag=function(){this.on('activate',this.onActivateDrag);this.on('uiChange',this._uiChangeDrag);this.on('deactivate',this.onDeactivateDrag);this.on('cellChange',this.updateDraggable);// TODO updateDraggable on resize? if groupCells & slides change
// HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
// #457, RubaXa/Sortable#973
if(isTouch&&!isTouchmoveScrollCanceled){window.addEventListener('touchmove',function(){});isTouchmoveScrollCanceled=true;}};proto.onActivateDrag=function(){this.handles=[this.viewport];this.bindHandles();this.updateDraggable();};proto.onDeactivateDrag=function(){this.unbindHandles();this.element.classList.remove('is-draggable');};proto.updateDraggable=function(){// disable dragging if less than 2 slides. #278
if(this.options.draggable=='>1'){this.isDraggable=this.slides.length>1;}else{this.isDraggable=this.options.draggable;}if(this.isDraggable){this.element.classList.add('is-draggable');}else{this.element.classList.remove('is-draggable');}};// backwards compatibility
proto.bindDrag=function(){this.options.draggable=true;this.updateDraggable();};proto.unbindDrag=function(){this.options.draggable=false;this.updateDraggable();};proto._uiChangeDrag=function(){delete this.isFreeScrolling;};// -------------------------- pointer events -------------------------- //
proto.pointerDown=function(event,pointer){if(!this.isDraggable){this._pointerDownDefault(event,pointer);return;}var isOkay=this.okayPointerDown(event);if(!isOkay){return;}this._pointerDownPreventDefault(event);this.pointerDownFocus(event);// blur
if(document.activeElement!=this.element){// do not blur if already focused
this.pointerDownBlur();}// stop if it was moving
this.dragX=this.x;this.viewport.classList.add('is-pointer-down');// track scrolling
this.pointerDownScroll=getScrollPosition();window.addEventListener('scroll',this);this._pointerDownDefault(event,pointer);};// default pointerDown logic, used for staticClick
proto._pointerDownDefault=function(event,pointer){// track start event position
// Safari 9 overrides pageX and pageY. These values needs to be copied. #779
this.pointerDownPointer={pageX:pointer.pageX,pageY:pointer.pageY};// bind move and end events
this._bindPostStartEvents(event);this.dispatchEvent('pointerDown',event,[pointer]);};var focusNodes={INPUT:true,TEXTAREA:true,SELECT:true};proto.pointerDownFocus=function(event){var isFocusNode=focusNodes[event.target.nodeName];if(!isFocusNode){this.focus();}};proto._pointerDownPreventDefault=function(event){var isTouchStart=event.type=='touchstart';var isTouchPointer=event.pointerType=='touch';var isFocusNode=focusNodes[event.target.nodeName];if(!isTouchStart&&!isTouchPointer&&!isFocusNode){event.preventDefault();}};// ----- move ----- //
proto.hasDragStarted=function(moveVector){return Math.abs(moveVector.x)>this.options.dragThreshold;};// ----- up ----- //
proto.pointerUp=function(event,pointer){delete this.isTouchScrolling;this.viewport.classList.remove('is-pointer-down');this.dispatchEvent('pointerUp',event,[pointer]);this._dragPointerUp(event,pointer);};proto.pointerDone=function(){window.removeEventListener('scroll',this);delete this.pointerDownScroll;};// -------------------------- dragging -------------------------- //
proto.dragStart=function(event,pointer){if(!this.isDraggable){return;}this.dragStartPosition=this.x;this.startAnimation();window.removeEventListener('scroll',this);this.dispatchEvent('dragStart',event,[pointer]);};proto.pointerMove=function(event,pointer){var moveVector=this._dragPointerMove(event,pointer);this.dispatchEvent('pointerMove',event,[pointer,moveVector]);this._dragMove(event,pointer,moveVector);};proto.dragMove=function(event,pointer,moveVector){if(!this.isDraggable){return;}event.preventDefault();this.previousDragX=this.dragX;// reverse if right-to-left
var direction=this.options.rightToLeft?-1:1;if(this.options.wrapAround){// wrap around move. #589
moveVector.x=moveVector.x%this.slideableWidth;}var dragX=this.dragStartPosition+moveVector.x*direction;if(!this.options.wrapAround&&this.slides.length){// slow drag
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
function(d,md){return d<=md;}:function(d,md){return d<md;};while(condition(distance,minDistance)){// measure distance to next cell
index+=increment;minDistance=distance;distance=this.getSlideDistance(-restingX,index);if(distance===null){break;}distance=Math.abs(distance);}return{};};/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
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
function getScrollPosition(){return{x:window.pageXOffset,y:window.pageYOffset};}// -----  ----- //
return Flickity;});/***/}),/***/217:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// Flickity main
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(158),__webpack_require__(131),__webpack_require__(47),__webpack_require__(229),__webpack_require__(714),__webpack_require__(880)],__WEBPACK_AMD_DEFINE_RESULT__=function(EvEmitter,getSize,utils,Cell,Slide,animatePrototype){return factory(window,EvEmitter,getSize,utils,Cell,Slide,animatePrototype);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{var _Flickity;}})(window,function factory(window,EvEmitter,getSize,utils,Cell,Slide,animatePrototype){'use strict';// vars
var jQuery=window.jQuery;var getComputedStyle=window.getComputedStyle;var console=window.console;function moveElements(elems,toElem){elems=utils.makeArray(elems);while(elems.length){toElem.appendChild(elems.shift());}}// -------------------------- Flickity -------------------------- //
// globally unique identifiers
var GUID=0;// internal store of all Flickity intances
var instances={};function Flickity(element,options){var queryElement=utils.getQueryElement(element);if(!queryElement){if(console){console.error('Bad element for Flickity: '+(queryElement||element));}return;}this.element=queryElement;// do not initialize twice on same element
if(this.element.flickityGUID){var instance=instances[this.element.flickityGUID];instance.option(options);return instance;}// add jQuery
if(jQuery){this.$element=jQuery(this.element);}// options
this.options=utils.extend({},this.constructor.defaults);this.option(options);// kick things off
this._create();}Flickity.defaults={accessibility:true,// adaptiveHeight: false,
cellAlign:'center',// cellSelector: undefined,
// contain: false,
freeScrollFriction:0.075,// friction when free-scrolling
friction:0.28,// friction when selecting
namespaceJQueryEvents:true,// initialIndex: 0,
percentPosition:true,resize:true,selectedAttraction:0.025,setGallerySize:true// watchCSS: false,
// wrapAround: false
};// hash of methods triggered on _create()
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
 * @param {Object} opts
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
 * @param {Array or NodeList or HTMLElement} elems
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
 * @param {Array} cells
 */proto._sizeCells=function(cells){cells.forEach(function(cell){cell.getSize();});};// --------------------------  -------------------------- //
proto.updateSlides=function(){this.slides=[];if(!this.cells.length){return;}var slide=new Slide(this);this.slides.push(slide);var isOriginLeft=this.originSide=='left';var nextMargin=isOriginLeft?'marginRight':'marginLeft';var canCellFit=this._getCanCellFit();this.cells.forEach(function(cell,i){// just add cell if first cell in slide
if(!slide.cells.length){slide.addCell(cell);return;}var slideWidth=slide.outerWidth-slide.firstMargin+(cell.size.outerWidth-cell.size[nextMargin]);if(canCellFit.call(this,i,slideWidth)){slide.addCell(cell);}else{// doesn't fit, new slide
slide.updateTarget();slide=new Slide(this);this.slides.push(slide);slide.addCell(cell);}},this);// last slide
slide.updateTarget();// update .selectedSlide
this.updateSelectedSlide();};proto._getCanCellFit=function(){var groupCells=this.options.groupCells;if(!groupCells){return function(){return false;};}else if(typeof groupCells=='number'){// group by number. 3 -> [0,1,2], [3,4,5], ...
var number=parseInt(groupCells,10);return function(i){return i%number!==0;};}// default, group by width of slide
// parse '75%
var percentMatch=typeof groupCells=='string'&&groupCells.match(/^(\d+)%$/);var percent=percentMatch?parseInt(percentMatch[1],10)/100:1;return function(i,slideWidth){return slideWidth<=(this.size.innerWidth+1)*percent;};};// alias _init for jQuery plugin .flickity()
proto._init=proto.reposition=function(){this.positionCells();this.positionSliderAtSelected();};proto.getSize=function(){this.size=getSize(this.element);this.setCellAlign();this.cursorPosition=this.size.innerWidth*this.cellAlign;};var cellAlignShorthands={// cell align, then based on origin side
center:{left:0.5,right:0.5},left:{left:0,right:1},right:{right:0,left:1}};proto.setCellAlign=function(){var shorthand=cellAlignShorthands[this.options.cellAlign];this.cellAlign=shorthand?shorthand[this.originSide]:this.options.cellAlign;};proto.setGallerySize=function(){if(this.options.setGallerySize){var height=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=height+'px';}};proto._getWrapShiftCells=function(){// only for wrap-around
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
var jQEvent=jQuery.Event(event);jQEvent.type=type;$event=jQEvent;}this.$element.trigger($event,args);}};// -------------------------- select -------------------------- //
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
 * @param {Element or Number} elem
 */proto.selectCell=function(value,isWrap,isInstant){// get cell
var cell=this.queryCell(value);if(!cell){return;}var index=this.getCellSlideIndex(cell);this.select(index,isWrap,isInstant);};proto.getCellSlideIndex=function(cell){// get index of slides that has cell
for(var i=0;i<this.slides.length;i++){var slide=this.slides[i];var index=slide.cells.indexOf(cell);if(index!=-1){return i;}}};// -------------------------- get cells -------------------------- //
/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */proto.getCell=function(elem){// loop through cells to get the one that matches
for(var i=0;i<this.cells.length;i++){var cell=this.cells[i];if(cell.element==elem){return cell;}}};/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */proto.getCells=function(elems){elems=utils.makeArray(elems);var cells=[];elems.forEach(function(elem){var cell=this.getCell(elem);if(cell){cells.push(cell);}},this);return cells;};/**
 * get cell elements
 * @returns {Array} cellElems
 */proto.getCellElements=function(){return this.cells.map(function(cell){return cell.element;});};/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */proto.getParentCell=function(elem){// first check if elem is cell
var cell=this.getCell(elem);if(cell){return cell;}// try to get parent cell elem
elem=utils.getParent(elem,'.flickity-slider > *');return this.getCell(elem);};/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */proto.getAdjacentCellElements=function(adjCount,index){if(!adjCount){return this.selectedSlide.getCellElements();}index=index===undefined?this.selectedIndex:index;var len=this.slides.length;if(1+adjCount*2>=len){return this.getCellElements();}var cellElems=[];for(var i=index-adjCount;i<=index+adjCount;i++){var slideIndex=this.options.wrapAround?utils.modulo(i,len):i;var slide=this.slides[slideIndex];if(slide){cellElems=cellElems.concat(slide.getCellElements());}}return cellElems;};/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */proto.queryCell=function(selector){if(typeof selector=='number'){// use number as index
return this.cells[selector];}if(typeof selector=='string'){// do not select invalid selectors from hash: #123, #/. #791
if(selector.match(/^[#\.]?[\d\/]/)){return;}// use string as selector, get element
selector=this.element.querySelector(selector);}// get cell from element
return this.getCell(selector);};// -------------------------- events -------------------------- //
proto.uiChange=function(){this.emitEvent('uiChange');};// keep focus on element when child UI elements are clicked
proto.childUIPointerDown=function(event){// HACK iOS does not allow touch events to bubble up?!
if(event.type!='touchstart'){event.preventDefault();}this.focus();};// ----- resize ----- //
proto.onresize=function(){this.watchCSS();this.resize();};utils.debounceMethod(Flickity,'onresize',150);proto.resize=function(){if(!this.isActive){return;}this.getSize();// wrap values
if(this.options.wrapAround){this.x=utils.modulo(this.x,this.slideableWidth);}this.positionCells();this._getWrapShiftCells();this.setGallerySize();this.emitEvent('resize');// update selected index for group slides, instant
// TODO: position can be lost between groups of various numbers
var selectedElement=this.selectedElements&&this.selectedElements[0];this.selectCell(selectedElement,false,true);};// watches the :after property, activates/deactivates
proto.watchCSS=function(){var watchOption=this.options.watchCSS;if(!watchOption){return;}var afterContent=getComputedStyle(this.element,':after').content;// activate if :after { content: 'flickity' }
if(afterContent.indexOf('flickity')!=-1){this.activate();}else{this.deactivate();}};// ----- keydown ----- //
// go previous/next if left/right keys pressed
proto.onkeydown=function(event){// only work if element is in focus
var isNotFocused=document.activeElement&&document.activeElement!=this.element;if(!this.options.accessibility||isNotFocused){return;}var handler=Flickity.keyboardHandlers[event.keyCode];if(handler){handler.call(this);}};Flickity.keyboardHandlers={// left arrow
37:function(){var leftMethod=this.options.rightToLeft?'next':'previous';this.uiChange();this[leftMethod]();},// right arrow
39:function(){var rightMethod=this.options.rightToLeft?'previous':'next';this.uiChange();this[rightMethod]();}};// ----- focus ----- //
proto.focus=function(){// TODO remove scrollTo once focus options gets more support
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
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
 * @param {Element} elem
 * @returns {Flickity}
 */Flickity.data=function(elem){elem=utils.getQueryElement(elem);var id=elem&&elem.flickityGUID;return id&&instances[id];};utils.htmlInit(Flickity,'flickity');if(jQuery&&jQuery.bridget){jQuery.bridget('flickity',Flickity);}// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery=function(jq){jQuery=jq;};Flickity.Cell=Cell;Flickity.Slide=Slide;return Flickity;});/***/}),/***/442:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Flickity v2.2.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(217),__webpack_require__(690),__webpack_require__(410),__webpack_require__(573),__webpack_require__(516),__webpack_require__(597),__webpack_require__(227)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(Flickity){/*jshint strict: false*/return Flickity;});/***/}),/***/227:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// lazyload
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(217),__webpack_require__(47)],__WEBPACK_AMD_DEFINE_RESULT__=function(Flickity,utils){return factory(window,Flickity,utils);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,Flickity,utils){'use strict';Flickity.createMethods.push('_createLazyload');var proto=Flickity.prototype;proto._createLazyload=function(){this.on('select',this.lazyLoad);};proto.lazyLoad=function(){var lazyLoad=this.options.lazyLoad;if(!lazyLoad){return;}// get adjacent cells, use lazyLoad option for adjacent count
var adjCount=typeof lazyLoad=='number'?lazyLoad:0;var cellElems=this.getAdjacentCellElements(adjCount);// get lazy images in those cells
var lazyImages=[];cellElems.forEach(function(cellElem){var lazyCellImages=getCellLazyImages(cellElem);lazyImages=lazyImages.concat(lazyCellImages);});// load lazy images
lazyImages.forEach(function(img){new LazyLoader(img,this);},this);};function getCellLazyImages(cellElem){// check if cell element is lazy image
if(cellElem.nodeName=='IMG'){var lazyloadAttr=cellElem.getAttribute('data-flickity-lazyload');var srcAttr=cellElem.getAttribute('data-flickity-lazyload-src');var srcsetAttr=cellElem.getAttribute('data-flickity-lazyload-srcset');if(lazyloadAttr||srcAttr||srcsetAttr){return[cellElem];}}// select lazy images in cell
var lazySelector='img[data-flickity-lazyload], '+'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';var imgs=cellElem.querySelectorAll(lazySelector);return utils.makeArray(imgs);}// -------------------------- LazyLoader -------------------------- //
/**
 * class to handle loading images
 */LazyLoader.prototype.handleEvent=utils.handleEvent;LazyLoader.prototype.load=function(){this.img.addEventListener('load',this);this.img.addEventListener('error',this);// get src & srcset
var src=this.img.getAttribute('data-flickity-lazyload')||this.img.getAttribute('data-flickity-lazyload-src');var srcset=this.img.getAttribute('data-flickity-lazyload-srcset');// set src & serset
this.img.src=src;if(srcset){this.img.setAttribute('srcset',srcset);}// remove attr
this.img.removeAttribute('data-flickity-lazyload');this.img.removeAttribute('data-flickity-lazyload-src');this.img.removeAttribute('data-flickity-lazyload-srcset');};LazyLoader.prototype.onload=function(event){this.complete(event,'flickity-lazyloaded');};LazyLoader.prototype.onerror=function(event){this.complete(event,'flickity-lazyerror');};LazyLoader.prototype.complete=function(event,className){// unbind events
this.img.removeEventListener('load',this);this.img.removeEventListener('error',this);var cell=this.flickity.getParentCell(this.img);var cellElem=cell&&cell.element;this.flickity.cellSizeChange(cellElem);this.img.classList.add(className);this.flickity.dispatchEvent('lazyLoad',event,cellElem);};// -----  ----- //
Flickity.LazyLoader=LazyLoader;return Flickity;});/***/}),/***/573:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// page dots
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(217),__webpack_require__(704),__webpack_require__(47)],__WEBPACK_AMD_DEFINE_RESULT__=function(Flickity,Unipointer,utils){return factory(window,Flickity,Unipointer,utils);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,Flickity,Unipointer,utils){// -------------------------- PageDots -------------------------- //
'use strict';function PageDots(parent){this.parent=parent;this._create();}PageDots.prototype=Object.create(Unipointer.prototype);PageDots.prototype._create=function(){// create holder element
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
Flickity.PageDots=PageDots;return Flickity;});/***/}),/***/516:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// player & autoPlay
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(158),__webpack_require__(47),__webpack_require__(217)],__WEBPACK_AMD_DEFINE_RESULT__=function(EvEmitter,utils,Flickity){return factory(EvEmitter,utils,Flickity);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(EvEmitter,utils,Flickity){'use strict';// -------------------------- Player -------------------------- //
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
Flickity.Player=Player;return Flickity;});/***/}),/***/410:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;// prev/next buttons
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(217),__webpack_require__(704),__webpack_require__(47)],__WEBPACK_AMD_DEFINE_RESULT__=function(Flickity,Unipointer,utils){return factory(window,Flickity,Unipointer,utils);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,Flickity,Unipointer,utils){'use strict';var svgURI='http://www.w3.org/2000/svg';// -------------------------- PrevNextButton -------------------------- //
function PrevNextButton(direction,parent){this.direction=direction;this.parent=parent;this._create();}PrevNextButton.prototype=Object.create(Unipointer.prototype);PrevNextButton.prototype._create=function(){// properties
this.isEnabled=true;this.isPrevious=this.direction==-1;var leftDirection=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==leftDirection;var element=this.element=document.createElement('button');element.className='flickity-button flickity-prev-next-button';element.className+=this.isPrevious?' previous':' next';// prevent button from submitting form http://stackoverflow.com/a/10836076/182183
element.setAttribute('type','button');// init as disabled
this.disable();element.setAttribute('aria-label',this.isPrevious?'Previous':'Next');// create arrow
var svg=this.createSVG();element.appendChild(svg);// events
this.parent.on('select',this.update.bind(this));this.on('pointerDown',this.parent.childUIPointerDown.bind(this.parent));};PrevNextButton.prototype.activate=function(){this.bindStartEvent(this.element);this.element.addEventListener('click',this);// add to DOM
this.parent.element.appendChild(this.element);};PrevNextButton.prototype.deactivate=function(){// remove from DOM
this.parent.element.removeChild(this.element);// click events
this.unbindStartEvent(this.element);this.element.removeEventListener('click',this);};PrevNextButton.prototype.createSVG=function(){var svg=document.createElementNS(svgURI,'svg');svg.setAttribute('class','flickity-button-icon');svg.setAttribute('viewBox','0 0 100 100');var path=document.createElementNS(svgURI,'path');var pathMovements=getArrowMovements(this.parent.options.arrowShape);path.setAttribute('d',pathMovements);path.setAttribute('class','arrow');// rotate arrow
if(!this.isLeft){path.setAttribute('transform','translate(100, 100) rotate(180) ');}svg.appendChild(path);return svg;};// get SVG path movmement
function getArrowMovements(shape){// use shape as movement if string
if(typeof shape=='string'){return shape;}// create movement string
return'M '+shape.x0+',50'+' L '+shape.x1+','+(shape.y1+50)+' L '+shape.x2+','+(shape.y2+50)+' L '+shape.x3+',50 '+' L '+shape.x2+','+(50-shape.y2)+' L '+shape.x1+','+(50-shape.y1)+' Z';}PrevNextButton.prototype.handleEvent=utils.handleEvent;PrevNextButton.prototype.onclick=function(){if(!this.isEnabled){return;}this.parent.uiChange();var method=this.isPrevious?'previous':'next';this.parent[method]();};// -----  ----- //
PrevNextButton.prototype.enable=function(){if(this.isEnabled){return;}this.element.disabled=false;this.isEnabled=true;};PrevNextButton.prototype.disable=function(){if(!this.isEnabled){return;}this.element.disabled=true;this.isEnabled=false;};PrevNextButton.prototype.update=function(){// index of first or last slide, if previous or next
var slides=this.parent.slides;// enable is wrapAround and at least 2 slides
if(this.parent.options.wrapAround&&slides.length>1){this.enable();return;}var lastIndex=slides.length?slides.length-1:0;var boundIndex=this.isPrevious?0:lastIndex;var method=this.parent.selectedIndex==boundIndex?'disable':'enable';this[method]();};PrevNextButton.prototype.destroy=function(){this.deactivate();this.allOff();};// -------------------------- Flickity prototype -------------------------- //
utils.extend(Flickity.defaults,{prevNextButtons:true,arrowShape:{y1:50}});Flickity.createMethods.push('_createPrevNextButtons');var proto=Flickity.prototype;proto._createPrevNextButtons=function(){if(!this.options.prevNextButtons){return;}this.prevButton=new PrevNextButton(-1,this);this.nextButton=new PrevNextButton(1,this);this.on('activate',this.activatePrevNextButtons);};proto.activatePrevNextButtons=function(){this.prevButton.activate();this.nextButton.activate();this.on('deactivate',this.deactivatePrevNextButtons);};proto.deactivatePrevNextButtons=function(){this.prevButton.deactivate();this.nextButton.deactivate();this.off('deactivate',this.deactivatePrevNextButtons);};// --------------------------  -------------------------- //
Flickity.PrevNextButton=PrevNextButton;return Flickity;});/***/}),/***/714:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;// slide
(function(window,factory){// universal module definition
/* jshint strict: false */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(){'use strict';function Slide(parent){this.parent=parent;this.isOriginLeft=parent.originSide=='left';this.cells=[];this.outerWidth=0;this.height=0;}var proto=Slide.prototype;proto.addCell=function(cell){this.cells.push(cell);this.outerWidth+=cell.size.outerWidth;this.height=Math.max(cell.size.outerHeight,this.height);// first cell stuff
if(this.cells.length==1){this.x=cell.x;// x comes from first cell
var beginMargin=this.isOriginLeft?'marginLeft':'marginRight';this.firstMargin=cell.size[beginMargin];}};proto.updateTarget=function(){var endMargin=this.isOriginLeft?'marginRight':'marginLeft';var lastCell=this.getLastCell();var lastMargin=lastCell?lastCell.size[endMargin]:0;var slideWidth=this.outerWidth-(this.firstMargin+lastMargin);this.target=this.x+this.firstMargin+slideWidth*this.parent.cellAlign;};proto.getLastCell=function(){return this.cells[this.cells.length-1];};proto.select=function(){this.cells.forEach(function(cell){cell.select();});};proto.unselect=function(){this.cells.forEach(function(cell){cell.unselect();});};proto.getCellElements=function(){return this.cells.map(function(cell){return cell.element;});};return Slide;});/***/}),/***/131:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 *//* jshint browser: true, strict: true, undef: true, unused: true *//* globals console: false */(function(window,factory){/* jshint strict: false *//* globals define, module */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(){'use strict';// -------------------------- helpers -------------------------- //
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
 */function setup(){// setup once
if(isSetup){return;}isSetup=true;// -------------------------- box sizing -------------------------- //
/**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */var div=document.createElement('div');div.style.width='200px';div.style.padding='1px 2px 3px 4px';div.style.borderStyle='solid';div.style.borderWidth='1px 2px 3px 4px';div.style.boxSizing='border-box';var body=document.body||document.documentElement;body.appendChild(div);var style=getStyle(div);// round value for browser zoom. desandro/masonry#928
isBoxSizeOuter=Math.round(getStyleSize(style.width))==200;getSize.isBoxSizeOuter=isBoxSizeOuter;body.removeChild(div);}// -------------------------- getSize -------------------------- //
function getSize(elem){setup();// use querySeletor if elem is string
if(typeof elem=='string'){elem=document.querySelector(elem);}// do not proceed on non-objects
if(!elem||typeof elem!='object'||!elem.nodeType){return;}var style=getStyle(elem);// if hidden, everything is 0
if(style.display=='none'){return getZeroSize();}var size={};size.width=elem.offsetWidth;size.height=elem.offsetHeight;var isBorderBox=size.isBorderBox=style.boxSizing=='border-box';// get all measurements
for(var i=0;i<measurementsLength;i++){var measurement=measurements[i];var value=style[measurement];var num=parseFloat(value);// any 'auto', 'medium' value will be 0
size[measurement]=!isNaN(num)?num:0;}var paddingWidth=size.paddingLeft+size.paddingRight;var paddingHeight=size.paddingTop+size.paddingBottom;var marginWidth=size.marginLeft+size.marginRight;var marginHeight=size.marginTop+size.marginBottom;var borderWidth=size.borderLeftWidth+size.borderRightWidth;var borderHeight=size.borderTopWidth+size.borderBottomWidth;var isBorderBoxSizeOuter=isBorderBox&&isBoxSizeOuter;// overwrite width and height if we can get it from style
var styleWidth=getStyleSize(style.width);if(styleWidth!==false){size.width=styleWidth+(// add padding and border unless it's already including it
isBorderBoxSizeOuter?0:paddingWidth+borderWidth);}var styleHeight=getStyleSize(style.height);if(styleHeight!==false){size.height=styleHeight+(// add padding and border unless it's already including it
isBorderBoxSizeOuter?0:paddingHeight+borderHeight);}size.innerWidth=size.width-(paddingWidth+borderWidth);size.innerHeight=size.height-(paddingHeight+borderHeight);size.outerWidth=size.width+marginWidth;size.outerHeight=size.height+marginHeight;return size;}return getSize;});/***/}),/***/458:(/***/module=>{function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1;}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r;}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return;}finally{if(o)throw n;}}return a;}}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return("string"===r?String:Number)(t);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor;}function _defineProperty(obj,key,value){key=_toPropertyKey(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _classPrivateFieldGet(receiver,privateMap){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"get");return _classApplyDescriptorGet(receiver,descriptor);}function _classPrivateFieldSet(receiver,privateMap,value){var descriptor=_classExtractFieldDescriptor(receiver,privateMap,"set");_classApplyDescriptorSet(receiver,descriptor,value);return value;}function _classApplyDescriptorGet(receiver,descriptor){if(descriptor.get){return descriptor.get.call(receiver);}return descriptor.value;}function _classApplyDescriptorSet(receiver,descriptor,value){if(descriptor.set){descriptor.set.call(receiver,value);}else{if(!descriptor.writable){throw new TypeError("attempted to set read only private field");}descriptor.value=value;}}function _checkPrivateRedeclaration(obj,privateCollection){if(privateCollection.has(obj)){throw new TypeError("Cannot initialize the same private elements twice on an object");}}var list=[" daum[ /]"," deusu/"," yadirectfetcher","(?:^| )site","(?:^|[^g])news","@[a-z]","\\(at\\)[a-z]","\\(github\\.com/","\\[at\\][a-z]","^12345","^<","^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$","^[^ ]{50,}$","^active","^ad muncher","^amaya","^anglesharp/","^anonymous","^avsdevicesdk/","^axios/","^bidtellect/","^biglotron","^btwebclient/","^castro","^clamav[ /]","^client/","^cobweb/","^coccoc","^custom","^ddg[_-]android","^discourse","^dispatch/\\d","^downcast/","^duckduckgo","^facebook","^fdm[ /]\\d","^getright/","^gozilla/","^hatena","^hobbit","^hotzonu","^hwcdn/","^jeode/","^jetty/","^jigsaw","^linkdex","^lwp[-: ]","^metauri","^microsoft bits","^movabletype","^mozilla/\\d\\.\\d \\(compatible;?\\)$","^mozilla/\\d\\.\\d \\w*$","^navermailapp","^netsurf","^offline explorer","^php","^postman","^postrank","^python","^read","^reed","^restsharp/","^snapchat","^space bison","^svn","^swcd ","^taringa","^test certificate info","^thumbor/","^tumblr/","^user-agent:mozilla","^valid","^venus/fedoraplanet","^w3c","^webbandit/","^webcopier","^wget","^whatsapp","^xenu link sleuth","^yahoo","^yandex","^zdm/\\d","^zoom marketplace/","^{{.*}}$","adbeat\\.com","appinsights","archive","ask jeeves/teoma","bit\\.ly/","bluecoat drtr","bot","browsex","burpcollaborator","capture","catch","check","chrome-lighthouse","chromeframe","cloud","crawl","cryptoapi","dareboost","datanyze","dataprovider","dejaclick","dmbrowser","download","evc-batch/","feed","firephp","freesafeip","gomezagent","google","headlesschrome/","http","httrack","hubspot marketing grader","hydra","ibisbrowser","images","inspect","iplabel","ips-agent","java","library","mail\\.ru/","manager","monitor","morningscore/","neustar wpm","nutch","offbyone","optimize","pageburst","pagespeed","perl","phantom","pingdom","powermarks","preview","proxy","ptst[ /]\\d","reader","rexx;","rigor","rss","scan","scrape","search","serp ?reputation ?management","server","sogou","sparkler/","speedcurve","spider","splash","statuscake","stumbleupon\\.com","supercleaner","synapse","synthetic","torrent","tracemyfile","transcoder","trendsmapresolver","twingly recon","url","virtuoso","wappalyzer","webglance","webkit2png","websitemetadataretriever","whatcms/","wordpress","zgrab"];/**
 * Mutate given list of patter strings
 * @param {string[]} list
 * @returns {string[]}
 */function amend(list){try{// Risk: Uses lookbehind assertion, avoid breakage in parsing by using RegExp constructor
new RegExp('(?<! cu)bot').test('dangerbot');// eslint-disable-line prefer-regex-literals
}catch(error){// Skip regex fixes
return list;}[// Addresses: Cubot device
['bot','(?<! cu)bot'],// Addresses: Android webview
['google','(?<! (?:channel/|google/))google(?!(app|/google| pixel))'],// Addresses: libhttp browser
['http','(?<!(?:lib))http'],// Addresses: java based browsers
['java','java(?!;)'],// Addresses: Yandex Search App
['search','(?<! ya(?:yandex)?)search']].forEach(function(_ref){var _ref2=_slicedToArray(_ref,2),search=_ref2[0],replace=_ref2[1];var index=list.lastIndexOf(search);if(~index){list.splice(index,1,replace);}});return list;}amend(list);var flags='i';/**
 * Test user agents for matching patterns
 */var _list=/*#__PURE__*/new WeakMap();var _pattern=/*#__PURE__*/new WeakMap();var _update=/*#__PURE__*/new WeakSet();var _index=/*#__PURE__*/new WeakSet();var Isbot=/*#__PURE__*/function(){function Isbot(patterns){var _this=this;_classCallCheck(this,Isbot);/**
     * Find the first index of an existing rule or -1 if not found
     * @param  {string} rule
     * @returns {number}
     */_classPrivateMethodInitSpec(this,_index);/**
     * Recreate the pattern from rules list
     */_classPrivateMethodInitSpec(this,_update);/**
     * @type {string[]}
     */_classPrivateFieldInitSpec(this,_list,{});/**
     * @type {RegExp}
     */_classPrivateFieldInitSpec(this,_pattern,{});_classPrivateFieldSet(this,_list,patterns||list.slice());_classPrivateMethodGet(this,_update,_update2).call(this);var isbot=function isbot(ua){return _this.test(ua);};return Object.defineProperties(isbot,Object.entries(Object.getOwnPropertyDescriptors(Isbot.prototype)).reduce(function(accumulator,_ref){var _ref2=_slicedToArray(_ref,2),prop=_ref2[0],descriptor=_ref2[1];if(typeof descriptor.value==='function'){Object.assign(accumulator,_defineProperty({},prop,{}));}if(typeof descriptor.get==='function'){Object.assign(accumulator,_defineProperty({},prop,{}));}return accumulator;},{}));}_createClass(Isbot,[{get:/**
     * Get a clone of the pattern
     * @type RegExp
     */function get(){return new RegExp(_classPrivateFieldGet(this,_pattern));}/**
     * Match given string against out pattern
     * @param  {string} ua User Agent string
     * @returns {boolean}
     */},{key:"test",value:function test(ua){return Boolean(ua)&&_classPrivateFieldGet(this,_pattern).test(ua);}},{key:"isbot",value:function isbot(ua){return Boolean(ua)&&_classPrivateFieldGet(this,_pattern).test(ua);}/**
     * Get the match for strings' known crawler pattern
     * @param  {string} ua User Agent string
     * @returns {string|null}
     */},{key:"find",value:function find(){var ua=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';var match=ua.match(_classPrivateFieldGet(this,_pattern));return match&&match[0];}/**
     * Get the patterns that match user agent string if any
     * @param  {string} ua User Agent string
     * @returns {string[]}
     */},{key:"matches",value:function matches(){var ua=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';return _classPrivateFieldGet(this,_list).filter(function(entry){return new RegExp(entry,flags).test(ua);});}/**
     * Clear all patterns that match user agent
     * @param  {string} ua User Agent string
     * @returns {void}
     */},{key:"clear",value:function clear(){var ua=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';this.exclude(this.matches(ua));}/**
     * Extent patterns for known crawlers
     * @param  {string[]} filters
     * @returns {void}
     */},{key:"extend",value:function extend(){var _this2=this;var filters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];[].push.apply(_classPrivateFieldGet(this,_list),filters.filter(function(rule){return _classPrivateMethodGet(_this2,_index,_index2).call(_this2,rule)===-1;}).map(function(filter){return filter.toLowerCase();}));_classPrivateMethodGet(this,_update,_update2).call(this);}/**
     * Exclude patterns from bot pattern rule
     * @param  {string[]} filters
     * @returns {void}
     */},{},{}]);return Isbot;}();var isbot=new Isbot();module.exports=isbot;//# sourceMappingURL=index.js.map
/***/}),/***/755:(/***/function(module,exports){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */(function(global,factory){"use strict";if(true&&typeof module.exports==="object"){// For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket trac-14549 for more info.
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else{factory(global);}// Pass this if window is not defined yet
})(typeof window!=="undefined"?window:this,function(window,noGlobal){// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";var arr=[];var getProto=Object.getPrototypeOf;var slice=arr.slice;var flat=arr.flat?function(array){return arr.flat.call(array);}:function(array){return arr.concat.apply([],array);};var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var fnToString=hasOwn.toString;var ObjectFunctionString=fnToString.call(Object);var support={};var isFunction=function isFunction(obj){// Support: Chrome <=57, Firefox <=52
// In some browsers, typeof returns "function" for HTML <object> elements
// (i.e., `typeof document.createElement( "object" ) === "function"`).
// We don't want to classify *any* DOM node as a function.
// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
// Plus for old WebKit, typeof returns "function" for HTML collections
// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
return typeof obj==="function"&&typeof obj.nodeType!=="number"&&typeof obj.item!=="function";};var isWindow=function isWindow(obj){return obj!=null&&obj===obj.window;};var document=window.document;var preservedScriptAttributes={};function DOMEval(code,node,doc){doc=doc||document;var i,val,script=doc.createElement("script");script.text=code;if(node){for(i in preservedScriptAttributes){// Support: Firefox 64+, Edge 18+
// Some browsers don't support the "nonce" property on scripts.
// On the other hand, just using `getAttribute` is not enough as
// the `nonce` attribute is reset to an empty string whenever it
// becomes browsing-context connected.
// See https://github.com/whatwg/html/issues/2369
// See https://html.spec.whatwg.org/#nonce-attributes
// The `node.getAttribute` check was added for the sake of
// `jQuery.globalEval` so that it can fake a nonce-containing node
// via an object.
val=node[i]||node.getAttribute&&node.getAttribute(i);if(val){script.setAttribute(i,val);}}}doc.head.appendChild(script).parentNode.removeChild(script);}function toType(obj){if(obj==null){return obj+"";}// Support: Android <=2.3 only (functionish RegExp)
return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj;}/* global Symbol */// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module
var version="3.7.1",rhtmlSuffix=/HTML$/i,// Define a local copy of jQuery
jQuery=function(selector,context){// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);};jQuery.fn=jQuery.prototype={// The current version of jQuery being used
jquery:version,constructor:jQuery,// The default length of a jQuery object is 0
length:0,toArray:function(){return slice.call(this);},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(num){// Return all the elements in a clean array
if(num==null){return slice.call(this);}// Return just the one element from the set
return num<0?this[num+this.length]:this[num];},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(elems){// Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems);// Add the old object onto the stack (as a reference)
ret.prevObject=this;// Return the newly-formed element set
return ret;},// Execute a callback for every element in the matched set.
each:function(callback){return jQuery.each(this,callback);},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},even:function(){return this.pushStack(jQuery.grep(this,function(_elem,i){return(i+1)%2;}));},odd:function(){return this.pushStack(jQuery.grep(this,function(_elem,i){return i%2;}));},eq:function(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function(){return this.prevObject||this.constructor();}// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;// Handle a deep copy situation
if(typeof target==="boolean"){deep=target;// Skip the boolean and the target
target=arguments[i]||{};i++;}// Handle case when target is a string or something (possible in deep copy)
if(typeof target!=="object"&&!isFunction(target)){target={};}// Extend jQuery itself if only one argument is passed
if(i===length){target=this;i--;}for(;i<length;i++){// Only deal with non-null/undefined values
if((options=arguments[i])!=null){// Extend the base object
for(name in options){copy=options[name];// Prevent Object.prototype pollution
// Prevent never-ending loop
if(name==="__proto__"||target===copy){continue;}// Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=Array.isArray(copy)))){src=target[name];// Ensure proper type for the source value
if(copyIsArray&&!Array.isArray(src)){clone=[];}else if(!copyIsArray&&!jQuery.isPlainObject(src)){clone={};}else{clone=src;}copyIsArray=false;// Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy);// Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}}// Return the modified object
return target;};jQuery.extend({// Unique for each copy of jQuery on the page
// Assume jQuery is ready without the ready module
isPlainObject:function(obj){var proto,Ctor;// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
if(!obj||toString.call(obj)!=="[object Object]"){return false;}proto=getProto(obj);// Objects with no prototype (e.g., `Object.create( null )`) are plain
if(!proto){return true;}// Objects with prototype are plain iff they were constructed by a global Object function
Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString;}// Evaluates a script in a provided context; falls back to the global one
// if not specified.
// Retrieve the text value of an array of DOM nodes
// results is for internal usage only
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
,grep:function(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;// Go through the array, only saving the items
// that pass the validator function
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;},// arg is for internal usage only
map:function(elems,callback,arg){var length,value,i=0,ret=[];// Go through the array, translating each of the items to their new values
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}// Go through every key on the object,
}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}// Flatten any nested arrays
return flat(ret);}// A global GUID counter for objects
,// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support});if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];}// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(_i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length"in obj&&obj.length,type=toType(obj);if(isFunction(obj)||isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();}var pop=arr.pop;var sort=arr.sort;var splice=arr.splice;var whitespace="[\\x20\\t\\r\\n\\f]";var rtrimCSS=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g");// Note: an element does not contain itself
jQuery.contains=function(a,b){var bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(// Support: IE 9 - 11+
// IE doesn't have `contains` on SVG.
a.contains?a.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));};// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function fcssescape(ch,asCodePoint){if(asCodePoint){// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if(ch==="\0"){return"\uFFFD";}// Control characters and (dependent upon position) numbers get escaped as code points
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";}// Other potentially-special ASCII characters get backslash-escaped
return"\\"+ch;}jQuery.escapeSelector=function(sel){return(sel+"").replace(rcssescape,fcssescape);};var preferredDoc=document,pushNative=push;(function(){var i,Expr,outermostContext,sortInput,hasDuplicate,push=pushNative,// Local document vars
document,documentElement,documentIsHTML,rbuggyQSA,matches,// Instance-specific data
expando=jQuery.expando,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),nonnativeSelectorCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true;}return 0;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|"+"loop|multiple|open|readonly|required|scoped",// Regular expressions
// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
identifier="(?:\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+// Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+// 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+// 3. anything else (capture 2)
".*"+")\\)|)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rleadingCombinator=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rdescend=new RegExp(whitespace+"|>"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={CLASS:new RegExp("^\\.("+identifier+")"),TAG:new RegExp("^("+identifier+"|[*])"),PSEUDO:new RegExp("^"+pseudos)// For use in libraries implementing .is()
// We use this for POS matching in `select`
},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,// Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,// CSS escapes
// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\([^\\r\\n\\f])","g"),funescape=function(escape,nonHex){var high="0x"+escape.slice(1)-0x10000;if(nonHex){// Strip the backslash prefix from a non-hex escape sequence
return nonHex;}// Replace a hexadecimal escape sequence with the encoded Unicode code point
// Support: IE <=11+
// For values outside the Basic Multilingual Plane (BMP), manually construct a
// surrogate pair
return high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);},// Used for iframes; see `setDocument`.
// Support: IE 9 - 11+, Edge 12 - 18+
// Removing the function wrapper causes a "Permission Denied"
// error in IE/Edge.
unloadHandler=function(){setDocument();},inDisabledFieldset=addCombinator(function(elem){return elem.disabled===true&&nodeName(elem,"fieldset");},{});// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement(){try{return document.activeElement;}catch(err){}}// Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes);// Support: Android <=4.0
// Detect silently failing push.apply
// eslint-disable-next-line no-unused-expressions
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={};}function find(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,// nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;results=results||[];// Return early from calls with invalid selector or context
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed){setDocument(context);context=context||document;if(documentIsHTML){// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(nodeType!==11&&(match=rquickExpr.exec(selector))){// ID selector
if(m=match[1]){// Document context
if(nodeType===9){if(elem=context.getElementById(m)){// Support: IE 9 only
// getElementById can match elements by name instead of ID
if(elem.id===m){push.call(results,elem);return results;}}else{return results;}// Element context
}else{// Support: IE 9 only
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&find.contains(context,elem)&&elem.id===m){push.call(results,elem);return results;}}// Type selector
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;// Class selector
}else if((m=match[3])&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}// Take advantage of querySelectorAll
if(!nonnativeSelectorCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){newSelector=selector;newContext=context;// qSA considers elements outside a scoping root when evaluating child or
// descendant combinators, which is not what we want.
// In such cases, we work around the behavior by prefixing every selector in the
// list with an ID selector referencing the scope context.
// The technique has to be used as well when a leading combinator is used
// as such selectors are not recognized by querySelectorAll.
// Thanks to Andrew Dupont for this technique.
if(nodeType===1&&(rdescend.test(selector)||rleadingCombinator.test(selector))){// Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;// We can use :scope instead of the ID hack if the browser
// supports it & if we're not changing the context.
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when
// strict-comparing two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(newContext!=context||!support.scope){// Capture the context ID, setting it first if necessary
if(nid=context.getAttribute("id")){nid=jQuery.escapeSelector(nid);}else{context.setAttribute("id",nid=expando);}}// Prefix every selector in the list
groups=tokenize(selector);i=groups.length;while(i--){groups[i]=(nid?"#"+nid:":scope")+" "+toSelector(groups[i]);}newSelector=groups.join(",");}try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){nonnativeSelectorCache(selector,true);}finally{if(nid===expando){context.removeAttribute("id");}}}}}// All others
return select(selector.replace(rtrimCSS,"$1"),context,results,seed);}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){// Use (key + " ") to avoid collision with native prototype properties
// (see https://github.com/jquery/sizzle/issues/157)
if(keys.push(key+" ")>Expr.cacheLength){// Only keep the most recent entries
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;}/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando]=true;return fn;}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el);}catch(e){return false;}finally{// Remove from its parent by default
if(el.parentNode){el.parentNode.removeChild(el);}// release memory in IE
el=null;}}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){return nodeName(elem,"input")&&elem.type===type;};}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){return(nodeName(elem,"input")||nodeName(elem,"button"))&&elem.type===type;};}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */function createDisabledPseudo(disabled){// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(elem){// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
if("form"in elem){// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
if(elem.parentNode&&elem.disabled===false){// Option elements defer to a parent optgroup if present
if("label"in elem){if("label"in elem.parentNode){return elem.parentNode.disabled===disabled;}else{return elem.disabled===disabled;}}// Support: IE 6 - 11+
// Use the isDisabled shortcut property to check for disabled fieldset ancestors
return elem.isDisabled===disabled||// Where there is no isDisabled, check manually
elem.isDisabled!==!disabled&&inDisabledFieldset(elem)===disabled;}return elem.disabled===disabled;// Try to winnow out elements that can't be disabled before trusting the disabled property.
// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
// even exist on them, let alone have a boolean value.
}else if("label"in elem){return elem.disabled===disabled;}// Remaining elements are neither :enabled nor :disabled
return false;};}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 *//**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 *//**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */function setDocument(node){var subWindow,doc=node?node.ownerDocument||node:preferredDoc;// Return early if doc is invalid or already selected
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(doc==document||doc.nodeType!==9||!doc.documentElement){return document;}// Update global variables
document=doc;documentElement=document.documentElement;documentIsHTML=!jQuery.isXMLDoc(document);// Support: iOS 7 only, IE 9 - 11+
// Older browsers didn't support unprefixed `matches`.
matches=documentElement.matches||documentElement.webkitMatchesSelector||documentElement.msMatchesSelector;// Support: IE 9 - 11+, Edge 12 - 18+
// Accessing iframe documents after unload throws "permission denied" errors
// (see trac-13936).
// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
if(documentElement.msMatchesSelector&&// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
preferredDoc!=document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow){// Support: IE 9 - 11+, Edge 12 - 18+
subWindow.addEventListener("unload",unloadHandler);}// Support: IE <10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
support.getById=assert(function(el){documentElement.appendChild(el).id=jQuery.expando;return!document.getElementsByName||!document.getElementsByName(jQuery.expando).length;});// Support: IE 9 only
// Check to see if it's possible to do matchesSelector
// on a disconnected node.
support.disconnectedMatch=assert(function(el){return matches.call(el,"*");});// Support: IE 9 - 11+, Edge 12 - 18+
// IE/Edge don't support the :scope pseudo-class.
support.scope=assert(function(){return document.querySelectorAll(":scope");});// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
// Make sure the `:has()` argument is parsed unforgivingly.
// We include `*` in the test to detect buggy implementations that are
// _selectively_ forgiving (specifically when the list includes at least
// one valid selector).
// Note that we treat complete lack of support for `:has()` as if it were
// spec-compliant support, which is fine because use of `:has()` in such
// environments will fail in the qSA path and fall back to jQuery traversal
// anyway.
support.cssHas=assert(function(){try{document.querySelector(":has(*,:jqfake)");return false;}catch(e){return true;}});// ID filter and find
if(support.getById){Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};Expr.find.ID=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[];}};}else{Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
Expr.find.ID=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){// Verify the id attribute
node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}// Fall back on getElementsByName
elems=context.getElementsByName(id);i=0;while(elem=elems[i++]){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}}}return[];}};}// Tag
Expr.find.TAG=function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag);// DocumentFragment nodes don't have gEBTN
}else{return context.querySelectorAll(tag);}};// Class
Expr.find.CLASS=function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}};/* QSA/matchesSelector
	---------------------------------------------------------------------- */// QSA and matchesSelector support
rbuggyQSA=[];// Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(el){var input;documentElement.appendChild(el).innerHTML="<a id='"+expando+"' href='' disabled='disabled'></a>"+"<select id='"+expando+"-\r\\' disabled='disabled'>"+"<option selected=''></option></select>";// Support: iOS <=7 - 8 only
// Boolean attributes and "value" are not treated correctly in some XML documents
if(!el.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}// Support: iOS <=7 - 8 only
if(!el.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");}// Support: iOS 8 only
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
if(!el.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
// In some of the document kinds, these selectors wouldn't work natively.
// This is probably OK but for backwards compatibility we want to maintain
// handling them through jQuery traversal in jQuery 3.x.
if(!el.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
input=document.createElement("input");input.setAttribute("type","hidden");el.appendChild(input).setAttribute("name","D");// Support: IE 9 - 11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
// In some of the document kinds, these selectors wouldn't work natively.
// This is probably OK but for backwards compatibility we want to maintain
// handling them through jQuery traversal in jQuery 3.x.
documentElement.appendChild(el).disabled=true;if(el.querySelectorAll(":disabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Support: IE 11+, Edge 15 - 18+
// IE 11/Edge don't find elements on a `[name='']` query in some cases.
// Adding a temporary attribute to the document before the selection works
// around the issue.
// Interestingly, IE 10 & older don't seem to have the issue.
input=document.createElement("input");input.setAttribute("name","");el.appendChild(input);if(!el.querySelectorAll("[name='']").length){rbuggyQSA.push("\\["+whitespace+"*name"+whitespace+"*="+whitespace+"*(?:''|\"\")");}});if(!support.cssHas){// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
// Our regular `try-catch` mechanism fails to detect natively-unsupported
// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
// in browsers that parse the `:has()` argument as a forgiving selector list.
// https://drafts.csswg.org/selectors/#relational now requires the argument
// to be parsed unforgivingly, but browsers have not yet fully adjusted.
rbuggyQSA.push(":has");}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));/* Sorting
	---------------------------------------------------------------------- */// Document order sorting
sortOrder=function(a,b){// Flag for duplicate removal
if(a===b){hasDuplicate=true;return 0;}// Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}// Calculate position if both inputs belong to the same document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
compare=(a.ownerDocument||a)==(b.ownerDocument||b)?a.compareDocumentPosition(b):// Otherwise we know they are disconnected
1;// Disconnected nodes
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){// Choose the first element that is related to our preferred document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(a===document||a.ownerDocument==preferredDoc&&find.contains(preferredDoc,a)){return-1;}// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(b===document||b.ownerDocument==preferredDoc&&find.contains(preferredDoc,b)){return 1;}// Maintain original order
return sortInput?indexOf.call(sortInput,a)-indexOf.call(sortInput,b):0;}return compare&4?-1:1;};return document;}find.matches=function(expr,elements){return find(expr,null,null,elements);};find.matchesSelector=function(elem,expr){setDocument(elem);if(documentIsHTML&&!nonnativeSelectorCache[expr+" "]&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);// IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){nonnativeSelectorCache(expr,true);}}return find(expr,document,null,[elem]).length>0;};find.contains=function(context,elem){// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if((context.ownerDocument||context)!=document){setDocument(context);}return jQuery.contains(context,elem);};find.attr=function(elem,name){// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if((elem.ownerDocument||elem)!=document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()],// Don't get fooled by Object.prototype properties (see trac-13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;if(val!==undefined){return val;}return elem.getAttribute(name);};find.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */jQuery.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;// Unless we *know* we can detect duplicates, assume their presence
//
// Support: Android <=4.0+
// Testing for detecting duplicates is unpredictable so instead assume we can't
// depend on duplicate detection in all browsers without a stable sort.
hasDuplicate=!support.sortStable;sortInput=!support.sortStable&&slice.call(results,0);sort.call(results,sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){splice.call(results,duplicates[j],1);}}// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput=null;return results;};jQuery.fn.uniqueSort=function(){return this.pushStack(jQuery.uniqueSort(slice.apply(this)));};Expr=jQuery.expr={// Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(match){match[1]=match[1].replace(runescape,funescape);// Move the given value to match[3] whether quoted or unquoted
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},CHILD:function(match){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){// nth-* requires argument
if(!match[3]){find.error(match[0]);}// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd");// other types prohibit arguments
}else if(match[3]){find.error(match[0]);}return match;},PSEUDO:function(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr.CHILD.test(match[0])){return null;}// Accept quoted arguments as-is
if(match[3]){match[2]=match[4]||match[5]||"";// Strip excess characters from unquoted arguments
}else if(unquoted&&rpseudo.test(unquoted)&&(// Get excess from tokenize (recursively)
excess=tokenize(unquoted,true))&&(// advance to the next closing parenthesis
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){// excess is a negative index
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}// Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{TAG:function(nodeNameSelector){var expectedNodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return nodeName(elem,expectedNodeName);};},CLASS:function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},ATTR:function(name,operator,check){return function(elem){var result=find.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";if(operator==="="){return result===check;}if(operator==="!="){return result!==check;}if(operator==="^="){return check&&result.indexOf(check)===0;}if(operator==="*="){return check&&result.indexOf(check)>-1;}if(operator==="$="){return check&&result.slice(-check.length)===check;}if(operator==="~="){return(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1;}if(operator==="|="){return result===check||result.slice(0,check.length+1)===check+"-";}return false;};},CHILD:function(type,what,_argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?// Shortcut for :nth-*(n)
function(elem){return!!elem.parentNode;}:function(elem,_context,xml){var cache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){// :(first|last|only)-(child|of-type)
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?nodeName(node,name):node.nodeType===1){return false;}}// Reverse direction for :only-* (if we haven't yet done so)
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild];// non-xml :nth-child(...) stores cache data on `parent`
if(forward&&useCache){// Seek `elem` from a previously-cached index
outerCache=parent[expando]||(parent[expando]={});cache=outerCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||(// Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop()){// When found, cache indexes on `parent` and break
if(node.nodeType===1&&++diff&&node===elem){outerCache[type]=[dirruns,nodeIndex,diff];break;}}}else{// Use previously-cached element index if available
if(useCache){outerCache=elem[expando]||(elem[expando]={});cache=outerCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;}// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(diff===false){// Use the same loop as above to seek `elem` from the start
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?nodeName(node,name):node.nodeType===1)&&++diff){// Cache the index of each encountered element
if(useCache){outerCache=node[expando]||(node[expando]={});outerCache[type]=[dirruns,diff];}if(node===elem){break;}}}}}// Incorporate the offset, then check against cycle size
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},PSEUDO:function(pseudo,argument){// pseudo-class names are case-insensitive
// https://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||find.error("unsupported pseudo: "+pseudo);// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as jQuery does
if(fn[expando]){return fn(argument);}// But maintain support for old signatures
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf.call(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{// Potentially complex pseudos
not:markFunction(function(selector){// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrimCSS,"$1"));return matcher[expando]?markFunction(function(seed,matches,_context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;// Match elements unmatched by `matcher`
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,_context,xml){input[0]=elem;matcher(input,null,xml,results);// Don't keep the element
// (see https://github.com/jquery/sizzle/issues/299)
input[0]=null;return!results.pop();};}),contains:markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||jQuery.text(elem)).indexOf(text)>-1;};})// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// https://www.w3.org/TR/selectors/#lang-pseudo
// Miscellaneous
// Boolean properties
,selected:function(elem){// Support: IE <=11+
// Accessing the selectedIndex property
// forces the browser to treat the default option as
// selected when in an optgroup.
if(elem.parentNode){// eslint-disable-next-line no-unused-expressions
elem.parentNode.selectedIndex;}return elem.selected===true;},// Contents
empty:function(elem){// https://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},parent:function(elem){return!Expr.pseudos.empty(elem);}// Element/input types
// Position-in-collection
}};Expr.pseudos.nth=Expr.pseudos.eq;// Add button/input type pseudos
for(i in{}){Expr.pseudos[i]=createInputPseudo(i);}for(i in{}){Expr.pseudos[i]=createButtonPseudo(i);}// Easy API for creating new setFilters
setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&key==="parentNode",doneName=done++;return combinator.first?// Check against closest ancestor/preceding element
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}return false;}:// Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,outerCache,newCache=[dirruns,doneName];// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});if(skip&&nodeName(elem,skip)){elem=elem[dir]||elem;}else if((oldCache=outerCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName){// Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];}else{// Reuse newcache so results back-propagate to previous elements
outerCache[key]=newCache;// A match means we're done; a fail means we have to keep checking
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}return false;};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){find(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,matcherOut,preMap=[],postMap=[],preexisting=results.length,// Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),// Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems;if(matcher){// If we have a postFinder, or filtered seed, or non-seed postFilter
// or preexisting results,
matcherOut=postFinder||(seed?preFilter:preexisting||postFilter)?// ...intermediate processing is necessary
[]:// ...otherwise use results directly
results;// Find primary matches
matcher(matcherIn,matcherOut,context,xml);}else{matcherOut=matcherIn;}// Apply postFilter
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);// Un-match failing elements by moving them back to matcherIn
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){// Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){// Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);}// Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf.call(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}// Add elements to results, through postFinder if defined
}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,// The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
var ret=!leadingRelative&&(xml||context!=outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));// Avoid hanging onto element
// (see https://github.com/jquery/sizzle/issues/299)
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);// Return special upon seeing a positional matcher
if(matcher[expando]){// Find the next relative operator (if any) for proper handling
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i-1).concat({})).replace(rtrimCSS,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,// We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find.TAG("*",outermost),// Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
outermostContext=context==document||context||outermost;}// Add elements passing elementMatchers directly to results
// Support: iOS <=7 - 9 only
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
// elements by id. (see trac-14142)
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(!context&&elem.ownerDocument!=document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){push.call(results,elem);break;}}if(outermost){dirruns=dirrunsUnique;}}// Track unmatched elements for set filters
if(bySet){// They will have gone through all possible matchers
if(elem=!matcher&&elem){matchedCount--;}// Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}}// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i;// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){// Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}// Discard index placeholder values to get only actual matches
setMatched=condense(setMatched);}// Add matches to results
push.apply(results,setMatched);// Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){jQuery.uniqueSort(results);}}// Override manipulation of globals by nested matchers
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}function compile(selector,match/* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){// Generate a function of recursive functions that can be used to check each element
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}// Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));// Save selector and tokenization
cached.selector=selector;}return cached;}/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */function select(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[];// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(match.length===1){// Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find.ID(token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;// Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);}// Fetch a seed set for right-to-left matching
i=matchExpr.needsContext.test(selector)?0:tokens.length;while(i--){token=tokens[i];// Abort if we hit a combinator
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){// Search, expanding context for leading sibling combinators
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){// If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}}// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;}// One-time assignments
// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;// Initialize against the default document
setDocument();// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached=assert(function(el){// Should return 1, but returns 4 (following)
return el.compareDocumentPosition(document.createElement("fieldset"))&1;});jQuery.find=find;// Deprecated
jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.unique=jQuery.uniqueSort;// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile=compile;find.select=select;find.setDocument=setDocument;find.tokenize=tokenize;find.escape=jQuery.escapeSelector;find.getText=jQuery.text;find.isXML=jQuery.isXMLDoc;find.selectors=jQuery.expr;find.support=jQuery.support;find.uniqueSort=jQuery.uniqueSort;/* eslint-enable */})();var dir=function(elem,dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var siblings=function(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;var rsingleTag=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;// Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not;});}// Single element
if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}// Arraylike of elements (jQuery, arguments, Array)
if(typeof qualifier!=="string"){return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}// Filtered directly for both simple and complex selectors
return jQuery.filter(qualifier,elements,not);}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}if(elems.length===1&&elem.nodeType===1){return jQuery.find.matchesSelector(elem,expr)?[elem]:[];}return jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function(selector){var i,ret,len=this.length,self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}ret=this.pushStack([]);for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);}return len>1?jQuery.uniqueSort(ret):ret;},is:function(selector){return!!winnow(this,// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}});// Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery,// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
// Strict HTML recognition (trac-11290: must start with <)
// Shortcut simple #id case for speed
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem;// HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;}// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery;// Handle HTML strings
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){// Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else{match=rquickExpr.exec(selector);}// Match html or make sure no context is specified for #id
if(match&&(match[1]||!context)){// HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context;// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));// HANDLE: $(html, props)
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){// Properties of context are called as methods if possible
if(isFunction(this[match])){this[match](context[match]);// ...and otherwise set as attributes
}else{this.attr(match,context[match]);}}}return this;// HANDLE: $(#id)
}else{elem=document.getElementById(match[2]);if(elem){// Inject the element directly into the jQuery object
this[0]=elem;this.length=1;}return this;}// HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return(context||root).find(selector);// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else{return this.constructor(context).find(selector);}// HANDLE: $(DOMElement)
}else if(selector.nodeType){this[0]=selector;this.length=1;return this;// HANDLE: $(function)
// Shortcut for document ready
}else if(isFunction(selector)){return root.ready!==undefined?root.ready(selector):// Execute immediately if ready is not present
selector(jQuery);}return jQuery.makeArray(selector,this);};// Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn;// Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/,// Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={prev:true};jQuery.fn.extend({has:function(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function(selectors,context){var cur,i=0,l=this.length,matched=[],targets=typeof selectors!=="string"&&jQuery(selectors);// Positional selectors never match, since there's no _selection_ context
if(!rneedsContext.test(selectors)){for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){// Always skip document fragments
if(cur.nodeType<11&&(targets?targets.index(cur)>-1:// Don't pass non-elements to jQuery#find
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);},// Determine the position of an element within the set
index:function(elem){// No argument, return index in parent
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;}// Index in selector
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);}// Locate the position of the desired element
return indexOf.call(this,// If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return dir(elem,"parentNode");},parentsUntil:function(elem,_i,until){return dir(elem,"parentNode",until);},next:function(elem){return sibling(elem,"nextSibling");},prev:function(elem){return sibling(elem,"previousSibling");},nextAll:function(elem){return dir(elem,"nextSibling");},prevAll:function(elem){return dir(elem,"previousSibling");},nextUntil:function(elem,_i,until){return dir(elem,"nextSibling",until);},prevUntil:function(elem,_i,until){return dir(elem,"previousSibling",until);},siblings:function(elem){return siblings((elem.parentNode||{}).firstChild,elem);},children:function(elem){return siblings(elem.firstChild);},contents:function(elem){if(elem.contentDocument!=null&&// Support: IE 11+
// <object> elements with no `data` attribute has an object
// `contentDocument` with a `null` prototype.
getProto(elem.contentDocument)){return elem.contentDocument;}// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
if(nodeName(elem,"template")){elem=elem.content||elem;}return jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){// Remove duplicates
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);}// Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnothtmlwhite=/[^\x20\t\r\n\f]+/g;// Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};jQuery.each(options.match(rnothtmlwhite)||[],function(_,flag){object[flag]=true;});return object;}/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks=function(options){// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var// Flag to know if list is currently firing
firing,// Last fire value for non-forgettable lists
memory,// Flag to know if list was already fired
fired,// Flag to prevent firing
locked,// Actual callback list
list=[],// Queue of execution data for repeatable lists
queue=[],// Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1,// Fire callbacks
fire=function(){// Enforce single-firing
locked=locked||options.once;// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){// Run callback and check for early termination
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){// Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length;memory=false;}}}// Forget the data if we're done with it
if(!options.memory){memory=false;}firing=false;// Clean up if we're done firing for good
if(locked){// Keep an empty list if we have data for future add calls
if(memory){list=[];// Otherwise, this object is spent
}else{list="";}}},// Actual Callbacks object
self={// Add a callback or a collection of callbacks to the list
add:function(){if(list){// If we have memory from a past run, we should fire after adding
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&toType(arg)!=="string"){// Inspect recursively
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;},// Remove a callback from the list
remove:function(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);// Handle firing indexes
if(index<=firingIndex){firingIndex--;}}});return this;},// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;}// Remove all callbacks from the list
,// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function(){locked=queue=[];list=memory="";return this;},// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function(){locked=queue=[];if(!memory&&!firing){list=memory="";}return this;},locked:function(){return!!locked;},// Call all callbacks with the given context and arguments
fireWith:function(context,args){if(!locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;}// Call all the callbacks with the given arguments
,// To know if the callbacks have already been called at least once
fired:function(){return!!fired;}};return self;};function Identity(v){return v;}function adoptValue(value,resolve,reject,noValue){var method;try{// Check for promise aspect first to privilege synchronous behavior
if(value&&isFunction(method=value.promise)){method.call(value).done(resolve).fail(reject);// Other thenables
}else if(value&&isFunction(method=value.then)){method.call(value,resolve,reject);// Other non-thenables
}else{// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
resolve.apply(undefined,[value].slice(noValue));}// For Promises/A+, convert exceptions into rejections
// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
// Deferred#then to conditionally suppress rejection.
}catch(value){// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
reject.apply(undefined,[value]);}}jQuery.extend({Deferred:function(func){var tuples=[// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory"),2],["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),0,"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),1,"rejected"]],state="pending",promise={"catch":function(fn){return promise.then(null,fn);},// Keep pipe for back-compat
pipe:function/* fnDone, fnFail, fnProgress */(){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(_i,tuple){// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var fn=isFunction(fns[tuple[4]])&&fns[tuple[4]];// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else{newDefer[tuple[0]+"With"](this,fn?[returned]:arguments);}});});fns=null;}).promise();},then:function(onFulfilled,onRejected,onProgress){var maxDepth=0;function resolve(depth,deferred,handler,special){return function(){var that=this,args=arguments,mightThrow=function(){var returned,then;// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(depth<maxDepth){return;}returned=handler.apply(that,args);// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(returned===deferred.promise()){throw new TypeError("Thenable self-resolution");}// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
then=returned&&(// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
typeof returned==="object"||typeof returned==="function")&&returned.then;// Handle a returned thenable
if(isFunction(then)){// Special processors (notify) just wait for resolution
if(special){then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special));// Normal processors (resolve) also hook into progress
}else{// ...and disregard older resolution values
maxDepth++;then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special),resolve(maxDepth,deferred,Identity,deferred.notifyWith));}// Handle all other returned values
}else{// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Identity){that=undefined;args=[returned];}// Process the value(s)
// Default process is resolve
(special||deferred.resolveWith)(that,args);}},// Only normal processors (resolve) catch and reject exceptions
process=special?mightThrow:function(){try{mightThrow();}catch(e){if(jQuery.Deferred.exceptionHook){jQuery.Deferred.exceptionHook(e,process.error);}// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
if(depth+1>=maxDepth){// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Thrower){that=undefined;args=[e];}deferred.rejectWith(that,args);}}};// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
if(depth){process();}else{// Call an optional hook to record the error, in case of exception
// since it's otherwise lost when execution goes async
if(jQuery.Deferred.getErrorHook){process.error=jQuery.Deferred.getErrorHook();// The deprecated alias of the above. While the name suggests
// returning the stack, not an error instance, jQuery just passes
// it directly to `console.warn` so both will work; an instance
// just better cooperates with source maps.
}else if(jQuery.Deferred.getStackHook){process.error=jQuery.Deferred.getStackHook();}window.setTimeout(process);}};}return jQuery.Deferred(function(newDefer){// progress_handlers.add( ... )
tuples[0][3].add(resolve(0,newDefer,isFunction(onProgress)?onProgress:Identity,newDefer.notifyWith));// fulfilled_handlers.add( ... )
tuples[1][3].add(resolve(0,newDefer,isFunction(onFulfilled)?onFulfilled:Identity));// rejected_handlers.add( ... )
tuples[2][3].add(resolve(0,newDefer,isFunction(onRejected)?onRejected:Thrower));}).promise();},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(obj){return obj!=null?jQuery.extend(obj,promise):promise;}},deferred={};// Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[5];// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
promise[tuple[1]]=list.add;// Handle state
if(stateString){list.add(function(){// state = "resolved" (i.e., fulfilled)
// state = "rejected"
state=stateString;},// rejected_callbacks.disable
// fulfilled_callbacks.disable
tuples[3-i][2].disable,// rejected_handlers.disable
// fulfilled_handlers.disable
tuples[3-i][3].disable,// progress_callbacks.lock
tuples[0][2].lock,// progress_handlers.lock
tuples[0][3].lock);}// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
list.add(tuple[3].fire);// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?undefined:this,arguments);return this;};// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
deferred[tuple[0]+"With"]=list.fireWith;});// Make the deferred a promise
promise.promise(deferred);// Call given func if any
if(func){func.call(deferred,deferred);}// All done!
return deferred;},// Deferred helper
when:function(singleValue){var// count of uncompleted subordinates
remaining=arguments.length,// count of unprocessed arguments
i=remaining,// subordinate fulfillment data
resolveContexts=Array(i),resolveValues=slice.call(arguments),// the primary Deferred
primary=jQuery.Deferred(),// subordinate callback factory
updateFunc=function(i){return function(value){resolveContexts[i]=this;resolveValues[i]=arguments.length>1?slice.call(arguments):value;if(! --remaining){primary.resolveWith(resolveContexts,resolveValues);}};};// Single- and empty arguments are adopted like Promise.resolve
if(remaining<=1){adoptValue(singleValue,primary.done(updateFunc(i)).resolve,primary.reject,!remaining);// Use .then() to unwrap secondary thenables (cf. gh-3000)
if(primary.state()==="pending"||isFunction(resolveValues[i]&&resolveValues[i].then)){return primary.then();}}// Multiple arguments are aggregated like Promise.all array elements
while(i--){adoptValue(resolveValues[i],updateFunc(i),primary.reject);}return primary.promise();}});// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook=function(error,asyncError){// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
if(window.console&&window.console.warn&&error&&rerrorNames.test(error.name)){window.console.warn("jQuery.Deferred exception: "+error.message,error.stack,asyncError);}};jQuery.readyException=function(error){window.setTimeout(function(){throw error;});};// The deferred used on DOM ready
var readyList=jQuery.Deferred();jQuery.fn.ready=function(fn){readyList.then(fn)// Wrap jQuery.readyException in a function so that the lookup
// happens at the time of error handling instead of callback
// registration.
.catch(function(error){jQuery.readyException(error);});return this;};jQuery.extend({// Is the DOM ready to be used? Set to true once it occurs.
// A counter to track how many items to wait for before
// the ready event fires. See trac-6781
// Handle when the DOM is ready
ready:function(wait){// Abort if there are pending holds or we're already ready
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}// Remember that the DOM is ready
jQuery.isReady=true;// If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;}// If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]);}});jQuery.ready.then=readyList.then;// The ready event handler and self cleanup method
function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){// Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready);}else{// Use the handy event callback
document.addEventListener("DOMContentLoaded",completed);// A fallback to window.onload, that will always work
window.addEventListener("load",completed);}// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null;// Sets many values
if(toType(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);}// Sets one value
}else if(value!==undefined){chainable=true;if(!isFunction(value)){raw=true;}if(bulk){// Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn=null;// ...except when executing function values
}else{bulk=fn;fn=function(elem,_key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}if(chainable){return elems;}// Gets
if(bulk){return fn.call(elems);}return len?fn(elems[0],key):emptyGet;};// Matches dashed string for camelizing
var rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g;// Used by camelCase as callback to replace()
// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);}var acceptData=function(owner){// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return owner.nodeType===1||owner.nodeType===9||!+owner.nodeType;};Data.uid=1;Data.prototype={cache:function(owner){// Check if the owner object already has a cache
var value=owner[this.expando];// If not, create one
if(!value){value={};// We can accept data for non-element nodes in modern browsers,
// but we should not, see trac-8335.
// Always return an empty object.
if(acceptData(owner)){// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value;// Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to be
// deleted when data is removed
}else{Object.defineProperty(owner,this.expando,{configurable:true});}}}return value;},set:function(owner,data,value){var prop,cache=this.cache(owner);// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if(typeof data==="string"){cache[camelCase(data)]=value;// Handle: [ owner, { properties } ] args
}else{// Copy the properties one-by-one to the cache object
for(prop in data){cache[camelCase(prop)]=data[prop];}}return cache;},get:function(owner,key){return key===undefined?this.cache(owner):// Always use camelCase key (gh-2257)
owner[this.expando]&&owner[this.expando][camelCase(key)];},access:function(owner,key,value){// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key===undefined||key&&typeof key==="string"&&value===undefined){return this.get(owner,key);}// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value);// Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value!==undefined?value:key;},remove:function(owner,key){var i,cache=owner[this.expando];if(cache===undefined){return;}if(key!==undefined){// Support array or space separated string of keys
if(Array.isArray(key)){// If key is an array of keys...
// We always set camelCase keys, so remove that.
key=key.map(camelCase);}else{key=camelCase(key);// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
key=key in cache?[key]:key.match(rnothtmlwhite)||[];}i=key.length;while(i--){delete cache[key[i]];}}// Remove the expando if there's no more data
if(key===undefined||jQuery.isEmptyObject(cache)){// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
if(owner.nodeType){owner[this.expando]=undefined;}else{delete owner[this.expando];}}}};var dataPriv=new Data();var dataUser=new Data();//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;jQuery.extend({data:function(elem,name,data){return dataUser.access(elem,name,data);}// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
});jQuery.fn.extend({data:function(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;// Gets all values
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){// Support: IE 11 only
// The attrs elements can be null (trac-14894)
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;}// Sets multiple values
if(typeof key==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data;// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&value===undefined){// Attempt to get data from the cache
// The key will always be camelCased in Data
data=dataUser.get(elem,key);if(data!==undefined){return data;}// Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,key);if(data!==undefined){return data;}// We tried really hard, but the data doesn't exist.
return;}// Set the data...
this.each(function(){// We always store the camelCased key
dataUser.set(this,key,value);});},null,value,arguments.length>1,null,true);}});jQuery.extend({queue:function(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type);// Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue||Array.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}return queue||[];}},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type);};// If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");}// Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}},// Not public - generate a queueHooks object, or return the current one
_queueHooks:function(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);// Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var documentElement=document.documentElement;var isAttached=function(elem){return jQuery.contains(elem.ownerDocument,elem);},composed={};// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
// Check attachment across shadow DOM boundaries when possible (gh-3504)
// Support: iOS 10.0-10.2 only
// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
// leading to errors. We need to check for `getRootNode`.
if(documentElement.getRootNode){isAttached=function(elem){return jQuery.contains(elem.ownerDocument,elem)||elem.getRootNode(composed)===elem.ownerDocument;};}var isHiddenWithinTree=function(elem,el){// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
elem=el||elem;// Inline style trumps all
return elem.style.display==="none"||elem.style.display===""&&// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
isAttached(elem)&&jQuery.css(elem,"display")==="none";};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"),// Starting value computation is required for potential unit mismatches
initialInUnit=elem.nodeType&&(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){// Support: Firefox <=54
// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
initial=initial/2;// Trust units reported by jQuery.css
unit=unit||initialInUnit[3];// Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;while(maxIterations--){// Evaluate and update our best guess (doubling guesses that zero out).
// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
jQuery.style(elem,prop,initialInUnit+unit);if((1-scale)*(1-(scale=currentValue()/initial||0.5))<=0){maxIterations=0;}initialInUnit=initialInUnit/scale;}initialInUnit=initialInUnit*2;jQuery.style(elem,prop,initialInUnit+unit);// Make sure we update the tween properties later on
valueParts=valueParts||[];}if(valueParts){initialInUnit=+initialInUnit||+initial||0;// Apply relative offset (+=/-=) if specified
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var defaultDisplayMap={};function getDefaultDisplay(elem){var temp,doc=elem.ownerDocument,nodeName=elem.nodeName,display=defaultDisplayMap[nodeName];if(display){return display;}temp=doc.body.appendChild(doc.createElement(nodeName));display=jQuery.css(temp,"display");temp.parentNode.removeChild(temp);if(display==="none"){display="block";}defaultDisplayMap[nodeName]=display;return display;}function showHide(elements,show){var display,elem,values=[],index=0,length=elements.length;// Determine new display value for elements that need to change
for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}display=elem.style.display;if(show){// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
if(display==="none"){values[index]=dataPriv.get(elem,"display")||null;if(!values[index]){elem.style.display="";}}if(elem.style.display===""&&isHiddenWithinTree(elem)){values[index]=getDefaultDisplay(elem);}}else{if(display!=="none"){values[index]="none";// Remember what we're overwriting
dataPriv.set(elem,"display",display);}}}// Set the display of the elements in a second loop to avoid constant reflow
for(index=0;index<length;index++){if(values[index]!=null){elements[index].style.display=values[index];}}return elements;}jQuery.fn.extend({});var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var rscriptType=/^$|^module$|\/(?:java|ecma)script/i;(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (trac-11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (trac-14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input);// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked;// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;// Support: IE <=9 only
// IE <=9 replaces <option> tags with their contents when inserted outside of
// the select element.
div.innerHTML="<option></option>";support.option=!!div.lastChild;})();// We have to close these tags to support XHTML (trac-13200)
var wrapMap={};wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;// Support: IE <=9 only
if(!support.option){wrapMap.optgroup=wrapMap.option=[1,"<select multiple='multiple'>","</select>"];}function getAll(context,tag){// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
var ret;if(typeof context.getElementsByTagName!=="undefined"){ret=context.getElementsByTagName(tag||"*");}else if(typeof context.querySelectorAll!=="undefined"){ret=context.querySelectorAll(tag||"*");}else{ret=[];}if(tag===undefined||tag&&nodeName(context,tag)){return jQuery.merge([context],ret);}return ret;}// Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,attached,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){// Add nodes directly
if(toType(elem)==="object"){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem);// Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem));// Convert html into DOM nodes
}else{tmp=tmp||fragment.appendChild(context.createElement("div"));// Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2];// Descend through wrappers to the right content
j=wrap[0];while(j--){tmp=tmp.lastChild;}// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes);// Remember the top-level container
tmp=fragment.firstChild;// Ensure the created nodes are orphaned (trac-12392)
tmp.textContent="";}}}// Remove wrapper from fragment
fragment.textContent="";i=0;while(elem=nodes[i++]){// Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}attached=isAttached(elem);// Append to fragment
tmp=getAll(fragment.appendChild(elem),"script");// Preserve script evaluation history
if(attached){setGlobalEval(tmp);}// Capture executables
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}var rtypenamespace=/^([^.]*)(?:\.(.+)|)/;/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event={// Detach an event or set of events from an element
remove:function(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;}// Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");// Remove matching events
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}}// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}}// Remove data and the expando if it's no longer used
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function(nativeEvent){var i,j,ret,matched,handleObj,handlerQueue,args=new Array(arguments.length),// Make a writable jQuery.Event from the native event object
event=jQuery.event.fix(nativeEvent),handlers=(dataPriv.get(this,"events")||Object.create(null))[event.type]||[],special=jQuery.event.special[event.type]||{};// Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event;for(i=1;i<arguments.length;i++){args[i]=arguments[i];}event.delegateTarget=this;// Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}// Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers);// Run delegates first; they may want to stop propagation beneath us
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){// If the event is namespaced, then each handler is only invoked if it is
// specially universal or its namespaces are a superset of the event's.
if(!event.rnamespace||handleObj.namespace===false||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}}// Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function(event,handlers){var i,handleObj,sel,matchedHandlers,matchedSelectors,handlerQueue=[],delegateCount=handlers.delegateCount,cur=event.target;// Find delegate handlers
if(delegateCount&&// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
cur.nodeType&&// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!(event.type==="click"&&event.button>=1)){for(;cur!==this;cur=cur.parentNode||this){// Don't check non-elements (trac-13208)
// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
if(cur.nodeType===1&&!(event.type==="click"&&cur.disabled===true)){matchedHandlers=[];matchedSelectors={};for(i=0;i<delegateCount;i++){handleObj=handlers[i];// Don't conflict with Object.prototype properties (trac-13203)
sel=handleObj.selector+" ";if(matchedSelectors[sel]===undefined){matchedSelectors[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matchedSelectors[sel]){matchedHandlers.push(handleObj);}}if(matchedHandlers.length){handlerQueue.push({elem:cur,handlers:matchedHandlers});}}}}// Add the remaining (directly-bound) handlers
cur=this;if(delegateCount<handlers.length){handlerQueue.push({elem:cur,handlers:handlers.slice(delegateCount)});}return handlerQueue;},addProp:function(name,hook){Object.defineProperty(jQuery.Event.prototype,name,{enumerable:true,configurable:true,get:isFunction(hook)?function(){if(this.originalEvent){return hook(this.originalEvent);}}:function(){if(this.originalEvent){return this.originalEvent[name];}},set:function(value){Object.defineProperty(this,name,{enumerable:true,configurable:true,writable:true,value:value});}});},fix:function(originalEvent){return originalEvent[jQuery.expando]?originalEvent:new jQuery.Event(originalEvent);},special:{load:{// Prevent triggered image.load events from bubbling to window.load
noBubble:true},click:{// Utilize native event to ensure correct state for checkable inputs
setup:function(data){// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var el=this||data;// Claim the first handler
if(rcheckableType.test(el.type)&&el.click&&nodeName(el,"input")){// dataPriv.set( el, "click", ... )
leverageNative(el,"click",true);}// Return false to allow normal processing in the caller
return false;},trigger:function(data){// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var el=this||data;// Force setup before triggering a click
if(rcheckableType.test(el.type)&&el.click&&nodeName(el,"input")){leverageNative(el,"click");}// Return non-false to allow normal event-path propagation
return true;},// For cross-browser consistency, suppress native .click() on links
// Also prevent it if we're currently inside a leveraged native-event stack
_default:function(event){var target=event.target;return rcheckableType.test(target.type)&&target.click&&nodeName(target,"input")&&dataPriv.get(target,"click")||nodeName(target,"a");}},beforeunload:{postDispatch:function(event){// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative(el,type,isSetup){// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
if(!isSetup){if(dataPriv.get(el,type)===undefined){jQuery.event.add(el,type,returnTrue);}return;}// Register the controller as a special universal handler for all event namespaces
dataPriv.set(el,type,false);jQuery.event.add(el,type,{namespace:false,handler:function(event){var result,saved=dataPriv.get(this,type);if(event.isTrigger&1&&this[type]){// Interrupt processing of the outer synthetic .trigger()ed event
if(!saved){// Store arguments for use when handling the inner native event
// There will always be at least one argument (an event object), so this array
// will not be confused with a leftover capture object.
saved=slice.call(arguments);dataPriv.set(this,type,saved);// Trigger the native event and capture its result
this[type]();result=dataPriv.get(this,type);dataPriv.set(this,type,false);if(saved!==result){// Cancel the outer synthetic event
event.stopImmediatePropagation();event.preventDefault();return result;}// If this is an inner synthetic event for an event with a bubbling surrogate
// (focus or blur), assume that the surrogate already propagated from triggering
// the native event and prevent that from happening again here.
// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
// bubbling surrogate propagates *after* the non-bubbling base), but that seems
// less bad than duplication.
}else if((jQuery.event.special[type]||{}).delegateType){event.stopPropagation();}// If this is a native event triggered above, everything is now in order
// Fire an inner synthetic event with the original arguments
}else if(saved){// ...and capture the result
dataPriv.set(this,type,jQuery.event.trigger(saved[0],saved.slice(1),this));// Abort handling of the native event by all jQuery handlers while allowing
// native handlers on the same element to run. On target, this is achieved
// by stopping immediate propagation just on the jQuery event. However,
// the native event is re-wrapped by a jQuery one on each level of the
// propagation so the only way to stop it for jQuery is to stop it for
// everyone via native `stopPropagation()`. This is not a problem for
// focus/blur which don't bubble, but it does also stop click on checkboxes
// and radios. We accept this limitation.
event.stopPropagation();event.isImmediatePropagationStopped=returnTrue;}}});}jQuery.removeEvent=function(elem,type,handle){// This "if" is needed for plain objects
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){// Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}// Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type;// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&&// Support: Android <=2.3 only
src.returnValue===false?returnTrue:returnFalse;// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (trac-504, trac-13143)
this.target=src.target&&src.target.nodeType===3?src.target.parentNode:src.target;this.currentTarget=src.currentTarget;this.relatedTarget=src.relatedTarget;// Event type
}else{this.type=src;}// Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);}// Create a timestamp if incoming event doesn't have one
this.timeStamp=src&&src.timeStamp||Date.now();// Mark it as fixed
this[jQuery.expando]=true;};// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e&&!this.isSimulated){e.preventDefault();}},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopPropagation();}},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopImmediatePropagation();}this.stopPropagation();}};// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each({altKey:true,bubbles:true,cancelable:true,changedTouches:true,ctrlKey:true,detail:true,eventPhase:true,metaKey:true,pageX:true,pageY:true,shiftKey:true,view:true,"char":true,code:true,charCode:true},jQuery.event.addProp);jQuery.each({},function(type,delegateType){function focusMappedHandler(nativeEvent){if(document.documentMode){// Support: IE 11+
// Attach a single focusin/focusout handler on the document while someone wants
// focus/blur. This is because the former are synchronous in IE while the latter
// are async. In other browsers, all those handlers are invoked synchronously.
// `handle` from private data would already wrap the event, but we need
// to change the `type` here.
var handle=dataPriv.get(this,"handle"),event=jQuery.event.fix(nativeEvent);event.type=nativeEvent.type==="focusin"?"focus":"blur";event.isSimulated=true;// First, handle focusin/focusout
handle(nativeEvent);// ...then, handle focus/blur
//
// focus/blur don't bubble while focusin/focusout do; simulate the former by only
// invoking the handler at the lower level.
if(event.target===event.currentTarget){// The setup part calls `leverageNative`, which, in turn, calls
// `jQuery.event.add`, so event handle will already have been set
// by this point.
handle(event);}}else{// For non-IE browsers, attach a single capturing handler on the document
// while someone wants focusin/focusout.
jQuery.event.simulate(delegateType,nativeEvent.target,jQuery.event.fix(nativeEvent));}}jQuery.event.special[type]={// Utilize native event if possible so blur/focus sequence is correct
trigger:function(){// Force setup before trigger
leverageNative(this,type);// Return non-false to allow normal event-path propagation
return true;},teardown:function(){var attaches;if(document.documentMode){attaches=dataPriv.get(this,delegateType)-1;if(!attaches){this.removeEventListener(delegateType,focusMappedHandler);dataPriv.remove(this,delegateType);}else{dataPriv.set(this,delegateType,attaches);}}else{// Return false to indicate standard teardown should be applied
return false;}},// Suppress native focus or blur if we're currently inside
// a leveraged native-event stack
_default:function(event){return dataPriv.get(event.target,type);},delegateType:delegateType};// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
//
// Support: IE 9 - 11+
// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
// attach a single handler for both events in IE.
jQuery.event.special[delegateType]={setup:function(){// Handle: regular nodes (via `this.ownerDocument`), window
// (via `this.document`) & document (via `this`).
var doc=this.ownerDocument||this.document||this,dataHolder=document.documentMode?this:doc,attaches=dataPriv.get(dataHolder,delegateType);// Support: IE 9 - 11+
// We use the same native handler for focusin & focus (and focusout & blur)
// so we need to coordinate setup & teardown parts between those events.
// Use `delegateType` as the key as `type` is already used by `leverageNative`.
if(!attaches){if(document.documentMode){this.addEventListener(delegateType,focusMappedHandler);}else{doc.addEventListener(type,focusMappedHandler,true);}}dataPriv.set(dataHolder,delegateType,(attaches||0)+1);},teardown:function(){var doc=this.ownerDocument||this.document||this,dataHolder=document.documentMode?this:doc,attaches=dataPriv.get(dataHolder,delegateType)-1;if(!attaches){if(document.documentMode){this.removeEventListener(delegateType,focusMappedHandler);}else{doc.removeEventListener(type,focusMappedHandler,true);}dataPriv.remove(dataHolder,delegateType);}else{dataPriv.set(dataHolder,delegateType,attaches);}}};});// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover"},function(orig,fix){jQuery.event.special[orig]={handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({off:function(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){// ( event )  dispatched jQuery.Event
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if(typeof types==="object"){// ( types-object [, selector] )
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){// ( types [, fn] )
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var// Support: IE <=10 - 11, Edge 12 - 13 only
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i,// checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rcleanScript=/^\s*<!\[CDATA\[|\]\]>\s*$/g;// Prefer a tbody over its parent table for containing new rows
// Replace/restore the type attribute of script elements for safe DOM manipulation
function cloneCopyEvent(src,dest){var i,l,type,pdataOld,udataOld,udataCur,events;if(dest.nodeType!==1){return;}// 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)){pdataOld=dataPriv.get(src);events=pdataOld.events;if(events){dataPriv.remove(dest,"handle events");for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}}// 2. Copy user data
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}}// Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();// Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked;// Fails to return the selected option to the default selected state when cloning options
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){// Flatten any nested arrays
args=flat(args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],valueIsFunction=isFunction(value);// We can't cloneNode fragments that contain checked, in WebKit
if(valueIsFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(valueIsFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}// Require either new content or an interest in ignored elements to invoke the callback
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length;// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (trac-8070).
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true);// Keep references to cloned scripts for later restoration
if(hasScripts){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;// Re-enable scripts
jQuery.map(scripts,restoreScript);// Evaluate executable scripts on first document insertion
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src&&(node.type||"").toLowerCase()!=="module"){// Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl&&!node.noModule){jQuery._evalUrl(node.src,{},doc);}}else{// Unwrap a CDATA section containing script contents. This shouldn't be
// needed as in XML documents they're already not visible when
// inspecting element contents and in HTML documents they have no
// meaning but we're preserving that logic for backwards compatibility.
// This will be removed completely in 4.0. See gh-4904.
DOMEval(node.textContent.replace(rcleanScript,""),node,doc);}}}}}}return collection;}jQuery.extend({});jQuery.fn.extend({html:function(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;}// See if we can take a shortcut and just use innerHTML
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{};// Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0;// If using innerHTML throws an exception, use the fallback method
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);}});jQuery.each({},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems);// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
push.apply(ret,elems.get());}return this.pushStack(ret);};});var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var rcustomProp=/^--/;var getStyles=function(elem){// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};var swap=function(elem,options,callback){var ret,name,old={};// Remember the old values, and insert the new ones
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.call(elem);// Revert the old values
for(name in options){elem.style[name]=old[name];}return ret;};var rboxStyle=new RegExp(cssExpand.join("|"),"i");(function(){// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){// This is a singleton, we need to execute it only once
if(!div){return;}container.style.cssText="position:absolute;left:-11111px;width:60px;"+"margin-top:1px;padding:0;border:0";div.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;"+"margin:auto;border:1px;padding:1px;"+"width:60%;top:1%";documentElement.appendChild(container).appendChild(div);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
reliableMarginLeftVal=roundPixelMeasures(divStyle.marginLeft)===12;// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
// Some styles come back with percentage values, even though they shouldn't
div.style.right="60%";pixelBoxStylesVal=roundPixelMeasures(divStyle.right)===36;// Support: IE 9 - 11 only
// Detect misreporting of content dimensions for box-sizing:border-box elements
boxSizingReliableVal=roundPixelMeasures(divStyle.width)===36;// Support: IE 9 only
// Detect overflow:scroll screwiness (gh-3699)
// Support: Chrome <=64
// Don't get tricked when zoom affects offsetWidth (gh-4029)
div.style.position="absolute";scrollboxSizeVal=roundPixelMeasures(div.offsetWidth/3)===12;documentElement.removeChild(container);// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
div=null;}var pixelPositionVal,boxSizingReliableVal,scrollboxSizeVal,pixelBoxStylesVal,reliableTrDimensionsVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div");// Finish early in limited (non-browser) environments
if(!div.style){return;}// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (trac-8908)
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";jQuery.extend(support,{boxSizingReliable:function(){computeStyleTests();return boxSizingReliableVal;},pixelBoxStyles:function(){computeStyleTests();return pixelBoxStylesVal;},pixelPosition:function(){computeStyleTests();return pixelPositionVal;}// Support: IE 9 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Behavior in IE 9 is more subtle than in newer versions & it passes
// some versions of this test; make sure not to make it pass there!
//
// Support: Firefox 70+
// Only Firefox includes border widths
// in computed dimensions. (gh-4529)
});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,isCustomProp=rcustomProp.test(name),// Support: Firefox 51+
// Retrieving style before computed somehow
// fixes an issue with getting wrong values
// on detached elements
style=elem.style;computed=computed||getStyles(elem);// getPropertyValue is needed for:
//   .css('filter') (IE 9 only, trac-12537)
//   .css('--customProperty) (gh-3144)
if(computed){// Support: IE <=9 - 11+
// IE only supports `"float"` in `getPropertyValue`; in computed styles
// it's only available as `"cssFloat"`. We no longer modify properties
// sent to `.css()` apart from camelCasing, so we need to check both.
// Normally, this would create difference in behavior: if
// `getPropertyValue` returns an empty string, the value returned
// by `.css()` would be `undefined`. This is usually the case for
// disconnected elements. However, in IE even disconnected elements
// with no styles return `"none"` for `getPropertyValue( "float" )`
ret=computed.getPropertyValue(name)||computed[name];if(isCustomProp&&ret){// Support: Firefox 105+, Chrome <=105+
// Spec requires trimming whitespace for custom properties (gh-4926).
// Firefox only trims leading whitespace. Chrome just collapses
// both leading & trailing whitespace to a single space.
//
// Fall back to `undefined` if empty string returned.
// This collapses a missing definition with property defined
// and set to an empty string but there's no standard API
// allowing us to differentiate them without a performance penalty
// and returning `undefined` aligns with older jQuery.
//
// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
// as whitespace while CSS does not, but this is not a problem
// because CSS preprocessing replaces them with U+000A LINE FEED
// (which *is* CSS whitespace)
// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
ret=ret.replace(rtrimCSS,"$1")||undefined;}if(ret===""&&!isAttached(elem)){ret=jQuery.style(elem,name);}// A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// https://drafts.csswg.org/cssom/#resolved-values
if(!support.pixelBoxStyles()&&rnumnonpx.test(ret)&&rboxStyle.test(name)){// Remember the original values
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;// Put in the new values to get a computed value out
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;// Revert the changed values
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined?// Support: IE <=9 - 11 only
// IE returns zIndex value as an integer.
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){if(conditionFn()){// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;}// Hook needed; redefine it so that the support test is not executed again.
return(this.get=hookFn).apply(this,arguments);}};}var cssPrefixes=["Webkit","Moz","ms"],emptyStyle=document.createElement("div").style,vendorProps={};// Return a vendor-prefixed property or undefined
// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
var// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,cssShow={},cssNormalTransform={};function setPositiveNumber(_elem,value,subtract){// Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);return matches?// Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function boxModelAdjustment(elem,dimension,box,isBorderBox,styles,computedVal){var i=dimension==="width"?1:0,extra=0,delta=0,marginDelta=0;// Adjustment may not be necessary
if(box===(isBorderBox?"border":"content")){return 0;}for(;i<4;i+=2){// Both box models exclude margin
// Count margin delta separately to only add it after scroll gutter adjustment.
// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
if(box==="margin"){marginDelta+=jQuery.css(elem,box+cssExpand[i],true,styles);}// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
if(!isBorderBox){// Add padding
delta+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);// For "border" or "margin", add border
if(box!=="padding"){delta+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);// But still keep track of it otherwise
}else{extra+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}// If we get here with a border-box (content + padding + border), we're seeking "content" or
// "padding" or "margin"
}else{// For "content", subtract padding
if(box==="content"){delta-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);}// For "content" or "padding", subtract border
if(box!=="margin"){delta-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}// Account for positive content-box scroll gutter when requested by providing computedVal
if(!isBorderBox&&computedVal>=0){// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
// Assuming integer scroll gutter, subtract the rest and round down
delta+=Math.max(0,Math.ceil(elem["offset"+dimension[0].toUpperCase()+dimension.slice(1)]-computedVal-delta-extra-0.5// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
// Use an explicit zero to avoid NaN (gh-3964)
))||0;}return delta+marginDelta;}function getWidthOrHeight(elem,dimension,extra){// Start with computed style
var styles=getStyles(elem),// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
// Fake content-box until we know it's needed to know the true value.
boxSizingNeeded=!support.boxSizingReliable()||extra,isBorderBox=boxSizingNeeded&&jQuery.css(elem,"boxSizing",false,styles)==="border-box",valueIsBorderBox=isBorderBox,val=curCSS(elem,dimension,styles),offsetProp="offset"+dimension[0].toUpperCase()+dimension.slice(1);// Support: Firefox <=54
// Return a confounding non-pixel value or feign ignorance, as appropriate.
if(rnumnonpx.test(val)){if(!extra){return val;}val="auto";}// Support: IE 9 - 11 only
// Use offsetWidth/offsetHeight for when box sizing is unreliable.
// In those cases, the computed value can be trusted to be border-box.
if((!support.boxSizingReliable()&&isBorderBox||// Support: IE 10 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Interestingly, in some cases IE 9 doesn't suffer from this issue.
!support.reliableTrDimensions()&&nodeName(elem,"tr")||// Fall back to offsetWidth/offsetHeight when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
val==="auto"||// Support: Android <=4.1 - 4.3 only
// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
!parseFloat(val)&&jQuery.css(elem,"display",false,styles)==="inline")&&// Make sure the element is visible & connected
elem.getClientRects().length){isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box";// Where available, offsetWidth/offsetHeight approximate border box dimensions.
// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
// retrieved value as a content box dimension.
valueIsBorderBox=offsetProp in elem;if(valueIsBorderBox){val=elem[offsetProp];}}// Normalize "" and auto
val=parseFloat(val)||0;// Adjust for the element's box model
return val+boxModelAdjustment(elem,dimension,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles,// Provide the current computed size to request scroll gutter calculation (gh-3589)
val)+"px";}jQuery.extend({});jQuery.each(["height","width"],function(_i,dimension){jQuery.cssHooks[dimension]={};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return(parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{},function(){return elem.getBoundingClientRect().left;}))+"px";}});// These hooks are used by animate to expand properties
jQuery.each({},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={};if(prefix!=="margin"){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({});jQuery.Tween=Tween;Tween.prototype={run:function(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function(tween){var result;// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];}// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result=jQuery.css(tween.elem,tween.prop,"");// Empty strings, null, undefined and "auto" are converted to 0.
return!result||result==="auto"?0:result;},set:function(tween){// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(jQuery.cssHooks[tween.prop]||tween.elem.style[finalPropName(tween.prop)]!=null)){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={};jQuery.fx=Tween.prototype.init;// Back compat <1.8 extension point
jQuery.fx.step={};var fxNow,inProgress,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/;function schedule(){if(inProgress){if(document.hidden===false&&window.requestAnimationFrame){window.requestAnimationFrame(schedule);}else{window.setTimeout(schedule,jQuery.fx.interval);}jQuery.fx.tick();}}// Animations created synchronously will run synchronously
// Generate parameters to create a standard animation
function defaultPrefilter(elem,props,opts){var prop,value,toggle,hooks,oldfire,propTween,restoreDisplay,display,isBox="width"in props||"height"in props,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHiddenWithinTree(elem),dataShow=dataPriv.get(elem,"fxshow");// Queue-skipping animations hijack the fx hooks
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){// Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}// Detect show/hide animations
for(prop in props){value=props[prop];if(rfxtypes.test(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;// Ignore all other no-op show/hide data
}else{continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop);}}// Bail out if this is a no-op like .hide().hide()
propTween=!jQuery.isEmptyObject(props);if(!propTween&&jQuery.isEmptyObject(orig)){return;}// Restrict "overflow" and "display" styles during box animations
if(isBox&&elem.nodeType===1){// Support: IE <=9 - 11, Edge 12 - 15
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY and Edge just mirrors
// the overflowX value there.
opts.overflow=[style.overflow,style.overflowX,style.overflowY];// Identify a display type, preferring old show/hide data over the CSS cascade
restoreDisplay=dataShow&&dataShow.display;if(restoreDisplay==null){restoreDisplay=dataPriv.get(elem,"display");}display=jQuery.css(elem,"display");if(display==="none"){if(restoreDisplay){display=restoreDisplay;}else{// Get nonempty value(s) by temporarily forcing visibility
showHide([elem],true);restoreDisplay=elem.style.display||restoreDisplay;display=jQuery.css(elem,"display");showHide([elem]);}}// Animate inline elements as inline-block
if(display==="inline"||display==="inline-block"&&restoreDisplay!=null){if(jQuery.css(elem,"float")==="none"){// Restore the original display value at the end of pure show/hide animations
if(!propTween){anim.done(function(){style.display=restoreDisplay;});if(restoreDisplay==null){display=style.display;restoreDisplay=display==="none"?"":display;}}style.display="inline-block";}}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}// Implement show/hide animations
propTween=false;for(prop in orig){// General show/hide setup for this element animation
if(!propTween){if(dataShow){if("hidden"in dataShow){hidden=dataShow.hidden;}}else{dataShow=dataPriv.access(elem,"fxshow",{});}// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
if(toggle){dataShow.hidden=!hidden;}// Show elements before animating them
if(hidden){showHide([elem],true);}/* eslint-disable no-loop-func */anim.done(function(){/* eslint-enable no-loop-func */// The final step of a "hide" animation is actually hiding the element
if(!hidden){showHide([elem]);}dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});}// Per-property setup
propTween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=propTween.start;if(hidden){propTween.end=propTween.start;propTween.start=0;}}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){// Don't match elem in the :animated selector
delete tick.elem;}),tick=function(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);// If there's more to do, yield
if(percent<1&&length){return remaining;}// If this was an empty animation, synthesize a final progress notification
if(!length){deferred.notifyWith(elem,[animation,1,0]);}// Resolve the animation and report its conclusion
deferred.resolveWith(elem,[animation]);return false;},animation=deferred.promise({createTween:function(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function(gotoEnd){var index=0,// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);}// Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=result.stop.bind(result);}return result;}}jQuery.map(props,createTween,animation);if(isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}// Attach callbacks from options
animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);jQuery.fx.timer(jQuery.extend(tick,{anim:animation,queue:animation.opts.queue}));return animation;}jQuery.Animation=jQuery.extend(Animation,{});jQuery.speed=function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{};// Go to the end state if fx are off
if(jQuery.fx.off){opt.duration=0;}else{if(typeof opt.duration!=="number"){if(opt.duration in jQuery.fx.speeds){opt.duration=jQuery.fx.speeds[opt.duration];}else{opt.duration=jQuery.fx.speeds._default;}}}// Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue==null||opt.queue===true){opt.queue="fx";}// Queueing
opt.old=opt.complete;opt.complete=function(){if(isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){// Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall);// Empty animations, or finishing resolves immediately
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;// Enable finishing flag on private data
data.finish=true;// Empty the queue first
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);}// Look for any active animations, and finish them
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}}// Look for any animations in the old queue and finish them
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}}// Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(_i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});// Generate shortcuts for custom animations
jQuery.each({},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=Date.now();for(;i<timers.length;i++){timer=timers[i];// Run the timer and safely remove it when done (allowing for external removal)
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);jQuery.fx.start();};jQuery.fx.interval=13;jQuery.fx.start=function(){if(inProgress){return;}inProgress=true;schedule();};jQuery.fx.stop=function(){inProgress=null;};jQuery.fx.speeds={};// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox";// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
support.checkOn=input.value!=="";// Support: IE <=11 only
// Must access selectedIndex to make default options select
support.optSelected=opt.selected;// Support: IE <=11 only
// An input loses its value after becoming a radio
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set attributes on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}// Fallback to prop when attributes are not supported
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);}// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
if(nType!==1||!jQuery.isXMLDoc(elem)){hooks=jQuery.attrHooks[name.toLowerCase()]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name);// Non-existent attributes return null, we normalize to undefined
return ret==null?undefined:ret;}});// Hooks for boolean attributes
boolHook={set:function(elem,value,name){if(value===false){// Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else{elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(_i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle,lowercaseName=name.toLowerCase();if(!isXML){// Avoid an infinite loop by temporarily removing this function from the getter
handle=attrHandle[lowercaseName];attrHandle[lowercaseName]=ret;ret=getter(elem,name,isXML)!=null?lowercaseName:null;attrHandle[lowercaseName]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set properties on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){// Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function(elem){// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// Use proper attribute retrieval (trac-12072)
var tabindex=jQuery.find.attr(elem,"tabindex");if(tabindex){return parseInt(tabindex,10);}if(rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href){return 0;}return-1;}}}});// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if(!support.optSelected){jQuery.propHooks.selected={};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});// Strip and collapse whitespace according to HTML spec
// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
jQuery.fn.extend({removeClass:function(value){var classNames,cur,curValue,className,i,finalValue;if(isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}classNames=classesToArray(value);if(classNames.length){return this.each(function(){curValue=getClass(this);// This expression is here for better compressibility (see addClass)
cur=this.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){for(i=0;i<classNames.length;i++){className=classNames[i];// Remove *all* instances
while(cur.indexOf(" "+className+" ")>-1){cur=cur.replace(" "+className+" "," ");}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){this.setAttribute("class",finalValue);}}});}return this;}});var rreturn=/\r/g;jQuery.fn.extend({val:function(value){var hooks,ret,valueIsFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;// Handle most common string cases
if(typeof ret==="string"){return ret.replace(rreturn,"");}// Handle cases where value is null/undef or number
return ret==null?"":ret;}return;}valueIsFunction=isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(valueIsFunction){val=value.call(this,i,jQuery(this).val());}else{val=value;}// Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(Array.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];// If set returns undefined, fall back to normal setting
if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val:// Support: IE <=10 - 11 only
// option.text throws exceptions (trac-14686, trac-14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
stripAndCollapse(jQuery.text(elem));}},select:{get:function(elem){var value,option,i,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one",values=one?null:[],max=one?index+1:options.length;if(index<0){i=max;}else{i=one?index:0;}// Loop through all the selected options
for(;i<max;i++){option=options[i];// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (trac-2551)
if((option.selected||i===index)&&// Don't return options that are disabled or in a disabled optgroup
!option.disabled&&(!option.parentNode.disabled||!nodeName(option.parentNode,"optgroup"))){// Get the specific value for the option
value=jQuery(option).val();// We don't need an array for one selects
if(one){return value;}// Multi-Selects return an array
values.push(value);}}return values;},set:function(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];/* eslint-disable no-cond-assign */if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}/* eslint-enable no-cond-assign */}// Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex=-1;}return values;}}}});// Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function(elem,value){if(Array.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}});// Return jQuery for attributes-only inclusion
var location=window.location;var nonce={};var rquery=/\?/;// Cross-browser xml parsing
jQuery.parseXML=function(data){var xml,parserErrorElem;if(!data||typeof data!=="string"){return null;}// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){}parserErrorElem=xml&&xml.getElementsByTagName("parsererror")[0];if(!xml||parserErrorElem){jQuery.error("Invalid XML: "+(parserErrorElem?jQuery.map(parserErrorElem.childNodes,function(el){return el.textContent;}).join("\n"):data));}return xml;};var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,stopPropagationCallback=function(e){e.stopPropagation();};jQuery.extend(jQuery.event,{trigger:function(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,lastElement,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=lastElement=tmp=elem=elem||document;// Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;}// focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){// Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type;// Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,typeof event==="object"&&event);// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;// Clean up the event in case it is being reused
event.result=undefined;if(!event.target){event.target=elem;}// Clone any incoming data and prepend the event, creating the handler arg list
data=data==null?[event]:jQuery.makeArray(data,[event]);// Allow special events to draw outside the lines
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;}// Determine event propagation path in advance, per W3C events spec (trac-9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
if(!onlyHandlers&&!special.noBubble&&!isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;}// Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}}// Fire handlers on the event path
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){lastElement=cur;event.type=i>1?bubbleType:special.bindType||type;// jQuery handler
handle=(dataPriv.get(cur,"events")||Object.create(null))[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);}// Native handler
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type;// If nobody prevented the default action, do it now
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (trac-6170)
if(ontype&&isFunction(elem[type])&&!isWindow(elem)){// Don't re-trigger an onFOO event when we call its FOO() method
tmp=elem[ontype];if(tmp){elem[ontype]=null;}// Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered=type;if(event.isPropagationStopped()){lastElement.addEventListener(type,stopPropagationCallback);}elem[type]();if(event.isPropagationStopped()){lastElement.removeEventListener(type,stopPropagationCallback);}jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;},// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true});jQuery.event.trigger(e,null,elem);}});jQuery.fn.extend({trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});var rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(Array.isArray(obj)){// Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){// Treat each array item as a scalar.
add(prefix,v);}else{// Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+(typeof v==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&toType(obj)==="object"){// Serialize object item.
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{// Serialize scalar item.
add(prefix,obj);}}// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,valueOrFunction){// If value is a function, invoke it and use its return value
var value=isFunction(valueOrFunction)?valueOrFunction():valueOrFunction;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value==null?"":value);};if(a==null){return"";}// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){// Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else{// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}// Return the resulting serialization
return s.join("&");};jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){// Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type;// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(_i,elem){var val=jQuery(this).val();if(val==null){return null;}if(Array.isArray(val)){return jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};});}return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});var r20=/%20/g,rhash=/#.*$/,rantiCache=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg,// trac-7653, trac-8125, trac-8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={},// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
allTypes="*/".concat("*"),// Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href;// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){// dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnothtmlwhite)||[];if(isFunction(func)){// For each dataType in the dataTypeExpression
while(dataType=dataTypes[i++]){// Prepend if requested
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func);// Otherwise append
}else{(structure[dataType]=structure[dataType]||[]).push(func);}}}};}// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return!(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");}// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;// Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}}// Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}// Check to see if we have a response for the expected dataType
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{// Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}}// Or just use first one
finalDataType=finalDataType||firstDataType;}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},// Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice();// Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift();// Convert to each sequential dataType
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;}// Apply the dataFilter if provided
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){// There's only work to do if current dataType is non-auto
if(current==="*"){current=prev;// Convert response if prev dataType is non-auto and differs from current
}else if(prev!=="*"&&prev!==current){// Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current];// If none found, seek a pair
if(!conv){for(conv2 in converters){// If conv2 outputs current
tmp=conv2.split(" ");if(tmp[1]===current){// If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){// Condense equivalence converters
if(conv===true){conv=converters[conv2];// Otherwise, insert the intermediate dataType
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}}// Apply converter (if not an equivalence)
if(conv!==true){// Unless errors are allowed to bubble, catch and return them
if(conv&&s.throws){response=conv(response);}else{try{response=conv(response);}catch(e){return{error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return{};}jQuery.extend({// Counter for holding the number of active queries
active:0// Last-Modified header cache for next request
,ajaxSettings:{/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{// Convert anything to text
// Text to html (true = no transformation)
// Evaluate text as a json expression
"text json":JSON.parse,// Parse text as xml
"text xml":jQuery.parseXML}// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function(target,settings){return settings?// Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):// Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},// Main method
ajax:function(url,options){// If url is an object, simulate pre-1.5 signature
if(typeof url==="object"){options=url;url=undefined;}// Force options to be an object
options=options||{};var transport,// URL without anti-cache param
cacheURL,// Response headers
responseHeadersString,responseHeaders,// timeout handle
timeoutTimer,// Url cleanup var
urlAnchor,// Request state (becomes false upon send and true upon completion)
completed,// To know if global events are to be dispatched
fireGlobals,// Loop variable
i,// uncached part of the url
uncached,// Create the final options object
s=jQuery.ajaxSetup({},options),// Callbacks context
callbackContext=s.context||s,// Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,// Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),// Status-dependent callbacks
statusCode=s.statusCode||{},// Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={},// Default abort message
strAbort="canceled",// Fake xhr
jqXHR={readyState:0,// Builds headers hashtable if needed
getResponseHeader:function(key){var match;if(completed){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()+" "]=(responseHeaders[match[1].toLowerCase()+" "]||[]).concat(match[2]);}}match=responseHeaders[key.toLowerCase()+" "];}return match==null?null:match.join(", ");}// Raw string
,// Caches the header
setRequestHeader:function(name,value){if(completed==null){name=requestHeadersNames[name.toLowerCase()]=requestHeadersNames[name.toLowerCase()]||name;requestHeaders[name]=value;}return this;}// Overrides response content-type header
,// Status-dependent callbacks
statusCode:function(map){var code;if(map){if(completed){// Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}else{// Lazy-add the new callbacks in a way that preserves old ones
for(code in map){statusCode[code]=[statusCode[code],map[code]];}}}return this;},// Cancel the request
abort:function(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}};// Attach deferreds
deferred.promise(jqXHR);// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (trac-10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rprotocol,location.protocol+"//");// Alias method option to type as per ticket trac-12004
s.type=options.method||options.type||s.method||s.type;// Extract dataTypes list
s.dataTypes=(s.dataType||"*").toLowerCase().match(rnothtmlwhite)||[""];// A cross-domain request is in order when the origin doesn't match the current origin.
if(s.crossDomain==null){urlAnchor=document.createElement("a");// Support: IE <=8 - 11, Edge 12 - 15
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{urlAnchor.href=s.url;// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=true;}}// Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}// Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);// If request was aborted inside a prefilter, stop there
if(completed){return jqXHR;}// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
fireGlobals=jQuery.event&&s.global;// Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}// Uppercase the type
s.type=s.type.toUpperCase();// Determine if request has content
s.hasContent=!rnoContent.test(s.type);// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
cacheURL=s.url.replace(rhash,"");// More options handling for requests with no content
if(!s.hasContent){// Remember the hash so we can put it back
uncached=s.url.slice(cacheURL.length);// If data is available and should be processed, append data to url
if(s.data&&(s.processData||typeof s.data==="string")){cacheURL+=(rquery.test(cacheURL)?"&":"?")+s.data;// trac-9682: remove data so that it's not used in an eventual retry
delete s.data;}// Add or update anti-cache param if needed
if(s.cache===false){cacheURL=cacheURL.replace(rantiCache,"$1");uncached=(rquery.test(cacheURL)?"&":"?")+"_="+nonce.guid+++uncached;}// Put hash and anti-cache on the URL that will be requested (gh-1732)
s.url=cacheURL+uncached;// Change '%20' to '+' if this is encoded form body content (gh-2658)
}else if(s.data&&s.processData&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0){s.data=s.data.replace(r20,"+");}// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}}// Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}// Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);// Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}// Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||completed)){// Abort if not done already and return
return jqXHR.abort();}// Aborting is no longer a cancellation
strAbort="abort";// Install callbacks on deferreds
completeDeferred.add(s.complete);jqXHR.done(s.success);jqXHR.fail(s.error);// Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);// If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;// Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}// If request was aborted inside ajaxSend, stop there
if(completed){return jqXHR;}// Timeout
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{completed=false;transport.send(requestHeaders,done);}catch(e){// Rethrow post-completion exceptions
if(completed){throw e;}// Propagate others as results
done(-1,e);}}// Callback for when everything is done
return jqXHR;}});jQuery.each(["get","post"],function(_i,method){jQuery[method]=function(url,data,callback,type){// Shift arguments if data argument was omitted
if(isFunction(data)){type=type||callback;callback=data;data=undefined;}// The url can be an options object (which then must have .url)
return jQuery.ajax(jQuery.extend({},jQuery.isPlainObject(url)&&url));};});jQuery.ajaxPrefilter(function(s){var i;for(i in s.headers){if(i.toLowerCase()==="content-type"){s.contentType=s.headers[i]||"";}}});jQuery._evalUrl=function(url,options,doc){return jQuery.ajax({});};jQuery.fn.extend({});jQuery.expr.pseudos.hidden=function(elem){return!jQuery.expr.pseudos.visible(elem);};jQuery.expr.pseudos.visible=function(elem){return!!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials"in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var callback,errorCallback;// Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain){return{send:function(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password);// Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}}// Override mime type if needed
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);}// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}// Set headers
for(i in headers){xhr.setRequestHeader(i,headers[i]);}// Callback
callback=function(type){return function(){if(callback){callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.ontimeout=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
if(typeof xhr.status!=="number"){complete(0,"error");}else{complete(// File: protocol always yields status 0; see trac-8605, trac-14207
xhr.status,xhr.statusText);}}else{complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{}:{},xhr.getAllResponseHeaders());}}};};// Listen to events
xhr.onload=callback();errorCallback=xhr.onerror=xhr.ontimeout=callback("error");// Support: IE 9 only
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else{xhr.onreadystatechange=function(){// Check readyState before timeout as it changes
if(xhr.readyState===4){// Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){if(callback){errorCallback();}});}};}// Create the abort callback
callback=callback("abort");try{// Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null);}catch(e){// trac-14683: Only rethrow if this hasn't been notified as an error yet
if(callback){throw e;}}}};}});// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});// Install script dataType
jQuery.ajaxSetup({});// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}});// Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){// This transport only deals with cross domain or forced-by-attrs requests
if(s.crossDomain||s.scriptAttrs){var script,callback;return{};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;// Default jsonp settings
jQuery.ajaxSetup({});// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data");// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||s.dataTypes[0]==="jsonp"){// Get callback name, remembering preexisting value associated with it
callbackName=s.jsonpCallback=isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;// Insert callback into url or form data
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;}// Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];};// Force json dataType
s.dataTypes[0]="json";// Install callback
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;};// Clean-up function (fires after converters)
jqXHR.always(function(){// If previous value didn't exist - remove it
if(overwritten===undefined){jQuery(window).removeProp(callbackName);// Otherwise restore preexisting value
}else{window[callbackName]=overwritten;}// Save back as free
if(s[callbackName]){// Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback;// Save the callback name for future use
oldCallbacks.push(callbackName);}// Call if it was a function and we have a response
if(responseContainer&&isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;});// Delegate to script
return"script";}});// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;body.innerHTML="<form></form><form></form>";return body.childNodes.length===2;}();// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if(typeof data!=="string"){return[];}if(typeof context==="boolean"){keepScripts=context;context=false;}var base,parsed,scripts;if(!context){// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
if(support.createHTMLDocument){context=document.implementation.createHTMLDocument("");// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
base=context.createElement("base");base.href=document.location.href;context.head.appendChild(base);}else{context=document;}}parsed=rsingleTag.exec(data);scripts=!keepScripts&&[];// Single tag
if(parsed){return[context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);};/**
 * Load a url into a page
 */jQuery.fn.load=function(url,params,callback){var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=stripAndCollapse(url.slice(off));url=url.slice(0,off);}// If it's a function
if(isFunction(params)){// We assume that it's the callback
callback=params;params=undefined;// Otherwise, build a param string
}else if(params&&typeof params==="object"){type="POST";}// If we have elements to modify, make the request
if(self.length>0){jQuery.ajax({}).done(function(responseText){// Save response for use in complete callback
response=arguments;self.html(selector?// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):// Otherwise use the full result
responseText);// If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR]);});});}return this;};jQuery.expr.pseudos.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};jQuery.offset={};jQuery.fn.extend({// offset() relates an element's border box to the document origin
// position() relates an element's margin box to its offset parent's padding box
// This corresponds to the behavior of CSS absolute positioning
position:function(){if(!this[0]){return;}var offsetParent,offset,doc,elem=this[0],parentOffset={};// position:fixed elements are offset from the viewport, which itself always has zero offset
if(jQuery.css(elem,"position")==="fixed"){// Assume position:fixed implies availability of getBoundingClientRect
offset=elem.getBoundingClientRect();}else{offset=this.offset();// Account for the *real* offset parent, which can be the document or its root element
// when a statically positioned element is identified
doc=elem.ownerDocument;offsetParent=elem.offsetParent||doc.documentElement;while(offsetParent&&(offsetParent===doc.body||offsetParent===doc.documentElement)&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.parentNode;}if(offsetParent&&offsetParent!==elem&&offsetParent.nodeType===1){// Incorporate borders into its offset, since they are outside its content origin
parentOffset=jQuery(offsetParent).offset();parentOffset.top+=jQuery.css(offsetParent,"borderTopWidth",true);parentOffset.left+=jQuery.css(offsetParent,"borderLeftWidth",true);}}// Subtract parent offsets and element margins
return{};}// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
});// Create scrollLeft and scrollTop methods
jQuery.each({},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){// Coalesce documents and windows
var win;if(isWindow(elem)){win=elem;}else if(elem.nodeType===9){win=elem.defaultView;}if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else{elem[method]=val;}},method,val,arguments.length);};});// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(_i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop);// If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});});// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({},function(name,type){jQuery.each({},function(defaultExtra,funcName){// Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(isWindow(elem)){// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
return funcName.indexOf("outer")===0?elem["inner"+name]:elem.document.documentElement["client"+name];}// Get document width or height
if(elem.nodeType===9){doc=elem.documentElement;// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined?// Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra):// Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable);};});});jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(_i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.fn.extend({});jQuery.each(("blur focus focusin focusout resize scroll click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup contextmenu").split(" "),function(_i,name){// Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy=function(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!isFunction(fn)){return undefined;}// Simulated bind
args=slice.call(arguments,2);proxy=function(){return fn.apply(context||this,args.concat(slice.call(arguments)));};// Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;};jQuery.holdReady=function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}};jQuery.isArray=Array.isArray;jQuery.parseJSON=JSON.parse;jQuery.nodeName=nodeName;jQuery.isFunction=isFunction;jQuery.isWindow=isWindow;jQuery.camelCase=camelCase;jQuery.type=toType;jQuery.now=Date.now;jQuery.isNumeric=function(obj){// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var type=jQuery.type(obj);return(type==="number"||type==="string")&&// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
!isNaN(obj-parseFloat(obj));};jQuery.trim=function(text){return text==null?"":(text+"").replace(rtrim,"$1");};// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return jQuery;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}var// Map over jQuery in case of overwrite
_jQuery=window.jQuery,// Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;};// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if(typeof noGlobal==="undefined"){window.jQuery=window.$=jQuery;}return jQuery;});/***/})/***/,/***/277:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */(function(name,definition){if(true&&module.exports)module.exports=definition();else if(true)!(__WEBPACK_AMD_DEFINE_FACTORY__=definition,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));else{}})('$script',function(){var doc=document,head=doc.getElementsByTagName('head')[0],s='string',f=false,push='push',readyState='readyState',onreadystatechange='onreadystatechange',list={},ids={},delay={},scripts={},scriptpath,urlArgs;function every(ar,fn){for(var i=0,j=ar.length;i<j;++i)if(!fn(ar[i]))return f;return 1;}function each(ar,fn){every(ar,function(el){fn(el);return 1;});}function $script(paths,idOrDone,optDone){paths=paths[push]?paths:[paths];var idOrDoneIsDone=idOrDone&&idOrDone.call,done=idOrDoneIsDone?idOrDone:optDone,id=idOrDoneIsDone?paths.join(''):idOrDone,queue=paths.length;setTimeout(function(){each(paths,function loading(path,force){if(path===null)return callback();if(!force&&!/^https?:\/\//.test(path)&&scriptpath){path=path.indexOf('.js')===-1?scriptpath+path+'.js':scriptpath+path;}if(scripts[path]){if(id)ids[id]=1;return scripts[path]==2?callback():setTimeout(function(){loading(path,true);},0);}scripts[path]=1;if(id)ids[id]=1;create(path,callback);});},0);return $script;}$script.get=create;$script.order=function(scripts,id,done){(function callback(s){s=scripts.shift();!scripts.length?$script(s,id,done):$script(s,callback);})();};$script.path=function(p){scriptpath=p;};$script.urlArgs=function(str){urlArgs=str;};$script.ready=function(deps,ready,req){deps=deps[push]?deps:[deps];var missing=[];!each(deps,function(dep){list[dep]||missing[push](dep);})&&every(deps,function(dep){return list[dep];})?ready():!function(key){delay[key]=delay[key]||[];delay[key][push](ready);req&&req(missing);}(deps.join('|'));return $script;};$script.done=function(idOrDone){$script([null],idOrDone);};return $script;});/***/}),/***/265:(/***/function(module){(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports=factory();else{}})(this,function(){return/******/function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******//******/// The require function
/******/function __nested_webpack_require_543__(moduleId){/******//******/// Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={};/******//******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__nested_webpack_require_543__);/******//******/// Flag the module as loaded
/******/module.l=true;/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
/******/__nested_webpack_require_543__.m=modules;/******//******/// expose the module cache
/******/__nested_webpack_require_543__.c=installedModules;/******//******/// define getter function for harmony exports
/******/__nested_webpack_require_543__.d=function(exports,name,getter){/******/if(!__nested_webpack_require_543__.o(exports,name)){/******/Object.defineProperty(exports,name,{enumerable:true,get:getter});/******/}/******/};/******//******/// define __esModule on exports
/******/__nested_webpack_require_543__.r=function(exports){/******/if(typeof Symbol!=='undefined'&&Symbol.toStringTag){/******/Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});/******/}/******/Object.defineProperty(exports,'__esModule',{value:true});/******/};/******//******/// create a fake namespace object
/******/// mode & 1: value is a module id, require it
/******/// mode & 2: merge all properties of value into the ns
/******/// mode & 4: return value when already ns object
/******/// mode & 8|1: behave like require
/******/__nested_webpack_require_543__.t=function(value,mode){/******/if(mode&1)value=__nested_webpack_require_543__(value);/******/if(mode&8)return value;/******/if(mode&4&&typeof value==='object'&&value&&value.__esModule)return value;/******/var ns=Object.create(null);/******/__nested_webpack_require_543__.r(ns);/******/Object.defineProperty(ns,'default',{enumerable:true,value:value});/******/if(mode&2&&typeof value!='string')for(var key in value)__nested_webpack_require_543__.d(ns,key,function(key){return value[key];}.bind(null,key));/******/return ns;/******/};/******//******/// getDefaultExport function for compatibility with non-harmony modules
/******/__nested_webpack_require_543__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__nested_webpack_require_543__.d(getter,'a',getter);/******/return getter;/******/};/******//******/// Object.prototype.hasOwnProperty.call
/******/__nested_webpack_require_543__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******//******/// __webpack_public_path__
/******/__nested_webpack_require_543__.p="";/******//******//******/// Load entry module and return exports
/******/return __nested_webpack_require_543__(__nested_webpack_require_543__.s=0);/******/}/************************************************************************//******/([(/* 0 *//***/function(module,__webpack_exports__,__nested_webpack_require_4019__){"use strict";__nested_webpack_require_4019__.r(__webpack_exports__);// CONCATENATED MODULE: ./src/tools.js
var argumentAsArray=function argumentAsArray(argument){return Array.isArray(argument)?argument:[argument];};var isElement=function isElement(target){return target instanceof Node;};var isElementList=function isElementList(nodeList){return nodeList instanceof NodeList;};var eachNode=function eachNode(nodeList,callback){if(nodeList&&callback){nodeList=isElementList(nodeList)?nodeList:[nodeList];for(var i=0;i<nodeList.length;i++){if(callback(nodeList[i],i,nodeList.length)===true){break;}}}};var throwError=function throwError(message){return console.error("[scroll-lock] ".concat(message));};var arrayAsSelector=function arrayAsSelector(array){if(Array.isArray(array)){var selector=array.join(', ');return selector;}};var nodeListAsArray=function nodeListAsArray(nodeList){var nodes=[];eachNode(nodeList,function(node){return nodes.push(node);});return nodes;};var findParentBySelector=function findParentBySelector($el,selector){var self=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var $root=arguments.length>3&&arguments[3]!==undefined?arguments[3]:document;if(self&&nodeListAsArray($root.querySelectorAll(selector)).indexOf($el)!==-1){return $el;}while(($el=$el.parentElement)&&nodeListAsArray($root.querySelectorAll(selector)).indexOf($el)===-1){;}return $el;};var elementHasSelector=function elementHasSelector($el,selector){var $root=arguments.length>2&&arguments[2]!==undefined?arguments[2]:document;var has=nodeListAsArray($root.querySelectorAll(selector)).indexOf($el)!==-1;return has;};var elementHasOverflowHidden=function elementHasOverflowHidden($el){if($el){var computedStyle=getComputedStyle($el);var overflowIsHidden=computedStyle.overflow==='hidden';return overflowIsHidden;}};var elementScrollTopOnStart=function elementScrollTopOnStart($el){if($el){if(elementHasOverflowHidden($el)){return true;}var scrollTop=$el.scrollTop;return scrollTop<=0;}};var elementScrollTopOnEnd=function elementScrollTopOnEnd($el){if($el){if(elementHasOverflowHidden($el)){return true;}var scrollTop=$el.scrollTop;var scrollHeight=$el.scrollHeight;var scrollTopWithHeight=scrollTop+$el.offsetHeight;return scrollTopWithHeight>=scrollHeight;}};var elementScrollLeftOnStart=function elementScrollLeftOnStart($el){if($el){if(elementHasOverflowHidden($el)){return true;}var scrollLeft=$el.scrollLeft;return scrollLeft<=0;}};var elementScrollLeftOnEnd=function elementScrollLeftOnEnd($el){if($el){if(elementHasOverflowHidden($el)){return true;}var scrollLeft=$el.scrollLeft;var scrollWidth=$el.scrollWidth;var scrollLeftWithWidth=scrollLeft+$el.offsetWidth;return scrollLeftWithWidth>=scrollWidth;}};var elementIsScrollableField=function elementIsScrollableField($el){var selector='textarea, [contenteditable="true"]';return elementHasSelector($el,selector);};var elementIsInputRange=function elementIsInputRange($el){var selector='input[type="range"]';return elementHasSelector($el,selector);};// CONCATENATED MODULE: ./src/scroll-lock.js
/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"disablePageScroll",function(){return disablePageScroll;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"enablePageScroll",function(){return enablePageScroll;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"getScrollState",function(){return getScrollState;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"clearQueueScrollLocks",function(){return clearQueueScrollLocks;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"getTargetScrollBarWidth",function(){return scroll_lock_getTargetScrollBarWidth;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"getCurrentTargetScrollBarWidth",function(){return scroll_lock_getCurrentTargetScrollBarWidth;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"getPageScrollBarWidth",function(){return getPageScrollBarWidth;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"getCurrentPageScrollBarWidth",function(){return getCurrentPageScrollBarWidth;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"addScrollableTarget",function(){return scroll_lock_addScrollableTarget;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"removeScrollableTarget",function(){return scroll_lock_removeScrollableTarget;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"addScrollableSelector",function(){return scroll_lock_addScrollableSelector;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"removeScrollableSelector",function(){return scroll_lock_removeScrollableSelector;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"addLockableTarget",function(){return scroll_lock_addLockableTarget;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"addLockableSelector",function(){return scroll_lock_addLockableSelector;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"setFillGapMethod",function(){return scroll_lock_setFillGapMethod;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"addFillGapTarget",function(){return scroll_lock_addFillGapTarget;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"removeFillGapTarget",function(){return scroll_lock_removeFillGapTarget;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"addFillGapSelector",function(){return scroll_lock_addFillGapSelector;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"removeFillGapSelector",function(){return scroll_lock_removeFillGapSelector;});/* harmony export (binding) */__nested_webpack_require_4019__.d(__webpack_exports__,"refillGaps",function(){return refillGaps;});function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==='function'){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable;}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target;}var FILL_GAP_AVAILABLE_METHODS=['padding','margin','width','max-width','none'];var TOUCH_DIRECTION_DETECT_OFFSET=3;var state={};var disablePageScroll=function disablePageScroll(target){if(state.queue<=0){state.scroll=false;scroll_lock_hideLockableOverflow();fillGaps();}scroll_lock_addScrollableTarget(target);state.queue++;};var enablePageScroll=function enablePageScroll(target){state.queue>0&&state.queue--;if(state.queue<=0){state.scroll=true;scroll_lock_showLockableOverflow();unfillGaps();}scroll_lock_removeScrollableTarget(target);};var getScrollState=function getScrollState(){return state.scroll;};var clearQueueScrollLocks=function clearQueueScrollLocks(){state.queue=0;};var scroll_lock_getTargetScrollBarWidth=function getTargetScrollBarWidth($target){var onlyExists=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(isElement($target)){var currentOverflowYProperty=$target.style.overflowY;if(onlyExists){if(!getScrollState()){$target.style.overflowY=$target.getAttribute('data-scroll-lock-saved-overflow-y-property');}}else{$target.style.overflowY='scroll';}var width=scroll_lock_getCurrentTargetScrollBarWidth($target);$target.style.overflowY=currentOverflowYProperty;return width;}else{return 0;}};var scroll_lock_getCurrentTargetScrollBarWidth=function getCurrentTargetScrollBarWidth($target){if(isElement($target)){if($target===document.body){var documentWidth=document.documentElement.clientWidth;var windowWidth=window.innerWidth;var currentWidth=windowWidth-documentWidth;return currentWidth;}else{var borderLeftWidthCurrentProperty=$target.style.borderLeftWidth;var borderRightWidthCurrentProperty=$target.style.borderRightWidth;$target.style.borderLeftWidth='0px';$target.style.borderRightWidth='0px';var _currentWidth=$target.offsetWidth-$target.clientWidth;$target.style.borderLeftWidth=borderLeftWidthCurrentProperty;$target.style.borderRightWidth=borderRightWidthCurrentProperty;return _currentWidth;}}else{return 0;}};var getPageScrollBarWidth=function getPageScrollBarWidth(){var onlyExists=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;return scroll_lock_getTargetScrollBarWidth(document.body,onlyExists);};var getCurrentPageScrollBarWidth=function getCurrentPageScrollBarWidth(){return scroll_lock_getCurrentTargetScrollBarWidth(document.body);};var scroll_lock_addScrollableTarget=function addScrollableTarget(target){if(target){var targets=argumentAsArray(target);targets.map(function($targets){eachNode($targets,function($target){if(isElement($target)){$target.setAttribute('data-scroll-lock-scrollable','');}else{throwError("\"".concat($target,"\" is not a Element."));}});});}};var scroll_lock_removeScrollableTarget=function removeScrollableTarget(target){if(target){var targets=argumentAsArray(target);targets.map(function($targets){eachNode($targets,function($target){if(isElement($target)){$target.removeAttribute('data-scroll-lock-scrollable');}else{throwError("\"".concat($target,"\" is not a Element."));}});});}};var scroll_lock_addScrollableSelector=function addScrollableSelector(selector){if(selector){var selectors=argumentAsArray(selector);selectors.map(function(selector){state.scrollableSelectors.push(selector);});}};var scroll_lock_removeScrollableSelector=function removeScrollableSelector(selector){if(selector){var selectors=argumentAsArray(selector);selectors.map(function(selector){state.scrollableSelectors=state.scrollableSelectors.filter(function(sSelector){return sSelector!==selector;});});}};var scroll_lock_addLockableTarget=function addLockableTarget(target){if(target){var targets=argumentAsArray(target);targets.map(function($targets){eachNode($targets,function($target){if(isElement($target)){$target.setAttribute('data-scroll-lock-lockable','');}else{throwError("\"".concat($target,"\" is not a Element."));}});});if(!getScrollState()){scroll_lock_hideLockableOverflow();}}};var scroll_lock_addLockableSelector=function addLockableSelector(selector){if(selector){var selectors=argumentAsArray(selector);selectors.map(function(selector){state.lockableSelectors.push(selector);});if(!getScrollState()){scroll_lock_hideLockableOverflow();}scroll_lock_addFillGapSelector(selector);}};var scroll_lock_setFillGapMethod=function setFillGapMethod(method){if(method){if(FILL_GAP_AVAILABLE_METHODS.indexOf(method)!==-1){state.fillGapMethod=method;refillGaps();}else{var methods=FILL_GAP_AVAILABLE_METHODS.join(', ');throwError("\"".concat(method,"\" method is not available!\nAvailable fill gap methods: ").concat(methods,"."));}}};var scroll_lock_addFillGapTarget=function addFillGapTarget(target){if(target){var targets=argumentAsArray(target);targets.map(function($targets){eachNode($targets,function($target){if(isElement($target)){$target.setAttribute('data-scroll-lock-fill-gap','');if(!state.scroll){scroll_lock_fillGapTarget($target);}}else{throwError("\"".concat($target,"\" is not a Element."));}});});}};var scroll_lock_removeFillGapTarget=function removeFillGapTarget(target){if(target){var targets=argumentAsArray(target);targets.map(function($targets){eachNode($targets,function($target){if(isElement($target)){$target.removeAttribute('data-scroll-lock-fill-gap');if(!state.scroll){scroll_lock_unfillGapTarget($target);}}else{throwError("\"".concat($target,"\" is not a Element."));}});});}};var scroll_lock_addFillGapSelector=function addFillGapSelector(selector){if(selector){var selectors=argumentAsArray(selector);selectors.map(function(selector){if(state.fillGapSelectors.indexOf(selector)===-1){state.fillGapSelectors.push(selector);if(!state.scroll){scroll_lock_fillGapSelector(selector);}}});}};var scroll_lock_removeFillGapSelector=function removeFillGapSelector(selector){if(selector){var selectors=argumentAsArray(selector);selectors.map(function(selector){state.fillGapSelectors=state.fillGapSelectors.filter(function(fSelector){return fSelector!==selector;});if(!state.scroll){scroll_lock_unfillGapSelector(selector);}});}};var refillGaps=function refillGaps(){if(!state.scroll){fillGaps();}};var scroll_lock_hideLockableOverflow=function hideLockableOverflow(){var selector=arrayAsSelector(state.lockableSelectors);scroll_lock_hideLockableOverflowSelector(selector);};var scroll_lock_showLockableOverflow=function showLockableOverflow(){var selector=arrayAsSelector(state.lockableSelectors);scroll_lock_showLockableOverflowSelector(selector);};var scroll_lock_hideLockableOverflowSelector=function hideLockableOverflowSelector(selector){var $targets=document.querySelectorAll(selector);eachNode($targets,function($target){scroll_lock_hideLockableOverflowTarget($target);});};var scroll_lock_showLockableOverflowSelector=function showLockableOverflowSelector(selector){var $targets=document.querySelectorAll(selector);eachNode($targets,function($target){scroll_lock_showLockableOverflowTarget($target);});};var scroll_lock_hideLockableOverflowTarget=function hideLockableOverflowTarget($target){if(isElement($target)&&$target.getAttribute('data-scroll-lock-locked')!=='true'){var computedStyle=window.getComputedStyle($target);$target.setAttribute('data-scroll-lock-saved-overflow-y-property',computedStyle.overflowY);$target.setAttribute('data-scroll-lock-saved-inline-overflow-property',$target.style.overflow);$target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property',$target.style.overflowY);$target.style.overflow='hidden';$target.setAttribute('data-scroll-lock-locked','true');}};var scroll_lock_showLockableOverflowTarget=function showLockableOverflowTarget($target){if(isElement($target)&&$target.getAttribute('data-scroll-lock-locked')==='true'){$target.style.overflow=$target.getAttribute('data-scroll-lock-saved-inline-overflow-property');$target.style.overflowY=$target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');$target.removeAttribute('data-scroll-lock-saved-overflow-property');$target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');$target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');$target.removeAttribute('data-scroll-lock-locked');}};var fillGaps=function fillGaps(){state.fillGapSelectors.map(function(selector){scroll_lock_fillGapSelector(selector);});};var unfillGaps=function unfillGaps(){state.fillGapSelectors.map(function(selector){scroll_lock_unfillGapSelector(selector);});};var scroll_lock_fillGapSelector=function fillGapSelector(selector){var $targets=document.querySelectorAll(selector);var isLockable=state.lockableSelectors.indexOf(selector)!==-1;eachNode($targets,function($target){scroll_lock_fillGapTarget($target,isLockable);});};var scroll_lock_fillGapTarget=function fillGapTarget($target){var isLockable=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(isElement($target)){var scrollBarWidth;if($target.getAttribute('data-scroll-lock-lockable')===''||isLockable){scrollBarWidth=scroll_lock_getTargetScrollBarWidth($target,true);}else{var $lockableParent=findParentBySelector($target,arrayAsSelector(state.lockableSelectors));scrollBarWidth=scroll_lock_getTargetScrollBarWidth($lockableParent,true);}if($target.getAttribute('data-scroll-lock-filled-gap')==='true'){scroll_lock_unfillGapTarget($target);}var computedStyle=window.getComputedStyle($target);$target.setAttribute('data-scroll-lock-filled-gap','true');$target.setAttribute('data-scroll-lock-current-fill-gap-method',state.fillGapMethod);if(state.fillGapMethod==='margin'){var currentMargin=parseFloat(computedStyle.marginRight);$target.style.marginRight="".concat(currentMargin+scrollBarWidth,"px");}else if(state.fillGapMethod==='width'){$target.style.width="calc(100% - ".concat(scrollBarWidth,"px)");}else if(state.fillGapMethod==='max-width'){$target.style.maxWidth="calc(100% - ".concat(scrollBarWidth,"px)");}else if(state.fillGapMethod==='padding'){var currentPadding=parseFloat(computedStyle.paddingRight);$target.style.paddingRight="".concat(currentPadding+scrollBarWidth,"px");}}};var scroll_lock_unfillGapSelector=function unfillGapSelector(selector){var $targets=document.querySelectorAll(selector);eachNode($targets,function($target){scroll_lock_unfillGapTarget($target);});};var scroll_lock_unfillGapTarget=function unfillGapTarget($target){if(isElement($target)){if($target.getAttribute('data-scroll-lock-filled-gap')==='true'){var currentFillGapMethod=$target.getAttribute('data-scroll-lock-current-fill-gap-method');$target.removeAttribute('data-scroll-lock-filled-gap');$target.removeAttribute('data-scroll-lock-current-fill-gap-method');if(currentFillGapMethod==='margin'){$target.style.marginRight="";}else if(currentFillGapMethod==='width'){$target.style.width="";}else if(currentFillGapMethod==='max-width'){$target.style.maxWidth="";}else if(currentFillGapMethod==='padding'){$target.style.paddingRight="";}}}};var onResize=function onResize(e){refillGaps();};var onTouchStart=function onTouchStart(e){if(!state.scroll){state.startTouchY=e.touches[0].clientY;state.startTouchX=e.touches[0].clientX;}};var scroll_lock_onTouchMove=function onTouchMove(e){if(!state.scroll){var startTouchY=state.startTouchY,startTouchX=state.startTouchX;var currentClientY=e.touches[0].clientY;var currentClientX=e.touches[0].clientX;if(e.touches.length<2){var selector=arrayAsSelector(state.scrollableSelectors);var direction={};var directionWithOffset={};var handle=function handle($el){var skip=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if($el){var parentScrollableEl=findParentBySelector($el,selector,false);if(elementIsInputRange($el)){return false;}if(skip||elementIsScrollableField($el)&&findParentBySelector($el,selector)||elementHasSelector($el,selector)){var prevent=false;if(elementScrollLeftOnStart($el)&&elementScrollLeftOnEnd($el)){if(direction.up&&elementScrollTopOnStart($el)||direction.down&&elementScrollTopOnEnd($el)){prevent=true;}}else if(elementScrollTopOnStart($el)&&elementScrollTopOnEnd($el)){if(direction.left&&elementScrollLeftOnStart($el)||direction.right&&elementScrollLeftOnEnd($el)){prevent=true;}}else if(directionWithOffset.up&&elementScrollTopOnStart($el)||directionWithOffset.down&&elementScrollTopOnEnd($el)||directionWithOffset.left&&elementScrollLeftOnStart($el)||directionWithOffset.right&&elementScrollLeftOnEnd($el)){prevent=true;}if(prevent){if(parentScrollableEl){handle(parentScrollableEl,true);}else{if(e.cancelable){e.preventDefault();}}}}else{handle(parentScrollableEl);}}else{if(e.cancelable){e.preventDefault();}}};handle(e.target);}}};var onTouchEnd=function onTouchEnd(e){if(!state.scroll){state.startTouchY=0;state.startTouchX=0;}};if(typeof window!=='undefined'){window.addEventListener('resize',onResize);}if(typeof document!=='undefined'){document.addEventListener('touchstart',onTouchStart);document.addEventListener('touchmove',scroll_lock_onTouchMove,{passive:false});document.addEventListener('touchend',onTouchEnd);}var deprecatedMethods={hide:function hide(target){throwError('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');disablePageScroll(target);},show:function show(target){throwError('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');enablePageScroll(target);},toggle:function toggle(target){throwError('"toggle" is deprecated! Do not use it.');if(getScrollState()){disablePageScroll();}else{enablePageScroll(target);}},getState:function getState(){throwError('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');return getScrollState();},getCurrentWidth:function getCurrentWidth(){throwError('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');return getCurrentPageScrollBarWidth();},setScrollableTargets:function setScrollableTargets(target){throwError('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');scroll_lock_addScrollableTarget(target);},setFillGapSelectors:function setFillGapSelectors(selector){throwError('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');scroll_lock_addFillGapSelector(selector);},setFillGapTargets:function setFillGapTargets(target){throwError('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');scroll_lock_addFillGapTarget(target);},clearQueue:function clearQueue(){throwError('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');clearQueueScrollLocks();}};var scrollLock=_objectSpread({removeScrollableTarget:scroll_lock_removeScrollableTarget,addFillGapTarget:scroll_lock_addFillGapTarget},deprecatedMethods);/* harmony default export */var scroll_lock=__webpack_exports__["default"]=scrollLock;/***/}/******/)])["default"];});/***/}),/***/842:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 *//*jshint browser: true, unused: true, undef: true, strict: true */(function(window,factory){// universal module definition
/*jshint strict: false *//*globals define, module, require */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(704)],__WEBPACK_AMD_DEFINE_RESULT__=function(Unipointer){return factory(window,Unipointer);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,Unipointer){'use strict';// -------------------------- Unidragger -------------------------- //
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
this.pointerDownPointer=pointer;event.preventDefault();this.pointerDownBlur();// bind move and end events
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
return Unidragger;});/***/}),/***/704:(/***/(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unipointer v2.4.0
 * base class for doing one thing with pointer event
 * MIT license
 *//*jshint browser: true, undef: true, unused: true, strict: true */(function(window,factory){// universal module definition
/* jshint strict: false *//*global define, module, require */if(true){// AMD
!(__WEBPACK_AMD_DEFINE_ARRAY__=[__webpack_require__(158)],__WEBPACK_AMD_DEFINE_RESULT__=function(EvEmitter){return factory(window,EvEmitter);}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{}})(window,function factory(window,EvEmitter){'use strict';// inherit EvEmitter
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
return Unipointer;});/***/}),/***/529:(/***/function(module,exports){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else{var mod;}})(this,function(exports){'use strict';Object.defineProperty(exports,"__esModule",{});var _createClass=function(){return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var defaults={};function addClass(el,className){if(!(el instanceof HTMLElement)){throwError('Not a valid HTML element.');}el.setAttribute('class',el.className.split(' ').filter(function(cn){return cn!==className;}).concat(className).join(' '));}function removeClass(el,className){if(!(el instanceof HTMLElement)){throwError('Not a valid HTML element.');}el.setAttribute('class',el.className.split(' ').filter(function(cn){return cn!==className;}).join(' '));}function getElementContext(e){if(e&&typeof e.hash==='string'){return document.querySelector(e.hash);}else if(typeof e==='string'){return document.querySelector(e);}throwError('No selector supplied to open()');return null;}function applyUserSettings(settings){return _extends({},defaults,settings,{transitionEnd:transitionEndVendorSniff()});}function matches(e,selector){var allMatches=(e.target.document||e.target.ownerDocument).querySelectorAll(selector);for(var i=0;i<allMatches.length;i+=1){var node=e.target;while(node&&node!==document.body){if(node===allMatches[i]){return node;}node=node.parentNode;}}return null;}var VanillaModal=function(){function VanillaModal(settings){_classCallCheck(this,VanillaModal);this.isOpen=false;this.current=null;this.isListening=false;this.settings=applyUserSettings(settings);this.dom=this.getDomNodes();this.open=this.open.bind(this);this.close=this.close.bind(this);this.closeKeyHandler=this.closeKeyHandler.bind(this);this.outsideClickHandler=this.outsideClickHandler.bind(this);this.delegateOpen=this.delegateOpen.bind(this);this.delegateClose=this.delegateClose.bind(this);this.listen=this.listen.bind(this);this.destroy=this.destroy.bind(this);this.addLoadedCssClass();this.listen();}_createClass(VanillaModal,[{value:function getDomNodes(){var _settings=this.settings,modal=_settings.modal,page=_settings.page,modalInner=_settings.modalInner,modalContent=_settings.modalContent;return{modal:getNode(modal),page:getNode(page),modalInner:getNode(modalInner,getNode(modal)),modalContent:getNode(modalContent,getNode(modal))};}},{key:'addLoadedCssClass',value:function addLoadedCssClass(){addClass(this.dom.page,this.settings.loadClass);}},{},{},{value:function open(allMatches,e){var page=this.dom.page;var _settings2=this.settings,onBeforeOpen=_settings2.onBeforeOpen,onOpen=_settings2.onOpen;if(!(this.current instanceof HTMLElement===false)){throwError('VanillaModal target must exist on page.');return;}this.releaseNode(this.current);this.current=getElementContext(allMatches);if(typeof onBeforeOpen==='function'){onBeforeOpen.call(this,e);}this.captureNode(this.current);addClass(page,this.settings.class);this.setOpenId(this.current.id);this.isOpen=true;if(typeof onOpen==='function'){onOpen.call(this,e);}}},{value:function detectTransition(){var modal=this.dom.modal;var css=window.getComputedStyle(modal,null);return Boolean(['transitionDuration','oTransitionDuration','MozTransitionDuration','webkitTransitionDuration'].filter(function(i){return typeof css[i]==='string'&&parseFloat(css[i])>0;}).length);}},{key:'close',value:function close(e){var _settings3=this.settings,transitions=_settings3.transitions,transitionEnd=_settings3.transitionEnd,onBeforeClose=_settings3.onBeforeClose;var hasTransition=this.detectTransition();if(this.isOpen){this.isOpen=false;if(typeof onBeforeClose==='function'){onBeforeClose.call(this,e);}removeClass(this.dom.page,this.settings.class);if(transitions&&transitionEnd&&hasTransition){this.closeModalWithTransition(e);}else{this.closeModal(e);}}}},{key:'closeModal',value:function closeModal(e){var onClose=this.settings.onClose;this.removeOpenId(this.dom.page);this.releaseNode(this.current);this.isOpen=false;this.current=null;if(typeof onClose==='function'){onClose.call(this,e);}}},{key:'closeModalWithTransition',value:function closeModalWithTransition(e){var _this=this;var modal=this.dom.modal;var transitionEnd=this.settings.transitionEnd;var closeTransitionHandler=function closeTransitionHandler(){modal.removeEventListener(transitionEnd,closeTransitionHandler);_this.closeModal(e);};modal.addEventListener(transitionEnd,closeTransitionHandler);}},{key:'captureNode',value:function captureNode(node){var modalContent=this.dom.modalContent;while(node.childNodes.length){modalContent.appendChild(node.childNodes[0]);}}},{value:function releaseNode(node){var modalContent=this.dom.modalContent;while(modalContent.childNodes.length){node.appendChild(modalContent.childNodes[0]);}}},{},{},{},{},{},{}]);return VanillaModal;}();exports.default=VanillaModal;});/***/})/******/};/************************************************************************//******/// The module cache
/******/var __webpack_module_cache__={};/******//******/// The require function
/******//******//************************************************************************//******//* webpack/runtime/compat get default export *//******/(()=>{/******/// getDefaultExport function for compatibility with non-harmony modules
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
 */function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function unwrapExports(x){return x&&x.__esModule&&Object.prototype.hasOwnProperty.call(x,'default')?x['default']:x;}function createCommonjsModule(fn,module){return module={exports:{}},fn(module,module.exports),module.exports;}var EventHandler_1=createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){function EventHandler(){this.events=[];}EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({el:el,event:event,listener:listener});el.addEventListener(event,listener);return{el:el,event:event,listener:listener};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{el:el,event:event,listener:listener};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var EventHandler=unwrapExports(EventHandler_1);/*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  */function _classCallCheck$1(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties$1(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}/**
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
   */function Animation(options){_classCallCheck$1(this,Animation);this._el=options.el;this.cancelRunning=null;this._state=options.state||'initial';this.initialState=this._state;this.stateAttribute=options.stateAttribute||'data-animation-state';this.stateChangeAttribute=options.stateChangeAttribute||'data-animation';this.endEvent=options.endEvent||'transitionend';this.hold=!!options.hold;this.onStart=options.onStart||function(){/* do nothing */};this.activeEventHandler=null;}/**
   * Returns target element
   *
   * @return {HTMLElement} Target element
   */_createClass$1(Animation,[{},{key:"animateTo",value:function animateTo(state){var _this=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var from=this._el.dataset[this.stateAttribute]||this._state;var to=state||this.initialState;var force=options.force;var hold='hold'in options?options.hold:this.hold;return new Promise(function(resolve){if(_this.cancelRunning){_this.cancelRunning();}if(from===to){// Removing this here fixes some lingering attributes. But why?
_this._el.removeAttribute(_this.stateChangeAttribute);resolve(from,null);return;}var running=true;_this.cancelRunning=function(){running=false;resolve(null,null);};_this._el.removeEventListener(_this.endEvent,_this.activeEventHandler);_this.activeEventHandler=null;if(force){_this._el.setAttribute(_this.stateChangeAttribute,"".concat(from,"=>").concat(to));_this.onStart({});if(typeof options.onStart==='function'){options.onStart({});}_this._el.setAttribute(_this.stateAttribute,to);_this._state=to;if(!hold){_this._el.removeAttribute(_this.stateChangeAttribute);}resolve(to,null);return;}raf().then(function(){if(!running)throw new Error('cancelled');_this._el.setAttribute(_this.stateChangeAttribute,"".concat(from,"=>").concat(to));_this.onStart({el:_this._el,from:from,to:to});if(typeof options.onStart==='function'){options.onStart({});}return raf();}).then(function(){if(!running)throw new Error('cancelled');_this._el.removeEventListener(_this.endEvent,_this.activeEventHandler);_this.activeEventHandler=function(e){// Ignore any events bubbling up
if(e.target!==_this._el||!running)return;_this._el.removeEventListener(_this.endEvent,_this.activeEventHandler);if(!hold){_this._el.removeAttribute(_this.stateChangeAttribute);}resolve(to,e);};_this._el.addEventListener(_this.endEvent,_this.activeEventHandler);_this._el.setAttribute(_this.stateAttribute,to);_this._state=to;})["catch"](function(error){// Only catch 'cancelled' errors.
if(error.message!=='cancelled')throw error;});});}/**
     * Remove any event listeners
     */},{},{},{}]);return Animation;}();var justDebounce=debounce;var FAQ=/*#__PURE__*/function(){function FAQ(section){var _this=this;_classCallCheck(this,FAQ);this.el=section.el;this.events=new EventHandler();this.summaryEls=this.el.querySelectorAll('[data-faq-summary]');this.categories=this.el.querySelector('[data-faq-categories]');this.viewAll=this.el.querySelector('[data-faq-view-all]');this.animations={};this.closedState='closed';this.openState='open';this.initAnimations();this.events.register(this.viewAll,'click',function(){return _this.animateCategories();});this.summaryEls.forEach(function(summary){_this.events.register(summary,'click',function(event){return _this.animateAccordion(event);});});}_createClass(FAQ,[{value:function initAnimations(){var _this2=this;this.summaryEls.forEach(function(summary){var currentAnswerEl=summary.nextElementSibling;var currentDetailsEl=summary.closest('[data-faq-details]');var index=currentAnswerEl.dataset.faqAnswerIndex;_this2.animations[index]=transition({});currentDetailsEl.style.setProperty('--closed-height',"".concat(summary.offsetHeight,"px"));});this.categoryAnimation=transition({});}},{},{},{},{},{},{value:function openAccordion(detailsEl){if(detailsEl.classList.contains('faq__categories-list-item'))return;var answerEl=detailsEl.querySelector('[data-faq-answer]');var answerIndex=answerEl.dataset.faqAnswerIndex;detailsEl.classList.add('faq__details--open');detailsEl.setAttribute('open','');this.animations[answerIndex].animateTo(this.openState,{onStart:function onStart(_ref2){var el=_ref2.el;var _el$querySelector2=el.querySelector('[data-faq-answer-content]'),scrollHeight=_el$querySelector2.scrollHeight;el.style.setProperty('--open-height',"".concat(scrollHeight,"px"));}});}},{key:"closeAccordion",value:function closeAccordion(detailsEl){if(detailsEl.classList.contains('faq__categories-list-item'))return;var answerIndex=detailsEl.querySelector('[data-faq-answer]').dataset.faqAnswerIndex;detailsEl.classList.remove('faq__details--open');this.animations[answerIndex].animateTo(this.closedState).then(function(){detailsEl.removeAttribute('open');});}},{value:function onSectionBlockSelect(block){this.openAccordion(block.el);}},{value:function onSectionBlockDeselect(block){this.closeAccordion(block.el);}},{key:"onSectionUnload"}]);return FAQ;}();/* harmony default export */const index_es=FAQ;;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-map/dist/index.es.js
/*!
 * @pixelunion/pxs-map v3.2.0
 * (c) 2024 Pixel Union
 */function index_es_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}/*
 * Function to convert any given latitude and longitude format to decimal degrees
 *//*
 * By providing the ability to use a place name, or latitude and longitude coordinates
 * we give merchants, and our demo stores the option to bypass the Geocoding API.
 * The Geocoding API (https://developers.google.com/maps/documentation/geocoding/usage-and-billing) allows us
 * to take a place name and convert it to latitude and longitude expressed in decimal degrees.
 */function getLatitudeLongitude(address){// Degrees, Minutes and Seconds: DDD° MM' SS.S"
var latLongDegreesMinutesSeconds=/^([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2})(?:'[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:"[ ]?| )?(N|E|S|W) ?([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2})(?:'[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:"[ ]?| )?(N|E|S|W)$/g;// Degrees and Decimal Minutes: DDD° MM.MMM'
var latLongDegreesMinutes=/^([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:'[ ]?| )?(N|E|S|W) ?([0-9]{1,3})(?:°[ ]?| )([0-9]{1,2}(?:\.[0-9]+)?)(?:'[ ]?| )?(N|E|S|W)$/g;// Decimal Degrees: DDD.DDDDD°
var latLongDegrees=/^([-|+]?[0-9]{1,3}(?:\.[0-9]+)?)(?:°[ ]?| )?(N|E|S|W)?,? ?([-|+]?[0-9]{1,3}(?:\.[0-9]+)?)(?:°[ ]?| )?(N|E|S|W)?$/g;var latLongFormats=[latLongDegreesMinutesSeconds,latLongDegreesMinutes,latLongDegrees];var latLongMatches=latLongFormats.map(function(latLongFormat){return address.match(latLongFormat);});/*
   * Select the first latitude and longitude format that is matched.
   * Ordering:
   *   1. Degrees, minutes, and seconds,
   *   2. Degrees, and decimal minutes,
   *   3. Decimal degrees.
   */var latLongMatch=latLongMatches.reduce(function(accumulator,value,index){if(!accumulator&&value){var latLongResult=latLongFormats[index].exec(address);var lat=latLongResult.slice(1,latLongResult.length/2+1);var lng=latLongResult.slice(latLongResult.length/2+1,latLongResult.length);return{lat:lat,lng:lng};}return accumulator;},null);return new Promise(function(resolve,reject){// If we've got a match on latitude and longitude, use that and avoid geocoding
if(latLongMatch){var latDecimalDegrees=getDecimalDegrees.apply(void 0,_toConsumableArray(latLongMatch.lat));var longDecimalDegrees=getDecimalDegrees.apply(void 0,_toConsumableArray(latLongMatch.lng));resolve({lat:latDecimalDegrees});}else{// Otherwise, geocode the assumed address
var geocoder=new google.maps.Geocoder();geocoder.geocode({},function(results,status){if(status!==google.maps.GeocoderStatus.OK||!results[0]){reject(status);}else{resolve(results[0].geometry.location);}});}});}function getMapStyles(colors){if(!colors){return[];}return[{elementType:'geometry'},{},{stylers:[{color:colors.a}]},{elementType:'labels.text.stroke',stylers:[{color:colors.e}]},{elementType:'geometry',stylers:[{visibility:'off'}]},{featureType:'administrative.country',stylers:[{visibility:'off'}]},{featureType:'administrative.land_parcel',stylers:[{visibility:'off'}]},{featureType:'administrative.neighborhood',stylers:[{visibility:'off'}]},{featureType:'administrative.locality',stylers:[{visibility:'off'}]},{featureType:'poi',stylers:[{visibility:'off'}]},{featureType:'road',elementType:'geometry.fill'},{},{},{featureType:'road.highway',elementType:'geometry',stylers:[{color:colors.b}]},{featureType:'road.highway.controlled_access',stylers:[{visibility:'off'}]},{stylers:[{color:colors.b}]},{stylers:[{color:colors.e}]},{featureType:'transit'},{stylers:[{color:colors.f}]}];}function createMap(options){var container=options.container,address=options.address,zoom=options.zoom,colors=options.colors;return getLatitudeLongitude(address).then(function(latLong){var map=new google.maps.Map(container,{disableDefaultUI:true,disableDoubleClickZoom:true,styles:getMapStyles(colors),zoom:zoom});new google.maps.Marker({});map.panBy(0,0);})["catch"](function(status){var usageLimits='https://developers.google.com/maps/faq#usagelimits';var errorMessage;switch(status){case'ZERO_RESULTS':errorMessage="<p>Unable to find the address:</p> ".concat(address);break;case'OVER_QUERY_LIMIT':errorMessage="\n            <p>Unable to load Google Maps, you have reached your usage limit.</p>\n            <p>\n              Please visit\n              <a href=\"".concat(usageLimits,"\" target=\"_blank\">").concat(usageLimits,"</a>\n              for more details.\n            </p>\n          ");break;default:errorMessage='Unable to load Google Maps.';break;}throw errorMessage;});}function displayErrorInThemeEditor(container,errorMessage){var isThemeEditor=window.Shopify&&window.Shopify.designMode;if(!isThemeEditor){return;}container.innerHTML="<div class=\"map-error-message\">".concat(errorMessage,"</div>");}var PxsMap=function PxsMap(section){var _this=this;index_es_classCallCheck(this,PxsMap);this.map=null;var el=section.el.querySelector('[data-map]');var container=el.querySelector('[data-map-container]');var settings=section.data;var address=settings.address,colors=settings.colors;var apiKey=settings.api_key;// Scale so range is 12 ~ 17, rather than 1 to 6
var zoom=Number.isNaN(settings.zoom)?13:11+parseInt(settings.zoom,10);if(apiKey){if(window.googleMaps===undefined){script_default()("https://maps.googleapis.com/maps/api/js?key=".concat(apiKey),function(){window.googleMaps=true;createMap({container:container,colors:colors}).then(function(map){_this.map=map;})["catch"](function(error){return displayErrorInThemeEditor(container,error);});});}else{createMap({zoom:zoom,colors:colors}).then(function(map){_this.map=map;})["catch"](function(error){return displayErrorInThemeEditor(container,error);});}}};/* harmony default export */const dist_index_es=PxsMap;;// CONCATENATED MODULE: ./node_modules/@pixelunion/age-gate/dist/index.es.js
/*!
 * @pixelunion/age-gate v1.1.2
 * (c) 2025 Pixel Union
 */function dist_index_es_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function index_es_defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function index_es_createClass(Constructor,protoProps,staticProps){if(protoProps)index_es_defineProperties(Constructor.prototype,protoProps);if(staticProps)index_es_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{});return Constructor;}var scrollLock=__webpack_require__(265);var isbot=__webpack_require__(458);function getAge(birthdate){var today=new Date();var age=today.getFullYear()-birthdate.getFullYear();var m=today.getMonth()-birthdate.getMonth();if(m<0||m===0&&today.getDate()<birthdate.getDate()){age--;}return age;}var SiteAgeGate=/*#__PURE__*/function(){function SiteAgeGate(el){dist_index_es_classCallCheck(this,SiteAgeGate);this._el=el;this._ageGateForm=el.querySelector('[data-age-gate]');this._ageGateErrorEl=this._ageGateForm.querySelector('[data-age-gate-error]');this._requiredAge=this._ageGateForm.dataset.requiredAge;this._el.addEventListener('age-gate:open',this._open.bind(this));this._el.addEventListener('age-gate:close',this._close.bind(this));this._ageGateForm.addEventListener('submit',this._onFormSubmit.bind(this));if(isbot(navigator.userAgent)){this._close();}else if(this._el.style.display===''){this._open();}}index_es_createClass(SiteAgeGate,[{value:function _open(){scrollLock.disablePageScroll();this._el.style.display='';}},{value:function _close(){scrollLock.enablePageScroll();this._el.style.display='none';}},{value:function _onFormSubmit(event){event.preventDefault();event.stopPropagation();var data=new FormData(event.target);var day=data.get('day');var month=data.get('month');var year=data.get('year');if(day===''||month===''||year==='')return;var age=getAge(new Date(year,month,day));if(age>=this._requiredAge){this._close();sessionStorage.setItem('age-gate',age);}else{this._ageGateErrorEl.style.display='';}}}]);return SiteAgeGate;}();var PageAgeGate=/*#__PURE__*/function(){index_es_createClass(PageAgeGate,[{key:"onSectionLoad",value:function onSectionLoad(){var openEvent=new CustomEvent('age-gate:open');if(this._ageGateEl){this._ageGateEl.dispatchEvent(openEvent);}}},{value:function onSectionSelect(){var openEvent=new CustomEvent('age-gate:open');if(this._ageGateEl){this._ageGateEl.dispatchEvent(openEvent);}}},{}]);return PageAgeGate;}();;// CONCATENATED MODULE: ./node_modules/@pixelunion/rimg-shopify/dist/index.es.js
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
 */function parseSize(value){value=value.split('x');return{height:parseInt(value[1],10)};}/**
 * Sanitize crop values to ensure they are valid, or null
 *
 * @param {String} value
 * @returns {Object} Shopify crop parameter ('top', 'center', 'bottom', 'left', 'right') or null, if an unsupported value is found
 */function processCropValue(value){switch(value){case'top':case'center':case'bottom':case'left':case'right':return value;default:return null;}}/**
 * Loads information about an element.
 *
 * Options can be set on the element itself using data attributes, or through
 * the `options` parameter. Data attributes take priority.
 *
 * @param {HTMLElement} el
 * @param {Settings} options
 * @returns {Item}
 */function parseItem(el){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var isImage=el.hasAttribute('data-rimg-template');/**
   * @typedef {Settings} Item
   */return{// Type of element
// Image scale
// Device density
// Image template URL
template:getData(el,'template',options),templateRender:options.templateRender||defaults.templateRender// Maximum image dimensions
// Round image dimensions to the nearest multiple
// Placeholder image dimensions
// Crop value; null if image is uncropped, otherwise equal to the Shopify crop parameter ('center', 'top', etc.)
};}/**
 * Round to the nearest multiple.
 *
 * This is so we don't tax the image server too much.
 *
 * @param {Number} size The size, in pixels.
 * @param {Number} [multiple] The multiple to round to the nearest.
 * @param {Number} [maxLimit] Maximum allowed value - value to return if rounded multiple is above this limit
 * @returns {Number}
 */function roundSize(size){var multiple=arguments.length>1&&arguments[1]!==undefined?arguments[1]:32;var maxLimit=arguments.length>2&&arguments[2]!==undefined?arguments[2]:Infinity;return size===0?multiple:Math.min(Math.ceil(size/multiple)*multiple,maxLimit);}/**
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
 */function getElementSize(el){var size={};while(el){size.width=el.offsetWidth;size.height=el.offsetHeight;if(size.width>20&&size.height>20)break;el=el.parentNode;}return size;}/**
 * Return the maximum supported density of the image, given the container.
 *
 * @param {Item} item
 * @param {Size} size
 */function supportedDensity(item,size){return Math.min(Math.min(Math.max(item.max.width/size.width,1),item.density),Math.min(Math.max(item.max.height/size.height,1),item.density)).toFixed(2);}/**
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
 */function setImage(item,size,isPlaceholder,onLoad){var render=item.templateRender;var density=isPlaceholder?1:supportedDensity(item,size);var round=isPlaceholder?1:item.round;// Calculate the final display size, taking into account the image's
// maximum dimensions.
var targetWidth=size.width*density;var targetHeight=size.height*density;var displaySize;if(item.crop){displaySize={width:roundSize(targetWidth,round,item.max.width)};}else{// Shopify serves images clamped by the requested dimensions (fitted to the smallest dimension).
// To get the desired and expected pixel density we need to request cover dimensions (fitted to largest dimension).
// This isn't a problem with cropped images which are served at the exact dimension requested.
var containerAspectRatio=size.width/size.height;var imageAspectRatio=item.max.width/item.max.height;if(containerAspectRatio>imageAspectRatio){// fit width
displaySize={};}else{// fit height
displaySize={};}}var url=render(item.template,displaySize);// On load callback
var image=new Image();image.onload=onLoad;image.src=url;// Set image
if(item.isBackgroundImage){item.el.style.backgroundImage="url('".concat(url,"')");}else{item.el.setAttribute('srcset',"".concat(url," ").concat(density,"x"));}}/**
 * Load the image, set loaded status, and trigger the load event.
 *
 * @fires rimg:load
 * @fires rimg:error
 * @param {Item} item
 * @param {Size} size
 */function loadFullImage(item,size){var el=item.el;setImage(item,size,false,function(event){if(event.type==='load'){el.setAttribute('data-rimg','loaded');}else{el.setAttribute('data-rimg','error');trigger(el,'rimg:error');}trigger(el,'rimg:load');});}/**
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
 */function loadImage(item){var el=item.el;// Already loaded?
var status=el.getAttribute('data-rimg');if(status==='loading'||status==='loaded')return;// Is the SVG loaded?
// In Firefox, el.complete always returns true [citation needed, may not be the case anymore, Jan/2022]
// so we also check el.naturalWidth, which equals 0 until the image loads
if(!item.isBackgroundImage){if(el.naturalWidth===0||!el.complete){// Wait for the load event, then call load image
el.addEventListener('load',function cb(){el.removeEventListener('load',cb);loadImage(item);});return;}}// Trigger loading event, and stop if cancelled
if(trigger(el,'rimg:loading'))return;// Mark as loading
el.setAttribute('data-rimg','loading');// Get element size. This is used as the ideal display size.
var size=getElementSize(item.el);size.width*=item.scale;size.height*=item.scale;if(item.placeholder){// Load a placeholder image first, followed by the full image. Force the
// element to keep its dimensions while it loads. If the image is smaller
// than the element size, use the image's size. Density is taken into account
// for HiDPI devices to avoid blurry images.
if(!item.isBackgroundImage){el.setAttribute('width',Math.min(Math.floor(item.max.width/item.density),size.width));el.setAttribute('height',Math.min(Math.floor(item.max.height/item.density),size.height));}setImage(item,item.placeholder,true,function(){return loadFullImage(item,size);});}else{loadFullImage(item,size);}}/**
 * Prepare an element to be displayed on the screen.
 *
 * Images have special logic applied to them to swap out the different sources.
 *
 * @fires rimg:enter
 *        The element is entering the viewport.
 *
 * @param {HTMLElement} el
 * @param {Settings} options
 */function load(el,options){if(!el)return;trigger(el,'rimg:enter');var item=parseItem(el,options);if(item.isImage){if(!item.isBackgroundImage){el.setAttribute('data-rimg-template-svg',el.getAttribute('srcset'));}loadImage(item);}}/**
 * Reset an element's state so that its image can be recalculated.
 *
 * @fires rimg:update
 *        The element is being updated.
 *
 * @param {HTMLElement} el
 * @param {Settings} options
 */function update(el,options){if(!el)return;trigger(el,'rimg:update');var item=parseItem(el,options);if(item.isImage){if(!item.isBackgroundImage){el.setAttribute('data-rimg','lazy');el.setAttribute('srcset',el.getAttribute('data-rimg-template-svg'));}loadImage(item);}}/**
 * Returns true if the element is within the viewport.
 * @param {HTMLElement} el
 * @returns {Boolean}
 */function inViewport(el){if(!el.offsetWidth||!el.offsetHeight||!el.getClientRects().length){return false;}var root=document.documentElement;var width=Math.min(root.clientWidth,window.innerWidth);var height=Math.min(root.clientHeight,window.innerHeight);var rect=el.getBoundingClientRect();return rect.bottom>=0&&rect.right>=0&&rect.top<=height&&rect.left<=width;}/**
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
 */function rimg(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'[data-rimg="lazy"]';var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};// Intersections
var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting||entry.intersectionRatio>0){io.unobserve(entry.target);load(entry.target,options);}});},{});/**
   * @typedef {Object} PublicApi
   */var api={/**
     * Track a new selector, element, or nodelist for lazy-loading.
     * @type Function
     * @param {String|HTMLElement|NodeList} selector
     */track:function track(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'[data-rimg="lazy"]';var els=querySelector(selector);for(var i=0;i<els.length;i++){// If an element is already in the viewport, load it right away. This
// fixes a race-condition with dynamically added elements.
if(inViewport(els[i])){load(els[i],options);}else{io.observe(els[i]);}}},/**
     * Update element(s) that have already been loaded to force their images
     * to be recalculated.
     * @type Function
     * @param {String|HTMLElement|NodeList} selector
     */update:function update$1(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'[data-rimg="loaded"]';var els=querySelector(selector);for(var i=0;i<els.length;i++){update(els[i],options);}},/**
     * Stop tracking element(s) for lazy-loading.
     * @type Function
     * @param {String|HTMLElement|NodeList} selector
     */untrack:function untrack(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'[data-rimg]';var els=querySelector(selector);for(var i=0;i<els.length;i++){io.unobserve(els[i]);}},/**
     * Manually load images.
     * @type Function
     * @param {String|HTMLElement|NodeList} selector
     */load:function load$1(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'[data-rimg]';var els=querySelector(selector);for(var i=0;i<els.length;i++){load(els[i],options);}},/**
     * Unload all event handlers and observers.
     * @type Function
     */unload:function unload(){io.disconnect();}};// Add initial elements
api.track(selector);return api;}/**
 * Finds a group of elements on the page.
 *
 * @param {String|HTMLElement|NodeList} selector
 * @returns {Object} An array-like object.
 */function querySelector(selector){if(typeof selector==='string'){return document.querySelectorAll(selector);}if(selector instanceof HTMLElement){return[selector];}if(selector instanceof NodeList){return selector;}return[];}/**
 * Polyfill for Element.matches().
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 */if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;while(--i>=0&&matches.item(i)!==this){}return i>-1;};}var state={};function init(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'[data-rimg="lazy"]';var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};state.selector=selector;state.instance=rimg(selector,options);state.loadedWidth=Math.max(document.documentElement.clientWidth,window.innerWidth||0);// Listen for Shopify theme editor events
document.addEventListener('shopify:section:load',function(event){return watch(event.target);});window.addEventListener('resize',function(){return _update();});document.addEventListener('shopify:section:unload',function(event){return unwatch(event.target);});// Listen for custom events to allow themes to hook into rimg
document.addEventListener('theme:rimg:watch',function(event){return watch(event.target);});document.addEventListener('theme:rimg:unwatch',function(event){return unwatch(event.target);});// Support custom events triggered through jQuery
// See: https://github.com/jquery/jquery/issues/3347
if(window.jQuery){jQuery(document).on({});}}/**
 * Track an element, and its children.
 *
 * @param {HTMLElement} el
 */function watch(el){// Track element
if(typeof el.matches==='function'&&el.matches(state.selector)){state.instance.track(el);}// Track element's children
state.instance.track(el.querySelectorAll(state.selector));}/**
 * Untrack an element, and its children
 *
 * @param {HTMLElement} el
 * @private
 */function unwatch(el){// Untrack element's children
state.instance.untrack(el.querySelectorAll(state.selector));// Untrack element
if(typeof el.matches==='function'&&el.matches(state.selector)){state.instance.untrack(el);}}/**
 * Manually load an image
 *
 * @param {HTMLElement} el
 */function load$1(el){// Load element
if(typeof el.matches==='function'&&el.matches(state.selector)){state.instance.load(el);}// Load element's children
state.instance.load(el.querySelectorAll(state.selector));}/**
 * Update an element, and its children.
 *
 * @param {HTMLElement} el
 */function _update(){var currentWidth=Math.max(document.documentElement.clientWidth,window.innerWidth||0);// Return if we're not 2x smaller, or larger than the existing loading size
if(currentWidth/state.loadedWidth>0.5&&currentWidth/state.loadedWidth<2){return;}state.loadedWidth=currentWidth;state.instance.update();}/* harmony default export */const rimg_shopify_dist_index_es=state;;// CONCATENATED MODULE: ./source/scripts/Sections.js
/* eslint-disable max-classes-per-file *//**
 * Allows a callback to be run once, when a target intersects the viewport.
 * @constructor
 * @param {Object} [options] options with which to construct the IntersectionObserver
 * @param {string} [options.rootMargin='30%'] A string which specifies a set of offsets to add to
 *                                          the root's bounding_box when calculating intersections.
 * @param {number} [options.threshold=0] Ratio of intersection required to trigger callback
 */class LazyLoader{constructor(options){const defaultOptions={};this.callbacks=new WeakMap();this._observerCallback=this._observerCallback.bind(this);this.observer=new IntersectionObserver(this._observerCallback,{...defaultOptions,...options});}/**
   * Add target and callback. Callback is only run once.
   * @add
   * @param {HTMLElement} target Target element
   * @param {function} callback Callback to run when target begins intersecting
   */add(target,callback){this.callbacks.set(target,callback);this.observer.observe(target);}/**
   * Remove target. Associated callback is also removed.
   * @remove
   * @param {HTMLElement} target Target element
   */remove(target){this.observer.unobserve(target);this.callbacks.delete(target);}/**
   * Disconnects IntersectionObserver if active
   * @unload
   */unload(){this.observer.disconnect();}/**
   * Runs associated callbacks for each entry, then removes that entry and callback
   * @_observerCallback
   * @param {IntersectionObserverEntry[]} entries Entries to check
   * @param {InterserctionObserver} observer IntersectionObserver instance
   */_observerCallback(entries,observer){entries.forEach(({isIntersecting,target})=>{// do nothing unless target moved into state of intersection
if(isIntersecting===true){// make sure we stop observing before running the callback, so we don't
// somehow run the callback twice if element intersects twice quickly
observer.unobserve(target);const callback=this.callbacks.get(target);if(typeof callback==='function'){callback();}this.callbacks.delete(target);}});}}class Sections{constructor(){this.handlers={};this.instances={};this.options={};this.imports={};this.lazyLoader=null;this._onSectionEvent=this._onSectionEvent.bind(this);document.addEventListener('shopify:section:load',this._onSectionEvent);document.addEventListener('shopify:section:unload',this._onSectionEvent);document.addEventListener('shopify:section:select',this._onSectionEvent);document.addEventListener('shopify:section:deselect',this._onSectionEvent);document.addEventListener('shopify:block:select',this._onSectionEvent);document.addEventListener('shopify:block:deselect',this._onSectionEvent);}/**
   * Stop listening for section events, and unbind all handlers.
   */unbind(){document.removeEventListener('shopify:section:load',this._onSectionEvent);document.removeEventListener('shopify:section:unload',this._onSectionEvent);document.removeEventListener('shopify:section:select',this._onSectionEvent);document.removeEventListener('shopify:section:deselect',this._onSectionEvent);document.removeEventListener('shopify:block:select',this._onSectionEvent);document.removeEventListener('shopify:block:deselect',this._onSectionEvent);// Unload all instances
for(let i=0;i<this.instances.length;i++){this._triggerInstanceEvent(this.instances[i],'onSectionUnload');}this.handlers={};this.options={};this.lazyLoader.unload();this.lazyLoader=null;this.instances={};}/**
   * Register a section handler.
   *
   * @param {string} type
   *        The section type to handle. The handler will be called for all
   *        sections with this type.
   *
   * @param {function} handler
   *        The handler function is passed information about a specific section
   *        instance. The handler is expected to return an object that will be
   *        associated with the section instance.
   *
   *        Section handlers are passed an object with the following parameters:
   *          {string} id
   *          An ID that maps to a specific section instance. Typically the
   *          section's filename for static sections, or a generated ID for
   *          dynamic sections.
   *
   *          {string} type
   *          The section type, as supplied when registered.
   *
   *          {Element} el
   *          The root DOM element for the section instance.
   *
   *          {Object} data
   *          Data loaded from the section script element. Defaults to an
   *          empty object.
   *
   *          {Function} postMessage
   *          A function that can be called to pass messages between sections.
   *          The function should be called with a message "name", and
   *          optionally some data.
   *
   * @param {object} options
   *
   * @param {boolean} options.lazy
   *     If true, sections will only be initialized after they intersect the viewport + 30% margin
   */register(type,handler,options={}){if(this.handlers[type]){console.warn(`Sections: section handler already exists of type '${type}'.`);}// Store the section handler
this.handlers[type]=handler;// Store options
this.options[type]=options;// Init sections for this type
this._initSections(type);}/**
   * Initialize sections already on the page.
   */_initSections(type){// Fetch all existing sections of our type on the page
const dataEls=document.querySelectorAll(`[data-section-type="${type}"]`);if(!dataEls)return;// Create an instance for each section
for(let i=0;i<dataEls.length;i++){const dataEl=dataEls[i];const el=dataEl.parentNode;// Get instance ID
const idEl=el.querySelector('[data-section-id]');if(!idEl){console.warn(`Sections: unable to find section id for '${type}'.`,el);continue;// eslint-disable-line no-continue
}const sectionId=idEl.getAttribute('data-section-id');if(!sectionId){console.warn(`Sections: unable to find section id for '${type}'.`,el);continue;// eslint-disable-line no-continue
}if(this.options[type]&&this.options[type].lazy){if(this.lazyLoader===null){this.lazyLoader=new LazyLoader();}this.lazyLoader.add(el,()=>this._createInstance(sectionId,el));}else{this._createInstance(sectionId,el);}}}_onSectionEvent(event){const el=event.target;const{}=event.detail;let instance=this.instances[sectionId];switch(event.type){case'shopify:section:load':instance=this._createInstance(sectionId,el);this._triggerInstanceEvent(instance,'onSectionLoad',{});break;case'shopify:section:unload':this._triggerInstanceEvent(instance,'onSectionUnload',{});if(this.lazyLoader){this.lazyLoader.remove(el);}delete this.instances[sectionId];break;case'shopify:section:select':this._triggerInstanceEvent(instance,'onSectionSelect',{});break;case'shopify:section:deselect':this._triggerInstanceEvent(instance,'onSectionDeselect',{});break;case'shopify:block:select':this._triggerInstanceEvent(instance,'onSectionBlockSelect',{});break;case'shopify:block:deselect':this._triggerInstanceEvent(instance,'onSectionBlockDeselect',{});break;default:break;}}_triggerInstanceEvent(instance,eventName,...args){if(instance&&instance[eventName]){instance[eventName](...args);}}_postMessage(name,data){Object.keys(this.instances).forEach(id=>{this._triggerInstanceEvent(this.instances[id],'onSectionMessage',name,data);});}_createInstance(id,el){const typeEl=el.querySelector('[data-section-type]');if(!typeEl)return;const type=typeEl.getAttribute('data-section-type');if(!type)return;const handler=this.handlers[type];if(!handler){console.warn(`Sections: unable to find section handler for type '${type}'.`);return;}const data=this._loadData(el);const postMessage=this._postMessage.bind(this);const handlerParams={el,data,postMessage};if(!this.imports[type]){// Try to create the instance
const handlerReturn=handler(handlerParams);if(handlerReturn instanceof Promise){// Handler is a dynamic import so we need to resolve the import before
// creating the instance
handlerReturn.then(({})=>{this.imports[type]=()=>new Component(handlerParams);this.instances[id]=new Component(handlerParams);});}else{// Handler returned an instance class - we can create directly.
this.imports[type]=handler;this.instances[id]=handlerReturn;}}else{this.instances[id]=this.imports[type](handlerParams);}return this.instances[id];}_loadData(el){const dataEl=el.querySelector('[data-section-data]');if(!dataEl)return{};// Load data from attribute, or innerHTML
const data=dataEl.getAttribute('data-section-data')||dataEl.innerHTML;try{return JSON.parse(data);}catch(error){console.warn(`Sections: invalid section data found. ${error.message}`);return{};}}};// CONCATENATED MODULE: ./source/scripts/checkPolyfills.js
const polyfillUrls=[];// Checks if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if(!('IntersectionObserver'in window&&'IntersectionObserverEntry'in window&&'intersectionRatio'in window.IntersectionObserverEntry.prototype)){polyfillUrls.push(document.querySelector('[data-scripts]').dataset.pxuPolyfills);}// Polyfill NodeList.forEach if required.
// Polyfill is so small it doesn't need to load any external code.
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=Array.prototype.forEach;}if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;do{if(Element.prototype.matches.call(el,s))return el;el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}/* harmony default export */const checkPolyfills=polyfillUrls;;// CONCATENATED MODULE: ./source/scripts/sections/StaticAnnouncement.js
class StaticAnnouncement{constructor(section){// Since the announcement bar positioning is actually handled by the
// StaticSectionHeader and StickyHeader classes, we need to let them know
// when the announcement element is refreshed within the editor.
if(window.Shopify&&window.Shopify.designMode){section.postMessage('announcement:load');}}}// EXTERNAL MODULE: ./node_modules/fitvids/index.js
var fitvids=__webpack_require__(729);var fitvids_default=/*#__PURE__*/__webpack_require__.n(fitvids);// EXTERNAL MODULE: ./node_modules/@pixelunion/grouped-content/dist/index.js
var dist=__webpack_require__(263);var dist_default=/*#__PURE__*/__webpack_require__.n(dist);;// CONCATENATED MODULE: ./source/scripts/components/RichText.js
class RichText{constructor($el){this.$el=$($el);this._initExternalLinks();this.groupedContent=null;if(this.$el.length){this.groupedContent=new(dist_default())(this.$el.get(0),{intelliparse:false});fitvids_default()('.rte');}}unload(){if(this.groupedContent){this.groupedContent.unload();}}/**
   * Open links within an RTE field in a new window if they point to external domains
   *
   * @private
   */_initExternalLinks(){const anchors=this.$el.find('a[href^="http"]').filter((i,el)=>el.href.indexOf(location.hostname)===-1);anchors.attr('target','_blank');}};// CONCATENATED MODULE: ./source/scripts/Forms.js
class Forms{constructor(el,selector='.form-field-input'){this.$el=jquery_default()(el);this.filledClass='form-field-filled';this.fieldSelector=selector;this._toggleFilled=this._toggleFilled.bind(this);this.$el.on('focus.forms',this.fieldSelector,this._toggleFilled);this.$el.on('blur.forms',this.fieldSelector,this._toggleFilled);this._checkFilled();}unload(){this.$el.off('.forms');}_checkFilled(){this.$el.find(this.fieldSelector).each((i,el)=>{if(jquery_default()(el).hasClass(this.filledClass))return;this._toggleFilled(null,el);});}_toggleFilled(event=null,el=false){const target=event?event.currentTarget:el;const $target=jquery_default()(target);const{}=target;let isFilled=value.length>0;try{isFilled=isFilled||$target.is(':-webkit-autofill');$target.toggleClass(this.filledClass,isFilled);}catch(e){$target.toggleClass(this.filledClass,isFilled);}}};// CONCATENATED MODULE: ./source/scripts/sections/StaticArticle.js
class StaticArticle{constructor(section){this.$el=jquery_default()(section.el);this.$commentForm=this.$el.find('[data-articlecomments-form]');this.richText=new RichText(this.$el);if(this.$commentForm.length){this.commentForm=new Forms(this.$commentForm);}}onSectionUnload(){this.richText.unload();if(this.commentForm){this.commentForm.unload();}}};// CONCATENATED MODULE: ./source/scripts/sections/StaticBlog.js
class StaticBlog{constructor(section){this.$el=jquery_default()(section.el);this.richText=new RichText(this.$el);}onSectionUnload(){this.richText.unload();}}// EXTERNAL MODULE: ./node_modules/just-debounce/index.js
var just_debounce=__webpack_require__(405);var just_debounce_default=/*#__PURE__*/__webpack_require__.n(just_debounce);;// CONCATENATED MODULE: ./node_modules/morphdom/dist/morphdom-esm.js
var DOCUMENT_FRAGMENT_NODE=11;function morphAttrs(fromNode,toNode){var toNodeAttrs=toNode.attributes;var attr;var attrName;var attrNamespaceURI;var attrValue;var fromValue;// document-fragments dont have attributes so lets not do anything
if(toNode.nodeType===DOCUMENT_FRAGMENT_NODE||fromNode.nodeType===DOCUMENT_FRAGMENT_NODE){return;}// update attributes on original DOM element
for(var i=toNodeAttrs.length-1;i>=0;i--){attr=toNodeAttrs[i];attrName=attr.name;attrNamespaceURI=attr.namespaceURI;attrValue=attr.value;if(attrNamespaceURI){attrName=attr.localName||attrName;fromValue=fromNode.getAttributeNS(attrNamespaceURI,attrName);if(fromValue!==attrValue){if(attr.prefix==='xmlns'){attrName=attr.name;// It's not allowed to set an attribute with the XMLNS namespace without specifying the `xmlns` prefix
}fromNode.setAttributeNS(attrNamespaceURI,attrName,attrValue);}}else{fromValue=fromNode.getAttribute(attrName);if(fromValue!==attrValue){fromNode.setAttribute(attrName,attrValue);}}}// Remove any extra attributes found on the original DOM element that
// weren't found on the target element.
var fromNodeAttrs=fromNode.attributes;for(var d=fromNodeAttrs.length-1;d>=0;d--){attr=fromNodeAttrs[d];attrName=attr.name;attrNamespaceURI=attr.namespaceURI;if(attrNamespaceURI){attrName=attr.localName||attrName;if(!toNode.hasAttributeNS(attrNamespaceURI,attrName)){fromNode.removeAttributeNS(attrNamespaceURI,attrName);}}else{if(!toNode.hasAttribute(attrName)){fromNode.removeAttribute(attrName);}}}}var range;// Create a range object for efficently rendering strings to elements.
var NS_XHTML='http://www.w3.org/1999/xhtml';var doc=typeof document==='undefined'?undefined:document;var HAS_TEMPLATE_SUPPORT=!!doc&&'content'in doc.createElement('template');var HAS_RANGE_SUPPORT=!!doc&&doc.createRange&&'createContextualFragment'in doc.createRange();function createFragmentFromRange(str){if(!range){range=doc.createRange();range.selectNode(doc.body);}var fragment=range.createContextualFragment(str);return fragment.childNodes[0];}/**
 * This is about the same
 * var html = new DOMParser().parseFromString(str, 'text/html');
 * return html.body.firstChild;
 *
 * @method toElement
 * @param {String} str
 */function toElement(str){str=str.trim();if(HAS_TEMPLATE_SUPPORT){// avoid restrictions on content for things like `<tr><th>Hi</th></tr>` which
// createContextualFragment doesn't support
// <template> support not available in IE
return createFragmentFromTemplate(str);}else if(HAS_RANGE_SUPPORT){return createFragmentFromRange(str);}return createFragmentFromWrap(str);}/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */function compareNodeNames(fromEl,toEl){var fromNodeName=fromEl.nodeName;var toNodeName=toEl.nodeName;var fromCodeStart,toCodeStart;if(fromNodeName===toNodeName){return true;}fromCodeStart=fromNodeName.charCodeAt(0);toCodeStart=toNodeName.charCodeAt(0);// If the target element is a virtual DOM node or SVG node then we may
// need to normalize the tag name before comparing. Normal HTML elements that are
// in the "http://www.w3.org/1999/xhtml"
// are converted to upper case
if(fromCodeStart<=90&&toCodeStart>=97){// from is upper and to is lower
return fromNodeName===toNodeName.toUpperCase();}else if(toCodeStart<=90&&fromCodeStart>=97){// to is upper and from is lower
return toNodeName===fromNodeName.toUpperCase();}else{return false;}}/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 *//**
 * Copies the children of one DOM element to another DOM element
 */function moveChildren(fromEl,toEl){var curChild=fromEl.firstChild;while(curChild){var nextChild=curChild.nextSibling;toEl.appendChild(curChild);curChild=nextChild;}return toEl;}function syncBooleanAttrProp(fromEl,toEl,name){if(fromEl[name]!==toEl[name]){fromEl[name]=toEl[name];if(fromEl[name]){fromEl.setAttribute(name,'');}else{fromEl.removeAttribute(name);}}}var specialElHandlers={OPTION:function(fromEl,toEl){var parentNode=fromEl.parentNode;if(parentNode){var parentName=parentNode.nodeName.toUpperCase();if(parentName==='OPTGROUP'){parentNode=parentNode.parentNode;parentName=parentNode&&parentNode.nodeName.toUpperCase();}if(parentName==='SELECT'&&!parentNode.hasAttribute('multiple')){if(fromEl.hasAttribute('selected')&&!toEl.selected){// Workaround for MS Edge bug where the 'selected' attribute can only be
// removed if set to a non-empty value:
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12087679/
fromEl.setAttribute('selected','selected');fromEl.removeAttribute('selected');}// We have to reset select element's selectedIndex to -1, otherwise setting
// fromEl.selected using the syncBooleanAttrProp below has no effect.
// The correct selectedIndex will be set in the SELECT special handler below.
parentNode.selectedIndex=-1;}}syncBooleanAttrProp(fromEl,toEl,'selected');}/**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */,TEXTAREA:function(fromEl,toEl){var newValue=toEl.value;if(fromEl.value!==newValue){fromEl.value=newValue;}var firstChild=fromEl.firstChild;if(firstChild){// Needed for IE. Apparently IE sets the placeholder as the
// node value and vise versa. This ignores an empty update.
var oldValue=firstChild.nodeValue;if(oldValue==newValue||!newValue&&oldValue==fromEl.placeholder){return;}firstChild.nodeValue=newValue;}}};var ELEMENT_NODE=1;var DOCUMENT_FRAGMENT_NODE$1=11;var TEXT_NODE=3;var COMMENT_NODE=8;function morphdomFactory(morphAttrs){return function morphdom(fromNode,toNode,options){if(!options){options={};}if(typeof toNode==='string'){if(fromNode.nodeName==='#document'||fromNode.nodeName==='HTML'||fromNode.nodeName==='BODY'){var toNodeHtml=toNode;toNode=doc.createElement('html');toNode.innerHTML=toNodeHtml;}else{toNode=toElement(toNode);}}else if(toNode.nodeType===DOCUMENT_FRAGMENT_NODE$1){toNode=toNode.firstElementChild;}var getNodeKey=options.getNodeKey||defaultGetNodeKey;var onBeforeNodeAdded=options.onBeforeNodeAdded||noop;var onNodeAdded=options.onNodeAdded||noop;var onBeforeElUpdated=options.onBeforeElUpdated||noop;var onElUpdated=options.onElUpdated||noop;var onBeforeNodeDiscarded=options.onBeforeNodeDiscarded||noop;var onNodeDiscarded=options.onNodeDiscarded||noop;var onBeforeElChildrenUpdated=options.onBeforeElChildrenUpdated||noop;var skipFromChildren=options.skipFromChildren||noop;var addChild=options.addChild||function(parent,child){return parent.appendChild(child);};var childrenOnly=options.childrenOnly===true;// This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
var fromNodesLookup=Object.create(null);var keyedRemovalList=[];function walkDiscardedChildNodes(node,skipKeyedNodes){if(node.nodeType===ELEMENT_NODE){var curChild=node.firstChild;while(curChild){var key=undefined;if(skipKeyedNodes&&(key=getNodeKey(curChild))){// If we are skipping keyed nodes then we add the key
// to a list so that it can be handled at the very end.
addKeyedRemoval(key);}else{// Only report the node as discarded if it is not keyed. We do this because
// at the end we loop through all keyed elements that were unmatched
// and then discard them in one final pass.
onNodeDiscarded(curChild);if(curChild.firstChild){walkDiscardedChildNodes(curChild,skipKeyedNodes);}}curChild=curChild.nextSibling;}}}/**
    * Removes a DOM node out of the original DOM
    *
    * @param  {Node} node The node to remove
    * @param  {Node} parentNode The nodes parent
    * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
    * @return {undefined}
    */// // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
// function indexTree(root) {
//     var treeWalker = document.createTreeWalker(
//         root,
//         NodeFilter.SHOW_ELEMENT);
//
//     var el;
//     while((el = treeWalker.nextNode())) {
//         var key = getNodeKey(el);
//         if (key) {
//             fromNodesLookup[key] = el;
//         }
//     }
// }
// // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
//
// function indexTree(node) {
//     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
//     var el;
//     while((el = nodeIterator.nextNode())) {
//         var key = getNodeKey(el);
//         if (key) {
//             fromNodesLookup[key] = el;
//         }
//     }
// }
function indexTree(node){if(node.nodeType===ELEMENT_NODE||node.nodeType===DOCUMENT_FRAGMENT_NODE$1){var curChild=node.firstChild;while(curChild){var key=getNodeKey(curChild);if(key){fromNodesLookup[key]=curChild;}// Walk recursively
indexTree(curChild);curChild=curChild.nextSibling;}}}indexTree(fromNode);function handleNodeAdded(el){onNodeAdded(el);var curChild=el.firstChild;while(curChild){var nextSibling=curChild.nextSibling;var key=getNodeKey(curChild);if(key){var unmatchedFromEl=fromNodesLookup[key];// if we find a duplicate #id node in cache, replace `el` with cache value
// and morph it to the child node.
if(unmatchedFromEl&&compareNodeNames(curChild,unmatchedFromEl)){curChild.parentNode.replaceChild(unmatchedFromEl,curChild);morphEl(unmatchedFromEl,curChild);}else{handleNodeAdded(curChild);}}else{// recursively call for curChild and it's children to see if we find something in
// fromNodesLookup
handleNodeAdded(curChild);}curChild=nextSibling;}}// END: morphChildren(...)
var morphedNode=fromNode;var morphedNodeType=morphedNode.nodeType;var toNodeType=toNode.nodeType;if(!childrenOnly){// Handle the case where we are given two DOM nodes that are not
// compatible (e.g. <div> --> <span> or <div> --> TEXT)
if(morphedNodeType===ELEMENT_NODE){if(toNodeType===ELEMENT_NODE){if(!compareNodeNames(fromNode,toNode)){onNodeDiscarded(fromNode);morphedNode=moveChildren(fromNode,createElementNS(toNode.nodeName,toNode.namespaceURI));}}else{// Going from an element node to a text node
morphedNode=toNode;}}else if(morphedNodeType===TEXT_NODE||morphedNodeType===COMMENT_NODE){// Text or comment node
if(toNodeType===morphedNodeType){if(morphedNode.nodeValue!==toNode.nodeValue){morphedNode.nodeValue=toNode.nodeValue;}return morphedNode;}else{// Text node to something else
morphedNode=toNode;}}}if(morphedNode===toNode){// The "to node" was not compatible with the "from node" so we had to
// toss out the "from node" and use the "to node"
onNodeDiscarded(fromNode);}else{if(toNode.isSameNode&&toNode.isSameNode(morphedNode)){return;}morphEl(morphedNode,toNode,childrenOnly);// We now need to loop over any keyed nodes that might need to be
// removed. We only do the removal if we know that the keyed node
// never found a match. When a keyed node is matched up we remove
// it out of fromNodesLookup and we use fromNodesLookup to determine
// if a keyed node has been matched up or not
if(keyedRemovalList){for(var i=0,len=keyedRemovalList.length;i<len;i++){var elToRemove=fromNodesLookup[keyedRemovalList[i]];if(elToRemove){removeNode(elToRemove,elToRemove.parentNode,false);}}}}if(!childrenOnly&&morphedNode!==fromNode&&fromNode.parentNode){if(morphedNode.actualize){morphedNode=morphedNode.actualize(fromNode.ownerDocument||doc);}// If we had to swap out the from node with a new node because the old
// node was not compatible with the target node then we need to
// replace the old DOM node in the original DOM tree. This is only
// possible if the original DOM node was part of a DOM tree which
// we know is the case if it has a parent node.
fromNode.parentNode.replaceChild(morphedNode,fromNode);}return morphedNode;};}var morphdom=morphdomFactory(morphAttrs);/* harmony default export */const morphdom_esm=morphdom;;// CONCATENATED MODULE: ./node_modules/@shopify/theme-addresses/theme-addresses.js
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
 */function buildOptions(provinceNodeElement,provinces){var defaultValue=provinceNodeElement.getAttribute('data-default');provinces.forEach(function(option){var optionElement=document.createElement('option');optionElement.value=option[0];optionElement.textContent=option[1];provinceNodeElement.appendChild(optionElement);});if(defaultValue&&getOption(provinceNodeElement,defaultValue)){provinceNodeElement.value=defaultValue;}}/**
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
     */value:function load(url,sectionId){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var querylessUrl=url.replace(/\?[^#]+/,'');var queryParamsString=new RegExp(/.+\?([^#]+)/).exec(url);var queryParams={};if('query'in options){queryParams=_objectSpread2({},queryParams,{},options.query);}if(queryParamsString&&queryParamsString.length>=2){queryParamsString[1].split('&').forEach(function(param){var _param$split=param.split('='),_param$split2=_slicedToArray(_param$split,2),key=_param$split2[0],value=_param$split2[1];queryParams[key]=value;});}// NOTE: We're adding an additional timestamp to the query.
// This is to prevent certain browsers from returning cached
// versions of the url we are requesting.
// See this PR for more info: https://github.com/pixelunion/shopify-asyncview/pull/4
var cachebustingParams=_objectSpread2({},queryParams,{});var hashUrl=querylessUrl.replace(/([^#]+)(.*)/,function(match,address,hash){return"".concat(address,"?").concat(Object.keys(queryParams).sort().map(function(key){return"".concat(key,"=").concat(encodeURIComponent(queryParams[key]));}).join('&')).concat(hash);});var requestUrl=querylessUrl.replace(/([^#]+)(.*)/,function(match,address,hash){return"".concat(address,"?").concat(Object.keys(cachebustingParams).sort().map(function(key){return"".concat(key,"=").concat(encodeURIComponent(cachebustingParams[key]));}).join('&')).concat(hash);});var promise=new Promise(function(resolve,reject){var data;if(hashUrl in deferred){resolve(deferred[hashUrl]);return;}deferred[hashUrl]=promise;if(options.hash){data=sessionStorage.getItem(hashUrl);if(data){var deserialized=JSON.parse(data);if(options.hash===deserialized.options.hash){delete deferred[hashUrl];resolve(deserialized);return;}}}var xhr=new XMLHttpRequest();xhr.open('GET',requestUrl,true);xhr.onload=function(){var el=xhr.response;var newOptions={};var optionsEl=el.querySelector('[data-options]');if(optionsEl&&optionsEl.innerHTML){newOptions=JSON.parse(el.querySelector('[data-options]').innerHTML);}var htmlEls=el.querySelectorAll('[data-html]');var newHtml={};if(htmlEls.length===1&&htmlEls[0].getAttribute('data-html')===''){newHtml=htmlEls[0].innerHTML;}else{for(var i=0;i<htmlEls.length;i++){newHtml[htmlEls[i].getAttribute('data-html')]=htmlEls[i].innerHTML;}}var dataEls=el.querySelectorAll('[data-data]');var newData={};if(dataEls.length===1&&dataEls[0].getAttribute('data-data')===''){newData=JSON.parse(dataEls[0].innerHTML);}else{for(var _i=0;_i<dataEls.length;_i++){newData[dataEls[_i].getAttribute('data-data')]=JSON.parse(dataEls[_i].innerHTML);}}if(options.hash){try{sessionStorage.setItem(hashUrl,JSON.stringify({}));}catch(error){console.error(error);}}delete deferred[hashUrl];resolve({});};xhr.onerror=function(){delete deferred[hashUrl];reject();};xhr.responseType='document';xhr.send();});return promise;}}]);return AsyncView;}();/* harmony default export */const shopify_asyncview_dist_index_es=AsyncView;// EXTERNAL MODULE: ./node_modules/@pixelunion/events/dist/EventHandler.js
var dist_EventHandler=__webpack_require__(766);;// CONCATENATED MODULE: ./source/scripts/helpers/QuantitySelector.js
class QuantitySelector{constructor({}){this.events=new dist_EventHandler/* default */.Z();this.field=quantityField;this.input=this.field.querySelector('[data-quantity-input]');this.plus=this.field.querySelector('[data-quantity-plus]');this.minus=this.field.querySelector('[data-quantity-minus]');this.minusButtonWrapper=this.field.querySelector('[data-button-wrapper-minus]');this.incrementValue=parseInt(this.input.dataset.incrementValue,10);this.increaseAmount=this.increaseAmount.bind(this);this.decreaseAmount=this.decreaseAmount.bind(this);this.onChange=onChange?just_debounce_default()(onChange,50):()=>{};this.registerEvents();}registerEvents(){this.increaseAmountClickEvent=this.events.register(this.plus,'click',e=>this.increaseAmount(e));this.decreaseAmountClickEvent=this.events.register(this.minus,'click',e=>this.decreaseAmount(e));this.setAmountChangeEvent=this.events.register(this.input,'change',e=>this.setAmount(e));this.quantityKeyUpEvent=this.events.register(this.input,'keyup',e=>this.quantityKeyUp(e));this.quantityKeyDownEvent=this.events.register(this.input,'keydown',e=>this.quantityKeyDown(e));this._updateMinusButton();}setAmount(e){e.preventDefault();const count=this._getCount();if(!count){this.input.value=this.incrementValue;}this._updateMinusButton();this.onChange(e.currentTarget);}_getCount(){return this.input.valueAsNumber;}increaseAmount(e){e.preventDefault();const count=this._getCount();this.input.value=count+this.incrementValue;this._updateMinusButton();this.onChange(e.currentTarget);}decreaseAmount(e){e.preventDefault();const count=this._getCount();this.input.value=count-this.incrementValue;this._updateMinusButton();this.onChange(e.currentTarget);}quantityKeyUp(e){if(e.key==='Backspace'){return;}this._updateMinusButton();this.onChange(e.currentTarget);}quantityKeyDown(e){if(e.key==='Enter'){e.preventDefault();}}_updateMinusButton(){const count=this._getCount();if(count<=this.incrementValue){this.minusButtonWrapper.classList.add('quantity-selector__button-wrapper--disabled');}else{this.minusButtonWrapper.classList.remove('quantity-selector__button-wrapper--disabled');}}unload(){this.events.unregisterAll();}};// CONCATENATED MODULE: ./node_modules/@pixelunion/animations/dist/animations.es.js
/*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  */function animations_es_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function animations_es_defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function animations_es_createClass(Constructor,protoProps,staticProps){if(protoProps)animations_es_defineProperties(Constructor.prototype,protoProps);if(staticProps)animations_es_defineProperties(Constructor,staticProps);return Constructor;}function animations_es_defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function animations_es_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function animations_es_objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){animations_es_ownKeys(source,true).forEach(function(key){animations_es_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{animations_es_ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}/**
 * Promisified version of window.requestAnimationFrame.
 * @returns {Promise} Promise will resolve when requestAnimationFrame callback is run.
 */function animations_es_raf(){return new Promise(function(resolve){window.requestAnimationFrame(resolve);});}/**
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
   */function Animation(options){animations_es_classCallCheck(this,Animation);this._el=options.el;this.cancelRunning=null;this._state=options.state||'initial';this.initialState=this._state;this.stateAttribute=options.stateAttribute||'data-animation-state';this.stateChangeAttribute=options.stateChangeAttribute||'data-animation';this.endEvent=options.endEvent||'transitionend';this.hold=!!options.hold;this.onStart=options.onStart||function(){/* do nothing */};this.activeEventHandler=null;}/**
   * Returns target element
   *
   * @return {HTMLElement} Target element
   */animations_es_createClass(Animation,[{},{},{},{},{}]);return Animation;}();/**
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
   */animations_es_createClass(AnimationsManager,[{},{},{}]);return AnimationsManager;}();;// CONCATENATED MODULE: ./source/scripts/components/MessageBanner.js
;// CONCATENATED MODULE: ./source/scripts/sections/StaticCart.js
class StaticCart{constructor(section){this.section=section;this.settings=section.data.settings;this.shipping=section.data.shipping;this.updateTimeout=null;this.$window=jquery_default()(window);this.$el=jquery_default()(section.el);this.el=section.el;this.events=new dist_EventHandler/* default */.Z();this.totals=this.el.querySelectorAll('[data-cart-total]');this.$shipping=this.$el.find('[data-cartshipping]');this.freeShippingBars=this.$el[0].querySelectorAll('[data-free-shipping-bar]');this.$cartSidebar=this.$el.find('[data-cart-sidebar]');// Quantity selector
this.quantitySelectors=[];this.inputFields=this.el.querySelectorAll('[data-quantity-input]');// Product form containers
this.$titleTotalSmall=this.$el.find('.cart-title-total--small');this.$titleTotalLarge=this.$el.find('.cart-title-total--large');this.$titleTotalContents=this.$el.find('[data-cart-title-total]');// Cart list
this.cartItemList=this.$el[0].querySelector('[data-cart-item-list]');this.cartDiscounts=this.$el[0].querySelector('[data-cart-discounts]');// Shipping calculator elements
this.$shippingToggle=this.$el.find('[data-cartshipping-toggle]');this.$shippingResponse=this.$shipping.find('[data-cartshipping-response]');this.$shippingResponseMessage=this.$shippingResponse.find('[data-cartshipping-message]');this.$shippingResponseRates=this.$shippingResponse.find('[data-cartshipping-rates]');this.$shippingSubmit=this.$shipping.find('[data-cartshipping-submit]');this._moveTitleTotal();const $scripts=jquery_default()('[data-scripts]');this._editItemQuantity=this._editItemQuantity.bind(this);this.inputFields.forEach(input=>{this.quantitySelectors.push(new QuantitySelector({}));});script_default()($scripts.data('shopify-api-url'),()=>{this._bindEvents();window.Shopify.onError=this._handleErrors.bind(this);});this.forms=new Forms(this.$el);if(this.settings.shipping&&this.$shipping.length){script_default()($scripts.data('shopify-countries'),()=>{script_default()($scripts.data('shopify-common'),()=>{this._initShippingCalc();});});}if(this.$cartSidebar.length){new RichText(this.$cartSidebar);}}onSectionUnload(){this.$el.off('.cart-page');this.$window.off('.cart-page');if(this.messageBanner){this.messageBanner.unload();}this.forms.unload();}_bindEvents(){this.$el.on('click.cart-page','[data-cartitem-remove]',event=>{event.preventDefault();this._editItemQuantity(event.currentTarget,true);});this.$window.on('resize.cart-page',just_debounce_default()(()=>this._moveTitleTotal(),20));}/**
   * Gets the current value of the quantity input box for a given line item key
   *
   * @param {string} key
   */_getItemQuantity(key){return parseInt(this.el.querySelector(`[data-cartitem-key="${key}"] [data-quantity-input]`).value,10);}_moveTitleTotal(){if(!this.$titleTotalContents.length){return;}if(this.$window.outerWidth()>=480){if(!jquery_default().contains(this.$titleTotalLarge[0],this.$titleTotalContents[0])){const $form=this.$titleTotalContents.detach();this.$titleTotalLarge.append($form);}}else if(!jquery_default().contains(this.$titleTotalSmall[0],this.$titleTotalContents[0])){const $form=this.$titleTotalContents.detach();this.$titleTotalSmall.append($form);}}/**
   * Handle an item quantity change
   *
   * @param event
   * @param {Boolean} remove - Set as true to remove cart item
   * @private
   */_editItemQuantity(target,remove=false){const $target=jquery_default()(target);const cartItemRow=$target.closest('[data-cartitem-id]')[0];if(remove){cartItemRow.classList.add('removing');}const quantity=remove?0:parseInt(cartItemRow.querySelector('[data-quantity-input]').value,10);const key=cartItemRow.getAttribute('data-cartitem-key');this._updateCart(key,quantity);}/**
   * Update cart with a valid quantity
   *
   * @param $cartItem
   * @param quantity
   * @private
   */_updateCart(key,quantity){// cancel any pending requests
if(this.updateTimeout!==null){clearTimeout(this.updateTimeout);}this.updateTimeout=setTimeout(()=>{if(quantity>0&&this._getItemQuantity(key)!==quantity){this.updateTimeout=null;return;}const thisTimeoutId=this.updateTimeout;// Notify Shopify updated item
const fetchBody={};fetch(`${window.Theme.routes.cart_change_url}.js`,{}).then(response=>response.json()).then(data=>{if(this.updateTimeout!==thisTimeoutId){return;}if(data.status===422){this._handleInvalidQuantity(thisTimeoutId,data.message);}else{this._didUpdate(data,thisTimeoutId);}}).catch(error=>console.error(error));},300);}/**
   * Display message banner and fetch valid cart data when
   * invalid quantity error is returned on cart change
   *
   * @param thisTimeoutId
   * @param errorMesg
   * @private
   */_handleInvalidQuantity(thisTimeoutId,errorMsg){// If another request is in progress, discard this update
if(this.updateTimeout!==thisTimeoutId){return;}if(this.messageBanner){this.messageBanner.unload();this.messageBanner=null;}this.messageBanner=new MessageBanner(errorMsg,'error');fetch(`${window.Theme.routes.cart_url}.js`,{}).then(response=>response.json()).then(cartData=>{this._didUpdate(cartData,thisTimeoutId);}).catch(error=>console.error(error));}/**
   * Fetches new cart contents and swaps into page
   *
   * @param response
   * @param {integer} thisTimeoutId Id of timeout for this request. If no longer current, update is cancelled.
   * @returns {*}
   * @private
   */_didUpdate(response,thisTimeoutId){// Reload page if all items are removed from cart
if(!response.items.length){window.location=window.Theme.routes.cart_url;return;}// Reload the cart-item-list and the discounts snippets
shopify_asyncview_dist_index_es.load(window.Theme.routes.cart_url,this.section.id).then(({})=>{// If another request is in progress, discard this update
if(this.updateTimeout!==thisTimeoutId){return;}const countEvent=new CustomEvent('cartcount:update',{});window.dispatchEvent(countEvent);// Unregister QuantitySelector events
this.quantitySelectors.forEach(selector=>{selector.unload();});// Update Free shipping bar contents
if(this.freeShippingBars.length>0){this.freeShippingBars.forEach(el=>{const freeShippingBar=el;freeShippingBar.innerHTML=html.free_shipping_bar;freeShippingBar.classList.add('free-shipping-bar--animate');});}// Inject new cart list contents
const newListContainer=document.createElement('div');newListContainer.innerHTML=html.list;morphdom_esm(this.cartItemList,newListContainer.querySelector('ul'),{onBeforeElUpdated:(fromEl,toEl)=>{// Skip images if src matches
// - we don't want to reload lazy loaded images
if(fromEl.tagName==='IMG'&&fromEl.src===toEl.src){return false;}return true;}});// Update cart totals
this.totals.forEach(total=>{const newTotal=total;newTotal.innerHTML=html.cart_total;morphdom_esm(total,newTotal,{childrenOnly:true});});rimg_shopify_dist_index_es.watch(this.cartItemList);this.forms.unload();this.forms=new Forms(this.$el);this.inputFields.forEach(input=>{this.quantitySelectors.push(new QuantitySelector({quantityField:input.parentNode,onChange:this._editItemQuantity}));});this.$el.off('click.cart-page','[data-cartitem-remove]');this.$el.on('click.cart-page','[data-cartitem-remove]',event=>{event.preventDefault();this._editItemQuantity(event.currentTarget,true);});// Inject new cart level discounts
this.cartDiscounts.innerHTML=html.discounts;}).catch(()=>window.location.reload());}/**
   * Handle Errors returned from Shopify
   *
   * @param errors
   * @private
   */_handleErrors(errors=null){if(!errors){return;}const shippingResponse={};if(errors.zip&&errors.zip.length>0){if(errors.zip[0].indexOf('is not valid')!==-1||errors.zip[0].indexOf('can\'t be blank')!==-1){shippingResponse.message=`${this.shipping.zip} ${errors.zip}`;}}if(errors.error&&errors.error.length>0){if(errors.error[0].indexOf('shipment_too_heavy')!==-1){shippingResponse.message=this.shipping.shipment_too_heavy;}}this._handleShippingResponse(shippingResponse);}_initShippingCalc(){this._bindShippingCalcEvents();const countrySelect=document.getElementById('address_country');const provinceSelect=document.getElementById('address_province');const provinceContainer=document.getElementById('address_province_container');this.shippingCountryProvinceSelector=new CountryProvinceSelector(countrySelect.innerHTML);this.shippingCountryProvinceSelector.build(countrySelect,provinceSelect,{onCountryChange:provinces=>{if(provinces.length){provinceContainer.style.display='block';}else{provinceContainer.style.display='none';}// "Province", "State", "Region", etc. and "Postal Code", "ZIP Code", etc.
// Even countries without provinces include a label.
const{}=window.Countries[countrySelect.value];provinceContainer.querySelector('label[for="address_province"]').innerHTML=label;this.el.querySelector('#address_zip ~ label[for="address_zip"]').innerHTML=zipLabel;}});}_bindShippingCalcEvents(){this.$el.on('click.cart-page','[data-cartshipping-toggle]',()=>{this._toggleShippingCalc();});this.$el.on('click.cart-page','[data-cartshipping-submit]',()=>{this._getShippingRates();});this.$el.on('keypress.cart-page','#address_zip',event=>{if(event.keyCode===10||event.keyCode===13){event.preventDefault();this.$shippingSubmit.trigger('click');}});}_toggleShippingCalc(){const oldText=this.$shippingToggle.text();const newText=this.$shippingToggle.data('cartshipping-toggle');this.$shippingToggle.html(newText).data('cartshipping-toggle',oldText);this.$shipping.toggleClass('open');}_getShippingRates(){this._disableShippingButton();const shippingAddress={};shippingAddress.country=jquery_default()('#address_country').val()||'';shippingAddress.province=jquery_default()('#address_province').val()||'';shippingAddress.zip=jquery_default()('#address_zip').val()||'';const queryString=Object.keys(shippingAddress).map(key=>`${encodeURIComponent(`shipping_address[${key}]`)}=${encodeURIComponent(shippingAddress[key])}`).join('&');jquery_default().ajax(`${window.Theme.routes.cart_url}/shipping_rates.json?${queryString}`,{}).fail(error=>this._handleErrors(error.responseJSON||{})).done(response=>{const rates=response.shipping_rates;const addressBase=[];if(shippingAddress.zip.length){addressBase.push(shippingAddress.zip.trim());}if(shippingAddress.province.length){addressBase.push(shippingAddress.province);}if(shippingAddress.country.length){addressBase.push(shippingAddress.country);}const address=addressBase.join(', ');let message='';if(rates.length>1){const firstRate=window.Shopify.formatMoney(rates[0].price,this.settings.money_format);message=this.shipping.multiple_rates.replace('*address*',address).replace('*number_of_rates*',rates.length).replace('*rate*',`<span class="money">${firstRate}</span>`);}else if(rates.length===1){message=this.shipping.one_rate.replace('*address*',address);}else{message=this.shipping.no_rates;}const ratesList=rates.map(rate=>{const price=window.Shopify.formatMoney(rate.price,this.settings.money_format);const rateValue=this.shipping.rate_value.replace('*rate_title*',rate.name).replace('*rate*',`<span class="money">${price}</span>`);return`<li>${rateValue}</li>`;});this._handleShippingResponse({});});}_enableShippingButton(){this.$shippingSubmit.html(this.shipping.calculate_shipping).attr('disabled',false);}_disableShippingButton(){this.$shippingSubmit.html(this.shipping.calculating).attr('disabled',true);}_showShippingResponse(){this.$shippingResponse.addClass('visible');}_hideShippingResponse(){this.$shippingResponse.removeClass('visible');}/**
   * Handle shipping responses
   *
   * @param {object} shippingResponse
   * @property {String} shippingResponse.messages - Error / Success message
   * @property {Array|String} shippingResponse.rates - Shipping rates
   * @private
   */_handleShippingResponse(shippingResponse={}){// Hide the response so that it can be populated smoothly
this._hideShippingResponse();const message=shippingResponse.message||null;const rates=shippingResponse.rates||null;// Empty out contents
this.$shippingResponseMessage.empty();this.$shippingResponseRates.empty();if(message){this.$shippingResponseMessage.html(message);}if(rates){this.$shippingResponseRates.html(rates);}// Reset the calculating button so it can be used again
this._enableShippingButton();// No error provided
if(!message&&!rates){return;}// Show the response
this._showShippingResponse();}}// EXTERNAL MODULE: ./node_modules/@pixelunion/breakpoint/dist/cjs/index.js
var cjs=__webpack_require__(646);// EXTERNAL MODULE: ./node_modules/flickity/js/index.js
var js=__webpack_require__(442);var js_default=/*#__PURE__*/__webpack_require__.n(js);;// CONCATENATED MODULE: ./source/scripts/helpers/throttle.js
;// CONCATENATED MODULE: ./source/scripts/Layout.js
const eventHandlers=[];let previousBreakpoint=null;function getBreakpoint(){return window.getComputedStyle(document.documentElement,':after').getPropertyValue('content').replace(/"/g,'');}jquery_default()(window).on('resize',throttle(event=>{const currentBreakpoint=getBreakpoint();if(previousBreakpoint!==currentBreakpoint){eventHandlers.forEach(eventHandler=>{eventHandler(event,{});});}previousBreakpoint=currentBreakpoint;},100));/* harmony default export */const Layout={};;// CONCATENATED MODULE: ./source/scripts/helpers/LazyLoader.js
/**
 * Allows a callback to be run once, when a target intersects the viewport.
 * @constructor
 * @param {HTMLElement} target Element to track
 * @param {Function} callback Function to execute when target enters viewport (only executed once)
 * @param {Object} [options] options with which to construct the IntersectionObserver
 * @param {string} [options.rootMargin='30%'] A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
 * @param {number} [options.threshold=0] Ratio of intersection required to trigger callback
 */class LazyLoader_LazyLoader{constructor(target,callback,options){const defaultOptions={};this.callback=callback;this._runCallback=this._runCallback.bind(this);this.observer=new IntersectionObserver(this._runCallback,{...defaultOptions,...options});this.observer.observe(target);}/**
   * Runs the callback if first entry becomes intersecting, then unloads the LazyLoader
   * @_runCallback
   * @param {IntersectionObserverEntry[]} entries Entry to check - all but the
   * first element will be ignored.
   */_runCallback(entries){// do nothing unless target moved into state of intersection
if(entries[0].isIntersecting===true){this.unload();this.callback();}}/**
   * Disconnects IntersectionObserver if active
   * @unload
   */unload(){this.observer.disconnect();}}// EXTERNAL MODULE: ./node_modules/vanilla-modal/dist/index.js
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
 */function forceFocus(element,options){options=options||{};var savedTabIndex=element.tabIndex;element.tabIndex=-1;element.dataset.tabIndex=savedTabIndex;element.focus();if(typeof options.className!=='undefined'){element.classList.add(options.className);}element.addEventListener('blur',callback);function callback(event){event.target.removeEventListener(event.type,callback);element.tabIndex=savedTabIndex;delete element.dataset.tabIndex;if(typeof options.className!=='undefined'){element.classList.remove(options.className);}}}/**
 * If there's a hash in the url, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - Selector for elements to not include.
 */function focusHash(options){options=options||{};var hash=window.location.hash;var element=document.getElementById(hash.slice(1));// if we are to ignore this element, early return
if(element&&options.ignore&&element.matches(options.ignore)){return false;}if(hash&&element){forceFocus(element,options);}}/**
 * When an in-page (url w/hash) link is clicked, focus the appropriate element
 * This compensates for older browsers that do not move keyboard focus to anchor links.
 * Recommendation: To be called once the page in loaded.
 *
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 * @param {string} options.ignore - CSS selector for elements to not include.
 */function bindInPageLinks(options){options=options||{};var links=Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'));return links.filter(function(link){if(link.hash==='#'||link.hash===''){return false;}if(options.ignore&&link.matches(options.ignore)){return false;}var element=document.querySelector(link.hash);if(!element){return false;}link.addEventListener('click',function(){forceFocus(element,options);});return true;});}function focusable(container){var elements=Array.prototype.slice.call(container.querySelectorAll('[tabindex],'+'[draggable],'+'a[href],'+'area,'+'button:enabled,'+'input:not([type=hidden]):enabled,'+'object,'+'select:enabled,'+'textarea:enabled'));// Filter out elements that are not visible.
// Copied from jQuery https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js
return elements.filter(function(element){return!!(element.offsetWidth||element.offsetHeight||element.getClientRects().length);});}/**
 * Traps the focus in a particular container
 *
 * @param {Element} container - Container DOM element to trap focus inside of
 * @param {Element} elementToFocus - Element to be focused on first
 * @param {Object} options - Settings unique to your theme
 * @param {string} options.className - Class name to apply to element on focus.
 */var trapFocusHandlers={};function trapFocus(container,options){options=options||{};var elements=focusable(container);var elementToFocus=options.elementToFocus||container;var first=elements[0];var last=elements[elements.length-1];removeTrapFocus();trapFocusHandlers.focusin=function(event){if(container!==event.target&&!container.contains(event.target)){first.focus();}if(event.target!==container&&event.target!==last&&event.target!==first)return;document.addEventListener('keydown',trapFocusHandlers.keydown);};trapFocusHandlers.focusout=function(){document.removeEventListener('keydown',trapFocusHandlers.keydown);};trapFocusHandlers.keydown=function(event){if(event.keyCode!==9)return;// If not TAB key
// On the last focusable element and tab forward, focus the first element.
if(event.target===last&&!event.shiftKey){event.preventDefault();first.focus();}//  On the first focusable element and tab backward, focus the last element.
if((event.target===container||event.target===first)&&event.shiftKey){event.preventDefault();last.focus();}};document.addEventListener('focusout',trapFocusHandlers.focusout);document.addEventListener('focusin',trapFocusHandlers.focusin);forceFocus(elementToFocus,options);}/**
 * Removes the trap of focus from the page
 *//**
 * Add a preventive message to external links and links that open to a new window.
 * @param {string} elements - Specific elements to be targeted
 * @param {object} options.messages - Custom messages to overwrite with keys: newWindow, external, newWindowExternal
 * @param {string} options.messages.newWindow - When the link opens in a new window (e.g. target="_blank")
 * @param {string} options.messages.external - When the link is to a different host domain.
 * @param {string} options.messages.newWindowExternal - When the link is to a different host domain and opens in a new window.
 * @param {object} options.prefix - Prefix to namespace "id" of the messages
 */function accessibleLinks(elements,options){if(typeof elements!=='string'){throw new TypeError(elements+' is not a String.');}elements=document.querySelectorAll(elements);if(elements.length===0){return;}options=options||{};options.messages=options.messages||{};var messages={};var prefix=options.prefix||'a11y';var messageSelectors={};function externalSite(link){return link.hostname!==window.location.hostname;}elements.forEach(function(link){var target=link.getAttribute('target');var rel=link.getAttribute('rel');var isExternal=externalSite(link);var isTargetBlank=target==='_blank';var isRelNoopenerEmpty=rel===null||rel.indexOf('noopener')===-1;if(isTargetBlank&&isRelNoopenerEmpty){link.setAttribute('rel','noopener');}if(isExternal&&isTargetBlank){link.setAttribute('aria-describedby',messageSelectors.newWindowExternal);}else if(isExternal){link.setAttribute('aria-describedby',messageSelectors.external);}else if(isTargetBlank){link.setAttribute('aria-describedby',messageSelectors.newWindow);}});generateHTML(messages);};// CONCATENATED MODULE: ./source/scripts/helpers/ScrollLock.js
const{body}=document;const html=document.querySelector('html');;// CONCATENATED MODULE: ./source/scripts/components/Modal.js
let openModals=[];const unlockScrollLock=()=>{if(openModals.length===0){ScrollLock.unlock();}};class Modal{constructor(options={}){this.$body=jquery_default()(document.body);this.$window=jquery_default()(window);// Extend default vanilla-modal callbacks back to instantiator of Modal
const defaultOptions={};this.options={...defaultOptions,...options};const modalSelector=this.options.modalId?`[data-modal-container-${this.options.modalId}]`:'[data-modal-container]';const closeSelector=this.options.modalId?`[data-modal-${this.options.modalId}-close`:'[data-modal-close]';this.loadedClass=this.options.modalId?`modal-${this.options.modalId}-loaded`:'modal-loaded';this.visibleClass=this.options.modalId?`modal-${this.options.modalId}-visible`:'modal-visible';this.modal=null;this.$modal=jquery_default()(modalSelector);this.$modalInner=this.$modal.find('[data-modal-inner]');this.finishedLoading=this.finishedLoading.bind(this);this._onOpen=this._onOpen.bind(this);this._onBeforeOpen=this._onBeforeOpen.bind(this);this._onClose=this._onClose.bind(this);this._onBeforeClose=this._onBeforeClose.bind(this);this._closeEsc=this._closeEsc.bind(this);this.position=this.position.bind(this);this.modalOptions={};}unload(){if(!this.modal)return;this.modal.destroy();openModals=openModals.filter(modal=>modal!==this);unlockScrollLock();}/**
   * Open a modal with contents from selector
   *
   * @param selector
   * @param handle
   */open(selector,handle='general'){this._addModalClass(handle);this.modal=new(vanilla_modal_dist_default())(this.modalOptions);this.modal.open(selector);openModals.push(this);window.addEventListener('keydown',this._closeEsc);}close(){this.modal.close();window.removeEventListener('keydown',this._closeEsc);}finishedLoading(){trapFocus(this.$modal[0]);}_closeEsc(e){if(e.key==='Escape'&&openModals[openModals.length-1]===this){this.close();}}isOpen(){return this.modal&&this.modal.isOpen;}/**
   * Update the vertical positioning of modal
   */position(){const windowHeight=window.innerHeight;const modalHeight=this.$modalInner.outerHeight();const modalPadding=parseInt(this.$modal.css('padding-top'),10)*2;const offset=(windowHeight-modalPadding-modalHeight)/2;const marginTop=offset>0?offset:0;this.$modalInner.css({});}/**
   * Add a class to the modal for individual styling
   * @param handle
   * @private
   */_addModalClass(handle){this.$modal.addClass(`modal--${handle}`);}/**
   * Remove modal class based on the handle
   * @private
   */_removeModalClass(){const modalClass=this.$modal.attr('class').match(/modal--[\w-]*\b/);if(!modalClass){return;}this.$modal.removeClass(modalClass[0]);}_onClose(){this._removeModalClass();this.$body.removeClass(this.visibleClass);this.$window.off('resize.modal');this.$modalInner.css({});this.options.onClose();removeTrapFocus(this.$modal[0]);if(this.activeElement){// Ensure focus is properly re-trapped in the case when modal was
// opened from another modal
const focusTrap=this.activeElement.closest('[data-trap-focus]');if(focusTrap){trapFocus(focusTrap);}this.activeElement.focus();}openModals=openModals.filter(modal=>modal!==this);unlockScrollLock();}_onOpen(){this.activeElement=document.activeElement;this.position();ScrollLock.lock(this.$modal[0]);this.$body.addClass(this.visibleClass);this.$window.on('resize.modal',just_debounce_default()(()=>this.position(),16,true,true));this.options.onOpen();trapFocus(this.$modal[0]);}_onBeforeClose(){this.options.onBeforeClose();}_onBeforeOpen(){this.options.onBeforeOpen();}}// EXTERNAL MODULE: ./node_modules/@pixelunion/shopify-variants-ui/dist/index.es.js
var shopify_variants_ui_dist_index_es=__webpack_require__(722);;// CONCATENATED MODULE: ./node_modules/@pixelunion/shopify-surface-pick-up/dist/index.es.js
const LOCAL_STORAGE_KEY='pxu-shopify-surface-pick-up';const loadingClass='surface-pick-up--loading';const isNotExpired=timestamp=>timestamp+1000*60*60>=Date.now();const removeTrailingSlash=s=>s.replace(/(.*)\/$/,'$1');// Haversine Distance
// The haversine formula is an equation giving great-circle distances between
// two points on a sphere from their longitudes and latitudes
function calculateDistance(latitude1,longitude1,latitude2,longitude2,unitSystem){const dtor=Math.PI/180;const radius=unitSystem==='metric'?6378.14:3959;const rlat1=latitude1*dtor;const rlong1=longitude1*dtor;const rlat2=latitude2*dtor;const rlong2=longitude2*dtor;const dlon=rlong1-rlong2;const dlat=rlat1-rlat2;const a=Math.sin(dlat/2)**2+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(dlon/2)**2;const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));return radius*c;}async function setLocation({}){const newData={};localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(newData));return fetch('/localization.json',{body:JSON.stringify({latitude})}).then(()=>({}));}async function getLocation(requestLocation=false){const cachedLocation=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));if(cachedLocation&&isNotExpired(cachedLocation.timestamp)){return cachedLocation;}if(requestLocation){return getGeoLocation().then(coords=>{setLocation(coords);// We don't need to wait for this
return coords;});}return null;}/* harmony default export */const shopify_surface_pick_up_dist_index_es=SurfacePickUp;;// CONCATENATED MODULE: ./node_modules/@pixelunion/pxs-gift-card-recipient-form/dist/index.es.js
/*!
 * @pixelunion/pxs-gift-card-recipient-form v1.1.0
 * (c) 2024 Pixel Union
 */var index_es_EventHandler_1=index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var index_es_EventHandler=index_es_unwrapExports(index_es_EventHandler_1);/*!
   * @pixelunion/animations v0.1.0
   * (c) 2019 Pixel Union
   * Released under the UNLICENSED license.
  */function pxs_gift_card_recipient_form_dist_index_es_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/**
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
   */pxs_gift_card_recipient_form_dist_index_es_createClass(Animation,[{},{value:function animateTo(state){var _this=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var from=this._el.dataset[this.stateAttribute]||this._state;var to=state||this.initialState;var force=options.force;var hold='hold'in options?options.hold:this.hold;return new Promise(function(resolve){if(_this.cancelRunning){_this.cancelRunning();}if(from===to){// Removing this here fixes some lingering attributes. But why?
_this._el.removeAttribute(_this.stateChangeAttribute);resolve(from,null);return;}var running=true;_this.cancelRunning=function(){running=false;resolve(null,null);};_this._el.removeEventListener(_this.endEvent,_this.activeEventHandler);_this.activeEventHandler=null;if(force){_this._el.setAttribute(_this.stateChangeAttribute,"".concat(from,"=>").concat(to));_this.onStart({});if(typeof options.onStart==='function'){options.onStart({});}_this._el.setAttribute(_this.stateAttribute,to);_this._state=to;if(!hold){_this._el.removeAttribute(_this.stateChangeAttribute);}resolve(to,null);return;}index_es_raf().then(function(){if(!running)throw new Error('cancelled');_this._el.setAttribute(_this.stateChangeAttribute,"".concat(from,"=>").concat(to));_this.onStart({});if(typeof options.onStart==='function'){options.onStart({});}return index_es_raf();}).then(function(){if(!running)throw new Error('cancelled');_this._el.removeEventListener(_this.endEvent,_this.activeEventHandler);_this.activeEventHandler=function(e){// Ignore any events bubbling up
if(e.target!==_this._el||!running)return;_this._el.removeEventListener(_this.endEvent,_this.activeEventHandler);if(!hold){_this._el.removeAttribute(_this.stateChangeAttribute);}resolve(to,e);};_this._el.addEventListener(_this.endEvent,_this.activeEventHandler);_this._el.setAttribute(_this.stateAttribute,to);_this._state=to;})["catch"](function(error){// Only catch 'cancelled' errors.
if(error.message!=='cancelled')throw error;});});}/**
     * Remove any event listeners
     */},{},{get:function get(){return this._el;}/**
     * Returns current state
     *
     * @return {String} Current state
     */},{key:"state",get:function get(){return this._state;}}]);return Animation;}();function index_es_transition(options){return new index_es_Animation(options);}class RecipientForm{constructor(el){this.el=el;this.events=new index_es_EventHandler();this.recipientForm=this.el.querySelector('[data-recipient-form]');this.recipientFormInputs=this.el.querySelectorAll('[data-recipient-form-input]');this.recipientFormEmailInput=this.el.querySelector('[data-recipient-form-email-input]');this.disclosure=this.el.querySelector('[data-recipient-disclosure]');this.disclosureCheckbox=this.el.querySelector('[data-recipient-disclosure-checkbox]');this.checkmark=this.disclosure.querySelector('.checkmark');this.checkmarkCheck=this.disclosure.querySelector('.checkmark__check');this.fillAnimation=index_es_transition({el:this.checkmark});this.checkAnimation=index_es_transition({el:this.checkmarkCheck});this.events.register(this.recipientForm,'keydown',event=>this._onKeydown(event));this.events.register(this.disclosure,'toggle',()=>this._onToggle());this.events.register(this.disclosureCheckbox,'change',()=>this._onChange());}_onChange(){this.disclosure.open=this.disclosureCheckbox.checked;}_onKeydown(event){// Prevent input form submission
if(event.key==='Enter'&&event.target.matches('[data-recipient-form-input]')){event.preventDefault();}}_onToggle(){if(this.disclosure.open){this._showRecipientForm();}else{this._hideRecipientForm();}}_showRecipientForm(){if(this.checkmark&&this.checkmarkCheck){this.fillAnimation.animateTo('checked');this.checkAnimation.animateTo('checked');}this.disclosureCheckbox.checked=true;this.recipientFormEmailInput.required=true;}_hideRecipientForm(){if(this.checkmark&&this.checkmarkCheck){this.fillAnimation.animateTo('unchecked');this.checkAnimation.animateTo('unchecked');}this.disclosureCheckbox.checked=false;this.recipientFormEmailInput.required=false;this._resetRecipientForm();}_resetRecipientForm(){this.recipientFormInputs.forEach(el=>{el.value='';if(el.classList.contains('form-field-filled')){el.classList.remove('form-field-filled');}});if(this.recipientForm.classList.contains('recipient-form--has-errors')){this.recipientForm.classList.remove('recipient-form--has-errors');}}}/* harmony default export */const pxs_gift_card_recipient_form_dist_index_es=RecipientForm;;// CONCATENATED MODULE: ./source/scripts/helpers/Images.js
class Images{/**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */preload(images,size){let imageArray=images;if(typeof images==='string'){imageArray=[images];}for(let i=0;i<imageArray.length;i++){this.loadImage(this.getSizedImageUrl(imageArray[i],size));}}/**
   * Loads and caches an image in the browsers cache.
   *
   * @param {string} path - An image url
   */loadImage(path){const image=new Image();image.src=path;return image;}/**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */getSizedImageUrl(src=null,size){if(!size){return null;}if(size==='master'){return this.removeProtocol(src);}const match=src.match(/\.(jpg|jpeg|gif|png|webp|avif|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(match){const prefix=src.split(match[0]);const suffix=match[0];return this.removeProtocol(`${prefix[0]}_${size}${suffix}`);}console.warn(`No ${size} found for '${src}`);return null;}removeProtocol(path){return path.replace(/http(s)?:/,'');}};// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
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
***************************************************************************** *//* global Reflect, Promise */var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};function __extends(d,b){extendStatics(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());}var __assign=function(){__assign=Object.assign||function __assign(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};function __rest(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==="function")for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;}function __decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r;}function __param(paramIndex,decorator){return function(target,key){decorator(target,key,paramIndex);};}function __metadata(metadataKey,metadataValue){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(metadataKey,metadataValue);}function __awaiter(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});}function __generator(thisArg,body){var _={sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;};;;// CONCATENATED MODULE: ./node_modules/@material/base/foundation.js
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
 */var MDCFoundation=/** @class */function(){Object.defineProperty(MDCFoundation,"cssClasses",{});Object.defineProperty(MDCFoundation,"strings",{});Object.defineProperty(MDCFoundation,"numbers",{});Object.defineProperty(MDCFoundation,"defaultAdapter",{});MDCFoundation.prototype.init=function(){// Subclasses should override this method to perform initialization routines (registering events, etc.)
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
var activatedTargets=[];var MDCRippleFoundation=/** @class */function(_super){__extends(MDCRippleFoundation,_super);Object.defineProperty(MDCRippleFoundation,"cssClasses",{});Object.defineProperty(MDCRippleFoundation,"strings",{});Object.defineProperty(MDCRippleFoundation,"numbers",{});Object.defineProperty(MDCRippleFoundation,"defaultAdapter",{});MDCRippleFoundation.prototype.init=function(){var _this=this;var supportsPressRipple=this.supportsPressRipple_();this.registerRootHandlers_(supportsPressRipple);if(supportsPressRipple){var _a=MDCRippleFoundation.cssClasses,ROOT_1=_a.ROOT,UNBOUNDED_1=_a.UNBOUNDED;requestAnimationFrame(function(){_this.adapter_.addClass(ROOT_1);if(_this.adapter_.isUnbounded()){_this.adapter_.addClass(UNBOUNDED_1);// Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
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
if(opts.isUnbounded!==undefined){ripple.unbounded=opts.isUnbounded;}return ripple;};MDCRipple.createAdapter=function(instance){return{};};Object.defineProperty(MDCRipple.prototype,"unbounded",{});MDCRipple.prototype.activate=function(){this.foundation_.activate();};MDCRipple.prototype.deactivate=function(){this.foundation_.deactivate();};MDCRipple.prototype.layout=function(){this.foundation_.layout();};MDCRipple.prototype.getDefaultFoundation=function(){return new MDCRippleFoundation(MDCRipple.createAdapter(this));};MDCRipple.prototype.initialSyncWithDOM=function(){var root=this.root_;this.unbounded='mdcRippleIsUnbounded'in root.dataset;};/**
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
var dist_index_es_EventHandler_1=dist_index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var Events=/*@__PURE__*/getDefaultExportFromCjs(dist_index_es_EventHandler_1);var selectors={};var classes={};var Disclosure=/*#__PURE__*/function(){shopify_cross_border_dist_index_es_createClass(Disclosure,[{},{},{},{},{},{},{}]);return Disclosure;}();if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;}if(!Element.prototype.closest){Element.prototype.closest=function closest(s){var el=this;do{if(el.matches(s))return el;el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}/* harmony default export */const shopify_cross_border_dist_index_es=Disclosure;;// CONCATENATED MODULE: ./source/scripts/sections/StaticFooter.js
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
  */var index_es_deferred={};var index_es_AsyncView=/*#__PURE__*/function(){index_es_createClass$1(AsyncView,null,[{}]);return AsyncView;}();var evEmitter=pxs_complementary_products_dist_index_es_createCommonjsModule(function(module){/**
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
var isNotFocused=document.activeElement&&document.activeElement!=this.element;if(!this.options.accessibility||isNotFocused){return;}var handler=Flickity.keyboardHandlers[event.keyCode];if(handler){handler.call(this);}};Flickity.keyboardHandlers={};// ----- focus ----- //
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
module.exports=factory(flickity,drag,prevNextButton,pageDots,player,addRemoveCell,lazyload);}})(window,function factory(Flickity){return Flickity;});});var ComplementaryProducts=/*#__PURE__*/function(){pxs_complementary_products_dist_index_es_createClass(ComplementaryProducts,[{},{}]);return ComplementaryProducts;}();/* harmony default export */const pxs_complementary_products_dist_index_es=ComplementaryProducts;;// CONCATENATED MODULE: ./source/scripts/sections/Product.js
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
 */var CountdownTimer=/*#__PURE__*/function(){pxs_countdown_timer_dist_index_es_createClass(CountdownTimer,[{},{},{},{},{},{}]);return CountdownTimer;}();/* harmony default export */const pxs_countdown_timer_dist_index_es=CountdownTimer;;// CONCATENATED MODULE: ./source/scripts/sections/DynamicCountdownTimer.js
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
 */var pxs_shoppable_image_dist_index_es_EventHandler_1=pxs_shoppable_image_dist_index_es_createCommonjsModule(function(module,exports){exports.__esModule=true;var EventHandler=/** @class */function(){EventHandler.prototype.register=function(el,event,listener){if(!el||!event||!listener)return null;this.events.push({});el.addEventListener(event,listener);return{};};EventHandler.prototype.unregister=function(_a){var el=_a.el,event=_a.event,listener=_a.listener;if(!el||!event||!listener)return null;this.events=this.events.filter(function(e){return el!==e.el||event!==e.event||listener!==e.listener;});el.removeEventListener(event,listener);return{};};EventHandler.prototype.unregisterAll=function(){this.events.forEach(function(_a){var el=_a.el,event=_a.event,listener=_a.listener;return el.removeEventListener(event,listener);});this.events=[];};return EventHandler;}();exports["default"]=EventHandler;});var pxs_shoppable_image_dist_index_es_EventHandler=pxs_shoppable_image_dist_index_es_unwrapExports(pxs_shoppable_image_dist_index_es_EventHandler_1);var ShoppableImage=/*#__PURE__*/function(){pxs_shoppable_image_dist_index_es_createClass(ShoppableImage,[{},{},{},{},{},{},{},{},{},{},{}]);return ShoppableImage;}();/* harmony default export */const pxs_shoppable_image_dist_index_es=ShoppableImage;;// CONCATENATED MODULE: ./source/scripts/sections/DynamicShoppableImage.js
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