/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */\r\nmodule.exports = __webpack_amd_options__;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, {}))\n\n//# sourceURL=webpack:///(webpack)/buildin/amd-options.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/js/pipeImg.0.4.1.js":
/*!*********************************!*\
  !*** ./src/js/pipeImg.0.4.1.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\n\nclass PipeImg {\n\n  constructor(options) {\n\n    // 默认配置参数\n    let defaults = {\n      // 选择图片按钮\n      selectBtn: '#J-select-btn',\n      // 放大按钮\n      upBtn: '#J-up-btn',\n      // 缩小按钮\n      downBtn: '#J-down-btn',\n      // 逆时针按钮\n      anticlockwiseBtn: '#J-anticlockwise-btn',\n      // 顺时针按钮\n      clockwiseBtn: '#J-clockwise-btn',\n      // 裁剪按钮\n      cropBtn: '#J-crop-btn',\n      // 下载按钮，必须为a标签\n      downloadBtn: '#J-download-btn',\n      // 工作区容器\n      workingContainer: '#J-working-container',\n      // 预览区容器\n      previewContainer: '#J-preview-container',\n      \n      // 裁剪后图片最大值\n      maxSize: 500,\n      // 放大缩小幅度\n      scaleStep: 10,\n\n      // 工作区边长\n      containerSize: 500,\n      // 裁剪区边长\n      cropW: 300,\n      cropH: 300,\n      // 裁剪后的图片类型\n      mime: 'image/jpeg',\n      // 遮挡区颜色\n      maskColor: 'rgba(0, 0, 0, 0.8)',\n\n\n      // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。\n      // 是否添加水印\n      hasMark: true,\n      // 水印图标地址\n      markIcon: null,\n      // 水印字体，值同css的font\n      markFont: '16px microsoft yahei',\n      // 水印字样式，可选值：color,gradient,pattern\n      markStyle: '#fff',\n      // 水印字文本\n      markText: 'UED',\n      // 水印字x轴位置\n      markX: 0,\n      // 水印字y轴位置\n      markY: 0,\n      sourceImgSrc: null,\n\n      // 回调事件\n      // 上传源图片回调函数\n      onValidateFile: (oFile) => {\n        // oFile的属性值示例：name:\"brandPublicty1.jpg\" size:134476 type:\"image/jpeg\"\n      },\n      // 裁剪完成回调函数\n      onCropped: (destImgData) => {}\n\n    };\n\n\n    this.options = Object.assign(defaults, options);\n\n    this.$selectBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.selectBtn);\n    this.$upBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.upBtn);\n    this.$downBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.downBtn);\n    this.$anticlockwiseBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.anticlockwiseBtn);\n    this.$clockwiseBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.clockwiseBtn);\n    this.$cropBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.cropBtn);\n    this.$downloadBtn = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.downloadBtn);\n    this.$workingContainer = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.workingContainer);\n    this.$previewContainer = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(this.options.previewContainer);\n\n    this.maxSize = this.options.maxSize;\n    this.scaleStep = this.options.scaleStep;\n    this.containerSize = this.options.containerSize;\n    this.cropW = this.options.cropW <= this.containerSize ? this.options.cropW : this.containerSize;\n    this.cropH = this.options.cropH <= this.containerSize ? this.options.cropH : this.containerSize;\n    this.mime = this.options.mime;\n\n\n    this.maskColor = this.options.maskColor;\n\n    this.hasMark = this.options.hasMark;\n    this.markIcon = this.options.markIcon;\n    this.markFont = this.options.markFont;\n    this.markStyle = this.options.markStyle;\n    this.markText = this.options.markText;\n    this.markX = this.options.markX;\n    this.markY = this.options.markY;\n    this.sourceImgSrc = this.options.sourceImgSrc;\n\n    this.onValidateFile = this.options.onValidateFile;\n    this.onCropped = this.options.onCropped;\n\n\n    // 全局变量\n    this.rotateCount = 0;\n\n\n    this.init();\n\n  }\n\n  getRotateNum(direction) {\n    let rotateNum = 0;\n    this.rotateCount += direction;\n    if (this.rotateCount > 3 || this.rotateCount < -3) {\n      this.rotateCount = 0;\n    }\n    if (this.rotateCount < 0) {\n      rotateNum = 4 + this.rotateCount;\n    } else {\n      rotateNum = this.rotateCount;\n    }\n    return rotateNum;\n  }\n\n  // img同drawImage第一个参数;rotateNum: 0,1,2,3，分别对应旋转的四个角度方向;imgType: 保存图片类型；cb回调函数，传参destImgData,w,h；\n  rotate(src, rotateNum, imgType, cb) {\n    Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"loadImage\"])(src, (img) => {\n      let rotateDeg = rotateNum * 90;\n      let sourceW0 = img.naturalWidth;\n      let sourceH0 = img.naturalHeight;\n\n      let max = Math.max(sourceW0, sourceH0);\n      let tempCvs = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(max, max),\n        tempCtx = tempCvs.getContext('2d');\n\n      tempCtx.translate(max / 2, max / 2);\n      tempCtx.rotate(rotateDeg * Math.PI / 180);\n      tempCtx.translate(-max / 2, -max / 2);\n      tempCtx.drawImage(img, 0, 0);\n\n\n      let w = sourceW0,\n        h = sourceH0,\n        sx = 0,\n        sy = 0;\n      if (rotateNum === 1) {\n        w = sourceH0;\n        h = sourceW0;\n        sx = max - w;\n        sy = 0;\n\n      } else if (rotateNum === 2) {\n        w = sourceW0;\n        h = sourceH0;\n        sx = max - w;\n        sy = max - h;\n      } else if (rotateNum === 3) {\n        w = sourceH0;\n        h = sourceW0;\n        sx = 0;\n        sy = max - h;\n      } else {\n        w = sourceW0;\n        h = sourceH0;\n        sx = 0;\n        sy = 0;\n      }\n\n      let cvs = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(w, h),\n        ctx = cvs.getContext('2d');\n\n      ctx.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);\n\n      let data = cvs.toDataURL(imgType);\n      typeof cb === 'function' && cb(data, w, h);\n\n      // previewContainer.appendChild(cvs);\n    })\n\n  }\n  addMark(targetImg, cb) {\n    if (typeof cb !== 'function') return false;\n\n    if (targetImg.nodeName.toLowerCase() !== 'canvas') {\n      targetImg = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(targetImg.width, targetImg.height);\n    }\n    let dContext = targetImg.getContext('2d');\n    if (this.hasMark) {\n      if (this.markIcon) {\n        Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"loadImage\"])(this.markIcon, (img) => {\n          if (!this.markX) {\n            this.markX = targetImg.width - img.naturalWidth;\n          }\n          if (!this.markY) {\n            this.markY = targetImg.height - img.naturalHeight;\n          }\n          dContext.drawImage(img, this.markX, this.markY);\n          cb(targetImg);\n        })\n\n      } else {\n        dContext.textAlign = \"end\";\n        dContext.font = this.markFont;\n        dContext.fillStyle = this.markStyle;\n        if (!this.markX) {\n          this.markX = targetImg.width - 10;\n        }\n        if (!this.markY) {\n          this.markY = targetImg.height - 10;\n        }\n        dContext.fillText(this.markText, this.markX, this.markY);\n        cb(targetImg);\n      }\n    } else {\n      cb(targetImg);\n    }\n\n  }\n  preview(data) {\n    // 裁剪后预览\n    this.$previewContainer && (this.$previewContainer.innerHTML = `<img src=\"${data}\">`);\n  }\n  download(data) {\n    // 提供下载，Safari不支持\n    let isSupportDownload = 'download' in document.createElement('a');\n    if (isSupportDownload && this.$downloadBtn) {\n      this.$downloadBtn.download = new Date().valueOf() + '_dest.' + this.mime.substr(this.mime.indexOf('image/') + 6);\n      this.$downloadBtn.href = data;\n    }\n  }\n  // 裁剪\n  crop(img, sx, sy, sWidth, sHeight, x, y, width, height) {\n    if (!img) return;\n\n    let destCanvas = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(width, height),\n      dContext = destCanvas.getContext('2d');\n    dContext.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);\n\n    this.addMark(destCanvas, (resultCvs) => {\n\n      let data = resultCvs.toDataURL('image/jpeg');\n      let size0 = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"getBase64Size\"])(data);\n      if (size0 > 1024 * this.maxSize) {\n        let quality = Math.floor(1024 * this.maxSize / size0 * 10) / 10;\n        // data = resultCvs.toDataURL('image/jpeg', quality);\n        data = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"compress\"])(resultCvs, quality);\n      }\n\n      let blob = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"base64Data2Blob\"])(data, this.mime);\n      console.log('end compress: ' + Math.ceil(blob.size / 1024));\n      let formData = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"blob2FormData\"])(blob);\n      console.log('formData: ' + formData);\n\n      // 提供预览\n      this.preview(data);\n      // 提供下载\n      this.download(data);\n\n      // TODO 直接把base64格式图片数据传到后台\n      // TODO 作为文件形式用FormData提交到后台 \n      typeof this.onCropped === 'function' && this.onCropped(data);\n    });\n\n  }\n\n\n  init() {\n    let sourceImgEle, sourceW0, sourceH0, sourceW1, sourceH1, cacheSource,\n      borderWidth = (this.containerSize - this.cropW) / 2,\n      borderHeight = (this.containerSize - this.cropH) / 2;\n\n    let workingAreaHtml = '<div class=\"working-area\"><img><div class=\"mask\"></div></div>';\n    this.$workingContainer.innerHTML = workingAreaHtml;\n\n    let workingAreaEle = this.$workingContainer.querySelector('.working-area');\n    workingAreaEle.style.cssText = `position: relative;overflow: hidden;width: ${this.containerSize}px;height: ${this.containerSize}px;`;\n\n\n    sourceImgEle = this.$workingContainer.querySelector('img');\n    sourceImgEle.style.position = 'absolute';\n\n    let maskEle = this.$workingContainer.querySelector('.mask');\n    maskEle.style.cssText = `position: absolute;width: ${this.cropW}px;height: ${this.cropH}px;border-left: ${borderWidth}px solid ${this.maskColor};border-right: ${borderWidth}px solid ${this.maskColor};border-top: ${borderHeight}px solid ${this.maskColor};border-bottom: ${borderHeight}px solid ${this.maskColor};`;\n\n\n\n    Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"drag\"])(sourceImgEle, this.$workingContainer);\n\n    // 选择的源图片加载完初始化相关参数\n    let loadHandler = () => {\n      sourceW0 = sourceImgEle.naturalWidth;\n      sourceH0 = sourceImgEle.naturalHeight;\n      let sourceRatio = sourceW0 / sourceH0;\n\n      let top = 0,\n        left = 0;\n\n      if (sourceRatio > 1) { //宽大于高\n\n        sourceW1 = this.containerSize;\n        sourceH1 = sourceW1 / sourceRatio;\n\n        top = (this.containerSize - sourceH1) / 2;\n        left = 0;\n      } else {\n\n        sourceH1 = this.containerSize;\n        sourceW1 = sourceH1 * sourceRatio;\n\n        left = (this.containerSize - sourceW1) / 2;\n        top = 0;\n      }\n\n      sourceImgEle.style.cssText = `position: absolute;width: ${sourceW1}px;height: ${sourceH1}px;top: ${top}px;left: ${left}px;`;\n\n    }\n\n    sourceImgEle.addEventListener('load', loadHandler, false);\n\n\n    if (this.sourceImgSrc) {\n      sourceImgEle.src = this.sourceImgSrc;\n      sourceImgEle.style.width = 'auto';\n      sourceImgEle.style.height = 'auto';\n\n      cacheSource = this.sourceImgSrc;\n    }\n    // 按钮事件绑定\n    this.$selectBtn.addEventListener('click', (e) => {\n      Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"chooseFile\"])(this.$selectBtn, function (data) {\n        sourceImgEle.src = data;\n        sourceImgEle.style.width = 'auto';\n        sourceImgEle.style.height = 'auto';\n\n        cacheSource = data;\n\n      }, this.onValidateFile);\n\n    }, false);\n\n\n    // 放大，缩小，约定up值为1或者-1，表示放大，缩小\n    let scaleImg = (scaleUp) => {\n      let sourceRatio = sourceW0 / sourceH0;\n      sourceH1 += this.scaleStep * scaleUp;\n      sourceW1 = sourceH1 * sourceRatio;\n\n      sourceImgEle.style.width = sourceW1 + 'px';\n      sourceImgEle.style.height = sourceH1 + 'px';\n    };\n\n    this.$downBtn.addEventListener('click', () => {\n      scaleImg(-1);\n    }, false)\n    this.$upBtn.addEventListener('click', () => {\n      scaleImg(1);\n    }, false)\n\n\n    this.$cropBtn.addEventListener('click', () => {\n\n      // 绘制要用图片的自然尺寸\n      let scaleRatio = sourceH0 / sourceH1;\n      let sy = (borderHeight - sourceImgEle.offsetTop) * scaleRatio,\n        sx = (borderWidth - sourceImgEle.offsetLeft) * scaleRatio,\n        sWidth = this.cropW * scaleRatio,\n        sHeight = this.cropH * scaleRatio;\n\n      this.crop(sourceImgEle, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);\n\n\n    }, false);\n\n\n\n    this.$clockwiseBtn.addEventListener('click', () => {\n      let rotateNum = this.getRotateNum(1);\n      // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;\n      this.rotate(cacheSource, rotateNum, this.mime, (data, w, h) => {\n        sourceImgEle.src = data;\n      })\n    }, false);\n    this.$anticlockwiseBtn.addEventListener('click', () => {\n      let rotateNum = this.getRotateNum(-1);\n      // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;\n      this.rotate(cacheSource, rotateNum, this.mime, (data, w, h) => {\n        sourceImgEle.src = data;\n      })\n    }, false);\n\n  }\n\n}\n\n\nif (typeof module !== \"undefined\" && module.exports) { \n  module.exports = PipeImg; \n} else if (typeof define === \"function\" && __webpack_require__(/*! !webpack amd options */ \"./node_modules/webpack/buildin/amd-options.js\")) { \n  define(function(){return PipeImg;}); \n} else { \n  window.PipeImg = PipeImg;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/js/pipeImg.0.4.1.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: drag, loadImage, loadImages, getCanvas, getBase64Size, compress, base64Data2Blob, blob2FormData, chooseFile, uploadFile, getImgPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drag\", function() { return drag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImage\", function() { return loadImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImages\", function() { return loadImages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCanvas\", function() { return getCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBase64Size\", function() { return getBase64Size; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compress\", function() { return compress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"base64Data2Blob\", function() { return base64Data2Blob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blob2FormData\", function() { return blob2FormData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chooseFile\", function() { return chooseFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uploadFile\", function() { return uploadFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImgPromise\", function() { return getImgPromise; });\n//拖拽\nfunction drag(moveElement, dragBar = document, cb) {\n    if (!moveElement) return;\n\n    let draging = false,\n        x0, y0, mLeft0, mTop0, mLeft1, mTop1;\n\n    let mousedownHandler = (e) => {\n        e = e || window.event;\n        x0 = e.clientX;\n        y0 = e.clientY;\n        mLeft0 = moveElement.offsetLeft;\n        mTop0 = moveElement.offsetTop;\n\n        draging = true;\n\n    };\n    let mousemoveHandler = (e) => {\n        e = e || window.event;\n        if (draging) {\n            let x1 = e.clientX,\n                y1 = e.clientY;\n            mLeft1 = x1 - x0 + mLeft0;\n            mTop1 = y1 - y0 + mTop0;\n\n            moveElement.style.left = mLeft1;\n            moveElement.style.top = mTop1;\n\n            typeof cb === 'function' && cb(mLeft1, mTop1);\n        }\n    };\n    let mouseupHandler = (e) => {\n        draging = false;\n    }\n\n    if (window.addEventListener) {\n        dragBar.addEventListener('mousedown', mousedownHandler, false);\n        document.addEventListener('mousemove', mousemoveHandler, false);\n        document.addEventListener('mouseup', mouseupHandler, false);\n    }\n}\n// 选择器\n// function $(el) {\n//   return (typeof el === \"string\" ? document.querySelector(el) : el);\n// }\nfunction getImgPromise(src) {\n    return new Promise((resolve, reject) => {\n        let image = new Image();\n        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\n        image.setAttribute('crossorigin', 'anonymous');\n        image.src = src;\n        image.onload = () => {\n            resolve(image);\n        };\n        image.onerror = () => {\n            reject('Error: image error!');\n        };\n    });\n}\n// 加载图片\nfunction loadImage(src, success, failure) {\n    let image = new Image();\n    // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\n    image.setAttribute('crossorigin', 'anonymous');\n    image.src = src;\n    image.onload = function () {\n        typeof success === 'function' && success(image);\n    };\n    image.onerror = function () {\n        typeof failure === 'function' && failure();\n    };\n}\n\nfunction loadImages(srcList, success, failure) {\n    let images = [];\n    let index = srcList.length;\n    let _loadImage = () => {\n        if (index === 0) {\n            return false;\n        }\n        let image = new Image();\n        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\n        image.setAttribute('crossorigin', 'anonymous');\n        image.src = srcList[--index];\n        image.onload = function () {\n            images.push(image);\n            if (images.length === srcList.length) {\n                typeof success === 'function' && success(images);\n                return false;\n            }\n            _loadImage();\n        };\n        image.onerror = function () {\n            typeof failure === 'function' && failure();\n        };\n    };\n    _loadImage();\n\n}\n// 创建cavas\nfunction getCanvas(width, height) {\n    let canvas = document.createElement('canvas');\n    canvas.width = width;\n    canvas.height = height;\n    return canvas;\n}\n\n//获取base64图片大小\nfunction getBase64Size(base64Data) {\n    // 'data:image/jpeg;base64,xxxxxx...xxx='\n    let str = base64Data.replace(/^data:image\\/[\\w]*;base64,$/, '');\n    let equalIndex = str.indexOf('=');\n    if (equalIndex > 0) {\n        str = str.substring(0, equalIndex);\n    }\n    let strLength = str.length;\n    return parseInt(strLength - (strLength / 8) * 2);\n}\n// 压缩只支持image/jpeg和image/webp\nfunction compress(img, quality = 0.6, width, height, mime = 'images/jpeg') { //  Image 对象，或者是 Canvas 元素\n    let canvas = getCanvas(width, height),\n        ctx = canvas.getContext(\"2d\");\n    if (width && height) {\n        ctx.drawImage(img, 0, 0, width, height);\n    } else {\n        ctx.drawImage(img, 0, 0);\n    }\n\n    let base64 = canvas.toDataURL(mime, quality);\n\n    return base64; // 压缩后的base64串\n}\n\n\nfunction base64Data2Blob(base64Data, mime) {\n    let binStr = atob(base64Data.split(',')[1]),\n        len = binStr.length,\n        arr = new Uint8Array(len);\n    if (!mime) {\n        // mime = base64Data.split(',')[0].split(':')[1].split(';')[0];\n        mime = base64Data.substring(base64Data.indexOf('data:') + 5, base64Data.indexOf(';base64'));\n    }\n\n    for (var i = 0; i < len; i++) {\n        arr[i] = binStr.charCodeAt(i);\n    }\n\n    return new Blob([arr], {\n        type: mime\n    });\n\n}\n\nfunction blob2FormData(blob, fileName) {\n    let formData = new FormData();\n    formData.append('file', blob);\n    if (!fileName) {\n        fileName = new Date().getTime();\n    }\n    formData.append(\"fileName\", fileName);\n\n    return formData;\n}\n\n// canvas转成blob对象，type值为image/jpeg或者image/webp时，可使用encoderOptions（0-1）设置图片展示质量。\nfunction canvas2Blob(canvas, callback, type, quality) {\n    // Polyfill\n    if (!HTMLCanvasElement.prototype.toBlob) {\n        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {\n            value: function (callback, type, quality) {\n\n                var binStr = atob(this.toDataURL('image/jpeg', quality).split(',')[1]),\n                    len = binStr.length,\n                    arr = new Uint8Array(len);\n\n                for (var i = 0; i < len; i++) {\n                    arr[i] = binStr.charCodeAt(i);\n                }\n\n                callback(new Blob([arr], {\n                    type: type || 'image/png'\n                }));\n            }\n        });\n    }\n\n    canvas.toBlob(callback, type, quality);\n}\n\nfunction uploadFile(formData, url) {\n\n    var xmlHttp = new XMLHttpRequest();\n    xmlHttp.open('POST', url); //注意跨域问题\n    xmlHttp.send(formData);\n    xmlHttp.onreadystatechange = function () {\n        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {\n            console.log(xmlHttp.responseText);\n        } else {\n            console.log(xmlHttp.statusText);\n        }\n    };\n}\n// 选择文件\nfunction chooseFile(btn, cb, validFileCallback) {\n    let $btn = typeof btn === \"string\" ? document.querySelector(btn) : btn;\n    let $file = $btn.querySelector('input[type=file]');\n    if (!$file) {\n        let fileNode = document.createElement('input');\n        fileNode.setAttribute('type', 'file');\n\n        fileNode.style.cssText = 'display: none;';\n        $btn.appendChild(fileNode);\n        $file = $btn.querySelector('input[type=file]');\n    }\n\n    $file.addEventListener('change', function (e) {\n        if (this.files.length > 0) {\n\n            let oFile = this.files[0];\n\n            let validFile = true;\n            if (typeof validFileCallback === 'function' && validFileCallback(oFile) === false) {\n                validFile = false;\n            }\n\n            if (validFile) {\n                let reader = new FileReader();\n                reader.readAsDataURL(oFile);\n\n                reader.onload = function () {\n                    typeof cb === 'function' && cb(this.result);\n                }\n            } else {\n                console.log('onValidateFile function return false')\n            }\n\n        }\n    }, false);\n\n    // 阻止冒泡导致两次触发selectBtn\n    $file.addEventListener('click', (e) => {\n        e.stopPropagation();\n    })\n\n    $file.click();\n\n}\n\n\n\n//# sourceURL=webpack:///./src/js/util.js?");

/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./src/js/pipeImg.0.4.1.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! h:\\workspace\\03pipeImg\\src\\js\\pipeImg.0.4.1.js */\"./src/js/pipeImg.0.4.1.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/pipeImg.0.4.1.js?");

/***/ })

/******/ });