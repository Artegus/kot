const KOT = ["K", "O", "T"];
const MAX_LETTERS = 43;

class LaptopScreen extends HTMLElement {

    indexLetter;
    nLetters;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get styles() {
        return `
        :host{
            display:block;
        }
        
        .screen-border {
            height: inherit;
            padding: 5px;
        }

        .screen {
            border: 1px solid black;
            padding-left: 5px;
            word-wrap: break-word;
            letter-spacing: 2px;
            height: 90%;
        }

        .front {
            background-color: grey;
            height: 100px;
            max-height: 100px;
            width: 150px;
            position: absolute;
            transform: 
                rotateX(35deg) rotateY(30deg) rotateZ(-40deg) skew(-20deg, -20deg);
        }

        .top {
            position: absolute;
            top: 1px;
            left: -4px;
            width: 122px;
            height: 6px;
            background-color: red;
            transform:
            rotateX(50deg) rotateY(-30deg) rotateZ(-50deg) skew(10deg, 1deg);
        }

        .left {
            position: absolute;
            top: 45px;
            left: 35px;
            width: 6px;
            height: 100px;
            background-color: pink;
            transform:
            rotateX(35deg) rotateY(30deg) rotateZ(-40deg) skew(-20deg, 20deg);
        }

        `;
    }

    initialize() {
        this.indexLetter = 0;
        this.nLetters = 0;
    }

    addLetterToScreen(letter) {
        const screen = this.shadowRoot.querySelector('.screen');
        screen.textContent += letter;
    }

    writeKotLetter() {
        if (this.indexLetter === 3) {
            this.indexLetter = 0;
        }
        this.addLetterToScreen(KOT[this.indexLetter]);
        this.indexLetter++;
        this.nLetters++;
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    handleWriteEvent(e) {
        if (e.key.length > 1) return;
        if (this.nLetters !== MAX_LETTERS) {
            this.writeKotLetter()
        } else {
            const event = new CustomEvent('kot', {
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(event);
        }
    }

    initializeEvents() {
        window.addEventListener("keyup", this.handleWriteEvent.bind(this));
    }

    connectedCallback(){
        this.initialize();
        this.render();
        this.initializeEvents();
    }

    disconnectedCallback() {
        window.removeEventListener('keyup', this.handleWriteEvent.bind(this));
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopScreen.styles}</style>
            <div class="front" >
                <div class='screen-border' >
                    <div class='screen' >

                    </div>
                </div>

            </div>
            <div class="top" ></div>
            <div class="left" ></div>
        `;
    }

}

customElements.define('laptop-screen', LaptopScreen);