document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tabs").forEach(initTabs);
});

function initTabs(tabsEl) {
  const tabButtons = tabsEl.querySelectorAll(".tabs__button");
  const tabContents = tabsEl.querySelectorAll(".tabs__content");

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Remove active classes
      tabButtons.forEach((b) => b.classList.remove("js-active"));
      tabContents.forEach((c) => c.classList.remove("js-active"));

      // Add active to current
      btn.classList.add("js-active");
      tabContents[index].classList.add("js-active");
    });
  });
}
