# Form страница

## Описание
Form страница представляет собой интерфейс для ввода слов на тач-панелях. Страница реализована как терминальный интерфейс с виртуальной клавиатурой и анимированным фоном.

## Компоненты

### 1. Терминальный интерфейс
Реализован в `terminal.js`. Поддерживает ввод текста через виртуальную клавиатуру, имеет анимацию ввода и вывода текста, поддерживает русскую и английскую раскладки.

```javascript
class Terminal {
  constructor(config) {
    this.config = config;
    this.history = [];
    this.currentInput = '';
    this.isFocused = false;
  }

  appendToHistory(text) {
    this.history.push(text);
    if (this.history.length > this.config.MAX_HISTORY) {
      this.history.shift();
    }
    this.render();
  }

  setInput(text) {
    this.currentInput = text;
    this.render();
  }

  render() {
    const historyElement = document.getElementById('terminal-history');
    const inputElement = document.getElementById('terminal-input');

    // Очистка
    historyElement.innerHTML = '';
    inputElement.textContent = '';

    // Отрисовка истории
    this.history.forEach(line => {
      const lineElement = document.createElement('div');
      lineElement.textContent = line;
      historyElement.appendChild(lineElement);
    });

    // Отрисовка текущего ввода
    inputElement.textContent = this.currentInput;
  }
}
```

### 2. Анимации

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
}
```

#### TerminalAnimation
Анимация терминального интерфейса.

```javascript
class TerminalAnimation {
  constructor(history, ...colors) {
    this.history = history;
    this.colors = colors;
    this.currentColorIndex = 0;
  }

  getNextColor() {
    const color = this.colors[this.currentColorIndex];
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    return color;
  }

  animateText(text, element) {
    let index = 0;
    const color = this.getNextColor();
    
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }
}
```

### 3. Интеграция с Google Sheets
Использует `sheets-service.js` для отправки слов, реализует очередь отправки с повторными попытками, обрабатывает ошибки сети и сервера.

```javascript
class FormApp {
  constructor() {
    this.sheetsService = new SheetsService();
    this.terminal = new Terminal(CONFIG);
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById('terminal-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleSubmit();
      }
    });
  }

  async handleSubmit() {
    const word = this.terminal.currentInput.trim();
    if (!word) return;

    try {
      await this.sheetsService.submitWord(word);
      this.terminal.appendToHistory(`> ${word}`);
      this.terminal.setInput('');
    } catch (error) {
      this.terminal.appendToHistory(`Error: ${error.message}`);
    }
  }
}
```

## Структура файлов
```
form/
├── index.html      # Основной HTML файл
├── app.js          # Инициализация приложения
├── styles.css      # Стили
└── keyboard.js     # Виртуальная клавиатура
```

## Процесс работы
1. Пользователь вводит слово через виртуальную клавиатуру
2. Слово отправляется в очередь на отправку
3. `sheets-service.js` обрабатывает очередь и отправляет слова на сервер
4. При успешной отправке слово добавляется в историю терминала

## Конфигурация
Основные настройки находятся в `shared/config/index.js`:
```javascript
export const CONFIG = {
  // Terminal settings
  MAX_HISTORY: 10,
  FONT_SIZE: 14,
  
  // Colors
  COLORS: {
    PURPLE: "#5e2ced",
    PINK: "#db6dc4",
    TEAL: "#4fdfb4",
    BACKGROUND: "#000000",
    PRIMARY: "#ffffff"
  }
};
```

## Примеры использования

### Инициализация приложения
```javascript
// app.js
import { CONFIG } from '../shared/config/index.js';
import { FormApp } from './form-app.js';

const app = new FormApp(CONFIG);
app.init();
```

### Обработка ввода с клавиатуры
```javascript
// keyboard.js
class Keyboard {
  constructor(terminal) {
    this.terminal = terminal;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll('.key').forEach(key => {
      key.addEventListener('click', () => {
        const value = key.dataset.value;
        if (value === 'enter') {
          this.terminal.submit();
        } else if (value === 'backspace') {
          this.terminal.backspace();
        } else {
          this.terminal.append(value);
        }
      });
    });
  }
}
```

### Стилизация терминала
```css
/* styles.css */
.terminal {
  background-color: var(--background);
  color: var(--primary);
  font-family: 'Montserrat', monospace;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(94, 44, 237, 0.2);
}

.terminal-history {
  height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.terminal-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.terminal-input::before {
  content: '>';
  color: var(--purple);
}
```

### Интеграция с Google Sheets
```javascript
// form-app.js
class FormApp {
  constructor(config) {
    this.config = config;
    this.sheetsService = new SheetsService();
    this.terminal = new Terminal(config);
    this.keyboard = new Keyboard(this.terminal);
  }

  async handleSubmit(word) {
    try {
      await this.sheetsService.submitWord(word);
      this.terminal.appendToHistory(`> ${word}`);
      this.terminal.clear();
    } catch (error) {
      this.terminal.appendToHistory(`Error: ${error.message}`);
    }
  }
}
```

### Обработка ошибок
```javascript
// error-handler.js
class ErrorHandler {
  static handle(error) {
    console.error('Error:', error);
    
    switch (error.type) {
      case 'NETWORK_ERROR':
        return 'Ошибка сети. Проверьте подключение.';
      case 'SHEETS_ERROR':
        return 'Ошибка доступа к Google Sheets.';
      case 'VALIDATION_ERROR':
        return 'Некорректный ввод.';
      default:
        return 'Произошла ошибка. Попробуйте позже.';
    }
  }
}
```

### Анимации
```javascript
// animations.js
class FormAnimations {
  constructor(config) {
    this.config = config;
    this.binaryAnimation = new BinaryAnimation(
      document.getElementById('background-canvas'),
      config
    );
    this.terminalAnimation = new TerminalAnimation(config);
  }

  start() {
    this.binaryAnimation.draw();
    this.terminalAnimation.start();
  }

  stop() {
    this.binaryAnimation.stop();
    this.terminalAnimation.stop();
  }
}
```

## Тестирование

### Модульные тесты
```javascript
// form.test.js
describe('FormApp', () => {
  let app;
  
  beforeEach(() => {
    app = new FormApp(CONFIG);
  });

  test('should initialize terminal', () => {
    expect(app.terminal).toBeDefined();
  });

  test('should handle word submission', async () => {
    const word = 'test';
    await app.handleSubmit(word);
    expect(app.terminal.history).toContain(`> ${word}`);
  });
});
```

### Интеграционные тесты
```javascript
// integration.test.js
describe('Form Integration', () => {
  test('should submit word to Google Sheets', async () => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ word: 'test' })
    });
    expect(response.status).toBe(200);
  });
});
```

## Отладка

### Логирование
```javascript
// logger.js
class Logger {
  static log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  static error(message) {
    this.log(message, 'error');
  }

  static warn(message) {
    this.log(message, 'warn');
  }
}
```

### Мониторинг производительности
```javascript
// performance.js
class PerformanceMonitor {
  static measure(name, callback) {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    
    console.log(`${name} took ${end - start}ms`);
    return result;
  }
}
```

## Инструкции для волонтёров

### Общие правила
1. Всегда приветствуйте участников с улыбкой
2. Говорите четко и понятно
3. Будьте готовы помочь с вводом слов
4. Следите за корректностью вводимых данных

### Процесс работы
1. **Приветствие участника**
   ```
   "Welcome to Code of the Future! Please enter one word or phrase in English that represents your vision of the future."
   ```

2. **Объяснение правил**
   - Только одно слово или фраза
   - Только на английском языке
   - Позитивные, конструктивные идеи
   - Без личных данных и рекламы

3. **Помощь с вводом**
   - Покажите, как пользоваться виртуальной клавиатурой
   - Помогите сформулировать идею, если нужно
   - Проверьте корректность ввода перед отправкой

4. **После отправки**
   - Поблагодарите участника
   - Пригласите посмотреть на большой экран
   - Подготовьтесь к следующему участнику

### Частые вопросы
1. **"Что можно написать?"**
   - Предложите примеры: peace, innovation, green energy, equality
   - Подчеркните, что это должно быть позитивное видение будущего

2. **"Можно ли написать несколько слов?"**
   - Объясните, что лучше одно емкое слово или короткая фраза
   - Это поможет создать более четкую визуализацию

3. **"Почему только на английском?"**
   - Это международный проект
   - Английский обеспечивает единообразие визуализации

### Решение проблем
1. **Технические неполадки**
   - Если панель не реагирует, попробуйте перезагрузить страницу
   - При постоянных проблемах сообщите техническому специалисту

2. **Некорректный ввод**
   - Вежливо попросите переформулировать, если слово не подходит
   - Объясните причину отказа

3. **Очередь**
   - Поддерживайте порядок
   - Займите ожидающих просмотром материалов о проекте

### Советы
1. Держите под рукой список примеров слов
2. Регулярно проверяйте работу панели
3. Поддерживайте чистоту и порядок в зоне
4. Будьте внимательны к потребностям участников 