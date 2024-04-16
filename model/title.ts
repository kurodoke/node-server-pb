import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
export interface TitleAttributes {
    playerId: number;
    title_1: number;
    title_2: number;
    title_3: number;
    title_4: number;
    title_5: number;
    title_6: number;
    title_7: number;
    title_8: number;
    title_9: number;
    title_10: number;
    title_11: number;
    title_12: number;
    title_13: number;
    title_14: number;
    title_15: number;
    title_16: number;
    title_17: number;
    title_18: number;
    title_19: number;
    title_20: number;
    title_21: number;
    title_22: number;
    title_23: number;
    title_24: number;
    title_25: number;
    title_26: number;
    title_27: number;
    title_28: number;
    title_29: number;
    title_30: number;
    title_31: number;
    title_32: number;
    title_33: number;
    title_34: number;
    title_35: number;
    title_36: number;
    title_37: number;
    title_38: number;
    title_39: number;
    title_40: number;
    title_41: number;
    title_42: number;
    title_43: number;
    title_44: number;
    slot: number;
    equip_title_1: number;
    equip_title_2: number;
    equip_title_3: number;
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
        title_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_5: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_6: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_7: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_8: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_9: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_10: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_11: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_12: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_13: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_14: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_15: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_16: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_17: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_18: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_19: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_20: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_21: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_22: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_23: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_24: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_25: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_26: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_27: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_28: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_29: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_30: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_31: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_32: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_33: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_34: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_35: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_36: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_37: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_38: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_39: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_40: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_41: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_42: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_43: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title_44: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        slot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        equip_title_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        equip_title_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        equip_title_3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });
}

/**
 * this is clan object from each instance of player title in database
 */
export class Title implements TitleAttributes {
    declare playerId: number;
    declare title_1: number;
    declare title_2: number;
    declare title_3: number;
    declare title_4: number;
    declare title_5: number;
    declare title_6: number;
    declare title_7: number;
    declare title_8: number;
    declare title_9: number;
    declare title_10: number;
    declare title_11: number;
    declare title_12: number;
    declare title_13: number;
    declare title_14: number;
    declare title_15: number;
    declare title_16: number;
    declare title_17: number;
    declare title_18: number;
    declare title_19: number;
    declare title_20: number;
    declare title_21: number;
    declare title_22: number;
    declare title_23: number;
    declare title_24: number;
    declare title_25: number;
    declare title_26: number;
    declare title_27: number;
    declare title_28: number;
    declare title_29: number;
    declare title_30: number;
    declare title_31: number;
    declare title_32: number;
    declare title_33: number;
    declare title_34: number;
    declare title_35: number;
    declare title_36: number;
    declare title_37: number;
    declare title_38: number;
    declare title_39: number;
    declare title_40: number;
    declare title_41: number;
    declare title_42: number;
    declare title_43: number;
    declare title_44: number;
    declare slot: number;
    declare equip_title_1: number;
    declare equip_title_2: number;
    declare equip_title_3: number;

    constructor(title: TitleAttributes) {
        this.playerId = title.playerId;
        this.title_1 = title.title_1;
        this.title_2 = title.title_2;
        this.title_3 = title.title_3;
        this.title_4 = title.title_4;
        this.title_5 = title.title_5;
        this.title_6 = title.title_6;
        this.title_7 = title.title_7;
        this.title_8 = title.title_8;
        this.title_9 = title.title_9;
        this.title_10 = title.title_10;
        this.title_11 = title.title_11;
        this.title_12 = title.title_12;
        this.title_13 = title.title_13;
        this.title_14 = title.title_14;
        this.title_15 = title.title_15;
        this.title_16 = title.title_16;
        this.title_17 = title.title_17;
        this.title_18 = title.title_18;
        this.title_19 = title.title_19;
        this.title_20 = title.title_20;
        this.title_21 = title.title_21;
        this.title_22 = title.title_22;
        this.title_23 = title.title_23;
        this.title_24 = title.title_24;
        this.title_25 = title.title_25;
        this.title_26 = title.title_26;
        this.title_27 = title.title_27;
        this.title_28 = title.title_28;
        this.title_29 = title.title_29;
        this.title_30 = title.title_30;
        this.title_31 = title.title_31;
        this.title_32 = title.title_32;
        this.title_33 = title.title_33;
        this.title_34 = title.title_34;
        this.title_35 = title.title_35;
        this.title_36 = title.title_36;
        this.title_37 = title.title_37;
        this.title_38 = title.title_38;
        this.title_39 = title.title_39;
        this.title_40 = title.title_40;
        this.title_41 = title.title_41;
        this.title_42 = title.title_42;
        this.title_43 = title.title_43;
        this.title_44 = title.title_44;
        this.slot = title.slot;
        this.equip_title_1 = title.equip_title_1;
        this.equip_title_2 = title.equip_title_2;
        this.equip_title_3 = title.equip_title_3;
    }
}

