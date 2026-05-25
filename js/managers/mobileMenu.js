function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export class MobileMenuManager {
  constructor() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.hamburger = document.querySelector(".hamburger");
    this.menuBackdrop = document.getElementById("menu-backdrop");
    this.init();
  }

  init() {
    if (
      !this.mobileMenuButton ||
      !this.mobileMenu ||
      !this.hamburger ||
      !this.menuBackdrop
    ) {
      return;
    }
    this.setupEventListeners();
  }

  open() {
    this.mobileMenu.classList.remove("closed");
    this.mobileMenu.classList.add("open");
    this.hamburger.classList.add("active");
    this.menuBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.mobileMenu.classList.add("closed");
    this.mobileMenu.classList.remove("open");
    this.hamburger.classList.remove("active");
    this.menuBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }

  toggle() {
    const isOpen = this.mobileMenu.classList.contains("open");
    isOpen ? this.close() : this.open();
  }

  setupEventListeners() {
    this.mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.menuBackdrop.addEventListener("click", () => this.close());

    // We use event delegation since links inside mobile-menu are created dynamically
    document.addEventListener("click", (e) => {
      if (e.target.closest(".mobile-menu-link")) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.mobileMenu.classList.contains("open")
      ) {
        this.close();
      }
    });

    window.addEventListener(
      "resize",
      debounce(() => {
        if (window.innerWidth >= 768) {
          this.close();
        }
      }, 250)
    );
  }
}

// Self-initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new MobileMenuManager();
  });
} else {
  new MobileMenuManager();
}
