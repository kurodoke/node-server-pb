import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, BuildOptions, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Sequelize } from "sequelize";
import { AccessLevelEnum } from "../enum/AccessLevelEnum";
import { ClanRoleEnum } from "../enum/ClanRoleEnum";
import { CountryEnum } from "../enum/CountryEnum";
import { AccountInstance } from "./account";
import { ClanInstance } from "./clan";
import { Coupon, CouponInstance } from "./coupon";
import { Equipment, EquipmentInstance } from "./equipment";
import { Inventory } from "./inventory";
import { ItemInstance } from "./item";
import { Mission, MissionInstance } from "./mission";
import { PlayerStat, PlayerStatInstance } from "./playerStat";
import { Title, TitleInstance } from "./title";

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
    clanId: number;
    ribbon: number;
    ensign: number;
    medal: number;
    masterMedal: number;
    cardMissionId1: number;
    cardMissionId2: number;
    cardMissionId3: number;
    cardMissionId4: number;
    tourneyLevel: number;
    clanDate: number;
    accessLevel: number;
    role: number;
    online: number;
    lastUp: number;
    country: number | null;
    invitedClanId: number | null;
    lastTimeGetCash: string | null;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface PlayerInstance extends Model<PlayerAttributes>, PlayerAttributes {
    //account
    getAccount: BelongsToGetAssociationMixin<AccountInstance>;
    createAccount: BelongsToCreateAssociationMixin<AccountInstance>;

    //clan
    getClan: HasOneGetAssociationMixin<ClanInstance>;
    createClan: HasOneCreateAssociationMixin<ClanInstance>;

    //coupon
    getCoupon: HasOneGetAssociationMixin<CouponInstance>;
    createCoupon: HasOneCreateAssociationMixin<CouponInstance>;

    //equipment
    getEquipment: BelongsToGetAssociationMixin<EquipmentInstance>;
    createEquipment: BelongsToCreateAssociationMixin<EquipmentInstance>;

    //item
    getItem: BelongsToManyGetAssociationsMixin<ItemInstance>;
    addItem: BelongsToManyAddAssociationMixin<ItemInstance, number>;
    addItems: BelongsToManyAddAssociationsMixin<ItemInstance, number>;

    //mission
    getMission: BelongsToGetAssociationMixin<MissionInstance>;
    createMission: BelongsToCreateAssociationMixin<MissionInstance>;

    //playerstat
    getPlayer_stat: BelongsToGetAssociationMixin<PlayerStatInstance>;
    createPlayer_stat: BelongsToCreateAssociationMixin<PlayerStatInstance>;

    //title
    getTitle: BelongsToGetAssociationMixin<TitleInstance>;
    createTitle: BelongsToCreateAssociationMixin<TitleInstance>;
}

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
        clanId: {
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
        masterMedal: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        cardMissionId1: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        cardMissionId2: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        cardMissionId3: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        cardMissionId4: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        tourneyLevel: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        clanDate: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        accessLevel: {
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
        lastUp: {
            type: DataTypes.INTEGER,
            defaultValue: 1010000,
            allowNull: false,
        },
        country: {
            type: DataTypes.INTEGER,
            defaultValue: 31,
            allowNull: true,
        },
        invitedClanId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        lastTimeGetCash: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    });
}

/**
 * this is an object from each instance of player in database
 */
export class Player implements PlayerAttributes {
    declare id: number;
    declare name: string | null;
    declare rank: number;
    declare point: number;
    declare cash: number;
    declare exp: number;
    declare color: number;
    declare clanId: number;
    declare ribbon: number;
    declare ensign: number;
    declare medal: number;
    declare masterMedal: number;
    declare cardMissionId1: number;
    declare cardMissionId2: number;
    declare cardMissionId3: number;
    declare cardMissionId4: number;
    declare tourneyLevel: number;
    declare clanDate: number;
    declare accessLevel: AccessLevelEnum;
    declare role: ClanRoleEnum;
    declare online: number;
    declare lastUp: number;
    declare country: CountryEnum | null;
    declare invitedClanId: number | null;
    declare lastTimeGetCash: string | null;

    public IPAddress: string; //inet
    public minutePlayed: Date;

    public playerTitle: Title;
    public playerMission: Mission;
    public playerStat: PlayerStat;
    public playerEquipment: Equipment;
    public playerCoupon: Coupon;
    
    public playerInventory: Array<Inventory> = new Array();

    public client_version: number = 38;

    constructor(player: PlayerAttributes) {
        this.id = player.id;
        this.name = player.name;
        this.rank = player.rank;
        this.point = player.point;
        this.cash = player.cash;
        this.exp = player.exp;
        this.color = player.color;
        this.clanId = player.clanId;
        this.ribbon = player.ribbon;
        this.ensign = player.ensign;
        this.medal = player.medal;
        this.masterMedal = player.masterMedal;
        this.cardMissionId1 = player.cardMissionId1;
        this.cardMissionId2 = player.cardMissionId2;
        this.cardMissionId3 = player.cardMissionId3;
        this.cardMissionId4 = player.cardMissionId4;
        this.tourneyLevel = player.tourneyLevel;
        this.clanDate = player.clanDate;
        this.accessLevel = player.accessLevel;
        this.role = player.role;
        this.online = player.online;
        this.lastUp = player.lastUp;
        this.country = player.country;
        this.invitedClanId = player.invitedClanId;
        this.lastTimeGetCash = player.lastTimeGetCash;
    }

    clan(): number{
        return this.clanId > 0 ? this.clanId : this.invitedClanId;  
    }

    clanRole(): number{
        return this.clanId > 0 ? this.role : ClanRoleEnum.MEMBER_UNKNOWN;
    }
    
    status(): number{
        return this.name != null ? 1 : 0;
    }

    unknown(): number{
        return 0;
    }

    observing(): number{
        return this.rank == 53 || this.rank == 54 || this.accessLevel > 0 ? 1 : 0;
    }
}

