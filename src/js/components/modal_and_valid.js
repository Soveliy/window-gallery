import { validateForms } from "../functions/validate-forms.js";
import MicroModal from "micromodal";
import { Fancybox } from "@fancyapps/ui";
Fancybox.bind("[data-fancybox]", {
  // Your custom options
});
MicroModal.init({
  disableScroll: true,
  disableFocus: true,
  onClose: (modalEl) => {
    console.log("close");
  },
});
const rules1 = [
  {
    ruleSelector: "#c-name",
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
    ruleSelector: "#c-phone",
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
    ruleSelector: "#q-name",
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
    ruleSelector: "#q-phone",
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
  MicroModal.close();
  const thanks = document.querySelector(".thanks-window");
  if (thanks) {
    thanks.classList.add("js-active");
    setTimeout(() => {
      thanks.classList.remove("js-active");
    }, 3000);
  }
};

validateForms(".modal__form", rules1, [], afterForm);
validateForms(".questions__form ", rules2, [], afterForm);
