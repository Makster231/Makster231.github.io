// import WheelIndicator from "./wheel-indicator.js";

// export default function steps() {
//   // ---------------------- CONSTS ----------------------
//   const body = document.getElementById("body");
//   //  BTNS
//   const all_btns = document.querySelectorAll(".js_btn");
//   const aside_btn = document.querySelector(".js_aside_btn");
//   const step_0_btn = document.querySelector(".js_btn_start");
//   const step_1_btns = document.querySelectorAll(".js_step_1_btn");
//   const step_2_btns = document.querySelectorAll(".js_importants_list");
//   const step_3_btns = document.querySelectorAll(".js_step_3_btn");
//   const step_4_btns = document.querySelectorAll(".js_step_4_cards");
//   // Проверка на тач скрины
//   const isTouchEnabled = () =>
//     "ontouchstart" in window ||
//     navigator.maxTouchPoints > 0 ||
//     navigator.msMaxTouchPoints > 0;

//   //  step 2 btns state
//   let data_info = {
//     step_2_values: [],
//     step_4_values: [],
//   };

//   let isMobile = window.innerWidth <= 640;
//   let isMobileLandScape = !window.matchMedia("(orientation: portrait)").matches;

//   //  Step
//   let step = 0;
//   let level = 1;
//   //  Animation flag
//   let animationProcessing = false;

//   // ---------------------- FUNCTIONS ----------------------

//   // One stroke func
//   const getLvl = (cls) => body.classList.contains(cls);
//   const sleep = (m) => new Promise((r) => setTimeout(r, m));
//   const addClass = (block, cls) => block.classList.add(cls);
//   const removeClass = (block, cls) => block.classList.remove(cls);
//   const setClassState = (lvl = 1, stp = step) =>
//     addClass(body, `js_active_${lvl}_${stp}`);

//   const getCurLvl = () => {
//     body.classList.value.split(" ").forEach((el) => {
//       if (el.indexOf("js_active_lvl_") === 0) {
//         level = el.split("_")[el.split("_").length - 1];
//       }
//     });

//     return +level;
//   };

//   const disableAllClikable = async (btns = all_btns, time = 1500) => {
//     btns.forEach((btn) => btn.setAttribute("disabled", true));
//     await sleep(time);
//     btns.forEach((btn) => btn.removeAttribute("disabled"));
//   };

//   const removeAllStates = () => {
//     body.classList.remove(
//       ...[
//         "js_active_1_0",
//         "js_active_1_1",
//         "js_active_1_2",
//         "js_active_1_3",
//         "js_active_1_4",

//         "js_active_2_1",
//         "js_active_2_2",
//         "js_active_2_3",
//         "js_active_2_4",

//         "lift",

//         "js_active_3_1",
//         "js_active_3_2",
//         "js_active_3_3",
//         "js_active_3_4",

//         "js_active_4_1",
//         "js_active_4_2",
//         "js_active_4_3",
//         "js_active_4_4",

//         "js_active_5_1",
//         "js_active_5_2",
//       ]
//     );
//   };

//   const stepCalc = (dir) => {
//     console.log("stepCalc Start " + step);
//     dir === "down" ? step++ : step--;

//     step < 0 ? (step = 0) : step;
//     step >= 4 ? (step = 4) : step;

//     // Если НЕ выбрана кнопка на слайде 2
//     if (step >= 2 && !data_info.step_2_values[level - 1]) step = 2;
//     // Если выбрана кнопка на слайде 2
//     if (step <= 2 && data_info.step_2_values[level - 1]) step = 3;

//     return step;
//   };

//   const changeSteps = async (step_2_btn_val = "") => {
//     // Проверка на завершенность анимации
//     if (animationProcessing) return;
//     // Запускаем анимацию (кнопки, свайп и прокрутка не работают)
//     console.log("changeSteps start");
//     animationProcessing = true;
//     disableAllClikable();
//     level = getCurLvl();

//     if (isMobile) addClass(body, "js_aside_animation");
//     await sleep(isMobile ? 1000 : 0);

//     // Удаление Всех классов состояний
//     removeAllStates();

//     // Проверка на первый слайд + для НЕ 1 уровня отключаем шаг 1
//     if (level !== 1 && step < 1) step = 1;
//     // На 5 этаэе только 2 слайда
//     if (level === 5 && step > 2) step = 2;

//     // задаем состояние Слайда
//     setClassState(level, step);

//     // Задача значений для кнопок
//     if (step_2_btn_val) data_info.step_2_values.push(step_2_btn_val);

//     // Завершаем Анимацию
//     // В моб версии ждем окончания анимаци и удаляем класс анимации
//     await sleep(isMobile ? 1500 : 500);
//     removeClass(body, "js_aside_animation");
//     // Небольшая пауза на моб устройствах для избежания мгновенного скролла
//     await sleep(isMobile ? 500 : 0);
//     animationProcessing = false;
//     console.log("changeSteps end");
//   };

//   const goToLvl = async (toLvl = 2, changelvl = false) => {
//     // Удаление Всех классов состояний
//     removeAllStates();
//     step = 1;
//     // Запускаем анимацию (другие кнопки смены слайдов не могут быть задействованы)
//     animationProcessing = true;

//     // Добавляем классы
//     addClass(body, `js_active_lvl_${toLvl}`);
//     addClass(body, "lift");
//     // Удаляем классы
//     removeClass(body, `js_active_lvl_${toLvl - 1}`);

//     // активируем первый слайд
//     setClassState(toLvl);

//     // Завершаем Анимацию
//     await sleep(changelvl ? 2000 : 1000);
//     animationProcessing = false;
//     await sleep(changelvl ? 0 : 500);
//     // Кнопки с шага 4 снова активны
//     step_4_btns.forEach((btn) => btn.removeAttribute("disabled"));
//     // Удаляем класс для плавного движения лифта
//     removeClass(body, `lift`);
//   };

//   // ---------------------- BODY SCROLL ----------------------

//   const indicator = new WheelIndicator({
//     elem: body,
//     callback: function (e) {
//       // Подсчёт Шага
//       stepCalc(e.direction);
//       // Определение Слайда
//       changeSteps();
//     },
//   });
//   indicator.getOption("preventMouse"); // true

//   // ---------------------- EVENTS ----------------------
//   // LVL 1 STEP 0
//   step_0_btn.addEventListener("click", function () {
//     // Подсчёт Шага
//     stepCalc("down");
//     // Определение Слайда
//     changeSteps();
//   });

//   // STEP 1
//   step_1_btns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       // Подсчёт Шага
//       stepCalc("down");
//       // Определение Слайда
//       changeSteps();
//     });
//   });

//   // STEP 2
//   step_2_btns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       // Проверка на кнопку списка
//       if (!e.target.classList.contains("js_importants_list_btn")) return;
//       // Подсчёт Шага
//       stepCalc("down");
//       // Меняем слайд
//       changeSteps(e.target.innerText);
//     });
//   });

//   // STEP 3
//   step_3_btns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       // Подсчёт Шага
//       stepCalc("down");
//       // Определение Слайда
//       changeSteps();
//     });
//   });

//   // LIFT BTN
//   const saveAndGo = () => {
//     // Переход на следующий уровень
//     let btn_val = document.querySelector(
//       `.js_lvl_${level} .js_step_4_cards .js_card.js_active`
//     ).dataset.value;

//     data_info.step_4_values.push(btn_val);

//     goToLvl(level + 1, true);
//   };

//   // STEP 4
//   step_4_btns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       const card = e.target.closest(".js_card");
//       // Проверка на клик по карточке
//       if (!card) return;

//       const btns = e.target
//         .closest(".js_step_4_cards")
//         .querySelectorAll(".js_card");

//       btns.forEach((btn) => removeClass(btn, `js_active`));
//       addClass(card, `js_active`);
//       addClass(aside_btn, `js_active`);

//       if (isMobile) saveAndGo();
//     });
//   });

//   aside_btn.addEventListener("click", function (e) {
//     // Скрываем кнопку
//     removeClass(aside_btn, `js_active`);
//     // Блокируем карточки для избежания повторного нажатия на них
//     step_4_btns.forEach((btn) => btn.setAttribute("disabled", true));
//     // Переход на след уровень
//     saveAndGo();
//   });

//   // При Изменении размеров экрана
//   window.addEventListener("resize", () => {
//     isMobile = window.innerWidth <= 640;
//     isMobileLandScape = !window.matchMedia("(orientation: portrait)").matches;
//   });

//   // Свайп на мобильных устройствах
//   if (isTouchEnabled()) {
//     let touchstartX = 0;
//     let touchstartY = 0;
//     let touchendX = 0;
//     let touchendY = 0;

//     // Узнаем направление свайпа
//     const handleGesture = function (
//       touchstartX,
//       touchstartY,
//       touchendX,
//       touchendY
//     ) {
//       const delx = touchendX - touchstartX;
//       const dely = touchendY - touchstartY;

//       if (Math.abs(delx) > Math.abs(dely)) {
//         if (delx > 0) {
//           return "right";
//         } else {
//           return "left";
//         }
//       } else if (Math.abs(delx) < Math.abs(dely)) {
//         if (dely > 0) {
//           return "down";
//         } else {
//           return "up";
//         }
//       } else {
//         return "tap";
//       }
//     };

//     // Узнаем начальные точки свайпа
//     body.addEventListener(
//       "touchstart",
//       function (event) {
//         touchstartX = event.changedTouches[0].screenX;
//         touchstartY = event.changedTouches[0].screenY;
//       },
//       false
//     );

//     // Узнаем конечные точки свайпа
//     body.addEventListener(
//       "touchend",
//       function (event) {
//         touchendX = event.changedTouches[0].screenX;
//         touchendY = event.changedTouches[0].screenY;
//         let reverseDir = "";

//         const direction = handleGesture(
//           touchstartX,
//           touchstartY,
//           touchendX,
//           touchendY
//         );

//         if (direction === "tap") return;
//         if (direction === "up") reverseDir = "down";
//         if (direction === "down") reverseDir = "up";

//         stepCalc(reverseDir);

//         // Определение Слайда
//         changeSteps();
//       },
//       false
//     );
//   }
// }
