"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5512],{

/***/ 3309
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DynamicVideo)
});

// EXTERNAL MODULE: ./node_modules/scriptjs/dist/script.js
var script = __webpack_require__(2491);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
;// ./source/scripts/components/Youtube.js


const api = 'https://www.youtube.com/iframe_api';
let apiLoadedCallbacks = [];
let apiLoaded = false;

window.onYouTubeIframeAPIReady = () => {
  apiLoadedCallbacks.forEach(apiLoadedCallback => apiLoadedCallback());
  apiLoadedCallbacks = [];
  apiLoaded = true;
};

class Youtube {
  constructor({ el, videoUrl, loop }) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i; // eslint-disable-line no-useless-escape

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
      debugger
      script_default()(api);
    }
  }

  play() {
    return new Promise(resolve => {
      this.onPlayCallback = resolve;

      if (this.isReady) {
        this.player.playVideo();
      } else {
        this.onReadyCallback = () => { this.player.playVideo(); };
      }
    });
  }

  pause() {
    return new Promise(resolve => {
      this.onPlayCallback = resolve;

      if (this.isReady) {
        this.player.pauseVideo();
      } else {
        this.onReadyCallback = () => { this.player.pauseVideo(); };
      }
    });
  }

  autoplay() {
    return new Promise(resolve => {
      this.onPlayCallback = resolve;

      if (this.isReady) {
        this.player.playVideo();
        this.player.mute();
      } else {
        this.onReadyCallback = () => {
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
      rel: 0,
    };

    if (this.loop) {
      // This is required to allow 'loop' to work based on the YouTube api
      playerVars.playlist = this.id;
    }

    this.player = new YT.Player(this.el, {
      videoId: this.id,
      playerVars,
      events: {
        onReady: this.onReady,
        onStateChange: this.onStateChange,
      },
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
    if (
      this.onPlayCallback
      && state === YT.PlayerState.BUFFERING
    ) {
      this.onPlayCallback();
      this.onPlayCallback = null;
    }
  }
}

;// ./source/scripts/components/Vimeo.js


const Vimeo_api = 'https://player.vimeo.com/api/player.js';
let Vimeo_apiLoaded = false;

class VimeoPlayer {
  constructor({ el, videoUrl }) {
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
      script_default()(Vimeo_api, this.onApiLoaded);
    }
  }

  play() {
    return new Promise(resolve => {
      this.onProgressCallback = resolve;

      if (Vimeo_apiLoaded) {
        this.player.on('play', this.onProgress);
        this.player.play();
      } else {
        this.onReadyCallback = () => {
          this.player.on('play', this.onProgress);
          this.player.play();
        };
      }
    });
  }

  pause() {
    return new Promise(resolve => {
      this.onProgressCallback = resolve;

      if (Vimeo_apiLoaded) {
        this.player.on('pause', this.onProgress);
        this.player.pause();
      } else {
        this.onReadyCallback = () => {
          this.player.on('pause', this.onProgress);
          this.player.pause();
        };
      }
    });
  }

  autoplay() {
    return new Promise(resolve => {
      this.onProgressCallback = resolve;

      if (Vimeo_apiLoaded) {
        this.player.on('play', this.onProgress);
        this.player.setVolume(0);
        this.player.play();
      } else {
        this.onReadyCallback = () => {
          this.player.on('play', this.onProgress);
          this.player.setVolume(0);
          this.player.play();
        };
      }
    });
  }

  unload() {
    this.player
      .unload()
      .catch();
  }

  _onApiLoaded() {
    this.player = new window.Vimeo.Player(this.el, { id: this.id });

    this.player
      .ready()
      .then()
      .catch();

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

;// ./source/scripts/components/Video.js



class Video {
  constructor(el, options) {
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
      loop: this.options && this.options.loop,
    };

    switch (this.platform) {
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

    this.video.play()
      .then(() => {
        this.el.classList.add('video-transitioning');

        setTimeout(() => {
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

    this.video.autoplay()
      .then(() => {
        this.el.classList.add('video-transitioning');

        setTimeout(() => {
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

;// ./source/scripts/sections/DynamicVideo.js


class DynamicVideo {
  constructor(section) {
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
      const thresholds = { play: 0.5, pause: 0.2 };

      this.playPauseObserver = new IntersectionObserver(entries => {
        const { intersectionRatio, isIntersecting } = entries[0];

        if (intersectionRatio >= thresholds.play && isIntersecting && !this.hasPlayed) {
          // videoEl has just scrolled into view and is at least 50% visible: play video
          this.video._autoplay();
          this.hasPlayed = true;
        } else if (intersectionRatio <= thresholds.pause && isIntersecting === false) {
          // videoEl has scrolled out of view and is less than 20% visible: pause video
          this.video._onPauseClick();
        }
      },
      {
        threshold: [thresholds.pause, thresholds.play],
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


/***/ }

}]);