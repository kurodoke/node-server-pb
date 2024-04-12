import path from "path";
import { PbParser } from "../pbParser";
import { MissionCards } from "../../model/missionCards";
import { readdir, readdirSync } from "fs";
import { getPriceForMission } from "../../enum/MissionCardPriceEnum";
import { MissionCard } from "../../model/missionCard";
import { MissionOfTheCard } from "../../model/missionOfTheCard";
import { MissionCardAward } from "../../model/missionCardAward";
import { MissionCardsAward } from "../../model/missionCardsAward";

type CardsId = number;

export class MissionPb {
    private static _folderCardPath =
        path.resolve() + "/data/file/missions/cards/";
    private static _fileMissionAwardPath =
        path.resolve() + "/data/file/missions/missionAwards/MissionAwards.pb";
    private static _fileCardAwardPath =
        path.resolve() + "/data/file/missions/cardAwards/CardAwards.pb";

    public static missionCardsList: Map<CardsId, MissionCards> = new Map();

    static load() {
        MissionPb.loadCard();
        MissionPb.loadCardAward();
        let p = 1;
        MissionPb.loadMissionCardAward();
    }

    /**
     * load all the file card then read the data
     */
    private static loadCard() {
        try {
            let filenames = readdirSync(MissionPb._folderCardPath);

            for (const _filenames of filenames) {
                if (_filenames == "Event.pb") continue; //this was prevent to crash for some point
                try {
                    let parser = new PbParser().loadFile(
                        MissionPb._folderCardPath + _filenames
                    );

                    let cardsId = parser.readD();
                    let sizeCard = parser.readD(); //expected 40
                    let cardsName = _filenames.split(".")[0];

                    let cardsInstance = new MissionCards(
                        cardsName,
                        cardsId,
                        getPriceForMission(cardsName)
                    );

                    for (let index = 0; index < sizeCard; index++) {
                        let cardIndex = parser.readD();

                        if (index % 4 == 0) {
                            cardsInstance.setCard(
                                cardIndex,
                                new MissionCard(cardIndex)
                            );
                        }

                        let limit = parser.readD();
                        let missionId = parser.readD();
                        let missionType = parser.readD();

                        let mission = new MissionOfTheCard(
                            missionType,
                            limit,
                            missionId
                        );

                        cardsInstance.getCard(cardIndex).addMission(mission);
                    }

                    MissionPb.missionCardsList.set(cardsId, cardsInstance);
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log("[Error] On Read folder Cards");
        }
    }

    /**
     * load the cardAward file and then set the award property inside instance of card
     */
    private static loadCardAward() {
        try {
            let parser = new PbParser().loadFile(MissionPb._fileCardAwardPath);

            let sizeCardAward = parser.readD();

            for (let index = 0; index < sizeCardAward; index++) {
                let cardId = parser.readD();
                let cardIndex = parser.readD();

                let ensign = parser.readD();
                let medal = parser.readD();
                let ribbon = parser.readD();
                let exp = parser.readD();
                let point = parser.readD();

                if (cardId != 13) {
                    //prevent crash
                    let missionCards = MissionPb.missionCardsList.get(cardId);
                    let card = missionCards.getCard(cardIndex);

                    card.addAward(
                        new MissionCardAward(ensign, medal, ribbon, exp, point)
                    );
                }
            }
        } catch (err) {
            console.log("[Error] On Read file CardAwards");
        }
    }

    /**
     * load the missionAward file and then set the award property inside instance of missionCards
     */
    private static loadMissionCardAward() {
        try {
            let parser = new PbParser().loadFile(
                MissionPb._fileMissionAwardPath
            );

            let sizeMissionAward = parser.readD();

            for (let index = 0; index < sizeMissionAward; index++) {
                let cardId = parser.readD();


                let masterMedal = parser.readD();
                let exp = parser.readD();
                let point = parser.readD();
                let itemId = parser.readD();
                let itemCount = parser.readD();

                if (cardId != 13) { //prevent crash
                    let missionCards = MissionPb.missionCardsList.get(cardId);

                    missionCards.addAward(
                        new MissionCardsAward(
                            masterMedal,
                            itemId,
                            itemCount,
                            exp,
                            point
                        )
                    );
                }
            }
        } catch (err) {
            console.log(err);

            console.log("[Error] On Read file MissionAwards");
        }
    }
}
