import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

module.exports = {
    begin(browser: NightWatchBrowser) {
        console.log("Setup.ts begin----->");
        browser.perform(() => {
            // Getting node info.
            const nodeManager = require("./nodeManager");
            nodeManager.getNodeInUse(browser).done((node: string) => {
                console.log(" ✔ The test is running on " + node);
            }, (error: string) => {
                console.log(" ✖ Unable to get node information: " + error);
            });
        });
    },

    end(browser: NightWatchBrowser) {
        browser.end();
        console.log("Setup.ts end----->");
    }
};