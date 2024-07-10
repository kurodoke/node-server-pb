import { Connection } from "../../network/connection";
import { MessageClanEnum } from "../../enum/MessageClanEnum";
import { MessageTypeEnum } from "../../enum/MessageTypeEnum";
import { Packet } from "../../network/packet";
import { Player } from "../../model/player";

export class BASE_USER_INBOX_PAK extends Packet{
    player: Player;
    page: number

    constructor(opcode: number, connection: Connection, page: number){
        super("write", opcode);
        this.player = connection.player;
        this.page = page;
    }

    write(){
        this.writeC(this.page);
        this.writeC(this.player.playerInbox.length);
        this.player.playerInbox.forEach(msg => {
            this.writeD(msg.object);
            this.writeD(msg.object);
            this.writeD(0);
            this.writeC(msg.type);
            this.writeC(msg.state);
            this.writeC(msg.days);
            this.writeD(msg.clanId != null ? msg.clanId : 0);
        });

        this.player.playerInbox.forEach(msg => {
            this.writeC(msg.senderName.length + 1);
            this.writeC(msg.type == MessageTypeEnum.CLAN || msg.type == MessageTypeEnum.WEB ? 0 : msg.text.length + 1);
            this.writeS(msg.senderName, msg.senderName.length + 1);
            
            if(msg.type == MessageTypeEnum.CLAN){
                this.writeC(MessageClanEnum.REQUEST_REFUSED);
                this.writeC(MessageClanEnum.REQUEST_APPROVED);
                this.writeC(MessageClanEnum.INVITATION);
            }

            if(msg.type == MessageTypeEnum.WEB){
                this.writeC(msg.senderName.length + 1);
				this.writeC(msg.receive + 1);
				this.writeS(msg.senderName, msg.senderName.length);
            } else {
                this.writeS(msg.text, msg.text.length + 1);
            }
        })
    }
}