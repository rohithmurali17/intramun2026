## Plan

### 1. Committees update
Reduce to 4 committees, shown as clickable cards on the homepage:
1. **UNSC** — UN Security Council
2. **UNHRC** — UN Human Rights Council
3. **AIPPM** — All India Political Parties Meet
4. **IPC** — International Press Corps, with two tracks: **IPP (Photography)** and **IPJ (Journalism)**

Each card on the home page becomes a `<Link>` to its detail route.

### 2. New routes (TanStack file-based)
```
src/routes/committees.$slug.tsx              -> /committees/unsc, /committees/unhrc, /committees/aippm, /committees/ipc
src/routes/committees.$slug.$country.tsx     -> /committees/unsc/france  (country position page)
```

Each committee detail page shows:
- Hero (committee name, full form, image)
- **Committee description**
- **Agenda** (TBA placeholder)
- **Chair / Executive Board** (TBA placeholder)
- **Background guide** (download/link slot — TBA)
- **Portfolio Matrix**: clickable list of countries/portfolios. Clicking one navigates to `/committees/$slug/$country` showing that country's role/stance on the agenda (placeholder copy per country until you provide real text).
- IPC page additionally splits into IPP and IPJ sub-sections inside the same detail page.

Data lives in a single typed file `src/data/committees.ts` (committee metadata + portfolio list + per-country position text) so it's easy to edit later.

Both new routes get unique `head()` metadata (title/description/OG).

### 3. Typography — Fraunces site-wide
- Keep Fraunces (already loaded in `__root.tsx`).
- In `src/styles.css` set `--font-sans: "Fraunces", serif;` so body + headings use Fraunces (close to Bookmania's warm transitional serif look). Bebas Neue stays available for the big display "INTRA MUN" wordmark only.
- Remove Rethink Sans from the Google Fonts URL since it's no longer used.

### 4. Instagram link
- Add Instagram icon button (lucide `Instagram`) to the Navbar and the Contact/Footer section, linking to `https://www.instagram.com/docmunsoc/` (opens in new tab, `rel="noopener noreferrer"`).

### 5. Animations
Keep existing scroll-reveal + hover transitions. Add a subtle hover lift + gold ring on committee cards to signal they're clickable.

### Files touched
- `src/routes/__root.tsx` — fonts link update, Instagram in nav
- `src/styles.css` — `--font-sans` → Fraunces
- `src/routes/index.tsx` — 4 committees, cards become `<Link>`s, Instagram in footer
- `src/data/committees.ts` (new) — committee + portfolio data
- `src/routes/committees.$slug.tsx` (new) — detail page
- `src/routes/committees.$slug.$country.tsx` (new) — country position page

### Open items (placeholders until you send them)
- Committee descriptions, agendas, EB names, background guide links
- Country portfolio lists per committee (I'll seed each with ~10 placeholder countries you can edit)
- Per-country position write-ups
