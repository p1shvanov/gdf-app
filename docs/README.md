# Global Digital Forum - Code of the Future

## Описание проекта
Интерактивная система для сбора и визуализации идей участников форума о будущем. Система состоит из двух основных компонентов:
- Form страница: интерфейс для ввода слов на тач-панелях
- Final страница: визуализация слов на большом экране

## Бизнес-требования

### Цель проекта
Создание интерактивной зоны, где участники форума могут поделиться своим видением будущего через ввод слов или фраз на английском языке. Введенные слова проходят модерацию и отображаются на большом экране в реальном времени.

### Организация зоны
1. **Вход в зону**
   - Доброжелательные волонтёры встречают участников
   - Объясняют правила и процесс участия
   - Направляют к свободным тач-панелям

2. **Тач-панели**
   - Расположены на удобной высоте
   - Имеют понятный интерфейс
   - Поддерживают ввод на английском языке
   - Обеспечивают быструю отправку слов

3. **Большой экран**
   - Расположен в центре зоны
   - Хорошо виден со всех точек
   - Отображает анимированную визуализацию слов
   - Обновляется в реальном времени

4. **Зона ожидания**
   - Удобные места для сидения
   - Информационные материалы
   - Возможность наблюдать за визуализацией

### Правила ввода
1. **Разрешено**
   - Одно слово или короткая фраза
   - Только на английском языке
   - Позитивные, конструктивные идеи
   - Общие концепции будущего

2. **Запрещено**
   - Личные данные
   - Рекламные сообщения
   - Оскорбительный контент
   - Политические лозунги

### Роли участников
1. **Волонтёры**
   - Помогают участникам с вводом
   - Объясняют правила
   - Следят за порядком
   - Обеспечивают позитивную атмосферу

2. **Технические специалисты**
   - Контролируют работу системы
   - Решают технические проблемы
   - Обеспечивают бесперебойную работу
   - Следят за качеством визуализации

3. **Модераторы**
   - Проверяют вводимые слова
   - Фильтруют неподходящий контент
   - Обеспечивают качество данных
   - Поддерживают релевантность контента

### Интерфейсы
1. **Тач-панели**
   - Приветственное сообщение
   - Поле для ввода
   - Виртуальная клавиатура
   - Кнопка отправки
   - Инструкции на русском и английском

2. **Большой экран**
   - Анимированный фон
   - Плавающие слова
   - 3D-логотип
   - Интерактивные эффекты
   - Плавные переходы

## Технические требования

### Оборудование

#### Тач-панели (Form страница)
- **Процессор**: Intel Core i7-10510U (4 ядра)
- **Оперативная память**: 8GB DDR4
- **Накопитель**: 256GB SSD m.2 PCI-e
- **Видеокарта**: NVIDIA GeForce MX230 2GB
- **Экран**: 15.6" 1920x1080
- **Операционная система**: Windows 10 Pro 64-bit
- **Размеры**: 362x248x18 мм

#### Визуализация (Final страница)
- **Телевизоры**: 16:9 формат
- **Разрешение**: 1920x1080 (Full HD)
- **Подключение**: HDMI
- **Расположение**: Центральная часть зоны

### Системные требования
- Node.js 16.x или выше
- Современный веб-браузер с поддержкой WebGL
- Доступ к Google Sheets API
- Стабильное интернет-соединение
- Поддержка тач-интерфейса (для Form страницы)

### Оптимизация производительности
1. **Для тач-панелей**
   - Отключение ненужных фоновых процессов
   - Закрытие неиспользуемых приложений
   - Регулярная очистка кэша браузера
   - Мониторинг температуры процессора

2. **Для визуализации**
   - Оптимизация WebGL рендеринга
   - Ограничение количества одновременно отображаемых слов
   - Настройка частоты обновления анимаций
   - Контроль использования памяти

### Рекомендации по настройке
1. **Тач-панели**
   - Запуск в полноэкранном режиме
   - Отключение спящего режима
   - Настройка автозапуска приложения
   - Регулярное обновление драйверов

2. **Телевизоры**
   - Настройка режима "Игра" или "PC"
   - Отключение постобработки изображения
   - Установка оптимальной яркости
   - Проверка качества HDMI-соединения

### Резервное оборудование
- Запасные тач-панели (минимум 1 шт.)
- Резервный компьютер для визуализации
- Дополнительные HDMI-кабели
- Источники бесперебойного питания

### Описание активности
Интерактивная система "Код будущего" позволяет участникам форума вводить свои пожелания и идеи о будущем через тач-панели. Введенные слова проходят модерацию и становятся частью единого цифрового кода, визуализируемого на большом экране в реальном времени.

### Организация зоны
1. **Входная точка**
   - Волонтёр приветствует участников
   - Краткое объяснение механики активности

2. **Тач-панели (5 шт.)**
   - Равномерное распределение
   - Инструкция на каждой панели:
     "Input one word or phrase in English that represents your vision of the future."

3. **Большой экран**
   - Отображение "живого" кода из слов участников
   - Обновление в реальном времени

4. **Зона ожидания**
   - Визуальные материалы о проекте
   - Комфортное ожидание при очереди

### Правила ввода
#### Разрешено:
- Одно слово или фраза
- Только на английском языке
- Позитивные, конструктивные идеи
  - Примеры: peace, innovation, green energy, equality

#### Запрещено:
- Оскорбления и нецензурная лексика
- Политические высказывания
- Личные данные (ФИО, email, номера)
- Рекламные слоганы

### Роли волонтёров
1. **Входная группа (1-2 человека)**
   - Приветствие участников
   - Объяснение сути активности
   - Направление к тач-панелям

2. **Помощники на панелях (1 на 2 панели)**
   - Помощь с вводом слов
   - Контроль корректности ввода
   - Ответы на вопросы

3. **Волонтёр у экрана (1 человек)**
   - Демонстрация работы системы
   - Привлечение внимания к общей картине

### Интерфейс
#### Тач-панель:
- Приветствие и инструкция
- Поле для ввода
- Кнопка отправки

#### Большой экран:
- Визуализация "живого кода"
- Анимированное появление новых слов
- Общая картина из всех введенных слов

## Описание
Интерактивная система для Global Digital Forum, состоящая из двух основных компонентов:
- Form страница для ввода слов/фраз на тач-панелях
- Final страница для визуализации введенных слов

## Требования к системе
- Node.js 16.x или выше
- Современный веб-браузер с поддержкой WebGL
- Доступ к Google Sheets API
- Минимальное разрешение экрана: 1920x1080
- Поддержка тач-интерфейса (для Form страницы)

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-org/gdf-app.git
cd gdf-app
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка Google Sheets
1. Создайте новый проект в Google Cloud Console
2. Включите Google Sheets API
3. Создайте сервисный аккаунт и скачайте ключ
4. Создайте новую таблицу Google Sheets
5. Скопируйте ID таблицы в `shared/config/index.js`
6. Разверните Google Apps Script из `shared/config/app-scripts-current.js`

### 4. Запуск в режиме разработки
```bash
npm run dev
```

### 5. Сборка для продакшена
```bash
npm run build
```

## Структура проекта
```
gdf-app/
├── form/           # Form страница
├── final/          # Final страница
├── shared/         # Общие модули
└── docs/           # Документация
```

## Компоненты
- [Form страница](form.md) - интерфейс для ввода слов
- [Final страница](final.md) - визуализация слов
- [Shared модули](shared.md) - общие компоненты и утилиты

## API

### SheetsService
```javascript
const sheetsService = new SheetsService();

// Отправка слова
await sheetsService.submitWord('example', true);

// Получение списка слов
const words = await sheetsService.getWords();
```

### WordsReceiver
```javascript
const receiver = new WordsReceiver();

// Подписка на обновления
receiver.subscribe(words => {
  console.log('New words:', words);
});

// Запуск получения данных
receiver.startPolling();

// Остановка получения данных
receiver.stopPolling();
```

### Анимации
```javascript
// BinaryAnimation
const binaryAnimation = new BinaryAnimation(canvas, CONFIG);
binaryAnimation.draw();

// LingoAnimation
const lingoAnimation = new LingoAnimation(CONFIG);
lingoAnimation.updateWords(['word1', 'word2']);
lingoAnimation.draw(ctx);

// Logo3DAnimation
const logoAnimation = new Logo3DAnimation();
logoAnimation.start();
```

## Интеграция с Google Sheets
Система использует Google Sheets для хранения и синхронизации данных между Form и Final страницами. Подробнее в [документации по интеграции](shared.md#интеграция).

## Процессы

### Отправка слов
1. Пользователь вводит слово на Form странице
2. Слово добавляется в очередь отправки
3. SheetsService отправляет слово в Google Sheets
4. При успешной отправке слово отображается в истории

### Визуализация
1. Final страница получает список слов из Google Sheets
2. Слова анимируются с помощью LingoAnimation
3. Обновление происходит каждые 30 секунд
4. 3D логотип и фон анимируются независимо

## Конфигурация
Основные настройки находятся в `shared/config/index.js`. Подробное описание параметров в [документации по конфигурации](shared.md#конфигурация).

## Разработка

### Добавление новых анимаций
1. Создайте новый класс анимации в `shared/js/`
2. Реализуйте методы `init()`, `update()`, `draw()`
3. Добавьте конфигурацию в `shared/config/index.js`
4. Интегрируйте анимацию в Form или Final страницу

### Расширение функционала
1. Создайте новый модуль в соответствующей директории
2. Добавьте необходимые зависимости
3. Обновите конфигурацию
4. Протестируйте изменения

## Развертывание

### Подготовка к деплою
1. Проверьте все зависимости в `package.json`
2. Убедитесь, что все API ключи и конфигурации настроены
3. Проверьте права доступа к Google Sheets
4. Протестируйте сборку локально:
```bash
npm run build
```

### Настройка CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Мониторинг

#### Метрики производительности
```javascript
// metrics.js
class PerformanceMetrics {
  static collect() {
    return {
      fps: this.measureFPS(),
      memory: this.measureMemory(),
      network: this.measureNetwork(),
      errors: this.collectErrors()
    };
  }

  static measureFPS() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    return () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        return fps;
      }
    };
  }

  static measureMemory() {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      };
    }
    return null;
  }

  static measureNetwork() {
    return {
      effectiveType: navigator.connection?.effectiveType,
      downlink: navigator.connection?.downlink,
      rtt: navigator.connection?.rtt
    };
  }

  static collectErrors() {
    return window.errorLog || [];
  }
}
```

#### Логирование
```javascript
// logger.js
class Logger {
  static levels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };

  static log(level, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };

    // Отправка логов на сервер
    this.sendToServer(logEntry);

    // Локальное логирование
    console.log(`[${level}] ${message}`, data);
  }

  static sendToServer(logEntry) {
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry)
    }).catch(error => {
      console.error('Failed to send log:', error);
    });
  }
}
```

### Обработка ошибок

#### Глобальный обработчик
```javascript
// error-handler.js
window.onerror = function(message, source, lineno, colno, error) {
  Logger.log('ERROR', message, {
    source,
    lineno,
    colno,
    stack: error?.stack
  });
  return false;
};

window.onunhandledrejection = function(event) {
  Logger.log('ERROR', 'Unhandled promise rejection', {
    reason: event.reason
  });
};
```

#### Мониторинг состояния
```javascript
// health-check.js
class HealthCheck {
  static async check() {
    const checks = [
      this.checkGoogleSheets(),
      this.checkWebGL(),
      this.checkNetwork()
    ];

    const results = await Promise.all(checks);
    return {
      status: results.every(r => r.status === 'ok') ? 'healthy' : 'unhealthy',
      checks: results
    };
  }

  static async checkGoogleSheets() {
    try {
      const response = await fetch('/api/health/sheets');
      return {
        name: 'google-sheets',
        status: response.ok ? 'ok' : 'error',
        details: await response.json()
      };
    } catch (error) {
      return {
        name: 'google-sheets',
        status: 'error',
        details: error.message
      };
    }
  }

  static checkWebGL() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    return {
      name: 'webgl',
      status: gl ? 'ok' : 'error',
      details: gl ? 'WebGL supported' : 'WebGL not supported'
    };
  }

  static checkNetwork() {
    return {
      name: 'network',
      status: navigator.onLine ? 'ok' : 'error',
      details: navigator.onLine ? 'Online' : 'Offline'
    };
  }
}
```

### Резервное копирование

#### Google Sheets
```javascript
// backup.js
class SheetsBackup {
  static async createBackup() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const backup = {
      timestamp: new Date().toISOString(),
      data: await this.exportSheet(sheet)
    };

    // Сохранение в Google Drive
    const file = DriveApp.createFile(
      `backup-${backup.timestamp}.json`,
      JSON.stringify(backup)
    );

    return file.getId();
  }

  static async exportSheet(sheet) {
    const data = [];
    const rows = sheet.getDataRange().getValues();
    
    for (let i = 0; i < rows.length; i++) {
      data.push({
        row: i + 1,
        values: rows[i]
      });
    }

    return data;
  }
}
```

## Безопасность

### Защита API
```javascript
// security.js
class Security {
  static validateInput(input) {
    // Проверка на XSS
    const sanitized = this.sanitizeHTML(input);
    
    // Проверка длины
    if (sanitized.length > 100) {
      throw new Error('Input too long');
    }
    
    // Проверка на запрещенные символы
    if (/[<>{}]/.test(sanitized)) {
      throw new Error('Invalid characters');
    }
    
    return sanitized;
  }

  static sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
```

### Аутентификация
```javascript
// auth.js
class Auth {
  static async validateToken(token) {
    try {
      const response = await fetch('/api/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  static getToken() {
    return localStorage.getItem('auth_token');
  }

  static setToken(token) {
    localStorage.setItem('auth_token', token);
  }
}
```

## Лицензия
MIT 

## Инструкции для разных ролей

### Для волонтёров
- Подробные инструкции в [документации Form страницы](form.md#инструкции-для-волонтёров)
- Основные правила работы с участниками
- Процесс помощи с вводом слов
- Решение типичных проблем

### Для технических специалистов
- Подробные инструкции в [документации Final страницы](final.md#инструкции-для-технических-специалистов)
- Настройка и мониторинг системы
- Решение технических проблем
- Обеспечение производительности

### Для модераторов
- Доступ к панели модерации
- Правила модерации контента
- Процесс проверки слов
- Решение спорных ситуаций 