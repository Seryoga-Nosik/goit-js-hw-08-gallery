import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxContant: document.querySelector('.lightbox__content'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);

refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

refs.gallery.addEventListener('click', onModalOpen);
refs.lightboxCloseBtn.addEventListener('click', onModalClose);
refs.lightboxOverlay.addEventListener('click', onModalClose);
refs.lightboxContant.addEventListener('click', onNextImgEl);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
        data-source="${original}"/>
        </a>
        </li>`;
    })
    .join('');
}

function onModalOpen(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  refs.lightbox.classList.add('is-open');
  refs.lightboxImg.src = e.target.dataset.source;
  refs.lightboxImg.alt = e.target.alt;
  window.addEventListener('keydown', onEscClose);
  window.addEventListener('keydown', onArrowPress);
}

function onModalClose(e) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
  refs.lightboxImg.alt = '';
  window.removeEventListener('keydown', onEscClose);
  window.removeEventListener('keydown', onArrowPress);
}

function onEscClose(e) {
  if (e.code === 'Escape') {
    onModalClose();
  }
}

// let currentIndex = 1;

// function onKeyPress(e) {
//   if (e.code === 'ArrowLeft') {
//     currentIndex -= 1;
//   } else if (e.code === 'ArrowRight') {
//     currentIndex += 1;
//   }
//   if (currentIndex > galleryItems.length) {
//     currentIndex = 0;
//   }

//   setModalImage(currentIndex);
// }

// function setModalImage(index) {
//   refs.lightboxImg.src = galleryItems[index].original;
//   refs.lightboxImg.alt = galleryItems[index].description;
// }
// ============================================================================

function onArrowPress(event) {
  if (event.code === 'ArrowRight') {
    onNextImgEl();
  }
  if (event.code === 'ArrowLeft') {
    onPrevImgEl();
  }
}

let images = document.querySelectorAll('.gallery__image');

let currentIndex = 0;

function onNextImgEl(e) {
  for (let i = 0; i < images.length; i += 1) {
    if (images[i].alt === refs.lightboxImg.alt) {
      currentIndex = i + 1;
      if (currentIndex > images.length - 1) {
        currentIndex = 0;
      }
      setModalImage(currentIndex);
      return;
    }
  }
}

function onPrevImgEl(e) {
  for (let i = 0; i < images.length; i += 1) {
    if (images[i].alt === refs.lightboxImg.alt) {
      currentIndex = i - 1;
      if (currentIndex < 0) {
        currentIndex = images.length - 1;
      }
      setModalImage(currentIndex);
      return;
    }
  }
}

function setModalImage(index) {
  refs.lightboxImg.src = galleryItems[index].original;
  refs.lightboxImg.alt = galleryItems[index].description;
}
