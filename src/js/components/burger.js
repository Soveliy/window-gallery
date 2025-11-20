import { lenis } from "./animation.js";

window.addEventListener("load", () => {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".main-menu");
  const body = document.querySelector("body");
  let isOpened = false;

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    isOpened = !isOpened;

    burger.classList.toggle("js-active", isOpened);
    menu.classList.toggle("js-active", isOpened);

    if (lenis) {
      if (isOpened) {
        lenis.stop();
      } else {
        lenis.start();
      }
    } else {
      body.classList.toggle("lock-scroll", isOpened);
    }
  });
});
