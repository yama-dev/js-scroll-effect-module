!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SCROLL_EFFECT_MODULE=t():e.SCROLL_EFFECT_MODULE=t()}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){window,e.exports=function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return i(e,[{key:"isDom",value:function(e){try{return e instanceof HTMLElement}catch(e){return!1}}},{key:"isStr",value:function(e){try{return"string"==typeof e}catch(e){return!1}}},{key:"selectDom",value:function(e){if(!e)return!1;var t=void 0;if(!Array.isArray(e)&&!e.length||this.isStr(e))t=this.isDom(e)?Array(e):Array.prototype.slice.call(document.querySelectorAll(e));else{if(!this.isDom(e[0]))return!1;t=Array.prototype.slice.call(e)}return 0===t.length&&(t=null),t}},{key:"hasClass",value:function(e,t){return this.isDom(e)?e.classList.contains(t):document.querySelector(e).classList.contains(t)}},{key:"addClass",value:function(e,t){var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.classList.add(t)})}},{key:"removeClass",value:function(e,t){var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.classList.remove(t)})}},{key:"toggleClass",value:function(e,t){var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.classList.toggle(t)})}},{key:"setHtml",value:function(e,t){var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.innerHTML=t})}},{key:"appendHtml",value:function(e,t){var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.innerHTML+=t})}},{key:"addEvent",value:function(e,t,n){if(e===window)window.addEventListener(t,n);else{var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.addEventListener(t,n)})}}},{key:"removeEvent",value:function(e,t,n){if(e===window)window.removeEventListener(t,n);else{var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.removeEventListener(t,n)})}}},{key:"setStyle",value:function(e,t){var n=this.selectDom(e);if(!n)return!1;n.map(function(e){var n="";Object.keys(t).forEach(function(e){n+=e.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+t[e]+";"}),e.setAttribute("style",n)})}}]),e}();
/*!
 * JS DOM (JavaScript Library)
 *   js-dom.js
 * Version 0.0.6
 * Repository https://github.com/yama-dev/js-dom
 * Copyright yama-dev
 * Licensed under the MIT license.
 */t.default=o}]).default},function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();
/*!
 * JS SCROLL EFFECT MODULE (JavaScript Library)
 *   js-scroll-effect-module
 * versoin 0.3.0
 * Repository https://github.com/yama-dev/js-scroll-effect-module
 * Copyright yama-dev
 * Licensed under the MIT license.
 */
var s=new o.a,a=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.Version="0.2.0",this.CurrentUrl=location.href,this.Config={elem:t.elem,displayRatio:t.displayRatio||.7,displayReverse:t.displayReverse||!1,firstElem:t.firstElem||null,firstElemDelayTime:t.firstElemDelayTime||0,firstDelayTime:t.firstDelayTime||300,loadDelayTime:t.loadDelayTime||0,addClassNameActive:t.addClassNameActive||"is-active",acceleration:t.acceleration||!1},this.NumScrolltopPre=window.pageYOffset,this.NumScrolltop=this.NumScrolltopPre,this.NumAcceleration=0,t.on||(t.on={}),this.on={In:t.on.In||"",Out:t.on.Out||"",Acceleration:t.on.Acceleration||""},this.PosList=[],this.PosListFix=[],this.PosListNoneFix=[],document.addEventListener("DOMContentLoaded",function(){n.CacheDom(),n.BindEvent()})}return r(e,[{key:"BindEvent",value:function(){var e=this;window.addEventListener("load",function(){setTimeout(function(){setTimeout(function(){e.Update(),e.StoreElementStateAtPosList("load")},e.Config.firstDelayTime)},e.Config.loadDelayTime)}),window.addEventListener("resize",function(){e.Update()}),window.addEventListener("scroll",function(){e.StoreElementStateAtPosList("scroll")})}},{key:"CacheDom",value:function(){this.$elemItem=s.selectDom(this.Config.elem),this.$elemItemFirst=s.selectDom(this.Config.firstElem)}},{key:"CacheDomSize",value:function(){this.NumWindowHeight=window.innerHeight}},{key:"SetDom",value:function(){var e=this;this.PosList=[],this.NumScrolltop=window.pageYOffset;var t=s.selectDom(this.$elemItem);t&&t.map(function(t,n){e.PosList.push(t.getBoundingClientRect().top+e.NumScrolltop)})}},{key:"Update",value:function(){this.CacheDom(),this.CacheDomSize(),this.SetDom()}},{key:"Refresh",value:function(){this.Update(),this.Clear(),this.ActionAddClass()}},{key:"Clear",value:function(){var e=this;this.PosList.map(function(t,n){s.removeClass(e.$elemItem[n],e.Config.addClassNameActive)})}},{key:"StoreElementStateAtPosList",value:function(e){var t=this;this.PosListFix=[],this.PosListNoneFix=[],this.NumScrolltop=window.pageYOffset,this.PosList.map(function(e,n){t.NumScrolltop+t.NumWindowHeight*t.Config.displayRatio>e?t.PosListFix.push(n):t.PosListNoneFix.push(n)}),this.Config.acceleration&&(Math.abs(this.NumAcceleration)<=Math.abs(this.NumScrolltop-this.NumScrolltopPre)&&(this.NumAcceleration=this.NumScrolltop-this.NumScrolltopPre,this.NumAcceleration>=100&&(this.NumAcceleration=100),this.NumAcceleration<=-100&&(this.NumAcceleration=-100),clearInterval(this.Interval),this.CheckAcceleration()),this.on.Acceleration&&"function"==typeof this.on.Acceleration&&this.on.Acceleration(this.NumAcceleration)),"load"===e?this.ActionAddClassFirst():"scroll"===e&&this.ActionAddClass(),this.NumScrolltopPre=this.NumScrolltop}},{key:"CheckAcceleration",value:function(){var e=this;this.Interval=setInterval(function(){var t=Math.pow(1.02,Math.abs(e.NumAcceleration))-.6;e.NumAcceleration>0?e.NumAcceleration=e.NumAcceleration-t:e.NumAcceleration<0&&(e.NumAcceleration=e.NumAcceleration+t),e.NumAcceleration=Math.ceil(100*e.NumAcceleration)/100,e.NumAcceleration>-.8&&e.NumAcceleration<.8&&(e.NumAcceleration=0,clearInterval(e.Interval)),e.on.Acceleration&&"function"==typeof e.on.Acceleration&&e.on.Acceleration(e.NumAcceleration)},10)}},{key:"ActionAddClassFirst",value:function(){var e=this,t=0;this.$elemItemFirst?function n(){setTimeout(function(){s.addClass(e.$elemItemFirst[t],e.Config.addClassNameActive),++t<e.$elemItemFirst.length&&n()},e.Config.firstElemDelayTime),e.$elemItemFirst.length==t&&setTimeout(function(){e.StoreElementStateAtPosList("scroll")},e.Config.firstElemDelayTime)}():setTimeout(function(){e.StoreElementStateAtPosList("scroll")},this.Config.firstElemDelayTime)}},{key:"ActionAddClass",value:function(){var e=this;this.PosListFix.map(function(t,n){s.hasClass(e.$elemItem[t],e.Config.addClassNameActive)||(s.addClass(e.$elemItem[t],e.Config.addClassNameActive),e.on.In&&"function"==typeof e.on.In&&e.on.In(e.$elemItem[t],t,e.NumScrolltop))}),this.Config.displayReverse&&this.PosListNoneFix.map(function(t,n){s.hasClass(e.$elemItem[t],e.Config.addClassNameActive)&&(s.removeClass(e.$elemItem[t],e.Config.addClassNameActive),e.on.Out&&"function"==typeof e.on.Out&&e.on.Out(e.$elemItem[t],t,e.NumScrolltop))})}}]),e}();t.default=a}]).default});