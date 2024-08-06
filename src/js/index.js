// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });

import cube from "./modules/cube.js";
import matrixBg from "./modules/matrixBg.js";
import checkDevice from "./modules/checkDevice.js";

window.addEventListener("load", function () {
  cube();
  matrixBg();
  checkDevice();

  window.addEventListener("resize", checkDevice);
});
