import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const http = require("http");
const url = require("url");
const Promise = require("promise");

function createRequest(requestOptions: any, requestData?: any) {
    return new Promise(function (resolve: any, reject: any) {
        const req = http.request(requestOptions, function (res: any) {
            let result = "";
            res.setEncoding("utf8");
            res.on("data", function (chunck: any) {
                result += chunck;
            });
            res.on("end", function () {
                resolve(result);
            });

        });

        req.setTimeout(5000, function () {
            reject("Timeout while getting request to " + requestOptions.host);
            req.abort();
        });
        if (requestOptions.method === "POST") {
            req.write(requestData);
        }
        req.end();
        req.on("error", function (error: any) {
            reject("The error occurred while getting request to " + requestOptions.host + ". Error info: " + error);
        });
    });
}

module.exports = {
    getNodeInUse: function (browser: NightWatchBrowser) {
        return new Promise(function (resolve: any, reject: any) {
            const host = browser.globals.test_settings.selenium_host;
            const port = browser.globals.test_settings.selenium_port;
            const sessionID = browser.sessionId;
            if (host.indexOf("127.0.0.1") > -1) {
                resolve("LocalHost");
            } else {
                reject("The session ID is null, is session started?");
            }
        });
    },

    getNodesInfo: function (host: string, port: string, path: string) {
        return new Promise(function (resolve: any, reject: any) {
            const requestOptions = {
                host: host,
                port: port,
                path: path || "/grid/admin/NodeManager",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            createRequest(requestOptions).done(function (result: any) {
                try {
                    resolve(JSON.parse(result));
                } catch (ex) {
                    reject("Cannot get nodes info. Got response from GRID: " + result);
                }
            }, reject);
        });
    }
};
