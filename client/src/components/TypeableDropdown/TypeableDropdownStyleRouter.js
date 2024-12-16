class TypeableDropdownStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get customDropdownMenu() {
    if (this.isMobile) {
      return "max-width-mobile";
    } else {
      return "";
    }
  }
}

export default TypeableDropdownStyleRouter;
