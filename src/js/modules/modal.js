export default class Modal {
  elements;
  body = document.querySelector("body");

  constructor(wrapper, config) {
    this.elements = {
      dialog: wrapper,
      dialogBg: wrapper.querySelector(".js_dialog_bg"),
    };

    this.buttons = {
      close: wrapper.querySelector(".js_dialog_close"),

      open: config.openBtn,
    };

    this.elements.dialog.addEventListener("close", () => this.closeModal());
    this.elements.dialogBg.addEventListener("click", () => this.closeModal());
    this.buttons.close.addEventListener("click", () => this.closeModal());

    this.buttons.open.forEach((element) => {
      element.addEventListener("click", () => this.openModal());
    });
  }

  openModal() {
    this.elements.dialog.showModal();
    body.classList.add("js_scroll-disable");
  }

  closeModal() {
    this.elements.dialog.close();
    body.classList.remove("js_scroll-disable");
  }
}
