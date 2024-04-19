import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
export interface EquipmentAttributes{
    playerId: number;
    primary: number;
    secondary: number;
    melee: number;
    grenade: number;
    special: number;
    charRed: number;
    charBlue: number;
    charHead: number;
    charBeret: number;
    dino: number;
};

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface EquipmentInstance extends Model<EquipmentAttributes>, EquipmentAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    createPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type EquipmentModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): EquipmentInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function EquipmentModel(sequelize: Sequelize): EquipmentModelStatic{
    return <EquipmentModelStatic>sequelize.define<EquipmentInstance>("equipment",{
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        primary:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        secondary:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 601002003
        },
        melee:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 702001001
        },
        grenade:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 803007001
        },
        special:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 904007002
        },
        charRed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1001001005
        },
        charBlue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1001002006
        },
        charHead: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1102003001
        },
        charBeret: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        dino: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1006003041
        },
    })
}

/**
 * this is an object from each instance of (player used)equipment in database
 */
export class Equipment implements EquipmentAttributes {
    declare playerId: number;
    declare primary: number;
    declare secondary: number;
    declare melee: number;
    declare grenade: number;
    declare special: number;
    declare charRed: number;
    declare charBlue: number;
    declare charHead: number;
    declare charBeret: number;
    declare dino: number;

    constructor(equipment: EquipmentAttributes) {
        this.playerId = equipment.playerId;
        this.primary = equipment.primary;
        this.secondary = equipment.secondary;
        this.melee = equipment.melee;
        this.grenade = equipment.grenade;
        this.special = equipment.special;
        this.charRed = equipment.charRed;
        this.charBlue = equipment.charBlue;
        this.charHead = equipment.charHead;
        this.charBeret = equipment.charBeret;
        this.dino = equipment.dino;
    }
}