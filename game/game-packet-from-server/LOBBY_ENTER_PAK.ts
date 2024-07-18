import { Connection } from "../../network/connection";
import { GameServerXML } from "../../data/loader/gameServerXML";
import { Packet } from "../../network/packet";

export class LOBBY_ENTER_PAK extends Packet{
    declare data: number;

    constructor(opcode: number, data: number){
        super("write", opcode);
        this.data = data;
    }

    write() {
        this.writeD(this.data);
        this.writeD(1);
        this.writeD(0);
        this.writeC(0);
        this.writeD(0);
    }
}