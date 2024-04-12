export enum MissionCardPriceEnum{
    Tutorial = 0,
    TutorialDino = 0,
    TutorialSurvival = 0,
    Assault = 5000,
    Support = 5000,
    Infiltration = 5000,
    Special = 5400,
    Defcon = 5800,
    Commision = 8300,
    Company = 11000,
    Field = 14000,
    Event = 0,
    Dino = 5500,
    Survival = 5500,
    DinoLvl2 = 9500,
    SurvivalLvl2 = 9500,
}

export function getPriceForMission(mission: string): number {
    switch (mission) {
        case "Tutorial":
            return MissionCardPriceEnum.Tutorial;
        case "TutorialDino":
            return MissionCardPriceEnum.TutorialDino;
        case "TutorialSurvival":
            return MissionCardPriceEnum.TutorialSurvival;
        case "Assault":
            return MissionCardPriceEnum.Assault;
        case "Support":
            return MissionCardPriceEnum.Support;
        case "Infiltration":
            return MissionCardPriceEnum.Infiltration;
        case "Special":
            return MissionCardPriceEnum.Special;
        case "Defcon":
            return MissionCardPriceEnum.Defcon;
        case "Commision":
            return MissionCardPriceEnum.Commision;
        case "Company":
            return MissionCardPriceEnum.Company;
        case "Field":
            return MissionCardPriceEnum.Field;
        case "Event":
            return MissionCardPriceEnum.Event;
        case "Dino":
            return MissionCardPriceEnum.Dino;
        case "Survival":
            return MissionCardPriceEnum.Survival;
        case "DinoLvl2":
            return MissionCardPriceEnum.DinoLvl2;
        case "SurvivalLvl2":
            return MissionCardPriceEnum.SurvivalLvl2;
        default:
            return 0; // Default value if not found
    }
}
