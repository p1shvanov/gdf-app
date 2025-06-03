export class SheetsService {
  constructor() {
    // Replace this with your Google Apps Script Web App URL
    this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_8XlKlkUKKgPB_El1SU9cPly-A3FP2iVIn2B-0puKHmZm4Gdgit61ZRK7vNdIaCzikg/exec';
    this.queue = [];
    this.isProcessing = false;
    this.lastTimestamp = '1970-01-01T00:00:00.000Z';
    this.retryDelay = 1000; // 1 second
    this.maxRetries = 3;
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

    // Add to queue
    this.queue.push({
      word: cleanWord,
      verified: verified
    });
    
    // Start processing if not already processing
    if (!this.isProcessing) {
      this.processQueue();
    }

    return {
      status: 'queued',
      message: 'Word added to queue'
    };
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    let retries = 0;

    while (this.queue.length > 0 && retries < this.maxRetries) {
      try {
        const { word, verified } = this.queue[0];
        
        const response = await fetch(this.SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: word,
            verified: verified
          })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
          // Remove the word from queue if successful
          this.queue.shift();
          retries = 0; // Reset retries on success
        } else {
          throw new Error(data.message);
        }

        // Add small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error submitting word:', error);
        retries++;
        
        if (retries < this.maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * retries));
        } else {
          // Move failed word to the end of queue
          const failedWord = this.queue.shift();
          this.queue.push(failedWord);
          retries = 0;
        }
      }
    }

    this.isProcessing = false;
  }

  async getWords(options = {}) {
    const {
      limit = 500,
      random = true,
      lastTimestamp = this.lastTimestamp
    } = options;

    try {
      const response = await fetch(`${this.SCRIPT_URL}?limit=${limit}&random=${random}&lastTimestamp=${lastTimestamp}`);
      const data = await response.json();

      if (data.status === 'success') {
        this.lastTimestamp = new Date().toISOString();
        return {
          ...data,
          timestamp: this.lastTimestamp
        };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching words:', error);
      throw error;
    }
  }
} 