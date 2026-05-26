// lazyVideo.js — click-to-load only, no background preloading

const setOverlay = (overlay, type) => {
  const map = {
    loading: `<div class="ov-ring"></div><p>Loading video…</p>`,
    play: `<div class="ov-btn"><i class="fas fa-play"></i></div>`,
    replay: `<div class="ov-btn"><i class="fas fa-play"></i></div><p>Click to replay</p>`,
    error: `<div class="ov-err"><i class="fas fa-exclamation-triangle"></i></div>
              <p>Failed to load video</p><p class="sub">Please try again later</p>`,
    retry: `<div class="ov-warn"><i class="fas fa-redo"></i></div><p>Retrying…</p>`,
  };
  overlay.innerHTML = map[type] ?? '';
  overlay.style.display = type === 'hide' ? 'none' : 'flex';
};

export class LazyVideoLoader {
  constructor() {
    this.loaded = new WeakSet(); // containers whose <video> is in the DOM
    this.loading = new WeakSet(); // containers currently fetching
    this.aborts = new WeakMap(); // container → AbortController
    this._init();
  }

  _init() {
    document.querySelectorAll('.video-container').forEach(c => {
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
      c.setAttribute('aria-label', 'Click to load and play video');

      c.addEventListener('click', e => this._handleClick(e, c));
      c.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this._handleClick(e, c);
        }
        this._handleVideoKeys(e, c);
      });
    });
  }

  _handleClick(e, c) {
    e.preventDefault();
    e.stopPropagation();
    if (this.loading.has(c)) return;

    if (this.loaded.has(c)) {
      const v = c.querySelector('video');
      if (v) v.paused ? v.play().catch(() => { }) : v.pause();
      return;
    }
    this._load(c);
  }

  _handleVideoKeys(e, c) {
    if (!this.loaded.has(c)) return;
    const v = c.querySelector('video');
    if (!v) return;
    const actions = {
      k: () => v.paused ? v.play() : v.pause(),
      ' ': () => v.paused ? v.play() : v.pause(),
      ArrowLeft: () => { v.currentTime = Math.max(0, v.currentTime - 10); },
      ArrowRight: () => { v.currentTime = Math.min(v.duration, v.currentTime + 10); },
      ArrowUp: () => { v.volume = Math.min(1, v.volume + 0.1); },
      ArrowDown: () => { v.volume = Math.max(0, v.volume - 0.1); },
      m: () => { v.muted = !v.muted; },
      f: () => v.requestFullscreen?.(),
    };
    if (actions[e.key]) { e.preventDefault(); actions[e.key](); }
  }

  _load(c) {
    const src = c.dataset.videoSrc;
    const placeholder = c.querySelector('.video-placeholder');
    const overlay = c.querySelector('.play-overlay');
    if (!src || !placeholder) { console.error('Missing video source or placeholder'); return; }

    this.aborts.get(c)?.abort();
    const ac = new AbortController();
    this.aborts.set(c, ac);

    this.loading.add(c);
    setOverlay(overlay, 'loading');

    const video = Object.assign(document.createElement('video'), {
      controls: true,
      preload: 'none',        // ← 'none' not 'metadata' — fetch nothing until play
      playsInline: true,
      className: 'absolute top-0 left-0 w-full h-full object-contain',
    });
    video.setAttribute('controlsList', 'nodownload');
    video.setAttribute('disablePictureInPicture', '');
    video.innerHTML = `<source src="${src}" type="video/mp4">Your browser does not support the video tag.`;

    const on = (evt, fn) => video.addEventListener(evt, fn, { signal: ac.signal });

    on('loadedmetadata', () => {
      if (ac.signal.aborted) return;
      setOverlay(overlay, 'hide');
      // Hide the poster so it doesn't show through
      const poster = c.querySelector('.video-poster');
      if (poster) poster.style.display = 'none';
      placeholder.appendChild(video);
      this.loaded.add(c);
      this.loading.delete(c);
      c.setAttribute('aria-label', 'Video loaded. Click to play/pause');
      video.play().catch(() => setOverlay(overlay, 'play'));
    });
    on('error', () => { setOverlay(overlay, 'error'); this.loading.delete(c); });
    on('play', () => setOverlay(overlay, 'hide'));
    on('pause', () => setOverlay(overlay, 'replay'));
    on('ended', () => setOverlay(overlay, 'replay'));

    video.load();
  }

  // Public API — for manual control from console or other modules
  preload(id) {
    const root = document.getElementById(id);
    const c = root?.classList.contains('video-container')
      ? root : root?.querySelector('.video-container');
    if (c && !this.loaded.has(c) && !this.loading.has(c)) this._load(c);
  }

  getStats() {
    return { total: document.querySelectorAll('.video-container').length };
  }
}

// ─── Scroll-in animation only — no preloading ────────────────────────────────

function setupIntersectionObserver() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(({ target: c, isIntersecting }) => {
      if (!isIntersecting) return;
      c.classList.add('animate-fade-in'); // CSS fade-in only, no video fetch
    });
  }, { rootMargin: '50px', threshold: 0.1 });
  document.querySelectorAll('.video-container').forEach(c => obs.observe(c));
}

function setupAnalytics() {
  document.addEventListener('click', e => {
    const c = e.target.closest('.video-container');
    if (!c) return;
    const title = c.closest('[id]')?.querySelector('h3 span:last-child')?.textContent ?? 'Unknown';
    console.log(`📹 Video interaction: ${title}`);
    if (typeof gtag !== 'undefined')
      gtag('event', 'video_play', { event_category: 'Video', event_label: title });
  });
}

function init() {
  const loader = window.lazyVideoLoader = new LazyVideoLoader();
  setupIntersectionObserver(); // animation only, no loader passed
  setupAnalytics();

  window.VideoManager = {
    preload: id => loader.preload(id),
    preloadAll: () => document.querySelectorAll('.video-container')
      .forEach(c => c.parentElement?.id && loader.preload(c.parentElement.id)),
    getStats: () => loader.getStats(),
  };
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init, { once: true })
  : init();