import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { ItemInstance } from './item';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
interface InventoryAttributes{
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
    // getPlayer: BelongsToManyGetAssociationsMixin<PlayerInstance>;
    // addPlayer: BelongsToManyAddAssociationMixin<PlayerInstance, number>;
    // addPlayers: BelongsToManyAddAssociationsMixin<PlayerInstance, number>;

    // getItem: BelongsToManyGetAssociationsMixin<ItemInstance>;
    // addItem: BelongsToManyAddAssociationMixin<ItemInstance, number>;
    // addItems: BelongsToManyAddAssociationsMixin<ItemInstance, number>;
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
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
            }
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
            references: {
                model: 'item',
                key: 'itemId',
            }
        }
    })
}

/**
 * this is clan object from each instance of player inventory in database
 */
export class Inventory implements InventoryAttributes {
    declare playerId: number;
    declare count: number;
    declare equip: number;
    declare itemId: number;

    constructor(inventory: InventoryAttributes) {
        this.playerId = inventory.playerId;
        this.count = inventory.count;
        this.equip = inventory.equip;
        this.itemId = inventory.itemId;
    }
}
