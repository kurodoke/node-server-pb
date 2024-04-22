import { Account, AccountInstance } from "../model/account";
import { Player, PlayerInstance } from "../model/player";

import { Connection } from "../network/connection";
import { Convert } from "../util/convert";
import { Database } from "../util/database";
import { Log } from "../util/log";
import { Model } from "sequelize";
import { PlayerManager } from "./playerManager";
import { TitleManager } from "./titleManager";
import { sha256 } from "js-sha256";

interface LoginProperty {
    user: string,
    password: string,
    userFileList: string,
    ip: Uint8Array,
    mac: Uint8Array,
    clientVersion: string,
    port: number,
}

type AccountId = number;

export class AccountManager{
    private static _listAccount: Map<AccountId, Account> = new Map();

    public static async login(dataLogin: LoginProperty, connection: Connection): Promise<number>{
        let loginStatus = 0;
        let model: AccountInstance = null;
        const DB = Database.getInstance();

        const data = await DB.model.account.findOne({
            where:{
                username: dataLogin.user
            }
        });

        const passwordCrypted = sha256(dataLogin.password);

        /**
         * if the account is not found, then is make a new one
         */
        if(data == null){
            model = await AccountManager.createAccount(dataLogin, passwordCrypted);

            loginStatus = 1; // success login | true identity
        } 

        /**
         * if the account is found but the password is wrong
         */
        else if (passwordCrypted != data.password){
            loginStatus = 0x80000102;
        } 

        /**
         * if everything is okay
         */
        else {
            model = data;
            await AccountManager.updateOnlineAccount(model, dataLogin);
        }

        /**
         * if login success then begin initialization on everything 
         */
        if(loginStatus = 1){
            await AccountManager.initialization(model, dataLogin, connection);
        }

        return loginStatus;
    }

    /**
     * the next step after login is success
     * get the player model then save it on connection model
     */
    private static async initialization(model: AccountInstance, dataLogin: LoginProperty, connection: Connection) {  
        let player = await model.getPlayer();
        /**
         * create the model then save it on connection
         */
        connection.account = new Account(model.dataValues);
        connection.player = new Player(player.dataValues);

        /**
         * after init then add to list of the manager
         */
        PlayerManager.addPlayerInstanceToList(connection.player);
        AccountManager.addAccountInstanceToList(connection.account);

        /**
         * setup for player instance
         */
        await PlayerManager.setPlayerStat(connection.player.id);
        await PlayerManager.setPlayerTitle(connection.player.id);
        await PlayerManager.setPlayerMission(connection.player.id);
        await PlayerManager.setPlayerEquipment(connection.player.id);
        await PlayerManager.setPlayerCoupon(connection.player.id);
        await PlayerManager.setPlayerMessage(connection.player.id);
        await PlayerManager.setPlayerConfig(connection.player.id);
        TitleManager.setPlayerTitlePos(connection.player);
    }

    public static addAccountInstanceToList(instance: Account): boolean{
        try{
            this._listAccount.set(instance.id, instance);

            return true;
        } catch (err){
            return false;
        }
    }

    private static async updateOnlineAccount(model: AccountInstance, dataLogin: LoginProperty){
        await model.update({
            userFileList : dataLogin.userFileList,
            ip: Convert.ipToString(dataLogin.ip),
            mac: Convert.macToString(dataLogin.mac),
            clientVersion: dataLogin.clientVersion,
            port: dataLogin.port,
            active: true
        },{
            where: {username: dataLogin.user }
        })
    }

    private static async createAccount(dataLogin: LoginProperty, passwordCrypted: string) : Promise<AccountInstance>{
        const DB = Database.getInstance();
        const transaction = await DB.getConnection().transaction();
        let account: AccountInstance = null;

        try{
            account = await DB.model.account.create({
                username: dataLogin.user,
                password: passwordCrypted,
                userFileList: dataLogin.userFileList,
                ip: Convert.ipToString(dataLogin.ip),
                mac: Convert.macToString(dataLogin.mac),
                clientVersion: dataLogin.clientVersion,
                port: dataLogin.port,
                active: true
            }, {transaction: transaction});
    
            let player = await account.createPlayer({
                id: account.dataValues.id
            }, {transaction: transaction});
    
            let playerStat = await player.createPlayer_stat({
                playerId: account.dataValues.id
            }, {transaction: transaction});
    
            let playerEquipment = await player.createEquipment({
                playerId: account.dataValues.id
            }, {transaction: transaction});
    
            let playerMission = await player.createMission({
                playerId: account.dataValues.id
            }, {transaction: transaction});
    
            let playerTitle = await player.createTitle({
                playerId: account.dataValues.id
            }, {transaction: transaction});

            let playerCoupon = await player.createCoupon({
                playerId: account.dataValues.id
            }, {transaction: transaction});

            transaction.commit();
        } catch(err){
            Log.getLogger("auth").error(err);
            
            transaction.rollback()
        }

        return account;
    }

}