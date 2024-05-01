import { Packet } from "../../network/packet";

export class GAME_CONNECTION_PAK extends Packet{
    declare success: number;
    
    constructor(opcode: number, success: number){
        super("write", opcode);
        this.success = success;
    }

    write() {
        this.writeD(this.success);
    }
}