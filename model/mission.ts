import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
interface MissionAttributes{
    playerId: number;
    mission_1: Buffer;
    mission_2: Buffer;
    mission_3: Buffer;
    mission_4: Buffer;
    card_1: number;
    card_2: number;
    card_3: number;
    card_4: number;
    active_mission: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
interface MissionInstance extends Model<MissionAttributes>, MissionAttributes {
    getPlayer(): Promise<PlayerInstance>;
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
        mission_1: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        mission_2: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        mission_3: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        mission_4: {
            type: DataTypes.BLOB("medium"),
            allowNull: false,
            defaultValue: Buffer.alloc(1, 0),
        },
        card_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        card_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        card_3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        card_4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        active_mission: {
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
    declare mission_1: Buffer;
    declare mission_2: Buffer;
    declare mission_3: Buffer;
    declare mission_4: Buffer;
    declare card_1: number;
    declare card_2: number;
    declare card_3: number;
    declare card_4: number;
    declare active_mission: number;

    constructor(mission: MissionAttributes) {
        this.playerId = mission.playerId;
        this.mission_1 = mission.mission_1;
        this.mission_2 = mission.mission_2;
        this.mission_3 = mission.mission_3;
        this.mission_4 = mission.mission_4;
        this.card_1 = mission.card_1;
        this.card_2 = mission.card_2;
        this.card_3 = mission.card_3;
        this.card_4 = mission.card_4;
        this.active_mission = mission.active_mission;
    }
}
