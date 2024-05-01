import { Connection } from "./connection";
import { Packet } from "./packet";

type TypePacketFrom = "client" | "server";

export class PacketProtocol{
    declare public packetFrom: TypePacketFrom;
    declare public connection: Connection;

    constructor(packetFrom: TypePacketFrom, connection: Connection){
        this.packetFrom = packetFrom;
        this.connection = connection;
    }

    getPACKET(opcode: number, data: Buffer = null): Packet {
        let packet = null;
        return packet;
    }

    setPacket(opcode: number, packet: Packet){
        this.connection.packets.set(opcode, packet);
    }
}