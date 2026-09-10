document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("projectsYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  const menuButton = document.getElementById("projectsMenuBtn");
  const navigation = document.getElementById("projectsPrimaryNav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const menuIsOpen =
        navigation.classList.toggle("nav-open");
      menuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );

    });
    /* Close menu when a navigation link is clicked */
    const navigationLinks =
      navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        navigation.classList.remove("nav-open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
    /* Reset mobile navigation on larger screens */

    window.addEventListener("resize", function () {

      if (window.innerWidth > 980) {
        navigation.classList.remove("nav-open");
        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  }
  /* Project Filtering */
  const filterButtons =
    document.querySelectorAll(".project-filter");
  const projectItems =
    document.querySelectorAll(".project-item");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory =
        button.getAttribute("data-filter");
      /* Update active filter */
      filterButtons.forEach(function (filterButton) {
        filterButton.classList.remove("active");
      });
      button.classList.add("active");
      projectItems.forEach(function (project) {
        const projectCategory =
          project.getAttribute("data-category");
        if (
          selectedCategory === "all" ||
          projectCategory === selectedCategory
        ) {
          project.classList.remove("project-hidden");
        } else {
          project.classList.add("project-hidden");
        }
      });
    });
  });
});