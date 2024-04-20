import { Packet } from "../../network/packet";

export class BASE_MYCASH_PAK extends Packet{
    cash: number;
    point: number;

    constructor(opcode: number, cash: number, point: number ){
        super("write", opcode);
        this.cash = cash;
        this.point = point;
    }

    write() {
        this.writeD(0);
        this.writeD(this.point);
        this.writeD(this.cash);
    }

}