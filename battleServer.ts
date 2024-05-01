import { AuthClient } from "./auth/authClient";
import { BattleSettingServer } from "./config/battleSettingServer";
import { ClientManager } from "./manager/clientManager";
import { Convert } from "./util/convert";
import { Database } from "./util/database";
import { DatabaseSetting } from "./config/databaseSetting";
import { Log } from "./util/log";
import { Server } from "./network/server";
import { decrypt } from "./util/decrypt";
import net from "net";

export class BattleServer extends Server{
    constructor() {
        super("battle");
        this.load();
        this.port = BattleSettingServer.udpPort;
        this.ip = BattleSettingServer.serverIp;
        this.createServer();
    }

    load() {
        BattleSettingServer.load();

        /**
         * load database setting
         */
        DatabaseSetting.load();
        Database.getInstance();
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
                let client = ClientManager.getClient(
                    "client_ip",
                    socket.remoteAddress
                );

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

                if (
                    !ClientManager.deleteClient(
                        "client_ip",
                        socket.remoteAddress
                    ) ||
                    !ClientManager.deleteClient("queue", id)
                ) {
                    Log.getLogger(this.type).error(
                        `The Connection closed but the instance can't be deleted or not exist (session Id: ${id} ) `
                    );
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

    addSocket(socket: net.Socket) {
        let sessionId = 0;
        while (true) {
            if (sessionId >= 100000) {
                break;
            }
            sessionId = sessionId + 1;
            if (!ClientManager.getClient("queue", sessionId)) {
                Log.getLogger(this.type).info(
                    `The Connection is succesfully established! (session Id: ${sessionId} )`
                );
                let client = new AuthClient(socket, sessionId);
                if (
                    !ClientManager.setClient("queue", client) ||
                    !ClientManager.setClient("client_ip", client)
                ) {
                    Log.getLogger(this.type).error(
                        "Error occurred to set the client on client manager"
                    );
                    socket.end(() => {
                        Log.getLogger(this.type).warn(
                            `Trying to close (session Id: ${sessionId} )`
                        );
                    });
                }
                return;
            }
        }
    }
}