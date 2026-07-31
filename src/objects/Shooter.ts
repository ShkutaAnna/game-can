import * as THREE from 'three';
import GUI from "lil-gui";
import { duckUrl, GLTFLoaderManager } from '../core/GLTFLoaderManager';
import { Ball } from './Ball';
import type { PhysicsWorld } from '../core/PhysicsWorld';

export class Shooter {
    public group = new THREE.Group();
    private mesh!: THREE.Object3D;

    // private width = 2;
    // private height = 2;
    // private depth = 2;

    public ball?: Ball;

    public existingBalls: Ball[] = [];

    private flightTime = 0.5;
    
    constructor(
        public loaderManager: GLTFLoaderManager,
        public physicsWorld: PhysicsWorld,
        public gui: GUI,
    ) {
        // this.mesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(this.width, this.height, this.depth),
        //     new THREE.MeshStandardMaterial({ color: '#ff9900' }),
        // );
    }

    async load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loaderManager.loader.load(
                duckUrl,
                (data) => {
                    this.mesh = data.scene.children[0].clone();
                    this.group.add(this.mesh);

                    // const ballGui = this.gui.addFolder('Ball');
                    // ballGui.add(this.ball.mesh.position, "x", -10, 10, 0.01);
                    // ballGui.add(this.ball.mesh.position, "y", -10, 10, 0.01);
                    // ballGui.add(this.ball.mesh.position, "z", -10, 10, 0.01);

                    resolve();
                },
                undefined,
                reject
            );
        });
    }

    public update(dt: number) {
        for (let i = this.existingBalls.length - 1; i >= 0; i--) {
            const ball = this.existingBalls[i];

            ball.lifetime += dt;

            if (ball.lifetime > this.flightTime * 3) {
                const removedBall = this.existingBalls.splice(i, 1)[0] ?? null;
                if (removedBall) {
                    removedBall.dispose();
                }
            } else {
                ball.update();
            }
        }
    }

    public shoot(target: THREE.Vector3) {
        this.ball = new Ball(0.1, this.physicsWorld);
        this.group.add(this.ball.mesh);
        // duck mouse considering init rotation
        this.ball.mesh.position.set(0.9, 1.2, -0.2);
        this.ball.initPBody();

        this.ball.throwTo(target, { flightTime: this.flightTime });

        this.existingBalls.push(this.ball);
    }
}