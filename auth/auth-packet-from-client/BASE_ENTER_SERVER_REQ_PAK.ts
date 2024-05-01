import { Account } from "../../model/account";
import { BASE_ENTER_SERVER_PAK } from "../auth-packet-from-server/BASE_ENTER_SERVER_PAK";
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { Player } from "../../model/player";

export class BASE_ENTER_SERVER_REQ_PAK extends Packet{
    declare connection: Connection;
    declare player: Player;
    declare acc: Account;
    declare id: number;
    private _err: boolean = false; 

    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this.connection = connection;
    }

    read(){
        this.player = this.connection.player;
        this.acc = this.connection.account;
        if(this.player){
            this.id = this.player.id;
        }
    }

    async proc(): Promise<Packet[]> {
        this._err = this.check();

        if (this._err){
            return[]
        }
        return [new BASE_ENTER_SERVER_PAK(PacketOpcodeServer.BASE_ENTER_SERVER_PAK)]
    }

    check(): boolean{
        let p = this.connection.packets;
        if(p.has(2678) || p.has(2565) || p.has(2567) || p.has(2577)){
            return false;
        }
        return true;
    }
}