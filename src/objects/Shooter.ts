import * as THREE from 'three';
import { duckUrl, GLTFLoaderManager } from '../core/GLTFLoaderManager';
import { Ball } from './Ball';
import type { PhysicsWorld } from '../core/PhysicsWorld';

export class Shooter {
    public group = new THREE.Group();
    private mesh!: THREE.Object3D;

    // private width = 2;
    // private height = 2;
    // private depth = 2;

    private ball?: Ball;
    
    constructor(
        public loaderManager: GLTFLoaderManager,
        public physicsWorld: PhysicsWorld,
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
                    resolve();
                },
                undefined,
                reject
            );
        });
    }

    public update() {
        this.ball?.update();
    }

    public shoot(target: THREE.Vector3) {
        // TODO: track balls, remove in 5 sec ?
        this.ball = new Ball(0.1, this.physicsWorld);
        this.ball.mesh.position.set(0, 2, 0); // set from duck mouth
        this.ball.initPBody();

        this.group.add(this.ball.mesh);

        this.ball.throwTo(target, { flightTime: 1 });
    }
}