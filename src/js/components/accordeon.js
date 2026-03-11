document.querySelectorAll(".reviews, .faq").forEach((accordion) => {
  const items = accordion.querySelectorAll(".reviews-item, .faq-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("js-active");
      const isReview = item.classList.contains("reviews-item");

      items.forEach((el) => el.classList.remove("js-active"));

      if (!isActive || isReview) {
        item.classList.add("js-active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".best-works__head-item");
  const contents = document.querySelectorAll(".best-works-item");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("js-active"));
      contents.forEach((c) => c.classList.remove("js-active"));

      tab.classList.add("js-active");
      contents[index].classList.add("js-active");
    });
  });
});
