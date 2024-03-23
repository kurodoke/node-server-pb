import { SendPacket } from "../../core-network/sendPacket";
import { AuthOpcodeACK } from "../auth-protocol/auth-opcode-ACK";

class BASE_SERVER_LIST_PAK extends SendPacket {
    _sessionId;
    _sessionSeed;
    _ip;

    testServer = [
        {
            state: 1,
            type: 1,
            ip: "127.0.0.1",
            port: 39190,
            sync_port: "1908",
            max_players: 100,
        },
        {
            state: 1,
            type: 1,
            ip: "127.0.0.1",
            port: 39191,
            sync_port: "1909",
            max_players: 100,
        },
    ];

    constructor(LoginClient) {
        super();
        this._sessionId = LoginClient.sessionId;
        this._sessionSeed = LoginClient.sessionSeed;
        this._ip = LoginClient.socket.remoteAddress;
    }

    write() {
        this.writeH(AuthOpcodeACK.BASE_GET_SCHANNEL_LIST_ACK);
        this.writeD(this._sessionId);
        this.writeIP(this._ip);
        this.writeH(29890); //udp port
        this.writeH(32759); //hash
        // this.writeH_u(this._sessionSeed);

        for (let index = 0; index < 10; index++) {
            this.writeC(1);
        }
        this.writeC(1);
        this.writeD(this.testServer.length); //server count
        for (let index = 0; index < this.testServer.length; index++) {
            let server = this.testServer[index];
            this.writeD(server.state);
            this.writeIP(server.ip);
            this.writeH_u(server.port);
            this.writeC(server.type);
            this.writeH_u(server.max_players);
            this.writeD(0);//D ?10 ?0
        }
        //network util
        // this.writeH(1);
        // this.writeH(300);
        // this.writeD(200);
        // this.writeD(100);

        // this.writeC(1);
        // this.writeD(1);
        // this.writeD(100);
        // this.writeD(150);

        // this.writeH_u(0)
        this.writeH_u(0)
        this.writeH_u(1)
        this.writeH_u(0)
        this.writeH_u(0)
        this.writeH_u(0)
        this.writeH_u(0)
        this.writeH_u(0)
        this.writeH_u(0)

        // separate the packet
        // this.writeEN()
        // this.writeEN()
        // this.writeEN()
        // this.writeEN()

        // this.writeC(204)
        // this.writeC(204)
        // this.writeC(204)
        // this.writeC(204)
    }
}

export {BASE_SERVER_LIST_PAK}