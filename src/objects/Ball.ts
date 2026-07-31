import * as THREE from 'three';
// import CANNON from 'cannon';
import { PhysicsWorld } from '../core/PhysicsWorld';
import { PhysicalObject } from './PhysicalObject';
import { calculateBallisticVelocity } from '../utils/utils';

export class Ball extends PhysicalObject {
    constructor(
        public radius: number,
        protected physicsWorld: PhysicsWorld,
    ) {
        super(physicsWorld);
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius),
            new THREE.MeshStandardMaterial({ color: '#ffee00' }),
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

    public throwTo(targetPoint: THREE.Vector3, params: { flightTime: number } ) {
        const velocity = calculateBallisticVelocity(this.pBody, targetPoint, params.flightTime, this.physicsWorld.world.gravity);
        this.pBody.velocity.copy(velocity);
    }
}