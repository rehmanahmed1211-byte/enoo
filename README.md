# A Special Delivery For Enoo 💌

A cinematic, single-page interactive birthday experience built with plain HTML5 / CSS3 / vanilla JavaScript — no frameworks, no build step. Runs straight on GitHub Pages.

## What's inside

- **8 full-screen story scenes** (loading → welcome → celebration → envelope intro → interactive letter → flowers → final wish → goodbye) plus a closing title card, each with its own crossfade transition.
- **Custom animation engines**, all written from scratch:
  - `particles.js` – twinkling stars, falling tulip petals, rising hearts, floating balloons
  - `confetti.js` – canvas confetti burst on the birthday scene
  - `fireworks.js` – canvas rocket + spark fireworks on the final wish scene
  - `typewriter.js` – character-by-character text reveal used in every speech bubble and letter page
  - `envelope.js` – the full cinematic letter sequence: envelope centers → seal glows → flap opens → paper slides out → expands into a 5‑page handwritten letter with realistic page-turn transitions
- **Glassmorphism UI**: blurred glass buttons with a rotating glow + ripple click effect, glass speech bubbles, soft shadows, pink/gold gradients throughout.
- Fully responsive down to small phones and landscape orientation (`css/responsive.css`).

## ⚠️ About the media files

The brief references video and audio files (`welcome.mp4`, `birthday.mp4`, `envelope.mp4`, `flowers.mp4`, `goodbye.mp4`, `background.mp3`, `paper.mp3`, `click.mp3`). I can't generate real video or audio, so this build ships **without** those binaries — but everything is wired to use them automatically the moment you add your own:

```
assets/videos/welcome.mp4
assets/videos/birthday.mp4
assets/videos/envelope.mp4
assets/videos/flowers.mp4
assets/videos/goodbye.mp4

assets/audio/background.mp3
assets/audio/paper.mp3
assets/audio/click.mp3
```

Just drop files with those exact names in those exact folders. Until you do:

- Every video-backed scene gracefully shows a hand-tuned **CSS gradient** in its place (dusk purple, blush pink, or gold, matched to that scene's mood) — the site never shows a broken video icon or blank screen.
- Sound effects fail silently if missing (wrapped in try/catch), and the background music simply won't play until `background.mp3` exists.

Recommended: keep videos short (5–15s), muted, `.mp4` (H.264), and under a few MB each so GitHub Pages loads fast. They're lazy-loaded — nothing downloads until its scene is reached.

## Running locally

Because the letter and scenes use `fetch`-free, same-origin video loading, you can just open `index.html` directly in a browser, but for the smoothest experience (and to avoid any autoplay quirks) serve it locally:

```bash
cd birthday-website
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying to GitHub Pages

1. Push this folder's contents to a repo (keep `index.html` at the repo root, or in `/docs`).
2. In the repo settings → Pages, set the source to the branch/folder containing `index.html`.
3. Visit the published URL — done.

## Customizing

- **Colors / fonts / spacing tokens** live at the top of `css/style.css` under `:root`.
- **Letter text** lives directly in `index.html` inside `#scene-5`, split into five `.letter-page` blocks — edit the copy there.
- **Particle density** (petals, stars, hearts, balloons) is adjustable in `js/particles.js`.
- Everything is vanilla JS in small, single-purpose files (`scenes.js` = scene manager, `envelope.js` = letter cinematic, `main.js` = boot + wiring) so it's easy to extend without a build tool.

Made with love for Enoo's birthday. 🐸❤️
