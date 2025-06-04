/**
 * Wake Lock Manager
 * Предотвращает переход устройства в спящий режим при открытом веб-приложении
 */
class WakeLockManager {
  constructor() {
    this.wakeLock = null;
    this.isSupported = 'wakeLock' in navigator;
    this.isActive = false;
    
    // Автоматически возобновляем блокировку при возвращении на вкладку
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.isActive) {
        this.requestWakeLock();
      }
    });
    
    // Предотвращаем потерю блокировки при переходах
    window.addEventListener('focus', () => {
      if (this.isActive && !this.wakeLock) {
        this.requestWakeLock();
      }
    });
  }

  /**
   * Запрашивает блокировку сна экрана
   */
  async requestWakeLock() {
    try {
      if (this.isSupported) {
        // Используем Screen Wake Lock API
        this.wakeLock = await navigator.wakeLock.request('screen');
        console.log('🔒 Wake Lock активирован (Screen Wake Lock API)');
        
        this.wakeLock.addEventListener('release', () => {
          console.log('🔓 Wake Lock отключен');
          this.wakeLock = null;
        });
        
        this.isActive = true;
        return true;
      } else {
        // Fallback для браузеров, не поддерживающих Wake Lock API
        this.activateFallbackWakeLock();
        return true;
      }
    } catch (err) {
      console.warn('⚠️ Не удалось активировать Wake Lock:', err);
      // Используем fallback методы
      this.activateFallbackWakeLock();
      return false;
    }
  }

  /**
   * Альтернативные методы для старых браузеров
   */
  activateFallbackWakeLock() {
    console.log('🔄 Используем альтернативные методы предотвращения сна');
    
    // Метод 1: Невидимое видео
    this.createInvisibleVideo();
    
    // Метод 2: Периодические NoSleep запросы
    this.startNoSleepInterval();
    
    this.isActive = true;
  }

  /**
   * Создает невидимое видео для предотвращения сна
   */
  createInvisibleVideo() {
    // Создаем невидимое видео
    const video = document.createElement('video');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    video.style.position = 'fixed';
    video.style.top = '-1px';
    video.style.left = '-1px';
    video.style.width = '1px';
    video.style.height = '1px';
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    
    // Создаем пустое видео из canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 1, 1);
    
    canvas.toBlob((blob) => {
      const videoURL = URL.createObjectURL(blob);
      video.src = videoURL;
      video.play().catch(() => {
        // Игнорируем ошибки автовоспроизведения
      });
    });
    
    document.body.appendChild(video);
    this.fallbackVideo = video;
  }

  /**
   * Запускает периодические запросы для предотвращения сна
   */
  startNoSleepInterval() {
    // Каждые 15 секунд делаем минимальную активность
    this.noSleepInterval = setInterval(() => {
      // Создаем минимальную DOM активность
      const dummy = document.createElement('div');
      dummy.style.position = 'absolute';
      dummy.style.top = '-1px';
      dummy.style.left = '-1px';
      dummy.style.width = '1px';
      dummy.style.height = '1px';
      dummy.style.opacity = '0';
      document.body.appendChild(dummy);
      
      // Удаляем через микросекунду
      setTimeout(() => {
        if (dummy.parentNode) {
          dummy.parentNode.removeChild(dummy);
        }
      }, 1);
      
      // Также отправляем пинг самому себе
      fetch(window.location.href, { 
        method: 'HEAD',
        cache: 'no-cache'
      }).catch(() => {
        // Игнорируем ошибки сети
      });
    }, 15000);
  }

  /**
   * Отключает блокировку сна
   */
  async releaseWakeLock() {
    this.isActive = false;
    
    if (this.wakeLock) {
      await this.wakeLock.release();
      this.wakeLock = null;
    }
    
    // Очищаем fallback методы
    if (this.noSleepInterval) {
      clearInterval(this.noSleepInterval);
      this.noSleepInterval = null;
    }
    
    if (this.fallbackVideo) {
      this.fallbackVideo.pause();
      if (this.fallbackVideo.parentNode) {
        this.fallbackVideo.parentNode.removeChild(this.fallbackVideo);
      }
      this.fallbackVideo = null;
    }
    
    console.log('🔓 Wake Lock полностью отключен');
  }

  /**
   * Получает статус блокировки
   */
  getStatus() {
    return {
      isSupported: this.isSupported,
      isActive: this.isActive,
      hasNativeWakeLock: !!this.wakeLock,
      method: this.wakeLock ? 'Screen Wake Lock API' : 'Fallback methods'
    };
  }
}

// Создаем глобальный экземпляр
const wakeLockManager = new WakeLockManager();

// Экспортируем для использования в модулях
export default wakeLockManager;

// Также делаем доступным глобально для обычных скриптов
window.wakeLockManager = wakeLockManager; 