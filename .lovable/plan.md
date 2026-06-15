## Goal

When a user opens the UNSC committee page, auto-play the uploaded `UNSC intro.mp3` voiceover and replace the current hero description with a live-highlighted transcript that follows the audio word-by-word. Other committees keep their normal description.

## Changes

### 1. Upload the audio as a CDN asset
- Upload `user-uploads://UNSC_intro.mp3` via `lovable-assets create`, write pointer to `src/assets/unsc-intro.mp3.asset.json`.

### 2. Add intro media to UNSC data
In `src/data/committees.ts`, add an optional `intro` field to the UNSC committee only:
- `audioUrl`: the asset URL
- `transcript`: full text broken into ~40–55 timed phrase segments, each `{ text, start, end }` in seconds. Timings will be estimated proportionally from the audio's duration (read at runtime) so we don't hand-tune dozens of timestamps. Segments are split on punctuation + em-dashes so highlight chunks feel natural.

### 3. New `IntroPlayer` component (`src/components/IntroPlayer.tsx`)
- Renders the audio element plus the transcript styled as a large serif paragraph.
- Auto-plays on mount (muted-fallback if browser blocks autoplay; also kicks off on first user interaction via the global BGM pattern). While the intro plays, pause the global BGM, then resume it when finished or when the user navigates away.
- On `timeupdate`, finds the active segment and applies a highlighted class (gold text + subtle background) to that span. Past segments dim slightly; upcoming segments stay muted foreground.
- Small play/pause + restart control underneath (so users can replay the voiceover).
- Respects `prefers-reduced-motion` (skips the smooth color transitions).

### 4. Wire it into the UNSC page
In `src/routes/committees.$slug.tsx`:
- If `committee.intro` exists, render `<IntroPlayer />` in the hero section in place of the `committee.description` paragraph.
- All other committees fall back to the existing `<p>` description — no change for UNHRC / AIPPM / IPC.

### 5. BGM coordination
Add a tiny shared signal (window event `intro:playing` true/false) the existing `BgmPlayer` listens for, so the background music ducks/pauses while the voiceover speaks and resumes after.

## Notes / trade-offs

- Timings are estimated, not hand-authored. They'll feel tight but won't be word-perfect. If you want frame-accurate sync, we'd need a manually timed `.vtt` file or a transcription pass — let me know if you'd like that follow-up.
- Browser autoplay policies sometimes block sound until the user clicks; in that case the transcript still shows and a "Play voiceover" button appears.
