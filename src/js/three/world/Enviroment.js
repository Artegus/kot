import { AmbientLight, DirectionalLight } from 'three';
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
        this.sunlight.position.set(1, 14, 9);
        this.scene.add(this.sunlight);

        this.ambientLight = new AmbientLight('#ffffff', 1);
        this.scene.add(this.ambientLight);

    }

    resize() {

    }

    update() {

    }

}