import { Connection } from "../../network/connection";
import { GameServerXML } from "../../data/loader/gameServerXML";
import { Packet } from "../../network/packet";

export class BASE_SERVER_LIST_PAK extends Packet {
    private _connection: Connection;

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

    constructor(opcode: number, connection: Connection) {
        super("write", opcode);
        this._connection = connection;
    }

    write() {
        // this.writeH(AuthOpcodeACK.BASE_GET_SCHANNEL_LIST_ACK);
        this.writeD(this._connection.sessionId);
        this.writeIP(this._connection.socket.remoteAddress);
        this.writeH(29890); //udp port
        this.writeH(32759); //hash
        // this.writeH(this._sessionSeed);

        for (let index = 0; index < 10; index++) {
            this.writeC(1);
        }
        this.writeC(1);
        this.writeD(GameServerXML.gameServerList.length); //server count
        for (const _gs of GameServerXML.gameServerList) {
            this.writeD(_gs.active ? 1 : 0);
            this.writeIP(_gs.ip);
            this.writeH(_gs.port);
            this.writeC(_gs.type);
            this.writeH(_gs.maxPlayers);
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

        // this.writeH(0)
        // this.writeH(0)
        // this.writeH(1)
        // this.writeH(0)
        // this.writeH(0)
        // this.writeH(0)
        // this.writeH(0)
        // this.writeH(0)
        // this.writeH(0)

        this.writeC(0)
        this.writeC(0)
        this.writeC(1)
        this.writeC(0)
        this.writeC(0)
        this.writeC(0)
        this.writeC(0)
        this.writeC(0)
        this.writeC(0)

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