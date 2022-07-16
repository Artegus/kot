import './LaptopKeyboard.js';
import './LaptopScreen.js';

class Laptop extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get styles() {
        return `
            :host {
                display: block;
                background-color: white;
            }
        `
    }

    /**
     * Add letter to screen div.
     * @param {string} letter 
     */
    addLetterToScreen(letter) {
        const screen = this.getLaptopScreen().shadowRoot.querySelector('.screen');
        screen.textContent += letter;
    }

    /**
     * Handle kotSendToScreen event.
     * @param {KeyboardEvent} e 
     */
    handleWriteKot(e) {
        if (!e.detail.stopWrite) {
            const letter = e.detail.letter;
            this.addLetterToScreen(letter);
        } else {
            this.removeKotEventListener();
        }
    }

    /**
     * 
     * @returns {Element}
     */
    getLaptopScreen() {
        return this.shadowRoot.querySelector('laptop-screen');
    }

    removeKotEventListener = () => {
        this.removeEventListener('kotSendToScreen', this.handleWriteKot.bind(this))
    }

    initializeEvents() {
        this.addEventListener('kotSendToScreen', this.handleWriteKot.bind(this))
    }

    connectedCallback() {
        this.render();
        this.initializeEvents()
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
        <style>${Laptop.styles}</style>
            <laptop-screen></laptop-screen>
        <laptop-keyboard></laptop-keyboard>
        `;
    }

}

customElements.define('laptop-container', Laptop);