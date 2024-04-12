import { QueryTypes, Sequelize } from "sequelize";
/**
 * model Import
 */
import { AccountModel, AccountModelStatic } from "../model/account";
import { PlayerModel, PlayerModelStatic } from "../model/player";
import { ClanModel, ClanModelStatic } from "../model/clan";
import { EquipmentModel, EquipmentModelStatic } from "../model/equipment";
import { PlayerStatModel, PlayerStatModelStatic } from "../model/playerStat";
import { MissionModel, MissionModelStatic } from "../model/mission";
import { TitleModel, TitleModelStatic } from "../model/title";
import { InventoryModel, InventoryModelStatic } from "../model/inventory";
import { ItemModel, ItemModelStatic } from "../model/item";
import { StoreModel, StoreModelStatic } from "../model/store";
import { CouponModel, CouponModelStatic } from "../model/coupon";
import { AuthSettingDatabase } from "../config/authSettingDatabase";
import { AuthSettingServer } from "../config/authSettingServer";


interface IModel{
    account: AccountModelStatic;
    player: PlayerModelStatic;
    clan: ClanModelStatic;
    player_equipment: EquipmentModelStatic;
    player_stat: PlayerStatModelStatic;
    player_mission: MissionModelStatic;
    player_title: TitleModelStatic;
    player_inventory: InventoryModelStatic;
    item: ItemModelStatic;
    store: StoreModelStatic;
    coupon: CouponModelStatic;
}

class Database{
    private _connection: Sequelize;
    private static _instance: Database;
    public model: IModel;

    constructor(){


        this._connection = new Sequelize({
            dialect: "postgres",
            host: AuthSettingDatabase.dbHost ? AuthSettingDatabase.dbHost : "localhost",
            password: AuthSettingDatabase.dbPass ? AuthSettingDatabase.dbPass.toString() : "123456",
            port: AuthSettingDatabase.dbPort ? AuthSettingDatabase.dbPort : 5432,
            database: AuthSettingDatabase.dbName ? AuthSettingDatabase.dbName : 'postgres',
            username: AuthSettingDatabase.dbUser ? AuthSettingDatabase.dbUser : "postgres",
            logging: AuthSettingServer.debugMode ? console.log : false,
        })
        // this._connection = new Sequelize('postgres://postgres:123456@localhost:5432/nodepb');
        

        /**
         * model configuration
         */
        this.model = {
            item: ItemModel(this._connection),
            account: AccountModel(this._connection),
            player: PlayerModel(this._connection),
            clan: ClanModel(this._connection),
            player_equipment: EquipmentModel(this._connection),
            player_stat: PlayerStatModel(this._connection),
            player_mission: MissionModel(this._connection),
            player_title: TitleModel(this._connection),
            player_inventory: InventoryModel(this._connection),
            store: StoreModel(this._connection),
            coupon: CouponModel(this._connection),
        }

        /**
         * relation of the model
         */
        this.model.account.hasOne(this.model.player, {foreignKey: "id"})
        this.model.player.belongsTo(this.model.account, {foreignKey: "id"});
        
        this.model.player.hasOne(this.model.clan, {foreignKey: "owner"});
        this.model.clan.belongsTo(this.model.player, {foreignKey: "owner"});

        this.model.player.hasOne(this.model.player_equipment, {foreignKey: "playerId"});
        this.model.player_equipment.belongsTo(this.model.player, {foreignKey: "playerId"});

        this.model.player.hasOne(this.model.player_stat, {foreignKey: "playerId"});
        this.model.player_stat.belongsTo(this.model.player, {foreignKey: "playerId"});

        this.model.player.hasOne(this.model.player_mission, {foreignKey: "playerId"});
        this.model.player_mission.belongsTo(this.model.player, {foreignKey: "playerId"});
        
        this.model.player.hasOne(this.model.player_title, {foreignKey: "playerId"});
        this.model.player_title.belongsTo(this.model.player, {foreignKey: "playerId"});

        this.model.player.belongsToMany(this.model.item, {through: this.model.player_inventory});
        this.model.item.belongsToMany(this.model.player, {through: this.model.player_inventory});

        this.model.item.hasMany(this.model.store, {foreignKey: "itemId"});
        this.model.store.belongsTo(this.model.item, {foreignKey: "itemId"});

        this.model.player.hasOne(this.model.coupon, {foreignKey: "playerId"});
        this.model.coupon.belongsTo(this.model.player, {foreignKey: "playerId"});

        /**
         * connection test then sync the database with the model 
         */
        this.testConnection()
    }

    static getInstance(): Database{
        if (!Database._instance){
            Database._instance = new Database();
        }

        return Database._instance;
    }

    async testConnection(){
        try {
            await this._connection.authenticate();
            await this._connection.sync();
        } catch (error) {
            console.log('[Error] Unable to connect to the database:', error);
        }
    }

    async getData(query: string) {
        let data = await this._connection.query(query, {type: QueryTypes.SELECT });
        return data;
    }

    async setData(query: string) {
        let data = await this._connection.query(query, {type: QueryTypes.INSERT });
        return data;
    }

    async updateData(query: string) {
        let data = await this._connection.query(query, {type: QueryTypes.UPDATE });
        return data;
    }

    getConnection(): Sequelize | null{
        if (this._connection) return this._connection;
        return null
    }

}

export {Database};

