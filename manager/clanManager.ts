import { ClanLevelEnum } from "../enum/ClanLevelEnum";
import { Clan } from "../model/clan";
import { Player } from "../model/player";
import { Database } from "../util/database";
import { PlayerManager } from "./playerManager";

type clanId = number;

export class ClanManager{
    private static _listClan: Map<clanId, Clan>;

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

    static async getClan(clan_id: NonNullable<number>): Promise<Clan>{
        /**
         * if no clan given then return clan object that predefined 
         */
        if(clan_id == 0){
            if(!ClanManager._listClan.has(0)){
                ClanManager._listClan.set(0, new Clan());
            }
            return ClanManager._listClan.get(0);
        };

        const clan = await Database.getInstance().model.clan.findOne({
            where: {
                id: clan_id,
            }
        });

        ClanManager._listClan.set(clan_id, new Clan(clan.dataValues));
        
        return ClanManager._listClan.get(clan_id);
    }

    static async getClanPlayers(clan_id: NonNullable<number>): Promise<Player[]> {
        if (clan_id == 0) return ClanManager._listClan.get(0).member;
        try{
            /**
             * if the clan is not exist, then create new on the list;
             */
            if(!ClanManager._listClan.has(clan_id)){
                await ClanManager.getClan(clan_id);
            };

            let data = await Database.getInstance().model.player.findAll({
                where: {clan_id : clan_id}
            });

            /**
             * if data is found then update the member on the clan object
             */
            if(data){
                data.map(_data => {
                    ClanManager._listClan.get(clan_id).member.push(PlayerManager.getPlayer(_data));
                });
            } 

            // if member exist then return player[] if not then return array with nothing inside
            return ClanManager._listClan.get(clan_id).member;
        } catch (err) {
            console.log("[Error] error on getClanPlayer on clanManager, err:" + err);
        }
    }


}