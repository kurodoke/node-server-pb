import { AuthClient } from "./authClient"

class ClientManager{
    private static instance: ClientManager;
    public queue: Map<number, AuthClient> = new Map();
    public client_ByIP: Map<string, AuthClient>= new Map();

    static getInstance(): ClientManager{
        if (!ClientManager.instance){
            ClientManager.instance = new ClientManager();
        }
        return ClientManager.instance;
       
    }

}

export {ClientManager}