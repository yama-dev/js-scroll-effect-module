# SCROLL EFFECT MODULE

[![](https://img.shields.io/github/release/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)

<br>

## Feature

Add effect according to scroll.

<br>

## Demo

- Document -> [https://yama-dev.github.io/js-scroll-effect-module-docs/](https://yama-dev.github.io/js-scroll-effect-module-docs/)

<br>

## Installation,Download

- npm -> [https://www.npmjs.com/package/js-scroll-effect-module](https://www.npmjs.com/package/js-scroll-effect-module)

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.12.0/dist/js-scroll-effect-module.js](https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.12.0/dist/js-scroll-effect-module.js)

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
<div data-scroll></div>
<script src="./js-scroll-effect-module.js"></script>
<script> new SCROLL_EFFECT_MODULE({ target: '[data-scroll]' }); </script>

// 予め容易されているアニメーションを利用する場合
<link rel="stylesheet" href="./scroll-effect-module.css">
<div data-scroll data-scroll-type="fadein"></div>
<div data-scroll data-scroll-type="fadeinTop"></div>
<div data-scroll data-scroll-type="fadeinBottom"></div>
<div data-scroll data-scroll-type="fadeinLeft"></div>
<div data-scroll data-scroll-type="fadeinRight"></div>
<div data-scroll data-scroll-type="zoomin"></div>
<div data-scroll data-scroll-type="spinin"></div>
```

### Advanced Use

``` html
<link rel="stylesheet" href="./scroll-effect-module.css">
<script src="./js-scroll-effect-module.js"></script>

<div data-scroll data-scroll-name="first"></div>
<div data-scroll data-scroll-name="second"></div>
<div data-scroll data-scroll-name="third"></div>

<script>
const ScrollEffectModule = new SCROLL_EFFECT_MODULE({
  target: '[data-scroll]',
  root: null,

  displayRatio       : 0.8,
  displayReverse     : true,

  autoStart: true,

  classNameActive: 'is-active',

  intersect: false, // intersectの処理をするか

  scrollEvent: false, // scrollイベントを管理するか
  throttleInterval: 3,

  on: {
    Scroll: function(top){
      console.log('Scroll', top);
    },
    Change: function(elem, index, name){
      console.log('Change', elem, index, name);
      document.querySelector('.dev .t1').innerHTML = index;
      document.querySelector('.dev .t2').innerHTML = name;
    },
    In: function(elem, index, name){
      console.log('In', elem, index, name);
    },
    Out: function(elem, index, name){
      console.log('Out', elem, index, name);
    }
  }
});
</script>
```

## API

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

