import { BASE_USER_ENTER_PAK } from "../game-packet-from-server/BASE_USER_ENTER_PAK";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_USER_ENTER_REQ_PAK extends Packet{
    constructor(opcode: number, data: Buffer){
        super("read", opcode, data);
    }

    async proc(){
        return [new BASE_USER_ENTER_PAK(PacketOpcodeServer.BASE_USER_ENTER_PAK)];
    }
}