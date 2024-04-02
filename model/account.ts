import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

export interface IAccount extends Model{
    id: number,
    username: string,
    password: string,
    userfilelist: string,
    ip: string,
    mac: string,
    client_version: string,
    port: string,
    active: boolean,
}

export function AccountModel (sequelize: Sequelize): ModelStatic<IAccount>{
    return sequelize.define("account", {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        username:{
            type:DataTypes.STRING,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
        },
        userfilelist:{
            type:DataTypes.STRING,
        },
        ip:{
            type:DataTypes.STRING,
        },
        mac:{
            type:DataTypes.STRING,
        },
        client_version:{
            type:DataTypes.STRING,
        },
        port:{
            type: DataTypes.INTEGER
        },
        active:{
            type: DataTypes.BOOLEAN
        }
    })
}