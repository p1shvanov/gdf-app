export const CONFIG = {
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
  },

  LOGO_3D: {
    CAMERA: {
      FOV: 10,
      NEAR: 0.01,
      FAR: 1000,
      POSITION_Z: 800
    },
    ROTATION: {
      SPEED: 0.005
    },
    EXTRUDE: {
      DEPTH: 50,
      BEVEL_THICKNESS: 2,
      BEVEL_SIZE: 2,
      BEVEL_SEGMENTS: 3
    },
    SHADER: {
      FRESNEL_INTENSITY: 1,
      CONTRAST: 1,
      TEAL_INFLUENCE: 1,
      SATURATION: 1,
      BRIGHTNESS: 1
    }
  }
}; 