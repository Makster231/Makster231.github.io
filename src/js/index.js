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

  video1.on("play", (event) => {
    body.classList.add("js_active_video");
  });
  video1.on("pause", (event) => {
    body.classList.remove("js_active_video");
  });

  function isFullScreen() {
    return window.screenTop == 0 ? true : false;
  }

  document.addEventListener("fullscreenchange", function () {
    if (!isFullScreen()) {
      body.classList.add("js_load");
    } else {
      setInterval(() => {
        body.classList.remove("js_load");
      }, 20);
    }
  });

  // Показываем страницу после загрузки
  body.classList.remove("js_load");
  body.style.opacity = 1;
});
