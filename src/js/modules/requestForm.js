const requestForm = function () {
  const lvl_5_2 = document.querySelector(".js_lvl_5-2");
  const formWrapper = document.querySelector(".js_request");

  const btnOpen = document.querySelectorAll(".js_request_open");
  const btnClose = document.querySelectorAll(".js_request_close");

  let isOpened = false;

  btnOpen?.forEach((el) => {
    el.addEventListener("click", (e) => handleClick(e, "open"));
  });
  btnClose?.forEach((el) => {
    el.addEventListener("click", (e) => handleClick(e, "close"));
  });

  function handleClick(e, state) {
    e.preventDefault();
    e.stopPropagation();

    if (state === "close") {
      formWrapper.classList.remove("js_active");

      isOpened = false;
    } else if (state === "open") {
      formWrapper.classList.add("js_active");

      // GET INFO
      let getWrapper, getHref, getTitle, getText, getBg;

      if (lvl_5_2.getAttribute("data-tab") == 4) {
        getWrapper = document.querySelectorAll(".js_final_4_list-item")[
          +lvl_5_2.getAttribute("data-bg") - 1
        ];

        getBg = document
          .querySelectorAll(".final_4_bg")
          [+lvl_5_2.getAttribute("data-bg") - 1].querySelector("img").srcset;
      } else {
        getWrapper = e.target.closest(".js_request_open");

        getBg =
          getWrapper.querySelector(".js_request_open-bg img")?.src ||
          "./img/final_steps/blue.jpg";
      }

      getHref = getWrapper?.getAttribute("href");
      getTitle = getWrapper.querySelector(".js_request_open-title")?.innerHTML;
      getText = getWrapper.querySelector(".js_request_open-text")?.innerHTML;

      // SET INFO
      const setWrapper = document.querySelector(".js_request_link");
      const setLink = setWrapper.querySelector(".js_request_link-href");
      const setTitle = setWrapper.querySelector(".js_request_link-title");
      const setText = setWrapper.querySelector(".js_request_link-text");
      const setBg = setWrapper.querySelector(".js_request_link-bg img");

      setLink.setAttribute("href", getHref);
      setTitle.innerHTML = getTitle;
      setText.innerHTML = getText;
      setBg.src = getBg;

      isOpened = true;
    }
  }

  const isMobile = window.innerWidth <= 640;
  const clickContains = !isMobile
    ? formWrapper
    : document.querySelector(".js_request_content");

  window.addEventListener("click", function (e) {
    if (!formWrapper.classList.contains("js_active")) return;

    if (
      e.target.closest(".js_request_link") ||
      e.target.matches(".js_request_close") ||
      e.target.matches(".js_request_open") ||
      !isOpened
    )
      return;

    if (!clickContains.contains(e.target)) {
      handleClick(e, "close");
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
