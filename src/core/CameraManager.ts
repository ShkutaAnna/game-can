import * as THREE from 'three';

export class CameraManager {
    public camera: THREE.PerspectiveCamera;

    constructor() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    }
}