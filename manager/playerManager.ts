import { Player, PlayerAttributes } from '../model/player';
import { PlayerStat } from '../model/playerStat';
import { Database } from '../util/database';


type PlayerId = number;

export class PlayerManager{
    private static _listPlayer: Map<PlayerId, Player> = new Map();

    static addPlayer(data: PlayerAttributes): Player{
        let player = new Player(data);
        this._listPlayer.set(data.id, player);
        return player;
    }

    static addPlayerInstanceToList(instance: Player): boolean{
        try{
            this._listPlayer.set(instance.id, instance);

            return true;
        } catch (err){
            return false;
        }
    }

    static getPlayer(data: PlayerAttributes): Player{

        /**
         * if player not exist on the list then create one
         */
        if(!this._listPlayer.has(data.id)) {
            return this.addPlayer(data);
        }
        return this._listPlayer.get(data.id);
    }

    static async setPlayerStat(playerId: number){
        try{
            let data = await Database.getInstance().model.player.findOne({
                where: {id : playerId}
            });

            let dataStat = await data.getPlayer_stat();

            /**
             * if data is found then update the member on the clan object
             */
            if(!dataStat){
                try {
                    dataStat = await data.createPlayer_stat({
                        playerId: playerId
                    })
                } catch (err){
                    console.log("playerstat err");
                    
                }
            } 

            if(dataStat) PlayerManager._listPlayer.get(playerId).playerStat = new PlayerStat(dataStat);

            let p = 1;
            // if member exist then return player[] if not then return array with nothing inside
            return ;
        } catch (err){
            console.log(err);
            
        }
    }
}