import * as THREE from 'three';
import type GUI from 'lil-gui';

import { CubeFormation } from '../objects/CubeFormation';
import { Table } from '../objects/Table';
import { Shooter } from '../objects/Shooter';
import { PhysicsWorld } from './PhysicsWorld';
import { GLTFLoaderManager } from './GLTFLoaderManager';

export class Level {
    public group: THREE.Group;

    public collisionWall?: THREE.Mesh;

    private cubeFormation?: CubeFormation;
    private table?: Table;
    private shooter?: Shooter;

    constructor(
        private scene: THREE.Scene,
        private physicsWorld: PhysicsWorld,
        private loaderManager: GLTFLoaderManager,
        private gui: GUI,
    ) {
        this.group = new THREE.Group();
    }

    public async createLevel() {
        // ADD LOADING SCREEN
        this.cubeFormation = new CubeFormation(this.physicsWorld, this.scene);
        const cubeGroup = this.cubeFormation.createWallFormation(7, 7, 0.5);
        this.collisionWall = this.cubeFormation.collisionWall;

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

        this.shooter = new Shooter(this.loaderManager, this.physicsWorld, this.gui);
        await this.shooter.load();
        this.shooter.group.position.z = 5;
        this.shooter.group.rotateY(Math.PI / 2);

        const shootableGroup = new THREE.Group();
        shootableGroup.add(cubeGroup, this.table.mesh);
        shootableGroup.position.z = -5;

        this.group.add(shootableGroup, this.shooter.group);

        this.scene.updateMatrixWorld(true);

        this.cubeFormation.cubes.forEach((cube) => cube.initPBody());
        this.table.initPBody();
    }

    public update(dt: number) {
        this.cubeFormation?.update();
        this.table?.update();
        this.shooter?.update(dt);

        if (this.allCubesFallen()) {
            // WIN
            // let Game now that level is finished
        }
    }

    public shoot(targetPoint: THREE.Vector3) {
        if (!this.shooter) return;

        this.shooter.shoot(targetPoint);
    }
    
    public allCubesFallen(): boolean {
        if (!this.cubeFormation || !this.table) return false;

        const tMinX = this.table.minX;
        const tMaxX = this.table.maxX;
        const tMinZ = this.table.minZ;
        const tMaxZ = this.table.maxZ;

        const tableHasCubes = this.cubeFormation.cubes.some((cube) => {
            const pos = cube.pBody?.position;
            if (!pos) return true;

            const halfSize = cube.size / 2;

            const isCubeOutOfTableRect = (
                pos.x + halfSize < tMinX ||
                pos.x - halfSize > tMaxX ||
                pos.z + halfSize < tMinZ ||
                pos.z - halfSize > tMaxZ
            );
            return !isCubeOutOfTableRect;
        });

        return !tableHasCubes;
    }
}