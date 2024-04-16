import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
interface PlayerStatAttributes{
    playerId: number;
    match: number;
    matchWons: number;
    matchLosts: number;
    killsCount: number;
    deathsCount: number;
    escapes: number;
    matchDraws: number;
    headShotsCount: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface PlayerStatInstance extends Model<PlayerStatAttributes>, PlayerStatAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    createPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type PlayerStatModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): PlayerStatInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function PlayerStatModel(sequelize: Sequelize): PlayerStatModelStatic{
    return <PlayerStatModelStatic>sequelize.define<PlayerStatInstance>("player_stat",{
        playerId:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        match:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        matchWons:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        matchLosts:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        killsCount:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        deathsCount:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        escapes:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        matchDraws:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        headShotsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    })
}

/**
 * this is clan object from each instance of player stat in database
 */
export class PlayerStat implements PlayerStatAttributes {
    declare playerId: number;
    declare match: number;
    declare matchWons: number;
    declare matchLosts: number;
    declare killsCount: number;
    declare deathsCount: number;
    declare escapes: number;
    declare matchDraws: number;
    declare headShotsCount: number;

    constructor(playerStat: PlayerStatAttributes) {
        this.playerId = playerStat.playerId;
        this.match = playerStat.match;
        this.matchWons = playerStat.matchWons;
        this.matchLosts = playerStat.matchLosts;
        this.killsCount = playerStat.killsCount;
        this.deathsCount = playerStat.deathsCount;
        this.escapes = playerStat.escapes;
        this.matchDraws = playerStat.matchDraws;
        this.headShotsCount = playerStat.headShotsCount;
    }
}
