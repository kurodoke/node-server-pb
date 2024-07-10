import { BASE_MYINFO_PAK } from "../game-packet-from-server/BASE_MYINFO_PAK";
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_MYINFO_REQ_PAK extends Packet {
    declare connection: Connection;

    constructor(opcode: number, data: Buffer, connection: Connection) {
        super("read", opcode, data);
        this.connection = connection;
    }

    async proc(){
        return [new BASE_MYINFO_PAK(PacketOpcodeServer.BASE_MYINFO_PAK, this.connection)];
    }
}
