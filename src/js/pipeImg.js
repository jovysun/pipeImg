import {
    getBase64Size,
    compress,
    base64Data2Blob,
    blob2FormData,
    loadImages
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
            source: ['./assets/Jellyfish.jpg']
        };


        options = Object.assign({}, defaults, options);
        this.source = options.source;

        // 全局变量
        this.rotateNum = 0;
        this.scaleRatio = 1;

        this.previewObj = {
            src: '',
            w0: 0,
            h0: 0,
            w1: 0,
            h1: 0,
            ratio: 1
        };

        // TODO 缓存序列，前进后退，重置
        this.resultList = [];

        this.init();

    }

    init() {
        this.imgBoxHeight = $('.J-img-box').height();
        this.imgBoxWidth = $('.J-img-box').width();
        this.imgBoxRatio = this.imgBoxWidth / this.imgBoxHeight;
        console.log('imgBoxRatio:' + this.imgBoxRatio)
        this._renderSource();

        this._bind();


    }
    _renderSource() {

        loadImages(this.source, (images) => {
            let imgsHtml = '';
            // 为了显示顺序与配置一致
            images = images.reverse();
            // 加载底部缩略图
            $(images).each((index, element) => {
                let thumbnailHtml = '<a class="img-thumbnail ' + (index === 0 ? 'active' : '') + ' J-img-thumbnail" href="javascript:void(0)">' +
                    '<img src="' + element.src + '">' +
                    '</a>';
                imgsHtml += thumbnailHtml;

            });
            $('.J-imgs-thumbnail').html(imgsHtml);

            // 待编辑图片
            this.activeImg = images[0];
            this.resultList.push(images[0].src);
            console.log(this.resultList);
            this.imgHandler = new ImgHandler({
                sourceImg: this.activeImg
            })


            this._render();


            this.cropBox = new DragBox({
                ele: '.J-crop-box .J-source',
                hasLight: true,
                onDragPoint: (data) => {
                    this._showSize(data.width * this.sourceData.ratio, data.height * this.sourceData.ratio);
                }
            });
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

        }, () => {
            throw new Error('图片加载失败！')
        })
    }
    _bind() {
        let self = this;
        // 切换编辑图片
        $('.J-imgs-thumbnail').on('click', '.J-img-thumbnail', function () {
            self._reset();
            let $this = $(this);
            $this.addClass('active').siblings().removeClass('active');

            $('.J-source').attr('src', $this.find('img').attr('src'));
            self.activeImg = $('.J-source:first').get(0);
            self.resultList.push($('.J-source:first').attr('src'));
            self._render();

            self.imgHandler = new ImgHandler({
                sourceImg: self.activeImg
            })
        })
        // 逆时针旋转
        $('.J-btn-rotate-left').on('click', () => {
            this._getRotateNum(-1);
            this._rotate();
        })
        // 顺时针旋转
        $('.J-btn-rotate-right').on('click', () => {
            this._getRotateNum(1);
            this._rotate();
        })
        // 菜单切换
        $('.J-menu-item').on('click', function () {
            let $this = $(this);
            let index = $this.index();
            let oldActiveIndex = $this.parent().find('.active:first').index();
            $this.addClass('active').siblings().removeClass('active');
            $('.J-panel').eq(index).addClass('active').siblings().removeClass('active');

            // 离开旋转
            if (index != 0 && oldActiveIndex === 0) {
                self.imgHandler.rotateNum = self.rotateNum;
                self.imgHandler.rotate();

                self.activeImg = self.imgHandler.results[self.imgHandler.results.length - 1];
                self.resultList.push(self.imgHandler.base64Data);
                self.rotateNum = 0;

                self._refresh();
            }
            // 进入裁剪
            if (index === 1) {
                self._initCrop();
            }
            // 离开裁剪
            if (index !== 1 && oldActiveIndex === 1) {

                let sourceData = self._getSourceData();
                self.sx = self.cropBox.boxData.left * sourceData.ratio;
                self.sy = self.cropBox.boxData.top * sourceData.ratio;
                self.cropW = self.cropBox.boxData.width * sourceData.ratio;
                self.cropH = self.cropBox.boxData.height * sourceData.ratio;

                self.imgHandler.cropW = self.cropW;
                self.imgHandler.cropH = self.cropH;
                self.imgHandler.sx = self.sx;
                self.imgHandler.sy = self.sy;
                self.imgHandler.crop();

                self.activeImg = self.imgHandler.results[self.imgHandler.results.length - 1];
                self.resultList.push(self.imgHandler.base64Data);
                self._refresh();

                // $('.J-source').attr('src', self.imgHandler.base64Data);
                // $('.J-source').removeAttr('style');

            }
            // 进入缩放
            if (index === 2) {
                self._initScale();
            }
            // 离开缩放
            if (index != 2 && oldActiveIndex === 2) {
                self.imgHandler.scaleRatio = self.scaleRatio;
                self.imgHandler.scale();

                self.activeImg = self.imgHandler.results[self.imgHandler.results.length - 1];
                self.resultList.push(self.imgHandler.base64Data);
                self._refresh();
            }
            // 进入水印
            if (index === 3) {

                self._initMark();

            }

        })
        // 重置
        $('.J-button-reset').on('click', () => {
            this._reset();
        })
        // 保存
        $('.J-button-save').on('click', () => {
            this._save();
        })
        // 水印确定
        $('.J-button-confirm').on('click', () => {
            let sourceData = this._getSourceData();



            this.imgHandler.markX = this.markX;
            this.imgHandler.markY = this.markY;


            this.imgHandler.markText = this.markText;
            this.imgHandler.markFont = this.markFont;
            this.imgHandler.markStyle = this.markStyle;

            this.imgHandler.mark();
            this.activeImg = this.imgHandler.results[this.imgHandler.results.length - 1];
            self.resultList.push(self.imgHandler.base64Data);
            this._refresh();

            $('.J-menu-item:first').click();
        })
        // 水印取消
        $('.J-button-cancel').on('click', () => {
            $('.J-menu-item:first').click();
        })


    }
    _getSourceData() {

        let targetImg = this.activeImg;
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
        console.log('targetImgRatio:' + targetImgRatio);
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




        // let ratio = h0 / h1;
        return this.sourceData = {
            w0: w0,
            h0: h0,
            w1: w1,
            h1: h1,
            ratio: ratio,
            targetImgRatio: targetImgRatio
        }
    }
    _initCrop() {
        let $wrapper = $('.J-pipeImg-wrapper');
        let $cropPanel = $wrapper.find('.J-crop-panel');
        let $numWidth = $cropPanel.find('.J-num-width');
        let $numHeight = $cropPanel.find('.J-num-height');
        let $fixRatio = $cropPanel.find('.J-fix-ratio');
        
        let isFixed = $fixRatio.prop('checked');

        let width = $numWidth.val();
        let height = $numHeight.val();
        $numWidth.on('input', (e) => {
            width = $(e.target).val();
            if (isFixed) {
                height = width / this.cropBox.boxData.ratio;
                $numHeight.val(height);
            }
            this.cropBox.update(width / this.sourceData.ratio, height / this.sourceData.ratio);
        })
        $numHeight.on('input', (e) => {
            height = $(e.target).val();
            if (isFixed) {
                width = height * this.cropBox.boxData.ratio;
                $numWidth.val(width);
            }
            this.cropBox.update(width / this.sourceData.ratio, height / this.sourceData.ratio);
        })
        $fixRatio.on('change', (e) => {     
            this.cropBox.fixRatio = isFixed = !isFixed;
        })
    }
    _initScale() {
        let $wrapper = $('.J-pipeImg-wrapper');
        let $scalePanel = $wrapper.find('.J-scale-panel');
        let $scaleImgBox = $scalePanel.find('.J-img-box');
        let $scaleRange = $scalePanel.find('.J-scale-range');
        let $numWidth = $scalePanel.find('.J-num-width');
        let $numHeight = $scalePanel.find('.J-num-height');
        let max = parseInt($scaleRange.attr('max'));

        // 去除预览图的缩放显示
        $scaleImgBox.find('.J-source').css({
            width: 'auto',
            height: 'auto'
        })
        // 初始化滑块值
        $scaleRange.val($scaleRange.attr('max'));
        this.scaleRatio = 1;

        // 缩放事件绑定
        $scaleRange.on('input', (e) => {
            let sourceData = this._getSourceData();
            let $this = $(e.target);
            let scaleRatio = parseInt($this.val()) / max;
            $numWidth.val(sourceData.w0 * scaleRatio);
            $numHeight.val(sourceData.h0 * scaleRatio);

            this._scale(scaleRatio);
        })
        $numWidth.on('input', (e) => {
            let sourceData = this._getSourceData();
            let $this = $(e.target);
            let scaleRatio = parseInt($this.val()) / sourceData.w0;
            $numHeight.val(sourceData.h0 * scaleRatio);
            $scaleRange.val(max * scaleRatio);

            this._scale(scaleRatio);
        })
        $numHeight.on('input', (e) => {
            let sourceData = this._getSourceData();
            let $this = $(e.target);
            let scaleRatio = parseInt($this.val()) / sourceData.h0;
            $numWidth.val(sourceData.w0 * scaleRatio);
            $scaleRange.val(max * scaleRatio);

            this._scale(scaleRatio);
        })

    }
    _initMark() {
        let $wrapper = $('.J-pipeImg-wrapper');
        this._getMarkParams();
        this.markBox.$dragBox.css({
            left: this.markX / this.sourceData.ratio,
            top: this.markY / this.sourceData.ratio
        })

        // 事件绑定
        $wrapper.find('[name=color],[name=opacity]').on('input', () => {

            this._getMarkParams();

            $wrapper.find('.J-mark-txt').css({
                color: this.markStyle
            })
        })
        $wrapper.find('[name=markTxt]').on('change', () => {

            this._getMarkParams();

            $wrapper.find('.J-mark-txt').text(this.markText);
        })
        $wrapper.find('[name=position]').on('change', () => {

            this._getMarkParams();

            this.markBox.$dragBox.css({
                left: this.markX / this.sourceData.ratio,
                top: this.markY / this.sourceData.ratio
            })
        })


    }
    _getMarkParams() {
        const MARKTXT = ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing'];
        const POSITION = ['center', 'upLeft', 'upRight', 'downLeft', 'downRight'];

        let $wrapper = $('.J-pipeImg-wrapper');
        let colorVal = $wrapper.find('[name=color]:checked').val();
        let positionVal = $wrapper.find('[name=position]:checked').val();
        let opacityVal = $wrapper.find('[name=opacity]').val();
        let markTxtVal = $wrapper.find('[name=markTxt]').val();

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
        let dragBoxWidth = this.markBox.$dragBox.width();
        let dragBoxHeight = this.markBox.$dragBox.height();

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
        let sourceData = this._getSourceData();
        $('.J-source').attr('src', this.imgHandler.base64Data);
        $('.J-source').removeAttr('style');
        this.cropBox.$mainDiv.style = '';


        $('.J-img-box').find('.J-source').css({
            width: sourceData.w1,
            height: sourceData.h1
        })

        this._showSize(sourceData.w0, sourceData.h0);



    }
    _render() {

        let sourceData = this._getSourceData();

        if ($('.J-img-box').find('.J-source').length > 0) {
            $('.J-img-box').find('.J-source').attr('src', this.activeImg.src);
        } else {
            $('.J-img-box').append(`<img class="J-source" src="${this.activeImg.src}">`);
        }


        $('.J-img-box').find('.J-source').css({
            width: sourceData.w1,
            height: sourceData.h1
        })




        this._showSize(sourceData.w0, sourceData.h0);

    }
    _rotate() {
        let sourceData = this._getSourceData();

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
    _scale(scaleRatio) {
        this.scaleRatio = scaleRatio;
        $('.J-source').css({
            'transform': `scale(${this.scaleRatio})`
        });
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
        this._rotate();
    }
    _save() {
        // 查看结果
        console.log(this.imgHandler);
        this.resultCvs = this.imgHandler.results[this.imgHandler.results.length - 1];
        this._getFormData();
    }
    _getFormData() {
        if (this.resultCvs.nodeName.toLowerCase() !== 'canvas') {
            return false;
        }
        let data = this.resultCvs.toDataURL('image/jpeg');
        let size0 = getBase64Size(data);
        console.log('start compress: ' + Math.ceil(size0 / 1024));
        if (size0 > 1024 * this.maxSize) {
            let quality = Math.floor(1024 * this.maxSize / size0 * 10) / 10;
            data = compress(resultCvs, quality);
        }
        $('#J-preview-container').find('img').attr('src', data);

        let blob = base64Data2Blob(data, this.mime);
        console.log('end compress: ' + Math.ceil(blob.size / 1024));
        let formData = blob2FormData(blob);

        $.ajax({
            url: "/saveFile",
            type: "POST",
            data: formData,
            processData: false, // 不处理数据
            contentType: false // 不设置内容类型
        });
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
