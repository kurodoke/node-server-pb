import { Packet } from "../../core-network/packet";
import { Player } from "../player";

class BASE_MYINFO_REQ_PAK extends Packet{
    _player: Player;

    constructor(opcode: number, player: Player | null){
        super("read" ,opcode);
        this._player = player;
    }


}