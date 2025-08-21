const accordeonItems = document.querySelectorAll(".faq-item");
const closeAllItems = () => {
  accordeonItems.forEach((accordeonItem) => {
    accordeonItem.classList.remove("js-active");
  });
};
if (accordeonItems.length > 0) {
  accordeonItems.forEach((accordeonItem) => {
    const head = accordeonItem.querySelector(".faq-item__head");
    head.addEventListener("click", () => {
      accordeonItem.classList.toggle("js-active");
    });
  });
}
