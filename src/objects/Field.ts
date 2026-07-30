import * as THREE from 'three';
import CANNON from 'cannon';
import { Materials, type PhysicsWorld } from '../core/PhysicsWorld';

export class Field {
    public mesh: THREE.Mesh;
    public pBody: CANNON.Body;

    constructor(
        private physicsWorld: PhysicsWorld,
    ) {
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 40),
            new THREE.MeshBasicMaterial({ color: '#257529' }),
        );

        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.receiveShadow = true;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh, 0, Materials.table);
    }

    public update() {
        this.mesh.position.copy(this.pBody.position);
        this.mesh.quaternion.copy(this.pBody.quaternion);
    }
}