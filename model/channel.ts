import { ChannelServerEnum } from "../enum/ChannelServerEnum";

export class Channel {
    serverId: number;
    id: number;
    maxRooms: number;
    type: ChannelServerEnum;
    announce: string;
    onlyAccess: boolean;
    bonusExp: number;
    bonusPoint: number;
    bonusCash: number;

    constructor(
        serverId: number,
        type: string,
        id: number,
        announce: string,
        maxRooms: number,
        onlyAccess: boolean,
        bonusExp: number,
        bonusPoint: number,
        bonusCash: number
    ) {
        this.serverId = serverId;
        this.type = ChannelServerEnum[type];
        this.id = id;
        this.announce = announce;
        this.maxRooms = maxRooms;
        this.onlyAccess = onlyAccess;
        this.bonusExp = bonusExp;
        this.bonusPoint = bonusPoint;
        this.bonusCash = bonusCash;
    }
}
