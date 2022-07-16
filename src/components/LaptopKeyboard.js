class LaptopKeyboard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode : 'open' })
    }

    static get styles() {
        return `
            .keyboard {
                background-color: navy;
                position: relative;
                top: -75px;
                left: 83px;
                height: 140px;
                width: 122px;
                transform: 
                rotateX(50deg) rotateY(-30deg) rotateZ(-50deg) skew(10deg, 1deg);
            }
        `;
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopKeyboard.styles}</style>
            <div class='keyboard' ></div>
        `;
    }

}

customElements.define('laptop-keyboard', LaptopKeyboard);