! function(t, i) {
	"object" == typeof exports && "object" == typeof module ? module.exports = i() : "function" == typeof define && define
		.amd ? define([], i) : "object" == typeof exports ? exports.CityPicker = i() : t.CityPicker = i()
}(window, (function() {
	return function(t) {
		var i = {};

		function e(s) {
			if (i[s]) return i[s].exports;
			var n = i[s] = {
				i: s,
				l: !1,
				exports: {}
			};
			return t[s].call(n.exports, n, n.exports, e), n.l = !0, n.exports
		}
		return e.m = t, e.c = i, e.d = function(t, i, s) {
			e.o(t, i) || Object.defineProperty(t, i, {
				enumerable: !0,
				get: s
			})
		}, e.r = function(t) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(t, "__esModule", {
				value: !0
			})
		}, e.t = function(t, i) {
			if (1 & i && (t = e(t)), 8 & i) return t;
			if (4 & i && "object" == typeof t && t && t.__esModule) return t;
			var s = Object.create(null);
			if (e.r(s), Object.defineProperty(s, "default", {
					enumerable: !0,
					value: t
				}), 2 & i && "string" != typeof t)
				for (var n in t) e.d(s, n, function(i) {
					return t[i]
				}.bind(null, n));
			return s
		}, e.n = function(t) {
			var i = t && t.__esModule ? function() {
				return t.default
			} : function() {
				return t
			};
			return e.d(i, "a", i), i
		}, e.o = function(t, i) {
			return Object.prototype.hasOwnProperty.call(t, i)
		}, e.p = "", e(e.s = 0)
	}([function(t, i, e) {
		"use strict";

		function s(t) {
			return document.getElementById(t)
		}

		function n(t, i, e) {
			for (var s = t.children, n = 0; n < s.length; n++) s[n].style[i] = e
		}
		e.r(i), e.d(i, "default", (function() {
			return r
		}));
		var h = Symbol("property"),
			r = function() {
				function t(t) {
					this.data = t.data, this.initValue = t.initValue || null, this.valueKey = t.valueKey || "value", this.childKey =
						t.childKey || "child", this.onOk = t.onOk, this.onCancel = t.onCancel || null, this.title = t.title || "",
						this.okText = t.okText || "确定", this.cancelText = t.cancelText || "取消", this.a = t.a || .001, this.style = t
						.style, this[h] = {}, this.initTab(), this.initUI(), this.initEvent()
				}
				var i = t.prototype;
				return i.initTab = function() {
					var t;
					this.wrapId = (t = (new Date).getTime(), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(i) {
							var e = (t + 16 * Math.random()) % 16 | 0;
							return t = Math.floor(t / 16), ("x" === i ? e : 7 & e | 8).toString(16)
						})) + "-wrap"), this.relatedArr = [], this.cityIndex = [], this.liNum = [], this.ulCount = 0, this.renderCount =
						0, this.liHeight = this.style && this.style.liHeight ? this.style.liHeight : 40, this.btnHeight = this.style &&
						this.style.btnHeight ? this.style.btnHeight : 44, this.cityUl = [], this.curDis = [], this.curPos = [],
						this.startY = 0, this.startTime = 0, this.endTime = 0, this.moveY = 0, this.moveTime = 0, this.moveNumber =
						1, this.moveSpeed = [], this.abled = !0, this.containerId = this.wrapId + "-container", this.boxId = this.wrapId +
						"-box", this.contentId = this.wrapId + "-content", this.cancelId = this.wrapId + "-cancel", this.okId =
						this.wrapId + "-ok", this.titleId = this.wrapId + "-title"
				}, i.initUI = function() {
					this.createContainer(), this.relatedArr[0] = this.data, this.liNum[0] = this.relatedArr[0].length, this.initValue ?
						this.setInitailOption(this.initValue, !0) : (this.cityIndex[0] = 0, this.curDis[0] = 0, this.getRelatedArr(
							this.relatedArr[0][0], 0), this.updateChildData(0), this.renderContent())
				}, i.initEvent = function() {
					var t = this;
					this.container = s(this.containerId), s(this.okId).addEventListener("click", (function() {
						t.onOk(t.getResult()), t.hide()
					})), s(this.cancelId).addEventListener("click", (function() {
						t.onCancel && t.onCancel(), t.hide()
					})), this.wrap.addEventListener("click", (function(i) {
						i.target.id === t.wrapId && t.wrap.classList.contains("hg-picker-bg-show") && (t.onCancel && t.onCancel(),
							t.hide())
					}))
				}, i.setInitailOption = function(t, i) {
					for (var e = [], s = 0; s < t.length; s++)
						if (0 === s) {
							var n = this.getValue(this.data).indexOf(t[s]);
							if (!(n > -1)) throw Error("The matching initValue cannot be found");
							e.unshift(n)
						} else {
							this.getRelatedArr(this.relatedArr[s - 1][e[0]], s - 1);
							var h = this.getValue(this.relatedArr[s]).indexOf(t[s]);
							if (!(h > -1)) throw Error("The matching initValue cannot be found");
							e.unshift(h)
						} var r = e.reverse();
					this.ulCount = r.length, this.cityIndex = r;
					for (var l = 0; l < r.length; l++) this.curDis[l] = -1 * this.liHeight * r[l], l >= 1 && (this.liNum[l] =
						this.relatedArr[l].length);
					if (i) {
						this.renderContent();
						for (var o = 0; o < this.ulCount; o++) this.roll(o)
					} else
						for (var a = 0; a < this.ulCount; a++) this.updateView(a), this.roll(a)
				}, i.createContainer = function() {
					var t = document.createElement("div");
					t.id = this.wrapId, document.body.appendChild(t), this.wrap = s(this.wrapId), this.wrap.classList.add(
						"hg-picker-bg")
				}, i.getRelatedArr = function(t, i) {
					"object" == typeof t && this.childKey in t && t[this.childKey].length > 0 && (this.relatedArr[i + 1] = t[
						this.childKey], this.renderCount++, this.getRelatedArr(t[this.childKey][0], ++i))
				}, i.updateChildData = function(t) {
					this.ulCount = t + 1 + this.renderCount;
					for (var i = t + 1; i < this.ulCount; i++) this.liNum[i] = this.relatedArr[i].length, this.cityIndex[i] = 0,
						this.curDis[i] = 0
				}, i.getValue = function(t) {
					for (var i = [], e = 0; e < t.length; e++) "object" == typeof t[e][this.valueKey] ? i.push(t[e][this.valueKey]
						[this.valueKey]) : i.push(t[e][this.valueKey]);
					return i
				}, i.renderContent = function() {
					var t = '<div class="hg-picker-btn-box" id="' + this.boxId + '"><div class="hg-picker-btn" id="' + this.cancelId +
						'">' + this.cancelText + '</div><div class="hg-picker-btn" id="' + this.okId + '">' + this.okText +
						'</div><span id="' + this.titleId + '" >' + this.title + "</span> </div>",
						i = '<div class="hg-picker-content" id="' + this.contentId +
						'"><div class="hg-picker-up-shadow"></div><div class="hg-picker-down-shadow"></div><div class="hg-picker-line"></div></div>',
						e = "";
					e = this.style && "bottom" === this.style.btnLocation ? '<div  class="hg-picker-container" id="' + this.containerId +
						'">' + i + t + "</div>" : '<div  class="hg-picker-container" id="' + this.containerId + '">' + t + i +
						"</div>", this.wrap.innerHTML = e;
					for (var s = 0; s < this.ulCount; s++) this.renderUl(s), this.bindRoll(s);
					this.setStyle(), this.setUlWidth()
				}, i.setStyle = function() {
					if (this.style) {
						var t = this.style,
							i = s(this.containerId),
							e = s(this.contentId),
							h = s(this.boxId),
							r = s(this.okId),
							l = s(this.cancelId),
							o = e.children.length;
						if (40 !== t.liHeight) {
							for (var a = 0; a < this.ulCount; a++) n(e.children[a], "height", this.liHeight + "px");
							e.children[o - 3].style.height = 2 * this.liHeight + "px", e.children[o - 2].style.height = 2 * this.liHeight +
								"px", e.children[o - 1].style.height = this.liHeight + "px", e.children[o - 1].style.top = 2 * this.liHeight +
								"px", e.style.height = 5 * this.liHeight + "px", e.style.lineHeight = this.liHeight + "px"
						}
						44 !== t.btnHeight && (h.style.height = this.btnHeight + "px", h.style.lineHeight = this.btnHeight + "px"),
							t.btnOffset && (r.style.marginRight = t.btnOffset, l.style.marginLeft = t.btnOffset), 40 === t.liHeight &&
							44 === t.btnHeight || (i.style.height = 5 * this.liHeight + this.btnHeight + "px"), t.titleColor && (h.style
								.color = t.titleColor), t.sureColor && (r.style.color = t.sureColor), t.cancelColor && (l.style.color = t
								.cancelColor), t.btnBgColor && (h.style.backgroundColor = t.btnBgColor), t.contentColor && (e.style.color =
								t.contentColor), t.contentBgColor && (e.style.backgroundColor = t.contentBgColor), t.upShadowColor && (e.children[
								o - 3].style.backgroundImage = t.upShadowColor), t.downShadowColor && (e.children[o - 2].style.backgroundImage =
								t.downShadowColor), t.lineColor && (e.children[o - 1].style.borderColor = t.lineColor)
					}
				}, i.renderUl = function(t) {
					var i = s(this.contentId),
						e = document.createElement("ul");
					e.setAttribute("id", this.wrapId + "-ul-" + t), i.insertBefore(e, i.children[i.children.length - 3]), this.cityUl[
						t] = s(this.wrapId + "-ul-" + t), this.renderLi(t)
				}, i.renderLi = function(t) {
					this.cityUl[t].innerHTML = "";
					var i = "<li></li><li></li>";
					this.getValue(this.relatedArr[t]).forEach((function(t, e) {
						i += "<li>" + t + "</li>"
					})), i += "<li></li><li></li>", this.cityUl[t].innerHTML = i, 40 !== this.liHeight && n(this.cityUl[t],
						"height", this.liHeight + "px")
				}, i.setUlWidth = function() {
					for (var t = 0; t < this.ulCount; t++) this.cityUl[t].style.width = (100 / this.ulCount).toFixed(2) + "%"
				}, i.bindRoll = function(t) {
					var i = this;
					this.cityUl[t].addEventListener("touchstart", (function() {
						i.touch(t)
					}), !1), this.cityUl[t].addEventListener("touchmove", (function() {
						i.touch(t)
					}), !1), this.cityUl[t].addEventListener("touchend", (function() {
						i.touch(t)
					}), !0)
				}, i.roll = function(t, i) {
					(this.curDis[t] || 0 === this.curDis[t]) && (this.cityUl[t].style.transform = "translate3d(0, " + this.curDis[
							t] + "px, 0)", this.cityUl[t].style.webkitTransform = "translate3d(0, " + this.curDis[t] + "px, 0)", i &&
						(this.cityUl[t].style.transition = "transform " + i + "s ease-out", this.cityUl[t].style.webkitTransition =
							"-webkit-transform " + i + "s ease-out"))
				}, i.touch = function(t) {
					var i, e, s = window.event;
					switch (s.preventDefault(), s.type) {
						case "touchstart":
							if (this.startTime = new Date, this.startTime - this.endTime < 200) return void(this.abled = !1);
							this.abled = !0, this.startY = s.touches[0].clientY, this.curPos[t] = this.curDis[t], this.moveNumber = 1,
								this.moveSpeed = [];
							break;
						case "touchmove":
							if (!this.abled) return;
							s.preventDefault(), this.moveY = s.touches[0].clientY;
							var n = this.startY - this.moveY;
							this.curDis[t] = this.curPos[t] - n, this.curDis[t] >= 1.5 * this.liHeight && (this.curDis[t] = 1.5 * this
									.liHeight), this.curDis[t] <= -1 * (this.liNum[t] - 1 + 1.5) * this.liHeight && (this.curDis[t] = -1 * (
									this.liNum[t] - 1 + 1.5) * this.liHeight), this.roll(t), this.moveTime - this.startTime >= 130 * this.moveNumber &&
								(this.moveNumber++, this.moveSpeed.push(n / (this.moveTime - this.startTime)));
							break;
						case "touchend":
							if (!this.abled) return;
							this.endTime = Date.now();
							var h = null;
							h = 1 === this.moveNumber ? (this.startY - s.changedTouches[0].clientY) / (this.endTime - this.startTime) :
								this.moveSpeed[this.moveSpeed.length - 1], this.curDis[t] = this.curDis[t] - (i = h, e = this.a, Math.abs(
									i) < .25 ? 0 : i / Math.abs(i) * (.5 * i * i / e)), this.fixate(t)
					}
				}, i.fixate = function(t) {
					this.renderCount = 0, this.getPosition(t), this.getRelatedArr(this.relatedArr[t][this.cityIndex[t]], t),
						this.updateChildData(t), this.updateView(t);
					for (var i = t; i < this.ulCount; i++) this.roll(i, .2)
				}, i.getPosition = function(t) {
					this.curDis[t] <= -1 * (this.liNum[t] - 1) * this.liHeight ? this.cityIndex[t] = this.liNum[t] - 1 : this.curDis[
							t] >= 0 ? this.cityIndex[t] = 0 : this.cityIndex[t] = -1 * Math.round(this.curDis[t] / this.liHeight),
						this.curDis[t] = -1 * this.liHeight * this.cityIndex[t]
				}, i.updateView = function(t) {
					var i, e = s(this.contentId).children.length - 3;
					if (this.ulCount === e)
						for (var n = t + 1; n < this.ulCount; n++) this.renderLi(n);
					else if (this.ulCount > e) {
						for (var h = t + 1; h < e; h++) this.renderLi(h);
						for (var r = e; r < this.ulCount; r++) this.renderUl(r), this.bindRoll(r);
						this.setUlWidth()
					} else {
						for (var l = t + 1; l < this.ulCount; l++) this.renderLi(l);
						for (var o = this.ulCount; o < e; o++)(i = this.cityUl[o]).parentNode.removeChild(i);
						this.setUlWidth()
					}
				}, i.getResult = function() {
					for (var t = [], i = 0; i < this.ulCount; i++) t.push(this.relatedArr[i][this.cityIndex[i]]);
					return t
				}, i.show = function() {
					this.wrap.classList.add("hg-picker-bg-show"), this.container.classList.add("hg-picker-container-up")
				}, i.hide = function() {
					this.wrap.classList.remove("hg-picker-bg-show"), this.container.classList.remove("hg-picker-container-up")
				}, i.set = function(t) {
					for (var i = 0, e = Object.entries(t); i < e.length; i++) {
						var n = e[i],
							r = n[0],
							l = n[1];
						/^(title|cancelText|okText|valueKey|childKey|a|onOk|onCancel|initValue)$/.test(r) ? (this[r] = l, "title" ===
							r ? s(this.titleId).innerHTML = l : "okText" === r ? s(this.okId).innerHTML = l : "cancelText" === r ? s(
								this.cancelId).innerHTML = l : "initValue" === r && this.setInitailOption(l)) : this[h][r] = l
					}
					return this
				}, i.get = function(t) {
					return /^(title|cancelText|okText|valueKey|childKey|a|onOk|onCancel|initValue)$/.test(t) ? this[t] : this[h]
						[t]
				}, i.destroy = function() {
					s(this.wrapId).remove()
				}, t
			}()
	}]).default
}));
