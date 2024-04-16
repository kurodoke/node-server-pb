import {
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BuildOptions,
    DataTypes,
    Model,
    Sequelize,
} from "sequelize";
import { ItemInstance } from "./item";

/**
 * base attribute of the model
 */
interface StoreAttributes {
    itemId: number;
    name: string;
    point: number;
    cash: number;
    count: number;
    tag: string;
    type: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface StoreInstance extends Model<StoreAttributes>, StoreAttributes {
    getItem: BelongsToGetAssociationMixin<ItemInstance>;
    createItem: BelongsToCreateAssociationMixin<ItemInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type StoreModelStatic = typeof Model & {
    new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ): StoreInstance;
};

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function StoreModel(sequelize: Sequelize): StoreModelStatic {
    return <StoreModelStatic>sequelize.define<StoreInstance>("store", {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cash: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
}

/**
 * this is clan object from each instance of store in database
 */
export class Store implements StoreAttributes {
    declare cash: number;
    declare count: number;
    declare itemId: number;
    declare name: string;
    declare point: number;
    declare tag: string;
    declare type: number;

    constructor(store: StoreAttributes) {
        this.cash = store.cash;
        this.count = store.count;
        this.itemId = store.itemId;
        this.name = store.name;
        this.point = store.point;
        this.tag = store.tag;
        this.type = store.type;
    }
}
