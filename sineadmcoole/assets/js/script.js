"use strict";

/**
 * add event on element
 */

const addEventOnelem = function (elem, type, callback) {
  if (!elem) return;

  // If elem is a NodeList, HTMLCollection or Array, iterate and attach
  if (
    NodeList.prototype.isPrototypeOf(elem) ||
    HTMLCollection.prototype.isPrototypeOf(elem) ||
    Array.isArray(elem)
  ) {
    for (let i = 0; i < elem.length; i++) {
      const el = elem[i];
      if (el && typeof el.addEventListener === "function") {
        el.addEventListener(type, callback);
      }
    }
    return;
  }

  // Fallback: single element (Window, Element, Document, etc.)
  if (typeof elem.addEventListener === "function") {
    elem.addEventListener(type, callback);
  }
};

/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
};

addEventOnelem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
};

addEventOnelem(navbarLinks, "click", closeNavbar);

/**
 * filter tab
 */

const tabCard = document.querySelectorAll("[data-tab-card]");

let lastTabCard = tabCard[0];

const navigateTab = function () {
  lastTabCard.classList.remove("active");
  this.classList.add("active");
  lastTabCard = this;
};

addEventOnelem(tabCard, "click", navigateTab);

function animateSVGSignature() {
  const svg = document.getElementById("signature-svg");
  if (!svg) return;

  const paths = [
    svg.querySelector("#Sinead"),
    svg.querySelector("#Mc"),
    svg.querySelector("#Coole"),
  ];

  let delay = 0;

  paths.forEach((path, i) => {
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.animation = `draw-path 2s ease forwards`;
    path.style.animationDelay = `${delay}s`;
    delay += 2; // 2 seconds per path, adjust as needed
  });
}

window.addEventListener("DOMContentLoaded", animateSVGSignature);

/* Dropdown toggle behavior (click on mobile / keyboard accessible) */
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

function closeAllDropdowns(except = null) {
  document.querySelectorAll(".dropdown.open").forEach((d) => {
    if (d !== except) d.classList.remove("open");
  });
}

if (dropdownToggles.length) {
  dropdownToggles.forEach((toggle) => {
    const parent = toggle.closest(".dropdown");

    // click to toggle (mobile)
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = parent.classList.contains("open");
      closeAllDropdowns(isOpen ? null : parent);
      parent.classList.toggle("open");
      // update aria-expanded for accessibility
      toggle.setAttribute("aria-expanded", parent.classList.contains("open"));
    });

    // keyboard support
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });

    // keep dropdown open while hovering on desktop and update aria-expanded
    parent.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 992px)").matches) {
        parent.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    parent.addEventListener("mouseleave", () => {
      if (window.matchMedia("(min-width: 992px)").matches) {
        parent.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      closeAllDropdowns();
    }
  });
}

/* Book description toggle */
const bookToggles = document.querySelectorAll(".book-expand-btn");

bookToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const description = toggle.closest(".book-description");
    const expandText = toggle.querySelector(".expand-text");

    if (description.classList.contains("collapsed")) {
      description.classList.remove("collapsed");
      expandText.textContent = "Show less";
    } else {
      description.classList.add("collapsed");
      expandText.textContent = "Show more";
    }
  });
});

/* Biography read more toggle (mobile) */
const bioToggle = document.querySelector(".bio-expand-btn");

if (bioToggle) {
  bioToggle.addEventListener("click", () => {
    const description = bioToggle.closest(".bio-description");
    const expandText = bioToggle.querySelector(".expand-text");

    if (description.classList.contains("collapsed")) {
      description.classList.remove("collapsed");
      expandText.textContent = "Read less";
    } else {
      description.classList.add("collapsed");
      expandText.textContent = "Read more";
    }
  });
}
