'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//拖拽
function drag(bar, target, callback) {
  if (!bar || !target) return false;

  var getStyle = function getStyle(oElement, sName) {
    return oElement.currentStyle ? oElement.currentStyle[sName] : getComputedStyle(oElement, null)[sName];
  };

  var left = getStyle(target, 'left'),
      top = getStyle(target, 'top'),
      x0,
      y0,
      draging = false;

  var mousedownHandler = function mousedownHandler(e) {
    var e = e || window.event;
    x0 = e.clientX;
    y0 = e.clientY;
    draging = true;
  };

  var mousemoveHandler = function mousemoveHandler(e) {
    var e = e || window.event;

    if (draging) {
      var x1 = e.clientX,
          y1 = e.clientY;
      var x = x1 - x0,
          y = y1 - y0;

      target.style.left = parseInt(left) + x + 'px';
      target.style.top = parseInt(top) + y + 'px';

      if (typeof callback == 'function') {
        callback((parseInt(left) || 0) + x, (parseInt(top) || 0) + y);
      }

      return false;
    }
  };

  var mouseupHandler = function mouseupHandler(e) {
    draging = false;

    left = getStyle(target, 'left');
    top = getStyle(target, 'top');
  };

  if (window.addEventListener) {
    bar.addEventListener('mousedown', mousedownHandler, false);
    document.addEventListener('mousemove', mousemoveHandler, false);
    document.addEventListener('mouseup', mouseupHandler, false);
  }
}
// 选择器
function selector(el) {
  return typeof el === "string" ? document.querySelector(el) : el;
}
// 加载图片
function loadImage(src, callback) {
  var image = new Image();
  // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
  image.setAttribute('crossorigin', 'anonymous');
  image.src = src;
  image.onload = function () {
    callback(image);
  };
  image.onerror = function () {
    console.log('Error: image error!');
  };
}
// 创建cavas
function getCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
// 选择文件
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

  $file.addEventListener('change', function () {
    if (this.files.length > 0) {

      var oFile = this.files[0];

      var validFile = true;
      if (validFileCallback && typeof validFileCallback === 'function' && validFileCallback(oFile) === false) {
        validFile = false;
      }

      if (validFile) {
        var reader = new FileReader();
        reader.readAsDataURL(oFile);

        reader.onload = function () {
          cb && typeof cb === 'function' && cb(this.result);
        };
      }
    }
  }, false);

  $file.click();
}

// ************************************************************************************
// 默认配置参数
var defaultProps = {
  // 选择图片按钮
  selectBtn: '#J-select-btn',
  // 放大按钮
  upBtn: '#J-up-btn',
  // 缩小按钮
  downBtn: '#J-down-btn',
  // 逆时针按钮
  anticlockwiseBtn: '#J-anticlockwise-btn',
  // 顺时针按钮
  clockwiseBtn: '#J-clockwise-btn',
  // 裁剪按钮
  cropBtn: '#J-crop-btn',
  // 下载按钮，必须为a标签
  downloadBtn: '#J-download-btn',
  // 工作区容器
  workingContainer: '#J-working-container',
  // 预览区容器
  previewContainer: '#J-preview-container',

  // 放大缩小幅度
  scaleStep: 10,

  // 工作区边长
  containerSize: 500,
  // 裁剪区边长，要求是正方形
  cropSize: 300,
  // 裁剪后的图片类型
  cropImgType: 'image/png',
  // 遮挡区颜色
  borderColor: 'rgba(0, 0, 0, 0.8)',

  // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。
  // 是否添加水印
  hasMark: true,
  // 水印图标地址
  markIcon: null,
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

  // 回调事件
  // 上传源图片回调函数
  onValidateFile: function onValidateFile(oFile) {
    // oFile的属性值示例：name:"brandPublicty1.jpg" size:134476 type:"image/jpeg"
    return true;
  },
  // 裁剪完成回调函数
  onCropped: function onCropped(destImgData) {}

};

var PipeImg = function () {
  function PipeImg(options) {
    _classCallCheck(this, PipeImg);

    this.options = _extends(defaultProps, options);

    this.$selectBtn = selector(this.options.selectBtn);
    this.$upBtn = selector(this.options.upBtn);
    this.$downBtn = selector(this.options.downBtn);
    this.$anticlockwiseBtn = selector(this.options.anticlockwiseBtn);
    this.$clockwiseBtn = selector(this.options.clockwiseBtn);
    this.$cropBtn = selector(this.options.cropBtn);
    this.$downloadBtn = selector(this.options.downloadBtn);
    this.$workingContainer = selector(this.options.workingContainer);
    this.$previewContainer = selector(this.options.previewContainer);

    this.scaleStep = this.options.scaleStep;
    this.containerSize = this.options.containerSize;
    this.cropSize = this.options.cropSize <= this.containerSize ? this.options.cropSize : this.containerSize;
    this.cropImgType = this.options.cropImgType;

    this.borderWidth = (this.containerSize - this.cropSize) / 2;
    this.borderColor = this.options.borderColor;

    this.hasMark = this.options.hasMark;
    this.markIcon = this.options.markIcon;
    this.markFont = this.options.markFont;
    this.markStyle = this.options.markStyle;
    this.markText = this.options.markText;
    this.markX = this.options.markX;
    this.markY = this.options.markY;

    this.onValidateFile = this.options.onValidateFile;
    this.onCropped = this.options.onCropped;

    // 全局变量
    this.sourceImgEle = undefined;
    // 宽高比例
    this.sourceRatio = 0;
    // 自然宽高
    this.sourceW0 = 0;
    this.sourceH0 = 0;
    // 展示的宽高
    this.sourceW1 = 0;
    this.sourceH1 = 0;

    this.cacheSource = '';
    this.rotateCount = 0;

    this.init();
  }

  _createClass(PipeImg, [{
    key: 'getRotateNum',
    value: function getRotateNum(direction) {
      var rotateNum = 0;
      this.rotateCount += direction;
      if (this.rotateCount > 3 || this.rotateCount < -3) {
        this.rotateCount = 0;
      }
      if (this.rotateCount < 0) {
        rotateNum = 4 + this.rotateCount;
      } else {
        rotateNum = this.rotateCount;
      }
      return rotateNum;
    }

    // 放大，缩小，约定up值为1或者-1，表示放大，缩小

  }, {
    key: 'scaleImg',
    value: function scaleImg(scaleUp) {
      this.sourceH1 += this.scaleStep * scaleUp;
      this.sourceW1 = this.sourceH1 * this.sourceRatio;

      this.sourceImgEle.style.width = this.sourceW1 + 'px';
      this.sourceImgEle.style.height = this.sourceH1 + 'px';
    }

    // img同drawImage第一个参数;rotateNum: 0,1,2,3，分别对应旋转的四个角度方向;imgType: 保存图片类型；cb回调函数，传参destImgData,w,h；

  }, {
    key: 'rotate',
    value: function rotate(src, rotateNum, imgType, cb) {
      loadImage(src, function (img) {
        var rotateDeg = rotateNum * 90;
        var sourceW0 = img.naturalWidth;
        var sourceH0 = img.naturalHeight;

        var max = Math.max(sourceW0, sourceH0);
        var tempCvs = getCanvas(max, max),
            tempCtx = tempCvs.getContext('2d');

        tempCtx.translate(max / 2, max / 2);
        tempCtx.rotate(rotateDeg * Math.PI / 180);
        tempCtx.translate(-max / 2, -max / 2);
        tempCtx.drawImage(img, 0, 0);

        var w = sourceW0,
            h = sourceH0,
            sx = 0,
            sy = 0;
        if (rotateNum === 1) {
          w = sourceH0;
          h = sourceW0;
          sx = max - w;
          sy = 0;
        } else if (rotateNum === 2) {
          w = sourceW0;
          h = sourceH0;
          sx = max - w;
          sy = max - h;
        } else if (rotateNum === 3) {
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

        var cvs = getCanvas(w, h),
            ctx = cvs.getContext('2d');

        ctx.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);

        var destImgData = cvs.toDataURL(imgType);
        cb && typeof cb === 'function' && cb(destImgData, w, h);

        // previewContainer.appendChild(cvs);
      });
    }
  }, {
    key: 'watermark',
    value: function watermark(targetImg, cb) {
      var _this = this;

      if (targetImg.nodeName.toLowerCase() !== 'canvas') {
        targetImg = getCanvas(targetImg.width, targetImg.height);
      }
      var dContext = targetImg.getContext('2d');
      if (this.hasMark) {
        if (this.markIcon) {
          loadImage(this.markIcon, function (img) {
            if (!_this.markX) {
              _this.markX = _this.cropSize - img.naturalWidth;
            }
            if (!_this.markY) {
              _this.markY = _this.cropSize - img.naturalHeight;
            }
            dContext.drawImage(img, _this.markX, _this.markY);
            cb(targetImg);
          });
        } else {
          dContext.textAlign = "end";
          dContext.font = this.markFont;
          dContext.fillStyle = this.markStyle;
          if (!this.markX) {
            this.markX = this.cropSize - 10;
          }
          if (!this.markY) {
            this.markY = this.cropSize - 10;
          }
          dContext.fillText(this.markText, this.markX, this.markY);
          cb(targetImg);
        }
      } else {
        cb(targetImg);
      }
    }
  }, {
    key: 'preview',
    value: function preview(data) {
      // 裁剪后预览
      this.$previewContainer && (this.$previewContainer.innerHTML = '<img src="' + data + '">');
    }
  }, {
    key: 'download',
    value: function download(data) {
      // 提供下载，Safari不支持
      var isSupportDownload = 'download' in document.createElement('a');
      if (isSupportDownload && this.$downloadBtn) {
        this.$downloadBtn.download = new Date().valueOf() + '_dest.' + this.cropImgType.substr(this.cropImgType.indexOf('image/') + 6);
        this.$downloadBtn.href = data;
      }
    }
    // 裁剪

  }, {
    key: 'crop',
    value: function crop() {
      var _this2 = this;

      if (!this.sourceImgEle.src) return;

      // 绘制要用图片的自然尺寸
      var sy = (this.borderWidth - this.sourceImgEle.offsetTop) / this.sourceH1 * this.sourceH0,
          sx = (this.borderWidth - this.sourceImgEle.offsetLeft) / this.sourceW1 * this.sourceW0,
          sWidth = void 0,
          sHeight = void 0;
      sWidth = sHeight = this.cropSize / this.sourceH1 * this.sourceH0;

      var destCanvas = getCanvas(this.cropSize, this.cropSize),
          dContext = destCanvas.getContext('2d');

      dContext.drawImage(this.sourceImgEle, sx, sy, sWidth, sHeight, 0, 0, this.cropSize, this.cropSize);

      this.watermark(destCanvas, function (cvs) {
        destCanvas = cvs;
        var data = destCanvas.toDataURL(_this2.cropImgType);

        // 提供预览
        _this2.preview(data);
        // 提供下载
        _this2.download(data);

        // TODO 直接把base64格式图片数据传到后台
        // TODO 作为文件形式用FormData提交到后台 
        _this2.onCropped(data);
      });
    }

    // 选择的源图片加载完初始化相关参数

  }, {
    key: 'loadHandler',
    value: function loadHandler() {
      var self = this;
      self.sourceW0 = self.sourceImgEle.naturalWidth;
      self.sourceH0 = self.sourceImgEle.naturalHeight;
      self.sourceRatio = self.sourceW0 / self.sourceH0;

      var top = 0,
          left = 0;

      if (self.sourceRatio >= 1) {

        self.sourceW1 = self.cropSize * self.sourceRatio;
        self.sourceH1 = self.cropSize;

        top = self.borderWidth;
        left = (self.containerSize - self.sourceW1) / 2;
      } else {

        self.sourceH1 = self.cropSize / self.sourceRatio;
        self.sourceW1 = self.cropSize;

        left = self.borderWidth;
        top = (self.containerSize - self.sourceH1) / 2;
      }

      self.sourceImgEle.style.cssText = 'position: absolute;width: ' + self.sourceW1 + 'px;height: ' + self.sourceH1 + 'px;top: ' + top + 'px;left: ' + left + 'px;';
    }
  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      var self = this;
      if (this.onCropped && typeof this.onCropped != 'function') {
        throw new Error('onCropped必须为函数');
      }
      if (this.onValidateFile && typeof this.onValidateFile != 'function') {
        throw new Error('onValidateFile必须为函数');
      }

      var workingAreaHtml = '<div class="working-area"><img><div class="mask"></div></div>';
      this.$workingContainer.innerHTML = workingAreaHtml;

      var workingAreaEle = this.$workingContainer.querySelector('.working-area');
      workingAreaEle.style.cssText = 'position: relative;overflow: hidden;width: ' + this.containerSize + 'px;height: ' + this.containerSize + 'px;';

      this.sourceImgEle = this.$workingContainer.querySelector('img');
      this.sourceImgEle.style.position = 'absolute';

      var maskEle = this.$workingContainer.querySelector('.mask');
      maskEle.style.cssText = 'position: absolute;width: ' + this.cropSize + 'px;height: ' + this.cropSize + 'px;border: ' + this.borderWidth + 'px solid ' + this.borderColor + ';';

      drag(this.$workingContainer, this.sourceImgEle);

      this.sourceImgEle.addEventListener('load', function () {
        _this3.loadHandler();
      }, false);

      // 按钮事件绑定
      this.$selectBtn.addEventListener('click', function () {

        chooseFile(_this3.$selectBtn, function (data) {
          self.sourceImgEle.src = data;
          self.sourceImgEle.style.width = 'auto';
          self.sourceImgEle.style.height = 'auto';

          self.cacheSource = data;
        });
      }, false);

      this.$downBtn.addEventListener('click', function () {
        _this3.scaleImg(-1);
      }, false);
      this.$upBtn.addEventListener('click', function () {
        _this3.scaleImg(1);
      }, false);

      this.$cropBtn.addEventListener('click', function () {
        _this3.crop();
      }, false);

      this.$clockwiseBtn.addEventListener('click', function () {
        var rotateNum = _this3.getRotateNum(1);
        // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
        _this3.rotate(_this3.cacheSource, rotateNum, _this3.cropImgType, function (data, w, h) {
          _this3.sourceImgEle.src = data;
        });
      }, false);
      this.$anticlockwiseBtn.addEventListener('click', function () {
        var rotateNum = _this3.getRotateNum(-1);
        // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
        _this3.rotate(_this3.cacheSource, rotateNum, _this3.cropImgType, function (data, w, h) {
          _this3.sourceImgEle.src = data;
        });
      }, false);
    }
  }]);

  return PipeImg;
}();

if (typeof window !== 'undefined') {
  window.PipeImg = PipeImg;
}
if (typeof exports !== 'undefined') {
  exports.PipeImg = PipeImg;
}