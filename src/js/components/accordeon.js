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
