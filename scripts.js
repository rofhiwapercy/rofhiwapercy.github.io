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
  // Credentials filtering
  const credentialFilters = document.querySelectorAll('.credential-filter');
  const credentialCards = document.querySelectorAll('.credential-card');

  if (credentialFilters.length && credentialCards.length) {

  credentialFilters.forEach(filter => {
    filter.addEventListener('click', () => {

      // Update active filter
      credentialFilters.forEach(button => {
        button.classList.remove('active');
      });

      filter.classList.add('active');

      // Get selected category
      const selectedCategory = filter.dataset.filter;

      // Show/hide credential cards
      credentialCards.forEach(card => {
        const category = card.dataset.category;

        if (
          selectedCategory === 'all' ||
          category === selectedCategory
        ) {
          card.classList.remove('credential-hidden');
        } else {
          card.classList.add('credential-hidden');
        }
      });

    });
  });

}
});

/* Chess page*/
(function () {"use strict"; const chessPage = document.querySelector(".chess-page"); if (!chessPage) {return;}
  /*Enrollment buttons */
  const enrollmentUrl ="https://forms.gle/MYUrJmLeqyqrtrS8A";
  const enrollTop =document.getElementById("enrollBtn");
  const enrollBottom =document.getElementById("enrollBtnBottom");
  function openEnrollmentForm() {
    window.open(enrollmentUrl,"_blank","noopener,noreferrer");
  }
  if (enrollTop) {
    enrollTop.addEventListener(
      "click",
      openEnrollmentForm
    );
  }
  if (enrollBottom) {
    enrollBottom.addEventListener(
      "click",
      openEnrollmentForm
    );
  }
  const learnMore =
    document.getElementById("learnMoreBtn");
  const curriculum =
    document.getElementById("curriculum");
  if (learnMore && curriculum) {
    learnMore.addEventListener("click", function (event) {
      event.preventDefault();
      curriculum.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      curriculum.classList.add(
        "flash-highlight"
      );
      window.setTimeout(function () {
        curriculum.classList.remove(
          "flash-highlight"
        );
      }, 2200);
    });
  }
/* Chess board animation */
  const chessSquares = chessPage.querySelectorAll(".chess-square");
  chessSquares.forEach(function (square) {
    square.addEventListener(
      "mouseenter",
      function () {
        square.style.transform =
          "scale(1.04)";
        square.style.zIndex = "3";
      }
    );
    square.addEventListener(
      "mouseleave",function () {
        square.style.transform ="";
        square.style.zIndex ="";
      }
    );
  });
})();