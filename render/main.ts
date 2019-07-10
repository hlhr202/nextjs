import * as BABYLON from "babylonjs";
import { Particle } from "./particle";

class Engine {
    engin!: BABYLON.Engine;
    scene!: BABYLON.Scene;
    camera!: BABYLON.ArcRotateCamera;

    constructor(private canvas: HTMLCanvasElement) {
        this.engin = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.scene = new BABYLON.Scene(this.engin);
        this.camera = new BABYLON.ArcRotateCamera(
            "ArcRotateCamera",
            1,
            0.8,
            20,
            new BABYLON.Vector3(0, 0, 0),
            this.scene,
        );
    }

    init() {
        // Setup environment
        const light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), this.scene);
        this.camera.attachControl(this.canvas, true);
        const particle = new Particle(this.scene);

        particle.init();

        this.engin.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

export default Engine;
