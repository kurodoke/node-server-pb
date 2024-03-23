import net from "net";
import { LoginClient } from "./login-client";

const _listClient = new Map();

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        let buf = Buffer.from(data);
        console.log("\ndata:");
        console.log(buf);
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

server.on("connection", (socket) => {
    addSocket(socket);
});

function addSocket(socket){
    let sessionId = 1;
    while (true) {
        if (sessionId >= 100000) {
            break;
        }
        sessionId = sessionId + 1;
        if (!_listClient.has(sessionId)) {
            console.log("someone connected! session Id: " + sessionId);
            _listClient.set(sessionId, socket);
            let lc = new LoginClient(socket, sessionId).start();
            return;
        }
    }
}

class Socket {
    private PORT = 39190;

    start() {
        try {
            server.listen(this.PORT, "127.0.0.1", 5, () => {
                console.log(`Server started on port ${this.PORT}`);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export { Socket };
