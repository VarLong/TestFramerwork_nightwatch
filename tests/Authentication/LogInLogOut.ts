/**
 * Login and Logout
 */

/**
 * Login, Logout
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

module.exports = {
    tags: ["CI"],
    before(browser: NightWatchBrowser) {
    },

    after(browser: NightWatchBrowser) {
        browser.end();
    },

    "Log in Git hub"(browser: NightWatchBrowser) {
        browser.url("http://github.com/");
    },

    "Log in and check for logo"(browser: NightWatchBrowser) {
        const gitHubPage = browser.page.GitHubPage();
        gitHubPage.waitGitHubVisible();
        browser.compareImage(".btn-primary-mktg");
    }
};
