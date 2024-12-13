class SearchStyleRouter {
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

  get subHeader() {
    if (this.isMobile) {
      return "fw-bold fs-6";
    } else {
      return "fw-bold fs-5";
    }
  }

  get pageSection() {
    if (this.isMobile) {
      return "border-bottom pb-4 mb-3";
    } else {
      return "fw-bold fs-3";
    }
  }

  get pageSectionTitle() {
    if (this.isMobile) {
      return "fw-bold fs-4 mb-2";
    } else {
      return "fw-bold my-1";
    }
  }
}

export default SearchStyleRouter;
