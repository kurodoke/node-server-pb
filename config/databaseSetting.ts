import { IniParser } from "../data/iniParser";
import { Log } from "../util/log";
import path from "path";

export class DatabaseSetting {
    public static dbName: string; 
    public static dbHost: string;
    public static dbUser: string;
    public static dbPass: string;
    public static dbPort: number;

    public static load(): void{
        let data = IniParser.getInstance().load(path.resolve() + "/data/file/config/database.ini");

        try {
    
            DatabaseSetting.dbHost = data["dbhost"];
            DatabaseSetting.dbName = data["dbname"];
            DatabaseSetting.dbPass = data["dbpass"];
            DatabaseSetting.dbPort = data["dbport"];
            DatabaseSetting.dbUser = data["dbuser"];
    
        } catch (err){
            Log.getLogger("database").error("No auth config file found ~ config/auth.ini")
        }
    }
}