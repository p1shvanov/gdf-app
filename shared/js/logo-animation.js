import { CONFIG } from '../config/index.js';

export class LogoAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.logos = [];
    this.currentIndex = 0;
    this.interval = null;
    
    // Animation pairs for exit and entrance
    this.animationPairs = [
      { exit: 'bounceOutLeft', enter: 'bounceInLeft' },,
    ];

    this.init();
  }

  init() {
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.createHeaderStructure();
  }

  createHeaderStructure() {
    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    logoContainer.id = 'logo-container';

    // Create header text container
    const headerText = document.createElement('div');
    headerText.className = 'header-text';
    
    const headerTitle = document.createElement('div');
    headerTitle.className = 'header-title';
    headerTitle.textContent = 'CODE OF THE FUTURE';
    
    const headerSubtitle = document.createElement('div');
    headerSubtitle.className = 'header-subtitle';
    headerSubtitle.textContent = 'Shaping the Code of the Future at the Global Digital Forum';

    headerText.appendChild(headerTitle);
    headerText.appendChild(headerSubtitle);

    // Create logos
    this.createLogos(logoContainer);

    // Append to container
    this.container.appendChild(logoContainer);
    this.container.appendChild(headerText);

    // Set first logo as active
    if (this.logos.length > 0) {
      this.logos[0].classList.add("active");
    }
  }

  createLogos(logoContainer) {
    const logoVariants = [
      { src: '../assets/logo/svg/GDF_Logo-01.svg', alt: 'Logo variant 1' },
      { src: '../assets/logo/svg/GDF_Logo-02.svg', alt: 'Logo variant 2' },
      { src: '../assets/logo/svg/GDF_Logo-03.svg', alt: 'Logo variant 3' },
      { src: '../assets/logo/svg/GDF_Logo-04.svg', alt: 'Logo variant 4' },
      { src: '../assets/logo/svg/GDF_Logo-05.svg', alt: 'Logo variant 5' },
      { src: '../assets/logo/svg/GDF_Logo-06.svg', alt: 'Logo variant 6' }
    ];

    logoVariants.forEach((logoData, index) => {
      const img = document.createElement('img');
      img.src = logoData.src;
      img.className = 'logo';
      img.alt = logoData.alt;
      img.dataset.logoIndex = index;

      this.logos.push(img);
      logoContainer.appendChild(img);
    });
  }

  getRandomAnimationPair() {
    return this.animationPairs[Math.floor(Math.random() * this.animationPairs.length)];
  }

  start(intervalTime = CONFIG.LOGO_ANIMATION.DEFAULT_INTERVAL) {
    this.interval = setInterval(() => {
      this.rotate();
    }, intervalTime);
  }

  rotate() {
    const currentLogo = this.logos[this.currentIndex];
    const nextIndex = (this.currentIndex + 1) % this.logos.length;
    const nextLogo = this.logos[nextIndex];
    const animations = this.getRandomAnimationPair();

    // Remove current logo with exit animation
    currentLogo.style.animation = `${animations.exit} 2s forwards`;
    currentLogo.classList.remove("active");

    // Add next logo with entrance animation
    nextLogo.style.animation = `${animations.enter} 2s forwards`;
    nextLogo.classList.add("active");

    this.currentIndex = nextIndex;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
