import { Channel } from "./channel";
import { GameServerEnum } from "../enum/GameServerEnum";

export class GameServerInfo {
    public id: number;
    public maxPlayers: number;
    public channelPlayers: number;
    public port: number;
    public ip: string;
    public active: boolean;
    public password: string;
    public address: string;
    public players: number;
    public type: GameServerEnum = GameServerEnum.S_CHANNEL_TYPE;
    public channelList: Array<Channel> = new Array();

    constructor(
        id: number,
        active: boolean,
        maxPlayers: number,
        channelPlayers,
        type: string,
        ip: string,
        port: number,
        pass: string
    ) {
        this.id = id;   
        this.active = active
        this.maxPlayers = maxPlayers
        this.channelPlayers = channelPlayers
        this.type = GameServerEnum[type];
        this.ip = ip;
        this.port = port;
        this.password = this.password;

    }
}
