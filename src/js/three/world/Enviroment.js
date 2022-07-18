import { DirectionalLight } from 'three';
import { Experience } from '../Experience'

export class Enviroment {

    /** @type {Experience} */
    experience;

    scene;
    resources;

    /** @type {DirectionalLight} */
    sunlight;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setSunlight() {
        this.sunlight = new DirectionalLight('#ffffff', 2);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(1024, 1024);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(50, 100, 90);
        this.scene.add(this.sunlight)
    }

    resize() {

    }

    update() {

    }

}