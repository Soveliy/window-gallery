import { lenis } from "./animation.js";

window.addEventListener("load", () => {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".main-menu");
  const shadow = document.querySelector(".main-menu__shadow");
  const body = document.body;
  let isOpened = false;

  if (!burger || !menu) return;

  const openMenu = () => {
    isOpened = true;
    burger.classList.add("js-active");
    menu.classList.add("js-active");

    if (typeof lenis !== "undefined") {
      lenis.stop();
    } else {
      body.classList.add("lock-scroll");
    }
  };

  const closeMenu = () => {
    isOpened = false;
    burger.classList.remove("js-active");
    menu.classList.remove("js-active");

    if (typeof lenis !== "undefined") {
      lenis.start();
    } else {
      body.classList.remove("lock-scroll");
    }
  };

  const toggleMenu = () => {
    isOpened ? closeMenu() : openMenu();
  };

  burger.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpened) {
      closeMenu();
    }
  });

  if (shadow) {
    shadow.addEventListener("click", () => {
      if (isOpened) closeMenu();
    });
  }
});
