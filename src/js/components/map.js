// const svg = document.getElementById("svg");
const svg = document.querySelector(".map__svg");
const map = document.querySelector(".map__inner");
if (map && svg) {
  const tooltip = document.querySelector(".map__tooltip");
  const pins = [...svg.querySelectorAll(".map__pin")];

  const ANCHOR = { x: 20, y: 40 };

  function layoutPins() {
    pins.forEach((pin) => {
      const x = +pin.dataset.x,
        y = +pin.dataset.y;
      const s = +(pin.dataset.scale || 1);
      pin.setAttribute(
        "transform",
        `translate(${x - ANCHOR.x * s},${y - ANCHOR.y * s}) scale(${s})`
      );
      pin.style.cursor = "pointer";
    });
  }

  function openTooltip(pin) {
    tooltip.textContent = pin.dataset.label || "";
    const s = +(pin.dataset.scale || 1);
    const pt = svg.createSVGPoint();
    pt.x = +pin.dataset.x;
    pt.y = +pin.dataset.y - ANCHOR.y * s * 2.2;
    const screen = pt.matrixTransform(svg.getScreenCTM());
    const mapRect = map.getBoundingClientRect();

    tooltip.style.left = screen.x - mapRect.left + "px";
    tooltip.style.top = screen.y - mapRect.top - 6 + "px";
    tooltip.style.display = "block";
  }
  function closeTooltip() {
    tooltip.style.display = "none";
  }

  pins.forEach((pin) =>
    pin.addEventListener("click", (e) => {
      console.log("q");
      e.stopPropagation();

      tooltip.style.display === "block" &&
      tooltip.textContent === pin.dataset.label
        ? closeTooltip()
        : openTooltip(pin);
    })
  );

  document.addEventListener("click", (e) => {
    if (!map.contains(e.target)) closeTooltip();
  });
  window.addEventListener("resize", () => {
    if (tooltip.style.display === "block") {
      const active = pins.find((p) => p.dataset.label === tooltip.textContent);
      if (active) openTooltip(active);
    }
  });

  layoutPins();
}
