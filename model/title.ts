import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
export interface TitleAttributes {
    playerId: number;
    title: Buffer
    slot: number;
    equipTitle1: number;
    equipTitle2: number;
    equipTitle3: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface TitleInstance extends Model<TitleAttributes>, TitleAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    createPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type TitleModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): TitleInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function TitleModel(sequelize: Sequelize): TitleModelStatic {
    return <TitleModelStatic>sequelize.define<TitleInstance>("title", {
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.BLOB,
            allowNull: false,
            defaultValue: Buffer.alloc(44, 0).writeInt8(1, 0),
        },
        slot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        equipTitle1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        equipTitle2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        equipTitle3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });
}

/**
 * this is an object from each instance of player title in database
 */
export class Title implements TitleAttributes {
    declare playerId: number;
    declare title: Buffer;
    declare slot: number;
    declare equipTitle1: number;
    declare equipTitle2: number;
    declare equipTitle3: number;

    public pos1: number = 0;
    public pos2: number = 0;
    public pos3: number = 0;
    public pos4: number = 0;
    public pos5: number = 0;
    public pos6: number = 0;
    public pos7: number = 0;
    public pos8: number = 0;

    constructor(title: TitleAttributes) {
        this.playerId = title.playerId;
        this.title = title.title;
        this.slot = title.slot;
        this.equipTitle1 = title.equipTitle1;
        this.equipTitle2 = title.equipTitle2;
        this.equipTitle3 = title.equipTitle3;
    }
}

