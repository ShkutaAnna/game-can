import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from "lil-gui";

import { RendererManager } from './core/RendererManager';
import { SceneManager } from './core/SceneManager';
import { CameraManager } from './core/CameraManager';
import { Field } from './objects/Field';
import { LightManager } from './core/LightManager';
import { PhysicsWorld } from './core/PhysicsWorld';
import { GLTFLoaderManager } from './core/GLTFLoaderManager';
import { Level } from './core/Level';

export class Game {
    private rendererManager = new RendererManager();
    private sceneManager = new SceneManager();
    private camaraManager = new CameraManager();
    private loaderManager = new GLTFLoaderManager();

    private physicsWorld = new PhysicsWorld();

    private orbitControls: OrbitControls;

    private clock = new THREE.Clock();

    private field: Field;
    private level: Level;

    private gui = new GUI();

    constructor() {
        this.gui.hide();

        new LightManager(this.sceneManager.scene);

        this.orbitControls = new OrbitControls(this.camaraManager.camera, this.rendererManager.renderer.domElement);
        this.orbitControls.enabled = false;
        this.camaraManager.camera.position.set(0, 3.5, 9.5);
        this.camaraManager.camera.rotateX(-Math.PI / 27);

        this.field = new Field(this.physicsWorld);
        this.sceneManager.scene.add(this.field.mesh);

        this.level = new Level(this.sceneManager.scene, this.physicsWorld, this.loaderManager);
        this.level.createLevel();

        this.sceneManager.scene.add(this.level.group);

        const cameraGui = this.gui.addFolder('Camera');
        cameraGui.add(this.camaraManager.camera.position, "x", -40, 40, 0.5);
        cameraGui.add(this.camaraManager.camera.position, "y", -40, 40, 0.5);
        cameraGui.add(this.camaraManager.camera.position, "z", -40, 40, 0.5);

        cameraGui.add(this.camaraManager.camera.rotation, 'x', -Math.PI, Math.PI, 0.001);
        cameraGui.add(this.camaraManager.camera.rotation, 'y', -Math.PI, Math.PI, 0.001);
        cameraGui.add(this.camaraManager.camera.rotation, 'z', -Math.PI, Math.PI, 0.001);

        // const helper = new THREE.DirectionalLightHelper(this.lightManager.directionalLight);
        // this.sceneManager.scene.add(helper);

        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        const dt = this.clock.getDelta();

        this.physicsWorld.world.step(1/60, dt, 3);

        this.field.update();
        this.level.update();

        if (this.orbitControls.enabled) {
            this.orbitControls.update();
        }

        this.rendererManager.renderer.render(this.sceneManager.scene, this.camaraManager.camera);
    }
}