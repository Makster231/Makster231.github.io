// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });

// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

import LazyLoad from "./modules/lazyLoad.js";
import Modal from "./modules/modal";

window.addEventListener("load", function () {
  // Переменные
  const body = document.querySelector("body");
  const dialog3 = document.querySelector(".js_dialog3");
  const images = document.querySelectorAll("img[data-src]");

  const swiper = document.querySelector(".js_swiper");

  // Запускаем функционал

  // Ленивая загрузка
  if (images) {
    new LazyLoad(images, {
      root: null,
      // За сколько px или % загружать изображения
      rootMargin: "100px",
    });
  }
  if (swiper) {
    const mySwiper = new Swiper(".js_swiper", {
      // Optional parameters
      slidesPerView: 1,
      spaceBetween: 0,
      direction: "vertical",
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      parallax: true,
      keyboard: {
        enabled: true,
      },
      // allowTouchMove: false,

      pagination: {
        el: ".js_aside_controlls-pagination",
        type: "fraction",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".js_aside_controlls-btns .next",
        prevEl: ".js_aside_controlls-btns .prev",
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".js_aside_controlls-scrollbar",
      },

      // === new change
      runCallbacksOnInit: true,

      on: {},
    });

    const headerMenu = document.querySelector(".js_header_menu");

    headerMenu.addEventListener("click", function (e) {
      if (!e.target.classList.contains("js_header_menu-item")) return;

      if (e.target.dataset.role === "about") mySwiper.slideTo(0);
      if (e.target.dataset.role === "portfolio") mySwiper.slideTo(1);
      if (e.target.dataset.role === "skills") mySwiper.slideTo(2);
      if (e.target.dataset.role === "contact") mySwiper.slideTo(3);
    });
  }

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
  //       const swiperLeads = new Swiper(".js_swiper-leads", {
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
