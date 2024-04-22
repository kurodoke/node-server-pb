import { IniParser } from "../data/iniParser";
import { Log } from "../util/log";
import path from "path";

export class BattleSettingServer {
    public static udpIp: string;
    public static serverIp: string;
    public static udpPort: number;
    public static syncPort: number;
    public static clientVersion: string;
    public static udpVersion: string;
    public static isTestMode: boolean;
    public static sendInfoToServ: boolean;
    public static enableLog: boolean;
    public static plantDuration: string;
    public static defuseDuration: string;
    public static sendFailMsg: boolean;
    public static useHitMarker: boolean;
    public static useMaxAmmoInDrop: boolean;
    public static maxDrop: number;

    private constructor(){}

    public static load(): void {
        let data = IniParser.getInstance().load(path.resolve() + "/data/file/config/battle.ini");

        try {         
            BattleSettingServer.udpIp = data["udpIp"];
            BattleSettingServer.serverIp = data["serverIp"];
            BattleSettingServer.udpPort = data["udpPort"];
            BattleSettingServer.syncPort = data["syncPort"];
            BattleSettingServer.clientVersion = data["ClientVersion"];
            BattleSettingServer.udpVersion = data["UDPVersion"];
            BattleSettingServer.isTestMode = data["isTestMode"];
            BattleSettingServer.sendInfoToServ = data["sendInfoToServ"];
            BattleSettingServer.enableLog = data["enableLog"];
            BattleSettingServer.plantDuration = data["plantDuration"];
            BattleSettingServer.defuseDuration = data["defuseDuration"];
            BattleSettingServer.sendFailMsg = data["sendFailMsg"];
            BattleSettingServer.useHitMarker = data["useHitMarker"];
            BattleSettingServer.useMaxAmmoInDrop = data["useMaxAmmoInDrop"];
            BattleSettingServer.maxDrop = data["maxDrop"];
        } catch (err) {
            Log.getLogger("auth").error("No battle config file found ~ config/battle.ini");
        }
    }
}
