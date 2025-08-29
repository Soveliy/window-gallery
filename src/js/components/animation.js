import { gsap } from "gsap";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import CustomEase from "gsap/CustomEase.js";
import DrawSVGPlugin from "gsap/DrawSVGPlugin.js";
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  DrawSVGPlugin,
  CustomEase
);

gsap.to(".hero__title path", {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: { each: 0.04, from: "start" },
});

class AboutSyncGallery {
  /**
   * @param {HTMLElement} sectionEl - корневой <section class="section about">
   */
  constructor(sectionEl) {
    this.section = sectionEl;
    this.gallery = sectionEl.querySelector(".about__image-gallery");
    this.medias = Array.from(
      this.gallery.querySelectorAll(".image-gallery__item")
    );
    this.images = this.medias.map((m) =>
      m.querySelector(".image-gallery__item-picture")
    );
    this.descItems = Array.from(
      sectionEl.querySelectorAll(".about__desc .about__desc-item")
    );
    this.steps = Math.min(this.medias.length, this.descItems.length);
  }

  init() {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (min-aspect-ratio: 1/1)", () =>
      this.animate()
    );
  }

  animate() {
    if (this.steps < 2) return;

    // начальные состояния
    gsap.set(this.medias, {
      clipPath: "inset(0 0 0 0 round 0rem)",
      willChange: "clip-path",
    });
    this.medias.forEach((el, i) =>
      gsap.set(el, { zIndex: this.medias.length - i })
    );

    gsap.set(this.descItems, { opacity: 0.35, yPercent: 10 });
    gsap.set(this.descItems[0], { opacity: 1, yPercent: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.section, // пинним всю секцию: слева и справа всё видно
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=" + (this.steps - 1) * (window.innerHeight / 2), // по экрану на шаг
        ease: "none",
        snap: { snapTo: 1 / (this.steps - 1), duration: 0.8 },
      },
      defaults: { ease: "none" },
    });

    const segDur = (1 / this.steps) * 0.5; // как в твоём примере—половина TL

    for (let i = 0; i < this.steps - 1; i++) {
      const pos = (i / this.steps) * 0.5;

      // 1) Спрятать текущий слайд клипом + параллакс картинки
      tl.to(
        this.medias[i],
        { clipPath: "inset(0 100% 0  0)", duration: segDur },
        pos
      ).to(this.images[i], { yPercent: -15, duration: segDur }, pos);

      // 2) Синхронно переключить текст слева
      tl.to(
        this.descItems[i],
        { opacity: 0, yPercent: 0, duration: segDur },
        pos
      ).fromTo(
        this.descItems[i + 1],
        { opacity: 0.0, yPercent: 0 },
        { opacity: 1, yPercent: 0, duration: segDur },
        pos
      );
    }

    // на случай ресайза/адресной строки iOS
    window.addEventListener("resize", () => ScrollTrigger.refresh(), {
      passive: true,
    });
  }
}

const section = document.querySelector(".section.about");
if (section) {
  // new AboutSyncGallery(section).init();
}

const items = gsap.utils.toArray(".tasks-item");

function activate(el) {
  items.forEach((i) => i.classList.toggle("js-active", i === el));
}

items.forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 60%",
    end: "bottom 55%",
    onEnter: () => activate(el),
    onEnterBack: () => activate(el),
    // markers: true,
  });
});

window.addEventListener("load", () => ScrollTrigger.refresh());

function animateSVG(svgEl) {
  const paths = svgEl.querySelectorAll(
    "path, circle, rect, ellipse, polyline, polygon, line"
  );
  gsap.set(paths, { drawSVG: "0%" });
  gsap.to(paths, {
    drawSVG: "100%",
    duration: 1.2,
    stagger: 0.08,
    ease: "power1.out",
  });
}

document.querySelectorAll(".advantages-item").forEach((item) => {
  const svg = item.querySelector(".advantages-item__image");

  item.addEventListener("mouseenter", () => {
    if (svg) animateSVG(svg);
  });
});
