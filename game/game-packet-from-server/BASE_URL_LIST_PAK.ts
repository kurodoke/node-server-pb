import { Packet } from "../../network/packet";

export class BASE_URL_LIST_PAK extends Packet{
    constructor(opcode: number){
        super("write", opcode);
    }

    write() {
        this.writeC(0);
    }
}