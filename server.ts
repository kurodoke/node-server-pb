import { Server, ServerType } from "./network/server";

import { AuthServer } from "./authServer";
import { BattleServer } from "./battleServer";
import { GameServer } from "./gameServer";
import { GameServerXML } from "./data/loader/gameServerXML";

class MainServer {
    public servers: Array<Server> = new Array(); 

    constructor(){
        this.load();

        this.servers.push(new AuthServer());
        this.servers.push(new BattleServer());

        GameServerXML.gameServerList.forEach((gs) => {
            if(gs.active) this.servers.push(new GameServer(gs.port, gs.ip));
        });
    }

    load(){
        GameServerXML.load();
    };

    start(){
        this.servers.forEach((server) => {
            server.start();
        });
    }
}

new MainServer().start();