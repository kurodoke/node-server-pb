import { Connection } from "../../core-network/connection";
import { Packet } from "../../core-network/packet";
import { BASE_SERVER_LIST_PAK } from "../auth-packet-from-server/BASE_SERVER_LIST_PAK";
import { BASE_LOGIN_PAK } from "../auth-packet-from-client/BASE_LOGIN_PAK";

type TpacketFrom = "client" | "server";

class AuthPacket{
    public packetFrom: TpacketFrom;
    public connection: Connection;
    public listPacket: Map<number, Packet> = new Map();
    private counter: number = 0;
    private static _ServerInstance: AuthPacket;
    private static _ClientInstance: AuthPacket;

    constructor(packetFrom: TpacketFrom, connection: Connection = null){
        if(packetFrom == "client"){
            
        } else{
        }
        this.packetFrom = packetFrom;
        if(connection) {
            this.connection = connection;
        }
    }

    static getInstance(packetFrom: TpacketFrom, connection: Connection = null): AuthPacket{
        if(packetFrom == "server"){
            if (!AuthPacket._ServerInstance){
                AuthPacket._ServerInstance = new AuthPacket(packetFrom, connection);
            }
            return AuthPacket._ServerInstance;
        } else {
            if (!AuthPacket._ClientInstance){
                AuthPacket._ClientInstance = new AuthPacket(packetFrom);
            }
            return AuthPacket._ClientInstance;
        }
    }

    getPACKET(opcode: number, data: Buffer = null): Packet {
        let packet = null;
        if (this.packetFrom == "server"){
            switch (opcode) {
                case 2049:
                    packet = new BASE_SERVER_LIST_PAK(opcode, this.connection);
                    this.listPacket.set(this.counter + 1, packet);
                    break;
            
                default:
                    break;
            }
        }
        if (this.packetFrom == "client" && data){
            switch(opcode){
                case 2561:
                    packet = new BASE_LOGIN_PAK(opcode, data);
                    this.listPacket.set(this.counter + 1, packet);
                    break;
                case 2563:
                    packet = new BASE_LOGIN_PAK(opcode, data);
                    this.listPacket.set(this.counter + 1, packet);
                    break;
                case 2572:
                    packet = new BASE_LOGIN_PAK(opcode, data);
                    this.listPacket.set(this.counter + 1, packet);
                    break;
                case 2573:
                    packet = new BASE_LOGIN_PAK(opcode, data);
                    this.listPacket.set(this.counter + 1, packet);
                    break;
                default:
                    break;
            }
        }
        if(packet == null){
            this.connection.socket.end(()=>{
                console.error("packet not found");
            })
        }
        return packet;
    }


}

export {AuthPacket}