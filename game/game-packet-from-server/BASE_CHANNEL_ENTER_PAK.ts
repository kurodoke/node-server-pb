import { Channel } from '../../model/channel';
import { Packet } from "../../network/packet";

export class BASE_CHANNEL_ENTER_PAK extends Packet{
    declare status: number;
    declare channel: Channel;

    constructor(opcode: number, channel: Channel, status: number){
        super("write", opcode);
        this.channel = channel;
        this.status = status;
    }

    write() {
        if(this.status == 0 && this.channel != null){
            this.writeD(this.channel.id);
            this.writeH(this.channel.announce.length);
            this.writeS(this.channel.announce);
        } else {
            this.writeD(this.status);
        }

    }
}