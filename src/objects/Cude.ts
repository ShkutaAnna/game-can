import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Materials, PhysicsWorld } from '../core/PhysicsWorld';
import { PhysicalObject } from './PhysicalObject';

export class Cube extends PhysicalObject {
    constructor(
        public size: number,
        protected physicsWorld: PhysicsWorld,
    ) {
        super(physicsWorld);

        this.mesh = new THREE.Mesh(
            new RoundedBoxGeometry(this.size, this.size, this.size),
            // new THREE.BoxGeometry(this.size, this.size, this.size),
            new THREE.MeshStandardMaterial({ color: '#ff00c8' }),
        );

        this.mesh.castShadow = true;   
    }

    update() {
        this.updatePhysicalBody();
    }

    public initPBody() {
        if (!this.mesh) return;

        this.pBody = this.physicsWorld.createPhysicalBody(this.mesh, 1, Materials.cube);
    }
}