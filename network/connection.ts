import { Account } from "../model/account";
import { Packet } from "./packet";
import { Player } from "../model/player";
import net from "net";

type Opcode = number;

class Connection{
    public account: Account = null;
    public player: Player = null;
    declare public sessionId: number;
    declare public socket: net.Socket;
    public packets: Map<Opcode, Packet> = new Map();

    constructor(socket: net.Socket, sessionId: number) {
        this.socket = socket;
        this.sessionId = sessionId;
    }
}

export {Connection};