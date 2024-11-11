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

  function runExample() {
    const step_questions_btns_btn = document.querySelectorAll(
      ".js_importants_list_btn"
    );
    step_questions_btns_btn.forEach((btn) => {
      btn.dataset.img =
        window.location.origin +
        "/build" +
        btn.dataset.img +
        (isMobile ? "-m.jpg" : ".jpg");

      const link = document.createElement("link");
      link.setAttribute("as", "image");
      link.setAttribute("rel", "preload");
      link.setAttribute("href", btn.dataset.img);
      document.head.appendChild(link);
    });
  }

  setTimeout(() => {
    runExample();
  }, 2000);

  // Показываем страницу после загрузки
  body.classList.remove("js_load");
  body.style.opacity = 1;
});
