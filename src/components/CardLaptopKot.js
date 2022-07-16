import './Laptop.js';
import './Kot.js'

class CardLaptopKot extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get styles() {
        return `
            :host {
                display: block;
            }
        `
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
        <style>${CardLaptopKot.styles}</style>    
        <div class='card-laptop-kat'>
            <laptop-container></laptop-container>
            <kot-animal></kot-animal>
        </div>
        `;
    }

}

customElements.define('card-laptop-kot', CardLaptopKot);