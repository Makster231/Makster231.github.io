// import isAvifWebp from "avif-webp-checker";
// isAvifWebp({ mode: "webp", webpClass: "mywebpclass" });

import lazyLoad from "./modules/lazyLoad.js";
import Modal from "./modules/modal";
import steps from "./modules/steps";
import finalSteps from "./modules/finalSteps";
import inputMasks from "./modules/input-masks.js";
import requestForm from "./modules/requestForm.js";

window.addEventListener("load", function () {
  // Переменные
  const body = document.querySelector("body");
  const images = document.querySelectorAll("img[data-src]");

  steps();
  finalSteps();
  inputMasks();
  requestForm();
  lazyLoad();

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

  // Показываем страницу после загрузки
  body.classList.remove("js_load");
  body.style.opacity = 1;
});
