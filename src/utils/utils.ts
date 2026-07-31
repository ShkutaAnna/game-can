import * as THREE from 'three';
import CANNON from 'cannon';

export function calculateBallisticVelocity(body: CANNON.Body, targetPoint: THREE.Vector3, flightTime: number, gravity: CANNON.Vec3): CANNON.Vec3 {
    // TODO
    console.log(`params - body: ${body}, targetPoint: ${targetPoint}, flightTime: ${flightTime}, gravity: ${gravity}`);
    return new CANNON.Vec3(0, 8.905, -5);
}