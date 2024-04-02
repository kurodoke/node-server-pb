import net from 'net';
import { Convert } from "../util/convert";
import { Player } from "./player";
import { Connection } from '../core-network/connection';
import randomInt from '../util/random';
import { Packet } from '../core-network/packet';
import { AuthPacket } from './auth-protocol/authPacket';

class AuthClient {
    player: Player;
    SECURITY_KEY = 29890;
    CRYPT_KEY: number;
    sessionSeed: number;
    cryptSeed: number;
    connection: Connection;

    constructor(socket: net.Socket, sessionId: number) {
        this.connection = new Connection(socket, sessionId);
        this.CRYPT_KEY = ((this.connection.sessionId + this.SECURITY_KEY) % 7) + 1;
        this.sessionSeed = Convert.intToUint16LE(randomInt(0, 32767)); // max short value
        this.cryptSeed = this.sessionSeed;

        this.init();
    }


    start() {
    }

    init() {
        const opcode = 2049;// BASE_SERVER_LIST
        const packet = AuthPacket.getInstance("server", this.connection).getPACKET(opcode); //add connection as for initialization on instance
        if (!packet){
            return;
        }
        this.sendPacket(packet);
    }

    /**
     * method to find the packet opcode after receiving data and decrypt packet.
     * @param data buffer
     */
    receivePacket(data: Buffer){

        const opcode = data.readInt16LE(2); //2 byte to skip the length byte
        const packet = AuthPacket.getInstance("client", this.connection).getPACKET(opcode, data); //get process packet by opcode
        if (!packet){
            return;
        }
        packet.offset = packet.offset + 4;
        this.readPacket(packet);
    }

    sendPacket(packetToSend: Packet) {
        packetToSend.buf = Buffer.alloc(0);

        packetToSend.writeH(packetToSend.opcode)

        packetToSend.write(); //write packet to buffer

        if (packetToSend.buf.length < 2) return;

        const buf_packetSize = Buffer.alloc(2); //allocate 2 byte 00 00
        buf_packetSize.writeUInt8(packetToSend.buf.length - 2); //fill the byte with size

        const data = Buffer.concat([buf_packetSize, packetToSend.buf]); //combine the packet before with the payload
        
        this.connection.socket.write(data);
        console.log("DATA sent, opcode : " + packetToSend.opcode);
        
    }

    async readPacket(packetToRead: Packet){
        // packetToRead.offset = packetToRead.offset + 2; //skip 2 byte;

        packetToRead.read();

        let packetToRespond = await packetToRead.proc(); // return new packet to send after been read
        // let login_opcode = 2564;
        // packetToRead.opcode = login_opcode;

        packetToRespond.map(packet => {
            this.sendPacket(packet);
        })
    }
}

export {AuthClient}