## Goal
Replace the current grid/squares "Committees" section on the homepage with a cinematic **3D revolving carousel** (coverflow-style) where committee cards rotate around a central axis as the user scrolls. The active (front) card is clickable and navigates to that committee's detail page.

## Reference behavior (from attached video)
- Cards arranged on a horizontal arc (coverflow / cylinder).
- Scroll progress (or drag) rotates the carousel; side cards are tilted/scaled down, the centered card is upright, larger, and highlighted.
- Stopping reveals the active card; clicking it routes to `/committees/$slug`.

## Scope (frontend only)
- Replace the existing committees grid inside `src/routes/index.tsx` with a new `<CommitteeCarousel />` component.
- All 5 committees (UNSC, UNHRC, AIPPM, IPC, ECOSOC) participate, pulled from `src/data/committees.ts` (no data changes).
- Keep marquee, stats, and all other sections untouched.

## New component: `src/components/CommitteeCarousel.tsx`
- Accepts the `COMMITTEES` array.
- Layout: cards positioned in 3D using CSS `transform: rotateY()` + `translateZ()` on a `transform-style: preserve-3d` stage with `perspective` on parent.
- Each card shows: committee image (`comm-*.jpg`), abbreviation (e.g. UNSC), full form, and a small "Enter →" CTA.
- Active card: scale 1, opacity 1, no tilt, glowing gold ring (using existing `--primary` token).
- Side cards: tilted ~35° on Y, reduced scale/opacity, non-interactive (pointer-events on inactive cards disabled so only the front is clickable).

## Interaction model
- **Scroll-driven rotation:** While the carousel section is pinned in view, vertical scroll progress maps to carousel angle (via `IntersectionObserver` + scroll listener, no extra libs). Section height ≈ `100vh + (committees * 80vh)` so each committee occupies a scroll segment.
- **Snap on stop:** When scroll velocity ≈ 0, snap angle to nearest committee using a short eased transition.
- **Manual controls:** Left/Right arrow buttons + keyboard arrows + touch drag (pointer events) as fallbacks for users who don't scroll inside the section.
- **Click:** Active card is a `<Link to="/committees/$slug" params={{slug}}>`; inactive cards are buttons that rotate the carousel to bring that committee to front (no navigation).

## Styling
- Tailwind + design tokens already in `src/styles.css` (no new colors).
- Cards: `~320×420px` rounded panels, gradient overlay over image, serif title (Fraunces), mono caption.
- Backdrop: subtle radial gradient + existing grain overlay for continuity with hero.
- Reduced-motion: if `prefers-reduced-motion`, fall back to a simple horizontal scroll-snap row (no 3D transforms).

## Files to change
- **Add:** `src/components/CommitteeCarousel.tsx`
- **Edit:** `src/routes/index.tsx` — swap the committees grid block for `<CommitteeCarousel committees={COMMITTEES} />`; keep section heading and intro copy.
- No changes to `src/data/committees.ts`, routes, audio, or BGM.

## Out of scope
- No new libraries (pure React + CSS transforms; no swiper/embla 3D plugins).
- No changes to committee detail pages or IPC track flow.
- No backend/data changes.
