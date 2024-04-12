export class MissionCardAward{
    public ensign: number;
    public medal: number;
    public ribbon: number;
    public exp: number;
    public point: number;

    constructor(ensign: number, medal: number, ribbon: number, exp: number, point: number){
        this.ensign = ensign;
        this.medal = medal;
        this.ribbon = ribbon;
        this.exp = exp;
        this.point = point;
    }

}