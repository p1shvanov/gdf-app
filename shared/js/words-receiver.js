import { SheetsService } from './sheets-service.js';
import { CONFIG } from '../config/index.js';

export class WordsReceiver {
  constructor() {
    this.sheetsService = new SheetsService();
    this.pollingInterval = CONFIG.API.POLLING_INTERVAL; // 30 seconds
    this.isPolling = false;
    this.words = [];
    this.callbacks = new Set();
  }

  startPolling() {
    if (this.isPolling) return;
    
    this.isPolling = true;
    this.poll();
  }

  stopPolling() {
    this.isPolling = false;
  }

  async poll() {
    if (!this.isPolling) return;

    try {
      const response = await this.sheetsService.getWords();
      
      if (response.words && response.words.length > 0) {
        // Обновляем слова
        this.words = response.words;
        
        // Уведомляем подписчиков
        this.callbacks.forEach(callback => callback(this.words));
      }

      // Следующий опрос
      setTimeout(() => this.poll(), this.pollingInterval);
    } catch (error) {
      console.error('Error polling words:', error);
      setTimeout(() => this.poll(), this.pollingInterval);
    }
  }

  subscribe(callback) {
    this.callbacks.add(callback);
    // Если уже есть слова, сразу уведомляем
    if (this.words.length > 0) {
      callback(this.words);
    }
    return () => this.callbacks.delete(callback);
  }

  getWords() {
    return this.words;
  }
} 