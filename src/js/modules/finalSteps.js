// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";

const finalSteps = function () {
  let isMobile = window.innerWidth <= 640;

  let config = {
    slidesPerView: 1.05,
    spaceBetween: 10,
    loop: false,
  };

  const swiper = document.querySelectorAll(".js_swiper");

  if (isMobile) {
    swiper.forEach((el) => {
      const lastScreenSwiper = el.classList.contains("final_left-bottom");
      if (!lastScreenSwiper) return new Swiper(el, config);

      // LAST screen slider
      config.pagination = { el: ".swiper-pagination" };
      const slider = new Swiper(el, config);

      // LAST screen slider update state
      slider.on("slideChange", function (e) {
        lvl_5_2.dataset.bg = slider.activeIndex + 1;
      });
    });
  }

  const final_2_tabs = document.querySelector(".js_final_2_tabs");
  const final_2_tabs_btn = document.querySelectorAll(".js_final_2_tabs_btn");
  const final_2_lists = document.querySelectorAll(".js_final_2_tab_content");

  if (final_2_tabs) {
    final_2_tabs.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn")) return;
      final_2_lists.forEach((el) => el.classList.remove("js_active"));
      final_2_tabs_btn.forEach((el) => el.classList.remove("js_active"));

      final_2_lists[e.target.dataset.role].classList.add("js_active");
      final_2_tabs_btn[e.target.dataset.role].classList.add("js_active");
    });
  }

  const lvl_5_2 = document.querySelector(".js_lvl_5-2");
  const final_tabs = document.querySelectorAll(".js_final_right_btns button");
  const final_mob_tabs = document.querySelectorAll(".js_final_mob_tabs--btn");

  if (final_tabs) {
    final_tabs.forEach((el) => {
      el.addEventListener("click", function (e) {
        const target = e.target;
        const role = target.dataset.role || target.closest(".btn").dataset.role;

        final_tabs.forEach((el) => el.classList.remove("js_active"));
        target.classList.add("js_active");

        lvl_5_2.dataset.tab = role;
      });
    });
  }

  if (final_mob_tabs) {
    final_mob_tabs.forEach((el) => {
      el.addEventListener("click", function (e) {
        if (!e.target.closest(".js_final_mob_tabs--btn")) return;
        lvl_5_2.dataset.tab = e.target.closest(
          ".js_final_mob_tabs--btn"
        ).dataset.role;
      });
    });
  }

  // FINAL SCREEN 4
  if (!isMobile) {
    const final_4_cards = document.querySelectorAll(".js_final_4_list-item");
    final_4_cards.forEach((el) => {
      el.addEventListener("mouseover", function () {
        lvl_5_2.dataset.bg = [].indexOf.call(el.parentElement.children, el) + 1;
      });
    });
  }
};

export default finalSteps;
