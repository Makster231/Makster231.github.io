const inputMasks = function () {
  const inputPhone = document.querySelectorAll("input[name='phone']");

  if (inputPhone) {
    inputPhone.forEach((item) => {
      IMask(item, {
        mask: "+{7} (000) 000-00-00",
      });
    });
  }
};

export default inputMasks;
