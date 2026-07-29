# HOPEX — hopexmusic.com

One page, scroll-driven. Vite + React + TypeScript + Tailwind + Framer Motion.

```
index.html               ← Vite entry: meta, JSON-LD, non-blocking font load
src/
  main.tsx
  App.tsx                ← section order
  index.css              ← reset, #0C0C0C base, .hero-heading gradient
  sections/
    HeroSection.tsx      ← nav, fitted headline, glowing mark, contact button
    MarqueeSection.tsx   ← two counter-scrolling rows
    AboutSection.tsx     ← per-character scroll reveal
    ServicesSection.tsx  ← white panel, five numbered services
    ProjectsSection.tsx  ← sticky-stacking release cards
  components/
    FitText.tsx  FadeIn.tsx  Magnet.tsx  AnimatedText.tsx  Buttons.tsx
public/                  ← copied verbatim into dist/
  assets/img/            ← logo, favicon, social card
  assets/art/            ← 21 generated WebP tiles
  404.html  robots.txt  sitemap.xml
```

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```

## Editing

- **Booking address** — `prodhopex@gmail.com`, in `src/components/Buttons.tsx`
  (`ContactButton`) and in the JSON-LD block in `index.html`.
- **Platform links** — the `sameAs` array in `index.html`, and wherever a
  section links out. A TikTok slot is still missing a handle.
- **Services copy** — the array at the top of `src/sections/ServicesSection.tsx`.
- **Releases** — the array at the top of `src/sections/ProjectsSection.tsx`.
- **Artwork** — drop replacements into `public/assets/art/` keeping the
  `tile-NN.webp` / `work-NN.webp` names; nothing references their dimensions.

## Deploying

`.github/workflows/pages.yml` runs `npm ci && npm run build` and publishes
`dist/` to GitHub Pages on every push to the working branch, so a push is a
deploy:

    https://hopexhash.github.io/Hopex/

`vite.config.ts` sets `base: './'` so the same build works both at that
sub-path and at the apex domain. Do **not** switch it to an absolute path.

> **The root `CNAME` file is inert.** It is written by GitHub when a custom
> domain is set in Settings, but the artifact this workflow uploads is `dist/`,
> which does not contain it — so the domain comes from the Pages settings only.
> That is deliberate: while a custom domain is active, GitHub redirects the
> `github.io` URL to it, so pointing at a domain that does not resolve makes the
> site unreachable at *both* addresses. Leave it out of `public/` until DNS is
> back and the domain is verified.

### Custom domain — hopexmusic.com

DNS is already correct (A records to `185.199.108–111.153`, `www` CNAME to
`hopexhash.github.io`). **The domain is currently claimed by another GitHub
account** — a dangling-DNS takeover, because DNS pointed at Pages while the
hostname was still unclaimed. Until that is undone, nothing deployed here is
visible at hopexmusic.com. The fix, in order:

1. https://github.com/settings/pages → **Add a domain** → `hopexmusic.com`.
   GitHub gives a `_github-pages-challenge-hopexhash` TXT record.
2. Add that TXT record in Cloudflare, then click **Verify**. Verifying forcibly
   releases the hostname from whichever account is holding it.
3. Repo → Settings → Pages → Custom domain → `hopexmusic.com` → Save, then tick
   **Enforce HTTPS** once the certificate is issued.
4. Remove `sarahslotgacor@gmail.com` from the Search Console property.

## Notes

- **The headline is measured, not sized.** `FitText` probes the text at 100px
  and scales to the container width. A fixed `vw` size can't work: the right
  value depends on the character count and on how wide the face is, so Kanit and
  the fallback need different numbers. It re-measures on `fonts.ready` and on
  resize. Two things it gets right that are easy to get wrong — the measured
  span is `inline-block` (a block span is clamped to the container, so every
  measurement comes back equal to the space available and nothing ever fits),
  and it holds no React state (the probe size would stick whenever the computed
  result matched the previous state and React skipped the re-render).
- **Fonts load non-blocking.** As a plain stylesheet the Google Fonts link held
  first paint hostage to `fonts.googleapis.com` — 12.8s when that host was
  unreachable against ~200ms when it answered. Now `preload` +
  `media="print"` + `onload`, with a `<noscript>` fallback.
- **Framer Motion writes inline `transform`**, which silently cancels Tailwind
  translate utilities on the same element. Anything centred with
  `-translate-x-1/2` needs a plain wrapper around the `motion` element.
- **Reduced motion is honoured without gutting the page.** `Magnet` opts out
  entirely; travel stops. A blanket `animation: none` left the site looking dead
  to anyone with Reduce Motion on, which on iOS is a lot of people.
- The `.hero-heading` gradient is `background-clip: text` with a transparent
  fill, so the text has no real colour — check contrast against the gradient's
  darkest stop, not against a computed value.
- The 21 tiles in `public/assets/art/` are generated abstract artwork, not
  photographs of real work.
