import Swiper from "swiper";
import {
  Navigation,
  EffectCoverflow,
  Mousewheel,
  Thumbs,
  EffectFade,
} from "swiper/modules";
// Swiper.use(Navigation, EffectCoverflow, Mousewheel);
const sliderProds = new Swiper(".production__slider--js", {
  modules: [Navigation, EffectCoverflow, Mousewheel],
  slidesPerView: "auto",
  spaceBetween: 200,
  centeredSlides: true,

  initialSlide: 1,
  loop: true,
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
  // breakpoints: {
  //   640: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   768: {
  //     slidesPerView: 2.05,
  //     spaceBetween: 20,
  //   },
  // },
});

const swiper = new Swiper(".works__thumbs--js", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper2 = new Swiper(".works__main-slider-js", {
  modules: [Thumbs, Navigation, EffectFade],
  loop: true,
  spaceBetween: 0,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
