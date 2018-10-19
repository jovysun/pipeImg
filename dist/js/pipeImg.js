'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/__webpack_require__.r = function (exports) {
    /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
    /******/Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/__webpack_require__.t = function (value, mode) {
    /******/if (mode & 1) value = __webpack_require__(value);
    /******/if (mode & 8) return value;
    /******/if (mode & 4 && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && value.__esModule) return value;
    /******/var ns = Object.create(null);
    /******/__webpack_require__.r(ns);
    /******/Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/if (mode & 2 && typeof value != 'string') for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    } /******/return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/{

  /***/"./node_modules/webpack/buildin/amd-options.js":
  /*!****************************************!*\
    !*** (webpack)/buildin/amd-options.js ***!
    \****************************************/
  /*! no static exports found */
  /***/function node_modulesWebpackBuildinAmdOptionsJs(module, exports) {

    eval("/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */\r\nmodule.exports = __webpack_amd_options__;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, {}))\n\n//# sourceURL=webpack:///(webpack)/buildin/amd-options.js?");

    /***/
  },

  /***/"./node_modules/webpack/buildin/harmony-module.js":
  /*!*******************************************!*\
    !*** (webpack)/buildin/harmony-module.js ***!
    \*******************************************/
  /*! no static exports found */
  /***/function node_modulesWebpackBuildinHarmonyModuleJs(module, exports) {

    eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

    /***/
  },

  /***/"./src/js/cropBox.js":
  /*!***************************!*\
    !*** ./src/js/cropBox.js ***!
    \***************************/
  /*! exports provided: CropBox */
  /***/function srcJsCropBoxJs(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CropBox\", function() { return CropBox; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\nclass CropBox {\n    constructor(options) {\n        const defaults = {\n\n        };\n        options = Object.assign({}, defaults, options);\n\n        this.init();\n    }\n    init() {\n        var mainDiv = $('main');\n        var rightDiv = $('right');\n        var leftDiv = $('left');\n        var upDiv = $('up');\n        var downDiv = $('down');\n        var upleftDiv = $('up-left');\n        var uprightDiv = $('up-right');\n        var rightdownDiv = $('right-down');\n        var leftdownDiv = $('left-down');\n        \n        var isDraging = false;\n        var contact = \"\"; //表示被按下的触点\n        //鼠标按下时\n        rightDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"right\";\n        }\n        leftDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"left\";\n        }\n        upDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"up\";\n        }\n        downDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"down\";\n        }\n        rightdownDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"right-down\";\n        }\n        leftdownDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"left-down\";\n        }\n        upleftDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"up-left\";\n        }\n        uprightDiv.onmousedown = function (e) {\n            e.stopPropagation();\n            isDraging = true;\n            contact = \"up-right\";\n        }\n        //鼠标松开时\n        window.onmouseup = function () {\n            isDraging = false;\n        }\n        \n        window.onmousemove = function (e) {\n            var e = e || window.event;\n            if (isDraging == true) {\n                switch (contact) {\n                    case \"up\":\n                        upMove(e);\n                        break;\n                    case \"right\":\n                        rightMove(e);\n                        break;\n                    case \"down\":\n                        downMove(e);\n                        break;\n                    case \"left\":\n                        leftMove(e);\n                        break;\n                    case \"up-right\":\n                        upMove(e);\n                        rightMove(e);\n                        break;\n                    case \"right-down\":\n                        downMove(e);\n                        rightMove(e);\n                        break;\n                    case \"left-down\":\n                        downMove(e);\n                        leftMove(e);\n                        break;\n                    case \"up-left\":\n                        upMove(e);\n                        leftMove(e);\n                        break;\n                }\n            }\n        }\n        //获取id的函数\n        function $(id) {\n            return document.getElementById(id);\n        }\n        //获取元素相对于屏幕左边及上边的距离，利用offsetLeft\n        function getPosition(el) {\n            var left = el.offsetLeft;\n            var top = el.offsetTop;\n            var parent = el.offsetParent;\n            while (parent != null) {\n                left += parent.offsetLeft;\n                top += parent.offsetTop;\n                parent = parent.offsetParent;\n            }\n            return {\n                \"left\": left,\n                \"top\": top\n            };\n        }\n        //up移动\n        function upMove(e) {\n            var y = e.clientY; //鼠标位置的纵坐标\n            var heightBefore = mainDiv.offsetHeight - 2; //选取框变化前的高度\n            var addHeight = getPosition(mainDiv).top - y; //增加的高度\n            mainDiv.style.height = heightBefore + addHeight + 'px'; //选取框变化后的宽度\n            mainDiv.style.top = mainDiv.offsetTop - addHeight + 'px'; //相当于变化后左上角的纵坐标，鼠标向上移纵坐标减小，下移增大\n            setChoice();\n        }\n        //right移动\n        function rightMove(e) {\n            var x = e.clientX; //鼠标位置的横坐标\n            var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度\n            //var widthBefore = mainDiv.clientWidth;\n            var addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后选取框增加的宽度\n            mainDiv.style.width = widthBefore + addWidth + 'px'; //选取框变化后的宽度\n            setChoice();\n        }\n        //down移动\n        function downMove(e) {\n            var heightBefore = mainDiv.offsetHeight - 2;\n            var addHeight = e.clientY - getPosition(mainDiv).top - mainDiv.offsetHeight;\n            mainDiv.style.height = heightBefore + addHeight + 'px';\n            setChoice();\n        }\n        //left移动\n        function leftMove(e) {\n            var widthBefore = mainDiv.offsetWidth - 2;\n            var addWidth = getPosition(mainDiv).left - e.clientX; //增加的宽度等于距离屏幕左边的距离减去鼠标位置横坐标\n            mainDiv.style.width = widthBefore + addWidth + 'px';\n            mainDiv.style.left = mainDiv.offsetLeft - addWidth + 'px'; //左边的距离（相当于左边位置横坐标）等于选取框距父级元素的距离减去增加的宽度\n            setChoice();\n        }\n        \n        \n        \n        //设置选取框图片区域明亮显示\n        function setChoice() {\n            var top = mainDiv.offsetTop;\n            var right = mainDiv.offsetLeft + mainDiv.offsetWidth;\n            var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;\n            var left = mainDiv.offsetLeft;\n            img2.style.clip = \"rect(\" + top + \"px,\" + right + \"px,\" + bottom + \"px,\" + left + \"px)\";\n        }\n        \n        \n        Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"drag\"])(mainDiv, mainDiv, function () {\n            setChoice();\n        })\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/cropBox.js?");

    /***/
  },

  /***/"./src/js/imgHandler.js":
  /*!******************************!*\
    !*** ./src/js/imgHandler.js ***!
    \******************************/
  /*! exports provided: ImgHandler */
  /***/function srcJsImgHandlerJs(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImgHandler\", function() { return ImgHandler; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\n\nclass ImgHandler {\n\n    constructor(options) {\n\n        // 默认配置参数\n        let defaults = {\n            // 源图片\n            sourceImg: '',\n\n            rotateNum: 0,\n\n            // 裁剪后图片最大值KB\n            maxSize: 500,\n            cropW: '',\n            cropH: '',\n\n            // 裁剪后的图片类型\n            mime: 'image/jpeg',\n\n            // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。\n            // 是否添加水印\n            hasMark: true,\n            // 水印字体，值同css的font\n            markFont: '16px microsoft yahei',\n            // 水印字样式，可选值：color,gradient,pattern\n            markStyle: '#fff',\n            // 水印字文本\n            markText: 'UED',\n            // 水印字x轴位置\n            markX: 0,\n            // 水印字y轴位置\n            markY: 0\n\n        };\n\n\n        options = Object.assign({}, defaults, options);\n\n        this.sourceImg = options.sourceImg;\n        this.rotateNum = options.rotateNum;\n        this.maxSize = options.maxSize;\n        this.cropW = options.cropW;\n        this.cropH = options.cropH;\n\n        this.mime = options.mime;\n\n        this.hasMark = options.hasMark;\n        this.markFont = options.markFont;\n        this.markStyle = options.markStyle;\n        this.markText = options.markText;\n        this.markX = options.markX;\n        this.markY = options.markY;\n\n\n        // 全局变量\n        this.sx = 0;\n        this.sy = 0;\n\n        this.scaleRatio = 0.5;\n        this.quality = 0.2;\n\n        this.results = [];\n\n        this.init();\n\n    }\n\n\n\n\n    init() {\n        this.results.push(this.sourceImg);\n\n        \n    }\n    _getTargetImg() {\n        let targetImg = this.results[this.results.length - 1];\n        let sourceW0 = targetImg.width;\n        let sourceH0 = targetImg.height;\n        if (targetImg.nodeName.toLowerCase() === 'img') {\n            sourceW0 = targetImg.naturalWidth;\n            sourceH0 = targetImg.naturalHeight;\n        }\n        return {\n            targetImg: targetImg,\n            sourceW0: sourceW0,\n            sourceH0: sourceH0\n        }\n    }\n    // 重置\n    reset() {\n        this.results = this.results.slice(0, 1);\n    }\n    // 回退\n    rollback() {\n        this.results.pop();\n    }\n    // 旋转\n    rotate() {\n        let targetImgObj = this._getTargetImg();\n        let targetImg = targetImgObj.targetImg;\n        let sourceW0 = targetImgObj.sourceW0;\n        let sourceH0 = targetImgObj.sourceH0;\n\n\n        let rotateDeg = this.rotateNum * 90;\n\n        let max = Math.max(sourceW0, sourceH0);\n        let tempCvs = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(max, max),\n            tempCtx = tempCvs.getContext('2d');\n\n        tempCtx.translate(max / 2, max / 2);\n        tempCtx.rotate(rotateDeg * Math.PI / 180);\n        tempCtx.translate(-max / 2, -max / 2);\n        tempCtx.drawImage(targetImg, 0, 0);\n\n\n        let w = sourceW0,\n            h = sourceH0,\n            sx = 0,\n            sy = 0;\n        if (this.rotateNum === 1) {\n            w = sourceH0;\n            h = sourceW0;\n            sx = max - w;\n            sy = 0;\n\n        } else if (this.rotateNum === 2) {\n            w = sourceW0;\n            h = sourceH0;\n            sx = max - w;\n            sy = max - h;\n        } else if (this.rotateNum === 3) {\n            w = sourceH0;\n            h = sourceW0;\n            sx = 0;\n            sy = max - h;\n        } else {\n            w = sourceW0;\n            h = sourceH0;\n            sx = 0;\n            sy = 0;\n        }\n\n        let canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(w, h),\n            context = canvas.getContext('2d');\n\n        context.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);\n\n        // this.base64Data = canvas.toDataURL(this.mime);\n\n        this.results.push(canvas);\n        return this;\n    }\n\n    // 水印\n    mark() {\n        let targetImgObj = this._getTargetImg();\n        let targetImg = targetImgObj.targetImg;\n        let sourceW0 = targetImgObj.sourceW0;\n        let sourceH0 = targetImgObj.sourceH0;\n\n        let canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(sourceW0, sourceH0);\n        let dContext = canvas.getContext('2d');\n        dContext.drawImage(targetImg, 0, 0);\n        if (this.hasMark) {\n            dContext.textAlign = \"end\";\n            dContext.font = this.markFont;\n            dContext.fillStyle = this.markStyle;\n            if (!this.markX) {\n                this.markX = canvas.width - 10;\n            }\n            if (!this.markY) {\n                this.markY = canvas.height - 10;\n            }\n            dContext.fillText(this.markText, this.markX, this.markY);\n\n        }\n\n        // this.base64Data = canvas.toDataURL(this.mime);\n        this.results.push(canvas);\n        return this;\n    }\n\n    // 裁剪\n    crop() {\n        let targetImgObj = this._getTargetImg();\n        let targetImg = targetImgObj.targetImg;\n        let sourceW0 = targetImgObj.sourceW0;\n        let sourceH0 = targetImgObj.sourceH0;\n\n        let canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(this.cropW, this.cropH);\n        let context = canvas.getContext('2d');\n        context.drawImage(targetImg, this.sx, this.sy, sourceW0, sourceH0, 0, 0, this.cropW, this.cropH);\n\n        // this.base64Data = canvas.toDataURL(this.mime);\n        this.results.push(canvas);\n        return this;\n    }\n    // 缩放\n    scale() {\n        let targetImgObj = this._getTargetImg();\n        let targetImg = targetImgObj.targetImg;\n        let sourceW0 = targetImgObj.sourceW0;\n        let sourceH0 = targetImgObj.sourceH0;\n\n        let resultW = this.scaleRatio * sourceW0;\n        let resultH = this.scaleRatio * sourceH0;\n\n        let canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(resultW, resultH);\n        let context = canvas.getContext('2d');\n        context.drawImage(targetImg, 0, 0, sourceW0, sourceH0, 0, 0, resultW, resultH);\n\n        // this.base64Data = canvas.toDataURL(this.mime);\n        this.results.push(canvas);\n        return this;\n    }\n    // 压缩\n    compress() {\n        let targetImgObj = this._getTargetImg();\n        let targetImg = targetImgObj.targetImg;\n        let sourceW0 = targetImgObj.sourceW0;\n        let sourceH0 = targetImgObj.sourceH0;\n\n        let canvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(sourceW0, sourceH0);\n        let ctx = canvas.getContext(\"2d\");\n\n        if (this.cropW && this.cropH) {\n            ctx.drawImage(targetImg, 0, 0, this.cropW, this.cropH);\n        } else {\n            ctx.drawImage(targetImg, 0, 0);\n        }\n        this.base64Data = canvas.toDataURL(this.mime, this.quality);\n\n        return this.base64Data;\n    }\n\n}\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/imgHandler.js?");

    /***/
  },

  /***/"./src/js/pipeImg.js":
  /*!***************************!*\
    !*** ./src/js/pipeImg.js ***!
    \***************************/
  /*! no exports provided */
  /***/function srcJsPipeImgJs(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n/* harmony import */ var _imgHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgHandler */ \"./src/js/imgHandler.js\");\n/* harmony import */ var _cropBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cropBox */ \"./src/js/cropBox.js\");\n\n\n\n\nclass PipeImg {\n\n    constructor(options) {\n\n        // 默认配置参数\n        let defaults = {\n            source: ['./assets/Jellyfish.jpg']\n        };\n\n\n        options = Object.assign({}, defaults, options);\n        this.source = options.source;\n\n        // 全局变量\n        this.rotateNum = 0;\n        this.scaleRatio = 1;\n\n        this.init();\n\n    }\n\n    init() {\n\n        this._renderSource();\n\n        this._bind();\n        \n        new _cropBox__WEBPACK_IMPORTED_MODULE_2__[\"CropBox\"]();\n    }\n    _renderSource() {\n\n        Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"loadImages\"])(this.source, (images) => {\n            let imgsHtml = '';\n            // 为了显示顺序与配置一致\n            images = images.reverse();\n\n            $(images).each((index, element) => {\n                let thumbnailHtml = '<a class=\"img-thumbnail ' + (index === 0 ? 'active' : '') + ' J-img-thumbnail\" href=\"javascript:void(0)\">' +\n                    '<img src=\"' + element.src + '\">' +\n                    '</a>';\n                imgsHtml += thumbnailHtml;\n\n            });\n            $('.J-imgs-thumbnail').html(imgsHtml);\n\n            this.activeImg = images[0];\n            $('.J-img-box').html(`<img class=\"J-source\" src=\"${this.activeImg.src}\">`);\n            this.imgBoxHeight = $('.J-img-box').height();\n\n            this._renderSize();\n\n        }, () => {\n            throw new Error('图片加载失败！')\n        })\n    }\n    _bind() {\n        let self = this;\n        // 切换编辑图片\n        $('.J-imgs-thumbnail').on('click', '.J-img-thumbnail', function () {\n            self._reset();\n            let $this = $(this);\n            $this.addClass('active').siblings().removeClass('active');\n\n            $('.J-source').attr('src', $this.find('img').attr('src'));\n            self.activeImg = $('.J-source:first').get(0);\n            self._renderSize();\n        })\n        // 逆时针旋转\n        $('.J-btn-rotate-left').on('click', () => {\n            this._getRotateNum(-1);\n            this._rotate();\n        })\n        // 顺时针旋转\n        $('.J-btn-rotate-right').on('click', () => {\n            this._getRotateNum(1);\n            this._rotate();\n        })\n        // 菜单切换\n        $('.J-menu-item').on('click', function () {\n            let $this = $(this);\n            let index = $this.index();\n            $this.addClass('active').siblings().removeClass('active');\n            $('.J-panel').eq(index).addClass('active').siblings().removeClass('active');\n\n        })\n        // 重置\n        $('.J-button-reset').on('click', () => {\n            this._reset();\n        })\n        // 保存\n        $('.J-button-save').on('click', () => {\n            this._save();\n        })\n\n    }\n    _rotate() {\n\n        $('.J-source').css({\n            'transform': `rotate(${this.rotateNum * 90}deg)`\n        });\n        if (this.rotateNum === 1 || this.rotateNum === 3) {\n            $('.J-source').css({\n                'width': this.imgBoxHeight,\n                'height': 'auto'\n            });\n        } else {\n            $('.J-source').css({\n                'height': this.imgBoxHeight,\n                'width': 'auto'\n            });\n        }\n    }\n    _scale() {\n        this.scaleRatio = 0.6;\n    }\n    _getRotateNum(direction) {\n        this.rotateNum += direction;\n        if (this.rotateNum > 3) {\n            this.rotateNum = 0;\n        }\n        if (this.rotateNum < 0) {\n            this.rotateNum = 3;\n        }\n    }\n    // 显示活动图片宽高\n    _renderSize() {\n        $('.J-num-width').each((index, element) => {\n            if ($(element).get(0).nodeName.toLowerCase() === 'input') {\n                $('.J-num-width').val(this.activeImg.naturalWidth);\n            } else {\n                $('.J-num-width').html(this.activeImg.naturalWidth);\n            }\n        })\n        $('.J-num-height').each((index, element) => {\n            if ($(element).get(0).nodeName.toLowerCase() === 'input') {\n                $('.J-num-height').val(this.activeImg.naturalHeight);\n            } else {\n                $('.J-num-height').html(this.activeImg.naturalHeight);\n            }\n        })\n\n\n    }\n    _reset() {\n        this.rotateNum = 0;\n        this._rotate();\n    }\n    _save() {\n        let imgHandler = new _imgHandler__WEBPACK_IMPORTED_MODULE_1__[\"ImgHandler\"]({\n            sourceImg: this.activeImg,\n            rotateNum: this.rotateNum\n        })\n        if (this.rotateNum !== 0) {\n            imgHandler.rotate();\n        }\n        imgHandler.mark();\n        // 查看结果\n        console.log(imgHandler);\n        this.resultCvs = imgHandler.results[imgHandler.results.length - 1];\n        this._getFormData();\n    }\n    _getFormData() {\n        if (this.resultCvs.nodeName.toLowerCase() !== 'canvas') {\n            return false;\n        }\n        let data = this.resultCvs.toDataURL('image/jpeg');\n        let size0 = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getBase64Size\"])(data);\n        console.log('start compress: ' + Math.ceil(size0 / 1024));\n        if (size0 > 1024 * this.maxSize) {\n            let quality = Math.floor(1024 * this.maxSize / size0 * 10) / 10;\n            data = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"compress\"])(resultCvs, quality);\n        }\n        $('#J-preview-container').find('img').attr('src', data);\n\n        let blob = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"base64Data2Blob\"])(data, this.mime);\n        console.log('end compress: ' + Math.ceil(blob.size / 1024));\n        let formData = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"blob2FormData\"])(blob);\n\n        $.ajax({\n            url: \"/saveFile\",\n            type: \"POST\",\n            data: formData,\n            processData: false, // 不处理数据\n            contentType: false // 不设置内容类型\n        });\n    }\n\n\n}\n\n\nif (typeof module !== \"undefined\" && module.exports) {\n    module.exports = PipeImg;\n} else if (typeof define === \"function\" && __webpack_require__(/*! !webpack amd options */ \"./node_modules/webpack/buildin/amd-options.js\")) {\n    define(function () {\n        return PipeImg;\n    });\n} else {\n    window.PipeImg = PipeImg;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/js/pipeImg.js?");

    /***/
  },

  /***/"./src/js/util.js":
  /*!************************!*\
    !*** ./src/js/util.js ***!
    \************************/
  /*! exports provided: drag, loadImage, loadImages, getCanvas, getBase64Size, compress, base64Data2Blob, blob2FormData, chooseFile, uploadFile, getImgPromise */
  /***/function srcJsUtilJs(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drag\", function() { return drag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImage\", function() { return loadImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImages\", function() { return loadImages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCanvas\", function() { return getCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBase64Size\", function() { return getBase64Size; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compress\", function() { return compress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"base64Data2Blob\", function() { return base64Data2Blob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blob2FormData\", function() { return blob2FormData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chooseFile\", function() { return chooseFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uploadFile\", function() { return uploadFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImgPromise\", function() { return getImgPromise; });\n//拖拽\nfunction drag(moveElement, dragBar = document, cb) {\n    if (!moveElement) return;\n\n    let draging = false,\n        x0, y0, mLeft0, mTop0, mLeft1, mTop1;\n\n    let mousedownHandler = (e) => {\n        e = e || window.event;\n        x0 = e.clientX;\n        y0 = e.clientY;\n        mLeft0 = moveElement.offsetLeft;\n        mTop0 = moveElement.offsetTop;\n\n        draging = true;\n\n    };\n    let mousemoveHandler = (e) => {\n        e = e || window.event;\n        if (draging) {\n            let x1 = e.clientX,\n                y1 = e.clientY;\n            mLeft1 = x1 - x0 + mLeft0;\n            mTop1 = y1 - y0 + mTop0;\n\n            moveElement.style.left = mLeft1;\n            moveElement.style.top = mTop1;\n\n            typeof cb === 'function' && cb(mLeft1, mTop1);\n        }\n    };\n    let mouseupHandler = (e) => {\n        draging = false;\n    }\n\n    if (window.addEventListener) {\n        dragBar.addEventListener('mousedown', mousedownHandler, false);\n        document.addEventListener('mousemove', mousemoveHandler, false);\n        document.addEventListener('mouseup', mouseupHandler, false);\n    }\n}\n// 选择器\n// function $(el) {\n//   return (typeof el === \"string\" ? document.querySelector(el) : el);\n// }\nfunction getImgPromise(src) {\n    return new Promise((resolve, reject) => {\n        let image = new Image();\n        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\n        image.setAttribute('crossorigin', 'anonymous');\n        image.src = src;\n        image.onload = () => {\n            resolve(image);\n        };\n        image.onerror = () => {\n            reject('Error: image error!');\n        };\n    });\n}\n// 加载图片\nfunction loadImage(src, success, failure) {\n    let image = new Image();\n    // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\n    image.setAttribute('crossorigin', 'anonymous');\n    image.src = src;\n    image.onload = function () {\n        typeof success === 'function' && success(image);\n    };\n    image.onerror = function () {\n        typeof failure === 'function' && failure();\n    };\n}\n\nfunction loadImages(srcList, success, failure) {\n    let images = [];\n    let index = srcList.length;\n    let _loadImage = () => {\n        if (index === 0) {\n            return false;\n        }\n        let image = new Image();\n        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\n        image.setAttribute('crossorigin', 'anonymous');\n        image.src = srcList[--index];\n        image.onload = function () {\n            images.push(image);\n            if (images.length === srcList.length) {\n                typeof success === 'function' && success(images);\n                return false;\n            }\n            _loadImage();\n        };\n        image.onerror = function () {\n            typeof failure === 'function' && failure();\n        };\n    };\n    _loadImage();\n\n}\n// 创建cavas\nfunction getCanvas(width, height) {\n    let canvas = document.createElement('canvas');\n    canvas.width = width;\n    canvas.height = height;\n    return canvas;\n}\n\n//获取base64图片大小\nfunction getBase64Size(base64Data) {\n    // 'data:image/jpeg;base64,xxxxxx...xxx='\n    let str = base64Data.replace(/^data:image\\/[\\w]*;base64,$/, '');\n    let equalIndex = str.indexOf('=');\n    if (equalIndex > 0) {\n        str = str.substring(0, equalIndex);\n    }\n    let strLength = str.length;\n    return parseInt(strLength - (strLength / 8) * 2);\n}\n// 压缩只支持image/jpeg和image/webp\nfunction compress(img, quality = 0.6, width, height, mime = 'images/jpeg') { //  Image 对象，或者是 Canvas 元素\n    let canvas = getCanvas(width, height),\n        ctx = canvas.getContext(\"2d\");\n    if (width && height) {\n        ctx.drawImage(img, 0, 0, width, height);\n    } else {\n        ctx.drawImage(img, 0, 0);\n    }\n\n    let base64 = canvas.toDataURL(mime, quality);\n\n    return base64; // 压缩后的base64串\n}\n\n\nfunction base64Data2Blob(base64Data, mime) {\n    let binStr = atob(base64Data.split(',')[1]),\n        len = binStr.length,\n        arr = new Uint8Array(len);\n    if (!mime) {\n        // mime = base64Data.split(',')[0].split(':')[1].split(';')[0];\n        mime = base64Data.substring(base64Data.indexOf('data:') + 5, base64Data.indexOf(';base64'));\n    }\n\n    for (var i = 0; i < len; i++) {\n        arr[i] = binStr.charCodeAt(i);\n    }\n\n    return new Blob([arr], {\n        type: mime\n    });\n\n}\n\nfunction blob2FormData(blob, fileName) {\n    let formData = new FormData();\n    formData.append('file', blob);\n    if (!fileName) {\n        fileName = new Date().getTime();\n    }\n    formData.append(\"fileName\", fileName);\n\n    return formData;\n}\n\n// canvas转成blob对象，type值为image/jpeg或者image/webp时，可使用encoderOptions（0-1）设置图片展示质量。\nfunction canvas2Blob(canvas, callback, type, quality) {\n    // Polyfill\n    if (!HTMLCanvasElement.prototype.toBlob) {\n        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {\n            value: function (callback, type, quality) {\n\n                var binStr = atob(this.toDataURL('image/jpeg', quality).split(',')[1]),\n                    len = binStr.length,\n                    arr = new Uint8Array(len);\n\n                for (var i = 0; i < len; i++) {\n                    arr[i] = binStr.charCodeAt(i);\n                }\n\n                callback(new Blob([arr], {\n                    type: type || 'image/png'\n                }));\n            }\n        });\n    }\n\n    canvas.toBlob(callback, type, quality);\n}\n\nfunction uploadFile(formData, url) {\n\n    var xmlHttp = new XMLHttpRequest();\n    xmlHttp.open('POST', url); //注意跨域问题\n    xmlHttp.send(formData);\n    xmlHttp.onreadystatechange = function () {\n        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {\n            console.log(xmlHttp.responseText);\n        } else {\n            console.log(xmlHttp.statusText);\n        }\n    };\n}\n// 选择文件\nfunction chooseFile(btn, cb, validFileCallback) {\n    let $btn = typeof btn === \"string\" ? document.querySelector(btn) : btn;\n    let $file = $btn.querySelector('input[type=file]');\n    if (!$file) {\n        let fileNode = document.createElement('input');\n        fileNode.setAttribute('type', 'file');\n\n        fileNode.style.cssText = 'display: none;';\n        $btn.appendChild(fileNode);\n        $file = $btn.querySelector('input[type=file]');\n    }\n\n    $file.addEventListener('change', function (e) {\n        if (this.files.length > 0) {\n\n            let oFile = this.files[0];\n\n            let validFile = true;\n            if (typeof validFileCallback === 'function' && validFileCallback(oFile) === false) {\n                validFile = false;\n            }\n\n            if (validFile) {\n                let reader = new FileReader();\n                reader.readAsDataURL(oFile);\n\n                reader.onload = function () {\n                    typeof cb === 'function' && cb(this.result);\n                }\n            } else {\n                console.log('onValidateFile function return false')\n            }\n\n        }\n    }, false);\n\n    // 阻止冒泡导致两次触发selectBtn\n    $file.addEventListener('click', (e) => {\n        e.stopPropagation();\n    })\n\n    $file.click();\n\n}\n\n\n\n//# sourceURL=webpack:///./src/js/util.js?");

    /***/
  },

  /***/0:
  /*!*********************************!*\
    !*** multi ./src/js/pipeImg.js ***!
    \*********************************/
  /*! no static exports found */
  /***/function _(module, exports, __webpack_require__) {

    eval("module.exports = __webpack_require__(/*! h:\\workspace\\03pipeImg\\src\\js\\pipeImg.js */\"./src/js/pipeImg.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/pipeImg.js?");

    /***/
  }

  /******/ });