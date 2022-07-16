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

    connectedCallback(){
        this.render();
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