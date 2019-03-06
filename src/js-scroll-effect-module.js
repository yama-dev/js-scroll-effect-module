/*!
 * JS SCROLL EFFECT MODULE (JavaScript Library)
 *   js-scroll-effect-module
 * versoin 0.2.0
 * Repository https://github.com/yama-dev/js-scroll-effect-module
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import JS_DOM from '@yama-dev/js-dom';
const dom = new JS_DOM();

export default class SCROLL_EFFECT_MODULE {

  constructor(options){

    // Set Version.
    this.Version = '0.2.0';

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
      addClassNameActive : options.addClassNameActive||'is-active'
    }

    // Set callback functions.
    if(!options.on){
      options.on = {}
    }
    this.on = {
      In    : options.on.In||'',
      Out   : options.on.Out||''
    }

    // Store element information.
    this.PosList        = [];
    this.PosListFix     = [];
    this.PosListNoneFix = [];

    document.addEventListener('DOMContentLoaded', () => {
      this.CacheDom();
      this.BindEvent();
    });
  }

  BindEvent(){
    window.addEventListener('load', () => {
      // Load Delay
      setTimeout(() => {
        setTimeout(() => {
          this.Update();
          this.StoreElementStateAtPosList('load');
        }, this.Config.firstDelayTime);
      }, this.Config.loadDelayTime);
    });

    // for Resize-Event
    window.addEventListener('resize', () => {
      this.Update();
    });

    // for Scroll-Event
    window.addEventListener('scroll', () => {
      this.StoreElementStateAtPosList('scroll');
    });
  }

  CacheDom(){
    this.$elemItem      = dom.selectDom(this.Config.elem);
    this.$elemItemFirst = dom.selectDom(this.Config.firstElem);
  }

  CacheDomSize(){
    this.NumWindowHeight = window.innerHeight;
  }

  SetDom(){
    this.PosList = [];
    this.NumScrolltop = window.pageYOffset;
    let _elem = dom.selectDom(this.$elemItem);
    if(_elem){
      _elem.map((el, i)=>{
        this.PosList.push( el.getBoundingClientRect().top + this.NumScrolltop);
      });
    }
  }

  Update(){
    this.CacheDom();
    this.CacheDomSize();
    this.SetDom();
  }

  Refresh(){
    this.Update();
    this.Clear();
    this.ActionAddClass();
  }

  Clear(){
    this.PosList.map((el, i)=>{
      dom.removeClass(this.$elemItem[i], this.Config.addClassNameActive);
    });
  }

  StoreElementStateAtPosList(method){

    // Array initialization
    this.PosListFix = [];
    this.PosListNoneFix = [];

    // Scroll top cache
    this.NumScrolltop = window.pageYOffset;

    // Store element state at PosList.
    this.PosList.map((el, i)=>{
      if( this.NumScrolltop + ( this.NumWindowHeight * this.Config.displayRatio ) > el ){
        // 「active」Set of lists
        this.PosListFix.push(i);
      } else {
        // 「none active」Set of lists
        this.PosListNoneFix.push(i);
      }
    });

    if(method === 'load'){
      this.ActionAddClassFirst();
    } else if(method === 'scroll'){
      this.ActionAddClass();
    }
  }

  ActionAddClassFirst(){
    let loopCount = 0;

    let countFunc = () => {
      // for Initial display
      setTimeout(() => {
        dom.addClass(this.$elemItemFirst[loopCount], this.Config.addClassNameActive);
        loopCount++;
        if(loopCount < this.$elemItemFirst.length){
          countFunc();
        }
      },this.Config.firstElemDelayTime);

      // After the initial display is completed
      if(this.$elemItemFirst.length == loopCount){
        setTimeout(() => {
          this.StoreElementStateAtPosList('scroll');
        },this.Config.firstElemDelayTime);
      }
    }

    // When there is an initial display element.
    if(this.$elemItemFirst){
      countFunc();
    } else {
      setTimeout(() => {
        this.StoreElementStateAtPosList('scroll');
      },this.Config.firstElemDelayTime);
    }

  }

  ActionAddClass(){
    this.PosListFix.map((el, i)=>{
      if(!dom.hasClass(this.$elemItem[el], this.Config.addClassNameActive)){
        dom.addClass(this.$elemItem[el], this.Config.addClassNameActive);

          // Callback function.
        if(this.on.In && typeof(this.on.In) === 'function') this.on.In(this.$elemItem[el], el);
      }
    });

    if(this.Config.displayReverse){
      this.PosListNoneFix.map((el, i)=>{
        if(dom.hasClass(this.$elemItem[el], this.Config.addClassNameActive)){
          dom.removeClass(this.$elemItem[el], this.Config.addClassNameActive);

          // Callback function.
          if(this.on.Out && typeof(this.on.Out) === 'function') this.on.Out(this.$elemItem[el], el);
        }
      });
    }
  }

}
