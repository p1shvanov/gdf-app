import { CONFIG } from './config.js';

export class Logo3DAnimation {
  constructor() {
    this.scene = new THREE.Scene();
    this.ratio = window.innerWidth / window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.camera = new THREE.PerspectiveCamera(
      CONFIG.LOGO_3D.CAMERA.FOV,
      this.ratio,
      CONFIG.LOGO_3D.CAMERA.NEAR,
      CONFIG.LOGO_3D.CAMERA.FAR
    );
    this.svgGroup = null;
    this.rotationGroup = null;
    this.isAnimating = false;
    this.animationFrameId = null;
    
    // Brand colors
    this.brandColors = CONFIG.COLORS.BRANDBOOK;
    
    // Shader parameters
    this.shaderParams = {
      contrast: CONFIG.LOGO_3D.SHADER.CONTRAST,
      tealInfluence: CONFIG.LOGO_3D.SHADER.TEAL_INFLUENCE,
      fresnelIntensity: CONFIG.LOGO_3D.SHADER.FRESNEL_INTENSITY,
      saturation: CONFIG.LOGO_3D.SHADER.SATURATION,
      brightness: CONFIG.LOGO_3D.SHADER.BRIGHTNESS
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
    const container = document.querySelector(".logo-3d");
    const rect = container.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setClearColor(0x000000, 0);
    
    container.appendChild(this.renderer.domElement);

    // Setup camera
    this.camera.position.z = CONFIG.LOGO_3D.CAMERA.POSITION_Z;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
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

    const container = document.querySelector(".logo-3d");
    const rect = container.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }

  loadSVG() {
    const svgMarkup = document.querySelector('svg').outerHTML;
    const loader = new THREE.SVGLoader();
    const svgData = loader.parse(svgMarkup);

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
          bevelSegments: CONFIG.LOGO_3D.EXTRUDE.BEVEL_SEGMENTS
        });

        // Convert hex colors to RGB
        const color1 = new THREE.Color(CONFIG.COLORS.BRANDBOOK[1]);
        const color2 = new THREE.Color(CONFIG.COLORS.BRANDBOOK[0]);
        const color3 = new THREE.Color(CONFIG.COLORS.BRANDBOOK[2]);

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
            brightness: { value: CONFIG.LOGO_3D.SHADER.BRIGHTNESS }
          },
          vertexShader: this.vertexShader,
          fragmentShader: this.fragmentShader
        });

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