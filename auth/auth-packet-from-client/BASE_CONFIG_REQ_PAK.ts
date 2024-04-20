import { BASE_URL_LIST_PAK } from '../auth-packet-from-server/BASE_URL_LIST_PAK';
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

        // return [
        //     new BASE_URL_LIST_PAK(PacketOpcodeServer.BASE_URL_LIST_PAK), 
        //     new 
        // ];

        return []
    }
}