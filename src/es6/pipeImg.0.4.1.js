import {drag, $, loadImage, getCanvas, getBase64Size, compress, base64Data2Blob, blob2FormData, chooseFile, uploadFile} from './util/util';

class PipeImg {

  constructor(options) {

    // 默认配置参数
    let defaults = {
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
      
      // 裁剪后图片最大值
      maxSize: 500,
      // 放大缩小幅度
      scaleStep: 10,

      // 工作区边长
      containerSize: 500,
      // 裁剪区边长
      cropW: 300,
      cropH: 300,
      // 裁剪后的图片类型
      mime: 'image/jpeg',
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
      sourceImgSrc: null,

      // 回调事件
      // 上传源图片回调函数
      onValidateFile: (oFile) => {
        // oFile的属性值示例：name:"brandPublicty1.jpg" size:134476 type:"image/jpeg"
      },
      // 裁剪完成回调函数
      onCropped: (destImgData) => {}

    };


    this.options = Object.assign(defaults, options);

    this.$selectBtn = $(this.options.selectBtn);
    this.$upBtn = $(this.options.upBtn);
    this.$downBtn = $(this.options.downBtn);
    this.$anticlockwiseBtn = $(this.options.anticlockwiseBtn);
    this.$clockwiseBtn = $(this.options.clockwiseBtn);
    this.$cropBtn = $(this.options.cropBtn);
    this.$downloadBtn = $(this.options.downloadBtn);
    this.$workingContainer = $(this.options.workingContainer);
    this.$previewContainer = $(this.options.previewContainer);

    this.maxSize = this.options.maxSize;
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
    this.sourceImgSrc = this.options.sourceImgSrc;

    this.onValidateFile = this.options.onValidateFile;
    this.onCropped = this.options.onCropped;


    // 全局变量
    this.rotateCount = 0;


    this.init();

  }

  getRotateNum(direction) {
    let rotateNum = 0;
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
  rotate(src, rotateNum, imgType, cb) {
    loadImage(src, (img) => {
      let rotateDeg = rotateNum * 90;
      let sourceW0 = img.naturalWidth;
      let sourceH0 = img.naturalHeight;

      let max = Math.max(sourceW0, sourceH0);
      let tempCvs = getCanvas(max, max),
        tempCtx = tempCvs.getContext('2d');

      tempCtx.translate(max / 2, max / 2);
      tempCtx.rotate(rotateDeg * Math.PI / 180);
      tempCtx.translate(-max / 2, -max / 2);
      tempCtx.drawImage(img, 0, 0);


      let w = sourceW0,
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

      let cvs = getCanvas(w, h),
        ctx = cvs.getContext('2d');

      ctx.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);

      let data = cvs.toDataURL(imgType);
      typeof cb === 'function' && cb(data, w, h);

      // previewContainer.appendChild(cvs);
    })

  }
  addMark(targetImg, cb) {
    if (typeof cb !== 'function') return false;

    if (targetImg.nodeName.toLowerCase() !== 'canvas') {
      targetImg = getCanvas(targetImg.width, targetImg.height);
    }
    let dContext = targetImg.getContext('2d');
    if (this.hasMark) {
      if (this.markIcon) {
        loadImage(this.markIcon, (img) => {
          if (!this.markX) {
            this.markX = targetImg.width - img.naturalWidth;
          }
          if (!this.markY) {
            this.markY = targetImg.height - img.naturalHeight;
          }
          dContext.drawImage(img, this.markX, this.markY);
          cb(targetImg);
        })

      } else {
        dContext.textAlign = "end";
        dContext.font = this.markFont;
        dContext.fillStyle = this.markStyle;
        if (!this.markX) {
          this.markX = targetImg.width - 10;
        }
        if (!this.markY) {
          this.markY = targetImg.height - 10;
        }
        dContext.fillText(this.markText, this.markX, this.markY);
        cb(targetImg);
      }
    } else {
      cb(targetImg);
    }

  }
  preview(data) {
    // 裁剪后预览
    this.$previewContainer && (this.$previewContainer.innerHTML = `<img src="${data}">`);
  }
  download(data) {
    // 提供下载，Safari不支持
    let isSupportDownload = 'download' in document.createElement('a');
    if (isSupportDownload && this.$downloadBtn) {
      this.$downloadBtn.download = new Date().valueOf() + '_dest.' + this.mime.substr(this.mime.indexOf('image/') + 6);
      this.$downloadBtn.href = data;
    }
  }
  // 裁剪
  crop(img, sx, sy, sWidth, sHeight, x, y, width, height) {
    if (!img) return;

    let destCanvas = getCanvas(width, height),
      dContext = destCanvas.getContext('2d');
    dContext.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);

    this.addMark(destCanvas, (resultCvs) => {

      let data = resultCvs.toDataURL('image/jpeg');
      let size0 = getBase64Size(data);
      if (size0 > 1024 * this.maxSize) {
        let quality = Math.floor(1024 * this.maxSize / size0 * 10) / 10;
        // data = resultCvs.toDataURL('image/jpeg', quality);
        data = compress(resultCvs, quality);
      }

      let blob = base64Data2Blob(data, this.mime);
      console.log('end compress: ' + Math.ceil(blob.size / 1024));
      let formData = blob2FormData(blob);
      console.log('formData: ' + formData);

      // 提供预览
      this.preview(data);
      // 提供下载
      this.download(data);

      // TODO 直接把base64格式图片数据传到后台
      // TODO 作为文件形式用FormData提交到后台 
      typeof this.onCropped === 'function' && this.onCropped(data);
    });

  }


  init() {
    let sourceImgEle, sourceW0, sourceH0, sourceW1, sourceH1, cacheSource,
      borderWidth = (this.containerSize - this.cropW) / 2,
      borderHeight = (this.containerSize - this.cropH) / 2;

    let workingAreaHtml = '<div class="working-area"><img><div class="mask"></div></div>';
    this.$workingContainer.innerHTML = workingAreaHtml;

    let workingAreaEle = this.$workingContainer.querySelector('.working-area');
    workingAreaEle.style.cssText = `position: relative;overflow: hidden;width: ${this.containerSize}px;height: ${this.containerSize}px;`;


    sourceImgEle = this.$workingContainer.querySelector('img');
    sourceImgEle.style.position = 'absolute';

    let maskEle = this.$workingContainer.querySelector('.mask');
    maskEle.style.cssText = `position: absolute;width: ${this.cropW}px;height: ${this.cropH}px;border-left: ${borderWidth}px solid ${this.maskColor};border-right: ${borderWidth}px solid ${this.maskColor};border-top: ${borderHeight}px solid ${this.maskColor};border-bottom: ${borderHeight}px solid ${this.maskColor};`;



    drag(sourceImgEle, this.$workingContainer);

    // 选择的源图片加载完初始化相关参数
    let loadHandler = () => {
      sourceW0 = sourceImgEle.naturalWidth;
      sourceH0 = sourceImgEle.naturalHeight;
      let sourceRatio = sourceW0 / sourceH0;

      let top = 0,
        left = 0;

      if (sourceRatio > 1) { //宽大于高

        sourceW1 = this.containerSize;
        sourceH1 = sourceW1 / sourceRatio;

        top = (this.containerSize - sourceH1) / 2;
        left = 0;
      } else {

        sourceH1 = this.containerSize;
        sourceW1 = sourceH1 * sourceRatio;

        left = (this.containerSize - sourceW1) / 2;
        top = 0;
      }

      sourceImgEle.style.cssText = `position: absolute;width: ${sourceW1}px;height: ${sourceH1}px;top: ${top}px;left: ${left}px;`;

    }

    sourceImgEle.addEventListener('load', loadHandler, false);


    if (this.sourceImgSrc) {
      sourceImgEle.src = this.sourceImgSrc;
      sourceImgEle.style.width = 'auto';
      sourceImgEle.style.height = 'auto';

      cacheSource = this.sourceImgSrc;
    }
    // 按钮事件绑定
    this.$selectBtn.addEventListener('click', (e) => {
      chooseFile(this.$selectBtn, function (data) {
        sourceImgEle.src = data;
        sourceImgEle.style.width = 'auto';
        sourceImgEle.style.height = 'auto';

        cacheSource = data;

      }, this.onValidateFile);

    }, false);


    // 放大，缩小，约定up值为1或者-1，表示放大，缩小
    let scaleImg = (scaleUp) => {
      let sourceRatio = sourceW0 / sourceH0;
      sourceH1 += this.scaleStep * scaleUp;
      sourceW1 = sourceH1 * sourceRatio;

      sourceImgEle.style.width = sourceW1 + 'px';
      sourceImgEle.style.height = sourceH1 + 'px';
    };

    this.$downBtn.addEventListener('click', () => {
      scaleImg(-1);
    }, false)
    this.$upBtn.addEventListener('click', () => {
      scaleImg(1);
    }, false)


    this.$cropBtn.addEventListener('click', () => {

      // 绘制要用图片的自然尺寸
      let scaleRatio = sourceH0 / sourceH1;
      let sy = (borderHeight - sourceImgEle.offsetTop) * scaleRatio,
        sx = (borderWidth - sourceImgEle.offsetLeft) * scaleRatio,
        sWidth = this.cropW * scaleRatio,
        sHeight = this.cropH * scaleRatio;

      this.crop(sourceImgEle, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);


    }, false);



    this.$clockwiseBtn.addEventListener('click', () => {
      let rotateNum = this.getRotateNum(1);
      // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
      this.rotate(cacheSource, rotateNum, this.mime, (data, w, h) => {
        sourceImgEle.src = data;
      })
    }, false);
    this.$anticlockwiseBtn.addEventListener('click', () => {
      let rotateNum = this.getRotateNum(-1);
      // sourceImgEle.style.transform = `rotate(${rotateNum * 90}deg)`;
      this.rotate(cacheSource, rotateNum, this.mime, (data, w, h) => {
        sourceImgEle.src = data;
      })
    }, false);

  }

}


if (typeof module !== "undefined" && module.exports) { 
  module.exports = PipeImg; 
} else if (typeof define === "function" && define.amd) { 
  define(function(){return PipeImg;}); 
} else { 
  window.PipeImg = PipeImg;
}