import * as THREE from 'three';

export class LightManager {
    public ambientLight: THREE.AmbientLight;
    public directionalLight: THREE.DirectionalLight;

    constructor(public scene: THREE.Scene) {
        this.ambientLight = new THREE.AmbientLight();

        this.directionalLight = new THREE.DirectionalLight();
        this.directionalLight.position.x = 10;
        this.directionalLight.position.y = 10;
        this.directionalLight.intensity = 3;

        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight);
    }
}