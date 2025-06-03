export const commonConfig = {
  // Core settings
  FPS: 60,
  FONT_SIZE: 14,
  PIXEL_RATIO: window.devicePixelRatio || 1,
  EMPTY_PROBABILITY: 0.3,

  // Binary Animation
  BIN_CHARS: ["0", "1", "§"],

  // Effects
  TWINKLE: {
    ENABLED: true,
    PROBABILITY: 0.1,
    DURATION: 100,
    COLOR: "#333333"
  },

  WAVES: {
    ENABLED: false,
    SPEED: 0.5,
    INTERVAL: 50,
    WIDTH: 10,
    ACTIVATION_PROB: 0.7
  },

  // Colors
  COLORS: {
    PURPLE: "#5e2ced",
    PINK: "#db6dc4",
    TEAL: "#4fdfb4",
    BACKGROUND: "#000000",
    TWINKLE: "#333333",
    PRIMARY: "#ffffff",
    SECONDARY: "#00ffff",
    TERTIARY: "#ff00ff"
  },

  // Canvas
  CANVAS: {
    RESIZE_DEBOUNCE: 250
  },

  // Text Animation
  TEXT_ANIMATION: {
    DURATION: 5,
    TIMING: 'ease-in',
    OPACITY: 0.7
  }
}; 