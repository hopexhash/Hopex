/* ══════════════════════════════════════════════════════════════════════════
   HOPEX — site configuration
   This is the only file you need to touch to keep the site current.
   ══════════════════════════════════════════════════════════════════════════ */

window.HOPEX = {

  /* ── Contact ──────────────────────────────────────────────────────────
     Swap this for a dedicated booking address whenever you have one. */
  email: 'umutbagdatli@gmail.com',

  /* ── Spotify ──────────────────────────────────────────────────────────
     The artist embed in index.html is live: it always shows your current
     top / latest tracks, no key and no maintenance required.
     Artist ID lives in the <iframe> src in index.html if you ever need it. */
  spotify: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO',

  youtube: {
    /* Public channel URL — used for the "Subscribe" button and social row. */
    url: 'https://www.youtube.com/@HOPEX',

    /* ── HOW TO GET LIVE, SELF-UPDATING VIDEOS ──────────────────────────
       Paste your channel ID below and the grid fetches your newest uploads
       automatically, forever. Leave it empty and the curated `videos` list
       further down is used instead.

       To find it: open youtube.com/@HOPEX → View Page Source → search for
       "channelId". It looks like: UCxxxxxxxxxxxxxxxxxxxxxx (24 chars, "UC…").
       Or: YouTube Studio → Settings → Channel → Advanced settings. */
    channelId: '',

    /* How many uploads to show in the grid. */
    limit: 6,

    /* ── Fallback / curated list ────────────────────────────────────────
       Used when `channelId` is empty or the live fetch is unavailable.
       Each entry needs the 11-character video ID from the watch URL
       (youtube.com/watch?v=THIS_PART). Titles are optional — they are
       only shown as a label under the thumbnail.

       ⚠ Replace these with videos from your own channel. */
    videos: [
      { id: 'OoVmqwvuhMQ', title: 'Inferno' },
      { id: 'naICAq_nVbs', title: 'Fuego' },
      { id: 'PZcAOkMc5dU', title: 'Inferno' },
      { id: 'JQsvCDcwCMY', title: 'Fuego' }
    ]
  },

  /* ── Social rows ──────────────────────────────────────────────────────
     Order here is the order on the page. Add or remove freely. */
  socials: [
    { name: 'Instagram',  handle: '@prodhopex',  url: 'https://www.instagram.com/prodhopex/' },
    { name: 'Spotify',    handle: 'HOPEX',       url: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO' },
    { name: 'YouTube',    handle: '@HOPEX',      url: 'https://www.youtube.com/@HOPEX' },
    { name: 'SoundCloud', handle: '/prodhopex',  url: 'https://soundcloud.com/prodhopex' },
    { name: 'X',          handle: '@prodhopex',  url: 'https://x.com/prodhopex' },
    { name: 'Facebook',   handle: '/prodhopex',  url: 'https://www.facebook.com/prodhopex/' }
  ]
};
