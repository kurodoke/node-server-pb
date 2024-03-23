import net from "net";
import { LoginClient } from "./auth/loginClient";
import { decrypt } from "./core-util/decrypt";

class Server {
    private PORT: number = 39190;
    private _server: net.Server;
    private buf: Buffer;
    public _listClient: Map<number, net.Socket> = new Map();
    public listClient: Map<string, LoginClient> = new Map();

    constructor(){
        this._server = net.createServer((socket) => {
            socket.on("data", (data) => {
                if (data.length < 4 ) return console.error('error: on not enough data (4)');
                let len = data.readUInt16LE();
                if (len > 8908){
				    len &= 32767;
                }
                //decrypt
                let lc = this.listClient.get(socket.remoteAddress);

                let decryptedData = decrypt(data, lc.CRYPT_KEY);

                console.log(decryptedData);
                
            });
        
            socket.on("connect", (connect) => {
                console.log("connect");
            });
            socket.on("close", (close) => {
                console.log("close");
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
    
    addSocket(socket: net.Socket){
        let sessionId = 1;
        while (true) {
            if (sessionId >= 100000) {
                break;
            }
            
            sessionId = sessionId + 1;
            if (!this._listClient.has(sessionId)) {
                console.log("someone connected! session Id: " + sessionId);
                this._listClient.set(sessionId, socket);
                let lc = new LoginClient(socket, sessionId).start();
                this.listClient.set(socket.remoteAddress, lc);
                return;
            }
        }
    }

    start() {
        try {
            this._server.listen(this.PORT, "127.0.0.1", 5, () => {
                console.log(`Server started on port ${this.PORT}`);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

new Server().start(); //start the server
