
import * as DOM from '@yama-dev/js-dom/core/';

export default class SCROLL_EFFECT_MODULE {

  constructor(options={}){

    // Set Version.
    this.Version = process.env.VERSION;

    // Set State.
    this.state = {
      NumScrolltopPre: window.pageYOffset,
      NumScrolltop   : window.pageYOffset,
      NumAcceleration: 0,
      PosList        : [],
      PosListFixPre  : [],
      PosListFix     : [],
      PosListNoneFix : []
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

      acceleration       : false,

      on: {
        Scroll       : null,
        Change       : null,
        In           : null,
        Out          : null,
        Acceleration : null
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
        let obj = {
          index: i,
          pos: el.getBoundingClientRect().top + this.state.NumScrolltop,
          count: 0,
          active: false
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
    });

    if(this.config.acceleration){
      if(Math.abs(this.state.NumAcceleration) <= Math.abs(this.state.NumScrolltop - this.state.NumScrolltopPre)){
        this.state.NumAcceleration = this.state.NumScrolltop - this.state.NumScrolltopPre;

        if(this.state.NumAcceleration >= 100) this.state.NumAcceleration = 100;
        if(this.state.NumAcceleration <= -100) this.state.NumAcceleration = -100;

        clearInterval(this.Interval);
        this.CheckAcceleration();
      }

      // Callback function.
      if(this.config.on.Acceleration && typeof(this.config.on.Acceleration) === 'function') this.config.on.Acceleration(this.state.NumAcceleration);
    }

    if(method === 'load'){
      this.ActionChangeFirst();
    } else if(method === 'scroll'){
      if(this.state.PosListFixPre.length !== this.state.PosListFix.length) this._actionChange();
    }

    // Callback function.
    if(this.config.on.Scroll && typeof(this.config.on.Scroll) === 'function') this.config.on.Scroll(this.state.NumScrolltop);

    this.state.NumScrolltopPre = this.state.NumScrolltop;
    this.state.PosListFixPre = this.state.PosListFix;
  }

  // For Config.acceleration == true.
  CheckAcceleration(){
    this.Interval = setInterval(()=>{

      let _racio = Math.pow(1.02, Math.abs(this.state.NumAcceleration)) - 0.6;
      if(this.state.NumAcceleration > 0){
        this.state.NumAcceleration = this.state.NumAcceleration - _racio;
      } else if(this.state.NumAcceleration < 0){
        this.state.NumAcceleration = this.state.NumAcceleration + _racio;
      }
      this.state.NumAcceleration = Math.ceil(this.state.NumAcceleration * 100) / 100;

      if(this.state.NumAcceleration > -0.8 && this.state.NumAcceleration < 0.8){
        this.state.NumAcceleration = 0;
        clearInterval(this.Interval);
      }

      // Callback function.
      if(this.config.on.Acceleration && typeof(this.config.on.Acceleration) === 'function') this.config.on.Acceleration(this.state.NumAcceleration);
    },10);
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

}
