# HOPEX — hopexmusic.com

Single-page artist site. Dark, monochrome, animated: the extended HOPEX
logotype carries the hero, with the HX monogram small and still above it.

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
| `hopex-mark.webp` | hero monogram, nav, footer (320px, ~24 KB) |
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

**It is already live.** `.github/workflows/pages.yml` publishes the repo root to
GitHub Pages on every push to the working branch, so a push is a deploy:

    https://hopexhash.github.io/Hopex/

### Custom domain — hopexmusic.com

The page's `canonical`, `og:url` and social-image tags already point at
`https://hopexmusic.com/`. Two steps remain, both outside the repo.

> **Do not add a `CNAME` file.** This site publishes from a custom Actions
> workflow, and GitHub ignores `CNAME` in that mode — the domain lives in the
> repository's Pages settings instead.

**1. DNS, at whoever the domain is registered with.** Add all four A records
(and the AAAA records if IPv6 is offered):

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `hopexhash.github.io` |

Delete any existing A or parking record on `@` first, or the old one wins.

**2. GitHub.** Settings → Pages → Custom domain → `hopexmusic.com` → Save.
Wait for the DNS check to pass, then tick **Enforce HTTPS**. The certificate can
take up to an hour; until it is issued the site may warn as insecure, which is
expected and clears on its own.

With the apex set as the custom domain, GitHub redirects `www` to it
automatically.

Any other static host works too — Netlify, Vercel and Cloudflare Pages all take
the folder as-is with no build command and publish directory `.`

---

## Notes

- Dark by default, with a **Light / Dark toggle in the nav**. The choice is
  remembered in `localStorage`; with no stored choice the site follows the
  visitor's OS setting, falling back to dark. Light is a real second palette
  (paper `#fbfaf7`, ink `#0a0a0a`) rather than a naive inversion — every colour
  is a custom property at the top of `style.css`.
- **Everything is centred** — section headings, copy, the social rows, contact
  and footer all sit on the page's centre line. The section heads were a three
  column grid (number | title | aside); they are now a single centred stack, so
  there is no separate wide-screen layout to keep in sync.
- Responsive from 320px up. The hero lockup is sized against both viewport
  axes, so the call-to-action stays above the fold on short laptop screens —
  verified at 320, 390, 1024, 1366, 1440 and 1920px wide.
- Motion: the logotype rises letter by letter and pulses slowly; drifting
  background light with a pointer-tracked spotlight; marquee ticker;
  scroll-progress bar; staggered section reveals. The monogram itself is
  deliberately still — it only fades in.
- Accessible: semantic landmarks, keyboard-operable video tiles and lightbox,
  visible focus rings, skip link. Every animation is disabled under
  `prefers-reduced-motion`.
- The video lightbox uses `youtube-nocookie.com`.
- **Fonts load non-blocking.** As an ordinary stylesheet, the Google Fonts link
  held first paint hostage to `fonts.googleapis.com` — measured at 12.8s when
  that host was unreachable, against 260ms when it answered. It now loads via
  `media="print"` + `onload`, so the page paints in the fallback face at ~210ms
  and upgrades when Archivo lands. Keep it that way if you add more fonts.
- Page weight is ~83 KB. The monogram is served at 320px because nothing on the
  page displays it larger than 88px; a 900px copy was costing 140 KB alone.
- Touch targets in the nav are grown to 44px with pseudo-elements, so the hit
  area is thumb-sized without changing how anything looks.
- `404.html`, `robots.txt` and `sitemap.xml` are in the repo root. GitHub Pages
  serves the 404 automatically for any unknown path.

### Verified

Audited with axe-core (WCAG 2.1 AA + best practice) at 390px and 1440px, in
both themes: no violations. No horizontal overflow from 320px to 1920px.
