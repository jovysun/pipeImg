(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("template"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "template"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery"), require("template")) : factory(root["jQuery"], root["template"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_jquery__, __WEBPACK_EXTERNAL_MODULE_template__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/pipeImg.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/pipeImg.scss":
/*!******************************!*\
  !*** ./src/css/pipeImg.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/dialog.js":
/*!**************************!*\
  !*** ./src/js/dialog.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! template */ "template");
/* harmony import */ var template__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(template__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
/* harmony import */ var _dragBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dragBox */ "./src/js/dragBox.js");
/* harmony import */ var _dialog_tpl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dialog.tpl */ "./src/js/dialog.tpl");
/* harmony import */ var _dialog_tpl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_dialog_tpl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _thumbnail_tpl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./thumbnail.tpl */ "./src/js/thumbnail.tpl");
/* harmony import */ var _thumbnail_tpl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_thumbnail_tpl__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _thinSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./thinSelect */ "./src/js/thinSelect.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var Dialog =
/*#__PURE__*/
function () {
  function Dialog(options) {
    _classCallCheck(this, Dialog);

    // 默认配置参数
    var defaults = {
      debug: false,
      imgList: ['data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'],
      activeIndex: 0,
      type: '0',
      template: _dialog_tpl__WEBPACK_IMPORTED_MODULE_4___default.a,
      thumbnailTpl: _thumbnail_tpl__WEBPACK_IMPORTED_MODULE_5___default.a,
      mime: 'image/jpeg',
      markXPositionMargin: 15,
      markYPositionMargin: 20,
      markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing'],
      closeBtnTxt: '关闭',
      saveBtnTxt: '保存',
      resetBtnTxt: '重置',
      confirmBtnTxt: '确定',
      cancelBtnTxt: '取消',
      rotateMenuTxt: '旋转',
      turnLeftTxt: '逆时针旋转',
      turnRightTxt: '顺时针旋转',
      cropMenuTxt: '裁剪',
      scaleMenuTxt: '缩放',
      markMenuTxt: '添加水印',
      colorTxt: '颜色',
      positionTxt: '位置',
      opacityTxt: '透明度',
      showRoomTxt: '展示厅',
      companyNameTxt: '公司名称',
      markAllMenuTxt: '批量添加水印',
      tipTitleTxt: '提示',
      tipContentTxt: '尚未保存，是否确定离开？',
      tipConfirmBtnTxt: '确定',
      constrainTxt: '约束比例',
      onSaveRotate: function onSaveRotate(args, cb) {},
      onSaveCrop: function onSaveCrop(args, cb) {},
      onSaveScale: function onSaveScale(args, cb) {},
      onSaveMark: function onSaveMark(args, cb) {},
      onReset: function onReset(cb) {},
      onSave: function onSave(cb) {},
      onChangeActive: function onChangeActive(options, cb) {},
      onSaveMarkAll: function onSaveMarkAll(cb) {},
      onComplete: function onComplete(result) {}
    };
    options = _extends({}, defaults, options);
    this.debug = options.debug;
    this.imgList = options.imgList;
    this.activeIndex = options.activeIndex;
    this.type = options.type;
    this.template = options.template;
    this.thumbnailTpl = options.thumbnailTpl;
    this.mime = options.mime;
    this.markXPositionMargin = options.markXPositionMargin;
    this.markYPositionMargin = options.markYPositionMargin;
    this.markTextList = options.markTextList;
    this.closeBtnTxt = options.closeBtnTxt;
    this.saveBtnTxt = options.saveBtnTxt;
    this.resetBtnTxt = options.resetBtnTxt;
    this.confirmBtnTxt = options.confirmBtnTxt;
    this.cancelBtnTxt = options.cancelBtnTxt;
    this.rotateMenuTxt = options.rotateMenuTxt;
    this.turnLeftTxt = options.turnLeftTxt;
    this.turnRightTxt = options.turnRightTxt;
    this.cropMenuTxt = options.cropMenuTxt;
    this.scaleMenuTxt = options.scaleMenuTxt;
    this.markMenuTxt = options.markMenuTxt;
    this.colorTxt = options.colorTxt;
    this.positionTxt = options.positionTxt;
    this.opacityTxt = options.opacityTxt;
    this.showRoomTxt = options.showRoomTxt;
    this.companyNameTxt = options.companyNameTxt;
    this.markAllMenuTxt = options.markAllMenuTxt;
    this.tipTitleTxt = options.tipTitleTxt;
    this.tipContentTxt = options.tipContentTxt;
    this.tipConfirmBtnTxt = options.tipConfirmBtnTxt;
    this.constrainTxt = options.constrainTxt;
    this.onSaveRotate = options.onSaveRotate;
    this.onSaveCrop = options.onSaveCrop;
    this.onSaveScale = options.onSaveScale;
    this.onSaveMark = options.onSaveMark;
    this.onReset = options.onReset;
    this.onSave = options.onSave;
    this.onChangeActive = options.onChangeActive;
    this.onSaveMarkAll = options.onSaveMarkAll;
    this.onComplete = options.onComplete;

    this._init();
  }

  _createClass(Dialog, [{
    key: "_init",
    value: function _init() {
      var templateHtml = template__WEBPACK_IMPORTED_MODULE_1___default()(this.template, {
        imgList: this.imgList,
        activeIndex: this.activeIndex,
        type: this.type,
        closeBtnTxt: this.closeBtnTxt,
        saveBtnTxt: this.saveBtnTxt,
        resetBtnTxt: this.resetBtnTxt,
        confirmBtnTxt: this.confirmBtnTxt,
        cancelBtnTxt: this.cancelBtnTxt,
        rotateMenuTxt: this.rotateMenuTxt,
        turnLeftTxt: this.turnLeftTxt,
        turnRightTxt: this.turnRightTxt,
        cropMenuTxt: this.cropMenuTxt,
        scaleMenuTxt: this.scaleMenuTxt,
        markMenuTxt: this.markMenuTxt,
        colorTxt: this.colorTxt,
        positionTxt: this.positionTxt,
        opacityTxt: this.opacityTxt,
        showRoomTxt: this.showRoomTxt,
        companyNameTxt: this.companyNameTxt,
        markAllMenuTxt: this.markAllMenuTxt,
        tipTitleTxt: this.tipTitleTxt,
        tipContentTxt: this.tipContentTxt,
        tipConfirmBtnTxt: this.tipConfirmBtnTxt,
        constrainTxt: this.constrainTxt
      });
      var html = '<div class="pipeImg-dialog J-pipe-dialog" onselectstart="return false" ondragstart="return false"><div class="pipe-mask J-pipe-mask"></div>' + templateHtml + '</div>';
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(html);
      this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.J-pipe-dialog');
      this.$pipeWrapper = this.$el.find('.J-pipe-wrapper'); // 通用按钮

      this.$btnClose = this.$el.find('.J-button-close');
      this.$btnSave = this.$el.find('.J-button-save');
      this.$btnReset = this.$el.find('.J-button-reset');
      this.$btnConfirm = this.$el.find('.J-button-confirm');
      this.$btnCancel = this.$el.find('.J-button-cancel');
      this.$btnSaveAll = this.$el.find('.J-button-confirm-all');
      this.$btnCancelAll = this.$el.find('.J-button-cancel-all'); // 模块按钮
      // 旋转

      this.$rotatePanel = this.$el.find('.J-rotate-panel');
      this.$txtRotateWidth = this.$rotatePanel.find('.J-num-width');
      this.$txtRotateHeight = this.$rotatePanel.find('.J-num-height');
      this.$btnRotateLeft = this.$el.find('.J-btn-rotate-left');
      this.$btnRotateRight = this.$el.find('.J-btn-rotate-right'); // 裁剪

      this.$cropPanel = this.$el.find('.J-crop-panel');
      this.$inputCropWidth = this.$cropPanel.find('.J-num-width');
      this.$inputCropHeight = this.$cropPanel.find('.J-num-height');
      this.$radioCropFix = this.$cropPanel.find('.J-fix-ratio'); // 缩放

      this.$scalePanel = this.$el.find('.J-scale-panel');
      this.$inputScaleWidth = this.$scalePanel.find('.J-num-width');
      this.$inputScaleHeight = this.$scalePanel.find('.J-num-height');
      this.$rangeScaleRatio = this.$scalePanel.find('.J-scale-range'); // 添加水印

      this.$markPanel = this.$el.find('.J-mark-panel');
      this.$radioMarkColor = this.$markPanel.find('.J-color');
      this.$radioMarkPosition = this.$markPanel.find('.J-position');
      this.$rangeMarkOpacity = this.$markPanel.find('.J-opacity');
      this.$selectMarkTxt = this.$markPanel.find('.J-select-mark'); // 批量添加水印

      this.$markAllPanel = this.$el.find('.J-mark-all-panel');
      this.$radioMarkAllColor = this.$markAllPanel.find('.J-color');
      this.$radioMarkAllPosition = this.$markAllPanel.find('.J-position');
      this.$rangeMarkAllOpacity = this.$markAllPanel.find('.J-opacity');
      this.$selectMarkAllTxt = this.$markAllPanel.find('.J-select-mark');
      this.$buttons = this.$el.find('.J-button-save, .J-button-reset, .J-button-confirm, .J-button-cancel, .J-button-confirm-all, .J-button-cancel-all'); // 全局变量

      this.MARKTYPE = {
        'SINGLE': '0',
        'MULTIPLE': '1'
      };
      this.isChange = false;
      this.rotateNum = 0;
      this.scaleRatio = 1;
      this.imgBoxHeight = this.$el.find('.J-img-box').height();
      this.imgBoxWidth = this.$el.find('.J-img-box').width();
      this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;

      this._bind();

      this.$el.find('.J-img-box').addClass('loading');
    }
  }, {
    key: "renderImgList",
    value: function renderImgList(imgList, activeIndex) {
      var _this = this;

      this.$el.find('.J-img-box').removeClass('loading');
      this.imgList = imgList;
      this.activeIndex = activeIndex;
      var $imgsThumbnail = this.$el.find('.J-imgs-thumbnail');
      $imgsThumbnail.html(template__WEBPACK_IMPORTED_MODULE_1___default()(this.thumbnailTpl, {
        imgList: this.imgList,
        activeIndex: this.activeIndex
      }));
      this.activeImg = this.imgList[this.activeIndex];

      this._updateActiveData(); // 初始化裁剪框


      this.cropBox = new _dragBox__WEBPACK_IMPORTED_MODULE_3__["DragBox"]({
        el: this.$cropPanel.find('.J-source'),
        isCrop: true,
        onDragPoint: function onDragPoint(data) {
          _this._showSize(data.width * _this.activeData.ratio, data.height * _this.activeData.ratio);

          _this._updateIsChange(true);
        }
      }); // 初始化缩放

      var $scaleImgWrapper = this.$scalePanel.find('.J-scale-img-wrapper');
      var imgEl = this.$scalePanel.find('.J-source').get(0);
      Object(_util__WEBPACK_IMPORTED_MODULE_2__["drag"])(imgEl, imgEl, $scaleImgWrapper.get(0)); // 初始化水印框

      this.markBox = new _dragBox__WEBPACK_IMPORTED_MODULE_3__["DragBox"]({
        el: this.$markPanel.find('.J-source'),
        fixRatio: true,
        markText: this.markTextList[0],
        onDragComplete: function onDragComplete(left, top) {
          _this.$markPanel.find('.J-position').prop('checked', false);

          _this._updateIsChange(true);
        },
        onDragPoint: function onDragPoint(boxData) {
          _this.$markPanel.find('.J-mark-txt').css({
            'font-size': Math.floor(parseInt(_this.markBox.$dragBox.css('height')) / _this.markLineHeight0 * _this.markFontSize0)
          });

          _this.markBox.$dragBox.find('.J-mark-txt').css({
            'display': 'block'
          });
        }
      }); // 初始化批量水印框

      this.markAllBox = new _dragBox__WEBPACK_IMPORTED_MODULE_3__["DragBox"]({
        el: this.$markAllPanel.find('.J-source'),
        fixRatio: true,
        markText: this.markTextList[0],
        onDragComplete: function onDragComplete(left, top) {
          _this.$markAllPanel.find('.J-position').prop('checked', false);

          _this._updateIsChange(true);
        },
        onDragPoint: function onDragPoint(boxData) {
          _this.$markAllPanel.find('.J-mark-txt').css({
            'font-size': Math.floor(parseInt(_this.markAllBox.$dragBox.css('height')) / _this.markLineHeight0 * _this.markFontSize0)
          });

          _this.markAllBox.$dragBox.find('.J-mark-txt').css({
            'display': 'block'
          });
        }
      });
      this.type === this.MARKTYPE.MULTIPLE && this.showModel(this.type);

      this._refresh();

      this.markSelects = _thinSelect__WEBPACK_IMPORTED_MODULE_6__["default"].use(this.$el.find('.J-select-mark'));

      this._setMarkPosition();

      this._setMarkPosition(this.MARKTYPE.MULTIPLE);

      this.markFontSize0 = parseInt(this.$el.find('.J-mark-txt').css('font-size'));
      this.markLineHeight0 = parseInt(this.$el.find('.J-mark-txt').css('line-height'));
    }
  }, {
    key: "_bind",
    value: function _bind() {
      var _this2 = this;

      // 切换编辑图片
      this.$el.find('.J-pipe-footer').on('click', '.J-img-thumbnail', function (e) {
        var run = function run() {
          var $thumbnail = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
          $thumbnail.addClass('active').siblings().removeClass('active');
          var $thumbnailImg = $thumbnail.find('img');

          _this2.$el.find('.J-panel').not('.J-mark-all-panel').find('.J-source').attr('src', $thumbnailImg.attr('src'));

          _this2._updateActiveImg($thumbnail.index());

          _this2._goHome();

          _this2._initData();
        };

        if (_this2.isChange) {
          _this2._confirm(function () {
            run();

            _this2._updateIsChange(false);
          });
        } else {
          run();
        }
      }); // 批量水印切换编辑图片

      this.$markAllPanel.on('click', '.J-img-thumbnail', function (e) {
        var $thumbnail = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        $thumbnail.addClass('active').siblings().removeClass('active');
        var $thumbnailImg = $thumbnail.find('img');

        _this2.$markAllPanel.find('.J-source').attr('src', $thumbnailImg.attr('src'));

        _this2._updateActiveImg($thumbnail.index());

        _this2._setMarkPosition(_this2.MARKTYPE.MULTIPLE);

        _this2._initData();
      }); // 菜单切换

      this.$el.find('.J-menu-btn').on('click', function (e) {
        var run = function run() {
          var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).parent();
          var index = $item.index();
          var oldActiveIndex = $item.parent().find('.active:first').index();

          _this2.showModel(_this2.MARKTYPE.SINGLE);

          _this2.showMenu(index); // 若有编辑操作，离开旋转，裁剪，缩放面板进行保存


          if (_this2.isChange) {
            switch (oldActiveIndex) {
              case 0:
                _this2._saveRotate();

                break;

              case 1:
                _this2._saveCrop();

                break;

              case 2:
                _this2._saveScale();

                break;

              default:
                break;
            }
          } // 进入裁剪


          if (index === 1) {
            _this2._initCrop();
          } // 进入缩放


          if (index === 2) {
            _this2._initScale();
          } // 进入水印


          if (index === 3) {
            _this2._initMark();
          }
        }; // 离开批量水印模式提示


        if (_this2.$markAllPanel.hasClass('active')) {
          // 切换到单图编辑模式重置活动图片
          var $thumbnail = _this2.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');

          _this2._updateActiveImg($thumbnail.index());
        }

        if (_this2.$markAllPanel.hasClass('active') && _this2.isChange) {
          _this2._confirm(function () {
            run();

            _this2._updateIsChange(false);
          });
        } else {
          run();
        }
      }); // 切换水印

      this.$el.find('.J-item-mark').on('click', '.J-menu-btn-mark', function (e) {
        var run = function run() {
          var $thumbnail = _this2.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');

          _this2._updateActiveImg($thumbnail.index());

          _this2.showModel(_this2.MARKTYPE.SINGLE);

          _this2.showMenu(3);

          _this2._initMark();

          _this2._updateIsChange(false);
        };

        if (_this2.isChange) {
          _this2._confirm(run);
        } else {
          run();
        }
      }); // 切换批量水印

      this.$el.find('.J-item-mark').on('click', '.J-menu-btn-mark-all', function (e) {
        var run = function run() {
          var $thumbnail = _this2.$markAllPanel.find('.J-img-thumbnail.active');

          _this2._updateActiveImg($thumbnail.index());

          _this2.showModel(_this2.MARKTYPE.MULTIPLE);

          _this2._initMark(_this2.MARKTYPE.MULTIPLE);

          _this2._updateIsChange(false);

          _this2._initData();
        };

        if (_this2.isChange) {
          _this2._confirm(run);
        } else {
          run();
        }
      }); // 旋转++++++++++++++++
      // 逆时针旋转

      this.$btnRotateLeft.on('click', function () {
        _this2._getRotateNum(-1);

        _this2._updateRotate();
      }); // 顺时针旋转

      this.$btnRotateRight.on('click', function () {
        _this2._getRotateNum(1);

        _this2._updateRotate();
      }); // this.$cropPanel.find('.J-num-width,.J-num-height').on('keyup blur', (e) => {
      //     let $input = $(e.currentTarget);
      //     $input.val($input.val().replace(/[^\d]/g,''));
      // })
      // 裁剪++++++++++++

      this.$inputCropWidth.on('input', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val();
        $input.val($input.val().replace(/[^\d]/g, ''));

        if (value === '') {
          return;
        } else {
          value = parseInt($input.val());
        } // let value = $input.val() != '' ? parseInt($input.val()) : 0;


        if (value > _this2.activeData.w0) {
          // 此刻slice比substr与substring好用
          $input.val($input.val().slice(0, -1));
          return;
        }

        if (value < 50) {
          if (value <= _this2.activeData.w0) {
            value = _this2.activeData.w0;
          } else {
            value = 50;
          }
        }

        _this2.cropW = value;

        if (_this2.fixRatio) {
          _this2.cropH = Math.floor(value / _this2.activeData.imgRatio);

          _this2.$inputCropHeight.val(_this2.cropH);
        }

        _this2._updateCrop();
      }).on('blur', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val() != '' ? parseInt($input.val()) : 0;

        if (value < 50) {
          if (value <= _this2.activeData.w0) {
            value = _this2.activeData.w0;
          } else {
            value = 50;
          }

          $input.val(value);

          if (_this2.fixRatio) {
            _this2.$inputCropHeight.val(Math.floor(value / _this2.activeData.imgRatio));
          }

          _this2.cropW = value;
          _this2.cropH = _this2.$inputCropHeight.val();

          _this2._updateCrop();
        }
      });
      this.$inputCropHeight.on('input', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val();
        $input.val($input.val().replace(/[^\d]/g, ''));

        if (value === '') {
          return;
        } else {
          value = parseInt($input.val());
        } // let value =  $input.val() != '' ? parseInt( $input.val()) : 0;


        if (value > _this2.activeData.h0) {
          $input.val($input.val().slice(0, -1));
          return;
        }

        if (value < 50) {
          if (value <= _this2.activeData.h0) {
            value = _this2.activeData.h0;
          } else {
            value = 50;
          }
        }

        _this2.cropH = value;

        if (_this2.fixRatio) {
          _this2.cropW = Math.floor(value * _this2.activeData.imgRatio);

          _this2.$inputCropWidth.val(_this2.cropW);
        }

        _this2._updateCrop();
      }).on('blur', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val() != '' ? parseInt($input.val()) : 0;

        if (value < 50) {
          if (value <= _this2.activeData.h0) {
            value = _this2.activeData.h0;
          } else {
            value = 50;
          }

          $input.val(value);

          if (_this2.fixRatio) {
            _this2.$inputCropWidth.val(Math.floor(value * _this2.activeData.imgRatio));
          }

          _this2.cropW = _this2.$inputCropWidth.val();
          _this2.cropH = value;

          _this2._updateCrop();
        }
      });
      this.$radioCropFix.on('change', function (e) {
        _this2.fixRatio = !_this2.fixRatio;
        _this2.cropBox.fixRatio = _this2.fixRatio;
      }); // 缩放++++++++++++++

      this.$inputScaleWidth.on('input', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val();
        $input.val($input.val().replace(/[^\d]/g, ''));

        if (value === '') {
          return;
        } else {
          value = parseInt($input.val());
        }

        if (value > _this2.activeData.w0) {
          $input.val($input.val().slice(0, -1));
          return;
        }

        if (value > 50) {
          _this2.scaleRatio = value / _this2.activeData.w0;

          _this2._updateScale();
        }
      }).on('blur', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val();

        if (value === '' || parseInt(value) < 50) {
          value = Math.floor(parseInt(_this2.$inputScaleHeight.val()) * _this2.activeData.imgRatio);
          $input.val(value);
        }
      });
      this.$inputScaleHeight.on('input', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val();
        $input.val($input.val().replace(/[^\d]/g, ''));

        if (value === '') {
          return;
        } else {
          value = parseInt($input.val());
        }

        if (value > _this2.activeData.h0) {
          $input.val($input.val().slice(0, -1));
          return;
        }

        if (value > 50) {
          _this2.scaleRatio = value / _this2.activeData.h0;

          _this2._updateScale();
        }
      }).on('blur', function (e) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
        var value = $input.val();

        if (value === '' || parseInt(value) < 50) {
          value = Math.floor(parseInt(_this2.$inputScaleWidth.val()) / _this2.activeData.imgRatio);
          $input.val(value);
        }
      }); // IE11下change事件连续触发

      this.$rangeScaleRatio.on('change', function (e) {
        var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target);
        var max = parseInt($this.attr('max'));
        var value = parseInt($this.val());
        _this2.scaleRatio = value / max;

        _this2._updateScale();
      }); // chrome下input事件连续触发，change只有停止拖动时触发

      this.$rangeScaleRatio.on('input', function (e) {
        var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target);
        var max = parseInt($this.attr('max'));
        var value = parseInt($this.val());
        _this2.scaleRatio = value / max;

        _this2._updateScale();
      }); // 水印++++++++++++++

      this.$radioMarkColor.on('change', function () {
        _this2._updateMark();
      });
      this.$rangeMarkOpacity.on('input', function () {
        _this2._updateMark();
      });
      this.$rangeMarkOpacity.on('change', function () {
        _this2._updateMark();
      });
      this.$selectMarkTxt.on('change', function () {
        _this2.markBox.$dragBox.find('.J-mark-txt').css({
          'display': 'inline-block',
          'font-size': _this2.markFontSize0
        });

        _this2._updateMark();
      });
      this.$radioMarkPosition.on('change', function () {
        _this2._updateMark();
      }); // 批量水印++++++++++++++

      this.$radioMarkAllColor.on('change', function () {
        _this2._updateMark(_this2.MARKTYPE.MULTIPLE);
      });
      this.$rangeMarkAllOpacity.on('input', function () {
        _this2._updateMark(_this2.MARKTYPE.MULTIPLE);
      });
      this.$rangeMarkAllOpacity.on('change', function () {
        _this2._updateMark(_this2.MARKTYPE.MULTIPLE);
      });
      this.$selectMarkAllTxt.on('change', function () {
        _this2.markAllBox.$dragBox.find('.J-mark-txt').css({
          'display': 'inline-block',
          'font-size': _this2.markFontSize0
        });

        _this2._updateMark(_this2.MARKTYPE.MULTIPLE);
      });
      this.$radioMarkAllPosition.on('change', function () {
        _this2._updateMark(_this2.MARKTYPE.MULTIPLE);
      }); // 水印确定

      this.$btnConfirm.on('click', function () {
        _this2._saveMark();
      }); // 水印取消

      this.$btnCancel.on('click', function () {
        _this2._cancelMark();
      }); // 批量水印确定

      this.$btnSaveAll.on('click', function () {
        _this2._showProgress();

        _this2._saveMarkAll();
      }); // 批量水印取消

      this.$btnCancelAll.on('click', function () {
        if (_this2.isChange) {
          _this2._confirm(function () {
            _this2.destory();
          });
        } else {
          _this2.destory();
        }
      }); // 重置

      this.$btnReset.on('click', function () {
        if (_this2.isChange) {
          _this2._reset();
        }
      }); // 保存

      this.$btnSave.on('click', function (e) {
        if (_this2.isChange) {
          _this2._showProgress();

          var panelIndex = _this2.$el.find('.J-panel.active').index();

          switch (panelIndex) {
            case 0:
              _this2._saveRotate();

              break;

            case 1:
              _this2._saveCrop();

              break;

            case 2:
              _this2._saveScale();

            default:
              break;
          }

          _this2._save();
        }
      }); // 关闭

      this.$btnClose.on('click', function (e) {
        if (_this2.isChange) {
          _this2._confirm(function () {
            _this2.destory();
          });
        } else {
          _this2.destory();
        }
      }); // 禁用鼠标右击菜单

      this.$el.on('contextmenu', function (e) {
        return _this2.debug;
      });
    }
  }, {
    key: "_goHome",
    value: function _goHome() {
      this.$el.find('.J-menu-btn').parent(':first').addClass('active').siblings().removeClass('active');
      this.$el.find('.J-panel:first').addClass('active').siblings().removeClass('active');
      this.$el.find('.J-item-mark').find('.J-menu-btn').show();
      this.$el.find('.J-item-mark').find('.J-menu-txt').hide();
    }
  }, {
    key: "_initRotate",
    value: function _initRotate() {
      this.rotateNum = 0;
    }
  }, {
    key: "_updateRotate",
    value: function _updateRotate() {
      this.$el.find('.J-source').css({
        'transform': "rotate(".concat(this.rotateNum * 90, "deg)")
      });
      var width, height;

      if (this.rotateNum === 1 || this.rotateNum === 3) {
        // 旋转类90度后
        if (1 / this.activeData.imgRatio < this.imgBoxRatio) {
          width = Math.min(this.imgBoxHeight, this.activeData.w0);
          height = 'auto';
        } else {
          width = 'auto';
          height = Math.min(this.imgBoxWidth, this.activeData.h0);
        }

        this.$txtRotateWidth.text(this.activeData.h0);
        this.$txtRotateHeight.text(this.activeData.w0);
      } else {
        if (this.activeData.imgRatio < this.imgBoxRatio) {
          width = 'auto';
          height = Math.min(this.imgBoxHeight, this.activeData.h0);
        } else {
          width = Math.min(this.imgBoxWidth, this.activeData.w0);
          height = 'auto';
        }

        this.$txtRotateWidth.text(this.activeData.w0);
        this.$txtRotateHeight.text(this.activeData.h0);
      }

      this.$el.find('.J-source').css({
        'width': width,
        'height': height
      });

      this._updateIsChange(true);
    }
  }, {
    key: "_saveRotate",
    value: function _saveRotate() {
      var _this3 = this;

      if (this.rotateNum === 0) {
        return false;
      }

      var options = {
        rotateNum: this.rotateNum
      };
      this.onSaveRotate(options, function (img) {
        _this3.rotateNum = 0;
        _this3.activeImg = img;

        _this3._updateActiveData();

        _this3._refresh();
      });
    }
  }, {
    key: "_initCrop",
    value: function _initCrop() {
      this.$radioCropFix.prop('checked', false);
      this.fixRatio = this.$radioCropFix.prop('checked');
      this.cropW = this.$inputCropWidth.val();
      this.cropH = this.$inputCropHeight.val();
      this.cropBox.width = this.cropW / this.activeData.ratio;
      this.cropBox.height = this.cropH / this.activeData.ratio;
      this.cropBox.fixRatio = this.fixRatio;
    }
  }, {
    key: "_updateCrop",
    value: function _updateCrop() {
      this.cropBox.width = this.cropW / this.activeData.ratio;
      this.cropBox.height = this.cropH / this.activeData.ratio;
      this.cropBox.fixRatio = this.fixRatio;
      this.cropBox.update();

      this._updateIsChange(true);
    }
  }, {
    key: "_saveCrop",
    value: function _saveCrop() {
      var _this4 = this;

      if (this.cropBox.boxData.left === 0 && this.cropBox.boxData.top === 0 && this.cropBox.boxData.width === Math.floor(this.activeData.w1) && this.cropBox.boxData.height === Math.floor(this.activeData.h1)) {
        return false;
      }

      var options = {
        sx: Math.max(this.cropBox.boxData.left * this.activeData.ratio, 0),
        sy: Math.max(this.cropBox.boxData.top * this.activeData.ratio, 0),
        cropW: Math.min(this.cropBox.boxData.width * this.activeData.ratio, this.activeData.w0),
        cropH: Math.min(this.cropBox.boxData.height * this.activeData.ratio, this.activeData.h0)
      };
      this.onSaveCrop(options, function (img) {
        _this4.activeImg = img;

        _this4._updateActiveData();

        _this4._refresh();
      });
    }
  }, {
    key: "_initScale",
    value: function _initScale() {
      var $scaleImgBox = this.$scalePanel.find('.J-img-box');
      var $scaleRange = this.$scalePanel.find('.J-scale-range');
      var $scaleImgWrapper = this.$scalePanel.find('.J-scale-img-wrapper');
      var $img = $scaleImgBox.find('.J-source');
      var width, height;

      if (this.activeData.w0 < this.imgBoxWidth) {
        width = this.imgBoxWidth;
      } else {
        width = this.activeData.w0 + (this.activeData.w0 - this.imgBoxWidth);
      }

      if (this.activeData.h0 < this.imgBoxHeight) {
        height = this.imgBoxHeight;
      } else {
        height = this.activeData.h0 + (this.activeData.h0 - this.imgBoxHeight);
      }

      $scaleImgWrapper.css({
        'width': width,
        'height': height,
        'margin-left': -width / 2,
        'margin-top': -height / 2
      }); // 去除预览图的缩放显示

      $img.css({
        'position': 'absolute',
        'left': (width - this.activeData.w0) / 2,
        'top': (height - this.activeData.h0) / 2,
        'width': this.activeData.w0,
        'height': this.activeData.h0,
        'max-width': 'none',
        'max-height': 'none',
        'cursor': 'move'
      }); // 初始化滑块值

      $scaleRange.attr('max', this.activeData.w0);
      $scaleRange.val(this.activeData.w0);
      this.scaleRatio = 1;
    }
  }, {
    key: "_updateScale",
    value: function _updateScale() {
      var max = parseInt(this.$rangeScaleRatio.attr('max'));
      var newWidth = Math.floor(this.activeData.w0 * this.scaleRatio);
      var newHeight = Math.floor(this.activeData.h0 * this.scaleRatio);
      var newRange = Math.floor(max * this.scaleRatio);

      if (this.$inputScaleWidth.val() != newWidth) {
        this.$inputScaleWidth.val(newWidth);
      }

      if (this.$inputScaleHeight.val() != newHeight) {
        this.$inputScaleHeight.val(newHeight);
      }

      if (this.$rangeScaleRatio.val() != newRange) {
        this.$rangeScaleRatio.val(newRange);
      }

      this.$scalePanel.find('.J-source').css({
        'transform': "scale(".concat(this.scaleRatio, ")")
      });

      this._updateIsChange(true);
    }
  }, {
    key: "_saveScale",
    value: function _saveScale() {
      var _this5 = this;

      if (this.scaleRatio === 1) {
        return false;
      }

      var options = {
        scaleRatio: this.scaleRatio
      };
      this.onSaveScale(options, function (img) {
        _this5.scaleRatio = 1;
        _this5.activeImg = img;

        _this5._updateActiveData();

        _this5._refresh();

        _this5._initScale();
      });
    } // 水印相关操作start++++++++++++++++++++++++++++++++++++++++

  }, {
    key: "_setMarkPosition",
    value: function _setMarkPosition(type) {
      var POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];
      var $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
      var $dragBox = type === this.MARKTYPE.MULTIPLE ? this.markAllBox.$dragBox : this.markBox.$dragBox;
      var $markTxt = $dragBox.find('.J-mark-txt');
      var markX = parseInt($dragBox.css('left')) * this.activeData.ratio;
      var markY = parseInt($dragBox.css('top')) * this.activeData.ratio;
      var positionVal = $panel.find('.J-position:checked').val();
      var dragBoxWrapperWidth = this.activeData.w1;
      var dragBoxWrapperHeight = this.activeData.h1;
      var dragBoxWidth = $markTxt.outerWidth();
      var dragBoxHeight = $markTxt.outerHeight();

      switch (POSITION[positionVal]) {
        case 'center':
          markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
          markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
          break;

        case 'upLeft':
          markX = (0 + this.markXPositionMargin) * this.activeData.ratio;
          markY = (0 + this.markYPositionMargin) * this.activeData.ratio;
          break;

        case 'upRight':
          markX = (dragBoxWrapperWidth - dragBoxWidth - this.markXPositionMargin) * this.activeData.ratio;
          markY = (0 + this.markYPositionMargin) * this.activeData.ratio;
          break;

        case 'downLeft':
          markX = (0 + this.markXPositionMargin) * this.activeData.ratio;
          markY = (dragBoxWrapperHeight - dragBoxHeight - this.markYPositionMargin) * this.activeData.ratio;
          break;

        case 'downRight':
          markX = (dragBoxWrapperWidth - dragBoxWidth - this.markXPositionMargin) * this.activeData.ratio;
          markY = (dragBoxWrapperHeight - dragBoxHeight - this.markYPositionMargin) * this.activeData.ratio;
          break;

        default:
          break;
      }

      $dragBox.css({
        'left': Math.floor(markX / this.activeData.ratio),
        'top': Math.floor(markY / this.activeData.ratio),
        'width': Math.ceil(dragBoxWidth),
        'height': Math.ceil(dragBoxHeight)
      });
    }
  }, {
    key: "_setMarkStyle",
    value: function _setMarkStyle(type) {
      var $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
      var $markTxt = $panel.find('.J-mark-txt');
      var colorVal = $panel.find('.J-color:checked').val();
      var opacityVal = parseInt($panel.find('.J-opacity').val()) / parseInt($panel.find('.J-opacity').attr('max'));
      var txtVal = $panel.find('.J-select-mark').val();
      var color = "rgba(255, 255, 255, ".concat(opacityVal, ")");

      if (colorVal === '1') {
        color = "rgba(0, 0, 0, ".concat(opacityVal, ")");
      }

      var text = this.markTextList[txtVal];
      $markTxt.text(text).css({
        'color': color
      });
    }
  }, {
    key: "_initMark",
    value: function _initMark(type) {
      var $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
      $panel.find('.J-color:last').prop('checked', true);
      $panel.find('.J-position:first').prop('checked', true);
      $panel.find('.J-opacity:first').val($panel.find('.J-opacity:first').attr('defaultValue'));
      $panel.find('.J-select-mark option:first').prop('selected', true);
      $panel.find('.J-mark-txt').css({
        'font-size': this.markFontSize0 + 'px'
      });

      if (type === this.MARKTYPE.MULTIPLE) {
        this.markSelects[1].select(0);
        this.markAllBox.$dragBox.find('.J-mark-txt').css({
          'display': 'inline-block'
        });
      } else {
        this.markSelects[0].select(0);
        this.markBox.$dragBox.find('.J-mark-txt').css({
          'display': 'inline-block'
        });
      }

      this._setMarkStyle(type);

      this._setMarkPosition(type);
    }
  }, {
    key: "_updateMark",
    value: function _updateMark(type) {
      this._setMarkStyle(type);

      this._setMarkPosition(type);

      this._updateIsChange(true);
    }
  }, {
    key: "_saveMark",
    value: function _saveMark() {
      var _this6 = this;

      var options = this._getMarkParams();

      this.onSaveMark(options, function (img) {
        _this6.activeImg = img;

        _this6._updateActiveData();

        _this6._refresh();

        _this6._goHome();

        _this6._updateIsChange(true);
      });
    }
  }, {
    key: "_cancelMark",
    value: function _cancelMark() {
      this._goHome();
    }
  }, {
    key: "_getMarkParams",
    value: function _getMarkParams(type) {
      var $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
      var $dragBox = type === this.MARKTYPE.MULTIPLE ? this.markAllBox.$dragBox : this.markBox.$dragBox;
      var $markTxt = $panel.find('.J-mark-txt');
      var markFont = Math.floor(parseInt($markTxt.css('font-size')) * this.activeData.ratio) + 'px / ' + Math.floor(parseInt($markTxt.css('line-height')) * this.activeData.ratio) + 'px ' + $markTxt.css('font-family');
      var $opacity = $panel.find('.J-opacity');
      var opacityVal = parseInt($opacity.val()) / parseInt($opacity.attr('max'));
      var colorVal = $panel.find('.J-color:checked').val();
      var color = "rgba(255, 255, 255, ".concat(opacityVal, ")");

      if (colorVal === '1') {
        color = "rgba(0, 0, 0, ".concat(opacityVal, ")");
      }

      var txtVal = $panel.find('.J-select-mark').val();
      var text = this.markTextList[txtVal];
      var markX = Math.floor(parseInt($dragBox.css('left')) * this.activeData.ratio);
      var markY = Math.floor(parseInt($dragBox.css('top')) * this.activeData.ratio);
      var POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];
      var positionVal = $panel.find('.J-position:checked').val();
      var dragBoxWrapperWidth = this.activeData.w1;
      var dragBoxWrapperHeight = this.activeData.h1;
      var dragBoxWidth = $markTxt.outerWidth();
      var dragBoxHeight = $markTxt.outerHeight();

      switch (POSITION[positionVal]) {
        case 'center':
          markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
          markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
          break;

        case 'upLeft':
          markX = (0 + 15) * this.activeData.ratio;
          markY = (0 + 20) * this.activeData.ratio;
          break;

        case 'upRight':
          markX = (dragBoxWrapperWidth - dragBoxWidth - 15) * this.activeData.ratio;
          markY = (0 + 20) * this.activeData.ratio;
          break;

        case 'downLeft':
          markX = (0 + 15) * this.activeData.ratio;
          markY = (dragBoxWrapperHeight - dragBoxHeight - 20) * this.activeData.ratio;
          break;

        case 'downRight':
          markX = (dragBoxWrapperWidth - dragBoxWidth - 15) * this.activeData.ratio;
          markY = (dragBoxWrapperHeight - dragBoxHeight - 20) * this.activeData.ratio;
          break;

        default:
          break;
      }

      return {
        markX: markX,
        markY: markY,
        markText: text,
        markFont: markFont,
        markStyle: color
      };
    }
  }, {
    key: "_saveMarkAll",
    value: function _saveMarkAll() {
      var _this7 = this;

      var num = 0;
      this.imgList.forEach(function (element, index) {
        _this7.onChangeActive({
          activeImg: element,
          activeIndex: index
        });

        _this7.activeImg = element;

        _this7._updateActiveData();

        var options = _this7._getMarkParams(_this7.MARKTYPE.MULTIPLE);

        _this7.onSaveMark(options, function (img) {});

        _this7.onSave(function (data) {
          // console.log(num+1);
          if (++num === _this7.imgList.length) {
            _this7._hideProgress();

            _this7.destory();

            _this7._updateIsChange(false);

            num = 0;

            _this7.onComplete(data);
          }
        }, index);
      });
    } // 水印相关操作end++++++++++++++++++++++++++++++++++++++++

  }, {
    key: "_showSize",
    value: function _showSize(w0, h0) {
      w0 = Math.floor(w0);
      h0 = Math.floor(h0); // 显示活动图片原始宽高

      var $numWidth = this.$el.find('.J-num-width');
      var $numHeight = this.$el.find('.J-num-height');
      $numWidth.each(function (index, element) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).get(0).nodeName.toLowerCase() === 'input') {
          $numWidth.val(w0);
        } else {
          $numWidth.text(w0);
        }
      });
      $numHeight.each(function (index, element) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).get(0).nodeName.toLowerCase() === 'input') {
          $numHeight.val(h0);
        } else {
          $numHeight.text(h0);
        }
      });
    }
  }, {
    key: "_refresh",
    value: function _refresh() {
      var src = '';

      if (this.activeData.img.nodeName.toLowerCase() === 'img') {
        src = this.activeData.img.src;
      } else {
        src = this.activeData.img.toDataURL(this.mime, 1.0);
      }

      if (this.$el.find('.J-img-box').find('.J-source').length > 0) {
        this.$el.find('.J-img-box').find('.J-source').attr('src', src);
      } else {
        this.$el.find('.J-img-box').append("<img class=\"J-source\" src=\"".concat(src, "\">"));
      }

      this.$el.find('.J-source').removeAttr('style');
      this.cropBox && this.cropBox.boxEl.removeAttribute('style');
      this.$el.find('.J-img-box').find('.J-source').css({
        width: this.activeData.w1,
        height: this.activeData.h1
      });

      this._showSize(this.activeData.w0, this.activeData.h0);
    } // 更新正在编辑图片的数据

  }, {
    key: "_updateActiveData",
    value: function _updateActiveData() {
      var targetImg = this.activeImg;
      var w0 = targetImg.width;
      var h0 = targetImg.height;

      if (targetImg.nodeName.toLowerCase() === 'img') {
        w0 = targetImg.naturalWidth;
        h0 = targetImg.naturalHeight;
      }

      var imgRatio = w0 / h0;
      var h1 = h0;
      var w1 = w0;
      var ratio = 1;

      if (imgRatio < this.imgBoxRatio) {
        if (h0 > this.imgBoxHeight) {
          h1 = this.imgBoxHeight;
          w1 = h1 * imgRatio;
          ratio = h0 / h1;
        }
      } else {
        if (w0 > this.imgBoxWidth) {
          w1 = this.imgBoxWidth;
          h1 = w1 / imgRatio;
          ratio = w0 / w1;
        }
      }

      this.activeData = {
        w0: w0,
        h0: h0,
        w1: w1,
        h1: h1,
        ratio: ratio,
        imgRatio: imgRatio,
        img: targetImg
      };
    }
  }, {
    key: "_getRotateNum",
    value: function _getRotateNum(direction) {
      this.rotateNum += direction;

      if (this.rotateNum > 3) {
        this.rotateNum = 0;
      }

      if (this.rotateNum < 0) {
        this.rotateNum = 3;
      }
    } // TODO 独立出Tip组件

  }, {
    key: "_confirm",
    value: function _confirm(yesCallback, noCallback) {
      var _this8 = this;

      var $tip = this.$el.find('.J-pipeImg-tip');

      var hideTip = function hideTip() {
        _this8.$pipeWrapper.css('z-index', 2);

        $tip.hide();
        $tip.off('click');
      };

      var showTip = function showTip() {
        $tip.show();

        _this8.$pipeWrapper.css('z-index', 0);
      };

      showTip();
      $tip.on('click', '.J-tip-confirm', function (e) {
        yesCallback();
        hideTip();
      });
      $tip.on('click', '.J-tip-cancel', function (e) {
        noCallback && noCallback();
        hideTip();
      });
    }
  }, {
    key: "_updateIsChange",
    value: function _updateIsChange(isChange) {
      this.isChange = isChange;

      if (isChange) {
        this.$buttons.addClass('active');
      } else {
        this.$buttons.removeClass('active');
      }
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var _this9 = this;

      this.onReset(function (img) {
        _this9.activeImg = img;

        _this9._updateActiveData();

        _this9._refresh();

        _this9._goHome();

        _this9._initData();

        _this9._updateIsChange(false);
      });
    }
  }, {
    key: "_save",
    value: function _save() {
      var _this10 = this;

      var $activeThumb = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');
      var index = $activeThumb.index();
      this.onSave(function (data) {
        if (!(data && data[index] && data[index].url)) {
          window.console && console.log('save: data error!');
          return false;
        }

        var newSrc = data[index].url.replace("&amp;", "&"); // 更新单图和批量模式缩略图

        $activeThumb.addClass('new').find('img').attr('src', newSrc);

        _this10.$markAllPanel.find('.J-img-thumbnail').eq(index).find('img').attr('src', newSrc); // 更新imgList


        _this10.imgList[index] = $activeThumb.find('img').get(0);

        _this10._hideProgress();

        _this10._goHome();

        _this10.onComplete(data);

        _this10._updateIsChange(false);
      }, index);
    }
  }, {
    key: "_showProgress",
    value: function _showProgress() {
      this.$pipeWrapper.css('z-index', 0);
      this.$el.find('.J-pipeImg-progress').addClass('active');
    }
  }, {
    key: "_hideProgress",
    value: function _hideProgress() {
      this.$pipeWrapper.css('z-index', 2);
      this.$el.find('.J-pipeImg-progress').removeClass('active');
    }
  }, {
    key: "_initData",
    value: function _initData() {
      this.rotateNum = 0;
      this.scaleRatio = 1;
    }
  }, {
    key: "_updateActiveImg",
    value: function _updateActiveImg(index) {
      this.activeImg = this.imgList[index];

      this._updateActiveData();

      this._refresh();

      var options = {
        activeImg: this.activeImg,
        activeIndex: index
      };
      this.onChangeActive(options, function (img) {});
    }
  }, {
    key: "showMenu",
    value: function showMenu(index) {
      this.$el.find('.J-item').eq(index).addClass('active').siblings().removeClass('active');
      this.$el.find('.J-panel').eq(index).addClass('active').siblings().removeClass('active'); // 若是水印，设置鼠标指针状态

      if (index === 3) {
        // 切换水印按钮状态
        var $itemMark = this.$el.find('.J-item-mark');
        $itemMark.find('.J-menu-btn').hide();
        $itemMark.find('.J-menu-txt').show();
      }
    }
  }, {
    key: "showModel",
    value: function showModel(type) {
      // 编辑界面类型
      if (type === this.MARKTYPE.MULTIPLE) {
        this.imgBoxHeight = this.$markAllPanel.find('.J-img-box').height();
        this.imgBoxWidth = this.$markAllPanel.find('.J-img-box').width();
        this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;

        this._updateActiveData();

        this._refresh();

        var $itemMark = this.$el.find('.J-item-mark'); // 切换菜单及面板状态

        $itemMark.addClass('active').siblings().removeClass('active');
        this.$markAllPanel.addClass('active').siblings().removeClass('active'); // 切换水印按钮状态

        $itemMark.find('.J-menu-btn').hide();
        $itemMark.find('.J-menu-txt').show();
        var txt = $itemMark.find('.J-menu-btn-mark-all').html();
        $itemMark.find('.J-menu-txt').html(txt);
        $itemMark.find('.J-menu-btn-mark-all').hide();
        $itemMark.find('.J-menu-btn-mark').show(); // 切换页脚状态

        this.$el.find('.J-pipe-footer').addClass('mark-all');
      } else {
        this.imgBoxHeight = this.$markPanel.find('.J-img-box').height();
        this.imgBoxWidth = this.$markPanel.find('.J-img-box').width();
        this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;

        this._updateActiveData();

        this._refresh();

        var _$itemMark = this.$el.find('.J-item-mark'); // 切换菜单及面板状态


        this.$el.find('.J-item:first').addClass('active').siblings().removeClass('active');
        this.$el.find('.J-panel:first').addClass('active').siblings().removeClass('active'); // 切换水印按钮状态

        _$itemMark.find('.J-menu-btn').show();

        _$itemMark.find('.J-menu-txt').hide();

        var _txt = _$itemMark.find('.J-menu-btn-mark').html();

        _$itemMark.find('.J-menu-txt').html(_txt);

        _$itemMark.find('.J-menu-btn-mark-all').show();

        _$itemMark.find('.J-menu-btn-mark').hide(); // 切换页脚状态


        this.$el.find('.J-pipe-footer').removeClass('mark-all');
      }
    }
  }, {
    key: "destory",
    value: function destory() {
      this.$el.remove();
    }
  }, {
    key: "showDialog",
    value: function showDialog() {
      this.$pipeWrapper.fadeIn(100);
    }
  }, {
    key: "hideDialog",
    value: function hideDialog() {
      this.$pipeWrapper.fadeOut(100);
    }
  }]);

  return Dialog;
}();

/* harmony default export */ __webpack_exports__["default"] = (Dialog);

/***/ }),

/***/ "./src/js/dialog.tpl":
/*!***************************!*\
  !*** ./src/js/dialog.tpl ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pipeImg-wrapper J-pipe-wrapper\">\r\n    <div class=\"pipeImg-header\">\r\n        <ul class=\"pipeImg-menu\">\r\n            <li class=\"pipeImg-item J-item active\"><a class=\"pipeImg-btn J-menu-btn\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-refresh\"></i>{{=rotateMenuTxt}}</a></li>\r\n            <li class=\"pipeImg-item J-item\"><a class=\"pipeImg-btn J-menu-btn\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-crop\"></i>{{=cropMenuTxt}}</a></li>\r\n            <li class=\"pipeImg-item J-item\"><a class=\"pipeImg-btn J-menu-btn\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-scaling\"></i>{{=scaleMenuTxt}}</a></li>\r\n            <li class=\"pipeImg-item J-item J-item-mark\">\r\n                <a class=\"pipeImg-btn J-menu-btn\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-add-l\"></i>{{=markMenuTxt}}</a>\r\n                <div class=\"pipeImg-btn J-menu-txt\" style=\"display:none;\"><i class=\"ob-icon icon-add-l\"></i>{{=markMenuTxt}}</div>\r\n                <div class=\"pipeImg-item item-sub\">\r\n                    <a class=\"pipeImg-btn J-menu-btn-mark-all\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-batch\"></i>{{=markAllMenuTxt}}</a>\r\n                    <a class=\"pipeImg-btn J-menu-btn-mark\" href=\"javascript:void(0)\" style=\"display:none;\"><i class=\"ob-icon icon-add-l\"></i>{{=markMenuTxt}}</a>\r\n                </div>\r\n            </li>\r\n        </ul>\r\n        <a class=\"pipeImg-btn btn-close J-button-close\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-delete\"></i>{{=closeBtnTxt}}</a>\r\n    </div>\r\n    <div class=\"pipeImg-content\">\r\n        <!-- 旋转面板 -->\r\n        <div class=\"pipeImg-panel rotate-panel active J-panel J-rotate-panel\">\r\n            <div class=\"img-box J-img-box\">\r\n                <img class=\"J-source\" src=\"{{-imgList[activeIndex].src}}\">\r\n            </div>\r\n            <div class=\"content-footer\">\r\n                <div class=\"size\">\r\n                    <span class=\"J-num-width\">1</span>*<span class=\"J-num-height\">1</span>px\r\n                </div>\r\n                <a class=\"pipeImg-btn btn-rotate J-btn-rotate-left\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-rotate-l\"></i>{{=turnLeftTxt}}</a>\r\n                <a class=\"pipeImg-btn btn-rotate J-btn-rotate-right\" href=\"javascript:void(0)\"><i class=\"ob-icon icon-rotate-r\"></i>{{=turnRightTxt}}</a>\r\n\r\n                <div class=\"pipeImg-buttons\">\r\n                    <a class=\"pipeImg-button button-main J-button-save\" href=\"javascript:void(0)\">{{=saveBtnTxt}}</a>\r\n                    <a class=\"pipeImg-button button-reset J-button-reset\" href=\"javascript:void(0)\">{{=resetBtnTxt}}</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- 裁剪面板 -->\r\n        <div class=\"pipeImg-panel J-panel J-crop-panel\">\r\n            <div class=\"img-box J-img-box\">\r\n                <img class=\"J-source\" src=\"{{-imgList[activeIndex].src}}\">\r\n            </div>\r\n            <div class=\"content-footer\">\r\n                <input class=\"num-width J-num-width\" type=\"text\">\r\n                <input class=\"J-fix-ratio\" id=\"fixRatio\" type=\"checkbox\" name=\"fixRatio\" hidden>\r\n                <label class=\"fix\" for=\"fixRatio\" title=\"{{=constrainTxt}}\"><i class=\"ob-icon icon-lock\"></i></label>\r\n                <input class=\"num-height J-num-height\" type=\"text\">\r\n                <span class=\"txt\">px</span>\r\n\r\n                <div class=\"pipeImg-buttons\">\r\n                    <a class=\"pipeImg-button button-main J-button-save\" href=\"javascript:void(0)\">{{=saveBtnTxt}}</a>\r\n                    <a class=\"pipeImg-button button-reset J-button-reset\" href=\"javascript:void(0)\">{{=resetBtnTxt}}</a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <!-- 缩放面板 -->\r\n        <div class=\"pipeImg-panel scale-panel J-panel J-scale-panel\">\r\n            <div class=\"img-box J-img-box\">\r\n                <div class=\"scale-img-wrapper J-scale-img-wrapper\">\r\n                    <img class=\"J-source\" src=\"{{-imgList[activeIndex].src}}\">\r\n                </div>\r\n            </div>\r\n            <div class=\"content-footer\">\r\n                <input class=\"num-width J-num-width\" type=\"text\">\r\n                <span class=\"txt\">X</span>\r\n                <input class=\"num-height J-num-height\" type=\"text\">\r\n                <span class=\"txt\">px</span>\r\n                <input class=\"scale-range J-scale-range\" type=\"range\" name=\"scaleRatio\" min=\"50\" max=\"100\" step=\"1\" value=\"100\">\r\n\r\n                <div class=\"pipeImg-buttons\">\r\n                    <a class=\"pipeImg-button button-main J-button-save\" href=\"javascript:void(0)\">{{=saveBtnTxt}}</a>\r\n                    <a class=\"pipeImg-button button-reset J-button-reset\" href=\"javascript:void(0)\">{{=resetBtnTxt}}</a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <!-- 添加水印面板 -->\r\n        <div class=\"pipeImg-panel J-panel J-mark-panel\">\r\n            <div class=\"img-box J-img-box\">\r\n                <img class=\"J-source\" src=\"{{-imgList[activeIndex].src}}\">\r\n            </div>\r\n            <div class=\"content-footer\">\r\n                <div class=\"pipeImg-item\">\r\n                    <div class=\"txt-label\">{{=colorTxt}}:</div> \r\n                    <input class=\"J-color\" id=\"colorWhite\" type=\"radio\" name=\"color\" value=\"0\" autocomplete=\"off\" hidden>        \r\n                    <label class=\"color\" for=\"colorWhite\"></label>\r\n                    <input class=\"J-color\" id=\"colorBlack\" type=\"radio\" name=\"color\" value=\"1\" checked autocomplete=\"off\" hidden>\r\n                    <label class=\"color color-black\" for=\"colorBlack\"></label>\r\n                </div>\r\n                <div class=\"pipeImg-item\">\r\n                    <div class=\"txt-label\">{{=positionTxt}}:</div>\r\n                    <input class=\"J-position\" id=\"positionCenter\" type=\"radio\" name=\"position\" value=\"0\" autocomplete=\"off\" checked hidden>\r\n                    <label class=\"position center\" for=\"positionCenter\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionLeftTop\" type=\"radio\" name=\"position\" value=\"1\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position left-top\" for=\"positionLeftTop\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionRightTop\" type=\"radio\" name=\"position\" value=\"2\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position right-top\" for=\"positionRightTop\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionLeftBottom\" type=\"radio\" name=\"position\" value=\"3\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position left-bottom\" for=\"positionLeftBottom\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionRightBottom\" type=\"radio\" name=\"position\" value=\"4\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position right-bottom\" for=\"positionRightBottom\"><span class=\"line\"></span></label>\r\n                </div>\r\n                <div class=\"pipeImg-item\">\r\n                    <div class=\"txt-label\">{{=opacityTxt}}:</div>\r\n                    <input class=\"opacity-range J-opacity\" name=\"opacity\" type=\"range\" min=\"10\" max=\"100\" step=\"1\" defaultValue=\"80\" value=\"80\">\r\n                </div>\r\n\r\n                <select class=\"J-select-mark\" name=\"markTxt\">\r\n                    <option value=\"0\" selected=\"selected\">{{=showRoomTxt}}</option>\r\n                    <option value=\"1\">{{=companyNameTxt}}</option>\r\n                </select>\r\n\r\n                <div class=\"pipeImg-buttons\">\r\n                    <a class=\"pipeImg-button button-confirm J-button-confirm\" href=\"javascript:void(0)\">{{=confirmBtnTxt}}</a>\r\n                    <a class=\"pipeImg-button button-cancel J-button-cancel\" href=\"javascript:void(0)\">{{=cancelBtnTxt}}</a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <!-- 批量添加水印 -->\r\n        <div class=\"pipeImg-panel panel-mark-all J-panel J-mark-all-panel\">\r\n            <div class=\"img-box J-img-box\">\r\n                <img class=\"J-source\" src=\"{{-imgList[activeIndex].src}}\">\r\n            </div>\r\n            <div class=\"imgs-thumbnail J-imgs-thumbnail\">\r\n                {{ for(var i=0;i<imgList.length;i++) { }} \r\n                <div class=\"img-thumbnail {{=i === activeIndex ? 'active' : ''}} J-img-thumbnail\">\r\n                    <a href=\"javascript:void(0)\">\r\n                        <img src=\"{{-imgList[i].src}}\">\r\n                        <span class=\"circle\"></span>\r\n                    </a>\r\n                </div>\r\n\r\n                {{ } }}\r\n            </div>\r\n            <div class=\"content-footer\">\r\n                <div class=\"pipeImg-item\">\r\n                    <div class=\"txt-label\">{{=colorTxt}}:</div> \r\n                    <input class=\"J-color\" id=\"colorWhiteAll\" type=\"radio\" name=\"colorAll\" value=\"0\" autocomplete=\"off\" hidden>        \r\n                    <label class=\"color\" for=\"colorWhiteAll\"></label>\r\n                    <input class=\"J-color\" id=\"colorBlackAll\" type=\"radio\" name=\"colorAll\" value=\"1\" checked autocomplete=\"off\" hidden>\r\n                    <label class=\"color color-black\" for=\"colorBlackAll\"></label>\r\n                </div>\r\n                <div class=\"pipeImg-item\">\r\n                    <div class=\"txt-label\">{{=positionTxt}}:</div>\r\n                    <input class=\"J-position\" id=\"positionCenterAll\" type=\"radio\" name=\"positionAll\" value=\"0\" autocomplete=\"off\" checked hidden>\r\n                    <label class=\"position center\" for=\"positionCenterAll\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionLeftTopAll\" type=\"radio\" name=\"positionAll\" value=\"1\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position left-top\" for=\"positionLeftTopAll\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionRightTopAll\" type=\"radio\" name=\"positionAll\" value=\"2\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position right-top\" for=\"positionRightTopAll\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionLeftBottomAll\" type=\"radio\" name=\"positionAll\" value=\"3\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position left-bottom\" for=\"positionLeftBottomAll\"><span class=\"line\"></span></label>\r\n                    <input class=\"J-position\" id=\"positionRightBottomAll\" type=\"radio\" name=\"positionAll\" value=\"4\" autocomplete=\"off\" hidden>\r\n                    <label class=\"position right-bottom\" for=\"positionRightBottomAll\"><span class=\"line\"></span></label>\r\n                </div>\r\n                <div class=\"pipeImg-item\">\r\n                    <div class=\"txt-label\">{{=opacityTxt}}:</div>\r\n                    <input class=\"opacity-range J-opacity\" name=\"opacityAll\" type=\"range\" min=\"10\" max=\"100\" step=\"1\" defaultValue=\"80\" value=\"80\">\r\n                </div>\r\n\r\n                <select class=\"J-select-mark\" name=\"markTxtAll\">\r\n                    <option value=\"0\" selected=\"selected\">{{=showRoomTxt}}</option>\r\n                    <option value=\"1\">{{=companyNameTxt}}</option>\r\n                </select>\r\n                \r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"pipeImg-footer J-pipe-footer\">\r\n        <div class=\"imgs-thumbnail J-imgs-thumbnail\">\r\n            {{ for(var i=0;i<imgList.length;i++) { }} \r\n            <div class=\"img-thumbnail {{=i === activeIndex ? 'active' : ''}} J-img-thumbnail\">\r\n                <div class=\"img-inner\">\r\n                    <a href=\"javascript:void(0)\">\r\n                    <img src=\"{{-imgList[i].src}}\">\r\n                    <span class=\"circle\"></span>\r\n                    </a>\r\n                </div>\r\n\r\n            </div>\r\n\r\n            {{ } }}\r\n        </div>  \r\n\r\n        <div class=\"pipeImg-buttons\">\r\n            <a class=\"pipeImg-button button-confirm J-button-confirm-all\" href=\"javascript:void(0)\">{{=saveBtnTxt}}</a>\r\n            <a class=\"pipeImg-button button-cancel J-button-cancel-all\" href=\"javascript:void(0)\">{{=cancelBtnTxt}}</a>\r\n        </div>            \r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"pipeImg-tip J-pipeImg-tip\">\r\n    <div class=\"pipeImg-tip-header\">{{=tipTitleTxt}}</div>\r\n    <div class=\"pipeImg-tip-main\">\r\n        <div class=\"pipeImg-tip-content\">{{=tipContentTxt}}</div>\r\n        <a class=\"pipeImg-button button-confirm J-tip-confirm\" href=\"javascript:void(0)\">{{=tipConfirmBtnTxt}}</a>\r\n        <a class=\"pipeImg-button button-cancel J-tip-cancel\" href=\"javascript:void(0)\">{{=cancelBtnTxt}}</a>        \r\n    </div>\r\n</div>\r\n\r\n<div class=\"pipeImg-progress-bar J-pipeImg-progress\">\r\n    <div class=\"pipeImg-progress-val\"></div>\r\n</div>"

/***/ }),

/***/ "./src/js/dragBox.js":
/*!***************************!*\
  !*** ./src/js/dragBox.js ***!
  \***************************/
/*! exports provided: DragBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragBox", function() { return DragBox; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var DragBox =
/*#__PURE__*/
function () {
  function DragBox(options) {
    _classCallCheck(this, DragBox);

    // 默认配置参数
    var defaults = {
      // 待编辑图片元素
      el: '',
      width: '100%',
      height: '100%',
      markText: 'producttest.en.made-in-china.com',
      // 是否有明暗效果，主要是裁剪图片效果
      isCrop: false,
      fixRatio: false,
      // 拖动触点回调函数
      onDragPoint: function onDragPoint(boxData) {},
      // 拖动框回调函数
      onDragComplete: function onDragComplete(left, top) {}
    };
    options = _extends({}, defaults, options);
    this.el = options.el;
    this.width = options.width;
    this.height = options.height;
    this.markText = options.markText;
    this.isCrop = options.isCrop;
    this.fixRatio = options.fixRatio;
    this.onDragPoint = options.onDragPoint;
    this.onDragComplete = options.onDragComplete;
    this.init();
  }

  _createClass(DragBox, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el);
      var src = this.$el.attr('src');
      var $parent = this.$el.parent();
      var dragBoxHtml = "<div class=\"dragbox-wrapper J-dragbox-wrapper\">\n                                <img class=\"J-source\" src=\"".concat(src, "\">\n                                <div class=\"drag-box J-drag-box\">\n                                    <div class=\"drag-point up-left J-drag-point\"></div>\n                                    <div class=\"drag-point up J-drag-point\"></div>\n                                    <div class=\"drag-point up-right J-drag-point\"></div>\n                                    <div class=\"drag-point right J-drag-point\"></div>\n                                    <div class=\"drag-point right-down J-drag-point\"></div>\n                                    <div class=\"drag-point down J-drag-point\"></div>\n                                    <div class=\"drag-point left-down J-drag-point\"></div>\n                                    <div class=\"drag-point left J-drag-point\"></div>\n                                    <div class=\"mark-txt J-mark-txt\">").concat(this.markText, "</div>\n                                </div>\n                            </div>");

      if (this.isCrop) {
        dragBoxHtml = "<div class=\"dragbox-wrapper J-dragbox-wrapper\">\n                                <img class=\"J-source img-dark\" src=\"".concat(src, "\">\n                                <img class=\"J-source img-light J-img-light\" src=\"").concat(src, "\">\n                                <div class=\"drag-box J-drag-box\">\n                                    <div class=\"drag-point up-left J-drag-point\"></div>\n                                    <div class=\"drag-point up J-drag-point\"></div>\n                                    <div class=\"drag-point up-right J-drag-point\"></div>\n                                    <div class=\"drag-point right J-drag-point\"></div>\n                                    <div class=\"drag-point right-down J-drag-point\"></div>\n                                    <div class=\"drag-point down J-drag-point\"></div>\n                                    <div class=\"drag-point left-down J-drag-point\"></div>\n                                    <div class=\"drag-point left J-drag-point\"></div>\n                                </div>\n                            </div>");
      }

      $parent.html(dragBoxHtml);
      this.$dragBox = $parent.find('.J-drag-box');

      if (!this.isCrop) {
        this.$dragBox.css({
          width: this.$dragBox.find('.J-mark-txt').width(),
          height: this.$dragBox.find('.J-mark-txt').height()
        });
      }

      this.$dragPoint = this.$dragBox.find('.J-drag-point');
      this.boxEl = this.$dragBox.get(0);
      this.containerEl = this.boxEl.parentNode;
      this.imgLight = $parent.find('.J-img-light:first').get(0);
      this.boxData = {
        left: this.boxEl.offsetLeft,
        top: this.boxEl.offsetTop,
        width: this.boxEl.offsetWidth,
        height: this.boxEl.offsetHeight,
        ratio: this.boxEl.offsetWidth / this.boxEl.offsetHeight
      };

      this._bind();

      var container = this.isCrop ? this.boxEl.parentNode : null;
      Object(_util__WEBPACK_IMPORTED_MODULE_1__["drag"])(this.boxEl, this.boxEl, container, function (left, top) {
        _this._light();

        _this.onDragComplete(left, top);
      });
    }
  }, {
    key: "_bind",
    value: function _bind() {
      var _this2 = this;

      var isDraging = false;
      var contact = ""; //表示被按下的触点

      var DRAGPOINT = ['up-left', 'up', 'up-right', 'right', 'right-down', 'down', 'left-down', 'left'];
      var dragBoxRatio = this.boxData.width / this.boxData.height; //鼠标按下时

      this.$dragPoint.on('mousedown', function (e) {
        e.stopPropagation();
        isDraging = true;
        var index = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).index();
        contact = DRAGPOINT[index];
        dragBoxRatio = _this2.boxData.width / _this2.boxData.height;
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseup', function (e) {
        isDraging = false;
        _this2.boxData = {
          left: _this2.boxEl.offsetLeft,
          top: _this2.boxEl.offsetTop,
          width: _this2.boxEl.offsetWidth,
          height: _this2.boxEl.offsetHeight,
          ratio: _this2.boxEl.offsetWidth / _this2.boxEl.offsetHeight
        };
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousemove', function (e) {
        if (isDraging == true) {
          _this2._move(e, contact, dragBoxRatio);

          _this2._light();

          _this2.boxData = {
            left: _this2.boxEl.offsetLeft,
            top: _this2.boxEl.offsetTop,
            width: _this2.boxEl.offsetWidth,
            height: _this2.boxEl.offsetHeight,
            ratio: _this2.boxEl.offsetWidth / _this2.boxEl.offsetHeight
          };

          _this2.onDragPoint(_this2.boxData);
        }
      });
    } //获取元素相对于屏幕左边及上边的距离，利用offsetLeft

  }, {
    key: "_getPosition",
    value: function _getPosition() {
      var el = this.boxEl;
      var left = el.offsetLeft;
      var top = el.offsetTop;
      var parent = el.offsetParent;

      while (parent != null) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
      }

      return {
        "left": left,
        "top": top
      };
    }
  }, {
    key: "_move",
    value: function _move(e, contact, dragBoxRatio) {
      var x = e.clientX,
          y = e.clientY;
      var oldWidth = this.boxEl.offsetWidth; //选取框变化前的宽度

      var oldHeight = this.boxEl.offsetHeight; //选取框变化前的高度

      var position = this._getPosition();

      var top = position.top;
      var left = position.left;
      var newWidth;
      var newHeight;
      var newLeft;
      var newTop; // 约束比例：根据宽度计算高度

      if (contact.indexOf('left') != -1) {
        var addWidth = left - x;

        if (this.isCrop && addWidth >= 0 && this.boxEl.offsetLeft <= 0) {
          return false;
        }

        newWidth = oldWidth + addWidth;

        if (this.isCrop && newWidth <= 1) {
          return false;
        }

        newLeft = this.boxEl.offsetLeft - addWidth;
      }

      if (contact.indexOf('right') != -1) {
        var _addWidth = x - left - oldWidth;

        if (this.isCrop && _addWidth >= 0 && this.containerEl.clientWidth - (this.boxEl.offsetLeft + oldWidth + _addWidth) <= 0) {
          return false;
        }

        newWidth = oldWidth + _addWidth;
        newLeft = this.boxEl.offsetLeft;
      }

      if (contact.indexOf('up') != -1) {
        var addHeight;

        if (this.fixRatio) {
          newHeight = Math.floor(newWidth / dragBoxRatio);
          addHeight = newHeight - oldHeight;
        } else {
          addHeight = top - y;
          newHeight = oldHeight + addHeight;
        }

        if (this.isCrop && newHeight <= 1) {
          return false;
        }

        if (this.isCrop && addHeight >= 0 && this.boxEl.offsetTop <= 0) {
          return false;
        }

        newTop = this.boxEl.offsetTop - addHeight;
      }

      if (contact.indexOf('down') != -1) {
        var _addHeight;

        if (this.fixRatio) {
          newHeight = Math.floor(newWidth / dragBoxRatio);
          _addHeight = newHeight - oldHeight;
          newTop = this.boxEl.offsetTop;
        } else {
          _addHeight = y - top - oldHeight;
          newHeight = oldHeight + _addHeight;
        }

        if (this.isCrop && _addHeight >= 0 && this.containerEl.clientHeight - (this.boxEl.offsetTop + oldHeight + _addHeight) <= 0) {
          return false;
        }
      }

      if (this.isCrop) {
        newWidth = Math.min(newWidth, this.containerEl.offsetWidth);
        newHeight = Math.min(newHeight, this.containerEl.offsetHeight);
        newLeft = Math.max(newLeft, 0);
        newTop = Math.max(newTop, 0);
      }

      this.boxEl.style.width = newWidth + 'px';
      this.boxEl.style.height = newHeight + 'px';
      this.boxEl.style.left = newLeft + 'px';
      this.boxEl.style.top = newTop + 'px';
    }
  }, {
    key: "_light",
    value: function _light() {
      if (this.isCrop) {
        this._setChoice();
      }
    } //设置选取框图片区域明亮显示

  }, {
    key: "_setChoice",
    value: function _setChoice() {
      var top = this.boxEl.offsetTop;
      var right = this.boxEl.offsetLeft + this.boxEl.offsetWidth;
      var bottom = this.boxEl.offsetTop + this.boxEl.offsetHeight;
      var left = this.boxEl.offsetLeft;
      this.imgLight.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
    }
  }, {
    key: "update",
    value: function update() {
      this.$dragBox.css({
        width: this.width,
        height: this.height
      });

      if (this.isCrop) {
        this._setChoice();
      }
    }
  }]);

  return DragBox;
}();



/***/ }),

/***/ "./src/js/imgHandler.js":
/*!******************************!*\
  !*** ./src/js/imgHandler.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ImgHandler =
/*#__PURE__*/
function () {
  function ImgHandler(options) {
    _classCallCheck(this, ImgHandler);

    // 默认配置参数
    var defaults = {
      // 源图片元素
      sourceImg: null,
      rotateNum: 0,
      cropW: '',
      cropH: '',
      // 裁剪后的图片类型
      mime: 'image/jpeg',
      // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。
      // 是否添加水印
      hasMark: true,
      textAlign: 'start',
      // 水印字体，值同css的font
      markFont: '16px microsoft yahei',
      // 水印字样式，可选值：color,gradient,pattern
      markStyle: '#fff',
      // 水印字文本
      markText: 'UED',
      // 水印字x轴位置
      markX: 0,
      // 水印字y轴位置
      markY: 0,
      // 压缩图片最大值KB
      maxSize: 500,
      // 逐步压缩质量幅度，即每次已多大幅度递减压缩质量，直到符合最小体积值
      qualityStep: 0.1
    };
    options = _extends({}, defaults, options);
    this.sourceImg = options.sourceImg;
    this.rotateNum = options.rotateNum;
    this.maxSize = options.maxSize;
    this.cropW = options.cropW;
    this.cropH = options.cropH;
    this.mime = options.mime;
    this.qualityStep = options.qualityStep;
    this.hasMark = options.hasMark;
    this.textAlign = options.textAlign;
    this.markFont = options.markFont;
    this.markStyle = options.markStyle;
    this.markText = options.markText;
    this.markX = options.markX;
    this.markY = options.markY; // 全局变量

    this.sx = 0;
    this.sy = 0;
    this.scaleRatio = 1;
    this.results = [];
    this.init();
  }

  _createClass(ImgHandler, [{
    key: "init",
    value: function init() {
      var targetImg = this.sourceImg;
      var sourceW0 = targetImg.width;
      var sourceH0 = targetImg.height;

      if (targetImg.nodeName.toLowerCase() === 'img') {
        sourceW0 = targetImg.naturalWidth;
        sourceH0 = targetImg.naturalHeight; // img to canvas

        var canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCanvas"])(sourceW0, sourceH0);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(targetImg, 0, 0);
        targetImg = canvas;
      }

      this.result = targetImg;
      this.results.push(this.result);
    } // 重置

  }, {
    key: "reset",
    value: function reset() {
      this.rotateNum = 0;
      this.scaleRatio = 1;
      this.results = this.results.slice(0, 1);
    } // 回退

  }, {
    key: "rollback",
    value: function rollback() {
      this.results.pop();
    } // 旋转

  }, {
    key: "rotate",
    value: function rotate() {
      var targetImg = this.result;
      var sourceW0 = targetImg.width;
      var sourceH0 = targetImg.height;
      var rotateDeg = this.rotateNum * 90;
      var max = Math.max(sourceW0, sourceH0);
      var tempCvs = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCanvas"])(max, max),
          tempCtx = tempCvs.getContext('2d');
      tempCtx.translate(max / 2, max / 2);
      tempCtx.rotate(rotateDeg * Math.PI / 180);
      tempCtx.translate(-max / 2, -max / 2);
      tempCtx.drawImage(targetImg, 0, 0);
      var w = sourceW0,
          h = sourceH0,
          sx = 0,
          sy = 0;

      if (this.rotateNum === 1) {
        w = sourceH0;
        h = sourceW0;
        sx = max - w;
        sy = 0;
      } else if (this.rotateNum === 2) {
        w = sourceW0;
        h = sourceH0;
        sx = max - w;
        sy = max - h;
      } else if (this.rotateNum === 3) {
        w = sourceH0;
        h = sourceW0;
        sx = 0;
        sy = max - h;
      } else {
        w = sourceW0;
        h = sourceH0;
        sx = 0;
        sy = 0;
      }

      var canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCanvas"])(w, h),
          context = canvas.getContext('2d');
      context.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h); // this.base64Data = canvas.toDataURL(this.mime);

      this.result = canvas;
      this.results.push(canvas);
      return this;
    } // 水印

  }, {
    key: "mark",
    value: function mark() {
      var targetImg = this.result;
      var sourceW0 = targetImg.width;
      var sourceH0 = targetImg.height;
      var canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCanvas"])(sourceW0, sourceH0);
      var dContext = canvas.getContext('2d');
      dContext.drawImage(targetImg, 0, 0);

      if (this.hasMark) {
        dContext.textBaseline = "top";
        dContext.textAlign = this.textAlign;
        dContext.font = this.markFont;
        dContext.fillStyle = this.markStyle;
        dContext.fillText(this.markText, this.markX, this.markY);
      } // this.base64Data = canvas.toDataURL(this.mime);


      this.result = canvas;
      this.results.push(canvas);
      return this;
    } // 裁剪

  }, {
    key: "crop",
    value: function crop() {
      var targetImg = this.result;
      var canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCanvas"])(this.cropW, this.cropH);
      var context = canvas.getContext('2d');
      context.drawImage(targetImg, this.sx, this.sy, this.cropW, this.cropH, 0, 0, this.cropW, this.cropH); // this.base64Data = canvas.toDataURL(this.mime);

      this.result = canvas;
      this.results.push(canvas);
      return this;
    } // 缩放

  }, {
    key: "scale",
    value: function scale() {
      var targetImg = this.result;
      var sourceW0 = targetImg.width;
      var sourceH0 = targetImg.height;
      var resultW = this.scaleRatio * sourceW0;
      var resultH = this.scaleRatio * sourceH0;
      var canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCanvas"])(resultW, resultH);
      var context = canvas.getContext('2d');
      context.drawImage(targetImg, 0, 0, sourceW0, sourceH0, 0, 0, resultW, resultH); // this.base64Data = canvas.toDataURL(this.mime);

      this.result = canvas;
      this.results.push(canvas);
      return this;
    } // 只对'image/jpeg'格式有效

  }, {
    key: "compress",
    value: function compress(isSimple) {
      var cvs = this.result;
      var max = this.maxSize * 1024;
      var quality = 1;
      var qualityStep = this.qualityStep; // 质量压缩只支持'image/jpeg'，'image/webp'(chrome支持)

      var qualityType = 'image/jpeg';
      var data = cvs.toDataURL(qualityType, 1.0);
      var size0 = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getBase64Size"])(data); // console.log('start compress: ' + Math.ceil(size0 / 1024));
      // 简单粗暴

      if (isSimple) {
        while (size0 > max) {
          quality = Math.floor(max / size0 * 10) / 10;
          data = cvs.toDataURL(qualityType, quality);
          size0 = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getBase64Size"])(data);
        }
      } else {
        // 降低质量
        while (size0 > max) {
          quality -= qualityStep;
          data = cvs.toDataURL(qualityType, quality);
          size0 = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getBase64Size"])(data);
        }
      } // console.log('end compress: ' + Math.ceil(size0 / 1024));


      var blobData = Object(_util__WEBPACK_IMPORTED_MODULE_0__["base64Data2Blob"])(data, this.mime);
      ;
      var formdata = Object(_util__WEBPACK_IMPORTED_MODULE_0__["blob2FormData"])(blobData);
      return {
        "base64": data,
        "blob": blobData,
        "formdata": formdata
      };
    }
  }]);

  return ImgHandler;
}();

/* harmony default export */ __webpack_exports__["default"] = (ImgHandler);

/***/ }),

/***/ "./src/js/pipeImg.js":
/*!***************************!*\
  !*** ./src/js/pipeImg.js ***!
  \***************************/
/*! exports provided: PipeImg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipeImg", function() { return PipeImg; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
/* harmony import */ var _imgHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imgHandler */ "./src/js/imgHandler.js");
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dialog */ "./src/js/dialog.js");
/* harmony import */ var _css_pipeImg_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/pipeImg.scss */ "./src/css/pipeImg.scss");
/* harmony import */ var _css_pipeImg_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_pipeImg_scss__WEBPACK_IMPORTED_MODULE_4__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var PipeImg =
/*#__PURE__*/
function () {
  function PipeImg(options) {
    _classCallCheck(this, PipeImg);

    // 默认配置参数
    var defaults = {
      debug: false,
      // 必填，[{"id":"567701","url":"./images/Jellyfish.jpg"}]
      source: [],
      // 上传图片地址
      uploadUrl: '',
      // 发送文件类型，可以使二进制流'blob'可以是表单数据'formdata'，默认二进制流
      sendDataType: 'formdata',
      // 图片编辑界面类型: '0'单图编辑, '1'批量水印
      type: '0',
      mime: 'image/jpeg',
      // 保存图片最大体积
      maxSize: 500,
      // 直接选择水印文字位置水平垂直距离边框位置
      markXPositionMargin: 15,
      markYPositionMargin: 20,
      // 文案
      markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product SourcingFocus Service Co - Product Sourcing'],
      closeBtnTxt: '关闭',
      saveBtnTxt: '保存',
      resetBtnTxt: '重置',
      confirmBtnTxt: '确定',
      cancelBtnTxt: '取消',
      rotateMenuTxt: '旋转',
      turnLeftTxt: '逆时针旋转',
      turnRightTxt: '顺时针旋转',
      cropMenuTxt: '裁剪',
      scaleMenuTxt: '缩放',
      markMenuTxt: '添加水印',
      colorTxt: '颜色',
      positionTxt: '位置',
      opacityTxt: '透明度',
      showRoomTxt: '展示厅',
      companyNameTxt: '公司名称',
      markAllMenuTxt: '批量添加水印',
      tipTitleTxt: '提示',
      tipContentTxt: '尚未保存，是否确定离开？',
      tipConfirmBtnTxt: '确定',
      constrainTxt: '约束比例',
      // 初始化完成
      onInited: function onInited() {},
      // 上传保存完成
      onComplete: function onComplete(response) {},
      onClose: function onClose() {}
    };
    options = _extends({}, defaults, options);
    this.debug = options.debug;
    this.source = options.source;

    if (!this.source) {
      throw new Error('PipeImg: source is not found!');
    }

    if (!(Array.isArray(this.source) || typeof this.source === 'string')) {
      throw new Error('PipeImg: source类型错误，只能为字符串或者数组！');
    }

    this.uploadUrl = options.uploadUrl;
    this.sendDataType = options.sendDataType;
    this.type = options.type;
    this.mime = options.mime;
    this.maxSize = options.maxSize;
    this.markXPositionMargin = options.markXPositionMargin;
    this.markYPositionMargin = options.markYPositionMargin;
    this.markTextList = options.markTextList;
    this.closeBtnTxt = options.closeBtnTxt;
    this.saveBtnTxt = options.saveBtnTxt;
    this.resetBtnTxt = options.resetBtnTxt;
    this.confirmBtnTxt = options.confirmBtnTxt;
    this.cancelBtnTxt = options.cancelBtnTxt;
    this.rotateMenuTxt = options.rotateMenuTxt;
    this.turnLeftTxt = options.turnLeftTxt;
    this.turnRightTxt = options.turnRightTxt;
    this.cropMenuTxt = options.cropMenuTxt;
    this.scaleMenuTxt = options.scaleMenuTxt;
    this.markMenuTxt = options.markMenuTxt;
    this.colorTxt = options.colorTxt;
    this.positionTxt = options.positionTxt;
    this.opacityTxt = options.opacityTxt;
    this.showRoomTxt = options.showRoomTxt;
    this.companyNameTxt = options.companyNameTxt;
    this.markAllMenuTxt = options.markAllMenuTxt;
    this.tipTitleTxt = options.tipTitleTxt;
    this.tipContentTxt = options.tipContentTxt;
    this.tipConfirmBtnTxt = options.tipConfirmBtnTxt;
    this.constrainTxt = options.constrainTxt;
    this.onInited = options.onInited;
    this.onComplete = options.onComplete;
    this.onClose = options.onClose;
    this.resultList = [];
    this.sourceImgList = [];
    this.returnJson = [];
    this.methods = [];
    this.activeIndex = 0;

    this._init();
  }

  _createClass(PipeImg, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this.returnJson = this.source;
      var urlList = this.source.map(function (element, index) {
        return element.url;
      }); // 解决加载完成及跨域问题

      Object(_util__WEBPACK_IMPORTED_MODULE_1__["loadImages"])(urlList, function (images) {
        _this.sourceImgList = images;

        _this.onInited();

        _this._executeMethods();
      }, function () {
        throw new Error('PipeImg: source load failure!');
      });
    }
  }, {
    key: "_show",
    value: function _show(options) {
      if (options && options.selected) {
        this.activeIndex = options.selected;
      }

      this.imgHandler = new _imgHandler__WEBPACK_IMPORTED_MODULE_2__["default"]({
        sourceImg: this.sourceImgList[this.activeIndex]
      });
      this.resultList.push(this.imgHandler.result);
      this.dialog.renderImgList(this.sourceImgList, this.activeIndex);
    }
  }, {
    key: "_saveRotate",
    value: function _saveRotate(options, cb) {
      this.imgHandler.rotateNum = options.rotateNum;
      this.imgHandler.rotate();
      this.resultList.push(this.imgHandler.result);
      cb(this.imgHandler.result);
    }
  }, {
    key: "_saveCrop",
    value: function _saveCrop(options, cb) {
      this.imgHandler.cropW = options.cropW;
      this.imgHandler.cropH = options.cropH;
      this.imgHandler.sx = options.sx;
      this.imgHandler.sy = options.sy;
      this.imgHandler.crop();
      this.resultList.push(this.imgHandler.result);
      cb(this.imgHandler.result);
    }
  }, {
    key: "_saveScale",
    value: function _saveScale(options, cb) {
      this.imgHandler.scaleRatio = options.scaleRatio;
      this.imgHandler.scale();
      this.resultList.push(this.imgHandler.result);
      cb(this.imgHandler.result);
    }
  }, {
    key: "_saveMark",
    value: function _saveMark(options, cb) {
      this.imgHandler.markX = options.markX;
      this.imgHandler.markY = options.markY;
      this.imgHandler.markText = options.markText;
      this.imgHandler.markFont = options.markFont;
      this.imgHandler.markStyle = options.markStyle;
      this.imgHandler.mark();
      this.resultList.push(this.imgHandler.result);
      cb(this.imgHandler.result);
    }
  }, {
    key: "_reset",
    value: function _reset(cb) {
      this.rotateNum = 0;
      this.scaleRatio = 1;
      this.resultList = this.resultList.slice(0, 1);
      this.imgHandler = new _imgHandler__WEBPACK_IMPORTED_MODULE_2__["default"]({
        sourceImg: this.resultList[0]
      });
      cb(this.resultList[0]);
    }
  }, {
    key: "_save",
    value: function _save(cb, index) {
      var _this2 = this;

      var compressData = this.imgHandler.compress();
      var sendData = this.sendDataType === 'blob' ? compressData.blob : compressData.formdata;

      if (this.debug) {
        // 模拟返回
        setTimeout(function () {
          // let response = [{"picHeight":600,"picWidth":800,"tempPhotoId":"573761","url":"image?tid=40&amp;id=gCfpAUFcYRlB&amp;cache=0&amp;lan_code=0"}];
          var response = [{
            "picHeight": 600,
            "picWidth": 800,
            "tempPhotoId": "573761",
            "url": compressData.base64
          }];

          _this2._saveSuccess(response[0], index, cb);
        }, 1000);
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
          url: this.uploadUrl,
          type: "POST",
          data: sendData,
          processData: false,
          contentType: false,
          success: function success(response) {
            _this2._saveSuccess(response[0], index, cb);
          },
          error: function error() {
            window.console && console.log('network-error: upload failure!');
          }
        });
      }
    }
  }, {
    key: "_saveSuccess",
    value: function _saveSuccess(data, index, cb) {
      data.url = data.url.replace("&amp;", "&");
      var img = new Image();
      img.src = data.url;
      this.resultList = [img];
      this.sourceImgList[index] = img;
      var o = {
        "id": data.tempPhotoId,
        "url": data.url,
        "picWidth": data.picWidth,
        "picHeight": data.picHeight
      };
      this.returnJson[index] = o;
      cb && cb(this.returnJson);
    }
  }, {
    key: "_changeActive",
    value: function _changeActive(options, cb) {
      this.activeIndex = options.activeIndex;
      this.imgHandler = new _imgHandler__WEBPACK_IMPORTED_MODULE_2__["default"]({
        sourceImg: options.activeImg
      });
      this.resultList = [this.imgHandler.result];
      cb && cb(this.imgHandler.result);
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this3 = this;

      this.dialog = new _dialog__WEBPACK_IMPORTED_MODULE_3__["default"]({
        debug: this.debug,
        activeIndex: this.activeIndex,
        type: this.type,
        mime: this.mime,
        markXPositionMargin: this.markXPositionMargin,
        markYPositionMargin: this.markYPositionMargin,
        markTextList: this.markTextList,
        closeBtnTxt: this.closeBtnTxt,
        saveBtnTxt: this.saveBtnTxt,
        resetBtnTxt: this.resetBtnTxt,
        confirmBtnTxt: this.confirmBtnTxt,
        cancelBtnTxt: this.cancelBtnTxt,
        rotateMenuTxt: this.rotateMenuTxt,
        turnLeftTxt: this.turnLeftTxt,
        turnRightTxt: this.turnRightTxt,
        cropMenuTxt: this.cropMenuTxt,
        scaleMenuTxt: this.scaleMenuTxt,
        markMenuTxt: this.markMenuTxt,
        colorTxt: this.colorTxt,
        positionTxt: this.positionTxt,
        opacityTxt: this.opacityTxt,
        showRoomTxt: this.showRoomTxt,
        companyNameTxt: this.companyNameTxt,
        markAllMenuTxt: this.markAllMenuTxt,
        tipTitleTxt: this.tipTitleTxt,
        tipContentTxt: this.tipContentTxt,
        tipConfirmBtnTxt: this.tipConfirmBtnTxt,
        constrainTxt: this.constrainTxt,
        onSaveRotate: function onSaveRotate(options, cb) {
          _this3._saveRotate(options, cb);
        },
        onSaveCrop: function onSaveCrop(options, cb) {
          _this3._saveCrop(options, cb);
        },
        onSaveScale: function onSaveScale(options, cb) {
          _this3._saveScale(options, cb);
        },
        onSaveMark: function onSaveMark(options, cb) {
          _this3._saveMark(options, cb);
        },
        onReset: function onReset(cb) {
          _this3._reset(cb);
        },
        onSave: function onSave(cb, index) {
          _this3._save(cb, index);
        },
        onChangeActive: function onChangeActive(options, cb) {
          _this3._changeActive(options, cb);
        },
        onSaveMarkAll: function onSaveMarkAll(options, cb) {
          _this3._saveMarkAll(options, cb);
        },
        onClose: function onClose() {
          _this3.onClose();
        },
        onComplete: function onComplete(result) {
          _this3.onComplete(result);
        }
      });
      this.methods.push({
        "name": "show",
        "params": options
      });
    }
  }, {
    key: "_executeMethods",
    value: function _executeMethods() {
      var _this4 = this;

      this.methods.forEach(function (element) {
        _this4['_' + element.name](element.params);
      });
      this.methods = [];
    }
  }]);

  return PipeImg;
}();



/***/ }),

/***/ "./src/js/thinSelect.js":
/*!******************************!*\
  !*** ./src/js/thinSelect.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! template */ "template");
/* harmony import */ var template__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(template__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _thinSelect_tpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./thinSelect.tpl */ "./src/js/thinSelect.tpl");
/* harmony import */ var _thinSelect_tpl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_thinSelect_tpl__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var ThinSelect =
/*#__PURE__*/
function () {
  function ThinSelect(options) {
    _classCallCheck(this, ThinSelect);

    var defaults = {
      el: '',
      template: _thinSelect_tpl__WEBPACK_IMPORTED_MODULE_2___default.a
    };
    options = _extends({}, defaults, options);
    this.el = options.el;
    this.template = options.template;
    this.$el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el);
    this.selectObj = {
      'txt': '',
      'optionsObj': []
    };

    this._init();
  }

  _createClass(ThinSelect, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this.$el.find('option').each(function (index, element) {
        var $option = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
        var selected = $option.prop('selected');
        var optionVal = $option.val();
        var optionTxt = $option.text();
        var optionObj = {
          'val': optionVal,
          'txt': optionTxt,
          'selected': selected
        };

        if (selected) {
          _this.selectObj.txt = optionTxt;
        }

        _this.selectObj.optionsObj.push(optionObj);
      });
      var templateHtml = template__WEBPACK_IMPORTED_MODULE_1___default()(this.template, {
        'txt': this.selectObj.txt,
        optionList: this.selectObj.optionsObj
      });
      this.$el.hide();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(templateHtml).insertBefore(this.$el);
      this.$thinSelect = this.$el.prev();

      this._bind();
    }
  }, {
    key: "_bind",
    value: function _bind() {
      var _this2 = this;

      this.$thinSelect.find('.J-select-title').on('click', function (e) {
        e.stopPropagation();

        var $list = _this2.$thinSelect.find('.J-select-list');

        if ($list.is(':visible')) {
          $list.hide();

          _this2.$thinSelect.find('.J-arrow').removeClass('active');
        } else {
          $list.show();

          _this2.$thinSelect.find('.J-arrow').addClass('active');
        }
      });
      this.$thinSelect.find('.J-opt').on('click', function (e) {
        e.stopPropagation();
        var txt = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('selected').text();

        _this2.$thinSelect.find('.J-text').text(txt);

        _this2.$thinSelect.find('.J-select-list').hide();

        _this2.$thinSelect.find('.J-arrow').removeClass('active');

        _this2.$activeItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent();

        _this2.$activeItem.siblings().find('.J-opt').removeClass('selected');

        _this2._updateSource();
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click.thinSelect', function (e) {
        _this2.$thinSelect.find('.J-select-list').hide();

        _this2.$thinSelect.find('.J-arrow').removeClass('active');
      });
    }
  }, {
    key: "_updateSource",
    value: function _updateSource() {
      var index = this.$activeItem.index();
      this.$el.find('option').eq(index).prop('selected', true);
      this.$el.trigger('change');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click.thinSelect');
      this.$thinSelect.remove();
    }
  }, {
    key: "select",
    value: function select(index) {
      var $item = this.$thinSelect.find('.J-opt').parent().eq(index);
      $item.siblings().find('.J-opt').removeClass('selected');
      var txt = $item.find('.J-opt').addClass('selected').text();
      this.$thinSelect.find('.J-text').text(txt);
    }
  }]);

  return ThinSelect;
}();

ThinSelect.use = function (el) {
  if (!el) {
    throw new Error('ThinSelect: el is not found!');
  }

  var instances = [];
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).each(function (index, element) {
    var instance = new ThinSelect({
      'el': element
    });
    instances.push(instance);
  });
  return instances;
};

/* harmony default export */ __webpack_exports__["default"] = (ThinSelect);

/***/ }),

/***/ "./src/js/thinSelect.tpl":
/*!*******************************!*\
  !*** ./src/js/thinSelect.tpl ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"thin-select\">\n\t<div class=\"select-title J-select-title\">\n\t\t<div class=\"select-selected\">\n\t\t\t<span class=\"J-text\">{{=txt}}</span>\n\t\t</div>\n\t\t<div class=\"select-arrow J-arrow\">\n\t\t\t<i class=\"ob-icon icon-down\"></i>\n\t\t</div>\n\t</div>\n\t<div class=\"select-list J-select-list\">\n\t\t<ul class=\"select-list-wrap J-select-tab-cnt\">\n\t\t\t{{ for(var i=0; i < optionList.length; i++) { }} \n\t\t\t\t<li>\n\t\t\t\t\t<a href=\"javascript:void(0)\" class=\"select-opt J-opt {{=optionList[i].selected ? 'selected' : ''}}\" data-val=\"{{=optionList[i].val}}\">{{=optionList[i].txt}}</a>\n\t\t\t\t</li>\n\t\t\t{{ } }}\n\t\t</ul>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/js/thumbnail.tpl":
/*!******************************!*\
  !*** ./src/js/thumbnail.tpl ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n    {{ for(var i=0;i<imgList.length;i++) { }} \r\n    <div class=\"img-thumbnail {{=i === activeIndex ? 'active' : ''}} J-img-thumbnail\">\r\n        <div class=\"img-inner\">\r\n            <a href=\"javascript:void(0)\">\r\n            <img src=\"{{-imgList[i].src}}\">\r\n            <span class=\"circle\"></span>\r\n            </a>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    {{ } }}"

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: drag, loadImage, loadImages, getCanvas, getBase64Size, compress, base64Data2Blob, blob2FormData, chooseFile, uploadFile, getImgPromise, _$, img2cvs, isRealNum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return drag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImages", function() { return loadImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCanvas", function() { return getCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBase64Size", function() { return getBase64Size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compress", function() { return compress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64Data2Blob", function() { return base64Data2Blob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blob2FormData", function() { return blob2FormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseFile", function() { return chooseFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadFile", function() { return uploadFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImgPromise", function() { return getImgPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_$", function() { return _$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "img2cvs", function() { return img2cvs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRealNum", function() { return isRealNum; });
//拖拽
function drag(moveElement, dragBar, container, cb) {
  if (!moveElement) return;
  dragBar = dragBar || moveElement;
  var draging = false,
      x0,
      y0,
      mLeft0,
      mTop0,
      mLeft1,
      mTop1;

  var mousedownHandler = function mousedownHandler(e) {
    e = e || window.event;
    x0 = e.clientX;
    y0 = e.clientY;
    mLeft0 = moveElement.offsetLeft;
    mTop0 = moveElement.offsetTop;
    draging = true;
  };

  var mousemoveHandler = function mousemoveHandler(e) {
    e = e || window.event;

    if (draging) {
      var x1 = e.clientX,
          y1 = e.clientY;
      mLeft1 = x1 - x0 + mLeft0;
      mTop1 = y1 - y0 + mTop0;

      if (container) {
        // 计算可移动位置的大小， 保证元素不会超过可移动范围
        // 此处就是父元素的宽度减去子元素宽度
        var width = container.clientWidth - moveElement.offsetWidth;
        var height = container.clientHeight - moveElement.offsetHeight; // min方法保证不会超过右边界，max保证不会超过左边界

        mLeft1 = Math.min(Math.max(0, mLeft1), width);
        mTop1 = Math.min(Math.max(0, mTop1), height);
      }

      moveElement.style.left = mLeft1 + 'px';
      moveElement.style.top = mTop1 + 'px';
      typeof cb === 'function' && cb(mLeft1, mTop1);
    }
  };

  var mouseupHandler = function mouseupHandler(e) {
    draging = false;
  };

  if (window.addEventListener) {
    dragBar.addEventListener('mousedown', mousedownHandler, false);
    document.addEventListener('mousemove', mousemoveHandler, false);
    document.addEventListener('mouseup', mouseupHandler, false);
  }
}

function getImgPromise(src) {
  return new Promise(function (resolve, reject) {
    var image = new Image(); // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）

    image.setAttribute('crossorigin', 'anonymous');
    image.src = src;

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      reject('Error: image error!');
    };
  });
} // 加载图片


function loadImage(src, success, failure) {
  var image = new Image(); // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）

  image.setAttribute('crossorigin', 'anonymous');
  image.src = src;

  image.onload = function () {
    typeof success === 'function' && success(image);
  };

  image.onerror = function () {
    typeof failure === 'function' && failure();
  };
}

function loadImages(srcList, success, failure) {
  if (typeof srcList === 'string') {
    srcList = [srcList];
  }

  var images = [];
  var index = srcList.length;

  var _loadImage = function _loadImage() {
    if (index === 0) {
      return false;
    }

    var image = new Image(); // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）

    image.setAttribute('crossorigin', 'anonymous');
    image.src = srcList[--index];

    image.onload = function () {
      images.unshift(image);

      if (images.length === srcList.length) {
        typeof success === 'function' && success(images);
        return false;
      }

      _loadImage();
    };

    image.onerror = function () {
      typeof failure === 'function' && failure();
    };
  };

  _loadImage();
} // 创建cavas


function getCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
} //获取base64图片大小


function getBase64Size(base64Data) {
  // 'data:image/jpeg;base64,xxxxxx...xxx='
  var str = base64Data.replace(/^data:image\/[\w]*;base64,$/, '');
  var equalIndex = str.indexOf('=');

  if (equalIndex > 0) {
    str = str.substring(0, equalIndex);
  }

  var strLength = str.length;
  return parseInt(strLength - strLength / 8 * 2);
} // 只对'image/jpeg'格式有效


function compress(img, max, isSimple) {
  var cvs = img;

  if (cvs.nodeName.toLowerCase() === 'img') {
    cvs = img2cvs(cvs);
  }

  var quality = 1;
  var minWH = 800;
  var scaleRatio = 0.9;
  var qualityStep = 0.1; // 质量压缩只支持'image/jpeg'，'image/webp'(chrome支持)

  var qualityType = 'image/jpeg';
  var width = cvs.width;
  var height = cvs.height;
  var cvsRatio = width / height;
  var data = cvs.toDataURL(qualityType, 1.0);
  var size0 = getBase64Size(data); // console.log('start compress: ' + Math.ceil(size0 / 1024));

  if (isSimple) {
    while (size0 > max) {
      quality = Math.floor(max / size0 * 10) / 10;
      data = cvs.toDataURL(qualityType, quality);
      size0 = getBase64Size(data);
    }
  } else {
    // 优先缩放
    while (size0 > max && (width > minWH || height > minWH)) {
      var newWidth = void 0,
          newHeight = void 0;

      if (cvsRatio > 1) {
        newWidth = width * scaleRatio > minWH ? width * scaleRatio : minWH;
        newHeight = newWidth / cvsRatio;
      } else {
        newHeight = height * scaleRatio > minWH ? height * scaleRatio : minWH;
        newWidth = newHeight * cvsRatio;
      }

      var canvas = getCanvas(newWidth, newHeight),
          ctx = canvas.getContext("2d");
      ctx.drawImage(cvs, 0, 0, newWidth, newHeight);
      data = canvas.toDataURL(qualityType, 1.0);
      size0 = getBase64Size(data);
      width = newWidth;
      height = newHeight;
      cvs = canvas;
    } // 降低质量


    while (size0 > max) {
      quality -= qualityStep;
      data = cvs.toDataURL(qualityType, quality);
      size0 = getBase64Size(data);
    }
  } // console.log('end compress: ' + Math.ceil(size0 / 1024));


  return data;
}

function base64Data2Blob(base64Data, mime) {
  var binStr = atob(base64Data.split(',')[1]),
      len = binStr.length,
      arr = new Uint8Array(len);

  if (!mime) {
    // mime = base64Data.split(',')[0].split(':')[1].split(';')[0];
    mime = base64Data.substring(base64Data.indexOf('data:') + 5, base64Data.indexOf(';base64'));
  }

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr], {
    type: mime
  });
}

function blob2FormData(blob, fileName) {
  var formData = new FormData();
  formData.append('file', blob);

  if (!fileName) {
    fileName = new Date().getTime();
  }

  formData.append("fileName", fileName);
  return formData;
} // canvas转成blob对象，type值为image/jpeg或者image/webp时，可使用encoderOptions（0-1）设置图片展示质量。


function canvas2Blob(canvas, callback, type, quality) {
  // Polyfill
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function value(callback, type, quality) {
        var binStr = atob(this.toDataURL('image/jpeg', quality).split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], {
          type: type || 'image/png'
        }));
      }
    });
  }

  canvas.toBlob(callback, type, quality);
}

function uploadFile(formData, url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST', url); //注意跨域问题

  xmlHttp.send(formData);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log(xmlHttp.responseText);
    } else {
      console.log(xmlHttp.statusText);
    }
  };
} // 选择文件


function chooseFile(btn, cb, validFileCallback) {
  var $btn = typeof btn === "string" ? document.querySelector(btn) : btn;
  var $file = $btn.querySelector('input[type=file]');

  if (!$file) {
    var fileNode = document.createElement('input');
    fileNode.setAttribute('type', 'file');
    fileNode.style.cssText = 'display: none;';
    $btn.appendChild(fileNode);
    $file = $btn.querySelector('input[type=file]');
  }

  $file.addEventListener('change', function (e) {
    if (this.files.length > 0) {
      var oFile = this.files[0];
      var validFile = true;

      if (typeof validFileCallback === 'function' && validFileCallback(oFile) === false) {
        validFile = false;
      }

      if (validFile) {
        var reader = new FileReader();
        reader.readAsDataURL(oFile);

        reader.onload = function () {
          typeof cb === 'function' && cb(this.result);
        };
      } else {
        console.log('onValidateFile function return false');
      }
    }
  }, false); // 阻止冒泡导致两次触发selectBtn

  $file.addEventListener('click', function (e) {
    e.stopPropagation();
  });
  $file.click();
}

function _$(ele) {
  return typeof ele === 'string' ? document.querySelector(ele) : ele;
}

function img2cvs(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

function isRealNum(val) {
  if (typeof val !== 'number') {
    return false;
  }

  if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
}



/***/ }),

/***/ "jquery":
/*!******************************************************************************************!*\
  !*** external {"commonjs":"jQuery","commonjs2":"jQuery","amd":"jQuery","root":"jQuery"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

/***/ }),

/***/ "template":
/*!**************************************************************************************************!*\
  !*** external {"commonjs":"template","commonjs2":"template","amd":"template","root":"template"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_template__;

/***/ })

/******/ });
});
//# sourceMappingURL=pipeImg.js.map