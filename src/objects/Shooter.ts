import * as THREE from 'three';
import { duckUrl, GLTFLoaderManager } from '../core/GLTFLoaderManager';

export class Shooter {
    public mesh!: THREE.Object3D;

    // private width = 2;
    // private height = 2;
    // private depth = 2;
    
    constructor(
        public loaderManager: GLTFLoaderManager
    ) {
        // this.mesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(this.width, this.height, this.depth),
        //     new THREE.MeshStandardMaterial({ color: '#ff9900' }),
        // );
    }

    async load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loaderManager.loader.load(
                duckUrl,
                (data) => {
                    this.mesh = data.scene.children[0].clone();
                    resolve();
                },
                undefined,
                reject
            );
        });
    }
}