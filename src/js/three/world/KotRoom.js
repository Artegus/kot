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
        this.room = this.resources.items.kotRoom;
        this.actualRoom = this.room.scene;

        this.setModel();
    }

    setModel() {
        this.scene.add(this.actualRoom);
    }

    resize() {

    }

    update() {

    }

}