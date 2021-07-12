
import * as DOM from '@yama-dev/js-dom/core/';

export default class SCROLL_EFFECT_MODULE {

  constructor(options={}){

    // Set Version.
    this.Version = process.env.VERSION;

    // Set State.
    this.state = {
      NumScrolltopPre: window.pageYOffset,
      NumScrolltop   : window.pageYOffset,
      PosList        : [],
      PosListFixPre  : [],
      PosListFix     : [],
      PosListNoneFix : [],
      flg: {
        intersectChanged: false,
      }
    };

    // config, options.
    let configDefault = {
      elem               : null,
      firstElem          : null,

      displayRatio       : 0.8,
      displayReverse     : false,
      displayRatioReverse: null,

      firstDelay         : 10,
      firstDelaySteps    : 100,

      throttleInterval   : 50,

      addClassNameActive : 'is-active',

      autoStart          : true,

      intersect          : false,
      addClassNameIntersect : 'is-intersect',
      addClassNameIntersectOver : 'is-intersect-over',

      on: {
        Scroll       : null,
        Change       : null,
        In           : null,
        Out          : null,
        Intersect    : null,
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
      this.CacheDom();
      this.BindEvent();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.CacheDom();
        this.BindEvent();
      });
    }
  }

  BindEvent(){
    let _that = this;

    setTimeout(() => {
      this.Update();
      this._storeElementStateAtPosList('load');
    }, this.config.firstDelay);

    // for Resize-Event
    window.addEventListener('resize', () => {
      this.Update();
    });

    function throttle(fn, wait) {
      var time = Date.now();
      return function() {
        if ((time + wait - Date.now()) < 0) {
          fn();
          time = Date.now();
        }
      };
    }

    // for Scroll-Event
    window.addEventListener('scroll', throttle(function(){
      _that._storeElementStateAtPosList('scroll');
    }, this.config.throttleInterval), {passive: true});

  }

  CacheDom(){
    this.$elemItem      = DOM.selectDom(this.config.elem);
    this.$elemItemFirst = DOM.selectDom(this.config.firstElem);
  }

  CacheDomSize(){
    this.NumWindowHeight = window.innerHeight;
  }

  SetDom(){
    this.state.PosList = [];
    this.state.NumScrolltop = window.pageYOffset;
    let _elem = DOM.selectDom(this.$elemItem);
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
          intersect: false,
          intersectover: false,
          dataset: el.dataset
        };
        this.state.PosList.push( obj );
      });
    }
  }

  Start(){
    if(this.config.autoStart) return false;

    this.Init();
  }

  Update(){
    this.CacheDom();
    this.CacheDomSize();
    this.SetDom();
  }

  Refresh(){
    this.Update();
    this.Clear();
    this._actionChange();
  }

  Clear(){
    this.state.PosList.map((el, i)=>{
      el.active = false;
      DOM.removeClass(this.$elemItem[i], this.config.addClassNameActive);
    });
  }

  _storeElementStateAtPosList(method){

    // Array initialization
    this.state.PosListFix = [];
    this.state.PosListNoneFix = [];

    // Scroll top cache
    this.state.NumScrolltop = window.pageYOffset;

    // Store element state at PosList.
    this.state.PosList.map((el)=>{

      // When displayRatio and displayRatioReverse are the SAME.
      if(this.config.displayRatio === this.config.displayRatioReverse){
        if( this.state.NumScrolltop + ( this.NumWindowHeight * this.config.displayRatio ) > el.pos ){
          // First count up.
          if(method === 'load'){
            el.count++;
          }

          // 「active」Set of lists
          el.active = true;
          this.state.PosListFix.push(el);
        } else {

          // 「none active」Set of lists
          el.active = false;
          this.state.PosListNoneFix.push(el);
        }
      }

      // When displayRatio and displayRatioReverse are the DIFFERENT.
      if(this.config.displayRatio !== this.config.displayRatioReverse){
        if( this.state.NumScrolltop + ( this.NumWindowHeight * this.config.displayRatio ) > el.pos ){
          // First count up.
          if(method === 'load'){
            el.count++;
          }

          // 「active」Set of lists
          el.active = true;
          this.state.PosListFix.push(el);
        } else {
          if( this.state.NumScrolltop + ( this.NumWindowHeight * this.config.displayRatioReverse ) > el.pos ){
            if(el.active){
              // 「active」Set of lists
              this.state.PosListFix.push(el);
            } else {
              // 「none active」Set of lists
              this.state.PosListNoneFix.push(el);
            }
          } else {
            // 「none active」Set of lists
            el.active = false;
            this.state.PosListNoneFix.push(el);
          }
        }
      }

      if(this.config.intersect){
        if( this.state.NumScrolltop > el.pos ){
          if( this.state.NumScrolltop + this.NumWindowHeight > el.pos + el.height ){
            if(el.intersect){
              this.state.flg.intersectChanged = true;
              el.intersect = false;
              el.intersectover = true;
            }
          } else {
            if(!el.intersect){
              this.state.flg.intersectChanged = true;
              el.intersect = true;
              el.intersectover = false;
            }
          }
        } else {
          if(el.intersect){
            this.state.flg.intersectChanged = true;
            el.intersect = false;
            el.intersectover = false;
          }
        }
      }

    });

    if(method === 'load'){
      this.ActionChangeFirst();
    } else if(method === 'scroll'){
      if(this.state.PosListFixPre.length !== this.state.PosListFix.length) this._actionChange();
    }

    if(this.config.intersect && this.state.flg.intersectChanged){
      this.state.flg.intersectChanged = false;
      this._actionChangeIntersect();
    }

    // Callback function.
    if(this.config.on.Scroll && typeof(this.config.on.Scroll) === 'function') this.config.on.Scroll(this.state.NumScrolltop);

    this.state.NumScrolltopPre = this.state.NumScrolltop;
    this.state.PosListFixPre = this.state.PosListFix;
  }

  ActionChangeFirst(){
    let loopCount = 0;

    let countFunc = () => {
      // for Initial display
      setTimeout(() => {

        if(this.config.addClassNameActive){
          DOM.addClass(this.$elemItemFirst[loopCount], this.config.addClassNameActive);
        }

        loopCount++;

        if(loopCount < this.$elemItemFirst.length){
          countFunc();
        }

        // After the initial display is completed
        if(this.$elemItemFirst.length == loopCount){
          this._actionChange();
        }

      },this.config.firstDelaySteps);
    };

    // When there is an initial display element.
    if(this.$elemItemFirst){
      countFunc();
    } else {
      setTimeout(() => {
        this._actionChange();
      },this.config.firstDelaySteps);
    }

  }

  _actionChange(){

    this.state.PosListFix.map((el)=>{
      if(!DOM.hasClass(this.$elemItem[el.index], this.config.addClassNameActive)){
        el.count++;
        if(this.config.addClassNameActive) DOM.addClass(this.$elemItem[el.index], this.config.addClassNameActive);

        // Callback function.
        if(this.config.on.In && typeof(this.config.on.In) === 'function') this.config.on.In(this.$elemItem[el.index], el.index, el, this.state.NumScrolltop);
      }
    });

    if(this.config.displayReverse){
      this.state.PosListNoneFix.map((el)=>{
        if(DOM.hasClass(this.$elemItem[el.index], this.config.addClassNameActive)){
          DOM.removeClass(this.$elemItem[el.index], this.config.addClassNameActive);

          // Callback function.
          if(this.config.on.Out && typeof(this.config.on.Out) === 'function') this.config.on.Out(this.$elemItem[el.index], el.index, el, this.state.NumScrolltop);
        }
      });
    }

    // Callback function.
    if(this.config.on.Change && typeof(this.config.on.Change) === 'function'){
      let _pf = this.state.PosListFix;
      this.config.on.Change(this.$elemItem[_pf.length-1], _pf.length, _pf[_pf.length-1], this.state.NumScrolltop);
    }

  }

  _actionChangeIntersect(){

    this.state.PosList.map((el)=>{

      let callback = {
        el: el.el,
        intersect: el.intersect,
        index: el.index,
        pos: el.pos,
        height: el.height,
        height2: el.height2,
        count: el.count,
        dataset: el.dataset
      };

      if(el.intersect){
        if(!DOM.hasClass(el.el, this.config.addClassNameIntersect)){
          if(this.config.addClassNameIntersect) DOM.addClass(el.el, this.config.addClassNameIntersect);

          // Callback function.
          if(this.config.on.Intersect && typeof(this.config.on.Intersect) === 'function'){
            this.config.on.Intersect(callback);
          }
        }
      } else {
        if(DOM.hasClass(el.el, this.config.addClassNameIntersect)){
          if(this.config.addClassNameIntersect) DOM.removeClass(el.el, this.config.addClassNameIntersect);

          // Callback function.
          if(this.config.on.Intersect && typeof(this.config.on.Intersect) === 'function'){
            this.config.on.Intersect(callback);
          }
        }
      }

      if(el.intersectover){
        if(!DOM.hasClass(el.el, this.config.addClassNameIntersectOver)){
          if(this.config.addClassNameIntersectOver) DOM.addClass(el.el, this.config.addClassNameIntersectOver);

          // Callback function.
          if(this.config.on.Intersect && typeof(this.config.on.Intersect) === 'function'){
            this.config.on.Intersect(callback);
          }
        }
      } else {
        if(DOM.hasClass(el.el, this.config.addClassNameIntersectOver)){
          if(this.config.addClassNameIntersectOver) DOM.removeClass(el.el, this.config.addClassNameIntersectOver);

          // Callback function.
          if(this.config.on.Intersect && typeof(this.config.on.Intersect) === 'function'){
            this.config.on.Intersect(callback);
          }
        }
      }
    });

  }

}
