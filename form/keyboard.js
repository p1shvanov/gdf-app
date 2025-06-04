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
            ',': ',', '.': '.', '?': '?'
        },
        [Keyboard.LANGUAGES.RU]: {
            'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з',
            'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
            'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь',
            ',': 'б', '.': 'ю', '?': '?'
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
            this.init();
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
        this.isCapsLock = false;
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
        
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "lang", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space", "done"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

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

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
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

                default:
                    keyElement.textContent = this.getKeyText(key);
            }

            keyElement.addEventListener("click", () => this.handleKeyClick(key));
            keysContainer.appendChild(keyElement);

            if (insertLineBreak) {
                keysContainer.appendChild(document.createElement("br"));
            }
        });

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
        
        // Set initial keyboard state (disable done button for empty input)
        this.updateKeyboardState();
    }

    getKeyText(key) {
        const char = Keyboard.KEYBOARD_LAYOUTS[this.currentLanguage][key] || key;
        return this.isCapsLock ? char.toUpperCase() : char.toLowerCase();
    }

    updateKeyboardLayout() {
        this.keyboard.querySelectorAll('.keyboard__key').forEach(keyElement => {
            const originalKey = keyElement.dataset.key;
            if (originalKey && !keyElement.innerHTML.includes('material-icons')) {
                keyElement.textContent = this.getKeyText(originalKey);
            }
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === Keyboard.LANGUAGES.EN 
            ? Keyboard.LANGUAGES.RU 
            : Keyboard.LANGUAGES.EN;
        
        const langButton = this.keyboard.querySelector('[data-key="lang"]');
        
        this.updateKeyboardLayout();
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
        } else if (key === 'enter') {
            this.value += '\n';
        } else if (key === 'caps') {
            this.isCapsLock = !this.isCapsLock;
            this.keyboard.querySelector('[data-key="caps"]').classList.toggle('keyboard__key--active', this.isCapsLock);
            this.updateKeyboardLayout();
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