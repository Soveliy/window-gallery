import Swiper from "swiper";
import {
  Navigation,
  EffectCoverflow,
  Thumbs,
  EffectFade,
  Pagination,
  Autoplay,
} from "swiper/modules";
// Swiper.use(Navigation, EffectCoverflow, Mousewheel);
const sliderProds = new Swiper(".production__slider--js", {
  modules: [Navigation, EffectCoverflow, Pagination, Autoplay],
  slidesPerView: "auto",
  spaceBetween: 40,
  centeredSlides: true,
  loopAddBlankSlides: false,
  maxBackfaceHiddenSlides: 3,
  initialSlide: 1,
  loop: true,
  autoplay: true,
  effect: "coverflow",
  // loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
    scale: 1,
  },
  navigation: {
    nextEl: ".production__arrow--next",
    prevEl: ".production__arrow--prev",
  },
  pagination: {
    el: ".production__pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      spaceBetween: 100,
    },
    1024: {
      spaceBetween: 200,
    },
  },
});

const swiper = new Swiper(".works__thumbs--js", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper2 = new Swiper(".works__main-slider-js", {
  modules: [Thumbs, Navigation, EffectFade, Pagination, Autoplay],
  loop: true,
  autoplay: true,
  spaceBetween: 0,
  effect: "fade",
  navigation: {
    nextEl: ".works__arrow--next",
    prevEl: ".works__arrow--prev",
  },
  thumbs: {
    swiper: swiper,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
