import { CONFIG } from '../config/index.js';

export class SheetsService {
  constructor() {
    // Replace this with your Google Apps Script Web App URL
    this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4_PHq26iukRupGM1es6TUwss0fsa32N2BLIJQuJa24CPm1cWIgCpxqEMzHAbey3Ximg/exec';
    this.retryDelay = CONFIG.API.RETRY_DELAY; // 1 second
    this.maxRetries = CONFIG.API.MAX_RETRIES;
    this.lastTimestamp = '1970-01-01T00:00:00.000Z';
  }

  cleanInput(word) {
    // Remove any HTML tags and trim whitespace
    return word.replace(/<[^>]*>/g, '').trim();
  }

  async submitWord(word, verified = false) {
    const cleanWord = this.cleanInput(word);
    
    if (!cleanWord) {
      throw new Error('Empty word after cleaning');
    }

    let retries = 0;
    
    while (retries < this.maxRetries) {
      try {
        const response = await fetch(this.SCRIPT_URL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            value: cleanWord,
            verified: verified
          })
        });

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          return {
            status: 'success',
            message: 'Word submitted successfully',
            data: data
          };
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }

      } catch (error) {
        console.error(`Error submitting word (attempt ${retries + 1}):`, error);
        retries++;
        
        if (retries < this.maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * retries));
        } else {
          // Re-throw the error after all retries
          if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error('Network error: Please check your internet connection and CORS settings');
          }
          throw error;
        }
      }
    }
  }

  async getWords(options = {}) {
    const {
      limit = CONFIG.API.DEFAULT_WORDS_LIMIT,
      random = true,
      lastTimestamp = this.lastTimestamp
    } = options;

    try {
      const response = await fetch(`${this.SCRIPT_URL}?limit=${limit}&random=${random}&lastTimestamp=${lastTimestamp}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        this.lastTimestamp = new Date().toISOString();
        return {
          ...data,
          timestamp: this.lastTimestamp
        };
      } else {
        throw new Error(data.message || 'Failed to fetch words');
      }
    } catch (error) {
      console.error('Error fetching words:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Please check your internet connection and CORS settings');
      }
      throw error;
    }
  }
} 