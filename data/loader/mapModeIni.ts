import { IniParser } from "../iniParser";
import path from "path";

export class MapModeIni{
    public static Tutorial: number;
    public static Deathmatch: number;
    public static Destruction: number;
    public static Sabotage: number;
    public static Supression: number;
    public static Defense: number;
    public static Challenge: number;
    public static Dinosaur: number;
    public static Sniper: number;
    public static Shotgun: number;
    public static HeadHunter: number;
    public static Knuckle: number;
    public static CrossCounter: number;
    public static Chaos: number;
    public static Escort: number;

    
    public static load(){
        let data = IniParser.getInstance().load(path.resolve() + "/data/file/maps/defaults.ini");

        this.Tutorial = data["Tutorial"];
        this.Deathmatch = data["Deathmatch"];
        this.Destruction = data["Destruction"];
        this.Sabotage = data["Sabotage"];
        this.Supression = data["Supression"];
        this.Defense = data["Defense"];
        this.Challenge = data["Challenge"];
        this.Dinosaur = data["Dinosaur"];
        this.Sniper = data["Sniper"];
        this.Shotgun = data["Shotgun"];
        this.HeadHunter = data["HeadHunter"];
        this.Knuckle = data["Knuckle"];
        this.CrossCounter = data["CrossCounter"];
        this.Chaos = data["Chaos"];
        this.Escort = data["Escort"];
    }
}