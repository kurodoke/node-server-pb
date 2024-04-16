import { AuthSettingServer } from '../../config/authSettingServer';
import { Clan } from "../../model/clan";
import { ClanManager } from "../../manager/clanManager";
import { Connection } from "../../network/connection";
import { Map } from "../../model/map";
import { Packet } from "../../network/packet";
import { Player } from "../../model/player";
import { PlayerManager } from "../../manager/playerManager";

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

        PlayerManager.setPlayerStat(this.player.id);
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
            this.writeC(this.player.playerMission.card1);
            this.writeC(this.player.playerMission.card2);
            this.writeC(this.player.playerMission.card3);
            this.writeC(this.player.playerMission.card4);
            
        }
    }
}