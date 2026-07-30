import * as THREE from 'three';
import CANNON from 'cannon';
import { PhysicsWorld } from '../core/PhysicsWorld';

export class Ball {
    public mesh: THREE.Mesh;
    public pBody: CANNON.Body;

    private radius = 0.5;

    constructor(
        private physicsWorld: PhysicsWorld,
    ) {
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius),
            new THREE.MeshStandardMaterial({ color: '#ff00c8' }),
        );

        this.mesh.position.y = 3;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh);
    }

    public update() {
        this.mesh.position.copy(this.pBody.position);
        this.mesh.quaternion.copy(this.pBody.quaternion);
    }
}