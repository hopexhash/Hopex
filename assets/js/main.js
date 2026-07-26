/* ══════════════════════════════════════════════════════════════════════════
   HOPEX — behaviour
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = window.HOPEX || {};
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ── Platform glyphs ────────────────────────────────────────────────────
     Drawn on a 24x24 grid. `f` paths are filled, `s` paths are stroked, so a
     single icon can mix both (Instagram's frame vs its lens). */
  var ICONS = {
    spotify: { f: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.55 14.43a.62.62 0 0 1-.86.21c-2.34-1.43-5.29-1.75-8.77-.96a.63.63 0 0 1-.28-1.22c3.8-.87 7.07-.5 9.7 1.11.3.18.39.57.21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.68-1.65-6.77-2.13-9.94-1.16a.78.78 0 1 1-.45-1.5c3.62-1.1 8.13-.56 11.2 1.33.37.22.49.71.26 1.07zm.1-2.83c-3.21-1.91-8.5-2.08-11.57-1.15a.94.94 0 0 1-.54-1.79c3.52-1.07 9.36-.86 13.06 1.34a.94.94 0 0 1-.95 1.6z'] },

    applemusic: {
      s: ['M4.6 2.8h14.8a1.8 1.8 0 0 1 1.8 1.8v14.8a1.8 1.8 0 0 1-1.8 1.8H4.6a1.8 1.8 0 0 1-1.8-1.8V4.6a1.8 1.8 0 0 1 1.8-1.8z'],
      f: ['M16.6 6.1v7.6a2.2 2.2 0 1 1-1.45-2.06V8.9l-4.7 1.02v5.9a2.2 2.2 0 1 1-1.45-2.06V8.2l7.6-1.65z']
    },

    soundcloud: {
      s: ['M3 14.6v3.2M5.7 12.6v5.2M8.4 10.4v7.4M11.1 12.2v5.6'],
      f: ['M13.6 17.8V8.1a5.1 5.1 0 0 1 5.02 4.13 3.35 3.35 0 0 1-.42 6.66h-4.6a.7.7 0 0 1-.7-.7v-.39z']
    },

    /* Beatport has no simple mark to reproduce faithfully, so this reads as
       what the site is: a record store. */
    beatport: {
      s: ['M12 2.9a9.1 9.1 0 1 1 0 18.2 9.1 9.1 0 0 1 0-18.2z', 'M12 7.9a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z'],
      f: ['M12 10.7a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z']
    },

    youtube: { f: ['M21.6 7.2a2.5 2.5 0 0 0-1.76-1.78C18.25 5 12 5 12 5s-6.25 0-7.84.42A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.78C5.75 19 12 19 12 19s6.25 0 7.84-.42a2.5 2.5 0 0 0 1.76-1.78A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.4-4.8zM10 15.2V8.8l5.5 3.2-5.5 3.2z'] },

    instagram: {
      s: ['M7.8 3.2h8.4a4.6 4.6 0 0 1 4.6 4.6v8.4a4.6 4.6 0 0 1-4.6 4.6H7.8a4.6 4.6 0 0 1-4.6-4.6V7.8a4.6 4.6 0 0 1 4.6-4.6z',
          'M12 7.9a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z'],
      f: ['M17.1 5.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z']
    },

    tiktok: { f: ['M14 3h2.6a5.6 5.6 0 0 0 4.4 4.3v2.7a8.2 8.2 0 0 1-4.4-1.4v6.2A6.1 6.1 0 1 1 10.5 9v2.8a3.3 3.3 0 1 0 2.5 3.2V3z'] },

    x: { f: ['M17.6 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6-5.6 6H2.1l7.3-8.3L2 3h6.4l4.4 5.5L17.6 3zm-1.1 16h1.7L7.6 4.9H5.8L16.5 19z'] },

    facebook: { f: ['M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z'] }
  };

  function glyph(key) {
    var spec = ICONS[key];
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    if (!spec) return svg;

    (spec.f || []).forEach(function (d) {
      var p = document.createElementNS(SVGNS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'currentColor');
      svg.appendChild(p);
    });
    (spec.s || []).forEach(function (d) {
      var p = document.createElementNS(SVGNS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', 'currentColor');
      p.setAttribute('stroke-width', '1.8');
      p.setAttribute('stroke-linecap', 'round');
      svg.appendChild(p);
    });
    return svg;
  }

  /* ── Always open at the top ─────────────────────────────────────────────
     The browser restores the previous scroll offset, and in-page links leave
     a #hash the next load jumps to. Kill both — this is a one-page site. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);

  (function correctScroll() {
    var moved = false;
    var onMove = function () { moved = true; };
    window.addEventListener('wheel', onMove, { passive: true, once: true });
    window.addEventListener('touchmove', onMove, { passive: true, once: true });
    window.addEventListener('keydown', onMove, { once: true });

    // Never after the visitor has moved: the load event can fire seconds in on
    // a slow connection, and yanking someone back would be worse than the bug.
    var fix = function () { if (!moved) window.scrollTo(0, 0); };
    fix();
    document.addEventListener('DOMContentLoaded', fix, { once: true });
  })();

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Sparkles ───────────────────────────────────────────────────────────
     Scattered once at load. Count scales with the viewport so a phone is not
     asked to animate a desktop's worth of them. */
  (function sparkles() {
    var host = $('#sparkles');
    if (!host || reduced) return;

    var n = Math.round(Math.min(90, Math.max(34, (window.innerWidth * window.innerHeight) / 22000)));
    var frag = document.createDocumentFragment();

    for (var i = 0; i < n; i++) {
      var s = document.createElement('i');
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top  = (Math.random() * 100).toFixed(2) + '%';
      s.style.setProperty('--s', (Math.random() * 2.2 + 1).toFixed(2) + 'px');
      s.style.setProperty('--d', (Math.random() * 6 + 5).toFixed(2) + 's');   // slow twinkle
      s.style.setProperty('--t', (Math.random() * 8).toFixed(2) + 's');
      frag.appendChild(s);
    }
    host.appendChild(frag);
  })();

  /* ── Theme ────────────────────────────────────────────────────────────── */
  (function theme() {
    var btn = $('#theme');
    if (!btn) return;

    var stored = null;
    try { stored = localStorage.getItem('hopex-theme'); } catch (e) {}

    if (stored === 'light' || stored === 'dark') apply(stored);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) apply('light');

    function apply(mode) {
      document.documentElement.setAttribute('data-theme', mode);
      btn.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
      btn.setAttribute('aria-label', mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', mode === 'light' ? '#f6f6fc' : '#05060b');
    }

    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('hopex-theme', next); } catch (e) {}
    });
  })();

  /* ── Booking address ──────────────────────────────────────────────────── */
  (function contact() {
    var el = $('#contact-mail');
    if (!el || !CFG.email) return;
    el.href = 'mailto:' + CFG.email;
    el.textContent = CFG.email;
  })();

  /* ── Platform icons ───────────────────────────────────────────────────── */
  (function links() {
    var list = $('#links');
    if (!list || !Array.isArray(CFG.socials)) return;

    CFG.socials.forEach(function (s) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.style.setProperty('--c', s.c || 'var(--violet)');
      a.dataset.name = s.name;
      // The icon carries no caption, so the name has to live here.
      a.setAttribute('aria-label', s.name + ' — opens in a new tab');
      a.appendChild(glyph(s.icon));
      li.appendChild(a);
      list.appendChild(li);
    });
  })();

  /* ── Videos ───────────────────────────────────────────────────────────── */
  (function videos() {
    var grid   = $('#videos');
    var status = $('#videos-status');
    if (!grid) return;

    var yt      = CFG.youtube || {};
    var limit   = yt.limit || 6;
    var channel = (yt.channelId || '').trim();

    // Public read-only relays, because YouTube's RSS feed sends no CORS header.
    // Progressive enhancement only — the curated list catches every failure.
    var RELAYS = [
      function (u) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u); },
      function (u) { return 'https://corsproxy.io/?url=' + encodeURIComponent(u); },
      function (u) { return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u); }
    ];

    if (channel) {
      fetchLatest(channel)
        .then(function (items) { render(items.length ? items : curated()); })
        .catch(function () { render(curated()); });
    } else {
      render(curated());
    }

    function curated() {
      return (yt.videos || []).slice(0, limit).map(function (v) {
        return { id: v.id, title: v.title || 'HOPEX', date: '' };
      });
    }

    function fetchLatest(id) {
      var feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + encodeURIComponent(id);
      return RELAYS.reduce(function (chain, relay) {
        return chain.catch(function () {
          return fetch(relay(feed), { cache: 'no-store' })
            .then(function (r) {
              if (!r.ok) throw new Error('relay ' + r.status);
              return r.text();
            })
            .then(parseFeed);
        });
      }, Promise.reject());
    }

    function parseFeed(xml) {
      var doc = new DOMParser().parseFromString(xml, 'text/xml');
      if (doc.querySelector('parsererror')) throw new Error('bad feed');

      var out = Array.prototype.slice.call(doc.getElementsByTagName('entry'))
        .slice(0, limit)
        .map(function (e) {
          return { id: text(e, 'videoId'), title: text(e, 'title'), date: text(e, 'published') };
        })
        .filter(function (v) { return v.id; });

      if (!out.length) throw new Error('empty feed');
      return out;
    }

    function text(scope, tag) {
      // namespace-agnostic, which keeps yt:videoId simple
      var n = scope.getElementsByTagName(tag)[0];
      return n ? (n.textContent || '').trim() : '';
    }

    function render(items) {
      grid.setAttribute('aria-busy', 'false');

      if (!items.length) {
        if (status) status.textContent = 'Head to the channel for the latest uploads.';
        return;
      }
      if (status) status.remove();

      items.forEach(function (v, i) { grid.appendChild(card(v, i)); });
      observe(grid.querySelectorAll('[data-reveal]'));
    }

    function card(v, i) {
      var art = document.createElement('article');
      art.className = 'vid';
      art.setAttribute('data-reveal', '');
      art.style.setProperty('--d', (i % 3 * 0.08) + 's');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'vid__btn';
      btn.setAttribute('aria-label', 'Play ' + (v.title || 'video'));

      var img = document.createElement('img');
      img.src = 'https://i.ytimg.com/vi/' + v.id + '/maxresdefault.jpg';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 1280;
      img.height = 720;
      // maxres is not generated for every upload; hqdefault always exists.
      img.addEventListener('error', function once() {
        img.removeEventListener('error', once);
        img.src = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
      });

      var play = document.createElement('span');
      play.className = 'vid__play';
      var svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      var tri = document.createElementNS(SVGNS, 'path');
      tri.setAttribute('d', 'M7 4.5v15l13-7.5-13-7.5z');
      svg.appendChild(tri);
      play.appendChild(svg);

      btn.append(img, play);
      btn.addEventListener('click', function () { openLightbox(v.id, v.title); });

      var name = document.createElement('h3');
      name.className = 'vid__name';
      name.textContent = v.title || 'HOPEX';

      art.append(btn, name);

      if (v.date) {
        var when = document.createElement('time');
        when.className = 'vid__date';
        when.dateTime = v.date;
        var d = new Date(v.date);
        when.textContent = isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        art.appendChild(when);
      }
      return art;
    }
  })();

  /* ── Lightbox ─────────────────────────────────────────────────────────── */
  var lb = $('#lightbox'), lbSlot = $('#lb-slot'), lbShut = $('#lb-close'), lastFocus = null;

  function openLightbox(id, title) {
    if (!lb || !lbSlot) return;
    lastFocus = document.activeElement;

    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
    frame.title = title || 'HOPEX video';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;

    lbSlot.replaceChildren(frame);
    lb.hidden = false;
    document.body.classList.add('is-locked');
    if (lbShut) lbShut.focus();
  }

  function closeLightbox() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    lbSlot.replaceChildren();
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (lbShut) lbShut.addEventListener('click', closeLightbox);
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  /* ── In-page nav, without leaving a hash behind ───────────────────────── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href').slice(1);
    var target = id ? document.getElementById(id) : document.body;
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ── Scroll reveal ────────────────────────────────────────────────────── */
  var io = null;
  function observe(nodes) {
    if (!nodes || !nodes.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add('in'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: .1 });
    }
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }
  observe(document.querySelectorAll('[data-reveal]'));

})();
