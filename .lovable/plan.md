

## Problem

The "Harris Benadict . A" name uses `initial`/`animate` which only plays once on mount. It doesn't replay when scrolling back up into view. The user wants:
1. On page load → slide in (left/right)
2. On scroll up back to hero → slide in again

## Solution

Change the name animation from `initial`/`animate` to `whileInView` so it triggers every time the section enters the viewport, including on initial load and when scrolling back up.

### Changes

**`src/components/HeroSection.tsx`**
- Replace `initial`/`animate` on both "Harris" and "Benadict. A" spans with `initial` + `whileInView` + `viewport={{ once: false, amount: 0.3 }}`
- Remove the `delay: 2.6` since `whileInView` will naturally trigger after loading screen unmounts and the hero is in view
- Use the same left/right slide pattern: `x: -200` for Harris, `x: 200` for Benadict. A
- Apply same treatment to the decorative line below the name

**`src/components/LoadingScreen.tsx`**
- No changes needed — the loading screen already has its own independent animation

