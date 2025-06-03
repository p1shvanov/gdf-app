export const binaryAnimationConfig = {
  FPS: 60,
  FONT_SIZE: 14,
  PIXEL_RATIO: window.devicePixelRatio || 1,
  EMPTY_PROBABILITY: 0.3,
  BIN_CHARS: ["0", "1"],
  COLORS: {
    BRANDBOOK: ["#FF0000", "#00FF00", "#0000FF"], // Базовые цвета бренда
    BACKGROUND: "#000000",
    TWINKLE: "#FFFFFF"
  },
  TWINKLE: {
    ENABLED: true,
    PROBABILITY: 0.1,
    DURATION: 100
  },
  WAVES: {
    ENABLED: true,
    SPEED: 1,
    INTERVAL: 100,
    WIDTH: 20,
    ACTIVATION_PROB: 0.5
  }
}; 