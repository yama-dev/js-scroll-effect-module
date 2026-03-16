---
"js-scroll-effect-module": patch
---

Switch npm package publishing to the `files` whitelist so only release assets are included.

Fix `autoStartType: 'load'` so delayed initialization still starts after the page has already loaded.

Preserve explicit `ratioReverse: 0` values instead of treating them as unset.

Make `customVarNameRatio` write to the configured CSS custom property only when it is explicitly set.

Use a single window resize listener for `updateResizeAuto` and prevent duplicate resize and scroll event bindings.

Add Mocha coverage for unit logic and DOM integration flows, including ratio handling and duplicate listener protection.
