import { gsap } from "gsap";
import { isDesktop } from "../functions/check-viewport.js";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import CustomEase from "gsap/CustomEase.js";
import DrawSVGPlugin from "gsap/DrawSVGPlugin.js";
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import Lenis from "lenis";

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  DrawSVGPlugin,
  CustomEase
);

export let lenis = null;
window.addEventListener("load", () => {
  lenis = new Lenis({
    duration: 1.2, // Время анимации скролла
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Функция плавности
    orientation: "vertical", // Вертикальный скролл
    smoothWheel: true, // Включаем плавный скролл колесом
    wheelMultiplier: 1, // Коэффициент скролла колесом мыши
    touchMultiplier: 1.5, // Коэффициент скролла на тачскринах
    infinite: false, // Отключение бесконечного скролла
    syncTouch: false, // Синхронизация с touch событиями
  });

  lenis.on("scroll", ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (pageYOffset > 10) {
      header.classList.add("js-scroll");
    } else {
      header.classList.remove("js-scroll");
    }
  });
  let hero = gsap.timeline({});

  const heroBlock = document.querySelector(".hero");
  if (heroBlock) {
    setTimeout(() => {
      hero.to(
        ".hero__title path",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: { each: 0.1, from: "start" },
        },
        "=-0.5"
      );

      hero.to(
        ".hero__video",
        {
          // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power3.out",
          opacity: 1,
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
    }, 500);
  } else {
    setTimeout(() => {
      hero.to(".breadcrumbs", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "ease",
        delay: 0.2,
      });
      hero.to(".page-top__title", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.6,
        ease: "ease",
        delay: 0.2,
      });
      hero.to(
        ".header",
        {
          opacity: 1,
          y: 0,
          ease: "ease",
        },
        "-=0.5"
      );
    }, 500);
  }

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

      // тексты
      this.descDesktop = Array.from(
        sectionEl.querySelectorAll(".about__desc--desktop .about__desc-item")
      );
      this.descMobile = Array.from(
        sectionEl.querySelectorAll(".about__desc--mobile  .about__desc-item")
      );

      // блоки .about__item
      this.aboutItems = Array.from(
        sectionEl.querySelectorAll(".about__item")
      ).map((item) =>
        Array.from(item.querySelectorAll(".about__item-content"))
      );

      // counter
      this.counterWrap = sectionEl.querySelector(".about__counter");
      this._currentIndex = 0;

      this.mm = gsap.matchMedia();
    }

    init() {
      // Десктоп
      this.mm.add("(min-width: 768px) and (min-aspect-ratio: 1/1)", () =>
        this._animate({ textItems: this.descDesktop })
      );

      // Мобила
      this.mm.add("(max-width: 767px), (max-aspect-ratio: 1/1)", () =>
        this._animate({ textItems: this.descMobile })
      );
    }

    _animate({ textItems }) {
      const steps = Math.min(this.medias.length, textItems.length);
      if (steps < 2) return;

      // стартовые состояния
      gsap.set(this.medias, { clipPath: "inset(0 100% 0 0)", zIndex: 1 });
      gsap.set(this.medias[0], { clipPath: "inset(0 0 0 0)", zIndex: 2 });

      gsap.set(textItems, { autoAlpha: 0, y: 20 });
      gsap.set(textItems[0], { autoAlpha: 1, y: 0 });

      if (this.counterWrap) {
        this._setCounterTotal(steps);
        this._updateCounter(1, true);
      }

      ScrollTrigger.create({
        trigger: this.section,
        pin: true,
        start: "top top",
        end: "+=" + (steps - 1) * window.innerHeight,
        snap: 1 / (steps - 1),
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (steps - 1));
          if (idx !== this._currentIndex) {
            this._goToStep(idx, textItems);
          }
        },
      });

      // window.addEventListener(
      //   "resize",
      //   () => {
      //     ScrollTrigger.refresh();
      //     alert("resize");
      //   },
      //   {
      //     passive: true,
      //   }
      // );
    }

    _goToStep(index, textItems) {
      const prev = this._currentIndex ?? 0;
      if (prev === index) return;

      const dur = 0.6;

      // === КАРТИНКИ ===
      if (this.medias[index]) {
        // новая сразу "готова" под старой
        gsap.set(this.medias[index], { clipPath: "inset(0 0 0 0)", zIndex: 1 });
      }

      if (this.medias[prev]) {
        gsap.set(this.medias[prev], { zIndex: 2 }); // старая поверх
        gsap.to(this.medias[prev], {
          clipPath: "inset(0 100% 0 0)", // уезжает влево
          duration: dur,
          ease: "power2.inOut",
          onComplete: () => {
            // после анимации прячем старую
            gsap.set(this.medias[prev], {
              clipPath: "inset(0 100% 0 0)",
              zIndex: 0,
            });
          },
        });
      }

      // === ТЕКСТ (сверху вниз) ===
      if (textItems[prev]) {
        gsap.to(textItems[prev], {
          autoAlpha: 0,
          y: -20,
          duration: dur * 0.6,
          ease: "power2.out",
        });
      }
      if (textItems[index]) {
        gsap.fromTo(
          textItems[index],
          { autoAlpha: 0, y: -20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: dur * 0.6,
            ease: "power2.out",
            delay: dur * 0.15,
          }
        );
      }

      this.aboutItems.forEach((group) => {
        if (group[prev]) {
          gsap.to(group[prev], {
            autoAlpha: 0,
            y: -20,
            duration: dur * 0.6,
            ease: "power2.out",
          });
        }
        if (group[index]) {
          gsap.fromTo(
            group[index],
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: dur * 0.6,
              ease: "power2.out",
              delay: dur * 0.15,
            }
          );
        }
      });
      // === СЧЁТЧИК ===
      this._updateCounter(index + 1);

      this._currentIndex = index;
    }

    /* === helpers === */
    _setCounterTotal(total) {
      if (!this.counterWrap) return;

      this.counterWrap.innerHTML = "";

      const windowEl = document.createElement("div");
      windowEl.classList.add("counter-window");

      const reel = document.createElement("div");
      reel.classList.add("counter-reel");
      windowEl.appendChild(reel);

      for (let i = 1; i <= total; i++) {
        const num = document.createElement("span");
        num.textContent = i;
        reel.appendChild(num);
      }

      this.counterWrap.appendChild(windowEl);

      const totalSpan = document.createElement("span");
      totalSpan.classList.add("counter-total");
      totalSpan.textContent = "/" + total;
      this.counterWrap.appendChild(totalSpan);

      this.reel = reel;
    }

    _updateCounter(index, immediate = false) {
      if (!this.reel) return;

      const itemHeight = this.reel.firstElementChild.offsetHeight;
      const offset = -(index - 1) * itemHeight;

      if (immediate) {
        gsap.set(this.reel, { y: offset });
        return;
      }

      gsap.to(this.reel, {
        y: offset,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }

  const section = document.querySelector(".section.about");
  if (section) {
    new AboutSyncGallery(section).init();
  }

  const historyAnimation = () => {
    const section = document.querySelector(".history");
    const years = gsap.utils.toArray(".history__years-item");
    const lineEl = document.querySelector(".history__line");
    const svg = document.querySelector(".history__scheme");
    const texts = gsap.utils.toArray(".history__text-item");

    if (!section || !lineEl || !svg || !years.length || !texts.length) return;

    // 1) Собираем элементы для прорисовки (предпочтительно с [data-draw]).
    //   Фолбэк — все геометрические фигуры со stroke.
    let drawables = svg.querySelectorAll("[data-draw]");

    if (!drawables.length) {
      drawables = svg.querySelectorAll("path, line, polyline, polygon");
      drawables = [...drawables].filter((el) => {
        const sw = parseFloat(
          getComputedStyle(el).strokeWidth ||
            el.getAttribute("stroke-width") ||
            "0"
        );
        const st = getComputedStyle(el).stroke || el.getAttribute("stroke");
        return sw > 0 && st && st !== "none";
      });
    } else {
      drawables = [...drawables];
    }

    // переворачиваем порядок элементов
    drawables.reverse();

    if (!drawables.length) return;

    // 2) Подготовка шагов и UI
    const steps = years.map((_, i) => i / (years.length - 1));
    gsap.set(lineEl, { scaleX: 0 });

    gsap.set(texts, { autoAlpha: 0, y: 16 });
    texts[0].classList.add("is-active");
    gsap.set(texts[0], { autoAlpha: 1, y: 0 });
    years[0].classList.add("is-active");
    let activeIndex = 0;
    gsap.set(drawables, { drawSVG: "0%" });
    // 3) Инициализация штриховки для «рисования»
    //    Считаем длины всех элементов, строим префиксные суммы для последовательной прорисовки «слева направо»
    const lengths = drawables.map((el) => {
      try {
        return typeof el.getTotalLength === "function"
          ? el.getTotalLength()
          : 0;
      } catch {
        return 0;
      }
    });

    const totalLength = lengths.reduce((a, b) => a + b, 0);
    const prefix = [];
    lengths.reduce((acc, len) => (prefix.push(acc), acc + len), 0);

    // drawables.forEach((el, i) => {
    //   const L = Math.max(0.0001, lengths[i]);
    //   el.style.fill = el.style.fill || "none";
    //   el.style.strokeDasharray = L;
    //   el.style.strokeDashoffset = L;
    //   el.style.vectorEffect = "non-scaling-stroke";

    //   // убираем stroke на старте
    //   el.dataset.origStroke = getComputedStyle(el).stroke || "#fff";
    //   el.style.stroke = "none";
    // });

    gsap.to(drawables, {
      drawSVG: "100%",
      duration: 1.2,
      stagger: 0.02,
      ease: "power1.out",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
      },
    });
    function drawProgress(progress) {
      const drawn = totalLength * gsap.utils.clamp(0, 1, progress);

      gsap.to(lineEl, { scaleX: progress, duration: 0.6, ease: "power2.out" });
    }

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

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      scrub: true,
      pin: true,
      pinSpacing: true,
      // expectPin: 1,
      // anticipatePin: 1,
      // markers: true,
      onUpdate: (self) => {
        const p = self.progress;
        drawProgress(p);

        // выбор активного «года» по ближайшему шагу
        const idx = steps.reduce(
          (acc, s, i) => (Math.abs(p - s) < Math.abs(p - steps[acc]) ? i : acc),
          0
        );
        if (idx !== activeIndex) switchText(idx);
      },
    });

    // лёгкий въезд заголовка
    gsap.from(section.querySelector(".section__title"), {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    });

    // Если где-то нужно программно прыгнуть к шагу:
    // goToStep(2);
  };
  historyAnimation();

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
  const advAnim = () => {
    const items = document.querySelectorAll(".advantages-item");

    // Определяем desktop
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      // ----- Табы для ПК -----
      items.forEach((item) => {
        const title = item.querySelector(".advantages-item__title");
        const svg = item.querySelector(".advantages-item__image");

        if (title) {
          title.addEventListener("click", () => {
            // снимаем активность со всех
            items.forEach((el) => el.classList.remove("js-active"));
            // добавляем активность на текущий
            item.classList.add("js-active");

            // запускаем анимацию svg
            if (svg) animateSVG(svg);
          });
        }
      });
    } else {
      // ----- Для мобилы: анимация при скролле -----
      items.forEach((item) => {
        const svg = item.querySelector(".advantages-item__image");
        if (!svg) return;

        // IntersectionObserver — запускаем анимацию, когда svg попадает в область видимости
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateSVG(svg);
                observer.unobserve(svg); // один раз
              }
            });
          },
          { threshold: 0.2 }
        );

        observer.observe(svg);
      });
    }
  };
  advAnim();

  document.querySelectorAll(".clip-path-right").forEach((section) => {
    const img = section.querySelector("img");

    if (!img) return;
    // параллакс-скейл по скроллу
    gsap.fromTo(
      img,
      {
        scale: 1.3,
        yPercent: -15,
        ease: "none",
      },
      {
        yPercent: 15,
        ease: "none",
        scale: 1.3,
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // когда верх блока дотронется до низа окна
          end: "bottom top", // пока блок не выйдет вверх
          scrub: true, // синхронизация с прокруткой
          // markers: true
        },
      }
    );

    // одноразовое раскрытие маски
    ScrollTrigger.create({
      trigger: section,
      start: "top 40%",
      once: true,
      onEnter: () => {
        section.classList.add("js-animated");
      },
    });
  });

  gsap.to(".questions__left", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.6,
    ease: "power3.out",

    scrollTrigger: {
      trigger: ".questions",
      start: "top 40%", // когда секция на 80% экрана
    },
  });

  // Анимация отрисовки всех path в svg
  gsap.utils.toArray("#svg path").forEach((path) => {
    gsap.from(path, {
      drawSVG: "0%", // начинаем с пустого контура
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#map",
        start: "top 40%", // запуск при появлении карты
      },
    });
  });

  // Можно анимировать маркер (pin)
  gsap.from(".map__pin", {
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.3,
    scrollTrigger: {
      trigger: "#map",
      start: "top 40%",
    },
  });

  // Анимация элементов футера
  gsap.from(".footer__item", {
    y: 50,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 40%",
    },
  });

  // Для мобильного svg
  gsap.utils.toArray(".footer__title-svg--mobile path").forEach((path, i) => {
    gsap.from(path, {
      drawSVG: "0%",
      duration: 0.8,
      ease: "power2.out",
      delay: i * 0.03,

      scrollTrigger: {
        trigger: ".footer__title-svg--mobile",
        start: "top 90%",
      },
    });
  });

  gsap.to(
    ".footer__title path",
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: { each: 0.1, from: "start" },

      scrollTrigger: {
        trigger: ".footer__title",
        start: "top 90%",
      },
    },
    "=-0.5"
  );

  (() => {
    const RADIUS = 60;

    document
      .querySelectorAll(".production-slide__image-container")
      .forEach((container) => {
        const img = container.querySelector(".production-slide__image");

        function onMove(e) {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          img.style.webkitMaskImage = `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, transparent 100%, black 100%)`;
        }

        function onLeave() {
          img.style.webkitMaskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, black 0%)`;
        }

        container.addEventListener("mousemove", onMove);
        container.addEventListener("mouseleave", onLeave);
      });
  })();

  document.querySelectorAll(".clip-path-right-init").forEach((section) => {
    const img = section.querySelector("img");

    if (!img) return;

    // подготовка: скрываем за маской и задаём начальный масштаб
    gsap.set(section, {
      overflow: "hidden",
      clipPath: "inset(0% 0% 0% 100%)", // закрыто справа
    });
    gsap.set(img, { scale: 1 }); // начальный масштаб

    // параллакс-скейл по скроллу
    gsap.fromTo(
      img,
      {
        scale: 1.3,
        yPercent: -15,
        ease: "none",
      },
      {
        yPercent: 15,
        ease: "none",
        scale: 1.3,
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // когда верх блока дотронется до низа окна
          end: "bottom top", // пока блок не выйдет вверх
          scrub: true, // синхронизация с прокруткой
          // markers: true
        },
      }
    );

    // одноразовое раскрытие маски без ScrollTrigger
    gsap.to(section, {
      clipPath: "inset(0% 0% 0% 0%)", // раскрываем маску
      ease: "power4.inOut",
      duration: 0.7,
      delay: 0.2, // можно добавить небольшую задержку
    });
  });

  document
    .querySelectorAll(".clip-path-right-wihout-parallax")
    .forEach((section) => {
      const img = section.querySelector("img");

      if (!img) return;

      // подготовка: скрываем за маской
      gsap.set(section, {
        overflow: "hidden",
        clipPath: "inset(0% 0% 0% 100%)", // закрыто справа
      });

      // анимация раскрытия
      gsap.to(section, {
        clipPath: "inset(0% 0% 0% 0%)", // полностью открыто
        ease: "power4.inOut",
        duration: 0.7,
        delay: 0.2, // опционально
      });
    });
});

class StatsListing {
  constructor(rootSelector) {
    // Ищем все элементы, а не только один
    this.roots = document.querySelectorAll(rootSelector);
    if (!this.roots.length) return;

    this.rotationIncrement =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--rotation-increment")
          .replace("deg", "")
      ) || 30;

    this.isAnimating = false;

    this.items = [];

    this.roots.forEach((root) => {
      const itemData = {
        root,
        items: [...root.querySelectorAll("[data-stats-listing-item]")].map(
          (item) => {
            const cta = item.querySelector("[data-stats-listing-cta]");
            const images = [
              ...item.querySelectorAll("[data-stats-listing-image]"),
            ].map((wrapper, index) => {
              const jsIndex = index + 1;
              const image = wrapper.querySelector(
                "[data-stats-listing-image_el]"
              );

              // Проставляем index и js-index сразу
              wrapper.style.setProperty("--index", jsIndex);
              wrapper.style.setProperty("--js-index", jsIndex);

              return {
                index: jsIndex,
                jsIndex,
                wrapper,
                image,
              };
            });

            return {
              item,
              cta,
              images,
              currentIndex: 1,
              clickTimeout: null,
            };
          }
        ),
      };

      this.items.push(itemData);
    });

    this.bindEvents();
  }

  bindEvents() {
    this.items.forEach(({ items }) => {
      items.forEach(({ cta, images }) => {
        if (cta && images.length > 1) {
          cta.addEventListener("click", (e) => this.handleClick(e));
        }
      });
    });
  }

  handleClick(event) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const dataItem = this.items
      .flatMap(({ items }) => items)
      .find(({ cta }) => cta === event.currentTarget);
    if (!dataItem) return;

    dataItem.item.classList.add("is-clicked");
    if (dataItem.clickTimeout) clearTimeout(dataItem.clickTimeout);
    dataItem.clickTimeout = setTimeout(() => {
      dataItem.item.classList.remove("is-clicked");
    }, 3000);

    this.nextImage(dataItem);
  }

  nextImage(data) {
    data.currentIndex = (data.currentIndex % data.images.length) + 1;
    this.updateImages(data);
  }

  updateImages(data) {
    const { images, currentIndex } = data;
    const total = images.length;

    images.forEach((img) => {
      img.jsIndex = ((img.index - currentIndex + total) % total) + 1;
      img.wrapper.style.setProperty("--js-index", img.jsIndex);
    });

    // Плавная анимация через opacity и scale (повороты делает CSS)
    const last = images[images.length - 1];
    this.fadeOutAndReorder(last);
  }

  fadeOutAndReorder(last) {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        this.isAnimating = false;
      },
    });

    tl.to(last.image, { duration: 0.3, opacity: 0, scale: 1.1 })

      .set(last.wrapper, {
        "--js-index": last.jsIndex,
      })
      .to(last.image, { duration: 0.3, opacity: 1, scale: 1 });
  }
}

window.addEventListener("load", () => {
  new StatsListing(".stats-item__listing");
});

// 404

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(
    ".error-page__right svg path",
    {
      duration: 1.5,
      drawSVG: 0,
      opacity: 0,
    },
    "-=1.2"
  );

  tl.from(
    ".error-page__buttons",
    {
      duration: 0.8,
      opacity: 0,
      y: 40,
      stagger: 0.2,
    },
    "-=0.6"
  );

  tl.from(
    ".error-page__links",
    {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.1,
    },
    "-=0.4"
  );
  tl.from(
    ".error-page__picture path",
    {
      duration: 1.5,
      stagger: 0.015,
      drawSVG: 0,
      opacity: 0,
    },
    0
  );
});

const animStats = () => {
  const statsSection = document.querySelector(".stats");
  if (!statsSection) return;
  const values = statsSection.querySelectorAll(".stats-item");

  if (values.length) {
    values.forEach((value) => {
      gsap.fromTo(
        value,
        { "--progress": 0 },
        {
          "--progress": 1,
          ease: "none",
          scrollTrigger: {
            // markers: true,
            trigger: value,
            start: "top bottom",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    });
  }
  // ScrollTrigger.create({
  //   trigger: statsSection,
  //   start: "top bottom",
  //   end: "bottom top",
  //   markers: true,
  //   onToggle: (self) => console.log("toggled, isActive:", self.isActive),
  //   onUpdate: (self) => {
  //     console.log(
  //       "progress:",
  //       self.progress.toFixed(3),
  //       "direction:",
  //       self.direction,
  //       "velocity",
  //       self.getVelocity()
  //     );
  //   },
  // });
};
const parallaxImages = () => {
  const images = document.querySelectorAll(".image-with-parallax");

  if (!images.length > 0) return;

  images.forEach((item) => {
    const img = item.querySelector("img");
    gsap.fromTo(
      img,
      {
        scale: 1.2,
        yPercent: -10,
        ease: "none",
      },
      {
        yPercent: 10,
        ease: "none",
        scale: 1.2,
        scrollTrigger: {
          trigger: item,
          start: "top bottom", // когда верх блока дотронется до низа окна
          end: "bottom top", // пока блок не выйдет вверх
          scrub: true, // синхронизация с прокруткой
          // markers: true
        },
      }
    );
  });
};

window.addEventListener("load", () => {
  animStats();
  parallaxImages();
});
