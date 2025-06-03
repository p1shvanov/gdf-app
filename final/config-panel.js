import { CONFIG } from './config.js';

export class ConfigPanel {
  constructor(app) {
    this.app = app;
    this.panel = document.getElementById('config-panel');
    this.toggle = document.getElementById('config-toggle');
    this.resetButton = document.getElementById('config-reset');
    this.applyButton = document.getElementById('config-apply');
    
    this.inputs = {
      // Core settings
      fps: document.getElementById('fps'),
      fontSize: document.getElementById('font-size'),
      emptyProbability: document.getElementById('empty-probability'),
      pixelRatio: document.getElementById('pixel-ratio'),
      
      // Binary Animation
      binaryChar1: document.getElementById('binary-char-1'),
      binaryChar2: document.getElementById('binary-char-2'),
      binaryChar3: document.getElementById('binary-char-3'),
      
      // Effects
      twinkleEnabled: document.getElementById('twinkle-enabled'),
      twinkleProbability: document.getElementById('twinkle-probability'),
      twinkleDuration: document.getElementById('twinkle-duration'),
      twinkleColor: document.getElementById('twinkle-color'),
      wavesEnabled: document.getElementById('waves-enabled'),
      wavesSpeed: document.getElementById('waves-speed'),
      wavesInterval: document.getElementById('waves-interval'),
      wavesWidth: document.getElementById('waves-width'),
      wavesActivationProb: document.getElementById('waves-activation-prob'),
      
      // 3D Logo Camera
      cameraFov: document.getElementById('camera-fov'),
      cameraNear: document.getElementById('camera-near'),
      cameraFar: document.getElementById('camera-far'),
      cameraPositionZ: document.getElementById('camera-position-z'),
      
      // 3D Logo Model
      rotationSpeed: document.getElementById('rotation-speed'),
      extrudeDepth: document.getElementById('extrude-depth'),
      bevelThickness: document.getElementById('bevel-thickness'),
      bevelSize: document.getElementById('bevel-size'),
      bevelSegments: document.getElementById('bevel-segments'),
      
      // 3D Logo Shader
      fresnelIntensity: document.getElementById('fresnel-intensity'),
      contrast: document.getElementById('contrast'),
      tealInfluence: document.getElementById('teal-influence'),
      saturation: document.getElementById('saturation'),
      brightness: document.getElementById('brightness'),
      
      // Text Animation
      textAnimationDuration: document.getElementById('text-animation-duration'),
      textAnimationTiming: document.getElementById('text-animation-timing'),
      textOpacity: document.getElementById('text-opacity'),
      
      // Colors
      colorPrimary: document.getElementById('color-primary'),
      colorSecondary: document.getElementById('color-secondary'),
      colorTertiary: document.getElementById('color-tertiary'),
      backgroundColor: document.getElementById('background-color'),
      brandbookColor1: document.getElementById('brandbook-color-1'),
      brandbookColor2: document.getElementById('brandbook-color-2'),
      brandbookColor3: document.getElementById('brandbook-color-3')
    };

    this.init();
  }

  init() {
    // Initialize input values
    this.updateInputValues();

    // Add event listeners
    this.toggle.addEventListener('click', () => this.togglePanel());
    this.resetButton.addEventListener('click', () => this.resetConfig());
    this.applyButton.addEventListener('click', () => this.applyConfig());

    // Add input change listeners
    Object.values(this.inputs).forEach(input => {
      input.addEventListener('change', () => this.updateConfig());
    });
  }

  togglePanel() {
    this.panel.classList.toggle('active');
    this.panel.setAttribute('aria-hidden', !this.panel.classList.contains('active'));
  }

  updateInputValues() {
    // Core settings
    this.inputs.fps.value = CONFIG.FPS;
    this.inputs.fontSize.value = CONFIG.FONT_SIZE;
    this.inputs.emptyProbability.value = CONFIG.EMPTY_PROBABILITY;
    this.inputs.pixelRatio.value = CONFIG.PIXEL_RATIO;

    // Binary Animation
    this.inputs.binaryChar1.value = CONFIG.BIN_CHARS[0];
    this.inputs.binaryChar2.value = CONFIG.BIN_CHARS[1];
    this.inputs.binaryChar3.value = CONFIG.BIN_CHARS[2];

    // Effects
    this.inputs.twinkleEnabled.checked = CONFIG.TWINKLE.ENABLED;
    this.inputs.twinkleProbability.value = CONFIG.TWINKLE.PROBABILITY;
    this.inputs.twinkleDuration.value = CONFIG.TWINKLE.DURATION;
    this.inputs.twinkleColor.value = CONFIG.TWINKLE.COLOR;
    this.inputs.wavesEnabled.checked = CONFIG.WAVES.ENABLED;
    this.inputs.wavesSpeed.value = CONFIG.WAVES.SPEED;
    this.inputs.wavesInterval.value = CONFIG.WAVES.INTERVAL;
    this.inputs.wavesWidth.value = CONFIG.WAVES.WIDTH;
    this.inputs.wavesActivationProb.value = CONFIG.WAVES.ACTIVATION_PROB;

    // 3D Logo Camera
    this.inputs.cameraFov.value = CONFIG.LOGO_3D.CAMERA.FOV;
    this.inputs.cameraNear.value = CONFIG.LOGO_3D.CAMERA.NEAR;
    this.inputs.cameraFar.value = CONFIG.LOGO_3D.CAMERA.FAR;
    this.inputs.cameraPositionZ.value = CONFIG.LOGO_3D.CAMERA.POSITION_Z;

    // 3D Logo Model
    this.inputs.rotationSpeed.value = CONFIG.LOGO_3D.ROTATION.SPEED;
    this.inputs.extrudeDepth.value = CONFIG.LOGO_3D.EXTRUDE.DEPTH;
    this.inputs.bevelThickness.value = CONFIG.LOGO_3D.EXTRUDE.BEVEL_THICKNESS;
    this.inputs.bevelSize.value = CONFIG.LOGO_3D.EXTRUDE.BEVEL_SIZE;
    this.inputs.bevelSegments.value = CONFIG.LOGO_3D.EXTRUDE.BEVEL_SEGMENTS;

    // 3D Logo Shader
    this.inputs.fresnelIntensity.value = CONFIG.LOGO_3D.SHADER.FRESNEL_INTENSITY;
    this.inputs.contrast.value = CONFIG.LOGO_3D.SHADER.CONTRAST;
    this.inputs.tealInfluence.value = CONFIG.LOGO_3D.SHADER.TEAL_INFLUENCE;
    this.inputs.saturation.value = CONFIG.LOGO_3D.SHADER.SATURATION;
    this.inputs.brightness.value = CONFIG.LOGO_3D.SHADER.BRIGHTNESS;

    // Text Animation
    this.inputs.textAnimationDuration.value = CONFIG.TEXT_ANIMATION.DURATION;
    this.inputs.textAnimationTiming.value = CONFIG.TEXT_ANIMATION.TIMING;
    this.inputs.textOpacity.value = CONFIG.TEXT_ANIMATION.OPACITY;

    // Colors
    this.inputs.colorPrimary.value = CONFIG.COLORS.PRIMARY;
    this.inputs.colorSecondary.value = CONFIG.COLORS.SECONDARY;
    this.inputs.colorTertiary.value = CONFIG.COLORS.TERTIARY;
    this.inputs.backgroundColor.value = CONFIG.COLORS.BACKGROUND;
    this.inputs.brandbookColor1.value = CONFIG.COLORS.BRANDBOOK[0];
    this.inputs.brandbookColor2.value = CONFIG.COLORS.BRANDBOOK[1];
    this.inputs.brandbookColor3.value = CONFIG.COLORS.BRANDBOOK[2];
  }

  updateConfig() {
    // Core settings
    CONFIG.FPS = parseInt(this.inputs.fps.value);
    CONFIG.FONT_SIZE = parseInt(this.inputs.fontSize.value);
    CONFIG.EMPTY_PROBABILITY = parseFloat(this.inputs.emptyProbability.value);
    CONFIG.PIXEL_RATIO = parseFloat(this.inputs.pixelRatio.value);

    // Binary Animation
    CONFIG.BIN_CHARS = [
      this.inputs.binaryChar1.value,
      this.inputs.binaryChar2.value,
      this.inputs.binaryChar3.value
    ];

    // Effects
    CONFIG.TWINKLE.ENABLED = this.inputs.twinkleEnabled.checked;
    CONFIG.TWINKLE.PROBABILITY = parseFloat(this.inputs.twinkleProbability.value);
    CONFIG.TWINKLE.DURATION = parseInt(this.inputs.twinkleDuration.value);
    CONFIG.TWINKLE.COLOR = this.inputs.twinkleColor.value;
    CONFIG.WAVES.ENABLED = this.inputs.wavesEnabled.checked;
    CONFIG.WAVES.SPEED = parseFloat(this.inputs.wavesSpeed.value);
    CONFIG.WAVES.INTERVAL = parseInt(this.inputs.wavesInterval.value);
    CONFIG.WAVES.WIDTH = parseInt(this.inputs.wavesWidth.value);
    CONFIG.WAVES.ACTIVATION_PROB = parseFloat(this.inputs.wavesActivationProb.value);

    // 3D Logo Camera
    CONFIG.LOGO_3D.CAMERA.FOV = parseInt(this.inputs.cameraFov.value);
    CONFIG.LOGO_3D.CAMERA.NEAR = parseFloat(this.inputs.cameraNear.value);
    CONFIG.LOGO_3D.CAMERA.FAR = parseInt(this.inputs.cameraFar.value);
    CONFIG.LOGO_3D.CAMERA.POSITION_Z = parseInt(this.inputs.cameraPositionZ.value);

    // 3D Logo Model
    CONFIG.LOGO_3D.ROTATION.SPEED = parseFloat(this.inputs.rotationSpeed.value);
    CONFIG.LOGO_3D.EXTRUDE.DEPTH = parseInt(this.inputs.extrudeDepth.value);
    CONFIG.LOGO_3D.EXTRUDE.BEVEL_THICKNESS = parseFloat(this.inputs.bevelThickness.value);
    CONFIG.LOGO_3D.EXTRUDE.BEVEL_SIZE = parseFloat(this.inputs.bevelSize.value);
    CONFIG.LOGO_3D.EXTRUDE.BEVEL_SEGMENTS = parseInt(this.inputs.bevelSegments.value);

    // 3D Logo Shader
    CONFIG.LOGO_3D.SHADER.FRESNEL_INTENSITY = parseFloat(this.inputs.fresnelIntensity.value);
    CONFIG.LOGO_3D.SHADER.CONTRAST = parseFloat(this.inputs.contrast.value);
    CONFIG.LOGO_3D.SHADER.TEAL_INFLUENCE = parseFloat(this.inputs.tealInfluence.value);
    CONFIG.LOGO_3D.SHADER.SATURATION = parseFloat(this.inputs.saturation.value);
    CONFIG.LOGO_3D.SHADER.BRIGHTNESS = parseFloat(this.inputs.brightness.value);

    // Text Animation
    CONFIG.TEXT_ANIMATION.DURATION = parseFloat(this.inputs.textAnimationDuration.value);
    CONFIG.TEXT_ANIMATION.TIMING = this.inputs.textAnimationTiming.value;
    CONFIG.TEXT_ANIMATION.OPACITY = parseFloat(this.inputs.textOpacity.value);

    // Colors
    CONFIG.COLORS.PRIMARY = this.inputs.colorPrimary.value;
    CONFIG.COLORS.SECONDARY = this.inputs.colorSecondary.value;
    CONFIG.COLORS.TERTIARY = this.inputs.colorTertiary.value;
    CONFIG.COLORS.BACKGROUND = this.inputs.backgroundColor.value;
    CONFIG.COLORS.BRANDBOOK = [
      this.inputs.brandbookColor1.value,
      this.inputs.brandbookColor2.value,
      this.inputs.brandbookColor3.value
    ];
  }

  resetConfig() {
    // Reset to default values
    CONFIG.FPS = 30;
    CONFIG.FONT_SIZE = 14;
    CONFIG.PIXEL_RATIO = window.devicePixelRatio || 1;
    CONFIG.EMPTY_PROBABILITY = 0.3;
    
    CONFIG.BIN_CHARS = ["0", "1", "§"];
    
    CONFIG.TWINKLE.ENABLED = true;
    CONFIG.TWINKLE.PROBABILITY = 0.1;
    CONFIG.TWINKLE.DURATION = 200;
    CONFIG.TWINKLE.COLOR = "#333333";
    
    CONFIG.WAVES.ENABLED = false;
    CONFIG.WAVES.SPEED = 0.5;
    CONFIG.WAVES.INTERVAL = 50;
    CONFIG.WAVES.WIDTH = 5;
    CONFIG.WAVES.ACTIVATION_PROB = 0.7;
    
    CONFIG.LOGO_3D.CAMERA.FOV = 80;
    CONFIG.LOGO_3D.CAMERA.NEAR = 0.01;
    CONFIG.LOGO_3D.CAMERA.FAR = 1000;
    CONFIG.LOGO_3D.CAMERA.POSITION_Z = 85;
    
    CONFIG.LOGO_3D.ROTATION.SPEED = 0.005;
    CONFIG.LOGO_3D.EXTRUDE.DEPTH = 20;
    CONFIG.LOGO_3D.EXTRUDE.BEVEL_THICKNESS = 2;
    CONFIG.LOGO_3D.EXTRUDE.BEVEL_SIZE = 2;
    CONFIG.LOGO_3D.EXTRUDE.BEVEL_SEGMENTS = 3;
    
    CONFIG.LOGO_3D.SHADER.FRESNEL_INTENSITY = 1;
    CONFIG.LOGO_3D.SHADER.CONTRAST = 1;
    CONFIG.LOGO_3D.SHADER.TEAL_INFLUENCE = 1;
    CONFIG.LOGO_3D.SHADER.SATURATION = 1;
    CONFIG.LOGO_3D.SHADER.BRIGHTNESS = 1;
    
    CONFIG.TEXT_ANIMATION.DURATION = 5;
    CONFIG.TEXT_ANIMATION.TIMING = 'ease-in';
    CONFIG.TEXT_ANIMATION.OPACITY = 0.7;
    
    CONFIG.COLORS.PRIMARY = '#ffffff';
    CONFIG.COLORS.SECONDARY = '#00ffff';
    CONFIG.COLORS.TERTIARY = '#ff00ff';
    CONFIG.COLORS.BACKGROUND = '#0f1e28';
    CONFIG.COLORS.BRANDBOOK = ['#5e2ced', '#db6dc4', '#4fdfb4'];

    // Update input values
    this.updateInputValues();
  }

  applyConfig() {
    this.updateConfig();
    this.app.handleResize(); // Restart animations with new config
  }
} 