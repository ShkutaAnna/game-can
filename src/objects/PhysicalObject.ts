import * as THREE from 'three';
import type { PhysicsWorld } from "../core/PhysicsWorld";

export class PhysicalObject {
    public mesh!: THREE.Mesh;
    public pBody!: CANNON.Body;

    constructor(
        protected physicsWorld: PhysicsWorld,
    ) { }

    protected updatePhysicalBody() {
        if (this.pBody && this.mesh) {
            if (this.mesh.parent) {
                const worldPos = new THREE.Vector3(
                    this.pBody.position.x,
                    this.pBody.position.y,
                    this.pBody.position.z
                );

                this.mesh.parent.worldToLocal(worldPos);

                this.mesh.position.copy(worldPos);
            } else {
                this.mesh.position.copy(this.pBody.position);
                this.mesh.quaternion.copy(this.pBody.quaternion);
            }
        }
    }
}