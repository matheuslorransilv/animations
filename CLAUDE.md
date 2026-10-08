# Motion studio rules

## Render contract
- Every film is a pure function of time: `window.seek(t)` paints frame t.
- No CSS transitions, no setTimeout, no requestAnimationFrame in render mode,
  no state carried between frames. Seeded noise only (mulberry32), never Math.random.
- Render with `node render.mjs`, encode H.264 yuv420p, CRF 16.

## Look
- Banned defaults: centered title on gradient, everything fading in,
  corner labels and frame borders, glow on UI chrome, generic particle bursts.
- One display face, one UI face. One accent color unless the brief says otherwise.
- Every 2 to 4 seconds something new must happen on screen.

## Sound
- Score and SFX are synthesized in code unless a track is supplied.
- Place hits on the measured beat grid (beats.json). Loudness -14 LUFS.

## Loop before you show me anything
1. Render one frame per beat as a contact sheet and LOOK at it.
2. Score it 1-10 on: hook in first 2s, readability at phone size,
   motion quality, variety, brand accuracy, sound sync.
3. Fix the 3 worst problems. Repeat until every score is 8+.
4. Only then do the full render.

## Tooling

A film lives in `films/<name>/`: `index.html` (defines `window.seek(t)` and
`window.film = { duration, fps, width, height }`), plus its score and `beats.json`.
Output goes to `out/` (gitignored).

```bash
python3 beats.py films/<name>/score.wav                    # -> films/<name>/beats.json
node render.mjs films/<name> --sheet                       # contact sheet, one frame per beat
node render.mjs films/<name> --check                       # render-contract check
node render.mjs films/<name> --audio films/<name>/score.wav  # full render -> out/<name>.mp4
```

- `seek(t)` may be async. While rendering, `window.__RENDER__` is true: skip any
  preview playback loop when it is set.
- In render mode, timers and requestAnimationFrame never fire and Math.random is
  seeded. Calls made from inside `seek` are reported as violations.
- `--check` seeks sample frames forward, then in reverse, and fails if any frame
  differs, a CSS transition or animation is running, or `seek` used timers, rAF or
  Math.random. A full render runs this check first and aborts on failure.
- Contact-sheet tiles are 360px wide (phone width): judge readability at that size.
  Read every `out/<name>-sheet-NN.png` page before scoring.
- The full render normalizes the score to -14 LUFS (gain plus a peak limiter that holds
  true peak under -1 dBTP without shifting timing) and prints the measured loudness.
