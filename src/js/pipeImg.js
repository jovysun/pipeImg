import $ from 'jquery';

import {
    loadImages
} from './util';
import ImgHandler from './imgHandler';
import Dialog from './dialog';

class PipeImg {

    constructor(options) {
        // 默认配置参数
        let defaults = {
            debug: false,
            // 必填，[{"id":"567701","url":"./images/Jellyfish.jpg"}]
            source: [],
            // 上传图片地址
            uploadUrl: '',
            // 发送文件类型，可以使二进制流'blob'可以是表单数据'formdata'，默认二进制流
            sendDataType: 'formdata',
            // 图片编辑界面类型: '0'单图编辑, '1'批量水印
            type: '0',
            mime: 'image/jpeg',
            // 保存图片最大体积
            maxSize: 500,

            markXPositionMargin: 15,
            markYPositionMargin: 20,
            // 文案
            markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product SourcingFocus Service Co - Product Sourcing'],
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
            tipTitleTxt: '提示',
            tipContentTxt: '尚未保存，是否确定离开？',
            tipConfirmBtnTxt: '确定',
            // 初始化完成
            onInited: () => {},
            // 上传保存完成
            onComplete: (response) => {},
            onClose: () => {}
        };

        options = Object.assign({}, defaults, options);
        this.debug = options.debug;
        this.source = options.source;
        if (!this.source) {
            throw new Error('PipeImg: source is not found!');
        }
        if (!(Array.isArray(this.source) || typeof this.source === 'string')) {
            throw new Error('PipeImg: source类型错误，只能为字符串或者数组！');
        }
        this.uploadUrl = options.uploadUrl;
        this.sendDataType = options.sendDataType;
        this.type = options.type;

        this.mime = options.mime;
        this.maxSize = options.maxSize;

        this.markXPositionMargin = options.markXPositionMargin;
        this.markYPositionMargin = options.markYPositionMargin;
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
        this.tipTitleTxt = options.tipTitleTxt;
        this.tipContentTxt = options.tipContentTxt;
        this.tipConfirmBtnTxt = options.tipConfirmBtnTxt;


        this.onInited = options.onInited;
        this.onComplete = options.onComplete;
        this.onClose = options.onClose;

        this.resultList = [];
        this.sourceImgList = [];
        this.returnJson = [];
        this.methods = [];

        this.activeIndex = 0;

        this._init();

    }

    _init() {
        this.returnJson = this.source;
        let urlList = this.source.map((element, index) => {
            return element.url;
        })

        // 解决加载完成及跨域问题
        loadImages(urlList, (images) => {
            this.sourceImgList = images;




            this.onInited();
            this._executeMethods();

        }, () => {
            throw new Error('PipeImg: source load failure!');
        })

    }
    _show(options) {
        if (options && options.selected) {
            this.activeIndex = options.selected;             
        }

        this.imgHandler = new ImgHandler({
            sourceImg: this.sourceImgList[this.activeIndex]
        });
        this.resultList.push(this.imgHandler.result);
        
        this.dialog = new Dialog({
            debug: this.debug,
            imgList: this.sourceImgList,
            activeIndex: this.activeIndex,
            type: this.type,
            mime: this.mime,

            markXPositionMargin: this.markXPositionMargin,
            markYPositionMargin: this.markYPositionMargin,
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
            tipTitleTxt: this.tipTitleTxt,
            tipContentTxt: this.tipContentTxt,
            tipConfirmBtnTxt: this.tipConfirmBtnTxt,

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
            onSave: (cb, index) => {
                this._save(cb, index);
            },
            onChangeActive: (options, cb) => {
                this._changeActive(options, cb);
            },
            onSaveMarkAll: (options, cb) => {
                this._saveMarkAll(options, cb);
            },
            onClose: () => {
                this.onClose();
            },
            onComplete: (result) => {
                this.onComplete(result);
            }
        });
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
    _save(cb, index) {
        let compressData = this.imgHandler.compress();
        let sendData = this.sendDataType === 'blob' ? compressData.blob : compressData.formdata;

        if (this.debug) {
            // 模拟返回
            setTimeout(() => {
                // let response = [{"picHeight":600,"picWidth":800,"tempPhotoId":"573761","url":"image?tid=40&amp;id=gCfpAUFcYRlB&amp;cache=0&amp;lan_code=0"}];
                let response = [{
                    "picHeight": 600,
                    "picWidth": 800,
                    "tempPhotoId": "573761",
                    "url": compressData.base64
                }];
                
                this._saveSuccess(response[0], index, cb);
            }, 1000);
        } else {
            $.ajax({
                url: this.uploadUrl,
                type: "POST",
                data: sendData,
                processData: false,
                contentType: false,
                success: (response) => {
                    this._saveSuccess(response[0], index, cb);
                },
                error: () => {
                    window.console && console.log('network-error: upload failure!');
                }
            });
        }

    }

    _saveSuccess(data, index, cb) {
        data.url = data.url.replace("&amp;", "&");
        let img = new Image();
        img.src = data.url;
        this.resultList = [img];
        this.sourceImgList[index] = img;
        
        let o = {
            "id": data.tempPhotoId,
            "url": data.url,
            "picWidth": data.picWidth,
            "picHeight": data.picHeight
        };
        this.returnJson[index] = o;
        cb && cb(this.returnJson);      
    }
    _changeActive(options, cb) {
        this.activeIndex = options.activeIndex;
        this.imgHandler = new ImgHandler({
            sourceImg: options.activeImg
        })
        this.resultList = [this.imgHandler.result];
        cb && cb(this.imgHandler.result);
    }

    show(options) {
        this.methods.push({
            "name": "show",
            "params": options
        });
    }

    _executeMethods() {
        this.methods.forEach(element => {
            this['_' + element.name](element.params);
        });
        this.methods = [];
    }


}

export {
    PipeImg
}
