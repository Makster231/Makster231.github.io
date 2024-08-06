const cube = function () {
  const cube = document.getElementById("cube");

  let deg = 0;
  let flag = true;

  // Await func in s
  const wait = (t) => new Promise((resolve) => setTimeout(resolve, t * 1000));

  // Свайп куба влево
  const slideToLeft = async function () {
    if (flag) {
      flag = false;

      cube.style.transform = `translateZ(-100dvw) rotateY(${(deg += 90)}deg)`;
      await wait(0.5);

      cube.style.transform = `translateZ(-50dvw) rotateY(${deg}deg)`;
      await wait(0.5);

      flag = true;
    }
  };

  // Свайп куба вправо
  const slideToRight = async function () {
    if (flag) {
      flag = false;

      cube.style.transform = `translateZ(-100dvw) rotateY(${(deg -= 90)}deg)`;
      await wait(0.5);

      cube.style.transform = `translateZ(-50dvw) rotateY(${deg}deg)`;
      await wait(0.5);

      flag = true;
    }
  };

  // Проверка на тач скрины
  const isTouchEnabled = () =>
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  // Свайпаем куб при нажатии на стрелки
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      slideToLeft();
    }
    if (e.key === "ArrowRight") {
      slideToRight();
    }
  });

  // Смена слайдов при прокрутке
  document.addEventListener(
    "wheel",
    function (e) {
      // cross-browser wheel delta
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

      delta > 0 ? slideToLeft() : slideToRight();

      return false;
    },
    false
  );

  // При тач скринах активируем свайп куба
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
    cube.addEventListener(
      "touchstart",
      function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      },
      false
    );

    // Узнаем конечные точки свайпа
    cube.addEventListener(
      "touchend",
      function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;

        const direction = handleGesture(
          touchstartX,
          touchstartY,
          touchendX,
          touchendY
        );

        //  Вызываем свайп в зависимости от результата
        if (direction == "right") {
          slideToLeft();
        } else if (direction == "left") {
          slideToRight();
        }
      },
      false
    );
  }
};

export default cube;
