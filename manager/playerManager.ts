import { Player, PlayerAttributes } from "../model/player";

import { Coupon } from "../model/coupon";
import { Database } from "../util/database";
import { Equipment } from "../model/equipment";
import { Keyboard } from "../model/keyboard";
import { Message } from "../model/message";
import { Mission } from "../model/mission";
import { Mouse } from "../model/mouse";
import { PlayerConfig } from "../model/playerConfig";
import { PlayerStat } from "../model/playerStat";
import { Title } from "../model/title";

type PlayerId = number;

export class PlayerManager {
    private static _listPlayer: Map<PlayerId, Player> = new Map();

    static addPlayer(data: PlayerAttributes): Player {
        let player = new Player(data);
        this._listPlayer.set(data.id, player);
        return player;
    }

    static addPlayerInstanceToList(instance: Player): boolean {
        try {
            this._listPlayer.set(instance.id, instance);

            return true;
        } catch (err) {
            return false;
        }
    }

    static getPlayer(data: PlayerAttributes): Player {
        /**
         * if player not exist on the list then create one
         */
        if (!this._listPlayer.has(data.id)) {
            return this.addPlayer(data);
        }
        return this._listPlayer.get(data.id);
    }

    static async setPlayerStat(playerId: number) {
        try {
            let data = await Database.getInstance().model.player.findOne({
                where: { id: playerId },
            });

            let dataStat = await data.getPlayer_stat();

            /**
             * if data is found then update the member on the clan object
             */
            if (!dataStat) {
                dataStat = await data.createPlayer_stat({
                    playerId: playerId,
                });
            }

            if (dataStat)
                PlayerManager._listPlayer.get(playerId).playerStat =
                    new PlayerStat(dataStat);
        } catch (err) {
            console.log(err);
        }
    }

    public static async setPlayerTitle(playerId: number) {
        try {
            let data = await Database.getInstance().model.player.findOne({
                where: { id: playerId },
            });

            let dataTitle = await data.getTitle();

            /**
             * if data is found then update the member on the clan object
             */
            if (!dataTitle) {
                dataTitle = await data.createTitle({
                    playerId: playerId,
                });
            }

            if (dataTitle)
                PlayerManager._listPlayer.get(playerId).playerTitle = new Title(
                    dataTitle
                );
        } catch (err) {
            console.log(err);
        }
    }

    public static async setPlayerMission(playerId: number) {
        try {
            let data = await Database.getInstance().model.player.findOne({
                where: { id: playerId },
            });

            let dataMission = await data.getMission();

            /**
             * if data is found then update the member on the clan object
             */
            if (!dataMission) {
                dataMission = await data.createMission({
                    playerId: playerId,
                });
            }

            if (dataMission)
                PlayerManager._listPlayer.get(playerId).playerMission =
                    new Mission(dataMission);
        } catch (err) {
            console.log(err);
        }
    }

    public static async setPlayerEquipment(playerId: number) {
        try {
            let data = await Database.getInstance().model.player.findOne({
                where: { id: playerId },
            });

            let dataEquipment = await data.getEquipment();

            /**
             * if data is found then update the member on the clan object
             */
            if (!dataEquipment) {
                dataEquipment = await data.createEquipment({
                    playerId: playerId,
                });
            }

            if (dataEquipment)
                PlayerManager._listPlayer.get(playerId).playerEquipment =
                    new Equipment(dataEquipment);
        } catch (err) {
            console.log(err);
        }
    }

    public static async setPlayerCoupon(playerId: number) {
        try {
            let data = await Database.getInstance().model.player.findOne({
                where: { id: playerId },
            });

            let dataCoupon = await data.getCoupon();

            /**
             * if data is found then update the member on the clan object
             */
            if (!dataCoupon) {
                dataCoupon = await data.createCoupon({
                    playerId: playerId,
                });
            }

            if (dataCoupon)
                PlayerManager._listPlayer.get(playerId).playerCoupon =
                    new Coupon(dataCoupon);
        } catch (err) {
            console.log(err);
        }
    }

    public static async setPlayerMessage(playerId: number) {
        try {
            let data = await Database.getInstance().model.player.findOne({
                where: { id: playerId },
            });

            let dataCoupon = await data.getMessages();
            let messageList = new Array();

            /**
             * if data is found then update the member on the clan object
             */
            dataCoupon.forEach((modelMsg) => {
                messageList.push(new Message(modelMsg.dataValues));
            });

            PlayerManager._listPlayer.get(playerId).playerInbox = messageList;
        } catch (err) {
            console.log(err);
        }
    }

    public static async setPlayerConfig(playerId: number) {
        try {
            let k = new Keyboard();
            let m = new Mouse();
            PlayerManager._listPlayer.get(playerId).playerConfig = new PlayerConfig(k, m);
        } catch (err) {
            console.log(err);
        }
    }

}
