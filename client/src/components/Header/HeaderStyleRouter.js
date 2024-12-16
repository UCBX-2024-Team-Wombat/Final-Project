class HeaderStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get nav() {
    if (this.isMobile) {
      return "me-auto fs-5";
    } else {
      return "fs-6";
    }
  }
}

export default HeaderStyleRouter;
