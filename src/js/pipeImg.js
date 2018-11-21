// 依赖jquery.js，template.js
import {
    compress,
    base64Data2Blob,
    blob2FormData,
    loadImages
} from './util';
import ImgHandler from './imgHandler';
import Dialog from './dialog';

import '../css/pipeImg.scss';

class PipeImg {

    constructor(options) {
        // 默认配置参数
        let defaults = {
            // 必填，图片src字符串数组
            source: [],
            // 上传图片地址
            ajaxUrl: '',
            debug: false,
            mime: 'image/jpeg',
            // 保存图片最大体积
            maxSize: 500,    
            // 文案
            markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing'],
            closeBtnTxt: '关闭',
            saveBtnTxt: '保存',
            resetBtnTxt: '重置',
            confirmBtnTxt: '确定',
            cancelBtnTxt: '取消',
            rotateMenuTxt: '旋转',
            turnLeftTxt: '逆时针旋转',
            turnRightTxt: '顺时针旋转',
            cropMenuTxt: '裁剪',
            scaleMenuTxt: '缩放',
            markMenuTxt: '添加水印',
            colorTxt: '颜色',
            positionTxt: '位置',
            opacityTxt: '透明度',
            showRoomTxt: '展示厅',
            companyNameTxt: '公司名称',
            markAllMenuTxt: '批量添加水印',
            // 初始化完成回调
            onInited: () => {},
            // 上传保存完成回调
            onComplete: (response) => {}
        };

        options = Object.assign({}, defaults, options);
        this.source = options.source;
        if (!this.source) {
            throw new Error('PipeImg: source is not found!');
        }
        if (!(Array.isArray(this.source) || typeof this.source === 'string')) {
            throw new Error('PipeImg: source类型错误，只能为字符串或者数组！');
        }
        this.ajaxUrl = options.ajaxUrl;

        this.debug = options.debug;
        this.mime = options.mime;
        this.maxSize = options.maxSize;

        this.markTextList = options.markTextList;
        this.closeBtnTxt = options.closeBtnTxt;
        this.saveBtnTxt = options.saveBtnTxt;
        this.resetBtnTxt = options.resetBtnTxt;
        this.confirmBtnTxt = options.confirmBtnTxt;
        this.cancelBtnTxt = options.cancelBtnTxt;
        this.rotateMenuTxt = options.rotateMenuTxt;
        this.turnLeftTxt = options.turnLeftTxt;
        this.turnRightTxt = options.turnRightTxt;
        this.cropMenuTxt = options.cropMenuTxt;
        this.scaleMenuTxt = options.scaleMenuTxt;
        this.markMenuTxt = options.markMenuTxt;
        this.colorTxt = options.colorTxt;
        this.positionTxt = options.positionTxt;
        this.opacityTxt = options.opacityTxt;
        this.showRoomTxt = options.showRoomTxt;
        this.companyNameTxt = options.companyNameTxt;
        this.markAllMenuTxt = options.markAllMenuTxt;

        
        this.onInited = options.onInited;
        this.onComplete = options.onComplete;

        this.resultList = [];
        this.sourceImgList = [];

        this._init();

    }

    _init() {
        loadImages(this.source, (images) => {
            this.sourceImgList = images;

            this.imgHandler = new ImgHandler({
                sourceImg: images[0]
            });
            this.resultList.push(this.imgHandler.result);

            this.dialog = new Dialog({
                imgList: images,

                markTextList: this.markTextList,
                closeBtnTxt: this.closeBtnTxt,
                saveBtnTxt: this.saveBtnTxt,
                resetBtnTxt: this.resetBtnTxt,
                confirmBtnTxt: this.confirmBtnTxt,
                cancelBtnTxt: this.cancelBtnTxt,
                rotateMenuTxt: this.rotateMenuTxt,
                turnLeftTxt: this.turnLeftTxt,
                turnRightTxt: this.turnRightTxt,
                cropMenuTxt: this.cropMenuTxt,
                scaleMenuTxt: this.scaleMenuTxt,
                markMenuTxt: this.markMenuTxt,
                colorTxt: this.colorTxt,
                positionTxt: this.positionTxt,
                opacityTxt: this.opacityTxt,
                showRoomTxt: this.showRoomTxt,
                companyNameTxt: this.companyNameTxt,
                markAllMenuTxt: this.markAllMenuTxt,

                onSaveRotate: (options, cb) => {
                    this._saveRotate(options, cb);
                },
                onSaveCrop: (options, cb) => {
                    this._saveCrop(options, cb);
                },
                onSaveScale: (options, cb) => {
                    this._saveScale(options, cb);
                },
                onSaveMark: (options, cb) => {
                    this._saveMark(options, cb);
                },
                onReset: (cb) => {
                    this._reset(cb);
                },
                onSave: (cb) => {
                    this._save(cb);
                },
                onChangeActive: (options, cb) => {
                    this._changeActive(options, cb);
                },
                onSaveMarkAll: (options, cb) => {
                    this._saveMarkAll(options, cb);
                }
            })

            this.onInited();

        }, () => {
            throw new Error('PipeImg: source图片加载失败！');
        })

    }
    _saveRotate(options, cb) {
        this.imgHandler.rotateNum = options.rotateNum;
        this.imgHandler.rotate();
        this.resultList.push(this.imgHandler.result);
        cb(this.imgHandler.result);
    }
    _saveCrop(options, cb) {
        this.imgHandler.cropW = options.cropW;
        this.imgHandler.cropH = options.cropH;
        this.imgHandler.sx = options.sx;
        this.imgHandler.sy = options.sy;
        this.imgHandler.crop();
        this.resultList.push(this.imgHandler.result);
        cb(this.imgHandler.result);
    }
    _saveScale(options, cb) {
        this.imgHandler.scaleRatio = options.scaleRatio;
        this.imgHandler.scale();
        this.resultList.push(this.imgHandler.result);
        cb(this.imgHandler.result);
    }
    _saveMark(options, cb) {
        this.imgHandler.markX = options.markX;
        this.imgHandler.markY = options.markY;
        this.imgHandler.markText = options.markText;
        this.imgHandler.markFont = options.markFont;
        this.imgHandler.markStyle = options.markStyle;
        this.imgHandler.mark();
        this.resultList.push(this.imgHandler.result);
        cb(this.imgHandler.result);
    }
    _reset(cb) {
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.resultList = this.resultList.slice(0, 1);
        this.imgHandler = new ImgHandler({
            sourceImg: this.resultList[0]
        })
        cb(this.resultList[0]);
    }
    _save(cb) {
        let max = this.maxSize * 1024;
        let base64Data = compress(this.resultList[this.resultList.length - 1], max, false);

        if (this.debug) {
            // 模拟返回
            let data = {src: base64Data};

            let img = new Image();
            img.src = data.src;
            this.resultList = [img];
            cb(data);
            this.onComplete(data);
        } else {
            let blob = base64Data2Blob(base64Data, this.mime);
            let formData = blob2FormData(blob);
            $.ajax({
                url: this.ajaxUrl,
                type: "POST",
                data: formData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: (response) => {
                    let img = new Image();
                    img.src = response.src;
                    this.resultList = [img];
                    cb(response);
                    this.onComplete(response);
                },
                error: () => {
                    alert('后台错误');
                }
            });            
        }

    }
    _saveMarkAll(options, cb) {
        
        let xPercent = options.markX / this.resultList[this.resultList.length - 1].width;
        let yPercent = options.markY / this.resultList[this.resultList.length - 1].height;
        $(this.sourceImgList).each((index, element) => {
            let imgHandler = new ImgHandler({
                sourceImg: element
            });
            imgHandler.markX = element.width * xPercent;
            imgHandler.markY = element.height * yPercent;

            imgHandler.markText = options.markText;
            imgHandler.markFont = options.markFont;
            imgHandler.markStyle = options.markStyle;

            imgHandler.mark();
            this.resultList.push(imgHandler.result);

            this._save(cb);
        })
        
    }
    _changeActive(options, cb) {
        this.imgHandler = new ImgHandler({
            sourceImg: options.activeImg
        })
        this.resultList = [this.imgHandler.result];
        cb(this.imgHandler.result);
    }


}

export { PipeImg }
