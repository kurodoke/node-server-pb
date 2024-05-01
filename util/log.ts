import winston, { format, transports } from "winston";

type LabelType = "auth" | "game" | "battle" | "database" | "main";

winston.addColors({
    info: "green",
    warn: "yellow",
    error: "bold red",
    debug: "blue",
    label: "magenta"
});

export class Log {
    private static _myFormat = format.printf(
        ({ level, message, label, timestamp }) => {
            return `${timestamp} ${level}:\t[${winston.format.colorize().colorize("label", label)}] ${message}`;
        }
    );

    private static loggerAuth: winston.Logger = winston.createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format( info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(),
                    format.colorize({ all: true }),
                    format.label({ label: "Auth Server" }),
                    format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
                    this._myFormat
                ),
            }),
        ],
    });

    private static loggerGame: winston.Logger = winston.createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format( info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(),
                    format.colorize({ all: true }),
                    format.label({ label: "Game Server" }),
                    format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
                    this._myFormat
                ),
            }),
        ],
    });

    private static loggerBattle: winston.Logger = winston.createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format( info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(),
                    format.colorize({ all: true }),
                    format.label({ label: "Battle Server" }),
                    format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
                    this._myFormat
                ),
            }),
        ],
    });

    private static loggerDatabase: winston.Logger = winston.createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format( info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(),
                    format.colorize({ all: true }),
                    format.label({ label: "Database" }),
                    format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
                    this._myFormat
                ),
            }),
        ],
    });

    private static loggerMain: winston.Logger = winston.createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format( info => {
                        info.level = info.level.toUpperCase();
                        return info;
                    })(),
                    format.colorize({ all: true }),
                    format.label({ label: "Main Server" }),
                    format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
                    this._myFormat
                ),
            }),
        ],
    });

    public static getLogger(label: LabelType): winston.Logger {
        if (label == "auth") {
            return this.loggerAuth;
        } 
        if (label == "game") {
            return this.loggerGame;
        }
        if (label == "database"){
            return this.loggerDatabase;
        }
        if (label == "main"){
            return this.loggerMain;
        }
        if (label == "battle"){
            return this.loggerBattle;
        }
    }
}
