# pipeImg
> 关键词：旋转 缩放 裁剪 水印 压缩 HTML5 图片编辑
## 前言
之前网页裁剪都是用flash实现，随着升级改造及现在只要求支持IE11以上的现代浏览器，因此考虑用HTML5来实现。

## 命令执行
效果查看
```
npm run start
```
未压缩打包
```
npm run dev
```
压缩打包
```
npm run build
```
## 使用示例
网页直接引入脚本和样式文件（pipeImg.css和pipeImg.js，示例见index.html)：

## 整体概述
1, 依赖jquery.js，template.js；
2, common.css用gulp构建，其他用webpack构建；

3, 入口文件为pipeImg.js，视窗dialog.js，裁剪水印拖拽编辑框dragBox.js，自定义select组件thinSelect.js，图片处理imgHandler.js，工具函数util.js；

4, 参数介绍：
```
// 默认配置参数
let defaults = {
    debug: false,
    // 必填，[{"id":"567701","url":"./images/Jellyfish.jpg"}]
    source: [],
    // 上传图片地址
    uploadUrl: '',
    // 发送文件类型，可以使二进制流'blob'可以是表单数据'formdata'，默认二进制流
    sendDataType: 'formdata',
    // 图片编辑界面类型: '0'单图编辑, '1'批量水印
    type: '0',
    mime: 'image/jpeg',
    // 保存图片最大体积
    maxSize: 500,
    // 直接选择水印文字位置水平垂直距离边框位置
    markXPositionMargin: 15,
    markYPositionMargin: 20,
    // 文案
    markTextList: ['producttest.en.made-in-china.com', 'Focus Service Co - Product SourcingFocus Service Co - Product Sourcing'],
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
    tipTitleTxt: '提示',
    tipContentTxt: '尚未保存，是否确定离开？',
    tipConfirmBtnTxt: '确定',
    // 初始化完成
    onInited: () => {},
    // 上传保存完成
    onComplete: (response) => {},
    onClose: () => {}
};
```