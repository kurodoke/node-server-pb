import { AuthClient } from "../auth/authClient";
import { Client } from "../network/client";
import { GameClient } from "../game/gameClient";
import { Socket } from "net";

type typeClient = "queue" | "client_ip" | "approve";

export class ClientManager {
    public static queue: Map<number, AuthClient> = new Map(); 
    public static client_ByIP: Map<string, Client> = new Map();
    public static approved: Map<number, GameClient> = new Map();

    static getClient(type: typeClient, key: number | string): Client {
        let c = ClientManager;
        if (typeof key == "number" && type == "queue") {
            return c.queue.get(key);
        } 
        else if (typeof key == "number" && type == "approve") {
            return c.approved.get(key);
        }
        else if (typeof key == "string" && type == "client_ip") {
            return c.client_ByIP.get(key);
        }
        return null;
    }

    static setClient(
        type: typeClient,
        client: Client | AuthClient | GameClient,
        value: number | string = null
    ): boolean {
        let c = ClientManager;
        try {
            if (type == "queue" && client instanceof AuthClient ) {
                c.queue.set(
                    value && typeof value == "number" 
                        ? value
                        : client.connection.sessionId,
                    client
                );
            }

            if (type == "approve" && client instanceof GameClient ) {
                c.approved.set(
                    value && typeof value == "number" 
                        ? value
                        : client.connection.sessionId,
                    client
                );
            }

            if (type == "client_ip" && client instanceof Client) {
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

    static approveClient(sessionId: number, gameClient: GameClient){
        this.approved.set(sessionId, gameClient);

        this.queue.delete(sessionId);
    }
}
