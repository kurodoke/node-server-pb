import path from "path";
import { IniParser } from "../data/iniParser";
import { AuthSettingDatabase } from "./authSettingDatabase";

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
    
            AuthSettingDatabase.dbHost = data["dbhost"];
            AuthSettingDatabase.dbName = data["dbname"];
            AuthSettingDatabase.dbPass = data["dbpass"];
            AuthSettingDatabase.dbPort = data["dbport"];
            AuthSettingDatabase.dbUser = data["dbuser"];
    
            AuthSettingServer.debugMode = data["debugMode"];
            AuthSettingServer.gameLocale = data['GameLocales'].split(',');
            AuthSettingServer.isTestMode = data["isTestMode"];
            AuthSettingServer.launcherKey = data["launcherKey"];
    
            AuthSettingServer.maxNickSize = data["maxNickSize"];
            AuthSettingServer.minUserSize = data["maxLoginSize"];
            AuthSettingServer.minNickSize = data["minNickSize"];
            AuthSettingServer.minPassSize = data["minPassSize"];
    
            AuthSettingServer.outpost = data["Outpost"];
            AuthSettingServer.syncPort = data["syncPort"];
        } catch (err){
            console.log("[Error] No auth config file found ~ config/auth.ini")
        }
    }
}