import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { CountryEnum } from "../enum/CountryEnum";
import { ClanRoleEnum } from "../enum/ClanRoleEnum";
import { AccessLevelEnum } from "../enum/AccessLevelEnum";
import { Equipment } from "./equipment";
import { PlayerStat } from "./playerStat";
import { Mission } from "./mission";
import { Title } from "./title";
import { Inventory } from "./inventory";

/**
 * base attribute of the model
 */
export interface PlayerAttributes{
    id: number;
    name: string | null;
    rank: number;
    point: number;
    cash: number;
    exp: number;
    color: number;
    clan_id: number;
    ribbon: number;
    ensign: number;
    medal: number;
    master_medal: number;
    mission_1: number;
    mission_2: number;
    mission_3: number;
    mission_4: number;
    tourney_level: number;
    clan_date: number;
    access_level: number;
    role: number;
    online: number;
    last_up: number;
    country: number | null;
    clan_invited: number | null;
    time_get_cash: string | null;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface PlayerInstance extends Model<PlayerAttributes>, PlayerAttributes {}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type PlayerModelStatic = typeof Model
    & { new(values?: Record<string, unknown>, options?: BuildOptions): PlayerInstance }

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function PlayerModel(sequelize: Sequelize) : PlayerModelStatic {
    return <PlayerModelStatic>sequelize.define<PlayerInstance>("player", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        point: {
            type: DataTypes.INTEGER,
            defaultValue: 50000,
            allowNull: false,
        },
        cash: {
            type: DataTypes.INTEGER,
            defaultValue: 1000,
            allowNull: false,
        },
        exp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        color: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        clan_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        ribbon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        ensign: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        medal: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        master_medal: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        mission_1: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        mission_2: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        mission_3: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        mission_4: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        tourney_level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        clan_date: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        access_level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        online: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        last_up: {
            type: DataTypes.INTEGER,
            defaultValue: 1010000,
            allowNull: false,
        },
        country: {
            type: DataTypes.INTEGER,
            defaultValue: 31,
            allowNull: true,
        },
        clan_invited: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        time_get_cash: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    });
}

/**
 * this is clan object from each instance of player in database
 */
export class Player implements PlayerAttributes {
    declare id: number;
    declare name: string | null;
    declare rank: number;
    declare point: number;
    declare cash: number;
    declare exp: number;
    declare color: number;
    declare clan_id: number;
    declare ribbon: number;
    declare ensign: number;
    declare medal: number;
    declare master_medal: number;
    declare mission_1: number;
    declare mission_2: number;
    declare mission_3: number;
    declare mission_4: number;
    declare tourney_level: number;
    declare clan_date: number;
    declare access_level: AccessLevelEnum;
    declare role: ClanRoleEnum;
    declare online: number;
    declare last_up: number;
    declare country: CountryEnum | null;
    declare clan_invited: number | null;
    declare time_get_cash: string | null;

    public IPAddress: string; //inet
    public minutePlayed: Date;

    public playerTitle: Title;
    public playerMission: Mission;
    public playerStat: PlayerStat;
    public playerEquipment: Equipment;
    
    public playerInventory: Array<Inventory> = new Array();



    constructor(player: PlayerAttributes) {
        this.id = player.id;
        this.name = player.name;
        this.rank = player.rank;
        this.point = player.point;
        this.cash = player.cash;
        this.exp = player.exp;
        this.color = player.color;
        this.clan_id = player.clan_id;
        this.ribbon = player.ribbon;
        this.ensign = player.ensign;
        this.medal = player.medal;
        this.master_medal = player.master_medal;
        this.mission_1 = player.mission_1;
        this.mission_2 = player.mission_2;
        this.mission_3 = player.mission_3;
        this.mission_4 = player.mission_4;
        this.tourney_level = player.tourney_level;
        this.clan_date = player.clan_date;
        this.access_level = player.access_level;
        this.role = player.role;
        this.online = player.online;
        this.last_up = player.last_up;
        this.country = player.country;
        this.clan_invited = player.clan_invited;
        this.time_get_cash = player.time_get_cash;
    }

    clan(): number{
        return this.clan_id > 0 ? this.clan_id : this.clan_invited;  
    }

    clanRole(): number{
        return this.clan_id > 0 ? this.role : ClanRoleEnum.MEMBER_UNKNOWN;
    }
    
    status(): number{
        return this.name != null ? 1 : 0;
    }

    unknown(): number{
        return 0;
    }
}

