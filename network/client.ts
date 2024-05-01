import { Connection } from "./connection";
import { Log } from "../util/log";
import { Packet } from "./packet";
import { PacketProtocol } from "./packetProtocol";
import { ServerType } from "./server";

export class Client {
    SECURITY_KEY = 29890;
    CRYPT_KEY: number;
    sessionSeed: number;
    cryptSeed: number;
    connection: Connection;
    clientPacket: PacketProtocol;
    serverPacket: PacketProtocol;
    type: ServerType;

    constructor(type: ServerType){
        this.type = type;
    }

    /**
     * method to find the packet opcode after receiving data and decrypt packet.
     * @param data buffer
     */
    receivePacket(data: Buffer) {
        
        const opcode = data.readInt16LE(2); //2 first byte is opcode
        const packet = this.clientPacket.getPACKET(opcode, data); //get process packet by opcode
        if (!packet) {
            return;
        }
        packet.offset = packet.offset + 4;
        this.readPacket(packet);
    }
    
    sendPacket(packetToSend: Packet) {
        packetToSend.init().then(() => {
            packetToSend.buf = Buffer.alloc(0);

            packetToSend.writeH(packetToSend.opcode)
    
            packetToSend.write(); //write packet to buffer
    
            if (packetToSend.buf.length < 2) return;
    
            const buf_packetSize = Buffer.alloc(2); //allocate 2 byte 00 00
            buf_packetSize.writeUint16LE(packetToSend.buf.length - 2); //fill the byte with size
    
            const data = Buffer.concat([buf_packetSize, packetToSend.buf]); //combine the packet before with the payload
            
            this.connection.socket.write(data);
            Log.getLogger(this.type).info("Packet sent with opcode : " + packetToSend.opcode);
        });
    }
    
    async readPacket(packetToRead: Packet){
        // packetToRead.offset = packetToRead.offset + 2; //skip 2 byte;

        packetToRead.read();

        let packetToRespond = await packetToRead.proc(); // return new packet to send after been read
        // let login_opcode = 2564;
        // packetToRead.opcode = login_opcode;

        packetToRespond.map(packet => {
            this.sendPacket(packet);
            this.serverPacket.setPacket(packet.opcode, packet);
        })
    }
}
