import * as galleryItems from "./gallery-items.js";

const galleryArray = galleryItems.default;

const galleryList = document.querySelector(".js-gallery");

const liRefs = galleryArray.map(({ ...galleryArray }) => {
  const makeLi = document.createElement("li");
  makeLi.classList.add("gallery__item");

  const makeLink = document.createElement("a");
  makeLink.classList.add("gallery__link");
  makeLink.setAttribute("href", galleryArray.original);

  const makeImg = document.createElement("img");
  makeImg.classList.add("gallery__image");
  makeImg.setAttribute("src", galleryArray.preview);
  makeImg.setAttribute("data-source", galleryArray.original);
  makeImg.setAttribute("alt", galleryArray.description);

  makeLi.append(makeLink);
  makeLink.append(makeImg);
  return makeLi;
});

galleryList.append(...liRefs);

function galleryListHandler(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const lightBoxRef = document.querySelector(".js-lightbox");
  lightBoxRef.classList.add("is-open");

  const bigImg = document.querySelector(".lightbox__image");
  bigImg.setAttribute("src", event.target.dataset.source);

  const closeLightboxBtn = document.querySelector(
    'button[data-action="close-lightbox"]'
  );

  function onCloseLightbox() {
    lightBoxRef.classList.remove("is-open");
  }

  closeLightboxBtn.addEventListener("click", () => {
    onCloseLightbox();
    bigImg.setAttribute("src", "");
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      onCloseLightbox();
    }
  });

  const lightboxOverley = document.querySelector(".lightbox__overlay");
  lightboxOverley.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      onCloseLightbox();
    }
  });
}

galleryList.addEventListener("click", galleryListHandler);
