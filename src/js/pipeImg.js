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
import {CropBox} from './cropBox';

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

        this.init();

    }

    init() {

        this._renderSource();

        this._bind();
        
        new CropBox();
    }
    _renderSource() {

        loadImages(this.source, (images) => {
            let imgsHtml = '';
            // 为了显示顺序与配置一致
            images = images.reverse();

            $(images).each((index, element) => {
                let thumbnailHtml = '<a class="img-thumbnail ' + (index === 0 ? 'active' : '') + ' J-img-thumbnail" href="javascript:void(0)">' +
                    '<img src="' + element.src + '">' +
                    '</a>';
                imgsHtml += thumbnailHtml;

            });
            $('.J-imgs-thumbnail').html(imgsHtml);

            this.activeImg = images[0];
            $('.J-img-box').html(`<img class="J-source" src="${this.activeImg.src}">`);
            this.imgBoxHeight = $('.J-img-box').height();

            this._renderSize();

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
            self._renderSize();
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
            $this.addClass('active').siblings().removeClass('active');
            $('.J-panel').eq(index).addClass('active').siblings().removeClass('active');

        })
        // 重置
        $('.J-button-reset').on('click', () => {
            this._reset();
        })
        // 保存
        $('.J-button-save').on('click', () => {
            this._save();
        })

    }
    _rotate() {

        $('.J-source').css({
            'transform': `rotate(${this.rotateNum * 90}deg)`
        });
        if (this.rotateNum === 1 || this.rotateNum === 3) {
            $('.J-source').css({
                'width': this.imgBoxHeight,
                'height': 'auto'
            });
        } else {
            $('.J-source').css({
                'height': this.imgBoxHeight,
                'width': 'auto'
            });
        }
    }
    _scale() {
        this.scaleRatio = 0.6;
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
    // 显示活动图片宽高
    _renderSize() {
        $('.J-num-width').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-width').val(this.activeImg.naturalWidth);
            } else {
                $('.J-num-width').html(this.activeImg.naturalWidth);
            }
        })
        $('.J-num-height').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-height').val(this.activeImg.naturalHeight);
            } else {
                $('.J-num-height').html(this.activeImg.naturalHeight);
            }
        })


    }
    _reset() {
        this.rotateNum = 0;
        this._rotate();
    }
    _save() {
        let imgHandler = new ImgHandler({
            sourceImg: this.activeImg,
            rotateNum: this.rotateNum
        })
        if (this.rotateNum !== 0) {
            imgHandler.rotate();
        }
        imgHandler.mark();
        // 查看结果
        console.log(imgHandler);
        this.resultCvs = imgHandler.results[imgHandler.results.length - 1];
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
