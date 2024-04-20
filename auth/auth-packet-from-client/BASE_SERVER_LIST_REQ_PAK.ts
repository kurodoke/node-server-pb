import { BASE_SERVER_LIST_PAK } from "../auth-packet-from-server/BASE_SERVER_LIST_PAK";
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_SERVER_LIST_REQ_PAK extends Packet{
    declare connection: Connection;

    constructor(opcode: number, data: Buffer, connection: Connection) {
        super("read", opcode, data);
        this.connection = connection;
    }

    async proc(){
        return [new BASE_SERVER_LIST_PAK(PacketOpcodeServer.BASE_SERVER_LIST_PAK, this.connection)];
    }
}