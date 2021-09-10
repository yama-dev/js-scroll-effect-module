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

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.11.1/dist/js-scroll-effect-module.js](https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.11.1/dist/js-scroll-effect-module.js)

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
<link rel="stylesheet" href="./scroll-effect-module.css">
<script src="./js-scroll-effect-module.js"></script>

<div class="js-scroll js-scroll__fadein-basic"></div>

<script> new SCROLL_EFFECT_MODULE({ elem : '.js-scroll' }); </script>
```

### Advanced Use

``` html
<link rel="stylesheet" href="./scroll-effect-module.css">
<script src="./js-scroll-effect-module.js"></script>

<div class="js-scroll"></div>

<script>
  var ScrollEffectModule = new SCROLL_EFFECT_MODULE({
    elem               : '.js-scroll',
    firstElem          : '.js-scroll--first',

    displayRatio       : 0.8, // 判定する比率を指定（ウィンドウ高さを1として指定）
    displayReverse     : true, // スクロールを戻した時にクラスを削除するかどうか

    firstDelay         : 0, // 初回動作までの遅延時間（ms）
    firstDelaySteps    : 100,  // 初回出現要素を指定した場合のステップ遅延時間（ms）

    addClassNameActive : 'is-active', // null を設定するとクラスが付与されなくなる。

    on: {
      Scroll: function(top){
        console.log('Scroll', top);
      },
      Change: function(item, pos){
        console.log('Change', item, pos);
      },
      In: function(item, pos){
        console.log('In', item, pos);
      },
      Out: function(item, pos){
        console.log('Out', item, pos);
      }
    }
  });
</script>
```

## API

<br>


## Browser support

| Browser           | OS、version |
| ---               | ---         |
| Internet Explorer | 11+         |
| Chrome            | 最新        |
| Firefox           | 最新        |
| Safari            | 最新        |
| Android           | 4.4+ Chrome |
| iOS               | 8.0+ safari |

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

