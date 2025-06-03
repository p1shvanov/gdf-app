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
      
      // Clean the value from any HTML tags
      const cleanValue = data.value.replace(/<[^>]*>/g, '').trim();
      
      // Add timestamp
      const timestamp = new Date().toISOString();
      
      // Add the new row with timestamp
      sheet.appendRow([cleanValue, data.verified, timestamp]);
      
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
  
  function doGet(e) {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const data = sheet.getDataRange().getValues();
      const MAX_WORDS = 500; // Максимальное количество слов
      
      // Получаем только верифицированные слова
      let words = data.slice(1)  // Пропускаем заголовок
        .filter(row => row[1] === true)  // Только верифицированные
        .map(row => ({
          value: row[0],
          verified: row[1],
          timestamp: row[2]
        }));
      
      // Если слов больше лимита, делаем случайную выборку
      if (words.length > MAX_WORDS) {
        words = words.sort(() => Math.random() - 0.5).slice(0, MAX_WORDS);
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'success',
        'words': words,
        'total': words.length
      })).setMimeType(ContentService.MimeType.TEXT);
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      })).setMimeType(ContentService.MimeType.TEXT);
    }
  }