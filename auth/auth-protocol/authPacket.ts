import { BASE_CONFIG_REQ_PAK } from "../auth-packet-from-client/BASE_CONFIG_REQ_PAK";
import { BASE_ENTER_SERVER_REQ_PAK } from "../auth-packet-from-client/BASE_ENTER_SERVER_REQ_PAK";
import { BASE_LOGIN_REQ_PAK } from "../auth-packet-from-client/BASE_LOGIN_REQ_PAK";
import { BASE_MYINFO_REQ_PAK } from "../auth-packet-from-client/BASE_MYINFO_REQ_PAK";
import { BASE_SERVER_LIST_PAK } from "../auth-packet-from-server/BASE_SERVER_LIST_PAK";
import { BASE_SERVER_LIST_REQ_PAK } from "../auth-packet-from-client/BASE_SERVER_LIST_REQ_PAK";
import { BASE_USER_ENTER_REQ_PAK } from "../../game/game-packet-from-client/BASE_USER_ENTER_REQ_PAK";
import { BASE_USER_GIFTLIST_REQ_PAK } from "../auth-packet-from-client/BASE_USER_GIFTLIST_REQ_PAK";
import { BASE_XINGCODE_REQ_PAK } from "../auth-packet-from-client/BASE_XINGCODE_REQ_PAK";
import { Connection } from "../../network/connection";
import { Log } from "../../util/log";
import { Packet } from "../../network/packet";
import { PacketOpcodeClient } from "../../enum/PacketOpcodeClient";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { PacketProtocol } from "../../network/packetProtocol";

type TypePacketFrom = "client" | "server";

export class AuthPacket extends PacketProtocol{
    constructor(packetFrom: TypePacketFrom, connection: Connection){
        super(packetFrom, connection);
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
            Log.getLogger("auth").info("Packet received with opcode: " + opcode);
            
            switch(opcode){
                case PacketOpcodeClient.BASE_LOGIN_REQ_PAK_1:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case PacketOpcodeClient.BASE_LOGIN_REQ_PAK_2:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case PacketOpcodeClient.BASE_MYINFO_REQ_PAK: 
                    packet = new BASE_MYINFO_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case 2570: break;
                case 2571: break;
                case PacketOpcodeClient.BASE_SERVER_LIST_REQ_PAK: break;
                case PacketOpcodeClient.BASE_CONFIG_REQ_PAK: 
                    packet = new BASE_CONFIG_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case 2614: break;
                case PacketOpcodeClient.BASE_LOGIN_REQ_PAK_3:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case PacketOpcodeClient.BASE_LOGIN_REQ_PAK_4:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case PacketOpcodeClient.BASE_ENTER_SERVER_REQ_PAK: 
                    packet = new BASE_ENTER_SERVER_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case PacketOpcodeClient.BASE_USER_GIFTLIST_REQ_PAK:
                    packet = new BASE_USER_GIFTLIST_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                default:
                    this.connection.socket.end(()=>{
                        Log.getLogger("auth").error("Packet not found with opcode: " + opcode);
                    })
                    break;
            }
        }
        return packet;
    }
}