import { CONFIG } from '../config/index.js';

export class BinaryAnimation {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.bits = [];
    this.raf = null;
    this.then = Date.now();
    this.interval = CONFIG.BINARY_ANIMATION.INTERVAL_MULTIPLIER / this.config.FPS;
    this.frameCount = 0;
    this.gradient = null;
    this.twinkleEffects = [];

    this.init();
  }

  init() {
    // Create gradient
    this.setupGradient();

    // Setup bits
    this.setupBits();
    this.drawInitialBits();
  }

  setupGradient() {
    this.gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    this.gradient.addColorStop(0, this.config.COLORS.PURPLE);
    this.gradient.addColorStop(0.5, this.config.COLORS.PINK);
    this.gradient.addColorStop(1, this.config.COLORS.TEAL);

    this.ctx.fillStyle = this.config.COLORS.BACKGROUND;
    this.ctx.font = `${this.config.FONT_SIZE}px Monaco`;
    this.ctx.textBaseline = "bottom";
  }

  setupBits() {
    const columns = Math.floor(this.canvas.width / this.config.FONT_SIZE);
    const rows = Math.floor(this.canvas.height / this.config.FONT_SIZE);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const isEmpty = Math.random() < this.config.EMPTY_PROBABILITY;

        this.bits.push({
          x: c * this.config.FONT_SIZE,
          y: r * this.config.FONT_SIZE,
          value: isEmpty ? null : this.getRandomBit(),
          hasDrawn: false,
          isEmpty: isEmpty,
        });
      }
    }
  }

  getRandomBit() {
    return this.config.BIN_CHARS[Math.floor(Math.random() * CONFIG.BINARY_ANIMATION.CHAR_RANDOM_MULTIPLIER)];
  }

  drawInitialBits() {
    for (let bit of this.bits) {
      this.clearBit(bit);
      if (!bit.isEmpty) {
        this.drawBit(bit);
      }
      bit.hasDrawn = true;
    }
  }

  draw() {
    this.raf = window.requestAnimationFrame(this.draw.bind(this));
    this.frameCount++;

    const now = Date.now();
    const delta = now - this.then;

    if (delta > this.interval) {
      this.updateBits();

      // Special effects
      if (this.config.TWINKLE.ENABLED) this.applyTwinkleEffect();

      this.then = now - (delta % this.interval);
    }
  }

  updateBits() {
    for (let bit of this.bits) {
      if (bit.hasDrawn && !bit.isEmpty && Math.random() * 100 > CONFIG.BINARY_ANIMATION.TWINKLE_THRESHOLD) {
        this.clearBit(bit);
        bit.value = this.getNewBitValue(bit.value);
        this.drawBit(bit);
      }
    }
  }

  getNewBitValue(currentValue) {
    if (currentValue === this.config.BIN_CHARS[1]) {
      return this.config.BIN_CHARS[0];
    } else if (currentValue === this.config.BIN_CHARS[0]) {
      return this.config.BIN_CHARS[Math.floor(Math.random() * CONFIG.BINARY_ANIMATION.CHAR_RANDOM_MULTIPLIER)];
    }
    return this.config.BIN_CHARS[1];
  }

  applyTwinkleEffect() {
    if (Math.random() < this.config.TWINKLE.PROBABILITY) {
      const randomBit = this.bits[Math.floor(Math.random() * this.bits.length)];
      if (!randomBit.isEmpty) {
        this.ctx.fillStyle = this.config.COLORS.TWINKLE;
        this.drawBit(randomBit);

        setTimeout(() => {
          this.ctx.fillStyle = this.gradient;
          this.drawBit(randomBit);
        }, this.config.TWINKLE.DURATION);
      }
    }
  }

  clearBit(bit) {
    this.ctx.clearRect(
      bit.x,
      bit.y,
      this.config.FONT_SIZE,
      this.config.FONT_SIZE
    );
  }

  drawBit(bit) {
    if (!bit.isEmpty) {
      // Check if it should twinkle
      if (bit.hasDrawn && !bit.isEmpty && Math.random() * 100 > CONFIG.BINARY_ANIMATION.TWINKLE_THRESHOLD) {
        // Add twinkle effect
        this.twinkleEffects.push({
          x: bit.x,
          y: bit.y,
          startTime: performance.now(),
          duration: this.config.TWINKLE.DURATION
        });
      }

      bit.hasDrawn = true;
    }

    this.ctx.fillText(bit.value, bit.x, bit.y + this.config.FONT_SIZE);
  }

  redrawArea(x, y, width, height) {
    // Redraw area after special effects
    const startCol = Math.floor(x / this.config.FONT_SIZE);
    const endCol = Math.ceil((x + width) / this.config.FONT_SIZE);
    const startRow = Math.floor(y / this.config.FONT_SIZE);
    const endRow = Math.ceil((y + height) / this.config.FONT_SIZE);

    for (let r = startRow; r < endRow; r++) {
      for (let c = startCol; c < endCol; c++) {
        const index =
          r * Math.floor(this.canvas.width / this.config.FONT_SIZE) + c;
        if (index >= 0 && index < this.bits.length) {
          const bit = this.bits[index];
          this.clearBit(bit);
          if (!bit.isEmpty) {
            this.drawBit(bit);
          }
        }
      }
    }
  }

  resize(width, height) {
    this.canvas.width = width * this.config.PIXEL_RATIO;
    this.canvas.height = height * this.config.PIXEL_RATIO;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    // Recreate bits for new dimensions
    this.bits = [];
    this.init();
  }

  stop() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }
} 