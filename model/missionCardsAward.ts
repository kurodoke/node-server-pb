export class MissionCardsAward{
    public masterMedal: number;
    public itemId: number;
    public count: number;
    public exp: number;
    public point: number;

    constructor(masterMedal: number, itemId: number, count: number, exp: number, point: number){
        this.masterMedal = masterMedal;
        this.itemId = itemId;
        this.count = count;
        this.exp = exp;
        this.point = point;
    }

}