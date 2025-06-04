export const CONFIG = {
  // Core settings
  FPS: 60,
  FONT_SIZE: 14,
  PIXEL_RATIO: window.devicePixelRatio || 1,
  EMPTY_PROBABILITY: 0.3,

  // Binary Animation
  BIN_CHARS: ["0", "1", "§"],
  BINARY_ANIMATION: {
    INTERVAL_MULTIPLIER: 2000, // Used with FPS: this.interval = 2000 / this.config.FPS
    TWINKLE_THRESHOLD: 95, // Math.random() * 100 > 95
    CHAR_RANDOM_MULTIPLIER: 2.1 // Math.floor(Math.random() * 2.1)
  },

  // API and Polling Settings
  API: {
    POLLING_INTERVAL: 30000, // 30 seconds
    RETRY_DELAY: 1000, // 1 second
    MAX_RETRIES: 3,
    DEFAULT_WORDS_LIMIT: 500
  },

  // Terminal Settings
  TERMINAL: {
    MAX_COMMANDS: 10, // Maximum number of commands to keep in history
    VALIDATION: {
      MAX_LENGTH: 15, // Maximum characters allowed in input
      MIN_LENGTH: 2,   // Minimum characters required (more meaningful than single letter)
      WARNING_THRESHOLD: 0.8, // Show warning at 80% of max length
      DANGER_THRESHOLD: 1.0   // Show danger at 100% of max length
    },
    PROCESSING: {
      STEP_DELAY: 800, // Delay between processing steps (ms)
      FINAL_DELAY: 1200, // Delay before showing final result (ms)
      CLEANUP_DELAY: 600, // Delay for processing steps cleanup animation (ms)
      RANDOM_STEPS: {
        COUNT: 4, // Number of random steps to show (3-5 range)
        MIN_COUNT: 3,
        MAX_COUNT: 5
      },
      STEP_POOL: [
        // Technical steps
        "Initializing vision compiler...",
        "Scanning input for future patterns...",
        "Encrypting data stream...",
        "Establishing connection to future network...",
        "Uploading to digital canvas...",
        "Parsing semantic vectors...",
        "Analyzing future probability matrix...",
        "Calibrating quantum processors...",
        "Synchronizing with global network...",
        "Optimizing neural pathways...",
        
        // Creative steps  
        "Weaving dreams into digital fabric...",
        "Translating vision into code...",
        "Mapping thoughts to tomorrow's language...",
        "Crystallizing imagination...",
        "Bridging present to future...",
        "Encoding hopes into data streams...",
        
        // Futuristic steps
        "Interfacing with AI collective...",
        "Processing through quantum channels...",
        "Validating against future protocols...",
        "Merging with digital consciousness...",
        "Transcribing to universal language...",
        "Integrating with global wisdom..."
      ],
      FINAL_STEP_POOL: [
        "Processing complete. Generating response...",
        "Compilation finished. Preparing output...", 
        "Vision integrated. Finalizing transmission...",
        "Data synthesis complete. Building result...",
        "Future pattern locked. Delivering wisdom..."
      ]
    },
    RESPONSES: {
      SUCCESS: [
        "Initializing future vision...",
        "Code fragment accepted. Processing...",
        "Your vision added to the digital canvas.",
        "Future fragment uploaded successfully.",
        "Innovation recorded. Building tomorrow...",
        "Concept integrated into the global digital forum.",
        "Vision archived in the digital future.",
        "Your idea joins the collective wisdom.",
        "Future.exe: Your vision compiled successfully.",
        ">>> Uploading dreams to tomorrow's mainframe...",
        "Timeline updated. Your future is loading...",
        "Digital DNA sequence accepted. Evolution in progress...",
        "Tomorrow.config modified. Rebooting reality...",
        "Vision encrypted and sent to 2030...",
        "Future algorithm updated with your input.",
        "Quantum thought pattern recognized and stored."
      ],
      VALIDATION_ERROR: [
        "ERROR: Input exceeds maximum length limit.",
        "WARNING: Message too long for future processing.",
        "LIMIT EXCEEDED: Keep your vision concise.",
        "ERROR: Future fragments must be brief.",
        "BUFFER OVERFLOW: Dreams too large for quantum storage.",
        "SYNTAX ERROR: Future visions require brevity.",
        "MEMORY LIMIT: Compress your tomorrow into fewer words.",
        "TIMEOUT: Your vision is taking too long to load.",
        "STACK OVERFLOW: Ideas too complex for current reality."
      ],
      EMPTY_INPUT: [
        "ERROR: Empty vision detected. Please share your future.",
        "WARNING: No input received. Share your tomorrow.",
        "NULL INPUT: The future awaits your contribution.",
        "VOID DETECTED: Fill the digital space with your dreams.",
        "MISSING DATA: Your future is undefined.",
        "EMPTY BUFFER: Initialize your vision.exe",
        "NO SIGNAL: Transmit your hopes to tomorrow."
      ],
      TOO_SHORT: [
        "ERROR: Vision too brief. Expand your future.",
        "WARNING: Input insufficient for processing.",
        "MINIMAL DATA: Your tomorrow needs more details.",
        "FRAGMENT TOO SMALL: Amplify your digital dream.",
        "BUFFER UNDERRUN: Add more to your vision.",
        "LOW SIGNAL: Boost your future transmission."
      ],
      NETWORK_ERROR: [
        "CONNECTION ERROR: Future network temporarily offline.",
        "SYNC FAILED: Unable to reach the digital tomorrow.",
        "NETWORK TIMEOUT: Future servers are busy building tomorrow.",
        "FIREWALL BLOCKED: Your vision couldn't reach the future.",
        "SERVER DOWN: Tomorrow's mainframe is updating.",
        "PACKET LOST: Your dream got lost in the time stream.",
        "DNS ERROR: Cannot resolve future.world domain.",
        "GATEWAY TIMEOUT: The portal to tomorrow is loading..."
      ]
    }
  },

  // Lingo Animation Settings
  LINGO_ANIMATION: {
    MAX_DIVS: 1000,
    INITIAL_DELAY: 750, // Delay before starting animation interval
    CREATION_INTERVAL: 10, // Interval for creating new divs
    Z_DEPTH_MIN: 100,
    Z_DEPTH_MAX: 600,
    QUADRANT_BUFFER: 50,
    DESTINATION_OFFSET: 50 // Used as ±50%
  },

  // Logo Animation Settings
  LOGO_ANIMATION: {
    DEFAULT_INTERVAL: 5000 // 10 seconds between logo changes
  },

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
    },
    LIGHTING: {
      AMBIENT_INTENSITY: 0.8,
      DIRECTIONAL_INTENSITY: 0.5
    }
  }
}; 