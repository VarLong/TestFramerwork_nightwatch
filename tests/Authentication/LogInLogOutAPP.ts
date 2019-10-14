/**
 * Login and Logout
 */

/**
 * Login, Logout
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

module.exports = {
    tags: ["CI"],
    before(browser: NightWatchBrowser) {
        setup.begin(browser);
    },

    after(browser: NightWatchBrowser) {
        setup.end(browser);
    },

    "Log in Git hub"(browser: NightWatchBrowser) {
        // browser.url("http://github.com/");
    },

    "Log in and check for logo"(browser: NightWatchBrowser) {
        // const gitHubPage = browser.page.GitHubPage();
        // gitHubPage.waitGitHubVisible();
        // browser.compareImage(".btn-primary-mktg");
    }
};