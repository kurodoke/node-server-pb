import net from "net";
import { decrypt } from "./util/decrypt";
import { AuthClient } from "./auth/authClient";
import { Database } from "./util/database";
import { ClientManager } from "./manager/clientManager";
import { AuthSettingServer } from "./config/authSettingServer";
import { MapsXML } from "./data/loader/mapsXML";
import { MissionPb } from "./data/loader/missionPb";



class Server {
    private _PORT: number = 39190;
    private _server: net.Server;
    private DB: Database;

    constructor(){ 
        /**
         * load everything the server need before to create one
         */
        this.load();

        this._server = net.createServer((socket) => {
            socket.on("data", (data) => {
                if (data.length < 4 ) return console.log('[Error] Data received was under 4 byte length');
                let len = data.readUInt16LE();
                if (len > 8908){
				    len &= 32767;
                }

                //decrypt
                let client = ClientManager.getClient("client_ip", socket.remoteAddress);

                let decryptedData = decrypt(data, client.CRYPT_KEY);

                console.log(decryptedData);

                client.receivePacket(decryptedData);
            });
        
            socket.on("connect", (connect) => {
                console.log("connect");
            });
            socket.on("close", (close) => {
                const connection = ClientManager.getClient("client_ip", socket.remoteAddress).connection;
                const id = connection.sessionId;

                if (!ClientManager.deleteClient("client_ip", socket.remoteAddress) || !ClientManager.deleteClient("queue", id)){
                    console.log("[Error] The Connection closed but the instance can't be deleted or not exist (session Id: " + id + ")");
                }

                if(connection.account){
                    connection.account.offline().then((success) => {
                        console.log("[Info] The Connection sucessfuly closed");
                    }, (err) => {
                        console.log("[Error] The Connection closed but the Database can't be updated");
                    })
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

    load(){
        /**
         * config the server
         */
        AuthSettingServer.load();


        /**
         * load maps
         */
        MapsXML.load();

        /**
         * load missions
         */
        MissionPb.load();

        this.DB = Database.getInstance();
    }

    addSocket(socket: net.Socket): void{
        let sessionId = 0;
        while (true) {
            if (sessionId >= 100000) {
                break;
            }            
            sessionId = sessionId + 1;
            if (!ClientManager.getClient("queue", sessionId)) {
                console.log("[Info] The Connection is succesfully established! (session Id: " + sessionId + ")");
                let client = new AuthClient(socket, sessionId);
                if(!ClientManager.setClient("queue", client) || !ClientManager.setClient("client_ip", client)) {
                    console.log("[Error] Error occurred to set the client on client manager");
                    socket.end(() => {
                        console.log("[Warn] Trying to close (session Id: " + sessionId + ")");
                    })
                }
                return;
            }
        }
    }

    start() {
        try {
            this._server.listen(this._PORT, "127.0.0.1", 5, () => {
                console.log(`[Info] Server started on port ${this._PORT}`);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

new Server().start(); //start the server
