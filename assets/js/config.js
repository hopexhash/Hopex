/* ══════════════════════════════════════════════════════════════════════════
   HOPEX — site configuration
   This is the only file you need to touch to keep the site current.
   ══════════════════════════════════════════════════════════════════════════ */

window.HOPEX = {

  /* ── Booking address ─────────────────────────────────────────────────── */
  email: 'prodhopex@gmail.com',

  /* ── Platforms ────────────────────────────────────────────────────────
     Shown as icons only — no captions. `icon` picks the glyph from the set
     in main.js; `name` is what screen readers announce and what the tooltip
     shows on hover, so it is never lost.

     Available icons: spotify, applemusic, soundcloud, beatport,
                      youtube, instagram, tiktok, x, facebook

     Order here is the order on the page. */
  socials: [
    { name: 'Spotify',     icon: 'spotify',     c: '#1ed760', url: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO' },
    { name: 'Apple Music', icon: 'applemusic',  c: '#fa5a6e', url: 'https://music.apple.com/us/artist/hopex/1211296904' },
    { name: 'SoundCloud',  icon: 'soundcloud',  c: '#ff7733', url: 'https://soundcloud.com/prodhopex' },
    { name: 'Beatport',    icon: 'beatport',    c: '#3ef2a4', url: 'https://www.beatport.com/artist/hopex/704053' },
    { name: 'YouTube',     icon: 'youtube',     c: '#ff4d5e', url: 'https://www.youtube.com/@HOPEX' },
    { name: 'Instagram',   icon: 'instagram',   c: '#f062a0', url: 'https://www.instagram.com/prodhopex/' },
    { name: 'X',           icon: 'x',           c: '#c9cede', url: 'https://x.com/prodhopex' },
    { name: 'Facebook',    icon: 'facebook',    c: '#4a94ff', url: 'https://www.facebook.com/prodhopex/' }

    /* No TikTok yet — add it here when you have the handle:
       { name: 'TikTok', icon: 'tiktok', c: '#4de8e0', url: 'https://www.tiktok.com/@yourhandle' } */
  ],

  /* ── Spotify ──────────────────────────────────────────────────────────
     The artist embed in index.html is live: it always shows your current
     top / latest tracks, no key and no maintenance required. */
  spotify: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO',

  youtube: {
    url: 'https://www.youtube.com/@HOPEX',

    /* ── HOW TO GET LIVE, SELF-UPDATING VIDEOS ──────────────────────────
       Paste your channel ID below and the grid fetches your newest uploads
       automatically, forever. Leave it empty and the curated `videos` list
       further down is used instead.

       To find it: YouTube Studio → Settings → Channel → Advanced settings.
       It is 24 characters and starts with "UC". */
    channelId: '',

    limit: 6,

    /* Fallback list, used when `channelId` is empty or the live fetch fails.
       ⚠ Replace these with videos from your own channel. */
    videos: [
      { id: 'OoVmqwvuhMQ', title: 'Inferno' },
      { id: 'naICAq_nVbs', title: 'Fuego' },
      { id: 'PZcAOkMc5dU', title: 'Inferno' },
      { id: 'JQsvCDcwCMY', title: 'Fuego' }
    ]
  }
};
