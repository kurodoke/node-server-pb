import { readFileSync } from "fs";

export class IniParser {
    static _instance: IniParser;
    private _regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/,
    };

    private constructor() {}

    public static getInstance(): IniParser {
        if (!IniParser._instance) {
            IniParser._instance = new IniParser();
        }
        return IniParser._instance;
    }

    private parse(data: string): object {
        let value = {};
        let lines = data.split(/[\r\n]+/);
        let section = null;
        lines.forEach((line) => {
            if (this._regex.comment.test(line)) {
                return;
            } else if (this._regex.param.test(line)) {
                let match = line.match(this._regex.param);
                if (section) {
                    value[section][match[1]] = match[2];
                } else {
                    value[match[1]] = match[2];
                }
            } else if (this._regex.section.test(line)) {
                let match = line.match(this._regex.section);
                value[match[1]] = {};
                section = match[1];
            } else if (line.length == 0 && section) {
                section = null;
            }
        });
        return value;
    }

    private convertDataType(obj): object {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!isNaN(obj[key])) {
                    obj[key] = Number(obj[key]);
                }
                else if (obj[key] === "true" || obj[key] === "false") {
                    obj[key] = Boolean(obj[key]);
                }
            }
        }

        return obj;
    }

    public load(path: string): object {
        let file = readFileSync(path, "utf8");
        let data = this.parse(file);
        return this.convertDataType(data);
    }
}
