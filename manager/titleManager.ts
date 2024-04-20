import { Database } from '../util/database';
import { Player } from '../model/player';
import { PlayerManager } from './playerManager';
import { Title } from '../model/title';
import { titleXML } from '../data/loader/titleXML';

export class TitleManager{

    public static setPlayerTitlePos(p: Player){
        for (let index = 1; index <= p.playerTitle.title.length; index++) {
            if(p.playerTitle.title.readInt8(index - 1) == 1){
                let titleQ = titleXML.titleList.get(index);
                if(titleQ){
                    if (titleQ.pos == 1) p.playerTitle.pos1 += titleQ.posV;
					else if (titleQ.pos == 2) p.playerTitle.pos2 += titleQ.posV;
					else if (titleQ.pos == 3) p.playerTitle.pos3 += titleQ.posV;
					else if (titleQ.pos == 4) p.playerTitle.pos4 += titleQ.posV;
					else if (titleQ.pos == 5) p.playerTitle.pos5 += titleQ.posV;
					else if (titleQ.pos == 6) p.playerTitle.pos6 += titleQ.posV;
					else if (titleQ.pos == 7) p.playerTitle.pos7 += titleQ.posV;
					else if (titleQ.pos == 8) p.playerTitle.pos8 += titleQ.posV;
                }
            }
        }
    }
}