# Shared модули

## Описание
Shared модули содержат общие компоненты, утилиты и конфигурацию, используемые в Form и Final страницах.

## Структура
```
shared/
├── config/           # Конфигурационные файлы
│   ├── index.js     # Основные настройки
│   └── app-scripts-current.js  # Google Apps Script
├── js/              # JavaScript модули
│   ├── binary-animation.js
│   ├── canvas-utils.js
│   ├── lingo-animation.js
│   ├── logo-3d-animation.js
│   ├── logo-animation.js
│   ├── sheets-service.js
│   ├── terminal-animation.js
│   ├── terminal.js
│   └── words-receiver.js
└── css/             # Общие стили
```

## Модули

### 1. Анимации

#### BinaryAnimation
Анимированный фон с бинарным кодом. Использует Canvas для отрисовки.

```javascript
class BinaryAnimation {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    this.chars = this.config.BIN_CHARS;
    this.animationId = null;
  }

  draw() {
    // Очистка canvas
    this.ctx.fillStyle = this.config.COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Отрисовка символов
    this.ctx.fillStyle = this.config.COLORS.TWINKLE;
    for (let i = 0; i < this.canvas.width; i += this.config.FONT_SIZE) {
      for (let j = 0; j < this.canvas.height; j += this.config.FONT_SIZE) {
        if (Math.random() > this.config.EMPTY_PROBABILITY) {
          const char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.ctx.fillText(char, i, j);
        }
      }
    }

    this.animationId = requestAnimationFrame(this.draw.bind(this));
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
```

#### LingoAnimation
Анимация слов на Final странице.

```javascript
class LingoAnimation {
  constructor(config) {
    this.config = config;
    this.words = [];
    this.positions = new Map();
  }

  updateWords(words) {
    this.words = words;
    this.calculatePositions();
  }

  calculatePositions() {
    this.positions.clear();
    this.words.forEach((word, index) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      this.positions.set(word, { x, y });
    });
  }

  draw(ctx) {
    this.positions.forEach((pos, word) => {
      ctx.fillStyle = this.config.COLORS.PRIMARY;
      ctx.font = `${this.config.FONT_SIZE}px Montserrat`;
      ctx.fillText(word, pos.x, pos.y);
    });
  }
}
```

### 2. Сервисы

#### SheetsService
Сервис для работы с Google Sheets.

```javascript
class SheetsService {
  constructor() {
    this.SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
    this.queue = [];
    this.isProcessing = false;
  }

  async submitWord(word, verified = false) {
    const cleanWord = this.cleanInput(word);
    
    if (!cleanWord) {
      throw new Error('Empty word after cleaning');
    }

    this.queue.push({ word: cleanWord, verified });
    
    if (!this.isProcessing) {
      this.processQueue();
    }

    return { status: 'queued', message: 'Word added to queue' };
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const { word, verified } = this.queue[0];
      
      try {
        const response = await fetch(this.SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: word, verified })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
          this.queue.shift();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error submitting word:', error);
        break;
      }
    }

    this.isProcessing = false;
  }
}
```

#### WordsReceiver
Сервис для получения слов из Google Sheets.

```javascript
class WordsReceiver {
  constructor() {
    this.sheetsService = new SheetsService();
    this.subscribers = new Set();
    this.pollingInterval = 30000; // 30 секунд
    this.isPolling = false;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  startPolling() {
    if (this.isPolling) return;
    
    this.isPolling = true;
    this.poll();
  }

  async poll() {
    try {
      const data = await this.sheetsService.getWords();
      this.subscribers.forEach(callback => callback(data.words));
    } catch (error) {
      console.error('Error polling words:', error);
    }

    if (this.isPolling) {
      setTimeout(() => this.poll(), this.pollingInterval);
    }
  }

  stopPolling() {
    this.isPolling = false;
  }
}
```

### 3. Утилиты

#### CanvasUtils
Утилиты для работы с canvas.

```javascript
export function setupCanvas() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  return canvas;
}
```

## Конфигурация
Основные настройки в `config/index.js`:
```javascript
export const CONFIG = {
  // Core settings
  FPS: 60,
  FONT_SIZE: 14,
  PIXEL_RATIO: window.devicePixelRatio || 1,
  EMPTY_PROBABILITY: 0.3,

  // Colors
  COLORS: {
    PURPLE: "#5e2ced",
    PINK: "#db6dc4",
    TEAL: "#4fdfb4",
    BACKGROUND: "#000000",
    PRIMARY: "#ffffff"
  },

  // Canvas
  CANVAS: {
    RESIZE_DEBOUNCE: 250
  }
};
```

## Интеграция

### Google Apps Script
Скрипт для работы с Google Sheets (`app-scripts-current.js`):
```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Validate the data
    if (!data.value || typeof data.value !== 'string') {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Invalid data format'
      })).setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Add timestamp
    const timestamp = new Date().toISOString();
    
    // Add the new row
    sheet.appendRow([data.value, data.verified, timestamp]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Word submitted successfully',
      'timestamp': timestamp
    })).setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

### Google Sheets
Структура таблицы:
1. Слово/фраза
2. Статус верификации
3. Timestamp 