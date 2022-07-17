import { Experience } from './Experience'
import { PerspectiveCamera, OrthographicCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Camera {

    /**@type {Experience} */
    experience;
    sizes;
    scene;
    canvas;

    /**@type {PerspectiveCamera} */
    perspectiveCamera
    
    /**@type {OrthographicCamera} */
    orthographicCamera;

    /**@type {number} */
    frustrum

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            100 
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 5;
    }
    
    createOrthographicCamera() {
        this.frustrum = 5;
        this.orthographicCamera = new OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2
            -100,
            100
        );
        this.scene.add(this.perspectiveCamera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;

    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2; 
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }

}