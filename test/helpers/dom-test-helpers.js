const { JSDOM } = require('jsdom');

function createDom(bodyHtml='') {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${bodyHtml}</body></html>`, {
    url: 'http://localhost'
  });

  global.window = dom.window;
  global.document = dom.window.document;
  global.HTMLElement = dom.window.HTMLElement;
  global.Node = dom.window.Node;
  global.Event = dom.window.Event;
  global.CustomEvent = dom.window.CustomEvent;
  global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
  Object.defineProperty(global, 'navigator', {
    configurable: true,
    writable: true,
    value: dom.window.navigator
  });

  return dom;
}

function cleanupDom(dom) {
  if (dom) dom.window.close();

  delete global.window;
  delete global.document;
  delete global.HTMLElement;
  delete global.Node;
  delete global.Event;
  delete global.CustomEvent;
  delete global.getComputedStyle;
  delete global.navigator;
}

function setWindowMetrics({ innerWidth=1280, innerHeight=800, pageYOffset=0 } = {}) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: innerWidth
  });

  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    writable: true,
    value: innerHeight
  });

  Object.defineProperty(window, 'pageYOffset', {
    configurable: true,
    writable: true,
    value: pageYOffset
  });
}

function setElementMetrics(el, { clientHeight=100, offsetHeight=100, top=0 } = {}) {
  Object.defineProperty(el, 'clientHeight', {
    configurable: true,
    value: clientHeight
  });

  Object.defineProperty(el, 'offsetHeight', {
    configurable: true,
    value: offsetHeight
  });

  el.getBoundingClientRect = () => ({
    top,
    bottom: top + offsetHeight,
    left: 0,
    right: 0,
    width: 100,
    height: offsetHeight
  });
}

function trackListeners(target, type) {
  const active = new Set();
  const originalAdd = target.addEventListener.bind(target);
  const originalRemove = target.removeEventListener.bind(target);

  target.addEventListener = function(name, listener, options) {
    if (name === type) active.add(listener);
    return originalAdd(name, listener, options);
  };

  target.removeEventListener = function(name, listener, options) {
    if (name === type) active.delete(listener);
    return originalRemove(name, listener, options);
  };

  return {
    active,
    restore() {
      target.addEventListener = originalAdd;
      target.removeEventListener = originalRemove;
    }
  };
}

module.exports = {
  cleanupDom,
  createDom,
  setElementMetrics,
  setWindowMetrics,
  trackListeners
};
