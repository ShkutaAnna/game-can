import { WallFormationBuilder } from "../../objects/formationBuilders/WallFormation";
import type { LevelConfig } from "./LevelConfig";


export const Levels: LevelConfig[] = [
    {
        formationBuilder: new WallFormationBuilder(
            1,
            1,
            0.5
        ),
    },
    {
        formationBuilder: new WallFormationBuilder(
            2,
            2,
            0.5
        ),
    },
    {
        formationBuilder: new WallFormationBuilder(
            3,
            5,
            0.5
        ),
    },
    {
        formationBuilder: new WallFormationBuilder(
            6,
            6,
            0.5
        ),
    }
];