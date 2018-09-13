'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (window, document) {

  function pipeImg(props) {

    // 默认配置参数
    var defaultProps = {
      // 选择图片按钮
      selectBtn: document.querySelector('#J-select-btn'),
      // 放大按钮
      upBtn: document.querySelector('#J-up-btn'),
      // 缩小按钮
      downBtn: document.querySelector('#J-down-btn'),

      // 裁剪按钮
      cropBtn: document.querySelector('#J-crop-btn'),
      // 下载按钮，必须为a标签
      downloadBtn: document.querySelector('#J-download-btn'),
      // 工作区容器
      workingContainer: document.querySelector('#J-working-container'),
      // 预览区容器
      previewContainer: document.querySelector('#J-preview-container'),

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
      hasWatermark: true,
      // 水印图标
      watermarkImg: null,
      // 水印字体，值同css的font
      watermarkFont: '16px microsoft yahei',
      // 水印字样式，可选值：color,gradient,pattern
      watermarkFillStyle: '#fff',
      // 水印字文本
      watermarkFillText: 'UED',
      // 水印字x轴位置
      watermarkX: 0,
      // 水印字y轴位置
      watermarkY: 0,

      // 回调事件
      // 上传源图片回调函数
      onValidateFile: function onValidateFile(oFile) {
        // oFile的属性值示例：name:"brandPublicty1.jpg" size:134476 type:"image/jpeg"
        return true;
      },
      // 裁剪完成回调函数
      onCropped: function onCropped(destImgData) {}

    };

    var _props = _extends({}, defaultProps, props);
    var selectBtn = _props.selectBtn,
        upBtn = _props.upBtn,
        downBtn = _props.downBtn,
        cropBtn = _props.cropBtn,
        downloadBtn = _props.downloadBtn,
        workingContainer = _props.workingContainer,
        previewContainer = _props.previewContainer,
        scaleStep = _props.scaleStep,
        containerSize = _props.containerSize,
        cropSize = _props.cropSize <= containerSize ? _props.cropSize : containerSize,
        cropImgType = _props.cropImgType,
        borderWidth = (_props.containerSize - _props.cropSize) / 2,
        borderColor = _props.borderColor,
        hasWatermark = _props.hasWatermark,
        watermarkImg = _props.watermarkImg,
        watermarkFont = _props.watermarkFont,
        watermarkFillStyle = _props.watermarkFillStyle,
        watermarkFillText = _props.watermarkFillText,
        watermarkX = _props.watermarkX ? _props.watermarkX : cropSize - 10,
        watermarkY = _props.watermarkY ? _props.watermarkY : cropSize - 10,
        onValidateFile = _props.onValidateFile,
        onCropped = _props.onCropped;

    // 全局变量
    var sourceImgEle = undefined,

    // 宽高比例
    sourceRatio = 0,

    // 自然宽高
    sourceW0 = 0,
        sourceH0 = 0,

    // 展示的宽高
    sourceW1 = 0,
        sourceH1 = 0;

    var cacheSource = void 0;
    var rotateCount = 0;

    function getRotateNum(direction) {
      var rotateNum = 0;
      rotateCount += direction;
      if (rotateCount > 3 || rotateCount < -3) {
        rotateCount = 0;
      }
      if (rotateCount < 0) {
        rotateNum = 4 + rotateCount;
      } else {
        rotateNum = rotateCount;
      }
      return rotateNum;
    }

    function _loadImage(data, callback) {
      var image = new Image();
      image.src = data;
      image.onload = function () {
        callback(image);
      };
      image.onerror = function () {
        console.log('Error: image error!');
      };
    }
    function _getCanvas(width, height) {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }

    // 选择的源图片加载完初始化相关参数
    function loadHandler() {
      sourceW0 = sourceImgEle.naturalWidth;
      sourceH0 = sourceImgEle.naturalHeight;
      sourceRatio = sourceW0 / sourceH0;

      var top = 0,
          left = 0;

      if (sourceRatio >= 1) {

        sourceW1 = cropSize * sourceRatio;
        sourceH1 = cropSize;

        top = borderWidth;
        left = (containerSize - sourceW1) / 2;
      } else {

        sourceH1 = cropSize / sourceRatio;
        sourceW1 = cropSize;

        left = borderWidth;
        top = (containerSize - sourceH1) / 2;
      }

      sourceImgEle.style.cssText = 'position: absolute;width: ' + sourceW1 + 'px;height: ' + sourceH1 + 'px;top: ' + top + 'px;left: ' + left + 'px;';
    }
    // 放大，缩小，约定up值为1或者-1，表示放大，缩小
    function scaleImg(scaleUp) {
      sourceH1 += scaleStep * scaleUp;
      sourceW1 = sourceH1 * sourceRatio;

      sourceImgEle.style.width = sourceW1 + 'px';
      sourceImgEle.style.height = sourceH1 + 'px';
    };

    // img同drawImage第一个参数;rotateNum: 0,1,2,3，分别对应旋转的四个角度方向;imgType: 保存图片类型；cb回调函数，传参destImgData,w,h；
    function rotate(src, rotateNum, imgType, cb) {

      _loadImage(src, function (img) {
        var rotateDeg = rotateNum * 90;
        var sourceW0 = img.naturalWidth;
        var sourceH0 = img.naturalHeight;

        var max = Math.max(sourceW0, sourceH0);
        var tempCvs = _getCanvas(max, max),
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

        var cvs = _getCanvas(w, h),
            ctx = cvs.getContext('2d');
        ctx.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);

        var destImgData = cvs.toDataURL(imgType);
        cb && typeof cb === 'function' && cb(destImgData, w, h);

        // previewContainer.appendChild(cvs);
      });
    }

    // 裁剪
    function crop() {
      if (!sourceImgEle.src) return;

      // 绘制要用图片的自然尺寸
      var sy = (borderWidth - sourceImgEle.offsetTop) / sourceH1 * sourceH0,
          sx = (borderWidth - sourceImgEle.offsetLeft) / sourceW1 * sourceW0,
          sWidth = void 0,
          sHeight = void 0;
      sWidth = sHeight = cropSize / sourceH1 * sourceH0;

      var destCanvas = _getCanvas(cropSize, cropSize),
          dContext = destCanvas.getContext('2d');

      dContext.drawImage(sourceImgEle, sx, sy, sWidth, sHeight, 0, 0, cropSize, cropSize);

      // TODO 后期抽出整理成独立的功能控件
      // 绘制水印 
      if (hasWatermark) {
        if (watermarkImg) {
          var watermark = new Image();

          // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
          watermark.setAttribute('crossorigin', 'anonymous');
          watermark.onload = function () {
            watermarkX = cropSize - watermark.naturalWidth;
            watermarkY = cropSize - watermark.naturalHeight;
            dContext.drawImage(watermark, watermarkX, watermarkY);
            destImgData();
          };
          watermark.src = watermarkImg;
        } else {
          dContext.textAlign = "end";
          dContext.font = watermarkFont;
          dContext.fillStyle = watermarkFillStyle;
          dContext.fillText(watermarkFillText, watermarkX, watermarkY);
          destImgData();
        }
      } else {
        destImgData();
      }

      function destImgData() {
        var destImgData = destCanvas.toDataURL(cropImgType);

        // 裁剪后预览
        previewContainer.innerHTML = '<img src="' + destImgData + '">';

        // 提供下载，Safari不支持
        var isSupportDownload = 'download' in document.createElement('a');
        if (isSupportDownload) {
          downloadBtn.download = new Date().valueOf() + '_dest.' + cropImgType.substr(cropImgType.indexOf('image/') + 6);
          downloadBtn.href = destImgData;
        }

        // TODO 直接把base64格式图片数据传到后台
        // TODO 作为文件形式用FormData提交到后台 

        onCropped(destImgData);
      }
    }

    function init() {
      if (onCropped && typeof onCropped != 'function') {
        throw new Error('onCropped必须为函数');
      }
      if (onValidateFile && typeof onValidateFile != 'function') {
        throw new Error('onValidateFile必须为函数');
      }

      var workingAreaHtml = '<div class="working-area"><img><div class="mask"></div></div><input type="file" hidden>';
      workingContainer.innerHTML = workingAreaHtml;

      var workingAreaEle = workingContainer.querySelector('.working-area');
      workingAreaEle.style.cssText = 'position: relative;overflow: hidden;width: ' + containerSize + 'px;height: ' + containerSize + 'px;';

      sourceImgEle = workingContainer.querySelector('img');
      sourceImgEle.style.position = 'absolute';

      var maskEle = workingContainer.querySelector('.mask');
      maskEle.style.cssText = 'position: absolute;width: ' + cropSize + 'px;height: ' + cropSize + 'px;border: ' + borderWidth + 'px solid ' + borderColor + ';';

      drag(workingContainer, sourceImgEle);

      sourceImgEle.addEventListener('load', loadHandler, false);

      // 按钮事件绑定
      selectBtn.addEventListener('click', function () {
        var fileEle = workingContainer.querySelector('input[type=file]');
        fileEle.addEventListener('change', function () {
          if (this.files.length > 0) {

            var oFile = this.files[0];

            if (onValidateFile(oFile) != false) {
              var reader = new FileReader();
              reader.readAsDataURL(oFile);

              reader.onload = function () {

                sourceImgEle.src = this.result;
                sourceImgEle.style.width = 'auto';
                sourceImgEle.style.height = 'auto';

                cacheSource = this.result;
              };
            }
          }
        }, false);

        fileEle.click();
      }, false);

      downBtn.addEventListener('click', function () {
        scaleImg(-1);
      }, false);
      upBtn.addEventListener('click', function () {
        scaleImg(1);
      }, false);
      cropBtn.addEventListener('click', crop, false);
      document.querySelector('#J-clockwise-btn').addEventListener('click', function () {
        var rotateNum = getRotateNum(1);
        // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
        rotate(cacheSource, rotateNum, cropImgType, function (data, w, h) {
          sourceImgEle.src = data;
        });
      }, false);
      document.querySelector('#J-anticlockwise-btn').addEventListener('click', function () {
        var rotateNum = getRotateNum(-1);
        // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
        rotate(cacheSource, rotateNum, cropImgType, function (data, w, h) {
          sourceImgEle.src = data;
        });
      }, false);
    }

    init();
  }

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

  if (typeof window !== 'undefined') window.pipeImg = pipeImg;
})(window, document);