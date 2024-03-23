# SCROLL EFFECT MODULE

[![](https://img.shields.io/github/release/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)

<br>

## Feature

Add effect according to scroll.  
By using pre-prepared CSS, it is surprisingly easy to add effects that match the scrolling.

<br>

## Demo

- Document -> [https://yama-dev.github.io/js-scroll-effect-module-docs/](https://yama-dev.github.io/js-scroll-effect-module-docs/)

<br>

## Installation,Download

- npm -> [https://www.npmjs.com/package/js-scroll-effect-module](https://www.npmjs.com/package/js-scroll-effect-module)

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module/dist/js-scroll-effect-module.js](https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module/dist/js-scroll-effect-module.js)

- Zip -> [yama-dev/js-scroll-effect-module](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)

<br>

## Using

### NPM Usage

``` bash
# install npm.
npm install --save-dev js-scroll-effect-module
```

``` javascript
// import.
import SCROLL_EFFECT_MODULE from 'js-scroll-effect-module';
```

### Basic Use

``` html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module/examples/scroll-effect-module.css">
<script src="https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module/dist/js-scroll-effect-module.js"></script>

<div data-scroll></div>

<div data-scroll></div>

<script>
new SCROLL_EFFECT_MODULE({
  target: '[data-scroll]',
  ratio : 0.8,   // 判定する比率を指定（ウィンドウ高さを1として指定）
  reverse: true, // スクロールを戻した時にクラスを削除するかどうか
});
</script>
```

### Advanced Use

``` html
<script src="https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module/dist/js-scroll-effect-module.js"></script>

<div data-scroll data-scroll-name="name-1"></div>

<div data-scroll data-scroll-name="name-2"></div>

<script>
const ScrollEffectModule = new SCROLL_EFFECT_MODULE({
  target             : '[data-scroll]',
  classNameInview    : 'is-active',

  ratio              : 0.8,   // 判定する比率を指定（ウィンドウ高さを1として指定）
  reverse            : false, // スクロールを戻した時にクラスを削除するかどうか

  ratioReverse       : null, // 戻る際の判定比率を指定（ウィンドウ高さを1として指定）

  firstDelay         : 100, // 初回動作までの遅延時間（ms）

  autoStart          : true, // 自動でスタートするかどうか
  autoStartType      : 'ready', // ready, load, scroll

  throttleInterval   : 5,

  on: {
    Change: function(obj, index, name){
      console.log('Change', obj, index, name);
    },
    In: function(obj, index, name){
      console.log('In', obj, index, name);
    },
    Out: function(obj, index, name){
      console.log('Out', obj, index, name);
    },
    Scroll: function(_y){
      console.log('Scroll', _y);
    },
  }
});
</script>
```

## Methods

### Start

監視を開始

ex. `ScrollEffectModule.Start();`

### Stop

監視を停止

ex. `ScrollEffectModule.Stop();`

### Update

各要素の情報更新

ex. `ScrollEffectModule.Update();`

<br>

## Dependencies

[@yama-dev/js-dom](https://github.com/yama-dev/js-dom)

<br><br><br>

---

## Licence

[MIT](https://github.com/yama-dev/js-scroll-effect-module/blob/master/LICENSE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

