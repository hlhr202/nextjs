import * as BABYLON from "babylonjs";

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

        // Fountain object
        const fountain = BABYLON.Mesh.CreateBox("foutain", 1.0, this.scene);
        fountain.visibility = 0

        // Ground
        const ground = BABYLON.Mesh.CreatePlane("ground", 50.0, this.scene);
        ground.position = new BABYLON.Vector3(0, -10, 0);
        ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

        ground.material = new BABYLON.StandardMaterial("groundMat", this.scene);
        ground.material.backFaceCulling = false;
        (ground.material as any).diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);

        // Create a particle system
        const particleSystem = new BABYLON.ParticleSystem("particles", 5000, this.scene);

        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture("/static/textures/flare.png", this.scene);

        // Where the particles come from
        particleSystem.emitter = fountain; // the starting object, the emitter
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, -1, -1); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        particleSystem.minSize = 0.05;
        particleSystem.maxSize = 0.2;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.1;
        particleSystem.maxLifeTime = 3.0;

        // Emission rate
        particleSystem.emitRate = 3000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 10;
        particleSystem.updateSpeed = 0.0008;

        // Start the particle system
        particleSystem.start();

        this.engin.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

export default Engine;
