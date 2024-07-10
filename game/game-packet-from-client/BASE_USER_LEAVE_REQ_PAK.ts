import { BASE_USER_LEAVE_PAK } from '../game-packet-from-server/BASE_USER_LEAVE_PAK';
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

export class BASE_USER_LEAVE_REQ_PAK extends Packet{
    declare connection: Connection;

    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this.connection = connection;
    }

    async proc(){
        this.connection.player.changeServer = true;
        return [new BASE_USER_LEAVE_PAK(PacketOpcodeServer.BASE_USER_LEAVE_PAK)];
    }
}