import { IniParser } from "../data/iniParser";
import { Log } from "../util/log";
import path from "path";

export class GameSettingServer {
    public static debugMode: boolean;
    public static isTestMode: boolean;
    public static winCashPerBattle: boolean;
    public static showCashReceiveWarn: boolean;
    public static enableClassicRules: boolean;

    public static serverIp: string;

    public static configId: number;
    public static serverId: number;
    public static serverPort: number;
    public static syncPort: number;
    public static udpType: number;
    public static password: string;

    public static minClanPoints: number;
    public static maxClanPoints: number;
    public static minCreateRank: number;
    public static minCreateGold: number;

    public static maxChannelPlayers: number;
    public static maxBattleXP: number;
    public static maxBattleGP: number;
    public static maxBattleMY: number;
    public static minNickSize: number;
    public static maxNickSize: number;
    public static minRankVote: number;
    public static maxActiveClans: number;
    public static maxBattleLatency: number;
    public static maxRepeatLatency: number;

    private constructor(){}

    public static load(): void {
        let data = IniParser.getInstance().load(path.resolve() + "/data/file/config/game.ini");

        try {
            GameSettingServer.serverIp = data["gameIp"];
            GameSettingServer.serverPort = data["gamePort"];
            GameSettingServer.configId = data["configId"];
            GameSettingServer.serverId = data["serverId"];
            GameSettingServer.syncPort = data["syncPort"];
            GameSettingServer.udpType = data["udpType"];
            GameSettingServer.password = data["passw"];
            
            GameSettingServer.debugMode = data["debugMode"];
            GameSettingServer.isTestMode = data["isTestMode"];
            GameSettingServer.winCashPerBattle = data["winCashPerBattle"];
            GameSettingServer.showCashReceiveWarn = data["showCashReceiveWarn"];
            GameSettingServer.enableClassicRules = data["EnableClassicRules"];
            
            GameSettingServer.minClanPoints = data["minClanPoints"];
            GameSettingServer.maxClanPoints = data["maxClanPoints"];
            GameSettingServer.minCreateRank = data["minCreateRank"];
            GameSettingServer.minCreateGold = data["minCreateGold"];
            
            GameSettingServer.maxChannelPlayers = data["maxChannelPlayers"];
            GameSettingServer.maxBattleXP = data["maxBattleXP"];
            GameSettingServer.maxBattleGP = data["maxBattleGP"];
            GameSettingServer.maxBattleMY = data["maxBattleMY"];
            GameSettingServer.minNickSize = data["minNickSize"];
            GameSettingServer.maxNickSize = data["maxNickSize"];
            GameSettingServer.minRankVote = data["minRankVote"];
            GameSettingServer.maxActiveClans = data["maxActiveClans"];
            GameSettingServer.maxBattleLatency = data["maxBattleLatency"];
            GameSettingServer.maxRepeatLatency = data["maxRepeatLatency"];
        } catch (err) {
            Log.getLogger("auth").error("No game config file found ~ config/game.ini");
        }
    }
}
