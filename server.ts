import net from "net";
import { decrypt } from "./util/decrypt";
import { AuthClient } from "./auth/authClient";
import { Database } from "./util/database";
import { ClientManager } from "./manager/clientManager";
import { AuthSettingServer } from "./config/authSettingServer";
import { MapsXML } from "./data/loader/mapsXML";



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
                if (data.length < 4 ) return console.error('error: on not enough data (4)');
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
                    console.log("closed but not deleted");
                }

                connection.account.offline().then((success) => {
                    console.log("close");
                }, (err) => {
                    console.log("closed but db not updated");
                })
                
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
        AuthSettingServer.load()


        /**
         * load maps
         */
        MapsXML.load();
        

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
                console.log("someone connected! session Id: " + sessionId);
                let client = new AuthClient(socket, sessionId);
                if(!ClientManager.setClient("queue", client) || !ClientManager.setClient("client_ip", client)) {
                    console.log("error on set client on client manager");
                }
                return;
            }
        }
    }

    start() {
        try {
            this._server.listen(this._PORT, "127.0.0.1", 5, () => {
                console.log(`Server started on port ${this._PORT}`);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

new Server().start(); //start the server
