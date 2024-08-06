const matrixBg = function () {
  // настройки анимации
  const state = {
    fps: 30,
    color: "#00bfff",
    charset: "0123456789ABCDEF",
    size: 24,
  };
  // Переменные
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let w, h, p;

  // рандомная буква из настроек анимации
  const random = (items) => items[Math.floor(Math.random() * items.length)];

  // Задаем размеры
  const resize = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;

    //кол-во колонок
    p = new Array(Math.ceil(w / state.size)).fill(0);
  };
  resize();

  // Задаем размеры
  const draw = () => {
    ctx.fillStyle = "rgba(18,23,17,.05)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = state.color;
    ctx.font = state.size + "px matrix, sans-serif";

    for (let i = 0; i < p.length; i++) {
      let v = p[i];

      ctx.fillText(random(state.charset), i * state.size, v);

      p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + state.size;
    }
  };

  setInterval(draw, 1000 / state.fps);

  window.addEventListener("resize", resize);
};

export default matrixBg;
