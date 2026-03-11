import marquee from "vanilla-marquee";

window.addEventListener("load", () => {
  new marquee(document.querySelector("[data-marq-left]"), {
    speed: 50,
    pauseOnHover: true,
    duplicated: true,
    startVisible: true,
  });
  new marquee(document.querySelector("[data-marq-right]"), {
    speed: 50,
    direction: "right",
    pauseOnHover: true,
    duplicated: true,
    startVisible: true,
  });
});
