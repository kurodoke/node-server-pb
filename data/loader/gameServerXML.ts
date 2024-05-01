import { Channel } from "../../model/channel";
import { GameServerInfo } from "../../model/gameServer";
import { XmlParser } from "../xmlParser";
import path from "path";
import { readdirSync } from "fs";

export class GameServerXML{
    public static gameServerList: Array<GameServerInfo> = new Array();
    private static folderGameServerPath: string = path.resolve() + "/data/file/gameServer/";

    static load(){
        let filenames = readdirSync(this.folderGameServerPath);

        for( const _filenames of filenames){
            let data = XmlParser.getInstance().load(this.folderGameServerPath + _filenames)["list"];
            if (data){
                let _data = data["@_"];
                let gs = new GameServerInfo(Number(_filenames.split(".xml")[0]), _data["@_active"], _data["@_max_players"], _data["@_channel_players"], _data["@_type"], _data["@_ip"], _data["@_port"], _data["@_pass"]);
                this.gameServerList.push(gs);

                if(data["channel"]){
                    data["channel"].map((_channel) => {
                        _channel = _channel["@_"];
                        gs.channelList.push(new Channel(gs.id, _channel["@_type"], _channel["@_id"], _channel["@_announce"], _channel["@_max_rooms"] , _channel["@_only_access"] , _channel["@_bonusExp"] , _channel["@_bonusGold"], _channel["@_bonusCash"]));
                    });
                }
            }
        }
    }
}