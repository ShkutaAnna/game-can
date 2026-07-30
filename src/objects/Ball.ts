import * as THREE from 'three';
// import CANNON from 'cannon';
import { PhysicsWorld } from '../core/PhysicsWorld';
import { PhysicalObject } from './PhysicalObject';

export class Ball extends PhysicalObject {
    constructor(
        public radius: number,
        protected physicsWorld: PhysicsWorld,
    ) {
        super(physicsWorld);
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius),
            new THREE.MeshStandardMaterial({ color: '#ff00c8' }),
        );

        this.mesh.position.y = 3;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh);
    }

    public update() {
        this.updatePhysicalBody();
    }

    public initPBody() {
        if (!this.mesh) return;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh, 1);
    }
}