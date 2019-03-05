# pipeImg
> 关键词：旋转 缩放 裁剪 水印 压缩 HTML5 图片编辑
## 前言
整体都测试完了，最后发现在chrome下面添加水印时有最小12px问题，dev分支正在开发完善中。
## 效果展示
![效果图](images/1.gif)
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

## 问题归纳
+ 中文版chrome最小字体12px。（修复中）
+ IE11对于同域的设置'crossorigin'会导致无法获得image的原始尺寸。（完成）
+ ie11/safari /火狐  $('.J-drag-box').css('border-width')值为""。（完成）
+ safari下drawImage设置裁剪宽度cropW为小数时，例如500.2px，绘制有问题（变成全黑图片），经验证与超出图片宽度，例如501px，一样现象。（完成）