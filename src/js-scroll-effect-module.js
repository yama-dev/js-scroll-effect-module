
import * as DOM from '@yama-dev/js-dom/core/';

export default class SCROLL_EFFECT_MODULE {

  constructor(options={}){

    // Set State.
    this.state = {
      NumScrolltopPre: 0,
      NumScrolltop   : 0,
      NumWindowHeight: 0,
      PosList        : [],
      $targets       : null,
      $parent        : null,
      $body          : null,
    };

    // config, options.
    let configDefault = {
      target             : '[data-scroll]',
      targetDataName     : '[data-scroll-name]',
      parent             : 'window',
      body               : 'body',

      classNameInview    : 'is-active',

      ratio              : 0.8,
      ratioReverse       : null,

      reverse            : false,

      firstDelay         : 100,

      autoStart          : true,
      autoStartType      : 'ready', // ready, load, scroll

      throttleInterval   : 5,

      customVarNameRatio : null, // '--sem-scroll-ratio'

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

    this.timer = null;
    this.timerScroll = null;

    // adjust ratio value.
    if( !this.config.ratioReverse ) {
      this.config.ratioReverse = this.config.ratio;
    } else {
      if( this.config.ratioReverse < this.config.ratio ) {
        this.config.ratioReverse = this.config.ratio;
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
    if(this.timer) clearTimeout(this.timer);

    // for Resize-Event
    this.state.$parent.addEventListener('resize', () => {
      this.Start();
    });

    if(this.config.autoStartType === 'ready'){
      this.timer = setTimeout(()=>{
        this.Start();
        this._BindEventScroll();
      }, this.config.firstDelay);
    } else if(this.config.autoStartType === 'load'){
      // for Load-Event
      this.state.$parent.addEventListener('load', () => {
        this.timer = setTimeout(()=>{
          this.Start();
          this._BindEventScroll();
        }, this.config.firstDelay);
      });
    } else if(this.config.autoStartType === 'scroll'){
      this._BindEventScroll();
    }
  }

  _BindEventScroll(){
    let _that = this;

    if(this.timerScroll) clearTimeout(this.timerScroll);

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

    // スクロールの間引き処理
    this.state.$parent.addEventListener('scroll', throttle(function(){
      _that._StoreElementStateAtPosList();
    }, _that.config.throttleInterval), {passive: true});

    this.state.$parent.addEventListener('scroll', ()=>{
      if(this.timerScroll) clearTimeout(this.timerScroll);

      // スクロール終了時に実行
      _that.timerScroll = setTimeout(()=>{
        _that._StoreElementStateAtPosList();
      }, _that.config.throttleInterval * 2);
    }, {passive: true});
  }

  _SetDom(){
    this.state.PosList = [];

    this.state.$targets = DOM.selectDom(this.config.target);
    this.state.$parent = this.config.parent == 'window' ? window : document.querySelector(this.config.parent);
    this.state.$body = this.config.body == 'body' ? document.body : document.querySelector(this.config.body);

    this.state.NumScrolltop = (this.config.parent === 'window' ? this.state.$parent.pageYOffset : this.state.$parent.scrollTop);
    this.state.NumWindowHeight = (this.config.parent === 'window' ? this.state.$parent.innerHeight : this.state.$parent.clientHeight);

    if(this.state.$targets){
      this.state.$targets.map((el,i)=>{
        let offset = 0;
        if(el.dataset && el.dataset.semOffset !== undefined) offset = Number(el.dataset.semOffset);
        let _y = el.getBoundingClientRect().top - (this.config.parent === 'window' ? 0 : this.state.$parent.getBoundingClientRect().top);

        let obj = {
          el: el,
          index: i + 1,
          pos: _y + this.state.NumScrolltop - offset,
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

    // Add Top body position.
    let obj = {
      el: document.body,
      index: 0,
      pos: 0,
      height: 0,
      height2: 0,
      count: 0,
      active: false,
      changing: false,
      dataset: document.body.dataset
    };
    this.state.PosList.unshift( obj );

    // sort by position
    this.state.PosList.sort((a, b) =>
      a.pos > b.pos ? 1 : -1  
    );
  }

  _StoreElementStateAtPosList(){
    if(!this.state.PosList.length) return false;

    // Scroll top cache
    this.state.NumScrolltop = (this.config.parent === 'window' ? this.state.$parent.pageYOffset : this.state.$parent.scrollTop);

    // 要素のactive状態を設定するユーティリティ関数
    let setActiveState = (el, active) => {
      if (el.active !== active) {
        el.changing = true;
        el.active = active;
      }
    };

    let activeCountBefore = this.state.PosList.filter(item => item.active === true).length;

    let flgPageBottom = this.state.NumScrolltop >= this.state.$body.clientHeight - (this.config.parent === 'window' ? this.state.$parent.innerHeight : this.state.$parent.clientHeight);

    // Store element state at PosList.
    for (let _i = 0; _i < this.state.PosList.length; _i++) {
      const el = this.state.PosList[_i];

      if(this.config.customVarNameRatio){
        let _ratio = (this.state.NumScrolltop + this.state.NumWindowHeight - el.pos) / this.state.NumWindowHeight;
        let _ratio2 = Math.floor(_ratio * 100) / 100;
        el.el.style.setProperty('--scroll-ratio', _ratio2);
      }

      if (flgPageBottom) {
        setActiveState(el, true);
      } else if (this.config.ratio === this.config.ratioReverse) {
        // ratioとratioReverseが同じ場合の処理
        if (this.state.NumScrolltop + (this.state.NumWindowHeight * this.config.ratio) > el.pos) {
          // 画面内に要素が表示された場合
          setActiveState(el, true);
        } else {
          // 画面外に要素が移動した場合
          setActiveState(el, false);
        }
      } else {
        // ratioとratioReverseが異なる場合の処理
        if(!el.active){
          if (this.state.NumScrolltop + (this.state.NumWindowHeight * this.config.ratio) > el.pos) {
            // ratioで設定された閾値を満たした場合
            setActiveState(el, true);
          }
        } else {
          if (this.state.NumScrolltop + (this.state.NumWindowHeight * this.config.ratioReverse) < el.pos) {
            // ratioReverseで設定された閾値を下回った場合
            setActiveState(el, false);
          }
        }
      }
    }

    let activeCountAfter = this.state.PosList.filter(item => item.active === true).length;

    // アクティブな要素の数が変化した場合の処理
    let _type = activeCountBefore < activeCountAfter ? 'down' : 'up';

    // For Changed
    let changingCount = this.state.PosList.filter(item => item.changing === true);
    if(changingCount.length) this._ActionChange(_type);

    // Scrollコールバック関数の呼び出し
    this.callCallback(this.config.on.Scroll, this.state.NumScrolltop);

    this.state.NumScrolltopPre = this.state.NumScrolltop;
  }

  _ActionChange(_type){
    if(!this.state.PosList.length) return false;

    for (let _i = 0; _i < this.state.PosList.length; _i++) {
      const _item_pre = this.state.PosList[_i - 1];
      const _item = this.state.PosList[_i];

      if (_item.active) {
        // activeな場合の処理
        if (!DOM.hasClass(_item.el, this.config.classNameInview)) {
          _item.count++;
          if (this.config.classNameInview) DOM.addClass(_item.el, this.config.classNameInview);
          // Inコールバック関数の呼び出し
          this.callCallback(this.config.on.In, _item, _item.index, _item.dataset.scrollName);
        }
      } else {
        // activeでない場合の処理
        if (this.config.displayReverse && DOM.hasClass(_item.el, this.config.classNameInview)) {
          DOM.removeClass(_item.el, this.config.classNameInview);
          // Outコールバック関数の呼び出し
          this.callCallback(this.config.on.Out, _item, _item.index, _item.dataset.scrollName);
        }
      }

      // changingフラグのチェック
      if (_item.changing) {
        _item.changing = false;

        // アクティブの増減によってcallbackに渡すitemを変更
        let _item_fix = _type === 'down' ? _item : _item_pre;

        // Changeコールバック関数の呼び出し
        this.callCallback(this.config.on.Change, _item_fix, _item_fix.index, _item_fix.dataset.scrollName);
      }
    }
  }

  // コールバック関数の呼び出しを行うためのユーティリティ関数
  callCallback(callback, ...args) {
    if (callback && typeof callback === 'function') {
      callback(...args);
    }
  }

}
