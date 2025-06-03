import Keyboard from '../../form/keyboard.js';
import { SheetsService } from './sheets-service.js';
import { CONFIG } from '../config/index.js';

export class TerminalAnimation {
  constructor() {
    this.historyTarget = document.getElementById('terminal-history');
    this.inputTarget = document.getElementById('terminal-input');
    this.commands = [];
    this.maxCommands = CONFIG.TERMINAL.MAX_COMMANDS;
    this.currentCommand = "";
    this.currentCommandText = ""; // Raw text without HTML markup
    this.username = "gdf-user";
    this.commandPrefix = "$ ";
    this.isProcessing = false;
    this.sheetsService = new SheetsService();
    
    this.init();
  }

  init() {
    this.historyTarget.innerHTML = "";
    this.inputTarget.innerHTML = "";
    this.updateTerminal();
    
    // Initialize keyboard
    Keyboard.init();
    
    // Setup keyboard input
    this.setupKeyboard();

    // Add keyboard event listeners
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !this.isProcessing) {
        this.submitCommand();
      }
    });
  }

  setupKeyboard() {
    Keyboard.setCallbacks(
      (value) => {
        this.currentCommandText = value; // Store raw text
        this.currentCommand = this.getPrompt() + value; // Store formatted command
        this.updateTerminal();
      },
      () => {
        this.submitCommand();
      }
    );
  }

  submitCommand() {
    if (this.currentCommandText.trim() === "") {
      return; // Don't process empty commands
    }
    this.processCommand(this.currentCommand);
  }

  getPrompt() {
    return `<span class="terminal-prompt">${this.commandPrefix}</span>`;
  }

  getUsername() {
    return `<span class="terminal-username">${this.username}</span>`;
  }

  async processCommand(command) {
    // Show processing state and disable entire keyboard
    this.isProcessing = true;
    Keyboard.setProcessing(true); // Disable done button
    Keyboard.setKeyboardEnabled(false); // Disable entire keyboard
    this.updateTerminal();
    
    try {
      // Use the raw command text for validation
      const commandText = this.currentCommandText.trim();
      
      // Validate the input
      const validationResult = this.validateInput(commandText);
      
      if (!validationResult.isValid) {
        // Add command to history
        this.commands.push(`<span class="terminal-username">${this.username}</span> ${command}`);
        
        // Show validation processing
        this.commands.push(`<div class="terminal-processing-step active">Validating input...</div>`);
        this.updateTerminal();
        
        await this.delay(600);
        
        // Add creative error message
        const errorMessage = this.getRandomResponse(validationResult.errorType);
        this.commands.push(`<div class="terminal-error">${errorMessage}</div>`);
        
        // Reset for next command
        this.currentCommand = this.getPrompt();
        this.currentCommandText = "";
        this.isProcessing = false;
        Keyboard.setProcessing(false); // Re-enable done button
        Keyboard.setKeyboardEnabled(true); // Re-enable entire keyboard
        this.updateTerminal();
        return;
      }
      
      // Show animated processing steps
      await this.showProcessingSteps(command);
      
      // Show final processing while making the actual request
      const finalProcessingPromise = this.showFinalProcessing();
      
      // Submit the word to Google Sheets (happens in parallel with final processing animation)
      const submitPromise = this.sheetsService.submitWord(commandText);
      
      // Wait for both the animation and the request to complete
      await Promise.all([finalProcessingPromise, submitPromise]);
      
      // Cleanup processing steps with smooth animation
      await this.cleanupProcessingSteps();
      
      // Small pause for smooth transition
      await this.delay(300);
      
      // Show success message
      const successMessage = this.getRandomResponse('SUCCESS');
      this.commands.push(`<div class="terminal-output">${successMessage}</div>`);
      
    } catch (error) {
      console.error('Error submitting word:', error);
      
      // Show error processing step
      this.commands.push(`<div class="terminal-processing-step">Error detected. Analyzing failure...</div>`);
      this.updateTerminal();
      
      await this.delay(800); // Brief pause before showing error
      
      let errorMessage;
      
      if (error.message.includes('CORS') || error.message.includes('Network error') || error.message.includes('HTTP error')) {
        errorMessage = this.getRandomResponse('NETWORK_ERROR');
      } else {
        // For other errors, use a generic network error message
        errorMessage = this.getRandomResponse('NETWORK_ERROR');
      }
      
      this.commands.push(`<div class="terminal-error">${errorMessage}</div>`);
    }
    
    // Remove oldest commands if we exceed the limit
    while (this.commands.length > this.maxCommands) {
      this.commands.shift();
    }
    
    // Reset for next command
    this.currentCommand = this.getPrompt();
    this.currentCommandText = "";
    this.isProcessing = false;
    Keyboard.setProcessing(false); // Re-enable done button
    Keyboard.setKeyboardEnabled(true); // Re-enable entire keyboard
    this.updateTerminal();
  }

  updateTerminal() {
    // Update history
    let historyContent = "";
    this.commands.forEach(cmd => {
      historyContent += `<div class="terminal-line">${cmd}</div>`;
    });
    this.historyTarget.innerHTML = historyContent;
    
    // Update input line with appropriate class
    let inputClass = "terminal-line typing";
    if (this.isProcessing) {
      inputClass += " processing";
    }
    
    // Use raw text for character counting
    const commandText = this.currentCommandText;
    const charCount = commandText.length;
    const maxLength = CONFIG.TERMINAL.VALIDATION.MAX_LENGTH;
    
    // Character count indicator
    let charCountClass = "terminal-char-limit";
    if (charCount >= maxLength * CONFIG.TERMINAL.VALIDATION.WARNING_THRESHOLD) {
      charCountClass += " warning";
    }
    if (charCount >= maxLength * CONFIG.TERMINAL.VALIDATION.DANGER_THRESHOLD) {
      charCountClass += " danger";
    }
    
    const charCountIndicator = `<span class="${charCountClass}">${charCount}/${maxLength}</span>`;
    
    this.inputTarget.innerHTML = `<div class="${inputClass}" style="position: relative;">${this.getUsername()} ${this.getPrompt()}<span class="terminal-command">${commandText}</span><span class="cursor">_</span>${charCountIndicator}</div>`;
    
    // Auto-scroll history to bottom
    this.historyTarget.scrollTop = this.historyTarget.scrollHeight;
  }

  // Validation methods
  validateInput(commandText) {
    const trimmedText = commandText.trim();
    
    if (trimmedText.length === 0) {
      return { isValid: false, errorType: 'EMPTY_INPUT' };
    }
    
    if (trimmedText.length < CONFIG.TERMINAL.VALIDATION.MIN_LENGTH) {
      return { isValid: false, errorType: 'TOO_SHORT' };
    }
    
    if (trimmedText.length > CONFIG.TERMINAL.VALIDATION.MAX_LENGTH) {
      return { isValid: false, errorType: 'VALIDATION_ERROR' };
    }
    
    return { isValid: true };
  }

  getRandomResponse(responseType) {
    const responses = CONFIG.TERMINAL.RESPONSES[responseType];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Animated processing methods
  async showProcessingSteps(command) {
    // Add command to history first
    this.commands.push(`<span class="terminal-username">${this.username}</span> ${command}`);
    this.updateTerminal();

    // Get random processing steps for this session
    const steps = this.getRandomProcessingSteps();
    const stepDelay = CONFIG.TERMINAL.PROCESSING.STEP_DELAY;

    for (let i = 0; i < steps.length; i++) {
      // Add step with active animation
      const stepId = `step-${Date.now()}-${i}`;
      this.commands.push(`<div class="terminal-processing-step active" id="${stepId}">${steps[i]}</div>`);
      this.updateTerminal();

      // Wait for step delay
      await this.delay(stepDelay);

      // Remove active class (stop dots animation)
      const stepElement = document.getElementById(stepId);
      if (stepElement) {
        stepElement.classList.remove('active');
      }
    }
  }

  async showFinalProcessing() {
    // Get random final processing message
    const finalSteps = CONFIG.TERMINAL.PROCESSING.FINAL_STEP_POOL;
    const randomFinalStep = finalSteps[Math.floor(Math.random() * finalSteps.length)];
    
    // Show final processing step
    const finalStepId = `final-${Date.now()}`;
    this.commands.push(`<div class="terminal-processing-step active" id="${finalStepId}">${randomFinalStep}</div>`);
    this.updateTerminal();

    await this.delay(CONFIG.TERMINAL.PROCESSING.FINAL_DELAY);

    // Remove the final processing step
    const finalElement = document.getElementById(finalStepId);
    if (finalElement) {
      finalElement.classList.remove('active');
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async cleanupProcessingSteps() {
    // Find all processing step elements in the DOM
    const processingSteps = document.querySelectorAll('.terminal-processing-step');
    
    if (processingSteps.length === 0) return;
    
    // Add fade-out animation to all processing steps
    processingSteps.forEach(step => {
      step.classList.add('fade-out');
    });
    
    // Wait for animation to complete using configurable delay
    await this.delay(CONFIG.TERMINAL.PROCESSING.CLEANUP_DELAY);
    
    // Remove processing steps from commands array
    this.commands = this.commands.filter(cmd => {
      return !cmd.includes('terminal-processing-step');
    });
    
    // Update terminal to reflect the cleanup
    this.updateTerminal();
  }

  getRandomProcessingSteps() {
    const config = CONFIG.TERMINAL.PROCESSING;
    const stepPool = [...config.STEP_POOL]; // Create a copy to avoid modifying original
    const minCount = config.RANDOM_STEPS.MIN_COUNT;
    const maxCount = config.RANDOM_STEPS.MAX_COUNT;
    
    // Random count between min and max
    const stepCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const selectedSteps = [];
    
    // Select random steps without repetition
    for (let i = 0; i < stepCount && stepPool.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * stepPool.length);
      selectedSteps.push(stepPool.splice(randomIndex, 1)[0]);
    }
    
    console.log(`🎲 Selected ${stepCount} random processing steps:`, selectedSteps);
    return selectedSteps;
  }
} 