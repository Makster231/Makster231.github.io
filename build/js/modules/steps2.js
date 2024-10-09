// import WheelIndicator from "./wheel-indicator.js";

// export default function steps() {
//   // ---------------------- CONSTS ----------------------
//   const body = document.getElementById("body");
//   const lift = document.querySelector(".js_aside_container");
//   const lvl_1_0_picture = document.querySelector(".js_lvl_1-0_picture");

//   //  BTNS
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

//   //  Step
//   let step = 0;
//   //  Animation flag
//   let animationProcessing = false;
//   //  Aside lift styles
//   let liftStylesDefault, liftStylesAside;

//   // ---------------------- FUNCTIONS ----------------------

//   const setLiftStyles = (styles) => (lift.style = styles);

//   // One stroke func
//   const getLvl = (cls) => body.classList.contains(cls);
//   const sleep = (m) => new Promise((r) => setTimeout(r, m));
//   const addClass = (block, cls) => block.classList.add(cls);
//   const removeClass = (block, cls) => block.classList.remove(cls);
//   const setClassState = (lvl = 1, stp = step) =>
//     addClass(body, `js_active_${lvl}_${stp}`);

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

//   const check_2_step = (lvl_num = 1) => {
//     if (getLvl(`js_active_lvl_${lvl_num}`)) {
//       // Если НЕ выбрана кнопка на слайде 2
//       if (step >= 2 && !data_info.step_2_values[lvl_num - 1]) return (step = 2);
//       // Если выбрана кнопка на слайде 2
//       if (step <= 2 && data_info.step_2_values[lvl_num - 1]) return (step = 3);
//     }
//   };

//   const stepCalc = (dir) => {
//     dir === "down" ? step++ : step--;

//     step < 0 ? (step = 0) : step;
//     step >= 4 ? (step = 4) : step;

//     check_2_step(1);
//     check_2_step(2);
//     check_2_step(3);
//     check_2_step(4);

//     return step;
//   };

//   const changeSteps = async (lvl) => {
//     // Удаление Всех классов состояний
//     removeAllStates();

//     // Запускаем анимацию (другие кнопки смены слайдов не могут быть задействованы)
//     animationProcessing = true;

//     // Проверка на первый слайд + для НЕ 1 уровня отключаем шаг 1
//     if (lvl !== 1 && step < 1) step = 1;

//     // Проверка на 1 уровень + задавание стилей для изображения лифта
//     if (lvl === 1) {
//       if (step === 0) setLiftStyles(liftStylesDefault);
//       if (step === 1) setLiftStyles(liftStylesAside);
//     }

//     // На 5 этаэе только 2 слайда
//     if (lvl === 5 && step > 2) step = 2;

//     // задаем состояние Слайда
//     setClassState(lvl, step);

//     // Завершаем Анимацию
//     await sleep(500);
//     animationProcessing = false;
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
//       if (animationProcessing) return;

//       stepCalc(e.direction);

//       if (getLvl("js_active_lvl_1")) changeSteps(1);
//       if (getLvl("js_active_lvl_2")) changeSteps(2);
//       if (getLvl("js_active_lvl_3")) changeSteps(3);
//       if (getLvl("js_active_lvl_4")) changeSteps(4);
//       if (getLvl("js_active_lvl_5")) changeSteps(5);
//     },
//   });
//   indicator.getOption("preventMouse"); // true

//   // ---------------------- EVENTS ----------------------
//   // LVL 1 STEP 0
//   step_0_btn.addEventListener("click", function () {
//     // Проверка на завершенность анимации
//     if (animationProcessing) return;
//     // Удаление Всех классов состояний
//     removeAllStates();
//     // Подсчёт Шага
//     stepCalc("down");
//     // step = 1;
//     changeSteps(1);
//   });

//   // STEP 1
//   step_1_btns.forEach((btn) => {
//     btn.addEventListener("click", async function (e) {
//       // Проверка на завершенность анимации
//       if (animationProcessing) return;
//       // Блокирование кнопки
//       btn.setAttribute("disabled", true);
//       // Подсчёт Шага
//       stepCalc("down");

//       // Определение Слайда
//       if (getLvl("js_active_lvl_1")) changeSteps(1);
//       if (getLvl("js_active_lvl_2")) changeSteps(2);
//       if (getLvl("js_active_lvl_3")) changeSteps(3);
//       if (getLvl("js_active_lvl_4")) changeSteps(4);
//       if (getLvl("js_active_lvl_5")) changeSteps(5);

//       // Разблокирование кнопки
//       await sleep(1500);
//       btn.removeAttribute("disabled");
//     });
//   });

//   // STEP 2
//   step_2_btns.forEach((btn) => {
//     btn.addEventListener("click", async function (e) {
//       // Проверка на кнопку списка
//       // Проверка на завершенность анимации
//       if (
//         !e.target.classList.contains("js_importants_list_btn") ||
//         animationProcessing
//       )
//         return;

//       // Запускаем анимацию (другие кнопки смены слайдов не могут быть задействованы)
//       animationProcessing = true;

//       // Определение кнопок
//       let btns = e.target
//         .closest(".js_importants_list")
//         .querySelectorAll(".js_importants_list_btn");
//       // Блокирование кнопок
//       btns.forEach((btn) => btn.setAttribute("disabled", true));

//       // Удаление Всех классов состояний
//       removeAllStates();

//       // Задача значений для кнопок
//       if (getLvl("js_active_lvl_1"))
//         data_info.step_2_values.push(e.target.innerText);
//       if (getLvl("js_active_lvl_2"))
//         data_info.step_2_values.push(e.target.innerText);
//       if (getLvl("js_active_lvl_3"))
//         data_info.step_2_values.push(e.target.innerText);
//       if (getLvl("js_active_lvl_4"))
//         data_info.step_2_values.push(e.target.innerText);

//       // Подсчёт Шага
//       stepCalc("down");

//       // Определение Слайда
//       if (getLvl("js_active_lvl_1")) setClassState(1);
//       if (getLvl("js_active_lvl_2")) setClassState(2);
//       if (getLvl("js_active_lvl_3")) setClassState(3);
//       if (getLvl("js_active_lvl_4")) setClassState(4);

//       // Завершаем Анимацию
//       await sleep(500);
//       animationProcessing = false;
//       await sleep(1000);
//       // Разблокирование кнопки
//       btns.forEach((btn) => btn.removeAttribute("disabled"));
//     });
//   });

//   // STEP 3
//   step_3_btns.forEach((btn) => {
//     btn.addEventListener("click", async function (e) {
//       // Проверка на завершенность анимации
//       if (animationProcessing) return;
//       // Блокирование кнопки
//       btn.setAttribute("disabled", true);
//       // Подсчёт Шага
//       stepCalc("down");

//       // Определение Слайда
//       if (getLvl("js_active_lvl_1")) changeSteps(1);
//       if (getLvl("js_active_lvl_2")) changeSteps(2);
//       if (getLvl("js_active_lvl_3")) changeSteps(3);
//       if (getLvl("js_active_lvl_4")) changeSteps(4);

//       // Разблокирование кнопки
//       await sleep(1500);
//       btn.removeAttribute("disabled");
//     });
//   });

//   // STEP 4
//   step_4_btns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       const card = e.target.closest(".js_card");
//       // Проверка на клик по карточке
//       // Проверка на завершенность анимации
//       if (!card || animationProcessing) return;

//       const btns = e.target
//         .closest(".js_step_4_cards")
//         .querySelectorAll(".js_card");

//       btns.forEach((btn) => removeClass(btn, `js_active`));
//       addClass(card, `js_active`);
//       addClass(aside_btn, `js_active`);
//     });
//   });

//   // LIFT BTN
//   const saveAndGo = (lvl = 1) => {
//     // Переход на следующий уровень
//     let btn_val = document.querySelector(
//       `.js_lvl_${lvl} .js_step_4_cards .js_card.js_active`
//     ).dataset.value;

//     data_info.step_4_values.push(btn_val);

//     goToLvl(lvl + 1, true);
//   };

//   aside_btn.addEventListener("click", function (e) {
//     // Скрываем кнопку
//     removeClass(aside_btn, `js_active`);
//     // Блокируем карточки для избежания повторного нажатия на них
//     step_4_btns.forEach((btn) => btn.setAttribute("disabled", true));

//     // Переход на следующий уровень
//     if (getLvl(`js_active_lvl_1`)) return saveAndGo(1);
//     if (getLvl(`js_active_lvl_2`)) return saveAndGo(2);
//     if (getLvl(`js_active_lvl_3`)) return saveAndGo(3);
//     if (getLvl(`js_active_lvl_4`)) return saveAndGo(4);
//   });

//   // Скролл на мобильных устройствах
//   if (isTouchEnabled()) {
//     let touchstartX = 0;
//     let touchstartY = 0;
//     let touchendX = 0;
//     let touchendY = 0;
//     let timeStart = 0;
//     let timeEnd = 0;

//     // Узнаем направление свайпа
//     const handleGesture = function (
//       touchstartX,
//       touchstartY,
//       touchendX,
//       touchendY,
//       timeStart,
//       timeEnd
//     ) {
//       const delx = touchendX - touchstartX;
//       const dely = touchendY - touchstartY;
//       const minDistance = 60; // px
//       const maxDistance = 120; // px
//       const minTime = 50; // минимальное время, за которое должен быть совершен свайп (ms)
//       const maxTime = 700; // максимальное время, за которое должен быть совершен свайп (ms)

//       const time = timeEnd - timeStart;

//       if (time >= minTime && time <= maxTime) {
//         if (Math.abs(delx) > Math.abs(dely)) {
//           if (delx > 0) {
//             return "right";
//           } else {
//             return "left";
//           }
//         } else if (
//           Math.abs(dely) >= minDistance &&
//           Math.abs(dely) <= maxDistance
//         ) {
//           if (Math.abs(delx) < Math.abs(dely)) {
//             if (dely > 0) {
//               return "down";
//             } else {
//               return "up";
//             }
//           } else {
//             return "tap";
//           }
//         }
//       }
//     };

//     // Узнаем начальные точки свайпа
//     body.addEventListener(
//       "touchstart",
//       function (event) {
//         touchstartX = event.changedTouches[0].screenX;
//         touchstartY = event.changedTouches[0].screenY;
//         timeStart = new Date().getTime();
//       },
//       false
//     );

//     // Узнаем конечные точки свайпа
//     body.addEventListener(
//       "touchend",
//       function (event) {
//         touchendX = event.changedTouches[0].screenX;
//         touchendY = event.changedTouches[0].screenY;
//         timeEnd = new Date().getTime();
//         let reverseDir;

//         const direction = handleGesture(
//           touchstartX,
//           touchstartY,
//           touchendX,
//           touchendY,
//           timeStart,
//           timeEnd
//         );

//         timeEnd = timeStart = 0;

//         console.log(direction);

//         // Если не свайп вверх или вниз или анимация в процессе
//         if (direction !== "up" && direction !== "down" && animationProcessing) {
//           console.log(direction);
//           return;
//         }

//         // направление для свайпа
//         if (direction === "up") reverseDir = "down";
//         if (direction === "down") reverseDir = "up";

//         // Меняем слайд
//         stepCalc(reverseDir);
//         if (getLvl("js_active_lvl_1")) changeSteps(1);
//         if (getLvl("js_active_lvl_2")) changeSteps(2);
//         if (getLvl("js_active_lvl_3")) changeSteps(3);
//         if (getLvl("js_active_lvl_4")) changeSteps(4);
//         if (getLvl("js_active_lvl_5")) changeSteps(5);
//       },
//       false
//     );
//   }
// }
