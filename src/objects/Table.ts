import * as THREE from 'three';
import { Materials, PhysicsWorld } from '../core/PhysicsWorld';
import { PhysicalObject } from './PhysicalObject';

export class Table extends PhysicalObject {    
    constructor(
        private width: number,
        private height: number,
        private depth: number,
        protected physicsWorld: PhysicsWorld,
    ) {
        super(physicsWorld);

        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.depth),
            new THREE.MeshStandardMaterial({ color: '#49371c' }),
        );

        this.mesh.position.y = this.height / 2;
    }

    update() {
        this.updatePhysicalBody();
    }

    public initPBody() {
        if (!this.mesh) return;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh, 0, Materials.table);
    }
}