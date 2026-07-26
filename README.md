# HOPEX — hopexmusic.com

One page. Not "one page plus some sections" — the whole site fits on a single
screen with nothing below the fold. Glowing orbs drift under a field of
sparkles; the eight platforms sit in the middle as icons with no captions, so
anyone landing here can be listening in one tap.

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

Everything lives in **`assets/js/config.js`**: the booking address and the
platform list.

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

The glyphs are the platforms' **official logos**, lifted verbatim from
[simple-icons](https://simpleicons.org). To add one that isn't in the set:

```bash
npm i simple-icons
node -e "console.log(require('simple-icons').siDeezer.path)"
```

and paste the path into the `ICONS` map at the top of `main.js`.

---

## Running it locally

```bash
npx http-server -p 8080 -c-1
# → http://127.0.0.1:8080
```

Opening `index.html` directly via `file://` works too — there is nothing that
needs a server.

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

- **One screen, no scroll.** The page is `min-height: 100svh` and centred.
  Verified at 390x844 and 1440x900: the document is exactly the viewport height.
- **The background.** Four blurred orbs (violet, cyan, rose) drift on 26–36
  second loops with real travel, so the motion is visible without being busy.
  An earlier pass ran them at 68–92s over short distances, which just read as a
  static image.
- **Reduced motion is honoured without gutting the page.** Travel stops — orbs
  hold still, the mark stops hovering, entrances land instantly — but the
  sparkles keep their opacity-only twinkle and every glow stays. A blanket
  `animation: none` left the site looking dead to anyone with Reduce Motion on,
  which on iOS is a lot of people.
- **Icons only.** No captions anywhere. The platform name lives in `aria-label`
  and in a tooltip shown on hover *and* keyboard focus, so the label is never
  lost to sighted or screen-reader visitors.
- Dark by default with a toggle top-right; the choice is stored in
  `localStorage`, otherwise the OS preference decides. Light is a real second
  palette, not an inversion.
- Below 560px the icon row becomes a 4x2 grid — left to wrap it read 5+3.
- **Fonts load non-blocking.** As a plain stylesheet the Google Fonts link held
  first paint hostage to `fonts.googleapis.com` — 12.8s when that host was
  unreachable against 260ms when it answered.
- The `HOPEX` logotype is stretched with `scaleX`, which multiplies the
  element's *box* rather than its text. It needs `width: fit-content` or it
  silently overflows the viewport on a phone.
- `404.html`, `robots.txt` and `sitemap.xml` are in the repo root.

### Verified

Audited with axe-core (WCAG 2.1 AA + best practice) at 390px and 1440px in both
themes: no violations. No horizontal or vertical overflow. Booking address, all
eight platform links, the theme toggle and the reduced-motion path verified in a
real browser.
