const video = function () {
  let isMobile = window.innerWidth <= 640;
  const videos = document.querySelectorAll(".block_media-video .video-main");
  const posters = document.querySelectorAll(".block_media-video .video-poster");

  var plyr_video_options = {
    fullscreen: { enabled: true },
    clickToPlay: true,
  };
  // var plyr_poster_options = {
  //   fullscreen: { enabled: false },
  //   playsinline: false,
  //   controls: false,
  //   muted: true,
  //   autoplay: true,
  //   loop: true,
  // };

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

  // posters.forEach((poster) => {
  //   const pst = new Plyr(poster, plyr_poster_options);
  // });

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
