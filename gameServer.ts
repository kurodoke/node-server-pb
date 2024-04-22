import { GameSettingServer } from "./config/gameSettingServer";
import { Log } from "./util/log";
import net from "net";
import { parentPort } from "worker_threads";
import winston from "winston";

class GameServer {
    public server: net.Server;
    private _port: number;
    private _ip: string;
    public logger: winston.Logger;

    constructor() {
        this.load();

        this._port = GameSettingServer.serverPort;
        this._ip = GameSettingServer.serverIp;

        this.logger = Log.getLogger("game");

        this.server = net.createServer((Socket) => {});
    }

    private load() {
        GameSettingServer.load();
    }

    public start() {
        try {
            this.server.listen(this._port, this._ip, 5, () => {
                this.logger.info(`GameServer started on port ${this._port}`);
                parentPort.postMessage({ port: this._port });
            });
        } catch (err) {
            this.logger.error(err);
        }
    }
}

new GameServer().start();
