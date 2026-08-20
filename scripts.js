document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);
  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  // Current Year

  const year = $("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

// Mobile Navigation 

  const menuBtn = $("#menuBtn");
  const navList = $("#primaryNav");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("nav-open");
      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    // Close menu when a navigation link is clicked
    $$(".nav-list a").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("nav-open");
        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });

    // Reset mobile menu when returning to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        navList.classList.remove("nav-open");
        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  }

  // Enroll Button

  const enrollBtn = $("#enrollBtn");
  if (enrollBtn) {
    enrollBtn.addEventListener("click", () => {
      window.open(
        "https://forms.gle/MYUrJmLeqyqrtrS8A",
        "_blank",
        "noopener,noreferrer"
      );
    });
  }


// Learn More Button

  const learnMoreBtn = $("#learnMoreBtn");
  const curriculum = $("#curriculum");
  if (learnMoreBtn && curriculum) {
    learnMoreBtn.addEventListener("click", event => {
      event.preventDefault();
      curriculum.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Highlight the curriculum section
      curriculum.classList.remove("flash-highlight");

      // Force animation to restart
      void curriculum.offsetWidth;

      curriculum.classList.add("flash-highlight");

      setTimeout(() => {
        curriculum.classList.remove("flash-highlight");
      }, 2200);
    });
  }

  // Button Interaction Effects

  $$(".btn, .btnModal").forEach(button => {
    button.addEventListener("keydown", event => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        button.classList.add("button-active");
      }
    });
    button.addEventListener("keyup", () => {
      button.classList.remove("button-active");
    });
  });

  // Smooth Scrolling for Anchor Links

  $$(".nav-list a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const targetId =
        link.getAttribute("href");
      const target =
        document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

// Page Load Animation
  document.body.classList.add("page-loaded");
});