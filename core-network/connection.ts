import net from "net";

class Connection{
    sessionId: number;
    socket: net.Socket;

    constructor(socket: net.Socket, sessionId: number) {
        this.socket = socket;
        this.sessionId = sessionId;
    }
}

export {Connection};