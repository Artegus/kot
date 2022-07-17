
export class Sizes extends EventTarget {

    /**@type {number} */
    width;
    /**@type {number} */
    height;
    /**@type {number} */
    aspect;
    /**@type {number} */
    pixelRatio;

    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width /this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.updateSizeOnResize();
    }

    updateSizeOnResize() {
        window.addEventListener('resize', this.handleResizeEvent.bind(this))
    }

    handleResizeEvent() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width /this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.emitUpdateEvent();
    }

    emitUpdateEvent() {
        const event = new Event('resize');
        this.dispatchEvent(event);
    }

}