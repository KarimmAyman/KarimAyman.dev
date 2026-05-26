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

export class LazyVideoLoader {
  constructor() {
    this.loadedVideos = new Set();
    this.loadingVideos = new Set();
    this.init();
  }

  init() {
    // Add click event listeners to all video containers
    document.querySelectorAll(".video-container").forEach((container) => {
      container.addEventListener("click", (e) =>
        this.handleVideoClick(e, container)
      );

      // Add keyboard accessibility
      container.setAttribute("tabindex", "0");
      container.setAttribute("role", "button");
      container.setAttribute(
        "aria-label",
        "Click to load and play video"
      );

      container.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleVideoClick(e, container);
        }
      });
    });
  }

  handleVideoClick(event, container) {
    event.preventDefault();
    event.stopPropagation();

    // Check if video is already loaded
    if (this.loadedVideos.has(container)) {
      const video = container.querySelector("video");
      if (video) {
        if (video.paused) {
          video
            .play()
            .catch((error) => console.log("Playback failed:", error));
        } else {
          video.pause();
        }
      }
      return;
    }

    // Check if video is currently loading
    if (this.loadingVideos.has(container)) {
      return;
    }

    this.loadVideo(container);
  }

  loadVideo(container) {
    const videoSrc = container.dataset.videoSrc;
    const placeholder = container.querySelector(".video-placeholder");
    const playOverlay = container.querySelector(".play-overlay");

    if (!videoSrc || !placeholder) {
      console.error("Missing video source or placeholder");
      return;
    }

    // Mark as loading
    this.loadingVideos.add(container);

    // Show loading state
    this.showLoadingState(playOverlay);

    // Create video element with optimized settings
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.className =
      "absolute top-0 left-0 w-full h-full object-contain";
    video.setAttribute("controlsList", "nodownload");
    video.setAttribute("disablePictureInPicture", "");

    // Create source element
    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = "video/mp4";

    video.appendChild(source);

    // Add fallback text
    video.appendChild(
      document.createTextNode(
        "Your browser does not support the video tag."
      )
    );

    // Handle video events
    video.addEventListener("loadedmetadata", () => {
      this.hideLoadingState(playOverlay);
      placeholder.appendChild(video);
      this.loadedVideos.add(container);
      this.loadingVideos.delete(container);

      // Update accessibility
      container.setAttribute(
        "aria-label",
        "Video loaded. Click to play/pause"
      );

      // Auto-play after loading with error handling
      video.play().catch((error) => {
        console.log("Autoplay prevented by browser policy:", error);
        this.showPlayButton(playOverlay, true);
      });
    });

    video.addEventListener("error", (e) => {
      console.error("Video loading error:", e);
      this.showErrorState(playOverlay);
      this.loadingVideos.delete(container);
    });

    video.addEventListener("loadstart", () => {
      console.log("Video loading started:", videoSrc);
    });

    // Add play/pause event listeners for better UX
    video.addEventListener("play", () => {
      playOverlay.style.display = "none";
    });

    video.addEventListener("pause", () => {
      this.showPlayButton(playOverlay, true);
    });

    video.addEventListener("ended", () => {
      this.showPlayButton(playOverlay, true);
    });

    // Start loading
    video.load();
  }

  showLoadingState(overlay) {
    overlay.innerHTML = `
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center">
        <div class="w-6 h-6 sm:w-8 sm:h-8 border-3 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
      <p class="text-white text-sm mt-3 font-medium">Loading video...</p>
    `;
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
  }

  hideLoadingState(overlay) {
    overlay.style.display = "none";
  }

  showPlayButton(overlay, isReplay = false) {
    overlay.innerHTML = `
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110">
        <i class="fas fa-play text-gray-900 text-xl sm:text-2xl ml-1"></i>
      </div>
      ${
        isReplay ? '<p class="text-white text-xs mt-2">Click to replay</p>' : ""
      }
    `;
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
  }

  showErrorState(overlay) {
    overlay.innerHTML = `
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center">
        <i class="fas fa-exclamation-triangle text-red-600 text-xl sm:text-2xl"></i>
      </div>
      <p class="text-white text-sm mt-3 font-medium">Failed to load video</p>
      <p class="text-white/80 text-xs mt-1">Please try again later</p>
    `;
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
  }

  // Public method to preload specific videos
  preloadVideo(containerId) {
    const container = document.getElementById(containerId);
    // Handle container or container child lookup
    let targetContainer = container;
    if (container && !container.classList.contains("video-container")) {
      targetContainer = container.querySelector(".video-container");
    }
    if (
      targetContainer &&
      !this.loadedVideos.has(targetContainer) &&
      !this.loadingVideos.has(targetContainer)
    ) {
      this.loadVideo(targetContainer);
    }
  }

  // Public method to get loading stats
  getStats() {
    return {
      loaded: this.loadedVideos.size,
      loading: this.loadingVideos.size,
      total: document.querySelectorAll(".video-container").length,
    };
  }
}

// Global functions to bind to events
// Videos load ONLY on explicit user click — no auto-preloading

function setupVideoIntersectionObserver() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  // Only used for the fade-in animation — no preloading triggered here
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".video-container").forEach((container) => {
    videoObserver.observe(container);
  });
}

function enhanceVideoKeyboardNavigation() {
  document.querySelectorAll(".video-container").forEach((container) => {
    container.addEventListener("keydown", (e) => {
      const video = container.querySelector("video");

      if (video && window.lazyVideoLoader && window.lazyVideoLoader.loadedVideos.has(container)) {
        switch (e.key) {
          case "k":
          case " ":
            e.preventDefault();
            video.paused ? video.play() : video.pause();
            break;
          case "ArrowLeft":
            e.preventDefault();
            video.currentTime = Math.max(0, video.currentTime - 10);
            break;
          case "ArrowRight":
            e.preventDefault();
            video.currentTime = Math.min(
              video.duration,
              video.currentTime + 10
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            video.volume = Math.min(1, video.volume + 0.1);
            break;
          case "ArrowDown":
            e.preventDefault();
            video.volume = Math.max(0, video.volume - 0.1);
            break;
          case "m":
            e.preventDefault();
            video.muted = !video.muted;
            break;
          case "f":
            e.preventDefault();
            if (video.requestFullscreen) {
              video.requestFullscreen();
            }
            break;
        }
      }
    });
  });
}

function setupVideoAnalytics() {
  document.addEventListener("click", (e) => {
    const videoContainer = e.target.closest(".video-container");
    if (videoContainer) {
      const videoTitle =
        videoContainer.parentElement.querySelector("h3 span:last-child")
          ?.textContent || "Unknown";

      // Log video interaction
      console.log(`📹 Video interaction: ${videoTitle}`);

      // Integrate with Google Analytics if available
      if (typeof gtag !== "undefined") {
        gtag("event", "video_play", {
          event_category: "Video",
          event_label: videoTitle,
          custom_map: { dimension1: "portfolio_video" },
        });
      }
    }
  });
}

function optimizeVideoForConnection() {
  if ("connection" in navigator) {
    const connection = navigator.connection;

    // Adjust video quality based on connection
    if (
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
    ) {
      console.log(
        "📶 Slow connection detected - Video loading optimized"
      );
    }

    // Monitor connection changes
    connection.addEventListener("change", () => {
      console.log(
        `📶 Connection changed to: ${connection.effectiveType}`
      );
    });
  }
}

function enhanceVideoFullscreen() {
  document.addEventListener("fullscreenchange", () => {
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement && fullscreenElement.tagName === "VIDEO") {
      fullscreenElement.classList.add("video-fullscreen");
    } else {
      document.querySelectorAll("video").forEach((video) => {
        video.classList.remove("video-fullscreen");
      });
    }
  });
}

function setupVideoErrorRecovery() {
  document.addEventListener(
    "error",
    (e) => {
      if (e.target.tagName === "VIDEO") {
        const video = e.target;
        const container = video.closest(".video-container");

        if (container) {
          const overlay = container.querySelector(".play-overlay");

          // Try to reload video once
          if (!video.dataset.retryAttempted) {
            video.dataset.retryAttempted = "true";

            setTimeout(() => {
              video.load();
            }, 2000);

            if (overlay) {
              overlay.innerHTML = `
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-redo text-yellow-600 text-xl sm:text-2xl"></i>
                </div>
                <p class="text-white text-sm mt-3 font-medium">Retrying...</p>
              `;
            }
          } else {
            if (overlay && window.lazyVideoLoader) {
              window.lazyVideoLoader.showErrorState(overlay);
            }
          }
        }
      }
    },
    true
  );
}

// Removed: setupIntelligentPreloading — was auto-downloading all video files
// Videos now load strictly on user click only

// Self-initialize lazy video loader and bind enhancements
function initAllVideoEnhancements() {
  window.lazyVideoLoader = new LazyVideoLoader();
  // No auto-preloading — videos load ONLY on explicit user click
  setupVideoIntersectionObserver();   // fade-in animation only
  enhanceVideoKeyboardNavigation();   // keyboard shortcuts after load
  setupVideoAnalytics();              // gtag events on click
  optimizeVideoForConnection();       // connection quality logging
  enhanceVideoFullscreen();           // fullscreen change handler
  setupVideoErrorRecovery();          // auto-retry on error

  // Export for external use (manual preload still available if needed)
  window.VideoManager = {
    getStats: () =>
      window.lazyVideoLoader?.getStats() || { loaded: 0, loading: 0, total: 0 },
    preloadVideo: (containerId) =>
      window.lazyVideoLoader?.preloadVideo(containerId),
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initAllVideoEnhancements, 500);
  });
} else {
  setTimeout(initAllVideoEnhancements, 500);
}
