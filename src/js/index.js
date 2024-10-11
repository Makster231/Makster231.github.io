// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });

// import Swiper bundle with all modules installed
// import Swiper from "swiper/bundle";
// import styles bundle
// import "swiper/css/bundle";

import LazyLoad from "./modules/lazyLoad.js";
import Modal from "./modules/modal";
import steps from "./modules/steps";
import finalSteps from "./modules/finalSteps";

window.addEventListener("load", function () {
  // Переменные
  const body = document.querySelector("body");
  const images = document.querySelectorAll("img[data-src]");

  steps();
  finalSteps();

  var plyr_options = {
    // autoplay: true,
    // clickToPlay: true,
    // showPosterOnEnd: true,
    // controls: ["play"],
    // controls: ["mute", "progress", "play"],
  };

  const video1 = new Plyr("#video-1", plyr_options);
  const video2 = new Plyr("#video-2", plyr_options);
  const video3 = new Plyr("#video-3", plyr_options);
  const video4 = new Plyr("#video-4", plyr_options);
  const video5 = new Plyr("#video-5", plyr_options);

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  // Показываем страницу после загрузки
  body.classList.remove("js_load");
  body.style.opacity = 1;
});
