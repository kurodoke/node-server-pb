import {
    BuildOptions, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model,
    Sequelize
} from "sequelize";
import { Database } from "../util/database";
import { PlayerInstance } from "./player";

/**
 * base attribute of the model
 */
export interface AccountAttributes {
    id: number;
    username: string;
    password: string;
    userFileList: string;
    ip: string;
    mac: string;
    clientVersion: string;
    port: number;
    active: boolean;
}

/**
 * this combine the attribute interface with model,
 * so we can use this interface as referencee for the model
 */
export interface AccountInstance
    extends Model<AccountAttributes>,
        AccountAttributes {
    getPlayer: HasOneGetAssociationMixin<PlayerInstance>;
    createPlayer: HasOneCreateAssociationMixin<PlayerInstance>;
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
        userFileList: {
            type: DataTypes.STRING,
        },
        ip: {
            type: DataTypes.STRING,
        },
        mac: {
            type: DataTypes.STRING,
        },
        clientVersion: {
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
 * this is an object from each instance of account in database
 */
export class Account implements AccountAttributes {
    declare id: number;
    declare username: string;
    declare password: string;
    declare userFileList: string;
    declare ip: string;
    declare mac: string;
    declare clientVersion: string;
    declare port: number;
    declare active: boolean;

    constructor(account: AccountAttributes) {
        this.id = account.id;
        this.username = account.username;
        this.password = account.password;
        this.userFileList = account.userFileList;
        this.ip = account.ip;
        this.mac = account.mac;
        this.clientVersion = account.clientVersion;
        this.port = account.port;
        this.active = account.active;
    }

    async offline() {
        this.active = false;

        await Database.getInstance().model.account.update(
            {
                active: false,
            },
            {
                where: {
                    id: this.id,
                },
            }
        );
    }
}
