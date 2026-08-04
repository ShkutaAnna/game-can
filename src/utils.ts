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