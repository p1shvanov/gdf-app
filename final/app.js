import { CONFIG } from "../shared/config/index.js";
import { setupCanvas } from "../shared/js/canvas-utils.js";
import { BinaryAnimation } from "../shared/js/binary-animation.js";
import { LingoAnimation } from "../shared/js/lingo-animation.js";
import { Logo3DAnimation } from "../shared/js/logo-3d-animation.js";
import { WordsReceiver } from "../shared/js/words-receiver.js";
import wakeLockManager from "../shared/wakeLock.js";

class App {
  constructor() {
    this.canvas = setupCanvas();
    this.wordsReceiver = new WordsReceiver();
    
    // Initialize animations
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.lingoAnimation = new LingoAnimation(CONFIG);
    this.logo3DAnimation = new Logo3DAnimation();

    this.init();
  }

  async init() {
    this.binaryAnimation.draw();
    this.lingoAnimation.init();
    this.logo3DAnimation.start();

    // Активируем блокировку сна
    try {
      await wakeLockManager.requestWakeLock();
      console.log('✅ Защита от спящего режима активирована для финальной страницы');
    } catch (error) {
      console.warn('⚠️ Не удалось активировать защиту от спящего режима:', error);
    }

    // Subscribe to word updates and start polling
    this.wordsReceiver.subscribe(this.handleNewWords.bind(this));
    this.wordsReceiver.startPolling();

    // Add debounced resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, CONFIG.CANVAS.RESIZE_DEBOUNCE);
    });
    
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

  handleNewWords(words) {
    // Update animations with new words
    const wordValues = words.map(word => word.value);
    this.lingoAnimation.updateWords(wordValues);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Stop current animations
    this.binaryAnimation.stop();
    this.logo3DAnimation.stop();

    // Recreate canvas with new dimensions
    this.canvas = setupCanvas();

    // Reinitialize animations
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.binaryAnimation.draw();
    this.lingoAnimation.init();
    
    // Recreate and start 3D logo animation
    this.logo3DAnimation = new Logo3DAnimation();
    this.logo3DAnimation.start();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
