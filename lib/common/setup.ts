import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

module.exports = {
    begin(browser: NightWatchBrowser) {
        console.log("Setup.ts begin----->");
        browser.perform(() => {
            // TODO: Getting node info.
        });
    },

    end(browser: NightWatchBrowser) {
        browser.end();
        console.log("Setup.ts end----->");
    }
};