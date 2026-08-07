import * as THREE from 'three';
import type { CubeFormation } from "../CubeFormation";

export interface FormationBuilder {
    build(cubeFormation: CubeFormation): THREE.Group;
}