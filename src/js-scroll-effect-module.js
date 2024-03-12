
import * as DOM from '@yama-dev/js-dom/core/';

export default class SCROLL_EFFECT_MODULE {

  constructor(options={}){

    // Set State.
    this.state = {
      NumScrolltopPre: window.pageYOffset,
      NumScrolltop   : window.pageYOffset,
      PosList        : [],
      PosListFixPre  : [],
    };

    // config, options.
    let configDefault = {
      target             : null,
      classNameInview    : 'is-active',

      displayRatio       : 0.8,
      displayReverse     : false,
      displayRatioReverse: null,

      firstDelay         : 100,

      throttleInterval   : 3,

      autoStart          : true,

      on: {
        Scroll       : null,
        Change       : null,
        In           : null,
        Out          : null,
      }
    };

    // Merge Config Settings.
    this.config = {
      ...configDefault,
      ...options
    };

    // adjust ratio value.
    if( !this.config.displayRatioReverse ) {
      this.config.displayRatioReverse = this.config.displayRatio;
    } else {
      if( this.config.displayRatioReverse < this.config.displayRatio ) {
        this.config.displayRatioReverse = this.config.displayRatio;
      }
    }

    if(this.config.autoStart) this.Init();
  }

  Init(){
    if(document.readyState == 'complete' || document.readyState == 'interactive'){
      this.Update();
      this._BindEvent();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.Update();
        this._BindEvent();
      });
    }
  }

  Start(){
    this.Stop();
    this.Update();
    this._StoreElementStateAtPosList();
  }

  Update(){
    this._SetDom();
  }

  Stop(){
    this.state.PosList.map((el)=>{
      DOM.removeClass(el.el, this.config.classNameInview);
    });
    this.state.PosList = [];
  }

  _BindEvent(){
    let _that = this;

    // for Resize-Event
    window.addEventListener('resize', () => {
      this.Update();
    });

    // for Load-Event
    window.addEventListener('load', () => {
      this.Update();
    });

    setTimeout(()=>{
      this._StoreElementStateAtPosList();
    }, this.config.firstDelay);

    // for Scroll-Event
    function throttle(fn, wait) {
      var time = Date.now();
      return function() {
        if ((time + wait - Date.now()) < 0) {
          fn();
          time = Date.now();
        }
      };
    }
    window.addEventListener('scroll', throttle(function(){
      _that._StoreElementStateAtPosList();
    }, this.config.throttleInterval), {passive: true});
  }

  _SetDom(){
    this.state.PosList = [];

    this.state.NumScrolltop = window.pageYOffset;
    this.NumWindowHeight = window.innerHeight;

    let _elem = DOM.selectDom(this.config.target);

    if(_elem){
      _elem.map((el,i)=>{
        let offset = 0;
        if(el.dataset && el.dataset.semOffset !== undefined) offset = Number(el.dataset.semOffset);
        let obj = {
          el: el,
          index: i,
          pos: el.getBoundingClientRect().top + this.state.NumScrolltop - offset,
          height: el.clientHeight,
          height2: el.offsetHeight,
          count: 0,
          active: false,
          changing: false,
          dataset: el.dataset
        };
        this.state.PosList.push( obj );
      });
    }
  }

  _StoreElementStateAtPosList(){
    if(!this.state.PosList.length) return false;

    // Scroll top cache
    this.state.NumScrolltop = window.pageYOffset;

    // Store element state at PosList.
    this.state.PosList.map((el)=>{

      // When displayRatio and displayRatioReverse are the SAME.
      if(this.config.displayRatio === this.config.displayRatioReverse){
        if( this.state.NumScrolltop + ( this.NumWindowHeight * this.config.displayRatio ) > el.pos ){
          if(!el.active){
            el.changing = true;
            el.active = true;
          }
        } else {
          // 「none active」Set of lists
          if(el.active){
            el.changing = true;
            el.active = false;
          }
        }
      }

      // When displayRatio and displayRatioReverse are the DIFFERENT.
      if(this.config.displayRatio !== this.config.displayRatioReverse){
        if( this.state.NumScrolltop + ( this.NumWindowHeight * this.config.displayRatio ) > el.pos ){
          // 「active」Set of lists
          if(!el.active){
            el.changing = true;
            el.active = true;
          }
        } else {
          if( this.state.NumScrolltop + ( this.NumWindowHeight * this.config.displayRatioReverse ) > el.pos ){
            if(el.active){
              // 「active」Set of lists
              if(!el.active){
                el.changing = true;
                el.active = true;
              }
            } else {
              // 「none active」Set of lists
              if(el.active){
                el.changing = true;
                el.active = false;
              }
            }
          } else {
            // 「none active」Set of lists
            if(el.active){
              el.changing = true;
              el.active = false;
            }
          }
        }
      }
    });

    // For Changed
    let changingCount = this.state.PosList.filter(item => item.changing === true);
    if(changingCount.length) this._ActionChange();

    // Callback function.
    if(this.config.on.Scroll && typeof(this.config.on.Scroll) === 'function') this.config.on.Scroll(this.state.NumScrolltop);

    this.state.NumScrolltopPre = this.state.NumScrolltop;
    this.state.PosListFixPre = this.state.PosListFix;
  }

  _ActionChange(){
    if(!this.state.PosList.length) return false;

    this.state.PosList.forEach(el => {
      if (el.active) {
        // activeな場合の処理
        if (!DOM.hasClass(el.el, this.config.classNameInview)) {
          el.count++;
          if (this.config.classNameInview) DOM.addClass(el.el, this.config.classNameInview);
          // Inコールバック関数の呼び出し
          this.callCallback(this.config.on.In, el);
        }
      } else {
        // activeでない場合の処理
        if (this.config.displayReverse && DOM.hasClass(el.el, this.config.classNameInview)) {
          DOM.removeClass(el.el, this.config.classNameInview);
          // Outコールバック関数の呼び出し
          this.callCallback(this.config.on.Out, el);
        }
      }
      // changingフラグのチェック
      if (el.changing) {
        el.changing = false;
        // Changeコールバック関数の呼び出し
        this.callCallback(this.config.on.Change, el, el.index, el.dataset.scrollName);
      }
    });
  }

  // コールバック関数の呼び出しを行うためのユーティリティ関数
  callCallback(callback, ...args) {
    if (callback && typeof callback === 'function') {
      callback(...args);
    }
  }

}
