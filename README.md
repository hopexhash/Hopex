# HOPEX — hopex.ai

Single-page artist site. Dark, monochrome, animated: the glowing HX monogram
carries the hero, with oversized type and hard edges under it.

No build step, no dependencies, no API keys. Open `index.html` and it runs.

```
index.html
assets/css/style.css
assets/js/config.js   ← the only file you normally need to edit
assets/js/main.js
assets/img/           ← logo, favicon, social card
```

## The logo

`assets/img/` is generated from the original artwork. The source was a white
monogram on a black plate; it has been auto-cropped to the glyph and rebuilt
with the glow as a real alpha channel, so it composites cleanly over anything.

| File | Used for |
| --- | --- |
| `hopex-mark.webp` | hero monogram, nav, footer (900px, ~190 KB) |
| `hopex-mark.png` | fallback for browsers without WebP |
| `hopex-icon.png` | favicon / touch icon |
| `hopex-og.png` | 1200×630 link preview card |

To swap in new artwork, replace all four keeping the same filenames — nothing
in the CSS or JS references the image dimensions.

---

## Editing the site

Everything that changes over time lives in **`assets/js/config.js`**: the
contact email, the social links and their order, and the YouTube setup.

### Music — Spotify

The Spotify section uses the official artist embed, which always shows your
current top and latest tracks. Nothing to update, ever. If you ever change
artist profiles, swap the ID in the `<iframe src>` in `index.html`.

### Video — YouTube

The grid works in two modes:

**1. Live (recommended).** Put your channel ID in `config.js`:

```js
youtube: { channelId: 'UCxxxxxxxxxxxxxxxxxxxxxx', ... }
```

The grid then fetches your newest uploads from the channel's public RSS feed
on every page load — new video goes up, it appears here automatically.

To find your channel ID:
- YouTube Studio → **Settings → Channel → Advanced settings**, or
- open `youtube.com/@HOPEX` → View Page Source → search for `channelId`.

It is 24 characters and starts with `UC`.

**2. Curated (fallback).** Leave `channelId` empty and the `videos` array in
`config.js` is used instead. Each entry needs the 11-character ID from the
watch URL (`youtube.com/watch?v=THIS_PART`). The curated list is also used
automatically if the live fetch is ever unavailable, so the grid never
renders empty.

> The IDs currently in `config.js` are placeholders picked from search results —
> replace them with videos from your own channel.

### Socials

Add, remove or reorder entries in the `socials` array. The page order follows
the array order.

---

## Running it locally

```bash
npx http-server -p 8080 -c-1
# → http://127.0.0.1:8080
```

Opening `index.html` directly via `file://` mostly works too, but the live
YouTube fetch needs `http://`.

---

## Deploying

It is a plain static site, so anything works:

- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect the
  repo. No build command, publish directory `.`
- **GitHub Pages** — Settings → Pages → deploy from branch, root folder.

Point the `hopex.ai` DNS at whichever host you pick, then update the
`og:url` / `canonical` tags in `index.html` if the domain differs.

---

## Notes

- Dark only, by design. Every colour is a CSS custom property at the top of
  `style.css` if that ever needs to change.
- Responsive from 320px up. The hero lockup is sized against both viewport
  axes, so the call-to-action stays above the fold on short laptop screens —
  verified at 320, 390, 1024, 1366, 1440 and 1920px wide.
- Motion: monogram power-on flicker, idle float, pulsing halo, orbiting light
  arc, pointer tilt and scroll dissolve; drifting background light; marquee
  ticker; scroll-progress bar; staggered section reveals.
- Accessible: semantic landmarks, keyboard-operable video tiles and lightbox,
  visible focus rings, skip link. Every animation is disabled under
  `prefers-reduced-motion`.
- The video lightbox uses `youtube-nocookie.com`.
