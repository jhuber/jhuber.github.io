/*
••••••••••••••••••••••••

Powered by Type & Grids™
www.typeandgrids.com

••••••••••••••••••••••••

Modernized 2025 - jQuery removed for security and performance
- Converted from jQuery 1.8.3 to vanilla JavaScript
- Added error handling and performance optimizations
- Maintained all original functionality with modern approaches
- Uses CSS transitions instead of jQuery animations

*/

// Vanilla JavaScript utilities to replace jQuery
const $ = {
  ready: function (callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  },

  get: function (selector) {
    if (!selector) return null;
    try {
      if (selector.startsWith("#")) {
        return document.getElementById(selector.slice(1));
      }
      return document.querySelector(selector);
    } catch (e) {
      console.warn("Invalid selector:", selector);
      return null;
    }
  },

  getAll: function (selector) {
    if (!selector) return [];
    try {
      return document.querySelectorAll(selector);
    } catch (e) {
      console.warn("Invalid selector:", selector);
      return [];
    }
  },

  fadeOut: function (element, duration = 500, callback) {
    if (!element) return;
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.display = "none";
      if (callback) callback();
    }, duration);
  },

  fadeIn: function (element, duration = 500, callback) {
    if (!element) return;
    element.style.display = "block";
    element.style.opacity = "0";
    element.style.transition = `opacity ${duration}ms ease`;
    element.offsetHeight; // Force reflow
    element.style.opacity = "1";
    if (callback) {
      setTimeout(callback, duration);
    }
  },

  delay: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  onClick: function (selector, handler) {
    const element =
      typeof selector === "string" ? this.get(selector) : selector;
    if (element && typeof handler === "function") {
      element.addEventListener("click", handler);
    }
  },
};

// jQuery easing removed - using CSS transitions
let currentPage = "home"; // 'home', 'work', 'about', 'pub'

function fadeOut() {
  if (currentPage === "home") {
    const homeEl = $.get("#home");
    const homePageEl = $.get("#homePage");
    if (homeEl) $.fadeOut(homeEl, 0);
    if (homePageEl) homePageEl.classList.remove("currentPage");
    currentPage = "";
  } else if (currentPage === "work") {
    const workEl = $.get("#work");
    const workPageEl = $.get("#workPage");
    if (workEl) $.fadeOut(workEl, 0);
    if (workPageEl) workPageEl.classList.remove("currentPage");
    currentPage = "";
  } else if (currentPage === "about") {
    const aboutEl = $.get("#about");
    const aboutPageEl = $.get("#aboutPage");
    if (aboutEl) $.fadeOut(aboutEl, 0);
    if (aboutPageEl) aboutPageEl.classList.remove("currentPage");
    currentPage = "";
  } else if (currentPage === "pub") {
    const pubEl = $.get("#pub");
    const pubPageEl = $.get("#pubPage");
    if (pubEl) $.fadeOut(pubEl, 0);
    if (pubPageEl) pubPageEl.classList.remove("currentPage");
    currentPage = "";
  }
}

$.ready(function () {
  // Make enlarge buttons inactive if no onClick event
  const enlargeButtons = $.getAll(".enlargeButton");
  enlargeButtons.forEach((button) => {
    if (!button.hasAttribute("onclick")) {
      button.classList.add("projectNavInactive");
    }
  });

  // Video responsiveness now handled by CSS (FitVids removed)

  // Don't hide video info
  const videoInfoElements = $.getAll(".videoInfo");
  videoInfoElements.forEach((el) => {
    el.style.display = "inline";
  });

  // Move projects to second column - distribution for balanced layout
  const projects = $.getAll(".project");
  const col2 = $.get("#col2");
  if (col2) {
    projects.forEach((project, index) => {
      if (index % 2 === 1) {
        col2.appendChild(project);
      }
    });
  }

  // Project thumbnail hover
  const projectThumbnails = $.getAll(".projectThumbnail");

  projectThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("mouseenter", function (e) {
      const hoverEl = this.querySelector(".projectThumbnailHover");
      if (hoverEl) {
        $.fadeIn(hoverEl, 300);

        const h4 = hoverEl.querySelector("h4");
        if (h4) {
          h4.style.display = "block";
          h4.style.opacity = "0";
          h4.style.left = "0px";
          setTimeout(() => {
            h4.style.transition = "left 200ms ease, opacity 200ms ease";
            h4.style.left = "15px";
            h4.style.opacity = "1";
          }, 100);
        }

        const h5 = hoverEl.querySelector("h5");
        if (h5) {
          h5.style.display = "block";
          h5.style.opacity = "0";
          h5.style.left = "0px";
          setTimeout(() => {
            h5.style.transition = "left 200ms ease, opacity 200ms ease";
            h5.style.left = "15px";
            h5.style.opacity = "1";
          }, 250);
        }
      }
    });

    thumbnail.addEventListener("mouseleave", function (e) {
      const hoverEl = this.querySelector(".projectThumbnailHover");
      if (hoverEl) {
        $.fadeOut(hoverEl, 100);

        const h4 = hoverEl.querySelector("h4");
        if (h4) {
          h4.style.left = "0px";
          h4.style.opacity = "0";
        }

        const h5 = hoverEl.querySelector("h5");
        if (h5) {
          h5.style.left = "0px";
          h5.style.opacity = "0";
        }
      }
    });
  });

  // Hide hover effect on touch devices
  if (typeof Modernizr !== "undefined" && Modernizr.touch) {
    const hoverElements = $.getAll(".projectThumbnailHover");
    hoverElements.forEach((el) => {
      el.style.display = "none";
      el.style.visibility = "hidden";
    });
  }

  // Page navigation

  $.onClick("#logoDetailView", function () {
    window.location = "../../index.html";
  });

  $.onClick("#workPage", function () {
    if (currentPage !== "work") {
      fadeOut();
      const workEl = $.get("#work");
      const workPageEl = $.get("#workPage");
      if (workEl) $.fadeIn(workEl, 500);
      currentPage = "work";
      if (workPageEl) workPageEl.className = "currentPage";
    }
  });

  $.onClick("#aboutPage", function () {
    if (currentPage !== "about") {
      fadeOut();
      const aboutEl = $.get("#about");
      const aboutPageEl = $.get("#aboutPage");
      if (aboutEl) $.fadeIn(aboutEl, 500);
      currentPage = "about";
      if (aboutPageEl) aboutPageEl.className = "currentPage";
    }
  });

  $.onClick("#pubPage", function () {
    if (currentPage !== "pub") {
      fadeOut();
      const pubEl = $.get("#pub");
      const pubPageEl = $.get("#pubPage");
      if (pubEl) $.fadeIn(pubEl, 500);
      currentPage = "pub";
      if (pubPageEl) pubPageEl.className = "currentPage";
    }
  });

  // Handle both home page and logo clicks
  const homeElements = [$.get("#homePage"), $.get("#logo")];
  homeElements.forEach((element) => {
    if (element) {
      element.addEventListener("click", function () {
        if (currentPage !== "home") {
          fadeOut();
          const homeEl = $.get("#home");
          const homePageEl = $.get("#homePage");
          if (homeEl) $.fadeIn(homeEl, 500);
          currentPage = "home";
          if (homePageEl) homePageEl.className = "currentPage";
        }
      });
    }
  });

  // Make home page current page
  const homePageEl = $.get("#homePage");
  if (homePageEl) homePageEl.className = "currentPage";

  // Hide other pages initially
  const aboutEl = $.get("#about");
  const workEl = $.get("#work");
  const pubEl = $.get("#pub");

  if (aboutEl) $.fadeOut(aboutEl, 0);
  if (workEl) $.fadeOut(workEl, 0);
  if (pubEl) $.fadeOut(pubEl, 0);

  // For site fade site in
  const containerEl = $.get(".container");
  if (containerEl) containerEl.style.display = "none";
});

// Remove site preloader after site is loaded
window.addEventListener("load", function () {
  const preloader = $.get("#sitePreloader");
  const container = $.get(".container");

  // Handle preloader removal
  if (preloader) {
    setTimeout(() => {
      $.fadeOut(preloader, 250, () => {
        preloader.remove();
      });
    }, 100);
  }

  // Fade site in with improved timing
  if (container) {
    // Ensure container is hidden initially
    container.style.opacity = "0";
    container.style.display = "block";

    // Small delay to ensure preloader starts fading first
    setTimeout(() => {
      $.fadeIn(container, 250);
    }, 50);
  }
});

// Portfolio slider code removed - was commented out and unused
// Original jQuery-based portfolio slider functionality has been eliminated
