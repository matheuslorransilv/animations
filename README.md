# animations

A motion-design studio: code-driven animation rendered frame by frame with
headless Chromium or Node canvas, encoded with ffmpeg, and synced to audio
analysed in Python.

## Setup

```bash
# 1. Runtime: Node 22+, ffmpeg, Python 3
brew install node ffmpeg python          # macOS; apt install on Linux
pip install -r requirements.txt          # numpy, librosa, soundfile

# 2. Headless browser
npm install
npx playwright install chromium          # skip where Chromium is preinstalled
```

Playwright is pinned to 1.56.1, whose Chromium build (1194) ships preinstalled
in Claude Code cloud sessions.

## Making a film

Studio rules and the render workflow are in [CLAUDE.md](CLAUDE.md): films are pure
functions of time rendered by `node render.mjs`, synced to a `beats.json` from
`python3 beats.py`.

## Claude Code skills and plugins

These live under `.claude/` and load when you open the repo in Claude Code:

- **Remotion** (`remotion-dev/skills`): `/remotion-create`, `/remotion-render`,
  `/remotion-studio`, and more.
- **HyperFrames** (`heygen-com/hyperframes`): `/hyperframes` router plus
  `/motion-graphics`, `/music-to-video`, `/general-video` and the GSAP skills.
  Versions are recorded in `skills-lock.json`. Update with `npx skills update -p`.
- **claude-animation** (hand-drawn look): declared in `.claude/settings.json`;
  Claude Code offers to install it when you trust the project. It needs its
  canvas dependency once per machine:

  ```bash
  cd ~/.claude/plugins/cache/claude-animation-skill/claude-animation/*/skills/claude-animation && npm install
  ```

Run Claude Code on Opus 5.5 with `claude --model claude-opus-5-5`, then use
`/model` to set effort: `xhigh` for one-shots, `max` for flagship pieces.
