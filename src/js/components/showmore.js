class DescriptionGridToggle {
  constructor(options = {}) {
    this.settings = Object.assign(
      {
        row: ".product-card__row",
        left: ".product-card__chars",
        description: ".product-card__description",
        button: ".product-card__showmore",
        breakpoint: 1024,
      },
      options
    );

    this.init();
  }

  init() {
    document.querySelectorAll(this.settings.row).forEach((row, index) => {
      const left = row.querySelector(this.settings.left);
      const desc = row.querySelector(this.settings.description);
      const btn = row.querySelector(this.settings.button);

      if (!left || !desc || !btn) return;

      const wrapper = desc.querySelector(".product-card__description-wrapper");
      if (!wrapper) return;

      let isOpen = false;
      const closeText = btn.textContent.trim();
      const openText = btn.dataset.text || "Скрыть";

      const collapse = () => {
        desc.style.maxHeight = left.getBoundingClientRect().height + "px";
        desc.classList.remove("is-open");
      };

      const expand = () => {
        desc.style.maxHeight = desc.scrollHeight + "px";
        desc.classList.add("is-open");
      };

      const reset = () => {
        desc.style.maxHeight = "";
        btn.style.display = "none";
        isOpen = false;
        desc.classList.remove("is-open");
        btn.textContent = closeText;
        btn.setAttribute("aria-expanded", "false");
      };

      const update = () => {
        if (window.innerWidth <= this.settings.breakpoint) {
          reset();
          return;
        }

        const leftHeight = left.getBoundingClientRect().height;
        const contentHeight = wrapper.scrollHeight + btn.offsetHeight;

        if (contentHeight <= leftHeight) {
          reset();
          btn.style.display = "none";
          return;
        }

        btn.style.display = "";

        if (!isOpen) collapse();
      };

      // aria
      const id = desc.id || `desc-${index}`;
      desc.id = id;
      btn.setAttribute("aria-controls", id);

      btn.addEventListener("click", () => {
        if (!isOpen) {
          expand();
          btn.textContent = openText;
          btn.setAttribute("aria-expanded", "true");
        } else {
          collapse();
          btn.textContent = closeText;
          btn.setAttribute("aria-expanded", "false");
        }
        isOpen = !isOpen;
      });

      update();
      window.addEventListener("resize", update);
    });
  }
}

new DescriptionGridToggle();
