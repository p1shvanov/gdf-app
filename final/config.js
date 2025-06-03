import { commonConfig } from "../shared/config/common-config.js";

export const CONFIG = {
  ...commonConfig,

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
  }
}; 