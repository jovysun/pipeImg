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
            // 必填，[{"id":"567701","url":"./images/Jellyfish.jpg"}]
            source: [],
            // 上传图片地址
            uploadUrl: '',
            // 发送文件类型，可以使二进制流'blob'可以是表单数据'formdata'，默认二进制流
            sendDataType: 'formdata',
            // 图片编辑界面类型: '0'单图编辑, '1'批量水印
            type: '0',
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
            tipTitleTxt: '提示',
            tipContentTxt: '尚未保存，是否确定离开？',
            tipConfirmBtnTxt: '确定',
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
        this.uploadUrl = options.uploadUrl;
        this.sendDataType = options.sendDataType;
        this.type = options.type;

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
        this.tipTitleTxt = options.tipTitleTxt;
        this.tipContentTxt = options.tipContentTxt;
        this.tipConfirmBtnTxt = options.tipConfirmBtnTxt;


        this.onInited = options.onInited;
        this.onComplete = options.onComplete;

        this.resultList = [];
        this.sourceImgList = [];
        this.returnJson = [];
        this.methods = [];

        this.activeIndex = 0;
        this.isSaveAll = false;
        this.finishedNum = 0;

        this._init();

    }

    _init() {
        this.returnJson = this.source;
        let urlList = this.source.map((element, index) => {
            return element.url;
        })

        loadImages(urlList, (images) => {
            this.sourceImgList = images;

            this.imgHandler = new ImgHandler({
                sourceImg: images[0]
            });
            this.resultList.push(this.imgHandler.result);

            this.dialog = new Dialog({
                debug: this.debug,
                imgList: images,
                mime: this.mime,

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
                onSave: (cb) => {
                    this._save(cb);
                },
                onChangeActive: (options, cb) => {
                    this._changeActive(options, cb);
                },
                onSaveMarkAll: (options, cb) => {
                    this._saveMarkAll(options, cb);
                }
            });


            this.onInited();
            this._executeMethods();

        }, () => {
            throw new Error('PipeImg: source load failure!');
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
    _save(cb, index) {
        index = index === undefined ? this.activeIndex : index;
        let max = this.maxSize * 1024;
        let base64Data = compress(this.resultList[this.resultList.length - 1], max, false);

        if (this.debug) {
            // 模拟返回
            let data = [{
                "picHeight": 1024,
                "picWidth": 768,
                "tempPhotoId": "5675810",
                "url": base64Data
            }];

            let img = new Image();
            img.src = data[0].url;
            this.resultList = [img];
            cb(data[0]);
            this._saveSuccess(data[0], index);
        } else {
            let sendData = base64Data2Blob(base64Data, this.mime);;
            if (this.sendDataType === 'formdata') {
                sendData = blob2FormData(sendData);
            }
            $.ajax({
                url: this.uploadUrl,
                type: "POST",
                data: sendData,
                processData: false, // 不处理数据
                contentType: false, // 不设置内容类型
                success: (response) => {
                    // response: [{"picHeight":1024,"picWidth":768,"tempPhotoId":"567581","url":"image?tid=40&amp;id=pyUpfAPGRadq&amp;cache=0&amp;lan_code=0"}]

                    let img = new Image();
                    img.src = response[0].url;
                    this.resultList = [img];
                    cb(response[0]);
                    this._saveSuccess(response[0], index);
                },
                error: () => {
                    console.log('upload failure!');
                }
            });
        }

    }

    _saveSuccess(data, index) {
        let o = {
            "id": data.tempPhotoId,
            "url": data.url,
            "picWidth": data.picWidth,
            "picHeight": data.picHeight
        };
        this.returnJson[index] = o;
        if (this.isSaveAll) {
            this.finishedNum++;
            if (this.finishedNum === this.sourceImgList.length) {
                this.onComplete(this.returnJson);
            }

        } else {
            this.onComplete(this.returnJson);
        }

    }

    _saveMarkAll(options, cb) {
        this.isSaveAll = true;

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

            this._save(cb, index);
        })

    }
    _changeActive(options, cb) {
        this.activeIndex = options.activeIndex;
        this.imgHandler = new ImgHandler({
            sourceImg: options.activeImg
        })
        this.resultList = [this.imgHandler.result];
        cb(this.imgHandler.result);
    }

    show(options) {
        this.methods.push({
            "name": "show",
            "params": options
        });
    }
    _show(options) {

        if (this.type === '1') {
            this.dialog.showModel(this.type);
        } else {
            if (options && options.selected) {
                this.dialog.showSource(options.selected);
            }
        }

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
