const accordeonItems = document.querySelectorAll(".reviews-item");
const closeAllItems = () => {
  accordeonItems.forEach((accordeonItem) => {
    accordeonItem.classList.remove("js-active");
  });
};
if (accordeonItems.length > 0) {
  accordeonItems.forEach((accordeonItem) => {
    accordeonItem.addEventListener("click", () => {
      closeAllItems();
      accordeonItem.classList.toggle("js-active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".best-works__head-item");
  const contents = document.querySelectorAll(".best-works-item");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Убираем активные классы
      tabs.forEach((t) => t.classList.remove("js-active"));
      contents.forEach((c) => c.classList.remove("js-active"));

      // Добавляем активный класс выбранным
      tab.classList.add("js-active");
      contents[index].classList.add("js-active");
    });
  });
});
