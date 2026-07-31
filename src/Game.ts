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
import { Fox } from './objects/Fox';
import { InputManager } from './core/InputManager';

export class Game {
    private rendererManager = new RendererManager();
    private sceneManager = new SceneManager();
    private cameraManager = new CameraManager();
    private loaderManager = new GLTFLoaderManager();
    private inputManager = new InputManager();
    private raycaster = new THREE.Raycaster();

    private physicsWorld = new PhysicsWorld();

    private orbitControls: OrbitControls;

    private clock = new THREE.Clock();

    private field: Field;
    private level: Level;
    private fox?: Fox;

    private gui = new GUI();

    constructor() {
        this.gui.hide();

        new LightManager(this.sceneManager.scene);

        this.inputManager.onPoinerDown(this.handleClick.bind(this));
        this.inputManager.onResize(this.handleResize.bind(this));

        this.orbitControls = new OrbitControls(this.cameraManager.camera, this.rendererManager.renderer.domElement);
        this.orbitControls.enabled = false;
        this.cameraManager.camera.position.set(0, 3.5, 9.5);
        this.cameraManager.camera.rotateX(-Math.PI / 27);

        this.field = new Field(this.physicsWorld);
        this.sceneManager.scene.add(this.field.mesh);

        this.level = new Level(this.sceneManager.scene, this.physicsWorld, this.loaderManager, this.gui);
        this.level.createLevel();

        this.sceneManager.scene.add(this.level.group);

        const cameraGui = this.gui.addFolder('Camera');
        cameraGui.add(this.cameraManager.camera.position, "x", -40, 40, 0.5);
        cameraGui.add(this.cameraManager.camera.position, "y", -40, 40, 0.5);
        cameraGui.add(this.cameraManager.camera.position, "z", -40, 40, 0.5);

        cameraGui.add(this.cameraManager.camera.rotation, 'x', -Math.PI, Math.PI, 0.001);
        cameraGui.add(this.cameraManager.camera.rotation, 'y', -Math.PI, Math.PI, 0.001);
        cameraGui.add(this.cameraManager.camera.rotation, 'z', -Math.PI, Math.PI, 0.001);

        // const helper = new THREE.DirectionalLightHelper(this.lightManager.directionalLight);
        // this.sceneManager.scene.add(helper);

        const ax = new THREE.AxesHelper();
        this.sceneManager.scene.add(ax);

        this.addDecorations();

        this.animate();
    }

    public async addDecorations() {
        this.fox = new Fox(this.loaderManager);
        await this.fox.load();

        // const foxGroupCopy = SkeletonUtils.clone(fox.group);

        this.fox.group.rotation.y = Math.PI / 1.5;
        this.fox.group.position.x = -3.5;
        this.fox.group.position.z = 3.5;

        // foxGroupCopy.rotation.y = -Math.PI / 4;
        // foxGroupCopy.position.x = 3.5;
        // foxGroupCopy.position.z = 1.5;

        this.sceneManager.scene.add(this.fox.group)

        // gui
        const foxGui = this.gui.addFolder('fox 1');
        foxGui.add(this.fox.group.position, "x", -40, 40, 0.5);
        foxGui.add(this.fox.group.position, "y", -40, 40, 0.5);
        foxGui.add(this.fox.group.position, "z", -40, 40, 0.5);

        foxGui.add(this.fox.group.rotation, 'y', -Math.PI, Math.PI, 0.0001);

        // const foxCopyGui = this.gui.addFolder('fox 2');
        // foxCopyGui.add(foxGroupCopy.position, "x", -40, 40, 0.5);
        // foxCopyGui.add(foxGroupCopy.position, "y", -40, 40, 0.5);
        // foxCopyGui.add(foxGroupCopy.position, "z", -40, 40, 0.5);

        // foxCopyGui.add(foxGroupCopy.rotation, 'y', -Math.PI, Math.PI, 0.0001);
    }

    public handleClick(event: PointerEvent) {
        if (!this.level.collisionWall) return;

        const { x, y } = event;

        // const width = document.documentElement.clientWidth;
        // const height = document.documentElement.clientHeight;

        const rect = this.rendererManager.renderer.domElement.getBoundingClientRect();

        const mouse = new THREE.Vector2(0, 0);

        mouse.x = ((x - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((y - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(mouse, this.cameraManager.camera);
        
        const hit = this.raycaster.intersectObject(this.level.collisionWall, false);

        if (!hit[0]) return;

        const { point } = hit[0];
        this.level.shoot(point);
    }

    public handleResize() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        this.rendererManager.renderer.setSize(width, height);
        this.cameraManager.camera.aspect = width / height;
        this.cameraManager.camera.updateProjectionMatrix();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        const dt = this.clock.getDelta();

        this.physicsWorld.world.step(1/60, dt, 3);

        this.field.update();
        this.level.update(dt);
        this.fox?.update(dt);

        if (this.orbitControls.enabled) {
            this.orbitControls.update();
        }

        this.rendererManager.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
    }

    // private drawRaycasterLine() {
        // const origin = this.raycaster.ray.origin;
        // const direction = this.raycaster.ray.direction;

        // const points = [
        //     origin,
        //     origin.clone().add(direction.clone().multiplyScalar(100))
        // ];

        // const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // const material = new THREE.LineBasicMaterial({
        //     color: 0xff0000
        // });

        // const line = new THREE.Line(geometry, material);

        // this.sceneManager.scene.add(line);
    // }
}