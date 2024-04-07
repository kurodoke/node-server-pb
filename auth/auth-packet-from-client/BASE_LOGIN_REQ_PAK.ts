import { sha256 } from "js-sha256";
import { Packet } from "../../core-network/packet";
import { Database } from "../../util/database";
import { BASE_LOGIN_PAK } from "../auth-packet-from-server/BASE_LOGIN_PAK";
import { Convert } from "../../util/convert";
import { Connection } from "../../core-network/connection";
import { BASE_MYCASH_PAK } from "../auth-packet-from-server/BASE_MYCASH_PAK";
import { Player } from '../../model/player';
import { Account } from "../../model/account";
import { PlayerManager } from "../../manager/playerManager";

class BASE_LOGIN_REQ_PAK extends Packet{
    private _connection: Connection;

    public client_version: string;
    public user_length: number;
    public password_length: number;
    public user: string;
    public password: string;
    public mac: Uint8Array;
    public zero: number;
    public connection: number;
    public ip: Uint8Array;
    public launcher_key: bigint;
    public userfilelist: string;
    public HWID: string;

    private _login: number;
    private _account_id: number;

    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this._connection = connection;
    }

    read(){
        this.offset = this.offset + 2; //skip 2 bytes
        this.client_version = this.readC() + "." + this.readH() + "." + this.readH() + "." + this.readC();
        this.user_length = this.readC();
        this.password_length = this.readC();
        this.user = this.readS(this.user_length).trim();
        this.password = this.readS(this.password_length).trim();
        this.mac = this.readBs(6);
        this.zero = this.readH();
        this.connection = this.readC();
        this.ip = this.readBs(4);
        this.launcher_key = this.readQ();
        this.userfilelist = this.readS(32);
        this.readD();
        this.HWID = this.readS(32);
        this.readC();

    }

    async proc(){
        const packetArray = new Array();

        await this.checkLogin();

        packetArray.push(new BASE_LOGIN_PAK(2564, this._login, this.zero, this.user))
        
        if(this._login == 1){
            // packetArray.push(new BASE_MYCASH_PAK(545, 50000, 100000));
        } 
        return packetArray;
    }

    async checkLogin(){
        const DB = Database.getInstance();
        const data = await DB.model.account.findOne({
            where:{
                username: `${this.user.slice(0, this.user.length - 1)}`
            }
        });

        const password = sha256(this.password.slice(0, this.password.length - 1));
        
        /**
         * if the account is not found, then is make a new one
         */

        if(data == null){
            console.log("data not yet");
            
            await DB.model.account.create({
                username: `${this.user.slice(0, this.user.length - 1)}`,
                password: password,
                userfilelist: this.userfilelist,
                ip: Convert.ipToString(this.ip),
                mac: Convert.macToString(this.mac),
                client_version: this.client_version,
                port: this._connection.socket.remotePort,
                active: true
            })

            this._login = 1; // success login | true identity
        } 
        /**
         * if the account is found but the password is wrong
         */
        else if (password != data.password){
            console.log("data not correct");
            
            this._login = 0x80000102;
        } 
        /**
         * if everything is okay
         */
        else {
            console.log("data correct");
            
            await DB.model.account.update({
                userfilelist: this.userfilelist,
                ip: Convert.ipToString(this.ip),
                mac: Convert.macToString(this.mac),
                client_version: this.client_version,
                port: this._connection.socket.remotePort,
                active: true
            },{
                where: {username: `${this.user.slice(0, this.user.length - 1)}`}
            })

            this._login = 1;


        }

        /**
         * if login success get the player model the save it on connection model
         */
        if(this._login == 1){
            let account = await DB.model.account.findOne({
                attributes: ["id"],
                where:{
                    username: this.user.slice(0, this.user.length - 1)
                },
                include: [
                    {model: DB.model.player}
                ]
            });        

            let player = await account.getPlayer();

            if(!player){
                player = await DB.model.player.create({
                    id: account.dataValues.id
                })
            }

            /**
             * create the model then save it on connection
             */
            this._connection.account = new Account(account.dataValues);
            this._connection.player = new Player(player.dataValues);

            /**
             * after init then add to list of the manager
             */
            PlayerManager.addPlayerInstance(this._connection.player);
        }
    }
}

export {BASE_LOGIN_REQ_PAK}