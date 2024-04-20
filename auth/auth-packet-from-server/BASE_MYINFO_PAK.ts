import { AuthSettingServer } from '../../config/authSettingServer';
import { Clan } from "../../model/clan";
import { ClanManager } from "../../manager/clanManager";
import { Connection } from "../../network/connection";
import { DateTime } from '../../util/dateTime';
import { Map } from "../../model/map";
import { MapModeIni } from '../../data/loader/mapModeIni';
import { MapsXML } from '../../data/loader/mapsXML';
import { MissionManager } from '../../manager/missionManager';
import { MissionPb } from '../../data/loader/missionPb';
import { Packet } from "../../network/packet";
import { Player } from "../../model/player";
import { PlayerManager } from "../../manager/playerManager";
import { TitleManager } from '../../manager/titleManager';

export class BASE_MYINFO_PAK extends Packet{
    declare player: Player;
    declare clan: Clan;
    private map: Array<Map> = new Array();
    weapon;
    character;
    coupon;

    private _err: number = 0;

    constructor (opcode: number, connection: Connection){
        super("write", opcode);
        this.player = connection.player;
    }

    async init() {
        /**
         * this is initialization
         */
        if (!this.player || this.player.playerInventory.length != 0) {
            this._err = 0x80000000;
        }

        if (this.player.clanId > 0) {
            this.clan = await ClanManager.getClan(this.player.clanId);
            this.clan.countPlayer = (await ClanManager.getClanPlayers(this.player.clanId)).length;
        } else {
            this.clan = await ClanManager.getClan(0);
        }

        await PlayerManager.setPlayerStat(this.player.id);
        await PlayerManager.setPlayerTitle(this.player.id);
        await PlayerManager.setPlayerMission(this.player.id);
        await PlayerManager.setPlayerEquipment(this.player.id);
        await PlayerManager.setPlayerCoupon(this.player.id);
        TitleManager.setPlayerTitlePos(this.player);
    }

    write() {
        this.writeD(this._err);
        if (this._err == 0) {
            this.writeC(0); // this.player.client_version (38||41) or 0
            this.writeS(this.player.name); // max length 33
            this.writeD(this.player.exp);
            this.writeD(this.player.rank);
            this.writeD(this.player.rank);
            this.writeD(this.player.point);
            this.writeD(this.player.cash);
            this.writeD(this.player.clan());
            this.writeD(this.player.clanRole());
            this.writeQ(this.player.status());
            this.writeC(0); //pc cafe maybe
            this.writeC(this.player.tourneyLevel);
            this.writeC(this.player.color);
            this.writeS(this.clan.clanName); // max length 17
            this.writeC(this.clan.clanRank);
            this.writeC(ClanManager.getClanLevel(this.clan));
            this.writeD(this.clan.logo);
            this.writeC(this.clan.color)
            this.writeD(10000); //rating + top
            this.writeC(0);
            this.writeD(0);
            this.writeD(this.player.lastUp);

            for (let index = 0; index < 2; index++) {
                this.writeD(this.player.playerStat.match);
                this.writeD(this.player.playerStat.matchWons);
                this.writeD(this.player.playerStat.matchLosts);
                this.writeD(this.player.playerStat.matchDraws);
                this.writeD(this.player.playerStat.killsCount);
                this.writeD(this.player.playerStat.headShotsCount);
                this.writeD(this.player.playerStat.deathsCount);
                this.writeD(this.player.playerStat.match);
                this.writeD(this.player.playerStat.killsCount);
                this.writeD(this.player.playerStat.escapes);
            }

            this.writeD(this.player.playerEquipment.charRed);
            this.writeD(this.player.playerEquipment.charBlue);
            this.writeD(this.player.playerEquipment.charHead);
            this.writeD(this.player.playerEquipment.charBeret);
            this.writeD(this.player.playerEquipment.dino);
            this.writeD(this.player.playerEquipment.primary);
            this.writeD(this.player.playerEquipment.secondary);
            this.writeD(this.player.playerEquipment.melee);
            this.writeD(this.player.playerEquipment.grenade);
            this.writeD(this.player.playerEquipment.special);
            this.writeH(0);
            this.writeD(this.player.playerCoupon.falseRank);
            this.writeD(this.player.playerCoupon.falseRank);
            this.writeS(this.player.playerCoupon.falseName);
            this.writeH(this.player.playerCoupon.crosshairColor);
            this.writeC(31) //country ?

            //turkey 41

            this.writeC(AuthSettingServer.outpost ? 1 : 0);
            this.writeD(this.player.ribbon);
            this.writeD(this.player.ensign);
            this.writeD(this.player.medal);
            this.writeD(this.player.masterMedal);
            this.writeC(this.player.playerMission.activeMission);
            this.writeC(this.player.playerMission.activeCardIndex1);
            this.writeC(this.player.playerMission.activeCardIndex2);
            this.writeC(this.player.playerMission.activeCardIndex3);
            this.writeC(this.player.playerMission.activeCardIndex4);
            for(let index = 0; index < 10; index++){
                this.writeH(MissionManager.getCardMissionFlags(this.player.cardMissionId1, index, this.player.playerMission.listMissionFlags1));
            }
            for(let index = 0; index < 10; index++){
                this.writeH(MissionManager.getCardMissionFlags(this.player.cardMissionId2, index, this.player.playerMission.listMissionFlags2));
            }
            for(let index = 0; index < 10; index++){
                this.writeH(MissionManager.getCardMissionFlags(this.player.cardMissionId3, index, this.player.playerMission.listMissionFlags3));
            }
            for(let index = 0; index < 10; index++){
                this.writeH(MissionManager.getCardMissionFlags(this.player.cardMissionId4, index, this.player.playerMission.listMissionFlags4));
            }
            this.writeC(this.player.cardMissionId1);
            this.writeC(this.player.cardMissionId2);
            this.writeC(this.player.cardMissionId3);
            this.writeC(this.player.cardMissionId4);
            this.writeB(this.player.playerMission.listMissionFlags1);
            this.writeB(this.player.playerMission.listMissionFlags2);
            this.writeB(this.player.playerMission.listMissionFlags3);
            this.writeB(this.player.playerMission.listMissionFlags4);
            this.writeC(this.player.playerTitle.pos1);
            this.writeC(this.player.playerTitle.pos2);
            this.writeC(this.player.playerTitle.pos3);
            this.writeC(this.player.playerTitle.pos4);
            this.writeC(this.player.playerTitle.pos5);
            this.writeC(this.player.playerTitle.pos6);
            this.writeC(this.player.playerTitle.pos7);
            this.writeC(this.player.playerTitle.pos8);
            this.writeC(this.player.playerTitle.equipTitle1);
            this.writeC(this.player.playerTitle.equipTitle2);
            this.writeC(this.player.playerTitle.equipTitle3);
            this.writeD(this.player.playerTitle.slot);
            this.writeD(MapModeIni.Tutorial);
            this.writeD(MapModeIni.Deathmatch);
            this.writeD(MapModeIni.Destruction);
            this.writeD(MapModeIni.Sabotage);
            this.writeD(MapModeIni.Supression);
            this.writeD(MapModeIni.Defense);
            this.writeD(MapModeIni.Challenge);
            this.writeD(MapModeIni.Dinosaur);
            this.writeD(MapModeIni.Sniper);
            this.writeD(MapModeIni.Shotgun);
            this.writeD(MapModeIni.HeadHunter);
            this.writeD(MapModeIni.Knuckle);
            this.writeD(MapModeIni.CrossCounter);
            this.writeD(MapModeIni.Chaos);
            this.writeD(MapModeIni.Escort); // only for v41

            // this.writeH(MapsXML.mapArray.length + 1031);
            this.writeC(MapsXML.mapArray.length);
            this.writeC(4);
            
            this.writeH(MapsXML.mapList1);
            this.writeH(MapsXML.mapList2);
            this.writeH(MapsXML.mapList3);
            this.writeH(MapsXML.mapList4);
            this.writeH(MapsXML.mapList5);
            this.writeH(MapsXML.mapList6);
            this.writeH(MapsXML.mapList7);
            this.writeH(MapsXML.mapList8);
            this.writeH(MapsXML.mapList9);
            
            MapsXML.mapArray.forEach(map => {
                this.writeH(map.mode);
            });

            this.writeH(4524);
            this.writeH(4524);
            this.writeH(0);
            this.writeH(0);
            this.writeH(4136);
            this.writeH(8);
            this.writeC(0);

            MapsXML.mapArray.forEach(map => {
                this.writeC(map.tag);
            });
            
            this.writeC(0);
            this.writeC(0);
            this.writeC(1);
            this.writeC(1);
            this.writeC(1);
            this.writeC(1);

            this.writeC(AuthSettingServer.missionActive ? 1 : 0);
            this.writeD(MissionPb.missionListNumber);
            
            this.writeD(50);
	        this.writeD(75);
	        this.writeC(1);
	        this.writeH(20);
	        this.writeD(764677232);
	        this.writeD(517802056);
	        this.writeD(1747888);
	        this.writeD(4357017);
	        this.writeD(764677232);
	        this.writeC(0);

            this.writeC(this.player.observing());

            this.writeC(0);
            this.writeC(0);

            this.writeC(0); //event
            this.writeD(0);
            this.writeC(0);
            this.writeC(0);
            this.writeH(0);
            this.writeD(0);
            this.writeT("", 60);
            this.writeC(0);
            this.writeC(0);
            this.writeH(0);
            this.writeD(0);
            this.writeD(0);
            this.writeD(0);

            for (let index = 1; index < 9; index++) {
                if(index == 8){
                    this.writeC(1);
                }else{
                    this.writeD(1);
                }
                this.writeD(0);
                this.writeD(0);
            }

            this.writeD(new DateTime().getDate());

            this.writeB(Buffer.alloc(12));
            this.writeB(Buffer.from([0x9B, 0xAF, 0x5D, 0x6B, 0x31, 0x30, 0x2E, 0x31, 0x32, 0x30, 0x2E, 0x31, 0x2E, 0x34, 0x34]));
            this.writeB(Buffer.alloc(229));

            this.writeH(8085);
            this.writeH(0);
            this.writeH(1);
            this.writeC(0);

            this.writeH(1);
            this.writeC(1);
            this.writeC(6);
            this.writeH(4);
            this.writeC(1);
            this.writeC(2);
            this.writeC(5);
            this.writeC(3);
        }
    }
}