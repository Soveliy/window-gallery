import NiceSelect from "nice-select2";
document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".catalog__select");

  selects.forEach((select) => {
    const selectPlaceholder = select.dataset.placeholder;
    NiceSelect.bind(select, {
      searchable: false,
      placeholder: selectPlaceholder,
    });
  });
});
