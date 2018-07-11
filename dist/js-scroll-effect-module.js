!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var s in i)("object"==typeof exports?exports:e)[s]=i[s]}}(window,function(){return function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}();
/*!
 * JS SCROLL EFFECT MODULE (JavaScript Library)
 *   js-scroll-effect-module
 * versoin 0.1.2
 * Repository https://github.com/yama-dev/js-scroll-effect-module
 * Copyright yama-dev
 * Licensed under the MIT license.
 */
Element.prototype.hasClass=function(e){return this.className.split(" ").indexOf(e)>=0},Element.prototype.addClass=function(e){if(!this.hasClass(e)){var t=this.className.split(" ");t.push(e),this.className=t.join(" ")}return this},Element.prototype.removeClass=function(e){var t=this.className.split(" "),i=t.indexOf(e);return i>=0&&(t.splice(i,1),this.className=t.join(" ")),this},Element.prototype.toggleClass=function(e){this.hasClass(e)?this.removeClass(e):this.addClass(e)};var n=function(){function e(t){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.Version="0.1.2",this.CurrentUrl=location.href,this.Config={elem:t.elem,displayRatio:t.displayRatio||.7,displayReverse:t.displayReverse||!1,firstElem:t.firstElem||null,firstElemDelayTime:t.firstElemDelayTime||0,firstDelayTime:t.firstDelayTime||300,loadDelayTime:t.loadDelayTime||0,addClassNameLoaded:t.addClassNameLoaded||"is-loaded",addClassNameActive:t.addClassNameActive||"is-active"},this.ElemList=new Array,this.ElemListFix=new Array,this.ElemListNoneFix=new Array,-1===this.CurrentUrl.search(/localhost/)&&-1===this.CurrentUrl.search(/192.168/)||this.DebugMode(),document.addEventListener("DOMContentLoaded",function(e){i.CacheElement(),i.BindEvent()})}return s(e,[{key:"DebugMode",value:function(){console.log(this)}},{key:"BindEvent",value:function(){var e=this,t=this;window.addEventListener("load",function(i){setTimeout(function(){setTimeout(function(){e.UpdateDom(),e.JudgmentScrollEffect("load")},e.Config.firstDelayTime)},t.Config.loadDelayTime)}),window.addEventListener("resize",function(t){e.UpdateDom()}),window.addEventListener("scroll",function(e){t.JudgmentScrollEffect("scroll")})}},{key:"CacheElement",value:function(){this.$elemItem=document.querySelectorAll(this.Config.elem)?document.querySelectorAll(this.Config.elem):document.createElement("div"),this.$elemFirstItem=document.querySelectorAll(this.Config.firstElem)?document.querySelectorAll(this.Config.firstElem):document.createElement("div")}},{key:"CacheElementSize",value:function(){this.NumWindowHeight=window.innerHeight}},{key:"SetDom",value:function(){var e=this,t=this;this.ElemList=[],this.NumScrolltop=window.pageYOffset;var i=Array.prototype.slice.call(this.$elemItem);i&&i.forEach(function(i,s){t.ElemList.push(i.getBoundingClientRect().top+e.NumScrolltop)})}},{key:"UpdateDom",value:function(){this.CacheElement(),this.CacheElementSize(),this.SetDom()}},{key:"Refresh",value:function(){this.CacheElement(),this.CacheElementSize(),this.SetDom();for(var e=0;e<this.ElemList.length;e++)this.ElemList[e].removeClass(this.Config.addClassNameActive)}},{key:"JudgmentScrollEffect",value:function(e){if(this.ElemListFix=[],this.ElemListNoneFix=[],this.NumScrolltop=window.pageYOffset,"load"==e){for(var t=0;t<this.ElemList.length;t++)this.NumScrolltop+this.NumWindowHeight*this.Config.displayRatio>this.ElemList[t]&&(this.ElemListFix.push(t),0);this.ActionAddClassFirst()}else if("scroll"==e){for(var i=0;i<this.ElemList.length;i++)this.NumScrolltop+this.NumWindowHeight*this.Config.displayRatio>this.ElemList[i]?(this.ElemListFix.push(i),0):this.ElemListNoneFix.push(i);this.ActionAddClass()}}},{key:"ActionAddClassFirst",value:function(){var e=this,t=0;this.$elemFirstItem.length?function i(){setTimeout(function(){e.$elemFirstItem[t].addClass(e.Config.addClassNameActive),++t<e.$elemFirstItem.length&&i()},e.Config.firstElemDelayTime),e.$elemFirstItem.length==t&&setTimeout(function(){e.JudgmentScrollEffect("scroll")},e.Config.firstElemDelayTime)}():setTimeout(function(){e.JudgmentScrollEffect("scroll")},this.Config.firstElemDelayTime)}},{key:"ActionAddClass",value:function(){for(var e=0;e<this.ElemListFix.length;e++)this.$elemItem[this.ElemListFix[e]].hasClass(this.Config.addClassNameActive)||this.$elemItem[this.ElemListFix[e]].addClass(this.Config.addClassNameActive);if(this.Config.displayReverse)for(var t=0;t<this.ElemListNoneFix.length;t++)this.$elemItem[this.ElemListNoneFix[t]].hasClass(this.Config.addClassNameActive)&&this.$elemItem[this.ElemListNoneFix[t]].removeClass(this.Config.addClassNameActive)}}]),e}();t.default=n,window.SCROLL_EFFECT_MODULE=n}])});