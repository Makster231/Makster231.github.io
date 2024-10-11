const finalSteps = function () {
  const final_2_tabs = document.querySelector(".js_final_2_tabs");
  const final_2_tabs_btn = document.querySelectorAll(".js_final_2_tabs_btn");
  const final_2_lists = document.querySelectorAll(".js_final_2_list");

  if (final_2_tabs) {
    final_2_tabs.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn")) return;
      final_2_lists.forEach((el) => el.classList.remove("js_active"));
      final_2_tabs_btn.forEach((el) => el.classList.remove("js_active"));

      final_2_lists[e.target.dataset.role].classList.add("js_active");
      final_2_tabs_btn[e.target.dataset.role].classList.add("js_active");
    });
  }

  // js_lvl_5-1
  const lvl_5_1 = document.querySelector(".js_lvl_5-1");
  const final_tabs = document.querySelector(".js_final_right_btns");
  const final_mob_tabs = document.querySelectorAll(".js_final_mob_tabs--btn");

  // При Изменении размеров экрана

  if (final_tabs) {
    final_tabs.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn")) return;
      lvl_5_1.dataset.tab = e.target.dataset.role;
    });
  }

  if (final_mob_tabs) {
    final_mob_tabs.forEach((el) => {
      el.addEventListener("click", function (e) {
        if (!e.target.closest(".js_final_mob_tabs--btn")) return;
        lvl_5_1.dataset.tab = e.target.closest(
          ".js_final_mob_tabs--btn"
        ).dataset.role;
      });
    });
  }
};

export default finalSteps;