import { Connection } from "../../network/connection";
import { GameServerXML } from "../../data/loader/gameServerXML";
import { Packet } from "../../network/packet";

export class BASE_SCHANNEL_UPDATE_PAK extends Packet{
    declare connection: Connection;
    declare access: boolean;
    declare active: boolean;

    constructor(opcode: number, access: boolean){
        super("write", opcode);
        this.access = access
        this.active = false;
    }

    write() {
        this.writeD(GameServerXML.gameServerList.length);
        GameServerXML.gameServerList.forEach(_server => {
            if (_server.channelPlayers >= _server.maxPlayers) this.active = false
            else this.active = true
            if(this.access) this.active = true;
            this.writeD(this.active);
            this.writeIP(_server.ip);
            this.writeH(_server.port);
            this.writeC(_server.type);
            this.writeH(_server.maxPlayers);
            this.writeD(_server.channelPlayers);
        });
    }
}