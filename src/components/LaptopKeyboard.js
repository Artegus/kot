const KOT = ["K", "O", "T"];
const MAX_LETTERS = 44;

class LaptopKeyboard extends HTMLElement {

    /**@type {number} */
    nLetters;
    
    /**@type {boolean} */
    isPlaying;

    constructor() {
        super();
        this.attachShadow({ mode : 'open' })
    }

    static get styles() {
        return `
        :host{
            display:block;
        }
        
        .top {
            background-color: var(--red-color);
            position: absolute;
            top: 25px;
            left: 83px;
            height: 141px;
            width: 122px;
            transform: 
            rotateX(50deg) rotateY(-30deg) rotateZ(-50deg) skew(10deg, 0deg);
        }
        
        .front::before {
            content: " ";
            position: absolute;
            width: 5px;
            height: 10px;
            top: 103px;
            left: 0px;
            background: var(--brown-color);
            transform: skew(0deg, -13deg);
            z-index: 3;
        }

        .front {
            background-color: var(--brown-color);
            position: absolute;
            top: 87px;
            left: 108px;
            height: 108px;
            width: 5px;
            transform:
                rotateX(55deg) rotateY(-1deg) rotateZ(90deg) skew(0deg, 0deg);
        }

        .right {
            background-color: var(--blue-color);
            position: absolute;
            top: 95px;
            left: 139px;
            height: 2px;
            width: 117px;
            transform: 
            rotateX(0deg) rotateY(-26deg) rotateZ(-50deg) skew(130deg, 0deg);
        }

        `;
    }

    initialize() {
        this.nLetters = 0;
    }

    toogleIsPlaying() {
        this.isPlaying = !this.isPlaying;
    }

    /**
     * 
     * @returns {HTMLAudioElement} Kot audio
     */
    getKotAudio() {
        const audio = new Audio('./assets/audios/kot.mp3');
        audio.addEventListener('play', () => this.toogleIsPlaying());
        audio.addEventListener('ended', () => this.toogleIsPlaying());
        
        return audio;
    }

    playSound() {
        if (!this.isPlaying) {
            const audio = this.getKotAudio();
            audio.play();
        }
    }

    getLetter() {
        if (this.nLetters === 0) {
            return KOT[0];
        }
        const pos = this.nLetters % KOT.length;
        if (pos === 0) {
            return KOT[0];
        } else {
            return KOT[pos];
        }
    }

    /**
     * 
     * @param {string} key 
     * @returns {boolean}
     */
    isValidKey(key) {
        return key.length > 1
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    handleKeyUpEvent(e) {
        if (this.isValidKey(e.key)) return;
        this.removeStartMessage();
        this.createKotLetter();
    }

    handleTouchStartEvent(e) {
        this.removeStartMessage();
        this.createKotLetter();
    }

    removeStartMessage() {
        const startMessage = document.querySelector('#start-message');
        if (startMessage) {
            startMessage.remove();
        }
    }

    createKotLetter() {
        this.playSound();
        this.emitKotLetterEvent();
        this.nLetters++;
    }

    emitKotLetterEvent() {
        const letter = this.getLetter();
        let kotEvent;
        
        if (this.nLetters <= MAX_LETTERS) {
            const isFinished = this.nLetters === MAX_LETTERS;
            kotEvent = new CustomEvent('kotSendToScreen', { bubbles: true, composed: true, detail: { stopWrite: isFinished, letter } })
        } else {
            kotEvent = new CustomEvent('kotSendToDocument', { bubbles: true, composed: true, detail: { letter } });
        }
        this.dispatchEvent(kotEvent);
    }

    initializeEvents() {
        window.addEventListener("keyup", this.handleKeyUpEvent.bind(this));
        window.addEventListener('touchstart', this.handleTouchStartEvent.bind(this));
    }

    connectedCallback(){
        this.initialize();
        this.render();
        this.initializeEvents();
    }

    disconnectedCallback() {
        window.removeEventListener('keyup', this.handleKeyUpEvent.bind(this));
        window.removeEventListener('touchstart', this.handleTouchStartEvent.bind(this));
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopKeyboard.styles}</style>
            <div class="top" >
                <div class='keyboard' ></div>
            </div>
            <div class="front" ></div>
            <div class="right" ></div>
        `;
    }

}

customElements.define('laptop-keyboard', LaptopKeyboard);