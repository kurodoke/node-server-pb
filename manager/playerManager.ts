import { Player, PlayerAttributes } from '../model/player';


type PlayerId = number;

export class PlayerManager{
    private static _listPlayer: Map<PlayerId, Player>;

    static addPlayer(data: PlayerAttributes): Player{
        let player = new Player(data);
        this._listPlayer.set(data.id, player);
        return player;
    }

    static addPlayerInstance(instance: Player): boolean{
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
}