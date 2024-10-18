const requestForm = function () {
  const formWrapper = document.querySelector(".js_request");

  // const btnOpen = document.querySelectorAll(".js_request_open");
  const btnOpen = document.querySelector(".js_request_open");
  const btnClose = document.querySelector(".js_request_close");

  let isOpened = false;

  // btnOpen?.forEach((el) => {
  //   el.addEventListener("click", () => handleClick("open"));
  // });

  btnOpen?.addEventListener("click", () => handleClick("open"));
  btnClose?.addEventListener("click", () => handleClick("close"));

  function handleClick(state) {
    if (state === "close") {
      formWrapper.classList.remove("js_active");

      isOpened = false;
    } else if (state === "open") {
      formWrapper.classList.add("js_active");

      isOpened = true;
    }
  }

  window.addEventListener("click", function (e) {
    if (!formWrapper.classList.contains("js_active")) return;

    if (btnClose.contains(e.target) || btnOpen.contains(e.target) || !isOpened)
      return;

    if (!formWrapper.contains(e.target)) {
      handleClick("close");
    }
  });

  const inputName = document.getElementById("name");
  const inputPhone = document.getElementById("phone");
  const submit = document.querySelector(".js_request_btn");

  let validName,
    validPhone = false;

  function isValid() {
    if (validName && validPhone) {
      submit.removeAttribute("disabled");
    } else {
      submit.setAttribute("disabled", true);
    }
  }

  inputName?.addEventListener("input", function (e) {
    e.target.value.length >= 2 ? (validName = true) : (validName = false);
    isValid();
  });
  inputPhone?.addEventListener("input", function (e) {
    e.target.value.length === 18 ? (validPhone = true) : (validPhone = false);
    isValid();
  });
};

export default requestForm;
