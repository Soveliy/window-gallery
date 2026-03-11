import { validateForms } from "../functions/validate-forms.js";
import MicroModal from "micromodal";
import { Fancybox } from "@fancyapps/ui";
import { lenis } from "./animation.js";
Fancybox.bind("[data-fancybox]", {
  // Your custom options
});
const thanksClose = document.querySelector(".thanks-window__close-icon");
if (thanksClose) {
  thanksClose.addEventListener("click", () => {
    const thanks = document.querySelector(".thanks-window");
    if (thanks) {
      thanks.classList.remove("js-active");
    }
  });
}

const rules1 = [
  {
    ruleSelector: "#qu-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: "#qu-phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];

const rules2 = [
  {
    ruleSelector: "#ok-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: "#ok-phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];

const rules3 = [
  {
    ruleSelector: "#de-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: "#de-phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];

const rules4 = [
  {
    ruleSelector: "#us-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: "#us-phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];

const rules5 = [
  {
    ruleSelector: "#sa-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: "#sa-phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];
const afterForm = () => {
  const openForm = document.querySelector(".micromodal-slide.is-open");
  if (openForm) {
    setTimeout(() => {
      MicroModal.close(`${openForm.id}`);
    }, 0);
  }

  const thanks = document.querySelector(".thanks-window");
  if (thanks) {
    thanks.classList.add("js-active");
    setTimeout(() => {
      thanks.classList.remove("js-active");
    }, 10000);
  }
};
window.addEventListener("load", () => {
  MicroModal.init({
    disableScroll: true,
    disableFocus: true,
    onShow: (modalEl) => {
      if (!document.querySelector("body").classList.contains("is_admin")) {
        lenis.stop();
      }
    },
    onClose: (modalEl) => {
      if (!document.querySelector("body").classList.contains("is_admin")) {
        lenis.start();
      }
    },
  });
  validateForms("#question", rules1, [], afterForm);
  validateForms("#okna", rules2, [], afterForm);
  validateForms("#dealer", rules3, [], afterForm);
  validateForms("#uslugi", rules4, [], afterForm);
  validateForms("#sales", rules5, [], afterForm);
});
