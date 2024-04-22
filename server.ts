import { AuthSettingServer } from "./config/authSettingServer";
import { BattleSettingServer } from "./config/battleSettingServer";
import { Database } from "./util/database";
import { GameSettingServer } from "./config/gameSettingServer";
import { Log } from './util/log';
import { Worker } from "worker_threads";

type Port = number;

interface SettingServer {
    serverIp: string;
    serverPort?: number;
    udpPort?: number;
}

class Server {
    public workers: Map<Port, Worker> = new Map();
    private _stop: boolean = false;

    public start() {
        AuthSettingServer.load();
        GameSettingServer.load();
        BattleSettingServer.load();

        Database.getInstance();

        this.startAuthServer();
        this.startGameServer();
        this.startBattleServer();
    }

    private startAuthServer() {
        const authServer = new Worker("./dist/authServer.js");

        authServer.on("message", (value) => {
            if (value.port && AuthSettingServer.serverPort == value.port) {
                this.workers.set(value.port, authServer);
            } else {
                Log.getLogger("auth").error("Cant set worker to the list");
            }
        });

        authServer.on("error", (err) => {
            Log.getLogger("auth").error(`Error Name: ${err.name} | ${err.message}`);
        })

        authServer.on("exit", (code) => {
            Log.getLogger("auth").info(
                `AuthServer Worker Exit succesfully with Code [${code}]`
            );
            this.workers.delete(AuthSettingServer.serverPort);
        });

        this.waitAllServer(GameSettingServer, 5000, 3, "auth");
    }

    private startGameServer() {
        const gameServer = new Worker("./dist/gameServer.js");

        gameServer.on("message", (value) => {
            if (value.port && GameSettingServer.serverPort == value.port) {
                this.workers.set(value.port, gameServer);
            } else {
                Log.getLogger("game").error("Cant set worker to the list");
            }
        });

        gameServer.on("error", (err) => {
            Log.getLogger("game").error(`Error Name: ${err.name} | ${err.message}`);
        })

        gameServer.on("exit", (code) => {
            Log.getLogger("game").info(
                `GameServer Worker Exit succesfully with Code [${code}]`
            );
            this.workers.delete(GameSettingServer.serverPort);
        });

        this.waitAllServer(BattleSettingServer, 5000, 3, "game");
    }

    private startBattleServer() {
        const battleServer = new Worker("./dist/battleServer.js");

        battleServer.on("message", (value) => {
            if (value.port && BattleSettingServer.udpPort == value.port) {
                this.workers.set(value.port, battleServer);
            } else {
                Log.getLogger("battle").error("Cant set worker to the list");
            }
        });

        battleServer.on("error", (err) => {
            Log.getLogger("battle").error(`Error Name: ${err.name} | ${err.message}`);
        })

        battleServer.on("exit", (code) => {
            Log.getLogger("battle").info(
                `BattleServer Worker Exit succesfully with Code [${code}]`
            );
            this.workers.delete(BattleSettingServer.udpPort);
        });

        this.waitAllServer(
            AuthSettingServer,
            5000,
            3,
            "battle"
        );
    }

    private waitAllServer(
        setting: SettingServer,
        delay: number,
        repetitions: number,
        type: "auth" | "game" | "battle"
    ) {
        let count = 0;
        for (var i = 1; i <= repetitions; i++) {
            setTimeout(() => {
                let b = this.workers.has(
                    setting.serverPort ? setting.serverPort : setting.udpPort
                );
                if (!b) {
                    if (type == "auth") {
                        Log.getLogger(type).warn("Waiting GameServer to up");
                    }
                    if (type == "battle") {
                        Log.getLogger(type).warn(
                            "Waiting AuthServer to up"
                        );
                    }
                    if (type == "game") {
                        Log.getLogger(type).warn("Waiting BattleServer to up");
                    }
                    count ++
                }
            if (!this._stop && count >= 3) {
                Log.getLogger(type).warn(`Trying to stop all Server...`);
                this.workers.forEach((w) =>{
                    w.terminate();
                })
                this._stop = true;
            }
            }, i * delay);
        }
    }
}

new Server().start();
