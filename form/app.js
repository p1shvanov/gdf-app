import { CONFIG } from "../shared/config/index.js";
import { setupCanvas } from "../shared/js/canvas-utils.js";
import { BinaryAnimation } from "../shared/js/binary-animation.js";
import { TerminalAnimation } from "../shared/js/terminal-animation.js";
import { LogoAnimation } from "../shared/js/logo-animation.js";

class App {
  constructor() {
    this.canvas = setupCanvas();
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.terminalAnimation = new TerminalAnimation(
      [],
      CONFIG.COLORS.PURPLE,
      CONFIG.COLORS.PINK,
      CONFIG.COLORS.TEAL
    );
    this.logoAnimation = new LogoAnimation();

    this.init();
  }

  init() {
    this.binaryAnimation.draw();
    this.logoAnimation.start();

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Stop current animation
    this.binaryAnimation.stop();

    // Recreate canvas with new dimensions
    this.canvas = setupCanvas();

    // Reinitialize binary animation
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.binaryAnimation.draw();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
