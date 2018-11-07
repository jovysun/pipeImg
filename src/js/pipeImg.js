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
    CropBox
} from './cropBox';
import {
    DragBox
} from './dragBox';

class PipeImg {

    constructor(options) {

        // 默认配置参数
        let defaults = {
            ele: '.J-pipeImg-wrapper',
            source: ['./assets/Jellyfish.jpg'],
            mime: 'image/jpeg',
            maxSize: 500
        };


        options = Object.assign({}, defaults, options);
        this.source = options.source;
        this.ele = options.ele;
        this.mime = options.mime;
        this.maxSize = options.maxSize;



        this._init();

    }

    _init() {
        this.$ele = $(this.ele);
        // 全局变量
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.resultList = [];

        this.imgList = [];

        this.imgBoxHeight = $('.J-img-box').height();
        this.imgBoxWidth = $('.J-img-box').width();
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
        this.$ele.find('.J-imgs-thumbnail').html(imgsHtml);

        // 待编辑图片
        this.imgHandler = new ImgHandler({
            sourceImg: images[0]
        });

        this.resultList.push(this.imgHandler.result);
        this._updateSourceData();

        this._refresh();

        // 初始化裁剪框
        this.cropBox = new DragBox({
            ele: '.J-crop-box .J-source',
            hasLight: true,
            onDragPoint: (data) => {
                this._showSize(data.width * this.sourceData.ratio, data.height * this.sourceData.ratio);
            }
        });
        // 初始化水印框
        this.markBox = new DragBox({
            ele: '.J-mark-box .J-source',
            width: 340,
            height: 35,
            markText: 'producttest.en.made-in-china.com',
            onDragComplete: (left, top) => {
                this.markX = left * this.sourceData.ratio;
                this.markY = top * this.sourceData.ratio;
            }
        });
        // 初始化批量水印框
        this.markAllBox = new DragBox({
            ele: '.J-mark-box-all .J-source',
            width: 340,
            height: 35,
            markText: 'producttest.en.made-in-china.com',
            onDragComplete: (left, top) => {
                this.markXAll = left * this.sourceData.ratio;
                this.markYAll = top * this.sourceData.ratio;
            }
        });
        // 事件绑定
        this._bind();
    }

    _bind() {
        let self = this;
        // 切换编辑图片
        this.$ele.find('.J-imgs-thumbnail').on('click', '.J-img-thumbnail', (e) => {

            let $this = $(e.target).parent();
            $this.addClass('active').siblings().removeClass('active');

            $('.J-source').attr('src', $this.find('img').attr('src'));
            let targetImg = $('.J-source:first').get(0);


            this.imgHandler = new ImgHandler({
                sourceImg: targetImg
            })

            this.resultList = [this.imgHandler.result];
            this._updateSourceData();

            this._refresh();
            this._initPanel();
        })

        // 菜单切换
        this.$ele.find('.J-menu-item').on('click', function () {
            let $this = $(this);
            let index = $this.index();
            let oldActiveIndex = $this.parent().find('.active:first').index();
            $this.addClass('active').siblings().removeClass('active');
            $('.J-panel').eq(index).addClass('active').siblings().removeClass('active');

            // 离开旋转，裁剪，缩放面板进行保存
            switch (oldActiveIndex) {
                case 0:
                    self._saveRotate();
                    break;
                case 1:
                    self._saveCrop();
                    break;
                case 2:
                    self._saveScale();
                    break;
                default:
                    break;
            }

            // 进入裁剪
            if (index === 1) {
                self._initCrop();
            }
            // 进入缩放
            if (index === 2) {
                self._initScale();
            }
            // 进入水印
            if (index === 3) {
                self._initMark();
            }

            // 进入批量水印
            if (index === 4) {
                self._initMarkAll();
            }

        })


        // 旋转++++++++++++++++
        // 逆时针旋转
        this.$ele.find('.J-btn-rotate-left').on('click', () => {
            this._getRotateNum(-1);
            this._updateRotate();
        })
        // 顺时针旋转
        this.$ele.find('.J-btn-rotate-right').on('click', () => {
            this._getRotateNum(1);
            this._updateRotate();
        })
        // 裁剪++++++++++++
        let $cropPanel = this.$ele.find('.J-crop-panel');
        $cropPanel.find('.J-num-width').on('input', (e) => {
            this.cropBox.width = $(e.target).val() / this.sourceData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.height = this.cropBox.width / this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        $cropPanel.find('.J-num-height').on('input', (e) => {
            this.cropBox.height = $(e.target).val() / this.sourceData.ratio;
            if (this.cropBox.fixRatio) {
                this.cropBox.width = this.cropBox.height * this.cropBox.boxData.ratio;
            }
            this._updateCrop();
        })
        $cropPanel.find('.J-fix-ratio').on('change', (e) => {
            this.cropBox.fixRatio = !this.cropBox.fixRatio;
        })

        // 缩放++++++++++++++
        let $scalePanel = this.$ele.find('.J-scale-panel');
        $scalePanel.find('.J-scale-range').on('input', (e) => {
            let $this = $(e.target);
            let max = parseInt($this.attr('max'));
            this.scaleRatio = parseInt($this.val()) / max;
            this._updateScale();
        })
        $scalePanel.find('.J-num-width').on('input', (e) => {
            let $this = $(e.target);
            this.scaleRatio = parseInt($this.val()) / this.sourceData.w0;
            this._updateScale();
        })
        $scalePanel.find('.J-num-height').on('input', (e) => {
            let $this = $(e.target);
            this.scaleRatio = parseInt($this.val()) / this.sourceData.h0;
            this._updateScale();
        })

        // 水印++++++++++++++
        let $markPanel = this.$ele.find('.J-mark-panel');
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
        this.$ele.find('.J-button-cancel').on('click', () => {
            this._goHome();
        })
        // 批量水印++++++++++++++
        let $markAllPanel = this.$ele.find('.J-mark-all-panel');
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
                // 模拟关闭编辑窗口
                this.$ele.hide();
            })

        })

        // 重置
        this.$ele.find('.J-button-reset').on('click', () => {
            this._reset();
        })
        // 保存
        this.$ele.find('.J-button-save').on('click', (e) => {
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

            let activeImg = this.resultList[this.resultList.length - 1];
            let base64Data = activeImg.toDataURL(this.mime, 1);
            let $activeThumbnail = this.$ele.find('.J-img-thumbnail.active');
            // 更新底部缩略图显示
            $activeThumbnail.find('img').attr('src', base64Data);
            // 更新全局数据
            this.resultList = [activeImg];
            this.imgList[$activeThumbnail.index()] = activeImg;

            this.save(activeImg);
        })
        this.$ele.find('.J-button-close').on('click', () => {
            this.$ele.hide();
        })

    }
    _initPanel() {
        this._initCrop();
        this._initScale();
        this._initMark();
        this._initMarkAll();
    }
    _goHome() {
        this.$ele.find('.J-menu-item:first').click();
    }
    _updateSourceData() {

        let targetImg = this.resultList[this.resultList.length - 1];
        let w0 = targetImg.width;
        let h0 = targetImg.height;
        if (targetImg.nodeName.toLowerCase() === 'img') {
            w0 = targetImg.naturalWidth;
            h0 = targetImg.naturalHeight;
        }

        let targetImgRatio = w0 / h0;
        let h1;
        let w1;
        let ratio;
        // console.log('targetImgRatio:' + targetImgRatio);
        if (targetImgRatio < this.imgBoxRatio) {
            h1 = this.imgBoxHeight;
            // w1 = h1 * targetImgRatio;
            w1 = 'auto';
            ratio = h0 / h1;
        } else {
            w1 = this.imgBoxWidth;
            // h1 = w0 / targetImgRatio;
            h1 = 'auto';
            ratio = w0 / w1;
        }

        this.sourceData = {
            w0: w0,
            h0: h0,
            w1: w1,
            h1: h1,
            ratio: ratio,
            targetImgRatio: targetImgRatio
        }
    }
    _initRotate() {
        this.rotateNum = 0;
    }
    _updateRotate() {
        let sourceData = this.sourceData;

        $('.J-source').css({
            'transform': `rotate(${this.rotateNum * 90}deg)`
        });

        if (this.rotateNum === 1 || this.rotateNum === 3) {
            // 旋转类90度后
            if (1 / sourceData.targetImgRatio < this.imgBoxRatio) {
                $('.J-source').css({
                    'width': this.imgBoxHeight,
                    'height': 'auto'
                });
            } else {
                $('.J-source').css({
                    'width': 'auto',
                    'height': this.imgBoxWidth
                });
            }

        } else {

            if (sourceData.targetImgRatio < this.imgBoxRatio) {
                $('.J-source').css({
                    'width': 'auto',
                    'height': this.imgBoxHeight
                });
            } else {
                $('.J-source').css({
                    'width': this.imgBoxWidth,
                    'height': 'auto'
                });
            }
        }

    }
    _saveRotate() {
        this.imgHandler.rotateNum = this.rotateNum;
        this.imgHandler.rotate();

        this.resultList.push(this.imgHandler.result);
        this._updateSourceData();
        this._refresh();

    }
    _initCrop() {
        let $cropPanel = this.$ele.find('.J-crop-panel');

        this.cropBox.isFixed = $cropPanel.find('.J-fix-ratio').prop('checked');
        this.cropBox.width = $cropPanel.find('.J-num-width').val() / this.sourceData.ratio;
        this.cropBox.height = $cropPanel.find('.J-num-height').val() / this.sourceData.ratio;
    }
    _updateCrop() {
        this.cropBox.update();
    }
    _saveCrop() {
        this.sx = this.cropBox.boxData.left * this.sourceData.ratio;
        this.sy = this.cropBox.boxData.top * this.sourceData.ratio;
        this.cropW = this.cropBox.boxData.width * this.sourceData.ratio;
        this.cropH = this.cropBox.boxData.height * this.sourceData.ratio;

        this.imgHandler.cropW = this.cropW;
        this.imgHandler.cropH = this.cropH;
        this.imgHandler.sx = this.sx;
        this.imgHandler.sy = this.sy;
        this.imgHandler.crop();

        this.resultList.push(this.imgHandler.result);
        this._updateSourceData();
        this._refresh();
    }
    _initScale() {
        let $scalePanel = this.$ele.find('.J-scale-panel');
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
        let sourceData = this.sourceData;
        let scaleRatio = this.scaleRatio;

        let $scalePanel = this.$ele.find('.J-scale-panel');
        let $scaleRange = $scalePanel.find('.J-scale-range');
        let $scaleNumWidth = $scalePanel.find('.J-num-width');
        let $scaleNumHeight = $scalePanel.find('.J-num-height');
        let max = parseInt($scaleRange.attr('max'));

        if ($scaleNumWidth.val() != sourceData.w0 * scaleRatio) {
            $scaleNumWidth.val(sourceData.w0 * scaleRatio);
        }
        if ($scaleNumHeight.val() != sourceData.h0 * scaleRatio) {
            $scaleNumHeight.val(sourceData.h0 * scaleRatio);
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

        this.resultList.push(this.imgHandler.result);
        this._updateSourceData();
        this._refresh();

    }
    _initMark() {
        let $markPanel = this.$ele.find('.J-mark-panel');
        $markPanel.find('.J-color').eq(1).prop('checked', true);
        $markPanel.find('.J-position').eq(0).prop('checked', true);
        $markPanel.find('.J-opacity').val(0.8);
        $markPanel.find('.J-markTxt option:first').prop('selected', true);

        this._updateMark();
    }
    _updateMark() {
        const MARKTXT = ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing'];
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $markPanel = this.$ele.find('.J-mark-panel');
        let colorVal = $markPanel.find('[name=color]:checked').val();
        let positionVal = $markPanel.find('[name=position]:checked').val();
        let opacityVal = $markPanel.find('[name=opacity]').val();
        let markTxtVal = $markPanel.find('[name=markTxt]').val();

        let markStyle = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            markStyle = `rgba(0, 0, 0, ${opacityVal})`;
        }

        this.markFont = 20 * this.sourceData.ratio + 'px microsoft yahei';
        this.markStyle = markStyle;
        this.markText = MARKTXT[markTxtVal];

        let $dragBoxWrapper = this.markBox.$dragBox.parent();
        let dragBoxWrapperWidth = $dragBoxWrapper.width();
        let dragBoxWrapperHeight = $dragBoxWrapper.height();
        let dragBoxWidth = this.markBox.$dragBox.outerWidth() < dragBoxWrapperWidth ? this.markBox.$dragBox.outerWidth() : dragBoxWrapperWidth;
        let dragBoxHeight = this.markBox.$dragBox.outerHeight() < dragBoxWrapperHeight ? this.markBox.$dragBox.outerHeight() : dragBoxWrapperHeight;

        switch (POSITION[positionVal]) {
            case 'center':
                this.markX = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.sourceData.ratio;
                this.markY = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.sourceData.ratio;
                break;
            case 'upLeft':
                this.markX = 0;
                this.markY = 0;
                break;
            case 'upRight':
                this.markX = (dragBoxWrapperWidth - dragBoxWidth) * this.sourceData.ratio;
                this.markY = 0;
                break;
            case 'downLeft':
                this.markX = 0;
                this.markY = (dragBoxWrapperHeight - dragBoxHeight) * this.sourceData.ratio;
                break;
            case 'downRight':
                this.markX = (dragBoxWrapperWidth - dragBoxWidth) * this.sourceData.ratio;
                this.markY = (dragBoxWrapperHeight - dragBoxHeight) * this.sourceData.ratio;
                break;
            default:
                break;
        }

        $markPanel.find('.J-mark-txt').text(this.markText).css({
            color: this.markStyle
        });
        this.markBox.$dragBox.css({
            left: this.markX / this.sourceData.ratio,
            top: this.markY / this.sourceData.ratio,
            width: dragBoxWidth,
            height: dragBoxHeight
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
        this._updateSourceData();
        this._refresh();

        this._goHome();
    }
    _initMarkAll() {
        let $markPanel = this.$ele.find('.J-mark-all-panel');
        $markPanel.find('.J-color').eq(1).prop('checked', true);
        $markPanel.find('.J-position').eq(0).prop('checked', true);
        $markPanel.find('.J-opacity').val(0.8);
        $markPanel.find('.J-markTxt option:first').prop('selected', true);
        this._updateMarkAll();
    }
    _updateMarkAll() {
        const MARKTXT = ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing'];
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $markPanel = this.$ele.find('.J-mark-all-panel');
        let colorVal = $markPanel.find('[name=colorAll]:checked').val();
        let positionVal = $markPanel.find('[name=positionAll]:checked').val();
        let opacityVal = $markPanel.find('[name=opacityAll]').val();
        let markTxtVal = $markPanel.find('[name=markTxtAll]').val();

        let markStyle = `rgba(255, 255, 255, ${opacityVal})`;
        if (colorVal === '1') {
            markStyle = `rgba(0, 0, 0, ${opacityVal})`;
        }

        this.markFontAll = 20 * this.sourceData.ratio + 'px microsoft yahei';
        this.markStyleAll = markStyle;
        this.markTextAll = MARKTXT[markTxtVal];

        let $dragBoxWrapper = this.markAllBox.$dragBox.parent();
        let dragBoxWrapperWidth = $dragBoxWrapper.width();
        let dragBoxWrapperHeight = $dragBoxWrapper.height();
        let dragBoxWidth = this.markAllBox.$dragBox.width();
        let dragBoxHeight = this.markAllBox.$dragBox.height();

        switch (POSITION[positionVal]) {
            case 'center':
                this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) / 2 * this.sourceData.ratio;
                this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) / 2 * this.sourceData.ratio;
                break;
            case 'upLeft':
                this.markXAll = 0;
                this.markYAll = 0;
                break;
            case 'upRight':
                this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) * this.sourceData.ratio;
                this.markYAll = 0;
                break;
            case 'downLeft':
                this.markXAll = 0;
                this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) * this.sourceData.ratio;
                break;
            case 'downRight':
                this.markXAll = (dragBoxWrapperWidth - dragBoxWidth) * this.sourceData.ratio;
                this.markYAll = (dragBoxWrapperHeight - dragBoxHeight) * this.sourceData.ratio;
                break;
            default:
                break;
        }

        $markPanel.find('.J-mark-txt').text(this.markTextAll).css({
            color: this.markStyleAll
        });
        this.markAllBox.$dragBox.css({
            left: this.markXAll / this.sourceData.ratio,
            top: this.markYAll / this.sourceData.ratio
        })
    }
    _showSize(w0, h0) {
        // 显示活动图片原始宽高
        $('.J-num-width').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-width').val(w0);
            } else {
                $('.J-num-width').html(w0);
            }
        })
        $('.J-num-height').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-height').val(h0);
            } else {
                $('.J-num-height').html(h0);
            }
        })
    }
    _refresh() {
        let base64Data = this.resultList[this.resultList.length - 1].toDataURL(this.mime, 1);

        if ($('.J-img-box').find('.J-source').length > 0) {
            $('.J-img-box').find('.J-source').attr('src', base64Data);
        } else {
            $('.J-img-box').append(`<img class="J-source" src="${base64Data}">`);
        }

        $('.J-source').removeAttr('style');
        this.cropBox && (this.cropBox.boxEl.style = '');

        $('.J-img-box').find('.J-source').css({
            width: this.sourceData.w1,
            height: this.sourceData.h1
        })

        this._showSize(this.sourceData.w0, this.sourceData.h0);

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
        this._updateSourceData();
        this._refresh();
    }
    save(cvs) {
        this._getFormData(cvs);
    }
    _getFormData(cvs) {
        if (cvs.nodeName.toLowerCase() !== 'canvas') {
            return false;
        }
        let data = this._compress(cvs);
        // 模拟处理后图片展示
        $('#J-preview-container').append($('<img>').attr('src', data));

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
    _compress(cvs, isSimple) {
        let quality = 1;
        let minWH = 800;
        let scaleRatio = 0.9;
        let qualityStep = 0.1;
        // 质量压缩只支持'images/jpeg'，'image/webp'
        let qualityType = 'images/jpeg';
        const MAX = this.maxSize * 1024;
        let width = cvs.width;
        let height = cvs.height;
        let cvsRatio = width / height;
        let data = cvs.toDataURL(this.mime, 1);
        let size0 = getBase64Size(data);
        console.log('start compress: ' + Math.ceil(size0 / 1024));
        if (isSimple) {
            quality = Math.floor(1024 * this.maxSize / size0 * 10) / 10;
            data = canvas.toDataURL(qualityType, quality);
        } else {
            // 优先缩放
            while (size0 > MAX && (width > minWH || height > minWH)) {
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

                data = canvas.toDataURL(this.mime, 1);
                size0 = getBase64Size(data);
                width = newWidth;
                height = newHeight;
                cvs = canvas;
            }
            // 降低质量
            while (size0 > MAX) {
                quality -= qualityStep;
                data = canvas.toDataURL(qualityType, quality);
                size0 = getBase64Size(data);
            }
        }
        console.log('end compress: ' + Math.ceil(size0 / 1024));
        return data;
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
