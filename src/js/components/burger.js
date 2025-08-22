const burger = document.querySelector(".header__burger");
// const menu = document.querySelector(".header__menu");
if (burger) {
  burger.addEventListener("click", () => {
    document.body.classList.toggle("lock-scroll");
    burger.classList.toggle("js-active");
    // menu.classList.toggle("header__menu--active");
  });
}
