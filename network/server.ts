import { Log } from '../util/log';
import net from 'net';

export type ServerType = "auth" | "game" | "battle";

export class Server{
    public port: number;
    public ip: string;
    public server: net.Server;
    public type: ServerType;

    constructor(type: ServerType){
        this.type = type;
    }

    createServer(){}
    addSocket(socket: net.Socket){}
    start(){
        try {
            this.server.listen(this.port, this.ip, 5, async () => {
                Log.getLogger(this.type).info(`${this.type.toUpperCase()} - Server started on port ${this.port}`);
            });
        } catch (err) {
            Log.getLogger(this.type).error(err);
        }
    }
}
