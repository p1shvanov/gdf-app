import { CONFIG } from '../shared/config/index.js';

export default class Keyboard {
    static LANGUAGES = {
        EN: 'en',
        RU: 'ru'
    };

    static KEYBOARD_LAYOUTS = {
        [Keyboard.LANGUAGES.EN]: {
            'q': 'q', 'w': 'w', 'e': 'e', 'r': 'r', 't': 't', 'y': 'y', 'u': 'u', 'i': 'i', 'o': 'o', 'p': 'p',
            'a': 'a', 's': 's', 'd': 'd', 'f': 'f', 'g': 'g', 'h': 'h', 'j': 'j', 'k': 'k', 'l': 'l',
            'z': 'z', 'x': 'x', 'c': 'c', 'v': 'v', 'b': 'b', 'n': 'n', 'm': 'm',
            ',': ',', '.': '.',
            'ru_x': 'x', 'ru_hard': 'hard', 'ru_zh': 'j', 'ru_e': 'e'
        },
        [Keyboard.LANGUAGES.RU]: {
            'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з',
            'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
            'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь',
            ',': 'б', '.': 'ю',
            'ru_x': 'х', 'ru_hard': 'ъ', 'ru_zh': 'ж', 'ru_e': 'э'
        }
    };

    static init(containerId = null) {
        if (this.instance) {
            return;
        }
        this.instance = new Keyboard(containerId);
    }

    static setCallbacks(onInput, onSubmit) {
        if (!this.instance) {
            console.warn('Keyboard instance not initialized. Call Keyboard.init(containerId) first.');
            return;
        }
        this.instance.onInput = onInput;
        this.instance.onSubmit = onSubmit;
    }

    static setProcessing(isProcessing) {
        if (this.instance) {
            this.instance.setProcessing(isProcessing);
        }
    }

    static setKeyboardEnabled(enabled) {
        if (this.instance) {
            this.instance.setKeyboardEnabled(enabled);
        }
    }

    constructor(containerId = null) {
        this.containerId = containerId;
        this.onInput = null;
        this.onSubmit = null;
        this.value = "";
        
        // iOS-like caps functionality
        this.capsState = 'normal'; // 'normal', 'shift', 'capsLock'
        this.lastCapsClickTime = 0;
        this.doubleTapDelay = 300; // milliseconds for detecting double tap
        
        this.currentLanguage = Keyboard.LANGUAGES.EN;
        this.isProcessing = false;
        this.isKeyboardEnabled = true;
        this.createKeyboard();
    }

    createKeyboard() {
        const main = document.createElement('div');
        main.className = 'keyboard';
        
        const keysContainer = document.createElement('div');
        keysContainer.className = 'keyboard__keys';
        
        this.keysContainer = keysContainer;
        main.appendChild(keysContainer);
        
        // Append to specified container or document.body
        if (this.containerId) {
            const container = document.getElementById(this.containerId);
            if (container) {
                container.appendChild(main);
            } else {
                console.error(`Container with id "${this.containerId}" not found`);
                document.body.appendChild(main);
            }
        } else {
            document.body.appendChild(main);
        }
        
        this.keyboard = main;
        
        // Create initial layout
        this.renderKeyboardLayout();
        
        // Set initial keyboard state (disable done button for empty input)
        this.updateKeyboardState();
    }

    getKeyLayoutForLanguage() {
        if (this.currentLanguage === Keyboard.LANGUAGES.RU) {
            return [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "ru_x", "ru_hard",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ru_zh", "ru_e",
                "z", "x", "c", "v", "b", "n", "m", ",", ".",
                "lang", "space", "done"
            ];
        } else {
            return [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",
                "z", "x", "c", "v", "b", "n", "m", ",", ".",
                "lang", "space", "done"
            ];
        }
    }

    getLineBreaksForLanguage() {
        if (this.currentLanguage === Keyboard.LANGUAGES.RU) {
            return ["backspace", "ru_hard", "ru_e", "."];
        } else {
            return ["backspace", "p", "l", "."];
        }
    }

    renderKeyboardLayout() {
        // Clear existing keys
        this.keysContainer.innerHTML = '';
        
        const keyLayout = this.getKeyLayoutForLanguage();
        const lineBreaks = this.getLineBreaksForLanguage();

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = lineBreaks.indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.dataset.key = key; // Store the original key

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    break;

                case "lang":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("language");
                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");
                    break;

                case "ru_x":
                case "ru_hard":
                case "ru_zh":
                case "ru_e":
                    keyElement.textContent = this.getKeyText(key);
                    break;

                default:
                    keyElement.textContent = this.getKeyText(key);
            }

            keyElement.addEventListener("click", () => this.handleKeyClick(key));
            this.keysContainer.appendChild(keyElement);

            if (insertLineBreak) {
                this.keysContainer.appendChild(document.createElement("br"));
            }
        });
    }

    getKeyText(key) {
        const char = Keyboard.KEYBOARD_LAYOUTS[this.currentLanguage][key] || key;
        
        // Handle caps state logic
        if (this.capsState === 'capsLock') {
            return char.toUpperCase();
        } else if (this.capsState === 'shift') {
            return char.toUpperCase();
        } else {
            return char.toLowerCase();
        }
    }

    updateKeyboardLayout() {
        this.keyboard.querySelectorAll('.keyboard__key').forEach(keyElement => {
            const originalKey = keyElement.dataset.key;
            if (originalKey && !keyElement.innerHTML.includes('material-icons')) {
                keyElement.textContent = this.getKeyText(originalKey);
            }
        });
    }

    handleCapsClick() {
        const currentTime = Date.now();
        const timeSinceLastClick = currentTime - this.lastCapsClickTime;
        const previousState = this.capsState;
        
        if (timeSinceLastClick < this.doubleTapDelay && this.capsState === 'shift') {
            // Double tap detected - switch to caps lock
            this.capsState = 'capsLock';
        } else if (this.capsState === 'normal') {
            // Single tap from normal - switch to shift
            this.capsState = 'shift';
        } else if (this.capsState === 'shift') {
            // Single tap from shift (not double tap) - switch to normal
            this.capsState = 'normal';
        } else if (this.capsState === 'capsLock') {
            // Tap from caps lock - switch to normal
            this.capsState = 'normal';
        }
        
        // Debug logging
        console.log(`Caps state changed: ${previousState} → ${this.capsState} (time since last click: ${timeSinceLastClick}ms)`);
        
        this.lastCapsClickTime = currentTime;
        
        // Update visual state
        this.updateCapsVisualState();
        this.updateKeyboardLayout();
    }

    updateCapsVisualState() {
        const capsButton = this.keyboard.querySelector('[data-key="caps"]');
        
        // Remove all caps states
        capsButton.classList.remove('keyboard__key--active', 'keyboard__key--shift', 'keyboard__key--capslock');
        
        // Add appropriate state class
        if (this.capsState === 'shift') {
            capsButton.classList.add('keyboard__key--shift');
        } else if (this.capsState === 'capsLock') {
            capsButton.classList.add('keyboard__key--capslock');
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === Keyboard.LANGUAGES.EN 
            ? Keyboard.LANGUAGES.RU 
            : Keyboard.LANGUAGES.EN;
        
        // Re-render the entire keyboard layout for the new language
        this.renderKeyboardLayout();
        
        // Update caps visual state after re-rendering
        this.updateCapsVisualState();
        
        // Update keyboard state
        this.updateKeyboardState();
    }

    handleKeyClick(key) {
        // Prevent all input when keyboard is fully disabled
        if (!this.isKeyboardEnabled) {
            return;
        }
        
        if (key === 'backspace') {
            this.value = this.value.slice(0, -1);
        } else if (key === 'space') {
            if (this.value.length < CONFIG.TERMINAL.VALIDATION.MAX_LENGTH) {
                this.value += ' ';
            }
        } else if (key === 'caps') {
            this.handleCapsClick();
        } else if (key === 'lang') {
            this.toggleLanguage();
            return;
        } else if (key === 'done') {
            // Prevent multiple submissions during processing
            if (this.isProcessing) {
                return;
            }
            
            // Prevent submission if input is too short
            if (this.value.trim().length < CONFIG.TERMINAL.VALIDATION.MIN_LENGTH) {
                return;
            }
            
            if (this.onSubmit) {
                this.onSubmit(this.value);
            }
            this.value = "";
            this.updateKeyboardState();
            return;
        } else {
            if (this.value.length < CONFIG.TERMINAL.VALIDATION.MAX_LENGTH) {
                const char = this.getKeyText(key);
                this.value += char;
                
                // Reset shift mode after typing one character (iOS behavior)
                if (this.capsState === 'shift') {
                    console.log('Shift mode auto-reset after typing character');
                    this.capsState = 'normal';
                    this.updateCapsVisualState();
                    this.updateKeyboardLayout();
                }
            }
        }
        
        this.updateKeyboardState();
        
        if (this.onInput) {
            this.onInput(this.value);
        }
    }

    updateKeyboardState() {
        const isAtLimit = this.value.length >= CONFIG.TERMINAL.VALIDATION.MAX_LENGTH;
        
        this.keyboard.querySelectorAll('.keyboard__key').forEach(keyElement => {
            const originalKey = keyElement.dataset.key;
            
            // Handle done button - disable during processing or insufficient input
            if (originalKey === 'done') {
                // Remove all state classes first
                keyElement.classList.remove('keyboard__key--disabled', 'keyboard__key--processing');
                
                const valueLength = this.value.trim().length;
                const minLength = CONFIG.TERMINAL.VALIDATION.MIN_LENGTH;
                
                if (this.isProcessing) {
                    keyElement.classList.add('keyboard__key--processing');
                } else if (valueLength < minLength) {
                    keyElement.classList.add('keyboard__key--disabled');
                }
            }
            // Handle other keys (except backspace) - disable when at character limit OR when processing
            else if (originalKey !== 'backspace') {
                if (isAtLimit || !this.isKeyboardEnabled) {
                    keyElement.classList.add('keyboard__key--disabled');
                } else {
                    keyElement.classList.remove('keyboard__key--disabled');
                }
            }
            // Handle backspace - disable only when processing (keep enabled at limit for editing)
            else if (originalKey === 'backspace') {
                if (!this.isKeyboardEnabled) {
                    keyElement.classList.add('keyboard__key--disabled');
                } else {
                    keyElement.classList.remove('keyboard__key--disabled');
                }
            }
        });
    }

    setProcessing(isProcessing) {
        this.isProcessing = isProcessing;
        this.updateKeyboardState();
    }

    setKeyboardEnabled(enabled) {
        this.isKeyboardEnabled = enabled;
        // Remove global keyboard disabling, use individual key states instead
        this.updateKeyboardState();
    }
} 