import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";

export class XmlParser {
    static _instance: XmlParser;
    private parser: XMLParser;

    private constructor() {
        this.parser = new XMLParser({
            ignoreAttributes: false,
            allowBooleanAttributes: true,
            trimValues: true,
            attributeNamePrefix: "@_",
            attributesGroupName: "@_",
            commentPropName: "#comment",
            parseAttributeValue: true,
        });
    }

    public static getInstance(): XmlParser {
        if (!XmlParser._instance) {
            XmlParser._instance = new XmlParser();
        }
        return XmlParser._instance;
    }

    private parse(xml: string): object {
        return this.parser.parse(xml);
    }

    public load(path: string): object {
        return this.parse(readFileSync(path, "utf-8"));
    }
}
