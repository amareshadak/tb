function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4], {
  /***/
  "./node_modules/ngx-bootstrap/carousel/fesm2015/ngx-bootstrap-carousel.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/ngx-bootstrap/carousel/fesm2015/ngx-bootstrap-carousel.js ***!
    \********************************************************************************/

  /*! exports provided: CarouselComponent, CarouselModule, SlideComponent, CarouselConfig */

  /***/
  function node_modulesNgxBootstrapCarouselFesm2015NgxBootstrapCarouselJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CarouselComponent", function () {
      return CarouselComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CarouselModule", function () {
      return CarouselModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SlideComponent", function () {
      return SlideComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CarouselConfig", function () {
      return CarouselConfig;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ngx-bootstrap/utils */
    "./node_modules/ngx-bootstrap/utils/fesm2015/ngx-bootstrap-utils.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */


    var CarouselConfig = function CarouselConfig() {
      _classCallCheck(this, CarouselConfig);

      /**
       * Default interval of auto changing of slides
       */
      this.interval = 5000;
      /**
       * Is loop of auto changing of slides can be paused
       */

      this.noPause = false;
      /**
       * Is slides can wrap from the last to the first slide
       */

      this.noWrap = false;
      /**
       * Show carousel-indicators
       */

      this.showIndicators = true;
    };

    CarouselConfig.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /** @enum {number} */

    var Direction = {
      UNKNOWN: 0,
      NEXT: 1,
      PREV: 2
    };
    Direction[Direction.UNKNOWN] = "UNKNOWN";
    Direction[Direction.NEXT] = "NEXT";
    Direction[Direction.PREV] = "PREV";
    /**
     * Base element to create carousel
     */

    var CarouselComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} config
       * @param {?} ngZone
       */
      function CarouselComponent(config, ngZone) {
        _classCallCheck(this, CarouselComponent);

        this.ngZone = ngZone;
        /**
         * Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property
         */

        this.activeSlideChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](false);
        this._slides = new ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["LinkedList"]();
        this.destroyed = false;
        Object.assign(this, config);
      }
      /**
       * Index of currently displayed slide(started for 0)
       * @param {?} index
       * @return {?}
       */


      _createClass(CarouselComponent, [{
        key: "ngOnDestroy",

        /**
         * @return {?}
         */
        value: function ngOnDestroy() {
          this.destroyed = true;
        }
        /**
         * Adds new slide. If this slide is first in collection - set it as active
         * and starts auto changing
         * @param {?} slide
         * @return {?}
         */

      }, {
        key: "addSlide",
        value: function addSlide(slide) {
          this._slides.add(slide);

          if (this._slides.length === 1) {
            this._currentActiveSlide = void 0;
            this.activeSlide = 0;
            this.play();
          }
        }
        /**
         * Removes specified slide. If this slide is active - will roll to another
         * slide
         * @param {?} slide
         * @return {?}
         */

      }, {
        key: "removeSlide",
        value: function removeSlide(slide) {
          var _this = this;

          var
          /** @type {?} */
          remIndex = this._slides.indexOf(slide);

          if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            var
            /** @type {?} */
            nextSlideIndex = void 0;

            if (this._slides.length > 1) {
              // if this slide last - will roll to first slide, if noWrap flag is
              // FALSE or to previous, if noWrap is TRUE in case, if this slide in
              // middle of collection, index of next slide is same to removed
              nextSlideIndex = !this.isLast(remIndex) ? remIndex : this.noWrap ? remIndex - 1 : 0;
            }

            this._slides.remove(remIndex); // prevents exception with changing some value after checking


            setTimeout(function () {
              _this._select(nextSlideIndex);
            }, 0);
          } else {
            this._slides.remove(remIndex);

            var
            /** @type {?} */
            currentSlideIndex = this.getCurrentSlideIndex();
            setTimeout(function () {
              // after removing, need to actualize index of current active slide
              _this._currentActiveSlide = currentSlideIndex;

              _this.activeSlideChange.emit(_this._currentActiveSlide);
            }, 0);
          }
        }
        /**
         * Rolling to next slide
         * @param {?=} force
         * @return {?}
         */

      }, {
        key: "nextSlide",
        value: function nextSlide() {
          var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
        }
        /**
         * Rolling to previous slide
         * @param {?=} force
         * @return {?}
         */

      }, {
        key: "previousSlide",
        value: function previousSlide() {
          var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
        }
        /**
         * Rolling to specified slide
         * @param {?} index
         * @return {?}
         */

      }, {
        key: "selectSlide",
        value: function selectSlide(index) {
          this.activeSlide = index;
        }
        /**
         * Starts a auto changing of slides
         * @return {?}
         */

      }, {
        key: "play",
        value: function play() {
          if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
          }
        }
        /**
         * Stops a auto changing of slides
         * @return {?}
         */

      }, {
        key: "pause",
        value: function pause() {
          if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
          }
        }
        /**
         * Finds and returns index of currently displayed slide
         * @return {?}
         */

      }, {
        key: "getCurrentSlideIndex",
        value: function getCurrentSlideIndex() {
          return this._slides.findIndex(function (slide) {
            return slide.active;
          });
        }
        /**
         * Defines, whether the specified index is last in collection
         * @param {?} index
         * @return {?}
         */

      }, {
        key: "isLast",
        value: function isLast(index) {
          return index + 1 >= this._slides.length;
        }
        /**
         * Defines next slide index, depending of direction
         * @param {?} direction
         * @param {?} force
         * @return {?}
         */

      }, {
        key: "findNextSlideIndex",
        value: function findNextSlideIndex(direction, force) {
          var
          /** @type {?} */
          nextSlideIndex = 0;

          if (!force && this.isLast(this.activeSlide) && direction !== Direction.PREV && this.noWrap) {
            return void 0;
          }

          switch (direction) {
            case Direction.NEXT:
              // if this is last slide, not force, looping is disabled
              // and need to going forward - select current slide, as a next
              nextSlideIndex = !this.isLast(this._currentActiveSlide) ? this._currentActiveSlide + 1 : !force && this.noWrap ? this._currentActiveSlide : 0;
              break;

            case Direction.PREV:
              // if this is first slide, not force, looping is disabled
              // and need to going backward - select current slide, as a next
              nextSlideIndex = this._currentActiveSlide > 0 ? this._currentActiveSlide - 1 : !force && this.noWrap ? this._currentActiveSlide : this._slides.length - 1;
              break;

            default:
              throw new Error('Unknown direction');
          }

          return nextSlideIndex;
        }
        /**
         * Sets a slide, which specified through index, as active
         * @param {?} index
         * @return {?}
         */

      }, {
        key: "_select",
        value: function _select(index) {
          if (isNaN(index)) {
            this.pause();
            return;
          }

          var
          /** @type {?} */
          currentSlide = this._slides.get(this._currentActiveSlide);

          if (currentSlide) {
            currentSlide.active = false;
          }

          var
          /** @type {?} */
          nextSlide = this._slides.get(index);

          if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
          }
        }
        /**
         * Starts loop of auto changing of slides
         * @return {?}
         */

      }, {
        key: "restartTimer",
        value: function restartTimer() {
          var _this2 = this;

          this.resetTimer();
          var
          /** @type {?} */
          interval = +this.interval;

          if (!isNaN(interval) && interval > 0) {
            this.currentInterval = this.ngZone.runOutsideAngular(function () {
              return setInterval(function () {
                var
                /** @type {?} */
                nInterval = +_this2.interval;

                _this2.ngZone.run(function () {
                  if (_this2.isPlaying && !isNaN(_this2.interval) && nInterval > 0 && _this2.slides.length) {
                    _this2.nextSlide();
                  } else {
                    _this2.pause();
                  }
                });
              }, interval);
            });
          }
        }
        /**
         * Stops loop of auto changing of slides
         * @return {?}
         */

      }, {
        key: "resetTimer",
        value: function resetTimer() {
          if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
          }
        }
      }, {
        key: "activeSlide",
        set: function set(index) {
          if (this._slides.length && index !== this._currentActiveSlide) {
            this._select(index);
          }
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          return this._currentActiveSlide;
        }
        /**
         * Delay of item cycling in milliseconds. If false, carousel won't cycle
         * automatically.
         * @return {?}
         */

      }, {
        key: "interval",
        get: function get() {
          return this._interval;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
          this._interval = value;
          this.restartTimer();
        }
        /**
         * @return {?}
         */

      }, {
        key: "slides",
        get: function get() {
          return this._slides.toArray();
        }
        /**
         * @return {?}
         */

      }, {
        key: "isBs4",
        get: function get() {
          return !Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        }
      }]);

      return CarouselComponent;
    }();

    CarouselComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'carousel',
        template: "<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" (mouseup)=\"play()\" class=\"carousel slide\">\n  <ol class=\"carousel-indicators\" *ngIf=\"showIndicators && slides.length > 1\">\n    <li *ngFor=\"let slidez of slides; let i = index;\" [class.active]=\"slidez.active === true\" (click)=\"selectSlide(i)\"></li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  <a class=\"left carousel-control carousel-control-prev\" [class.disabled]=\"activeSlide === 0 && noWrap\" (click)=\"previousSlide()\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"isBs4\" class=\"sr-only\">Previous</span>\n  </a>\n  <a class=\"right carousel-control carousel-control-next\" (click)=\"nextSlide()\"  [class.disabled]=\"isLast(activeSlide) && noWrap\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n"
      }]
    }];
    /** @nocollapse */

    CarouselComponent.ctorParameters = function () {
      return [{
        type: CarouselConfig
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
      }];
    };

    CarouselComponent.propDecorators = {
      "noWrap": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "noPause": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "showIndicators": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "activeSlideChange": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "activeSlide": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "interval": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var SlideComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} carousel
       */
      function SlideComponent(carousel) {
        _classCallCheck(this, SlideComponent);

        /**
         * Wraps element by appropriate CSS classes
         */
        this.addClass = true;
        this.carousel = carousel;
      }
      /**
       * Fires changes in container collection after adding a new slide instance
       * @return {?}
       */


      _createClass(SlideComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.carousel.addSlide(this);
        }
        /**
         * Fires changes in container collection after removing of this slide instance
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.carousel.removeSlide(this);
        }
      }]);

      return SlideComponent;
    }();

    SlideComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'slide',
        template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  ",
        host: {
          '[attr.aria-hidden]': '!active'
        }
      }]
    }];
    /** @nocollapse */

    SlideComponent.ctorParameters = function () {
      return [{
        type: CarouselComponent
      }];
    };

    SlideComponent.propDecorators = {
      "active": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.active']
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "addClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.item']
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.carousel-item']
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var CarouselModule =
    /*#__PURE__*/
    function () {
      function CarouselModule() {
        _classCallCheck(this, CarouselModule);
      }

      _createClass(CarouselModule, null, [{
        key: "forRoot",

        /**
         * @return {?}
         */
        value: function forRoot() {
          return {
            ngModule: CarouselModule,
            providers: []
          };
        }
      }]);

      return CarouselModule;
    }();

    CarouselModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
        declarations: [SlideComponent, CarouselComponent],
        exports: [SlideComponent, CarouselComponent],
        providers: [CarouselConfig]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1jYXJvdXNlbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtYm9vdHN0cmFwL2Nhcm91c2VsL3NsaWRlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb25maWcge1xuICAvKiogRGVmYXVsdCBpbnRlcnZhbCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlcyAqL1xuICBpbnRlcnZhbCA9IDUwMDA7XG5cbiAgLyoqIElzIGxvb3Agb2YgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXMgY2FuIGJlIHBhdXNlZCAqL1xuICBub1BhdXNlID0gZmFsc2U7XG5cbiAgLyoqIElzIHNsaWRlcyBjYW4gd3JhcCBmcm9tIHRoZSBsYXN0IHRvIHRoZSBmaXJzdCBzbGlkZSAqL1xuICBub1dyYXAgPSBmYWxzZTtcblxuICAvKiogU2hvdyBjYXJvdXNlbC1pbmRpY2F0b3JzICovXG4gIHNob3dJbmRpY2F0b3JzID0gdHJ1ZTtcbn1cbiIsIi8vIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnRcbi8qKipcbiAqIHBhdXNlIChub3QgeWV0IHN1cHBvcnRlZCkgKD9zdHJpbmc9J2hvdmVyJykgLSBldmVudCBncm91cCBuYW1lIHdoaWNoIHBhdXNlc1xuICogdGhlIGN5Y2xpbmcgb2YgdGhlIGNhcm91c2VsLCBpZiBob3ZlciBwYXVzZXMgb24gbW91c2VlbnRlciBhbmQgcmVzdW1lcyBvblxuICogbW91c2VsZWF2ZSBrZXlib2FyZCAobm90IHlldCBzdXBwb3J0ZWQpICg/Ym9vbGVhbj10cnVlKSAtIGlmIGZhbHNlXG4gKiBjYXJvdXNlbCB3aWxsIG5vdCByZWFjdCB0byBrZXlib2FyZCBldmVudHNcbiAqIG5vdGU6IHN3aXBpbmcgbm90IHlldCBzdXBwb3J0ZWRcbiAqL1xuLyoqKipcbiAqIFByb2JsZW1zOlxuICogMSkgaWYgd2Ugc2V0IGFuIGFjdGl2ZSBzbGlkZSB2aWEgbW9kZWwgY2hhbmdlcywgLmFjdGl2ZSBjbGFzcyByZW1haW5zIG9uIGFcbiAqIGN1cnJlbnQgc2xpZGUuXG4gKiAyKSBpZiB3ZSBoYXZlIG9ubHkgb25lIHNsaWRlLCB3ZSBzaG91bGRuJ3Qgc2hvdyBwcmV2L25leHQgbmF2IGJ1dHRvbnNcbiAqIDMpIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGUgaXMgYWN0aXZlIGFuZCBub1dyYXAgaXMgdHJ1ZSwgdGhlcmUgc2hvdWxkIGJlXG4gKiBcImRpc2FibGVkXCIgY2xhc3Mgb24gdGhlIG5hdiBidXR0b25zLlxuICogNCkgZGVmYXVsdCBpbnRlcnZhbCBzaG91bGQgYmUgZXF1YWwgNTAwMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNCczMsIExpbmtlZExpc3QgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLmNvbmZpZyc7XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gIFVOS05PV04sXG4gIE5FWFQsXG4gIFBSRVZcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgdG8gY3JlYXRlIGNhcm91c2VsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBJZiBgdHJ1ZWAgw6LCgMKUIGNhcm91c2VsIHdpbGwgbm90IGN5Y2xlIGNvbnRpbnVvdXNseSBhbmQgd2lsbCBoYXZlIGhhcmQgc3RvcHMgKHByZXZlbnQgbG9vcGluZykgKi9cbiAgQElucHV0KCkgbm9XcmFwOiBib29sZWFuO1xuICAvKiogIElmIGB0cnVlYCDDosKAwpQgd2lsbCBkaXNhYmxlIHBhdXNpbmcgb24gY2Fyb3VzZWwgbW91c2UgaG92ZXIgKi9cbiAgQElucHV0KCkgbm9QYXVzZTogYm9vbGVhbjtcbiAgLyoqICBJZiBgdHJ1ZWAgw6LCgMKUIGNhcm91c2VsLWluZGljYXRvcnMgYXJlIHZpc2libGUgICovXG4gIEBJbnB1dCgpIHNob3dJbmRpY2F0b3JzOiBib29sZWFuO1xuXG4gIC8qKiBXaWxsIGJlIGVtaXR0ZWQgd2hlbiBhY3RpdmUgc2xpZGUgaGFzIGJlZW4gY2hhbmdlZC4gUGFydCBvZiB0d28td2F5LWJpbmRhYmxlIFsoYWN0aXZlU2xpZGUpXSBwcm9wZXJ0eSAqL1xuICBAT3V0cHV0KClcbiAgYWN0aXZlU2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICAvKiogSW5kZXggb2YgY3VycmVudGx5IGRpc3BsYXllZCBzbGlkZShzdGFydGVkIGZvciAwKSAqL1xuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlU2xpZGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoICYmIGluZGV4ICE9PSB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxheSBvZiBpdGVtIGN5Y2xpbmcgaW4gbWlsbGlzZWNvbmRzLiBJZiBmYWxzZSwgY2Fyb3VzZWwgd29uJ3QgY3ljbGVcbiAgICogYXV0b21hdGljYWxseS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcbiAgfVxuXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgZ2V0IHNsaWRlcygpOiBTbGlkZUNvbXBvbmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHJvdGVjdGVkIGN1cnJlbnRJbnRlcnZhbDogYW55O1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRBY3RpdmVTbGlkZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgX2ludGVydmFsOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfc2xpZGVzOiBMaW5rZWRMaXN0PFNsaWRlQ29tcG9uZW50PiA9IG5ldyBMaW5rZWRMaXN0PFNsaWRlQ29tcG9uZW50PigpO1xuICBwcm90ZWN0ZWQgaXNQbGF5aW5nOiBib29sZWFuO1xuICBwcm90ZWN0ZWQgZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgZ2V0IGlzQnM0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNCczMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ2Fyb3VzZWxDb25maWcsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBuZXcgc2xpZGUuIElmIHRoaXMgc2xpZGUgaXMgZmlyc3QgaW4gY29sbGVjdGlvbiAtIHNldCBpdCBhcyBhY3RpdmVcbiAgICogYW5kIHN0YXJ0cyBhdXRvIGNoYW5naW5nXG4gICAqIEBwYXJhbSBzbGlkZVxuICAgKi9cbiAgYWRkU2xpZGUoc2xpZGU6IFNsaWRlQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5fc2xpZGVzLmFkZChzbGlkZSk7XG4gICAgaWYgKHRoaXMuX3NsaWRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IHZvaWQgMDtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSAwO1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3BlY2lmaWVkIHNsaWRlLiBJZiB0aGlzIHNsaWRlIGlzIGFjdGl2ZSAtIHdpbGwgcm9sbCB0byBhbm90aGVyXG4gICAqIHNsaWRlXG4gICAqIEBwYXJhbSBzbGlkZVxuICAgKi9cbiAgcmVtb3ZlU2xpZGUoc2xpZGU6IFNsaWRlQ29tcG9uZW50KTogdm9pZCB7XG4gICAgY29uc3QgcmVtSW5kZXggPSB0aGlzLl9zbGlkZXMuaW5kZXhPZihzbGlkZSk7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID09PSByZW1JbmRleCkge1xuICAgICAgLy8gcmVtb3Zpbmcgb2YgYWN0aXZlIHNsaWRlXG4gICAgICBsZXQgbmV4dFNsaWRlSW5kZXg6IG51bWJlciA9IHZvaWQgMDtcbiAgICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBpZiB0aGlzIHNsaWRlIGxhc3QgLSB3aWxsIHJvbGwgdG8gZmlyc3Qgc2xpZGUsIGlmIG5vV3JhcCBmbGFnIGlzXG4gICAgICAgIC8vIEZBTFNFIG9yIHRvIHByZXZpb3VzLCBpZiBub1dyYXAgaXMgVFJVRSBpbiBjYXNlLCBpZiB0aGlzIHNsaWRlIGluXG4gICAgICAgIC8vIG1pZGRsZSBvZiBjb2xsZWN0aW9uLCBpbmRleCBvZiBuZXh0IHNsaWRlIGlzIHNhbWUgdG8gcmVtb3ZlZFxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9ICF0aGlzLmlzTGFzdChyZW1JbmRleClcbiAgICAgICAgICA/IHJlbUluZGV4XG4gICAgICAgICAgOiB0aGlzLm5vV3JhcCA/IHJlbUluZGV4IC0gMSA6IDA7XG4gICAgICB9XG4gICAgICB0aGlzLl9zbGlkZXMucmVtb3ZlKHJlbUluZGV4KTtcblxuICAgICAgLy8gcHJldmVudHMgZXhjZXB0aW9uIHdpdGggY2hhbmdpbmcgc29tZSB2YWx1ZSBhZnRlciBjaGVja2luZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdChuZXh0U2xpZGVJbmRleCk7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XG4gICAgICBjb25zdCBjdXJyZW50U2xpZGVJbmRleCA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlSW5kZXgoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBhZnRlciByZW1vdmluZywgbmVlZCB0byBhY3R1YWxpemUgaW5kZXggb2YgY3VycmVudCBhY3RpdmUgc2xpZGVcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID0gY3VycmVudFNsaWRlSW5kZXg7XG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gbmV4dCBzbGlkZVxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiB0cnVlIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWdcbiAgICovXG4gIG5leHRTbGlkZShmb3JjZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuZmluZE5leHRTbGlkZUluZGV4KERpcmVjdGlvbi5ORVhULCBmb3JjZSk7XG4gIH1cblxuICAvKipcbiAgICogUm9sbGluZyB0byBwcmV2aW91cyBzbGlkZVxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiB0cnVlIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWdcbiAgICovXG4gIHByZXZpb3VzU2xpZGUoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uUFJFViwgZm9yY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gc3BlY2lmaWVkIHNsaWRlXG4gICAqIEBwYXJhbSBpbmRleDoge251bWJlcn0gaW5kZXggb2Ygc2xpZGUsIHdoaWNoIG11c3QgYmUgc2hvd25cbiAgICovXG4gIHNlbGVjdFNsaWRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGEgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcbiAgICovXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzUGxheWluZykge1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgYSBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcGF1c2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm5vUGF1c2UpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlc2V0VGltZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgYW5kIHJldHVybnMgaW5kZXggb2YgY3VycmVudGx5IGRpc3BsYXllZCBzbGlkZVxuICAgKi9cbiAgZ2V0Q3VycmVudFNsaWRlSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVzLmZpbmRJbmRleCgoc2xpZGU6IFNsaWRlQ29tcG9uZW50KSA9PiBzbGlkZS5hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMsIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBpbmRleCBpcyBsYXN0IGluIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBpc0xhc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCArIDEgPj0gdGhpcy5fc2xpZGVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIG5leHQgc2xpZGUgaW5kZXgsIGRlcGVuZGluZyBvZiBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGRpcmVjdGlvbjogRGlyZWN0aW9uKFVOS05PV058UFJFVnxORVhUKVxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiBUUlVFIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWcsIGVsc2Ugd2lsbFxuICAgKiAgIHJldHVybiB1bmRlZmluZWQgaWYgbmV4dCBzbGlkZSByZXF1aXJlIHdyYXBwaW5nXG4gICAqL1xuICBwcml2YXRlIGZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb246IERpcmVjdGlvbiwgZm9yY2U6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGxldCBuZXh0U2xpZGVJbmRleCA9IDA7XG5cbiAgICBpZiAoXG4gICAgICAhZm9yY2UgJiZcbiAgICAgICh0aGlzLmlzTGFzdCh0aGlzLmFjdGl2ZVNsaWRlKSAmJlxuICAgICAgICBkaXJlY3Rpb24gIT09IERpcmVjdGlvbi5QUkVWICYmXG4gICAgICAgIHRoaXMubm9XcmFwKVxuICAgICkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSBEaXJlY3Rpb24uTkVYVDpcbiAgICAgICAgLy8gaWYgdGhpcyBpcyBsYXN0IHNsaWRlLCBub3QgZm9yY2UsIGxvb3BpbmcgaXMgZGlzYWJsZWRcbiAgICAgICAgLy8gYW5kIG5lZWQgdG8gZ29pbmcgZm9yd2FyZCAtIHNlbGVjdCBjdXJyZW50IHNsaWRlLCBhcyBhIG5leHRcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAhdGhpcy5pc0xhc3QodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKVxuICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlICsgMVxuICAgICAgICAgIDogIWZvcmNlICYmIHRoaXMubm9XcmFwID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlIDogMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERpcmVjdGlvbi5QUkVWOlxuICAgICAgICAvLyBpZiB0aGlzIGlzIGZpcnN0IHNsaWRlLCBub3QgZm9yY2UsIGxvb3BpbmcgaXMgZGlzYWJsZWRcbiAgICAgICAgLy8gYW5kIG5lZWQgdG8gZ29pbmcgYmFja3dhcmQgLSBzZWxlY3QgY3VycmVudCBzbGlkZSwgYXMgYSBuZXh0XG4gICAgICAgIG5leHRTbGlkZUluZGV4ID1cbiAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPiAwXG4gICAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSAtIDFcbiAgICAgICAgICAgIDogIWZvcmNlICYmIHRoaXMubm9XcmFwXG4gICAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZVxuICAgICAgICAgICAgOiB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGlyZWN0aW9uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBzbGlkZSwgd2hpY2ggc3BlY2lmaWVkIHRocm91Z2ggaW5kZXgsIGFzIGFjdGl2ZVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlzTmFOKGluZGV4KSkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHRoaXMuX3NsaWRlcy5nZXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcbiAgICBpZiAoY3VycmVudFNsaWRlKSB7XG4gICAgICBjdXJyZW50U2xpZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG5leHRTbGlkZSA9IHRoaXMuX3NsaWRlcy5nZXQoaW5kZXgpO1xuICAgIGlmIChuZXh0U2xpZGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgICAgbmV4dFNsaWRlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbG9vcCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcHJpdmF0ZSByZXN0YXJ0VGltZXIoKSB7XG4gICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSArdGhpcy5pbnRlcnZhbDtcbiAgICBpZiAoIWlzTmFOKGludGVydmFsKSAmJiBpbnRlcnZhbCA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nICYmXG4gICAgICAgICAgICAgICFpc05hTih0aGlzLmludGVydmFsKSAmJlxuICAgICAgICAgICAgICBuSW50ZXJ2YWwgPiAwICYmXG4gICAgICAgICAgICAgIHRoaXMuc2xpZGVzLmxlbmd0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwcml2YXRlIHJlc2V0VGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudEludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuY3VycmVudEludGVydmFsKTtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2xpZGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnIWFjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIElzIGN1cnJlbnQgc2xpZGUgYWN0aXZlICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKiBXcmFwcyBlbGVtZW50IGJ5IGFwcHJvcHJpYXRlIENTUyBjbGFzc2VzICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXRlbScpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2Fyb3VzZWwtaXRlbScpXG4gIGFkZENsYXNzID0gdHJ1ZTtcblxuICAvKiogTGluayB0byBQYXJlbnQoY29udGFpbmVyLWNvbGxlY3Rpb24pIGNvbXBvbmVudCAqL1xuICBwcm90ZWN0ZWQgY2Fyb3VzZWw6IENhcm91c2VsQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsOiBDYXJvdXNlbENvbXBvbmVudCkge1xuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcbiAgfVxuXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIGFkZGluZyBhIG5ldyBzbGlkZSBpbnN0YW5jZSAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhcm91c2VsLmFkZFNsaWRlKHRoaXMpO1xuICB9XG5cbiAgLyoqIEZpcmVzIGNoYW5nZXMgaW4gY29udGFpbmVyIGNvbGxlY3Rpb24gYWZ0ZXIgcmVtb3Zpbmcgb2YgdGhpcyBzbGlkZSBpbnN0YW5jZSAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhcm91c2VsLnJlbW92ZVNsaWRlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vc2xpZGUuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbU2xpZGVDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1NsaWRlQ29tcG9uZW50LCBDYXJvdXNlbENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0Nhcm91c2VsQ29uZmlnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBDYXJvdXNlbE1vZHVsZSwgcHJvdmlkZXJzOiBbXSB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7d0JBS2EsSUFBSTs7Ozt1QkFHTCxLQUFLOzs7O3NCQUdOLEtBQUs7Ozs7OEJBR0csSUFBSTs7OztZQVp0QixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcUNYOzs7OztJQXNERSxZQUFZLE1BQXNCLEVBQVUsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7Ozs7aUNBNUNoQixJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUM7dUJBb0N6QixJQUFJLFVBQVUsRUFBa0I7eUJBRTFELEtBQUs7UUFPekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0I7Ozs7OztRQTFDRyxXQUFXLENBQUMs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

    /***/
  },

  /***/
  "./node_modules/ngx-bootstrap/collapse/fesm2015/ngx-bootstrap-collapse.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/ngx-bootstrap/collapse/fesm2015/ngx-bootstrap-collapse.js ***!
    \********************************************************************************/

  /*! exports provided: CollapseDirective, CollapseModule */

  /***/
  function node_modulesNgxBootstrapCollapseFesm2015NgxBootstrapCollapseJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CollapseDirective", function () {
      return CollapseDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CollapseModule", function () {
      return CollapseModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */


    var CollapseDirective =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} _el
       * @param {?} _renderer
       */
      function CollapseDirective(_el, _renderer) {
        _classCallCheck(this, CollapseDirective);

        this._el = _el;
        this._renderer = _renderer;
        /**
         * This event fires as soon as content collapses
         */

        this.collapsed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * This event fires as soon as content becomes visible
         */

        this.expanded = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); // shown

        this.isExpanded = true; // hidden

        this.isCollapsed = false; // stale state

        this.isCollapse = true; // animation state

        this.isCollapsing = false;
      }
      /**
       * A flag indicating visibility of content (shown or hidden)
       * @param {?} value
       * @return {?}
       */


      _createClass(CollapseDirective, [{
        key: "toggle",

        /**
         * allows to manually toggle content visibility
         * @return {?}
         */
        value: function toggle() {
          if (this.isExpanded) {
            this.hide();
          } else {
            this.show();
          }
        }
        /**
         * allows to manually hide content
         * @return {?}
         */

      }, {
        key: "hide",
        value: function hide() {
          this.isCollapse = false;
          this.isCollapsing = true;
          this.isExpanded = false;
          this.isCollapsed = true;
          this.isCollapse = true;
          this.isCollapsing = false;
          this.display = 'none';
          this.collapsed.emit(this);
        }
        /**
         * allows to manually show collapsed content
         * @return {?}
         */

      }, {
        key: "show",
        value: function show() {
          this.isCollapse = false;
          this.isCollapsing = true;
          this.isExpanded = true;
          this.isCollapsed = false;
          this.display = 'block'; // this.height = 'auto';

          this.isCollapse = true;
          this.isCollapsing = false;

          this._renderer.setStyle(this._el.nativeElement, 'overflow', 'visible');

          this._renderer.setStyle(this._el.nativeElement, 'height', 'auto');

          this.expanded.emit(this);
        }
      }, {
        key: "collapse",
        set: function set(value) {
          this.isExpanded = value;
          this.toggle();
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          return this.isExpanded;
        }
      }]);

      return CollapseDirective;
    }();

    CollapseDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[collapse]',
        exportAs: 'bs-collapse',
        host: {
          '[class.collapse]': 'true'
        }
      }]
    }];
    /** @nocollapse */

    CollapseDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
      }];
    };

    CollapseDirective.propDecorators = {
      "collapsed": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "expanded": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "display": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['style.display']
      }],
      "isExpanded": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.in']
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.show']
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['attr.aria-expanded']
      }],
      "isCollapsed": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['attr.aria-hidden']
      }],
      "isCollapse": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.collapse']
      }],
      "isCollapsing": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.collapsing']
      }],
      "collapse": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var CollapseModule =
    /*#__PURE__*/
    function () {
      function CollapseModule() {
        _classCallCheck(this, CollapseModule);
      }

      _createClass(CollapseModule, null, [{
        key: "forRoot",

        /**
         * @return {?}
         */
        value: function forRoot() {
          return {
            ngModule: CollapseModule,
            providers: []
          };
        }
      }]);

      return CollapseModule;
    }();

    CollapseModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: [CollapseDirective],
        exports: [CollapseDirective]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1jb2xsYXBzZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9jb2xsYXBzZS9jb2xsYXBzZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1ib290c3RyYXAvY29sbGFwc2UvY29sbGFwc2UubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHRvZG86IGFkZCBhbmltYXRpb25zIHdoZW4gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvOTk0NyBzb2x2ZWRcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICdicy1jb2xsYXBzZScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNvbGxhcHNlXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlRGlyZWN0aXZlIHtcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgYXMgc29vbiBhcyBjb250ZW50IGNvbGxhcHNlcyAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBAT3V0cHV0KCkgY29sbGFwc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgYXMgc29vbiBhcyBjb250ZW50IGJlY29tZXMgdmlzaWJsZSAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBAT3V0cHV0KCkgZXhwYW5kZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpIGRpc3BsYXk6IHN0cmluZztcbiAgLy8gc2hvd25cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbicpXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hvdycpXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgaXNFeHBhbmRlZCA9IHRydWU7XG4gIC8vIGhpZGRlblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oaWRkZW4nKSBpc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAvLyBzdGFsZSBzdGF0ZVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNlJykgaXNDb2xsYXBzZSA9IHRydWU7XG4gIC8vIGFuaW1hdGlvbiBzdGF0ZVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNpbmcnKSBpc0NvbGxhcHNpbmcgPSBmYWxzZTtcblxuICAvKiogQSBmbGFnIGluZGljYXRpbmcgdmlzaWJpbGl0eSBvZiBjb250ZW50IChzaG93biBvciBoaWRkZW4pICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb2xsYXBzZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHZhbHVlO1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBnZXQgY29sbGFwc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgdG9nZ2xlIGNvbnRlbnQgdmlzaWJpbGl0eSAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgaGlkZSBjb250ZW50ICovXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5pc0NvbGxhcHNlID0gZmFsc2U7XG4gICAgdGhpcy5pc0NvbGxhcHNpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XG5cbiAgICB0aGlzLmlzQ29sbGFwc2UgPSB0cnVlO1xuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5jb2xsYXBzZWQuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgc2hvdyBjb2xsYXBzZWQgY29udGVudCAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuaXNDb2xsYXBzZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAvLyB0aGlzLmhlaWdodCA9ICdhdXRvJztcbiAgICB0aGlzLmlzQ29sbGFwc2UgPSB0cnVlO1xuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ292ZXJmbG93JyxcbiAgICAgICd2aXNpYmxlJ1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgdGhpcy5leHBhbmRlZC5lbWl0KHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb2xsYXBzZURpcmVjdGl2ZSB9IGZyb20gJy4vY29sbGFwc2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29sbGFwc2VEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbQ29sbGFwc2VEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IENvbGxhcHNlTW9kdWxlLCBwcm92aWRlcnM6IFtdIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7Ozs7SUFpREUsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXOzs7O3lCQTdCeEIsSUFBSSxZQUFZLEVBQUU7Ozs7d0JBR25CLElBQUksWUFBWSxFQUFFOzswQkFPN0MsSUFBSTs7MkJBRThCLEtBQUs7OzBCQUVSLElBQUk7OzRCQUVBLEtBQUs7S0FhZ0I7Ozs7OztRQVRqRSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7O0lBR2hCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4Qjs7Ozs7SUFLRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtLQUNGOzs7OztJQUdELElBQUk7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjs7Ozs7SUFHRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFFekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O1FBRXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFDdEIsVUFBVSxFQUNWLFNBQVMsQ0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCOzs7WUFwRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07aUJBQzNCO2FBQ0Y7Ozs7WUFkQyxVQUFVO1lBS1YsU0FBUzs7OzBCQWFSLE1BQU07eUJBR04sTUFBTTt3QkFFTixXQUFXLFNBQUMsZUFBZTsyQkFFM0IsV0FBVyxTQUFDLFVBQVUsY0FDdEIsV0FBVyxTQUFDLFlBQVksY0FDeEIsV0FBVyxTQUFDLG9CQUFvQjs0QkFHaEMsV0FBVyxTQUFDLGtCQUFrQjsyQkFFOUIsV0FBVyxTQUFDLGdCQUFnQjs2QkFFNUIsV0FBVyxTQUFDLGtCQUFrQjt5QkFHOUIsS0FBSzs7Ozs7OztBQ3hDUjs7OztJQVNFLE9BQU8sT0FBTztRQUNaLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztLQUNwRDs7O1lBUEYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUNqQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUM3Qjs7Ozs7Ozs7Ozs7Ozs7OyJ9

    /***/
  },

  /***/
  "./node_modules/ngx-bootstrap/pagination/fesm2015/ngx-bootstrap-pagination.js":
  /*!************************************************************************************!*\
    !*** ./node_modules/ngx-bootstrap/pagination/fesm2015/ngx-bootstrap-pagination.js ***!
    \************************************************************************************/

  /*! exports provided: PagerComponent, PaginationComponent, PaginationModule, PaginationConfig, ɵa, ɵb */

  /***/
  function node_modulesNgxBootstrapPaginationFesm2015NgxBootstrapPaginationJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagerComponent", function () {
      return PagerComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaginationComponent", function () {
      return PaginationComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaginationModule", function () {
      return PaginationModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaginationConfig", function () {
      return PaginationConfig;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵa", function () {
      return PAGER_CONTROL_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵb", function () {
      return PAGINATION_CONTROL_VALUE_ACCESSOR;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * Provides default values for Pagination and pager components
     */


    var PaginationConfig = function PaginationConfig() {
      _classCallCheck(this, PaginationConfig);

      this.main = {
        maxSize: void 0,
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        pageBtnClass: '',
        rotate: true
      };
      this.pager = {
        itemsPerPage: 15,
        previousText: '« Previous',
        nextText: 'Next »',
        pageBtnClass: '',
        align: true
      };
    };

    PaginationConfig.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var
    /** @type {?} */
    PAGER_CONTROL_VALUE_ACCESSOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],

      /* tslint:disable-next-line: no-use-before-declare */
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () {
        return PagerComponent;
      }),
      multi: true
    };

    var PagerComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} elementRef
       * @param {?} paginationConfig
       * @param {?} changeDetection
       */
      function PagerComponent(elementRef, paginationConfig, changeDetection) {
        _classCallCheck(this, PagerComponent);

        this.elementRef = elementRef;
        this.changeDetection = changeDetection;
        /**
         * fired when total pages count changes, $event:number equals to total pages count
         */

        this.numPages = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * fired when page was changed, $event:{page, itemsPerPage} equals to
         * object with current page index and number of items per page
         */

        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.elementRef = elementRef;

        if (!this.config) {
          this.configureOptions(Object.assign({}, paginationConfig.main, paginationConfig.pager));
        }
      }
      /**
       * maximum number of items per page. If value less than 1 will display all items on one page
       * @return {?}
       */


      _createClass(PagerComponent, [{
        key: "configureOptions",

        /**
         * @param {?} config
         * @return {?}
         */
        value: function configureOptions(config) {
          this.config = Object.assign({}, config);
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          if (typeof window !== 'undefined') {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
          } // watch for maxSize


          this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
          this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
          this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : this.config.boundaryLinks;
          this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : this.config.directionLinks;
          this.pageBtnClass = typeof this.pageBtnClass !== 'undefined' ? this.pageBtnClass : this.config.pageBtnClass; // base class

          this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : this.config.itemsPerPage;
          this.totalPages = this.calculateTotalPages(); // this class

          this.pages = this.getPages(this.page, this.totalPages);
          this.inited = true;
        }
        /**
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "writeValue",
        value: function writeValue(value) {
          this.page = value;
          this.pages = this.getPages(this.page, this.totalPages);
        }
        /**
         * @param {?} key
         * @return {?}
         */

      }, {
        key: "getText",
        value: function getText(key) {
          // tslint:disable-next-line:no-any
          return (
            /** @type {?} */
            this["".concat(key, "Text")] || this.config["".concat(key, "Text")]
          );
        }
        /**
         * @return {?}
         */

      }, {
        key: "noPrevious",
        value: function noPrevious() {
          return this.page === 1;
        }
        /**
         * @return {?}
         */

      }, {
        key: "noNext",
        value: function noNext() {
          return this.page === this.totalPages;
        }
        /**
         * @param {?} fn
         * @return {?}
         */

      }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
          this.onChange = fn;
        }
        /**
         * @param {?} fn
         * @return {?}
         */

      }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
          this.onTouched = fn;
        }
        /**
         * @param {?} page
         * @param {?=} event
         * @return {?}
         */

      }, {
        key: "selectPage",
        value: function selectPage(page, event) {
          if (event) {
            event.preventDefault();
          }

          if (!this.disabled) {
            if (event && event.target) {
              // tslint:disable-next-line:no-any
              var
              /** @type {?} */
              target = event.target;
              target.blur();
            }

            this.writeValue(page);
            this.onChange(this.page);
          }
        }
        /**
         * @param {?} num
         * @param {?} text
         * @param {?} active
         * @return {?}
         */

      }, {
        key: "makePage",
        value: function makePage(num, text, active) {
          return {
            text: text,
            number: num,
            active: active
          };
        }
        /**
         * @param {?} currentPage
         * @param {?} totalPages
         * @return {?}
         */

      }, {
        key: "getPages",
        value: function getPages(currentPage, totalPages) {
          var
          /** @type {?} */
          pages = []; // Default page limits

          var
          /** @type {?} */
          startPage = 1;
          var
          /** @type {?} */
          endPage = totalPages;
          var
          /** @type {?} */
          isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages; // recompute if maxSize

          if (isMaxSized) {
            if (this.rotate) {
              // Current page is displayed in the middle of the visible ones
              startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
              endPage = startPage + this.maxSize - 1; // Adjust if limit is exceeded

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxSize + 1;
              }
            } else {
              // Visible pages are paginated with maxSize
              startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1; // Adjust last page if limit is exceeded

              endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
          } // Add page number links


          for (var
          /** @type {?} */
          num = startPage; num <= endPage; num++) {
            var
            /** @type {?} */
            page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
          } // Add links to move between page sets


          if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
              var
              /** @type {?} */
              previousPageSet = this.makePage(startPage - 1, '...', false);
              pages.unshift(previousPageSet);
            }

            if (endPage < totalPages) {
              var
              /** @type {?} */
              nextPageSet = this.makePage(endPage + 1, '...', false);
              pages.push(nextPageSet);
            }
          }

          return pages;
        }
        /**
         * @return {?}
         */

      }, {
        key: "calculateTotalPages",
        value: function calculateTotalPages() {
          var
          /** @type {?} */
          totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
          return Math.max(totalPages || 0, 1);
        }
      }, {
        key: "itemsPerPage",
        get: function get() {
          return this._itemsPerPage;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._itemsPerPage = v;
          this.totalPages = this.calculateTotalPages();
        }
        /**
         * total number of items in all pages
         * @return {?}
         */

      }, {
        key: "totalItems",
        get: function get() {
          return this._totalItems;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._totalItems = v;
          this.totalPages = this.calculateTotalPages();
        }
        /**
         * @return {?}
         */

      }, {
        key: "totalPages",
        get: function get() {
          return this._totalPages;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._totalPages = v;
          this.numPages.emit(v);

          if (this.inited) {
            this.selectPage(this.page);
          }
        }
        /**
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "page",
        set: function set(value) {
          var
          /** @type {?} */
          _previous = this._page;
          this._page = value > this.totalPages ? this.totalPages : value || 1;
          this.changeDetection.markForCheck();

          if (_previous === this._page || typeof _previous === 'undefined') {
            return;
          }

          this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
          });
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          return this._page;
        }
      }]);

      return PagerComponent;
    }();

    PagerComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'pager',
        template: "<ul class=\"pager\">\n  <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\"\n      [ngClass]=\"{'pull-right': align, 'float-right': align}\"\n      class=\"{{ pageBtnClass }}\">\n    <a href (click)=\"selectPage(page - 1, $event)\">{{ getText('previous') }}</a>\n  </li>\n  <li [class.disabled]=\"noNext()\" [class.next]=\"align\"\n      [ngClass]=\"{'pull-right': align, 'float-right': align}\"\n      class=\"{{ pageBtnClass }}\">\n    <a href (click)=\"selectPage(page + 1, $event)\">{{ getText('next') }}</a>\n  </li>\n</ul>\n",
        providers: [PAGER_CONTROL_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    PagerComponent.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: PaginationConfig
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
      }];
    };

    PagerComponent.propDecorators = {
      "align": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "maxSize": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "boundaryLinks": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "directionLinks": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "firstText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "previousText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "nextText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "lastText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "rotate": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "pageBtnClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "disabled": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "numPages": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "pageChanged": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "itemsPerPage": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "totalItems": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var
    /** @type {?} */
    PAGINATION_CONTROL_VALUE_ACCESSOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],

      /* tslint:disable-next-line: no-use-before-declare */
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () {
        return PaginationComponent;
      }),
      multi: true
    };

    var PaginationComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} elementRef
       * @param {?} paginationConfig
       * @param {?} changeDetection
       */
      function PaginationComponent(elementRef, paginationConfig, changeDetection) {
        _classCallCheck(this, PaginationComponent);

        this.elementRef = elementRef;
        this.changeDetection = changeDetection;
        /**
         * fired when total pages count changes, $event:number equals to total pages count
         */

        this.numPages = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * fired when page was changed, $event:{page, itemsPerPage} equals to object
         * with current page index and number of items per page
         */

        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.elementRef = elementRef;

        if (!this.config) {
          this.configureOptions(paginationConfig.main);
        }
      }
      /**
       * maximum number of items per page. If value less than 1 will display all items on one page
       * @return {?}
       */


      _createClass(PaginationComponent, [{
        key: "configureOptions",

        /**
         * @param {?} config
         * @return {?}
         */
        value: function configureOptions(config) {
          this.config = Object.assign({}, config);
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          if (typeof window !== 'undefined') {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
          } // watch for maxSize


          this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
          this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
          this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : this.config.boundaryLinks;
          this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : this.config.directionLinks;
          this.pageBtnClass = typeof this.pageBtnClass !== 'undefined' ? this.pageBtnClass : this.config.pageBtnClass; // base class

          this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : this.config.itemsPerPage;
          this.totalPages = this.calculateTotalPages(); // this class

          this.pages = this.getPages(this.page, this.totalPages);
          this.inited = true;
        }
        /**
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "writeValue",
        value: function writeValue(value) {
          this.page = value;
          this.pages = this.getPages(this.page, this.totalPages);
        }
        /**
         * @param {?} key
         * @return {?}
         */

      }, {
        key: "getText",
        value: function getText(key) {
          // tslint:disable-next-line:no-any
          return (
            /** @type {?} */
            this["".concat(key, "Text")] || this.config["".concat(key, "Text")]
          );
        }
        /**
         * @return {?}
         */

      }, {
        key: "noPrevious",
        value: function noPrevious() {
          return this.page === 1;
        }
        /**
         * @return {?}
         */

      }, {
        key: "noNext",
        value: function noNext() {
          return this.page === this.totalPages;
        }
        /**
         * @param {?} fn
         * @return {?}
         */

      }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
          this.onChange = fn;
        }
        /**
         * @param {?} fn
         * @return {?}
         */

      }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
          this.onTouched = fn;
        }
        /**
         * @param {?} page
         * @param {?=} event
         * @return {?}
         */

      }, {
        key: "selectPage",
        value: function selectPage(page, event) {
          if (event) {
            event.preventDefault();
          }

          if (!this.disabled) {
            if (event && event.target) {
              // tslint:disable-next-line:no-any
              var
              /** @type {?} */
              target = event.target;
              target.blur();
            }

            this.writeValue(page);
            this.onChange(this.page);
          }
        }
        /**
         * @param {?} num
         * @param {?} text
         * @param {?} active
         * @return {?}
         */

      }, {
        key: "makePage",
        value: function makePage(num, text, active) {
          return {
            text: text,
            number: num,
            active: active
          };
        }
        /**
         * @param {?} currentPage
         * @param {?} totalPages
         * @return {?}
         */

      }, {
        key: "getPages",
        value: function getPages(currentPage, totalPages) {
          var
          /** @type {?} */
          pages = []; // Default page limits

          var
          /** @type {?} */
          startPage = 1;
          var
          /** @type {?} */
          endPage = totalPages;
          var
          /** @type {?} */
          isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages; // recompute if maxSize

          if (isMaxSized) {
            if (this.rotate) {
              // Current page is displayed in the middle of the visible ones
              startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
              endPage = startPage + this.maxSize - 1; // Adjust if limit is exceeded

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxSize + 1;
              }
            } else {
              // Visible pages are paginated with maxSize
              startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1; // Adjust last page if limit is exceeded

              endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
          } // Add page number links


          for (var
          /** @type {?} */
          num = startPage; num <= endPage; num++) {
            var
            /** @type {?} */
            page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
          } // Add links to move between page sets


          if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
              var
              /** @type {?} */
              previousPageSet = this.makePage(startPage - 1, '...', false);
              pages.unshift(previousPageSet);
            }

            if (endPage < totalPages) {
              var
              /** @type {?} */
              nextPageSet = this.makePage(endPage + 1, '...', false);
              pages.push(nextPageSet);
            }
          }

          return pages;
        }
        /**
         * @return {?}
         */

      }, {
        key: "calculateTotalPages",
        value: function calculateTotalPages() {
          var
          /** @type {?} */
          totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
          return Math.max(totalPages || 0, 1);
        }
      }, {
        key: "itemsPerPage",
        get: function get() {
          return this._itemsPerPage;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._itemsPerPage = v;
          this.totalPages = this.calculateTotalPages();
        }
        /**
         * total number of items in all pages
         * @return {?}
         */

      }, {
        key: "totalItems",
        get: function get() {
          return this._totalItems;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._totalItems = v;
          this.totalPages = this.calculateTotalPages();
        }
        /**
         * @return {?}
         */

      }, {
        key: "totalPages",
        get: function get() {
          return this._totalPages;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._totalPages = v;
          this.numPages.emit(v);

          if (this.inited) {
            this.selectPage(this.page);
          }
        }
        /**
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "page",
        set: function set(value) {
          var
          /** @type {?} */
          _previous = this._page;
          this._page = value > this.totalPages ? this.totalPages : value || 1;
          this.changeDetection.markForCheck();

          if (_previous === this._page || typeof _previous === 'undefined') {
            return;
          }

          this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
          });
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          return this._page;
        }
      }]);

      return PaginationComponent;
    }();

    PaginationComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'pagination',
        template: "<ul class=\"pagination\" [ngClass]=\"classMap\">\n  <li class=\"pagination-first page-item\"\n      *ngIf=\"boundaryLinks\"\n      [class.disabled]=\"noPrevious()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(1, $event)\"\n       [innerHTML]=\"getText('first')\"></a>\n  </li>\n\n  <li class=\"pagination-prev page-item\"\n      *ngIf=\"directionLinks\"\n      [class.disabled]=\"noPrevious()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\"\n       [innerHTML]=\"getText('previous')\"></a>\n  </li>\n\n  <li *ngFor=\"let pg of pages\"\n      [class.active]=\"pg.active\"\n      [class.disabled]=\"disabled&&!pg.active\"\n      class=\"pagination-page page-item\">\n    <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\"\n       [innerHTML]=\"pg.text\"></a>\n  </li>\n\n  <li class=\"pagination-next page-item\"\n      *ngIf=\"directionLinks\"\n      [class.disabled]=\"noNext()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\"\n       [innerHTML]=\"getText('next')\"></a></li>\n\n  <li class=\"pagination-last page-item\"\n      *ngIf=\"boundaryLinks\"\n      [class.disabled]=\"noNext()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\"\n       [innerHTML]=\"getText('last')\"></a></li>\n</ul>\n",
        providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    PaginationComponent.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: PaginationConfig
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
      }];
    };

    PaginationComponent.propDecorators = {
      "align": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "maxSize": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "boundaryLinks": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "directionLinks": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "firstText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "previousText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "nextText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "lastText": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "rotate": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "pageBtnClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "disabled": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "numPages": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "pageChanged": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "itemsPerPage": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "totalItems": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var PaginationModule =
    /*#__PURE__*/
    function () {
      function PaginationModule() {
        _classCallCheck(this, PaginationModule);
      }

      _createClass(PaginationModule, null, [{
        key: "forRoot",

        /**
         * @return {?}
         */
        value: function forRoot() {
          return {
            ngModule: PaginationModule,
            providers: [PaginationConfig]
          };
        }
      }]);

      return PaginationModule;
    }();

    PaginationModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
        declarations: [PagerComponent, PaginationComponent],
        exports: [PagerComponent, PaginationComponent]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1wYWdpbmF0aW9uLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdlci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHRvZG86IHNwbGl0XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbmZpZ01vZGVsLCBQYWdlck1vZGVsIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vKiogUHJvdmlkZXMgZGVmYXVsdCB2YWx1ZXMgZm9yIFBhZ2luYXRpb24gYW5kIHBhZ2VyIGNvbXBvbmVudHMgKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uQ29uZmlnIHtcbiAgbWFpbjogQ29uZmlnTW9kZWwgPSB7XG4gICAgbWF4U2l6ZTogdm9pZCAwLFxuICAgIGl0ZW1zUGVyUGFnZTogMTAsXG4gICAgYm91bmRhcnlMaW5rczogZmFsc2UsXG4gICAgZGlyZWN0aW9uTGlua3M6IHRydWUsXG4gICAgZmlyc3RUZXh0OiAnRmlyc3QnLFxuICAgIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcbiAgICBuZXh0VGV4dDogJ05leHQnLFxuICAgIGxhc3RUZXh0OiAnTGFzdCcsXG4gICAgcGFnZUJ0bkNsYXNzOiAnJyxcbiAgICByb3RhdGU6IHRydWVcbiAgfTtcbiAgcGFnZXI6IFBhZ2VyTW9kZWwgPSB7XG4gICAgaXRlbXNQZXJQYWdlOiAxNSxcbiAgICBwcmV2aW91c1RleHQ6ICfDgsKrIFByZXZpb3VzJyxcbiAgICBuZXh0VGV4dDogJ05leHQgw4LCuycsXG4gICAgcGFnZUJ0bkNsYXNzOiAnJyxcbiAgICBhbGlnbjogdHJ1ZVxuICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFByb3ZpZGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBQYWdlQ2hhbmdlZEV2ZW50IH0gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQ29uZmlnIH0gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbmZpZyc7XG5cbmltcG9ydCB7IENvbmZpZ01vZGVsLCBQYWdlc01vZGVsIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgUEFHRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQYWdlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYWdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWdlci5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1BBR0VSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIGNvbmZpZzogQ29uZmlnTW9kZWw7XG4gIC8qKiBpZiBgdHJ1ZWAgYWxpZ25zIGVhY2ggbGluayB0byB0aGUgc2lkZXMgb2YgcGFnZXIgKi9cbiAgQElucHV0KCkgYWxpZ246IGJvb2xlYW47XG4gIC8qKiBsaW1pdCBudW1iZXIgZm9yIHBhZ2UgbGlua3MgaW4gcGFnZXIgKi9cbiAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyO1xuICAvKiogaWYgZmFsc2UgZmlyc3QgYW5kIGxhc3QgYnV0dG9ucyB3aWxsIGJlIGhpZGRlbiAqL1xuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xuICAvKiogaWYgZmFsc2UgcHJldmlvdXMgYW5kIG5leHQgYnV0dG9ucyB3aWxsIGJlIGhpZGRlbiAqL1xuICBASW5wdXQoKSBkaXJlY3Rpb25MaW5rczogYm9vbGVhbjtcbiAgLy8gbGFiZWxzXG4gIC8qKiBmaXJzdCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBmaXJzdFRleHQ6IHN0cmluZztcbiAgLyoqIHByZXZpb3VzIGJ1dHRvbiB0ZXh0ICovXG4gIEBJbnB1dCgpIHByZXZpb3VzVGV4dDogc3RyaW5nO1xuICAvKiogbmV4dCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBuZXh0VGV4dDogc3RyaW5nO1xuICAvKiogbGFzdCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBsYXN0VGV4dDogc3RyaW5nO1xuICAvKiogaWYgdHJ1ZSBjdXJyZW50IHBhZ2Ugd2lsbCBpbiB0aGUgbWlkZGxlIG9mIHBhZ2VzIGxpc3QgKi9cbiAgQElucHV0KCkgcm90YXRlOiBib29sZWFuO1xuICAvLyBjc3NcbiAgLyoqIGFkZCBjbGFzcyB0byA8Y29kZT48bGlcXD48L2NvZGU+ICovXG4gIEBJbnB1dCgpIHBhZ2VCdG5DbGFzczogc3RyaW5nO1xuXG4gIC8qKiBpZiB0cnVlIHBhZ2luYXRpb24gY29tcG9uZW50IHdpbGwgYmUgZGlzYWJsZWQgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIGZpcmVkIHdoZW4gdG90YWwgcGFnZXMgY291bnQgY2hhbmdlcywgJGV2ZW50Om51bWJlciBlcXVhbHMgdG8gdG90YWwgcGFnZXMgY291bnQgKi9cbiAgQE91dHB1dCgpIG51bVBhZ2VzOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAvKiogZmlyZWQgd2hlbiBwYWdlIHdhcyBjaGFuZ2VkLCAkZXZlbnQ6e3BhZ2UsIGl0ZW1zUGVyUGFnZX0gZXF1YWxzIHRvXG4gICAqIG9iamVjdCB3aXRoIGN1cnJlbnQgcGFnZSBpbmRleCBhbmQgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcGFnZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxQYWdlQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUNoYW5nZWRFdmVudD4oKTtcblxuICAvKiogbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuIElmIHZhbHVlIGxlc3MgdGhhbiAxIHdpbGwgZGlzcGxheSBhbGwgaXRlbXMgb24gb25lIHBhZ2UgKi9cbiAgQElucHV0KClcbiAgZ2V0IGl0ZW1zUGVyUGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBzZXQgaXRlbXNQZXJQYWdlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX2l0ZW1zUGVyUGFnZSA9IHY7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gIH1cblxuICAvKiogdG90YWwgbnVtYmVyIG9mIGl0ZW1zIGluIGFsbCBwYWdlcyAqL1xuICBASW5wdXQoKVxuICBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbEl0ZW1zO1xuICB9XG5cbiAgc2V0IHRvdGFsSXRlbXModjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxJdGVtcyA9IHY7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gIH1cblxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFBhZ2VzO1xuICB9XG5cbiAgc2V0IHRvdGFsUGFnZXModjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxQYWdlcyA9IHY7XG4gICAgdGhpcy5udW1QYWdlcy5lbWl0KHYpO1xuICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IHBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IF9wcmV2aW91cyA9IHRoaXMuX3BhZ2U7XG4gICAgdGhpcy5fcGFnZSA9IHZhbHVlID4gdGhpcy50b3RhbFBhZ2VzID8gdGhpcy50b3RhbFBhZ2VzIDogdmFsdWUgfHwgMTtcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmIChfcHJldmlvdXMgPT09IHRoaXMuX3BhZ2UgfHwgdHlwZW9mIF9wcmV2aW91cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQoe1xuICAgICAgcGFnZTogdGhpcy5fcGFnZSxcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gIH1cblxuICBvbkNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIGNsYXNzTWFwOiBzdHJpbmc7XG4gIHBhZ2VzOiBQYWdlc01vZGVsW107XG5cbiAgcHJvdGVjdGVkIF9pdGVtc1BlclBhZ2U6IG51bWJlcjtcbiAgcHJvdGVjdGVkIF90b3RhbEl0ZW1zOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfdG90YWxQYWdlczogbnVtYmVyO1xuICBwcm90ZWN0ZWQgaW5pdGVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfcGFnZSA9IDE7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uQ29uZmlnLFxuICAgICAgICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlndXJlT3B0aW9ucyhcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcGFnaW5hdGlvbkNvbmZpZy5tYWluLCBwYWdpbmF0aW9uQ29uZmlnLnBhZ2VyKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25maWd1cmVPcHRpb25zKGNvbmZpZzogQ29uZmlnTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuY2xhc3NNYXAgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gICAgfVxuICAgIC8vIHdhdGNoIGZvciBtYXhTaXplXG4gICAgdGhpcy5tYXhTaXplID1cbiAgICAgIHR5cGVvZiB0aGlzLm1heFNpemUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5tYXhTaXplIDogdGhpcy5jb25maWcubWF4U2l6ZTtcbiAgICB0aGlzLnJvdGF0ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5yb3RhdGUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5yb3RhdGUgOiB0aGlzLmNvbmZpZy5yb3RhdGU7XG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID1cbiAgICAgIHR5cGVvZiB0aGlzLmJvdW5kYXJ5TGlua3MgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdGhpcy5ib3VuZGFyeUxpbmtzXG4gICAgICAgIDogdGhpcy5jb25maWcuYm91bmRhcnlMaW5rcztcbiAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID1cbiAgICAgIHR5cGVvZiB0aGlzLmRpcmVjdGlvbkxpbmtzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuZGlyZWN0aW9uTGlua3NcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5kaXJlY3Rpb25MaW5rcztcbiAgICB0aGlzLnBhZ2VCdG5DbGFzcyA9XG4gICAgICB0eXBlb2YgdGhpcy5wYWdlQnRuQ2xhc3MgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdGhpcy5wYWdlQnRuQ2xhc3NcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5wYWdlQnRuQ2xhc3M7XG5cbiAgICAvLyBiYXNlIGNsYXNzXG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPVxuICAgICAgdHlwZW9mIHRoaXMuaXRlbXNQZXJQYWdlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuaXRlbXNQZXJQYWdlXG4gICAgICAgIDogdGhpcy5jb25maWcuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIC8vIHRoaXMgY2xhc3NcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlID0gdmFsdWU7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICB9XG5cbiAgZ2V0VGV4dChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHJldHVybiAodGhpcyBhcyBhbnkpW2Ake2tleX1UZXh0YF0gfHwgdGhpcy5jb25maWdbYCR7a2V5fVRleHRgXTtcbiAgfVxuXG4gIG5vUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA9PT0gMTtcbiAgfVxuXG4gIG5vTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSB0aGlzLnRvdGFsUGFnZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGFyZ2V0LmJsdXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMud3JpdGVWYWx1ZShwYWdlKTtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5wYWdlKTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgcGFnZSBvYmplY3QgdXNlZCBpbiB0ZW1wbGF0ZVxuICBwcm90ZWN0ZWQgbWFrZVBhZ2UobnVtOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGJvb2xlYW4pOiB7IG51bWJlcjogbnVtYmVyOyB0ZXh0OiBzdHJpbmc7IGFjdGl2ZTogYm9vbGVhbiB9IHtcbiAgICByZXR1cm4ge3RleHQsIG51bWJlcjogbnVtLCBhY3RpdmV9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcik6IFBhZ2VzTW9kZWxbXSB7XG4gICAgY29uc3QgcGFnZXM6IFBhZ2VzTW9kZWxbXSA9IFtdO1xuXG4gICAgLy8gRGVmYXVsdCBwYWdlIGxpbWl0c1xuICAgIGxldCBzdGFydFBhZ2UgPSAxO1xuICAgIGxldCBlbmRQYWdlID0gdG90YWxQYWdlcztcbiAgICBjb25zdCBpc01heFNpemVkID1cbiAgICAgIHR5cGVvZiB0aGlzLm1heFNpemUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMubWF4U2l6ZSA8IHRvdGFsUGFnZXM7XG5cbiAgICAvLyByZWNvbXB1dGUgaWYgbWF4U2l6ZVxuICAgIGlmIChpc01heFNpemVkKSB7XG4gICAgICBpZiAodGhpcy5yb3RhdGUpIHtcbiAgICAgICAgLy8gQ3VycmVudCBwYWdlIGlzIGRpc3BsYXllZCBpbiB0aGUgbWlkZGxlIG9mIHRoZSB2aXNpYmxlIG9uZXNcbiAgICAgICAgc3RhcnRQYWdlID0gTWF0aC5tYXgoY3VycmVudFBhZ2UgLSBNYXRoLmZsb29yKHRoaXMubWF4U2l6ZSAvIDIpLCAxKTtcbiAgICAgICAgZW5kUGFnZSA9IHN0YXJ0UGFnZSArIHRoaXMubWF4U2l6ZSAtIDE7XG5cbiAgICAgICAgLy8gQWRqdXN0IGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICAgIGlmIChlbmRQYWdlID4gdG90YWxQYWdlcykge1xuICAgICAgICAgIGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgICAgIHN0YXJ0UGFnZSA9IGVuZFBhZ2UgLSB0aGlzLm1heFNpemUgKyAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBWaXNpYmxlIHBhZ2VzIGFyZSBwYWdpbmF0ZWQgd2l0aCBtYXhTaXplXG4gICAgICAgIHN0YXJ0UGFnZSA9XG4gICAgICAgICAgKE1hdGguY2VpbChjdXJyZW50UGFnZSAvIHRoaXMubWF4U2l6ZSkgLSAxKSAqIHRoaXMubWF4U2l6ZSArIDE7XG5cbiAgICAgICAgLy8gQWRqdXN0IGxhc3QgcGFnZSBpZiBsaW1pdCBpcyBleGNlZWRlZFxuICAgICAgICBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgdGhpcy5tYXhTaXplIC0gMSwgdG90YWxQYWdlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIHBhZ2UgbnVtYmVyIGxpbmtzXG4gICAgZm9yIChsZXQgbnVtID0gc3RhcnRQYWdlOyBudW0gPD0gZW5kUGFnZTsgbnVtKyspIHtcbiAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLm1ha2VQYWdlKG51bSwgbnVtLnRvU3RyaW5nKCksIG51bSA9PT0gY3VycmVudFBhZ2UpO1xuICAgICAgcGFnZXMucHVzaChwYWdlKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgbGlua3MgdG8gbW92ZSBiZXR3ZWVuIHBhZ2Ugc2V0c1xuICAgIGlmIChpc01heFNpemVkICYmICF0aGlzLnJvdGF0ZSkge1xuICAgICAgaWYgKHN0YXJ0UGFnZSA+IDEpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQYWdlU2V0ID0gdGhpcy5tYWtlUGFnZShzdGFydFBhZ2UgLSAxLCAnLi4uJywgZmFsc2UpO1xuICAgICAgICBwYWdlcy51bnNoaWZ0KHByZXZpb3VzUGFnZVNldCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmRQYWdlIDwgdG90YWxQYWdlcykge1xuICAgICAgICBjb25zdCBuZXh0UGFnZVNldCA9IHRoaXMubWFrZVBhZ2UoZW5kUGFnZSArIDEsICcuLi4nLCBmYWxzZSk7XG4gICAgICAgIHBhZ2VzLnB1c2gobmV4dFBhZ2VTZXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIC8vIGJhc2UgY2xhc3NcbiAgcHJvdGVjdGVkIGNhbGN1bGF0ZVRvdGFsUGFnZXMoKTogbnVtYmVyIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID1cbiAgICAgIHRoaXMuaXRlbXNQZXJQYWdlIDwgMVxuICAgICAgICA/IDFcbiAgICAgICAgOiBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5pdGVtc1BlclBhZ2UpO1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KHRvdGFsUGFnZXMgfHwgMCwgMSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQcm92aWRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbmZpZyB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb25maWcnO1xuXG5pbXBvcnQgeyBDb25maWdNb2RlbCwgUGFnZXNNb2RlbCB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBQYWdlQ2hhbmdlZEV2ZW50IHtcbiAgaXRlbXNQZXJQYWdlOiBudW1iZXI7XG4gIHBhZ2U6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBBR0lOQVRJT05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZSAqL1xuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQYWdpbmF0aW9uQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1BBR0lOQVRJT05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBjb25maWc6IENvbmZpZ01vZGVsO1xuICAvKiogaWYgYHRydWVgIGFsaWducyBlYWNoIGxpbmsgdG8gdGhlIHNpZGVzIG9mIHBhZ2VyICovXG4gIEBJbnB1dCgpIGFsaWduOiBib29sZWFuO1xuICAvKiogbGltaXQgbnVtYmVyIGZvciBwYWdlIGxpbmtzIGluIHBhZ2VyICovXG4gIEBJbnB1dCgpIG1heFNpemU6IG51bWJlcjtcbiAgLyoqIGlmIGZhbHNlIGZpcnN0IGFuZCBsYXN0IGJ1dHRvbnMgd2lsbCBiZSBoaWRkZW4gKi9cbiAgQElucHV0KCkgYm91bmRhcnlMaW5rczogYm9vbGVhbjtcbiAgLyoqIGlmIGZhbHNlIHByZXZpb3VzIGFuZCBuZXh0IGJ1dHRvbnMgd2lsbCBiZSBoaWRkZW4gKi9cbiAgQElucHV0KCkgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XG4gIC8vIGxhYmVsc1xuICAvKiogZmlyc3QgYnV0dG9uIHRleHQgKi9cbiAgQElucHV0KCkgZmlyc3RUZXh0OiBzdHJpbmc7XG4gIC8qKiBwcmV2aW91cyBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBwcmV2aW91c1RleHQ6IHN0cmluZztcbiAgLyoqIG5leHQgYnV0dG9uIHRleHQgKi9cbiAgQElucHV0KCkgbmV4dFRleHQ6IHN0cmluZztcbiAgLyoqIGxhc3QgYnV0dG9uIHRleHQgKi9cbiAgQElucHV0KCkgbGFzdFRleHQ6IHN0cmluZztcbiAgLyoqIGlmIHRydWUgY3VycmVudCBwYWdlIHdpbGwgaW4gdGhlIG1pZGRsZSBvZiBwYWdlcyBsaXN0ICovXG4gIEBJbnB1dCgpIHJvdGF0ZTogYm9vbGVhbjtcbiAgLy8gY3NzXG4gIC8qKiBhZGQgY2xhc3MgdG8gPGNvZGU+PGxpXFw+PC9jb2RlPiAqL1xuICBASW5wdXQoKSBwYWdlQnRuQ2xhc3M6IHN0cmluZztcblxuICAvKiogaWYgdHJ1ZSBwYWdpbmF0aW9uIGNvbXBvbmVudCB3aWxsIGJlIGRpc2FibGVkICovXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBmaXJlZCB3aGVuIHRvdGFsIHBhZ2VzIGNvdW50IGNoYW5nZXMsICRldmVudDpudW1iZXIgZXF1YWxzIHRvIHRvdGFsIHBhZ2VzIGNvdW50ICovXG4gIEBPdXRwdXQoKSBudW1QYWdlczogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgLyoqIGZpcmVkIHdoZW4gcGFnZSB3YXMgY2hhbmdlZCwgJGV2ZW50OntwYWdlLCBpdGVtc1BlclBhZ2V9IGVxdWFscyB0byBvYmplY3RcbiAgICogd2l0aCBjdXJyZW50IHBhZ2UgaW5kZXggYW5kIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZVxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHBhZ2VDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKiBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS4gSWYgdmFsdWUgbGVzcyB0aGFuIDEgd2lsbCBkaXNwbGF5IGFsbCBpdGVtcyBvbiBvbmUgcGFnZSAqL1xuICBASW5wdXQoKVxuICBnZXQgaXRlbXNQZXJQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zUGVyUGFnZTtcbiAgfVxuXG4gIHNldCBpdGVtc1BlclBhZ2UodjogbnVtYmVyKSB7XG4gICAgdGhpcy5faXRlbXNQZXJQYWdlID0gdjtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgfVxuXG4gIC8qKiB0b3RhbCBudW1iZXIgb2YgaXRlbXMgaW4gYWxsIHBhZ2VzICovXG4gIEBJbnB1dCgpXG4gIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsSXRlbXM7XG4gIH1cblxuICBzZXQgdG90YWxJdGVtcyh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl90b3RhbEl0ZW1zID0gdjtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgfVxuXG4gIGdldCB0b3RhbFBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsUGFnZXM7XG4gIH1cblxuICBzZXQgdG90YWxQYWdlcyh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl90b3RhbFBhZ2VzID0gdjtcbiAgICB0aGlzLm51bVBhZ2VzLmVtaXQodik7XG4gICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdFBhZ2UodGhpcy5wYWdlKTtcbiAgICB9XG4gIH1cblxuICBzZXQgcGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgX3ByZXZpb3VzID0gdGhpcy5fcGFnZTtcbiAgICB0aGlzLl9wYWdlID0gdmFsdWUgPiB0aGlzLnRvdGFsUGFnZXMgPyB0aGlzLnRvdGFsUGFnZXMgOiB2YWx1ZSB8fCAxO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgaWYgKF9wcmV2aW91cyA9PT0gdGhpcy5fcGFnZSB8fCB0eXBlb2YgX3ByZXZpb3VzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucGFnZUNoYW5nZWQuZW1pdCh7XG4gICAgICBwYWdlOiB0aGlzLl9wYWdlLFxuICAgICAgaXRlbXNQZXJQYWdlOiB0aGlzLml0ZW1zUGVyUGFnZVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBvblRvdWNoZWQgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgY2xhc3NNYXA6IHN0cmluZztcbiAgcGFnZXM6IFBhZ2VzTW9kZWxbXTtcblxuICBwcm90ZWN0ZWQgX2l0ZW1zUGVyUGFnZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgX3RvdGFsSXRlbXM6IG51bWJlcjtcbiAgcHJvdGVjdGVkIF90b3RhbFBhZ2VzOiBudW1iZXI7XG4gIHByb3RlY3RlZCBpbml0ZWQgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9wYWdlID0gMTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcGFnaW5hdGlvbkNvbmZpZzogUGFnaW5hdGlvbkNvbmZpZyxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICBpZiAoIXRoaXMuY29uZmlnKSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZU9wdGlvbnMocGFnaW5hdGlvbkNvbmZpZy5tYWluKTtcbiAgICB9XG4gIH1cblxuICBjb25maWd1cmVPcHRpb25zKGNvbmZpZzogQ29uZmlnTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuY2xhc3NNYXAgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gICAgfVxuICAgIC8vIHdhdGNoIGZvciBtYXhTaXplXG4gICAgdGhpcy5tYXhTaXplID1cbiAgICAgIHR5cGVvZiB0aGlzLm1heFNpemUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5tYXhTaXplIDogdGhpcy5jb25maWcubWF4U2l6ZTtcbiAgICB0aGlzLnJvdGF0ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5yb3RhdGUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5yb3RhdGUgOiB0aGlzLmNvbmZpZy5yb3RhdGU7XG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID1cbiAgICAgIHR5cGVvZiB0aGlzLmJvdW5kYXJ5TGlua3MgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdGhpcy5ib3VuZGFyeUxpbmtzXG4gICAgICAgIDogdGhpcy5jb25maWcuYm91bmRhcnlMaW5rcztcbiAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID1cbiAgICAgIHR5cGVvZiB0aGlzLmRpcmVjdGlvbkxpbmtzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuZGlyZWN0aW9uTGlua3NcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5kaXJlY3Rpb25MaW5rcztcbiAgICB0aGlzLnBhZ2VCdG5DbGFzcyA9XG4gICAgICB0eXBlb2YgdGhpcy5wYWdlQnRuQ2xhc3MgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdGhpcy5wYWdlQnRuQ2xhc3NcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5wYWdlQnRuQ2xhc3M7XG5cbiAgICAvLyBiYXNlIGNsYXNzXG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPVxuICAgICAgdHlwZW9mIHRoaXMuaXRlbXNQZXJQYWdlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuaXRlbXNQZXJQYWdlXG4gICAgICAgIDogdGhpcy5jb25maWcuaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIC8vIHRoaXMgY2xhc3NcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlID0gdmFsdWU7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICB9XG5cbiAgZ2V0VGV4dChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHJldHVybiAodGhpcyBhcyBhbnkpW2Ake2tleX1UZXh0YF0gfHwgdGhpcy5jb25maWdbYCR7a2V5fVRleHRgXTtcbiAgfVxuXG4gIG5vUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA9PT0gMTtcbiAgfVxuXG4gIG5vTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSB0aGlzLnRvdGFsUGFnZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGFyZ2V0LmJsdXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMud3JpdGVWYWx1ZShwYWdlKTtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5wYWdlKTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgcGFnZSBvYmplY3QgdXNlZCBpbiB0ZW1wbGF0ZVxuICBwcm90ZWN0ZWQgbWFrZVBhZ2UoXG4gICAgbnVtOiBudW1iZXIsXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIGFjdGl2ZTogYm9vbGVhblxuICApOiB7IG51bWJlcjogbnVtYmVyOyB0ZXh0OiBzdHJpbmc7IGFjdGl2ZTogYm9vbGVhbiB9IHtcbiAgICByZXR1cm4geyB0ZXh0LCBudW1iZXI6IG51bSwgYWN0aXZlIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UGFnZXMoY3VycmVudFBhZ2U6IG51bWJlciwgdG90YWxQYWdlczogbnVtYmVyKTogUGFnZXNNb2RlbFtdIHtcbiAgICBjb25zdCBwYWdlczogUGFnZXNNb2RlbFtdID0gW107XG5cbiAgICAvLyBEZWZhdWx0IHBhZ2UgbGltaXRzXG4gICAgbGV0IHN0YXJ0UGFnZSA9IDE7XG4gICAgbGV0IGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgIGNvbnN0IGlzTWF4U2l6ZWQgPVxuICAgICAgdHlwZW9mIHRoaXMubWF4U2l6ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5tYXhTaXplIDwgdG90YWxQYWdlcztcblxuICAgIC8vIHJlY29tcHV0ZSBpZiBtYXhTaXplXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIGlmICh0aGlzLnJvdGF0ZSkge1xuICAgICAgICAvLyBDdXJyZW50IHBhZ2UgaXMgZGlzcGxheWVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIHZpc2libGUgb25lc1xuICAgICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IodGhpcy5tYXhTaXplIC8gMiksIDEpO1xuICAgICAgICBlbmRQYWdlID0gc3RhcnRQYWdlICsgdGhpcy5tYXhTaXplIC0gMTtcblxuICAgICAgICAvLyBBZGp1c3QgaWYgbGltaXQgaXMgZXhjZWVkZWRcbiAgICAgICAgaWYgKGVuZFBhZ2UgPiB0b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICAgICAgc3RhcnRQYWdlID0gZW5kUGFnZSAtIHRoaXMubWF4U2l6ZSArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFZpc2libGUgcGFnZXMgYXJlIHBhZ2luYXRlZCB3aXRoIG1heFNpemVcbiAgICAgICAgc3RhcnRQYWdlID1cbiAgICAgICAgICAoTWF0aC5jZWlsKGN1cnJlbnRQYWdlIC8gdGhpcy5tYXhTaXplKSAtIDEpICogdGhpcy5tYXhTaXplICsgMTtcblxuICAgICAgICAvLyBBZGp1c3QgbGFzdCBwYWdlIGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICAgIGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyB0aGlzLm1heFNpemUgLSAxLCB0b3RhbFBhZ2VzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtLCBudW0udG9TdHJpbmcoKSwgbnVtID09PSBjdXJyZW50UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cblxuICAgIC8vIEFkZCBsaW5rcyB0byBtb3ZlIGJldHdlZW4gcGFnZSBzZXRzXG4gICAgaWYgKGlzTWF4U2l6ZWQgJiYgIXRoaXMucm90YXRlKSB7XG4gICAgICBpZiAoc3RhcnRQYWdlID4gMSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1BhZ2VTZXQgPSB0aGlzLm1ha2VQYWdlKHN0YXJ0UGFnZSAtIDEsICcuLi4nLCBmYWxzZSk7XG4gICAgICAgIHBhZ2VzLnVuc2hpZnQocHJldmlvdXNQYWdlU2V0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZFBhZ2UgPCB0b3RhbFBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IG5leHRQYWdlU2V0ID0gdGhpcy5tYWtlUGFnZShlbmRQYWdlICsgMSwgJy4uLicsIGZhbHNlKTtcbiAgICAgICAgcGFnZXMucHVzaChuZXh0UGFnZVNldCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgLy8gYmFzZSBjbGFzc1xuICBwcm90ZWN0ZWQgY2FsY3VsYXRlVG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPVxuICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPCAxXG4gICAgICAgID8gMVxuICAgICAgICA6IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyB0aGlzLml0ZW1zUGVyUGFnZSk7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQ29uZmlnIH0gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbmZpZyc7XG5cbmltcG9ydCB7IFBhZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUGFnZXJDb21wb25lbnQsIFBhZ2luYXRpb25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUGFnZXJDb21wb25lbnQsIFBhZ2luYXRpb25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogUGFnaW5hdGlvbk1vZHVsZSwgcHJvdmlkZXJzOiBbUGFnaW5hdGlvbkNvbmZpZ10gfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7OztBQU1BOztvQkFDc0I7WUFDbEIsT0FBTyxFQUFFLEtBQUssQ0FBQztZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1NBQ2I7cUJBQ21CO1lBQ2xCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1NBQ1o7Ozs7WUFwQkYsVUFBVTs7Ozs7OztBQ05YLHVCQWtCYSw0QkFBNEIsR0FBYTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCOztJQUUxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sY0FBYyxDQUFDO0lBQzdDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQU9GOzs7Ozs7SUFxR0UsWUFBb0IsVUFBc0IsRUFDOUIsZ0JBQWtDLEVBQzFCO1FBRkEsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV0QixvQkFBZSxHQUFmLGVBQWU7Ozs7d0JBMUVRLElBQUksWUFBWSxFQUFVOzs7OzsyQkFLdkIsSUFBSSxZQUFZLEVBQW9CO3dCQXVEdkUsUUFBUSxDQUFDLFNBQVM7eUJBQ2pCLFFBQVEsQ0FBQyxTQUFTO3NCQVFYLEtBQUs7cUJBQ04sQ0FBQztRQUtqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUs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

    /***/
  },

  /***/
  "./node_modules/ngx-bootstrap/popover/fesm2015/ngx-bootstrap-popover.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/ngx-bootstrap/popover/fesm2015/ngx-bootstrap-popover.js ***!
    \******************************************************************************/

  /*! exports provided: PopoverDirective, PopoverModule, PopoverConfig, PopoverContainerComponent */

  /***/
  function node_modulesNgxBootstrapPopoverFesm2015NgxBootstrapPopoverJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopoverDirective", function () {
      return PopoverDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopoverModule", function () {
      return PopoverModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopoverConfig", function () {
      return PopoverConfig;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopoverContainerComponent", function () {
      return PopoverContainerComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ngx-bootstrap/utils */
    "./node_modules/ngx-bootstrap/utils/fesm2015/ngx-bootstrap-utils.js");
    /* harmony import */


    var ngx_bootstrap_component_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-bootstrap/component-loader */
    "./node_modules/ngx-bootstrap/component-loader/fesm2015/ngx-bootstrap-component-loader.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-bootstrap/positioning */
    "./node_modules/ngx-bootstrap/positioning/fesm2015/ngx-bootstrap-positioning.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * Configuration service for the Popover directive.
     * You can inject this service, typically in your root component, and customize
     * the values of its properties in order to provide default values for all the
     * popovers used in the application.
     */


    var PopoverConfig = function PopoverConfig() {
      _classCallCheck(this, PopoverConfig);

      /**
       * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
       */
      this.placement = 'top';
      /**
       * Specifies events that should trigger. Supports a space separated list of
       * event names.
       */

      this.triggers = 'click';
      this.outsideClick = false;
    };

    PopoverConfig.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var PopoverContainerComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} config
       */
      function PopoverContainerComponent(config) {
        _classCallCheck(this, PopoverContainerComponent);

        Object.assign(this, config);
      }
      /**
       * @return {?}
       */


      _createClass(PopoverContainerComponent, [{
        key: "isBs3",
        get: function get() {
          return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        }
      }]);

      return PopoverContainerComponent;
    }();

    PopoverContainerComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'popover-container',
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        // tslint:disable-next-line
        host: {
          '[class]': '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
          '[class.show]': '!isBs3',
          '[class.bs3]': 'isBs3',
          role: 'tooltip',
          style: 'display:block;'
        },
        template: "<div class=\"popover-arrow arrow\"></div>\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\n<div class=\"popover-content popover-body\">\n  <ng-content></ng-content>\n</div>\n",
        styles: ["\n    :host.bs3.popover-top {\n      margin-bottom: 10px;\n    }\n    :host.bs3.popover.top>.arrow {\n      margin-left: -2px;\n    }\n    :host.bs3.popover.top {\n      margin-bottom: 10px;\n    }\n    :host.popover.bottom>.arrow {\n      margin-left: -4px;\n    }\n    :host.bs3.bs-popover-left {\n      margin-right: .5rem;\n    }\n    :host.bs3.bs-popover-right .arrow, :host.bs3.bs-popover-left .arrow{\n      margin: .3rem 0;\n    }\n    "]
      }]
    }];
    /** @nocollapse */

    PopoverContainerComponent.ctorParameters = function () {
      return [{
        type: PopoverConfig
      }];
    };

    PopoverContainerComponent.propDecorators = {
      "placement": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "title": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * A lightweight, extensible directive for fancy popover creation.
     */

    var PopoverDirective =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} _elementRef
       * @param {?} _renderer
       * @param {?} _viewContainerRef
       * @param {?} _config
       * @param {?} cis
       */
      function PopoverDirective(_elementRef, _renderer, _viewContainerRef, _config, cis) {
        _classCallCheck(this, PopoverDirective);

        /**
         * Close popover on outside click
         */
        this.outsideClick = false;
        /**
         * Css class for popover container
         */

        this.containerClass = '';
        this._isInited = false;
        this._popover = cis.createLoader(_elementRef, _viewContainerRef, _renderer).provide({
          provide: PopoverConfig,
          useValue: _config
        });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden; // fix: no focus on button on Mac OS #1795

        if (typeof window !== 'undefined') {
          _elementRef.nativeElement.addEventListener('click', function () {
            try {
              _elementRef.nativeElement.focus();
            } catch (
            /** @type {?} */
            err) {
              return;
            }
          });
        }
      }
      /**
       * Returns whether or not the popover is currently being shown
       * @return {?}
       */


      _createClass(PopoverDirective, [{
        key: "show",

        /**
         * Opens an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */
        value: function show() {
          if (this._popover.isShown || !this.popover) {
            return;
          }

          this._popover.attach(PopoverContainerComponent).to(this.container).position({
            attachment: this.placement
          }).show({
            content: this.popover,
            context: this.popoverContext,
            placement: this.placement,
            title: this.popoverTitle,
            containerClass: this.containerClass
          });

          this.isOpen = true;
        }
        /**
         * Closes an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */

      }, {
        key: "hide",
        value: function hide() {
          if (this.isOpen) {
            this._popover.hide();

            this.isOpen = false;
          }
        }
        /**
         * Toggles an element’s popover. This is considered a “manual” triggering of
         * the popover.
         * @return {?}
         */

      }, {
        key: "toggle",
        value: function toggle() {
          if (this.isOpen) {
            return this.hide();
          }

          this.show();
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this3 = this;

          // fix: seems there are an issue with `routerLinkActive`
          // which result in duplicated call ngOnInit without call to ngOnDestroy
          // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
          if (this._isInited) {
            return;
          }

          this._isInited = true;

          this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: function show() {
              return _this3.show();
            }
          });
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this._popover.dispose();
        }
      }, {
        key: "isOpen",
        get: function get() {
          return this._popover.isShown;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
          if (value) {
            this.show();
          } else {
            this.hide();
          }
        }
      }]);

      return PopoverDirective;
    }();

    PopoverDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[popover]',
        exportAs: 'bs-popover'
      }]
    }];
    /** @nocollapse */

    PopoverDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]
      }, {
        type: PopoverConfig
      }, {
        type: ngx_bootstrap_component_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"]
      }];
    };

    PopoverDirective.propDecorators = {
      "popover": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "popoverContext": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "popoverTitle": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "placement": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "outsideClick": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "triggers": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "container": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "containerClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "isOpen": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "onShown": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "onHidden": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var PopoverModule =
    /*#__PURE__*/
    function () {
      function PopoverModule() {
        _classCallCheck(this, PopoverModule);
      }

      _createClass(PopoverModule, null, [{
        key: "forRoot",

        /**
         * @return {?}
         */
        value: function forRoot() {
          return {
            ngModule: PopoverModule,
            providers: [PopoverConfig, ngx_bootstrap_component_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_4__["PositioningService"]]
          };
        }
      }]);

      return PopoverModule;
    }();

    PopoverModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]],
        declarations: [PopoverDirective, PopoverContainerComponent],
        exports: [PopoverDirective],
        entryComponents: [PopoverContainerComponent]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1wb3BvdmVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtYm9vdHN0cmFwL3BvcG92ZXIvcG9wb3Zlci5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9wb3BvdmVyL3BvcG92ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBQb3BvdmVyIGRpcmVjdGl2ZS5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemVcbiAqIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW4gb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZVxuICogcG9wb3ZlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29uZmlnIHtcbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCIsIFwiYXV0b1wiXG4gICAqL1xuICBwbGFjZW1lbnQgPSAndG9wJztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIHRyaWdnZXJzID0gJ2NsaWNrJztcblxuICBvdXRzaWRlQ2xpY2sgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgY29udGFpbmVyOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4vcG9wb3Zlci5jb25maWcnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncG9wb3Zlci1jb250YWluZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6XG4gICAgICAnXCJwb3BvdmVyIGluIHBvcG92ZXItXCIgKyBwbGFjZW1lbnQgKyBcIiBcIiArIFwiYnMtcG9wb3Zlci1cIiArIHBsYWNlbWVudCArIFwiIFwiICsgcGxhY2VtZW50ICsgXCIgXCIgKyBjb250YWluZXJDbGFzcycsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICchaXNCczMnLFxuICAgICdbY2xhc3MuYnMzXSc6ICdpc0JzMycsXG4gICAgcm9sZTogJ3Rvb2x0aXAnLFxuICAgIHN0eWxlOiAnZGlzcGxheTpibG9jazsnXG4gIH0sXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdC5iczMucG9wb3Zlci10b3Age1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICB9XG4gICAgOmhvc3QuYnMzLnBvcG92ZXIudG9wPi5hcnJvdyB7XG4gICAgICBtYXJnaW4tbGVmdDogLTJweDtcbiAgICB9XG4gICAgOmhvc3QuYnMzLnBvcG92ZXIudG9wIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgfVxuICAgIDpob3N0LnBvcG92ZXIuYm90dG9tPi5hcnJvdyB7XG4gICAgICBtYXJnaW4tbGVmdDogLTRweDtcbiAgICB9XG4gICAgOmhvc3QuYnMzLmJzLXBvcG92ZXItbGVmdCB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IC41cmVtO1xuICAgIH1cbiAgICA6aG9zdC5iczMuYnMtcG9wb3Zlci1yaWdodCAuYXJyb3csIDpob3N0LmJzMy5icy1wb3BvdmVyLWxlZnQgLmFycm93e1xuICAgICAgbWFyZ2luOiAuM3JlbSAwO1xuICAgIH1cbiAgICBgXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBsYWNlbWVudDogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBjb250YWluZXJDbGFzczogc3RyaW5nO1xuXG4gIGdldCBpc0JzMygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCczMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUG9wb3ZlckNvbmZpZykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LFxuICBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4vcG9wb3Zlci5jb25maWcnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcbmltcG9ydCB7IFBvcG92ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbi8qKlxuICogQSBsaWdodHdlaWdodCwgZXh0ZW5zaWJsZSBkaXJlY3RpdmUgZm9yIGZhbmN5IHBvcG92ZXIgY3JlYXRpb24uXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW3BvcG92ZXJdJywgZXhwb3J0QXM6ICdicy1wb3BvdmVyJ30pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHBvcG92ZXIuXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBASW5wdXQoKSBwb3BvdmVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKipcbiAgICogQ29udGV4dCB0byBiZSB1c2VkIGlmIHBvcG92ZXIgaXMgYSB0ZW1wbGF0ZS5cbiAgICovXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55ICovXG4gIEBJbnB1dCgpIHBvcG92ZXJDb250ZXh0OiBhbnk7XG4gIC8qKlxuICAgKiBUaXRsZSBvZiBhIHBvcG92ZXIuXG4gICAqL1xuICBASW5wdXQoKSBwb3BvdmVyVGl0bGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJcbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnYXV0byc7XG4gIC8qKlxuICAgKiBDbG9zZSBwb3BvdmVyIG9uIG91dHNpZGUgY2xpY2tcbiAgICovXG4gIEBJbnB1dCgpIG91dHNpZGVDbGljayA9IGZhbHNlO1xuICAvKipcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mXG4gICAqIGV2ZW50IG5hbWVzLlxuICAgKi9cbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENzcyBjbGFzcyBmb3IgcG9wb3ZlciBjb250YWluZXJcbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lckNsYXNzID0gJyc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wb3BvdmVyLmlzU2hvd247XG4gIH1cblxuICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgc2hvd25cbiAgICovXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55ICovXG4gIEBPdXRwdXQoKSBvblNob3duOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICBAT3V0cHV0KCkgb25IaWRkZW46IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIHByaXZhdGUgX3BvcG92ZXI6IENvbXBvbmVudExvYWRlcjxQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfaXNJbml0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBfY29uZmlnOiBQb3BvdmVyQ29uZmlnLFxuICAgICAgICAgICAgICBjaXM6IENvbXBvbmVudExvYWRlckZhY3RvcnkpIHtcbiAgICB0aGlzLl9wb3BvdmVyID0gY2lzXG4gICAgICAuY3JlYXRlTG9hZGVyPFBvcG92ZXJDb250YWluZXJDb21wb25lbnQ+KFxuICAgICAgICBfZWxlbWVudFJlZixcbiAgICAgICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIF9yZW5kZXJlclxuICAgICAgKVxuICAgICAgLnByb3ZpZGUoe3Byb3ZpZGU6IFBvcG92ZXJDb25maWcsIHVzZVZhbHVlOiBfY29uZmlnfSk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBfY29uZmlnKTtcbiAgICB0aGlzLm9uU2hvd24gPSB0aGlzLl9wb3BvdmVyLm9uU2hvd247XG4gICAgdGhpcy5vbkhpZGRlbiA9IHRoaXMuX3BvcG92ZXIub25IaWRkZW47XG5cbiAgICAvLyBmaXg6IG5vIGZvY3VzIG9uIGJ1dHRvbiBvbiBNYWMgT1MgIzE3OTVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbiBlbGVtZW50w6LCgMKZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHNob3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BvcG92ZXIuaXNTaG93biB8fCAhdGhpcy5wb3BvdmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcG9wb3ZlclxuICAgICAgLmF0dGFjaChQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50KVxuICAgICAgLnRvKHRoaXMuY29udGFpbmVyKVxuICAgICAgLnBvc2l0aW9uKHthdHRhY2htZW50OiB0aGlzLnBsYWNlbWVudH0pXG4gICAgICAuc2hvdyh7XG4gICAgICAgIGNvbnRlbnQ6IHRoaXMucG9wb3ZlcixcbiAgICAgICAgY29udGV4dDogdGhpcy5wb3BvdmVyQ29udGV4dCxcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgdGl0bGU6IHRoaXMucG9wb3ZlclRpdGxlLFxuICAgICAgICBjb250YWluZXJDbGFzczogdGhpcy5jb250YWluZXJDbGFzc1xuICAgICAgfSk7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbiBlbGVtZW50w6LCgMKZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLl9wb3BvdmVyLmhpZGUoKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHBvcG92ZXIuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBmaXg6IHNlZW1zIHRoZXJlIGFyZSBhbiBpc3N1ZSB3aXRoIGByb3V0ZXJMaW5rQWN0aXZlYFxuICAgIC8vIHdoaWNoIHJlc3VsdCBpbiBkdXBsaWNhdGVkIGNhbGwgbmdPbkluaXQgd2l0aG91dCBjYWxsIHRvIG5nT25EZXN0cm95XG4gICAgLy8gcmVhZCBtb3JlOiBodHRwczovL2dpdGh1Yi5jb20vdmFsb3Itc29mdHdhcmUvbmd4LWJvb3RzdHJhcC9pc3N1ZXMvMTg4NVxuICAgIGlmICh0aGlzLl9pc0luaXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc0luaXRlZCA9IHRydWU7XG5cbiAgICB0aGlzLl9wb3BvdmVyLmxpc3Rlbih7XG4gICAgICB0cmlnZ2VyczogdGhpcy50cmlnZ2VycyxcbiAgICAgIG91dHNpZGVDbGljazogdGhpcy5vdXRzaWRlQ2xpY2ssXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcG9wb3Zlci5kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4vcG9wb3Zlci5jb25maWcnO1xuaW1wb3J0IHsgUG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vcG9wb3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1BvcG92ZXJEaXJlY3RpdmUsIFBvcG92ZXJDb250YWluZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUG9wb3ZlckRpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1BvcG92ZXJDb250YWluZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFBvcG92ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtQb3BvdmVyQ29uZmlnLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5LCBQb3NpdGlvbmluZ1NlcnZpY2VdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBU0E7Ozs7O3lCQUljLEtBQUs7Ozs7O3dCQUtOLE9BQU87NEJBRUgsS0FBSzs7OztZ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

    /***/
  },

  /***/
  "./node_modules/ngx-bootstrap/progressbar/fesm2015/ngx-bootstrap-progressbar.js":
  /*!**************************************************************************************!*\
    !*** ./node_modules/ngx-bootstrap/progressbar/fesm2015/ngx-bootstrap-progressbar.js ***!
    \**************************************************************************************/

  /*! exports provided: BarComponent, ProgressbarComponent, ProgressbarModule, ProgressbarConfig */

  /***/
  function node_modulesNgxBootstrapProgressbarFesm2015NgxBootstrapProgressbarJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BarComponent", function () {
      return BarComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ProgressbarComponent", function () {
      return ProgressbarComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ProgressbarModule", function () {
      return ProgressbarModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ProgressbarConfig", function () {
      return ProgressbarConfig;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ngx-bootstrap/utils */
    "./node_modules/ngx-bootstrap/utils/fesm2015/ngx-bootstrap-utils.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */


    var ProgressbarConfig = function ProgressbarConfig() {
      _classCallCheck(this, ProgressbarConfig);

      /**
       * if `true` changing value of progress bar will be animated
       */
      this.animate = false;
      /**
       * maximum total value of progress element
       */

      this.max = 100;
    };

    ProgressbarConfig.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var ProgressbarComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} config
       */
      function ProgressbarComponent(config) {
        _classCallCheck(this, ProgressbarComponent);

        this.isStacked = false;
        this.addClass = true;
        /* tslint:disable-next-line:no-any */

        this.bars = [];
        this._max = 100;
        Object.assign(this, config);
      }
      /**
       * if `true` changing value of progress bar will be animated
       * @param {?} value
       * @return {?}
       */


      _createClass(ProgressbarComponent, [{
        key: "addBar",

        /**
         * @param {?} bar
         * @return {?}
         */
        value: function addBar(bar) {
          bar.animate = this._animate;
          bar.striped = this._striped;
          this.bars.push(bar);
        }
        /**
         * @param {?} bar
         * @return {?}
         */

      }, {
        key: "removeBar",
        value: function removeBar(bar) {
          this.bars.splice(this.bars.indexOf(bar), 1);
        }
      }, {
        key: "animate",
        set: function set(value) {
          this._animate = value;
          this.bars.forEach(function (b) {
            b.animate = value;
          });
        }
        /**
         * If `true`, striped classes are applied
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "striped",
        set: function set(value) {
          this._striped = value;
          this.bars.forEach(function (b) {
            b.striped = value;
          });
        }
        /**
         * current value of progress bar. Could be a number or array of objects
         * like {"value":15,"type":"info","label":"15 %"}
         * @param {?} value
         * @return {?}
         */

        /* tslint:disable-next-line:no-any */

      }, {
        key: "value",
        set: function set(value) {
          this.isStacked = Array.isArray(value);
          this._value = value;
        }
        /**
         * @return {?}
         */

      }, {
        key: "isBs3",
        get: function get() {
          return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        }
        /**
         * maximum total value of progress element
         * @return {?}
         */

      }, {
        key: "max",
        get: function get() {
          return this._max;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          this._max = v;
          this.bars.forEach(function (bar) {
            bar.recalculatePercentage();
          });
        }
      }]);

      return ProgressbarComponent;
    }();

    ProgressbarComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'progressbar',
        template: "<bar [type]=\"type\" [value]=\"_value\" *ngIf=\"!isStacked\">\n  <ng-content></ng-content>\n</bar>\n<ng-template [ngIf]=\"isStacked\">\n  <bar *ngFor=\"let item of _value\" [type]=\"item.type\" [value]=\"item.value\">{{ item.label }}</bar>\n</ng-template>\n",
        styles: ["\n    :host {\n      width: 100%;\n      display: flex;\n    }\n  "]
      }]
    }];
    /** @nocollapse */

    ProgressbarComponent.ctorParameters = function () {
      return [{
        type: ProgressbarConfig
      }];
    };

    ProgressbarComponent.propDecorators = {
      "animate": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "striped": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "type": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "value": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "max": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['attr.max']
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "addClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.progress']
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var BarComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} progress
       */
      function BarComponent(progress) {
        _classCallCheck(this, BarComponent);

        this.percent = 0;
        this.progress = progress;
      }
      /**
       * current value of progress bar
       * @return {?}
       */


      _createClass(BarComponent, [{
        key: "ngOnInit",

        /**
         * @return {?}
         */
        value: function ngOnInit() {
          this.progress.addBar(this);
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.progress.removeBar(this);
        }
        /**
         * @return {?}
         */

      }, {
        key: "recalculatePercentage",
        value: function recalculatePercentage() {
          this.percent = +(this.value / this.progress.max * 100).toFixed(2);
          var
          /** @type {?} */
          totalPercentage = this.progress.bars.reduce(function (total, bar) {
            return total + bar.percent;
          }, 0);

          if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
          }
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        }
        /**
         * @param {?} v
         * @return {?}
         */
        ,
        set: function set(v) {
          if (!v && v !== 0) {
            return;
          }

          this._value = v;
          this.recalculatePercentage();
        }
        /**
         * @return {?}
         */

      }, {
        key: "setBarWidth",
        get: function get() {
          this.recalculatePercentage();
          return this.percent;
        }
        /**
         * @return {?}
         */

      }, {
        key: "isBs3",
        get: function get() {
          return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        }
      }]);

      return BarComponent;
    }();

    BarComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'bar',
        template: "<ng-content></ng-content>\n",
        host: {
          role: 'progressbar',
          'aria-valuemin': '0',
          '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
          '[class.progress-bar-animated]': '!isBs3 && animate',
          '[class.progress-bar-striped]': 'striped',
          '[class.active]': 'isBs3 && animate',
          '[attr.aria-valuenow]': 'value',
          '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
          '[attr.aria-valuemax]': 'max',
          '[style.height.%]': '"100"'
        }
      }]
    }];
    /** @nocollapse */

    BarComponent.ctorParameters = function () {
      return [{
        type: ProgressbarComponent,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
        }]
      }];
    };

    BarComponent.propDecorators = {
      "type": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "value": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "setBarWidth": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['style.width.%']
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var ProgressbarModule =
    /*#__PURE__*/
    function () {
      function ProgressbarModule() {
        _classCallCheck(this, ProgressbarModule);
      }

      _createClass(ProgressbarModule, null, [{
        key: "forRoot",

        /**
         * @return {?}
         */
        value: function forRoot() {
          return {
            ngModule: ProgressbarModule,
            providers: [ProgressbarConfig]
          };
        }
      }]);

      return ProgressbarModule;
    }();

    ProgressbarModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
        declarations: [BarComponent, ProgressbarComponent],
        exports: [BarComponent, ProgressbarComponent]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1wcm9ncmVzc2Jhci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtYm9vdHN0cmFwL3Byb2dyZXNzYmFyL2Jhci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzYmFyQ29uZmlnIHtcbiAgLyoqIGlmIGB0cnVlYCBjaGFuZ2luZyB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgd2lsbCBiZSBhbmltYXRlZCAqL1xuICBhbmltYXRlOiBCb29sZWFuID0gZmFsc2U7XG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cbiAgbWF4ID0gMTAwO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2dyZXNzYmFyQ29uZmlnIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb25maWcnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2dyZXNzYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2JhckNvbXBvbmVudCB7XG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKi9cbiAgQElucHV0KClcbiAgc2V0IGFuaW1hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbmltYXRlID0gdmFsdWU7XG4gICAgdGhpcy5iYXJzLmZvckVhY2goKGI6IEJhckNvbXBvbmVudCkgPT4ge1xuICAgICAgYi5hbmltYXRlID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cbiAgLyoqIElmIGB0cnVlYCwgc3RyaXBlZCBjbGFzc2VzIGFyZSBhcHBsaWVkICovXG4gIEBJbnB1dCgpXG4gIHNldCBzdHJpcGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RyaXBlZCA9IHZhbHVlO1xuICAgIHRoaXMuYmFycy5mb3JFYWNoKChiOiBCYXJDb21wb25lbnQpID0+IHtcbiAgICAgIGIuc3RyaXBlZCA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyLiBDb3VsZCBiZSBhIG51bWJlciBvciBhcnJheSBvZiBvYmplY3RzXG4gICAqIGxpa2Uge1widmFsdWVcIjoxNSxcInR5cGVcIjpcImluZm9cIixcImxhYmVsXCI6XCIxNSAlXCJ9XG4gICAqL1xuICBASW5wdXQoKVxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyIHwgYW55W10pIHtcbiAgICB0aGlzLmlzU3RhY2tlZCA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbiAgaXNTdGFja2VkID0gZmFsc2U7XG4gIF9zdHJpcGVkOiBib29sZWFuO1xuICBfYW5pbWF0ZTogYm9vbGVhbjtcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBfdmFsdWU6IG51bWJlciB8IGFueVtdO1xuICBnZXQgaXNCczMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzQnMzKCk7XG4gIH1cblxuICAvKiogbWF4aW11bSB0b3RhbCB2YWx1ZSBvZiBwcm9ncmVzcyBlbGVtZW50ICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5tYXgnKVxuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuXG4gIHNldCBtYXgodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWF4ID0gdjtcbiAgICB0aGlzLmJhcnMuZm9yRWFjaCgoYmFyOiBCYXJDb21wb25lbnQpID0+IHtcbiAgICAgIGJhci5yZWNhbGN1bGF0ZVBlcmNlbnRhZ2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucHJvZ3Jlc3MnKSBhZGRDbGFzcyA9IHRydWU7XG5cbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBiYXJzOiBCYXJDb21wb25lbnRbXSA9IFtdO1xuXG4gIHByb3RlY3RlZCBfbWF4ID0gMTAwO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUHJvZ3Jlc3NiYXJDb25maWcpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gIH1cbiAgYWRkQmFyKGJhcjogQmFyQ29tcG9uZW50KTogdm9pZCB7XG4gICAgYmFyLmFuaW1hdGUgPSB0aGlzLl9hbmltYXRlO1xuICAgIGJhci5zdHJpcGVkID0gdGhpcy5fc3RyaXBlZDtcblxuICAgIHRoaXMuYmFycy5wdXNoKGJhcik7XG4gIH1cblxuICByZW1vdmVCYXIoYmFyOiBCYXJDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmJhcnMuc3BsaWNlKHRoaXMuYmFycy5pbmRleE9mKGJhciksIDEpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3QsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFByb2dyZXNzYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcblxuLy8gdG9kbzogbnVtYmVyIHBpcGVcbi8vIHRvZG86IHVzZSBxdWVyeSBmcm9tIHByb2dyZXNzP1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhci5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxuICAgICdbY2xhc3NdJzogJ1wicHJvZ3Jlc3MtYmFyIFwiICsgKHR5cGUgPyBcInByb2dyZXNzLWJhci1cIiArIHR5cGUgKyBcIiBiZy1cIiArIHR5cGUgOiBcIlwiKScsXG4gICAgJ1tjbGFzcy5wcm9ncmVzcy1iYXItYW5pbWF0ZWRdJzogJyFpc0JzMyAmJiBhbmltYXRlJyxcbiAgICAnW2NsYXNzLnByb2dyZXNzLWJhci1zdHJpcGVkXSc6ICdzdHJpcGVkJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnaXNCczMgJiYgYW5pbWF0ZScsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVub3ddJzogJ3ZhbHVlJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZXRleHRdJzogJ3BlcmNlbnQgPyBwZXJjZW50LnRvRml4ZWQoMCkgKyBcIiVcIiA6IFwiXCInLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxuICAgICdbc3R5bGUuaGVpZ2h0LiVdJzogJ1wiMTAwXCInXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBtYXg6IG51bWJlcjtcblxuICAvKiogcHJvdmlkZSBvbmUgb2YgdGhlIGZvdXIgc3VwcG9ydGVkIGNvbnRleHR1YWwgY2xhc3NlczogYHN1Y2Nlc3NgLCBgaW5mb2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIC8qKiBjdXJyZW50IHZhbHVlIG9mIHByb2dyZXNzIGJhciAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodjogbnVtYmVyKSB7XG4gICAgaWYgKCF2ICYmIHYgIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICAgIHRoaXMucmVjYWxjdWxhdGVQZXJjZW50YWdlKCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLiUnKVxuICBnZXQgc2V0QmFyV2lkdGgoKSB7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZVBlcmNlbnRhZ2UoKTtcblxuICAgIHJldHVybiB0aGlzLnBlcmNlbnQ7XG4gIH1cblxuICBnZXQgaXNCczMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzQnMzKCk7XG4gIH1cblxuICBzdHJpcGVkOiBib29sZWFuO1xuICBhbmltYXRlOiBib29sZWFuO1xuICBwZXJjZW50ID0gMDtcbiAgcHJvZ3Jlc3M6IFByb2dyZXNzYmFyQ29tcG9uZW50O1xuXG4gIHByb3RlY3RlZCBfdmFsdWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihASG9zdCgpIHByb2dyZXNzOiBQcm9ncmVzc2JhckNvbXBvbmVudCkge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucHJvZ3Jlc3MuYWRkQmFyKHRoaXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wcm9ncmVzcy5yZW1vdmVCYXIodGhpcyk7XG4gIH1cblxuICByZWNhbGN1bGF0ZVBlcmNlbnRhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5wZXJjZW50ID0gKyh0aGlzLnZhbHVlIC8gdGhpcy5wcm9ncmVzcy5tYXggKiAxMDApLnRvRml4ZWQoMik7XG5cbiAgICBjb25zdCB0b3RhbFBlcmNlbnRhZ2UgPSB0aGlzLnByb2dyZXNzLmJhcnNcbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHRvdGFsOiBudW1iZXIsIGJhcjogQmFyQ29tcG9uZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRvdGFsICsgYmFyLnBlcmNlbnQ7XG4gICAgICB9LCAwKTtcblxuICAgIGlmICh0b3RhbFBlcmNlbnRhZ2UgPiAxMDApIHtcbiAgICAgIHRoaXMucGVyY2VudCAtPSB0b3RhbFBlcmNlbnRhZ2UgLSAxMDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NiYXJDb25maWcgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtCYXJDb21wb25lbnQsIFByb2dyZXNzYmFyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0JhckNvbXBvbmVudCwgUHJvZ3Jlc3NiYXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzYmFyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IFByb2dyZXNzYmFyTW9kdWxlLCBwcm92aWRlcnM6IFtQcm9ncmVzc2JhckNvbmZpZ10gfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7O3VCQUtxQixLQUFLOzs7O21CQUVsQixHQUFHOzs7O1lBTFYsVUFBVTs7Ozs7OztBQ0ZYOzs7O0lBNEVFLFlBQVksTUFBeUI7eUJBOUJ6QixLQUFLO3dCQXVCeUIsSUFBSTs7b0JBR3ZCLEVBQUU7b0JBRVIsR0FBRztRQUdsQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3Qjs7Ozs7O1FBMURHLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBZTtZQUNoQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNuQixDQUFDLENBQUM7Ozs7Ozs7UUFJRCxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWU7WUFDaEMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkIsQ0FBQyxDQUFDOzs7Ozs7Ozs7UUFVRCxLQUFLLENBQUMsS0FBcUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RD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

    /***/
  },

  /***/
  "./node_modules/ngx-bootstrap/tooltip/fesm2015/ngx-bootstrap-tooltip.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/ngx-bootstrap/tooltip/fesm2015/ngx-bootstrap-tooltip.js ***!
    \******************************************************************************/

  /*! exports provided: TooltipContainerComponent, TooltipDirective, TooltipModule, TooltipConfig */

  /***/
  function node_modulesNgxBootstrapTooltipFesm2015NgxBootstrapTooltipJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TooltipContainerComponent", function () {
      return TooltipContainerComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TooltipDirective", function () {
      return TooltipDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TooltipModule", function () {
      return TooltipModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TooltipConfig", function () {
      return TooltipConfig;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ngx-bootstrap/utils */
    "./node_modules/ngx-bootstrap/utils/fesm2015/ngx-bootstrap-utils.js");
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var ngx_bootstrap_component_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-bootstrap/component-loader */
    "./node_modules/ngx-bootstrap/component-loader/fesm2015/ngx-bootstrap-component-loader.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-bootstrap/positioning */
    "./node_modules/ngx-bootstrap/positioning/fesm2015/ngx-bootstrap-positioning.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * Default values provider for tooltip
     */


    var TooltipConfig = function TooltipConfig() {
      _classCallCheck(this, TooltipConfig);

      /**
       * tooltip placement, supported positions: 'top', 'bottom', 'left', 'right'
       */
      this.placement = 'top';
      /**
       * array of event names which triggers tooltip opening
       */

      this.triggers = 'hover focus';
      /**
       * delay before showing the tooltip
       */

      this.delay = 0;
    };

    TooltipConfig.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var TooltipContainerComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} config
       */
      function TooltipContainerComponent(config) {
        _classCallCheck(this, TooltipContainerComponent);

        Object.assign(this, config);
      }
      /**
       * @return {?}
       */


      _createClass(TooltipContainerComponent, [{
        key: "ngAfterViewInit",

        /**
         * @return {?}
         */
        value: function ngAfterViewInit() {
          this.classMap = {
            in: false,
            fade: false
          };
          this.classMap[this.placement] = true;
          this.classMap["tooltip-".concat(this.placement)] = true;
          this.classMap["in"] = true;

          if (this.animation) {
            this.classMap["fade"] = true;
          }

          if (this.containerClass) {
            this.classMap[this.containerClass] = true;
          }
        }
      }, {
        key: "isBs3",
        get: function get() {
          return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        }
      }]);

      return TooltipContainerComponent;
    }();

    TooltipContainerComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'bs-tooltip-container',
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        // tslint:disable-next-line
        host: {
          '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
          '[class.show]': '!isBs3',
          '[class.bs3]': 'isBs3',
          '[attr.id]': 'this.id',
          role: 'tooltip'
        },
        template: "\n    <div class=\"tooltip-arrow arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    ",
        styles: ["\n    :host.tooltip {\n      display: block;\n      pointer-events: none;\n    }\n    :host.bs3.tooltip.top>.arrow {\n      margin-left: -2px;\n    }\n    :host.bs3.tooltip.bottom {\n      margin-top: 0px;\n    }\n    :host.bs3.bs-tooltip-left, :host.bs3.bs-tooltip-right{\n      margin: 0px;\n    }\n    :host.bs3.bs-tooltip-right .arrow, :host.bs3.bs-tooltip-left .arrow {\n      margin: .3rem 0;\n    }\n  "]
      }]
    }];
    /** @nocollapse */

    TooltipContainerComponent.ctorParameters = function () {
      return [{
        type: TooltipConfig
      }];
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */


    var
    /** @type {?} */
    id = 0;

    var TooltipDirective =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} _viewContainerRef
       * @param {?} _renderer
       * @param {?} _elementRef
       * @param {?} cis
       * @param {?} config
       */
      function TooltipDirective(_viewContainerRef, _renderer, _elementRef, cis, config) {
        _classCallCheck(this, TooltipDirective);

        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.tooltipId = id++;
        /**
         * Fired when tooltip content changes
         */

        /* tslint:disable-next-line:no-any */

        this.tooltipChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * Css class for tooltip container
         */

        this.containerClass = '';
        /**
         * @deprecated - removed, will be added to configuration
         */

        this.tooltipAnimation = true;
        /**
         * @deprecated
         */

        this.tooltipFadeDuration = 150;
        this.ariaDescribedby = "tooltip-".concat(this.tooltipId);
        /**
         * @deprecated
         */

        this.tooltipStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._tooltip = cis.createLoader(this._elementRef, _viewContainerRef, this._renderer).provide({
          provide: TooltipConfig,
          useValue: config
        });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
      }
      /**
       * Returns whether or not the tooltip is currently being shown
       * @return {?}
       */


      _createClass(TooltipDirective, [{
        key: "ngOnInit",

        /**
         * @return {?}
         */
        value: function ngOnInit() {
          var _this4 = this;

          this._tooltip.listen({
            triggers: this.triggers,
            show: function show() {
              return _this4.show();
            }
          });
          /* tslint:disable-next-line:no-any */


          this.tooltipChange.subscribe(function (value) {
            if (!value) {
              _this4._tooltip.hide();
            }
          });
        }
        /**
         * Toggles an element’s tooltip. This is considered a “manual” triggering of
         * the tooltip.
         * @return {?}
         */

      }, {
        key: "toggle",
        value: function toggle() {
          if (this.isOpen) {
            return this.hide();
          }

          this.show();
        }
        /**
         * Opens an element’s tooltip. This is considered a “manual” triggering of
         * the tooltip.
         * @return {?}
         */

      }, {
        key: "show",
        value: function show() {
          var _this5 = this;

          if (this.isOpen || this.isDisabled || this._delayTimeoutId || !this.tooltip) {
            return;
          }

          var
          /** @type {?} */
          showTooltip = function showTooltip() {
            if (_this5._delayTimeoutId) {
              _this5._delayTimeoutId = undefined;
            }

            _this5._tooltip.attach(TooltipContainerComponent).to(_this5.container).position({
              attachment: _this5.placement
            }).show({
              content: _this5.tooltip,
              placement: _this5.placement,
              containerClass: _this5.containerClass,
              id: _this5.ariaDescribedby
            });
          };

          var
          /** @type {?} */
          cancelDelayedTooltipShowing = function cancelDelayedTooltipShowing() {
            if (_this5._tooltipCancelShowFn) {
              _this5._tooltipCancelShowFn();
            }
          };

          if (this.delay) {
            var
            /** @type {?} */
            _timer = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(this.delay).subscribe(function () {
              showTooltip();
              cancelDelayedTooltipShowing();
            });

            if (this.triggers) {
              var
              /** @type {?} */
              triggers = Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["parseTriggers"])(this.triggers);
              this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, function () {
                _timer.unsubscribe();

                cancelDelayedTooltipShowing();
              });
            }
          } else {
            showTooltip();
          }
        }
        /**
         * Closes an element’s tooltip. This is considered a “manual” triggering of
         * the tooltip.
         * @return {?}
         */

      }, {
        key: "hide",
        value: function hide() {
          var _this6 = this;

          if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
          }

          if (!this._tooltip.isShown) {
            return;
          }

          this._tooltip.instance.classMap["in"] = false;
          setTimeout(function () {
            _this6._tooltip.hide();
          }, this.tooltipFadeDuration);
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this._tooltip.dispose();
        }
      }, {
        key: "isOpen",
        get: function get() {
          return this._tooltip.isShown;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
          if (value) {
            this.show();
          } else {
            this.hide();
          }
        }
        /**
         * @deprecated - please use `tooltip` instead
         * @param {?} value
         * @return {?}
         */

        /* tslint:disable-next-line:no-any */

      }, {
        key: "htmlContent",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipHtml was deprecated, please use `tooltip` instead');
          this.tooltip = value;
        }
        /**
         * @deprecated - please use `placement` instead
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_placement",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipPlacement was deprecated, please use `placement` instead');
          this.placement = value;
        }
        /**
         * @deprecated - please use `isOpen` instead
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_isOpen",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipIsOpen was deprecated, please use `isOpen` instead');
          this.isOpen = value;
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipIsOpen was deprecated, please use `isOpen` instead');
          return this.isOpen;
        }
        /**
         * @deprecated - please use `isDisabled` instead
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_enable",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipEnable was deprecated, please use `isDisabled` instead');
          this.isDisabled = !value;
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipEnable was deprecated, please use `isDisabled` instead');
          return this.isDisabled;
        }
        /**
         * @deprecated - please use `container="body"` instead
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_appendToBody",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipAppendToBody was deprecated, please use `container="body"` instead');
          this.container = value ? 'body' : this.container;
        }
        /**
         * @return {?}
         */
        ,
        get: function get() {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipAppendToBody was deprecated, please use `container="body"` instead');
          return this.container === 'body';
        }
        /**
         * @deprecated - will replaced with customClass
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_popupClass",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipClass deprecated');
        }
        /**
         * @deprecated - removed
         * @param {?} value
         * @return {?}
         */

        /* tslint:disable-next-line:no-any */

      }, {
        key: "_tooltipContext",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipContext deprecated');
        }
        /**
         * @deprecated
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_tooltipPopupDelay",
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipPopupDelay is deprecated, use `delay` instead');
          this.delay = value;
        }
        /**
         * @deprecated -  please use `triggers` instead
         * @return {?}
         */

      }, {
        key: "_tooltipTrigger",
        get: function get() {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipTrigger was deprecated, please use `triggers` instead');
          return this.triggers;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
          Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["warnOnce"])('tooltipTrigger was deprecated, please use `triggers` instead');
          this.triggers = (value || '').toString();
        }
      }]);

      return TooltipDirective;
    }();

    TooltipDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[tooltip], [tooltipHtml]',
        exportAs: 'bs-tooltip'
      }]
    }];
    /** @nocollapse */

    TooltipDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: ngx_bootstrap_component_loader__WEBPACK_IMPORTED_MODULE_3__["ComponentLoaderFactory"]
      }, {
        type: TooltipConfig
      }];
    };

    TooltipDirective.propDecorators = {
      "tooltip": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "tooltipChange": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "placement": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "triggers": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "container": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "containerClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "isOpen": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "isDisabled": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "delay": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "onShown": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "onHidden": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      "htmlContent": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipHtml']
      }],
      "_placement": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipPlacement']
      }],
      "_isOpen": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipIsOpen']
      }],
      "_enable": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipEnable']
      }],
      "_appendToBody": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipAppendToBody']
      }],
      "tooltipAnimation": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "_popupClass": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipClass']
      }],
      "_tooltipContext": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipContext']
      }],
      "_tooltipPopupDelay": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipPopupDelay']
      }],
      "tooltipFadeDuration": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      "_tooltipTrigger": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['tooltipTrigger']
      }],
      "ariaDescribedby": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['attr.aria-describedby']
      }],
      "tooltipStateChanged": [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }]
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["OnChange"])(), Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__metadata"])("design:type", Object)], TooltipDirective.prototype, "tooltip", void 0);
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    var TooltipModule =
    /*#__PURE__*/
    function () {
      function TooltipModule() {
        _classCallCheck(this, TooltipModule);
      }

      _createClass(TooltipModule, null, [{
        key: "forRoot",

        /**
         * @return {?}
         */
        value: function forRoot() {
          return {
            ngModule: TooltipModule,
            providers: [TooltipConfig, ngx_bootstrap_component_loader__WEBPACK_IMPORTED_MODULE_3__["ComponentLoaderFactory"], ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_6__["PositioningService"]]
          };
        }
      }]);

      return TooltipModule;
    }();

    TooltipModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"]],
        declarations: [TooltipDirective, TooltipContainerComponent],
        exports: [TooltipDirective],
        entryComponents: [TooltipContainerComponent]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC10b29sdGlwLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtYm9vdHN0cmFwL3Rvb2x0aXAvdG9vbHRpcC5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC90b29sdGlwL3Rvb2x0aXAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIERlZmF1bHQgdmFsdWVzIHByb3ZpZGVyIGZvciB0b29sdGlwICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbmZpZyB7XG4gIC8qKiB0b29sdGlwIHBsYWNlbWVudCwgc3VwcG9ydGVkIHBvc2l0aW9uczogJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcgKi9cbiAgcGxhY2VtZW50ID0gJ3RvcCc7XG4gIC8qKiBhcnJheSBvZiBldmVudCBuYW1lcyB3aGljaCB0cmlnZ2VycyB0b29sdGlwIG9wZW5pbmcgKi9cbiAgdHJpZ2dlcnMgPSAnaG92ZXIgZm9jdXMnO1xuICAvKiogYSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0b29sdGlwIHNob3VsZCBiZSBhcHBlbmRlZCB0by4gQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIgKi9cbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIC8qKiBkZWxheSBiZWZvcmUgc2hvd2luZyB0aGUgdG9vbHRpcCAqL1xuICBkZWxheSA9IDA7XG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcENvbmZpZyB9IGZyb20gJy4vdG9vbHRpcC5jb25maWcnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnMtdG9vbHRpcC1jb250YWluZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6XG4gICAgICAnXCJ0b29sdGlwIGluIHRvb2x0aXAtXCIgKyBwbGFjZW1lbnQgKyBcIiBcIiArIFwiYnMtdG9vbHRpcC1cIiArIHBsYWNlbWVudCArIFwiIFwiICsgcGxhY2VtZW50ICsgXCIgXCIgKyBjb250YWluZXJDbGFzcycsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICchaXNCczMnLFxuICAgICdbY2xhc3MuYnMzXSc6ICdpc0JzMycsXG4gICAgJ1thdHRyLmlkXSc6ICd0aGlzLmlkJyxcbiAgICByb2xlOiAndG9vbHRpcCdcbiAgfSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0LnRvb2x0aXAge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB9XG4gICAgOmhvc3QuYnMzLnRvb2x0aXAudG9wPi5hcnJvdyB7XG4gICAgICBtYXJnaW4tbGVmdDogLTJweDtcbiAgICB9XG4gICAgOmhvc3QuYnMzLnRvb2x0aXAuYm90dG9tIHtcbiAgICAgIG1hcmdpbi10b3A6IDBweDtcbiAgICB9XG4gICAgOmhvc3QuYnMzLmJzLXRvb2x0aXAtbGVmdCwgOmhvc3QuYnMzLmJzLXRvb2x0aXAtcmlnaHR7XG4gICAgICBtYXJnaW46IDBweDtcbiAgICB9XG4gICAgOmhvc3QuYnMzLmJzLXRvb2x0aXAtcmlnaHQgLmFycm93LCA6aG9zdC5iczMuYnMtdG9vbHRpcC1sZWZ0IC5hcnJvdyB7XG4gICAgICBtYXJnaW46IC4zcmVtIDA7XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3cgYXJyb3dcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY2xhc3NNYXA6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xuICBwbGFjZW1lbnQ6IHN0cmluZztcbiAgY29udGFpbmVyQ2xhc3M6IHN0cmluZztcbiAgYW5pbWF0aW9uOiBib29sZWFuO1xuICBpZDogc3RyaW5nO1xuXG4gIGdldCBpc0JzMygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCczMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogVG9vbHRpcENvbmZpZykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsYXNzTWFwID0geyBpbjogZmFsc2UsIGZhZGU6IGZhbHNlIH07XG4gICAgdGhpcy5jbGFzc01hcFt0aGlzLnBsYWNlbWVudF0gPSB0cnVlO1xuICAgIHRoaXMuY2xhc3NNYXBbYHRvb2x0aXAtJHt0aGlzLnBsYWNlbWVudH1gXSA9IHRydWU7XG5cbiAgICB0aGlzLmNsYXNzTWFwLmluID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuY2xhc3NNYXAuZmFkZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udGFpbmVyQ2xhc3MpIHtcbiAgICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5jb250YWluZXJDbGFzc10gPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIiwiLyogdHNsaW50OmRpc2FibGU6IG1heC1maWxlLWxpbmUtY291bnQgZGVwcmVjYXRpb24gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9vbHRpcENvbmZpZyB9IGZyb20gJy4vdG9vbHRpcC5jb25maWcnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcbmltcG9ydCB7IE9uQ2hhbmdlLCB3YXJuT25jZSwgcGFyc2VUcmlnZ2VycyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcblxubGV0IGlkID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Rvb2x0aXBdLCBbdG9vbHRpcEh0bWxdJyxcbiAgZXhwb3J0QXM6ICdicy10b29sdGlwJ1xufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICB0b29sdGlwSWQgPSBpZCsrO1xuICAvKipcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgdG9vbHRpcC5cbiAgICovXG4gIEBPbkNoYW5nZSgpXG4gIEBJbnB1dCgpXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgdG9vbHRpcDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqIEZpcmVkIHdoZW4gdG9vbHRpcCBjb250ZW50IGNoYW5nZXMgKi9cbiAgQE91dHB1dCgpXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgdG9vbHRpcENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSB0b29sdGlwLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuICAvKipcbiAgICogQ3NzIGNsYXNzIGZvciB0b29sdGlwIGNvbnRhaW5lclxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyQ2xhc3MgPSAnJztcbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHRvb2x0aXAgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90b29sdGlwLmlzU2hvd247XG4gIH1cblxuICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyB0byBkaXNhYmxlIHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlbGF5IGJlZm9yZSBzaG93aW5nIHRoZSB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIHNob3duXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIEBPdXRwdXQoKSBvblNob3duOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHRvb2x0aXAgaXMgaGlkZGVuXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIEBPdXRwdXQoKSBvbkhpZGRlbjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgdG9vbHRpcGAgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBIdG1sJylcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBzZXQgaHRtbENvbnRlbnQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcEh0bWwgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYHRvb2x0aXBgIGluc3RlYWQnKTtcbiAgICB0aGlzLnRvb2x0aXAgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHBsZWFzZSB1c2UgYHBsYWNlbWVudGAgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBQbGFjZW1lbnQnKVxuICBzZXQgX3BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBQbGFjZW1lbnQgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYHBsYWNlbWVudGAgaW5zdGVhZCcpO1xuICAgIHRoaXMucGxhY2VtZW50ID0gdmFsdWU7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGBpc09wZW5gIGluc3RlYWQgKi9cbiAgQElucHV0KCd0b29sdGlwSXNPcGVuJylcbiAgc2V0IF9pc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcElzT3BlbiB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkJyk7XG4gICAgdGhpcy5pc09wZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBfaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwSXNPcGVuIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBpc09wZW5gIGluc3RlYWQnKTtcblxuICAgIHJldHVybiB0aGlzLmlzT3BlbjtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQgKi9cbiAgQElucHV0KCd0b29sdGlwRW5hYmxlJylcbiAgc2V0IF9lbmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcEVuYWJsZSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNEaXNhYmxlZGAgaW5zdGVhZCcpO1xuICAgIHRoaXMuaXNEaXNhYmxlZCA9ICF2YWx1ZTtcbiAgfVxuXG4gIGdldCBfZW5hYmxlKCk6IGJvb2xlYW4ge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwRW5hYmxlIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBpc0Rpc2FibGVkYCBpbnN0ZWFkJyk7XG5cbiAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkICovXG4gIEBJbnB1dCgndG9vbHRpcEFwcGVuZFRvQm9keScpXG4gIHNldCBfYXBwZW5kVG9Cb2R5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgd2Fybk9uY2UoXG4gICAgICAndG9vbHRpcEFwcGVuZFRvQm9keSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkJ1xuICAgICk7XG4gICAgdGhpcy5jb250YWluZXIgPSB2YWx1ZSA/ICdib2R5JyA6IHRoaXMuY29udGFpbmVyO1xuICB9XG5cbiAgZ2V0IF9hcHBlbmRUb0JvZHkoKTogYm9vbGVhbiB7XG4gICAgd2Fybk9uY2UoXG4gICAgICAndG9vbHRpcEFwcGVuZFRvQm9keSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkJ1xuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIgPT09ICdib2R5JztcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHJlbW92ZWQsIHdpbGwgYmUgYWRkZWQgdG8gY29uZmlndXJhdGlvbiAqL1xuICBASW5wdXQoKSB0b29sdGlwQW5pbWF0aW9uID0gdHJ1ZTtcblxuICAvKiogQGRlcHJlY2F0ZWQgLSB3aWxsIHJlcGxhY2VkIHdpdGggY3VzdG9tQ2xhc3MgKi9cbiAgQElucHV0KCd0b29sdGlwQ2xhc3MnKVxuICBzZXQgX3BvcHVwQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwQ2xhc3MgZGVwcmVjYXRlZCcpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIC0gcmVtb3ZlZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBDb250ZXh0JylcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBzZXQgX3Rvb2x0aXBDb250ZXh0KHZhbHVlOiBhbnkpIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcENvbnRleHQgZGVwcmVjYXRlZCcpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIEBJbnB1dCgndG9vbHRpcFBvcHVwRGVsYXknKVxuICBzZXQgX3Rvb2x0aXBQb3B1cERlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB3YXJuT25jZSgndG9vbHRpcFBvcHVwRGVsYXkgaXMgZGVwcmVjYXRlZCwgdXNlIGBkZWxheWAgaW5zdGVhZCcpO1xuICAgIHRoaXMuZGVsYXkgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBASW5wdXQoKSB0b29sdGlwRmFkZUR1cmF0aW9uID0gMTUwO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCAtICBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXBUcmlnZ2VyJylcbiAgZ2V0IF90b29sdGlwVHJpZ2dlcigpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBUcmlnZ2VyIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCcpO1xuXG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlcnM7XG4gIH1cblxuICBzZXQgX3Rvb2x0aXBUcmlnZ2VyKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHdhcm5PbmNlKCd0b29sdGlwVHJpZ2dlciB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgdHJpZ2dlcnNgIGluc3RlYWQnKTtcbiAgICB0aGlzLnRyaWdnZXJzID0gKHZhbHVlIHx8ICcnKS50b1N0cmluZygpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnkgPSBgdG9vbHRpcC0ke3RoaXMudG9vbHRpcElkfWA7XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIEBPdXRwdXQoKVxuICB0b29sdGlwU3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgcHJvdGVjdGVkIF9kZWxheVRpbWVvdXRJZDogbnVtYmVyIHwgYW55O1xuICBwcm90ZWN0ZWQgX3Rvb2x0aXBDYW5jZWxTaG93Rm46IEZ1bmN0aW9uO1xuXG4gIHByaXZhdGUgX3Rvb2x0aXA6IENvbXBvbmVudExvYWRlcjxUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIGNpczogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcbiAgICBjb25maWc6IFRvb2x0aXBDb25maWdcbiAgKSB7XG5cbiAgICB0aGlzLl90b29sdGlwID0gY2lzXG4gICAgICAuY3JlYXRlTG9hZGVyPFRvb2x0aXBDb250YWluZXJDb21wb25lbnQ+KFxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLFxuICAgICAgICBfdmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJcbiAgICAgIClcbiAgICAgIC5wcm92aWRlKHtwcm92aWRlOiBUb29sdGlwQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gICAgdGhpcy5vblNob3duID0gdGhpcy5fdG9vbHRpcC5vblNob3duO1xuICAgIHRoaXMub25IaWRkZW4gPSB0aGlzLl90b29sdGlwLm9uSGlkZGVuO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9vbHRpcC5saXN0ZW4oe1xuICAgICAgdHJpZ2dlcnM6IHRoaXMudHJpZ2dlcnMsXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKVxuICAgIH0pO1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgICB0aGlzLnRvb2x0aXBDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTogYW55KSA9PiB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXAuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudMOiwoDCmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHRvb2x0aXAuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYW4gZWxlbWVudMOiwoDCmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHRvb2x0aXAuXG4gICAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaXNPcGVuIHx8XG4gICAgICB0aGlzLmlzRGlzYWJsZWQgfHxcbiAgICAgIHRoaXMuX2RlbGF5VGltZW91dElkIHx8XG4gICAgICAhdGhpcy50b29sdGlwXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXAgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fZGVsYXlUaW1lb3V0SWQpIHtcbiAgICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Rvb2x0aXBcbiAgICAgICAgLmF0dGFjaChUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50KVxuICAgICAgICAudG8odGhpcy5jb250YWluZXIpXG4gICAgICAgIC5wb3NpdGlvbih7YXR0YWNobWVudDogdGhpcy5wbGFjZW1lbnR9KVxuICAgICAgICAuc2hvdyh7XG4gICAgICAgICAgY29udGVudDogdGhpcy50b29sdGlwLFxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgY29udGFpbmVyQ2xhc3M6IHRoaXMuY29udGFpbmVyQ2xhc3MsXG4gICAgICAgICAgaWQ6IHRoaXMuYXJpYURlc2NyaWJlZGJ5XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgY2FuY2VsRGVsYXllZFRvb2x0aXBTaG93aW5nID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBDYW5jZWxTaG93Rm4pIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcENhbmNlbFNob3dGbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5kZWxheSkge1xuICAgICAgY29uc3QgX3RpbWVyID0gdGltZXIodGhpcy5kZWxheSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgc2hvd1Rvb2x0aXAoKTtcbiAgICAgICAgY2FuY2VsRGVsYXllZFRvb2x0aXBTaG93aW5nKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMudHJpZ2dlcnMpIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlcnMgPSBwYXJzZVRyaWdnZXJzKHRoaXMudHJpZ2dlcnMpO1xuICAgICAgICB0aGlzLl90b29sdGlwQ2FuY2VsU2hvd0ZuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJpZ2dlcnNbMF0uY2xvc2UsICgpID0+IHtcbiAgICAgICAgICBfdGltZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dUb29sdGlwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RlbGF5VGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlUaW1lb3V0SWQpO1xuICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl90b29sdGlwLmlzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl90b29sdGlwLmluc3RhbmNlLmNsYXNzTWFwLmluID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl90b29sdGlwLmhpZGUoKTtcbiAgICB9LCB0aGlzLnRvb2x0aXBGYWRlRHVyYXRpb24pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdG9vbHRpcC5kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2x0aXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2x0aXBDb25maWcgfSBmcm9tICcuL3Rvb2x0aXAuY29uZmlnJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUb29sdGlwRGlyZWN0aXZlLCBUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1Rvb2x0aXBEaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUb29sdGlwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbVG9vbHRpcENvbmZpZywgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSwgUG9zaXRpb25pbmdTZXJ2aWNlXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7O0FBSUE7Ozs7O3lCQUVjLEtBQUs7Ozs7d0JBRU4sYUFBYTs7OztxQkFJaEIsQ0FBQzs7OztZQVRWLFVBQVU7Ozs7Ozs7QUNIWDs7OztJQXdERSxZQUFZLE1BQXFCO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzdCOzs7O0lBTkQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxLQUFLLEVBQUUsQ0FBQztLQUNoQjs7OztJQU1ELGVBQWU7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFD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

    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/cards.component.html":
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/cards.component.html ***!
    \***************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseCardsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Card title\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n        <div class=\"card-footer\">Card footer</div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-check\"></i>Card with icon\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Card with switch\n          <label class=\"switch switch-sm switch-text switch-info float-right mb-0\">\n            <input type=\"checkbox\" class=\"switch-input\">\n            <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\n            <span class=\"switch-handle\"></span>\n          </label>\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Card with label\n          <span class=\"badge badge-success float-right\">Success</span>\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Card with label\n          <span class=\"badge badge-pill badge-danger float-right\">42</span>\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card border-primary\">\n        <div class=\"card-header\">\n          Card outline\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card border-secondary\">\n        <div class=\"card-header\">\n          Card outline\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card border-success\">\n        <div class=\"card-header\">\n          Card outline\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card border-info\">\n        <div class=\"card-header\">\n          Card outline\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card border-warning\">\n        <div class=\"card-header\">\n          Card outline\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card border-danger\">\n        <div class=\"card-header\">\n          Card outline\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card card-accent-primary\">\n        <div class=\"card-header\">\n          Card with accent\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card card-accent-secondary\">\n        <div class=\"card-header\">\n          Card with accent\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card card-accent-success\">\n        <div class=\"card-header\">\n          Card with accent\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card card-accent-info\">\n        <div class=\"card-header\">\n          Card with accent\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card card-accent-warning\">\n        <div class=\"card-header\">\n          Card with accent\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card card-accent-danger\">\n        <div class=\"card-header\">\n          Card with accent\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-primary text-center\">\n        <div class=\"card-body\">\n          <blockquote class=\"card-bodyquote\">\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n            <footer>Someone famous in\n              <cite title=\"Source Title\">Source Title</cite>\n            </footer>\n          </blockquote>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-success text-center\">\n        <div class=\"card-body\">\n          <blockquote class=\"card-bodyquote\">\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n            <footer>Someone famous in\n              <cite title=\"Source Title\">Source Title</cite>\n            </footer>\n          </blockquote>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-info text-center\">\n        <div class=\"card-body\">\n          <blockquote class=\"card-bodyquote\">\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n            <footer>Someone famous in\n              <cite title=\"Source Title\">Source Title</cite>\n            </footer>\n          </blockquote>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-warning text-center\">\n        <div class=\"card-body\">\n          <blockquote class=\"card-bodyquote\">\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n            <footer>Someone famous in\n              <cite title=\"Source Title\">Source Title</cite>\n            </footer>\n          </blockquote>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-danger text-center\">\n        <div class=\"card-body\">\n          <blockquote class=\"card-bodyquote\">\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n            <footer>Someone famous in\n              <cite title=\"Source Title\">Source Title</cite>\n            </footer>\n          </blockquote>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-primary text-center\">\n        <div class=\"card-body\">\n          <blockquote class=\"card-bodyquote\">\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\n            <footer>Someone famous in\n              <cite title=\"Source Title\">Source Title</cite>\n            </footer>\n          </blockquote>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-primary\">\n        <div class=\"card-header\">\n          Card title\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-success\">\n        <div class=\"card-header\">\n          Card title\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-info\">\n        <div class=\"card-header\">\n          Card title\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-warning\">\n        <div class=\"card-header\">\n          Card title\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-4\">\n      <div class=\"card text-white bg-danger\">\n        <div class=\"card-header\">\n          Card title\n        </div>\n        <div class=\"card-body\">\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/carousels.component.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/carousels.component.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseCarouselsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Bootstrap Carousel\n          <div class=\"card-header-actions\">\n            <a href=\"https://valor-software.com/ngx-bootstrap/#/carousel\" target=\"_blank\">\n              <small className=\"text-muted\">docs</small>\n            </a>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <carousel [interval]=\"3000\">\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/mountains?lock=1\" alt=\"First slide\" style=\"display: block; width: 100%;\">\n            </slide>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/mountains?lock=2\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\n            </slide>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/mountains?lock=3\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\n            </slide>\n          </carousel>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Carousel\n          <small> optional captions</small>\n        </div>\n        <div class=\"card-body\">\n          <carousel [interval]=\"4500\">\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/nature?lock=1\" alt=\"First slide\" style=\"display: block; width: 100%;\">\n              <div class=\"carousel-caption d-none d-md-block\">\n                <h3>First slide label</h3>\n                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\n              </div>\n            </slide>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/nature?lock=2\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\n              <div class=\"carousel-caption d-none d-md-block\">\n                <h3>Second slide label</h3>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n              </div>\n            </slide>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/nature?lock=3\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\n              <div class=\"carousel-caption d-none d-md-block\">\n                <h3>Third slide label</h3>\n                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\n              </div>\n            </slide>\n          </carousel>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Carousel\n          <small> configuring defaults</small>\n        </div>\n        <div class=\"card-body\">\n          <carousel>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/city?lock=1\" alt=\"First slide\" style=\"display: block; width: 100%;\">\n              <div class=\"carousel-caption d-none d-md-block\">\n                <h3>First slide label</h3>\n                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\n              </div>\n            </slide>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/city?lock=2\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\n              <div class=\"carousel-caption d-none d-md-block\">\n                <h3>Second slide label</h3>\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n              </div>\n            </slide>\n            <slide>\n              <img src=\"https://loremflickr.com/900/500/city?lock=3\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\n              <div class=\"carousel-caption d-none d-md-block\">\n                <h3>Third slide label</h3>\n                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\n              </div>\n            </slide>\n          </carousel>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Carousel\n          <small> dynamic slides</small>\n        </div>\n        <div class=\"card-body\">\n          <carousel [interval]=\"myInterval\" [noWrap]=\"noWrapSlides\" [(activeSlide)]=\"activeSlideIndex\">\n            <slide *ngFor=\"let slide of slides; let index=index\">\n              <img [src]=\"slide.image\" alt=\"image slide\" style=\"display: block; width: 100%;\">\n\n              <div class=\"carousel-caption\">\n                <h4>Slide {{index}}</h4>\n                <p>{{slide.text}}</p>\n              </div>\n            </slide>\n          </carousel>\n          <br/>\n          <div>\n            <button type=\"button\" class=\"btn btn-info\"\n                    (click)=\"addSlide()\">Add Slide\n            </button>\n            <button type=\"button\" class=\"btn btn-info\"\n                    (click)=\"removeSlide()\">Remove Current\n            </button>\n            <button type=\"button\" class=\"btn btn-info\"\n                    (click)=\"removeSlide(2)\">Remove #3\n            </button>\n          </div>\n          <div>\n            <div class=\"checkbox\">\n              <label><input type=\"checkbox\" [(ngModel)]=\"noWrapSlides\">Disable Slide Looping</label>\n            </div>\n\n            <span>Interval, in milliseconds (Enter a negative number or 0 to stop the interval.): </span>\n            <input type=\"number\" class=\"form-control\" [(ngModel)]=\"myInterval\">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/collapses.component.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/collapses.component.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseCollapsesComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Bootstrap Collapse\n      <div class=\"card-header-actions\">\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/collapse\" target=\"_blank\">\n          <small className=\"text-muted\">docs</small>\n        </a>\n      </div>\n    </div>\n    <div class=\"card-body\"\n         (collapsed)=\"collapsed($event)\"\n         (expanded)=\"expanded($event)\"\n         [collapse]=\"isCollapsed\">\n      <p>\n        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo\n        consequat.\n      </p>\n    </div>\n    <div class=\"card-footer\">\n      <button type=\"button\" class=\"btn btn-primary\"\n              (click)=\"isCollapsed = !isCollapsed\">Toggle collapse\n      </button>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/forms.component.html":
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/forms.component.html ***!
    \***************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseFormsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Credit Card</strong>\n          <small>Form</small>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <div class=\"form-group\">\n                <label for=\"name\">Name</label>\n                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Enter your name\">\n              </div>\n            </div>\n          </div><!--/.row-->\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <div class=\"form-group\">\n                <label for=\"ccnumber\">Credit Card Number</label>\n                <input type=\"text\" class=\"form-control\" id=\"ccnumber\" placeholder=\"0000 0000 0000 0000\">\n              </div>\n            </div>\n          </div><!--/.row-->\n          <div class=\"row\">\n            <div class=\"form-group col-sm-4\">\n              <label for=\"ccmonth\">Month</label>\n              <select class=\"form-control\" id=\"ccmonth\">\n                <option>1</option>\n                <option>2</option>\n                <option>3</option>\n                <option>4</option>\n                <option>5</option>\n                <option>6</option>\n                <option>7</option>\n                <option>8</option>\n                <option>9</option>\n                <option>10</option>\n                <option>11</option>\n                <option>12</option>\n              </select>\n            </div>\n            <div class=\"form-group col-sm-4\">\n              <label for=\"ccyear\">Year</label>\n              <select class=\"form-control\" id=\"ccyear\">\n                <option>2014</option>\n                <option>2015</option>\n                <option>2016</option>\n                <option>2017</option>\n                <option>2018</option>\n                <option>2019</option>\n                <option>2020</option>\n                <option>2021</option>\n                <option>2022</option>\n                <option>2023</option>\n                <option>2024</option>\n                <option>2025</option>\n              </select>\n            </div>\n            <div class=\"col-sm-4\">\n              <div class=\"form-group\">\n                <label for=\"cvv\">CVV/CVC</label>\n                <input type=\"text\" class=\"form-control\" id=\"cvv\" placeholder=\"123\">\n              </div>\n            </div>\n          </div><!--/.row-->\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Company</strong>\n          <small>Form</small>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"form-group\">\n            <label for=\"company\">Company</label>\n            <input type=\"text\" class=\"form-control\" id=\"company\" placeholder=\"Enter your company name\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"vat\">VAT</label>\n            <input type=\"text\" class=\"form-control\" id=\"vat\" placeholder=\"PL1234567890\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"street\">Street</label>\n            <input type=\"text\" class=\"form-control\" id=\"street\" placeholder=\"Enter street name\">\n          </div>\n          <div class=\"row\">\n            <div class=\"form-group col-sm-8\">\n              <label for=\"city\">City</label>\n              <input type=\"text\" class=\"form-control\" id=\"city\" placeholder=\"Enter your city\">\n            </div>\n            <div class=\"form-group col-sm-4\">\n              <label for=\"postal-code\">Postal Code</label>\n              <input type=\"text\" class=\"form-control\" id=\"postal-code\" placeholder=\"Postal Code\">\n            </div>\n          </div><!--/.row-->\n          <div class=\"form-group\">\n            <label for=\"country\">Country</label>\n            <input type=\"text\" class=\"form-control\" id=\"country\" placeholder=\"Country name\">\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Basic Form</strong> Elements\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" enctype=\"multipart/form-data\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\">Static</label>\n              <div class=\"col-md-9\">\n                <p class=\"form-control-static\">Username</p>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"text-input\">Text Input</label>\n              <div class=\"col-md-9\">\n                <input type=\"text\" id=\"text-input\" name=\"text-input\" class=\"form-control\" placeholder=\"Text\">\n                <span class=\"help-block\">This is a help text</span>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"email-input\">Email Input</label>\n              <div class=\"col-md-9\">\n                <input type=\"email\" id=\"email-input\" name=\"email-input\" class=\"form-control\" placeholder=\"Enter Email\" autocomplete=\"email\">\n                <span class=\"help-block\">Please enter your email</span>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"password-input\">Password</label>\n              <div class=\"col-md-9\">\n                <input type=\"password\" id=\"password-input\" name=\"password-input\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"current-password\">\n                <span class=\"help-block\">Please enter a complex password</span>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"date-input\">Date Input</label>\n              <div class=\"col-md-9\">\n                <input class=\"form-control\" id=\"date-input\" type=\"date\" name=\"date-input\" placeholder=\"date\">\n                <span class=\"help-block\">Please enter a valid date</span>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"disabled-input\">Disabled Input</label>\n              <div class=\"col-md-9\">\n                <input type=\"text\" id=\"disabled-input\" name=\"disabled-input\" class=\"form-control\" placeholder=\"Disabled\" disabled>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"textarea-input\">Textarea</label>\n              <div class=\"col-md-9\">\n                <textarea id=\"textarea-input\" name=\"textarea-input\" rows=\"9\" class=\"form-control\" placeholder=\"Content..\"></textarea>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"select1\">Select</label>\n              <div class=\"col-md-9\">\n                <select id=\"select1\" name=\"select1\" class=\"form-control\">\n                  <option value=\"0\">Please select</option>\n                  <option value=\"1\">Option #1</option>\n                  <option value=\"2\">Option #2</option>\n                  <option value=\"3\">Option #3</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"select2\">Select Large</label>\n              <div class=\"col-md-9\">\n                <select id=\"select2\" name=\"select2\" class=\"form-control form-control-lg\">\n                  <option value=\"0\">Please select</option>\n                  <option value=\"1\">Option #1</option>\n                  <option value=\"2\">Option #2</option>\n                  <option value=\"3\">Option #3</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"select3\">Select Small</label>\n              <div class=\"col-md-9\">\n                <select id=\"select3\" name=\"select3\" class=\"form-control form-control-sm\">\n                  <option value=\"0\">Please select</option>\n                  <option value=\"1\">Option #1</option>\n                  <option value=\"2\">Option #2</option>\n                  <option value=\"3\">Option #3</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"disabledSelect\">Disabled Select</label>\n              <div class=\"col-md-9\">\n                <select id=\"disabledSelect\" class=\"form-control\" disabled>\n                  <option value=\"0\">Please select</option>\n                  <option value=\"1\">Option #1</option>\n                  <option value=\"2\">Option #2</option>\n                  <option value=\"3\">Option #3</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"multiple-select\">Multiple select</label>\n              <div class=\"col-md-9\">\n                <select id=\"multiple-select\" name=\"multiple-select\" class=\"form-control\" size=\"5\" multiple>\n                  <option value=\"1\">Option #1</option>\n                  <option value=\"2\">Option #2</option>\n                  <option value=\"3\">Option #3</option>\n                  <option value=\"4\">Option #4</option>\n                  <option value=\"5\">Option #5</option>\n                  <option value=\"6\">Option #6</option>\n                  <option value=\"7\">Option #7</option>\n                  <option value=\"8\">Option #8</option>\n                  <option value=\"9\">Option #9</option>\n                  <option value=\"10\">Option #10</option>\n                </select>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" >Radios</label>\n              <div class=\"col-md-9 col-form-label\">\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"radios\" id=\"radio1\" value=\"option1\" checked>\n                  <label class=\"form-check-label\" for=\"radio1\">\n                    Option 1\n                  </label>\n                </div>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"radios\" id=\"radio2\" value=\"option2\">\n                  <label class=\"form-check-label\" for=\"radio2\">\n                    Option 2\n                  </label>\n                </div>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"radios\" id=\"radio3\" value=\"option3\">\n                  <label class=\"form-check-label\" for=\"radio3\">\n                    Option 3\n                  </label>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"inline-radios\">Inline Radios</label>\n              <div class=\"col-md-9 col-form-label\">\n                <div class=\"form-check form-check-inline mr-1\" id=\"inline-radios\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"inline-radios\" id=\"inlineRadio1\" value=\"option1\">\n                  <label class=\"form-check-label\" for=\"inlineRadio1\">One</label>\n                </div>\n                <div class=\"form-check form-check-inline mr-1\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"inline-radios\" id=\"inlineRadio2\" value=\"option2\">\n                  <label class=\"form-check-label\" for=\"inlineRadio2\">Two</label>\n                </div>\n                <div class=\"form-check form-check-inline mr-1\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"inline-radios\" id=\"inlineRadio3\" value=\"option3\">\n                  <label class=\"form-check-label\" for=\"inlineRadio3\">Three</label>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\">Checkboxes</label>\n              <div class=\"col-md-9 col-form-label\">\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"checkbox\" value=\"option1\" id=\"checkbox1\">\n                  <label class=\"form-check-label\" for=\"checkbox1\">\n                    Option 1\n                  </label>\n                </div>\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" type=\"checkbox\" value=\"option1\" id=\"checkbox2\">\n                  <label class=\"form-check-label\" for=\"checkbox2\">\n                    Option 2\n                  </label>\n                </div>\n                <div class=\"form-check checkbox\">\n                  <input class=\"form-check-input\" type=\"checkbox\" value=\"option1\" id=\"checkbox3\">\n                  <label class=\"form-check-label\" for=\"checkbox3\">\n                    Option 3\n                  </label>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\">Inline Checkboxes</label>\n              <div class=\"col-md-9 col-form-label\">\n                <div class=\"form-check form-check-inline mr-1\">\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inline-checkbox1\" value=\"option1\">\n                  <label class=\"form-check-label\" for=\"inline-checkbox1\">One</label>\n                </div>\n                <div class=\"form-check form-check-inline mr-1\">\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inline-checkbox2\" value=\"option2\">\n                  <label class=\"form-check-label\" for=\"inline-checkbox2\">Two</label>\n                </div>\n                <div class=\"form-check form-check-inline mr-1\">\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inline-checkbox3\" value=\"option3\">\n                  <label class=\"form-check-label\" for=\"inline-checkbox3\">Three</label>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"file-input\">File input</label>\n              <div class=\"col-md-9\">\n                <input type=\"file\" id=\"file-input\" name=\"file-input\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"file-multiple-input\">Multiple File input</label>\n              <div class=\"col-md-9\">\n                <input type=\"file\" id=\"file-multiple-input\" name=\"file-multiple-input\" multiple>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Inline</strong> Form\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-inline\">\n            <div class=\"form-group\">\n              <label class=\"sr-only\" for=\"if-email\">Email</label>\n              <input type=\"email\" id=\"if-email\" name=\"if-email\" class=\"form-control\" placeholder=\"Enter Email..\" autocomplete=\"email\">\n            </div>\n            <div class=\"form-group\">\n              <label class=\"sr-only\" for=\"if-password\">Password</label>\n              <input type=\"password\" id=\"if-password\" name=\"if-password\" class=\"form-control\" placeholder=\"Enter Password..\" autocomplete=\"current-password\">\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Horizontal</strong> Form\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"hf-email\">Email</label>\n              <div class=\"col-md-9\">\n                <input type=\"email\" id=\"hf-email\" name=\"hf-email\" class=\"form-control\" placeholder=\"Enter Email..\" autocomplete=\"email\">\n                <span class=\"help-block\">Please enter your email</span>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-md-3 col-form-label\" for=\"hf-password\">Password</label>\n              <div class=\"col-md-9\">\n                <input type=\"password\" id=\"hf-password\" name=\"hf-password\" class=\"form-control\" placeholder=\"Enter Password..\" autocomplete=\"current-password\">\n                <span class=\"help-block\">Please enter your password</span>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Normal</strong> Form\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\">\n            <div class=\"form-group\">\n              <label for=\"nf-email\">Email</label>\n              <input type=\"email\" id=\"nf-email\" name=\"nf-email\" class=\"form-control\" placeholder=\"Enter Email..\" autocomplete=\"email\">\n              <span class=\"help-block\">Please enter your email</span>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"nf-password\">Password</label>\n              <input type=\"password\" id=\"nf-password\" name=\"nf-password\" class=\"form-control\" placeholder=\"Enter Password..\" autocomplete=\"current-password\">\n              <span class=\"help-block\">Please enter your password</span>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Input\n          <strong>Grid</strong>\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-sm-3\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-3\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-4\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-4\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-5\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-5\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-6\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-6\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-7\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-7\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-8\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-8\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-9\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-9\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-10\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-10\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-11\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-11\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-sm-12\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-12\">\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-user\"></i> Login</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Input\n          <strong>Sizes</strong>\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <label class=\"col-sm-5 col-form-label\" for=\"input-small\">Small Input</label>\n              <div class=\"col-sm-6\">\n                <input type=\"text\" id=\"input-small\" name=\"input-small\" class=\"form-control form-control-sm\" placeholder=\".form-control-sm\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-sm-5 col-form-label\" for=\"input-normal\">Normal Input</label>\n              <div class=\"col-sm-6\">\n                <input type=\"text\" id=\"input-normal\" name=\"input-normal\" class=\"form-control\" placeholder=\"Normal\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <label class=\"col-sm-5 col-form-label\" for=\"input-large\">Large Input</label>\n              <div class=\"col-sm-6\">\n                <input type=\"text\" id=\"input-large\" name=\"input-large\" class=\"form-control form-control-lg\" placeholder=\".form-control-lg\">\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Validation states</strong> Form\n        </div>\n        <form>\n          <div class=\"card-body\">\n            <div class=\"form-group\">\n              <label class=\"form-col-form-label\" for=\"inputSuccess1\">Input with success</label>\n              <input type=\"text\" class=\"form-control is-valid\" id=\"inputSuccess1\">\n              <div class=\"valid-feedback\">\n                Input is valid.\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-col-form-label\" for=\"inputError1\">Input with error</label>\n              <input type=\"text\" class=\"form-control is-invalid\" id=\"inputError1\">\n              <div class=\"invalid-feedback\">\n                Please provide a valid information.\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Validation </strong> <code>was-validated</code>\n        </div>\n        <div class=\"card-body\">\n          <form class=\"was-validated\">\n            <div class=\"form-group\">\n              <label class=\"form-col-form-label\" for=\"inputSuccess2\">Input is valid</label>\n              <input type=\"text\" class=\"form-control is-valid\" id=\"inputSuccess2\">\n              <div class=\"valid-feedback\">\n                Looks good!\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"form-col-form-label\" for=\"inputError2\">Input required</label>\n              <input type=\"text\" class=\"form-control\" id=\"inputError2\" required>\n              <div class=\"valid-feedback\">\n                Input is valid.\n              </div>\n              <div class=\"invalid-feedback\">\n                Please provide a valid information.\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Icon/Text</strong> Groups\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\n                  </div>\n                  <input type=\"text\" id=\"input1-group1\" name=\"input1-group1\" class=\"form-control\" placeholder=\"Username\">\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <input type=\"email\" id=\"input2-group1\" name=\"input2-group1\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-envelope-o\"></i></span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-euro\"></i></span>\n                  </div>\n                  <input type=\"text\" id=\"input3-group1\" name=\"input3-group1\" class=\"form-control\" placeholder=\"..\">\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\">.00</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Buttons</strong> Groups\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-prepend\">\n                    <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-search\"></i> Search</button>\n                  </span>\n                  <input type=\"text\" id=\"input1-group2\" name=\"input1-group2\" class=\"form-control\" placeholder=\"Username\">\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <input type=\"email\" id=\"input2-group2\" name=\"input2-group2\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\n                  <span class=\"input-group-append\">\n                    <button type=\"button\" class=\"btn btn-primary\">Submit</button>\n                  </span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <span class=\"input-group-prepend\">\n                    <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-facebook\"></i></button>\n                  </span>\n                  <input type=\"text\" id=\"input3-group2\" name=\"input3-group2\" class=\"form-control\" placeholder=\"Search\">\n                  <span class=\"input-group-append\">\n                    <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-twitter\"></i></button>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <strong>Dropdowns</strong> Groups\n        </div>\n        <div class=\"card-body\">\n\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\" dropdown>\n                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdownToggle>Action\n                      <span class=\"caret\"></span>\n                    </button>\n                    <div class=\"dropdown-menu\" *dropdownMenu>\n                      <a class=\"dropdown-item\" href=\"#\">Action</a>\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\n                    </div>\n                  </div>\n                  <input type=\"text\" id=\"input1-group3\" name=\"input1-group3\" class=\"form-control\" placeholder=\"Username\">\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <input type=\"email\" id=\"input2-group3\" name=\"input2-group3\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\n                  <div class=\"input-group-append\" dropdown>\n                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdownToggle>Action\n                      <span class=\"caret\"></span>\n                    </button>\n                    <div class=\"dropdown-menu\" *dropdownMenu>\n                      <a class=\"dropdown-item\" href=\"#\">Action</a>\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\" dropdown>\n                    <button type=\"button\" class=\"btn btn-primary\">Action</button>\n                    <button type=\"button\" dropdownToggle class=\"btn btn-primary dropdown-toggle dropdown-toggle-split\">\n                      <span class=\"caret\"></span>\n                      <span class=\"sr-only\">Split button!</span>\n                    </button>\n                    <div class=\"dropdown-menu\" *dropdownMenu>\n                      <a class=\"dropdown-item\" href=\"#\">Action prepend</a>\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\n                    </div>\n                  </div>\n                  <input type=\"text\" id=\"input3-group3\" name=\"input3-group3\" class=\"form-control\" placeholder=\"..\">\n                  <div class=\"input-group-append\" dropdown>\n                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdownToggle>Action\n                      <span class=\"caret\"></span>\n                    </button>\n                    <div class=\"dropdown-menu\" *dropdownMenu>\n                      <a class=\"dropdown-item\" href=\"#\">Action append</a>\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Use the grid for big devices!\n          <small>\n            <code>.col-lg-*</code>\n            <code>.col-md-*</code>\n            <code>.col-sm-*</code>\n          </small>\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-md-8\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-8\">\n              </div>\n              <div class=\"col-md-4\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-4\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-7\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-7\">\n              </div>\n              <div class=\"col-md-5\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-5\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-6\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-6\">\n              </div>\n              <div class=\"col-md-6\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-6\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-5\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-5\">\n              </div>\n              <div class=\"col-md-7\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-7\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-md-4\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-4\">\n              </div>\n              <div class=\"col-md-8\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-8\">\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-danger\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-warning\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-info\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-success\">Action</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Input Grid for small devices!\n          <small>\n            <code>.col-*</code>\n          </small>\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-4\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-4\">\n              </div>\n              <div class=\"col-8\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-8\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-5\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-5\">\n              </div>\n              <div class=\"col-7\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-7\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-6\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-6\">\n              </div>\n              <div class=\"col-6\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-6\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-7\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-5\">\n              </div>\n              <div class=\"col-5\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-5\">\n              </div>\n            </div>\n            <div class=\"form-group row\">\n              <div class=\"col-8\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-8\">\n              </div>\n              <div class=\"col-4\">\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-4\">\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"card-footer\">\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-danger\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-warning\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-info\">Action</button>\n          <button type=\"button\" class=\"btn btn-sm btn-success\">Action</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Example Form\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\">\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">Username</span>\n                </div>\n                <input type=\"text\" id=\"username3\" name=\"username3\" class=\"form-control\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">Email</span>\n                </div>\n                <input type=\"email\" id=\"email3\" name=\"email3\" class=\"form-control\" autocomplete=\"email\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">Password</span>\n                </div>\n                <input type=\"password\" id=\"password3\" name=\"password3\" class=\"form-control\" autocomplete=\"current-password\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-asterisk\"></i></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group form-actions\">\n              <button type=\"submit\" class=\"btn btn-sm btn-primary\">Submit</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Example Form <code>append</code>\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\">\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <input type=\"text\" id=\"username2\" name=\"username2\" class=\"form-control\" placeholder=\"Username\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <input type=\"email\" id=\"email2\" name=\"email2\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <input type=\"password\" id=\"password2\" name=\"password2\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"current-password\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-asterisk\"></i></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group form-actions\">\n              <button type=\"submit\" class=\"btn btn-sm btn-secondary\">Submit</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Example Form <code>prepend</code>\n        </div>\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\">\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\n                </div>\n                <input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\n                </div>\n                <input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"fa fa-asterisk\"></i></span>\n                </div>\n                <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"current-password\">\n              </div>\n            </div>\n            <div class=\"form-group form-actions\">\n              <button type=\"submit\" class=\"btn btn-sm btn-success\">Submit</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-edit\"></i>Form Elements\n          <div class=\"card-header-actions\">\n            <button type=\"button\" class=\"card-header-action btn btn-link btn-setting\"><i class=\"icon-settings\"></i></button>\n            <button type=\"button\" class=\"card-header-action btn btn-link btn-minimize\"(click)=\"toggleCollapse()\"><i class={{iconCollapse}}></i></button>\n            <button type=\"button\" class=\"card-header-action btn btn-link btn-close\"><i class=\"icon-close\"></i></button>\n          </div>\n        </div>\n        <div (collapsed)=\"collapsed($event)\"\n             (expanded)=\"expanded($event)\"\n             [collapse]=\"isCollapsed\"\n             class=\"card-body\">\n          <form class=\"form-horizontal\">\n          <div class=\"form-group\">\n            <label class=\"col-form-label\" for=\"prependedInput\">Prepended text</label>\n            <div class=\"controls\">\n              <div class=\"input-prepend input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">@</span>\n                </div>\n                <input id=\"prependedInput\" class=\"form-control\" size=\"16\" type=\"text\">\n              </div>\n              <p class=\"help-block\">Here's some help text</p>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"col-form-label\" for=\"appendedInput\">Appended text</label>\n            <div class=\"controls\">\n              <div class=\"input-group\">\n                <input id=\"appendedInput\" class=\"form-control\" size=\"16\" type=\"text\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\">.00</span>\n                </div>\n              </div>\n              <span class=\"help-block\">Here's more help text</span>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"col-form-label\" for=\"appendedPrependedInput\">Append and prepend</label>\n            <div class=\"controls\">\n              <div class=\"input-prepend input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">$</span>\n                </div>\n                <input id=\"appendedPrependedInput\" class=\"form-control\" size=\"16\" type=\"text\">\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\">.00</span>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"col-form-label\" for=\"appendedInputButton\">Append with button</label>\n            <div class=\"controls\">\n              <div class=\"input-group\">\n                <input id=\"appendedInputButton\" class=\"form-control\" size=\"16\" type=\"text\">\n                <span class=\"input-group-append\">\n                  <button class=\"btn btn-secondary\" type=\"button\">Go!</button>\n                </span>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"col-form-label\" for=\"appendedInputButtons\">Two-button append</label>\n            <div class=\"controls\">\n              <div class=\"input-group\">\n                <input id=\"appendedInputButtons\" size=\"16\" class=\"form-control\" type=\"text\">\n                <span class=\"input-group-append\">\n                  <button class=\"btn btn-secondary\" type=\"button\">Search</button>\n                  <button class=\"btn btn-secondary\" type=\"button\">Options</button>\n                </span>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-actions\">\n            <button type=\"submit\" class=\"btn btn-primary\">Save changes</button>\n            <button class=\"btn btn-secondary\" type=\"button\">Cancel</button>\n          </div>\n        </form>\n        </div>\n      </div>\n    </div> <!--/.col-->\n  </div><!--/.row-->\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/paginations.component.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/paginations.component.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBasePaginationsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Bootstrap Pagination\n      <div class=\"card-header-actions\">\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/pagination\" target=\"_blank\">\n          <small className=\"text-muted\">docs</small>\n        </a>\n      </div>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-12 d-sm-down-none\">\n          <pagination [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\" (pageChanged)=\"pageChanged($event)\"></pagination>\n        </div>\n        <div class=\"col-xs-12 col-12\">\n          <pagination [boundaryLinks]=\"true\" [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\" class=\"pagination-sm\" [maxSize]=\"6\"\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"></pagination>\n        </div>\n        <div class=\"col-xs-12 col-12 d-sm-down-none\">\n          <pagination [directionLinks]=\"false\" [boundaryLinks]=\"true\" [totalItems]=\"totalItems\"\n                      [(ngModel)]=\"currentPage\"></pagination>\n        </div>\n        <div class=\"col-xs-12 col-12\">\n          <pagination [directionLinks]=\"false\" [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\"\n                      (numPages)=\"smallnumPages = $event\"></pagination>\n        </div>\n      </div>\n      <pre class=\"card card-body card-header mb-3\">The selected page no: {{currentPage}}/{{smallnumPages}}</pre>\n    </div>\n    <div class=\"card-footer\">\n      <button type=\"button\" class=\"btn btn-info\" (click)=\"setPage(3)\">Set current page to: 3</button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Pagination <small>states & limits</small>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-12\">\n          <pagination [totalItems]=\"bigTotalItems\" [(ngModel)]=\"bigCurrentPage\" [maxSize]=\"maxSize\" class=\"pagination-sm\"\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" [boundaryLinks]=\"true\"></pagination>\n        </div>\n\n        <div class=\"col-xs-12 col-12\">\n          <pagination [totalItems]=\"bigTotalItems\" [(ngModel)]=\"bigCurrentPage\" [maxSize]=\"maxSize\" class=\"pagination-sm\"\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"\n                      [boundaryLinks]=\"true\" [rotate]=\"false\" (numPages)=\"numPages = $event\"></pagination>\n        </div>\n      </div>\n      <pre class=\"card card-body card-header\">Page: {{bigCurrentPage}} / {{numPages}}</pre>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Pager\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-12 col-md-6\">\n          <pagination\n            [directionLinks]=\"false\"\n            [totalItems]=\"totalItems\"\n            [(ngModel)]=\"currentPager\"\n            (numPages)=\"smallnumPages = $event\">\n          </pagination>\n        </div>\n\n        <div class=\"col-xs-12 col-12 col-md-6\">\n          <pager\n            [totalItems]=\"totalItems\"\n            [(ngModel)]=\"currentPager\"\n            (pageChanged)=\"pageChanged($event)\"\n            pageBtnClass=\"btn\"\n            [itemsPerPage]=\"10\"\n            class=\"pull-left\">\n          </pager>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/popovers.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/popovers.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBasePopoversComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Bootstrap Popover\n      <div class=\"card-header-actions\">\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/popover\" target=\"_blank\">\n          <small className=\"text-muted\">docs</small>\n        </a>\n      </div>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-primary\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\n        Live demo\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small>positioning</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              popoverTitle=\"Popover on top\"\n              placement=\"top\">\n        Popover on top\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              popoverTitle=\"Popover on right\"\n              placement=\"right\">\n        Popover on right\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              popoverTitle=\"Popover auto\"\n              placement=\"auto\">\n        Popover auto\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              popoverTitle=\"Popover on left\"\n              placement=\"left\">\n        Popover on left\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              popoverTitle=\"Popover on bottom\"\n              placement=\"bottom\">\n        Popover on bottom\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small><code>focus</code> trigger</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-success\"\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              popoverTitle=\"Dismissible popover\"\n              triggers=\"focus\">\n        Dismissible popover\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small>dynamic content</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-info\"\n              [popover]=\"content\" [popoverTitle]=\"title\">\n        Simple binding\n      </button>\n\n      <ng-template #popTemplate>Just another: {{content}}</ng-template>\n      <button type=\"button\" class=\"btn btn-warning\"\n              [popover]=\"popTemplate\" popoverTitle=\"Template ref content inside\">\n        TemplateRef binding\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small>dynamic HTML</small>\n    </div>\n    <div class=\"card-body\">\n      <ng-template #popTemplateHtml>Here we go:\n        <div [innerHtml]=\"html\"></div>\n      </ng-template>\n      <button type=\"button\" class=\"btn btn-success\"\n              [popover]=\"popTemplateHtml\" popoverTitle=\"Dynamic html inside\">\n        Show me popover with html\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small>append to <code>body</code></small>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row panel\" style=\"position: relative; overflow: hidden;\">\n        <div class=\"card-body panel-body\">\n          <button type=\"button\" class=\"btn btn-danger\"\n                  popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\n            Default popover\n          </button>\n          <button type=\"button\" class=\"btn btn-success\"\n                  popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n                  container=\"body\">\n            Popover appended to body\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small>custom triggers</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-info\"\n              popover=\"I will hide on blur\"\n              triggers=\"mouseenter:mouseleave\">\n        Hover over me!\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Popover\n      <small>manual triggering</small>\n    </div>\n    <div class=\"card-body\">\n      <p>\n        <span popover=\"Hello there! I was triggered manually\"\n              triggers=\"\" #pop=\"bs-popover\">\n        This text has attached popover\n        </span>\n      </p>\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"pop.show()\">\n        Show\n      </button>\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"pop.hide()\">\n        Hide\n      </button>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/progress.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/progress.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseProgressComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Bootstrap Progress\n      <div class=\"card-header-actions\">\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/progressbar\" target=\"_blank\">\n          <small className=\"text-muted\">docs</small>\n        </a>\n      </div>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-sm-4\">\n          <progressbar class=\"progress\" [value]=\"55\" [max]=\"100\"></progressbar>\n        </div>\n        <div class=\"col-sm-4\">\n          <progressbar class=\"progress progress-striped\" [value]=\"22\" [max]=\"100\" type=\"warning\">22%</progressbar>\n        </div>\n        <div class=\"col-sm-4\">\n          <progressbar class=\"progress progress-striped active\" [max]=\"200\" [value]=\"166\" type=\"danger\"><i>166 / 200</i></progressbar>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Progress <small>dynamic</small>\n    </div>\n    <div class=\"card-body\">\n      <progressbar class=\"progress progress-striped progress-animated\" [max]=\"max\" [value]=\"dynamic\">\n        <span style=\"color:white; white-space:nowrap;\">{{dynamic}} / {{max}}</span>\n      </progressbar>\n\n      <small><em>No animation</em></small>\n      <progressbar class=\"progress progress-success\" [value]=\"dynamic\" [max]=\"100\" type=\"success\"><b>{{dynamic}}%</b></progressbar>\n\n      <small><em>Object (changes type based on value)</em></small>\n      <progressbar class=\"progress-bar progress-bar-striped progress-bar-animated\" [value]=\"dynamic\" [max]=\"max\" [type]=\"type\">\n        {{type}} <i *ngIf=\"showWarning\">!!! Watch out !!!</i>\n      </progressbar>\n      <br>\n      <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"random()\">Randomize</button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Progress <small>stacked</small>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row col-lg-12\">\n        <progressbar class=\"progress\" [value]=\"stacked\" [max]=\"100\"></progressbar>\n      </div>\n      <br>\n      <div class=\"row col-md-12\">\n        <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"randomize()\">{{buttonCaption}} randomize</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/switches.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/switches.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseSwitchesComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          3d Switch\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-3d switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-3d switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-3d switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-3d switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-3d switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-3d switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch default\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch default - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-pill switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch outline\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-outline-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch outline - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-pill switch-outline-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch outline alternative\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-outline-primary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-secondary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-success-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-warning-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-info-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-outline-danger-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch outline alternative - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-pill switch-outline-primary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-secondary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-success-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-warning-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-info-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-pill switch-outline-danger-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with text\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with text - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-pill switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with text outline\n        </div>\n        <div class=\"card-body\">\n\n          <label class=\"switch switch-label switch-outline-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with text outline - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-pill switch-outline-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with text outline alternative\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-outline-primary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-secondary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-success-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-warning-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-info-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-danger-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with text outline alternative - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-pill switch-outline-primary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-secondary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-success-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-warning-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-info-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-danger-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with icon\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with icon - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-pill switch-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with icon outline\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-outline-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with icon outline - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-pill switch-outline-primary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-secondary\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-success\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-warning\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-info\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-danger\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with icon outline alternative\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-outline-primary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-secondary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-success-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-warning-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-info-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-outline-danger-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Switch with icon outline alternative - pills\n        </div>\n        <div class=\"card-body\">\n          <label class=\"switch switch-label switch-pill switch-outline-primary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-secondary-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-success-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-warning-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-info-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n          &nbsp;&nbsp;&nbsp;\n          <label class=\"switch switch-label switch-pill switch-outline-danger-alt\">\n            <input type=\"checkbox\" class=\"switch-input\" checked>\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\n          </label>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-12\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          Sizes\n        </div>\n        <div class=\"card-body p-0\">\n          <table class=\"table table-hover table-striped table-align-middle mb-0\">\n            <thead>\n              <th>Size</th>\n              <th>Example</th>\n              <th>CSS Class</th>\n            </thead>\n            <tbody>\n              <tr>\n                <td>\n                  Large\n                </td>\n                <td>\n                  <label class=\"switch switch-lg switch-3d switch-primary\">\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\n                    <span class=\"switch-slider\"></span>\n                  </label>\n                </td>\n                <td>\n                  Add following class <code>.switch-lg</code>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  Normal\n                </td>\n                <td>\n                  <label class=\"switch switch-3d switch-primary\">\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\n                    <span class=\"switch-slider\"></span>\n                  </label>\n                </td>\n                <td>\n                  -\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  Small\n                </td>\n                <td>\n                  <label class=\"switch switch-sm switch-3d switch-primary\">\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\n                    <span class=\"switch-slider\"></span>\n                  </label>\n                </td>\n                <td>\n                  Add following class <code>.switch-sm</code>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tables.component.html":
  /*!****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tables.component.html ***!
    \****************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseTablesComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-align-justify\"></i> Simple Table\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th>Username</th>\n                <th>Date registered</th>\n                <th>Role</th>\n                <th>Status</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Samppa Nori</td>\n                <td>2012/01/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Estavan Lykos</td>\n                <td>2012/02/01</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-danger\">Banned</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Chetan Mohamed</td>\n                <td>2012/02/01</td>\n                <td>Admin</td>\n                <td>\n                  <span class=\"badge badge-secondary\">Inactive</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Derick Maximinus</td>\n                <td>2012/03/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-warning\">Pending</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Friderik Dávid</td>\n                <td>2012/01/21</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n            <li class=\"page-item active\">\n              <a class=\"page-link\" href=\"#\">1</a>\n            </li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-lg-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-align-justify\"></i> Striped Table\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table table-striped\">\n            <thead>\n              <tr>\n                <th>Username</th>\n                <th>Date registered</th>\n                <th>Role</th>\n                <th>Status</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Yiorgos Avraamu</td>\n                <td>2012/01/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Avram Tarasios</td>\n                <td>2012/02/01</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-danger\">Banned</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Quintin Ed</td>\n                <td>2012/02/01</td>\n                <td>Admin</td>\n                <td>\n                  <span class=\"badge badge-secondary\">Inactive</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Enéas Kwadwo</td>\n                <td>2012/03/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-warning\">Pending</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Agapetus Tadeáš</td>\n                <td>2012/01/21</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n            <li class=\"page-item active\">\n              <a class=\"page-link\" href=\"#\">1</a>\n            </li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n  </div>\n  <!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-lg-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-align-justify\"></i> Condensed Table\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table table-sm\">\n            <thead>\n              <tr>\n                <th>Username</th>\n                <th>Date registered</th>\n                <th>Role</th>\n                <th>Status</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Carwyn Fachtna</td>\n                <td>2012/01/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Nehemiah Tatius</td>\n                <td>2012/02/01</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-danger\">Banned</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Ebbe Gemariah</td>\n                <td>2012/02/01</td>\n                <td>Admin</td>\n                <td>\n                  <span class=\"badge badge-secondary\">Inactive</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Eustorgios Amulius</td>\n                <td>2012/03/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-warning\">Pending</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Leopold Gáspár</td>\n                <td>2012/01/21</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n            <li class=\"page-item active\">\n              <a class=\"page-link\" href=\"#\">1</a>\n            </li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-lg-6\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-align-justify\"></i> Bordered Table\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table table-bordered\">\n            <thead>\n              <tr>\n                <th>Username</th>\n                <th>Date registered</th>\n                <th>Role</th>\n                <th>Status</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Pompeius René</td>\n                <td>2012/01/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Paĉjo Jadon</td>\n                <td>2012/02/01</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-danger\">Banned</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Micheal Mercurius</td>\n                <td>2012/02/01</td>\n                <td>Admin</td>\n                <td>\n                  <span class=\"badge badge-secondary\">Inactive</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Ganesha Dubhghall</td>\n                <td>2012/03/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-warning\">Pending</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Hiroto Šimun</td>\n                <td>2012/01/21</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n            <li class=\"page-item active\">\n              <a class=\"page-link\" href=\"#\">1</a>\n            </li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n  </div>\n  <!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <i class=\"fa fa-align-justify\"></i> Combined All Table\n        </div>\n        <div class=\"card-body\">\n          <table class=\"table table-bordered table-striped table-sm\">\n            <thead>\n              <tr>\n                <th>Username</th>\n                <th>Date registered</th>\n                <th>Role</th>\n                <th>Status</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Vishnu Serghei</td>\n                <td>2012/01/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Zbyněk Phoibos</td>\n                <td>2012/02/01</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-danger\">Banned</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Einar Randall</td>\n                <td>2012/02/01</td>\n                <td>Admin</td>\n                <td>\n                  <span class=\"badge badge-secondary\">Inactive</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Félix Troels</td>\n                <td>2012/03/01</td>\n                <td>Member</td>\n                <td>\n                  <span class=\"badge badge-warning\">Pending</span>\n                </td>\n              </tr>\n              <tr>\n                <td>Aulus Agmundr</td>\n                <td>2012/01/21</td>\n                <td>Staff</td>\n                <td>\n                  <span class=\"badge badge-success\">Active</span>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <nav>\n            <ul class=\"pagination\">\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n              <li class=\"page-item active\">\n                <a class=\"page-link\" href=\"#\">1</a>\n              </li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n            </ul>\n          </nav>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n  </div>\n  <!--/.row-->\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tabs.component.html":
  /*!**************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tabs.component.html ***!
    \**************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseTabsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-md-6 mb-4\">\n      <!-- Nav tabs -->\n      <tabset>\n        <tab heading=\"Home\">\n          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab heading=\"Profile\">\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab heading=\"Messages\">\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n      </tabset>\n    </div><!--/.col-->\n    <div class=\"col-md-6 mb-4\">\n      <!-- Nav tabs -->\n      <tabset>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-calculator\"></i></ng-template>\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-basket-loaded\"></i></ng-template>\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i></ng-template>\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n      </tabset>\n    </div><!--/.col-->\n    <div class=\"col-md-6 mb-4\">\n      <!-- Nav tabs -->\n      <tabset>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-calculator\"></i> Calculator</ng-template>\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-basket-loaded\"></i> Shoping cart</ng-template>\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i> Charts</ng-template>\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n      </tabset>\n    </div><!--/.col-->\n    <div class=\"col-md-6 mb-4\">\n      <!-- Nav tabs -->\n      <tabset>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-list\"></i> Menu &nbsp;<span class=\"badge badge-success\">New</span></ng-template>\n          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-calculator\"></i> Calculator &nbsp;<span class=\"badge badge-pill badge-danger\">29</span></ng-template>\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab>\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i> Charts</ng-template>\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n      </tabset>\n    </div><!--/.col-->\n  </div><!--/.row-->\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tooltips.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tooltips.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewsBaseTooltipsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Bootstrap Tooltips\n      <div class=\"card-header-actions\">\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/tooltip\" target=\"_blank\">\n          <small className=\"text-muted\">docs</small>\n        </a>\n      </div>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-primary\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\n        Simple demo\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>positioning</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              placement=\"top\">\n        Tooltip on top\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              placement=\"right\">\n        Tooltip on right\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              placement=\"auto\">\n        Tooltip auto\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              placement=\"left\">\n        Tooltip on left\n      </button>\n\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              placement=\"bottom\">\n        Tooltip on bottom\n      </button>\n    </div>\n</div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>dismissible</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-success\"\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n              triggers=\"focus\">\n        Dismissible tooltip\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>dynamic content</small>\n    </div>\n    <div class=\"card-body\">\n      <button type=\"button\" class=\"btn btn-info\" [tooltip]=\"content\">\n        Simple binding\n      </button>\n\n      <ng-template #tolTemplate>Just another: {{content}}</ng-template>\n      <button type=\"button\" class=\"btn btn-warning\" [tooltip]=\"tolTemplate\">\n        TemplateRef binding\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>dynamic html</small>\n    </div>\n    <div class=\"card-body\">\n      <ng-template #popTemplate>Here we go: <div [innerHtml]=\"html\"></div></ng-template>\n      <button type=\"button\" class=\"btn btn-success\"\n              [tooltip]=\"popTemplate\">\n        Show me tooltip with html\n      </button>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>append to <code>body</code></small>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\" style=\"position: relative; overflow: hidden; padding-top: 10px;\">\n        <div class=\"col-xs-12 col-12\">\n          <button type=\"button\" class=\"btn btn-danger\"\n                  tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\n            Default tooltip\n          </button>\n          <button type=\"button\" class=\"btn btn-success\"\n                  tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\n                  container=\"body\">\n            Tooltip appended to body\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>custom triggers</small>\n    </div>\n    <div class=\"card-body\">\n      <div class=\"row\">\n        <div class=\"col-xs-6 col-6\">\n          <p>Desktop</p>\n          <button type=\"button\" class=\"btn btn-info\"\n                  tooltip=\"I will hide on click\"\n                  triggers=\"mouseenter:click\">\n            Hover over me!\n          </button>\n        </div>\n\n        <div class=\"col-xs-6 col-6\">\n          <p>Mobile</p>\n          <button type=\"button\" class=\"btn btn-info\"\n                  tooltip=\"I will hide on click\"\n                  triggers=\"click\">\n            Click on me!\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      Tooltips <small>manual triggers</small>\n    </div>\n    <div class=\"card-body\">\n      <p>\n  <span tooltip=\"Hello there! I was triggered manually\"\n        triggers=\"\" #pop=\"bs-tooltip\">\n  This text has attached tooltip\n  </span>\n      </p>\n\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"pop.show()\">\n        Show\n      </button>\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"pop.hide()\">\n        Hide\n      </button>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./src/app/views/base/base-routing.module.ts":
  /*!***************************************************!*\
    !*** ./src/app/views/base/base-routing.module.ts ***!
    \***************************************************/

  /*! exports provided: BaseRoutingModule */

  /***/
  function srcAppViewsBaseBaseRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BaseRoutingModule", function () {
      return BaseRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _cards_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./cards.component */
    "./src/app/views/base/cards.component.ts");
    /* harmony import */


    var _forms_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./forms.component */
    "./src/app/views/base/forms.component.ts");
    /* harmony import */


    var _switches_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./switches.component */
    "./src/app/views/base/switches.component.ts");
    /* harmony import */


    var _tables_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./tables.component */
    "./src/app/views/base/tables.component.ts");
    /* harmony import */


    var _tabs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./tabs.component */
    "./src/app/views/base/tabs.component.ts");
    /* harmony import */


    var _carousels_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./carousels.component */
    "./src/app/views/base/carousels.component.ts");
    /* harmony import */


    var _collapses_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./collapses.component */
    "./src/app/views/base/collapses.component.ts");
    /* harmony import */


    var _paginations_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./paginations.component */
    "./src/app/views/base/paginations.component.ts");
    /* harmony import */


    var _popovers_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./popovers.component */
    "./src/app/views/base/popovers.component.ts");
    /* harmony import */


    var _progress_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ./progress.component */
    "./src/app/views/base/progress.component.ts");
    /* harmony import */


    var _tooltips_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ./tooltips.component */
    "./src/app/views/base/tooltips.component.ts");

    var routes = [{
      path: '',
      data: {
        title: 'Base'
      },
      children: [{
        path: '',
        redirectTo: 'cards'
      }, {
        path: 'cards',
        component: _cards_component__WEBPACK_IMPORTED_MODULE_3__["CardsComponent"],
        data: {
          title: 'Cards'
        }
      }, {
        path: 'forms',
        component: _forms_component__WEBPACK_IMPORTED_MODULE_4__["FormsComponent"],
        data: {
          title: 'Forms'
        }
      }, {
        path: 'switches',
        component: _switches_component__WEBPACK_IMPORTED_MODULE_5__["SwitchesComponent"],
        data: {
          title: 'Switches'
        }
      }, {
        path: 'tables',
        component: _tables_component__WEBPACK_IMPORTED_MODULE_6__["TablesComponent"],
        data: {
          title: 'Tables'
        }
      }, {
        path: 'tabs',
        component: _tabs_component__WEBPACK_IMPORTED_MODULE_7__["TabsComponent"],
        data: {
          title: 'Tabs'
        }
      }, {
        path: 'carousels',
        component: _carousels_component__WEBPACK_IMPORTED_MODULE_8__["CarouselsComponent"],
        data: {
          title: 'Carousels'
        }
      }, {
        path: 'collapses',
        component: _collapses_component__WEBPACK_IMPORTED_MODULE_9__["CollapsesComponent"],
        data: {
          title: 'Collapses'
        }
      }, {
        path: 'paginations',
        component: _paginations_component__WEBPACK_IMPORTED_MODULE_10__["PaginationsComponent"],
        data: {
          title: 'Pagination'
        }
      }, {
        path: 'popovers',
        component: _popovers_component__WEBPACK_IMPORTED_MODULE_11__["PopoversComponent"],
        data: {
          title: 'Popover'
        }
      }, {
        path: 'progress',
        component: _progress_component__WEBPACK_IMPORTED_MODULE_12__["ProgressComponent"],
        data: {
          title: 'Progress'
        }
      }, {
        path: 'tooltips',
        component: _tooltips_component__WEBPACK_IMPORTED_MODULE_13__["TooltipsComponent"],
        data: {
          title: 'Tooltips'
        }
      }]
    }];

    var BaseRoutingModule = function BaseRoutingModule() {
      _classCallCheck(this, BaseRoutingModule);
    };

    BaseRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], BaseRoutingModule);
    /***/
  },

  /***/
  "./src/app/views/base/base.module.ts":
  /*!*******************************************!*\
    !*** ./src/app/views/base/base.module.ts ***!
    \*******************************************/

  /*! exports provided: BaseModule */

  /***/
  function srcAppViewsBaseBaseModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BaseModule", function () {
      return BaseModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _cards_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./cards.component */
    "./src/app/views/base/cards.component.ts");
    /* harmony import */


    var _forms_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./forms.component */
    "./src/app/views/base/forms.component.ts");
    /* harmony import */


    var _switches_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./switches.component */
    "./src/app/views/base/switches.component.ts");
    /* harmony import */


    var _tables_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./tables.component */
    "./src/app/views/base/tables.component.ts");
    /* harmony import */


    var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ngx-bootstrap/tabs */
    "./node_modules/ngx-bootstrap/tabs/fesm2015/ngx-bootstrap-tabs.js");
    /* harmony import */


    var _tabs_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./tabs.component */
    "./src/app/views/base/tabs.component.ts");
    /* harmony import */


    var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ngx-bootstrap/carousel */
    "./node_modules/ngx-bootstrap/carousel/fesm2015/ngx-bootstrap-carousel.js");
    /* harmony import */


    var _carousels_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./carousels.component */
    "./src/app/views/base/carousels.component.ts");
    /* harmony import */


    var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ngx-bootstrap/collapse */
    "./node_modules/ngx-bootstrap/collapse/fesm2015/ngx-bootstrap-collapse.js");
    /* harmony import */


    var _collapses_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ./collapses.component */
    "./src/app/views/base/collapses.component.ts");
    /* harmony import */


    var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ngx-bootstrap/dropdown */
    "./node_modules/ngx-bootstrap/dropdown/fesm2015/ngx-bootstrap-dropdown.js");
    /* harmony import */


    var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ngx-bootstrap/pagination */
    "./node_modules/ngx-bootstrap/pagination/fesm2015/ngx-bootstrap-pagination.js");
    /* harmony import */


    var _popovers_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./popovers.component */
    "./src/app/views/base/popovers.component.ts");
    /* harmony import */


    var ngx_bootstrap_popover__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ngx-bootstrap/popover */
    "./node_modules/ngx-bootstrap/popover/fesm2015/ngx-bootstrap-popover.js");
    /* harmony import */


    var _paginations_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./paginations.component */
    "./src/app/views/base/paginations.component.ts");
    /* harmony import */


    var ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ngx-bootstrap/progressbar */
    "./node_modules/ngx-bootstrap/progressbar/fesm2015/ngx-bootstrap-progressbar.js");
    /* harmony import */


    var _progress_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./progress.component */
    "./src/app/views/base/progress.component.ts");
    /* harmony import */


    var ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ngx-bootstrap/tooltip */
    "./node_modules/ngx-bootstrap/tooltip/fesm2015/ngx-bootstrap-tooltip.js");
    /* harmony import */


    var _tooltips_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! ./tooltips.component */
    "./src/app/views/base/tooltips.component.ts");
    /* harmony import */


    var _base_routing_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./base-routing.module */
    "./src/app/views/base/base-routing.module.ts"); // Angular
    // Forms Component
    // Tabs Component
    // Carousel Component
    // Collapse Component
    // Dropdowns Component
    // Pagination Component
    // Popover Component
    // Progress Component
    // Tooltip Component
    // Components Routing


    var BaseModule = function BaseModule() {
      _classCallCheck(this, BaseModule);
    };

    BaseModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _base_routing_module__WEBPACK_IMPORTED_MODULE_23__["BaseRoutingModule"], ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_14__["BsDropdownModule"].forRoot(), ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_8__["TabsModule"], ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_10__["CarouselModule"].forRoot(), ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_12__["CollapseModule"].forRoot(), ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_15__["PaginationModule"].forRoot(), ngx_bootstrap_popover__WEBPACK_IMPORTED_MODULE_17__["PopoverModule"].forRoot(), ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_19__["ProgressbarModule"].forRoot(), ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_21__["TooltipModule"].forRoot()],
      declarations: [_cards_component__WEBPACK_IMPORTED_MODULE_4__["CardsComponent"], _forms_component__WEBPACK_IMPORTED_MODULE_5__["FormsComponent"], _switches_component__WEBPACK_IMPORTED_MODULE_6__["SwitchesComponent"], _tables_component__WEBPACK_IMPORTED_MODULE_7__["TablesComponent"], _tabs_component__WEBPACK_IMPORTED_MODULE_9__["TabsComponent"], _carousels_component__WEBPACK_IMPORTED_MODULE_11__["CarouselsComponent"], _collapses_component__WEBPACK_IMPORTED_MODULE_13__["CollapsesComponent"], _paginations_component__WEBPACK_IMPORTED_MODULE_18__["PaginationsComponent"], _popovers_component__WEBPACK_IMPORTED_MODULE_16__["PopoversComponent"], _progress_component__WEBPACK_IMPORTED_MODULE_20__["ProgressComponent"], _tooltips_component__WEBPACK_IMPORTED_MODULE_22__["TooltipsComponent"]]
    })], BaseModule);
    /***/
  },

  /***/
  "./src/app/views/base/cards.component.ts":
  /*!***********************************************!*\
    !*** ./src/app/views/base/cards.component.ts ***!
    \***********************************************/

  /*! exports provided: CardsComponent */

  /***/
  function srcAppViewsBaseCardsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CardsComponent", function () {
      return CardsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var CardsComponent = function CardsComponent() {
      _classCallCheck(this, CardsComponent);
    };

    CardsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./cards.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/cards.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], CardsComponent);
    /***/
  },

  /***/
  "./src/app/views/base/carousels.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/views/base/carousels.component.ts ***!
    \***************************************************/

  /*! exports provided: CarouselsComponent */

  /***/
  function srcAppViewsBaseCarouselsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CarouselsComponent", function () {
      return CarouselsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-bootstrap/carousel */
    "./node_modules/ngx-bootstrap/carousel/fesm2015/ngx-bootstrap-carousel.js");

    var CarouselsComponent =
    /*#__PURE__*/
    function () {
      function CarouselsComponent() {
        _classCallCheck(this, CarouselsComponent);

        this.myInterval = 6000;
        this.slides = [];
        this.activeSlideIndex = 0;
        this.noWrapSlides = false;

        for (var i = 0; i < 4; i++) {
          this.addSlide();
        }
      }

      _createClass(CarouselsComponent, [{
        key: "addSlide",
        value: function addSlide() {
          this.slides.push({
            image: "https://loremflickr.com/900/500/sailing?random=".concat(this.slides.length % 8 + 1, "/")
          });
        }
      }, {
        key: "removeSlide",
        value: function removeSlide(index) {
          var toRemove = index ? index : this.activeSlideIndex;
          this.slides.splice(toRemove, 1);
        }
      }]);

      return CarouselsComponent;
    }();

    CarouselsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./carousels.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/carousels.component.html")).default,
      providers: [{
        provide: ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_2__["CarouselConfig"],
        useValue: {
          interval: 1500,
          noPause: true
        }
      }]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], CarouselsComponent);
    /***/
  },

  /***/
  "./src/app/views/base/collapses.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/views/base/collapses.component.ts ***!
    \***************************************************/

  /*! exports provided: CollapsesComponent */

  /***/
  function srcAppViewsBaseCollapsesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CollapsesComponent", function () {
      return CollapsesComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var CollapsesComponent =
    /*#__PURE__*/
    function () {
      function CollapsesComponent() {
        _classCallCheck(this, CollapsesComponent);

        this.isCollapsed = false;
      }

      _createClass(CollapsesComponent, [{
        key: "collapsed",
        value: function collapsed(event) {// console.log(event);
        }
      }, {
        key: "expanded",
        value: function expanded(event) {// console.log(event);
        }
      }]);

      return CollapsesComponent;
    }();

    CollapsesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./collapses.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/collapses.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], CollapsesComponent);
    /***/
  },

  /***/
  "./src/app/views/base/forms.component.ts":
  /*!***********************************************!*\
    !*** ./src/app/views/base/forms.component.ts ***!
    \***********************************************/

  /*! exports provided: FormsComponent */

  /***/
  function srcAppViewsBaseFormsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormsComponent", function () {
      return FormsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var FormsComponent =
    /*#__PURE__*/
    function () {
      function FormsComponent() {
        _classCallCheck(this, FormsComponent);

        this.isCollapsed = false;
        this.iconCollapse = 'icon-arrow-up';
      }

      _createClass(FormsComponent, [{
        key: "collapsed",
        value: function collapsed(event) {// console.log(event);
        }
      }, {
        key: "expanded",
        value: function expanded(event) {// console.log(event);
        }
      }, {
        key: "toggleCollapse",
        value: function toggleCollapse() {
          this.isCollapsed = !this.isCollapsed;
          this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
        }
      }]);

      return FormsComponent;
    }();

    FormsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forms.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/forms.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], FormsComponent);
    /***/
  },

  /***/
  "./src/app/views/base/paginations.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/views/base/paginations.component.ts ***!
    \*****************************************************/

  /*! exports provided: PaginationsComponent */

  /***/
  function srcAppViewsBasePaginationsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaginationsComponent", function () {
      return PaginationsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var PaginationsComponent =
    /*#__PURE__*/
    function () {
      function PaginationsComponent() {
        _classCallCheck(this, PaginationsComponent);

        this.totalItems = 64;
        this.currentPage = 4;
        this.smallnumPages = 0;
        this.maxSize = 5;
        this.bigTotalItems = 675;
        this.bigCurrentPage = 1;
        this.numPages = 0;
        this.currentPager = 4;
      }

      _createClass(PaginationsComponent, [{
        key: "setPage",
        value: function setPage(pageNo) {
          this.currentPage = pageNo;
        }
      }, {
        key: "pageChanged",
        value: function pageChanged(event) {
          console.log('Page changed to: ' + event.page);
          console.log('Number items per page: ' + event.itemsPerPage);
        }
      }]);

      return PaginationsComponent;
    }();

    PaginationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./paginations.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/paginations.component.html")).default,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
      styles: [".pager li.btn:active { box-shadow: none; }"]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], PaginationsComponent);
    /***/
  },

  /***/
  "./src/app/views/base/popovers.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/views/base/popovers.component.ts ***!
    \**************************************************/

  /*! exports provided: PopoversComponent */

  /***/
  function srcAppViewsBasePopoversComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopoversComponent", function () {
      return PopoversComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");

    var PopoversComponent = function PopoversComponent(sanitizer) {
      _classCallCheck(this, PopoversComponent);

      this.title = 'Welcome word';
      this.content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
      this.html = "<span class=\"btn btn-warning\">Never trust not sanitized <code>HTML</code>!!!</span>";
      this.html = sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SecurityContext"].HTML, this.html);
    };

    PopoversComponent.ctorParameters = function () {
      return [{
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]
      }];
    };

    PopoversComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popovers.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/popovers.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])], PopoversComponent);
    /***/
  },

  /***/
  "./src/app/views/base/progress.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/views/base/progress.component.ts ***!
    \**************************************************/

  /*! exports provided: ProgressComponent */

  /***/
  function srcAppViewsBaseProgressComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ProgressComponent", function () {
      return ProgressComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var ProgressComponent =
    /*#__PURE__*/
    function () {
      function ProgressComponent() {
        _classCallCheck(this, ProgressComponent);

        this.max = 200;
        this.stacked = [];
        this.timer = null;
        this.buttonCaption = 'Start';
        this.random();
        this.randomStacked();
      }

      _createClass(ProgressComponent, [{
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          if (this.timer) {
            clearInterval(this.timer);
          } // console.log(`onDestroy`, this.timer);

        }
      }, {
        key: "random",
        value: function random() {
          var value = Math.floor(Math.random() * 100 + 1);
          var type;

          if (value < 25) {
            type = 'success';
          } else if (value < 50) {
            type = 'info';
          } else if (value < 75) {
            type = 'warning';
          } else {
            type = 'danger';
          }

          this.showWarning = type === 'danger' || type === 'warning';
          this.dynamic = value;
          this.type = type;
        }
      }, {
        key: "randomStacked",
        value: function randomStacked() {
          var types = ['success', 'info', 'warning', 'danger'];
          this.stacked = [];
          var n = Math.floor(Math.random() * 4 + 1);

          for (var i = 0; i < n; i++) {
            var index = Math.floor(Math.random() * 4);
            var value = Math.floor(Math.random() * 27 + 3);
            this.stacked.push({
              value: value,
              type: types[index],
              label: value + ' %'
            });
          }
        }
      }, {
        key: "randomize",
        value: function randomize() {
          var _this7 = this;

          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          } else {
            this.timer = setInterval(function () {
              return _this7.randomStacked();
            }, 2000);
          }

          this.buttonCaption = this.timer ? 'Stop' : 'Start';
        }
      }]);

      return ProgressComponent;
    }();

    ProgressComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./progress.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/progress.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], ProgressComponent);
    /***/
  },

  /***/
  "./src/app/views/base/switches.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/views/base/switches.component.ts ***!
    \**************************************************/

  /*! exports provided: SwitchesComponent */

  /***/
  function srcAppViewsBaseSwitchesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SwitchesComponent", function () {
      return SwitchesComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var SwitchesComponent = function SwitchesComponent() {
      _classCallCheck(this, SwitchesComponent);
    };

    SwitchesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./switches.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/switches.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], SwitchesComponent);
    /***/
  },

  /***/
  "./src/app/views/base/tables.component.ts":
  /*!************************************************!*\
    !*** ./src/app/views/base/tables.component.ts ***!
    \************************************************/

  /*! exports provided: TablesComponent */

  /***/
  function srcAppViewsBaseTablesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TablesComponent", function () {
      return TablesComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var TablesComponent = function TablesComponent() {
      _classCallCheck(this, TablesComponent);
    };

    TablesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./tables.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tables.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], TablesComponent);
    /***/
  },

  /***/
  "./src/app/views/base/tabs.component.ts":
  /*!**********************************************!*\
    !*** ./src/app/views/base/tabs.component.ts ***!
    \**********************************************/

  /*! exports provided: TabsComponent */

  /***/
  function srcAppViewsBaseTabsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TabsComponent", function () {
      return TabsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var TabsComponent = function TabsComponent() {
      _classCallCheck(this, TabsComponent);
    };

    TabsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./tabs.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tabs.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], TabsComponent);
    /***/
  },

  /***/
  "./src/app/views/base/tooltips.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/views/base/tooltips.component.ts ***!
    \**************************************************/

  /*! exports provided: TooltipsComponent */

  /***/
  function srcAppViewsBaseTooltipsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TooltipsComponent", function () {
      return TooltipsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");

    var TooltipsComponent = function TooltipsComponent(sanitizer) {
      _classCallCheck(this, TooltipsComponent);

      this.content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
      this.html = "<span class=\"btn btn-danger\">Never trust not sanitized HTML!!!</span>";
      this.html = sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SecurityContext"].HTML, this.html);
    };

    TooltipsComponent.ctorParameters = function () {
      return [{
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]
      }];
    };

    TooltipsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./tooltips.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/views/base/tooltips.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])], TooltipsComponent);
    /***/
  }
}]);
//# sourceMappingURL=4-es5.js.map