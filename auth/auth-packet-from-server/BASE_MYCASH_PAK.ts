import { Packet } from "../../core-network/packet";

class BASE_MYCASH_PAK extends Packet{
    cash: number;
    point: number;

    constructor(opcode: number, cash: number, point: number ){
        super("write", opcode)
    }

    write() {
        this.writeD(0);
        this.writeD(this.point);
        this.writeD(this.cash);
    }

}

export {BASE_MYCASH_PAK};