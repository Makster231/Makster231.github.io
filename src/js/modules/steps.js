import WheelIndicator from "./wheel-indicator.js";

export default function steps() {
  // ---------------------- CONSTS ----------------------
  const body = document.getElementById("body");
  const wrapper = document.querySelector(".wrapper");
  const progressBar = document.querySelector(".js_progress_bar");
  //  BTNS
  const all_btns = document.querySelectorAll(".js_btn");
  const step_0_btn = document.querySelector(".js_btn_start");

  const step_last_btns = document.querySelectorAll(".js_step_last_btn");
  const step_questions_btns = document.querySelectorAll(".js_importants_list");
  const step_questions_btns_btn = document.querySelectorAll(
    ".js_importants_list_btn"
  );

  const step_next_btns = document.querySelectorAll(".js_step_next_btn");

  const step_questions2_btns_change = document.querySelectorAll(
    ".js_step_questions2_top-change"
  );
  const step_questions2_cards = document.querySelectorAll(
    ".js_step_questions2_cards"
  );

  // Проверка на тач скрины
  const isTouchEnabled = () =>
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  //  step 2 btns state
  let data_info = {
    step_questions_values: [],
    step_questions2_values: [],
    // step_questions_values: ["1", "1", "1", "1"],
    // step_questions2_values: ["1", "1", "1", "1"],
  };

  let isMobile = window.innerWidth <= 640;
  let isMobileLandScape =
    !window.matchMedia("(orientation: portrait)").matches && isMobile;

  //  Step
  // let level = 1;
  // let step = 3;
  // let firstLoad = 0;
  let level = 0;
  let step = 0;
  let firstLoad = true;
  let progressBarCounter = 0;

  //  Animation flag
  let animationProcessing = false;

  // ---------------------- FUNCTIONS ----------------------

  // One stroke func
  const sleep = (m) => new Promise((r) => setTimeout(r, m));
  const addClass = (block, cls) => block.classList.add(cls);
  const removeClass = (block, cls) => block.classList.remove(cls);
  const setClassState = () => addClass(body, `js_active_${level}_${step}`);
  const progressBarUpdate = () =>
    (progressBar.style.width = (100 / 13) * progressBarCounter + "%");

  function questionBgImagesPreload() {
    step_questions_btns_btn.forEach((btn) => {
      btn.dataset.img =
        window.location.origin +
        btn.dataset.img +
        (isMobile ? "-m.jpg" : ".jpg");

      const link = document.createElement("link");
      link.setAttribute("as", "image");
      link.setAttribute("rel", "preload");
      link.setAttribute("href", btn.dataset.img);
      document.head.appendChild(link);
    });
  }

  const disableAllClikable = () =>
    all_btns.forEach((btn) => btn.setAttribute("disabled", true));
  const enableAllClikable = () =>
    all_btns.forEach((btn) => btn.removeAttribute("disabled"));

  const removeAllStates = () => {
    body.classList.remove(
      ...[
        "js_active_0_0",

        "js_active_1_0",

        "js_active_1_1",
        "js_active_1_2",
        "js_active_1_3",
        // "js_active_1_4",

        "js_active_2_1",
        "js_active_2_2",
        "js_active_2_3",
        // "js_active_2_4",

        "js_active_3_1",
        "js_active_3_2",
        "js_active_3_3",
        // "js_active_3_4",

        "js_active_4_1",
        "js_active_4_2",
        "js_active_4_3",
        // "js_active_4_4",

        "js_active_5_1",
        "js_active_5_2",
      ]
    );
  };

  const stepCalc = (dir) => {
    if (animationProcessing) return;
    if (level === 5 && step === 2) return;

    if (firstLoad) {
      changeSteps(true);
      return;
    }

    // if (step === 3 && !data_info.step_questions2_values[level - 1]) {
    //   console.log(1);
    //   return false;
    // }

    if (dir === "down") {
      console.log(2);
      step++;
    } else {
      console.log(3);
      step--;
    }

    console.log(step);

    if (level === 1 && step === -1) {
      console.log(4);
      step = 0;
      return false;
    }

    if (step === 0) {
      console.log(5);
      step = 1;
      return false;
    }

    if (step > 3) step = 3;

    if (step > 2) {
      console.log(7);
      if (!data_info.step_questions_values[level - 1]) {
        console.log(8);
        step = 2;
        return false;
      }
    }

    // if (level !== 5 && step < 3) {
    //   console.log(9);
    //   if (data_info.step_questions_values[level - 1]) {
    //     console.log(10);
    //     step = 3;
    //     return false;
    //   }
    // }

    if (level === 5 && step === 2) {
      console.log(11);
      if (data_info.step_questions_values[level - 1]) {
        console.log(12);
        step = 3;
        return false;
      }
    }

    console.log(13);
    return true;
  };

  const changeSteps = async (changeLvl = false) => {
    // Проверка на завершенность анимации ИЛи телефон в перевернутом режиме
    if (animationProcessing || isMobileLandScape) return;

    // Запускаем анимацию (кнопки, свайп и прокрутка не работают)
    animationProcessing = true;
    // БЛокируем кнопки
    disableAllClikable();

    // Если меняем уровень то обнуляем шаги и увеличиваем уровень
    if (changeLvl) {
      step = 1;
      firstLoad ? (level = 1) : level++;
      firstLoad ? questionBgImagesPreload() : false;

      // document.getElementById(`video-poster-${level}`).play();
      // document.getElementById(`video-${level}`).load();

      removeClass(body, "js_aside_animation");
      await sleep(50);
      addClass(body, "js_aside_animation");
    }

    // Удаление Всех классов состояний
    removeAllStates();

    // Если меняем этаж
    if (changeLvl) {
      // Добавляем классы
      addClass(body, `js_active_lvl_${level}`);
      // Если не мобильный, то доб анимацию для десктоп
      if (!isMobile) addClass(body, `lift`);
      addClass(body, `js_change_lvl`);
      addClass(body, `js_content_animation_hidden`);
      // Удаляем классы
      removeClass(body, `js_active_lvl_${level - 1}`);
    }

    // задаем состояние уровня Слайда
    setClassState();

    await sleep(1000);
    enableAllClikable();

    //  Анимация
    if (changeLvl) await sleep(isMobile ? 3500 : 2200);

    firstLoad = false;
    enableAllClikable();
    // Завершаем Анимацию
    animationProcessing = false;
    if (isMobile) removeClass(body, "js_aside_animation");
    removeClass(body, `js_change_lvl`);
    removeClass(body, `js_content_animation_hidden`);
    progressBarUpdate();

    if (changeLvl & !isMobile) {
      await sleep(500);
      removeClass(body, `lift`);
    }
  };

  // ---------------------- BODY SCROLL ----------------------

  const indicator = new WheelIndicator({
    elem: body,
    callback: function (e) {
      // Подсчёт Шага
      let flag = !stepCalc(e.direction);
      if (flag) return;
      // Определение Слайда
      changeSteps();
    },
  });

  indicator.getOption("preventMouse"); // true

  // ---------------------- EVENTS ----------------------
  // ---------------------- STEP 0 ----------------------
  step_0_btn.addEventListener("click", function () {
    // Подсчёт Шага
    let flag = !stepCalc("down");
    if (flag) return;
    // Определение Слайда
    // changeSteps();
  });

  // ---------------------- STEP 1 ----------------------
  step_next_btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Подсчёт Шага
      let flag = !stepCalc("down");
      if (flag) return;
      // Определение Слайда
      changeSteps();
    });
  });

  // ---------------------- STEP 2 ----------------------
  step_questions_btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Проверка на кнопку списка
      if (!e.target.classList.contains("js_importants_list_btn")) return;

      data_info.step_questions_values[level - 1] = e.target.innerText;

      // Подсчёт Шага
      let flag = !stepCalc("down");
      if (flag) return;

      // Меняем слайд
      changeSteps();
    });
  });

  const eventTrigger = isMobile ? "touchstart" : "mouseenter";
  step_questions_btns_btn.forEach((btn) => {
    btn.addEventListener(eventTrigger, function (e) {
      const img = e.target
        .closest(".step_questions_top")
        .querySelector(".step_questions_top-bg img");
      const source = e.target
        .closest(".step_questions_top")
        .querySelector(".step_questions_top-bg source");

      changeImg(isMobile ? img : source, img, e.target.dataset.img);
    });
  });

  async function changeImg(el, animEl, newSrc) {
    if (
      el.srcset.split("/")[el.srcset.split("/").length - 1] ===
      newSrc.split("/")[newSrc.split("/").length - 1]
    )
      return;

    animEl.style.opacity = 0.5;

    el.srcset = newSrc;
    await sleep(300);

    animEl.style.opacity = 1;
  }

  // ---------------------- STEP 3 ----------------------
  step_questions2_cards.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const card = e.target.closest(".js_card");
      // Проверка на клик по карточке
      if (!card) return;

      const cards = e.target
        .closest(".js_step_questions2_cards")
        .querySelectorAll(".js_card");

      cards.forEach((crd) => removeClass(crd, `js_active`));

      addClass(card, `js_active`);

      data_info.step_questions2_values[level - 1] = card.dataset.value;

      // Подсчёт Шага
      let flag = !stepCalc("down");
      if (flag) return;

      // Определение Слайда
      changeSteps(true);
    });
  });

  step_questions2_btns_change.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Подсчёт Шага
      let flag = !stepCalc("up");
      if (flag) return;
      // Определение Слайда
      changeSteps();
    });
  });

  // ---------------------- STEP 4 ----------------------
  // step_last_btns.forEach((btn) => {
  //   btn.addEventListener("click", function (e) {
  //     // // Подсчёт Шага
  //     let flag = !stepCalc("down");
  //     if (flag) return;

  //     if (step === 2 && level === 5) {
  //       changeSteps();
  //     } else {
  //       changeSteps(true);
  //     }
  //   });
  // });

  // При Изменении размеров экрана
  window.addEventListener("resize", () => {
    isMobile = window.innerWidth <= 640;
    isMobileLandScape =
      !window.matchMedia("(orientation: portrait)").matches && isMobile;
  });

  // Свайп на мобильных устройствах
  // if (isTouchEnabled()) {
  //   let touchstartX = 0;
  //   let touchstartY = 0;
  //   let touchendX = 0;
  //   let touchendY = 0;

  //   // Узнаем направление свайпа
  //   const handleGesture = function (
  //     touchstartX,
  //     touchstartY,
  //     touchendX,
  //     touchendY
  //   ) {
  //     const delx = touchendX - touchstartX;
  //     const dely = touchendY - touchstartY;

  //     if (Math.abs(delx) > Math.abs(dely)) {
  //       if (delx > 0) {
  //         return "right";
  //       } else {
  //         return "left";
  //       }
  //     } else if (Math.abs(delx) < Math.abs(dely)) {
  //       if (dely > 0) {
  //         return "down";
  //       } else {
  //         return "up";
  //       }
  //     } else {
  //       return "tap";
  //     }
  //   };

  //   // Узнаем начальные точки свайпа
  //   body.addEventListener(
  //     "touchstart",
  //     function (event) {
  //       touchstartX = event.changedTouches[0].screenX;
  //       touchstartY = event.changedTouches[0].screenY;
  //     },
  //     false
  //   );

  //   // Узнаем конечные точки свайпа
  //   body.addEventListener(
  //     "touchend",
  //     function (event) {
  //       touchendX = event.changedTouches[0].screenX;
  //       touchendY = event.changedTouches[0].screenY;
  //       let reverseDir = "";

  //       const direction = handleGesture(
  //         touchstartX,
  //         touchstartY,
  //         touchendX,
  //         touchendY
  //       );

  //       if (direction === "tap") return;
  //       if (direction === "up") reverseDir = "down";
  //       if (direction === "down") reverseDir = "up";

  //       // Подсчёт Шага
  //       let flag = !stepCalc(reverseDir);
  //       if (flag) return;

  //       // Определение Слайда
  //       changeSteps();
  //     },
  //     false
  //   );
  // }
}
