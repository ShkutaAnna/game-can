import * as THREE from 'three';

export const angleDiff = (from: number, to: number) => {
    return Math.atan2(
        Math.sin(to - from),
        Math.cos(to - from)
    );
}

// angle between position on circle and OX
export const getPolarAngle = (circlePoint: THREE.Vector3, centerPoint: THREE.Vector3) => {
    return Math.atan2(
        circlePoint.z - centerPoint.z,
        circlePoint.x - centerPoint.x
    );
}

export const destroyGroup = (group: THREE.Group, scene: THREE.Scene) => {
    disposeObject(group);
    scene.remove(group);

    group.clear();
}

export const disposeObject = (object: THREE.Object3D) => {
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