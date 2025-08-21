import { validateForms } from "../functions/validate-forms.js";
import MicroModal from "micromodal";

MicroModal.init({
  disableScroll: true,
  disableFocus: true,
  onClose: (modalEl) => {
    console.log("close");
  },
});
// const rules1 = [
//   {
//     ruleSelector: ".form__input--name",
//     rules: [
//       {
//         rule: "minLength",
//         value: 3,
//       },
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Заполните имя!",
//       },
//     ],
//   },
//   {
//     ruleSelector: ".form__input--phone",
//     tel: true,
//     telError: "Введите корректный телефон",
//     rules: [
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Заполните телефон!",
//       },
//     ],
//   },
// ];

// const afterForm = () => {
//   MicroModal.close("callback");
//   MicroModal.show("thanks");
//   setTimeout(() => {
//     document.querySelector("body").removeAttribute("style");
//     MicroModal.close("thanks");
//   }, 5000);
// };

// validateForms(".form--modal", rules1, [], afterForm);
