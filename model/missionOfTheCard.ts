import { MissionTypeEnum } from "../enum/MissionTypeEnum";

export class MissionOfTheCard{
    public missionType: MissionTypeEnum;
    public limit: number;
    public missionId: number; //id

    constructor(missionType: number, limit: number, missionId: number){
        this.missionType = missionType;
        this.limit = limit;
        this.missionId = missionId;
    }

}