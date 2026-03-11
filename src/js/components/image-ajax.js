// const ajaxImage = () => {
//   const card = document.querySelector(".product-card");
//   if (!card) return;

//   const buttons = card.querySelectorAll(".sku-item__input");
//   const imageWrapper = card.querySelector(".product-card__image");

//   const cache = new Map();
//   let currentController = null;

//   const getParams = () => ({
//     colorFasad: card.querySelector('[name="color-fasad"]:checked')?.value || "",
//     colorProfile:
//       card.querySelector('[name="color-profile"]:checked')?.value || "",
//     flaps: card.querySelector('[name="flaps"]:checked')?.value || "",
//     facade: card.querySelector('[name="facade"]:checked')?.value || "",
//   });

//   const preloadAndApply = (data) => {
//     const img = new Image();

//     imageWrapper.classList.add("loading");

//     img.onload = () => {
//       const source = imageWrapper.querySelector("source");
//       const image = imageWrapper.querySelector("img");

//       if (source && data.webp) source.srcset = data.webp;
//       if (image && data.jpg) image.src = data.jpg;

//       imageWrapper.href = data.jpg;
//       imageWrapper.classList.remove("loading");
//     };

//     img.onerror = () => {
//       imageWrapper.classList.remove("loading");
//     };

//     img.src = data.jpg;
//   };

//   const loadImage = () => {
//     const params = getParams();
//     const cacheKey = JSON.stringify(params);
//     console.log(params);
//     console.log(cacheKey);
//     if (cache.has(cacheKey)) {
//       preloadAndApply(cache.get(cacheKey));
//       return;
//     }

//     if (currentController) {
//       currentController.abort();
//     }

//     currentController = new AbortController();
//     imageWrapper.classList.add("loading");

//     fetch("/local/ajax/product_image.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(params),
//       signal: currentController.signal,
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         if (!data.success) return;

//         cache.set(cacheKey, data);
//         preloadAndApply(data);
//       })
//       .catch((err) => {
//         if (err.name !== "AbortError") {
//           console.error(err);
//         }
//       })
//       .finally(() => {
//         imageWrapper.classList.remove("loading");
//       });
//   };

//   buttons.forEach((btn) => {
//     btn.addEventListener("change", loadImage);
//   });
// };

// window.addEventListener("load", ajaxImage);
