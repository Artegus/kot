class LaptopScreen extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get styles() {
        return `
            .screen {
                background-color: grey;
                height: 100px;
                width: 150px;
                position: relative;
                top: 0px;
                transform: 
                    rotateX(35deg) rotateY(30deg) rotateZ(-40deg) skew(-20deg, -20deg);
            }
        `;
        // x y z angle
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopScreen.styles}</style>
            <div class='screen' >

            </div>
        `;
    }

}

customElements.define('laptop-screen', LaptopScreen);