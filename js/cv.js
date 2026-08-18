(function () {
  "use strict";

  var buttons = Array.from(document.querySelectorAll("[data-filter]"));
  var publications = Array.from(document.querySelectorAll(".publication-item"));
  var count = document.getElementById("publication-count");
  var countLabel = document.getElementById("publication-count-label");
  var status = document.getElementById("filter-status");
  var year = document.getElementById("current-year");

  var labels = {
    all: "journal & conference papers",
    journal: "journal papers",
    conference: "conference papers"
  };

  function showPublications(filter) {
    var visible = 0;

    publications.forEach(function (publication) {
      var matches = filter === "all" || publication.dataset.type === filter;
      publication.hidden = !matches;
      if (matches) visible += 1;
    });

    buttons.forEach(function (button) {
      var isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    count.textContent = String(visible);
    countLabel.textContent = labels[filter];
    status.textContent = filter === "all"
      ? "Showing all " + visible + " publications"
      : "Showing " + visible + " " + filter + " papers";
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      showPublications(button.dataset.filter);
    });
  });

  year.textContent = String(new Date().getFullYear());
})();
