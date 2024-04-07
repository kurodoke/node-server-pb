import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { PlayerInstance } from './player';

/**
 * base attribute of the model
 */
interface PlayerStatAttributes{
    playerId: number;
    match: number;
    match_wons: number;
    match_losts: number;
    kills_count: number;
    deaths_count: number;
    escapes: number;
    draws: number;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
interface PlayerStatInstance extends Model<PlayerStatAttributes>, PlayerStatAttributes {
    getPlayer(): Promise<PlayerInstance>;
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
        },
        match_wons:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        match_losts:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        kills_count:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deaths_count:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        escapes:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        draws:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
}

/**
 * this is clan object from each instance of player stat in database
 */
export class PlayerStat implements PlayerStatAttributes {
    declare playerId: number;
    declare match: number;
    declare match_wons: number;
    declare match_losts: number;
    declare kills_count: number;
    declare deaths_count: number;
    declare escapes: number;
    declare draws: number;

    constructor(playerStat: PlayerStatAttributes) {
        this.playerId = playerStat.playerId;
        this.match = playerStat.match;
        this.match_wons = playerStat.match_wons;
        this.match_losts = playerStat.match_losts;
        this.kills_count = playerStat.kills_count;
        this.deaths_count = playerStat.deaths_count;
        this.escapes = playerStat.escapes;
        this.draws = playerStat.draws;
    }
}
