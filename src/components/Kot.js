import kot from '../assets/kot.svg';

class Kot extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    static get styles() {
        return `
            :host{
                display: block;
                position: relative;
                border: 1px solid grey;
                z-index: 2;
                width: 110px;
                top: -150px;
                left: 75px;
                transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
            }
        `
    }


    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${Kot.styles}</style>
            <img src=${kot} alt="kot" />
        `;
    }

}

customElements.define('kot-animal', Kot);