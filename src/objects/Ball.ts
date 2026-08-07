import * as THREE from 'three';
import CANNON from 'cannon';
import { PhysicsWorld } from '../core/PhysicsWorld';
import { PhysicalObject } from './PhysicalObject';

export class Ball extends PhysicalObject {
    public lifetime = 0;

    get velocity(): THREE.Vector3 {
        const { x, y, z } = this.pBody.velocity;
        return new THREE.Vector3(x, y, z);
    }

    constructor(
        public radius: number,
        protected physicsWorld: PhysicsWorld,
    ) {
        super(physicsWorld);
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius),
            new THREE.MeshStandardMaterial({ color: '#ffee00' }),
        );
    }

    public update() {
        this.updatePhysicalBody();
    }

    public initPBody() {
        if (!this.mesh) return;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh, 1);
    }

    public throwTo(targetPoint: THREE.Vector3, params: { flightTime: number } ) {
        const start = this.pBody.position.clone();

        const target = new CANNON.Vec3(
            targetPoint.x,
            targetPoint.y,
            targetPoint.z
        );

        const time = params.flightTime;

        const velocity = target.vsub(start);

        velocity.scale(1 / time, velocity);

        // ignore gravity
        this.pBody.type = CANNON.Body.KINEMATIC;

        this.pBody.velocity.copy(velocity);

        this.pBody.linearDamping = 0;
        this.pBody.angularDamping = 0;
    }
}