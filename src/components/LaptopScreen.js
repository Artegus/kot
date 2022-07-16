class LaptopScreen extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get styles() {
        return `
        
        :host{
            display:block;
        }
        
        .front {
            background-color: grey;
            height: 100px;
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

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopScreen.styles}</style>
            <div class="front" >
                <div class='screen' >
                    hey asd asdd asd asd asd asdas d sdad sa 
                </div>
            </div>
            <div class="top" ></div>
            <div class="left" ></div>
        `;
    }

}

customElements.define('laptop-screen', LaptopScreen);