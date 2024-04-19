import { Inventory } from './inventory';

export interface TitleQAttributes{
    id: number,
    pos: number,
    posV: number,
    medal: number,
    ribbon: number,
    masterMedal: number,
    ensign: number,
    rank: number,
    slot: number,
    reqT1: number,
    reqT2: number
}

export class TitleQ {
    public id: number;
    public pos: number;
    public posV: number;
    public medal: number;
    public ribbon: number;
    public masterMedal: number;
    public ensign: number;
    public rank: number;
    public slot: number;
    public reqT1: number;
    public reqT2: number;
    public rewards: Array<Inventory> = new Array();

    constructor(data: TitleQAttributes) {
        this.id = data.id;
        this.pos = data.pos;
        this.posV = data.posV;
        this.medal = data.medal;
        this.ribbon = data.ribbon;
        this.masterMedal = data.masterMedal;
        this.ensign = data.ensign;
        this.rank = data.rank;
        this.slot = data.slot;
        this.reqT1 = data.reqT1;
        this.reqT2 = data.reqT2;
    }

    public addRewards(inven: Inventory){
        this.rewards.push(inven);
    }
}
