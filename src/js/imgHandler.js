import {
    getCanvas,
} from './util';

class ImgHandler {

    constructor(options) {

        // 默认配置参数
        let defaults = {
            // 源图片元素
            sourceImg: null,

            rotateNum: 0,

            // 裁剪后图片最大值KB
            maxSize: 500,
            cropW: '',
            cropH: '',

            // 裁剪后的图片类型
            mime: 'image/jpeg',

            // 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。
            // 是否添加水印
            hasMark: true,
            textAlign: 'left',
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


        options = Object.assign({}, defaults, options);

        this.sourceImg = options.sourceImg;
        this.rotateNum = options.rotateNum;
        this.maxSize = options.maxSize;
        this.cropW = options.cropW;
        this.cropH = options.cropH;

        this.mime = options.mime;

        this.hasMark = options.hasMark;
        this.textAlign = options.textAlign;
        this.markFont = options.markFont;
        this.markStyle = options.markStyle;
        this.markText = options.markText;
        this.markX = options.markX;
        this.markY = options.markY;


        // 全局变量
        this.sx = 0;
        this.sy = 0;

        this.scaleRatio = 0.5;
        this.quality = 0.2;

        this.results = [];

        this.init();

    }




    init() {
        let targetImg = this.sourceImg;
        let sourceW0 = targetImg.width;
        let sourceH0 = targetImg.height;

        if (targetImg.nodeName.toLowerCase() === 'img') {
            sourceW0 = targetImg.naturalWidth;
            sourceH0 = targetImg.naturalHeight;
            // img装成canvas
            let canvas = getCanvas(sourceW0, sourceH0);
            let ctx = canvas.getContext('2d');
            ctx.drawImage(targetImg, 0, 0);
            targetImg = canvas;
        }

        this.result = targetImg;
        this.results.push(this.result);

    }

    // 重置
    reset() {
        this.rotateNum = 0;
        this.scaleRatio = 1;
        this.results = this.results.slice(0, 1);
    }
    // 回退
    rollback() {
        this.results.pop();
    }
    // 旋转
    rotate() {
        let targetImg = this.result;
        let sourceW0 = targetImg.width;
        let sourceH0 = targetImg.height;


        let rotateDeg = this.rotateNum * 90;

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
        this.result = canvas;
        this.results.push(canvas);
        return this;
    }

    // 水印
    mark() {
        let targetImg = this.result;
        let sourceW0 = targetImg.width;
        let sourceH0 = targetImg.height;

        let canvas = getCanvas(sourceW0, sourceH0);
        let dContext = canvas.getContext('2d');
        dContext.drawImage(targetImg, 0, 0);
        if (this.hasMark) {
            dContext.textBaseline = "top";
            dContext.textAlign = this.textAlign;
            dContext.font = this.markFont;
            dContext.fillStyle = this.markStyle;
            dContext.fillText(this.markText, this.markX, this.markY);

        }

        // this.base64Data = canvas.toDataURL(this.mime);
        this.result = canvas;
        this.results.push(canvas);
        return this;
    }

    // 裁剪
    crop() {
        let targetImg = this.result;
        let sourceW0 = targetImg.width;
        let sourceH0 = targetImg.height;

        let canvas = getCanvas(this.cropW, this.cropH);
        let context = canvas.getContext('2d');
        context.drawImage(targetImg, this.sx, this.sy, this.cropW, this.cropH, 0, 0, this.cropW, this.cropH);

        // this.base64Data = canvas.toDataURL(this.mime);
        this.result = canvas;
        this.results.push(canvas);
        return this;
    }
    // 缩放
    scale() {
        let targetImg = this.result;
        let sourceW0 = targetImg.width;
        let sourceH0 = targetImg.height;

        let resultW = this.scaleRatio * sourceW0;
        let resultH = this.scaleRatio * sourceH0;

        let canvas = getCanvas(resultW, resultH);
        let context = canvas.getContext('2d');
        context.drawImage(targetImg, 0, 0, sourceW0, sourceH0, 0, 0, resultW, resultH);

        // this.base64Data = canvas.toDataURL(this.mime);
        this.result = canvas;
        this.results.push(canvas);
        return this;
    }
    // 压缩
    compress() {
        let targetImg = this.result;
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


export {ImgHandler}
