import { DatabaseSetting } from "./databaseSetting";
import { IniParser } from "../data/iniParser";
import { Log } from "../util/log";
import path from "path";

export class AuthSettingServer{
    
    public static debugMode: boolean;
    public static isTestMode: boolean;
    public static autoAccount: boolean;
    public static outpost: boolean;
    // public static mission_active: boolean;
    // public static room_create: boolean;
    // public static battle_cash: boolean;

    public static serverIp: string;

    public static configId: number;
    public static serverPort: number;
    public static syncPort: number;
    public static launcherKey: number;
    public static missionActive: boolean;

    public static minNickSize: number;
    public static maxNickSize: number;
    public static minUserSize: number;
    public static minPassSize: number;

    public static gameLocale: Array<string>;

    private constructor(){}

    public static load(): void{
        let data = IniParser.getInstance().load(path.resolve() + "/data/file/config/auth.ini");

        try {
            AuthSettingServer.serverIp = data["authIp"];
            AuthSettingServer.serverPort = data["authPort"];
            AuthSettingServer.autoAccount = data["autoaccounts"];
            AuthSettingServer.configId = data["configId"];
    
            DatabaseSetting.dbHost = data["dbhost"];
            DatabaseSetting.dbName = data["dbname"];
            DatabaseSetting.dbPass = data["dbpass"];
            DatabaseSetting.dbPort = data["dbport"];
            DatabaseSetting.dbUser = data["dbuser"];
    
            AuthSettingServer.debugMode = data["debugMode"];
            AuthSettingServer.gameLocale = data['GameLocales'].split(',');
            AuthSettingServer.isTestMode = data["isTestMode"];
            AuthSettingServer.launcherKey = data["launcherKey"];
            AuthSettingServer.missionActive = data["MissionActive"];
    
            AuthSettingServer.maxNickSize = data["maxNickSize"];
            AuthSettingServer.minUserSize = data["maxLoginSize"];
            AuthSettingServer.minNickSize = data["minNickSize"];
            AuthSettingServer.minPassSize = data["minPassSize"];
    
            AuthSettingServer.outpost = data["Outpost"];
            AuthSettingServer.syncPort = data["syncPort"];
        } catch (err){
            Log.getLogger("auth").error("No auth config file found ~ config/auth.ini")
        }
    }
}