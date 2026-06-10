
## INTRA MUN Website Plan

A single landing page with smooth-scroll navigation between sections (Home, About, What is MUN, Committees, Executive Board, Event Heads, Registration, Contact) — plus the registration sub-options linking out to the Google Form.

### Design

- **Colors** (from poster): deep purple background `#2a1a4a`, royal purple `#4a2c7a`, gold/amber accent `#f0a020`, off-white text. Defined as design tokens in `src/styles.css`.
- **Typography**: bold condensed display font (Bebas Neue / Anton style) for headings to match the poster's "INTRA MUN" lettering; clean sans (Inter) for body.
- **Imagery**: world-map texture background on hero (like the poster), UN/MUN themed AI-generated images for section accents (gavel, flags, conference hall, delegates).
- **Logo**: club crest used in nav and hero (uploaded as a Lovable asset).

### Pages / Routes

Single page at `/` with anchor sections + a sticky top nav. One additional route `/registration` is unnecessary — registration is a section with two large CTA cards (Individual / Delegation) that both link out to the Google Form. If you'd prefer separate routes later we can split.

### Sections

1. **Hero** — purple map backdrop, gold "INTRA MUN" title, dates "20–21 July 2026", logo, "Register Now" CTA, prize highlight "₹10,000 Cash Prize".
2. **About Us** — Department of Commerce MUN Society intro (placeholder copy you can refine).
3. **What is MUN** — short explainer of Model UN.
4. **Committees** — cards for: UNHRC, CCC, Lok Sabha, IPC – Media, IPC – Journalism. Agendas marked "TBA".
5. **Executive Board** — "To be announced" placeholder block.
6. **Event Heads** — 5 cards: Bharanitharan TH, Dhruv S Dali, Hayati Podugu, Nihal P Patil, Rohith M (with phone numbers shown also in Contact).
7. **Registration** — prize banner (₹10,000) + two cards:
   - Individual Registration → Google Form link
   - Delegation Registration (min 7 people) → Google Form link
   - Deadline: **12:00 PM, 19 July 2026**
   - Venue: "To be announced"
8. **Contact** — phone numbers for all 5 heads, plus a footer with logo.

### Technical

- TanStack Start file route `src/routes/index.tsx` rewritten with section components in `src/components/sections/`.
- Sticky `<Navbar />` with smooth-scroll anchor links (`#about`, `#committees`, etc.).
- Logo + hero background saved via `lovable-assets` from the uploaded files; supplementary UN/MUN images generated with imagegen and stored in `src/assets/`.
- Tailwind v4 tokens in `src/styles.css`: `--color-mun-purple`, `--color-mun-purple-deep`, `--color-mun-gold`, gradient + shadow tokens.
- SEO `head()` on the index route: title "INTRA MUN 2026 | DOC MUN Society", description, OG tags using the hero image.
- No backend needed — form submissions go to your existing Google Form.

### Open items you can fill in later

- Committee agendas
- Executive Board names
- Venue
- About Us copy refinements
- Any social handles / email for Contact section

Ready for me to build this — say the word and I'll switch to build mode.
