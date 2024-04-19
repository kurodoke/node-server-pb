import { Inventory, InventoryAttributes } from "../../model/inventory";
import { TitleQ, TitleQAttributes } from "../../model/titleQ";

import { XmlParser } from "../xmlParser";
import path from "path";

type TitleId = number;

export class titleXML {
    public static titleList: Map<TitleId, TitleQ> = new Map();

    load() {
        const dataTitle = XmlParser.getInstance().load(
            path.resolve() + "/data/file/title/titleInfo.xml"
        )["data"];

        if (dataTitle) {
            dataTitle["title"].map((_title) => {
                _title = _title["@_"];

                const _data: TitleQAttributes = {
                    id: _title["@_id"],
                    pos: _title["@_pos"],
                    posV: _title["@_pos_v"],
                    medal: _title["@_medals"],
                    ribbon: _title["@_brooch"],
                    masterMedal: _title["@_blueOrder"],
                    ensign: _title["@_insignia"],
                    rank: _title["@_rank"],
                    slot: _title["@_slot"],
                    reqT1: _title["@_reqT1"],
                    reqT2: _title["@_reqT2"],
                };

                titleXML.titleList.set(_title["@_id"], new TitleQ(_data));
            });
        }

        const dataTitleAward = XmlParser.getInstance().load(
            path.resolve() + "/data/file/title/titleAwards2.xml"
        )["data"];

        if (dataTitleAward) {
            dataTitle["title"].map((_award) => {
                _award = _award["@_"];

                let award = new Inventory(
                    BigInt(0),
                    _award["@_count"],
                    _award["@_equip"],
                    _award["@_itemid"]
                );

                titleXML.titleList.get(_award["@_id"]).addRewards(award);
            });
        }
    }
}
