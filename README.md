# SCROLL EFFECT MODULE

[![](https://img.shields.io/github/repo-size/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)
[![](https://img.shields.io/github/release/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)
[![](https://img.shields.io/david/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)
[![](https://img.shields.io/david/dev/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/releases/latest)
[![GitHub](https://img.shields.io/github/license/yama-dev/js-scroll-effect-module.svg)](https://github.com/yama-dev/js-scroll-effect-module/blob/master/LICENSE)

<br>

## Feature

Add effect according to scroll.  

<br>

## Demo

- Document -> [https://yama-dev.github.io/js-scroll-effect-module/](https://yama-dev.github.io/js-scroll-effect-module/)
- ExamplePage -> [https://yama-dev.github.io/js-scroll-effect-module/examples/](https://yama-dev.github.io/js-scroll-effect-module/examples/)
- ExamplePage(Acceleration) -> [https://yama-dev.github.io/js-scroll-effect-module/examples/](https://yama-dev.github.io/js-scroll-effect-module/examples/acceleration.html)

<br>

## Installation,Download

- npm -> [https://www.npmjs.com/package/js-scroll-effect-module](https://www.npmjs.com/package/js-scroll-effect-module)

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.6.0/dist/js-scroll-effect-module.js](https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.6.0/dist/js-scroll-effect-module.js)

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

### Advanced Use (Acceleration)

``` html
<script src="./js-scroll-effect-module.js"></script>
<script>
  var ScrollEffectModule = new SCROLL_EFFECT_MODULE({
    acceleration       : true,
    on: {
      Acceleration: function(num){
        console.log('Acceleration', num);
      }
    }
  });
</script>
```

<br>

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

___

**For Developer**

## Contribution

1. Fork it ( https://github.com/yama-dev/js-scroll-effect-module/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

<br>

## Develop

### at Development

Install node modules.

``` bash
$ npm install
```

Run npm script 'develop'

``` bash
$ npm run develop
```

<br>

## Licence

[MIT](https://github.com/yama-dev/js-scroll-effect-module/blob/master/LICENSE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

