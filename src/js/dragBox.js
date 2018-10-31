import {
    drag,
    _$
} from './util';
class DragBox {
    constructor(options) {
        // 默认配置参数
        const defaults = {
            // 待编辑图片元素
            ele: '',
            width: '100%',
            height: '100%',
            markText: 'producttest.en.made-in-china.com',
            // 是否有明暗效果，主要是裁剪图片效果
            hasLight: false,
            // 拖动触点回调函数
            onDragPoint: (boxData) => {},
            onDragComplete: () => {}
        };

        options = Object.assign({}, defaults, options);
        this.ele = options.ele;
        this.width = options.width;
        this.height = options.height;
        this.markText = options.markText;
        this.hasLight = options.hasLight;
        this.onDragPoint = options.onDragPoint;
        this.onDragComplete = options.onDragComplete;

        this.init();
    }
    init() {
        this.$ele = $(this.ele);
        let src = this.$ele.attr('src');
        let $container = this.$ele.parent();

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
                                <img class="J-source" src="${src}" id="img1">
                                <img class="J-source" src="${src}" id="img2">
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

        $container.html(dragBoxHtml);
        this.$dragBox = $container.find('.J-drag-box');
        this.$dragBox.css({
            width: this.width,
            height: this.height
        });
        this.$dragPoint = this.$dragBox.find('.J-drag-point');


        this.$mainDiv = this.$dragBox.get(0);
       
        this._bind();
        
        
        drag(this.$mainDiv, this.$mainDiv, (left, top) => {
            this._light();
            this.onDragComplete(left, top);
        });

        this.boxData = {
            left: this.$mainDiv.offsetLeft,
            top: this.$mainDiv.offsetTop,
            width: this.$mainDiv.offsetWidth,
            height: this.$mainDiv.offsetHeight
        };
    }
    _bind() {
        let isDraging = false;
        let contact = ""; //表示被按下的触点
        const DRAGPOINT = ['up-left', 'up', 'up-right', 'right', 'right-down', 'down', 'left-down', 'left'];
        //鼠标按下时
        this.$dragPoint.on('mousedown', (e) => {
            e.stopPropagation();
            isDraging = true;
            let index = $(e.target).index();
            contact = DRAGPOINT[index];
        })
        
        $(document).on('mouseup', (e) => {
            isDraging = false;
            this.boxData = {
                left: this.$mainDiv.offsetLeft,
                top: this.$mainDiv.offsetTop,
                width: this.$mainDiv.offsetWidth,
                height: this.$mainDiv.offsetHeight
            };
        })
        $(document).on('mousemove', (e) => {
            if (isDraging == true) {
                this._move(e, contact);
                this._light();

                this.boxData = {
                    left: this.$mainDiv.offsetLeft,
                    top: this.$mainDiv.offsetTop,
                    width: this.$mainDiv.offsetWidth,
                    height: this.$mainDiv.offsetHeight
                };
                
                this.onDragPoint(this.boxData);
            }
        })

    }

    //获取元素相对于屏幕左边及上边的距离，利用offsetLeft
    getPosition(el) {
        var left = el.offsetLeft;
        var top = el.offsetTop;
        var parent = el.offsetParent;
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

    _move(e, contact) {
        let x = e.clientX,
            y = e.clientY;
        let oldWidth = this.$mainDiv.offsetWidth; //选取框变化前的宽度
        let oldHeight = this.$mainDiv.offsetHeight; //选取框变化前的高度
        let position = this.getPosition(this.$mainDiv);
        let top = position.top;
        let left = position.left;

        if(contact.indexOf('up') != -1){         
            var addHeight = top - y;
            this.$mainDiv.style.height = oldHeight + addHeight + 'px';
            this.$mainDiv.style.top = this.$mainDiv.offsetTop - addHeight + 'px';
        }
        if(contact.indexOf('right') != -1){
            var addWidth = x - left - oldWidth;
            this.$mainDiv.style.width = oldWidth + addWidth + 'px';
        }
        if(contact.indexOf('down') != -1){
            var addHeight = y - top - oldHeight;
            this.$mainDiv.style.height = oldHeight + addHeight + 'px';
        }
        if(contact.indexOf('left') != -1){
            var addWidth = left - x;
            this.$mainDiv.style.width = oldWidth + addWidth + 'px';
            this.$mainDiv.style.left = this.$mainDiv.offsetLeft - addWidth + 'px';
        }
    }
    _light() {
        if (this.hasLight) {
            this.setChoice();
        }
    }
    //设置选取框图片区域明亮显示
    setChoice() {
        var top = this.$mainDiv.offsetTop;
        var right = this.$mainDiv.offsetLeft + this.$mainDiv.offsetWidth;
        var bottom = this.$mainDiv.offsetTop + this.$mainDiv.offsetHeight;
        var left = this.$mainDiv.offsetLeft;
        img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
    }
}

export {DragBox}
