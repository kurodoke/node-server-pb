import { BASE_CONFIG_PAK } from '../game-packet-from-server/BASE_CONFIG_PAK';
import { BASE_URL_LIST_PAK } from '../game-packet-from-server/BASE_URL_LIST_PAK';
import { BASE_USER_INBOX_PAK } from '../game-packet-from-server/BASE_USER_INBOX_PAK';
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_CONFIG_REQ_PAK extends Packet{
    private connection: Connection;

    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this.connection = connection;
    }

    async proc(){
        if(!this.connection.player){
            return []
        };

        return [
            new BASE_URL_LIST_PAK(PacketOpcodeServer.BASE_URL_LIST_PAK),
            ...this.inboxPacket(),
            new BASE_CONFIG_PAK(PacketOpcodeServer.BASE_CONFIG_PAK, this.connection, 0),
        ];
    }

    private inboxPacket(): Array<Packet>{
        let packetResult = new Array();
        if(this.connection.player.playerInbox.length > 0) {

            let pages = Math.ceil(this.connection.player.playerInbox.length / 25);
    
            for (let index = 0; index < pages; index++) {
                packetResult.push(new BASE_USER_INBOX_PAK(PacketOpcodeServer.BASE_USER_INBOX_PAK, this.connection, index))
            }
        }
        return packetResult;
    }
}