// export default class LazyLoad {
//   constructor(select, config = {}) {
//     this.images = select;
//     this.options = config;

//     this.images.forEach((img) => this.lazyLoadIframe(img));
//   }

//   lazyLoadIframe = (img) => {
//     // console.log(this.options);

//     const observer = new IntersectionObserver((items) => {
//       items.forEach(({ isIntersecting }) => {
//         if (isIntersecting) {
//           img.src = img.dataset.src;

//           observer.unobserve(img);
//         }
//       });
//     }, this.options);

//     observer.observe(img);
//   };
// }

const lazyLoad = () => {
  var lazyImages = [].slice.call(document.querySelectorAll(".lazy > source"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.nextElementSibling.srcset = lazyImage.dataset.srcset;
          lazyImage.nextElementSibling.classList.add("fade-in");
          lazyImage.parentElement.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Not supported, load all images immediately
    lazyImages.forEach(function (image) {
      image.nextElementSibling.src = image.nextElementSibling.dataset.srcset;
    });
  }
};

export default lazyLoad;
