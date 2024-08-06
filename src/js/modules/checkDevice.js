const checkDevice = function () {
  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  const body = document.querySelector("body");

  if (isMobile) {
    body.classList.add("js_mobile-device");
  }

  body.style.opacity = 1;
};

export default checkDevice;
