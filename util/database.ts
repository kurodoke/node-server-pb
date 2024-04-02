import { ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { AccountModel, IAccount } from "../model/account";

interface IModel{
    account: ModelStatic<IAccount>;
}

class Database{
    private connection: Sequelize;
    private static instance: Database;
    public model: IModel;

    constructor(){
        this.connection = new Sequelize('postgres://postgres:123456@localhost:5432/nodepb');

        this.model = {"account": AccountModel(this.connection)}
        this.testConn()

    }

    static getInstance(): Database{
        if (!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }

    async testConn(){
        try {
            await this.connection.authenticate();
            await this.connection.sync();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async getData(query: string) {
        let data = await this.connection.query(query, {type: QueryTypes.SELECT });
        return data;
    }

    async setData(query: string) {
        let data = await this.connection.query(query, {type: QueryTypes.INSERT });
        return data;
    }

    async updateData(query: string) {
        let data = await this.connection.query(query, {type: QueryTypes.UPDATE });
        return data;
    }

    getConn(): Sequelize | null{
        if (this.connection) return this.connection;
        return null
    }

    async syncAllModel(){
        await this.connection.sync();
        console.log("All models were synchronized successfully.");
    }
}

export {Database};

