import { Clan, ClanAttributes } from "../model/clan";

import { AccessLevelEnum } from '../enum/AccessLevelEnum';
import { ClanLevelEnum } from "../enum/ClanLevelEnum";
import { Database } from "../util/database";
import { Player } from "../model/player";
import { PlayerManager } from "./playerManager";

type clanId = number;

export class ClanManager{
    private static _listClan: Map<clanId, Clan> = new Map();

    private _noClanAttributes: ClanAttributes = {
        id: 0,
        authority: 0,
        clanInfo: '',
        clanMatchLosts: 0,
        clanMatchs: 0,
        clanName: '',
        clanNotice: '',
        clanRank: 0,
        clanMatchWons: 0,
        color: 0,
        data: 0,
        exp: 0,
        limitAge: 0,
        limitAge2: 0,
        limitRank: 0,
        logo: 0,
        owner: 0,
        playerBestExps: 0,
        playerBestHeadshots: 0,
        playerBestKills: 0,
        playerBestParticipation: 0,
        playerBestMatchWon: 0,
        point: 1000,
        url: '',
        vacancies: 50,
    };

    static getClanLevel(clan: Clan) {
        let count = 0;

        if (clan.countPlayer == -1) {
            count = clan.countPlayer;
        } else {
            count = clan.member.length;
        }

        if (count >= 250) return ClanLevelEnum.CLAN_LEVEL_CORPS;
        else if (count >= 200) return ClanLevelEnum.CLAN_LEVEL_DIVISION;
        else if (count >= 150) return ClanLevelEnum.CLAN_LEVEL_BRIGADE;
        else if (count >= 100) return ClanLevelEnum.CLAN_LEVEL_REGIMENT;
        else if (count >= 50) return ClanLevelEnum.CLAN_LEVEL_BATTALION;
        else if (count >= 30) return ClanLevelEnum.CLAN_LEVEL_COMPANY;
        else if (count >= 10) return ClanLevelEnum.CLAN_LEVEL_PLATOON;
        else return ClanLevelEnum.CLAN_LEVEL_SQUARD;
    }

    static async getClan(clanId: NonNullable<number>): Promise<Clan>{
        /**
         * if no clan given then return clan object that predefined 
         */
        if(clanId == 0){
            if(!ClanManager._listClan.has(0)){
                let clan = new Clan();
                clan.countPlayer = 0;
                ClanManager._listClan.set(0, clan);

            }
            return ClanManager._listClan.get(0);
        };

        const clan = await Database.getInstance().model.clan.findOne({
            where: {
                id: clanId,
            }
        });

        ClanManager._listClan.set(clanId, new Clan(clan.dataValues));
        
        return ClanManager._listClan.get(clanId);
    }

    static async getClanPlayers(clanId: NonNullable<number>): Promise<Player[]> {
        if (clanId == 0) return ClanManager._listClan.get(0).member;
        try{
            /**
             * if the clan is not exist, then create new on the list;
             */
            if(!ClanManager._listClan.has(clanId)){
                await ClanManager.getClan(clanId);
            };

            let data = await Database.getInstance().model.player.findAll({
                where: {clanId : clanId}
            });

            /**
             * if data is found then update the member on the clan object
             */
            if(data){
                data.map(_data => {
                    ClanManager._listClan.get(clanId).member.push(PlayerManager.getPlayer(_data));
                });
            } 

            // if member exist then return player[] if not then return array with nothing inside
            return ClanManager._listClan.get(clanId).member;
        } catch (err) {
            console.log("[Error] error on getClanPlayer on clanManager, err:" + err);
        }
    }


}