import * as THREE from 'three';
// import type GUI from 'lil-gui';

import { CubeFormation } from '../objects/CubeFormation';
import { Table } from '../objects/Table';
import { Shooter } from '../objects/Shooter';
import { PhysicsWorld } from './PhysicsWorld';

export class Level {
    public group: THREE.Group;

    private cubeFormation?: CubeFormation;
    private table?: Table;
    private shooter?: Shooter;

    constructor(
        private scene: THREE.Scene,
        private physicsWorld: PhysicsWorld,
        // private gui: GUI,
    ) {
        this.group = new THREE.Group();
    }

    public createLevel() {
        this.cubeFormation = new CubeFormation(this.physicsWorld, this.scene);
        const cubeGroup = this.cubeFormation.createWallFormation(15, 15, 0.5);

        const { w: cubeGroupWidth, d: cubeGroupDepth } = this.cubeFormation.groupSize;
        const tableMargin = 1;

        const tableWidth = cubeGroupWidth + tableMargin;
        const tableHeight = 1;
        const tableDepth = cubeGroupDepth + tableMargin;

        cubeGroup.position.x = -(cubeGroupWidth / 2);
        cubeGroup.position.y = tableHeight;
        
        this.table = new Table(tableWidth, tableHeight, tableDepth, this.physicsWorld);

        // const tablePositionGui = this.gui.addFolder("Table Position");
        // tablePositionGui.add(this.table.mesh.position, "x", -10, 10, 0.5);
        // tablePositionGui.add(this.table.mesh.position, "y", -10, 10, 0.5);
        // tablePositionGui.add(this.table.mesh.position, "z", -10, 10, 0.5);

        this.shooter = new Shooter();
        this.shooter.mesh.position.z = 5;

        const shootableGroup = new THREE.Group();
        shootableGroup.add(cubeGroup, this.table.mesh);
        shootableGroup.position.z = -5;

        this.group.add(shootableGroup, this.shooter.mesh);

        this.scene.updateMatrixWorld(true);

        this.cubeFormation.cubes.forEach((cube) => cube.initPBody());
        this.table.initPBody();
    }

    public update() {
        this.cubeFormation?.update();
        this.table?.update();
    }
}