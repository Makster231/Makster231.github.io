export default class LazyLoad {
  constructor(select, config = {}) {
    this.images = select;
    this.options = config;

    this.images.forEach((img) => this.lazyLoadIframe(img));
  }

  lazyLoadIframe = (img) => {
    // console.log(this.options);

    const observer = new IntersectionObserver((items) => {
      items.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          img.src = img.dataset.src;

          observer.unobserve(img);
        }
      });
    }, this.options);

    observer.observe(img);
  };
}
