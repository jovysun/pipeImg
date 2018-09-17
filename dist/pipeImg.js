'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//拖拽
function drag(moveElement, dragBar, cb) {
  if (!moveElement) return;

  var draging = false,
      x0 = void 0,
      y0 = void 0,
      mLeft0 = void 0,
      mTop0 = void 0,
      mLeft1 = void 0,
      mTop1 = void 0;

  var mousedownHandler = function mousedownHandler(e) {
    e = e || window.event;
    x0 = e.clientX;
    y0 = e.clientY;
    var mRect = moveElement.getBoundingClientRect();
    mLeft0 = mRect.left;
    mTop0 = mRect.top;

    draging = true;
  };
  var mousemoveHandler = function mousemoveHandler(e) {
    e = e || window.event;
    if (draging) {
      var x1 = e.clientX,
          y1 = e.clientY;
      mLeft1 = x1 - x0 + mLeft0;
      mTop1 = y1 - y0 + mTop0;

      moveElement.style.left = mLeft1;
      moveElement.style.top = mTop1;

      typeof cb === 'function' && cb(mLeft1, mTop1);
    }
  };
  var mouseupHandler = function mouseupHandler(e) {
    draging = false;
  };

  if (window.addEventListener) {
    dragBar = dragBar || document;

    dragBar.addEventListener('mousedown', mousedownHandler, false);
    document.addEventListener('mousemove', mousemoveHandler, false);
    document.addEventListener('mouseup', mouseupHandler, false);
  }
}
// 选择器
function selector(el) {
  return typeof el === "string" ? document.querySelector(el) : el;
}
// 加载图片
function loadImage(src, cb) {
  var image = new Image();
  // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
  image.setAttribute('crossorigin', 'anonymous');
  image.src = src;
  image.onload = function () {
    typeof cb === 'function' && cb(image);
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
  }, false);

  // 阻止冒泡导致两次触发selectBtn
  $file.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  $file.click();
}

// ************************************************************************************
// 默认配置参数
var defaults = {
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
  // 裁剪区边长
  cropW: 300,
  cropH: 300,
  // 裁剪后的图片类型
  mime: 'image/png',
  // 遮挡区颜色
  maskColor: 'rgba(0, 0, 0, 0.8)',

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
  },
  // 裁剪完成回调函数
  onCropped: function onCropped(destImgData) {}

};

var PipeImg = function () {
  function PipeImg(options) {
    _classCallCheck(this, PipeImg);

    this.options = _extends(defaults, options);

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
    this.cropW = this.options.cropW <= this.containerSize ? this.options.cropW : this.containerSize;
    this.cropH = this.options.cropH <= this.containerSize ? this.options.cropH : this.containerSize;
    this.mime = this.options.mime;

    this.maskColor = this.options.maskColor;

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

        var data = cvs.toDataURL(imgType);
        typeof cb === 'function' && cb(data, w, h);

        // previewContainer.appendChild(cvs);
      });
    }
  }, {
    key: 'addMark',
    value: function addMark(targetImg, cb) {
      var _this = this;

      if (typeof cb !== 'function') return false;

      if (targetImg.nodeName.toLowerCase() !== 'canvas') {
        targetImg = getCanvas(targetImg.width, targetImg.height);
      }
      var dContext = targetImg.getContext('2d');
      if (this.hasMark) {
        if (this.markIcon) {
          loadImage(this.markIcon, function (img) {
            if (!_this.markX) {
              _this.markX = _this.cropW - img.naturalWidth;
            }
            if (!_this.markY) {
              _this.markY = _this.cropH - img.naturalHeight;
            }
            dContext.drawImage(img, _this.markX, _this.markY);
            cb(targetImg);
          });
        } else {
          dContext.textAlign = "end";
          dContext.font = this.markFont;
          dContext.fillStyle = this.markStyle;
          if (!this.markX) {
            this.markX = this.cropW - 10;
          }
          if (!this.markY) {
            this.markY = this.cropH - 10;
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
        this.$downloadBtn.download = new Date().valueOf() + '_dest.' + this.mime.substr(this.mime.indexOf('image/') + 6);
        this.$downloadBtn.href = data;
      }
    }
    // 裁剪

  }, {
    key: 'crop',
    value: function crop(img, sx, sy, sWidth, sHeight, x, y, width, height) {
      var _this2 = this;

      if (!img) return;

      var destCanvas = getCanvas(width, height),
          dContext = destCanvas.getContext('2d');
      dContext.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);

      this.addMark(destCanvas, function (resultCvs) {
        var data = resultCvs.toDataURL(_this2.mime);

        // 提供预览
        _this2.preview(data);
        // 提供下载
        _this2.download(data);

        // TODO 直接把base64格式图片数据传到后台
        // TODO 作为文件形式用FormData提交到后台 
        typeof _this2.onCropped === 'function' && _this2.onCropped(data);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      var sourceImgEle = void 0,
          sourceW0 = void 0,
          sourceH0 = void 0,
          sourceW1 = void 0,
          sourceH1 = void 0,
          cacheSource = void 0,
          borderWidth = (this.containerSize - this.cropW) / 2,
          borderHeight = (this.containerSize - this.cropH) / 2;

      var workingAreaHtml = '<div class="working-area"><img><div class="mask"></div></div>';
      this.$workingContainer.innerHTML = workingAreaHtml;

      var workingAreaEle = this.$workingContainer.querySelector('.working-area');
      workingAreaEle.style.cssText = 'position: relative;overflow: hidden;width: ' + this.containerSize + 'px;height: ' + this.containerSize + 'px;';

      sourceImgEle = this.$workingContainer.querySelector('img');
      sourceImgEle.style.position = 'absolute';

      var maskEle = this.$workingContainer.querySelector('.mask');
      maskEle.style.cssText = 'position: absolute;width: ' + this.cropW + 'px;height: ' + this.cropH + 'px;border-left: ' + borderWidth + 'px solid ' + this.maskColor + ';border-right: ' + borderWidth + 'px solid ' + this.maskColor + ';border-top: ' + borderHeight + 'px solid ' + this.maskColor + ';border-bottom: ' + borderHeight + 'px solid ' + this.maskColor + ';';

      drag(sourceImgEle, this.$workingContainer);

      // 选择的源图片加载完初始化相关参数
      var loadHandler = function loadHandler() {
        sourceW0 = sourceImgEle.naturalWidth;
        sourceH0 = sourceImgEle.naturalHeight;
        var sourceRatio = sourceW0 / sourceH0;

        var top = 0,
            left = 0;

        if (sourceRatio > 1) {
          //宽大于高

          sourceW1 = _this3.containerSize;
          sourceH1 = sourceW1 / sourceRatio;

          top = (_this3.containerSize - sourceH1) / 2;
          left = 0;
        } else {

          sourceH1 = _this3.containerSize;
          sourceW1 = sourceH1 * sourceRatio;

          left = (_this3.containerSize - sourceW1) / 2;
          top = 0;
        }

        sourceImgEle.style.cssText = 'position: absolute;width: ' + sourceW1 + 'px;height: ' + sourceH1 + 'px;top: ' + top + 'px;left: ' + left + 'px;';
      };

      sourceImgEle.addEventListener('load', loadHandler, false);

      // 按钮事件绑定
      this.$selectBtn.addEventListener('click', function (e) {
        chooseFile(_this3.$selectBtn, function (data) {
          sourceImgEle.src = data;
          sourceImgEle.style.width = 'auto';
          sourceImgEle.style.height = 'auto';

          cacheSource = data;
        }, _this3.onValidateFile);
      }, false);

      // 放大，缩小，约定up值为1或者-1，表示放大，缩小
      var scaleImg = function scaleImg(scaleUp) {
        var sourceRatio = sourceW0 / sourceH0;
        sourceH1 += _this3.scaleStep * scaleUp;
        sourceW1 = sourceH1 * sourceRatio;

        sourceImgEle.style.width = sourceW1 + 'px';
        sourceImgEle.style.height = sourceH1 + 'px';
      };

      this.$downBtn.addEventListener('click', function () {
        scaleImg(-1);
      }, false);
      this.$upBtn.addEventListener('click', function () {
        scaleImg(1);
      }, false);

      this.$cropBtn.addEventListener('click', function () {

        // 绘制要用图片的自然尺寸
        var scaleRatio = sourceH0 / sourceH1;
        var sy = (borderHeight - sourceImgEle.offsetTop) * scaleRatio,
            sx = (borderWidth - sourceImgEle.offsetLeft) * scaleRatio,
            sWidth = _this3.cropW * scaleRatio,
            sHeight = _this3.cropH * scaleRatio;

        _this3.crop(sourceImgEle, sx, sy, sWidth, sHeight, 0, 0, _this3.cropW, _this3.cropH);
      }, false);

      this.$clockwiseBtn.addEventListener('click', function () {
        var rotateNum = _this3.getRotateNum(1);
        // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
        _this3.rotate(cacheSource, rotateNum, _this3.mime, function (data, w, h) {
          sourceImgEle.src = data;
        });
      }, false);
      this.$anticlockwiseBtn.addEventListener('click', function () {
        var rotateNum = _this3.getRotateNum(-1);
        // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
        _this3.rotate(cacheSource, rotateNum, _this3.mime, function (data, w, h) {
          sourceImgEle.src = data;
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