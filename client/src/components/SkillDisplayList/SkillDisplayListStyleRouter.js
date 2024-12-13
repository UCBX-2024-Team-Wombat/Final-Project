class SkillDisplayListStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get listWrapperBox() {
    if (this.isMobile) {
      return "border border-secondary rounded p-3 m-2";
    } else {
      return "border border-secondary rounded p-3 m-2";
    }
  }

  get skillTitle() {
    if (this.isMobile) {
      return "fw-bold fs-6";
    } else {
      return "fw-bold fs-3";
    }
  }

  get skillDescription() {
    // if (this.isMobile) {
    //   return "text-secondary";
    // } else {
    //   return "text-secondary";
    // }
    return "";
  }

  get fieldLabel() {
    if (this.isMobile) {
      return "customFieldLabel";
    } else {
      return "customFieldLabel";
    }
  }
}

export default SkillDisplayListStyleRouter;
