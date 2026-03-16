---
"js-scroll-effect-module": patch
---

Switch npm package publishing to the `files` whitelist so only release assets are included.

Fix `autoStartType: 'load'` so delayed initialization still starts after the page has already loaded.

Preserve explicit `ratioReverse: 0` values instead of treating them as unset.
