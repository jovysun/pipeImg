!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){"use strict";function n(t,e=document,i){if(!t)return;let n,o,r,s,a,c,l=!1,h=e=>{e=e||window.event,n=e.clientX,o=e.clientY;let i=t.getBoundingClientRect();r=i.left,s=i.top,l=!0},d=e=>{if(e=e||window.event,l){let l=e.clientX,h=e.clientY;a=l-n+r,c=h-o+s,t.style.left=a,t.style.top=c,"function"==typeof i&&i(a,c)}},u=t=>{l=!1};window.addEventListener&&(e.addEventListener("mousedown",h,!1),document.addEventListener("mousemove",d,!1),document.addEventListener("mouseup",u,!1))}function o(t){return"string"==typeof t?document.querySelector(t):t}function r(t,e){let i=new Image;i.setAttribute("crossorigin","anonymous"),i.src=t,i.onload=function(){"function"==typeof e&&e(i)},i.onerror=function(){console.log("Error: image error!")}}function s(t,e){let i=document.createElement("canvas");return i.width=t,i.height=e,i}function a(t){let e=t.replace(/^data:image\/[\w]*;base64,$/,""),i=e.indexOf("=");i>0&&(e=e.substring(0,i));let n=e.length;return parseInt(n-n/8*2)}function c(t,e=.6,i,n,o="images/jpeg"){let r=s(i,n),a=r.getContext("2d");return i&&n?a.drawImage(t,0,0,i,n):a.drawImage(t,0,0),r.toDataURL(o,e)}function l(t,e){let i=atob(t.split(",")[1]),n=i.length,o=new Uint8Array(n);e||(e=t.substring(t.indexOf("data:")+5,t.indexOf(";base64")));for(var r=0;r<n;r++)o[r]=i.charCodeAt(r);return new Blob([o],{type:e})}function h(t,e){let i=new FormData;return i.append("file",t),e||(e=(new Date).getTime()),i.append("fileName",e),i}function d(t,e,i){let n="string"==typeof t?document.querySelector(t):t,o=n.querySelector("input[type=file]");if(!o){let t=document.createElement("input");t.setAttribute("type","file"),t.style.cssText="display: none;",n.appendChild(t),o=n.querySelector("input[type=file]")}o.addEventListener("change",function(t){if(this.files.length>0){let t=this.files[0],n=!0;if("function"==typeof i&&!1===i(t)&&(n=!1),n){let i=new FileReader;i.readAsDataURL(t),i.onload=function(){"function"==typeof e&&e(this.result)}}else console.log("onValidateFile function return false")}},!1),o.addEventListener("click",t=>{t.stopPropagation()}),o.click()}i.d(e,"f",function(){return n}),i.d(e,"a",function(){return o}),i.d(e,"i",function(){return r}),i.d(e,"h",function(){return s}),i.d(e,"g",function(){return a}),i.d(e,"e",function(){return c}),i.d(e,"b",function(){return l}),i.d(e,"c",function(){return h}),i.d(e,"d",function(){return d})},function(t,e,i){"use strict";i.r(e),function(t){var e=i(0);class n{constructor(t){this.options=Object.assign({selectBtn:"#J-select-btn",upBtn:"#J-up-btn",downBtn:"#J-down-btn",anticlockwiseBtn:"#J-anticlockwise-btn",clockwiseBtn:"#J-clockwise-btn",cropBtn:"#J-crop-btn",downloadBtn:"#J-download-btn",workingContainer:"#J-working-container",previewContainer:"#J-preview-container",maxSize:500,scaleStep:10,containerSize:500,cropW:300,cropH:300,mime:"image/jpeg",maskColor:"rgba(0, 0, 0, 0.8)",hasMark:!0,markIcon:null,markFont:"16px microsoft yahei",markStyle:"#fff",markText:"UED",markX:0,markY:0,sourceImgSrc:null,onValidateFile:t=>{},onCropped:t=>{}},t),this.$selectBtn=Object(e.a)(this.options.selectBtn),this.$upBtn=Object(e.a)(this.options.upBtn),this.$downBtn=Object(e.a)(this.options.downBtn),this.$anticlockwiseBtn=Object(e.a)(this.options.anticlockwiseBtn),this.$clockwiseBtn=Object(e.a)(this.options.clockwiseBtn),this.$cropBtn=Object(e.a)(this.options.cropBtn),this.$downloadBtn=Object(e.a)(this.options.downloadBtn),this.$workingContainer=Object(e.a)(this.options.workingContainer),this.$previewContainer=Object(e.a)(this.options.previewContainer),this.maxSize=this.options.maxSize,this.scaleStep=this.options.scaleStep,this.containerSize=this.options.containerSize,this.cropW=this.options.cropW<=this.containerSize?this.options.cropW:this.containerSize,this.cropH=this.options.cropH<=this.containerSize?this.options.cropH:this.containerSize,this.mime=this.options.mime,this.maskColor=this.options.maskColor,this.hasMark=this.options.hasMark,this.markIcon=this.options.markIcon,this.markFont=this.options.markFont,this.markStyle=this.options.markStyle,this.markText=this.options.markText,this.markX=this.options.markX,this.markY=this.options.markY,this.sourceImgSrc=this.options.sourceImgSrc,this.onValidateFile=this.options.onValidateFile,this.onCropped=this.options.onCropped,this.rotateCount=0,this.init()}getRotateNum(t){let e=0;return this.rotateCount+=t,(this.rotateCount>3||this.rotateCount<-3)&&(this.rotateCount=0),e=this.rotateCount<0?4+this.rotateCount:this.rotateCount}rotate(t,i,n,o){Object(e.i)(t,t=>{let r=90*i,s=t.naturalWidth,a=t.naturalHeight,c=Math.max(s,a),l=Object(e.h)(c,c),h=l.getContext("2d");h.translate(c/2,c/2),h.rotate(r*Math.PI/180),h.translate(-c/2,-c/2),h.drawImage(t,0,0);let d=s,u=a,p=0,f=0;1===i?(u=s,p=c-(d=a),f=0):2===i?(p=c-(d=s),f=c-(u=a)):3===i?(d=a,p=0,f=c-(u=s)):(d=s,u=a,p=0,f=0);let m=Object(e.h)(d,u);m.getContext("2d").drawImage(l,p,f,d,u,0,0,d,u);let g=m.toDataURL(n);"function"==typeof o&&o(g,d,u)})}addMark(t,i){if("function"!=typeof i)return!1;"canvas"!==t.nodeName.toLowerCase()&&(t=Object(e.h)(t.width,t.height));let n=t.getContext("2d");this.hasMark?this.markIcon?Object(e.i)(this.markIcon,e=>{this.markX||(this.markX=t.width-e.naturalWidth),this.markY||(this.markY=t.height-e.naturalHeight),n.drawImage(e,this.markX,this.markY),i(t)}):(n.textAlign="end",n.font=this.markFont,n.fillStyle=this.markStyle,this.markX||(this.markX=t.width-10),this.markY||(this.markY=t.height-10),n.fillText(this.markText,this.markX,this.markY),i(t)):i(t)}preview(t){this.$previewContainer&&(this.$previewContainer.innerHTML=`<img src="${t}">`)}download(t){"download"in document.createElement("a")&&this.$downloadBtn&&(this.$downloadBtn.download=(new Date).valueOf()+"_dest."+this.mime.substr(this.mime.indexOf("image/")+6),this.$downloadBtn.href=t)}crop(t,i,n,o,r,s,a,c,l){if(!t)return;let h=Object(e.h)(c,l);h.getContext("2d").drawImage(t,i,n,o,r,s,a,c,l),this.addMark(h,t=>{let i=t.toDataURL("image/jpeg"),n=Object(e.g)(i);if(n>1024*this.maxSize){let o=Math.floor(1024*this.maxSize/n*10)/10;i=Object(e.e)(t,o)}let o=Object(e.b)(i,this.mime);console.log("end compress: "+Math.ceil(o.size/1024));let r=Object(e.c)(o);console.log("formData: "+r),this.preview(i),this.download(i),"function"==typeof this.onCropped&&this.onCropped(i)})}init(){let t,i,n,o,r,s,a=(this.containerSize-this.cropW)/2,c=(this.containerSize-this.cropH)/2;this.$workingContainer.innerHTML='<div class="working-area"><img><div class="mask"></div></div>',this.$workingContainer.querySelector(".working-area").style.cssText=`position: relative;overflow: hidden;width: ${this.containerSize}px;height: ${this.containerSize}px;`,(t=this.$workingContainer.querySelector("img")).style.position="absolute",this.$workingContainer.querySelector(".mask").style.cssText=`position: absolute;width: ${this.cropW}px;height: ${this.cropH}px;border-left: ${a}px solid ${this.maskColor};border-right: ${a}px solid ${this.maskColor};border-top: ${c}px solid ${this.maskColor};border-bottom: ${c}px solid ${this.maskColor};`,Object(e.f)(t,this.$workingContainer);t.addEventListener("load",()=>{i=t.naturalWidth,n=t.naturalHeight;let e=i/n,s=0,a=0;e>1?(o=this.containerSize,r=o/e,s=(this.containerSize-r)/2,a=0):(r=this.containerSize,o=r*e,a=(this.containerSize-o)/2,s=0),t.style.cssText=`position: absolute;width: ${o}px;height: ${r}px;top: ${s}px;left: ${a}px;`},!1),this.sourceImgSrc&&(t.src=this.sourceImgSrc,t.style.width="auto",t.style.height="auto",s=this.sourceImgSrc),this.$selectBtn.addEventListener("click",i=>{Object(e.d)(this.$selectBtn,function(e){t.src=e,t.style.width="auto",t.style.height="auto",s=e},this.onValidateFile)},!1);let l=e=>{let s=i/n;r+=this.scaleStep*e,o=r*s,t.style.width=o+"px",t.style.height=r+"px"};this.$downBtn.addEventListener("click",()=>{l(-1)},!1),this.$upBtn.addEventListener("click",()=>{l(1)},!1),this.$cropBtn.addEventListener("click",()=>{let e=n/r,i=(c-t.offsetTop)*e,o=(a-t.offsetLeft)*e,s=this.cropW*e,l=this.cropH*e;this.crop(t,o,i,s,l,0,0,s,l)},!1),this.$clockwiseBtn.addEventListener("click",()=>{let e=this.getRotateNum(1);this.rotate(s,e,this.mime,(e,i,n)=>{t.src=e})},!1),this.$anticlockwiseBtn.addEventListener("click",()=>{let e=this.getRotateNum(-1);this.rotate(s,e,this.mime,(e,i,n)=>{t.src=e})},!1)}}void 0!==t&&t.exports?t.exports=n:"function"==typeof define&&i(3)?define(function(){return n}):window.PipeImg=n}.call(this,i(2)(t))},function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(t,e){(function(e){t.exports=e}).call(this,{})}]);