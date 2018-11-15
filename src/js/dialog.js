import {
    drag
} from './util';
import {
    DragBox
} from './dragBox';
import tpl from './dialog.tpl';

class Dialog {

    constructor(options) {

        // 默认配置参数
        let defaults = {
            imgList: [],
            template: tpl,
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

        this.imgList = options.imgList;
        this.template = options.template;
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
            markAllMenuTxt: this.markAllMenuTxt
        });

        let html = '<div class="pipe-dialog J-pipe-dialog" onselectstart="return false" ondragstart="return false"><div class="pipe-mask J-pipe-mask"></div>'+ templateHtml +'</div>';
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
        this.$imgsThumbnail = this.$el.find('.J-imgs-thumbnail');
        // 菜单导航
        // this.$menuRotate = this.$el.find('.J-menu-rotate');
        // this.$menuCrop = this.$el.find('.J-menu-crop');
        // this.$menuScale = this.$el.find('.J-menu-scale');
        // this.$menuMark = this.$el.find('.J-menu-mark');
        // this.$menuMarkAll = this.$el.find('.J-menu-mark-all');
        // 模块按钮
        // 旋转
        this.$btnRotateLeft = this.$el.find('.J-btn-rotate-left');
        this.$btnRotateRight = this.$el.find('.J-btn-rotate-right');
        // 裁剪
        this.$inputCropWidth = this.$el.find('.J-input-crop-width');
        this.$inputCropHeight = this.$el.find('.J-input-crop-height');
        this.$radioCropFix = this.$el.find('.J-radio-crop-fix');
        // 缩放
        this.$inputScaleWidth = this.$el.find('.J-input-scale-width');
        this.$inputScaleHeight = this.$el.find('.J-input-scale-height');
        this.$rangeScaleRatio = this.$el.find('.J-range-scale-ratio');
        // 添加水印
        this.$radioMarkColor = this.$el.find('.J-radio-mark-color');
        this.$radioMarkPosition = this.$el.find('.J-radio-mark-position');
        this.$rangeMarkOpacity = this.$el.find('.J-range-mark-opacity');
        this.$selectMarkTxt = this.$el.find('.J-select-mark-txt');
        // 批量添加水印
        this.$radioMarkAllColor = this.$el.find('.J-radio-markAll-color');
        this.$radioMarkAllPosition = this.$el.find('.J-radio-markAll-position');
        this.$rangeMarkAllOpacity = this.$el.find('.J-range-markAll-opacity');
        this.$selectMarkAllTxt = this.$el.find('.J-select-markAll-txt');

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
            ele: '.J-crop-box .J-source',
            hasLight: true,
            onDragPoint: (data) => {
                this._showSize(data.width * this.activeData.ratio, data.height * this.activeData.ratio);
                this.isChange = true;
            }
        });
        // 初始化缩放
        let $scalePanel = this.$el.find('.J-scale-panel');
        let $scaleImgWrapper = $scalePanel.find('.J-scale-img-wrapper');
        let imgEl = $scalePanel.find('.J-source').get(0);
        drag(imgEl, imgEl, $scaleImgWrapper.get(0));
        // 初始化水印框
        this.markBox = new DragBox({
            ele: '.J-mark-box .J-source',
            fixRatio: false,
            markText: 'producttest.en.made-in-china.com',
            onDragComplete: (left, top) => {
                this.markX = left * this.activeData.ratio;
                this.markY = top * this.activeData.ratio;

                this.$el.find('.J-mark-panel').find('.J-position').prop('checked', false);

                this.isChange = true;
            },
            onDragPoint: (boxData) => {
                this.$el.find('.J-mark-panel').find('.J-mark-txt').css({
                    'font-size': parseInt(this.markBox.$dragBox.css('height')) / 1.5
                })
                this._updateMark();
            } 
        });
        // 初始化批量水印框
        this.markAllBox = new DragBox({
            ele: '.J-mark-box-all .J-source',
            markText: 'producttest.en.made-in-china.com',
            onDragComplete: (left, top) => {
                this.markXAll = left * this.activeData.ratio;
                this.markYAll = top * this.activeData.ratio;

                this.$el.find('.J-mark-all-panel').find('.J-position').prop('checked', false);

                this.isChange = true;
            },
            onDragPoint: (boxData) => {
                this.$el.find('.J-mark-all-panel').find('.J-mark-txt').css({
                    'font-size': parseInt(this.markAllBox.$dragBox.css('height')) / 1.5
                })
                this._updateMarkAll();
            } 
        });

        this._refresh();
        this._bind();
    }
    _bind() {
        // 切换编辑图片
        this.$el.find('.J-footer-normal').on('click', '.J-img-thumbnail', (e) => {

            let $thumbnail = $(e.target).parent();
            $thumbnail.addClass('active').siblings().removeClass('active');

            this.$el.find('.J-panel').not('.J-mark-all-panel').find('.J-source').attr('src', $thumbnail.find('img').attr('src'));
            let targetImg = this.$el.find('.J-source:first').get(0);

            // let targetImg = $thumbnail.find('img').get(0);

            this.activeImg = targetImg;
            this._refresh();
            this._initPanel();

            let options = {
                activeImg: targetImg
            };
            this.onChangeActive(options, (img) => {

            });
        })
        // 批量水印切换编辑图片
        this.$el.find('.J-mark-all-panel').on('click', '.J-img-thumbnail', (e) => {

            let $thumbnail = $(e.target).parent();
            $thumbnail.addClass('active').siblings().removeClass('active');

            this.$el.find('.J-mark-all-panel').find('.J-source').attr('src', $thumbnail.find('img').attr('src'));
            let targetImg = this.$el.find('.J-mark-all-panel').find('.J-source:first').get(0);

            // let targetImg = $thumbnail.find('img').get(0);
            this.activeImg = targetImg;
            this._refresh();
            this._initMarkAll();

            let options = {
                activeImg: targetImg
            };
            this.onChangeActive(options, (img) => {

            });
        })

        // 菜单切换
        this.$el.find('.J-menu-btn').on('click', (e) => {
            let $item = $(e.target).parent();
            let index = $item.index();
            let oldActiveIndex = $item.parent().find('.active:first').index();
            $item.addClass('active').siblings().removeClass('active');
            this.$el.find('.J-panel').eq(index).addClass('active').siblings().removeClass('active');

            // 若有编辑操作，离开旋转，裁剪，缩放面板进行保存
            if (this.isChange) {
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
            }

            // 进入裁剪
            if (index === 1) {
                this._initCrop();
            }
            // 进入缩放
            if (index === 2) {
                this._initScale();
            }
            // // 进入水印
            if (index === 3) {
                this._initMark();
            }

        })
        this.$el.find('.J-item').on('click', '.J-menu-btn', (e) => {
            if (!$(e.target).parent().hasClass('J-item-mark-all')) {
                this.$el.find('.J-footer-normal').show();
                this.$el.find('.J-footer-special').hide();
                this.$el.find('.J-item-mark').show();
                this.$el.find('.J-item-mark-all').hide();              
            }
        })
        this.$el.find('.J-item').on('click', '.J-menu-btn-sub', (e) => {
            if ($(e.target).parent().parent().hasClass('J-item-mark')) {
                let $markPanel = this.$el.find('.J-mark-all-panel');
                let $activeImg = $markPanel.find('.J-img-thumbnail.active img');
                this.$el.find('.J-item-mark-all').addClass('active').siblings().removeClass('active');
                this.$el.find('.J-mark-all-panel').addClass('active').siblings().removeClass('active');
                this.$el.find('.J-item-mark').hide();
                this.$el.find('.J-item-mark-all').show();
                
                this.$el.find('.J-footer-normal').hide();
                this.$el.find('.J-footer-special').show();

                $markPanel.find('.J-source').attr('src', $activeImg.attr('src'));
                this.rotateNum = 0;
                this.scaleRatio = 1;
                this.activeImg = $activeImg.get(0);
                this._refresh();
                this._initMarkAll();

                this.isChange = false;

            } else {         
                this.$el.find('.J-item-mark').addClass('active').siblings().removeClass('active');
                this.$el.find('.J-mark-panel').addClass('active').siblings().removeClass('active');
                this.$el.find('.J-item-mark').show();
                this.$el.find('.J-item-mark-all').hide();
                this._initPanel();
                this.$el.find('.J-footer-normal').show();
                this.$el.find('.J-footer-special').hide();               

            }
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
            this.cropBox.width = $(e.target).val() / this.activeData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.height = this.cropBox.width / this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        this.$inputCropHeight.on('input', (e) => {
            this.cropBox.height = $(e.target).val() / this.activeData.ratio;
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
            let $this = $(e.target);
            this.scaleRatio = parseInt($this.val()) / this.activeData.w0;
            this._updateScale();
        })
        this.$inputScaleHeight.on('input', (e) => {
            let $this = $(e.target);
            this.scaleRatio = parseInt($this.val()) / this.activeData.h0;
            this._updateScale();
        })
        this.$rangeScaleRatio.on('input', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            this.scaleRatio = parseInt($this.val()) / max;
            this._updateScale();
        })
        // 水印++++++++++++++
        this.$radioMarkColor.on('input', () => {
            this._updateMark();
        })
        this.$rangeMarkOpacity.on('input', () => {
            this._updateMark();
        })
        this.$selectMarkTxt.on('change', () => {
            this._updateMark();
        })
        this.$radioMarkPosition.on('change', () => {
            this._updateMark();
        })

        // 批量水印++++++++++++++
        this.$radioMarkAllColor.on('input', () => {
            this._updateMarkAll();
        })
        this.$rangeMarkAllOpacity.on('input', () => {
            this._updateMarkAll();
        })
        this.$selectMarkAllTxt.on('change', () => {
            this._updateMarkAll();
        })
        this.$radioMarkAllPosition.on('change', () => {
            this._updateMarkAll();
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
            this._saveMarkAll();
        })
        // 重置
        this.$btnReset.on('click', () => {
            this._reset();
        })
        // 保存
        this.$btnSave.on('click', (e) => {
            if (this.isChange) {
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
            }
            this._save();
        })
        // 关闭
        this.$btnClose.on('click', (e) => {
            if (this.isChange) {
                let result = confirm('Leave without saving?');
                if (result) {
                    this.destory();
                }
            } else {
                this.destory();
            }
            
        })
        // 禁用鼠标右击菜单
        this.$el.on('contextmenu', (e) => {
            // return false;
        })

    }
    _initPanel() {

        this._initCrop();
        this._initScale();
        this._initMark();
        this._goHome();
    }
    _goHome() {
        this.$el.find('.J-menu-btn').parent(':first').addClass('active').siblings().removeClass('active');
        this.$el.find('.J-panel:first').addClass('active').siblings().removeClass('active');
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

        this.isChange = true;
    }
    _saveRotate() {
        let options = {
            rotateNum: this.rotateNum
        };
        this.onSaveRotate(options, (img) => {
            this.rotateNum = 0;
            this.activeImg = img;
            this._refresh();

            this.isChange = false;
        });
    }
    _initCrop() {
        let $cropPanel = this.$el.find('.J-crop-panel');

        this.cropBox.isFixed = $cropPanel.find('.J-fix-ratio').prop('checked');
        this.cropBox.width = $cropPanel.find('.J-num-width').val() / this.activeData.ratio;
        this.cropBox.height = $cropPanel.find('.J-num-height').val() / this.activeData.ratio;
    }
    _updateCrop() {
        this.cropBox.update();
        this.isChange = true;
    }
    _saveCrop() {
        let options = {
            sx: this.cropBox.boxData.left * this.activeData.ratio,
            sy: this.cropBox.boxData.top * this.activeData.ratio,
            cropW: this.cropBox.boxData.width * this.activeData.ratio,
            cropH: this.cropBox.boxData.height * this.activeData.ratio
        };
        this.onSaveCrop(options, (img) => {
            this.sx = 0;
            this.sy = 0;
            this.cropW = img.width;
            this.cropH = img.height;     

            this.activeImg = img;
            this._refresh();

            this.isChange = false;
        })
    }
    _initScale() {
        let $scalePanel = this.$el.find('.J-scale-panel');
        let $scaleImgBox = $scalePanel.find('.J-img-box');
        let $scaleRange = $scalePanel.find('.J-scale-range');
        let $scaleImgWrapper = $scalePanel.find('.J-scale-img-wrapper');

        let $img = $scaleImgBox.find('.J-source');

        let width = this.activeData.w0 + (this.activeData.w0 - this.imgBoxWidth);
        let height = this.activeData.h0 + (this.activeData.h0 - this.imgBoxHeight);
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

        this.isChange = true;
    }
    _saveScale() {
        let options = {
            scaleRatio: this.scaleRatio,
        };
        this.onSaveScale(options, (img) => {
            this.scaleRatio = 1;
            this.activeImg = img;
            this._refresh();

            this.isChange = false;
        })

    }
    _setMarkPosition(type) {
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $markPanel, $dragBox, markX, markY;
        if (type === 'all') {
            $markPanel = this.$el.find('.J-mark-all-panel');
            $dragBox = this.markAllBox.$dragBox;
            markX = this.markXAll;
            markY = this.markYAll;
        } else {
            $markPanel = this.$el.find('.J-mark-panel');         
            $dragBox = this.markBox.$dragBox;   
            markX = this.markX;
            markY = this.markY;
        }

        let positionVal = $markPanel.find('.J-position:checked').val();
        
        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = $dragBox.find('.J-mark-txt').outerWidth();
        let dragBoxHeight = $dragBox.find('.J-mark-txt').outerHeight();

        switch (POSITION[positionVal]) {
            case 'center':
                markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.activeData.ratio;
                markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.activeData.ratio;
                break;
            case 'upLeft':
                markX = 0;
                markY = 0;
                break;
            case 'upRight':
                markX = (dragBoxWrapperWidth - dragBoxWidth) * this.activeData.ratio;
                markY = 0;
                break;
            case 'downLeft':
                markX = 0;
                markY = (dragBoxWrapperHeight - dragBoxHeight) * this.activeData.ratio;
                break;
            case 'downRight':
                markX = (dragBoxWrapperWidth - dragBoxWidth) * this.activeData.ratio;
                markY = (dragBoxWrapperHeight - dragBoxHeight) * this.activeData.ratio;
                break;
            default:
                break;
        }

        $dragBox.css({
            'left': markX / this.activeData.ratio,
            'top': markY / this.activeData.ratio,
            'width': dragBoxWidth,
            'height': dragBoxHeight
        })

        if (type === 'all') {
            this.markXAll = markX;
            this.markYAll = markY;         
        } else {
            this.markX = markX;
            this.markY = markY;
        }
    }
    _setMarkStyle(type) {
        let $markPanel;
        if (type === 'all') {
            $markPanel = this.$el.find('.J-mark-all-panel');
        } else {
            $markPanel = this.$el.find('.J-mark-panel');            
        }
        let $markTxt = $markPanel.find('.J-mark-txt');
        let colorVal = $markPanel.find('.J-color:checked').val();
        let opacityVal = $markPanel.find('.J-opacity').val();
        let txtVal = $markPanel.find('.J-markTxt:selected').val();   

        let color = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            color = `rgba(0, 0, 0, ${opacityVal})`;
        }
        let text = this.markTextList[txtVal];

        $markTxt.text(text).css({
            'color': color
        });
        if (type === 'all') {
            this.markStyleAll = color;
            this.markTextAll = text;            
        } else {
            this.markStyle = color;
            this.markText = text;
        }
        
    }
    _initMark() {
        let $markPanel = this.$el.find('.J-mark-panel');
        let $markTxt = $markPanel.find('.J-mark-txt');

        let font = parseInt($markTxt.css('font-size')) + 'px microsoft yahei';
        this.markFont = font;

        $markPanel.find('.J-color:last').prop('checked', true);
        $markPanel.find('.J-position:first').prop('checked', true);
        $markPanel.find('.J-opacity').val($markPanel.find('.J-opacity').attr('defaultValue'));
        $markPanel.find('.J-markTxt:first').prop('selected', true);

        this._setMarkStyle();
        this._setMarkPosition();
    }
    _updateMark() {
        this._setMarkStyle();
        this._setMarkPosition();

        this.isChange = true;
    }
    _saveMark() {
        let options = {
            markX: this.markX,
            markY: this.markY,
            markText: this.markText,
            markFont: this.markFont,
            markStyle: this.markStyle
        };
        
        this.onSaveMark(options, (img) => {
            this.activeImg = img;
            this._refresh();
            this._goHome();

            this.isChange = false;
        })  
    }
    _cancelMark() {
        this._goHome();
    }
    _initMarkAll() {
        let $markPanel = this.$el.find('.J-mark-all-panel');
        let $markTxt = $markPanel.find('.J-mark-txt');

        let font = parseInt($markTxt.css('font-size')) + 'px microsoft yahei';
        this.markFontAll = font;

        $markPanel.find('.J-color:last').prop('checked', true);
        $markPanel.find('.J-position:first').prop('checked', true);
        $markPanel.find('.J-opacity').val($markPanel.find('.J-opacity').attr('defaultValue'));
        $markPanel.find('.J-select-markAll-txt:first').prop('selected', true);

        this._setMarkStyle('all');
        this._setMarkPosition('all');
    }
    _updateMarkAll() {
        this._setMarkStyle('all');
        this._setMarkPosition('all');

        this.isChange = true;
    }
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
        this.cropBox && (this.cropBox.boxEl.style = '');

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

    _reset() {
        this.onReset((img) => {
            this.rotateNum = 0;
            this.scaleRatio = 1;
            this.activeImg = img;
            this._refresh();

            this.isChange = false;
        });  
    }
    _save() {
        this.onSave((data) => {

            let $activeThumb = this.$el.find('.J-footer-normal').find('.J-img-thumbnail.active');
            $activeThumb.addClass('new').find('img').attr('src', data.src);

            let index = $activeThumb.index();
            this.$el.find('.J-mark-all-panel').find('.J-img-thumbnail').eq(index).find('img').attr('src', data.src);

            this.isChange = false;
            this.imgList = this.$el.find('.J-footer-normal').find('.J-img-thumbnail img');

        });  
    }
    _saveMarkAll() {
        let options = {
            markX: this.markXAll,
            markY: this.markYAll,
            markText: this.markTextAll,
            markFont: this.markFontAll,
            markStyle: this.markStyleAll
        };
        this.onSaveMarkAll(options, (data) => {

            this.destory();
            this.isChange = false;

        })          
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

export {Dialog}
