export class SheetsService {
  constructor() {
    this.baseUrl = 'https://script.google.com/macros/s/AKfycbw_8XlKlkUKKgPB_El1SU9cPly-A3FP2iVIn2B-0puKHmZm4Gdgit61ZRK7vNdIaCzikg/exec';
  }

  async getWords() {
    try {;
      const response = await fetch(this.baseUrl);
      const data = await response.json();;

      if (data.status === 'success') {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching words:', error);
      throw error;
    }
  }

  async submitWord(word, verified = false) {
    try {
      const response = await fetch(this.baseUrl, {
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
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error submitting word:', error);
      throw error;
    }
  }
} 