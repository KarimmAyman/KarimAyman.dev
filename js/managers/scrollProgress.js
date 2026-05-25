function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export class ScrollProgressBar {
  constructor() {
    this.createProgressBar();
    this.init();
  }

  createProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    progressBar.className =
      "fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 z-[100] transition-all duration-150";
    progressBar.style.width = "0%";
    document.body.appendChild(progressBar);
    this.progressBar = progressBar;
  }

  init() {
    const updateProgress = throttle(() => {
      window.requestAnimationFrame(() => {
        const winScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        this.progressBar.style.width = scrolled + "%";
      });
    }, 100);

    window.addEventListener("scroll", updateProgress, { passive: true });
  }
}

// Self-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ScrollProgressBar();
  });
} else {
  new ScrollProgressBar();
}
