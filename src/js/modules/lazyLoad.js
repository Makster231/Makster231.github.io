const lazyLoad = () => {
  let lazySources = [].slice.call(document.querySelectorAll(".lazy > source"));
  let lazyImg = [].slice.call(document.querySelectorAll(".lazy-img img"));

  if ("IntersectionObserver" in window) {
    // PICTURES WITH SOURCES
    let lazySourceObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazySource = entry.target;
          lazySource.srcset = lazySource.dataset.srcset;
          lazySource.nextElementSibling.srcset = lazySource.dataset.srcset;
          lazySource.nextElementSibling.classList.add("fade-in");
          lazySource.parentElement.classList.remove("lazy");
          lazySourceObserver.unobserve(lazySource);
        }
      });
    });

    lazySources.forEach(function (lazySource) {
      lazySourceObserver.observe(lazySource);
    });

    // PICTURES WITHOUT SOURCES

    let lazyImgObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;

          lazyImage.src = lazyImage.dataset.src;
          lazyImage.parentElement.classList.remove("lazy-img");

          lazyImgObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImg.forEach(function (lazyImage) {
      lazyImgObserver.observe(lazyImage);
    });
  } else {
    // Not supported, load all images immediately
    lazySources.forEach(function (image) {
      image.nextElementSibling.src = image.nextElementSibling.dataset.srcset;
    });
    // Not supported, load all images immediately
    lazyImg.forEach(function (image) {
      image.src = image.dataset.srcset;
    });
  }
};

export default lazyLoad;
