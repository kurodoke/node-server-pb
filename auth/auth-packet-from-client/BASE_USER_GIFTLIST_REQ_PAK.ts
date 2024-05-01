import { BASE_USER_GIFTLIST_PAK } from "../auth-packet-from-server/BASE_USER_GIFTLIST_PAK";
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_USER_GIFTLIST_REQ_PAK extends Packet{
    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
    }

    async proc(): Promise<Packet[]> {
        return [new BASE_USER_GIFTLIST_PAK(PacketOpcodeServer.BASE_USER_GIFTLIST_PAK)];
    }
}