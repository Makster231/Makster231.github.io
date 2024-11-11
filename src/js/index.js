// import isAvifWebp from "avif-webp-checker";
// isAvifWebp({ mode: "webp", webpClass: "mywebpclass" });

import lazyLoad from "./modules/lazyLoad.js";
import Modal from "./modules/modal";
import steps from "./modules/steps";
import finalSteps from "./modules/finalSteps";
import inputMasks from "./modules/input-masks.js";
import requestForm from "./modules/requestForm.js";
import video from "./modules/video.js";

window.addEventListener("load", function () {
  // Переменные
  const body = document.querySelector("body");
  const isMobile = window.innerWidth <= 640;

  steps();
  finalSteps();
  inputMasks();
  requestForm();
  lazyLoad();
  video();

  window.addEventListener("change", function () {
    body.classList.add("js_load");
    setTimeout(() => {
      body.classList.remove("js_load");
    }, 50);
  });

  // function imageLoaded(src, alt = "image") {
  //   return new Promise(function (resolve) {
  //     const image = document.createElement("img");

  //     image.setAttribute("alt", alt);
  //     image.setAttribute("src", src);

  //     image.addEventListener("load", function () {
  //       resolve(image);
  //     });
  //   });
  // }

  const step_questions_btns_btn = document.querySelectorAll(
    ".js_importants_list_btn"
  );
  const arr = [];
  const preloadedImages = [];

  function runExample() {
    step_questions_btns_btn.forEach((btn) => {
      btn.dataset.img =
        window.location.origin +
        "/build" +
        btn.dataset.img +
        (isMobile ? "-m.jpg" : ".jpg");

      arr.push(btn.dataset.img);
    });
  }

  console.log(112323);

  function preloadImages(arr, urls) {
    arr = urls.map((url) => {
      let img = new Image();
      img.src = url;
      img.onload = () =>
        console.log(`image url [${url}] has been loaded successfully`);

      return img;
    });
  }

  runExample();
  preloadImages(preloadedImages, arr);
  // Показываем страницу после загрузки
  body.classList.remove("js_load");
  body.style.opacity = 1;
});
