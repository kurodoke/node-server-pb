import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
export interface MissionAttributes{
    playerId: number;
    listMissionFlags1: Buffer;
    listMissionFlags2: Buffer;
    listMissionFlags3: Buffer;
    listMissionFlags4: Buffer;
    activeCardIndex1: number;
    activeCardIndex2: number;
    activeCardIndex3: number;
    activeCardIndex4: number;
    activeMission: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface MissionInstance extends Model<MissionAttributes>, MissionAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    createPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type MissionModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): MissionInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function MissionModel(sequelize: Sequelize) : MissionModelStatic{
    return <MissionModelStatic>sequelize.define<MissionInstance>("mission", {
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        listMissionFlags1: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(40, 0),
        },
        listMissionFlags2: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(40, 0),
        },
        listMissionFlags3: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(40, 0),
        },
        listMissionFlags4: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(40, 0),
        },
        activeCardIndex1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        activeCardIndex2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        activeCardIndex3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        activeCardIndex4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        activeMission: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    });
}

/**
 * this is an object from each instance of (player)mission in database
 */
export class Mission implements MissionAttributes {
    declare playerId: number;
    declare listMissionFlags1: Buffer;
    declare listMissionFlags2: Buffer;
    declare listMissionFlags3: Buffer;
    declare listMissionFlags4: Buffer;
    declare activeCardIndex1: number;
    declare activeCardIndex2: number;
    declare activeCardIndex3: number;
    declare activeCardIndex4: number;
    declare activeMission: number;

    constructor(mission: MissionAttributes) {
        this.playerId = mission.playerId;
        this.listMissionFlags1 = mission.listMissionFlags1;
        this.listMissionFlags2 = mission.listMissionFlags2;
        this.listMissionFlags3 = mission.listMissionFlags3;
        this.listMissionFlags4 = mission.listMissionFlags4;
        this.activeCardIndex1 = mission.activeCardIndex1;
        this.activeCardIndex2 = mission.activeCardIndex2;
        this.activeCardIndex3 = mission.activeCardIndex3;
        this.activeCardIndex4 = mission.activeCardIndex4;
        this.activeMission = mission.activeMission;
    }
}
