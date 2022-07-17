import { Experience } from '../Experience'
import { Enviroment } from './Enviroment';

import { KotRoom } from './KotRoom';

export class World {

    /** @type {Experience} */
    experience;

    sizes;
    scene;
    canvas;
    camera;
    kotRoom;
    resources;
    enviroment;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.addEventListener('ready', () => {
            this.enviroment = new Enviroment();
            this.kotRoom = new KotRoom();
        })
    }

    resize() {

    }

    update() {

    }

}