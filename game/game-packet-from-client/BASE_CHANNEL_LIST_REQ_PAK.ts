import { BASE_CHANNEL_LIST_PAK } from "../game-packet-from-server/BASE_CHANNEL_LIST_PAK";
import { BASE_SCHANNEL_UPDATE_PAK } from "../game-packet-from-server/BASE_SCHANNEL_UPDATE_PAK";
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { Player } from "../../model/player";

export class BASE_CHANNEL_LIST_REQ_PAK extends Packet{
    declare player: Player;
    declare connection: Connection;
    public unlimitedAccess: boolean = false;


    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this.player = connection.player;
        this.connection = connection;
    }

    async proc(){
        if(this.player){
            if(this.player.rank == 53 || this.player.rank == 54 || this.player.accessLevel > 0){
                this.unlimitedAccess = true;
            }
        }
        return [
            new BASE_CHANNEL_LIST_PAK(PacketOpcodeServer.BASE_CHANNEL_LIST_PAK, this.connection),
            new BASE_SCHANNEL_UPDATE_PAK(PacketOpcodeServer.BASE_SCHANNEL_UPDATE_PAK, this.unlimitedAccess),
        ];
    }
}