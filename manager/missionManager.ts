import { MissionCard } from "../model/missionCard";
import { MissionPb } from "../data/loader/missionPb";

export class MissionManager{
    public static getCardMissionFlags(cardId: number, cardIndex: number, listMissionFlags: Buffer): number{
        let res = 0;

        let card = MissionManager.getCard(cardId, cardIndex); 

        card.missions.forEach((m, index) => {
            if(m.limit <= listMissionFlags.readUInt8((index + 1) + cardIndex * 4)){
                res |= (0x0f << 4 * m.missionId);
            }
        });

        return res;
    }

    

    public static getCard(cardId: number, cardIndex: number) : MissionCard{
        let cardMission = MissionPb.missionCardsList.get(cardId);
        let card = cardMission.cardList.get(cardIndex);
        return card;
    }
}