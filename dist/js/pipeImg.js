"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (t) {
  var e = {};function i(n) {
    if (e[n]) return e[n].exports;var o = e[n] = { i: n, l: !1, exports: {} };return t[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
  }i.m = t, i.c = e, i.d = function (t, e, n) {
    i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;if (4 & e && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.__esModule) return t;var n = Object.create(null);if (i.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) {
      i.d(n, o, function (e) {
        return t[e];
      }.bind(null, o));
    }return n;
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return i.d(e, "a", e), e;
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, i.p = "", i(i.s = 1);
}([function (t, e, i) {
  "use strict";
  function n(t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var i = arguments[2];
    if (!t) return;var n = void 0,
        o = void 0,
        r = void 0,
        s = void 0,
        a = void 0,
        c = void 0,
        l = !1,
        h = function h(e) {
      e = e || window.event, n = e.clientX, o = e.clientY;var i = t.getBoundingClientRect();r = i.left, s = i.top, l = !0;
    },
        d = function d(e) {
      if (e = e || window.event, l) {
        var _l = e.clientX,
            _h = e.clientY;a = _l - n + r, c = _h - o + s, t.style.left = a, t.style.top = c, "function" == typeof i && i(a, c);
      }
    },
        u = function u(t) {
      l = !1;
    };window.addEventListener && (e.addEventListener("mousedown", h, !1), document.addEventListener("mousemove", d, !1), document.addEventListener("mouseup", u, !1));
  }function o(t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }function r(t, e) {
    var i = new Image();i.setAttribute("crossorigin", "anonymous"), i.src = t, i.onload = function () {
      "function" == typeof e && e(i);
    }, i.onerror = function () {
      console.log("Error: image error!");
    };
  }function s(t, e) {
    var i = document.createElement("canvas");return i.width = t, i.height = e, i;
  }function a(t) {
    var e = t.replace(/^data:image\/[\w]*;base64,$/, ""),
        i = e.indexOf("=");i > 0 && (e = e.substring(0, i));var n = e.length;return parseInt(n - n / 8 * 2);
  }function c(t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .6;
    var i = arguments[2];
    var n = arguments[3];
    var o = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "images/jpeg";
    var r = s(i, n),
        a = r.getContext("2d");return i && n ? a.drawImage(t, 0, 0, i, n) : a.drawImage(t, 0, 0), r.toDataURL(o, e);
  }function l(t, e) {
    var i = atob(t.split(",")[1]),
        n = i.length,
        o = new Uint8Array(n);e || (e = t.substring(t.indexOf("data:") + 5, t.indexOf(";base64")));for (var r = 0; r < n; r++) {
      o[r] = i.charCodeAt(r);
    }return new Blob([o], { type: e });
  }function h(t, e) {
    var i = new FormData();return i.append("file", t), e || (e = new Date().getTime()), i.append("fileName", e), i;
  }function d(t, e, i) {
    var n = "string" == typeof t ? document.querySelector(t) : t,
        o = n.querySelector("input[type=file]");if (!o) {
      var _t = document.createElement("input");_t.setAttribute("type", "file"), _t.style.cssText = "display: none;", n.appendChild(_t), o = n.querySelector("input[type=file]");
    }o.addEventListener("change", function (t) {
      if (this.files.length > 0) {
        var _t2 = this.files[0],
            _n = !0;if ("function" == typeof i && !1 === i(_t2) && (_n = !1), _n) {
          var _i = new FileReader();_i.readAsDataURL(_t2), _i.onload = function () {
            "function" == typeof e && e(this.result);
          };
        } else console.log("onValidateFile function return false");
      }
    }, !1), o.addEventListener("click", function (t) {
      t.stopPropagation();
    }), o.click();
  }i.d(e, "f", function () {
    return n;
  }), i.d(e, "a", function () {
    return o;
  }), i.d(e, "i", function () {
    return r;
  }), i.d(e, "h", function () {
    return s;
  }), i.d(e, "g", function () {
    return a;
  }), i.d(e, "e", function () {
    return c;
  }), i.d(e, "b", function () {
    return l;
  }), i.d(e, "c", function () {
    return h;
  }), i.d(e, "d", function () {
    return d;
  });
}, function (t, e, i) {
  "use strict";
  i.r(e), function (t) {
    var e = i(0);
    var n = function () {
      function n(t) {
        _classCallCheck(this, n);

        this.options = _extends({ selectBtn: "#J-select-btn", upBtn: "#J-up-btn", downBtn: "#J-down-btn", anticlockwiseBtn: "#J-anticlockwise-btn", clockwiseBtn: "#J-clockwise-btn", cropBtn: "#J-crop-btn", downloadBtn: "#J-download-btn", workingContainer: "#J-working-container", previewContainer: "#J-preview-container", maxSize: 500, scaleStep: 10, containerSize: 500, cropW: 300, cropH: 300, mime: "image/jpeg", maskColor: "rgba(0, 0, 0, 0.8)", hasMark: !0, markIcon: null, markFont: "16px microsoft yahei", markStyle: "#fff", markText: "UED", markX: 0, markY: 0, sourceImgSrc: null, onValidateFile: function onValidateFile(t) {}, onCropped: function onCropped(t) {} }, t), this.$selectBtn = Object(e.a)(this.options.selectBtn), this.$upBtn = Object(e.a)(this.options.upBtn), this.$downBtn = Object(e.a)(this.options.downBtn), this.$anticlockwiseBtn = Object(e.a)(this.options.anticlockwiseBtn), this.$clockwiseBtn = Object(e.a)(this.options.clockwiseBtn), this.$cropBtn = Object(e.a)(this.options.cropBtn), this.$downloadBtn = Object(e.a)(this.options.downloadBtn), this.$workingContainer = Object(e.a)(this.options.workingContainer), this.$previewContainer = Object(e.a)(this.options.previewContainer), this.maxSize = this.options.maxSize, this.scaleStep = this.options.scaleStep, this.containerSize = this.options.containerSize, this.cropW = this.options.cropW <= this.containerSize ? this.options.cropW : this.containerSize, this.cropH = this.options.cropH <= this.containerSize ? this.options.cropH : this.containerSize, this.mime = this.options.mime, this.maskColor = this.options.maskColor, this.hasMark = this.options.hasMark, this.markIcon = this.options.markIcon, this.markFont = this.options.markFont, this.markStyle = this.options.markStyle, this.markText = this.options.markText, this.markX = this.options.markX, this.markY = this.options.markY, this.sourceImgSrc = this.options.sourceImgSrc, this.onValidateFile = this.options.onValidateFile, this.onCropped = this.options.onCropped, this.rotateCount = 0, this.init();
      }

      _createClass(n, [{
        key: "getRotateNum",
        value: function getRotateNum(t) {
          var e = 0;return this.rotateCount += t, (this.rotateCount > 3 || this.rotateCount < -3) && (this.rotateCount = 0), e = this.rotateCount < 0 ? 4 + this.rotateCount : this.rotateCount;
        }
      }, {
        key: "rotate",
        value: function rotate(t, i, n, o) {
          Object(e.i)(t, function (t) {
            var r = 90 * i,
                s = t.naturalWidth,
                a = t.naturalHeight,
                c = Math.max(s, a),
                l = Object(e.h)(c, c),
                h = l.getContext("2d");h.translate(c / 2, c / 2), h.rotate(r * Math.PI / 180), h.translate(-c / 2, -c / 2), h.drawImage(t, 0, 0);var d = s,
                u = a,
                p = 0,
                f = 0;1 === i ? (u = s, p = c - (d = a), f = 0) : 2 === i ? (p = c - (d = s), f = c - (u = a)) : 3 === i ? (d = a, p = 0, f = c - (u = s)) : (d = s, u = a, p = 0, f = 0);var m = Object(e.h)(d, u);m.getContext("2d").drawImage(l, p, f, d, u, 0, 0, d, u);var g = m.toDataURL(n);"function" == typeof o && o(g, d, u);
          });
        }
      }, {
        key: "addMark",
        value: function addMark(t, i) {
          var _this = this;

          if ("function" != typeof i) return !1;"canvas" !== t.nodeName.toLowerCase() && (t = Object(e.h)(t.width, t.height));var n = t.getContext("2d");this.hasMark ? this.markIcon ? Object(e.i)(this.markIcon, function (e) {
            _this.markX || (_this.markX = t.width - e.naturalWidth), _this.markY || (_this.markY = t.height - e.naturalHeight), n.drawImage(e, _this.markX, _this.markY), i(t);
          }) : (n.textAlign = "end", n.font = this.markFont, n.fillStyle = this.markStyle, this.markX || (this.markX = t.width - 10), this.markY || (this.markY = t.height - 10), n.fillText(this.markText, this.markX, this.markY), i(t)) : i(t);
        }
      }, {
        key: "preview",
        value: function preview(t) {
          this.$previewContainer && (this.$previewContainer.innerHTML = "<img src=\"" + t + "\">");
        }
      }, {
        key: "download",
        value: function download(t) {
          "download" in document.createElement("a") && this.$downloadBtn && (this.$downloadBtn.download = new Date().valueOf() + "_dest." + this.mime.substr(this.mime.indexOf("image/") + 6), this.$downloadBtn.href = t);
        }
      }, {
        key: "crop",
        value: function crop(t, i, n, o, r, s, a, c, l) {
          var _this2 = this;

          if (!t) return;var h = Object(e.h)(c, l);h.getContext("2d").drawImage(t, i, n, o, r, s, a, c, l), this.addMark(h, function (t) {
            var i = t.toDataURL("image/jpeg"),
                n = Object(e.g)(i);if (n > 1024 * _this2.maxSize) {
              var _o = Math.floor(1024 * _this2.maxSize / n * 10) / 10;i = Object(e.e)(t, _o);
            }var o = Object(e.b)(i, _this2.mime);console.log("end compress: " + Math.ceil(o.size / 1024));var r = Object(e.c)(o);console.log("formData: " + r), _this2.preview(i), _this2.download(i), "function" == typeof _this2.onCropped && _this2.onCropped(i);
          });
        }
      }, {
        key: "init",
        value: function init() {
          var _this3 = this;

          var t = void 0,
              i = void 0,
              n = void 0,
              o = void 0,
              r = void 0,
              s = void 0,
              a = (this.containerSize - this.cropW) / 2,
              c = (this.containerSize - this.cropH) / 2;this.$workingContainer.innerHTML = '<div class="working-area"><img><div class="mask"></div></div>', this.$workingContainer.querySelector(".working-area").style.cssText = "position: relative;overflow: hidden;width: " + this.containerSize + "px;height: " + this.containerSize + "px;", (t = this.$workingContainer.querySelector("img")).style.position = "absolute", this.$workingContainer.querySelector(".mask").style.cssText = "position: absolute;width: " + this.cropW + "px;height: " + this.cropH + "px;border-left: " + a + "px solid " + this.maskColor + ";border-right: " + a + "px solid " + this.maskColor + ";border-top: " + c + "px solid " + this.maskColor + ";border-bottom: " + c + "px solid " + this.maskColor + ";", Object(e.f)(t, this.$workingContainer);t.addEventListener("load", function () {
            i = t.naturalWidth, n = t.naturalHeight;var e = i / n,
                s = 0,
                a = 0;e > 1 ? (o = _this3.containerSize, r = o / e, s = (_this3.containerSize - r) / 2, a = 0) : (r = _this3.containerSize, o = r * e, a = (_this3.containerSize - o) / 2, s = 0), t.style.cssText = "position: absolute;width: " + o + "px;height: " + r + "px;top: " + s + "px;left: " + a + "px;";
          }, !1), this.sourceImgSrc && (t.src = this.sourceImgSrc, t.style.width = "auto", t.style.height = "auto", s = this.sourceImgSrc), this.$selectBtn.addEventListener("click", function (i) {
            Object(e.d)(_this3.$selectBtn, function (e) {
              t.src = e, t.style.width = "auto", t.style.height = "auto", s = e;
            }, _this3.onValidateFile);
          }, !1);var l = function l(e) {
            var s = i / n;r += _this3.scaleStep * e, o = r * s, t.style.width = o + "px", t.style.height = r + "px";
          };this.$downBtn.addEventListener("click", function () {
            l(-1);
          }, !1), this.$upBtn.addEventListener("click", function () {
            l(1);
          }, !1), this.$cropBtn.addEventListener("click", function () {
            var e = n / r,
                i = (c - t.offsetTop) * e,
                o = (a - t.offsetLeft) * e,
                s = _this3.cropW * e,
                l = _this3.cropH * e;_this3.crop(t, o, i, s, l, 0, 0, s, l);
          }, !1), this.$clockwiseBtn.addEventListener("click", function () {
            var e = _this3.getRotateNum(1);_this3.rotate(s, e, _this3.mime, function (e, i, n) {
              t.src = e;
            });
          }, !1), this.$anticlockwiseBtn.addEventListener("click", function () {
            var e = _this3.getRotateNum(-1);_this3.rotate(s, e, _this3.mime, function (e, i, n) {
              t.src = e;
            });
          }, !1);
        }
      }]);

      return n;
    }();

    void 0 !== t && t.exports ? t.exports = n : "function" == typeof define && i(3) ? define(function () {
      return n;
    }) : window.PipeImg = n;
  }.call(this, i(2)(t));
}, function (t, e) {
  t.exports = function (t) {
    if (!t.webpackPolyfill) {
      var e = Object.create(t);e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function get() {
          return e.l;
        } }), Object.defineProperty(e, "id", { enumerable: !0, get: function get() {
          return e.i;
        } }), Object.defineProperty(e, "exports", { enumerable: !0 }), e.webpackPolyfill = 1;
    }return e;
  };
}, function (t, e) {
  (function (e) {
    t.exports = e;
  }).call(this, {});
}]);