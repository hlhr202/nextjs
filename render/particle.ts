import * as BABYLON from "babylonjs";

export class Particle {
    public particleSystem: BABYLON.ParticleSystem;
    public fountain: BABYLON.Mesh;
    constructor(private scene: BABYLON.Scene) {
        this.particleSystem = new BABYLON.ParticleSystem("particles", 5000, this.scene);
        this.fountain = BABYLON.Mesh.CreateBox("foutain", 1.0, this.scene);
    }
    init() {
        this.fountain.visibility = 0;
        //Texture of each particle
        this.particleSystem.particleTexture = new BABYLON.Texture("/static/textures/flare.png", this.scene);

        // Where the particles come from
        this.particleSystem.emitter = this.fountain; // the starting object, the emitter
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, -1, -1); // Starting all from
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

        // Colors of all particles
        this.particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        this.particleSystem.minSize = 0.05;
        this.particleSystem.maxSize = 0.2;

        // Life time of each particle (random between...
        this.particleSystem.minLifeTime = 0.1;
        this.particleSystem.maxLifeTime = 3.0;

        // Emission rate
        this.particleSystem.emitRate = 3000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

        // Direction of each particle after it has been emitted
        this.particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        this.particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

        // Angular speed, in radians
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 10;
        this.particleSystem.updateSpeed = 0.0008;

        // Start the particle system
        this.particleSystem.start();
    }
}
