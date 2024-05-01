import { Account } from '../model/account';
import { Client } from '../network/client';
import { Connection } from '../network/connection';
import { Convert } from "../util/convert";
import { GamePacket } from './game-protocol/gamePacket';
import { Log } from '../util/log';
import { Packet } from '../network/packet';
import { PacketOpcodeServer } from '../enum/PacketOpcodeServer';
import { Player } from '../model/player';
import net from 'net';
import randomInt from '../util/random';

export class GameClient extends Client {
    declare serverPacket: GamePacket;
    declare clientPacket: GamePacket;

    constructor(socket: net.Socket, sessionId: number, player: Player, account: Account) {
        super("game");
        this.connection = new Connection(socket, sessionId);
        this.connection.account = account;
        this.connection.player = player;
        this.CRYPT_KEY = ((this.connection.sessionId + this.SECURITY_KEY) % 7) + 1;
        this.sessionSeed = Convert.intToUint16LE(randomInt(0, 32767)); // max short value
        this.cryptSeed = this.sessionSeed;

        this.serverPacket = new GamePacket("server", this.connection);
        this.clientPacket = new GamePacket("client", this.connection);
        
        this.init();
    }


    start() {
    }

    init() {
        const opcode = PacketOpcodeServer.BASE_SERVER_LIST_PAK;
        const packet = this.serverPacket.getPACKET(opcode); //add connection as for initialization on instance
        if (!packet){
            return;
        }
        this.sendPacket(packet);
    }
}