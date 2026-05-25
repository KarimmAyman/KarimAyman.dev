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

export class ScrollToTopManager {
  constructor() {
    this.button = document.getElementById("scrollToTop");
    this.showThreshold = 300;
    this.init();
  }

  init() {
    if (!this.button) return;
    this.setupScrollListener();
    this.setupClickListener();
  }

  setupScrollListener() {
    const handleScroll = throttle(() => {
      if (window.pageYOffset > this.showThreshold) {
        this.show();
      } else {
        this.hide();
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  setupClickListener() {
    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  show() {
    this.button.classList.remove("opacity-0", "invisible");
    this.button.classList.add("opacity-100", "visible");
  }

  hide() {
    this.button.classList.remove("opacity-100", "visible");
    this.button.classList.add("opacity-0", "invisible");
  }
}

// Self-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ScrollToTopManager();
  });
} else {
  new ScrollToTopManager();
}
