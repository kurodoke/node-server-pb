import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
export interface MissionAttributes{
    playerId: number;
    mission1: Buffer;
    mission2: Buffer;
    mission3: Buffer;
    mission4: Buffer;
    card1: number;
    card2: number;
    card3: number;
    card4: number;
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
        mission1: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        mission2: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        mission3: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        mission4: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        card1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        card2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        card3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        card4: {
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
 * this is clan object from each instance of (player)mission in database
 */
export class Mission implements MissionAttributes {
    declare playerId: number;
    declare mission1: Buffer;
    declare mission2: Buffer;
    declare mission3: Buffer;
    declare mission4: Buffer;
    declare card1: number;
    declare card2: number;
    declare card3: number;
    declare card4: number;
    declare activeMission: number;

    constructor(mission: MissionAttributes) {
        this.playerId = mission.playerId;
        this.mission1 = mission.mission1;
        this.mission2 = mission.mission2;
        this.mission3 = mission.mission3;
        this.mission4 = mission.mission4;
        this.card1 = mission.card1;
        this.card2 = mission.card2;
        this.card3 = mission.card3;
        this.card4 = mission.card4;
        this.activeMission = mission.activeMission;
    }
}
