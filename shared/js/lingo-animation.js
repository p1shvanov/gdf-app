import { CONFIG } from '../config/index.js';

export class LingoAnimation {
  constructor(config) {
    this.config = config;
    this.divs = [];
    this.counter = 0;
    this.maxDivs = CONFIG.LINGO_ANIMATION.MAX_DIVS;
    this.bodyH = document.body.clientHeight;
    this.bodyW = document.body.clientWidth;
    this.words = []; // Initialize with empty array
    this.animationInterval = null;
  }

  init() {
    // Add resize handler
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  updateWords(newWords) {
    
    // Update words array, filter out invalid words
    this.words = newWords
      .filter(word => {
        const isValid = word !== null && word !== undefined;
        if (!isValid) {
          console.log('Invalid word:', word);
        }
        return isValid;
      })
      .map(word => String(word)); // Convert all values to strings
    
    
    // Start animation if not already started
    if (!this.animationInterval && this.words.length > 0) {
      // Create initial divs
      for (let i = 0; i < Math.min(this.maxDivs / 3, this.words.length); i++) {
        this.newLingo();
      }

      // Start interval for creating new divs
      setTimeout(() => {
        this.animationInterval = setInterval(() => this.newLingo(), CONFIG.LINGO_ANIMATION.CREATION_INTERVAL);
      }, CONFIG.LINGO_ANIMATION.INITIAL_DELAY);
    }
  }

  handleResize() {
    this.bodyW = document.body.clientWidth;
    this.bodyH = document.body.clientHeight;
  }

  newLingo() {
    if (!this.words || this.words.length === 0) {
      console.log('No words available for animation');
      return;
    }

    const buffer = 0;
    this.counter++;
    const word = this.getRandomValue(this.words);
    
    if (!word) {
      console.log('Invalid word selected:', word);
      return;
    }
    
    let lingo = word;

    // Replace < with &lt;
    const lthan = '<';
    const regi = new RegExp(lthan, 'g');
    lingo = lingo.replace(regi, '&lt;');

    const div = document.createElement('div');
    div.id = 'div' + this.counter;
    div.classList.add('lingo');
    div.style.left = this.getRandomInt(buffer, this.bodyW - div.style.width - buffer) + 'px';
    div.style.top = this.getRandomInt(buffer, this.bodyH - div.style.height - buffer) + 'px';
    div.innerHTML = lingo;

    div.style.setProperty('--init-x', div.style.left + 'px');
    div.style.setProperty('--init-y', div.style.top + 'px');
    const _destZ = this.getRandomInt(CONFIG.LINGO_ANIMATION.Z_DEPTH_MIN, CONFIG.LINGO_ANIMATION.Z_DEPTH_MAX);

    const quad = this.getQuandrantForElem(div);
    if (quad === 1) {
      div.style.setProperty('--dest-x', -CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-y', -CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-z', _destZ + 'px');
    }
    if (quad === 2) {
      div.style.setProperty('--dest-x', CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-y', -CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-z', _destZ + 'px');
    }
    if (quad === 3) {
      div.style.setProperty('--dest-x', -CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-y', CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-z', _destZ + 'px');
    }
    if (quad === 4) {
      div.style.setProperty('--dest-x', CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-y', CONFIG.LINGO_ANIMATION.DESTINATION_OFFSET + '%');
      div.style.setProperty('--dest-z', _destZ + 'px');
    }

    document.body.appendChild(div);
    this.divs.push(div.id);
    if (this.divs.length > this.maxDivs) {
      const elem = document.getElementById(this.divs[0]);
      elem.parentNode.removeChild(elem);
      this.divs.shift();
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomValue(array) {
    if (!array || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  }

  getQuandrantForElem(elem) {
    let result = 0;
    const divDim = {
      X: elem.style.left.slice(0, -2),
      Y: elem.style.top.slice(0, -2),
    };
    const buffer = CONFIG.LINGO_ANIMATION.QUADRANT_BUFFER;

    if (divDim.X >= this.bodyW / 2 - buffer) {
      if (divDim.Y >= this.bodyH / 2) {
        result = 4;
      }
      if (divDim.Y <= this.bodyH / 2) {
        result = 2;
      }
    }

    if (divDim.X <= this.bodyW / 2 - buffer) {
      if (divDim.Y >= this.bodyH / 2) {
        result = 3;
      }
      if (divDim.Y <= this.bodyH / 2) {
        result = 1;
      }
    }

    return result;
  }
} 