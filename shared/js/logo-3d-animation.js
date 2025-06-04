import { CONFIG } from "../config/index.js";

export class Logo3DAnimation {
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.svgGroup = null;
    this.rotationGroup = null;
    this.isAnimating = false;
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Brand colors
    this.brandColors = {
      purple: CONFIG.COLORS.PURPLE,
      pink: CONFIG.COLORS.PINK,
      teal: CONFIG.COLORS.TEAL,
    };

    // Shader parameters
    this.shaderParams = {
      contrast: CONFIG.LOGO_3D.SHADER.CONTRAST,
      tealInfluence: CONFIG.LOGO_3D.SHADER.TEAL_INFLUENCE,
      fresnelIntensity: CONFIG.LOGO_3D.SHADER.FRESNEL_INTENSITY,
      saturation: CONFIG.LOGO_3D.SHADER.SATURATION,
      brightness: CONFIG.LOGO_3D.SHADER.BRIGHTNESS,
    };

    // Add shader code for gradient
    this.vertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    this.fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float contrast;
      uniform float tealInfluence;
      uniform float fresnelIntensity;
      uniform float saturation;
      uniform float brightness;
      
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        // Calculate view direction
        vec3 viewDir = normalize(vViewPosition);
        
        // Create gradient based on normal and view direction
        float t1 = dot(vNormal, viewDir);
        float t2 = dot(vNormal, vec3(0.0, 1.0, 0.0));
        
        // Normalize values to 0-1 range and increase contrast
        t1 = pow((t1 + 1.0) * 0.5, contrast);
        t2 = pow((t2 + 1.0) * 0.5, contrast);
        
        // Mix colors with balanced influence
        vec3 gradient1 = mix(color1, color2, t1);
        vec3 finalColor = mix(gradient1, color3, t2 * tealInfluence);
        
        // Add fresnel effect with balanced colors
        float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);
        vec3 fresnelColor = mix(color1, color3, fresnel);
        finalColor = mix(finalColor, fresnelColor, fresnel * fresnelIntensity);
        
        // Adjust brightness and contrast
        finalColor = pow(finalColor, vec3(saturation));
        finalColor = finalColor * brightness;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    this.init();
  }

  init() {
    // Setup renderer
    const container = document.querySelector('.logo-3d');
    const rect = container.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setClearColor(0x000000, 0);

    container.appendChild(this.renderer.domElement);

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      CONFIG.LOGO_3D.CAMERA.FOV,
      rect.width / rect.height,
      CONFIG.LOGO_3D.CAMERA.NEAR,
      CONFIG.LOGO_3D.CAMERA.FAR
    );
    this.camera.position.z = CONFIG.LOGO_3D.CAMERA.POSITION_Z;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, CONFIG.LOGO_3D.LIGHTING.AMBIENT_INTENSITY);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, CONFIG.LOGO_3D.LIGHTING.DIRECTIONAL_INTENSITY);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);

    // Setup resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, CONFIG.CANVAS.RESIZE_DEBOUNCE);
    });

    // Load and parse SVG
    this.loadSVG();
  }

  handleResize() {
    if (!this.isAnimating) return;

    const container = document.querySelector('.logo-3d');
    const rect = container.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }

  loadSVG() {
    const loader = new THREE.SVGLoader();
    const svgData =
      loader.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 748.06 161.22" aria-hidden="true">
              <path d="M70.56,98.27c-1.47-.4-2.9-.88-4.3-1.43-15.45-6.09-26.34-21.13-26.34-38.67,0-22.95,18.62-41.55,41.58-41.55h.03V0h-.03C49.35,0,23.29,26.04,23.29,58.17c0,24.6,15.28,45.63,36.87,54.14.06.03.13.05.2.08l10.2-14.11Z"/>
              <path d="M42.24,136.61l-9.84,13.41c9.49,6.71,21.07,10.65,33.58,10.65,32.15,0,58.22-26.04,58.22-58.17,0-11.26-3.2-21.77-8.75-30.67l-16.42,5.46c5.35,6.99,8.53,15.73,8.53,25.21,0,22.95-18.61,41.55-41.58,41.55-8.83,0-17.01-2.75-23.74-7.43Z"/>
              <path d="M18.57,62.22l-15.78-5.28c-1.81,5.62-2.79,11.62-2.79,17.85,0,32.13,26.07,58.17,58.22,58.17,17.9,0,33.92-8.08,44.6-20.78l-10.23-14c-7.48,10.96-20.09,18.16-34.37,18.16-22.97,0-41.58-18.6-41.58-41.55,0-4.38.67-8.6,1.93-12.57Z"/>
              <path d="M121.35,136.2l9.99,13.3c14.49-10.58,23.9-27.69,23.9-47,0-32.13-26.06-58.17-58.21-58.17-5.38,0-10.58.73-15.53,2.09v17.52c4.8-1.93,10.04-2.99,15.53-2.99,22.96,0,41.58,18.6,41.58,41.55,0,13.87-6.8,26.16-17.26,33.7Z"/>
              <path d="M63.28,77.26c-.05-.82-.07-1.64-.07-2.47,0-22.95,18.62-41.55,41.58-41.55,18.61,0,34.37,12.22,39.67,29.07l15.78-5.28c-7.51-23.44-29.5-40.41-55.45-40.41-31.1,0-56.51,24.38-58.13,55.05l16.62,5.58Z"/>
            </svg>`);

    // Create group for SVG paths
    this.svgGroup = new THREE.Group();

    // Process SVG paths
    svgData.paths.forEach((path, index) => {
      const shapes = path.toShapes(true);

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: CONFIG.LOGO_3D.EXTRUDE.DEPTH,
          bevelEnabled: true,
          bevelThickness: CONFIG.LOGO_3D.EXTRUDE.BEVEL_THICKNESS,
          bevelSize: CONFIG.LOGO_3D.EXTRUDE.BEVEL_SIZE,
          bevelSegments: CONFIG.LOGO_3D.EXTRUDE.BEVEL_SEGMENTS,
        });

        // Create shader material with gradient
        const material = this.createShaderMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        this.svgGroup.add(mesh);
      });
    });

    // Get the bounding box of the group
    const box = new THREE.Box3().setFromObject(this.svgGroup);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const scale = 100 / Math.max(size.x, size.y);
    this.svgGroup.scale.set(scale, -scale, scale);

    // Update bounding box after scaling
    box.setFromObject(this.svgGroup);
    box.getSize(size);
    box.getCenter(center);

    // Create a container group for centering
    const containerGroup = new THREE.Group();
    containerGroup.add(this.svgGroup);

    // Center the SVG group within the container
    this.svgGroup.position.x = -center.x;
    this.svgGroup.position.y = -center.y;
    this.svgGroup.position.z = -center.z;

    // Create rotation group
    this.rotationGroup = new THREE.Group();
    this.rotationGroup.add(containerGroup);
    this.scene.add(this.rotationGroup);
  }

  createShaderMaterial() {
    const color1 = new THREE.Color(CONFIG.COLORS.TEAL);
    const color2 = new THREE.Color(CONFIG.COLORS.PINK);
    const color3 = new THREE.Color(CONFIG.COLORS.PURPLE);

    // Create shader material with gradient
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Vector3(color1.r, color1.g, color1.b) },
        color2: { value: new THREE.Vector3(color2.r, color2.g, color2.b) },
        color3: { value: new THREE.Vector3(color3.r, color3.g, color3.b) },
        contrast: { value: CONFIG.LOGO_3D.SHADER.CONTRAST },
        tealInfluence: { value: CONFIG.LOGO_3D.SHADER.TEAL_INFLUENCE },
        fresnelIntensity: { value: CONFIG.LOGO_3D.SHADER.FRESNEL_INTENSITY },
        saturation: { value: CONFIG.LOGO_3D.SHADER.SATURATION },
        brightness: { value: CONFIG.LOGO_3D.SHADER.BRIGHTNESS },
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
    });

    return material;
  }

  animate() {
    if (!this.isAnimating) return;

    this.renderer.render(this.scene, this.camera);

    if (this.rotationGroup) {
      this.rotationGroup.rotation.y += CONFIG.LOGO_3D.ROTATION.SPEED;
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animate();
  }

  stop() {
    this.isAnimating = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
