import { sha256 } from "js-sha256";
import { Packet } from "../../network/packet";
import { Database } from "../../util/database";
import { BASE_LOGIN_PAK } from "../auth-packet-from-server/BASE_LOGIN_PAK";
import { Convert } from "../../util/convert";
import { Connection } from "../../network/connection";
import { BASE_MYCASH_PAK } from "../auth-packet-from-server/BASE_MYCASH_PAK";
import { Player } from '../../model/player';
import { Account } from "../../model/account";
import { PlayerManager } from "../../manager/playerManager";
import { AccountManager } from "../../manager/accountManager";

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

        const dataLogin = {
            user: this.user,
            password: this.password,
            userFileList: this.userfilelist,
            ip: this.ip,
            mac: this.mac,
            clientVersion: this.client_version,
            port: this._connection.socket.remotePort,
        }

        this._login = await AccountManager.login(dataLogin ,this._connection);

        packetArray.push(new BASE_LOGIN_PAK(2564, this._login, this.zero, this.user))
        
        if(this._login == 1){
            packetArray.push(new BASE_MYCASH_PAK(545, 5000, 100000));
        } 
        return packetArray;
    }
}

export {BASE_LOGIN_REQ_PAK}