import {
    getCanvas,
    base64Data2Blob,
    blob2FormData,
    getBase64Size
} from './util';

class ImgHandler {

    constructor(options) {

        // 默认配置参数
        let defaults = {
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


        options = Object.assign({}, defaults, options);

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
        this.markY = options.markY;


        // 全局变量
        this.sx = 0;
        this.sy = 0;

        this.scaleRatio = 1;

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
            // img to canvas
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

            // dContext.textBaseline = "top";
            // dContext.textAlign = this.textAlign;
            // dContext.font = this.markFont;
            // dContext.fillStyle = this.markStyle;
            // dContext.fillText(this.markText, this.markX, this.markY);

            // let markTxtCvs = {
            //     width: 284,
            //     height: 22,
            //     font0: "18px / 24px Roboto, Arial, 'Microsoft YaHei', sans-serif",
            //     font1: this.markFont,
            //     color: this.markStyle,
            //     text: this.markText,
            //     x: this.markX,
            //     y: this.markY,
            //     fontRatio: 1
            // }; 
            let markTxtCvs = this.markTxtCvs;
            // TODO 优化只在chrome浏览器下用缩放canvas，其他直接用字体，因为缩放会模糊（解决方案整体放大数倍，待验证）。
            if(markTxtCvs.font1 < 12){
                let txtCvs = getCanvas(markTxtCvs.width, markTxtCvs.height);
                let txtCxt = txtCvs.getContext('2d');
    
                txtCxt.textBaseline = "top";
                txtCxt.textAlign = "start";
                // "3px / 4px Roboto, Arial, "Microsoft YaHei", sans-serif"
                txtCxt.font = markTxtCvs.font0;
                txtCxt.fillStyle = markTxtCvs.color;
                txtCxt.fillText(markTxtCvs.text, 0, 0);
                var fontRatio = parseInt(markTxtCvs.font1) / parseInt(markTxtCvs.font0);
                dContext.drawImage(txtCvs, 0, 0, markTxtCvs.width, markTxtCvs.height, markTxtCvs.x, markTxtCvs.y, markTxtCvs.width*fontRatio, markTxtCvs.height*fontRatio);
            }else{
                dContext.textBaseline = "top";
                dContext.textAlign = "start";
                dContext.font = markTxtCvs.font1;
                dContext.fillStyle = markTxtCvs.color;
                dContext.fillText(markTxtCvs.text, markTxtCvs.x, markTxtCvs.y);                
            }

            
        }

        // this.base64Data = canvas.toDataURL(this.mime);
        this.result = canvas;
        this.results.push(canvas);
        return this;
    }

    // 裁剪
    crop() {
        let targetImg = this.result;

        let canvas = getCanvas(this.cropW, this.cropH);
        let context = canvas.getContext('2d');

        // 由于safari对于cropW小数值绘制图片为全黑问题，作以下处理
        this.sx = Math.floor(this.sx);
        this.sy = Math.floor(this.sy);
        this.cropW = Math.floor(this.cropW);
        this.cropH = Math.floor(this.cropH);

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
    // 只对'image/jpeg'格式有效
    compress(isSimple) {
        let cvs = this.result;
        let max = this.maxSize * 1024;
        let quality = 1;
        let qualityStep = this.qualityStep;
        // 质量压缩只支持'image/jpeg'，'image/webp'(chrome支持)
        let qualityType = 'image/jpeg';

        let data = cvs.toDataURL(qualityType, 1.0);
        let size0 = getBase64Size(data);
        // console.log('start compress: ' + Math.ceil(size0 / 1024));
        // 简单粗暴
        if (isSimple) {
            while (size0 > max) {
                quality = Math.floor(max / size0 * 10) / 10;
                data = cvs.toDataURL(qualityType, quality);
                size0 = getBase64Size(data);
            }

        } else {
            // 降低质量
            while (size0 > max) {
                quality -= qualityStep;
                data = cvs.toDataURL(qualityType, quality);
                size0 = getBase64Size(data);
            }
        }
        // console.log('end compress: ' + Math.ceil(size0 / 1024));

        let blobData = base64Data2Blob(data, this.mime);;    
        let formdata = blob2FormData(blobData);
        
        return {
            "base64": data,
            "blob": blobData,
            "formdata": formdata
        };
    }

}


export default ImgHandler
