import { BASE_CONFIG_REQ_PAK } from "../auth-packet-from-client/BASE_CONFIG_REQ_PAK";
import { BASE_LOGIN_REQ_PAK } from "../auth-packet-from-client/BASE_LOGIN_REQ_PAK";
import { BASE_MYINFO_REQ_PAK } from "../auth-packet-from-client/BASE_MYINFO_REQ_PAK";
import { BASE_SERVER_LIST_PAK } from "../auth-packet-from-server/BASE_SERVER_LIST_PAK";
import { BASE_SERVER_LIST_REQ_PAK } from "../auth-packet-from-client/BASE_SERVER_LIST_REQ_PAK";
import { BASE_USER_ENTER_REQ_PAK } from "../auth-packet-from-client/BASE_USER_ENTER_REQ_PAK";
import { BASE_XINGCODE_REQ_PAK } from "../auth-packet-from-client/BASE_XINGCODE_REQ_PAK";
import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { PacketOpcodeClient } from "../../enum/PacketOpcodeClient";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";

type TypePacketFrom = "client" | "server";

class AuthPacket{
    declare public packetFrom: TypePacketFrom;
    declare public connection: Connection;
    public listPacket: Map<number, Packet> = new Map();
    private _counter: number = 0;
    private static _ServerInstance: AuthPacket;
    private static _ClientInstance: AuthPacket;

    private constructor(packetFrom: TypePacketFrom, connection: Connection = null){
        this.packetFrom = packetFrom;
        if(connection) {
            this.connection = connection;
        }
    }

    static getInstance(packetFrom: TypePacketFrom, connection: Connection = null): AuthPacket{
        if(packetFrom == "server"){
            if (!AuthPacket._ServerInstance){
                AuthPacket._ServerInstance = new AuthPacket(packetFrom, connection);
            }
            return AuthPacket._ServerInstance;
        } else {
            if (!AuthPacket._ClientInstance){
                AuthPacket._ClientInstance = new AuthPacket(packetFrom, connection);
            }
            return AuthPacket._ClientInstance;
        }
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
            console.log("packet received opcode: " + opcode);
            
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
                case PacketOpcodeClient.BASE_SERVER_LIST_REQ_PAK: 
                    packet = new BASE_SERVER_LIST_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(opcode, packet);
                    break;
                case PacketOpcodeClient.BASE_USER_ENTER_REQ_PAK:
                    packet = new BASE_USER_ENTER_REQ_PAK(opcode, data);
                    this.setPacket(opcode, packet);
                    break;
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
                    
                default:
                    this.connection.socket.end(()=>{
                        console.log("[Error] Packet not found with opcode:" + opcode);
                    })
                    break;
            }
        }
        if(packet == null){}
        return packet;
    }

    setPacket(opcode, packet: Packet){
        this.listPacket.set(opcode, packet);
    }

}

export {AuthPacket}