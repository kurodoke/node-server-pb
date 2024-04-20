import { AuthClient } from "../auth/authClient";
import { Socket } from "net";

type typeClient = "queue" | "client_ip";

export class ClientManager {
    public static queue: Map<number, AuthClient> = new Map();
    public static client_ByIP: Map<string, AuthClient> = new Map();

    static getClient(type: typeClient, key: number | string): AuthClient {
        let c = ClientManager;
        if (typeof key == "number" && type == "queue") {
            return c.queue.get(key);
        } else if (typeof key == "string" && type == "client_ip") {
            return c.client_ByIP.get(key);
        }
        return null;
    }

    static setClient(
        type: typeClient,
        client: AuthClient,
        value: number | string = null
    ): boolean {
        let c = ClientManager;
        try {
            if (type == "queue") {
                c.queue.set(
                    value && typeof value == "number"
                        ? value
                        : client.connection.sessionId,
                    client
                );
            }
            if (type == "client_ip") {
                c.client_ByIP.set(
                    value && typeof value == "string"
                        ? value
                        : client.connection.socket.remoteAddress,
                    client
                );
            }
            return true;
        } catch (err) {
            return false;
        }
    }

    static deleteClient(type: typeClient, key: number | string): boolean {
        let c = ClientManager;
        if (typeof key == "number" && type == "queue") {
            return c.queue.delete(key);
        } else if (typeof key == "string" && type == "client_ip") {
            return c.client_ByIP.delete(key);
        }
        return false;
    }
}
