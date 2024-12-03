const video = function () {
  let isMobile = window.innerWidth <= 640;
  const videos = document.querySelectorAll(".block_media-video .video-main");

  var plyr_video_options = {
    fullscreen: { enabled: true },
    clickToPlay: true,
  };

  videos.forEach((vid) => {
    const video = new Plyr(vid, plyr_video_options);
    const poster = document.querySelectorAll(".plyr__poster");
    const close =
      video.elements.container.parentNode.querySelector(".close-video");

    close.addEventListener("click", () => {
      body.classList.remove("js_active_video");
      poster.forEach((el) => {
        el.style.opacity = 1;
        close.classList.remove("close-video-active");
      });

      video.stop();

      setTimeout(() => {
        body.classList.remove("js_load");
        if (video.fullscreen.active) {
          video.fullscreen.exit();
        }
      }, 100);
    });
    video.on("enterfullscreen", () => {
      body.classList.add("js_active_video");
      poster.forEach((el) => {
        el.style.opacity = 0;
        close.classList.add("close-video-active");
      });
    });
    video.on("exitFullscreen", () => {
      poster.forEach((el) => {
        close.classList.add("close-video-active");
      });
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
        if (video.fullscreen.active) {
          video.fullscreen.exit();
        }
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
        if (video.fullscreen.active) {
          video.fullscreen.exit();
        }
      }, 100);
    });
  });

  document.addEventListener("fullscreenchange", function () {
    if (window.screenTop == 0) {
      setTimeout(() => {
        body.classList.remove("js_load");
        // close?.classList.add("close-video-active");
      }, 100);
    } else {
      body.classList.add("js_load");
    }
  });
};

export default video;
