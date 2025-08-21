import Swiper from "swiper";
import { Navigation } from "swiper/modules";
Swiper.use(Navigation);
// var swiper = new Swiper(".slider-default", {
//   slidesPerView: 1.1,
//   spaceBetween: 12,
//   navigation: {
//     nextEl: ".slider-default__arrow--next",
//     prevEl: ".slider-default__arrow--prev",
//   },
//   breakpoints: {
//     640: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     768: {
//       slidesPerView: 2.05,
//       spaceBetween: 20,
//     },
//   },
// });

// const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
//   let swiper;

//   breakpoint = window.matchMedia(breakpoint);

//   const enableSwiper = function (className, settings) {
//     swiper = new Swiper(className, settings);

//     if (callback) {
//       callback(swiper);
//     }
//   };

//   const checker = function () {
//     if (breakpoint.matches) {
//       return enableSwiper(swiperClass, swiperSettings);
//     } else {
//       if (swiper !== undefined) swiper.destroy(true, true);
//       return;
//     }
//   };

//   breakpoint.addEventListener("change", checker);
//   checker();
// };

// resizableSwiper("(max-width: 1024px)", ".when-need__slider", {
//   loop: true,
//   spaceBetween: 12,
//   slidesPerView: "auto",
// });
