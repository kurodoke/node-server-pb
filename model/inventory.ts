import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BuildOptions, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import { ItemInstance } from './item';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
export interface InventoryAttributes{
    object: bigint;
    playerId: number;
    itemId: number;
    count: number;
    equip: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface InventoryInstance extends Model<InventoryAttributes>, InventoryAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    addPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;

    getItem: BelongsToGetAssociationMixin<ItemInstance>;
    addItem: BelongsToCreateAssociationMixin<ItemInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type InventoryModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): InventoryInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function InventoryModel(sequelize: Sequelize): InventoryModelStatic{
    return <InventoryModelStatic>sequelize.define<InventoryInstance>("inventory", {
        object: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        count:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        equip:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
}

/**
 * this is an object from each instance of player inventory in database
 */
export class Inventory implements InventoryAttributes {
    declare object: bigint;
    declare playerId: number;
    declare count: number;
    declare equip: number;
    declare itemId: number;

    declare slot: number;
    declare effect: number;
    declare couponId: number;
    declare rank: number;
    declare template: number;
    declare starter: boolean;

    public full: boolean = false;

    constructor(object: bigint, count: number, equip: number, itemId: number) {
        this.object = object;
        this.count = count;
        this.equip = equip;
        this.itemId = itemId;
    }
}
