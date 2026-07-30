import * as THREE from 'three';
import { foxUrl, GLTFLoaderManager } from '../core/GLTFLoaderManager';

export class Fox {
    public group!: THREE.Group;
    private mixer!: THREE.AnimationMixer;

    constructor(
        public loaderManager: GLTFLoaderManager
    ) { }

    async load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loaderManager.loader.load(
                foxUrl,
                (gltf) => {
                    this.group = gltf.scene;
                    this.group.scale.setScalar(0.025);

                    this.mixer = new THREE.AnimationMixer(gltf.scene);
                    const action = this.mixer.clipAction(gltf.animations[0]);
                    action.play();
                    
                    resolve();
                },
                undefined,
                reject
            );
        });
    }

    public update(dt: number) {
        this.mixer?.update(dt);
    }
}