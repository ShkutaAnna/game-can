import type { CubeFormation } from "../CubeFormation";
import type { FormationBuilder } from "./FormationBuilder";

export class WallFormationBuilder implements FormationBuilder {
    constructor(
        private rows: number,
        private cols: number,
        private cubeSize: number
    ) {}

    build(cf: CubeFormation) {
        return cf.createWallFormation(
            this.rows,
            this.cols,
            this.cubeSize
        );
    }
}