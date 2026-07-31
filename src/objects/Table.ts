import * as THREE from 'three';
import { Materials, PhysicsWorld } from '../core/PhysicsWorld';
import { PhysicalObject } from './PhysicalObject';

export class Table extends PhysicalObject {
    get minX(): number {
        // TODO: calc from mesh if no pbody
        return this.pBody?.position?.x - this.width / 2;
    }

    get maxX(): number {
        return this.pBody?.position?.x + this.width / 2;
    }

    get minZ(): number {
        if (!this.pBody) return NaN;

        return this.pBody?.position?.z - this.height / 2;
    }

    get maxZ(): number {
        if (!this.pBody) return NaN;

        return this.pBody?.position?.z + this.height / 2;
    }

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