import { Packet } from "../../core-network/packet";
import { BASE_XINGCODE } from "../auth-packet-from-server/BASE_XINGCODE";

class BASE_XINGCODE_REQ_PAK extends Packet{
    bytes: Uint8Array;
    
    constructor(opcode: number, data: Buffer){
        super("read", opcode, data);
    }

    read(): void {
        this.readBs(this.buf.length - 4);
    }

    async proc() {
        return new BASE_XINGCODE(2583);
    }
}

export {BASE_XINGCODE_REQ_PAK}