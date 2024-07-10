import { Connection } from "../../network/connection";
import { GameServerXML } from "../../data/loader/gameServerXML";
import { Packet } from "../../network/packet";

export class BASE_CHANNEL_LIST_PAK extends Packet{
    declare connection: Connection;

    constructor(opcode: number, connection: Connection){
        super("write", opcode);
        this.connection = connection;
    }

    write() {
        let server = GameServerXML.gameServerList.filter((_server) => {
            return _server.port == this.connection.socket.localPort
        })[0];

        this.writeD(server.channelList.length);
        this.writeD(server.channelPlayers);
        for(let channel of server.channelList){
            this.writeD(0); //player count inside server/channel
        }
    }
}