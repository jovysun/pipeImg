//拖拽
function drag(moveElement, dragBar = document, cb) {
    if (!moveElement) return;

    let draging = false,
        x0, y0, mLeft0, mTop0, mLeft1, mTop1;

    let mousedownHandler = (e) => {
        e = e || window.event;
        x0 = e.clientX;
        y0 = e.clientY;
        mLeft0 = moveElement.offsetLeft;
        mTop0 = moveElement.offsetTop;

        draging = true;

    };
    let mousemoveHandler = (e) => {
        e = e || window.event;
        if (draging) {
            let x1 = e.clientX,
                y1 = e.clientY;
            mLeft1 = x1 - x0 + mLeft0;
            mTop1 = y1 - y0 + mTop0;

            moveElement.style.left = mLeft1;
            moveElement.style.top = mTop1;

            typeof cb === 'function' && cb(mLeft1, mTop1);
        }
    };
    let mouseupHandler = (e) => {
        draging = false;
    }

    if (window.addEventListener) {
        dragBar.addEventListener('mousedown', mousedownHandler, false);
        document.addEventListener('mousemove', mousemoveHandler, false);
        document.addEventListener('mouseup', mouseupHandler, false);
    }
}
// 选择器
// function $(el) {
//   return (typeof el === "string" ? document.querySelector(el) : el);
// }
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
    let image = new Image();
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
    let images = [];
    let index = srcList.length;
    let _loadImage = () => {
        if (index === 0) {
            return false;
        }
        let image = new Image();
        // 跨域报错处理（Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.）
        image.setAttribute('crossorigin', 'anonymous');
        image.src = srcList[--index];
        image.onload = function () {
            images.push(image);
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
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

//获取base64图片大小
function getBase64Size(base64Data) {
    // 'data:image/jpeg;base64,xxxxxx...xxx='
    let str = base64Data.replace(/^data:image\/[\w]*;base64,$/, '');
    let equalIndex = str.indexOf('=');
    if (equalIndex > 0) {
        str = str.substring(0, equalIndex);
    }
    let strLength = str.length;
    return parseInt(strLength - (strLength / 8) * 2);
}
// 压缩只支持image/jpeg和image/webp
function compress(img, quality = 0.6, width, height, mime = 'images/jpeg') { //  Image 对象，或者是 Canvas 元素
    let canvas = getCanvas(width, height),
        ctx = canvas.getContext("2d");
    if (width && height) {
        ctx.drawImage(img, 0, 0, width, height);
    } else {
        ctx.drawImage(img, 0, 0);
    }

    let base64 = canvas.toDataURL(mime, quality);

    return base64; // 压缩后的base64串
}


function base64Data2Blob(base64Data, mime) {
    let binStr = atob(base64Data.split(',')[1]),
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
    let formData = new FormData();
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
    getImgPromise
}
