import { BASE_CHANNEL_ENTER_PAK } from "../game-packet-from-server/BASE_CHANNEL_ENTER_PAK";
import { Channel } from "../../model/channel";
import { ChannelServerEnum } from "../../enum/ChannelServerEnum";
import { Connection } from "../../network/connection";
import { GameServerInfo } from "../../model/gameServer";
import { GameServerXML } from "../../data/loader/gameServerXML";
import { Packet } from "../../network/packet";
import { PacketOpcodeServer } from "../../enum/PacketOpcodeServer";
import { Player } from "../../model/player";

export class BASE_CHANNEL_ENTER_REQ_PAK extends Packet{
    declare player: Player;
    declare channel: Channel;
    declare server: GameServerInfo;
    declare channelId: number;
    

    constructor(opcode: number, data: Buffer, connection: Connection){
        super("read", opcode, data);
        this.player = connection.player;

        this.channelId = data.readInt16LE(6);

        this.server = GameServerXML.getServer(this.player.serverId)
        this.channel = this.server.channelList[this.channelId]
    }

    async proc(){        
        if (this.player != null && this.channel != null && this.player.roomId == null){
            if (this.channel.listPlayer.length >= this.server.maxPlayers){
                return [new BASE_CHANNEL_ENTER_PAK(PacketOpcodeServer.BASE_CHANNEL_ENTER_PAK, this.channel, 0x80000201)];
            } else if (this.channel.type == ChannelServerEnum.CHANNEL_TYPE_CLAN && this.player.clanId == 0){
                return [new BASE_CHANNEL_ENTER_PAK(PacketOpcodeServer.BASE_CHANNEL_ENTER_PAK, this.channel, 0x80000202)];
            } else if (this.channel.onlyAccess){
                return [new BASE_CHANNEL_ENTER_PAK(PacketOpcodeServer.BASE_CHANNEL_ENTER_PAK, this.channel, 0x80000205)];
            } else {
                this.player.channelId = this.channel.id
                return [new BASE_CHANNEL_ENTER_PAK(PacketOpcodeServer.BASE_CHANNEL_ENTER_PAK, this.channel, 0)];
            } 
        } else {
            return [new BASE_CHANNEL_ENTER_PAK(PacketOpcodeServer.BASE_CHANNEL_ENTER_PAK, this.channel, 0x80000200)];
        }
    }
}