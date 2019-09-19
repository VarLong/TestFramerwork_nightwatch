///<reference path='../../typings/tsd.d.ts' />

const fse = require("fs-extra");
const JSON5 = require("json5");

function pad(n: number): string {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
}

module.exports = {

    // Load .js, .json, or .json5 file, or die trying.
    checkConfigPath(pathname: string) {
        try {
            return JSON5.parse(fse.readFileSync(pathname).toString());
        } catch (err) {
            console.error(`Error loading config ${pathname} ${err}`);
            process.exit(9);
        }
    },

    stringFormat: (...args: string[]): string => {
        let format = args ? args[0] : "",
            parmatch: RegExpMatchArray,
            parmNum: number;
        const reMatch = /\{([0-9]+)\}/;

        if (format === undefined) {
            format = "";
        }
        else {
            format = format.toString(); // it could be object in case of exceptions etc.
            while (parmatch = format.match(reMatch)) {
                parmNum = parseInt(parmatch[1], 10);
                format = format.replace(reMatch, args[parmNum + 1]);
            }
        }
        return format;
    },

    generateUUID: (): string => {
        let d = new Date().getTime();
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },

    generateLaunchUrl: (base_launch_url: string, useMockPlayer: boolean): string => {
        let result = base_launch_url.trim();
        const useMockPlayerSuffix = "forceStubPlayer=true";
        const requiredUrlSuffix = useMockPlayer ? useMockPlayerSuffix : "";

        if (requiredUrlSuffix.length > 0) {
            const lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex === -1 || lastSlashIndex !== result.length) {
                result = result + "/";
            }

            if (result.lastIndexOf("?") === -1) {
                result = result + "?";
            }

            result = result + requiredUrlSuffix;
        }

        return result;
    },

    formattedTimestamp: (): string => {
        const d = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
        return "[" + [d.getDate(), months[d.getMonth()], time].join(" ") + "] ";
    },

    checkUrl: (url: string): boolean => {
        const expFormat = "^((https|http|ftp|rtsp|mms)://)"
            + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}"
            + "|"
            + "([0-9a-z_!~*'()-]+\.)*"
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."
            + "[a-z]{2,6})"
            + "(:[0-9]{1,4})?"
            + "((/?)|"
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

        const regExp = new RegExp(expFormat);
        if (regExp.test(url) === true) {
            return true;
        } else {
            return false;
        }
    },

    lodeJson2Obj: (pathname: string) => {
        if (fse.existsSync(pathname)) {
            return JSON.parse(fse.readFileSync(pathname, "utf8"));
        }
        console.error("Error loading require json file - ", pathname);
        return undefined;
    },

    // deal ' and " in xpath
    concatString: function (queryStr: string) {
        queryStr = queryStr.replace(new RegExp("\"", "gm"), "[\"]");
        queryStr = queryStr.replace(new RegExp("'", "gm"), "',\"'\",'");
        queryStr = queryStr.replace(new RegExp("\\[\"]", "gm"), "','\"','");
        queryStr = "concat('" + queryStr + "', '')";
        return queryStr;
    },

    // get date diff
    getDateDifferenceInSeconds: function (date1: Date, date2: Date): number {
        const dateDiffInMS = date2.getTime() - date1.getTime();
        return Math.abs(Math.floor(dateDiffInMS / 1000));
    },

    createDir(path: string) {
        fse.mkdirsSync(path, function (err: any) {
            if (err) {
                console.error(err);
            }
        });
    }
};