import net from "net";
import { Player } from "../model/player";
import { Account } from "../model/account";

class Connection{
    public account: Account = null;
    public player: Player = null;
    declare public sessionId: number;
    declare public socket: net.Socket;

    constructor(socket: net.Socket, sessionId: number) {
        this.socket = socket;
        this.sessionId = sessionId;
    }
}

export {Connection};