document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("projectsYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  const menuButton = document.getElementById("menuBtn");
  const navigation = document.getElementById("primaryNav");
  const menuIcon = document.querySelector(".menu-icon");
  if (menuButton && navigation) {
    function setMenu(open) {
      navigation.classList.toggle("nav-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      if (menuIcon) menuIcon.classList.toggle("change", open);
    }
    menuButton.addEventListener("click", function () {
      setMenu(!navigation.classList.contains("nav-open"));
    });
    /* Close menu when a navigation link is clicked */
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    /* Reset mobile navigation on larger screens */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setMenu(false);
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