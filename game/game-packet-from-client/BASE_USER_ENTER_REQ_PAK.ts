import { BASE_USER_ENTER_PAK } from "../game-packet-from-server/BASE_USER_ENTER_PAK";
import { Connection } from "../../network/connection";
import { GameServerInfo } from "../../model/gameServer";
import { GameServerXML } from "../../data/loader/gameServerXML";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_USER_ENTER_REQ_PAK extends Packet{
    declare connection: Connection;
    declare server: GameServerInfo

    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);

        this.connection = connection;
        this.server = GameServerXML.gameServerList.filter((_server) => {
            return _server.port == connection.socket.localPort
        })[0]
    }

    async proc(){
        this.connection.player.serverId = this.server.id
        return [new BASE_USER_ENTER_PAK(PacketOpcodeServer.BASE_USER_ENTER_PAK)];
    }
}