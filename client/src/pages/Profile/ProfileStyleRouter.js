class ProfileStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get pageSection() {
    if (this.isMobile) {
      return "border-bottom pb-4 mb-3";
    } else {
      return "border-bottom pb-4 mb-3" + (this.isDesktop ? " col" : "");
    }
  }

  get pageSectionTitle() {
    if (this.isMobile) {
      return "fw-bold fs-4 mb-2";
    } else {
      return "fw-bold fs-4 my-1";
    }
  }
}

export default ProfileStyleRouter;
