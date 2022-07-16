import { rand } from './../js/utils';

class KotLetter extends HTMLElement {

    letter;
    color;
    x;
    y;
    fontSize;

    constructor() {
        super();
        this.attachShadow({ mode : 'open' })
    }

    loadAttributes() {
        this.letter = this.getAttribute('letter') ?? 'K';
        this.x = this.getAttribute('x') ?? '0';
        this.y = this.getAttribute('y') ?? '0';
        this.color = this.getRandomColor();
        this.fontSize = rand(45);
    }
  
    getRandomColor = () => {
        return `rgba(${rand(255)},${rand(255)},${rand(255)},${Math.random() + 0.5})`
    }

    get styles() {
        return `
        :host{
            display:inline;
        }
        .kot-letter {
            font-family: 'Kot', 'monospace';
            position: absolute;
            font-size: ${this.fontSize}px;
            color: ${this.color};
            top: ${this.x}px;
            left: ${this.y}px;
            user-select: none;
            z-index: 10;
        }
        `;
    }
    
    connectedCallback(){
        this.loadAttributes();
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${this.styles}</style>
            <span class="kot-letter" >${this.letter}</span>
        `;
    }

}

customElements.define('kot-letter', KotLetter);