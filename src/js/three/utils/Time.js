
export class Time extends EventTarget {
    
    /**@type {Date} */
    start;
    /**@type {Date} */
    current;
    /**@type {number} */
    elapsed;
    /**@type {number} */
    delta;

    constructor() {
        super();
        this.start = new Date();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }


    update() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.emitUpdateEvent();
        window.requestAnimationFrame(this.update.bind(this));
    }

    emitUpdateEvent() {
        const event = new Event('update');
        this.dispatchEvent(event);
    }

}