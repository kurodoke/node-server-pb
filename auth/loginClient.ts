import { SendPacket } from "../core-network/sendPacket";
import { Convert } from "../core-util/convert";
import { BASE_SERVER_LIST_PAK } from "./auth-network_auth_SERVER/BASE_SERVER_LIST_PAK";


class LoginClient {
    sessionId;
    socket;
    player;
    SECURITY_KEY = 29890;
    CRYPT_KEY;
    sessionSeed;
    cryptSeed;

    constructor(socket, sessionId) {
        this.socket = socket;
        this.sessionId = sessionId;
    }

    randomInt(start, end) {
        if (start > end) {
            [start, end] = [end, start];
        }

        const range = end - start + 1;

        return Math.floor(Math.random() * range) + start;
    }

    start() {
        this.CRYPT_KEY = ((this.sessionId + this.SECURITY_KEY) % 7) + 1;
        this.sessionSeed = Convert.intToUint16LE(this.randomInt(0, 32767)); // max short value
        this.cryptSeed = this.sessionSeed;
        // new Thread(init).Start();
        // new Thread(read).Start();
        // new Thread(ConnectionCheck).Start();
        // ConnectDate = DateTime.Now;
        this.init();
        return this;
    }

    init() {
        this.sendPacket(new BASE_SERVER_LIST_PAK(this));
    }

    sendPacket(SendPacket: SendPacket) {
        SendPacket.write();
        if (SendPacket.buf.length < 2) return;
        let buf_packetSize = Buffer.alloc(2);
        buf_packetSize.writeUInt8(SendPacket.buf.length - 2
            // Convert.intToUint16LE(SendPacket.buf.length - 4)
        ); // -4

        let data = Buffer.concat([buf_packetSize, SendPacket.buf]);
        // add 4 cc(204) to wrap the packet


        if (data.length > 0) {
            console.log("send data: ", data);
            this.socket.write(data);
        } else {
            console.log("error data: ", data);
        }
    }

    readP
}



export { LoginClient };
