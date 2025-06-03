export const CONFIG = {
  // Core settings
  FPS: 30,
  FONT_SIZE: 14,
  PIXEL_RATIO: window.devicePixelRatio || 1,
  EMPTY_PROBABILITY: 0.3,

  // Binary Animation
  BIN_CHARS: ["0", "1", "§"],
  DEMO_WORDS: [
    "HTML", "CSS", "JavaScript", "React", "Vue", "Angular",
    "TypeScript", "Node.js", "Python", "Java", "C++", "Ruby",
    "PHP", "Swift", "Kotlin", "Go", "Rust", "Dart",
    "Flutter", "Docker", "Kubernetes", "AWS", "Azure", "GCP",
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST",
    "API", "WebSocket", "WebGL", "Three.js", "Canvas", "SVG",
    "WebAssembly", "PWA", "SPA", "SSR", "JAMstack", "Microservices",
    "CI/CD", "DevOps", "Agile", "Scrum", "Git", "GitHub",
    "VS Code", "Webpack", "Babel", "ESLint", "Prettier", "Jest"
  ],

  // Effects
  TWINKLE: {
    ENABLED: true,
    PROBABILITY: 0.1,
    DURATION: 200,
    COLOR: "#333333"
  },

  WAVES: {
    ENABLED: false,
    SPEED: 0.5,
    INTERVAL: 50,
    WIDTH: 5,
    ACTIVATION_PROB: 0.7
  },

  // 3D Logo Camera
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
  },

  // Text Animation
  TEXT_ANIMATION: {
    DURATION: 5,
    TIMING: 'ease-in',
    OPACITY: 0.7
  },

  // Colors
  COLORS: {
    PRIMARY: '#ffffff',
    SECONDARY: '#00ffff',
    TERTIARY: '#ff00ff',
    BACKGROUND: '#0f1e28',
    BRANDBOOK: ['#5e2ced', '#db6dc4', '#4fdfb4'],
    TWINKLE: '#333333'
  },

  // Canvas
  CANVAS: {
    RESIZE_DEBOUNCE: 250
  }
};
