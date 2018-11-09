import {
    getBase64Size,
    compress,
    base64Data2Blob,
    blob2FormData,
    loadImages,
    getCanvas
} from './util';
import {
    ImgHandler
} from './imgHandler';
import {
    DragBox
} from './dragBox';
import tpl from './pipeImg.tpl';
import { Dialog } from './dialog';

class PipeImg {

    constructor(options) {

        // 默认配置参数
        let defaults = {
            source: ['./assets/Jellyfish.jpg'],
            mime: 'image/jpeg',
            maxSize: 500,
            template: tpl,
            markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing']
        };


        options = Object.assign({}, defaults, options);
        this.source = options.source;
        this.mime = options.mime;
        this.maxSize = options.maxSize;
        this.template = options.template;
        this.markTextList = options.markTextList;


        this._init();

    }

    _init() {
        // this.dialog = new Dialog();

        let html = '<div class="pipe-dialog J-pipe-dialog" onselectstart="return false" ondragstart="return false"><div class="pipe-mask J-pipe-mask"></div>'+ this. template +'</div>';
        $('body').append(html);
        
        this.$el = $('.J-pipe-dialog');
        this.$pipeWrapper = this.$el.find('.J-pipe-wrapper');


        // 全局变量
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.resultList = [];

        this.imgList = [];

        this.imgBoxHeight = this.$el.find('.J-img-box').height();
        this.imgBoxWidth = this.$el.find('.J-img-box').width();
        this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;


        loadImages(this.source, (images) => {
            this._loadImagesSuccess(images);

        })

    }
    _loadImagesSuccess(images) {
        // 初始化底部缩略图
        let imgsHtml = '';
        // 为了显示顺序与配置一致
        this.imgList = images.reverse();
        $(this.imgList).each((index, element) => {
            let thumbnailHtml = '<a class="img-thumbnail ' + (index === 0 ? 'active' : '') + ' J-img-thumbnail" href="javascript:void(0)">' +
                '<img src="' + element.src + '">' +
                '</a>';
            imgsHtml += thumbnailHtml;

        });
        this.$el.find('.J-imgs-thumbnail').html(imgsHtml);

        // 待编辑图片
        this.imgHandler = new ImgHandler({
            sourceImg: images[0]
        });

        this.resultList.push(this.imgHandler.result);

        this._refresh();

        // 初始化裁剪框
        this.cropBox = new DragBox({
            ele: '.J-crop-box .J-source',
            hasLight: true,
            onDragPoint: (data) => {
                this._showSize(data.width * this.activeData.ratio, data.height * this.activeData.ratio);
            }
        });
        // 初始化水印框
        this.markBox = new DragBox({
            ele: '.J-mark-box .J-source',
            fixRatio: false,
            markText: 'producttest.en.made-in-china.com',
            onDragComplete: (left, top) => {
                this.markX = left * this.activeData.ratio;
                this.markY = top * this.activeData.ratio;
            },
            onDragPoint: (boxData) => {
                console.log(boxData.height);
                this.markBox.$dragBox.find('.J-mark-txt').css({
                    'font-size': boxData.height / 1.5
                })
                this.markBox.$dragBox.css({
                    width: this.markBox.$dragBox.find('.J-mark-txt').outerWidth()
                })
            } 
        });
        // 初始化批量水印框
        this.markAllBox = new DragBox({
            ele: '.J-mark-box-all .J-source',
            markText: 'producttest.en.made-in-china.com',
            onDragComplete: (left, top) => {
                this.markXAll = left * this.activeData.ratio;
                this.markYAll = top * this.activeData.ratio;
            },
            onDragPoint: (boxData) => {
                console.log(boxData.height);
                this.markAllBox.$dragBox.find('.J-mark-txt').css({
                    'font-size': boxData.height / 1.5
                })
                this.markAllBox.$dragBox.css({
                    width: this.markAllBox.$dragBox.find('.J-mark-txt').outerWidth()
                })
            } 
        });
        // 事件绑定
        this._bind();
    }

    _bind() {
        // 切换编辑图片
        this.$el.find('.J-imgs-thumbnail').on('click', '.J-img-thumbnail', (e) => {

            let $thumbnail = $(e.target).parent();
            $thumbnail.addClass('active').siblings().removeClass('active');

            this.$el.find('.J-source').attr('src', $thumbnail.find('img').attr('src'));
            let targetImg = this.$el.find('.J-source:first').get(0);


            this.imgHandler = new ImgHandler({
                sourceImg: targetImg
            })

            this.resultList = [this.imgHandler.result];

            this._refresh();
            this._initPanel();
        })

        // 菜单切换
        this.$el.find('.J-menu-item').on('click', (e) => {
            let $item = $(e.target).parent();
            let index = $item.index();
            let oldActiveIndex = $item.parent().find('.active:first').index();
            $item.addClass('active').siblings().removeClass('active');
            this.$el.find('.J-panel').eq(index).addClass('active').siblings().removeClass('active');

            // 离开旋转，裁剪，缩放面板进行保存
            switch (oldActiveIndex) {
                case 0:
                    this._saveRotate();
                    break;
                case 1:
                    this._saveCrop();
                    break;
                case 2:
                    this._saveScale();
                    break;
                default:
                    break;
            }

            // 进入裁剪
            if (index === 1) {
                this._initCrop();
            }
            // 进入缩放
            if (index === 2) {
                this._initScale();
            }
            // 进入水印
            if (index === 3) {
                this._initMark();
            }

            // 进入批量水印
            if (index === 4) {
                this._reset();
                this._initMarkAll();
            }

        })


        // 旋转++++++++++++++++
        // 逆时针旋转
        this.$el.find('.J-btn-rotate-left').on('click', () => {
            this._getRotateNum(-1);
            this._updateRotate();
        })
        // 顺时针旋转
        this.$el.find('.J-btn-rotate-right').on('click', () => {
            this._getRotateNum(1);
            this._updateRotate();
        })
        // 裁剪++++++++++++
        let $cropPanel = this.$el.find('.J-crop-panel');
        $cropPanel.find('.J-num-width').on('input', (e) => {
            this.cropBox.width = $(e.target).val() / this.activeData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.height = this.cropBox.width / this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        $cropPanel.find('.J-num-height').on('input', (e) => {
            this.cropBox.height = $(e.target).val() / this.activeData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.width = this.cropBox.height * this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        $cropPanel.find('.J-fix-ratio').on('change', (e) => {
            this.cropBox.fixRatio = !this.cropBox.fixRatio;
        })

        // 缩放++++++++++++++
        let $scalePanel = this.$el.find('.J-scale-panel');
        $scalePanel.find('.J-scale-range').on('input', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            this.scaleRatio = parseInt($this.val()) / max;
            this._updateScale();
        })
        $scalePanel.find('.J-num-width').on('input', (e) => {
            let $this = $(e.target);
            this.scaleRatio = parseInt($this.val()) / this.activeData.w0;
            this._updateScale();
        })
        $scalePanel.find('.J-num-height').on('input', (e) => {
            let $this = $(e.target);
            this.scaleRatio = parseInt($this.val()) / this.activeData.h0;
            this._updateScale();
        })

        // 水印++++++++++++++
        let $markPanel = this.$el.find('.J-mark-panel');
        $markPanel.find('[name=color],[name=opacity]').on('input', () => {
            this._updateMark();
        })
        $markPanel.find('[name=markTxt]').on('change', () => {
            this._updateMark();
        })
        $markPanel.find('[name=position]').on('change', () => {
            this._updateMark();
        })
        // 水印确定
        $markPanel.find('.J-button-confirm').on('click', () => {
            this._saveMark();
        })
        // 水印取消
        this.$el.find('.J-button-cancel').on('click', () => {
            this._goHome();
        })
        // 批量水印++++++++++++++
        let $markAllPanel = this.$el.find('.J-mark-all-panel');
        $markAllPanel.find('[name=colorAll],[name=opacityAll]').on('input', () => {
            this._updateMarkAll();
        })
        $markAllPanel.find('[name=markTxtAll]').on('change', () => {
            this._updateMarkAll();
        })
        $markAllPanel.find('[name=positionAll]').on('change', () => {
            this._updateMarkAll();
        })
        // 批量水印确定
        $markAllPanel.find('.J-button-confirm-all').on('click', () => {

            let xPercent = this.markXAll / this.resultList[this.resultList.length - 1].width;
            let yPercent = this.markYAll / this.resultList[this.resultList.length - 1].height;
            $(this.imgList).each((index, element) => {
                let imgHandler = new ImgHandler({
                    sourceImg: element
                });
                imgHandler.markX = element.width * xPercent;
                imgHandler.markY = element.height * yPercent;


                imgHandler.markText = this.markTextAll;
                imgHandler.markFont = this.markFontAll;
                imgHandler.markStyle = this.markStyleAll;

                imgHandler.mark();

                this.save(imgHandler.result);
            })

            this.destory();
        })

        // 重置
        this.$el.find('.J-button-reset').on('click', () => {
            this._reset();
        })
        // 保存
        this.$el.find('.J-button-save').on('click', (e) => {
            let panelIndex = $(e.target).parents('.J-panel').index();
            switch (panelIndex) {
                case 0:
                    this._saveRotate();
                    break;
                case 1:
                    this._saveCrop();
                    break;
                case 2:
                    this._saveScale();
                default:
                    break;
            }

            let activeImg = this.activeData.cvs;
            let base64Data = activeImg.toDataURL(this.mime, 1.0);
            let $activeThumbnail = this.$el.find('.J-img-thumbnail.active');
            // 更新底部缩略图显示
            $activeThumbnail.find('img').attr('src', base64Data);
            // 更新全局数据
            this.resultList = [activeImg];
            this.imgList[$activeThumbnail.index()] = activeImg;

            this.save(activeImg);
        })
        // 关闭
        this.$el.find('.J-button-close').on('click', (e) => {
            this.destory();
        })
        // 禁用鼠标右击菜单
        this.$el.on('contextmenu', (e) => {
            return false;
        })

    }
    _initPanel() {
        this._initCrop();
        this._initScale();
        this._initMark();
        this._initMarkAll();
    }
    _goHome() {
        this.$el.find('.J-menu-item:first').click();
    }

    _initRotate() {
        this.rotateNum = 0;
    }
    _updateRotate() {

        this.$el.find('.J-source').css({
            'transform': `rotate(${this.rotateNum * 90}deg)`
        });

        if (this.rotateNum === 1 || this.rotateNum === 3) {
            // 旋转类90度后
            if (1 / this.activeData.imgRatio < this.imgBoxRatio) {
                this.$el.find('.J-source').css({
                    'width': this.imgBoxHeight,
                    'height': 'auto'
                });
            } else {
                this.$el.find('.J-source').css({
                    'width': 'auto',
                    'height': this.imgBoxWidth
                });
            }

        } else {

            if (this.activeData.imgRatio < this.imgBoxRatio) {
                this.$el.find('.J-source').css({
                    'width': 'auto',
                    'height': this.imgBoxHeight
                });
            } else {
                this.$el.find('.J-source').css({
                    'width': this.imgBoxWidth,
                    'height': 'auto'
                });
            }
        }

    }
    _saveRotate() {
        this.imgHandler.rotateNum = this.rotateNum;
        this.imgHandler.rotate();
        this.imgHandler.rotateNum = this.rotateNum = 0;

        this.resultList.push(this.imgHandler.result);

        this._refresh();

    }
    _initCrop() {
        let $cropPanel = this.$el.find('.J-crop-panel');

        this.cropBox.isFixed = $cropPanel.find('.J-fix-ratio').prop('checked');
        this.cropBox.width = $cropPanel.find('.J-num-width').val() / this.activeData.ratio;
        this.cropBox.height = $cropPanel.find('.J-num-height').val() / this.activeData.ratio;
    }
    _updateCrop() {
        this.cropBox.update();
    }
    _saveCrop() {
        this.sx = this.cropBox.boxData.left * this.activeData.ratio;
        this.sy = this.cropBox.boxData.top * this.activeData.ratio;
        this.cropW = this.cropBox.boxData.width * this.activeData.ratio;
        this.cropH = this.cropBox.boxData.height * this.activeData.ratio;

        this.imgHandler.cropW = this.cropW;
        this.imgHandler.cropH = this.cropH;
        this.imgHandler.sx = this.sx;
        this.imgHandler.sy = this.sy;
        this.imgHandler.crop();

        this.resultList.push(this.imgHandler.result);

        this._refresh();
    }
    _initScale() {
        let $scalePanel = this.$el.find('.J-scale-panel');
        let $scaleImgBox = $scalePanel.find('.J-img-box');
        let $scaleRange = $scalePanel.find('.J-scale-range');

        // 去除预览图的缩放显示
        $scaleImgBox.find('.J-source').css({
            width: 'auto',
            height: 'auto'
        })
        // 初始化滑块值
        $scaleRange.val($scaleRange.attr('max'));

        this.scaleRatio = 1;
    }
    _updateScale() {
        let scaleRatio = this.scaleRatio;

        let $scalePanel = this.$el.find('.J-scale-panel');
        let $scaleRange = $scalePanel.find('.J-scale-range');
        let $scaleNumWidth = $scalePanel.find('.J-num-width');
        let $scaleNumHeight = $scalePanel.find('.J-num-height');
        let max = parseInt($scaleRange.attr('max'));

        if ($scaleNumWidth.val() != this.activeData.w0 * scaleRatio) {
            $scaleNumWidth.val(this.activeData.w0 * scaleRatio);
        }
        if ($scaleNumHeight.val() != this.activeData.h0 * scaleRatio) {
            $scaleNumHeight.val(this.activeData.h0 * scaleRatio);
        }
        if ($scaleRange.val() != max * scaleRatio) {
            $scaleRange.val(max * scaleRatio);
        }


        $('.J-source').css({
            'transform': `scale(${this.scaleRatio})`
        });
    }
    _saveScale() {
        this.imgHandler.scaleRatio = this.scaleRatio;
        this.imgHandler.scale();
        this.imgHandler.scaleRatio = this.scaleRatio = 0;

        this.resultList.push(this.imgHandler.result);

        this._refresh();

    }
    _initMark() {
        let $markPanel = this.$el.find('.J-mark-panel');
        $markPanel.find('.J-color').eq(1).prop('checked', true);
        $markPanel.find('.J-position').eq(0).prop('checked', true);
        $markPanel.find('.J-opacity').val(0.8);
        $markPanel.find('.J-markTxt option:first').prop('selected', true);
        
        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = 340 < dragBoxWrapperWidth ? 340 : dragBoxWrapperWidth;
        let dragBoxHeight = 35 < dragBoxWrapperHeight ? 35 : dragBoxWrapperHeight;

        this.markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
        this.markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
        this.markBox.$dragBox.css({
            left: this.markX / this.activeData.ratio,
            top: this.markY / this.activeData.ratio,
            width: this.markBox.$dragBox.find('.J-mark-txt').outerWidth(),
            height: this.markBox.$dragBox.find('.J-mark-txt').outerHeight()
        })


    }
    _updateMark() {
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $markPanel = this.$el.find('.J-mark-panel');
        let colorVal = $markPanel.find('.J-color:checked').val();
        let positionVal = $markPanel.find('.J-position:checked').val();
        let opacityVal = $markPanel.find('.J-opacity').val();
        let markTxtVal = $markPanel.find('.J-markTxt').val();

        let markStyle = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            markStyle = `rgba(0, 0, 0, ${opacityVal})`;
        }

        this.markFont = 20 * this.activeData.ratio + 'px microsoft yahei';
        this.markStyle = markStyle;
        this.markText = this.markTextList[markTxtVal];

        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = this.markBox.$dragBox.outerWidth() < dragBoxWrapperWidth ? this.markBox.$dragBox.outerWidth() : dragBoxWrapperWidth;
        let dragBoxHeight = this.markBox.$dragBox.outerHeight() < dragBoxWrapperHeight ? this.markBox.$dragBox.outerHeight() : dragBoxWrapperHeight;

        switch (POSITION[positionVal]) {
            case 'center':
                this.markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
                this.markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
                break;
            case 'upLeft':
                this.markX = 0;
                this.markY = 0;
                break;
            case 'upRight':
                this.markX = (dragBoxWrapperWidth - dragBoxWidth) * this.activeData.ratio;
                this.markY = 0;
                break;
            case 'downLeft':
                this.markX = 0;
                this.markY = (dragBoxWrapperHeight - dragBoxHeight) * this.activeData.ratio;
                break;
            case 'downRight':
                this.markX = (dragBoxWrapperWidth - dragBoxWidth) * this.activeData.ratio;
                this.markY = (dragBoxWrapperHeight - dragBoxHeight) * this.activeData.ratio;
                break;
            default:
                break;
        }

        $markPanel.find('.J-mark-txt').text(this.markText).css({
            color: this.markStyle
        });
        this.markBox.$dragBox.css({
            left: this.markX / this.activeData.ratio,
            top: this.markY / this.activeData.ratio,
            width: this.markBox.$dragBox.find('.J-mark-txt').outerWidth(),
            height: this.markBox.$dragBox.find('.J-mark-txt').outerHeight()
        })
    }
    _saveMark() {
        this.imgHandler.markX = this.markX;
        this.imgHandler.markY = this.markY;
        this.imgHandler.markText = this.markText;
        this.imgHandler.markFont = this.markFont;
        this.imgHandler.markStyle = this.markStyle;
        this.imgHandler.mark();

        this.resultList.push(this.imgHandler.result);

        this._refresh();

        this._goHome();
    }
    _initMarkAll() {
        let $markPanel = this.$el.find('.J-mark-all-panel');
        $markPanel.find('.J-color').eq(1).prop('checked', true);
        $markPanel.find('.J-position').eq(0).prop('checked', true);
        $markPanel.find('.J-opacity').val(0.8);
        $markPanel.find('.J-markTxt option:first').prop('selected', true);

        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = 340 < dragBoxWrapperWidth ? 340 : dragBoxWrapperWidth;
        let dragBoxHeight = 35 < dragBoxWrapperHeight ? 35 : dragBoxWrapperHeight;

        this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
        this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
        this.markAllBox.$dragBox.css({
            left: this.markXAll / this.activeData.ratio,
            top: this.markYAll / this.activeData.ratio,
            width: this.markAllBox.$dragBox.find('.J-mark-txt').outerWidth(),
            height: this.markAllBox.$dragBox.find('.J-mark-txt').outerHeight()
        })
    }
    _updateMarkAll() {
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $markPanel = this.$el.find('.J-mark-all-panel');
        let colorVal = $markPanel.find('.J-color:checked').val();
        let positionVal = $markPanel.find('.J-position:checked').val();
        let opacityVal = $markPanel.find('.J-opacity').val();
        let markTxtVal = $markPanel.find('.J-markTxt').val();

        let markStyle = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            markStyle = `rgba(0, 0, 0, ${opacityVal})`;
        }

        this.markFontAll = 20 * this.activeData.ratio + 'px microsoft yahei';
        this.markStyleAll = markStyle;
        this.markTextAll = this.markTextList[markTxtVal];

        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = this.markAllBox.$dragBox.outerWidth() < dragBoxWrapperWidth ? this.markAllBox.$dragBox.outerWidth() : dragBoxWrapperWidth;
        let dragBoxHeight = this.markAllBox.$dragBox.outerHeight() < dragBoxWrapperHeight ? this.markAllBox.$dragBox.outerHeight() : dragBoxWrapperHeight;


        switch (POSITION[positionVal]) {
            case 'center':
                this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
                this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
                break;
            case 'upLeft':
                this.markXAll = 0;
                this.markYAll = 0;
                break;
            case 'upRight':
                this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) * this.activeData.ratio;
                this.markYAll = 0;
                break;
            case 'downLeft':
                this.markXAll = 0;
                this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) * this.activeData.ratio;
                break;
            case 'downRight':
                this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) * this.activeData.ratio;
                this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) * this.activeData.ratio;
                break;
            default:
                break;
        }

        $markPanel.find('.J-mark-txt').text(this.markTextAll).css({
            color: this.markStyleAll
        });
        this.markAllBox.$dragBox.css({
            left: this.markXAll / this.activeData.ratio,
            top: this.markYAll / this.activeData.ratio,
            width: this.markAllBox.$dragBox.find('.J-mark-txt').outerWidth(),
            height: this.markAllBox.$dragBox.find('.J-mark-txt').outerHeight()
        })
    }
    _showSize(w0, h0) {
        // 显示活动图片原始宽高
        let $numWidth = this.$el.find('.J-num-width');
        let $numHeight = this.$el.find('.J-num-height');
        $numWidth.each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $numWidth.val(w0);
            } else {
                $numWidth.html(w0);
            }
        })
        $numHeight.each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $numHeight.val(h0);
            } else {
                $numHeight.html(h0);
            }
        })
    }
    _refresh() {

        this._updateActiveData();

        let base64Data = this.activeData.cvs.toDataURL(this.mime, 1.0);

        if (this.$el.find('.J-img-box').find('.J-source').length > 0) {
            this.$el.find('.J-img-box').find('.J-source').attr('src', base64Data);
        } else {
            this.$el.find('.J-img-box').append(`<img class="J-source" src="${base64Data}">`);
        }

        this.$el.find('.J-source').removeAttr('style');
        this.cropBox && (this.cropBox.boxEl.style = '');

        this.$el.find('.J-img-box').find('.J-source').css({
            width: this.activeData.w1,
            height: this.activeData.h1
        })

        this._showSize(this.activeData.w0, this.activeData.h0);

    }
    // 更新正在编辑图片的数据
    _updateActiveData() {

        let targetImg = this.resultList[this.resultList.length - 1];
        let w0 = targetImg.width;
        let h0 = targetImg.height;
        if (targetImg.nodeName.toLowerCase() === 'img') {
            w0 = targetImg.naturalWidth;
            h0 = targetImg.naturalHeight;
        }

        let imgRatio = w0 / h0;
        let h1;
        let w1;
        let ratio;
        if (imgRatio < this.imgBoxRatio) {
            h1 = this.imgBoxHeight;
            // w1 = 'auto';
            w1 = h1 * imgRatio;
            ratio = h0 / h1;
        } else {
            w1 = this.imgBoxWidth;
            // h1 = 'auto';
            h1 = w1 / imgRatio;
            ratio = w0 / w1;
        }

        this.activeData = {
            w0: w0,
            h0: h0,
            w1: w1,
            h1: h1,
            ratio: ratio,
            imgRatio: imgRatio,
            cvs: targetImg
        }
    }
    _getRotateNum(direction) {
        this.rotateNum += direction;
        if (this.rotateNum > 3) {
            this.rotateNum = 0;
        }
        if (this.rotateNum < 0) {
            this.rotateNum = 3;
        }
    }

    _reset() {
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.resultList = this.resultList.slice(0, 1);
        this.imgHandler = new ImgHandler({
            sourceImg: this.resultList[0]
        })

        this._refresh();
    }
    save(cvs) {
        let max = this.maxSize * 1024;
        let data = this._compress(cvs, max, false);
        // 模拟处理后图片展示
        $('#J-preview-container').append($('<img>').attr('src', data));

        this._getFormData(data);
    }
    _getFormData(data) {

        let blob = base64Data2Blob(data, this.mime);
        // console.log('end compress: ' + Math.ceil(blob.size / 1024));
        let formData = blob2FormData(blob);

        $.ajax({
            url: "/saveFile",
            type: "POST",
            data: formData,
            processData: false, // 不处理数据
            contentType: false // 不设置内容类型
        });
    }
    // 只对'image/jpeg'格式有效
    _compress(cvs, max, isSimple) {
        let quality = 1;
        let minWH = 800;
        let scaleRatio = 0.9;
        let qualityStep = 0.1;
        // 质量压缩只支持'image/jpeg'，'image/webp'(chrome支持)
        let qualityType = 'image/jpeg';

        let width = cvs.width;
        let height = cvs.height;
        let cvsRatio = width / height;
        let data = cvs.toDataURL(qualityType, 1.0);
        let size0 = getBase64Size(data);
        console.log('start compress: ' + Math.ceil(size0 / 1024));
        if (isSimple) {
            while (size0 > max) {
                quality = Math.floor(max / size0 * 10) / 10;
                data = cvs.toDataURL(qualityType, quality);
                size0 = getBase64Size(data);
            }

        } else {
            // 优先缩放
            while (size0 > max && (width > minWH || height > minWH)) {
                let newWidth, newHeight;
                if (cvsRatio > 1) {
                    newWidth = width * scaleRatio > minWH ? width * scaleRatio : minWH;
                    newHeight = newWidth / cvsRatio;
                } else {
                    newHeight = height * scaleRatio > minWH ? height * scaleRatio : minWH;
                    newWidth = newHeight * cvsRatio;
                }

                let canvas = getCanvas(newWidth, newHeight),
                    ctx = canvas.getContext("2d");
                ctx.drawImage(cvs, 0, 0, newWidth, newHeight);

                data = canvas.toDataURL(this.mime, 1.0);
                size0 = getBase64Size(data);
                width = newWidth;
                height = newHeight;
                cvs = canvas;
            }
            // 降低质量
            while (size0 > max) {
                quality -= qualityStep;
                data = cvs.toDataURL(qualityType, quality);
                size0 = getBase64Size(data);
            }
        }
        console.log('end compress: ' + Math.ceil(size0 / 1024));
        return data;
    }
    destory() {
        this.$el.remove();
    }
    showDialog() {
        this.$el.show();
    }
    hideDialog() {
        this.$el.hide();
    }

}


if (typeof module !== "undefined" && module.exports) {
    module.exports = PipeImg;
} else if (typeof define === "function" && define.amd) {
    define(function () {
        return PipeImg;
    });
} else {
    window.PipeImg = PipeImg;
}
