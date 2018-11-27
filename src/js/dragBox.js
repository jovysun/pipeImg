import {
    drag,
    _$
} from './util';
class DragBox {
    constructor(options) {
        // 默认配置参数
        const defaults = {
            // 待编辑图片元素
            el: '',
            width: '100%',
            height: '100%',
            markText: 'producttest.en.made-in-china.com',
            // 是否有明暗效果，主要是裁剪图片效果
            hasLight: false,
            fixRatio: false,
            // 拖动触点回调函数
            onDragPoint: (boxData) => {},
            // 拖动框回调函数
            onDragComplete: (left, top) => {}
        };

        options = Object.assign({}, defaults, options);
        this.el = options.el;
        this.width = options.width;
        this.height = options.height;
        this.markText = options.markText;
        this.hasLight = options.hasLight;
        this.fixRatio = options.fixRatio;
        this.onDragPoint = options.onDragPoint;
        this.onDragComplete = options.onDragComplete;

        this.init();
    }
    init() {
        this.$el = $(this.el);
        let src = this.$el.attr('src');
        let $parent = this.$el.parent();

        let dragBoxHtml = `<div class="dragbox-wrapper J-dragbox-wrapper">
                                <img class="J-source" src="${src}">
                                <div class="drag-box J-drag-box">
                                    <div class="drag-point up-left J-drag-point"></div>
                                    <div class="drag-point up J-drag-point"></div>
                                    <div class="drag-point up-right J-drag-point"></div>
                                    <div class="drag-point right J-drag-point"></div>
                                    <div class="drag-point right-down J-drag-point"></div>
                                    <div class="drag-point down J-drag-point"></div>
                                    <div class="drag-point left-down J-drag-point"></div>
                                    <div class="drag-point left J-drag-point"></div>
                                    <div class="mark-txt J-mark-txt">${this.markText}</div>
                                </div>
                            </div>`;
        if (this.hasLight) {
            dragBoxHtml = `<div class="dragbox-wrapper J-dragbox-wrapper">
                                <img class="J-source img-dark" src="${src}">
                                <img class="J-source img-light J-img-light" src="${src}">
                                <div class="drag-box J-drag-box">
                                    <div class="drag-point up-left J-drag-point"></div>
                                    <div class="drag-point up J-drag-point"></div>
                                    <div class="drag-point up-right J-drag-point"></div>
                                    <div class="drag-point right J-drag-point"></div>
                                    <div class="drag-point right-down J-drag-point"></div>
                                    <div class="drag-point down J-drag-point"></div>
                                    <div class="drag-point left-down J-drag-point"></div>
                                    <div class="drag-point left J-drag-point"></div>
                                </div>
                            </div>`;
        }

        $parent.html(dragBoxHtml);
        this.$dragBox = $parent.find('.J-drag-box');
        if (!this.hasLight) {
            this.$dragBox.css({
                width: this.$dragBox.find('.J-mark-txt').width(),
                height: this.$dragBox.find('.J-mark-txt').height()
            });
        }

        this.$dragPoint = this.$dragBox.find('.J-drag-point');


        this.boxEl = this.$dragBox.get(0);
        this.containerEl = this.boxEl.parentNode;
        this.imgLight = $parent.find('.J-img-light:first').get(0);

        this.boxData = {
            left: this.boxEl.offsetLeft,
            top: this.boxEl.offsetTop,
            width: this.boxEl.offsetWidth,
            height: this.boxEl.offsetHeight,
            ratio: this.boxEl.offsetWidth / this.boxEl.offsetHeight
        };

        this._bind();


        drag(this.boxEl, this.boxEl, this.boxEl.parentNode, (left, top) => {
            this._light();
            this.onDragComplete(left, top);
        });


    }
    _bind() {
        let isDraging = false;
        let contact = ""; //表示被按下的触点
        const DRAGPOINT = ['up-left', 'up', 'up-right', 'right', 'right-down', 'down', 'left-down', 'left'];
        let dragBoxRatio = this.boxData.width / this.boxData.height;
        //鼠标按下时
        this.$dragPoint.on('mousedown', (e) => {
            e.stopPropagation();
            isDraging = true;
            let index = $(e.target).index();
            contact = DRAGPOINT[index];
            dragBoxRatio = this.boxData.width / this.boxData.height;
        })

        $(document).on('mouseup', (e) => {
            isDraging = false;
            this.boxData = {
                left: this.boxEl.offsetLeft,
                top: this.boxEl.offsetTop,
                width: this.boxEl.offsetWidth,
                height: this.boxEl.offsetHeight,
                ratio: this.boxEl.offsetWidth / this.boxEl.offsetHeight
            };
        })
        $(document).on('mousemove', (e) => {
            if (isDraging == true) {
                this._move(e, contact, dragBoxRatio);
                this._light();

                this.boxData = {
                    left: this.boxEl.offsetLeft,
                    top: this.boxEl.offsetTop,
                    width: this.boxEl.offsetWidth,
                    height: this.boxEl.offsetHeight,
                    ratio: this.boxEl.offsetWidth / this.boxEl.offsetHeight
                };

                this.onDragPoint(this.boxData);
            }
        })

    }

    //获取元素相对于屏幕左边及上边的距离，利用offsetLeft
    _getPosition() {
        let el = this.boxEl;
        let left = el.offsetLeft;
        let top = el.offsetTop;
        let parent = el.offsetParent;
        while (parent != null) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            "left": left,
            "top": top
        };
    }

    _move(e, contact, dragBoxRatio) {

        let x = e.clientX,
            y = e.clientY;
        let oldWidth = this.boxEl.offsetWidth; //选取框变化前的宽度
        let oldHeight = this.boxEl.offsetHeight; //选取框变化前的高度
        let position = this._getPosition();
        let top = position.top;
        let left = position.left;


        let newWidth;
        let newHeight;
        let newLeft;
        let newTop;

        // 约束比例：根据宽度计算高度
        if (contact.indexOf('left') != -1) {
            let addWidth = left - x;
            if (addWidth >= 0 && this.boxEl.offsetLeft <= 0) {
                return false;
            }

            newWidth = oldWidth + addWidth;
            newLeft = this.boxEl.offsetLeft - addWidth;
        }
        if (contact.indexOf('right') != -1) {
            let addWidth = x - left - oldWidth;
            if (addWidth >= 0 && (this.containerEl.clientWidth - (this.boxEl.offsetLeft + oldWidth + addWidth)) <= 0) {
                return false;
            }

            newWidth = oldWidth + addWidth;
            newLeft = this.boxEl.offsetLeft;
        }
        if (contact.indexOf('up') != -1) {
            let addHeight;
            if (this.fixRatio) {
                newHeight = Math.round(newWidth / dragBoxRatio);
                addHeight = newHeight - oldHeight;
            } else {
                addHeight = top - y;
                newHeight = oldHeight + addHeight;
            }
            newTop = this.boxEl.offsetTop - addHeight;

            if (addHeight >= 0 && this.boxEl.offsetTop <= 0) {
                return false;
            }
        }
        if (contact.indexOf('down') != -1) {
            let addHeight;
            if (this.fixRatio) {
                newHeight = Math.round(newWidth / dragBoxRatio);
                addHeight = newHeight - oldHeight;
                newTop = this.boxEl.offsetTop;
            } else {
                addHeight = y - top - oldHeight;
                newHeight = oldHeight + addHeight;
            }

            if (addHeight >= 0 && (this.containerEl.clientHeight - (this.boxEl.offsetTop + oldHeight + addHeight)) <= 0) {
                return false;
            }

        }


        this.boxEl.style.width = Math.min(newWidth, this.containerEl.offsetWidth) + 'px';
        this.boxEl.style.height = Math.min(newHeight, this.containerEl.offsetHeight) + 'px';
        this.boxEl.style.left = Math.max(newLeft, 0) + 'px';
        this.boxEl.style.top = Math.max(newTop, 0) + 'px';
    }

    _light() {
        if (this.hasLight) {
            this._setChoice();
        }
    }
    //设置选取框图片区域明亮显示
    _setChoice() {
        var top = this.boxEl.offsetTop;
        var right = this.boxEl.offsetLeft + this.boxEl.offsetWidth;
        var bottom = this.boxEl.offsetTop + this.boxEl.offsetHeight;
        var left = this.boxEl.offsetLeft;
        this.imgLight.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
    }

    update() {
        this.$dragBox.css({
            width: this.width,
            height: this.height
        });
    }
}

export {
    DragBox
}
