import { DataTypes, QueryTypes, Sequelize } from "sequelize";

class Database{
    private connection: Sequelize;
    private static instance: Database;

    constructor(){
        this.connection = new Sequelize('postgres://postgres:123456@localhost:5432/nodepb');

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
}

export {Database};

