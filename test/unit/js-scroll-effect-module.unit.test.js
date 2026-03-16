const assert = require('assert');

const SCROLL_EFFECT_MODULE = require('../../src/js-scroll-effect-module').default;

describe('SCROLL_EFFECT_MODULE unit', () => {
  it('preserves an explicit ratioReverse of 0', () => {
    const module = new SCROLL_EFFECT_MODULE({
      autoStart: false,
      ratio: 0,
      ratioReverse: 0
    });

    assert.strictEqual(module.config.ratioReverse, 0);
  });

  it('converts a data attribute selector into a dataset key', () => {
    const module = new SCROLL_EFFECT_MODULE({ autoStart: false });

    assert.strictEqual(module.getDatasetKey('[data-scroll-name]'), 'scrollName');
  });
});
