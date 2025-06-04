import Keyboard from '../../form/keyboard.js';
import { SheetsService } from './sheets-service.js';
import { CONFIG } from '../config/index.js';

export class TerminalAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.historyTarget = null;
    this.inputTarget = null;
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
    if (!this.container) {
      console.error(`Container with id not found`);
      return;
    }

    this.createTerminalStructure();
    this.historyTarget.innerHTML = "";
    this.inputTarget.innerHTML = "";
    this.updateTerminal();
    
    // Setup keyboard input (keyboard should be initialized separately)
    this.setupKeyboard();

    // Add keyboard event listeners
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !this.isProcessing) {
        this.submitCommand();
      }
    });
  }

  createTerminalStructure() {
    // Create console container
    const consoleContainer = document.createElement('div');
    consoleContainer.className = 'console-container';

    // Create terminal header
    const terminalHeader = document.createElement('div');
    terminalHeader.className = 'terminal-header';

    // Create terminal buttons
    const terminalButtons = document.createElement('div');
    terminalButtons.className = 'terminal-buttons';

    const closeButton = document.createElement('button');
    closeButton.className = 'terminal-button close';
    closeButton.title = 'Close terminal';

    const minimizeButton = document.createElement('button');
    minimizeButton.className = 'terminal-button minimize';
    minimizeButton.title = 'Minimize terminal';

    const maximizeButton = document.createElement('button');
    maximizeButton.className = 'terminal-button maximize';
    maximizeButton.title = 'Maximize terminal';

    terminalButtons.appendChild(closeButton);
    terminalButtons.appendChild(minimizeButton);
    terminalButtons.appendChild(maximizeButton);

    // Create terminal title
    const terminalTitle = document.createElement('div');
    terminalTitle.className = 'terminal-title';
    terminalTitle.textContent = 'code_of_the_future';

    terminalHeader.appendChild(terminalButtons);
    terminalHeader.appendChild(terminalTitle);

    // Create terminal content
    const terminalContent = document.createElement('div');
    terminalContent.className = 'terminal-content';

    // Create terminal history
    const terminalHistory = document.createElement('div');
    terminalHistory.className = 'terminal-history';
    terminalHistory.id = 'terminal-history';

    // Create terminal input
    const terminalInput = document.createElement('div');
    terminalInput.className = 'terminal-input use-keyboard-input';
    terminalInput.id = 'terminal-input';
    terminalInput.tabIndex = 0;

    terminalContent.appendChild(terminalHistory);
    terminalContent.appendChild(terminalInput);

    // Assemble the structure
    consoleContainer.appendChild(terminalHeader);
    consoleContainer.appendChild(terminalContent);

    // Add to main container
    this.container.appendChild(consoleContainer);

    // Store references
    this.historyTarget = terminalHistory;
    this.inputTarget = terminalInput;
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