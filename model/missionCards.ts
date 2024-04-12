import { MissionCard } from "./missionCard";
import { MissionCardsAward } from "./missionCardsAward";

type CardIndex = number;

export class MissionCards{
    declare name: string;
    declare id: number;
    declare price: number;
    public cardList: Map<CardIndex ,MissionCard> = new Map(); //expected 10 cards
    public slotCard: number = 10;
    public award: MissionCardsAward;


    constructor(name: string, id: number, price: number){
        this.name = name;
        this.id = id;
        this.price = price;
    }

    getCard(cardIndex: number): MissionCard{
        return this.cardList.get(cardIndex);
    }

    setCard(cardIndex, card: MissionCard): boolean{
        if(this.slotCard != 0){
            this.cardList.set(cardIndex, card);
            this.slotCard--;
            return true;
        }

        return false;
    }

    addAward(award: MissionCardsAward){
        this.award = award;
    }
}