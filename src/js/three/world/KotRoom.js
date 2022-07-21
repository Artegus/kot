import { MeshBasicMaterial } from 'three';
import { Group } from 'three';
import { Experience } from '../Experience'

export class KotRoom {

    /** @type {Experience} */
    experience;

    resources;
    scene;
    room;
    /**@type {Group} */
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
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child.type === 'Group'){
                child.children.forEach(childGroup => {
                    childGroup.castShadow = true;
                    childGroup.receiveShadow = true;
                })
            }

            if (child.name === 'PhotoFrameContent_0') {
                child.material = new MeshBasicMaterial({
                    map: this.resources.videoItems.kot_water_0
                });
            }

            if (child.name === 'PhotoFrameContent_1') {
                child.material = new MeshBasicMaterial({
                    map: this.resources.videoItems.kot_water_1
                });
            }

            if (child.name === 'PhotoFrameContent_2') {
                child.material = new MeshBasicMaterial({
                    map: this.resources.videoItems.kots
                });
            }

        })
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    resize() {

    }

    update() {

    }

}