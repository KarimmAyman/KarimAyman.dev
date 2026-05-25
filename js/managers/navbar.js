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

export class NavbarManager {
  constructor() {
    this.navbar = document.querySelector("nav");
    this.lastScroll = 0;
    this.scrollThreshold = 100;
    this.init();
  }

  init() {
    if (!this.navbar) return;
    this.setupScrollEffect();
  }

  setupScrollEffect() {
    const handleScroll = throttle(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 10) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }

      if (currentScroll <= this.scrollThreshold) {
        this.navbar.classList.remove("scroll-up", "scroll-down");
        return;
      }

      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        return;
      }

      if (
        currentScroll > this.lastScroll &&
        !this.navbar.classList.contains("scroll-down")
      ) {
        this.navbar.classList.remove("scroll-up");
        this.navbar.classList.add("scroll-down");
      } else if (
        currentScroll < this.lastScroll &&
        this.navbar.classList.contains("scroll-down")
      ) {
        this.navbar.classList.remove("scroll-down");
        this.navbar.classList.add("scroll-up");
      }

      this.lastScroll = currentScroll;
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

export class SmoothScrollManager {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");

        if (targetId === "#" || targetId === "#!") {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          this.scrollToElement(target);
        }
      });
    });
  }

  scrollToElement(element) {
    const navHeight = window.innerWidth < 768 ? 56 : 80;
    const targetPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Self-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new NavbarManager();
    new SmoothScrollManager();
  });
} else {
  new NavbarManager();
  new SmoothScrollManager();
}
