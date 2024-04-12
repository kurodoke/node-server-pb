import { MissionCardAward } from "./missionCardAward";
import { MissionOfTheCard } from "./missionOfTheCard";

export class MissionCard{
    declare public cardIndex: number; //each MissionCards got 10 cards, so this number represent the index or position of the card
    public missions: Array<MissionOfTheCard> = new Array(); //expected to be 4 mission
    public award: MissionCardAward;
    public slotMission = 4; //max mission to attach in this obj

    constructor(cardIndex: number,  ){
        this.cardIndex = cardIndex;
    }

    addAward(award: MissionCardAward){
        this.award = award;
    }

    addMission(mission: MissionOfTheCard): boolean{
        if(this.slotMission != 0){
            this.missions.push(mission);
            this.slotMission--;
            return true;
        }
        return false;
    }

    getMission(missionId: number) : MissionOfTheCard | null {
        for (let index = 0; index < this.missions.length; index++) {
            if(this.missions[index].missionId == missionId){
                return this.missions[index]
            }
        }
        return null;
    }
}