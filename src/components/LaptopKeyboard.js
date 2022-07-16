class LaptopKeyboard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode : 'open' })
    }

    static get styles() {
        return `
        :host{
            display:block;
        }
        
        .top {
            background-color: navy;
            position: absolute;
            top: 25px;
            left: 83px;
            height: 140px;
            width: 122px;
            transform: 
            rotateX(50deg) rotateY(-30deg) rotateZ(-50deg) skew(10deg, 0deg);
        }
        
        .front::before {
            content: " ";
            position: absolute;
            width: 6px;
            height: 10px;
            top: 102px;
            left: 0px;
            background: purple;
            transform: skew(0deg, -13deg);
        }

        .front {
            background-color: purple;
            position: absolute;
            top: 88px;
            left: 107px;
            height: 106px;
            width: 6px;
            transform:
                rotateX(55deg) rotateY(-1deg) rotateZ(90deg) skew(0deg, 0deg);
        }

        .right {
            background-color: yellow;
            position: absolute;
            top: 95px;
            left: 139px;
            height: 2px;
            width: 117px;
            transform: 
            rotateX(0deg) rotateY(-25deg) rotateZ(-50deg) skew(130deg, 0deg);
        }

        `;
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /* html */`
            <style>${LaptopKeyboard.styles}</style>
            <div class="top" >
                <div class='keyboard' ></div>
            </div>
            <div class="front" ></div>
            <div class="right" ></div>
        `;
    }

}

customElements.define('laptop-keyboard', LaptopKeyboard);