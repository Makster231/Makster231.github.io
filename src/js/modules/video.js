const video = function () {
  let isMobile = window.innerWidth <= 640;
  const videos = document.querySelectorAll(".block_media-video video");

  var plyr_options = {
    showPosterOnEnd: true,
    fullscreen: { enabled: isMobile ? false : true },
    clickToPlay: true,
  };

  videos.forEach((vid) => {
    const video = new Plyr(vid, plyr_options);
    const poster = document.querySelectorAll(".plyr__poster");

    video.on("play", (e) => {
      body.classList.add("js_active_video");
      poster.forEach((el) => (el.style.opacity = 0));
    });
    video.on("pause", (e) => {
      body.classList.remove("js_active_video");
      poster.forEach((el) => (el.style.opacity = 1));
    });
    video.on("end", (e) => {
      body.classList.remove("js_active_video");
      poster.forEach((el) => (el.style.opacity = 1));
    });
  });

  document.addEventListener("fullscreenchange", function () {
    if (window.screenTop == 0) {
      setTimeout(() => {
        body.classList.remove("js_load");
      }, 100);
    } else {
      body.classList.add("js_load");
    }
  });
};

export default video;
