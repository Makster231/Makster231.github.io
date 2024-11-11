const video = function () {
  let isMobile = window.innerWidth <= 640;
  const videos = document.querySelectorAll(".block_media-video video");

  var plyr_options = {
    showPosterOnEnd: true,
    // fullscreen: { enabled: isMobile ? false : true },
    fullscreen: { enabled: true },
    clickToPlay: true,
  };

  videos.forEach((vid) => {
    const video = new Plyr(vid, plyr_options);
    const poster = document.querySelectorAll(".plyr__poster");
    const close =
      video.elements.container.parentNode.querySelector(".close-video");

    close.addEventListener("click", () => {
      body.classList.remove("js_active_video");
      poster.forEach((el) => {
        el.style.opacity = 1;
        close.classList.remove("close-video-active");
      });

      setTimeout(() => {
        body.classList.remove("js_load");
      }, 100);
    });
    video.on("play", (e) => {
      if (isMobile) {
        body.classList.add("js_load");
        video.fullscreen.enter();
      }

      body.classList.add("js_active_video");
      poster.forEach((el) => {
        el.style.opacity = 0;
        close.classList.add("close-video-active");
      });
    });
    video.on("pause", (e) => {
      body.classList.remove("js_active_video");
      poster.forEach((el) => {
        el.style.opacity = 1;
        close.classList.remove("close-video-active");
      });

      setTimeout(() => {
        body.classList.remove("js_load");
      }, 100);
    });
    video.on("end", (e) => {
      body.classList.remove("js_active_video");
      poster.forEach((el) => {
        el.style.opacity = 1;
        close.classList.remove("close-video-active");
      });

      setTimeout(() => {
        body.classList.remove("js_load");
      }, 100);
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
