//拖拽
function drag(moveElement, dragBar, container, cb) {
    if (!moveElement) return;
    dragBar = dragBar || moveElement;

    var draging = false,
        x0, y0, mLeft0, mTop0, mLeft1, mTop1;

    var mousedownHandler = function (e) {
        e = e || window.event;
        x0 = e.clientX;
        y0 = e.clientY;
        mLeft0 = moveElement.offsetLeft;
        mTop0 = moveElement.offsetTop;

        draging = true;

    };
    var mousemoveHandler = function (e) {
        e = e || window.event;
        if (draging) {
            var x1 = e.clientX,
                y1 = e.clientY;
            mLeft1 = x1 - x0 + mLeft0;
            mTop1 = y1 - y0 + mTop0;


            if (container) {
                // 计算可移动位置的大小， 保证元素不会超过可移动范围
                // 此处就是父元素的宽度减去子元素宽度
                var width = container.clientWidth - moveElement.offsetWidth;
                var height = container.clientHeight - moveElement.offsetHeight;
                // min方法保证不会超过右边界，max保证不会超过左边界
                mLeft1 = Math.min(Math.max(0, mLeft1), width);
                mTop1 = Math.min(Math.max(0, mTop1), height);
            }


            moveElement.style.left = mLeft1 + 'px';
            moveElement.style.top = mTop1 + 'px';

            typeof cb === 'function' && cb(mLeft1, mTop1);
        }
    };
    var mouseupHandler = function (e) {
        draging = false;
    }

    if (window.addEventListener) {
        dragBar.addEventListener('mousedown', mousedownHandler, false);
        document.addEventListener('mousemove', mousemoveHandler, false);
        document.addEventListener('mouseup', mouseupHandler, false);
    }
}

function getImgPromise(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
        image.setAttribute('crossorigin', 'anonymous');
        image.src = src;
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject('Error: image error!');
        };
    });
}
// 加载图片
function loadImage(src, success, failure) {
    var image = new Image();
    // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
    image.setAttribute('crossorigin', 'anonymous');
    image.src = src;
    image.onload = function () {
        typeof success === 'function' && success(image);
    };
    image.onerror = function () {
        typeof failure === 'function' && failure();
    };
}

function loadImages(srcList, success, failure) {
    if (typeof srcList === 'string') {
        srcList = [srcList];
    }
    var images = [];
    var index = srcList.length;
    var _loadImage = () => {
        if (index === 0) {
            return false;
        }
        var image = new Image();
        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
        image.setAttribute('crossorigin', 'anonymous');
        image.src = srcList[--index];
        image.onload = function () {
            images.unshift(image);
            if (images.length === srcList.length) {
                typeof success === 'function' && success(images);
                return false;
            }
            _loadImage();
        };
        image.onerror = function () {
            typeof failure === 'function' && failure();
        };
    };
    _loadImage();

}
// 创建cavas
function getCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

//获取base64图片大小
function getBase64Size(base64Data) {
    // 'data:image/jpeg;base64,xxxxxx...xxx='
    var str = base64Data.replace(/^data:image\/[\w]*;base64,$/, '');
    var equalIndex = str.indexOf('=');
    if (equalIndex > 0) {
        str = str.substring(0, equalIndex);
    }
    var strLength = str.length;
    return parseInt(strLength - (strLength / 8) * 2);
}
// 只对'image/jpeg'格式有效
function compress(img, max, isSimple) {
    let cvs = img;
    if (cvs.nodeName.toLowerCase() === 'img') {
        cvs = img2cvs(cvs);
    }
    let quality = 1;
    let minWH = 800;
    let scaleRatio = 0.9;
    let qualityStep = 0.1;
    // 质量压缩只支持'image/jpeg'，'image/webp'(chrome支持)
    let qualityType = 'image/jpeg';

    let width = cvs.width;
    let height = cvs.height;
    let cvsRatio = width / height;
    let data = cvs.toDataURL(qualityType, 1.0);
    let size0 = getBase64Size(data);
    // console.log('start compress: ' + Math.ceil(size0 / 1024));
    if (isSimple) {
        while (size0 > max) {
            quality = Math.floor(max / size0 * 10) / 10;
            data = cvs.toDataURL(qualityType, quality);
            size0 = getBase64Size(data);
        }

    } else {
        // 优先缩放
        while (size0 > max && (width > minWH || height > minWH)) {
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

            data = canvas.toDataURL(qualityType, 1.0);
            size0 = getBase64Size(data);
            width = newWidth;
            height = newHeight;
            cvs = canvas;
        }
        // 降低质量
        while (size0 > max) {
            quality -= qualityStep;
            data = cvs.toDataURL(qualityType, quality);
            size0 = getBase64Size(data);
        }
    }
    // console.log('end compress: ' + Math.ceil(size0 / 1024));
    return data;
}


function base64Data2Blob(base64Data, mime) {
    var binStr = atob(base64Data.split(',')[1]),
        len = binStr.length,
        arr = new Uint8Array(len);
    if (!mime) {
        // mime = base64Data.split(',')[0].split(':')[1].split(';')[0];
        mime = base64Data.substring(base64Data.indexOf('data:') + 5, base64Data.indexOf(';base64'));
    }

    for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }

    return new Blob([arr], {
        type: mime
    });

}

function blob2FormData(blob, fileName) {
    var formData = new FormData();
    formData.append('file', blob);
    if (!fileName) {
        fileName = new Date().getTime();
    }
    formData.append("fileName", fileName);

    return formData;
}

// canvas转成blob对象，type值为image/jpeg或者image/webp时，可使用encoderOptions（0-1）设置图片展示质量。
function canvas2Blob(canvas, callback, type, quality) {
    // Polyfill
    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {

                var binStr = atob(this.toDataURL('image/jpeg', quality).split(',')[1]),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback(new Blob([arr], {
                    type: type || 'image/png'
                }));
            }
        });
    }

    canvas.toBlob(callback, type, quality);
}

function uploadFile(formData, url) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', url); //注意跨域问题
    xmlHttp.send(formData);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
        } else {
            console.log(xmlHttp.statusText);
        }
    };
}
// 选择文件
function chooseFile(btn, cb, validFileCallback) {
    let $btn = typeof btn === "string" ? document.querySelector(btn) : btn;
    let $file = $btn.querySelector('input[type=file]');
    if (!$file) {
        let fileNode = document.createElement('input');
        fileNode.setAttribute('type', 'file');

        fileNode.style.cssText = 'display: none;';
        $btn.appendChild(fileNode);
        $file = $btn.querySelector('input[type=file]');
    }

    $file.addEventListener('change', function (e) {
        if (this.files.length > 0) {

            let oFile = this.files[0];

            let validFile = true;
            if (typeof validFileCallback === 'function' && validFileCallback(oFile) === false) {
                validFile = false;
            }

            if (validFile) {
                let reader = new FileReader();
                reader.readAsDataURL(oFile);

                reader.onload = function () {
                    typeof cb === 'function' && cb(this.result);
                }
            } else {
                console.log('onValidateFile function return false')
            }

        }
    }, false);

    // 阻止冒泡导致两次触发selectBtn
    $file.addEventListener('click', (e) => {
        e.stopPropagation();
    })

    $file.click();

}

function _$(ele) {
    return typeof ele === 'string' ? document.querySelector(ele) : ele;
}

function img2cvs(img) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return canvas;
}
function isRealNum(val) {
    if (typeof val !== 'number') {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
}

export {
    drag,
    loadImage,
    loadImages,
    getCanvas,
    getBase64Size,
    compress,
    base64Data2Blob,
    blob2FormData,
    chooseFile,
    uploadFile,
    getImgPromise,
    _$,
    img2cvs,
    isRealNum
}
