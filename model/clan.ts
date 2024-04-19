import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { Player, PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
export interface ClanAttributes {
    id: number;
    owner: number;
    clanName: string;
    clanNotice: string;
    clanInfo: string;
    clanRank: number;
    logo: number;
    color: number;
    clanMatchs: number;
    clanMatchWons: number;
    clanMatchLosts: number;
    authority: number;
    limitRank: number;
    limitAge: number;
    limitAge2: number;
    point: number;
    vacancies: number;
    exp: number;
    data: number;
    playerBestMatchWon: number;
    playerBestKills: number;
    playerBestHeadshots: number;
    playerBestExps: number;
    playerBestParticipation: number;
    url: string;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface ClanInstance extends Model<ClanAttributes>, ClanAttributes {
    getPlayer: BelongsToGetAssociationMixin<PlayerInstance>;
    createPlayer: BelongsToCreateAssociationMixin<PlayerInstance>;
}

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
        clanName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        clanNotice: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        clanInfo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        clanRank: {
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
        clanMatchs: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        clanMatchWons: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        clanMatchLosts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        authority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limitRank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limitAge: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        limitAge2: {
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
        playerBestMatchWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        playerBestKills: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        playerBestHeadshots: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        playerBestExps: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        playerBestParticipation: {
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
 * this is an object from each instance of clan in database
 */
export class Clan implements ClanAttributes {
    public id: number = 0;
    public owner: number = null;
    public clanName: string = "";
    public clanNotice: string = "";
    public clanInfo: string = "";
    public clanRank: number = 0;
    public logo: number = 0;
    public color: number = 0;
    public clanMatchs: number = 0;
    public clanMatchWons: number = 0;
    public clanMatchLosts: number = 0;
    public authority: number = 0;
    public limitRank: number = 0;
    public limitAge: number = 0;
    public limitAge2: number = 0;
    public point: number = 1000;
    public vacancies: number = 50;
    public exp: number = 0;
    public data: number = 0;
    public playerBestMatchWon: number = 0;
    public playerBestKills: number = 0;
    public playerBestHeadshots: number = 0;
    public playerBestExps: number = 0;
    public playerBestParticipation: number = 0;
    public url: string = "";

    private static _instanceList: Map<number, Clan> = new Map();

    member: Array<Player> = new Array();
    countPlayer = -1;

    constructor(clan?: ClanAttributes) {
        if(clan){
            this.id = clan.id;
            this.owner = clan.owner;
            this.clanName = clan.clanName;
            this.clanNotice = clan.clanNotice;
            this.clanInfo = clan.clanInfo;
            this.clanRank = clan.clanRank;
            this.logo = clan.logo;
            this.color = clan.color;
            this.clanMatchs = clan.clanMatchs;
            this.clanMatchWons = clan.clanMatchWons;
            this.clanMatchLosts = clan.clanMatchLosts;
            this.authority = clan.authority;
            this.limitRank = clan.limitRank;
            this.limitAge = clan.limitAge;
            this.limitAge2 = clan.limitAge2;
            this.point = clan.point;
            this.vacancies = clan.vacancies;
            this.exp = clan.exp;
            this.data = clan.data;
            this.playerBestMatchWon = clan.playerBestMatchWon;
            this.playerBestKills = clan.playerBestKills;
            this.playerBestHeadshots = clan.playerBestHeadshots;
            this.playerBestExps = clan.playerBestExps;
            this.playerBestParticipation = clan.playerBestParticipation;
            this.url = clan.url;
        }
    }
}
