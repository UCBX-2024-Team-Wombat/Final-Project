class ChatWindowStyleRouter {
  constructor({ isMobile, isTablet, isDesktop }) {
    this.isMobile = isMobile;
    this.isTablet = isTablet;
    this.isDesktop = isDesktop;
  }

  get messageWindow() {
    if (this.isMobile) {
      return "border rounded p-2 mb-3 chat-window-mobile";
    } else {
      return "fs-6";
    }
  }
}

export default ChatWindowStyleRouter;
