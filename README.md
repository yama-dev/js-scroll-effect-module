# SCROLL EFFECT MODULE

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

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.3.0/dist/js-scroll-effect-module.js](https://cdn.jsdelivr.net/gh/yama-dev/js-scroll-effect-module@v0.3.0/dist/js-scroll-effect-module.js)

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

<div class="js-scroll js-scroll__fadein-basic"></div>

<script>
var ScrollEffectModule = new SCROLL_EFFECT_MODULE({
  elem               : '.js-scroll',
  displayRatio       : 0.8,
  displayReverse     : true,
  firstElem          : '.js-scroll--first',
  firstElemDelayTime : 300,
  firstDelayTime     : 500,
  loadDelayTime      : 0,
  addClassNameActive : 'is-active',
  on: {
    In: function(item, pos){
      console.log('In')
      console.log(item);
      console.log(pos);
    },
    Out: function(item, pos){
      console.log('Out')
      console.log(item);
      console.log(pos);
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

