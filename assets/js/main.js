/* ══════════════════════════════════════════════════════════════════════════
   HOPEX — behaviour
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = window.HOPEX || {};
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ── Always open at the top ─────────────────────────────────────────────
     Two things dragged a reload down the page: the browser restoring the
     previous scroll offset, and in-page links leaving a #hash in the URL that
     the next load jumped to. Kill both — this is a one-page site. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  window.addEventListener('load', function () { window.scrollTo(0, 0); });

  // In-page nav scrolls without writing a hash, so a later reload still opens
  // at the top. Focus still moves, so keyboard and screen-reader users land in
  // the right place.
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

  /* ── Year ───────────────────────────────────────────────────────────── */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Theme ──────────────────────────────────────────────────────────────
     Dark is the design; light is the alternative. A stored choice wins, then
     the OS preference, then dark. */
  (function theme() {
    var btn = $('#theme');
    if (!btn) return;

    var stored = null;
    try { stored = localStorage.getItem('hopex-theme'); } catch (e) {}

    if (stored === 'light' || stored === 'dark') {
      apply(stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      apply('light');
    }

    function apply(mode) {
      document.documentElement.setAttribute('data-theme', mode);
      btn.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
      btn.lastElementChild.textContent = mode === 'light' ? 'Dark' : 'Light';

      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', mode === 'light' ? '#fbfaf7' : '#000000');
    }

    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('hopex-theme', next); } catch (e) {}
    });
  })();

  /* ── Contact ────────────────────────────────────────────────────────── */
  (function contact() {
    var el = $('#contact-mail');
    if (!el || !CFG.email) return;
    el.href = 'mailto:' + CFG.email;
    el.textContent = CFG.email;
  })();

  /* ── Socials ────────────────────────────────────────────────────────── */
  (function socials() {
    var list = $('#social');
    if (!list || !Array.isArray(CFG.socials)) return;

    CFG.socials.forEach(function (s, i) {
      var li = document.createElement('li');
      li.setAttribute('data-reveal', '');
      li.style.setProperty('--d', (i * 0.06) + 's');

      var a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', s.name + ' — opens in a new tab');

      var name = document.createElement('span');
      name.className = 'social__name';
      name.textContent = s.name;

      var handle = document.createElement('span');
      handle.className = 'social__handle';
      handle.textContent = s.handle || '';

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'social__arrow');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M6 18L18 6M18 6H8M18 6v10');
      svg.appendChild(path);

      a.append(name, handle, svg);
      li.appendChild(a);
      list.appendChild(li);
    });
  })();

  /* ── Videos ─────────────────────────────────────────────────────────── */
  (function videos() {
    var grid   = $('#videos');
    var status = $('#videos-status');
    if (!grid) return;

    var yt      = CFG.youtube || {};
    var limit   = yt.limit || 6;
    var channel = (yt.channelId || '').trim();

    // Public read-only relays used to sidestep YouTube's missing CORS header on
    // the RSS feed. Purely a progressive enhancement — if none respond we fall
    // straight back to the curated list in config.js, so the grid never empties.
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

      var entries = Array.prototype.slice.call(doc.getElementsByTagName('entry'));
      var out = entries.slice(0, limit).map(function (e) {
        return {
          id:    text(e, 'videoId'),
          title: text(e, 'title'),
          date:  text(e, 'published')
        };
      }).filter(function (v) { return v.id; });

      if (!out.length) throw new Error('empty feed');
      return out;
    }

    function text(scope, tag) {
      // getElementsByTagName is namespace-agnostic here, which keeps yt:videoId simple.
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
      art.style.setProperty('--d', (i % 3 * 0.09) + 's');

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

      var idx = document.createElement('span');
      idx.className = 'vid__idx';
      idx.textContent = String(i + 1).padStart(2, '0');

      var play = document.createElement('span');
      play.className = 'vid__play';
      play.textContent = '▶ Play';

      btn.append(img, idx, play);
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
        when.textContent = isNaN(d) ? '' : d.toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        });
        art.appendChild(when);
      }

      return art;
    }
  })();

  /* ── Lightbox ───────────────────────────────────────────────────────── */
  var lb     = $('#lightbox');
  var lbSlot = $('#lb-slot');
  var lbShut = $('#lb-close');
  var lastFocus = null;

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

  /* ── Scroll reveal ──────────────────────────────────────────────────── */
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
      }, { rootMargin: '0px 0px -12% 0px', threshold: .12 });
    }

    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  observe(document.querySelectorAll('[data-reveal]'));

  /* ── Scroll progress + hero parallax ────────────────────────────────── */
  (function scroll() {
    var bar = $('#progress');
    var queued = false;

    function frame() {
      queued = false;
      var y = window.scrollY || 0;

      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      }

    }

    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    }, { passive: true });

    frame();
  })();

  /* ── Hero spotlight ─────────────────────────────────────────────────── */
  (function spotlight() {
    var spot = $('#spot');
    var hero = document.querySelector('.hero');
    if (!spot || !hero || reduced || !fine) return;

    window.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      spot.style.transform =
        'translate3d(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px,0)';
    }, { passive: true });
  })();

})();
