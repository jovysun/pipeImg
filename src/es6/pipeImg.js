import {
  drag,
  $,
  loadImage,
  getCanvas,
  getBase64Size,
  compress,
  base64Data2Blob,
  blob2FormData,
  chooseFile,
  uploadFile,
  getImgPromise
} from './util/util';

class PipeImg {

  constructor(options) {

    // 默认配置参数
    let defaults = {
      // 源图片
      sourceImg: '',

      // 裁剪后图片最大值KB
      maxSize: 500,

      // 裁剪后的图片类型
      mime: 'image/jpeg',

      // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。
      // 是否添加水印
      hasMark: true,
      // 水印字体，值同css的font
      markFont: '16px microsoft yahei',
      // 水印字样式，可选值：color,gradient,pattern
      markStyle: '#fff',
      // 水印字文本
      markText: 'UED',
      // 水印字x轴位置
      markX: 0,
      // 水印字y轴位置
      markY: 0

    };


    this.options = Object.assign(defaults, options);

    this.sourceImg = this.options.sourceImg;

    this.maxSize = this.options.maxSize;

    this.mime = this.options.mime;

    this.hasMark = this.options.hasMark;
    this.markFont = this.options.markFont;
    this.markStyle = this.options.markStyle;
    this.markText = this.options.markText;
    this.markX = this.options.markX;
    this.markY = this.options.markY;


    // 全局变量
    this.rotateCount = 0;
    this.rotateNum = 1;
    this.sx = 0;
    this.sy = 0;
    this.sWidth = 600;
    this.sHeight = 600;
    this.scaleRatio = 0.5;
    this.quality = 0.2;

    this.results = [];

    this.init();

  }




  init() {
    this.results.push(this.sourceImg);
  }
  // 重置
  reset() {
    this.results = this.results.slice(0,1);
  }
  // 回退
  rollback() {
    this.results.pop();
  }
  // 旋转
  rotate() {
    let targetImg = this.results[this.results.length - 1];

    let rotateDeg = this.rotateNum * 90;
    let sourceW0 = targetImg.width;
    let sourceH0 = targetImg.height;

    let max = Math.max(sourceW0, sourceH0);
    let tempCvs = getCanvas(max, max),
      tempCtx = tempCvs.getContext('2d');

    tempCtx.translate(max / 2, max / 2);
    tempCtx.rotate(rotateDeg * Math.PI / 180);
    tempCtx.translate(-max / 2, -max / 2);
    tempCtx.drawImage(targetImg, 0, 0);


    let w = sourceW0,
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

    let canvas = getCanvas(w, h),
      context = canvas.getContext('2d');

    context.drawImage(tempCvs, sx, sy, w, h, 0, 0, w, h);

    // this.base64Data = canvas.toDataURL(this.mime);

    this.results.push(canvas);
    return this;
  }

  // 水印
  mark() {
    let targetImg = this.results[this.results.length - 1];

    let canvas = getCanvas(targetImg.width, targetImg.height);
    let dContext = canvas.getContext('2d');
    dContext.drawImage(targetImg, 0, 0);
    if (this.hasMark) {
      dContext.textAlign = "end";
      dContext.font = this.markFont;
      dContext.fillStyle = this.markStyle;
      if (!this.markX) {
        this.markX = canvas.width - 10;
      }
      if (!this.markY) {
        this.markY = canvas.height - 10;
      }
      dContext.fillText(this.markText, this.markX, this.markY);

    }

    // this.base64Data = canvas.toDataURL(this.mime);
    this.results.push(canvas);
    return this;
  }

  // 裁剪
  crop() {
    let targetImg = this.results[this.results.length - 1];

    let canvas = getCanvas(this.cropW, this.cropH);
    let context = canvas.getContext('2d');
    context.drawImage(targetImg, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.cropW, this.cropH);

    // this.base64Data = canvas.toDataURL(this.mime);
    this.results.push(canvas);
    return this;
  }
  // 缩放
  scale() {
    let targetImg = this.results[this.results.length - 1];

    let sourceW0 = targetImg.width;
    let sourceH0 = targetImg.height;

    let resultW = this.scaleRatio * sourceW0;
    let resultH = this.scaleRatio * sourceH0;

    let canvas = getCanvas(resultW, resultH);
    let context = canvas.getContext('2d');
    context.drawImage(targetImg, 0, 0, sourceW0, sourceH0, 0, 0, resultW, resultH);

    // this.base64Data = canvas.toDataURL(this.mime);
    this.results.push(canvas);
    return this;
  }
  // 压缩
  compress() {
    let targetImg = this.results[this.results.length - 1];

    let sourceW0 = targetImg.width;
    let sourceH0 = targetImg.height;

    let canvas = getCanvas(sourceW0, sourceH0);
    let ctx = canvas.getContext("2d");

    if (this.cropW && this.cropH) {
      ctx.drawImage(targetImg, 0, 0, this.cropW, this.cropH);
    } else {
      ctx.drawImage(targetImg, 0, 0);
    }
    this.base64Data = canvas.toDataURL(this.mime, this.quality);

    return this.base64Data;
  }

}


export {PipeImg}