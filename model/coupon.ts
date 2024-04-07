import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
interface CouponAttributes{
    playerId: number;
    crosshair_color: number;
    chat_color: number;
    false_name: string;
    false_rank: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface CouponInstance extends Model<CouponAttributes>, CouponAttributes {
    getPlayer(): PlayerInstance;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type CouponModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): CouponInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function CouponModel(sequelize: Sequelize): CouponModelStatic{
    return <CouponModelStatic>sequelize.define<CouponInstance>("coupon", {
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        crosshair_color:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        chat_color:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        false_name:{
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        false_rank:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
}

/**
 * this is clan object from each instance of coupon in database
 */
export class Coupon implements CouponAttributes {
    declare chat_color: number;
    declare crosshair_color: number;
    declare false_name: string;
    declare false_rank: number;
    declare playerId: number;

    constructor(coupon: CouponAttributes) {
        this.chat_color = coupon.chat_color;
        this.crosshair_color = coupon.crosshair_color;
        this.false_name = coupon.false_name;
        this.false_rank = coupon.false_rank;
        this.playerId = coupon.playerId;
    }
}
