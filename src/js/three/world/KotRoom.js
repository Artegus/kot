import { Experience } from '../Experience'

export class KotRoom {

    /** @type {Experience} */
    experience;

    resources;
    scene;
    room;
    actualRoom;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources; 
        this.room = this.resources.gltfItems.kotRoom;
        this.actualRoom = this.room.scene;

        this.setModel();
    }

    setModel() {
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    resize() {

    }

    update() {

    }

}