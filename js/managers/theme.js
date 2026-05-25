export class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.updateThemeIcons();
    this.setupEventListeners();
    this.applySystemPreference();
  }

  toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.updateThemeIcons();
    this.updateMetaThemeColor();

    document.documentElement.style.transition =
      "background-color 0.3s ease";
    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 300);
  }

  updateThemeIcons() {
    const isDark = document.documentElement.classList.contains("dark");

    this.updateIconSet(
      "theme-toggle-dark-icon",
      "theme-toggle-light-icon",
      isDark
    );

    this.updateIconSet(
      "theme-toggle-dark-icon-mobile",
      "theme-toggle-light-icon-mobile",
      isDark
    );
  }

  updateIconSet(darkIconId, lightIconId, isDark) {
    const darkIcon = document.getElementById(darkIconId);
    const lightIcon = document.getElementById(lightIconId);

    if (darkIcon && lightIcon) {
      if (isDark) {
        darkIcon.style.display = "inline-block";
        lightIcon.style.display = "none";
      } else {
        darkIcon.style.display = "none";
        lightIcon.style.display = "inline-block";
      }
    }
  }

  updateMetaThemeColor() {
    const isDark = document.documentElement.classList.contains("dark");
    const metaThemeColor = document.querySelector(
      "meta[name=theme-color]"
    );
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        isDark ? "#030712" : "#06b6d4"
      );
    }
  }

  applySystemPreference() {
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        this.updateThemeIcons();
      }
    }
  }

  setupEventListeners() {
    const desktopToggle = document.getElementById("theme-toggle");
    if (desktopToggle) {
      desktopToggle.addEventListener("click", () => this.toggle());
    }

    const mobileToggle = document.getElementById("theme-toggle-mobile");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => this.toggle());
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          if (e.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          this.updateThemeIcons();
        }
      });
  }
}

export class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.respectReducedMotion();
    this.handlePageLoad();
  }

  respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduce-motion");
      if (window.AOS) {
        window.AOS.init({ disable: true });
      }
    }
  }

  handlePageLoad() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
      setTimeout(() => {
        if (window.AOS) {
          window.AOS.refresh();
        }
      }, 100);
    });
  }
}

// Self-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ThemeManager();
    new PerformanceOptimizer();
  });
} else {
  new ThemeManager();
  new PerformanceOptimizer();
}
