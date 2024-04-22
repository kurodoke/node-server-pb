import { AuthClient } from "./auth/authClient";
import { AuthSettingServer } from "./config/authSettingServer";
import { ClientManager } from "./manager/clientManager";
import { Convert } from "./util/convert";
import { Log } from "./util/log";
import { MapModeIni } from "./data/loader/mapModeIni";
import { MapsXML } from "./data/loader/mapsXML";
import { MissionPb } from "./data/loader/missionPb";
import { decrypt } from "./util/decrypt";
import net from "net";
import { parentPort } from "worker_threads";
import winston from "winston";

class AuthServer {
    private _port: number;
    private _ip: string;
    private _server: net.Server;
    public logger: winston.Logger;

    constructor() {
        /**
         * load everything the server need before to create one
         */
        this.load();

        this._port = AuthSettingServer.serverPort;
        this._ip = AuthSettingServer.serverIp;
        this.logger = Log.getLogger("auth");


        this._server = net.createServer((socket) => {
            socket.on("data", (data) => {
                if (data.length < 4)
                    return this.logger.error(
                        "Data received was under 4 byte length"
                    );
                let len = data.readUInt16LE();
                if (len > 8908) {
                    len &= 32767;
                }

                //decrypt
                let client = ClientManager.getClient(
                    "client_ip",
                    socket.remoteAddress
                );

                let decryptedData = decrypt(data, client.CRYPT_KEY);

                this.logger.debug(
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

                if (
                    !ClientManager.deleteClient(
                        "client_ip",
                        socket.remoteAddress
                    ) ||
                    !ClientManager.deleteClient("queue", id)
                ) {
                    this.logger.error(
                        `The Connection closed but the instance can't be deleted or not exist (session Id: ${id} ) `
                    );
                }

                if (connection.account) {
                    connection.account.offline().then(
                        (success) => {
                            this.logger.info(
                                "The Connection sucessfuly closed"
                            );
                        },
                        (err) => {
                            this.logger.error(
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

        this._server.on("connection", (socket) => {
            this.addSocket(socket);
        });
    }

    load() {
        /**
         * load auth.ini
         */
        AuthSettingServer.load();
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
    }

    addSocket(socket: net.Socket): void {
        let sessionId = 0;
        while (true) {
            if (sessionId >= 100000) {
                break;
            }
            sessionId = sessionId + 1;
            if (!ClientManager.getClient("queue", sessionId)) {
                this.logger.info(
                    `The Connection is succesfully established! (session Id: ${sessionId} )`
                );
                let client = new AuthClient(socket, sessionId);
                if (
                    !ClientManager.setClient("queue", client) ||
                    !ClientManager.setClient("client_ip", client)
                ) {
                    this.logger.error(
                        "Error occurred to set the client on client manager"
                    );
                    socket.end(() => {
                        this.logger.warn(
                            `Trying to close (session Id: ${sessionId} )`
                        );
                    });
                }
                return;
            }
        }
    }

    public start() {
        try {
            this._server.listen(this._port, this._ip, 5, () => {
                this.logger.info(`AuthServer started on port ${this._port}`);
                parentPort.postMessage({port: this._port});
            });
        } catch (err) {
            this.logger.error(err);
        }
    }
}

new AuthServer().start(); //start the server
