import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
interface EquipmentAttributes{
    playerId: number;
    primary: number;
    secondary: number;
    melee: number;
    grenade: number;
    special: number;
    char_red: number;
    char_blue: number;
    char_head: number;
    char_beret: number;
    dino: number;
};

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
interface EquipmentInstance extends Model<EquipmentAttributes>, EquipmentAttributes {
    getPlayer(): Promise<PlayerInstance>;
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
        char_red: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1001001005
        },
        char_blue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1001002006
        },
        char_head: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1102003001
        },
        char_beret: {
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
 * this is clan object from each instance of (player used)equipment in database
 */
export class Equipment implements EquipmentAttributes {
    declare playerId: number;
    declare primary: number;
    declare secondary: number;
    declare melee: number;
    declare grenade: number;
    declare special: number;
    declare char_red: number;
    declare char_blue: number;
    declare char_head: number;
    declare char_beret: number;
    declare dino: number;

    constructor(equipment: EquipmentAttributes) {
        this.playerId = equipment.playerId;
        this.primary = equipment.primary;
        this.secondary = equipment.secondary;
        this.melee = equipment.melee;
        this.grenade = equipment.grenade;
        this.special = equipment.special;
        this.char_red = equipment.char_red;
        this.char_blue = equipment.char_blue;
        this.char_head = equipment.char_head;
        this.char_beret = equipment.char_beret;
        this.dino = equipment.dino;
    }
}