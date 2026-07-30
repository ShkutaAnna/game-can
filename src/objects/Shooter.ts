import * as THREE from 'three';

export class Shooter {
    public mesh: THREE.Mesh;

    private width = 2;
    private height = 2;
    private depth = 2;
    
    constructor() {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.depth),
            new THREE.MeshStandardMaterial({ color: '#ff9900' }),
        );
    }

    // update() {
        
    // }
}