document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var form = document.getElementById("predictionForm");
  var result = document.getElementById("predictionResult");
  var bars = document.querySelectorAll(".bar");

  function setBarWidths() {
    bars.forEach(function (bar) {
      var width = bar.getAttribute("data-width");
      if (width) {
        bar.style.width = width + "%";
      }
    });
  }

  if ("IntersectionObserver" in window && bars.length) {
    var observer = new IntersectionObserver(function (entries, observerInstance) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setBarWidths();
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(bars[0]);
  } else {
    setBarWidths();
  }

  if (form && result) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var prevGrade = Number(document.getElementById("prevGrade").value);
      var absences = Number(document.getElementById("absences").value);

      if (!Number.isFinite(prevGrade) || !Number.isFinite(absences)) {
        result.textContent = "Please enter valid values.";
        return;
      }

      /*
       * This mirrors the Decision Tree rules printed in the notebook.
       * The notebook's displayed tree ultimately predicts Fail for:
       *   prev_grade <= 9.50 AND absences > 21.50
       * and Pass for the other displayed leaf paths.
       */
      var prediction = "Pass";

      if (prevGrade <= 9.5) {
        if (prevGrade <= 8.5) {
          prediction = "Fail";
        } else if (absences > 21.5) {
          prediction = "Fail";
        }
      }

      result.className = "prediction-result " + (prediction === "Pass" ? "pass" : "fail");
      result.innerHTML =
        "<strong>Prediction: " + prediction + "</strong><br>" +
        "Based on the displayed Decision Tree rules in the project notebook.";
    });
  }
});
