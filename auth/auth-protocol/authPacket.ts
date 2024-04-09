import { Connection } from "../../network/connection";
import { Packet } from "../../network/packet";
import { BASE_SERVER_LIST_PAK } from "../auth-packet-from-server/BASE_SERVER_LIST_PAK";
import { BASE_LOGIN_REQ_PAK } from "../auth-packet-from-client/BASE_LOGIN_REQ_PAK";
import { BASE_XINGCODE_REQ_PAK } from "../auth-packet-from-client/BASE_XINGCODE_REQ_PAK";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { Player } from '../../model/player';

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
                    this.setPacket(packet);
                    break;
            
                default:
                    break;
            }
        }
        if (this.packetFrom == "client" && data){
            switch(opcode){
                case 2561:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(packet);
                    break;
                case 2563:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(packet);
                    break;
                case 2572:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(packet);
                    break;
                case 2573:
                    packet = new BASE_LOGIN_REQ_PAK(opcode, data, this.connection);
                    this.setPacket(packet);
                    break;
                case 2582:
                    packet = new BASE_XINGCODE_REQ_PAK(opcode, data);
                    this.setPacket(packet);
                    break;
                case 2584:
                    packet = new BASE_XINGCODE_REQ_PAK(opcode, data);
                    this.setPacket(packet);
                    break;
                default:
                    break;
            }
        }
        if(packet == null){
            this.connection.socket.end(()=>{
                console.log("[Error] Packet not found with opcode:" + opcode);
            })

        }
        return packet;
    }

    setPacket(packet: Packet){
        this.listPacket.set(this._counter + 1, packet);
    }

}

export {AuthPacket}