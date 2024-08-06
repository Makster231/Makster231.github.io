// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });

// import Swiper bundle with all modules installed
// import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

import LazyLoad from "./modules/lazyLoad.js";
import Modal from "./modules/modal";

window.addEventListener("load", function () {
  // Переменные
  const body = document.querySelector("body");
  const dialog3 = document.querySelector(".js_dialog3");
  const images = document.querySelectorAll("img[data-src]");
  // Запускаем функционал

  // Ленивая загрузка
  if (images)
    new LazyLoad(images, {
      root: null,
      // За сколько px или % загружать изображения
      rootMargin: "100px",
    });

  // Модальные окна
  // if (dialog3) {
  //   const dialog3Btn = document.querySelectorAll(".js_dialog3_open");
  //   new Modal(dialog3, {
  //     openBtn: dialog3Btn,
  //   });
  //   let activeSlideInit = 0;

  //   dialog3Btn.forEach((item) => {
  //     item.addEventListener("click", function (e) {
  //       activeSlideInit = e.target.dataset.slide;
  //       const swiperLeads = new Swiper(".js_slider-leads", {
  //         effect: "cards",
  //         grabCursor: false,
  //         initialSlide: activeSlideInit,
  //         cardsEffect: {
  //           perSlideOffset: 10,
  //         },

  //         navigation: {
  //           nextEl: ".swiper-button-next",
  //           prevEl: ".swiper-button-prev",
  //         },
  //       });
  //     });
  //   });
  // }

  // Показываем страницу после загрузки
  body.style.opacity = 1;
});
