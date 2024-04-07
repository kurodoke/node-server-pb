import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

type TypeItem = "DAYS" | "UNITS";

/**
 * base attribute of the model
 */
interface ItemAttributes{
    id: number;
    name: string;
    type: TypeItem;
    title: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface ItemInstance extends Model<ItemAttributes>, ItemAttributes {}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type ItemModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): ItemInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function ItemModel(sequelize: Sequelize): ItemModelStatic{
    return <ItemModelStatic>sequelize.define<ItemInstance>("item", {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
}

/**
 * this is clan object from each instance of item in database
 */
export class Item implements ItemAttributes {
    declare id: number;
    declare name: string;
    declare title: number;
    declare type: TypeItem;

    constructor(item: ItemAttributes) {
        this.type = item.type;
        this.id = item.id;
        this.name = item.name;
        this.type = item.type;
    }
}
