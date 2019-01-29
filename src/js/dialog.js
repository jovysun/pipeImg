import $ from 'jquery';
import template from 'template';

import {
    drag,
    isRealNum
} from './util';
import {
    DragBox
} from './dragBox';
import tpl from './dialog.tpl';
import thumbnailTpl from './thumbnail.tpl';
import ThinSelect from './thinSelect';

class Dialog {

    constructor(options) {

        // 默认配置参数
        let defaults = {
            debug: false,
            imgList: ['data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'],
            activeIndex: 0,
            type: '0',
            template: tpl,
            thumbnailTpl: thumbnailTpl,
            mime: 'image/jpeg',
            markXPositionMargin: 15,
            markYPositionMargin: 20,
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
            constrainTxt: '约束比例',

            onSaveRotate: (args, cb) => {},
            onSaveCrop: (args, cb) => {},
            onSaveScale: (args, cb) => {},
            onSaveMark: (args, cb) => {},
            onReset: (cb) => {},
            onSave: (cb) => {},
            onChangeActive: (options, cb) => {},
            onSaveMarkAll: (cb) => {},
            onComplete: (result) => {}

        };


        options = Object.assign({}, defaults, options);

        this.debug = options.debug;
        this.imgList = options.imgList;
        this.activeIndex = options.activeIndex;
        this.type = options.type;
        this.template = options.template;
        this.thumbnailTpl = options.thumbnailTpl;
        this.mime = options.mime;
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
        this.constrainTxt = options.constrainTxt;

        this.onSaveRotate = options.onSaveRotate;
        this.onSaveCrop = options.onSaveCrop;
        this.onSaveScale = options.onSaveScale;
        this.onSaveMark = options.onSaveMark;
        this.onReset = options.onReset;
        this.onSave = options.onSave;
        this.onChangeActive = options.onChangeActive;
        this.onSaveMarkAll = options.onSaveMarkAll;
        this.onComplete = options.onComplete;

        this._init();

    }

    _init() {
        let templateHtml = template(this.template, {
            imgList: this.imgList,
            activeIndex: this.activeIndex,
            type: this.type,
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
            constrainTxt: this.constrainTxt
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
        this.$rotatePanel = this.$el.find('.J-rotate-panel');
        this.$txtRotateWidth = this.$rotatePanel.find('.J-num-width');
        this.$txtRotateHeight = this.$rotatePanel.find('.J-num-height');
        this.$btnRotateLeft = this.$el.find('.J-btn-rotate-left');
        this.$btnRotateRight = this.$el.find('.J-btn-rotate-right');
        // 裁剪
        this.$cropPanel = this.$el.find('.J-crop-panel');
        this.$inputCropWidth = this.$cropPanel.find('.J-num-width');
        this.$inputCropHeight = this.$cropPanel.find('.J-num-height');
        this.$radioCropFix = this.$cropPanel.find('.J-fix-ratio');
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
        this.loaded = false;
        this.MARKTYPE = {'SINGLE': '0', 'MULTIPLE': '1'};
        this.isChange = false;
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.imgBoxHeight = this.$el.find('.J-img-box').height();
        this.imgBoxWidth = this.$el.find('.J-img-box').width();
        this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;

        this._bind();

        this.$el.find('.J-img-box').addClass('loading');
    }
    renderImgList(imgList, activeIndex) {
        this.$el.find('.J-img-box').removeClass('loading');

        this.imgList = imgList;
        this.activeIndex = activeIndex;
        this.activeImg = this.imgList[this.activeIndex];
        this._updateActiveData();
        

        
        
        
        // 初始化自定义select
        this.markSelects = ThinSelect.use(this.$el.find('.J-select-mark'));

        // 初始化缩略图
        this.$el.find('.J-pipe-footer').find('.J-imgs-thumbnail').html(template(this.thumbnailTpl, {
            imgList: this.imgList,
            activeIndex: this.activeIndex,
            markType: '0'
        }))
        this.$markAllPanel.find('.J-imgs-thumbnail').html(template(this.thumbnailTpl, {
            imgList: this.imgList,
            activeIndex: this.activeIndex,
            markType: '1'
        }));

        // 初始化裁剪框
        this.cropBox = new DragBox({
            el: this.$cropPanel.find('.J-source'),
            isCrop: true,
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

                // this._updateIsChange(true);
            },
            onDragPoint: (boxData) => {
                this.$markPanel.find('.J-mark-txt').css({
                    'font-size': Math.floor(parseInt(this.markBox.$dragBox.css('height')) / this.markLineHeight0 * this.markFontSize0)
                });
                // this.markBox.$dragBox.find('.J-mark-txt').css({
                //     'display': 'block'
                // });

            },
            onDragPointComplete: (boxData) => {
                this.markBox.$dragBox.css({
                    'width': this.markBox.$dragBox.find('.J-mark-txt').css('width'),
                    'height': this.markBox.$dragBox.find('.J-mark-txt').css('height')
                });
                // this.markFontSize0 = parseInt(this.markBox.$dragBox.find('.J-mark-txt').css('font-size')) * this.activeData.ratio;
                // this.markLineHeight0 = parseInt(this.markBox.$dragBox.find('.J-mark-txt').css('line-height')) * this.activeData.ratio;        

            }

        });
        



        // 初始化批量水印框
        this.markAllBox = new DragBox({
            el: this.$markAllPanel.find('.J-source'),
            fixRatio: true,
            markText: this.markTextList[0],
            onDragComplete: (left, top) => {
                this.$markAllPanel.find('.J-position').prop('checked', false);
                // this._updateIsChange(true);
            },
            onDragPoint: (boxData) => {
                this.$markAllPanel.find('.J-mark-txt').css({
                    'font-size': Math.round(parseInt(this.markAllBox.$dragBox.css('height')) / this.markLineHeight0 * this.markFontSize0)
                });
                // this.markAllBox.$dragBox.find('.J-mark-txt').css({
                //     'display': 'block'
                // });
                // this.markAllBox.$dragBox.css('width', this.markAllBox.$dragBox.find('.J-mark-txt').css('width'));
            },
            onDragPointComplete: (boxData) => {
                let $markTxt = this.markAllBox.$dragBox.find('.J-mark-txt');
                this.markAllBox.$dragBox.css({
                    'width': $markTxt.css('width'),
                    'height': $markTxt.css('height')
                });
                this.markAllFontSize1 = parseInt($markTxt.css('font-size')) * this.activeData.ratio;
                this.markAllLineHeight1 = parseInt($markTxt.css('line-height')) * this.activeData.ratio;    

            }
        });

        // 初始值
        this.markFontSize1 = this.markFontSize0 = parseInt(this.markBox.$dragBox.find('.J-mark-txt').css('font-size'));
        this.markLineHeight1 = this.markLineHeight0 = parseInt(this.markBox.$dragBox.find('.J-mark-txt').css('line-height'));
        this.markAllFontSize1 = this.markAllFontSize0 = parseInt(this.markAllBox.$dragBox.find('.J-mark-txt').css('font-size'));
        this.markAllLineHeight1 = this.markAllLineHeight0 = parseInt(this.markAllBox.$dragBox.find('.J-mark-txt').css('line-height'));


        this.type === this.MARKTYPE.MULTIPLE && this.showModel(this.type);
        this._refresh();

        this._updateMarkTxt();
        this._updateMarkTxt(this.MARKTYPE.MULTIPLE);
        this._setMarkPosition();
        this._setMarkPosition(this.MARKTYPE.MULTIPLE);




        // 图片加载完成，激活首屏按钮
        this.loaded = true;
        this.$el.find('.J-menu-btn,.J-btn-rotate-left,.J-btn-rotate-right,.J-menu-btn-mark-all,.J-menu-btn-mark').addClass('loaded');
    }
    _bind() {
        // 切换编辑图片
        this.$el.find('.J-pipe-footer').on('click', '.J-img-thumbnail', (e) => {
            let run = () => {
                let $thumbnail = $(e.currentTarget);
                $thumbnail.addClass('active').siblings().removeClass('active');

                let $thumbnailImg = $thumbnail.find('img');
                this.$el.find('.J-panel').not('.J-mark-all-panel').find('.J-source').attr('src', $thumbnailImg.attr('src'));

                this._updateActiveImg($thumbnail.index());
                this._goHome();
                this._initData();
            };
            if (this.isChange) {
                this._confirm(() => {
                    run();
                    this._updateIsChange(false);
                })                
            } else {
                run();
            }

        })
        // 批量水印切换编辑图片
        this.$markAllPanel.on('click', '.J-img-thumbnail', (e) => {
            let $thumbnail = $(e.currentTarget);
            $thumbnail.addClass('active').siblings().removeClass('active');

            let $thumbnailImg = $thumbnail.find('img');
            this.$markAllPanel.find('.J-source').attr('src', $thumbnailImg.attr('src'));

            this._updateActiveImg($thumbnail.index());
            this._updateMarkTxt(this.MARKTYPE.MULTIPLE);
            this._setMarkPosition(this.MARKTYPE.MULTIPLE);
            this._initData();

        })

        // 菜单切换
        this.$el.find('.J-menu-btn').on('click', (e) => {
            if (!this.loaded) {
                return;
            }
            let run = () => { 
                let $item = $(e.currentTarget).parent();
                let index = $item.index();
                let oldActiveIndex = $item.parent().find('.active:first').index();

                this.showModel(this.MARKTYPE.SINGLE);
                this.showMenu(index);

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
                // 进入水印
                if (index === 3) {
                    // this._updateMarkTxt();
                    this._initMark();
                    
                }
             
            };


            // 离开批量水印模式提示
            if (this.$markAllPanel.hasClass('active')) {
                this._confirm(() => {
                    // 切换到单图编辑模式重置活动图片
                    let $thumbnail = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');
                    this._updateActiveImg($thumbnail.index());

                    run();
                    this._updateIsChange(false);
                })                
            }else{
                run();
            }
            

        })
        // 切换水印
        this.$el.find('.J-item-mark').on('click', '.J-menu-btn-mark', (e) => {
            let run = () => {
                let $thumbnail = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');

                this._updateActiveImg($thumbnail.index());
                this.showModel(this.MARKTYPE.SINGLE);
                this.showMenu(3);
                this._initMark();
                this._updateIsChange(false);
            };
            this._confirm(run);

        })
        // 切换批量水印
        this.$el.find('.J-item-mark').on('click', '.J-menu-btn-mark-all', (e) => {
            if (!this.loaded) {
                return;
            }
            let run = () => {
                let $thumbnail = this.$markAllPanel.find('.J-img-thumbnail.active');

                this._updateActiveImg($thumbnail.index());
                this.showModel(this.MARKTYPE.MULTIPLE);             
                this._initMark(this.MARKTYPE.MULTIPLE);
                this._updateIsChange(false);
                this._initData();
            };
            if (this.isChange) {
                this._confirm(run);             
            } else {
                run();
            }

        })


        // 旋转++++++++++++++++
        // 逆时针旋转
        this.$btnRotateLeft.on('click', () => {
            if (!this.loaded) {
                return;
            }
            this._getRotateNum(-1);
            this._updateRotate();
        })
        // 顺时针旋转
        this.$btnRotateRight.on('click', () => {
            if (!this.loaded) {
                return;
            }
            this._getRotateNum(1);
            this._updateRotate();
        })

        // 裁剪++++++++++++
        this.$inputCropWidth.on('input', (e) => {
            let $input = $(e.currentTarget);


            let value = $input.val();
            $input.val($input.val().replace(/[^\d]/g,''));
            
            if (value === '') {
                return;
            } else {
                value = parseInt($input.val())
            }


            // let value = $input.val() != '' ? parseInt($input.val()) : 0;
            if (value > this.activeData.w0) {
                // 此刻slice比substr与substring好用
                $input.val($input.val().slice(0, -1));
                return
            }
            if (value < 50) {
                if (value <= this.activeData.w0) {
                    value = this.activeData.w0;
                } else {
                    value = 50;
                }
            }
            
            this.cropW = value;
            if (this.fixRatio) {
                this.cropH = Math.floor(value / this.activeData.imgRatio);
                this.$inputCropHeight.val(this.cropH);
            }

            this._updateCrop();
        }).on('blur', (e) => {
            let $input = $(e.currentTarget);
            let value = $input.val() != '' ? parseInt($input.val()) : 0;

            if (value < 50) {
                if (value <= this.activeData.w0) {
                    value = this.activeData.w0;
                } else {
                    value = 50;
                }

                $input.val(value);
                if (this.fixRatio) {
                    this.$inputCropHeight.val(Math.floor(value / this.activeData.imgRatio));
                }
                this.cropW = value;
                this.cropH = this.$inputCropHeight.val();
                this._updateCrop();
            }

        });
        this.$inputCropHeight.on('input', (e) => {
            let $input = $(e.currentTarget);

            let value = $input.val();
            $input.val($input.val().replace(/[^\d]/g,''));
            
            if (value === '') {
                return;
            } else {
                value = parseInt($input.val())
            }

            // let value =  $input.val() != '' ? parseInt( $input.val()) : 0;
            if (value > this.activeData.h0) {
                $input.val($input.val().slice(0, -1));
                return
            }

            if (value < 50) {
                if (value <= this.activeData.h0) {
                    value = this.activeData.h0;
                } else {
                    value = 50;
                }
            }

            this.cropH = value;
            if (this.fixRatio) {
                this.cropW = Math.floor(value * this.activeData.imgRatio);
                this.$inputCropWidth.val(this.cropW);
            }

            this._updateCrop();
        }).on('blur', (e) => {
            let $input = $(e.currentTarget);
            let value = $input.val() != '' ? parseInt($input.val()) : 0;

            if (value < 50) {
                if (value <= this.activeData.h0) {
                    value = this.activeData.h0;
                } else {
                    value = 50;
                }
                

                $input.val(value);
                if (this.fixRatio) {
                    this.$inputCropWidth.val(Math.floor(value * this.activeData.imgRatio));
                }

                this.cropW = this.$inputCropWidth.val();
                this.cropH = value;
                this._updateCrop();
            }

        });
        this.$radioCropFix.on('change', (e) => {
            this.fixRatio = !this.fixRatio;
            this.cropBox.fixRatio = this.fixRatio;
        });

        // 缩放++++++++++++++
        this.$inputScaleWidth.on('input', (e) => {
            let $input = $(e.currentTarget);
            let value = $input.val();
            $input.val($input.val().replace(/[^\d]/g,''));
            
            if (value === '') {
                return;
            } else {
                value = parseInt($input.val())
            }

            if (value > this.activeData.w0) {
                $input.val($input.val().slice(0, -1));
                return
            }

            if (value > 50) {
                this.scaleRatio = value / this.activeData.w0;
                this._updateScale();
            }

        }).on('blur', (e) => {
            let $input = $(e.currentTarget);
            let value = $input.val();
            if (value === '' || parseInt(value) < 50) {
                value = Math.floor(parseInt(this.$inputScaleHeight.val()) * this.activeData.imgRatio);
                $input.val(value);
            }
        });
        this.$inputScaleHeight.on('input', (e) => {
            let $input = $(e.currentTarget);
            let value = $input.val();
            $input.val($input.val().replace(/[^\d]/g,''));
            
            if (value === '') {
                return;
            } else {
                value = parseInt($input.val())
            }

            if (value > this.activeData.h0) {
                $input.val($input.val().slice(0, -1));
                return
            }

            if (value > 50) {
                this.scaleRatio = value / this.activeData.h0;
                this._updateScale();
            }

        }).on('blur', (e) => {
            let $input = $(e.currentTarget);
            let value = $input.val();
            if (value === '' || parseInt(value) < 50) {
                value = Math.floor(parseInt(this.$inputScaleWidth.val()) / this.activeData.imgRatio);
                $input.val(value);
            }
        });
        // IE11下change事件连续触发
        this.$rangeScaleRatio.on('change', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            let value = parseInt($this.val());
            this.scaleRatio = value / max;
            this._updateScale();
        });
        // chrome下input事件连续触发，change只有停止拖动时触发
        this.$rangeScaleRatio.on('input', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            let value = parseInt($this.val());
            this.scaleRatio = value / max;
            this._updateScale();
        });
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
            // this.markBox.$dragBox.find('.J-mark-txt').css({
            //     'display': 'inline-block',
            //     'font-size': this.markFontSize0
            // });

            this._updateMark();
        })
        this.$radioMarkPosition.on('change', () => {
            this._updateMark();
        })

        // 批量水印++++++++++++++
        this.$radioMarkAllColor.on('change', () => {
            this._updateMark(this.MARKTYPE.MULTIPLE);
        })
        this.$rangeMarkAllOpacity.on('input', () => {
            this._updateMark(this.MARKTYPE.MULTIPLE);
        })
        this.$rangeMarkAllOpacity.on('change', () => {
            this._updateMark(this.MARKTYPE.MULTIPLE);
        })
        this.$selectMarkAllTxt.on('change', () => {
            // this.markAllBox.$dragBox.find('.J-mark-txt').css({
            //     'display': 'inline-block',
            //     'font-size': this.markFontSize0
            // });
            this._updateMark(this.MARKTYPE.MULTIPLE);
        })
        this.$radioMarkAllPosition.on('change', () => {
            this._updateMark(this.MARKTYPE.MULTIPLE);
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
            if (this.isChange) {
                this._confirm(() => {
                    this.destory();
                })
            } else {
                this.destory();
            }
            
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
                let panelIndex = this.$el.find('.J-panel.active').index();
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
            if (this.isChange) {
                this._confirm(() => {
                    this.destory();
                })                
            } else {
                this.destory();
            }

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
                width = Math.min(this.imgBoxHeight, this.activeData.w0);
                height = 'auto';
            } else {
                width = 'auto';
                height = Math.min(this.imgBoxWidth, this.activeData.h0);
            }

            this.$txtRotateWidth.text(this.activeData.h0);
            this.$txtRotateHeight.text(this.activeData.w0);           

        } else {
            if (this.activeData.imgRatio < this.imgBoxRatio) {
                width = 'auto';
                height = Math.min(this.imgBoxHeight, this.activeData.h0);
            } else {
                width = Math.min(this.imgBoxWidth, this.activeData.w0);
                height = 'auto';
            }

            this.$txtRotateWidth.text(this.activeData.w0);
            this.$txtRotateHeight.text(this.activeData.h0);     
        }

        this.$el.find('.J-source').css({
            'width': width,
            'height': height
        });

        this._updateIsChange(true);
    }
    _saveRotate() {
        if (this.rotateNum === 0) {
            return false;
        }
        let options = {
            rotateNum: this.rotateNum
        };
        this.onSaveRotate(options, (img) => {
            this.rotateNum = 0;
            this.activeImg = img;
            this._updateActiveData();
            this._refresh();
        });   
    }
    _initCrop() {
        this.$radioCropFix.prop('checked', false);

        this.fixRatio = this.$radioCropFix.prop('checked');
        this.cropW = this.$inputCropWidth.val();
        this.cropH = this.$inputCropHeight.val();

        this.cropBox.width = this.cropW / this.activeData.ratio;
        this.cropBox.height = this.cropH / this.activeData.ratio;
        this.cropBox.fixRatio = this.fixRatio;
    }
    _updateCrop() {
        this.cropBox.width = this.cropW / this.activeData.ratio;
        this.cropBox.height = this.cropH / this.activeData.ratio;
        this.cropBox.fixRatio = this.fixRatio;

        this.cropBox.update();
        this._updateIsChange(true);
    }
    _saveCrop() {
        if (this.cropBox.boxData.left === 0 && this.cropBox.boxData.top === 0 && Math.floor(this.cropBox.boxData.width) === Math.floor(this.activeData.w1) && Math.floor(this.cropBox.boxData.height) === Math.floor(this.activeData.h1)) {
            return false;
        }
        let options = {
            sx: Math.max(this.cropBox.boxData.left * this.activeData.ratio, 0),
            sy: Math.max(this.cropBox.boxData.top * this.activeData.ratio, 0),
            cropW: Math.min(this.cropBox.boxData.width * this.activeData.ratio, this.activeData.w0),
            cropH: Math.min(this.cropBox.boxData.height * this.activeData.ratio, this.activeData.h0)
        };
        this.onSaveCrop(options, (img) => {
            this.activeImg = img;
            this._updateActiveData();
            this._refresh();
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
        $scaleRange.attr('max', this.activeData.w0);
        $scaleRange.val(this.activeData.w0);

        this.scaleRatio = 1;
    }
    _updateScale() {
        let max = parseInt(this.$rangeScaleRatio.attr('max'));

        let newWidth = Math.floor(this.activeData.w0 * this.scaleRatio);
        let newHeight = Math.floor(this.activeData.h0 * this.scaleRatio);
        let newRange = Math.floor(max * this.scaleRatio);
        if (this.$inputScaleWidth.val() != newWidth) {
            this.$inputScaleWidth.val(newWidth);
        }
        if (this.$inputScaleHeight.val() != newHeight) {
            this.$inputScaleHeight.val(newHeight);
        }
        if (this.$rangeScaleRatio.val() != newRange) {
            this.$rangeScaleRatio.val(newRange);
        }

        this.$scalePanel.find('.J-source').css({
            'transform': `scale(${this.scaleRatio})`
        });

        this._updateIsChange(true);
    }
    _saveScale() {
        if (this.scaleRatio === 1) {
            return false;
        }
        let options = {
            scaleRatio: this.scaleRatio,
        };
        this.onSaveScale(options, (img) => {
            this.scaleRatio = 1;
            this.activeImg = img;
            this._updateActiveData();
            this._refresh();
            this._initScale();
        })

    }

    // 水印相关操作start++++++++++++++++++++++++++++++++++++++++
    _setMarkPosition(type) {
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
        let $dragBox = type === this.MARKTYPE.MULTIPLE ? this.markAllBox.$dragBox : this.markBox.$dragBox;
        let $markTxt = $dragBox.find('.J-mark-txt');
        let $markSvg = $dragBox.find('.J-mark-svg');

        let markX = parseInt($dragBox.css('left'));
        let markY = parseInt($dragBox.css('top'));

        let positionVal = $panel.find('.J-position:checked').val();

        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        // let dragBoxWidth = $markTxt.outerWidth();
        // let dragBoxHeight = $markTxt.outerHeight();
        let dragBoxWidth = $markSvg.outerWidth();
        let dragBoxHeight = $markSvg.outerHeight();

        switch (POSITION[positionVal]) {
            case 'center':
                markX = (dragBoxWrapperWidth - dragBoxWidth) / 2;
                markY = (dragBoxWrapperHeight - dragBoxHeight) / 2;
                break;
            case 'upLeft':
                markX = this.markXPositionMargin;
                markY = this.markYPositionMargin;
                break;
            case 'upRight':
                markX = dragBoxWrapperWidth - dragBoxWidth - this.markXPositionMargin;
                markY = this.markYPositionMargin;
                break;
            case 'downLeft':
                markX = this.markXPositionMargin;
                markY = dragBoxWrapperHeight - dragBoxHeight - this.markYPositionMargin;
                break;
            case 'downRight':
                markX = dragBoxWrapperWidth - dragBoxWidth - this.markXPositionMargin;
                markY = dragBoxWrapperHeight - dragBoxHeight - this.markYPositionMargin;
                break;
            default:
                break;
        }

        $dragBox.css({
            'left': markX,
            'top': markY,
            'width': dragBoxWidth,
            'height': dragBoxHeight
        })
    }
    _setMarkStyle(type) {
        let $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
        let markBox = type === this.MARKTYPE.MULTIPLE ? this.markAllBox : this.markBox;

        let $markTxt = $panel.find('.J-mark-txt');
        let colorVal = $panel.find('.J-color:checked').val();
        let opacityVal = parseInt($panel.find('.J-opacity').val()) / parseInt($panel.find('.J-opacity').attr('max'));
        let txtVal = $panel.find('.J-select-mark').val();

        let color = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            color = `rgba(0, 0, 0, ${opacityVal})`;
        }
        let text = this.markTextList[txtVal];

        // $markTxt.text(text).css({
        //     'color': color
        // });
        // if (type) {
            
        // } else {
            
        // }
        // this.markBox = new DragBox({
        //     el: this.$markPanel.find('.J-source'),
        //     fixRatio: true,
        //     markText: text,
        //     onDragComplete: (left, top) => {
        //         this.$markPanel.find('.J-position').prop('checked', false);
        //     }

        // });

        markBox.updateTxt({
            text: text,
            color: color
        });
       

    }
    _updateMarkTxt(type) {
        let $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;

        if (type === this.MARKTYPE.MULTIPLE && this.markAllFontSize0 !== this.markAllFontSize1) {
            $panel.find('.J-mark-txt').css({
                'font-size': Math.round(this.markAllFontSize1 / this.activeData.ratio) + 'px'
            });
            // this.markAllBox.$dragBox.find('.J-mark-txt').css({
            //     'display': 'inline-block'
            // });

        } else {
            if (this.markFontSize0 !== this.markFontSize1) {
                
            }
            $panel.find('.J-mark-txt').css({
                'font-size': Math.round(this.markFontSize1 / this.activeData.ratio) + 'px'
            });
            // this.markBox.$dragBox.find('.J-mark-txt').css({
            //     'display': 'inline-block'
            // });
        }

    }
    _initMark(type) {
        let $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
        $panel.find('.J-color:last').prop('checked', true);
        $panel.find('.J-position:first').prop('checked', true);
        $panel.find('.J-opacity:first').val($panel.find('.J-opacity:first').attr('defaultValue'));
        $panel.find('.J-select-mark option:first').prop('selected', true);

        if (type === this.MARKTYPE.MULTIPLE) {
            $panel.find('.J-mark-txt').css({
                'font-size': Math.round(this.markAllFontSize0 / this.activeData.ratio) + 'px'
            });
            // this.markAllBox.$dragBox.find('.J-mark-txt').css({
            //     'display': 'inline-block'
            // });

        } else {
            $panel.find('.J-mark-txt').css({
                'font-size': Math.round(this.markFontSize0 / this.activeData.ratio) + 'px'
            });
            // this.markBox.$dragBox.find('.J-mark-txt').css({
            //     'display': 'inline-block'
            // });
            
            let markSvg = $panel.find('.J-mark-svg').get(0);
            let w = Math.round(parseInt(markSvg.getAttribute('viewBox').split(' ')[2]) / this.activeData.ratio);
            let h = Math.round(parseInt(markSvg.getAttribute('viewBox').split(' ')[3]) / this.activeData.ratio);
            $panel.find('.J-mark-svg').css({
                width: w,
                height: h
            })
        }

        if (type === this.MARKTYPE.MULTIPLE) {
            this.markSelects[1].select(0);

        } else {
            this.markSelects[0].select(0);
        }

        this._setMarkStyle(type);
        this._setMarkPosition(type);
    }
    _updateMark(type) {
        // if (type === this.MARKTYPE.MULTIPLE) {
        //     this._updateMarkTxt(type);
        // }
        
        this._setMarkStyle(type);
        this._setMarkPosition(type);

        this._updateIsChange(true);
    }
    _saveMark() {
        let options = this._getMarkParams();

        this.onSaveMark(options, (img) => {
            this.activeImg = img;
            this._updateActiveData();
            this._refresh();
            this._goHome();

            this._updateIsChange(true);
        })
    }
    _cancelMark() {
        this._goHome();
    }
    _getMarkParams(type) {

        let $panel = type === this.MARKTYPE.MULTIPLE ? this.$markAllPanel : this.$markPanel;
        let $dragBox = type === this.MARKTYPE.MULTIPLE ? this.markAllBox.$dragBox : this.markBox.$dragBox;
        let $markTxt = $panel.find('.J-mark-txt');

        // let fontSize = Math.round(parseInt($markTxt.css('font-size')) * this.activeData.ratio);
        // let lineHeight = Math.round(parseInt($markTxt.css('line-height')) * this.activeData.ratio);
        // let markFont = fontSize + 'px / ' + lineHeight + 'px ' + $markTxt.css('font-family');

        let $markSvg = $panel.find('.J-mark-svg');
        let svgHeight = parseInt($markSvg.css('height'));
        let fontSize0 = parseInt($markSvg.find('text').css('font-size'));
        // '0 0 183 22'
        let lineHeight0 = parseInt($markSvg.get(0).getAttribute('viewBox').split(' ').pop());
        let svgTextRatio = svgHeight / lineHeight0;

        let fontSize = Math.round(fontSize0 * svgTextRatio * this.activeData.ratio);
        let lineHeight = Math.round(svgHeight * this.activeData.ratio);
        let markFont = fontSize + 'px / ' + lineHeight + 'px ' + $markSvg.parent().css('font-family');


        let $opacity = $panel.find('.J-opacity');
        let opacityVal = parseInt($opacity.val()) / parseInt($opacity.attr('max'));
        let colorVal = $panel.find('.J-color:checked').val();

        let color = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            color = `rgba(0, 0, 0, ${opacityVal})`;
        }

        let txtVal = $panel.find('.J-select-mark').val();
        let text = this.markTextList[txtVal];


        let markX = parseInt($dragBox.css('left'));
        let markY = parseInt($dragBox.css('top'));


        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let positionVal = $panel.find('.J-position:checked').val();

        let dragBoxWrapperWidth = this.activeData.w1;
        let dragBoxWrapperHeight = this.activeData.h1;
        let dragBoxWidth = $markTxt.outerWidth();
        let dragBoxHeight = $markTxt.outerHeight();

        switch (POSITION[positionVal]) {
            case 'center':
                markX = (dragBoxWrapperWidth - dragBoxWidth) / 2;
                markY = (dragBoxWrapperHeight - dragBoxHeight) / 2;
                break;
            case 'upLeft':
                markX = this.markXPositionMargin;
                markY = this.markYPositionMargin;
                break;
            case 'upRight':
                markX = dragBoxWrapperWidth - dragBoxWidth - this.markXPositionMargin;
                markY = this.markYPositionMargin;
                break;
            case 'downLeft':
                markX = this.markXPositionMargin;
                markY = dragBoxWrapperHeight - dragBoxHeight - this.markYPositionMargin;
                break;
            case 'downRight':
                markX = dragBoxWrapperWidth - dragBoxWidth - this.markXPositionMargin;
                markY = dragBoxWrapperHeight - dragBoxHeight - this.markYPositionMargin;
                break;
            default:
                break;
        }

        markX = Math.round(markX * this.activeData.ratio);
        markY = Math.round(markY * this.activeData.ratio  + (lineHeight - fontSize) / 2);

        return {
            markX: markX,
            markY: markY,
            markText: text,
            markFont: markFont,
            markStyle: color
        }        
    }
    _saveMarkAll() {
        let num = 0;
        this.imgList.forEach((element,index) => {

            this.onChangeActive({
                activeImg: element,
                activeIndex: index
            });
            this.activeImg = element;
            this._updateActiveData();
            this._updateMarkTxt(this.MARKTYPE.MULTIPLE);
            let options = this._getMarkParams(this.MARKTYPE.MULTIPLE);
            this.onSaveMark(options, (img) => {});
            this.onSave((data) => {
                // console.log(num+1);
                if (++num === this.imgList.length) {
                    this._hideProgress();
                    this.destory();
                    this._updateIsChange(false);
                    num = 0;
                    this.onComplete(data);
                }
                
            }, index);
        });

    }
    // 水印相关操作end++++++++++++++++++++++++++++++++++++++++


    _showSize(w0, h0) {
        w0 = Math.floor(w0);
        h0 = Math.floor(h0);
        // 显示活动图片原始宽高
        let $numWidth = this.$el.find('.J-num-width');
        let $numHeight = this.$el.find('.J-num-height');
        $numWidth.each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $numWidth.val(w0);
            } else {
                $numWidth.text(w0);
            }
        })
        $numHeight.each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $numHeight.val(h0);
            } else {
                $numHeight.text(h0);
            }
        })
    }
    _refresh() {
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
        let h1 = h0;
        let w1 = w0;
        let ratio = 1;
        if (imgRatio < this.imgBoxRatio) {
            if (h0 > this.imgBoxHeight) {
                h1 = this.imgBoxHeight;
                w1 = h1 * imgRatio;
                ratio = h0 / h1;
            }

        } else {
            if (w0 > this.imgBoxWidth) {
                w1 = this.imgBoxWidth;
                h1 = w1 / imgRatio;
                ratio = w0 / w1;                
            }

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
            this._updateActiveData();
            this._refresh();
            this._goHome();

            this._initData();
            this._updateIsChange(false)
        });
    }
    _save() {
        let $activeThumb = this.$el.find('.J-pipe-footer').find('.J-img-thumbnail.active');
        let index = $activeThumb.index();
        this.onSave((data) => {  
            // [{"picHeight":600,"picWidth":800,"tempPhotoId":"573761","url":"image?tid=40&amp;id=gCfpAUFcYRlB&amp;cache=0&amp;lan_code=0"}];

            if (!(data && data[index] && data[index].url)) {
                window.console && console.log('save: data error!');
                return false;
            }
            let newSrc = data[index].url.replace("&amp;", "&");
            // 更新单图和批量模式缩略图
            $activeThumb.addClass('new').find('img').attr('src', newSrc);            
            this.$markAllPanel.find('.J-img-thumbnail').eq(index).find('img').attr('src', newSrc).attr('title', data[index].picWidth + 'px * ' + data[index].picHeight + 'px');
            // 更新imgList
            this.imgList[index] = $activeThumb.find('img').get(0);

            this._hideProgress();
            this._goHome();
            this.onComplete(data);
            this._updateIsChange(false);
        }, index);
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
        this.activeImg = this.imgList[index];
        this._updateActiveData();
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

    showModel(type) {
        // 编辑界面类型
        if (type === this.MARKTYPE.MULTIPLE) {

            this.imgBoxHeight = this.$markAllPanel.find('.J-img-box').height();
            this.imgBoxWidth = this.$markAllPanel.find('.J-img-box').width();
            this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;
            this._updateActiveData();
            this._refresh();
            

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
            this._updateActiveData();
            this._refresh();

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
