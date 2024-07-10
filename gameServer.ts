import { AccountManager } from "./manager/accountManager";
import { ClientManager } from "./manager/clientManager";
import { Convert } from "./util/convert";
import { Database } from "./util/database";
import { DatabaseSetting } from "./config/databaseSetting";
import { GameClient } from "./game/gameClient";
import { GameSettingServer } from "./config/gameSettingServer";
import { Log } from "./util/log";
import { MapModeIni } from "./data/loader/mapModeIni";
import { MapsXML } from "./data/loader/mapsXML";
import { MissionPb } from "./data/loader/missionPb";
import { Server } from "./network/server";
import { decrypt } from "./util/decrypt";
import net from "net";

export class GameServer extends Server{
    constructor(port: number, ip: string) {
        super("game");
        this.load();
        // this.port = GameSettingServer.serverPort;
        // this.ip = GameSettingServer.serverIp;
        this.port = port;
        this.ip = ip;
        this.createServer();
    }

    createServer() {
        this.server = net.createServer((socket) => {
            socket.on("data", (data) => {
                if (data.length < 4)
                    return Log.getLogger(this.type).error(
                        "Data received was under 4 byte length"
                    );
                let len = data.readUInt16LE();
                if (len > 8908) {
                    len &= 32767;
                }

                //decrypt
                let _client = ClientManager.getClient(
                    "client_ip",
                    socket.remoteAddress
                );

                let client = ClientManager.getClient("approve", _client.connection.sessionId);

                let decryptedData = decrypt(data, client.CRYPT_KEY);

                Log.getLogger(this.type).info(
                    "Data Decrypted \n" + Convert.bufferToString(decryptedData)
                );

                client.receivePacket(decryptedData);
            });

            socket.on("connect", (connect) => {
                console.log("connect");
            });
            socket.on("close", (close) => {
                const connection = ClientManager.getClient(
                    "client_ip",
                    socket.remoteAddress
                ).connection;
                const id = connection.sessionId;

                //if the player switch the server, then dont delete the socket
                if(connection.player.changeServer){
                    connection.player.changeServer = false;
                } else {
                    if (
                        !ClientManager.deleteClient(
                            "client_ip",
                            socket.remoteAddress
                        ) ||
                        !ClientManager.deleteClient("approve", id)
                    ) {
                        Log.getLogger(this.type).error(
                            `The Connection closed but the instance can't be deleted or not exist (session Id: ${id} ) `
                        );
                    }
                }

                if (connection.account) {
                    connection.account.offline().then(
                        (success) => {
                            Log.getLogger(this.type).info(
                                "The Connection sucessfuly closed"
                            );
                        },
                        (err) => {
                            Log.getLogger(this.type).error(
                                "The Connection closed but the Database can't be updated"
                            );
                        }
                    );
                }
            });

            socket.on("connectionAttempt", (stream) => {
                console.log("trying to connect!");
            });

            socket.on("error", (err) => {
                console.log(err);
            });
        });

        this.server.on("connection", (socket) => {
            this.addSocket(socket);
        });
    }

    load() {
        /**
         * load game.ini
         */
        GameSettingServer.load();
        /**
         * load maps
         */
        MapsXML.load();

        /**
         * load default maps
         */
        MapModeIni.load();

        /**
         * load missions
         */
        MissionPb.load();

        /**
         * load database setting
         */
        DatabaseSetting.load();
        Database.getInstance();
    }

    addSocket(socket: net.Socket) {
        let authClient = ClientManager.getClient("client_ip", socket.remoteAddress);

        if(authClient){
            let sessionId = authClient.connection.sessionId;

            let gameClient = new GameClient(socket, sessionId, authClient.connection.player, authClient.connection.account);
            Log.getLogger(this.type).info(
                `The Connection is succesfully established! (session Id: ${sessionId} )`
            );

            ClientManager.approveClient(authClient.connection.sessionId, gameClient);
        } else {
            Log.getLogger(this.type).error(
                `authClient not found in ip: ${socket.remoteAddress}`
            );
        }
    }
}