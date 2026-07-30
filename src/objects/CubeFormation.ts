import * as THREE from 'three';
import { Cube } from './Cude';
import type { PhysicsWorld } from '../core/PhysicsWorld';

export class CubeFormation {
    public group?: THREE.Group;
    public cubes: Cube[] = [];

    public groupSize: { h: number, w: number, d: number } = { h: 0, w: 0, d: 0 };

    constructor(
        public physicsWorld: PhysicsWorld,
        public scene: THREE.Scene,
    ) {}

    public createWallFormation(widthCount: number, heightCount: number, cubeSize: number): THREE.Group {
        if (this.group) {
            this.destroyGroup(this.group, this.scene);
            this.cubes = [];
        }

        this.group = new THREE.Group();

        for (let i = 0; i < widthCount; i++) {
            // + shift from 0,0
            const x = i * cubeSize + cubeSize / 2;
            for (let j = 0; j < heightCount; j++) {
                // + shift from 0,0
                const y = j * cubeSize + cubeSize / 2;
                
                const cube = new Cube(cubeSize, this.physicsWorld);
                this.cubes.push(cube);
                this.group.add(cube.mesh);
                cube.mesh.position.set(x, y, 0);
            }
        }

        this.groupSize = {
            h: heightCount * cubeSize,
            w: widthCount * cubeSize,
            d: cubeSize,
        };

        return this.group;
    }

    // public createPyramidFormation(baseWidthCount: number, baseDepthCount: number, heightCount: number, cubeSize: number): THREE.Group {
    //     const group = new THREE.Group();

    //     return group;
    // }

    public update() {
        this.cubes.forEach((cube) => cube.update());
    }

    private disposeObject(object: THREE.Object3D) {
        object.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;

                mesh.geometry.dispose();

                const materials = Array.isArray(mesh.material)
                    ? mesh.material
                    : [mesh.material];

                materials.forEach((material) => {
                    // dispose textures
                    for (const key in material) {
                        const value = (material as any)[key];
                        if (value && value.isTexture) {
                            value.dispose();
                        }
                    }

                    material.dispose();
                });
            }
        });
    }

    private destroyGroup(group: THREE.Group, scene: THREE.Scene) {
        this.disposeObject(group);
        scene.remove(group);

        group.clear();
    }
}