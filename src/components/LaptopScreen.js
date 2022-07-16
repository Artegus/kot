
class LaptopScreen extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isPlaying = false;
    }

    static get styles() {
        return `
        :host{
            display:block;
        }
        
        .screen-border {
            background-color: var(--blue-color);
            height: inherit;
            max-height: 90px;
            padding: 5px;
        }

        .screen {
            background-color: var(--white-color);
            padding-left: 5px;
            word-wrap: break-word;
            user-select: none;
            height: 100%;
            letter-spacing: 2px;
            font-size: 15px;
            font-family: 'Kot', monospace; 
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
            background-color: var(--red-color);
            transform:
            rotateX(50deg) rotateY(-30deg) rotateZ(-50deg) skew(10deg, 1deg);
        }

        .left {
            position: absolute;
            top: 45px;
            left: 35px;
            width: 6px;
            height: 100px;
            background-color: var(--salmon-color);
            transform:
            rotateX(35deg) rotateY(30deg) rotateZ(-40deg) skew(-20deg, 20deg);
        }

        `;
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopScreen.styles}</style>
            <div class="front" >
                <div class='screen-border' >
                    <div class='screen' ></div>
                </div>
            </div>
            <div class="top" ></div>
            <div class="left" ></div>
        `;
    }

}

customElements.define('laptop-screen', LaptopScreen);