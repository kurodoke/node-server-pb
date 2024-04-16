import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
export interface CouponAttributes{
    playerId: number;
    crosshairColor: number;
    chatColor: number;
    falseName: string;
    falseRank: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface CouponInstance extends Model<CouponAttributes>, CouponAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    createPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
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
        crosshairColor:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        chatColor:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        falseName:{
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        falseRank:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 55
        },
    })
}

/**
 * this is clan object from each instance of coupon in database
 */
export class Coupon implements CouponAttributes {
    declare chatColor: number;
    declare crosshairColor: number;
    declare falseName: string;
    declare falseRank: number;
    declare playerId: number;

    constructor(coupon: CouponAttributes) {
        this.chatColor = coupon.chatColor;
        this.crosshairColor = coupon.crosshairColor;
        this.falseName = coupon.falseName;
        this.falseRank = coupon.falseRank;
        this.playerId = coupon.playerId;
    }
}
