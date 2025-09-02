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
document.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (pageYOffset > 100) {
    header.classList.add("js-scroll");
  } else {
    header.classList.remove("js-scroll");
  }
});
let hero = gsap.timeline({});
hero.from(".hero__video", {
  clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
  yPercent: 50,
  duration: 1.5,
  ease: "power3.out",
});

hero.to(
  ".hero__video",
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    yPercent: 0,
    ease: "power3.out",
  },
  "-=0.2"
);
hero.to(
  ".header",
  {
    opacity: 1,
    y: 0,
    ease: "power3.out",
  },
  "-=0.5"
);
hero.to(".hero__desc", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 0.6,
  ease: "power3.out",
  delay: 0.2,
});
hero.to(
  ".hero__buttons",
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.6,
    ease: "power3.out",
    delay: 0.2,
  },
  "=-0.5"
);

hero.to(
  ".hero__title path",
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: { each: 0.04, from: "start" },
  },
  "=-0.5"
);

class AboutSyncGallery {
  /**
   * @param {HTMLElement} sectionEl - <section class="section about">
   */
  constructor(sectionEl) {
    this.section = sectionEl;

    // медиа (общие для десктопа/мобилы)
    this.gallery = sectionEl.querySelector(".about__image-gallery");
    this.medias = this.gallery
      ? Array.from(this.gallery.querySelectorAll(".image-gallery__item"))
      : [];
    this.images = this.medias.map((m) =>
      m.querySelector(".image-gallery__item-picture")
    );

    // тексты
    this.descDesktop = Array.from(
      sectionEl.querySelectorAll(".about__desc--desktop .about__desc-item")
    );
    this.descMobile = Array.from(
      sectionEl.querySelectorAll(".about__desc--mobile  .about__desc-item")
    );

    // counter
    this.counterWrap = sectionEl.querySelector(".about__counter");
    this.counterSpan = sectionEl.querySelector(".about__counter span");
    this._counterIndex = 1;

    this.mm = gsap.matchMedia();
  }

  init() {
    // Десктоп/горизонталь: свой список + свой стиль текста
    this.mm.add("(min-width: 768px) and (min-aspect-ratio: 1/1)", () =>
      this._animate({
        textItems: this.descDesktop,
        textOut: (tl, el, dur, at) =>
          tl.to(
            el,
            { autoAlpha: 0, y: 16, duration: dur * 0.6, ease: "power2.out" },
            at
          ),
        textIn: (tl, el, dur, at) =>
          tl.fromTo(
            el,
            { autoAlpha: 0, y: -12 },
            { autoAlpha: 1, y: 0, duration: dur * 0.6, ease: "power2.out" },
            at + dur * 0.15
          ),
      })
    );

    // Мобила/портрет: тот же тайминг, пин и клипы, но другой стиль текста и свой список
    this.mm.add("(max-width: 767px), (max-aspect-ratio: 1/1)", () =>
      this._animate({
        textItems: this.descMobile,
        // мобильная анимация текста: свайп — старый уезжает влево, новый — снизу вверх
        textOut: (tl, el, dur, at) =>
          tl.to(
            el,
            { autoAlpha: 0, x: -20, duration: dur * 0.55, ease: "power2.out" },
            at
          ),
        textIn: (tl, el, dur, at) =>
          tl.fromTo(
            el,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: dur * 0.55, ease: "power3.out" },
            at + dur * 0.12
          ),
      })
    );
  }

  _animate({ textItems, textOut, textIn }) {
    const steps = Math.min(this.medias.length, textItems.length);
    if (steps < 2) return;

    // стартовые: медиа слои (клип) и текст
    gsap.set(this.medias, {
      clipPath: "inset(0 0 0 0)",
      willChange: "clip-path",
    });
    this.medias.forEach((el, i) =>
      gsap.set(el, { zIndex: this.medias.length - i })
    );

    gsap.set(textItems, { autoAlpha: 0, x: 0, y: 0 });
    gsap.set(textItems[0], { autoAlpha: 1 });

    // счётчик в любом режиме, если он есть
    if (this.counterWrap && this.counterSpan) {
      this._setCounterTotal(steps);
      this._updateCounter(1, true);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.section,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        start: "top top",
        end: "+=" + (steps - 1) * window.innerHeight,
        snap: { snapTo: 1 / (steps - 1), duration: 0.6, ease: "power2.out" },
        onUpdate: (self) => {
          const idx = Math.max(
            1,
            Math.min(steps, Math.round(self.progress * (steps - 1)) + 1)
          );
          this._updateCounter(idx);
        },
      },
      defaults: { ease: "none" },
    });

    const seg = 1 / (steps - 1);

    for (let i = 0; i < steps - 1; i++) {
      const pos = i * seg;

      // 1) скрыть текущий медиа-слой (без параллакса картинок)
      tl.to(
        this.medias[i],
        { clipPath: "inset(0 100% 0 0)", duration: seg },
        pos
      );

      // 2) текст: разные стили для десктопа/мобилы (переданы колбэками)
      textOut(tl, textItems[i], seg, pos);
      textIn(tl, textItems[i + 1], seg, pos);
    }

    window.addEventListener("resize", () => ScrollTrigger.refresh(), {
      passive: true,
    });
  }

  /* helpers */
  _setCounterTotal(total) {
    const raw = this.counterWrap?.textContent?.trim() || "";
    if (raw && raw.includes("/")) return;
    if (this.counterWrap && this.counterSpan) {
      const after = document.createTextNode("/" + total);
      if (!this.counterSpan.nextSibling) this.counterWrap.appendChild(after);
      else this.counterWrap.replaceChild(after, this.counterSpan.nextSibling);
    }
  }

  _updateCounter(index, immediate = false) {
    if (!this.counterSpan) return;
    if (immediate) {
      this.counterSpan.textContent = String(index);
      return;
    }
    const apply = () => {
      this.counterSpan.textContent = String(index);
    };
    gsap
      .timeline({ defaults: { duration: 0.22, ease: "power2.out" } })
      .to(this.counterSpan, { y: 8, autoAlpha: 0, onComplete: apply }, 0)
      .to(this.counterSpan, { y: 0, autoAlpha: 1 }, 0.12);
  }
}

const section = document.querySelector(".section.about");
if (section) {
  new AboutSyncGallery(section).init();
}
(() => {
  const section = document.querySelector(".history");
  const years = gsap.utils.toArray(".history__years-item");
  const lineEl = document.querySelector(".history__line");
  const svg = document.querySelector(".history__scheme");
  const clipRect = svg?.querySelector("defs > clipPath rect");
  const texts = gsap.utils.toArray(".history__text-item");

  if (
    !section ||
    !lineEl ||
    !svg ||
    !clipRect ||
    !years.length ||
    !texts.length
  )
    return;

  const steps = years.map((_, i) => i / (years.length - 1));
  const svgWidth =
    +svg.getAttribute("viewBox")?.split(" ")[2] || svg.clientWidth || 1011;

  gsap.set(lineEl, { scaleX: 0 });
  gsap.set(clipRect, { attr: { width: 0 } });
  gsap.set(texts, { autoAlpha: 0, y: 16 });
  texts[0].classList.add("is-active");
  gsap.set(texts[0], { autoAlpha: 1, y: 0 });
  years[0].classList.add("is-active");

  let activeIndex = 0;

  function switchText(toIndex) {
    if (toIndex === activeIndex) return;
    const from = texts[activeIndex];
    const to = texts[toIndex];

    from.classList.remove("is-active");
    to.classList.add("is-active");

    gsap
      .timeline({ defaults: { duration: 0.45, ease: "power2.out" } })
      .to(from, { autoAlpha: 0, y: 16 }, 0)
      .fromTo(to, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0 }, 0.1);

    years[activeIndex].classList.remove("is-active");
    years[toIndex].classList.add("is-active");

    activeIndex = toIndex;
  }

  function animateProgress(progress) {
    gsap.to(lineEl, { scaleX: progress, duration: 0.6, ease: "power2.out" });

    gsap.to(clipRect, {
      attr: { width: svgWidth * progress },
      duration: 0.8,
      ease: "power2.out",
    });
  }

  function goToStep(index) {
    const progress = steps[index];
    animateProgress(progress);
    switchText(index);
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=200%",
    scrub: true,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const p = self.progress;
      animateProgress(p);
      const idx = steps.reduce(
        (acc, s, i) => (Math.abs(p - s) < Math.abs(p - steps[acc]) ? i : acc),
        0
      );
      if (idx !== activeIndex) switchText(idx);
    },
  });

  gsap.from(section.querySelector(".section__title"), {
    autoAlpha: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out",
  });
})();

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
