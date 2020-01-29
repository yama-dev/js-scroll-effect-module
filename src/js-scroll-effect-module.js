
import * as DOM from '@yama-dev/js-dom/core/';

export default class SCROLL_EFFECT_MODULE {

  constructor(options={}){

    // Set Version.
    this.Version = process.env.VERSION;

    // Set State.
    this.State = {
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

      firstDelay         : 10,
      firstDelaySteps    : 100,

      addClassNameActive : 'is-active',

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
    this.Config = Object.assign(configDefault, options);

    // SetPlayer
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

    setTimeout(() => {
      this.Update();
      this.StoreElementStateAtPosList('load');
    }, this.Config.firstDelay);

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
    this.$elemItem      = DOM.selectDom(this.Config.elem);
    this.$elemItemFirst = DOM.selectDom(this.Config.firstElem);
  }

  CacheDomSize(){
    this.NumWindowHeight = window.innerHeight;
  }

  SetDom(){
    this.State.PosList = [];
    this.State.NumScrolltop = window.pageYOffset;
    let _elem = DOM.selectDom(this.$elemItem);
    if(_elem){
      _elem.map((el,i)=>{
        let obj = {
          index: i,
          pos: el.getBoundingClientRect().top + this.State.NumScrolltop,
          count: 0
        };
        this.State.PosList.push( obj );
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
    this.ActionChange();
  }

  Clear(){
    this.State.PosList.map((el, i)=>{
      DOM.removeClass(this.$elemItem[i], this.Config.addClassNameActive);
    });
  }

  StoreElementStateAtPosList(method){

    // Array initialization
    this.State.PosListFix = [];
    this.State.PosListNoneFix = [];

    // Scroll top cache
    this.State.NumScrolltop = window.pageYOffset;

    // Store element state at PosList.
    this.State.PosList.map((el, i)=>{
      if( this.State.NumScrolltop + ( this.NumWindowHeight * this.Config.displayRatio ) > el.pos ){

        // First count up.
        if(method === 'load'){
          el.count++;
        }

        // 「active」Set of lists
        this.State.PosListFix.push(el);
      } else {

        // 「none active」Set of lists
        this.State.PosListNoneFix.push(el);
      }
    });

    if(this.Config.acceleration){
      if(Math.abs(this.State.NumAcceleration) <= Math.abs(this.State.NumScrolltop - this.State.NumScrolltopPre)){
        this.State.NumAcceleration = this.State.NumScrolltop - this.State.NumScrolltopPre;

        if(this.State.NumAcceleration >= 100) this.State.NumAcceleration = 100;
        if(this.State.NumAcceleration <= -100) this.State.NumAcceleration = -100;

        clearInterval(this.Interval);
        this.CheckAcceleration();
      }

      // Callback function.
      if(this.Config.on.Acceleration && typeof(this.Config.on.Acceleration) === 'function') this.Config.on.Acceleration(this.State.NumAcceleration);
    }

    if(method === 'load'){
      this.ActionChangeFirst();
    } else if(method === 'scroll'){
      if(this.State.PosListFixPre.length !== this.State.PosListFix.length) this.ActionChange();
    }

    // Callback function.
    if(this.Config.on.Scroll && typeof(this.Config.on.Scroll) === 'function') this.Config.on.Scroll(this.State.NumScrolltop);

    this.State.NumScrolltopPre = this.State.NumScrolltop;
    this.State.PosListFixPre = this.State.PosListFix;
  }

  // For Config.acceleration == true.
  CheckAcceleration(){
    this.Interval = setInterval(()=>{

      let _racio = Math.pow(1.02, Math.abs(this.State.NumAcceleration)) - 0.6;
      if(this.State.NumAcceleration > 0){
        this.State.NumAcceleration = this.State.NumAcceleration - _racio;
      } else if(this.State.NumAcceleration < 0){
        this.State.NumAcceleration = this.State.NumAcceleration + _racio;
      }
      this.State.NumAcceleration = Math.ceil(this.State.NumAcceleration * 100) / 100;

      if(this.State.NumAcceleration > -0.8 && this.State.NumAcceleration < 0.8){
        this.State.NumAcceleration = 0;
        clearInterval(this.Interval);
      }

      // Callback function.
      if(this.Config.on.Acceleration && typeof(this.Config.on.Acceleration) === 'function') this.Config.on.Acceleration(this.State.NumAcceleration);
    },10);
  }

  ActionChangeFirst(){
    let loopCount = 0;

    let countFunc = () => {
      // for Initial display
      setTimeout(() => {

        if(this.Config.addClassNameActive){
          DOM.addClass(this.$elemItemFirst[loopCount], this.Config.addClassNameActive);
        }

        loopCount++;

        if(loopCount < this.$elemItemFirst.length){
          countFunc();
        }

        // After the initial display is completed
        if(this.$elemItemFirst.length == loopCount){
          this.ActionChange();
        }

      },this.Config.firstDelaySteps);
    };

    // When there is an initial display element.
    if(this.$elemItemFirst){
      countFunc();
    } else {
      setTimeout(() => {
        this.ActionChange();
      },this.Config.firstDelaySteps);
    }

  }

  ActionChange(){

    this.State.PosListFix.map((el)=>{
      if(!DOM.hasClass(this.$elemItem[el.index], this.Config.addClassNameActive)){
        el.count++;
        if(this.Config.addClassNameActive) DOM.addClass(this.$elemItem[el.index], this.Config.addClassNameActive);

        // Callback function.
        if(this.Config.on.In && typeof(this.Config.on.In) === 'function') this.Config.on.In(this.$elemItem[el.index], el.index, el, this.State.NumScrolltop);
      }
    });

    if(this.Config.displayReverse){
      this.State.PosListNoneFix.map((el)=>{
        if(DOM.hasClass(this.$elemItem[el.index], this.Config.addClassNameActive)){
          DOM.removeClass(this.$elemItem[el.index], this.Config.addClassNameActive);

          // Callback function.
          if(this.Config.on.Out && typeof(this.Config.on.Out) === 'function') this.Config.on.Out(this.$elemItem[el.index], el.index, el, this.State.NumScrolltop);
        }
      });
    }

    // Callback function.
    if(this.Config.on.Change && typeof(this.Config.on.Change) === 'function'){
      let _pf = this.State.PosListFix;
      this.Config.on.Change(this.$elemItem[_pf.length-1], _pf.length, _pf[_pf.length-1], this.State.NumScrolltop);
    }

  }

}
