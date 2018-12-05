import $ from 'jquery';
import template from 'template';

import {
    drag,
    loadImage
} from './util';
import {
    DragBox
} from './dragBox';
import tpl from './dialog.tpl';
import ThinSelect from './thinSelect';

class Dialog {

    constructor(options) {

        // 默认配置参数
        let defaults = {
            debug: false,
            imgList: [],
            template: tpl,
            mime: 'image/jpeg',
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

            onSaveRotate: (args, cb) => {},
            onSaveCrop: (args, cb) => {},
            onSaveScale: (args, cb) => {},
            onSaveMark: (args, cb) => {},
            onReset: (cb) => {},
            onSave: (cb) => {},
            onChangeActive: (options, cb) => {},
            onSaveMarkAll: (cb) => {}

        };


        options = Object.assign({}, defaults, options);

        this.debug = options.debug;
        this.imgList = options.imgList;
        this.template = options.template;
        this.mime = options.mime;
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

        this.onSaveRotate = options.onSaveRotate;
        this.onSaveCrop = options.onSaveCrop;
        this.onSaveScale = options.onSaveScale;
        this.onSaveMark = options.onSaveMark;
        this.onReset = options.onReset;
        this.onSave = options.onSave;
        this.onChangeActive = options.onChangeActive;
        this.onSaveMarkAll = options.onSaveMarkAll;

        this._init();

    }

    _init() {
        let templateHtml = template(this.template, {
            imgList: this.imgList,

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
            tipConfirmBtnTxt: this.tipConfirmBtnTxt
        });

        let html = '<div class="pipeImg-dialog J-pipe-dialog" onselectstart="return false" ondragstart="return false"><div class="pipe-mask J-pipe-mask"></div>' + templateHtml + '</div>';
        $('body').append(html);

        this.$el = $('.J-pipe-dialog');
        this.$pipeWrapper = this.$el.find('.J-pipe-wrapper');

        // 通用按钮
        this.$btnClose = this.$el.find('.J-button-close');
        this.$btnSave = this.$el.find('.J-button-save');
        this.$btnReset = this.$el.find('.J-button-reset');
        this.$btnConfirm = this.$el.find('.J-button-confirm');
        this.$btnCancel = this.$el.find('.J-button-cancel');
        this.$btnSaveAll = this.$el.find('.J-button-confirm-all');
        this.$btnCancelAll = this.$el.find('.J-button-cancel-all');

        // 模块按钮
        // 旋转
        this.$btnRotateLeft = this.$el.find('.J-btn-rotate-left');
        this.$btnRotateRight = this.$el.find('.J-btn-rotate-right');
        // 裁剪
        let $cropPanel = this.$el.find('.J-crop-panel');
        this.$inputCropWidth = $cropPanel.find('.J-num-width');
        this.$inputCropHeight = $cropPanel.find('.J-num-height');
        this.$radioCropFix = $cropPanel.find('.J-fix-ratio');
        // 缩放
        this.$scalePanel = this.$el.find('.J-scale-panel');
        this.$inputScaleWidth = this.$scalePanel.find('.J-num-width');
        this.$inputScaleHeight = this.$scalePanel.find('.J-num-height');
        this.$rangeScaleRatio = this.$scalePanel.find('.J-scale-range');
        // 添加水印
        this.$markPanel = this.$el.find('.J-mark-panel');
        this.$radioMarkColor = this.$markPanel.find('.J-color');
        this.$radioMarkPosition = this.$markPanel.find('.J-position');
        this.$rangeMarkOpacity = this.$markPanel.find('.J-opacity');
        this.$selectMarkTxt = this.$markPanel.find('.J-select-mark');
        // 批量添加水印
        this.$markAllPanel = this.$el.find('.J-mark-all-panel');
        this.$radioMarkAllColor = this.$markAllPanel.find('.J-color');
        this.$radioMarkAllPosition = this.$markAllPanel.find('.J-position');
        this.$rangeMarkAllOpacity = this.$markAllPanel.find('.J-opacity');
        this.$selectMarkAllTxt = this.$markAllPanel.find('.J-select-mark');

        this.$buttons = this.$el.find('.J-button-save, .J-button-reset, .J-button-confirm, .J-button-cancel, .J-button-confirm-all, .J-button-cancel-all');

        // 全局变量
        this.isChange = false;
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.imgBoxHeight = this.$el.find('.J-img-box').height();
        this.imgBoxWidth = this.$el.find('.J-img-box').width();
        this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;

        this.activeImg = this.imgList[0];



        // 初始化裁剪框
        this.cropBox = new DragBox({
            el: $cropPanel.find('.J-source'),
            hasLight: true,
            onDragPoint: (data) => {
                this._showSize(data.width * this.activeData.ratio, data.height * this.activeData.ratio);
                this._updateIsChange(true);
            }
        });
        // 初始化缩放
        let $scaleImgWrapper = this.$scalePanel.find('.J-scale-img-wrapper');
        let imgEl = this.$scalePanel.find('.J-source').get(0);
        drag(imgEl, imgEl, $scaleImgWrapper.get(0));
        // 初始化水印框
        this.markBox = new DragBox({
            el: this.$markPanel.find('.J-source'),
            fixRatio: true,
            markText: this.markTextList[0],
            onDragComplete: (left, top) => {
                this.$markPanel.find('.J-position').prop('checked', false);
                this._updateIsChange(true);
            },
            onDragPoint: (boxData) => {
                this.$markPanel.find('.J-mark-txt').css({
                    'font-size': Math.round(parseInt(this.markBox.$dragBox.css('height')) / this.markLineHeight0 * this.markFontSize0)
                });
                this.markBox.$dragBox.find('.J-mark-txt').css({
                    'display': 'block'
                });
            }
        });
        // 初始化批量水印框
        this.markAllBox = new DragBox({
            el: this.$markAllPanel.find('.J-source'),
            fixRatio: true,
            markText: this.markTextList[0],
            onDragComplete: (left, top) => {
                this.$markAllPanel.find('.J-position').prop('checked', false);
                this._updateIsChange(true);
            },
            onDragPoint: (boxData) => {
                this.$markAllPanel.find('.J-mark-txt').css({
                    'font-size': Math.round(parseInt(this.markAllBox.$dragBox.css('height')) / this.markLineHeight0 * this.markFontSize0)
                });
                this.markAllBox.$dragBox.find('.J-mark-txt').css({
                    'display': 'block'
                });
            }
        });


        this._refresh();

        this.markSelects = ThinSelect.use(this.$el.find('.J-select-mark'));

        this._setMarkPosition();
        this._setMarkPosition('all');

        this.markFontSize0 = parseInt(this.$el.find('.J-mark-txt').css('font-size'));
        this.markLineHeight0 = parseInt(this.$el.find('.J-mark-txt').css('line-height'));

        this._bind();
    }
    _bind() {
        let that = this;
        // 切换编辑图片
        this.$el.find('.J-pipe-footer').on('click', '.J-img-thumbnail', function(e) {
            that._confirm(() => {
                let $thumbnail = $(this);
                $thumbnail.addClass('active').siblings().removeClass('active');

                let $thumbnailImg = $thumbnail.find('img');
                that.$el.find('.J-panel').not('.J-mark-all-panel').find('.J-source').attr('src', $thumbnailImg.attr('src'));

                that._updateActiveImg($thumbnail.index());
                that._goHome();
                that._initData();
                that._updateIsChange(false);
            })


        })
        // 批量水印切换编辑图片
        this.$markAllPanel.on('click', '.J-img-thumbnail', (e) => {

            let $thumbnail = $(e.target).parent();
            $thumbnail.addClass('active').siblings().removeClass('active');

            let $thumbnailImg = $thumbnail.find('img');
            this.$markAllPanel.find('.J-source').attr('src', $thumbnailImg.attr('src'));

            this._updateActiveImg($thumbnail.index());
            this._setMarkPosition('all');
            this._initData();

        })

        // 菜单切换
        this.$el.find('.J-menu-btn').on('click', function (e) {
            that._confirm(() => {

                let $item = $(this).parent();
                let index = $item.index();
                let oldActiveIndex = $item.parent().find('.active:first').index();


                let $thumbnail = that.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');
                that._updateActiveImg($thumbnail.index());


                that.showModel('0');
                that.showMenu(index);

                // 若有编辑操作，离开旋转，裁剪，缩放面板进行保存
                if (that.isChange) {
                    switch (oldActiveIndex) {
                        case 0:
                            that._saveRotate();
                            break;
                        case 1:
                            that._saveCrop();
                            break;
                        case 2:
                            that._saveScale();
                            break;
                        default:
                            break;
                    }
                }

                // 进入裁剪
                if (index === 1) {
                    that._initCrop();
                }
                // 进入缩放
                if (index === 2) {
                    that._initScale();
                }
                // 进入水印
                if (index === 3) {
                    that._initMark();
                }
                that._updateIsChange(false);
            })

        })
        // 切换水印
        this.$el.find('.J-item-mark').on('click', '.J-menu-btn-mark', (e) => {

            this._confirm(() => {
                let $thumbnail = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');

                this._updateActiveImg($thumbnail.index());
                this.showModel('0');
                this.showMenu(3);
                this._initMark();
                this._updateIsChange(false);
            })



        })
        // 切换批量水印
        this.$el.find('.J-item-mark').on('click', '.J-menu-btn-mark-all', (e) => {

            this._confirm(() => {

                let $thumbnail = this.$markAllPanel.find('.J-img-thumbnail.active');

                this._updateActiveImg($thumbnail.index());
                this.showModel('1');             
                this._initMark('all');

                this._initData();
                // this._updateIsChange(true);

            })


        })


        // 旋转++++++++++++++++
        // 逆时针旋转
        this.$btnRotateLeft.on('click', () => {
            this._getRotateNum(-1);
            this._updateRotate();
        })
        // 顺时针旋转
        this.$btnRotateRight.on('click', () => {
            this._getRotateNum(1);
            this._updateRotate();
        })
        // 裁剪++++++++++++
        this.$inputCropWidth.on('input', (e) => {
            let value = parseInt($(e.target).val());
            this.cropBox.width = value / this.activeData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.height = this.cropBox.width / this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        this.$inputCropHeight.on('input', (e) => {
            let value = parseInt($(e.target).val());
            this.cropBox.height = value / this.activeData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.width = this.cropBox.height * this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        this.$radioCropFix.on('change', (e) => {
            this.cropBox.fixRatio = !this.cropBox.fixRatio;
        })

        // 缩放++++++++++++++
        this.$inputScaleWidth.on('input', (e) => {
            let value = parseInt($(e.target).val());
            value = value >= 0 ? value : 0;
            this.scaleRatio = value / this.activeData.w0;
            this._updateScale();
        })
        this.$inputScaleHeight.on('input', (e) => {
            let value = parseInt($(e.target).val());
            value = value >= 0 ? value : 0;
            this.scaleRatio = value / this.activeData.h0;

            this._updateScale();
        })
        // IE11下change事件连续触发
        this.$rangeScaleRatio.on('change', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            let value = parseInt($this.val());
            this.scaleRatio = value / max;
            this._updateScale();
        })
        // chrome下input事件连续触发，change只有停止拖动时触发
        this.$rangeScaleRatio.on('input', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            let value = parseInt($this.val());
            this.scaleRatio = value / max;
            this._updateScale();
        })
        // 水印++++++++++++++
        this.$radioMarkColor.on('change', () => {
            this._updateMark();
        })
        this.$rangeMarkOpacity.on('input', () => {
            this._updateMark();
        })
        this.$rangeMarkOpacity.on('change', () => {
            this._updateMark();
        })
        this.$selectMarkTxt.on('change', () => {
            this.markBox.$dragBox.find('.J-mark-txt').css({
                'display': 'inline-block',
                'font-size': this.markFontSize0
            });

            this._updateMark();
        })
        this.$radioMarkPosition.on('change', () => {
            this._updateMark();
        })

        // 批量水印++++++++++++++
        this.$radioMarkAllColor.on('change', () => {
            this._updateMark('all');
        })
        this.$rangeMarkAllOpacity.on('input', () => {
            this._updateMark('all');
        })
        this.$rangeMarkAllOpacity.on('change', () => {
            this._updateMark('all');
        })
        this.$selectMarkAllTxt.on('change', () => {
            this.markAllBox.$dragBox.find('.J-mark-txt').css({
                'display': 'inline-block',
                'font-size': this.markFontSize0
            });
            this._updateMark('all');
        })
        this.$radioMarkAllPosition.on('change', () => {
            this._updateMark('all');
        })


        // 水印确定
        this.$btnConfirm.on('click', () => {
            this._saveMark();
        })
        // 水印取消
        this.$btnCancel.on('click', () => {
            this._cancelMark();
        })
        // 批量水印确定
        this.$btnSaveAll.on('click', () => {
            this._showProgress();
            this._saveMarkAll();
        })
        // 批量水印取消
        this.$btnCancelAll.on('click', () => {
            this._confirm(() => {
                this.destory();
            })
        })
        // 重置
        this.$btnReset.on('click', () => {
            if (this.isChange) {
                this._reset();
            }
        })
        // 保存
        this.$btnSave.on('click', (e) => {
            if (this.isChange) {
                this._showProgress();
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
                this._save();
            }

        })
        // 关闭
        this.$btnClose.on('click', (e) => {
            this._confirm(() => {
                this.destory();
            })

        })
        // 禁用鼠标右击菜单
        this.$el.on('contextmenu', (e) => {
            return this.debug;
        })

    }

    _goHome() {
        this.$el.find('.J-menu-btn').parent(':first').addClass('active').siblings().removeClass('active');
        this.$el.find('.J-panel:first').addClass('active').siblings().removeClass('active');

        this.$el.find('.J-item-mark').find('.J-menu-btn').show();
        this.$el.find('.J-item-mark').find('.J-menu-txt').hide();
    }

    _initRotate() {
        this.rotateNum = 0;
    }
    _updateRotate() {
        this.$el.find('.J-source').css({
            'transform': `rotate(${this.rotateNum * 90}deg)`
        });

        let width, height;
        if (this.rotateNum === 1 || this.rotateNum === 3) {
            // 旋转类90度后
            if (1 / this.activeData.imgRatio < this.imgBoxRatio) {
                width = this.imgBoxHeight;
                height = 'auto';
            } else {
                width = 'auto';
                height = this.imgBoxWidth;
            }

        } else {
            if (this.activeData.imgRatio < this.imgBoxRatio) {
                width = 'auto';
                height = this.imgBoxHeight;
            } else {
                width = this.imgBoxWidth;
                height = 'auto';
            }
        }

        this.$el.find('.J-source').css({
            'width': width,
            'height': height
        });

        this._updateIsChange(true);
    }
    _saveRotate() {
        let options = {
            rotateNum: this.rotateNum
        };
        this.onSaveRotate(options, (img) => {
            this.rotateNum = 0;
            this.activeImg = img;
            this._refresh();

            this._updateIsChange(false);
        });
    }
    _initCrop() {
        this.$radioCropFix.prop('checked', false);

        this.cropBox.isFixed = this.$radioCropFix.prop('checked');
        this.cropBox.width = this.$inputCropWidth.val() / this.activeData.ratio;
        this.cropBox.height = this.$inputCropHeight.val() / this.activeData.ratio;
    }
    _updateCrop() {
        this.cropBox.update();
        this._updateIsChange(true);
    }
    _saveCrop() {
        let options = {
            sx: Math.max(this.cropBox.boxData.left * this.activeData.ratio, 0),
            sy: Math.max(this.cropBox.boxData.top * this.activeData.ratio, 0),
            cropW: Math.min(this.cropBox.boxData.width * this.activeData.ratio, this.activeData.w0),
            cropH: Math.min(this.cropBox.boxData.height * this.activeData.ratio, this.activeData.h0)
        };
        this.onSaveCrop(options, (img) => {
            this.sx = 0;
            this.sy = 0;
            this.cropW = img.width;
            this.cropH = img.height;

            this.activeImg = img;
            this._refresh();

            this._updateIsChange(false);
        })
    }

    _initScale() {
        let $scaleImgBox = this.$scalePanel.find('.J-img-box');
        let $scaleRange = this.$scalePanel.find('.J-scale-range');
        let $scaleImgWrapper = this.$scalePanel.find('.J-scale-img-wrapper');

        let $img = $scaleImgBox.find('.J-source');

        let width, height;
        if (this.activeData.w0 < this.imgBoxWidth) {
            width = this.imgBoxWidth;
        } else {
            width = this.activeData.w0 + (this.activeData.w0 - this.imgBoxWidth);
        }
        if (this.activeData.h0 < this.imgBoxHeight) {
            height = this.imgBoxHeight;
        } else {
            height = this.activeData.h0 + (this.activeData.h0 - this.imgBoxHeight);
        }
        $scaleImgWrapper.css({
            'width': width,
            'height': height,
            'margin-left': -width / 2,
            'margin-top': -height / 2
        });
        // 去除预览图的缩放显示
        $img.css({
            'position': 'absolute',
            'left': (width - this.activeData.w0) / 2,
            'top': (height - this.activeData.h0) / 2,
            'width': this.activeData.w0,
            'height': this.activeData.h0,
            'max-width': 'none',
            'max-height': 'none',
            'cursor': 'move'
        })
        // 初始化滑块值
        $scaleRange.val($scaleRange.attr('defaultValue'));

        this.scaleRatio = 1;
    }
    _updateScale() {
        let scaleRatio = this.scaleRatio;

        let $scaleRange = this.$rangeScaleRatio;
        let $scaleNumWidth = this.$inputScaleWidth;
        let $scaleNumHeight = this.$inputScaleHeight;
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

        this.$el.find('.J-panel').not('.J-mark-all-panel').find('.J-source').css({
            'transform': `scale(${this.scaleRatio})`
        });

        this._updateIsChange(true);
    }
    _saveScale() {
        let options = {
            scaleRatio: this.scaleRatio,
        };
        this.onSaveScale(options, (img) => {


            this.scaleRatio = 1;
            this.activeImg = img;
            this._refresh();
            this._initScale();
            this._updateIsChange(false);
        })

    }

    // 水印相关操作start++++++++++++++++++++++++++++++++++++++++
    _setMarkPosition(type) {
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $panel = type === 'all' ? this.$markAllPanel : this.$markPanel;
        let $dragBox = type === 'all' ? this.markAllBox.$dragBox : this.markBox.$dragBox;
        let $markTxt = $dragBox.find('.J-mark-txt');


        let markX = parseInt($dragBox.css('left')) * this.activeData.ratio;
        let markY = parseInt($dragBox.css('top')) * this.activeData.ratio;

        let positionVal = $panel.find('.J-position:checked').val();

        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = $markTxt.outerWidth();
        let dragBoxHeight = $markTxt.outerHeight();

        switch (POSITION[positionVal]) {
            case 'center':
                markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
                markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
                break;
            case 'upLeft':
                markX = (0 + 15) * this.activeData.ratio;
                markY = (0 + 20) * this.activeData.ratio;
                break;
            case 'upRight':
                markX = (dragBoxWrapperWidth - dragBoxWidth - 15) * this.activeData.ratio;
                markY = (0 + 20) * this.activeData.ratio;
                break;
            case 'downLeft':
                markX = (0 + 15) * this.activeData.ratio;
                markY = (dragBoxWrapperHeight - dragBoxHeight - 20) * this.activeData.ratio;
                break;
            case 'downRight':
                markX = (dragBoxWrapperWidth - dragBoxWidth - 15) * this.activeData.ratio;
                markY = (dragBoxWrapperHeight - dragBoxHeight - 20) * this.activeData.ratio;
                break;
            default:
                break;
        }

        $dragBox.css({
            'left': Math.max(Math.floor(markX / this.activeData.ratio), 0),
            'top': Math.floor(markY / this.activeData.ratio),
            'width': Math.min(Math.ceil(dragBoxWidth), Math.floor(this.activeData.w1)),
            'height': Math.ceil(dragBoxHeight)
        })
    }
    _setMarkStyle(type) {
        let $panel = type === 'all' ? this.$markAllPanel : this.$markPanel;

        let $markTxt = $panel.find('.J-mark-txt');
        let colorVal = $panel.find('.J-color:checked').val();
        let opacityVal = parseInt($panel.find('.J-opacity').val()) / parseInt($panel.find('.J-opacity').attr('max'));
        let txtVal = $panel.find('.J-select-mark').val();

        let color = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            color = `rgba(0, 0, 0, ${opacityVal})`;
        }
        let text = this.markTextList[txtVal];

        $markTxt.text(text).css({
            'color': color
        });

    }

    _initMark(type) {
        let $panel = type === 'all' ? this.$markAllPanel : this.$markPanel;
        $panel.find('.J-color:last').prop('checked', true);
        $panel.find('.J-position:first').prop('checked', true);
        $panel.find('.J-opacity:first').val($panel.find('.J-opacity:first').attr('defaultValue'));
        $panel.find('.J-select-mark option:first').prop('selected', true);

        $panel.find('.J-mark-txt').css({
            'font-size': this.markFontSize0 + 'px'
        });

        if (type === 'all') {
            this.markSelects[1].select(0);
            this.markAllBox.$dragBox.find('.J-mark-txt').css({
                'display': 'inline-block'
            });

        } else {
            this.markSelects[0].select(0);
            this.markBox.$dragBox.find('.J-mark-txt').css({
                'display': 'inline-block'
            });
        }

        this._setMarkStyle(type);
        this._setMarkPosition(type);
    }
    _updateMark(type) {

        this._setMarkStyle(type);
        this._setMarkPosition(type);

        this._updateIsChange(true);
    }

    // 获取水印相关参数
    _getMarkParams(type) {
        let $panel = type === 'all' ? this.$markAllPanel : this.$markPanel;
        let $dragBox = type === 'all' ? this.markAllBox.$dragBox : this.markBox.$dragBox;
        let $markTxt = $panel.find('.J-mark-txt');
        let markFont = Math.ceil(parseInt($markTxt.css('font-size')) * this.activeData.ratio) + 'px / ' + Math.ceil(parseInt($markTxt.css('line-height')) * this.activeData.ratio) + 'px ' + $markTxt.css('font-family');
        let $opacity = $panel.find('.J-opacity');
        let opacityVal = parseInt($opacity.val()) / parseInt($opacity.attr('max'));
        let colorVal = $panel.find('.J-color:checked').val();

        let color = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            color = `rgba(0, 0, 0, ${opacityVal})`;
        }

        let txtVal = $panel.find('.J-select-mark').val();
        let text = this.markTextList[txtVal];

        let markX = Math.floor(parseInt($dragBox.css('left')) * this.activeData.ratio);
        let markY = Math.floor(parseInt($dragBox.css('top')) * this.activeData.ratio);

        return {
            markX: markX,
            markY: markY,
            markText: text,
            markFont: markFont,
            markStyle: color
        }

    }
    _saveMark() {
        let options = this._getMarkParams();

        this.onSaveMark(options, (img) => {
            this.activeImg = img;
            this._refresh();
            this._goHome();

            this._updateIsChange(true);
        })
    }
    _cancelMark() {
        this._goHome();
    }
    _saveMarkAll() {
        let options = this._getMarkParams('all');
        this.onSaveMarkAll(options, (data) => {

            this.destory();
            this._updateIsChange(false);
            this._hideProgress();
        })
    }
    // 水印相关操作end++++++++++++++++++++++++++++++++++++++++


    _showSize(w0, h0) {
        w0 = Math.round(w0);
        h0 = Math.round(h0);
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
        let src = '';
        if (this.activeData.img.nodeName.toLowerCase() === 'img') {
            src = this.activeData.img.src;
        } else {
            src = this.activeData.img.toDataURL(this.mime, 1.0);
        }

        if (this.$el.find('.J-img-box').find('.J-source').length > 0) {
            this.$el.find('.J-img-box').find('.J-source').attr('src', src);
        } else {
            this.$el.find('.J-img-box').append(`<img class="J-source" src="${src}">`);
        }

        this.$el.find('.J-source').removeAttr('style');
        this.cropBox && this.cropBox.boxEl.removeAttribute('style');

        this.$el.find('.J-img-box').find('.J-source').css({
            width: this.activeData.w1,
            height: this.activeData.h1
        })

        this._showSize(this.activeData.w0, this.activeData.h0);

    }
    // 更新正在编辑图片的数据
    _updateActiveData() {
        let targetImg = this.activeImg;
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
            w1 = h1 * imgRatio;
            ratio = h0 / h1;
        } else {
            w1 = this.imgBoxWidth;
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
            img: targetImg
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
    // TODO 独立出Tip组件
    _confirm(yesCallback, noCallback) {
        if (!this.isChange) {
            yesCallback();
            return;
        }
        let $tip = this.$el.find('.J-pipeImg-tip');
        let hideTip = () => {
            this.$pipeWrapper.css('z-index', 2);
            $tip.hide();
            $tip.off('click');
        };
        let showTip = () => {
            $tip.show();
            this.$pipeWrapper.css('z-index', 0);
        };

        showTip();

        $tip.on('click', '.J-tip-confirm', (e) => {
            yesCallback();
            hideTip();
        })
        $tip.on('click', '.J-tip-cancel', (e) => {
            noCallback && noCallback();
            hideTip();
        })
    }

    _updateIsChange(isChange) {
        this.isChange = isChange;
        if (isChange) {
            this.$buttons.addClass('active');
        } else {
            this.$buttons.removeClass('active');
        }

    }
    _reset() {
        this.onReset((img) => {
            this.activeImg = img;
            this._refresh();
            this._goHome();

            this._initData();
            this._updateIsChange(false)
        });
    }
    _save() {

        this.onSave((data) => {
            let newSrc = data.url.replace("&amp;", "&");
            let $activeThumb = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');
            $activeThumb.addClass('new').find('img').attr('src', newSrc);

            let index = $activeThumb.index();
            this.$el.find('.J-mark-all-panel').find('.J-img-thumbnail').eq(index).find('img').attr('src', newSrc);

            this._updateIsChange(false);
            // this.imgList = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail img');
            this.imgList[index] = $activeThumb.find('img').get(0);

            this._hideProgress();

            this._goHome();
        });
    }
    _showProgress() {
        this.$pipeWrapper.css('z-index', 0);
        this.$el.find('.J-pipeImg-progress').addClass('active');
    }
    _hideProgress() {
        this.$pipeWrapper.css('z-index', 2);
        this.$el.find('.J-pipeImg-progress').removeClass('active');
    }
    _initData() {
        this.rotateNum = 0;
        this.scaleRatio = 1;
    }
    _updateActiveImg(index) {
        // this.activeImg = img;
        this.activeImg = this.imgList[index];
        this._refresh();
        let options = {
            activeImg: this.activeImg,
            activeIndex: index
        };
        this.onChangeActive(options, (img) => {});
    }
    showMenu(index) {
        this.$el.find('.J-item').eq(index).addClass('active').siblings().removeClass('active');
        this.$el.find('.J-panel').eq(index).addClass('active').siblings().removeClass('active');
        // 若是水印，设置鼠标指针状态
        if (index === 3) {
            // 切换水印按钮状态
            let $itemMark = this.$el.find('.J-item-mark');
            $itemMark.find('.J-menu-btn').hide();
            $itemMark.find('.J-menu-txt').show();
        }
    }
    showSource(index) {
        let $thumbnail = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail').eq(index);
        $thumbnail.addClass('active').siblings().removeClass('active');

        let newSrc = $thumbnail.find('img').attr('src');
        this.$el.find('.J-panel').not('.J-mark-all-panel').find('.J-source').attr('src', newSrc);

        this._updateActiveImg(index);
    }
    // 
    showModel(type) {
        // 编辑界面类型
        const TYPE = {
            SINGLE: "0",
            MULTIPLE: "1"
        };
        if (type === TYPE.MULTIPLE) {

            this.imgBoxHeight = this.$markAllPanel.find('.J-img-box').height();
            this.imgBoxWidth = this.$markAllPanel.find('.J-img-box').width();
            this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;
            this._updateIsChange(true);

            let $itemMark = this.$el.find('.J-item-mark');
            // 切换菜单及面板状态
            $itemMark.addClass('active').siblings().removeClass('active');
            this.$markAllPanel.addClass('active').siblings().removeClass('active');
            // 切换水印按钮状态
            $itemMark.find('.J-menu-btn').hide();
            $itemMark.find('.J-menu-txt').show();

            let txt = $itemMark.find('.J-menu-btn-mark-all').html();
            $itemMark.find('.J-menu-txt').html(txt);
            $itemMark.find('.J-menu-btn-mark-all').hide();
            $itemMark.find('.J-menu-btn-mark').show();
            // 切换页脚状态
            this.$el.find('.J-pipe-footer').addClass('mark-all');

        } else {

            this.imgBoxHeight = this.$markPanel.find('.J-img-box').height();
            this.imgBoxWidth = this.$markPanel.find('.J-img-box').width();
            this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;

            let $itemMark = this.$el.find('.J-item-mark');
            // 切换菜单及面板状态
            this.$el.find('.J-item:first').addClass('active').siblings().removeClass('active');
            this.$el.find('.J-panel:first').addClass('active').siblings().removeClass('active');
            // 切换水印按钮状态
            $itemMark.find('.J-menu-btn').show();
            $itemMark.find('.J-menu-txt').hide();

            let txt = $itemMark.find('.J-menu-btn-mark').html();
            $itemMark.find('.J-menu-txt').html(txt);
            $itemMark.find('.J-menu-btn-mark-all').show();
            $itemMark.find('.J-menu-btn-mark').hide();

            // 切换页脚状态
            this.$el.find('.J-pipe-footer').removeClass('mark-all');
        }
    }
    destory() {
        this.$el.remove();
    }
    showDialog() {
        this.$pipeWrapper.fadeIn(100);
    }
    hideDialog() {
        this.$pipeWrapper.fadeOut(100);
    }

}

export default Dialog
