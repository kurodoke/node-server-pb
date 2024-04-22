import { BattleSettingServer } from "./config/battleSettingServer";
import { GameSettingServer } from "./config/gameSettingServer";
import { Log } from "./util/log";
import net from "net";
import { parentPort } from "worker_threads";
import winston from "winston";

class BattleServer {
    public server: net.Server;
    private _port: number;
    private _ip: string;
    public logger: winston.Logger;

    constructor() {
        this.load();

        this._port = BattleSettingServer.udpPort;
        this._ip = BattleSettingServer.serverIp;

        this.logger = Log.getLogger("battle");

        this.server = net.createServer((Socket) => {});
    }

    private load() {
        BattleSettingServer.load();
    }

    public start() {
        try {
            this.server.listen(this._port, this._ip, 5, () => {
                this.logger.info(`BattleServer started on port ${this._port}`);
                parentPort.postMessage({ port: this._port });
            });
        } catch (err) {
            this.logger.error(err);
        }
    }
}

new BattleServer().start();
