class SkillAddFormStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get selectedSkillDisplay() {
    if (this.isMobile) {
      return "mb-2";
    } else {
      return "fw-bold";
    }
  }

  get relationshipTypeSelector() {
    if (this.isMobile) {
      return "mb-3";
    } else {
      return "fw-bold";
    }
  }
}

export default SkillAddFormStyleRouter;
