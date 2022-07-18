import { Scene } from 'three';
import { Sizes } from './utils/Sizes';
import { Camera } from './Camera';
import { Renderer } from './Renderer'
import { Time } from './utils/Time';
import { Resources } from './utils/Resources';

import { assets } from './assets/assets';

import { World } from './world/World';

export class Experience {

    /**@type {Kot} */
    static instance;

    /**@type {HTMLCanvasElement} */
    canvas;

    /**@type {Scene} */
    scene;

    /**@type {Sizes} */
    sizes;

    /**@type {Time} */
    time;

    /**@type {Camera} */
    camera;

    /**@type {Renderer} */
    renderer;

    /**@type {World} */
    world;
    
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @returns {Kot}
     */
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance    = this;
        this.canvas     = canvas;
        this.scene      = new Scene();
        this.sizes      = new Sizes();
        this.time       = new Time();
        this.camera     = new Camera();
        this.renderer   = new Renderer();

        this.resources = new Resources(assets);

        this.world = new World();

        this.time.addEventListener('update', this.update.bind(this));
        this.sizes.addEventListener('resize', this.resize.bind(this));        
    }

    update() {
        this.camera.update();
        this.renderer.update();
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

}