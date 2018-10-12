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
  /******/return __webpack_require__(__webpack_require__.s = "./src/es6/pipeImg.js");
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

  /***/"./src/es6/pipeImg.js":
  /*!****************************!*\
    !*** ./src/es6/pipeImg.js ***!
    \****************************/
  /*! no exports provided */
  /***/function srcEs6PipeImgJs(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/util */ \"./src/es6/util/util.js\");\n\r\n\r\nclass PipeImg {\r\n\r\n  constructor(options) {\r\n\r\n    // 默认配置参数\r\n    let defaults = {\r\n      // 源图片，可以使地址字符串，也可以使Image对象，也可以是img dom\r\n      source: '',\r\n\r\n      // 裁剪后图片最大值KB\r\n      maxSize: 500,\r\n\r\n      // 裁剪后的图片类型\r\n      mime: 'image/jpeg',\r\n\r\n\r\n      // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。\r\n      // 是否添加水印\r\n      hasMark: true,\r\n      // 水印字体，值同css的font\r\n      markFont: '16px microsoft yahei',\r\n      // 水印字样式，可选值：color,gradient,pattern\r\n      markStyle: '#fff',\r\n      // 水印字文本\r\n      markText: 'UED',\r\n      // 水印字x轴位置\r\n      markX: 0,\r\n      // 水印字y轴位置\r\n      markY: 0,\r\n\r\n      onSuccess: (pipeImg) => {},\r\n      onFailure: (pipeImg) => {}\r\n\r\n    };\r\n\r\n\r\n    this.options = Object.assign(defaults, options);\r\n\r\n    this.source = this.options.source;\r\n\r\n    this.maxSize = this.options.maxSize;\r\n\r\n    this.mime = this.options.mime;\r\n\r\n    this.hasMark = this.options.hasMark;\r\n    this.markFont = this.options.markFont;\r\n    this.markStyle = this.options.markStyle;\r\n    this.markText = this.options.markText;\r\n    this.markX = this.options.markX;\r\n    this.markY = this.options.markY;\r\n\r\n    this.onSuccess = this.options.onSuccess;\r\n    this.onFailure = this.options.onFailure;\r\n\r\n\r\n    // 全局变量\r\n    this.rotateCount = 0;\r\n    this.rotateNum = 1;\r\n    this.sx = 0;\r\n    this.sy = 0;\r\n    this.sWidth = 600;\r\n    this.sHeight = 600;\r\n    this.scaleRatio = 0.5;\r\n    this.quality = 0.2;\r\n\r\n    this.results = [];\r\n\r\n    this.init();\r\n\r\n  }\r\n\r\n\r\n\r\n\r\n  init() {\r\n    if (typeof this.source === 'string') {\r\n      this.loaded = false;\r\n      Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"loadImage\"])(this.source, (img) => {\r\n        this.sourceImg = img;\r\n        this.results.push(this.sourceImg);\r\n        this.onSuccess(this);\r\n      }, this.onFailure)\r\n    } else {\r\n      this.sourceImg = this.source;\r\n      this.results.push(this.sourceImg);\r\n      this.onSuccess(this);\r\n    }\r\n\r\n  }\r\n\r\n  rollback() {\r\n    this.results.pop();\r\n  }\r\n  // 旋转\r\n  rotate() {\r\n    this.sourceImg = this.results[this.results.length - 1];\r\n\r\n    let rotateDeg = this.rotateNum * 90;\r\n    let sourceW0 = this.sourceImg.width;\r\n    let sourceH0 = this.sourceImg.height;\r\n\r\n    let max = Math.max(sourceW0, sourceH0);\r\n    let tempCvs = Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(max, max),\r\n      tempCtx = tempCvs.getContext('2d');\r\n\r\n    tempCtx.translate(max / 2, max / 2);\r\n    tempCtx.rotate(rotateDeg * Math.PI / 180);\r\n    tempCtx.translate(-max / 2, -max / 2);\r\n    tempCtx.drawImage(this.sourceImg, 0, 0);\r\n\r\n\r\n    let w = sourceW0,\r\n      h = sourceH0,\r\n      sx = 0,\r\n      sy = 0;\r\n    if (this.rotateNum === 1) {\r\n      w = sourceH0;\r\n      h = sourceW0;\r\n      sx = max - w;\r\n      sy = 0;\r\n\r\n    } else if (this.rotateNum === 2) {\r\n      w = sourceW0;\r\n      h = sourceH0;\r\n      sx = max - w;\r\n      sy = max - h;\r\n    } else if (this.rotateNum === 3) {\r\n      w = sourceH0;\r\n      h = sourceW0;\r\n      sx = 0;\r\n      sy = max - h;\r\n    } else {\r\n      w = sourceW0;\r\n      h = sourceH0;\r\n      sx = 0;\r\n      sy = 0;\r\n    }\r\n\r\n    let canvas = Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(w, h),\r\n      context = canvas.getContext('2d');\r\n\r\n    context.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);\r\n\r\n    this.base64Data = canvas.toDataURL(this.mime);\r\n\r\n    this.results.push(canvas);\r\n    return this;\r\n  }\r\n\r\n  // 水印\r\n  mark() {\r\n    this.sourceImg = this.results[this.results.length - 1];\r\n\r\n    let targetImg = this.sourceImg;\r\n\r\n    if (targetImg.nodeName.toLowerCase() !== 'canvas') {\r\n      targetImg = Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(targetImg.width, targetImg.height);\r\n    }\r\n    let dContext = targetImg.getContext('2d');\r\n    if (this.hasMark) {\r\n      dContext.textAlign = \"end\";\r\n      dContext.font = this.markFont;\r\n      dContext.fillStyle = this.markStyle;\r\n      if (!this.markX) {\r\n        this.markX = targetImg.width - 10;\r\n      }\r\n      if (!this.markY) {\r\n        this.markY = targetImg.height - 10;\r\n      }\r\n      dContext.fillText(this.markText, this.markX, this.markY);\r\n\r\n    }\r\n\r\n    this.base64Data = targetImg.toDataURL(this.mime);\r\n    this.results.push(targetImg);\r\n    return this;\r\n  }\r\n\r\n  // 裁剪\r\n  crop() {\r\n    this.sourceImg = this.results[this.results.length - 1];\r\n\r\n    let canvas = Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(this.cropW, this.cropH);\r\n    let context = canvas.getContext('2d');\r\n    context.drawImage(this.sourceImg, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.cropW, this.cropH);\r\n\r\n    this.base64Data = canvas.toDataURL(this.mime);\r\n    this.results.push(canvas);\r\n    return this;\r\n  }\r\n  // 缩放\r\n  scale() {\r\n    this.sourceImg = this.results[this.results.length - 1];\r\n\r\n    let sourceW0 = this.sourceImg.width;\r\n    let sourceH0 = this.sourceImg.height;\r\n\r\n    let resultW = this.scaleRatio * sourceW0;\r\n    let resultH = this.scaleRatio * sourceH0;\r\n\r\n    let canvas = Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(resultW, resultH);\r\n    let context = canvas.getContext('2d');\r\n    context.drawImage(this.sourceImg, 0, 0, sourceW0, sourceH0, 0, 0, resultW, resultH);\r\n\r\n    this.base64Data = canvas.toDataURL(this.mime);\r\n    this.results.push(canvas);\r\n    return this;\r\n  }\r\n\r\n  compress() {\r\n    this.sourceImg = this.results[this.results.length - 1];\r\n\r\n    let sourceW0 = this.sourceImg.width;\r\n    let sourceH0 = this.sourceImg.height;\r\n\r\n    let canvas = Object(_util_util__WEBPACK_IMPORTED_MODULE_0__[\"getCanvas\"])(sourceW0, sourceH0);\r\n    let ctx = canvas.getContext(\"2d\");\r\n\r\n    if (this.cropW && this.cropH) {\r\n      ctx.drawImage(this.sourceImg, 0, 0, this.cropW, this.cropH);\r\n    } else {\r\n      ctx.drawImage(this.sourceImg, 0, 0);\r\n    }\r\n    this.base64Data = canvas.toDataURL(this.mime, this.quality);\r\n\r\n    // loadImage(this.base64Data, (img) => {\r\n    //   this.results.push(img);\r\n    // })\r\n  }\r\n\r\n}\r\n\r\n\r\nif (typeof module !== \"undefined\" && module.exports) {\r\n  module.exports = PipeImg;\r\n} else if (typeof define === \"function\" && __webpack_require__(/*! !webpack amd options */ \"./node_modules/webpack/buildin/amd-options.js\")) {\r\n  define(function () {\r\n    return PipeImg;\r\n  });\r\n} else {\r\n  window.PipeImg = PipeImg;\r\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/es6/pipeImg.js?");

    /***/
  },

  /***/"./src/es6/util/util.js":
  /*!******************************!*\
    !*** ./src/es6/util/util.js ***!
    \******************************/
  /*! exports provided: drag, $, loadImage, getCanvas, getBase64Size, compress, base64Data2Blob, blob2FormData, chooseFile, uploadFile, getImgPromise */
  /***/function srcEs6UtilUtilJs(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drag\", function() { return drag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$\", function() { return $; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImage\", function() { return loadImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCanvas\", function() { return getCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBase64Size\", function() { return getBase64Size; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compress\", function() { return compress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"base64Data2Blob\", function() { return base64Data2Blob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blob2FormData\", function() { return blob2FormData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chooseFile\", function() { return chooseFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uploadFile\", function() { return uploadFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImgPromise\", function() { return getImgPromise; });\n//拖拽\r\nfunction drag(moveElement, dragBar = document, cb) {\r\n  if (!moveElement) return;\r\n\r\n  let draging = false,\r\n    x0, y0, mLeft0, mTop0, mLeft1, mTop1;\r\n\r\n  let mousedownHandler = (e) => {\r\n    e = e || window.event;\r\n    x0 = e.clientX;\r\n    y0 = e.clientY;\r\n    let mRect = moveElement.getBoundingClientRect();\r\n    mLeft0 = mRect.left;\r\n    mTop0 = mRect.top;\r\n\r\n    draging = true;\r\n\r\n  };\r\n  let mousemoveHandler = (e) => {\r\n    e = e || window.event;\r\n    if (draging) {\r\n      let x1 = e.clientX,\r\n        y1 = e.clientY;\r\n      mLeft1 = x1 - x0 + mLeft0;\r\n      mTop1 = y1 - y0 + mTop0;\r\n\r\n      moveElement.style.left = mLeft1;\r\n      moveElement.style.top = mTop1;\r\n\r\n      typeof cb === 'function' && cb(mLeft1, mTop1);\r\n    }\r\n  };\r\n  let mouseupHandler = (e) => {\r\n    draging = false;\r\n  }\r\n\r\n  if (window.addEventListener) {\r\n    dragBar.addEventListener('mousedown', mousedownHandler, false);\r\n    document.addEventListener('mousemove', mousemoveHandler, false);\r\n    document.addEventListener('mouseup', mouseupHandler, false);\r\n  }\r\n}\r\n// 选择器\r\nfunction $(el) {\r\n  return (typeof el === \"string\" ? document.querySelector(el) : el);\r\n}\r\nfunction getImgPromise(src) {\r\n  return new Promise((resolve, reject) => {\r\n    let image = new Image();\r\n    // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\r\n    image.setAttribute('crossorigin', 'anonymous');\r\n    image.src = src;\r\n    image.onload = () => {\r\n      resolve(image);\r\n    };\r\n    image.onerror = () => {\r\n      reject('Error: image error!');\r\n    };\r\n  });\r\n}\r\n// 加载图片\r\nfunction loadImage(src, success, failure) {\r\n  let image = new Image();\r\n  // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）\r\n  image.setAttribute('crossorigin', 'anonymous');\r\n  image.src = src;\r\n  image.onload = function () {\r\n    typeof success === 'function' && success(image);\r\n  };\r\n  image.onerror = function () {\r\n    typeof failure === 'function' && failure();\r\n  };\r\n}\r\n// 创建cavas\r\nfunction getCanvas(width, height) {\r\n  let canvas = document.createElement('canvas');\r\n  canvas.width = width;\r\n  canvas.height = height;\r\n  return canvas;\r\n}\r\n\r\n//获取base64图片大小\r\nfunction getBase64Size(base64Data) {\r\n  // 'data:image/jpeg;base64,xxxxxx...xxx='\r\n  let str = base64Data.replace(/^data:image\\/[\\w]*;base64,$/, '');\r\n  let equalIndex = str.indexOf('=');\r\n  if (equalIndex > 0) {\r\n    str = str.substring(0, equalIndex);\r\n  }\r\n  let strLength = str.length;\r\n  return parseInt(strLength - (strLength / 8) * 2);\r\n}\r\n// 压缩只支持image/jpeg和image/webp\r\nfunction compress(img, quality = 0.6, width, height, mime = 'images/jpeg') { //  Image 对象，或者是 Canvas 元素\r\n  let canvas = getCanvas(width, height),\r\n      ctx = canvas.getContext(\"2d\");\r\n  if (width && height) {\r\n    ctx.drawImage(img, 0, 0, width, height);\r\n  }else{\r\n    ctx.drawImage(img, 0, 0);\r\n  }\r\n\r\n  let base64 = canvas.toDataURL(mime, quality);\r\n\r\n  return base64; // 压缩后的base64串\r\n}\r\n\r\n\r\nfunction base64Data2Blob(base64Data, mime) {\r\n  let binStr = atob(base64Data.split(',')[1]),\r\n    len = binStr.length,\r\n    arr = new Uint8Array(len);\r\n  if (!mime) {\r\n    // mime = base64Data.split(',')[0].split(':')[1].split(';')[0];\r\n    mime = base64Data.substring(base64Data.indexOf('data:') + 5, base64Data.indexOf(';base64'));\r\n  }\r\n\r\n  for (var i = 0; i < len; i++) {\r\n    arr[i] = binStr.charCodeAt(i);\r\n  }\r\n\r\n  return new Blob([arr], {\r\n    type: mime\r\n  });\r\n\r\n}\r\n\r\nfunction blob2FormData(blob, fileName) {\r\n  let formData = new FormData();\r\n  formData.append('file', blob);\r\n  if (!fileName) {\r\n    fileName = new Date().getTime();\r\n  }\r\n  formData.append(\"fileName\", fileName);\r\n\r\n  return formData;\r\n}\r\n\r\n// canvas转成blob对象，type值为image/jpeg或者image/webp时，可使用encoderOptions（0-1）设置图片展示质量。\r\nfunction canvas2Blob(canvas, callback, type, quality) {\r\n  // Polyfill\r\n  if (!HTMLCanvasElement.prototype.toBlob) {\r\n    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {\r\n      value: function (callback, type, quality) {\r\n\r\n        var binStr = atob(this.toDataURL('image/jpeg', quality).split(',')[1]),\r\n          len = binStr.length,\r\n          arr = new Uint8Array(len);\r\n\r\n        for (var i = 0; i < len; i++) {\r\n          arr[i] = binStr.charCodeAt(i);\r\n        }\r\n\r\n        callback(new Blob([arr], {\r\n          type: type || 'image/png'\r\n        }));\r\n      }\r\n    });\r\n  }\r\n\r\n  canvas.toBlob(callback, type, quality);\r\n}\r\nfunction uploadFile(formData, url) {\r\n\r\n  var xmlHttp = new XMLHttpRequest();\r\n  xmlHttp.open('POST', url); //注意跨域问题\r\n  xmlHttp.send(formData);\r\n  xmlHttp.onreadystatechange = function () {\r\n    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {\r\n      console.log(xmlHttp.responseText);\r\n    } else {\r\n      console.log(xmlHttp.statusText);\r\n    }\r\n  };\r\n}\r\n// 选择文件\r\nfunction chooseFile(btn, cb, validFileCallback) {\r\n  let $btn = typeof btn === \"string\" ? document.querySelector(btn) : btn;\r\n  let $file = $btn.querySelector('input[type=file]');\r\n  if (!$file) {\r\n    let fileNode = document.createElement('input');\r\n    fileNode.setAttribute('type', 'file');\r\n\r\n    fileNode.style.cssText = 'display: none;';\r\n    $btn.appendChild(fileNode);\r\n    $file = $btn.querySelector('input[type=file]');\r\n  }\r\n\r\n  $file.addEventListener('change', function (e) {\r\n    if (this.files.length > 0) {\r\n\r\n      let oFile = this.files[0];\r\n\r\n      let validFile = true;\r\n      if (typeof validFileCallback === 'function' && validFileCallback(oFile) === false) {\r\n        validFile = false;\r\n      }\r\n\r\n      if (validFile) {\r\n        let reader = new FileReader();\r\n        reader.readAsDataURL(oFile);\r\n\r\n        reader.onload = function () {\r\n          typeof cb === 'function' && cb(this.result);\r\n        }\r\n      } else {\r\n        console.log('onValidateFile function return false')\r\n      }\r\n\r\n    }\r\n  }, false);\r\n\r\n  // 阻止冒泡导致两次触发selectBtn\r\n  $file.addEventListener('click', (e) => {\r\n    e.stopPropagation();\r\n  })\r\n\r\n  $file.click();\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/es6/util/util.js?");

    /***/
  }

  /******/ });