import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { ClanLevelEnum } from "../enum/ClanLevelEnum";
import { Player } from "./player";

/**
 * base attribute of the model
 */
interface ClanAttributes {
    id: number;
    owner: number;
    clan_name: string;
    clan_notice: string;
    clan_info: string;
    clan_rank: number;
    logo: number;
    color: number;
    clan_match: number;
    clan_won: number;
    clan_lost: number;
    authority: number;
    limit_rank: number;
    limit_age: number;
    limit_age_2: number;
    point: number;
    vacancies: number;
    exp: number;
    data: number;
    player_best_won: number;
    player_best_kills: number;
    player_best_headshots: number;
    player_best_exp: number;
    player_best_participation: number;
    url: string;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
interface ClanInstance extends Model<ClanAttributes>, ClanAttributes {}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type ClanModelStatic = typeof Model & {
    new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ): ClanInstance;
};

/**
 *
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function ClanModel(sequelize: Sequelize): ClanModelStatic {
    return <ClanModelStatic>sequelize.define<ClanInstance>("clan", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        owner: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        clan_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        clan_notice: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        clan_info: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        clan_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        logo: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        color: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        clan_match: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        clan_won: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        clan_lost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        authority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limit_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limit_age: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limit_age_2: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        point: {
            type: DataTypes.INTEGER,
            defaultValue: 1000,
        },
        vacancies: {
            type: DataTypes.INTEGER,
            defaultValue: 50,
        },
        exp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        data: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        player_best_won: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        player_best_kills: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        player_best_headshots: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        player_best_exp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        player_best_participation: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: 0,
        },
    });
}

/**
 * this is clan object from each instance of clan in database
 */
export class Clan implements ClanAttributes {
    declare id: number;
    declare owner: number;
    declare clan_name: string;
    declare clan_notice: string;
    declare clan_info: string;
    declare clan_rank: number;
    declare logo: number;
    declare color: number;
    declare clan_match: number;
    declare clan_won: number;
    declare clan_lost: number;
    declare authority: number;
    declare limit_rank: number;
    declare limit_age: number;
    declare limit_age_2: number;
    declare point: number;
    declare vacancies: number;
    declare exp: number;
    declare data: number;
    declare player_best_won: number;
    declare player_best_kills: number;
    declare player_best_headshots: number;
    declare player_best_exp: number;
    declare player_best_participation: number;
    declare url: string;

    member: Array<Player> = new Array();
    countPlayer = -1;

    constructor(clan: ClanAttributes) {
        this.id = clan.id;
        this.owner = clan.owner;
        this.clan_name = clan.clan_name;
        this.clan_notice = clan.clan_notice;
        this.clan_info = clan.clan_info;
        this.clan_rank = clan.clan_rank;
        this.logo = clan.logo;
        this.color = clan.color;
        this.clan_match = clan.clan_match;
        this.clan_won = clan.clan_won;
        this.clan_lost = clan.clan_lost;
        this.authority = clan.authority;
        this.limit_rank = clan.limit_rank;
        this.limit_age = clan.limit_age;
        this.limit_age_2 = clan.limit_age_2;
        this.point = clan.point;
        this.vacancies = clan.vacancies;
        this.exp = clan.exp;
        this.data = clan.data;
        this.player_best_won = clan.player_best_won;
        this.player_best_kills = clan.player_best_kills;
        this.player_best_headshots = clan.player_best_headshots;
        this.player_best_exp = clan.player_best_exp;
        this.player_best_participation = clan.player_best_participation;
        this.url = clan.url;
    }

    clanLevel() {
        let count = 0;

        if (this.countPlayer == -1) {
            count = this.countPlayer;
        } else {
            count = this.member.length;
        }

        if (count >= 250) return ClanLevelEnum.CLAN_LEVEL_CORPS;
        else if (count >= 200) return ClanLevelEnum.CLAN_LEVEL_DIVISION;
        else if (count >= 150) return ClanLevelEnum.CLAN_LEVEL_BRIGADE;
        else if (count >= 100) return ClanLevelEnum.CLAN_LEVEL_REGIMENT;
        else if (count >= 50) return ClanLevelEnum.CLAN_LEVEL_BATTALION;
        else if (count >= 30) return ClanLevelEnum.CLAN_LEVEL_COMPANY;
        else if (count >= 10) return ClanLevelEnum.CLAN_LEVEL_PLATOON;
        else return ClanLevelEnum.CLAN_LEVEL_SQUARD;
    }
}
