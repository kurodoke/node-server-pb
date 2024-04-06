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


interface IModel{
    account: AccountModelStatic;
    player: PlayerModelStatic;
    clan: ClanModelStatic;
    player_equipment: EquipmentModelStatic;
    player_stat: PlayerStatModelStatic;
    player_mission: MissionModelStatic;
    player_title: TitleModelStatic;
}

class Database{
    private _connection: Sequelize;
    private static _instance: Database;
    public model: IModel;

    constructor(){
        this._connection = new Sequelize('postgres://postgres:123456@localhost:5432/nodepb');
        
        /**
         * model configuration
         */
        this.model = {
            account: AccountModel(this._connection),
            player: PlayerModel(this._connection),
            clan: ClanModel(this._connection),
            player_equipment: EquipmentModel(this._connection),
            player_stat: PlayerStatModel(this._connection),
            player_mission: MissionModel(this._connection),
            player_title: TitleModel(this._connection),
        }

        /**
         * relation of the model
         */
        this.model.account.hasOne(this.model.player, {foreignKey: "id"})
        this.model.player.belongsTo(this.model.account, {foreignKey: "id"});
        
        this.model.player.hasOne(this.model.clan, {foreignKey: "owner"});
        this.model.clan.belongsTo(this.model.player, {foreignKey: "owner"});

        this.model.player.hasOne(this.model.player_equipment);
        this.model.player_equipment.belongsTo(this.model.player);

        this.model.player.hasOne(this.model.player_stat);
        this.model.player_stat.belongsTo(this.model.player);

        this.model.player.hasOne(this.model.player_mission);
        this.model.player_mission.belongsTo(this.model.player);
        
        this.model.player.hasOne(this.model.player_title);
        this.model.player_title.belongsTo(this.model.player);
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
            console.log('_Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
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

