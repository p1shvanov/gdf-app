import { CONFIG } from "../shared/config/index.js";
import { setupCanvas } from "../shared/js/canvas-utils.js";
import { BinaryAnimation } from "../shared/js/binary-animation.js";
import { TerminalAnimation } from "../shared/js/terminal-animation.js";
import { LogoAnimation } from "../shared/js/logo-animation.js";
import wakeLockManager from "../shared/wakeLock.js";
import Keyboard from "./keyboard.js";

class App {
  constructor() {
    this.canvas = setupCanvas();
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    
    // Initialize keyboard first in the footer
    Keyboard.init('app-footer');
    
    // Initialize modules with their respective container IDs
    this.logoAnimation = new LogoAnimation('app-header');
    this.terminalAnimation = new TerminalAnimation('app-main');

    this.init();
  }

  async init() {
    this.binaryAnimation.draw();
    this.logoAnimation.start();

    // Активируем блокировку сна
    try {
      await wakeLockManager.requestWakeLock();
      console.log('✅ Защита от спящего режима активирована для страницы формы');
    } catch (error) {
      console.warn('⚠️ Не удалось активировать защиту от спящего режима:', error);
    }

    window.addEventListener("resize", this.handleResize.bind(this));
    
    // Освобождаем блокировку при выходе со страницы
    window.addEventListener("beforeunload", () => {
      wakeLockManager.releaseWakeLock();
    });
    
    // Также освобождаем при скрытии страницы
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        wakeLockManager.releaseWakeLock();
      }
    });
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
