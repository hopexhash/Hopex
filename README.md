# HOPEX — hopexmusic.com

Single-page artist site. Slow-drifting glowing orbs under a field of sparkles,
glass panels on top. The eight platforms sit in the hero as icons — no captions
— so anyone landing here can be listening in one tap.

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

### Platforms

`socials` in `config.js` drives the icon row. Each entry needs:

```js
{ name: 'Spotify', icon: 'spotify', c: '#1ed760', url: 'https://…' }
```

- `icon` picks a glyph from the set in `main.js` — available: `spotify`,
  `applemusic`, `soundcloud`, `beatport`, `youtube`, `instagram`, `tiktok`,
  `x`, `facebook`
- `c` is the hover glow colour
- `name` is what the tooltip shows and what screen readers announce. The icons
  carry no visible text, so this is the only label there is — never leave it out.

Order in the array is order on the page. A TikTok slot is commented out in
`config.js`, ready for the handle.

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

- **The background.** Four large blurred orbs (violet, cyan, rose) drift on
  68–92 second loops — slow enough to read as ambient light rather than motion.
  A field of sparkles twinkles on top, scattered on load with the count scaled
  to the viewport so a phone isn't asked to animate a desktop's worth. Both are
  `aria-hidden` and the sparkles are dropped entirely under reduced motion.
- **Icons only.** The platform row has no captions. The name lives in
  `aria-label` and in a tooltip that appears on hover and on keyboard focus, so
  nothing is lost to either sighted or screen-reader visitors.
- Dark by default, with a toggle in the nav. The choice is remembered in
  `localStorage`; with no stored choice the site follows the visitor's OS
  setting. Light is a real second palette — the same three hues bloom softly on
  paper — not an inversion.
- Responsive from 320px up; the icon row becomes a 4x2 grid below 560px so it
  never wraps 5+3.
- Accessible: semantic landmarks, keyboard-operable video tiles and lightbox,
  visible focus rings, skip link, 44px+ touch targets.
- **Fonts load non-blocking.** As an ordinary stylesheet the Google Fonts link
  held first paint hostage to `fonts.googleapis.com` — 12.8s when that host was
  unreachable against 260ms when it answered. `media="print"` + `onload` paints
  at ~210ms regardless. Keep it that way if you add fonts.
- The `HOPEX` logotype is stretched with `scaleX`. That multiplies the element's
  *box*, not its text, so it needs `width: fit-content` or it silently overflows
  the viewport on a phone.
- `404.html`, `robots.txt` and `sitemap.xml` are in the repo root.
- The video lightbox uses `youtube-nocookie.com`.

### Verified

Audited with axe-core (WCAG 2.1 AA + best practice) at 390px and 1440px in
both themes: no violations. No horizontal overflow from 320px up. Booking
address, all eight platform links, theme toggle and video lightbox verified in
a real browser.
