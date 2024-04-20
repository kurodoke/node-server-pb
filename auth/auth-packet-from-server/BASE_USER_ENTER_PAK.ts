import { Packet } from "../../network/packet";

export class BASE_USER_ENTER_PAK extends Packet{
    constructor(opcode){
        super("write", opcode);
    }

    write() {
        this.writeD(0);
    }
}