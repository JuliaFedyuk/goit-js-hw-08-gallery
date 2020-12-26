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

const lightBoxRef = document.querySelector(".js-lightbox");
const bigImg = document.querySelector(".lightbox__image");
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightboxOverley = document.querySelector(".lightbox__overlay");

function galleryListHandler(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightBoxRef.classList.add("is-open");
}

function openBigImage(event) {
  bigImg.setAttribute("src", event.target.dataset.source);
}

function closeLightBoxByBtn(event) {
  onCloseLightbox();
  clearCashMemory();
  console.log(event.target);
}

function closeLightBoxByEsc(event) {
  if (event.code === "Escape") {
    onCloseLightbox();
    clearCashMemory();
  }
}

function closeLightBoxByClick(event) {
  if (event.target === event.currentTarget) {
    onCloseLightbox();
    clearCashMemory();
  }
}

function onCloseLightbox() {
  lightBoxRef.classList.remove("is-open");
}

function clearCashMemory() {
  bigImg.setAttribute("src", "");
}

galleryList.addEventListener("click", galleryListHandler);

galleryList.addEventListener("click", openBigImage);

closeLightboxBtn.addEventListener("click", closeLightBoxByBtn);

window.addEventListener("keydown", closeLightBoxByEsc);

lightboxOverley.addEventListener("click", closeLightBoxByClick);
