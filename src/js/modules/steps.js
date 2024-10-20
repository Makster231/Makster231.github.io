import WheelIndicator from "./wheel-indicator.js";

export default function steps() {
  // ---------------------- CONSTS ----------------------
  const body = document.getElementById("body");
  //  BTNS
  const all_btns = document.querySelectorAll(".js_btn");
  const aside_btn = document.querySelector(".js_aside_btn");
  const step_0_btn = document.querySelector(".js_btn_start");

  const step_1_btns = document.querySelectorAll(".js_step_1_btn");
  const step_questions_btns = document.querySelectorAll(".js_importants_list");

  const step_next_btns = document.querySelectorAll(".js_step_next_btn");

  const step_questions2_btns = document.querySelectorAll(
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
  };

  let isMobile = window.innerWidth <= 640;
  let isMobileLandScape =
    !window.matchMedia("(orientation: portrait)").matches && isMobile;

  //  Step
  let step = 0;
  let level = 0;
  let firstLoad = 1;

  //  Animation flag
  let animationProcessing = false;

  // ---------------------- FUNCTIONS ----------------------

  // One stroke func
  const sleep = (m) => new Promise((r) => setTimeout(r, m));
  const addClass = (block, cls) => block.classList.add(cls);
  const removeClass = (block, cls) => block.classList.remove(cls);
  const setClassState = () => addClass(body, `js_active_${level}_${step}`);

  const getCurLvl = () => {
    body.classList.value.split(" ").forEach((el) => {
      if (el.indexOf("js_active_lvl_") === 0) {
        level = el.split("_")[el.split("_").length - 1];
      }
    });

    return +level;
  };

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
        "js_active_1_4",

        "js_active_2_1",
        "js_active_2_2",
        "js_active_2_3",
        "js_active_2_4",

        "js_active_3_1",
        "js_active_3_2",
        "js_active_3_3",
        "js_active_3_4",

        "js_active_4_1",
        "js_active_4_2",
        "js_active_4_3",
        "js_active_4_4",

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

    let flag_start_screen = false;

    dir === "down" ? step++ : step--;

    if (level === 1 && step === -1) {
      step = 0;
      return false;
    }

    if (step === 0) {
      step = 1;
      return false;
    }

    if (step > 4) {
      step = 4;
      return false;
    }

    if (step > 2) {
      if (!data_info.step_questions_values[level - 1]) {
        step = 2;
        return false;
      }
    }

    if (level !== 5 && step < 3) {
      if (data_info.step_questions_values[level - 1]) {
        step = 3;
        return false;
      }
    }

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

      if (isMobile) {
        addClass(body, "js_aside_animation");
      }

      // если моб, то доб анимацию и паузу
      // await sleep(isMobile ? 8500 : 0);
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
    if (changeLvl) {
      await sleep(firstLoad ? 1500 : 3000);
      if (isMobile) {
        await sleep(firstLoad ? 4000 : 3000);
      }
    }

    firstLoad = false;
    enableAllClikable();
    // Завершаем Анимацию
    animationProcessing = false;
    removeClass(body, "js_aside_animation");
    await sleep(isMobile ? 0 : 750);
    removeClass(body, `js_change_lvl`);
    removeClass(body, `js_content_animation_hidden`);

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
  // LVL 1 STEP 0
  step_0_btn.addEventListener("click", function () {
    // Подсчёт Шага
    let flag = !stepCalc("down");
    if (flag) return;
    // Определение Слайда
    // changeSteps();
  });

  // STEP 1
  step_1_btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Подсчёт Шага
      let flag = !stepCalc("down");
      if (flag) return;
      // Определение Слайда
      changeSteps();
    });
  });

  // STEP 2
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

  // STEP 3
  step_next_btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Подсчёт Шага
      let flag = !stepCalc("down");
      if (flag) return;
      // Определение Слайда
      changeSteps();
    });
  });

  // LIFT BTN
  const saveAndGo = () => {
    // Переход на следующий уровень
    let btn_val = document.querySelector(
      `.js_lvl_${level} .js_step_4_cards .js_card.js_active`
    );

    if (btn_val) {
      data_info.step_questions2_values.push(btn_val.dataset.value);
      changeSteps(true);
    }
  };

  // STEP 4
  step_questions2_btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const card = e.target.closest(".js_card");
      // Проверка на клик по карточке
      if (!card) return;

      const btns = e.target
        .closest(".js_step_4_cards")
        .querySelectorAll(".js_card");

      btns.forEach((btn) => removeClass(btn, `js_active`));
      addClass(card, `js_active`);
      addClass(aside_btn, `js_active`);

      if (isMobile) saveAndGo();
    });
  });

  aside_btn.addEventListener("click", function (e) {
    // Скрываем кнопку
    removeClass(aside_btn, `js_active`);
    // Блокируем карточки для избежания повторного нажатия на них
    step_questions2_btns.forEach((btn) => btn.setAttribute("disabled", true));
    // Переход на след уровень
    saveAndGo();
  });

  // При Изменении размеров экрана
  window.addEventListener("resize", () => {
    isMobile = window.innerWidth <= 640;
    isMobileLandScape =
      !window.matchMedia("(orientation: portrait)").matches && isMobile;
  });

  // Свайп на мобильных устройствах
  if (isTouchEnabled()) {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    // Узнаем направление свайпа
    const handleGesture = function (
      touchstartX,
      touchstartY,
      touchendX,
      touchendY
    ) {
      const delx = touchendX - touchstartX;
      const dely = touchendY - touchstartY;

      if (Math.abs(delx) > Math.abs(dely)) {
        if (delx > 0) {
          return "right";
        } else {
          return "left";
        }
      } else if (Math.abs(delx) < Math.abs(dely)) {
        if (dely > 0) {
          return "down";
        } else {
          return "up";
        }
      } else {
        return "tap";
      }
    };

    // Узнаем начальные точки свайпа
    body.addEventListener(
      "touchstart",
      function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      },
      false
    );

    // Узнаем конечные точки свайпа
    body.addEventListener(
      "touchend",
      function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        let reverseDir = "";

        const direction = handleGesture(
          touchstartX,
          touchstartY,
          touchendX,
          touchendY
        );

        if (direction === "tap") return;
        if (direction === "up") reverseDir = "down";
        if (direction === "down") reverseDir = "up";

        // Подсчёт Шага
        let flag = !stepCalc(reverseDir);
        if (flag) return;

        // Определение Слайда
        changeSteps();
      },
      false
    );
  }
}
