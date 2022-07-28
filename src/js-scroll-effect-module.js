
import {
  selectDom,
  addClass,
  removeClass,
  hasClass,
  setAttribute,
} from '@yama-dev/js-dom/core/';

export default class SCROLL_EFFECT_MODULE {
  constructor(options={}){
    // Set State.
    this.state = {
      observer: null,
      items: [],
    };

    // config, options.
    let configDefault = {
      target: '[data-scroll]',
      root: null,

      displayRatio   : 0.8,
      displayReverse : true,

      autoStart: true,

      classNameActive: 'is-active',

      intersect: false,

      scrollEvent: false,
      throttleInterval: 3,

      on: {
        Change: null,
        In    : null,
        Out   : null,
        Scroll: null,
      }
    };
    // Merge Config Settings.
    this.config = {
      ...configDefault,
      ...options
    };

    if(!this.config.autoStart) return false;

    if(document.readyState == 'complete' || document.readyState == 'interactive'){
      this._Init();
      if(this.config.scrollEvent) this._BindEvent();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this._Init();
        if(this.config.scrollEvent) this._BindEvent();
      });
    }
  }

  _BindEvent(){
    let _that = this;
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
      if(_that.config.on.Scroll && typeof(_that.config.on.Scroll) === 'function'){
        let scrollTop = window.pageYOffset;
        _that.config.on.Scroll(scrollTop);
      }
    }, this.config.throttleInterval), {passive: true});
  }

  _Init(){
    this.state.items = selectDom(this.config.target);
    if(!this.state.items) return false;

    setAttribute(this.state.items, { dataScrollState: false });
    if(this.config.intersect){
      setAttribute(this.state.items, { dataScrollIntersect: false });
    }

    // rootMargin
    // 0.8 -> -20%
    // 0.5 -> -50%
    // 0.2 -> -80%

    let rootMarginBottom = Math.floor((1 - this.config.displayRatio) * 100);
    const options = {
      root: null,
      rootMargin: `0px 0px -${rootMarginBottom}%`,
      threshold: 0
    };

    let checkInView = (entries)=>{
      entries.forEach(entry => {
        // inview
        if(entry.isIntersecting) {
          // shitakara
          if(entry.rootBounds.y < entry.boundingClientRect.y){
            if(entry.target.dataset.scrollState === 'false'){
              setAttribute(entry.target, { dataScrollState: true });
              this._ActivateItem(entry);
            }
          }

          // uekara
          if(entry.rootBounds.y > entry.boundingClientRect.y){
            setAttribute(entry.target, { dataScrollState: true });
            this._ActivateItem(entry);
          }
        }
        if(!entry.isIntersecting) {
          // uekara
          if(entry.rootBounds.y < entry.boundingClientRect.y){
            if(entry.target.dataset.scrollState === 'true'){
              if(this.config.displayReverse){
                setAttribute(entry.target, { dataScrollState: false });
                this._InActivateItem(entry);
              }
            }
          }
        }

        // intersect
        if(this.config.intersect){
          if(entry.isIntersecting) {
            if(entry.target.dataset.scrollIntersect === 'false'){
              setAttribute(entry.target, { dataScrollIntersect: true });
            }
          }
          if(!entry.isIntersecting) {
            if(entry.target.dataset.scrollIntersect === 'true'){
              setAttribute(entry.target, { dataScrollIntersect: false });
            }
          }
        }
      });
    };

    this.state.observer = new IntersectionObserver(checkInView, options);
    this.state.items.map((item, index) => {
      setAttribute(item, { dataScrollIndex: index });
      this.state.observer.observe(item);
    });
  }

  _ActivateItem(elem){
    if(!hasClass(elem.target, this.config.classNameActive)){
      if(this.config.classNameActive) addClass(elem.target, this.config.classNameActive);
    }
    if(this.config.on.Change && typeof(this.config.on.Change) === 'function'){
      this.config.on.Change(elem.target, Number(elem.target.dataset.scrollIndex), elem.target.dataset.scrollName);
    }
    if(this.config.on.In && typeof(this.config.on.In) === 'function'){
      this.config.on.In(elem.target, Number(elem.target.dataset.scrollIndex), elem.target.dataset.scrollName);
    }
  }

  _InActivateItem(elem){
    if(hasClass(elem.target, this.config.classNameActive)){
      if(this.config.classNameActive) removeClass(elem.target, this.config.classNameActive);
    }
    if(this.config.on.Change && typeof(this.config.on.Change) === 'function'){
      this.config.on.Change(elem.target, Number(elem.target.dataset.scrollIndex), elem.target.dataset.scrollName);
    }
    if(this.config.on.Out && typeof(this.config.on.Out) === 'function'){
      this.config.on.Out(elem.target, Number(elem.target.dataset.scrollIndex), elem.target.dataset.scrollName);
    }
  }

  Start(){
    if(!this.state.items){
      this._Init();
    }
  }

  Stop(){
    if(!this.state.items) return false;
    this.state.items.map((item) => {
      setAttribute(item, { dataScrollIndex: '' });
      this.state.observer.unobserve(item);
    });
    this.state.observer = null;
    this.state.items = null;
  }

  Update(){
    this.Stop();
    this._Init();
  }

  AddTarget(target){
    if(!target) return false;

    let _items = selectDom(target);
    if(!_items) return false;

    _items.map(item => {
      this.state.observer.observe(item);
    });
  }
}
