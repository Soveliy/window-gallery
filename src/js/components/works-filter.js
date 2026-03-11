const worksFilter = () => {
  const filterButtons = document.querySelectorAll(".teg");
  const cardItems = document.querySelectorAll(".card-item");
  const resetButton = document.querySelector(".tegs__reset");

  const getActiveFilters = () =>
    [...filterButtons]
      .filter((btn) => btn.classList.contains("js-active"))
      .map((btn) => btn.dataset.filter);

  const applyFilter = () => {
    const activeFilters = getActiveFilters();

    cardItems.forEach((item) => {
      if (activeFilters.length === 0) {
        item.style.display = "flex";
        return;
      }

      const isMatch = activeFilters.some((filter) =>
        item.classList.contains(filter)
      );

      item.style.display = isMatch ? "flex" : "none";
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("js-active");
      applyFilter();
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("js-active"));
      applyFilter();
    });
  }
};
window.addEventListener("load", worksFilter);
