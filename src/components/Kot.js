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
                position: absolute;
                z-index: 2;
                top: 50px;
                left: 75px;
            }
            
            .kot {
                width: 150px;
                transform: 
                rotateX(0deg) rotateY(180deg) rotate(40deg);
            }
        `
    }


    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${Kot.styles}</style>
            <img src=${kot} alt="kot" class='kot' />
        `;
    }

}

customElements.define('kot-animal', Kot);