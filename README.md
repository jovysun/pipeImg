# pipeImg
> 关键词：旋转 缩放 裁剪 水印 HTML5
## 前言
之前网页裁剪都是用flash实现，随着升级改造及现在只要求支持IE11以上的现代浏览器，因此考虑用HTML5来实现。

## 命令执行
效果查看
```
gulp
```
开发改造
```
gulp dev
```
脚本打包
```
gulp build
```
## 使用示例
网页直接引入脚本使用：
```
<script src="./dist/pipeImg.min.js"></script>
<script>
    pipeImg({
        cropSize: 300,
        watermarkFillText: 'UED'
    });
</script>
```

使用默认参数示例
```
pipeImg();
```
自定义水印文字示例：
```
pipeImg({
  cropSize: 300,
  watermarkFillText: '2018'
});
```
自定义水印图标示例：
```
pipeImg({
  cropSize: 300,
  watermarkImg: 'assets/favicon.ico'
});
```
## 整体概述
1, gulp构建，想运行查看demo，开发改造等需要安装下gulp；

2, 控件脚本文件为pipeImg.js，其中主要两个函数一个处理图片的pipeImg，一个拖拽函数drag；

3, 参数介绍：
```
// 选择图片按钮
selectBtn: document.querySelector('#J-select-btn'),
// 放大按钮
upBtn: document.querySelector('#J-up-btn'),
// 缩小按钮
downBtn: document.querySelector('#J-down-btn'),

// 裁剪按钮
cropBtn: document.querySelector('#J-crop-btn'),
// 下载按钮，必须为a标签
downloadBtn: document.querySelector('#J-download-btn'),
// 工作区容器
workingContainer: document.querySelector('#J-working-container'),
// 预览区容器
previewContainer: document.querySelector('#J-preview-container'),

// 放大缩小幅度
scaleStep: 10,

// 工作区边长
containerSize: 500,
// 裁剪区边长，要求是正方形
cropSize: 300,
// 裁剪后的图片类型
cropImgType: 'image/png',
// 遮挡区颜色
borderColor: 'rgba(0, 0, 0, 0.4)',

// 水印相关参数，若watermarkImg存在则用图片水印，否则用文字水印。
// 水印图标，需要在线图片
watermarkImg: null,
// 水印字体，值同css的font
watermarkFont: '16px microsoft yahei',
// 水印字样式，可选值：color,gradient,pattern
watermarkFillStyle: '#fff',
// 水印字文本
watermarkFillText: 'MIC',
// 水印字x轴位置
watermarkX: 0,
// 水印字y轴位置
watermarkY: 0
```