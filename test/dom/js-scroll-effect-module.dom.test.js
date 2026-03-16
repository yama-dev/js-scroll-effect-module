const assert = require('assert');

const SCROLL_EFFECT_MODULE = require('../../src/js-scroll-effect-module').default;
const {
  cleanupDom,
  createDom,
  setElementMetrics,
  setWindowMetrics,
  trackListeners
} = require('../helpers/dom-test-helpers');

describe('SCROLL_EFFECT_MODULE DOM integration', () => {
  let dom;

  beforeEach(() => {
    dom = createDom('<div id="target" data-scroll data-scroll-name="hero"></div>');
    setWindowMetrics({ innerWidth: 1280, innerHeight: 1000, pageYOffset: 0 });
    setElementMetrics(document.body, { clientHeight: 2000, offsetHeight: 2000, top: 0 });
    setElementMetrics(document.getElementById('target'), {
      clientHeight: 120,
      offsetHeight: 120,
      top: 200
    });
  });

  afterEach(() => {
    cleanupDom(dom);
  });

  it('writes the ratio to the configured custom property', () => {
    const target = document.getElementById('target');
    const module = new SCROLL_EFFECT_MODULE({
      autoStart: false,
      customVarNameRatio: '--sem-scroll-ratio'
    });

    module.Start();

    assert.strictEqual(target.style.getPropertyValue('--sem-scroll-ratio'), '0.8');
    assert.strictEqual(target.style.getPropertyValue('--scroll-ratio'), '');
  });

  it('does not write a ratio custom property when customVarNameRatio is unset', () => {
    const target = document.getElementById('target');
    const module = new SCROLL_EFFECT_MODULE({
      autoStart: false
    });

    module.Start();

    assert.strictEqual(target.style.getPropertyValue('--scroll-ratio'), '');
  });

  it('keeps only one active resize listener across rebinds', () => {
    const module = new SCROLL_EFFECT_MODULE({
      autoStart: false,
      autoStartType: 'scroll',
      updateResizeAuto: true
    });

    module.Update();

    const trackedResize = trackListeners(window, 'resize');
    let startCallCount = 0;
    module.Start = () => {
      startCallCount += 1;
    };

    module._BindEvent();
    module._BindEvent();

    assert.strictEqual(trackedResize.active.size, 1);

    window.innerWidth = 1440;
    window.dispatchEvent(new window.Event('resize'));

    assert.strictEqual(startCallCount, 1);

    trackedResize.restore();
  });

  it('keeps only one pair of active scroll listeners across rebinds', () => {
    const module = new SCROLL_EFFECT_MODULE({
      autoStart: false,
      autoStartType: 'scroll'
    });

    module.Update();

    const trackedScroll = trackListeners(module.state.$parent, 'scroll');

    module._BindEventScroll();
    module._BindEventScroll();

    assert.strictEqual(trackedScroll.active.size, 2);

    trackedScroll.restore();
  });
});
