import * as THREE from 'three';

export class RendererManager {
    public renderer: THREE.WebGLRenderer;

    constructor() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);
    }
}