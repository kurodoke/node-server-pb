import path from "path";
import { XmlParser } from "../xmlParser";
import { Map } from "../../model/map";

export class MapsXML{
    public static mapArray: Array<Map> = new Array();
 
    public static mapList1: number;
    public static mapList2: number; 
    public static mapList3: number;
    public static mapList4: number;
    public static mapList5: number;
    public static mapList6: number;
    public static mapList7: number;
    public static mapList8: number;  
    public static mapList9: number;  

    static load(){
        let data = XmlParser.getInstance().load(path.resolve() + "/data/xml/maps/maps.xml")["data"];
        
        if(data){
            data["map"].map((_map) => {
                _map = _map["@_"];
                this.mapArray.push(new Map(_map["@_id"], _map["@_tag"], _map["@_list"], _map["@_mode"]));
            });

            MapsXML.mapList1 = data["MapList"][0]["@_"]["@_value"];
            MapsXML.mapList2 = data["MapList"][1]["@_"]["@_value"];
            MapsXML.mapList3 = data["MapList"][2]["@_"]["@_value"];
            MapsXML.mapList4 = data["MapList"][3]["@_"]["@_value"];
            MapsXML.mapList5 = data["MapList"][4]["@_"]["@_value"];
            MapsXML.mapList6 = data["MapList"][5]["@_"]["@_value"];
            MapsXML.mapList7 = data["MapList"][6]["@_"]["@_value"];
            MapsXML.mapList8 = data["MapList"][7]["@_"]["@_value"];
            MapsXML.mapList9 = data["MapList"][8]["@_"]["@_value"];
        } else {
            throw new Error("something wrong with map");
        }
    }
}