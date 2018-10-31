import {
    drag,
    _$
} from './util';
class CropBox {
    constructor(options) {
        const defaults = {
            ele: ''
        };
        options = Object.assign({}, defaults, options);
        this.ele = options.ele;

        this.init();
    }
    init() {
        this.$ele = typeof this.ele === 'string' ? document.querySelector(this.ele) : this.ele;

        var src = this.$ele.getAttribute('src');

        this.html = `<div class="dragbox-wrapper J-dragbox-wrapper">
                        <img class="J-source" src="${src}" id="img1">
                        <img class="J-source" src="${src}" id="img2">
                        <div id="main">
                            <div class="Divmin up-left" id="up-left"></div>
                            <div class="Divmin up" id="up"></div>
                            <div class="Divmin up-right" id="up-right"></div>
                            <div class="Divmin right" id="right"></div>
                            <div class="Divmin right-down" id="right-down"></div>
                            <div class="Divmin down" id="down"></div>
                            <div class="Divmin left-down" id="left-down"></div>
                            <div class="Divmin left" id="left"></div>
                        </div>
                    </div>`;

        this.$ele.parentNode.innerHTML = this.html;

        this.$mainDiv = _$('#main');
        this.$rightDiv = _$('#right');
        this.$leftDiv = _$('#left');
        this.$upDiv = _$('#up');
        this.$downDiv = _$('#down');
        this.$upleftDiv = _$('#up-left');
        this.$uprightDiv = _$('#up-right');
        this.$rightdownDiv = _$('#right-down');
        this.$leftdownDiv = _$('#left-down');
       
        this._bind();
        
        
        drag(this.$mainDiv, this.$mainDiv, () => {
            this.setChoice();
        })
    }
    _bind() {
        let isDraging = false;
        let contact = ""; //表示被按下的触点
        //鼠标按下时
        
        this.$rightDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "right";
        }
        this.$leftDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "left";
        }
        this.$upDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "up";
        }
        this.$downDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "down";
        }
        this.$rightdownDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "right-down";
        }
        this.$leftdownDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "left-down";
        }
        this.$upleftDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "up-left";
        }
        this.$uprightDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "up-right";
        }
        //鼠标松开时
        window.onmouseup = () => {
            isDraging = false;
            this.boxData = {
                left: this.$mainDiv.offsetLeft,
                top: this.$mainDiv.offsetTop,
                width: this.$mainDiv.offsetWidth,
                height: this.$mainDiv.offsetHeight
            };
        }
        
        window.onmousemove = (e) => {
            var e = e || window.event;
            if (isDraging == true) {
                switch (contact) {
                    case "up":
                    this.upMove(e);
                        break;
                    case "right":
                    this.rightMove(e);
                        break;
                    case "down":
                    this.downMove(e);
                        break;
                    case "left":
                    this.leftMove(e);
                        break;
                    case "up-right":
                    this.upMove(e);
                    this.rightMove(e);
                        break;
                    case "right-down":
                    this.downMove(e);
                    this.rightMove(e);
                        break;
                    case "left-down":
                    this.downMove(e);
                    this.leftMove(e);
                        break;
                    case "up-left":
                    this.upMove(e);
                    this.leftMove(e);
                        break;
                }
            }
        }
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
    //up移动
    upMove(e) {
        var y = e.clientY; //鼠标位置的纵坐标
        var heightBefore = this.$mainDiv.offsetHeight; //选取框变化前的高度
        var addHeight = this.getPosition(this.$mainDiv).top - y; //增加的高度
        this.$mainDiv.style.height = heightBefore + addHeight + 'px'; //选取框变化后的宽度
        this.$mainDiv.style.top = this.$mainDiv.offsetTop - addHeight + 'px'; //相当于变化后左上角的纵坐标，鼠标向上移纵坐标减小，下移增大
        this.setChoice();
    }
    //right移动
    rightMove(e) {
        var x = e.clientX; //鼠标位置的横坐标
        var widthBefore = this.$mainDiv.offsetWidth; //选取框变化前的宽度
        //var widthBefore = mainDiv.clientWidth;
        var addWidth = x - this.getPosition(this.$mainDiv).left - widthBefore; //鼠标移动后选取框增加的宽度
        this.$mainDiv.style.width = widthBefore + addWidth + 'px'; //选取框变化后的宽度
        this.setChoice();
    }
    //down移动
    downMove(e) {
        var heightBefore = this.$mainDiv.offsetHeight;
        var addHeight = e.clientY - this.getPosition(this.$mainDiv).top - this.$mainDiv.offsetHeight;
        this.$mainDiv.style.height = heightBefore + addHeight + 'px';
        this.setChoice();
    }
    //left移动
    leftMove(e) {
        var widthBefore = this.$mainDiv.offsetWidth;
        var addWidth = this.getPosition(this.$mainDiv).left - e.clientX; //增加的宽度等于距离屏幕左边的距离减去鼠标位置横坐标
        this.$mainDiv.style.width = widthBefore + addWidth + 'px';
        this.$mainDiv.style.left = this.$mainDiv.offsetLeft - addWidth + 'px'; //左边的距离（相当于左边位置横坐标）等于选取框距父级元素的距离减去增加的宽度
        this.setChoice();
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

export {CropBox}
