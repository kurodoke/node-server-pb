import { Association, BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { PlayerInstance, PlayerModelStatic } from "./player";

/**
 * base attribute of the model
 */
interface AccountAttributes {
    id: number;
    username: string;
    password: string;
    userfilelist: string;
    ip: string;
    mac: string;
    client_version: string;
    port: number;
    active: boolean;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
interface AccountInstance extends Model<AccountAttributes>, AccountAttributes {
    getPlayer(): Promise<PlayerInstance>;
}

/**
 * the model static of the model,
 * actually we can use the ModelStatic<M extends Model> instead of this,
 * i prefer this for great readability
 */
export type AccountModelStatic = typeof Model & {
    new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ): AccountInstance;
};

/**
 * 
 * @param sequelize database connection
 * @returns ModelStatic
 */
export function AccountModel(sequelize: Sequelize): AccountModelStatic {
    return <AccountModelStatic>sequelize.define<AccountInstance>("account", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        userfilelist: {
            type: DataTypes.STRING,
        },
        ip: {
            type: DataTypes.STRING,
        },
        mac: {
            type: DataTypes.STRING,
        },
        client_version: {
            type: DataTypes.STRING,
        },
        port: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
    });
}

/**
 * this is clan object from each instance of account in database
 */
export class Account implements AccountAttributes{
    declare id: number;
    declare username: string;
    declare password: string;
    declare userfilelist: string;
    declare ip: string;
    declare mac: string;
    declare client_version: string;
    declare port: number;
    declare active: boolean;

    constructor(account: AccountAttributes){
        this.id = account.id;
        this.username = account.username;
        this.password = account.password;
        this.userfilelist = account.userfilelist;
        this.ip = account.ip;
        this.mac = account.mac;
        this.client_version = account.client_version;
        this.port = account.port;
        this.active = account.active;
    }
}