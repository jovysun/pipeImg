import {
    drag
} from './util';
class CropBox {
    constructor(options) {
        const defaults = {

        };
        options = Object.assign({}, defaults, options);

        this.init();
    }
    init() {
        var mainDiv = $('main');
        var rightDiv = $('right');
        var leftDiv = $('left');
        var upDiv = $('up');
        var downDiv = $('down');
        var upleftDiv = $('up-left');
        var uprightDiv = $('up-right');
        var rightdownDiv = $('right-down');
        var leftdownDiv = $('left-down');
        
        var isDraging = false;
        var contact = ""; //表示被按下的触点
        //鼠标按下时
        rightDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "right";
        }
        leftDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "left";
        }
        upDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "up";
        }
        downDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "down";
        }
        rightdownDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "right-down";
        }
        leftdownDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "left-down";
        }
        upleftDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "up-left";
        }
        uprightDiv.onmousedown = function (e) {
            e.stopPropagation();
            isDraging = true;
            contact = "up-right";
        }
        //鼠标松开时
        window.onmouseup = function () {
            isDraging = false;
        }
        
        window.onmousemove = function (e) {
            var e = e || window.event;
            if (isDraging == true) {
                switch (contact) {
                    case "up":
                        upMove(e);
                        break;
                    case "right":
                        rightMove(e);
                        break;
                    case "down":
                        downMove(e);
                        break;
                    case "left":
                        leftMove(e);
                        break;
                    case "up-right":
                        upMove(e);
                        rightMove(e);
                        break;
                    case "right-down":
                        downMove(e);
                        rightMove(e);
                        break;
                    case "left-down":
                        downMove(e);
                        leftMove(e);
                        break;
                    case "up-left":
                        upMove(e);
                        leftMove(e);
                        break;
                }
            }
        }
        //获取id的函数
        function $(id) {
            return document.getElementById(id);
        }
        //获取元素相对于屏幕左边及上边的距离，利用offsetLeft
        function getPosition(el) {
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
        function upMove(e) {
            var y = e.clientY; //鼠标位置的纵坐标
            var heightBefore = mainDiv.offsetHeight - 2; //选取框变化前的高度
            var addHeight = getPosition(mainDiv).top - y; //增加的高度
            mainDiv.style.height = heightBefore + addHeight + 'px'; //选取框变化后的宽度
            mainDiv.style.top = mainDiv.offsetTop - addHeight + 'px'; //相当于变化后左上角的纵坐标，鼠标向上移纵坐标减小，下移增大
            setChoice();
        }
        //right移动
        function rightMove(e) {
            var x = e.clientX; //鼠标位置的横坐标
            var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
            //var widthBefore = mainDiv.clientWidth;
            var addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后选取框增加的宽度
            mainDiv.style.width = widthBefore + addWidth + 'px'; //选取框变化后的宽度
            setChoice();
        }
        //down移动
        function downMove(e) {
            var heightBefore = mainDiv.offsetHeight - 2;
            var addHeight = e.clientY - getPosition(mainDiv).top - mainDiv.offsetHeight;
            mainDiv.style.height = heightBefore + addHeight + 'px';
            setChoice();
        }
        //left移动
        function leftMove(e) {
            var widthBefore = mainDiv.offsetWidth - 2;
            var addWidth = getPosition(mainDiv).left - e.clientX; //增加的宽度等于距离屏幕左边的距离减去鼠标位置横坐标
            mainDiv.style.width = widthBefore + addWidth + 'px';
            mainDiv.style.left = mainDiv.offsetLeft - addWidth + 'px'; //左边的距离（相当于左边位置横坐标）等于选取框距父级元素的距离减去增加的宽度
            setChoice();
        }
        
        
        
        //设置选取框图片区域明亮显示
        function setChoice() {
            var top = mainDiv.offsetTop;
            var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
            var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
            var left = mainDiv.offsetLeft;
            img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
        }
        
        
        drag(mainDiv, mainDiv, function () {
            setChoice();
        })
    }
}

export {CropBox}
