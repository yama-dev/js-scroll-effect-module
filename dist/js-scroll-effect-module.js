/*!
 * @yama-dev/js-scroll-effect-module
 * Version 0.8.0
 * Repository https://github.com/yama-dev/js-scroll-effect-module
 * Copyright yama-dev
 * Licensed MIT
 */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(window,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function i(t){try{return t instanceof HTMLElement}catch(t){return!1}}function o(t){if(!t)return!1;var e;if(!Array.isArray(t)&&!t.length||function(t){try{return"string"==typeof t}catch(t){return!1}}(t))e=i(t)?Array(t):Array.prototype.slice.call(document.querySelectorAll(t));else{if(!i(t[0]))return!1;e=Array.prototype.slice.call(t)}return 0===e.length&&(e=null),e}function a(t,e){return i(t)?t.classList.contains(e):document.querySelector(t).classList.contains(e)}function r(t,e){var n=o(t);if(!n)return!1;n.map((function(t){t.classList.add(e)}))}function s(t,e){var n=o(t);if(!n)return!1;n.map((function(t){t.classList.remove(e)}))}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function c(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e),n.d(e,"SCROLL_EFFECT_MODULE",(function(){return u}));var u=function(){function t(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.Version="0.7.2",this.State={NumScrolltopPre:window.pageYOffset,NumScrolltop:window.pageYOffset,NumAcceleration:0,PosList:[],PosListFixPre:[],PosListFix:[],PosListNoneFix:[]};this.Config=l({elem:null,firstElem:null,displayRatio:.8,displayReverse:!1,firstDelay:10,firstDelaySteps:100,addClassNameActive:"is-active",acceleration:!1,on:{Scroll:null,Change:null,In:null,Out:null,Acceleration:null}},n),"complete"==document.readyState||"interactive"==document.readyState?(this.CacheDom(),this.BindEvent()):document.addEventListener("DOMContentLoaded",(function(){e.CacheDom(),e.BindEvent()}))}var e,n,i;return e=t,(n=[{key:"BindEvent",value:function(){var t=this;setTimeout((function(){t.Update(),t.StoreElementStateAtPosList("load")}),this.Config.firstDelay),window.addEventListener("resize",(function(){t.Update()})),window.addEventListener("scroll",(function(){t.StoreElementStateAtPosList("scroll")}))}},{key:"CacheDom",value:function(){this.$elemItem=o(this.Config.elem),this.$elemItemFirst=o(this.Config.firstElem)}},{key:"CacheDomSize",value:function(){this.NumWindowHeight=window.innerHeight}},{key:"SetDom",value:function(){var t=this;this.State.PosList=[],this.State.NumScrolltop=window.pageYOffset;var e=o(this.$elemItem);e&&e.map((function(e,n){var i={index:n,pos:e.getBoundingClientRect().top+t.State.NumScrolltop,count:0};t.State.PosList.push(i)}))}},{key:"Update",value:function(){this.CacheDom(),this.CacheDomSize(),this.SetDom()}},{key:"Refresh",value:function(){this.Update(),this.Clear(),this.ActionChange()}},{key:"Clear",value:function(){var t=this;this.State.PosList.map((function(e,n){s(t.$elemItem[n],t.Config.addClassNameActive)}))}},{key:"StoreElementStateAtPosList",value:function(t){var e=this;this.State.PosListFix=[],this.State.PosListNoneFix=[],this.State.NumScrolltop=window.pageYOffset,this.State.PosList.map((function(n,i){e.State.NumScrolltop+e.NumWindowHeight*e.Config.displayRatio>n.pos?("load"===t&&n.count++,e.State.PosListFix.push(n)):e.State.PosListNoneFix.push(n)})),this.Config.acceleration&&(Math.abs(this.State.NumAcceleration)<=Math.abs(this.State.NumScrolltop-this.State.NumScrolltopPre)&&(this.State.NumAcceleration=this.State.NumScrolltop-this.State.NumScrolltopPre,this.State.NumAcceleration>=100&&(this.State.NumAcceleration=100),this.State.NumAcceleration<=-100&&(this.State.NumAcceleration=-100),clearInterval(this.Interval),this.CheckAcceleration()),this.Config.on.Acceleration&&"function"==typeof this.Config.on.Acceleration&&this.Config.on.Acceleration(this.State.NumAcceleration)),"load"===t?this.ActionChangeFirst():"scroll"===t&&this.State.PosListFixPre.length!==this.State.PosListFix.length&&this.ActionChange(),this.Config.on.Scroll&&"function"==typeof this.Config.on.Scroll&&this.Config.on.Scroll(this.State.NumScrolltop),this.State.NumScrolltopPre=this.State.NumScrolltop,this.State.PosListFixPre=this.State.PosListFix}},{key:"CheckAcceleration",value:function(){var t=this;this.Interval=setInterval((function(){var e=Math.pow(1.02,Math.abs(t.State.NumAcceleration))-.6;t.State.NumAcceleration>0?t.State.NumAcceleration=t.State.NumAcceleration-e:t.State.NumAcceleration<0&&(t.State.NumAcceleration=t.State.NumAcceleration+e),t.State.NumAcceleration=Math.ceil(100*t.State.NumAcceleration)/100,t.State.NumAcceleration>-.8&&t.State.NumAcceleration<.8&&(t.State.NumAcceleration=0,clearInterval(t.Interval)),t.Config.on.Acceleration&&"function"==typeof t.Config.on.Acceleration&&t.Config.on.Acceleration(t.State.NumAcceleration)}),10)}},{key:"ActionChangeFirst",value:function(){var t=this,e=0;this.$elemItemFirst?function n(){setTimeout((function(){t.Config.addClassNameActive&&r(t.$elemItemFirst[e],t.Config.addClassNameActive),++e<t.$elemItemFirst.length&&n(),t.$elemItemFirst.length==e&&t.ActionChange()}),t.Config.firstDelaySteps)}():setTimeout((function(){t.ActionChange()}),this.Config.firstDelaySteps)}},{key:"ActionChange",value:function(){var t=this;if(this.State.PosListFix.map((function(e){a(t.$elemItem[e.index],t.Config.addClassNameActive)||(e.count++,t.Config.addClassNameActive&&r(t.$elemItem[e.index],t.Config.addClassNameActive),t.Config.on.In&&"function"==typeof t.Config.on.In&&t.Config.on.In(t.$elemItem[e.index],e.index,e,t.State.NumScrolltop))})),this.Config.displayReverse&&this.State.PosListNoneFix.map((function(e){a(t.$elemItem[e.index],t.Config.addClassNameActive)&&(s(t.$elemItem[e.index],t.Config.addClassNameActive),t.Config.on.Out&&"function"==typeof t.Config.on.Out&&t.Config.on.Out(t.$elemItem[e.index],e.index,e,t.State.NumScrolltop))})),this.Config.on.Change&&"function"==typeof this.Config.on.Change){var e=this.State.PosListFix;this.Config.on.Change(this.$elemItem[e.length-1],e.length,e[e.length-1],this.State.NumScrolltop)}}}])&&c(e.prototype,n),i&&c(e,i),t}()}])}));