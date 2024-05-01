import { BASE_SERVER_LIST_PAK } from "../game-packet-from-server/BASE_SERVER_LIST_PAK";
import { BASE_USER_ENTER_REQ_PAK } from "../game-packet-from-client/BASE_USER_ENTER_REQ_PAK";
import { Connection } from "../../network/connection";
import { Log } from "../../util/log";
import { Packet } from "../../network/packet";
import { PacketOpcodeClient } from "../../enum/PacketOpcodeClient";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { PacketProtocol } from "../../network/packetProtocol";

type TypePacketFrom = "client" | "server";

export class GamePacket extends PacketProtocol{
    constructor(packetFrom: TypePacketFrom, connection: Connection){
        super(packetFrom, connection)
    }

    getPACKET(opcode: number, data: Buffer = null): Packet {
        let packet = null;
        if (this.packetFrom == "server"){
            switch (opcode) {
                case PacketOpcodeServer.BASE_SERVER_LIST_PAK:
                    packet = new BASE_SERVER_LIST_PAK(opcode, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                    
                default:
                    break;
            }
        }
        if (this.packetFrom == "client" && data){
            Log.getLogger("game").info("Packet received with opcode: " + opcode);
            
            switch(opcode){
                case 2575: break; 
                case PacketOpcodeClient.BASE_USER_ENTER_REQ_PAK:
                    packet = new BASE_USER_ENTER_REQ_PAK(opcode, data);
                    this.setPacket(opcode, packet);
                    break;
                default:
                    this.connection.socket.end(()=>{
                        Log.getLogger("game").error("Packet not found with opcode: " + opcode);
                    })
                    break;
            }
        }
        if(packet == null){}
        return packet;
    }
}