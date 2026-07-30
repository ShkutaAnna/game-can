// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const duckUrl = `${import.meta.env.BASE_URL}models/Duck/glTF/Duck.gltf`;

export class GLTFLoaderManager {
    public loader: GLTFLoader;

    constructor(/*scene: THREE.Scene*/) {
        this.loader = new GLTFLoader();
        this.loader.load(duckUrl,
            () => { // data: GLTF
                // console.log(data);
                // scene.add(data.scene.children[0].clone());
                // scene.add(data.scene);
            },
        );
    }
}