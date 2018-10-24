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

            this.imgHandler = new ImgHandler({
                sourceImg: this.activeImg
            })
            
            
            this._render();


            this.cropBox = new CropBox({ele:'.J-crop-box .J-source'});
            

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
            self._render();

            self.imgHandler = new ImgHandler({sourceImg: self.activeImg})
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
                self.rotateNum = 0;

                self._refresh();
            }
            // 进入裁剪
            if (index === 1) {
                

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
                self._refresh();

                // $('.J-source').attr('src', self.imgHandler.base64Data);
                // $('.J-source').removeAttr('style');

            }
            if (index != 2) {
                
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
        if (targetImgRatio < this.imgBoxRatio) {
            h1 = this.imgBoxHeight;
            w1 = h1 * targetImgRatio;
        } else {
            w1 = this.imgBoxWidth;
            h1 = w0 / targetImgRatio;
        }


        

        let ratio = h0 / h1;
        return {
            w0: w0,
            h0: h0,
            w1: w1,
            h1: h1,
            ratio: ratio,
            targetImgRatio: targetImgRatio
        }
    }
    // _getPreviewData() {
    //     let targetImg = this.activeImg;
    //     let w0 = targetImg.width;
    //     let h0 = targetImg.height;
    //     if (targetImg.nodeName.toLowerCase() === 'img') {
    //         w0 = targetImg.naturalWidth;
    //         h0 = targetImg.naturalHeight;
    //     }

        

    //     let ratio = w0 / h0;
    //     let h1 = this.imgBoxHeight;
    //     let w1 = h1 * ratio;

    //     this.ratio = h0 / h1;

    //     if (this.rotateNum === 1 || this.rotateNum === 3) {
    //         w1 = h1 / ratio;
    //     }

    //     this.previewObj.src = targetImg.src;
    //     this.previewObj.w0 = w0;
    //     this.previewObj.h0 = h0;
    //     this.previewObj.w1 = w1;
    //     this.previewObj.h1 = h1;
    //     this.previewObj.ratio = ratio;
    // }
    _refresh() {
        let sourceData = this._getSourceData();
        $('.J-source').attr('src', this.imgHandler.base64Data);
        $('.J-source').removeAttr('style');   
        this.cropBox.$mainDiv.style = '';
        
        
        $('.J-img-box').find('.J-source').css({
            width: sourceData.w1,
            height: sourceData.h1
        })


        // 显示活动图片原始宽高
        $('.J-num-width').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-width').val(sourceData.w0);
            } else {
                $('.J-num-width').html(sourceData.w0);
            }
        })
        $('.J-num-height').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-height').val(sourceData.h0);
            } else {
                $('.J-num-height').html(sourceData.h0);
            }
        })
    }
    _render() {
        // this._getPreviewData();
        let sourceData = this._getSourceData();

        if ($('.J-img-box').find('.J-source').length > 0) {
            $('.J-img-box').find('.J-source').attr('src', this.activeImg.src);
        }else{
            $('.J-img-box').html(`<img class="J-source" src="${this.activeImg.src}">`);
        }
        



        $('.J-img-box').find('.J-source').css({
            width: sourceData.w1,
            height: sourceData.h1
        })




// 显示活动图片原始宽高
        $('.J-num-width').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-width').val(sourceData.w0);
            } else {
                $('.J-num-width').html(sourceData.w0);
            }
        })
        $('.J-num-height').each((index, element) => {
            if ($(element).get(0).nodeName.toLowerCase() === 'input') {
                $('.J-num-height').val(sourceData.h0);
            } else {
                $('.J-num-height').html(sourceData.h0);
            }
        })

    }
    _rotate() {
        let sourceData = this._getSourceData();

        $('.J-source').css({
            'transform': `rotate(${this.rotateNum * 90}deg)`
        });
        
        if (this.rotateNum === 1 || this.rotateNum === 3) {
            // 旋转类90度后
            if (1/sourceData.targetImgRatio < this.imgBoxRatio) {
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
