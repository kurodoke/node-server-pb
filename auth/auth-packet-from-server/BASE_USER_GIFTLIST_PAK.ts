import { DateTime } from "../../util/dateTime";
import { Packet } from "../../network/packet";

export class BASE_USER_GIFTLIST_PAK extends Packet{
    constructor(opcode: number){
        super("write", opcode);
    }

    write(): void {
        let date = new DateTime().getDate();
        this.writeD(date);
        this.writeD(0);
        this.writeD(0);
        this.writeD(1);
        this.writeD(0);
    }
}