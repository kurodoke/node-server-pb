import { BASE_CHANNEL_LIST_PAK } from "../game-packet-from-server/BASE_CHANNEL_LIST_PAK";
import { BASE_SCHANNEL_UPDATE_PAK } from "../game-packet-from-server/BASE_SCHANNEL_UPDATE_PAK";
import { Channel } from "../../model/channel";
import { Connection } from "../../network/connection";
import { LOBBY_ENTER_PAK } from "../game-packet-from-server/LOBBY_ENTER_PAK";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { Player } from "../../model/player";

export class LOBBY_ENTER_REQ_PAK extends Packet{
    declare player: Player;
    declare connection: Connection;
    declare channel: Channel;


    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this.player = connection.player;
        this.connection = connection;
    }

    async proc(){
        // need a long run
        return [
            new LOBBY_ENTER_PAK(PacketOpcodeServer.LOBBY_ENTER_PAK, 0),
        ];
    }
}