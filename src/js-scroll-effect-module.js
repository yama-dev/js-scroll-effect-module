/*!
 * JS SCROLL EFFECT MODULE (JavaScript Library)
 *   js-scroll-effect-module
 * versoin 0.1.1
 * Repository https://github.com/yama-dev/js-scroll-effect-module
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

Element.prototype.hasClass = function(className){
  let classArray = this.className.split(' ');
  return classArray.indexOf(className) >= 0;
}
Element.prototype.addClass = function(className){
  if(!this.hasClass(className)){
    let classArray = this.className.split(' ');
    classArray.push(className);
    this.className = classArray.join(' ');
  }
  return this;
}
Element.prototype.removeClass = function(className){
  let classArray = this.className.split(' ');
  let index = classArray.indexOf(className);
  if(index >= 0){
    classArray.splice(index, 1);
    this.className = classArray.join(' ');
  }
  return this;
}
Element.prototype.toggleClass = function(className){
  this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
}

class SCROLL_EFFECT_MODULE {

  constructor(options){

    // Set Version.
    this.Version = '0.1.0';

    // Use for discrimination by URL.
    this.CurrentUrl = location.href;

    // Set config, options.
    this.Config = {
      elem               : options.elem,
      displayRatio       : options.displayRatio||0.7,
      displayReverse     : options.displayReverse||false,
      firstElem          : options.firstElem||null,
      firstElemDelayTime : options.firstElemDelayTime||0,
      firstDelayTime     : options.firstDelayTime||300,
      loadDelayTime      : options.loadDelayTime||0,
      addClassNameLoaded : options.addClassNameLoaded||'is-loaded',
      addClassNameActive : options.addClassNameActive||'is-active',
    }

    // Store element information.
    this.ElemList        = new Array();
    this.ElemListFix     = new Array();
    this.ElemListNoneFix = new Array();

    // DebugMode
    if(this.CurrentUrl.search(/localhost/) !== -1 || this.CurrentUrl.search(/192.168/) !== -1){
      this.DebugMode();
    } else { }

    document.addEventListener('DOMContentLoaded', (event) => {
      this.CacheElement();
      this.BindEvent();
    });
  }

  DebugMode(){
    console.log(this);
  }

  BindEvent(){
    let _that = this;
    window.addEventListener('load', (event) => {
      // Load Delay
      setTimeout(() => {
        setTimeout(() => {
          this.UpdateDom();
          this.JudgmentScrollEffect('load');
        }, this.Config.firstDelayTime);
      },_that.Config.loadDelayTime);
    });

    // for Resize-Event
    window.addEventListener('resize', (event) => {
      this.UpdateDom();
    });

    // for Scroll-Event
    window.addEventListener('scroll', (event) => {
      _that.JudgmentScrollEffect('scroll');
    });
  }

  CacheElement(){
    this.$elemItem      = document.querySelectorAll(this.Config.elem) ? document.querySelectorAll(this.Config.elem) : document.createElement('div');
    this.$elemFirstItem = document.querySelectorAll(this.Config.firstElem) ? document.querySelectorAll(this.Config.firstElem) : document.createElement('div');
  }

  CacheElementSize(){
    this.NumWindowHeight = window.innerHeight;
  }

  SetDom(){
    let _that = this;
    this.ElemList = [];
    this.NumScrolltop = window.pageYOffset;
    let elemItemAll = Array.prototype.slice.call( this.$elemItem );
    if(elemItemAll){
      elemItemAll.forEach( (elem,i) => {
        _that.ElemList.push( elem.getBoundingClientRect().top + this.NumScrolltop);
      });
    }
  }

  UpdateDom(){
    this.CacheElement();
    this.CacheElementSize();
    this.SetDom();
  }

  Refresh(){
    this.CacheElement();
    this.CacheElementSize();
    this.SetDom();
    for(let _i = 0;_i < this.ElemList.length; _i++){
      this.ElemList[_i].removeClass(this.Config.addClassNameActive);
    }
  }

  JudgmentScrollEffect(method){
    let _that = this;
    let loopCount = 0;

    // Array initialization
    _that.ElemListFix = [];
    _that.ElemListNoneFix = [];

    // Scroll top cache
    _that.NumScrolltop = window.pageYOffset;

    // Determination of each element
    // -> for First-Load
    // -> for Scroll
    if(method == 'load'){
      for(let _i = 0;_i < _that.ElemList.length; _i++){
        if( _that.NumScrolltop + ( _that.NumWindowHeight * _that.Config.displayRatio ) > _that.ElemList[_i] ){
          // 「active」Set of lists
          _that.ElemListFix.push(_i);
          loopCount++;
        }
      }
      _that.ActionAddClassFirst();
    } else if(method == 'scroll'){
      for(let _i = 0;_i < _that.ElemList.length; _i++){
        if( _that.NumScrolltop + ( _that.NumWindowHeight * _that.Config.displayRatio ) > _that.ElemList[_i] ){
          // 「active」Set of lists
          _that.ElemListFix.push(_i);
          loopCount++;
        } else {
          // 「none active」Set of lists
          _that.ElemListNoneFix.push(_i);
        }
      }
      _that.ActionAddClass();
    }
  }

  ActionAddClassFirst(){
    let loopCount = 0;

    let countFunc = () => {
      // for Initial display
      setTimeout(() => {
        this.$elemFirstItem[loopCount].addClass(this.Config.addClassNameActive);
        loopCount++;
        if(loopCount < this.$elemFirstItem.length){
          countFunc();
        }
      },this.Config.firstElemDelayTime);

      // After the initial display is completed
      if(this.$elemFirstItem.length == loopCount){
        setTimeout(() => {
          this.JudgmentScrollEffect('scroll');
        },this.Config.firstElemDelayTime);
      }
    }

    // When there is an initial display element.
    if(this.$elemFirstItem.length){
      countFunc();
    } else {
      setTimeout(() => {
        this.JudgmentScrollEffect('scroll');
      },this.Config.firstElemDelayTime);
    }

  }

  ActionAddClass(){
    for(let _i = 0;_i < this.ElemListFix.length; _i++){
      if(this.$elemItem[this.ElemListFix[_i]].hasClass(this.Config.addClassNameActive)){}else{
        this.$elemItem[this.ElemListFix[_i]].addClass(this.Config.addClassNameActive);
      }
    }
    if(this.Config.displayReverse){
      for(let _i = 0;_i < this.ElemListNoneFix.length; _i++){
        if(this.$elemItem[this.ElemListNoneFix[_i]].hasClass(this.Config.addClassNameActive)){
          this.$elemItem[this.ElemListNoneFix[_i]].removeClass(this.Config.addClassNameActive);
        }
      }
    }
  }

}

export default SCROLL_EFFECT_MODULE;

window.SCROLL_EFFECT_MODULE = SCROLL_EFFECT_MODULE;
