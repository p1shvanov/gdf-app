# Конфигурация системы Global Digital Forum

Система использует максимально параметризованный объект CONFIG для настройки всех аспектов работы приложения.

## Структура конфигурации

### 1. Основные настройки (CORE SETTINGS)

```javascript
CONFIG.FPS = 60                    // Частота кадров
CONFIG.FONT_SIZE = 14              // Размер шрифта
CONFIG.PIXEL_RATIO = window.devicePixelRatio || 1
CONFIG.EMPTY_PROBABILITY = 0.3     // Вероятность пустых ячеек
CONFIG.TARGET_FRAME_TIME = 16.67   // Целевое время кадра (мс)
CONFIG.MAX_PIXEL_RATIO = 2         // Максимальное соотношение пикселей
CONFIG.QUALITY_MULTIPLIER = 1.0    // Множитель качества
CONFIG.ENABLE_VSYNC = true         // Включить VSync
CONFIG.MEMORY_LIMIT_MB = 512       // Лимит памяти в МБ
CONFIG.GC_INTERVAL = 30000         // Интервал сборки мусора (мс)
```

### 2. Настройки отображения (DISPLAY SETTINGS)

```javascript
CONFIG.FONT_FAMILY = 'Monaco, Consolas, monospace'
CONFIG.FONT_WEIGHT = 'normal'
CONFIG.LINE_HEIGHT = 1.2
CONFIG.LETTER_SPACING = 0
CONFIG.FADE_EDGES = true           // Затухание по краям
CONFIG.EDGE_FADE_SIZE = 50         // Размер затухания
CONFIG.FULLSCREEN_MODE = false     // Полноэкранный режим
CONFIG.SHOW_GRID = false           // Показать сетку
CONFIG.GRID_SIZE = 20              // Размер сетки
CONFIG.GRID_COLOR = '#333333'      // Цвет сетки
CONFIG.GRID_OPACITY = 0.1          // Прозрачность сетки
```

### 3. Бинарная анимация (BINARY ANIMATION)

```javascript
CONFIG.BIN_CHARS = ["0", "1", "§"]           // Символы для анимации
CONFIG.BINARY_ANIMATION_ENABLED = true       // Включить анимацию
CONFIG.BINARY_SPEED_MULTIPLIER = 1.0         // Множитель скорости
CONFIG.BINARY_PROBABILITY_CHANGE = 0.05      // Вероятность изменения
CONFIG.BINARY_FLOW_DIRECTION = 'down'        // Направление потока
CONFIG.BINARY_COLUMN_STAGGER = 100           // Задержка колонок
CONFIG.BINARY_ROW_STAGGER = 50               // Задержка строк
CONFIG.BINARY_PAUSE_PROBABILITY = 0.1        // Вероятность паузы
CONFIG.BINARY_PAUSE_DURATION = 1000          // Длительность паузы
CONFIG.BINARY_FADE_IN = true                 // Появление
CONFIG.BINARY_FADE_OUT = true                // Исчезновение
CONFIG.BINARY_CASCADE_EFFECT = false         // Каскадный эффект
CONFIG.BINARY_WAVE_EFFECT = false            // Волновой эффект
CONFIG.BINARY_SPIRAL_EFFECT = false          // Спиральный эффект
```

### 4. Эффекты (EFFECTS)

#### Эффект мерцания (TWINKLE)
```javascript
CONFIG.TWINKLE = {
  ENABLED: true,                // Включить эффект
  PROBABILITY: 0.1,             // Вероятность мерцания
  DURATION: 100,                // Длительность (мс)
  COLOR: "#333333",             // Цвет мерцания
  INTENSITY: 1.0,               // Интенсивность
  FADE_IN: true,                // Плавное появление
  FADE_OUT: true,               // Плавное исчезновение
  RANDOM_COLOR: false,          // Случайный цвет
  SYNC_WITH_MUSIC: false        // Синхронизация с музыкой
}
```

#### Эффект свечения (GLOW)
```javascript
CONFIG.GLOW = {
  ENABLED: true,                // Включить свечение
  BLUR_RADIUS: 10,              // Радиус размытия
  INTENSITY: 0.5,               // Интенсивность
  COLOR: "#ffffff",             // Цвет свечения
  PULSATE: false,               // Пульсация
  PULSATE_SPEED: 1.0            // Скорость пульсации
}
```

#### Система частиц (PARTICLES)
```javascript
CONFIG.PARTICLES = {
  ENABLED: true,                // Включить частицы
  COUNT: 100,                   // Количество частиц
  SPEED: 1.0,                   // Скорость
  SIZE_MIN: 1,                  // Минимальный размер
  SIZE_MAX: 3,                  // Максимальный размер
  LIFE_TIME: 5000,              // Время жизни (мс)
  SPAWN_RATE: 10,               // Скорость порождения
  GRAVITY: 0.1,                 // Гравитация
  WIND: 0.0,                    // Ветер
  COLLISION: false,             // Столкновения
  TRAIL: false,                 // След
  SPARK_EFFECT: false           // Эффект искр
}
```

#### Встряска экрана (SCREEN_SHAKE)
```javascript
CONFIG.SCREEN_SHAKE = {
  ENABLED: false,               // Включить встряску
  INTENSITY: 2,                 // Интенсивность
  DURATION: 200,                // Длительность (мс)
  FREQUENCY: 10,                // Частота
  DECAY: 0.9                    // Затухание
}
```

#### Эффект блума (BLOOM)
```javascript
CONFIG.BLOOM = {
  ENABLED: false,               // Включить блум
  THRESHOLD: 0.8,               // Порог
  INTENSITY: 1.0,               // Интенсивность
  RADIUS: 0.5                   // Радиус
}
```

#### Хроматическая аберрация (CHROMATIC_ABERRATION)
```javascript
CONFIG.CHROMATIC_ABERRATION = {
  ENABLED: false,               // Включить эффект
  INTENSITY: 0.01,              // Интенсивность
  RED_OFFSET: 1.0,              // Смещение красного
  GREEN_OFFSET: 0.0,            // Смещение зеленого
  BLUE_OFFSET: -1.0             // Смещение синего
}
```

#### Шум (NOISE)
```javascript
CONFIG.NOISE = {
  ENABLED: false,               // Включить шум
  INTENSITY: 0.1,               // Интенсивность
  SPEED: 1.0,                   // Скорость
  SCALE: 1.0                    // Масштаб
}
```

### 5. Цвета (COLORS)

```javascript
CONFIG.COLORS = {
  // Основные цвета
  PURPLE: "#5e2ced",
  PINK: "#db6dc4", 
  TEAL: "#4fdfb4",
  
  // Цвета фона
  BACKGROUND: "#000000",
  BACKGROUND_SECONDARY: "#111111",
  BACKGROUND_TERTIARY: "#222222",
  
  // Цвета текста
  PRIMARY: "#ffffff",
  SECONDARY: "#00ffff",
  TERTIARY: "#ff00ff",
  QUATERNARY: "#ffff00",
  
  // Цвета эффектов
  TWINKLE: "#333333",
  GLOW: "#ffffff",
  ERROR: "#ff0000",
  SUCCESS: "#00ff00",
  WARNING: "#ffff00",
  INFO: "#0099ff",
  
  // Градиенты
  GRADIENT_START: "#5e2ced",
  GRADIENT_MIDDLE: "#db6dc4",
  GRADIENT_END: "#4fdfb4",
  
  // Уровни прозрачности
  ALPHA: {
    FULL: 1.0,
    HIGH: 0.8,
    MEDIUM: 0.5,
    LOW: 0.3,
    MINIMAL: 0.1,
    TRANSPARENT: 0.0
  },
  
  // Цветовые схемы
  SCHEME_NEON: ["#ff0080", "#00ff80", "#8000ff", "#ff8000"],
  SCHEME_PASTEL: ["#ffb3ba", "#baffc9", "#bae1ff", "#ffffba"],
  SCHEME_DARK: ["#1a1a1a", "#333333", "#4d4d4d", "#666666"],
  SCHEME_RAINBOW: ["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#0080ff", "#8000ff"]
}
```

### 6. Canvas (CANVAS)

```javascript
CONFIG.CANVAS = {
  RESIZE_DEBOUNCE: 250,                      // Задержка изменения размера
  CLEAR_MODE: 'full',                        // Режим очистки
  ANTIALIASING: true,                        // Сглаживание
  SMOOTHING: true,                           // Сглаживание
  ALPHA: true,                               // Альфа-канал
  PRESERVE_DRAWING_BUFFER: false,            // Сохранить буфер рисования
  POWER_PREFERENCE: 'high-performance',      // Приоритет производительности
  FAIL_IF_MAJOR_PERFORMANCE_CAVEAT: false,   // Сбой при проблемах с производительностью
  DESYNCHRONIZED: false,                     // Десинхронизация
  PREMULTIPLIED_ALPHA: true,                 // Предварительно умноженная альфа
  STENCIL: false,                            // Буфер трафарета
  DEPTH: false                               // Буфер глубины
}
```

### 7. Анимация текста (TEXT_ANIMATION)

```javascript
CONFIG.TEXT_ANIMATION = {
  ENABLED: true,                             // Включить анимацию
  DURATION: 5,                               // Длительность
  TIMING: 'ease-in-out',                     // Тайминг
  OPACITY: 0.7,                              // Прозрачность
  SCALE_START: 0.5,                          // Начальный масштаб
  SCALE_END: 1.0,                            // Конечный масштаб
  FADE_IN_DURATION: 1000,                    // Длительность появления
  FADE_OUT_DURATION: 1000,                   // Длительность исчезновения
  MOVEMENT_SPEED: 50,                        // Скорость движения
  BOUNCE_EFFECT: false,                      // Эффект отскока
  ROTATION_EFFECT: false,                    // Эффект вращения
  TYPEWRITER_EFFECT: false,                  // Эффект печатной машинки
  GLITCH_EFFECT: false,                      // Эффект глитча
  WAVE_EFFECT: false,                        // Волновой эффект
  SHADOW_ENABLED: true,                      // Включить тень
  SHADOW_BLUR: 5,                            // Размытие тени
  SHADOW_COLOR: "#000000",                   // Цвет тени
  SHADOW_OFFSET_X: 2,                        // Смещение тени по X
  SHADOW_OFFSET_Y: 2                         // Смещение тени по Y
}
```

### 8. 3D Логотип (LOGO_3D)

```javascript
CONFIG.LOGO_3D = {
  ENABLED: true,                             // Включить 3D логотип
  
  // Настройки камеры
  CAMERA: {
    FOV: 10,                                 // Поле зрения
    NEAR: 0.01,                              // Ближняя плоскость
    FAR: 1000,                               // Дальняя плоскость
    POSITION_X: 0,                           // Позиция X
    POSITION_Y: 0,                           // Позиция Y
    POSITION_Z: 800,                         // Позиция Z
    AUTO_ROTATE: false,                      // Автоповорот
    LOOK_AT_X: 0,                            // Точка взгляда X
    LOOK_AT_Y: 0,                            // Точка взгляда Y
    LOOK_AT_Z: 0                             // Точка взгляда Z
  },
  
  // Настройки вращения
  ROTATION: {
    SPEED: 0.005,                            // Скорость вращения
    AXIS_X: 0,                               // Ось X
    AXIS_Y: 1,                               // Ось Y
    AXIS_Z: 0,                               // Ось Z
    ACCELERATION: 1.0,                       // Ускорение
    MAX_SPEED: 0.1,                          // Максимальная скорость
    AUTO_REVERSE: false,                     // Автореверс
    OSCILLATION: false                       // Колебания
  },
  
  // Настройки экструзии
  EXTRUDE: {
    DEPTH: 50,                               // Глубина
    BEVEL_ENABLED: true,                     // Включить скос
    BEVEL_THICKNESS: 2,                      // Толщина скоса
    BEVEL_SIZE: 2,                           // Размер скоса
    BEVEL_SEGMENTS: 3,                       // Сегменты скоса
    CURVE_SEGMENTS: 12,                      // Сегменты кривой
    STEPS: 1,                                // Шаги
    UV_GENERATOR: 'WorldUVGenerator'         // Генератор UV
  },
  
  // Настройки шейдера
  SHADER: {
    FRESNEL_INTENSITY: 1,                    // Интенсивность френеля
    CONTRAST: 1,                             // Контраст
    TEAL_INFLUENCE: 1,                       // Влияние бирюзового
    SATURATION: 1,                           // Насыщенность
    BRIGHTNESS: 1,                           // Яркость
    HUE_SHIFT: 0,                            // Сдвиг оттенка
    METALNESS: 0.5,                          // Металличность
    ROUGHNESS: 0.5,                          // Шероховатость
    OPACITY: 1.0,                            // Непрозрачность
    TRANSPARENT: false,                      // Прозрачность
    WIREFRAME: false,                        // Каркас
    FLAT_SHADING: false                      // Плоское затенение
  },
  
  // Освещение
  LIGHTING: {
    AMBIENT_INTENSITY: 0.4,                  // Интенсивность окружающего света
    AMBIENT_COLOR: "#ffffff",                // Цвет окружающего света
    DIRECTIONAL_INTENSITY: 0.8,              // Интенсивность направленного света
    DIRECTIONAL_COLOR: "#ffffff",            // Цвет направленного света
    DIRECTIONAL_X: 0,                        // Направление X
    DIRECTIONAL_Y: 1,                        // Направление Y
    DIRECTIONAL_Z: 1,                        // Направление Z
    POINT_LIGHTS: [],                        // Точечные источники света
    SPOT_LIGHTS: [],                         // Прожекторы
    SHADOW_ENABLED: true,                    // Включить тени
    SHADOW_QUALITY: 'medium',                // Качество теней
    SHADOW_BIAS: -0.0001,                    // Смещение тени
    SHADOW_RADIUS: 3,                        // Радиус тени
    SHADOW_MAP_SIZE: 1024                    // Размер карты теней
  },
  
  // Анимация
  ANIMATION: {
    FLOAT_ENABLED: false,                    // Включить плавание
    FLOAT_AMPLITUDE: 10,                     // Амплитуда плавания
    FLOAT_SPEED: 1.0,                        // Скорость плавания
    PULSE_ENABLED: false,                    // Включить пульсацию
    PULSE_MIN_SCALE: 0.9,                    // Минимальный масштаб пульсации
    PULSE_MAX_SCALE: 1.1,                    // Максимальный масштаб пульсации
    PULSE_SPEED: 2.0                         // Скорость пульсации
  },
  
  // Постобработка
  POST_PROCESSING: {
    ENABLED: false,                          // Включить постобработку
    BLOOM_ENABLED: false,                    // Включить блум
    BLOOM_THRESHOLD: 0.8,                    // Порог блума
    BLOOM_STRENGTH: 1.0,                     // Сила блума
    BLOOM_RADIUS: 0.5                        // Радиус блума
  }
}
```

## Примеры использования

### Базовое использование
```javascript
import { CONFIG } from '../shared/config/index.js';

// Использование в анимации
const animation = new BinaryAnimation(canvas, CONFIG);

// Доступ к цветам
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, CONFIG.COLORS.PURPLE);
gradient.addColorStop(0.5, CONFIG.COLORS.PINK);
gradient.addColorStop(1, CONFIG.COLORS.TEAL);

// Настройка шрифта
ctx.font = `${CONFIG.FONT_SIZE}px ${CONFIG.FONT_FAMILY}`;
```

### Условная логика на основе настроек
```javascript
// Проверка включенности эффектов
if (CONFIG.TWINKLE.ENABLED) {
  this.applyTwinkleEffect();
}

if (CONFIG.PARTICLES.ENABLED) {
  this.particleSystem.update();
}

// Адаптивные настройки
const fps = CONFIG.PERFORMANCE?.FPS || CONFIG.FPS;
const interval = 1000 / fps;
```

### Настройка через URL параметры
Система поддерживает настройку через URL параметры:
```
https://example.com/?FPS=30&COLOR_PURPLE=%23ff0000&TWINKLE_ENABLED=false
```

### Настройка через глобальный объект
```javascript
// Установка глобальной конфигурации
window.GDF_CONFIG = {
  FPS: 30,
  COLOR_PURPLE: '#ff0000',
  TWINKLE_ENABLED: false
};
```

## Совместимость

Новая конфигурация полностью совместима со старым кодом благодаря секции "BACKWARDS COMPATIBILITY":

```javascript
// Эти обращения продолжают работать
CONFIG.FPS
CONFIG.FONT_SIZE  
CONFIG.PIXEL_RATIO
CONFIG.EMPTY_PROBABILITY
CONFIG.BIN_CHARS
CONFIG.TWINKLE.ENABLED
CONFIG.COLORS.PURPLE
```

## Рекомендации по использованию

1. **Производительность**: Используйте `CONFIG.PERFORMANCE` для адаптации под разные устройства
2. **Доступность**: Настройте `CONFIG.ACCESSIBILITY` для улучшения доступности
3. **Отладка**: Включите `CONFIG.DEVELOPMENT.DEBUG_MODE` для отладки
4. **Безопасность**: Проверьте настройки `CONFIG.SECURITY` для продакшена
5. **Локализация**: Используйте `CONFIG.LOCALIZATION` для многоязычности 