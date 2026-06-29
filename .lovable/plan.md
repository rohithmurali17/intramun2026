## Goal
Fix horizontal overflow on real mobile browsers (iOS Safari/Chrome Android) where `overflow-x: clip` on `body` isn't honored, causing the page to zoom out and leave dark empty space on the right.

## Root causes
1. The root wrapper `<div className="min-h-screen bg-background ...">` in `src/routes/index.tsx` doesn't constrain its own width — mobile browsers fall back to the widest descendant.
2. The Hero stats grid uses `grid-cols-3` on mobile with `tracking-widest` text inside fixed-width columns (~125px each on a 375px phone) — content can't wrap, forcing the viewport to expand.
3. `CommitteeCarousel.tsx` uses `overflow-visible` on its outer container and absolutely-positioned cards that translate up to ~880px sideways (3 cards × 220px offset + 300px width), which can punch past the viewport on real devices.

## Changes

### 1. `src/routes/index.tsx` — root wrapper
Bind the app to viewport width so no descendant can stretch it:
```tsx
<div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full max-w-[100vw]" ...>
```

### 2. `src/routes/index.tsx` — Hero stats grid (line 154)
Change `grid-cols-3 sm:grid-cols-4` → `grid-cols-2 sm:grid-cols-4`, and swap `divide-x` for `divide-y sm:divide-y-0 sm:divide-x` so the two-row mobile layout has a horizontal separator.

### 3. `src/components/CommitteeCarousel.tsx` — contain the 3D stage
- Outer wrapper: `overflow-visible` → `overflow-x-clip` plus `overflow-x-hidden` fallback (use both: `overflow-hidden md:overflow-visible` is safest since the 3D depth doesn't need vertical overflow on mobile).
- Reduce mobile card offset: cards at offset ±1/±2 currently translate `220px` and `440px` — on a 375px viewport the card at offset 2 sits fully off-screen but still contributes to layout width. Cap `translateX` with a viewport-relative value on mobile: e.g. `offset * (window.innerWidth < 640 ? 140 : 220)`. Done via a `useEffect`/resize listener or a CSS custom property updated on resize.

### 4. Add `meta viewport` safety
Verify `src/routes/__root.tsx` head includes `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`. If missing, add it — without this, mobile browsers default to a 980px virtual viewport which produces exactly the "zoomed out with dark right gutter" symptom the user describes.

## Out of scope
No changes to data, audio, routes, or other sections.

## Verification
- Run Playwright at 375×812 (iPhone) and 390×844 to confirm: no horizontal scroll, stats grid reads as 2×2, carousel cards stay inside viewport, scroll-lock still cycles all 5 committees.
