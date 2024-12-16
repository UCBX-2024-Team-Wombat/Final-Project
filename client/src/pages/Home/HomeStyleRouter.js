class HomeStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get image() {
    if (this.isMobile) {
      return "mx-auto d-block img-fluid";
    } else {
      return "mx-auto d-block img-fluid main-image";
    }
  }

  get description() {
    if (this.isMobile) {
      return "text-center pb-3 mb-4";
    } else {
      return "text-center pb-3 mb-4 description-desktop";
    }
  }
}

export default HomeStyleRouter;
