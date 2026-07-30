// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export const duckUrl = `${import.meta.env.BASE_URL}models/Duck/glTF/Duck.gltf`;
export const duckDracoUrl = `${import.meta.env.BASE_URL}models/Duck/glTF-Draco/Duck.gltf`;

export const foxUrl = `${import.meta.env.BASE_URL}models/Fox/glTF/Fox.gltf`;

const darcoUrl = `${import.meta.env.BASE_URL}draco/`;

export class GLTFLoaderManager {
    public loader: GLTFLoader;

    constructor() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(darcoUrl);

        this.loader = new GLTFLoader();
        this.loader.setDRACOLoader(dracoLoader);
    }
}