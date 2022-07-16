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
            background-color: var(--red-color);
            position: absolute;
            top: 25px;
            left: 83px;
            height: 141px;
            width: 122px;
            transform: 
            rotateX(50deg) rotateY(-30deg) rotateZ(-50deg) skew(10deg, 0deg);
        }
        
        .front::before {
            content: " ";
            position: absolute;
            width: 5px;
            height: 10px;
            top: 103px;
            left: 0px;
            background: var(--brown-color);
            transform: skew(0deg, -13deg);
            z-index: 3;
        }

        .front {
            background-color: var(--brown-color);
            position: absolute;
            top: 87px;
            left: 108px;
            height: 108px;
            width: 5px;
            transform:
                rotateX(55deg) rotateY(-1deg) rotateZ(90deg) skew(0deg, 0deg);
        }

        .right {
            background-color: var(--blue-color);
            position: absolute;
            top: 95px;
            left: 139px;
            height: 2px;
            width: 117px;
            transform: 
            rotateX(0deg) rotateY(-26deg) rotateZ(-50deg) skew(130deg, 0deg);
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