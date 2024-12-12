class SharerStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get header() {
    if (this.isMobile) {
      return "fw-bold fs-3";
    } else {
      return "fw-bold fs-3";
    }
  }
}

export default SharerStyleRouter;
