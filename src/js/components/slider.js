import Swiper from "swiper";
import {
  Navigation,
  EffectCoverflow,
  Thumbs,
  EffectFade,
  Pagination,
  Autoplay,
  EffectCreative,
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
  // autoplay: true,
  effect: "coverflow",
  pauseOnMouseEnter: true,
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

const swiperWorksBread = new Swiper(".works__thumbs--js", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiperWorksMain = new Swiper(".works__main-slider-js", {
  modules: [
    Thumbs,
    Navigation,
    EffectFade,
    Pagination,
    Autoplay,
    EffectCreative,
  ],
  loop: true,
  autoplay: true,
  spaceBetween: 0,
  effect: "creative",
  speed: 600,

  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-20%", 0, -1],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".works__arrow--next",
    prevEl: ".works__arrow--prev",
  },
  thumbs: {
    swiper: swiperWorksBread,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: "auto",
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  modules: [
    Thumbs,
    Navigation,
    EffectFade,
    Pagination,
    Autoplay,
    EffectCreative,
  ],
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
