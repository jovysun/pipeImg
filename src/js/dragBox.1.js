import {
    drag,
    _$
} from './util';
class DragBox {
    constructor(options) {
        const defaults = {
            ele: 'body',
            width: '100%',
            height: '100%'
        };
        options = Object.assign({}, defaults, options);
        this.ele = options.ele;
        this.width = options.width;
        this.height = options.height;

        this.init();
    }
    init() {
        this.$ele = $(this.ele);

        this.html = `<div class="drag-box J-drag-box">
                        <div class="drag-point up-left J-up-left J-drag-point"></div>
                        <div class="drag-point up J-up J-drag-point"></div>
                        <div class="drag-point up-right J-up-right J-drag-point"></div>
                        <div class="drag-point right J-right J-drag-point"></div>
                        <div class="drag-point right-down J-right-down J-drag-point"></div>
                        <div class="drag-point down J-down J-drag-point"></div>
                        <div class="drag-point left-down J-left-down J-drag-point"></div>
                        <div class="drag-point left J-left J-drag-point"></div>
                    </div>`;

        this.$ele.append(this.html);
        this.$ele.find('.J-drag-box').css({
            width: this.width,
            height: this.height
        })

        this.$mainDiv = _$('.J-drag-box');
       
        this._bind();
        
        
        drag(this.$mainDiv, this.$mainDiv, () => {})
    }
    _bind() {
        let isDraging = false;
        let contact = ""; //表示被按下的触点
        const DRAGPOINT = ['up-left', 'up', 'up-right', 'right', 'right-down', 'down', 'left-down', 'left'];
        //鼠标按下时
        $('.J-drag-point').on('mousedown', (e) => {
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
    
}

export {DragBox}
