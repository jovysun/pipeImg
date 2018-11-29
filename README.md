# pipeImg
> 关键词：旋转 缩放 裁剪 水印 压缩 HTML5 图片编辑
## 前言
之前网页裁剪都是用flash实现，随着升级改造及现在只要求支持IE11以上的现代浏览器，因此考虑用HTML5来实现。

## 命令执行
效果查看
```
gulp
```
开发改造
```
npm run dev
```
打包
```
npm run build
```
## 使用示例
网页直接引入脚本使用(见index.html)，pipeImg.bundle.min.js是包含样式字体的打包，pipeImg.thin.min.js是样式脚本分开的打包文件：
```
<script src="./dist/pipeImg.bundle.min.js"></script>
<script>
      $('.J-btn-edit').on('click', function(){
          var pipeImg = new PipeImg({          
              source: ['./images/Jellyfish.jpg', './images/greensock.png', './images/Lighthouse.jpg'],
              ajaxUrl: '/pic.do?xcase=uploadWs',
              debug: true,
              onComplete: function(data) {
                  $('#J-preview-container').append($('<img>').attr('src', data.src));
              }
          });
          
      })
</script>
```
## 整体概述
1, 依赖jquery.js，template.js
2, css用gulp构建，js用webpack打包；

3, 入口文件为pipeImg.js，视窗dialog.js，裁剪水印拖拽编辑框dragBox.js，自定义select组件thinSelect.js，图片处理imgHandler.js，工具函数util.js；

4, 参数介绍：
```
// 默认配置参数
let defaults = {
    // 必填，图片src字符串数组
    source: [],
    // 上传图片地址
    ajaxUrl: '',
    debug: false,
    mime: 'image/jpeg',
    // 保存图片最大体积
    maxSize: 500,    
    // 文案
    markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product Sourcing'],
    closeBtnTxt: '关闭',
    saveBtnTxt: '保存',
    resetBtnTxt: '重置',
    confirmBtnTxt: '确定',
    cancelBtnTxt: '取消',
    rotateMenuTxt: '旋转',
    turnLeftTxt: '逆时针旋转',
    turnRightTxt: '顺时针旋转',
    cropMenuTxt: '裁剪',
    scaleMenuTxt: '缩放',
    markMenuTxt: '添加水印',
    colorTxt: '颜色',
    positionTxt: '位置',
    opacityTxt: '透明度',
    showRoomTxt: '展示厅',
    companyNameTxt: '公司名称',
    markAllMenuTxt: '批量添加水印',
    // 初始化完成回调
    onInited: () => {},
    // 上传保存完成回调
    onComplete: (response) => {}
};
```