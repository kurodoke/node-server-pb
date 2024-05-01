import { Packet } from "../../network/packet";

export class BASE_ENTER_SERVER_PAK extends Packet{
    constructor(opcode: number){
        super("write", opcode);
    }

    write(): void {
        this.writeD(0);
    }
}