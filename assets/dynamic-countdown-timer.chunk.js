"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[2248],{

/***/ 7233
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DynamicCountdownTimer)
});

;// ./node_modules/@pixelunion/pxs-countdown-timer/dist/index.es.js

/*!
 * @pixelunion/pxs-countdown-timer v3.0.1
 * (c) 2025 Pixel Union
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var CountdownTimer = /*#__PURE__*/function () {
  function CountdownTimer(sectionEl) {
    _classCallCheck(this, CountdownTimer);
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

    // `Date.parse()` is usually discouraged, however, it's okay in this case
    // since we know the string we're passing in is ISO 8601 compliant.
    this.targetDate = Date.parse(this.dateTimeEl.dateTime);
    this.daysInMs = 1000 * 60 * 60 * 24;
    this.hoursInMs = this.daysInMs / 24;
    this.minutesInMs = this.hoursInMs / 60;
    this.secondsInMs = this.minutesInMs / 60;
    this.timeoutId = null;
    this.isLoading = true;
    this.startTimer();
  }
  _createClass(CountdownTimer, [{
    key: "updateLoadingState",
    value: function updateLoadingState() {
      this.countDownTimerEl.classList.remove('countdown-timer--loading');
    }

    /**
     * Implements a self-adjusting timer.
     * 
     * setTimeout has no guarantees that it will be accurate. Therefore,
     * we'll calculate how much "drift" (i.e. delay per each iteration of setTimeout)
     * has occurred and keep adjusting the setTimeout delay accordingly.
     */
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this = this;
      var interval = 1000;
      var expectedTime = Date.now() + interval;

      // setTimeout removes everything from the main thread and causes delays.
      // No need to run it if countdown has completed.
      if (this.targetDate <= Date.now()) {
        this.updateLoadingState();
        this.handleCountDownComplete();
        return;
      }
      var countDown = function countDown() {
        var currentDate = Date.now();
        var timeDiff = _this.targetDate - currentDate;
        if (timeDiff <= 0) {
          _this.stopTimer();
          _this.handleCountDownComplete();
          return;
        }
        var remainingTime = _this.convertTime(timeDiff);
        var drift = currentDate - expectedTime;
        expectedTime += interval;
        if (_this.isLoading) _this.updateLoadingState();
        _this.updateDom(remainingTime);
        _this.timeoutId = setTimeout(countDown, Math.max(0, interval - drift));
      };
      this.timeoutId = setTimeout(countDown, interval);
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearTimeout(this.timeoutId);
    }
  }, {
    key: "convertTime",
    value: function convertTime(timeInMs) {
      var days = parseInt(timeInMs / this.daysInMs, 10);
      timeInMs -= days * this.daysInMs;
      var hours = parseInt(timeInMs / this.hoursInMs, 10);
      timeInMs -= hours * this.hoursInMs;
      var minutes = parseInt(timeInMs / this.minutesInMs, 10);
      timeInMs -= minutes * this.minutesInMs;
      var seconds = parseInt(timeInMs / this.secondsInMs, 10);
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  }, {
    key: "updateDom",
    value: function updateDom(dateObj) {
      var days = dateObj.days,
        hours = dateObj.hours,
        minutes = dateObj.minutes,
        seconds = dateObj.seconds;

      // Avoid using `innerText` or `innerHTML` as they trigger computationally expensive reflows.
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext.
      this.daysEl.textContent = days;
      this.hoursEl.textContent = hours;
      this.minutesEl.textContent = minutes;
      this.secondsEl.textContent = seconds;
    }
  }, {
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
  }]);
  return CountdownTimer;
}();

/* harmony default export */ const index_es = (CountdownTimer);

// EXTERNAL MODULE: ./source/scripts/components/ProductGridItem.js + 2 modules
var ProductGridItem = __webpack_require__(9441);
// EXTERNAL MODULE: ./source/scripts/helpers/Ripple.js + 9 modules
var Ripple = __webpack_require__(1126);
;// ./source/scripts/sections/DynamicCountdownTimer.js




class DynamicCountdownTimer {
  constructor(section) {
    this.el = section.el;
    this.product = this.el.querySelector('[data-product-item]');
    new index_es(this.el);

    (0,Ripple/* setupRippleEffect */.b)(this.el);

    if (this.product) {
      this.productItems = new ProductGridItem/* default */.A({
        el: this.product,
        id: section.id,
      });
    }
  }

  onSectionUnload() {
    if (this.product) {
      this.productItems.unload();
    }
  }
}


/***/ }

}]);